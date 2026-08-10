'use strict';
// wenshu MCP connector — 中国裁判文书网 (wenshu.court.gov.cn)，浏览器自动化实现。
// Launched as `node index.js`; line-delimited JSON-RPC over stdio.
// 依赖 playwright-core + 本机 Chrome（channel: 'chrome'，不下载浏览器）。ALL logging -> stderr.
//
// 合规设计（与本项目 _lib/http.js 的"永不绕过"红线一致）：
//   - 搜索/详情在当前 wenshu 必须登录（支付宝扫码）。本连接器不绕过任何验证：
//     open_login_window 打开一个【可见】浏览器窗口，由用户本人扫码登录/完成人机验证；
//     会话保存在持久化 profile 中，后续 headless 查询复用。
//   - 遇到验证码/滑块/登录墙时，一律返回提示让用户在可见窗口中自行完成，绝不自动破解。
//   - 人速操作：步骤间有停顿，单页单查，不并发、不批量翻页。
//
// 工具：open_login_window / check_session / search_cases / get_case_detail / close_browser
//
// 注意：wenshu 登录后的列表/详情 DOM 只能在真实会话中观察到（选择器可能随站点改版漂移）。
// 解析失败时会把页面 HTML+截图保存到调试目录，便于按实际结构适配选择器。

const fs = require('fs');
const os = require('os');
const path = require('path');

const { serve } = require('../_lib/rpc');
const cache = require('../_lib/cache');

const SERVER = 'wenshu';
const SERVER_INFO = { name: 'wenshu', version: '2.0.0' };
// 浏览器操作比 HTTP 慢：留足预算但仍须低于宿主 60s 上限
const BUDGET_MS = 50000;
const DETAIL_MAX_CHARS = 8000;

const HOME_URL = 'https://wenshu.court.gov.cn/';
// 列表页（从首页导航链接实测获得，2026-08）
const LIST_URL = 'https://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html';
// 登录/注册页 marker（实测：搜索会重定向到此页）
const LOGIN_PAGE_MARK = '181010CARHS5BS3C';
// 详情页链接特征（含 docId 的锚点）
const DOCID_MARK = 'docId=';

// 案件类型频道码（实测自首页导航，2026-08；v1 未使用——列表页检索只认首页表单
// 生成的 pageId，类型筛选需结果页聚类点选，留待后续适配）：
// 刑事=02 民事=03 行政=04 赔偿=05 执行=10 其他=99

function profileDir() {
  if (process.env.WENSHU_PROFILE_DIR) return process.env.WENSHU_PROFILE_DIR;
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'wenshu-profile');
}

function debugDir() {
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'wenshu-debug');
}

// ---------------------------------------------------------------------------
// 浏览器生命周期（进程内单例，随 MCP server 存活）
// 注意：rpc 层并发派发 tools/call，浏览器操作必须串行（互斥队列），
// 否则并发 launch 同一 profile 会触发 Chrome ProcessSingleton 锁冲突。
// ---------------------------------------------------------------------------
let _context = null; // playwright persistent context
let _contextHeadless = null;
let _queue = Promise.resolve();

/** 串行执行浏览器操作。 */
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
      `启动 Chrome 失败（${e.message.split('\n')[0]}）。请确认已安装 Google Chrome；` +
        '或执行 npx playwright install chromium 后设置 WENSHU_CHROMIUM=1 改用内置 Chromium。'
    );
  }
  _contextHeadless = headless;
  return _context;
}

async function newPage(headless) {
  const ctx = await getContext(headless);
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);
  return page;
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
  // 同步尽力关闭；异步 close 交给进程退出
  if (_context) _context.close().catch(() => {});
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// 页面状态判定
// ---------------------------------------------------------------------------
function isLoginPage(url, title) {
  return (url && url.includes(LOGIN_PAGE_MARK)) || (title && /登录|注册/.test(title));
}

async function pageMarkers(page) {
  const text = await page.evaluate(() => (document.body ? document.body.innerText : '')).catch(() => '');
  return {
    text,
    hasCaptcha: /验证码|滑块|拖动.{0,6}(滑块|拼图|验证)|安全验证|人机验证|点选/.test(text),
    hasLoginForm: /扫码登录|支付宝扫码|账号密码登录/.test(text),
  };
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

function needLoginText() {
  return [
    '【需要登录】裁判文书网的检索功能要求登录账号（当前为支付宝扫码登录）。',
    '请先调用 open_login_window 工具：会打开一个可见的 Chrome 窗口，请你在窗口中扫码完成登录（本会话只需一次）。',
    '登录成功后调用 check_session 确认状态，然后重试本查询。',
    `会话保存在本机 ${profileDir()}（含登录 Cookie，请勿共享该目录）。`,
  ].join('\n');
}

function wallText(kind, dumpPath) {
  return [
    `【人机验证】裁判文书网触发了${kind}，按合规策略不自动绕过。`,
    '请调用 open_login_window 打开可见窗口，由你本人完成验证/重新登录后再试。',
    dumpPath ? `现场已保存: ${dumpPath}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

// ---------------------------------------------------------------------------
// 查询执行
// ---------------------------------------------------------------------------

/** 判定当前页面状态：login（跳登录页）/ captcha（人机验证）/ results（正常列表页） */
async function detectState(page) {
  const url = page.url();
  const title = await page.title();
  if (isLoginPage(url, title)) return 'login';
  const markers = await pageMarkers(page);
  if (markers.hasCaptcha) return 'captcha';
  return 'results';
}

/**
 * 执行检索，停在结果页；返回 { state }。
 * 实测（2026-08）：列表页直链带 s21 参数不会触发新查询（服务端会话沿用上一次
 * 检索状态），必须走首页表单（填词 + 点"搜索"）生成 pageId 才真正执行检索。
 * caseType 保留给将来的聚类点选（v1 未应用，见 searchCases 输出说明）。
 */
async function runSearchFlow(page, keyword, caseType) {
  await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await sleep(1500);
  const input = page.locator('input[placeholder*="案由"]').first();
  await input.fill(keyword, { timeout: 10000 });
  await sleep(400);
  await Promise.all([
    page.waitForLoadState('domcontentloaded', { timeout: 45000 }).catch(() => {}),
    page.click('text=搜索'),
  ]);
  await sleep(5000);
  return { state: await detectState(page) };
}

/**
 * 解析结果列表。登录后的 DOM 未公开观察过，采取"docId 锚点"通用识别：
 * 每个结果项都含指向详情页（docId=...）的链接，向上取容器文本解析元数据。
 */
async function parseResultList(page, maxItems) {
  return page.evaluate(
    ({ DOCID_MARK, maxItems }) => {
      const anchors = [...document.querySelectorAll(`a[href*="${DOCID_MARK}"]`)];
      const items = [];
      const seen = new Set();
      for (const a of anchors) {
        const href = a.href;
        const m = href.match(/docId=([^&"'\s]+)/); // docId 可能含 +/= 等字符，吃到 & 为止
        if (!m || seen.has(m[1])) continue;
        seen.add(m[1]);
        let docId = m[1];
        try {
          docId = decodeURIComponent(docId);
        } catch {
          /* 保留原样 */
        }
        // 向上找包含案号特征的容器
        let container = a;
        for (let up = 0; up < 6 && container.parentElement; up++) {
          container = container.parentElement;
          if (/（\d{4}）|案号|法院/.test(container.innerText || '')) break;
        }
        const text = (container.innerText || '').replace(/\s+/g, ' ').trim();
        const ah = (text.match(/（\d{4}）[^\s，。；、]{2,30}?号/) || [null])[0];
        const court = (text.match(/([\u4e00-\u9fa5]{2,30}人民法院)/) || [null])[1];
        const date = (text.match(/(\d{4}[-年]\d{1,2}[-月]\d{1,2}日?)/) || [null])[1];
        items.push({
          docId,
          detailUrl: href,
          title: (a.innerText || a.title || '').trim().slice(0, 120),
          caseNumber: ah,
          court,
          date,
          snippet: text.slice(0, 300),
        });
        if (items.length >= maxItems) break;
      }
      // 结果总数（常见文案："共找到 N 篇文书" 等）
      const bodyText = document.body ? document.body.innerText : '';
      const total = (bodyText.match(/(?:共找到|检索到|符合条件)[^\d]{0,6}([\d,]+)\s*篇?/) || [])[1] || null;
      return { items, total, bodyLen: bodyText.length };
    },
    { DOCID_MARK, maxItems }
  );
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
    // 点开登录弹层（若未自动弹出）
    const loginLink = page.locator('text=登录').first();
    if (await loginLink.count()) {
      await loginLink.click().catch(() => {});
    }
    return (
      '已打开可见的 Chrome 窗口并停在裁判文书网登录页。\n' +
      '请在该窗口中用支付宝扫码完成登录（如触发滑块等验证也请一并完成）。\n' +
      '完成后调用 check_session 确认登录状态；该窗口会保持打开，登录成功后可调用 close_browser 关闭。\n' +
      `会话目录: ${profileDir()}`
    );
  } catch (e) {
    return `打开登录窗口失败: ${e.message}`;
  }
}

async function checkSession(deadline) {
  let page;
  try {
    page = await newPage(true);
    // 硬判据：未登录访问频道页会被 302 到登录页
    await page.goto(`${LIST_URL}?s8=03`, {
      waitUntil: 'domcontentloaded',
      timeout: Math.min(45000, deadline - Date.now() - 2000),
    });
    await sleep(2500);
    const loggedIn = !isLoginPage(page.url(), await page.title());
    await page.close().catch(() => {});
    if (loggedIn) {
      return '当前处于已登录状态（频道页可正常访问）。可以使用 search_cases / get_case_detail。';
    }
    return (
      '当前未登录（访问频道页被重定向到登录页）。\n' +
      '请运行 npm run connector:wenshu:login（或调用 open_login_window），' +
      '用支付宝扫码并在手机上确认登录后重试。'
    );
  } catch (e) {
    if (page) await page.close().catch(() => {});
    return `会话检查失败: ${e.message}`;
  }
}

async function searchCases(args, deadline) {
  const keyword = String(args.keyword || '').trim();
  if (!keyword && !args.causeOfAction && !args.courtName) {
    return { text: '请至少提供 keyword（关键词/案号）、causeOfAction（案由）或 courtName（法院）之一。', cacheable: false };
  }
  const query = keyword || args.causeOfAction || args.courtName;
  // v1 透明说明：案件类型/层级/日期等筛选依赖结果页聚类点选，当前版本未应用
  const filterNote =
    args.caseType || args.courtLevel || args.dateRange
      ? '（注意: 案件类型/法院层级/日期范围筛选 v1 未应用，已按关键词检索，可在结果页自行点选左侧聚类）'
      : '';
  const maxItems = Math.min(15, Math.max(1, parseInt(args.pageSize, 10) || 10));

  let page;
  try {
    page = await newPage(true);
    const flow = await runSearchFlow(page, query, args.caseType);
    if (flow.state === 'login') {
      await page.close().catch(() => {});
      return { text: needLoginText(), cacheable: false };
    }
    if (flow.state === 'captcha') {
      const dump = await dumpDebug(page, 'captcha');
      await page.close().catch(() => {});
      return { text: wallText('人机验证（滑块/验证码）', dump), cacheable: false };
    }

    const parsed = await parseResultList(page, maxItems);
    if (parsed.items.length === 0) {
      const dump = await dumpDebug(page, 'search-empty');
      await page.close().catch(() => {});
      return {
        text:
          `未在裁判文书网找到「${query}」的结果，或页面结构未识别（bodyLen=${parsed.bodyLen}）。\n` +
          `若为结构变化，调试文件已保存: ${dump}\n请将该文件发回以适配解析规则。`,
        cacheable: false,
      };
    }

    if (parsed.items.length && parsed.items[0].detailUrl) {
      // 学习详情页 URL 模板（供仅凭 docId 的 get_case_detail 复用）
      _detailUrlTpl = parsed.items[0].detailUrl.replace(/docId=[^&"'\s]+/, 'docId={docId}');
    }

    const blocks = parsed.items.map((it, i) =>
      [
        `${i + 1}. ${it.title || '（无标题）'}`,
        `   案号: ${it.caseNumber || '未知'} | 法院: ${it.court || '未知'} | 裁判日期: ${it.date || '未知'}`,
        `   docId: ${it.docId}（get_case_detail 可按 docId 取全文）`,
        `   链接: ${it.detailUrl}`,
        it.snippet ? `   摘要: ${it.snippet.slice(0, 200)}` : null,
      ]
        .filter(Boolean)
        .join('\n')
    );
    const header =
      `裁判文书网检索「${query}」${args.caseType ? `（${args.caseType}案件）` : ''}: ` +
      `${parsed.total ? `共 ${parsed.total} 篇，` : ''}本页解析到 ${parsed.items.length} 条。${filterNote}`;
    await page.close().catch(() => {});
    return { text: header + '\n\n' + blocks.join('\n\n'), cacheable: true };
  } catch (err) {
    console.error('[wenshu search_cases] error:', (err && err.stack) || err);
    if (page) await page.close().catch(() => {});
    return { text: `裁判文书网检索失败: ${(err && err.message) || err}`, cacheable: false };
  }
}

// 详情页 URL 模板：优先用结果列表锚点中学到的真实格式，否则回退到历史已知格式
let _detailUrlTpl = null;
function detailUrlFor(docId) {
  const tpl =
    _detailUrlTpl ||
    'https://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId={docId}';
  return tpl.replace('{docId}', encodeURIComponent(docId));
}

async function getCaseDetail(args, deadline) {
  const docId = String(args.docId || '').trim();
  const caseNumber = String(args.caseNumber || '').trim();
  if (!docId && !caseNumber) {
    return { text: '请提供 docId（search_cases 返回）或 caseNumber（案号）之一。', cacheable: false };
  }

  let page;
  try {
    page = await newPage(true);

    let targetUrl = null;
    if (docId) {
      targetUrl = detailUrlFor(docId);
    } else {
      // 先按案号检索，取第一条案号精确匹配的结果
      const flow = await runSearchFlow(page, caseNumber, null);
      if (flow.state === 'login') { await page.close().catch(() => {}); return { text: needLoginText(), cacheable: false }; }
      if (flow.state === 'captcha') {
        const dump = await dumpDebug(page, 'captcha-detail');
        await page.close().catch(() => {});
        return { text: wallText('人机验证（滑块/验证码）', dump), cacheable: false };
      }
      const parsed = await parseResultList(page, 10);
      const hit = parsed.items.find((it) => it.caseNumber === caseNumber) || parsed.items[0];
      if (!hit) {
        const dump = await dumpDebug(page, 'detail-notfound');
        await page.close().catch(() => {});
        return { text: `未找到案号「${caseNumber}」对应的文书。调试文件: ${dump}`, cacheable: true };
      }
      targetUrl = hit.detailUrl;
    }

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: Math.min(45000, deadline - Date.now() - 2000),
    });
    await sleep(2500);

    const url = page.url();
    const title = await page.title();
    if (isLoginPage(url, title)) { await page.close().catch(() => {}); return { text: needLoginText(), cacheable: false }; }
    const markers = await pageMarkers(page);
    if (markers.hasCaptcha) {
      const dump = await dumpDebug(page, 'captcha-detail2');
      await page.close().catch(() => {});
      return { text: wallText('人机验证（滑块/验证码）', dump), cacheable: false };
    }

    const detail = await (async () => {
      // 正文经 XHR 异步渲染：等 .PDF_box 出现实质内容（实测 DOM 结构 2026-08）
      await page
        .waitForFunction(
          () => {
            const el = document.querySelector('.PDF_box');
            return el && (el.innerText || '').trim().length > 100;
          },
          { timeout: 15000 }
        )
        .catch(() => {});
      return page.evaluate(() => {
        const q = (sel) => {
          const el = document.querySelector(sel);
          return el ? (el.innerText || '').trim() : '';
        };
        const meta = {};
        document.querySelectorAll('td').forEach((td) => {
          const label = (td.innerText || '').replace(/\s+/g, '');
          const valEl = td.nextElementSibling;
          if (!valEl) return;
          // 值优先取 span[title]（单元格里常带"点击了解更多"等链接文本）；
          // 但 title 属性可能本身含破损 HTML，含尖括号则弃用
          const span = valEl.querySelector ? valEl.querySelector('span[title]') : null;
          const spanTitle = span ? span.getAttribute('title') : null;
          let val = spanTitle && !/[<>]/.test(spanTitle) ? spanTitle : '';
          if (!val) val = (valEl.innerText || '').replace(/\s+/g, ' ').trim();
          val = val.replace('点击了解更多', '').trim();
          // 该站偶发把 title 属性泄漏为文本（形如 A">A），去重
          const leak = val.match(/^(.{2,60}?)">(.+)$/);
          if (leak && leak[2].startsWith(leak[1])) val = leak[1];
          val = val.replace(/<[^>]*>/g, '').trim();
          if (['案由', '案号', '发布日期', '浏览次数', '审理法院', '裁判日期'].includes(label) && val && !meta[label]) {
            meta[label] = val.slice(0, 120);
          }
        });
        // .PDF_pox 是正文内层容器（不含字段表），.PDF_box 兜底
        return { title: q('.PDF_title'), content: q('.PDF_pox') || q('.PDF_box'), meta };
      });
    })();

    if (!detail.content || detail.content.length < 200) {
      const dump = await dumpDebug(page, 'detail-parse');
      await page.close().catch(() => {});
      return {
        text: `未能从详情页提取正文（${targetUrl}）。调试文件: ${dump}\n请发回以适配解析规则。`,
        cacheable: false,
      };
    }

    const content = detail.content;
    const truncated = content.length > DETAIL_MAX_CHARS;
    const metaLine = Object.entries(detail.meta || {})
      .map(([k, v]) => `${k}: ${v}`)
      .join(' | ');
    const text =
      `标题: ${detail.title || '未知'}\n` +
      (metaLine ? metaLine + '\n' : '') +
      `链接: ${page.url()}\n\n正文:\n` +
      (truncated ? content.slice(0, DETAIL_MAX_CHARS) + `\n……（已截断，全文约 ${content.length} 字）` : content);
    await page.close().catch(() => {});
    return { text, cacheable: true };
  } catch (err) {
    console.error('[wenshu get_case_detail] error:', (err && err.stack) || err);
    if (page) await page.close().catch(() => {});
    return { text: `裁判文书网详情获取失败: ${(err && err.message) || err}`, cacheable: false };
  }
}

// ---------------------------------------------------------------------------
// Tool schemas（connector.json 同步更新）
// ---------------------------------------------------------------------------
const TOOLS = [
  {
    name: 'open_login_window',
    description:
      '打开可见的 Chrome 窗口并停在裁判文书网登录页，由用户本人扫码登录/完成人机验证（本站检索需登录；合规设计不自动绕过任何验证）。会话保存在本机持久化 profile，后续查询自动复用。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'check_session',
    description: '检查裁判文书网当前登录状态（基于本机持久化浏览器会话）。',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'search_cases',
    description:
      '检索裁判文书网。需先登录（见 open_login_window）。v1 为关键词检索（案由、法院、当事人、律师、案号均可）；案件类型/法院层级/日期范围等聚类筛选暂未应用（结果页左侧聚类待适配）。',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', description: '关键词（案由、法院、当事人、律师、案号均可）' },
        causeOfAction: { type: 'string', description: '案由（如：买卖合同纠纷）；无 keyword 时作为查询词' },
        courtName: { type: 'string', description: '法院名称；无 keyword 时作为查询词' },
        caseType: {
          type: 'string',
          enum: ['刑事', '民事', '行政', '赔偿', '执行', '其他'],
          description: '案件类型（v1 暂未应用，占位）',
        },
        pageSize: { type: 'integer', default: 10, description: '解析条数上限（最大 15）' },
      },
      required: [],
    },
  },
  {
    name: 'get_case_detail',
    description: '获取裁判文书全文。可按 docId（search_cases 返回）或案号（自动检索后取精确匹配项）。',
    inputSchema: {
      type: 'object',
      properties: {
        docId: { type: 'string', description: '文书 docId（search_cases 返回）' },
        caseNumber: { type: 'string', description: '案号（如：（2026）京01民初1234号）' },
      },
      required: [],
    },
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
  const deadline = Date.now() + BUDGET_MS;
  console.error(`[wenshu] tools/call ${name} args=${JSON.stringify(args).slice(0, 300)}`);

  switch (name) {
    case 'open_login_window':
      return enqueue(() => openLoginWindow());
    case 'check_session':
      return enqueue(() => checkSession(deadline));
    case 'search_cases':
      return cache.withCache(SERVER, name, args, () => enqueue(() => searchCases(args, deadline)));
    case 'get_case_detail':
      return cache.withCache(SERVER, name, args, () => enqueue(() => getCaseDetail(args, deadline)));
    case 'close_browser':
      return enqueue(async () => {
        await closeBrowser();
        return '浏览器已关闭（登录会话仍保存在本机 profile 中）。';
      });
    default:
      throw new Error(
        `未知工具: ${name}（可用: open_login_window, check_session, search_cases, get_case_detail, close_browser）`
      );
  }
}

serve({ serverInfo: SERVER_INFO, tools: TOOLS, callTool });
console.error(`[wenshu] connector ready (browser=chrome channel, profile=${profileDir()})`);
