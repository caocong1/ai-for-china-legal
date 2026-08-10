#!/usr/bin/env node
'use strict';

/**
 * 人民法院案例库登录辅助（一次性登录，人速操作）。
 *
 * 用法：
 *   node connectors/rmfyalk/login.js
 *
 * 行为：
 *   1. 用本机 Chrome 打开一个【可见】窗口，进入人民法院案例库首页
 *   2. 由你本人点击「登录」，跳转共道统一认证（account.court.gov.cn）完成登录
 *      （本工具绝不自动处理登录表单/验证码）
 *   3. 窗口保持打开，后台探针每 4 秒检测登录态，成功即自动关窗退出——
 *      无需守在会话前，中途离开没关系（默认不限时）
 *   4. 若你直接关闭了窗口，会用已保存的会话做最后一次无头探测
 *      （覆盖"登录成功后顺手关窗"的情形），然后退出
 *
 * 环境变量：
 *   RMFYALK_PROFILE_DIR        自定义会话目录（默认 ~/.cache/com.sorawatcher.inkstatute/rmfyalk-profile）
 *   RMFYALK_LOGIN_TIMEOUT_MIN  等待登录的最长分钟数；0 = 不限时（默认 0）
 */

const path = require('path');
const os = require('os');

const HOME_URL = 'https://rmfyalk.court.gov.cn/home.html';
// helper.html 在 base.min.js 白名单中（未登录不强制跳转），作为探针底座页
const PROBE_URL = 'https://rmfyalk.court.gov.cn/helper.html';

function profileDir() {
  if (process.env.RMFYALK_PROFILE_DIR) return process.env.RMFYALK_PROFILE_DIR;
  const base = process.env.LOCALAPPDATA || path.join(os.homedir(), '.cache');
  return path.join(base, 'com.sorawatcher.inkstatute', 'rmfyalk-profile');
}

function launch(chromium, headless) {
  return chromium.launchPersistentContext(profileDir(), {
    channel: 'chrome',
    headless,
    viewport: { width: 1366, height: 900 },
    locale: 'zh-CN',
    args: ['--disable-blink-features=AutomationControlled'],
  });
}

/** 硬判据：getUserInfo 返回 code 0 = 已登录。 */
async function probeLoggedIn(probePage) {
  await probePage.goto(PROBE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await probePage.waitForTimeout(800);
  const resp = await probePage
    .evaluate(async () => {
      try {
        const r = await fetch('/cpws_al_api/api/user/getUserInfo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          body: '{}',
        });
        return await r.json();
      } catch (e) {
        return { code: -1, msg: String(e) };
      }
    })
    .catch(() => null);
  return !!(resp && String(resp.code) === '0' && resp.data);
}

(async () => {
  let chromium;
  try {
    ({ chromium } = require('playwright-core'));
  } catch {
    console.error('[rmfyalk-login] 缺少依赖 playwright-core，请先在项目根目录执行 npm install');
    process.exit(1);
  }

  const timeoutMin = parseInt(process.env.RMFYALK_LOGIN_TIMEOUT_MIN || '0', 10);
  console.log('[rmfyalk-login] 正在打开 Chrome 登录窗口（会话目录: ' + profileDir() + '）...');

  const ctx = await launch(chromium, false);
  let ctxClosed = false;
  ctx.on('close', () => {
    ctxClosed = true;
  });

  let ok = false;
  try {
    const page = await ctx.newPage();
    await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });

    console.log(
      '[rmfyalk-login] 请在窗口中点击「登录」并完成共道账号认证。' +
        (timeoutMin > 0 ? `等待最多 ${timeoutMin} 分钟；` : '不限时；') +
        '登录成功会自动关窗，也可直接关闭窗口结束。'
    );
    const probe = await ctx.newPage(); // 后台探针页，不打扰用户操作
    const deadline = timeoutMin > 0 ? Date.now() + timeoutMin * 60 * 1000 : Infinity;
    while (!ctxClosed && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 4000));
      if (ctxClosed) break;
      try {
        // macOS 关闭窗口不退进程：页面全关视为用户已关窗
        if (ctx.pages().length === 0) {
          ctxClosed = true;
          break;
        }
        if (await probeLoggedIn(probe)) {
          ok = true;
          break;
        }
      } catch {
        ctxClosed = true; // 上下文已销毁
        break;
      }
    }
    await probe.close().catch(() => {});
  } finally {
    await ctx.close().catch(() => {});
  }

  if (!ok) {
    // 用户可能"登录成功后顺手关窗"：用已持久化的会话做最后一次无头探测
    try {
      const c2 = await launch(chromium, true);
      const p = await c2.newPage();
      ok = await probeLoggedIn(p);
      await c2.close().catch(() => {});
    } catch {
      /* 忽略，按未登录处理 */
    }
  }

  if (ok) {
    console.log('[rmfyalk-login] ✅ 检测到已登录。会话已保存。');
    process.exitCode = 0;
  } else {
    console.error('[rmfyalk-login] 未检测到登录态。可重新运行本脚本重试。');
    process.exitCode = 1;
  }
})().catch((e) => {
  console.error('[rmfyalk-login] 失败:', e.message);
  process.exit(1);
});
