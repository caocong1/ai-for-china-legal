// http.js — fetch helpers for MCP connectors. Node 18+ built-ins only. ESM.
//
// Features:
//   - desktop-browser UA + Referer support
//   - AbortController timeout (default 30000ms, env LAW_DB_TIMEOUT_MS override)
//   - retry per connector.json retry config (only on 429/502/503/504,
//     exponential backoff, max 3 attempts)
//   - simple per-host token bucket (default 5 rps)
//   - captcha/login wall detection -> typed DegradedError (NEVER bypass)
//   - optional deadline (ms epoch) so a tool call stays inside its time budget
//   - fixtures mode: env FIXTURES_DIR set -> all fetches resolve from fixture
//     files instead of the network (see resolveFixture below)

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const DEFAULT_TIMEOUT_MS = (() => {
  const v = parseInt(process.env.LAW_DB_TIMEOUT_MS || '', 10);
  return Number.isFinite(v) && v > 0 ? v : 30000;
})();

// Mirrors vendor/ai-for-china-legal/connectors/law-database/connector.json "retry"
const DEFAULT_RETRY = {
  maxAttempts: 3,
  initialDelayMs: 2000,
  maxDelayMs: 30000,
  backoffMultiplier: 2.5,
  retryableStatusCodes: [429, 502, 503, 504],
};

class DegradedError extends Error {
  constructor(reason, extra) {
    super(reason);
    this.name = 'DegradedError';
    this.reason = reason;
    if (extra) Object.assign(this, extra);
  }
}

class HttpError extends Error {
  constructor(status, url, bodySnippet) {
    super(`HTTP ${status} for ${url}`);
    this.name = 'HttpError';
    this.status = status;
    this.url = url;
    this.bodySnippet = bodySnippet;
  }
}

// ---------------------------------------------------------------------------
// Token bucket (per host). Default 5 requests/second (law-database rateLimit).
// ---------------------------------------------------------------------------
const buckets = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function takeToken(host, rps) {
  const rate = rps > 0 ? rps : 5;
  let b = buckets.get(host);
  if (!b) {
    b = { tokens: rate, capacity: rate, rate, last: Date.now() };
    buckets.set(host, b);
  }
  for (;;) {
    const now = Date.now();
    b.tokens = Math.min(b.capacity, b.tokens + ((now - b.last) / 1000) * b.rate);
    b.last = now;
    if (b.tokens >= 1) {
      b.tokens -= 1;
      return;
    }
    await sleep(Math.ceil(((1 - b.tokens) / b.rate) * 1000));
  }
}

// ---------------------------------------------------------------------------
// Captcha / login wall detection.
// Spec asks for "body containing 验证码/登录", but a bare 登录 substring
// false-positives on normal pages (e.g. court.gov.cn footer link
// "登录邮箱系统"), so the body check uses stricter login-wall phrasings.
// Status 401/403 always degrade. We NEVER attempt to bypass.
// ---------------------------------------------------------------------------
const WALL_RE = /验证码|captcha|请(先)?登录|用户登录|登录后(可|才)|需要登录|滑动验证|安全验证/i;

function checkWall(status, textSnippet, url) {
  if (status === 401 || status === 403) {
    throw new DegradedError(
      `访问受限（HTTP ${status}）：${url} 可能要求登录或触发了风控，已按降级策略停止（不尝试绕过）`,
      { status, url }
    );
  }
  if (textSnippet && WALL_RE.test(textSnippet)) {
    throw new DegradedError(
      `检测到验证码/登录墙：${url} 返回了人机校验或登录页面，已按降级策略停止（不尝试绕过）`,
      { status, url }
    );
  }
}

// ---------------------------------------------------------------------------
// Fixtures mode (used by tests; zero network).
// env FIXTURES_DIR set -> every request resolves from fixture files:
//   1. <FIXTURES_DIR>/index.json: array of rules
//      [{ "urlIncludes": "...", "bodyIncludes": "...", "file": "x.json" }, ...]
//      first rule whose substrings all match wins.
//   2. fallback: <FIXTURES_DIR>/<slug-of-method-and-url>.json
//   Fixture file: { "status": 200, "headers": {...},
//                   "body": "<string>" | "json": {...} | "bodyBase64": "..." }
// No fixture found -> throws (fixtures mode never touches the network).
// ---------------------------------------------------------------------------
function fixturesDir() {
  return process.env.FIXTURES_DIR || null;
}

function slugOfUrl(method, url) {
  return (method + '-' + url.replace(/^https?:\/\//, ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function resolveFixture(method, url, bodyText) {
  const dir = fixturesDir();
  const indexPath = path.join(dir, 'index.json');
  if (fs.existsSync(indexPath)) {
    let rules = [];
    try {
      rules = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    } catch (e) {
      console.error('[http] fixtures index.json unreadable:', e.message);
    }
    for (const rule of rules) {
      if (rule.urlIncludes && !url.includes(rule.urlIncludes)) continue;
      if (rule.bodyIncludes && !(bodyText || '').includes(rule.bodyIncludes)) continue;
      const fp = path.join(dir, rule.file);
      console.error(`[http] fixtures: ${method} ${url} -> ${rule.file}`);
      return JSON.parse(fs.readFileSync(fp, 'utf8'));
    }
  }
  const slugPath = path.join(dir, slugOfUrl(method, url) + '.json');
  if (fs.existsSync(slugPath)) {
    console.error(`[http] fixtures: ${method} ${url} -> ${path.basename(slugPath)}`);
    return JSON.parse(fs.readFileSync(slugPath, 'utf8'));
  }
  throw new DegradedError(`fixtures 模式下没有匹配的 fixture：${method} ${url}`);
}

function fixtureToResponse(fx) {
  const status = fx.status || 200;
  let buf;
  if (fx.bodyBase64 !== undefined) buf = Buffer.from(fx.bodyBase64, 'base64');
  else if (fx.json !== undefined) buf = Buffer.from(JSON.stringify(fx.json), 'utf8');
  else buf = Buffer.from(String(fx.body == null ? '' : fx.body), 'utf8');
  const headers = fx.headers || {};
  const contentType = headers['content-type'] || headers['Content-Type'] || '';
  return { status, contentType, buf };
}

// ---------------------------------------------------------------------------
// Core request with timeout + retry + rate limit + deadline budget.
// ---------------------------------------------------------------------------
function effectiveTimeout(opts) {
  let timeoutMs = opts.timeoutMs || DEFAULT_TIMEOUT_MS;
  if (opts.deadline) {
    const remaining = opts.deadline - Date.now() - 250;
    if (remaining <= 0) {
      throw new DegradedError('内部时间预算已耗尽（单次工具调用须在 45 秒内完成）');
    }
    timeoutMs = Math.min(timeoutMs, remaining);
  }
  return timeoutMs;
}

async function request(url, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase();
  const bodyText =
    typeof opts.body === 'string' ? opts.body : opts.body ? JSON.stringify(opts.body) : '';

  if (fixturesDir()) {
    return fixtureToResponse(resolveFixture(method, url, bodyText));
  }

  const retry = Object.assign({}, DEFAULT_RETRY, opts.retry || {});
  const headers = Object.assign(
    { 'User-Agent': DESKTOP_UA, Accept: opts.accept || '*/*' },
    opts.headers || {}
  );
  const host = new URL(url).host;

  let attempt = 0;
  let delay = retry.initialDelayMs;
  for (;;) {
    attempt++;
    await takeToken(host, opts.rps);
    const timeoutMs = effectiveTimeout(opts);

    let res;
    let buf;
    try {
      res = await fetch(url, {
        method,
        headers,
        body: opts.body !== undefined && method !== 'GET' ? bodyText : undefined,
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
      });
      buf = Buffer.from(await res.arrayBuffer());
    } catch (e) {
      const msg = (e && e.message) || String(e);
      console.error(`[http] ${method} ${url} attempt ${attempt} failed: ${msg}`);
      if (attempt < retry.maxAttempts && canWait(opts, delay)) {
        await sleep(delay);
        delay = Math.min(Math.round(delay * retry.backoffMultiplier), retry.maxDelayMs);
        continue;
      }
      throw new DegradedError(`网络请求失败：${url}（${msg}）`, { cause: e });
    }

    if (retry.retryableStatusCodes.includes(res.status) && attempt < retry.maxAttempts) {
      console.error(`[http] ${method} ${url} -> ${res.status}, retrying (attempt ${attempt})`);
      if (canWait(opts, delay)) {
        await sleep(delay);
        delay = Math.min(Math.round(delay * retry.backoffMultiplier), retry.maxDelayMs);
        continue;
      }
    }

    return {
      status: res.status,
      contentType: res.headers.get('content-type') || '',
      buf,
    };
  }
}

function canWait(opts, delayMs) {
  if (!opts.deadline) return true;
  return opts.deadline - Date.now() - delayMs > 1000;
}

function ensureOk(r, url) {
  // Wall detection runs on a UTF-8 snippet regardless of content type.
  const snippet = r.buf.subarray(0, 4096).toString('utf8');
  // Only treat textual bodies as wall candidates (a docx is binary).
  const textual =
    !r.contentType || /json|text|html|xml/i.test(r.contentType)
      ? snippet
      : '';
  checkWall(r.status, textual, url);
  if (r.status < 200 || r.status >= 300) {
    throw new HttpError(r.status, url, snippet.slice(0, 200));
  }
}

/** Fetch and return decoded UTF-8 text. */
async function fetchText(url, opts = {}) {
  const r = await request(url, opts);
  ensureOk(r, url);
  return r.buf.toString('utf8');
}

/** Fetch and return parsed JSON. */
async function fetchJson(url, opts = {}) {
  const headers = Object.assign(
    { Accept: 'application/json, text/plain, */*' },
    opts.headers || {}
  );
  const text = await fetchText(url, Object.assign({}, opts, { headers }));
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new DegradedError(
      `${url} 返回的不是 JSON（前 120 字符：${text.slice(0, 120).replace(/\s+/g, ' ')}）`
    );
  }
}

/** Fetch and return a Buffer (for docx/pdf downloads). */
async function fetchBuffer(url, opts = {}) {
  const r = await request(url, opts);
  ensureOk(r, url);
  return r.buf;
}

module.exports = {
  DegradedError,
  HttpError,
  DESKTOP_UA,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_RETRY,
  slugOfUrl,
  fetchText,
  fetchJson,
  fetchBuffer,
};
