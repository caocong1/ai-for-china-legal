'use strict';
// yuandian MCP connector — 元典开放平台（open.chineselaw.com）法律法规/案例检索 + 法律幻觉校验.
// Launched as `node index.js`; line-delimited JSON-RPC over stdio.
// Node 18+ built-ins only, zero npm dependencies. ALL logging -> stderr.
//
// API Key 解析顺序（"调用时询问用户并临时存下来"机制）：
//   1. 工具调用的 apiKey 参数（用户提供后立即临时保存，后续调用可省略）
//   2. 环境变量 YUANDIAN_API_KEY
//   3. 临时密钥文件（os.tmpdir()/yuandian-open-platform.key，0600 权限）
// 三者都没有时，工具返回"需要 API Key"的提示文本，由技能层向用户索取。

const path = require('path');
const fs = require('fs');
const os = require('os');

// Fixtures mode for tests: YUANDIAN_FIXTURES=1 -> read canned responses from
// ./fixtures instead of the network (FIXTURES_DIR may still override).
if (process.env.YUANDIAN_FIXTURES && !process.env.FIXTURES_DIR) {
  process.env.FIXTURES_DIR = path.join(__dirname, 'fixtures');
}

const { serve } = require('../_lib/rpc');
const { DegradedError, fetchJson } = require('../_lib/http');
const cache = require('../_lib/cache');
const { TIER, METHOD, VALIDITY, provenanceBlock } = require('../_lib/provenance');
const { getSource } = require('../_lib/sources');

const SERVER = 'yuandian';
const SERVER_INFO = { name: 'yuandian', version: '1.0.0' };
// Each tools/call must finish well under the app's 60s timeout.
const BUDGET_MS = 45000;
const DETAIL_MAX_CHARS = 8000;
const SNIPPET_MAX_CHARS = 600;
const SITE_ORIGIN = 'https://ydzk.chineselaw.com'; // 元典智库前端（详情页相对路径的 host）

const BASE_URL = (process.env.YUANDIAN_BASE_URL || 'https://open.chineselaw.com').replace(/\/+$/, '');

const TIMEOUT_MS = (() => {
  const v = parseInt(process.env.YUANDIAN_TIMEOUT_MS || '', 10);
  return Number.isFinite(v) && v > 0 ? v : 30000;
})();

// ---------------------------------------------------------------------------
// API Key 管理：参数 > 环境变量 > 临时文件
// ---------------------------------------------------------------------------
function keyFilePath() {
  return path.join(os.tmpdir(), 'yuandian-open-platform.key');
}

function readStoredKey() {
  try {
    const k = fs.readFileSync(keyFilePath(), 'utf8').trim();
    return k || null;
  } catch {
    return null;
  }
}

function persistKey(key) {
  try {
    fs.writeFileSync(keyFilePath(), key, { mode: 0o600 });
    fs.chmodSync(keyFilePath(), 0o600);
    console.error(`[yuandian] API Key 已临时保存到 ${keyFilePath()}（0600）`);
  } catch (e) {
    console.error('[yuandian] API Key 临时保存失败:', e.message);
  }
}

function clearStoredKey() {
  try {
    fs.unlinkSync(keyFilePath());
  } catch {
    /* 不存在则忽略 */
  }
}

/**
 * @returns {{key:string|null, source:string|null}} source: arg|env|file
 */
function resolveApiKey(args) {
  const fromArg = args && typeof args.apiKey === 'string' ? args.apiKey.trim() : '';
  if (fromArg) {
    persistKey(fromArg);
    return { key: fromArg, source: 'arg' };
  }
  const fromEnv = (process.env.YUANDIAN_API_KEY || '').trim();
  if (fromEnv) return { key: fromEnv, source: 'env' };
  const fromFile = readStoredKey();
  if (fromFile) return { key: fromFile, source: 'file' };
  return { key: null, source: null };
}

function needKeyText() {
  return [
    '【需要元典 API Key】元典开放平台（open.chineselaw.com）的接口需要 API Key 才能调用。',
    '请向用户询问其元典开放平台 API Key（在 https://open.chineselaw.com 注册后于控制台获取），',
    '然后重新调用本工具，并在 apiKey 参数中带上该 Key。',
    `连接器收到后会将 Key 临时保存到 ${keyFilePath()}（仅当前用户可读），后续调用无需重复提供；`,
    '系统临时目录被清理后需重新提供。长期使用建议在 MCP 配置中设置环境变量 YUANDIAN_API_KEY。',
  ].join('\n');
}

function invalidKeyText() {
  clearStoredKey();
  return [
    '【API Key 无效】元典开放平台返回鉴权失败（401），当前 API Key 无效或已过期。',
    '已清除临时保存的 Key（如有）；若 Key 来自环境变量 YUANDIAN_API_KEY，请检查其配置。',
    '请重新向用户索取有效的元典 API Key，并通过 apiKey 参数传入。',
  ].join('\n');
}

/** 403 = 账号权限/套餐问题（如 VIP 专属接口），Key 本身有效，不清除。 */
function permissionDeniedText(detail) {
  return [
    `【权限受限】元典开放平台返回 403：${detail || '当前账号无权访问该接口'}。`,
    'API Key 本身有效，但该接口需要更高权限（如 VIP 套餐）。建议换用其他工具，或升级元典账号后重试。',
  ].join('\n');
}

/** 从 401/403 响应体片段中提取 message/error 字段。 */
function extractApiMessage(bodySnippet) {
  if (!bodySnippet) return null;
  try {
    const j = JSON.parse(bodySnippet);
    return j.message || j.error || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// HTTP  helpers
// ---------------------------------------------------------------------------
function authHeaders(key) {
  return {
    'X-API-Key': key,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

/** POST /open/{routeKey}，body 为 JSON。 */
async function ydPost(routeKey, body, key, deadline, timeoutMs) {
  return fetchJson(`${BASE_URL}/open/${routeKey}`, {
    method: 'POST',
    headers: authHeaders(key),
    body: body || {},
    deadline,
    timeoutMs: timeoutMs || TIMEOUT_MS,
    rps: 5,
  });
}

/** GET /open/{routeKey}，params 进 query string。 */
async function ydGet(routeKey, params, key, deadline) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params || {})) {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  }
  const url = `${BASE_URL}/open/${routeKey}?${qs.toString()}`;
  return fetchJson(url, { headers: authHeaders(key), deadline, timeoutMs: TIMEOUT_MS, rps: 5 });
}

/**
 * 业务错误判定：HTTP 200 也可能带业务失败码。
 * 向量检索类接口用 msg 字段，其余用 message。
 * @returns {string|null} 错误描述；null 表示成功
 */
function businessError(body) {
  if (!body || typeof body !== 'object') return '返回体不是 JSON 对象';
  if (body.success === false) {
    return `${body.error_code || 'ERROR'}: ${body.message || '未知错误'}`;
  }
  const code = body.code;
  if (code === undefined || code === null) return null; // hall_detect 成功结构无 code
  if (Number(code) >= 200 && Number(code) < 300) return null;
  const msg = body.message || body.msg || '未知错误';
  if (Number(code) === 401) return 'AUTH';
  return `code ${code}: ${msg}`;
}

function degradeText(toolHint, err) {
  const reason = (err && err.message) || String(err);
  return [
    `元典开放平台（open.chineselaw.com）当前不可达或调用失败，未能完成${toolHint}。`,
    `降级原因: ${reason}`,
    '建议：检查网络与 API Key 后重试；或改用 search_laws / get_law_detail（law-database 连接器，如可用）、WebSearch 定位权威来源。',
    '引用任何非全文来源时请标注 [搜索摘要-未抓全文]。',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// 格式化 helpers
// ---------------------------------------------------------------------------
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

function stripTags(s) {
  return String(s == null ? '' : s)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function snippet(s, max) {
  const t = stripTags(s).replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  const limit = max || SNIPPET_MAX_CHARS;
  return t.length > limit ? t.slice(0, limit) + '……' : t;
}

function absUrl(u) {
  if (!u) return null;
  const s = String(u);
  if (/^https?:\/\//.test(s)) return s;
  if (s.startsWith('/')) return SITE_ORIGIN + s;
  return s;
}

/** 时间戳/日期值 -> yyyy-MM-dd（尽力而为；无法识别则原样返回）。 */
function fmtDate(v) {
  if (v === undefined || v === null || v === '') return null;
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v);
  if (n > 1e12) return new Date(n).toISOString().slice(0, 10); // epoch ms
  if (n > 1e9 && n < 1e10) return new Date(n * 1000).toISOString().slice(0, 10); // epoch s
  if (/^\d{8}$/.test(String(v))) {
    const s = String(v);
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  }
  return String(v);
}

/** 元典 sxx 文案 -> provenance 时效状态。 */
function validityOf(sxx) {
  const s = String(sxx || '');
  if (s.includes('现行有效')) return VALIDITY.ACTIVE;
  if (s.includes('已被修改') || s.includes('已修改')) return VALIDITY.MODIFIED;
  if (s.includes('失效') || s.includes('废止')) return VALIDITY.REPEALED;
  return VALIDITY.UNKNOWN;
}

const ARTICLE_SPLIT_RE = /(?=第[一二三四五六七八九十百千零〇0-9]+条)/;

/** 法规全文截断：按"条"为界截断，保留条目完整性。 */
function truncateByArticles(fullText, maxChars) {
  const text = String(fullText || '');
  if (text.length <= maxChars) return text;
  const parts = text.split(ARTICLE_SPLIT_RE);
  if (parts.length <= 1) {
    return text.slice(0, maxChars) + `\n……（已按字数截断，全文约 ${text.length} 字，完整文本见上方链接）`;
  }
  let used = parts[0].length;
  const kept = [];
  for (const a of parts.slice(1)) {
    if (used + a.length > maxChars) break;
    kept.push(a.trimEnd());
    used += a.length;
  }
  const total = parts.length - 1;
  return (
    parts[0] +
    kept.join('\n') +
    `\n……（已截断：共 ${total} 条，以上显示前 ${kept.length} 条，全文约 ${text.length} 字，完整文本见上方链接）`
  );
}

function listProvenanceHeader(tier) {
  const src = getSource('yuandian');
  return `来源层级: ${tier} | 渠道等级: ${src.channel_level} | 获取方式: ${METHOD.YUANDIAN_API} | 数据源: ${src.name}`;
}

// ---------------------------------------------------------------------------
// Tool schemas — VERBATIM from connectors/yuandian/connector.json "tools".
// ---------------------------------------------------------------------------
const TOOLS = [
  {
    name: 'search_laws',
    description:
      '检索法规列表（元典智库）。支持关键词、法规名称、时效性、地域、效力级别、发布部门、发布/实施日期过滤。返回法规摘要列表；全文请用 get_law_detail。',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', description: '法规内容关键词，空格分词' },
        searchMode: { type: 'string', enum: ['AND', 'OR'], description: '关键词拼接模式，默认 AND' },
        lawName: { type: 'string', description: '法规名称过滤（空格拆分后标题需全部命中）' },
        validity: {
          type: 'string',
          description: '时效性过滤，可选值：现行有效、失效、已被修改、部分失效、尚未生效（空格分隔多值）',
        },
        region: { type: 'string', description: '地域过滤，如：中央、北京、广东（空格分隔多值）' },
        effectLevel: {
          type: 'string',
          description: '效力级别过滤，如：法律、司法解释、行政法规、部门规章、地方性法规（空格分隔多值）',
        },
        issuingAuthority: { type: 'string', description: '发布部门过滤（子串命中）' },
        publishStart: { type: 'string', format: 'date', description: '发布日期起 yyyy-MM-dd' },
        publishEnd: { type: 'string', format: 'date', description: '发布日期止 yyyy-MM-dd' },
        effectiveStart: { type: 'string', format: 'date', description: '实施日期起 yyyy-MM-dd' },
        effectiveEnd: { type: 'string', format: 'date', description: '实施日期止 yyyy-MM-dd' },
        topK: { type: 'integer', default: 10, description: '返回条数上限，最大 50' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: [],
    },
  },
  {
    name: 'search_law_articles',
    description: '按关键词检索法条（条文级）。返回法条内容、条号、所属法规及时效性。',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', description: '法条内容关键词（必填），空格分词' },
        searchMode: { type: 'string', enum: ['AND', 'OR'], description: '关键词拼接模式，默认 AND' },
        lawName: { type: 'string', description: '所属法规名称过滤' },
        validity: { type: 'string', description: '时效性过滤（空格分隔多值）' },
        region: { type: 'string', description: '地域过滤（空格分隔多值）' },
        effectLevel: { type: 'string', description: '效力级别过滤（空格分隔多值）' },
        issuingAuthority: { type: 'string', description: '发布部门过滤' },
        publishStart: { type: 'string', format: 'date', description: '发布日期起 yyyy-MM-dd' },
        publishEnd: { type: 'string', format: 'date', description: '发布日期止 yyyy-MM-dd' },
        effectiveStart: { type: 'string', format: 'date', description: '实施日期起 yyyy-MM-dd' },
        effectiveEnd: { type: 'string', format: 'date', description: '实施日期止 yyyy-MM-dd' },
        topK: { type: 'integer', default: 10, description: '返回条数上限，最大 50' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: ['keyword'],
    },
  },
  {
    name: 'semantic_search_laws',
    description: '用自然语言做法条级语义检索（向量检索）。适合用语义化的问题描述找适用法条。',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '自然语言检索问题（必填）' },
        rewrite: { type: 'boolean', default: true, description: '是否对查询做改写' },
        validity: { type: 'array', items: { type: 'string' }, description: '时效性过滤数组，如 ["现行有效"]' },
        effectLevel: {
          type: 'array',
          items: { type: 'string' },
          description: '一级效力级别数组，如 ["法律","司法解释"]',
        },
        effectiveStart: { type: 'string', format: 'date', description: '实施日期起 yyyy-MM-dd' },
        effectiveEnd: { type: 'string', format: 'date', description: '实施日期止 yyyy-MM-dd' },
        returnNum: { type: 'integer', default: 10, description: '返回法条数量，最大 45' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_law_detail',
    description: '按法规 ID 或法规名称获取法规详情与全文（可指定参考日期定位历史版本）。',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '法规 ID（search_laws 返回）；与 lawName 至少传一个' },
        lawName: { type: 'string', description: '法规名称，如「中华人民共和国民法典」' },
        referDate: {
          type: 'string',
          format: 'date',
          description: '参考日期 yyyy-MM-dd，定位当时生效版本；不传返回当前有效版本',
        },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_article_detail',
    description: '查询单条法条详情（按法条 ID，或法规名称+条号，如「第一百八十八条」）。',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '法条文档 ID；与 lawName+articleNumber 二选一' },
        lawName: { type: 'string', description: '法规名称' },
        articleNumber: { type: 'string', description: '法条号（中文格式，如「第一百八十八条」）' },
        referDate: { type: 'string', format: 'date', description: '参考日期 yyyy-MM-dd' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: [],
    },
  },
  {
    name: 'search_cases',
    description:
      '检索普通裁判案例列表。支持案号、标题、涉诉企业、案由、法院、地域、文书种类、案件类别、裁判日期、全文关键词、援引法条等过滤。返回摘要片段；详情请用 get_case_detail。',
    inputSchema: {
      type: 'object',
      properties: {
        caseNumber: { type: 'string', description: '案号' },
        title: { type: 'string', description: '标题检索（空格拆分后标题需全部命中）' },
        enterprise: { type: 'string', description: '涉诉企业（企业当事人名称子串）' },
        causeOfAction: { type: 'array', items: { type: 'string' }, description: '案由数组，如 ["买卖合同纠纷"]，或关系' },
        courts: { type: 'array', items: { type: 'string' }, description: '经办法院数组，或关系' },
        provinces: { type: 'array', items: { type: 'string' }, description: '省级行政区数组，如 ["北京","最高"]' },
        docTypes: {
          type: 'array',
          items: { type: 'string' },
          description: '文书种类数组：判决书、裁定书、调解书、决定书',
        },
        caseType: { type: 'string', description: '案件类别：刑事案件、民事案件、行政案件、执行案件等' },
        decisionStart: { type: 'string', format: 'date', description: '裁判/结案日期起 yyyy-MM-dd' },
        decisionEnd: { type: 'string', format: 'date', description: '裁判/结案日期止 yyyy-MM-dd' },
        fulltext: { type: 'string', description: '全文关键词（空格分词）' },
        analysis: { type: 'string', description: '分析过程关键词（空格分词）' },
        searchMode: { type: 'string', enum: ['AND', 'OR'], description: '关键词拼接模式，默认 AND' },
        citedArticles: {
          type: 'array',
          items: { type: 'string' },
          description: '援引法条数组，形如「中华人民共和国刑法第二条」（条号为中文格式）',
        },
        topK: { type: 'integer', default: 10, description: '返回条数上限，最大 50' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: [],
    },
  },
  {
    name: 'search_authoritative_cases',
    description:
      '检索权威/典型/参考类案例（指导性案例、公报案例、典型案例等）。支持案号、标题、案由、法院、来源、地域、文书种类、裁判日期、全文关键词过滤。',
    inputSchema: {
      type: 'object',
      properties: {
        caseNumber: { type: 'string', description: '案号' },
        title: { type: 'string', description: '标题检索' },
        causeOfAction: { type: 'array', items: { type: 'string' }, description: '案由数组，或关系' },
        courts: { type: 'array', items: { type: 'string' }, description: '经办法院数组，或关系' },
        sources: {
          type: 'array',
          items: { type: 'string' },
          description: '案例来源数组：典型案例、参考案例、公报案例、解纷案例、参阅案例、刑事参考案例、指导性案例、检指导案例',
        },
        provinces: { type: 'array', items: { type: 'string' }, description: '省级行政区数组' },
        docTypes: {
          type: 'array',
          items: { type: 'string' },
          description: '文书种类数组：判决书、裁定书、调解书、决定书',
        },
        caseType: { type: 'string', description: '案件类别' },
        decisionStart: { type: 'string', format: 'date', description: '裁判日期起 yyyy-MM-dd' },
        decisionEnd: { type: 'string', format: 'date', description: '裁判日期止 yyyy-MM-dd' },
        fulltext: { type: 'string', description: '全文关键词（空格分词）' },
        searchMode: { type: 'string', enum: ['AND', 'OR'], description: '关键词拼接模式，默认 AND' },
        topK: { type: 'integer', default: 10, description: '返回条数上限，最大 50' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: [],
    },
  },
  {
    name: 'semantic_search_cases',
    description:
      '用自然语言在案例库中做语义相似度检索，默认覆盖普通+权威案例，返回整理后的案例内容及相似度评分。',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '自然语言检索问题（必填）' },
        rewrite: { type: 'boolean', default: true, description: '是否对查询做改写' },
        caseType: { type: 'string', description: '案件类别：刑事案件、民事案件、行政案件、执行案件等' },
        causeOfAction: { type: 'array', items: { type: 'string' }, description: '案由数组（完整案由名称），或关系' },
        docTypes: { type: 'array', items: { type: 'string' }, description: '文书种类数组' },
        decisionStart: { type: 'string', format: 'date', description: '结案日期起 yyyy-MM-dd' },
        decisionEnd: { type: 'string', format: 'date', description: '结案日期止 yyyy-MM-dd' },
        authoritativeOnly: { type: 'boolean', default: false, description: 'true 时仅检索权威案例库' },
        courts: { type: 'array', items: { type: 'string' }, description: '法院数组（完整法院名称），或关系' },
        sources: { type: 'array', items: { type: 'string' }, description: '权威案例来源数组（仅对权威案例生效）' },
        courtLevel: { type: 'string', enum: ['基层', '中级', '高级', '最高'], description: '法院层级' },
        province: { type: 'string', description: '省份，如：北京' },
        returnNum: { type: 'integer', default: 10, description: '返回案例数量，最大 45' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_case_detail',
    description: '按案例 ID 或案号查询案例详情（普通案例 ptal / 权威案例 qwal）。',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '案例 ID（search_cases 返回）；与 caseNumber 至少传一个' },
        caseNumber: { type: 'string', description: '案号' },
        type: { type: 'string', enum: ['ptal', 'qwal'], description: 'ptal=普通案例，qwal=权威案例；不传则不筛选' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: [],
    },
  },
  {
    name: 'verify_legal_citations',
    description:
      '法律幻觉校验：抽取文本中引用的法规/法条和案号，与元典智库比对语义一致性并核验法规时效性，输出一致/不一致/未命中判定及权威原文。用于复核 AI 起草的法律文书引用。平均耗时约 15 秒。',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: '待校验的原文文本（必填），如包含法律引用的法律文书段落' },
        apiKey: {
          type: 'string',
          description: '元典 API Key；仅在连接器提示需要时由用户提供，传入后临时保存，之后可省略',
        },
      },
      required: ['text'],
    },
  },
];

// ---------------------------------------------------------------------------
// 法规类工具
// ---------------------------------------------------------------------------
function lawListItem(it, i) {
  const lines = [
    `${i + 1}. 《${stripTags(it.fgmc || it.title)}》`,
    `   效力级别: ${it.xljb_1 || '未知'}${it.xljb_2 ? '（' + it.xljb_2 + '）' : ''} | 时效性: ${it.sxx || '未知'}`,
    `   发布部门: ${it.fbbm || '未知'}${it.fwzh ? ' | 发文字号: ' + it.fwzh : ''}`,
    `   发布日期: ${fmtDate(it.fbrq) || '未知'} | 实施日期: ${fmtDate(it.ssrq) || '未知'} | 地域: ${it.dy || '未知'}`,
    `   法规ID: ${it.id}（用 get_law_detail 获取全文）`,
  ];
  const url = absUrl(it.url);
  if (url) lines.push(`   链接: ${url}`);
  if (it.content) lines.push(`   命中片段: ${snippet(it.content, 300)}`);
  return lines.join('\n');
}

async function searchLaws(args, key, deadline) {
  const body = {
    keyword: args.keyword || undefined,
    search_mode: args.searchMode || undefined,
    fgmc: args.lawName || undefined,
    sxx: args.validity || undefined,
    dy: args.region || undefined,
    xljb_1: args.effectLevel || undefined,
    fbbm: args.issuingAuthority || undefined,
    fbrq_start: args.publishStart || undefined,
    fbrq_end: args.publishEnd || undefined,
    ssrq_start: args.effectiveStart || undefined,
    ssrq_end: args.effectiveEnd || undefined,
    top_k: clamp(parseInt(args.topK, 10) || 10, 1, 50),
  };
  // 请求体不能为空：至少要有一个检索字段
  const hasCriterion = Object.entries(body).some(([k, v]) => k !== 'top_k' && v !== undefined);
  if (!hasCriterion) {
    return {
      text: '请至少提供一个检索条件（keyword / lawName / validity / region / effectLevel / issuingAuthority / 日期范围）。',
      cacheable: false,
    };
  }

  const resp = await ydPost('rh_fg_search', body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典法规检索失败（${berr}）`, cacheable: false };

  const rows = Array.isArray(resp.data) ? resp.data : [];
  if (rows.length === 0) {
    return {
      text: `元典智库未找到匹配法规（${resp.message || '未查询到相关内容'}）。可调整关键词或过滤条件，或改用 semantic_search_laws 语义检索。`,
      cacheable: true,
    };
  }

  const header =
    `元典智库法规检索：共命中 ${rows.length} 条（本页返回 ${rows.length} 条）。\n` +
    listProvenanceHeader(TIER.L1_REGULATION);
  return { text: header + '\n\n' + rows.map(lawListItem).join('\n\n'), cacheable: true };
}

async function searchLawArticles(args, key, deadline) {
  const keyword = String(args.keyword || '').trim();
  if (!keyword) return { text: '请提供 keyword 参数（法条内容关键词）。', cacheable: false };

  const body = {
    keyword,
    search_mode: args.searchMode || undefined,
    fgmc: args.lawName || undefined,
    sxx: args.validity || undefined,
    dy: args.region || undefined,
    xljb_1: args.effectLevel || undefined,
    fbbm: args.issuingAuthority || undefined,
    fbrq_start: args.publishStart || undefined,
    fbrq_end: args.publishEnd || undefined,
    ssrq_start: args.effectiveStart || undefined,
    ssrq_end: args.effectiveEnd || undefined,
    top_k: clamp(parseInt(args.topK, 10) || 10, 1, 50),
  };

  const resp = await ydPost('rh_ft_search', body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典法条检索失败（${berr}）`, cacheable: false };

  const rows = Array.isArray(resp.data) ? resp.data : [];
  if (rows.length === 0) {
    return {
      text: `元典智库未找到包含「${keyword}」的法条（${resp.message || '未查询到相关内容'}）。`,
      cacheable: true,
    };
  }

  const blocks = rows.map((it, i) =>
    [
      `${i + 1}. 《${stripTags(it.fgmc)}》${it.ft_num || ''}`,
      `   效力级别: ${it.xljb_1 || '未知'} | 时效性: ${it.sxx || '未知'} | 实施日期: ${fmtDate(it.ssrq) || '未知'}`,
      `   法条ID: ${it.id} | 所属法规ID: ${it.fgid}（用 get_article_detail / get_law_detail 获取详情）`,
      absUrl(it.url) ? `   链接: ${absUrl(it.url)}` : null,
      `   内容: ${snippet(it.content)}`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  const header =
    `元典智库法条检索「${keyword}」：返回 ${rows.length} 条。\n` + listProvenanceHeader(TIER.L1_REGULATION);
  return { text: header + '\n\n' + blocks.join('\n\n'), cacheable: true };
}

async function semanticSearchLaws(args, key, deadline) {
  const query = String(args.query || '').trim();
  if (!query) return { text: '请提供 query 参数（自然语言检索问题）。', cacheable: false };

  const filter = {};
  if (Array.isArray(args.validity) && args.validity.length) filter.sxx = args.validity;
  if (Array.isArray(args.effectLevel) && args.effectLevel.length) filter.effect1 = args.effectLevel;
  if (args.effectiveStart) filter.law_start = args.effectiveStart;
  if (args.effectiveEnd) filter.law_end = args.effectiveEnd;

  const body = {
    query,
    rewrite_flag: args.rewrite !== false,
    fatiao_filter: Object.keys(filter).length ? filter : undefined,
    return_num: clamp(parseInt(args.returnNum, 10) || 10, 1, 45),
  };

  const resp = await ydPost('law_vector_search', body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典法条语义检索失败（${berr}）`, cacheable: false };

  const rows = (resp.extra && Array.isArray(resp.extra.fatiao) && resp.extra.fatiao) || [];
  if (rows.length === 0) {
    return { text: `元典智库语义检索未找到相关法条（query: 「${query}」）。`, cacheable: true };
  }

  const blocks = rows.map((it, i) => {
    const fg = Array.isArray(it.fgtitle) ? it.fgtitle.join('') : it.fgtitle;
    return [
      `${i + 1}. 《${stripTags(fg)}》${it.num || ''}（相似度 ${typeof it.score === 'number' ? it.score.toFixed(3) : it.score}）`,
      `   效力级别: ${it.effect1 || '未知'} | 时效性: ${it.sxx || '未知'} | 实施日期: ${fmtDate(it.start) || '未知'}`,
      `   法条ID: ${it.ftid} | 法规ID: ${it.fgid}`,
      `   内容: ${snippet(it.content)}`,
    ].join('\n');
  });

  const header =
    `元典智库法条语义检索「${query}」：返回 ${rows.length} 条。\n` +
    listProvenanceHeader(TIER.L1_REGULATION);
  return { text: header + '\n\n' + blocks.join('\n\n'), cacheable: true };
}

async function getLawDetail(args, key, deadline) {
  const id = String(args.id || '').trim();
  const fgmc = String(args.lawName || '').trim().replace(/[《》]/g, '');
  if (!id && !fgmc) {
    return { text: '请提供 id（法规 ID）或 lawName（法规名称）至少一个。', cacheable: false };
  }

  const body = { id: id || undefined, fgmc: fgmc || undefined, refer_date: args.referDate || undefined };
  const resp = await ydPost('rh_fg_detail', body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典法规详情查询失败（${berr}）`, cacheable: false };

  const d = resp.data;
  if (!d || typeof d !== 'object') {
    return { text: `未找到法规「${fgmc || id}」（${resp.message || '未查询到相关内容'}）。`, cacheable: true };
  }

  const url = absUrl(d.url);
  const meta = [
    `标题: 《${stripTags(d.fgmc)}》`,
    `效力级别: ${d.xljb_1 || '未知'}${d.xljb_2 ? '（' + d.xljb_2 + '）' : ''}`,
    `时效性: ${d.sxx || '未知'}`,
    `发布部门: ${d.fbbm || '未知'}`,
    `发文字号: ${d.fwzh || '未知'}`,
    `发布日期: ${fmtDate(d.fbrq) || '未知'} | 实施日期: ${fmtDate(d.ssrq) || '未知'}`,
  ];
  if (Array.isArray(d.fj) && d.fj.length) {
    meta.push(`附件: ${d.fj.map((f) => f.fileName).filter(Boolean).join('；') || '（有附件）'}`);
  }
  if (args.referDate) meta.push(`参考日期: ${args.referDate}（按该日期定位的版本）`);

  const prov = provenanceBlock({
    tier: TIER.L1_REGULATION,
    channel: getSource('yuandian').channel_level,
    url: url || BASE_URL,
    method: METHOD.YUANDIAN_API,
    validity: validityOf(d.sxx),
  });

  const content = d.content ? truncateByArticles(stripTags(d.content), DETAIL_MAX_CHARS) : '（接口未返回正文内容）';
  return { text: meta.join('\n') + '\n' + prov + '\n\n正文:\n' + content, cacheable: true };
}

async function getArticleDetail(args, key, deadline) {
  const id = String(args.id || '').trim();
  const fgmc = String(args.lawName || '').trim().replace(/[《》]/g, '');
  const ftnum = String(args.articleNumber || '').trim();
  if (!id && !(fgmc && ftnum)) {
    return { text: '请提供 id（法条 ID），或 lawName + articleNumber（如「第一百八十八条」）。', cacheable: false };
  }

  const body = {
    id: id || undefined,
    fgmc: fgmc || undefined,
    ftnum: ftnum || undefined,
    refer_date: args.referDate || undefined,
  };
  const resp = await ydPost('rh_ft_detail', body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典法条详情查询失败（${berr}）`, cacheable: false };

  const d = resp.data;
  if (!d || typeof d !== 'object') {
    return { text: `未找到目标法条（${resp.message || '未查询到相关内容'}）。`, cacheable: true };
  }

  const url = absUrl(d.url);
  const meta = [
    `法条: 《${stripTags(d.fgmc)}》${d.ft_num || ''}`,
    `时效性: ${d.sxx || '未知'} | 效力级别: ${d.xljb_1 || '未知'}`,
    `发布日期: ${fmtDate(d.fbrq) || '未知'} | 实施日期: ${fmtDate(d.ssrq) || '未知'}`,
  ];
  const prov = provenanceBlock({
    tier: TIER.L1_REGULATION,
    channel: getSource('yuandian').channel_level,
    url: url || BASE_URL,
    method: METHOD.YUANDIAN_API,
    validity: validityOf(d.sxx),
  });

  const content = d.content ? stripTags(d.content) : '（接口未返回条文内容）';
  return { text: meta.join('\n') + '\n' + prov + '\n\n条文:\n' + content, cacheable: true };
}

// ---------------------------------------------------------------------------
// 案例类工具
// ---------------------------------------------------------------------------
function caseListItem(it, i, caseKind) {
  const lines = [
    `${i + 1}. ${stripTags(it.title) || '（无标题）'}`,
    `   案号: ${it.ah || '未知'} | 案由: ${it.ay || '未知'}`,
    `   经办法院: ${it.jbdw || '未知'} | 案件类别: ${it.ajlb || '未知'} | 文书种类: ${it.wszl || '未知'}`,
    `   裁判日期: ${fmtDate(it.cprq) || '未知'} | 地域: ${it.xzqh_p || '未知'}`,
    `   案例ID: ${it.id}（用 get_case_detail 获取详情，type=${caseKind}）`,
  ];
  const url = absUrl(it.url);
  if (url) lines.push(`   链接: ${url}`);
  if (it.content) lines.push(`   内容片段: ${snippet(it.content, 400)}`);
  return lines.join('\n');
}

async function searchCasesCommon(args, key, deadline, kind) {
  // kind: 'ptal'（普通案例） | 'qwal'（权威案例）
  const body = {
    ah: args.caseNumber || undefined,
    title: args.title || undefined,
    ay: Array.isArray(args.causeOfAction) && args.causeOfAction.length ? args.causeOfAction : undefined,
    jbdw: Array.isArray(args.courts) && args.courts.length ? args.courts : undefined,
    xzqh_p: Array.isArray(args.provinces) && args.provinces.length ? args.provinces : undefined,
    wszl: Array.isArray(args.docTypes) && args.docTypes.length ? args.docTypes : undefined,
    ajlb: args.caseType || undefined,
    ja_start: args.decisionStart || undefined,
    ja_end: args.decisionEnd || undefined,
    qw: args.fulltext || undefined,
    search_mode: args.searchMode ? args.searchMode.toLowerCase() : undefined,
    top_k: clamp(parseInt(args.topK, 10) || 10, 1, 50),
  };
  if (kind === 'ptal') {
    body.ssqy = args.enterprise || undefined;
    body.fxgc = args.analysis || undefined;
    if (Array.isArray(args.citedArticles) && args.citedArticles.length) body.yyft = args.citedArticles;
  } else {
    body.source = Array.isArray(args.sources) && args.sources.length ? args.sources : undefined;
  }

  const hasCriterion = Object.entries(body).some(([k, v]) => k !== 'top_k' && v !== undefined);
  if (!hasCriterion) {
    return { text: '请至少提供一个检索条件（caseNumber / title / causeOfAction / courts / fulltext 等）。', cacheable: false };
  }

  const routeKey = kind === 'ptal' ? 'rh_ptal_search' : 'rh_qwal_search';
  const label = kind === 'ptal' ? '普通案例' : '权威案例';
  const resp = await ydPost(routeKey, body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典${label}检索失败（${berr}）`, cacheable: false };

  const data = resp.data;
  const rows = data && Array.isArray(data.lst) ? data.lst : [];
  if (rows.length === 0) {
    return {
      text: `元典智库未找到匹配${label}（${resp.message || '未查询到相关内容'}）。可改用 semantic_search_cases 语义检索。`,
      cacheable: true,
    };
  }

  const tier = kind === 'qwal' ? TIER.L2_GUIDING : TIER.L2_DATABASE;
  const header =
    `元典智库${label}检索：共命中 ${data.total != null ? data.total : rows.length} 条，返回 ${rows.length} 条。\n` +
    listProvenanceHeader(tier);
  return { text: header + '\n\n' + rows.map((it, i) => caseListItem(it, i, kind)).join('\n\n'), cacheable: true };
}

async function semanticSearchCases(args, key, deadline) {
  const query = String(args.query || '').trim();
  if (!query) return { text: '请提供 query 参数（自然语言检索问题）。', cacheable: false };

  const filter = {};
  if (args.caseType) filter.wenshu_type = args.caseType;
  if (Array.isArray(args.causeOfAction) && args.causeOfAction.length) filter.ay = args.causeOfAction;
  if (Array.isArray(args.docTypes) && args.docTypes.length) filter.wszl = args.docTypes;
  if (args.decisionStart) filter.ja_start = args.decisionStart;
  if (args.decisionEnd) filter.ja_end = args.decisionEnd;
  if (args.authoritativeOnly) filter.dianxing = true;
  if (Array.isArray(args.courts) && args.courts.length) filter.fayuan = args.courts;
  if (Array.isArray(args.sources) && args.sources.length) filter.source = args.sources;
  if (args.courtLevel) filter.cj = args.courtLevel;
  if (args.province) filter.xzqh_p = args.province;

  const body = {
    query,
    rewrite_flag: args.rewrite !== false,
    wenshu_filter: Object.keys(filter).length ? filter : undefined,
    return_num: clamp(parseInt(args.returnNum, 10) || 10, 1, 45),
  };

  const resp = await ydPost('case_vector_search', body, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典案例语义检索失败（${berr}）`, cacheable: false };

  const rows = (resp.extra && Array.isArray(resp.extra.wenshu) && resp.extra.wenshu) || [];
  if (rows.length === 0) {
    return { text: `元典智库语义检索未找到相关案例（query: 「${query}」）。`, cacheable: true };
  }

  const blocks = rows.map((it, i) => {
    const ayRaw = Array.isArray(it.ay) ? it.ay.join('、') : it.ay;
    // 语义检索返回的案由是数字代码（如 9181），如实标注为代码而非名称
    const ayLabel = ayRaw && /^\d+(、\d+)*$/.test(String(ayRaw)) ? `案由代码: ${ayRaw}` : `案由: ${ayRaw}`;
    return [
      `${i + 1}. ${stripTags(it.title) || '（无标题）'}（相似度 ${typeof it.score === 'number' ? it.score.toFixed(3) : it.score}）`,
      `   案号: ${it.ah || '未知'} | ${ayRaw ? ayLabel : '案由: 未知'}`,
      `   经办法院: ${it.jbdw || '未知'} | 法院层级: ${it.cj || '未知'} | ${it.ajlb || ''} ${it.wszl || ''}`,
      `   结案日期: ${fmtDate(it.jaDate) || it.jand || '未知'} | 地域: ${it.xzqh_p || '未知'}`,
      `   内容: ${snippet(it.content)}`,
    ].join('\n');
  });

  const header =
    `元典智库案例语义检索「${query}」：返回 ${rows.length} 条。\n` +
    listProvenanceHeader(TIER.L2_DATABASE);
  return { text: header + '\n\n' + blocks.join('\n\n'), cacheable: true };
}

async function getCaseDetail(args, key, deadline) {
  const id = String(args.id || '').trim();
  const ah = String(args.caseNumber || '').trim();
  if (!id && !ah) return { text: '请提供 id（案例 ID）或 caseNumber（案号）至少一个。', cacheable: false };

  const resp = await ydGet('rh_case_details', { id, ah, type: args.type }, key, deadline);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典案例详情查询失败（${berr}）`, cacheable: false };

  const rows = Array.isArray(resp.data) ? resp.data : [];
  if (rows.length === 0) {
    return { text: `未找到案例「${ah || id}」（${resp.message || '未查询到相关内容'}）。`, cacheable: true };
  }

  const blocks = rows.slice(0, 3).map((d, i) => {
    const url = absUrl(d.url);
    const meta = [
      rows.length > 1 ? `【第 ${i + 1} 条】` : null,
      `标题: ${stripTags(d.title) || '（无标题）'}`,
      `类型: ${d.type || (args.type === 'qwal' ? '权威案例' : '普通案例')}`,
      `案号: ${d.ah || '未知'}`,
      `经办法院: ${d.jbdw || '未知'} | 案件类别: ${d.ajlb || '未知'} | 审判程序: ${d.spcx || '未知'}`,
      `案由: ${d.ay || '未知'} | 文书种类: ${d.wszl || '未知'} | 裁判日期: ${fmtDate(d.cprq) || '未知'}`,
      d.yyft ? `援引法条: ${snippet(d.yyft, 300)}` : null,
      provenanceBlock({
        tier: d.type === '权威案例' ? TIER.L2_GUIDING : TIER.L2_DATABASE,
        channel: getSource('yuandian').channel_level,
        url: url || BASE_URL,
        method: METHOD.YUANDIAN_API,
        validity: VALIDITY.UNKNOWN,
      }),
    ].filter(Boolean);
    const content = d.content
      ? truncateByArticles(stripTags(d.content), DETAIL_MAX_CHARS)
      : '（接口未返回正文内容）';
    return meta.join('\n') + '\n\n正文:\n' + content;
  });

  const note =
    rows.length > 3 ? `\n\n（共返回 ${rows.length} 条详情，以上显示前 3 条）` : '';
  return { text: blocks.join('\n\n---\n\n') + note, cacheable: true };
}

// ---------------------------------------------------------------------------
// verify_legal_citations — 法律幻觉校验
// ---------------------------------------------------------------------------
async function verifyLegalCitations(args, key, deadline) {
  const text = String(args.text || '').trim();
  if (!text) return { text: '请提供 text 参数（待校验的原文文本）。', cacheable: false };

  // 幻觉校验平均约 15 秒，给足单次请求超时
  const resp = await ydPost('hall_detect', { text }, key, deadline, 40000);
  const berr = businessError(resp);
  if (berr === 'AUTH') return { text: invalidKeyText(), cacheable: false };
  if (berr) return { text: `元典法律幻觉校验失败（${berr}）`, cacheable: false };

  const regs = Array.isArray(resp.regulations) ? resp.regulations : [];
  const cases = Array.isArray(resp.cases) ? resp.cases : [];
  const out = [
    `法律引用核验结果（元典幻觉检测）：抽取到法规引用 ${regs.length} 条、案例引用 ${cases.length} 条。`,
    listProvenanceHeader(TIER.L1_REGULATION),
  ];

  if (regs.length) {
    out.push('', '■ 法规引用：');
    regs.forEach((r, i) => {
      const sc = r.semantic_compare || {};
      const verdict = sc.skipped
        ? `跳过比对（${sc.skip_reason || '仅法规名无具体条号'}）`
        : sc['结论'] || (r.law_exists === false ? '法规不存在' : '未判定');
      const lines = [
        `${i + 1}. 《${stripTags(r.name).replace(/^[《「]/, '').replace(/[》」]$/, '')}》${r.clause || ''} — 结论: ${verdict}`,
      ];
      if (sc['语义相似度'] != null) lines.push(`   语义相似度: ${sc['语义相似度']}`);
      if (sc['说明']) lines.push(`   说明: ${sc['说明']}`);
      const metaBits = [
        r.validity_status ? `时效性: ${r.validity_status}` : null,
        r.publish_date ? `发布: ${r.publish_date}` : null,
        r.implement_date ? `实施: ${r.implement_date}` : null,
        r.document_number ? `文号: ${r.document_number}` : null,
      ].filter(Boolean);
      if (metaBits.length) lines.push(`   ${metaBits.join(' | ')}`);
      if (r.think_tank_clause_missing) lines.push('   ⚠️ 权威来源中缺失该条号');
      if (r.think_tank_content) lines.push(`   权威原文: ${snippet(r.think_tank_content, 400)}`);
      if (r.url) lines.push(`   链接: ${absUrl(r.url)}`);
      out.push(lines.join('\n'));
    });
  }

  if (cases.length) {
    out.push('', '■ 案例引用：');
    cases.forEach((c, i) => {
      const lines = [
        `${i + 1}. ${stripTags(c.name) || '（未命名案例）'} ${c.case_number || ''}`.trim(),
        `   命中状态: ${c.think_tank_content ? '已命中权威来源' : '未命中权威来源（案号可能有误，建议人工核查）'}`,
      ];
      if (c.court) lines.push(`   法院: ${c.court}`);
      if (c.case_type) lines.push(`   案例类型: ${c.case_type}`);
      if (c.think_tank_content) lines.push(`   权威内容摘录: ${snippet(c.think_tank_content, 400)}`);
      if (c.url) lines.push(`   链接: ${absUrl(c.url)}`);
      out.push(lines.join('\n'));
    });
  }

  if (!regs.length && !cases.length) {
    out.push('', '未从文本中抽取到法规或案例引用。');
  }
  return { text: out.join('\n'), cacheable: false };
}

// ---------------------------------------------------------------------------
// dispatch
// ---------------------------------------------------------------------------
function sanitizeArgs(args) {
  const clean = Object.assign({}, args || {});
  if (clean.apiKey) clean.apiKey = '***';
  return clean;
}

async function callTool(name, args) {
  const deadline = Date.now() + BUDGET_MS;
  console.error(`[yuandian] tools/call ${name} args=${JSON.stringify(sanitizeArgs(args)).slice(0, 300)}`);

  const { key } = resolveApiKey(args);
  if (!key) return needKeyText();

  // 缓存键与日志都不含 apiKey
  const cacheArgs = Object.assign({}, args || {});
  delete cacheArgs.apiKey;

  const run = async () => {
    try {
      switch (name) {
        case 'search_laws':
          return await searchLaws(args, key, deadline);
        case 'search_law_articles':
          return await searchLawArticles(args, key, deadline);
        case 'semantic_search_laws':
          return await semanticSearchLaws(args, key, deadline);
        case 'get_law_detail':
          return await getLawDetail(args, key, deadline);
        case 'get_article_detail':
          return await getArticleDetail(args, key, deadline);
        case 'search_cases':
          return await searchCasesCommon(args, key, deadline, 'ptal');
        case 'search_authoritative_cases':
          return await searchCasesCommon(args, key, deadline, 'qwal');
        case 'semantic_search_cases':
          return await semanticSearchCases(args, key, deadline);
        case 'get_case_detail':
          return await getCaseDetail(args, key, deadline);
        case 'verify_legal_citations':
          return await verifyLegalCitations(args, key, deadline);
        default:
          throw new Error(
            `未知工具: ${name}（可用: ${TOOLS.map((t) => t.name).join(', ')}）`
          );
      }
    } catch (err) {
      // HTTP 401 -> Key 无效（清除临时 Key）；HTTP 403 -> 账号权限不足（Key 有效，保留）
      if (err instanceof DegradedError && err.status === 401) {
        console.error('[yuandian] auth failed (401), clearing stored key');
        return { text: invalidKeyText(), cacheable: false };
      }
      if (err instanceof DegradedError && err.status === 403) {
        const detail = extractApiMessage(err.bodySnippet);
        console.error('[yuandian] permission denied (403):', detail || 'no detail');
        return { text: permissionDeniedText(detail), cacheable: false };
      }
      console.error(`[yuandian] ${name} degraded:`, (err && err.stack) || err);
      return { text: degradeText(name, err), cacheable: false };
    }
  };

  return cache.withCache(SERVER, name, cacheArgs, run);
}

serve({ serverInfo: SERVER_INFO, tools: TOOLS, callTool });
console.error(
  `[yuandian] connector ready (fixtures=${process.env.FIXTURES_DIR ? 'on' : 'off'}, ` +
    `apiKey=${resolveApiKey({}).key ? 'configured' : 'pending'}, cacheTTL=${cache.ttlSeconds()}s)`
);
