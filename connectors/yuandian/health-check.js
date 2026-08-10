#!/usr/bin/env node
'use strict';

/**
 * Standalone health check for the yuandian connector (CommonJS, zero deps).
 *
 * Usage:
 *   node connectors/yuandian/health-check.js
 *
 * 检查内容：
 *   1. 元典开放平台公开目录端点可达性（无需 API Key，不消耗计点）
 *   2. API Key 配置状态（env / 临时文件 / 未配置）
 *
 * Exit codes: 0 — 平台可达；1 — 不可达
 */

const path = require('path');

if (process.env.YUANDIAN_FIXTURES && !process.env.FIXTURES_DIR) {
  process.env.FIXTURES_DIR = path.join(__dirname, 'fixtures');
}

const { fetchJson } = require('../_lib/http');
const { getSource } = require('../_lib/sources');

const BASE_URL = (process.env.YUANDIAN_BASE_URL || 'https://open.chineselaw.com').replace(/\/+$/, '');

async function main() {
  console.log('[yuandian] Health check starting...');
  console.log(`  Base URL: ${BASE_URL}`);

  // 与 index.js 相同的 Key 解析逻辑（不读取参数渠道）
  const fs = require('fs');
  const os = require('os');
  const keyFile = path.join(os.tmpdir(), 'yuandian-open-platform.key');
  const envKey = (process.env.YUANDIAN_API_KEY || '').trim();
  let fileKey = '';
  try {
    fileKey = fs.readFileSync(keyFile, 'utf8').trim();
  } catch {
    /* 未配置 */
  }
  const keyStatus = envKey ? 'env (YUANDIAN_API_KEY)' : fileKey ? `临时文件 (${keyFile})` : 'NOT SET（首次调用时会提示向用户索取）';
  console.log(`  API Key: ${keyStatus}`);

  try {
    const catalog = await fetchJson(`${BASE_URL}/api/apis?pageNum=1&pageSize=1`, { timeoutMs: 10000 });
    const total =
      catalog && catalog.data && (catalog.data.total || (Array.isArray(catalog.data.list) ? catalog.data.list.length : null));
    console.log(`[yuandian] OK: 平台目录端点可达（当前接口数: ${total != null ? total : '未知'}）。`);
    console.log(`  Timestamp: ${new Date().toISOString()}`);
    if (!envKey && !fileKey) {
      console.log('[yuandian] 提示: 未配置 API Key；业务接口需在首次调用时由用户提供。');
    }
    process.exit(0);
  } catch (error) {
    console.error(`[yuandian] FAIL: ${error.message}`);
    process.exit(1);
  }
}

main();
