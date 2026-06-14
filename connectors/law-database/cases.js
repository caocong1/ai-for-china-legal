'use strict';
// cases.js — scrape 最高人民法院 指导性案例 / 典型案例 list pages.
//
// Verified 2026-06-12: https://www.court.gov.cn/shenpan/gengduo/77.html
// (指导案例, paginated as 77_2.html ... 77_15.html) and
// https://www.court.gov.cn/zixun/gengduo/104.html (典型案例) render
// server-side. List items look like:
//   <li><a title="指导性案例279号：..." target="_blank"
//        href="/shenpan/xiangqing/490521.html">...</a> <i class="date">2026-02-28</i></li>

const { fetchText } = require('../_lib/http');

const COURT_BASE = 'https://www.court.gov.cn';

const LIST_SOURCES = [
  {
    label: '最高人民法院指导性案例',
    urls: [
      `${COURT_BASE}/shenpan/gengduo/77.html`,
      `${COURT_BASE}/shenpan/gengduo/77_2.html`,
      `${COURT_BASE}/shenpan/gengduo/77_3.html`,
    ],
  },
  {
    label: '最高人民法院典型案例',
    urls: [`${COURT_BASE}/zixun/gengduo/104.html`],
  },
];

const ITEM_RE =
  /<a[^>]*title="([^"]+)"[^>]*href="([^"]+)"[^>]*>[\s\S]{0,400}?<i class="date">([^<]*)<\/i>/g;

function parseListPage(html, label) {
  // Limit to the article list block to avoid nav/footer links.
  const start = html.indexOf('sec_list');
  const end = html.indexOf('btm_row');
  const region =
    start >= 0 ? html.slice(start, end > start ? end : undefined) : html;

  const items = [];
  let m;
  ITEM_RE.lastIndex = 0;
  while ((m = ITEM_RE.exec(region)) !== null) {
    const href = m[2];
    if (!/\/xiangqing\//.test(href)) continue; // only article detail links
    items.push({
      title: m[1].trim(),
      url: href.startsWith('http') ? href : COURT_BASE + href,
      date: m[3].trim(),
      source: label,
    });
  }
  return items;
}

/**
 * Fetch and parse the SPC case list pages. Per-page failures are logged and
 * skipped; throws only if EVERY page failed.
 * @returns {Promise<{items:object[], fetchedPages:number, failedPages:number}>}
 */
async function fetchCaseLists(deadline) {
  const items = [];
  const seen = new Set();
  let fetchedPages = 0;
  let failedPages = 0;
  let lastError = null;

  for (const src of LIST_SOURCES) {
    for (const url of src.urls) {
      if (deadline && deadline - Date.now() < 4000) {
        console.error('[cases] budget low, skipping remaining list pages');
        break;
      }
      try {
        const html = await fetchText(url, { deadline, rps: 5, timeoutMs: 15000 });
        fetchedPages++;
        for (const item of parseListPage(html, src.label)) {
          if (seen.has(item.url)) continue;
          seen.add(item.url);
          items.push(item);
        }
      } catch (e) {
        failedPages++;
        lastError = e;
        console.error(`[cases] list page failed ${url}: ${e.message}`);
      }
    }
  }

  if (fetchedPages === 0) {
    throw lastError || new Error('未能抓取任何案例列表页');
  }
  return { items, fetchedPages, failedPages };
}

module.exports = { fetchCaseLists, COURT_BASE, parseListPage };
