'use strict';
// rmfyalk MCP connector — 人民法院案例库 (rmfyalk.court.gov.cn)，权威入库案例检索。
// Launched as `node index.js`; line-delimited JSON-RPC over stdio.
// 依赖 playwright-core + 本机 Chrome（channel: 'chrome'，不下载浏览器）。ALL logging -> stderr.
//
// 站点机制（实测 2026-08，挖自 /asset/js/base.min.js、list.js、content.js）：
//   - 检索/详情走 JSON API（POST /cpws_al_api/api/cpwsAl/search、/content），但要求登录：
//     匿名调用返回 401 未登录；未登录访问列表页会被前端强制跳转共道 oauth 登录。
//   - 登录为共道统一认证（account.court.gov.cn/oauth，client_id=CBS_FYALK_0），
//     登录成功后服务端下发 Cookie，页面 JS 再调 getUserInfo 取 userToken，
//     之后 API 调用携带请求头 faxin-cpws-al-token。
//   - 仅 indexTongji（收录统计）匿名可用。
//
// 合规设计（与本项目 _lib/http.js 的"永不绕过"红线一致）：
//   - open_login_window 打开【可见】窗口，由用户本人完成共道账号登录/任何验证；
//     会话保存在持久化 profile，后续 headless 复用。绝不自动处理登录/验证码。
//   - 人速操作：步骤间停顿，单页单查，互斥队列不并发。
//   - API 返回 401 时一律提示重新登录，不尝试任何绕过。
//
// 工具：open_login_window / check_session / search_cases / get_case_detail /
//       get_library_stats（匿名可用）/ close_browser
//
// Fixtures 模式：RMFYALK_FIXTURES=1（或 FIXTURES_DIR 指向目录）时不启动浏览器，
// API 响应从 fixtures 文件读取（文件名为 端点-请求体哈希.json）。
// 捕获模式：RMFYALK_CAPTURE_DIR 指向目录时，把真实 API 响应按同名规则写入，用于固化 fixtures。

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

// Fixtures mode for tests: RMFYALK_FIXTURES=1 -> read canned responses from
// ./fixtures instead of the network (FIXTURES_DIR may still override).
if (process.env.RMFYALK_FIXTURES && !process.env.FIXTURES_DIR) {
  process.env.FIXTURES_DIR = path.join(__dirname, 'fixtures');
}

const { serve } = require('../_lib/rpc');
const cache = require('../_lib/cache');
const { TIER, METHOD } = require('../_lib/provenance');
const { getSource } = require('../_lib/sources');

const SERVER = 'rmfyalk';
const SERVER_INFO = { name: 'rmfyalk', version: '1.0.0' };
const DETAIL_MAX_CHARS = 8000;

const BASE_URL = 'https://rmfyalk.court.gov.cn';
const HOME_URL = `${BASE_URL}/home.html`;
// helper.html 在 base.min.js 的白名单里：未登录也不会被强制跳转登录页，适合做 API 探测的底座页
const PROBE_URL = `${BASE_URL}/helper.html`;
const API = {
  stats: '/cpws_al_api/api/cpwsAl/indexTongji',
  search: '/cpws_al_api/api/cpwsAl/search',
  content: '/cpws_al_api/api/cpwsAl/content',
  userInfo: '/cpws_al_api/api/user/getUserInfo',
};

// 检索字段（实测自 list.html 下拉框）
const SEARCH_FIELDS = {
  qw: '全文',
  title: '标题',
  albh: '案例编号（入库编号）',
  cpws_al_ajzh: '案号',
  keyword: '关键词',
  jbaq: '基本案情',
  cprq: '裁判日期',
};

function profileDir() {
  if (process.env.RMFYALK_PROFILE_DIR) return process.env.RMFYALK_PROFILE_DIR;
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'rmfyalk-profile');
}

function debugDir() {
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'rmfyalk-debug');
}

// ---------------------------------------------------------------------------
// 浏览器生命周期（进程内单例；互斥队列串行，避免 Chrome ProcessSingleton 锁冲突）
// ---------------------------------------------------------------------------
let _context = null;
let _contextHeadless = null;
let _queue = Promise.resolve();

function enqueue(fn) {
  const run = _queue.then(() => fn());
  _queue = run.catch(() => {});
  return run;
}

async function launchPersistent(chromium, headless) {
  const opts = {
    channel: 'chrome', // 使用本机 Chrome，不下载浏览器
    headless,
    viewport: { width: 1366, height: 900 },
    locale: 'zh-CN',
    args: ['--disable-blink-features=AutomationControlled'],
  };
  try {
    return await chromium.launchPersistentContext(profileDir(), opts);
  } catch (e) {
    // 上次进程异常退出可能遗留 SingletonLock（该 profile 目录归本连接器专用，可安全清理）
    if (/ProcessSingleton|already in use/i.test(e.message)) {
      for (const f of ['SingletonLock', 'SingletonSocket', 'SingletonCookie']) {
        try {
          fs.unlinkSync(path.join(profileDir(), f));
        } catch {
          /* 不存在则忽略 */
        }
      }
      return chromium.launchPersistentContext(profileDir(), opts);
    }
    throw e;
  }
}

async function getContext(headless) {
  if (_context && _contextHeadless === headless && _context.pages() !== undefined) return _context;
  await closeBrowser();
  let chromium;
  try {
    ({ chromium } = require('playwright-core'));
  } catch {
    throw new Error('缺少依赖 playwright-core，请在项目根目录执行 npm install');
  }
  try {
    _context = await launchPersistent(chromium, headless);
  } catch (e) {
    throw new Error(
      `启动 Chrome 失败（${e.message.split('\n')[0]}）。请确认已安装 Google Chrome。`
    );
  }
  _contextHeadless = headless;
  return _context;
}

async function closeBrowser() {
  if (_context) {
    try {
      await _context.close();
    } catch {
      /* 忽略 */
    }
    _context = null;
    _contextHeadless = null;
  }
}

process.on('exit', () => {
  if (_context) _context.close().catch(() => {});
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// API 层（fixtures / capture / 浏览器内 fetch）
// ---------------------------------------------------------------------------
function fixtureSlug(apiPath, body) {
  const name = apiPath.split('/').pop();
  const h = crypto.createHash('sha1').update(JSON.stringify(body || {})).digest('hex').slice(0, 10);
  return `${name}-${h}.json`;
}

function readFixture(apiPath, body) {
  const dir = process.env.FIXTURES_DIR;
  if (!dir) return null;
  try {
    const raw = fs.readFileSync(path.join(dir, fixtureSlug(apiPath, body)), 'utf8');
    return { httpStatus: 200, json: JSON.parse(raw) };
  } catch {
    return null;
  }
}

function captureFixture(apiPath, body, resp) {
  const dir = process.env.RMFYALK_CAPTURE_DIR;
  if (!dir || !resp || resp.json === undefined) return;
  // 用户信息接口不落盘（含账号信息）
  if (apiPath === API.userInfo) return;
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, fixtureSlug(apiPath, body)), JSON.stringify(resp.json, null, 2));
  } catch (e) {
    console.error('[rmfyalk] capture failed:', e.message);
  }
}

/**
 * 在页面上下文内调用案例库 JSON API（Cookie 由浏览器自动携带）。
 * 返回 { httpStatus, json }；json.code 为 '0'/0 表示成功，401 表示未登录/会话失效。
 */
async function apiPost(page, apiPath, body, token) {
  if (process.env.FIXTURES_DIR) {
    const fx = readFixture(apiPath, body);
    if (fx) return fx;
    return { httpStatus: 404, json: null, raw: `fixture not found: ${fixtureSlug(apiPath, body)}` };
  }
  const resp = await page.evaluate(
    async ({ apiPath, body, token }) => {
      const headers = { 'Content-Type': 'application/json;charset=UTF-8' };
      if (token) headers['faxin-cpws-al-token'] = token;
      let r;
      try {
        r = await fetch(apiPath, { method: 'POST', headers, body: JSON.stringify(body || {}) });
      } catch (e) {
        return { httpStatus: 0, json: null, raw: String(e) };
      }
      const text = await r.text();
      try {
        return { httpStatus: r.status, json: JSON.parse(text) };
      } catch {
        return { httpStatus: r.status, json: null, raw: text.slice(0, 500) };
      }
    },
    { apiPath, body, token }
  );
  captureFixture(apiPath, body, resp);
  return resp;
}

function apiOk(resp) {
  return resp && resp.json && String(resp.json.code) === '0';
}

// ---------------------------------------------------------------------------
// 会话
// ---------------------------------------------------------------------------
async function ensureApiPage() {
  if (process.env.FIXTURES_DIR) {
    // fixtures 模式不启动浏览器；stub 保证 page.close() 等调用安全
    return { close: async () => {} };
  }
  const ctx = await getContext(true);
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);
  await page.goto(PROBE_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await sleep(1500);
  return page;
}

/** 探测登录态；已登录返回 { loggedIn, token, nameMasked, org }。 */
async function probeSession(page) {
  if (process.env.FIXTURES_DIR) return { loggedIn: true, token: 'fixtures' };
  const resp = await apiPost(page, API.userInfo, { state: undefined });
  if (apiOk(resp) && resp.json.data) {
    const u = resp.json.data.alUser || resp.json.data;
    const name = u.realName || '';
    return {
      loggedIn: true,
      token: u.userToken || null,
      nameMasked: name ? name[0] + '*'.repeat(Math.max(1, name.length - 1)) : null,
      org: u.userOrgName ? String(u.userOrgName).split('\\')[0] : null,
    };
  }
  return { loggedIn: false };
}

function needLoginText() {
  return [
    '【需要登录】人民法院案例库的检索/详情接口要求登录（共道统一认证，匿名调用返回 401）。',
    '请先调用 open_login_window 工具：会打开一个可见的 Chrome 窗口，请你在窗口中完成登录（本会话只需一次）。',
    '登录成功后调用 check_session 确认状态，然后重试本查询。',
    `会话保存在本机 ${profileDir()}（含登录 Cookie，请勿共享该目录）。`,
  ].join('\n');
}

async function dumpDebug(page, tag) {
  try {
    const dir = debugDir();
    fs.mkdirSync(dir, { recursive: true });
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    fs.writeFileSync(path.join(dir, `${ts}-${tag}.html`), await page.content());
    fs.writeFileSync(path.join(dir, `${ts}-${tag}.png`), await page.screenshot({ fullPage: false }));
    return path.join(dir, `${ts}-${tag}.{html,png}`);
  } catch (e) {
    return `(调试文件保存失败: ${e.message})`;
  }
}

// ---------------------------------------------------------------------------
// 渲染辅助
// ---------------------------------------------------------------------------
const stripTags = (s) => String(s == null ? '' : s).replace(/<[^>]*>/g, '').trim();

const CASE_TYPE_LABEL = {
  '01': '指导性案例/参考案例（zdx）',
  '02': '参考案例（ck）',
  '03': '社会关注案例',
};

function detailUrlFor(gid, type) {
  const lib = String(type) === '02' ? 'ck' : 'zdx';
  return `${BASE_URL}/view/content.html?id=${encodeURIComponent(gid)}&lib=${lib}`;
}

function provLine(tier) {
  const src = getSource('rmfyalk') || { channel_level: 'A', name: '人民法院案例库' };
  return `来源层级: ${tier} | 渠道等级: ${src.channel_level} | 获取方式: ${METHOD.RMFYALK_API} | 数据源: ${src.name}`;
}

// ---------------------------------------------------------------------------
// 工具实现
// ---------------------------------------------------------------------------
async function openLoginWindow() {
  try {
    const ctx = await getContext(false); // headed
    const page = await ctx.newPage();
    await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(800);
    return (
      '已打开可见的 Chrome 窗口并进入人民法院案例库首页。\n' +
      '请在该窗口中点击「登录」，跳转共道统一认证（account.court.gov.cn）后由你本人完成登录' +
      '（账号密码等方式，以页面为准；如出现人机验证也请一并完成）。\n' +
      '完成后调用 check_session 确认登录状态；该窗口会保持打开，登录成功后可调用 close_browser 关闭。\n' +
      `会话目录: ${profileDir()}`
    );
  } catch (e) {
    return `打开登录窗口失败: ${e.message}`;
  }
}

async function checkSession() {
  let page;
  try {
    page = await ensureApiPage();
    const s = await probeSession(page);
    await page.close().catch(() => {});
    if (s.loggedIn) {
      return (
        `当前处于已登录状态${s.nameMasked ? `（用户: ${s.nameMasked}${s.org ? `，${s.org}` : ''}）` : ''}。` +
        '可以使用 search_cases / get_case_detail。'
      );
    }
    return (
      '当前未登录或会话已失效（getUserInfo 返回 401）。\n' +
      '请运行 npm run connector:rmfyalk:login（或调用 open_login_window），完成共道账号登录后重试。'
    );
  } catch (e) {
    if (page) await page.close().catch(() => {});
    return `会话检查失败: ${e.message}`;
  }
}

async function getLibraryStats() {
  // indexTongji 匿名可用（实测 2026-08），无需登录
  if (process.env.FIXTURES_DIR) {
    const fx = readFixture(API.stats, {});
    if (fx && apiOk(fx)) {
      const d = fx.json.data || {};
      return `人民法院案例库收录统计：共 ${d.allCount ?? '未知'} 篇（统计月份 ${d.currMonth ?? '未知'}）。`;
    }
    return { text: 'fixtures 中未找到收录统计数据。', cacheable: false };
  }
  let page;
  try {
    page = await ensureApiPage();
    const resp = await apiPost(page, API.stats, {});
    await page.close().catch(() => {});
    if (apiOk(resp)) {
      const d = resp.json.data || {};
      return (
        `人民法院案例库收录统计：共 ${d.allCount ?? '未知'} 篇` +
        `（统计月份 ${d.currMonth ?? '未知'}，当日上线 ${d.currDayOnlineCount ?? 0} 篇）。`
      );
    }
    return {
      text: `收录统计获取失败：${resp.json ? resp.json.msg : resp.raw || 'HTTP ' + resp.httpStatus}`,
      cacheable: false,
    };
  } catch (e) {
    if (page) await page.close().catch(() => {});
    return { text: `收录统计获取失败: ${e.message}`, cacheable: false };
  }
}

function buildSearchPayload(args) {
  const field = SEARCH_FIELDS[args.field] ? args.field : 'qw';
  const size = Math.min(30, Math.max(1, parseInt(args.size, 10) || 10));
  const page = Math.max(1, parseInt(args.page, 10) || 1);
  const matchType = String(args.matchType) === '2' ? 2 : 1;
  const sort = ['+cpws_al_no', '-cpws_al_no', '+cpws_al_zs_date', '-cpws_al_zs_date'].includes(args.sort)
    ? args.sort
    : '';
  return {
    page,
    size,
    lib: 'qb',
    searchParams: {
      userSearchType: matchType,
      isAdvSearch: '0',
      selectValue: [field],
      lib: 'cpwsAl_qb',
      sort_field: sort,
      keyTitle: [String(args.keyword).trim()],
    },
  };
}

async function doSearch(page, token, payload) {
  return apiPost(page, API.search, payload, token);
}

function renderSearchList(keyword, field, payload, data) {
  const rows = data.datas || [];
  const total = data.totalCount;
  const blocks = rows.slice(0, payload.size).map((it, i) => {
    const gid = it.cpws_al_id;
    const typeLabel = CASE_TYPE_LABEL[String(it.cpws_al_type)] || it.cpws_al_type || '';
    const lines = [`${i + 1}. ${stripTags(it.cpws_al_title) || '（无标题）'}`];
    const sub = stripTags(it.cpws_al_sub_title);
    if (sub) lines.push(`   要旨题: ${sub}`);
    lines.push(
      '   ' +
        [
          `入库编号: ${stripTags(it.cpws_al_no) || '未知'}`,
          it.cpws_al_ajzh ? `案号: ${stripTags(it.cpws_al_ajzh)}` : null,
          it.cpws_al_zs_date ? `裁判日期: ${stripTags(it.cpws_al_zs_date)}` : null,
          it.cpws_al_sf ? `省份: ${stripTags(it.cpws_al_sf)}` : null,
          typeLabel ? `类型: ${typeLabel}` : null,
        ]
          .filter(Boolean)
          .join(' | ')
    );
    const cpyz = stripTags(it.cpws_al_cpyz);
    if (cpyz) lines.push(`   裁判要旨: ${cpyz.slice(0, 150)}${cpyz.length > 150 ? '…' : ''}`);
    lines.push(`   gid: ${gid}（get_case_detail 可按 gid 取详情）`);
    lines.push(`   链接: ${detailUrlFor(gid, it.cpws_al_type)}`);
    return lines.join('\n');
  });
  const header =
    `人民法院案例库检索「${keyword}」（字段: ${SEARCH_FIELDS[field]}，第 ${payload.page} 页）：` +
    `${total != null ? `共 ${total} 篇，` : ''}本页 ${blocks.length} 条。`;
  return header + '\n' + provLine(TIER.L2_DATABASE) + '\n\n' + blocks.join('\n\n');
}

async function searchCases(args) {
  const keyword = String(args.keyword || '').trim();
  if (!keyword) {
    return { text: '请提供 keyword（检索词；可配合 field 指定检索字段）。', cacheable: false };
  }
  const payload = buildSearchPayload(args);

  let page;
  try {
    page = await ensureApiPage();
    const session = await probeSession(page);
    if (!session.loggedIn) {
      await page.close().catch(() => {});
      return { text: needLoginText(), cacheable: false };
    }
    await sleep(800); // 人速
    const resp = await doSearch(page, session.token, payload);
    if (resp.json && String(resp.json.code) === '401') {
      await page.close().catch(() => {});
      return { text: needLoginText(), cacheable: false };
    }
    if (!apiOk(resp)) {
      const dump = await dumpDebug(page, 'search-fail');
      await page.close().catch(() => {});
      return {
        text: `案例库检索失败：${(resp.json && resp.json.msg) || resp.raw || 'HTTP ' + resp.httpStatus}。现场已保存: ${dump}`,
        cacheable: false,
      };
    }
    const data = resp.json.data || {};
    if (!data.datas || data.datas.length === 0) {
      await page.close().catch(() => {});
      return { text: `人民法院案例库未检索到「${keyword}」的入库案例。\n` + provLine(TIER.L2_DATABASE), cacheable: true };
    }
    const text = renderSearchList(keyword, payload.searchParams.selectValue[0], payload, data);
    await page.close().catch(() => {});
    return { text, cacheable: true };
  } catch (err) {
    console.error('[rmfyalk search_cases] error:', (err && err.stack) || err);
    if (page) await page.close().catch(() => {});
    return { text: `案例库检索失败: ${(err && err.message) || err}`, cacheable: false };
  }
}

// 详情栏目（字段名实测自 content 接口，2026-08）
const DETAIL_SECTIONS = [
  ['cpws_al_cpyz', '裁判要旨'],
  ['cpws_al_jbaq', '基本案情'],
  ['cpws_al_cpjg', '裁判结果'],
  ['cpws_al_cply', '裁判理由'],
  ['cpws_al_glsy', '相关法条'],
  ['cpws_al_aljz', '案例聚焦'],
  ['cpws_al_fulltext', '全文'],
];

async function getCaseDetail(args) {
  let gid = String(args.gid || '').trim();
  const caseNumber = String(args.caseNumber || '').trim();
  const caseNo = String(args.caseNo || '').trim(); // 入库编号
  if (!gid && !caseNumber && !caseNo) {
    return { text: '请提供 gid（search_cases 返回）、caseNumber（案号）或 caseNo（入库编号）之一。', cacheable: false };
  }

  let page;
  try {
    page = await ensureApiPage();
    const session = await probeSession(page);
    if (!session.loggedIn) {
      await page.close().catch(() => {});
      return { text: needLoginText(), cacheable: false };
    }

    // 无 gid 时先检索定位
    if (!gid) {
      const field = caseNo ? 'albh' : 'cpws_al_ajzh';
      const payload = buildSearchPayload({ keyword: caseNo || caseNumber, field, size: 5 });
      await sleep(800);
      const sr = await doSearch(page, session.token, payload);
      if (sr.json && String(sr.json.code) === '401') {
        await page.close().catch(() => {});
        return { text: needLoginText(), cacheable: false };
      }
      const rows = (apiOk(sr) && sr.json.data && sr.json.data.datas) || [];
      if (!rows.length) {
        await page.close().catch(() => {});
        return { text: `未找到「${caseNo || caseNumber}」对应的入库案例。`, cacheable: true };
      }
      gid = rows[0].cpws_al_id;
    }

    await sleep(800); // 人速
    // gid 契约（实测 2026-08）：search 返回的 cpws_al_id 已是单层编码（%2B 等），
    // content 接口直接接受该单层编码形式；若用户传入的是解码后的原始形式（含 +/=），
    // 则自行编码一次。站点行为佐证：地址栏 id 为双层编码，base.min.js 做两次
    // decodeURIComponent，content.js 再 encodeURIComponent 一次，最终仍是单层编码。
    const bodyGid = /%[0-9A-Fa-f]{2}/.test(gid) ? gid : encodeURIComponent(gid);
    const resp = await apiPost(page, API.content, { gid: bodyGid }, session.token);
    if (resp.json && String(resp.json.code) === '401') {
      await page.close().catch(() => {});
      return { text: needLoginText(), cacheable: false };
    }
    if (!apiOk(resp) || !resp.json.data || !resp.json.data.data) {
      await page.close().catch(() => {});
      return {
        text: `案例详情获取失败：${(resp.json && resp.json.msg) || resp.raw || 'HTTP ' + resp.httpStatus}（gid: ${gid}）。`,
        cacheable: false,
      };
    }

    const c = resp.json.data.data;
    const metaLines = [`标题: ${stripTags(c.cpws_al_title) || '（无标题）'}`];
    const subTitle = stripTags(c.cpws_al_sub_title);
    if (subTitle) metaLines.push(`副标题（要旨）: ${subTitle}`);
    for (const [label, v0] of [
      ['入库编号', c.cpws_al_no],
      ['案号', c.cpws_al_ajzh],
      ['裁判日期', c.cpws_al_zs_date],
      ['省份', c.cpws_al_sf || c.cpws_al_slfy_sf_name],
      ['关键词', c.cpws_al_keyword],
      ['入库日期', String(c.cpws_al_rk_time || '').split(' ')[0]],
    ]) {
      const v = stripTags(v0);
      if (v) metaLines.push(`${label}: ${v}`);
    }
    const typeLabel = CASE_TYPE_LABEL[String(c.cpws_al_type)];
    if (typeLabel) metaLines.push(`类型: ${typeLabel}`);
    metaLines.push(`链接: ${detailUrlFor(gid, c.cpws_al_type)}`);
    metaLines.push(provLine(TIER.L2_DATABASE));

    // 正文：按固定栏目拼接（空栏目跳过）
    const bodyParts = [];
    for (const [k, label] of DETAIL_SECTIONS) {
      const text = stripTags(c[k]);
      if (text) bodyParts.push(`【${label}】\n${text}`);
    }
    if (!bodyParts.length) {
      // 结构不符合预期：输出字段名供适配
      const longFields = Object.entries(c)
        .filter(([, v]) => stripTags(v).length >= 100)
        .map(([k]) => k);
      bodyParts.push(
        `（未识别到正文字段；长文本字段: ${longFields.join(', ') || '无'}；全部字段: ${Object.keys(c).join(', ')}）`
      );
    }
    const body = bodyParts.join('\n\n');
    const truncated = body.length > DETAIL_MAX_CHARS;
    const text =
      metaLines.join('\n') +
      '\n\n' +
      (truncated ? body.slice(0, DETAIL_MAX_CHARS) + `\n……（已截断，全文约 ${body.length} 字）` : body);
    await page.close().catch(() => {});
    return { text, cacheable: true };
  } catch (err) {
    console.error('[rmfyalk get_case_detail] error:', (err && err.stack) || err);
    if (page) await page.close().catch(() => {});
    return { text: `案例详情获取失败: ${(err && err.message) || err}`, cacheable: false };
  }
}

// ---------------------------------------------------------------------------
// Tool schemas（connector.json 同步更新）
// ---------------------------------------------------------------------------
const TOOLS = [
  {
    name: 'open_login_window',
    description:
      '打开可见的 Chrome 窗口进入人民法院案例库，由用户本人完成共道统一认证登录（本站检索/详情接口需登录，匿名返回 401；合规设计不自动绕过任何验证）。会话保存在本机持久化 profile，后续查询自动复用。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'check_session',
    description: '检查人民法院案例库当前登录状态（基于本机持久化浏览器会话 + getUserInfo 接口）。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'search_cases',
    description:
      '检索人民法院案例库入库案例（指导性案例/参考案例等权威案例，总量约 5500 篇，重质量不重数量）。需先登录（见 open_login_window）。支持按全文/标题/案号/入库编号/关键词/基本案情等字段检索。',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', description: '检索词（必填）' },
        field: {
          type: 'string',
          enum: Object.keys(SEARCH_FIELDS),
          default: 'qw',
          description: '检索字段：qw=全文，title=标题，albh=入库编号，cpws_al_ajzh=案号，keyword=关键词，jbaq=基本案情，cprq=裁判日期',
        },
        matchType: { type: 'string', enum: ['1', '2'], default: '1', description: '1=精确检索（站点默认），2=模糊检索' },
        sort: {
          type: 'string',
          enum: ['', '+cpws_al_no', '-cpws_al_no', '+cpws_al_zs_date', '-cpws_al_zs_date'],
          default: '',
          description: '排序：±cpws_al_no=入库编号，±cpws_al_zs_date=裁判时间；空为默认相关度',
        },
        page: { type: 'integer', default: 1, description: '页码' },
        size: { type: 'integer', default: 10, description: '每页条数（最大 30）' },
      },
      required: ['keyword'],
    },
  },
  {
    name: 'get_case_detail',
    description:
      '获取人民法院案例库入库案例详情（含基本案情、裁判理由、裁判要旨等）。可按 gid（search_cases 返回）、案号或入库编号（自动检索定位）。',
    inputSchema: {
      type: 'object',
      properties: {
        gid: { type: 'string', description: '案例 gid（search_cases 返回的 cpws_al_id）' },
        caseNumber: { type: 'string', description: '案号（如：（2023）京01民初1234号）' },
        caseNo: { type: 'string', description: '入库编号（如：2024-10-2-358-001）' },
      },
      required: [],
    },
  },
  {
    name: 'get_library_stats',
    description: '获取人民法院案例库收录统计（总篇数等）。匿名可用，无需登录。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'close_browser',
    description: '关闭连接器持有的浏览器实例，释放资源（不影响已保存的登录会话）。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

// ---------------------------------------------------------------------------
// dispatch
// ---------------------------------------------------------------------------
async function callTool(name, args) {
  console.error(`[rmfyalk] tools/call ${name} args=${JSON.stringify(args).slice(0, 300)}`);

  switch (name) {
    case 'open_login_window':
      return enqueue(() => openLoginWindow());
    case 'check_session':
      return enqueue(() => checkSession());
    case 'search_cases':
      return cache.withCache(SERVER, name, args, () => enqueue(() => searchCases(args)));
    case 'get_case_detail':
      return cache.withCache(SERVER, name, args, () => enqueue(() => getCaseDetail(args)));
    case 'get_library_stats':
      return cache.withCache(SERVER, name, args, () => enqueue(() => getLibraryStats()));
    case 'close_browser':
      return enqueue(async () => {
        await closeBrowser();
        return '浏览器已关闭（登录会话仍保存在本机 profile 中）。';
      });
    default:
      throw new Error(
        `未知工具: ${name}（可用: open_login_window, check_session, search_cases, get_case_detail, get_library_stats, close_browser）`
      );
  }
}

serve({ serverInfo: SERVER_INFO, tools: TOOLS, callTool });
console.error(`[rmfyalk] connector ready (browser=chrome channel, profile=${profileDir()})`);
