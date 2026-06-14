// cache.js — simple file cache for connector tool results. ESM.
//
//   - key: sha1(tool + JSON.stringify(args))
//   - dir: env LAW_DB_CACHE_DIR, else
//          %LOCALAPPDATA%/com.sorawatcher.inkstatute/connector-cache/<server>
//          (fallback: ~/.cache/com.sorawatcher.inkstatute/connector-cache/<server>)
//   - TTL: env LAW_DB_CACHE_TTL_SECONDS, default 86400. TTL <= 0 disables cache.
//   - value: the final text result. On hit the caller-visible text gets a
//            trailing `（缓存于 <ISO time>）` line appended.

'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function ttlSeconds() {
  const v = parseInt(process.env.LAW_DB_CACHE_TTL_SECONDS || '', 10);
  return Number.isFinite(v) ? v : 86400;
}

function cacheDir(server) {
  if (process.env.LAW_DB_CACHE_DIR) {
    return path.join(process.env.LAW_DB_CACHE_DIR, server);
  }
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'connector-cache', server);
}

function keyFor(tool, args) {
  return crypto
    .createHash('sha1')
    .update(tool + JSON.stringify(args || {}))
    .digest('hex');
}

function entryPath(server, tool, args) {
  return path.join(cacheDir(server), keyFor(tool, args) + '.json');
}

/** @returns {{text:string, createdAt:string}|null} */
function get(server, tool, args) {
  const ttl = ttlSeconds();
  if (ttl <= 0) return null;
  const p = entryPath(server, tool, args);
  try {
    if (!fs.existsSync(p)) return null;
    const rec = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!rec || typeof rec.text !== 'string' || !rec.createdAt) return null;
    const age = (Date.now() - Date.parse(rec.createdAt)) / 1000;
    if (!Number.isFinite(age) || age > ttl) return null;
    return rec;
  } catch (e) {
    console.error('[cache] read failed:', e.message);
    return null;
  }
}

function set(server, tool, args, text) {
  if (ttlSeconds() <= 0) return;
  try {
    const dir = cacheDir(server);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      entryPath(server, tool, args),
      JSON.stringify({ createdAt: new Date().toISOString(), tool, text })
    );
  } catch (e) {
    console.error('[cache] write failed:', e.message);
  }
}

/**
 * Cache wrapper. `producer` resolves to either a string (always cacheable)
 * or `{text, cacheable}` so degraded/failure texts can opt out of caching.
 * On a cache hit, appends the `（缓存于 <ISO time>）` provenance line.
 */
async function withCache(server, tool, args, producer) {
  const hit = get(server, tool, args);
  if (hit) {
    console.error(`[cache] hit ${tool} ${keyFor(tool, args)}`);
    return hit.text + `\n（缓存于 ${hit.createdAt}）`;
  }
  const produced = await producer();
  const text = typeof produced === 'string' ? produced : produced.text;
  const cacheable = typeof produced === 'string' ? true : produced.cacheable !== false;
  if (cacheable) set(server, tool, args, text);
  return text;
}

module.exports = { get, set, withCache, keyFor, cacheDir, ttlSeconds };
