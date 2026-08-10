#!/usr/bin/env node
'use strict';

/**
 * 裁判文书网登录辅助（一次性扫码，人速操作）。
 *
 * 用法：
 *   node connectors/wenshu/login.js
 *
 * 行为：
 *   1. 用本机 Chrome 打开一个【可见】窗口，进入裁判文书网登录页（支付宝扫码）
 *   2. 由你本人扫码并完成可能的滑块/人机验证（本工具绝不自动处理验证）
 *   3. 检测到登录态后自动关闭窗口并退出；会话保存在本机持久化 profile 中，
 *      之后 MCP 连接器的 search_cases / get_case_detail 即可使用
 *
 * 环境变量：
 *   WENSHU_PROFILE_DIR  自定义会话目录（默认 ~/.cache/com.sorawatcher.inkstatute/wenshu-profile）
 *   WENSHU_LOGIN_TIMEOUT_MIN  等待登录的最长分钟数（默认 8）
 */

const path = require('path');
const os = require('os');

const HOME_URL = 'https://wenshu.court.gov.cn/';
// 频道页（未登录访问会被 302 到登录页）——作为登录态的硬判据
const CHANNEL_PROBE_URL =
  'https://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?s8=03';
const LOGIN_PAGE_MARK = '181010CARHS5BS3C';

function profileDir() {
  if (process.env.WENSHU_PROFILE_DIR) return process.env.WENSHU_PROFILE_DIR;
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'wenshu-profile');
}

/** 硬判据：频道页不再跳转登录页 = 已登录（在独立探针页执行，不打扰用户扫码的页面）。 */
async function probeLoggedIn(probePage) {
  await probePage
    .goto(CHANNEL_PROBE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
    .catch(() => {});
  await probePage.waitForTimeout(1200);
  const url = probePage.url();
  const title = await probePage.title().catch(() => '');
  if (url.includes(LOGIN_PAGE_MARK) || /登录\/注册/.test(title)) return false;
  const text = await probePage
    .evaluate(() => (document.body ? document.body.innerText : ''))
    .catch(() => '');
  // 排除停在人机验证页的情形
  if (/扫码登录|验证码|滑块|安全验证|人机验证/.test(text)) return false;
  return true;
}

(async () => {
  let chromium;
  try {
    ({ chromium } = require('playwright-core'));
  } catch {
    console.error('[wenshu-login] 缺少依赖 playwright-core，请先在项目根目录执行 npm install');
    process.exit(1);
  }

  const timeoutMin = parseInt(process.env.WENSHU_LOGIN_TIMEOUT_MIN || '8', 10);
  console.log('[wenshu-login] 正在打开 Chrome 登录窗口（会话目录: ' + profileDir() + '）...');

  const ctx = await chromium.launchPersistentContext(profileDir(), {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1366, height: 900 },
    locale: 'zh-CN',
    args: ['--disable-blink-features=AutomationControlled'],
  });

  try {
    const page = await ctx.newPage();
    await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1000);
    const loginLink = page.locator('text=登录').first();
    if (await loginLink.count()) await loginLink.click().catch(() => {});

    console.log('[wenshu-login] 请在窗口中用支付宝扫码，并在手机上【确认登录】；等待最多 ' + timeoutMin + ' 分钟...');
    const probe = await ctx.newPage(); // 后台探针页，不打扰用户扫码
    const deadline = Date.now() + timeoutMin * 60 * 1000;
    let ok = false;
    while (Date.now() < deadline) {
      await page.waitForTimeout(4000);
      if (await probeLoggedIn(probe)) {
        ok = true;
        break;
      }
    }
    await probe.close().catch(() => {});

    if (ok) {
      console.log('[wenshu-login] ✅ 检测到已登录。会话已保存，窗口即将关闭。');
      process.exitCode = 0;
    } else {
      console.error('[wenshu-login] ⏱️ 超时未检测到登录态。可重新运行本脚本重试。');
      process.exitCode = 1;
    }
  } finally {
    await ctx.close().catch(() => {});
  }
})().catch((e) => {
  console.error('[wenshu-login] 失败:', e.message);
  process.exit(1);
});
