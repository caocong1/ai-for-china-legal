#!/usr/bin/env node
'use strict';

/**
 * 人民法院案例库连接器健康检查。
 * 探测匿名可用的收录统计端点（POST /cpws_al_api/api/cpwsAl/indexTongji），
 * 不启动浏览器、不需要登录态。
 *
 * 用法：node connectors/rmfyalk/health-check.js
 * 退出码：0 = 健康，1 = 异常
 */

const https = require('https');

const HOST = 'rmfyalk.court.gov.cn';
const STATS_PATH = '/cpws_al_api/api/cpwsAl/indexTongji';
const TIMEOUT_MS = parseInt(process.env.RMFYALK_TIMEOUT_MS || '15000', 10);

function postJson(pathname, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: HOST,
        path: pathname,
        method: 'POST',
        timeout: TIMEOUT_MS,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      },
      (res) => {
        let buf = '';
        res.on('data', (d) => (buf += d));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, json: JSON.parse(buf) });
          } catch {
            resolve({ status: res.statusCode, json: null, raw: buf.slice(0, 200) });
          }
        });
      }
    );
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end(JSON.stringify(body || {}));
  });
}

(async () => {
  try {
    const r = await postJson(STATS_PATH, {});
    if (r.json && String(r.json.code) === '0' && r.json.data) {
      console.log(
        `[rmfyalk] OK — 案例库可达，收录 ${r.json.data.allCount} 篇（统计月份 ${r.json.data.currMonth}）。` +
          '注：检索/详情接口需登录（npm run connector:rmfyalk:login）。'
      );
      process.exit(0);
    }
    console.error(`[rmfyalk] FAIL — 非预期响应: HTTP ${r.status} ${r.raw || JSON.stringify(r.json)}`);
    process.exit(1);
  } catch (e) {
    console.error(`[rmfyalk] FAIL — ${e.message}`);
    process.exit(1);
  }
})();
