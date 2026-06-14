'use strict';
// flk.js — client for 国家法律法规数据库 (flk.npc.gov.cn).
//
// EMPIRICAL FINDINGS (verified 2026-06-12 against the live site):
// The site was rebuilt as a Vite/Vue SPA; the legacy endpoints from older
// integrations (`GET /api/?txtKw=...`, `POST /api/detail`) are GONE — they now
// return the SPA HTML shell / 405. The current JSON API (mined from the SPA
// bundle /assets/index-*.js and confirmed with real requests) is:
//
//   POST https://flk.npc.gov.cn/law-search/search/list
//     Content-Type: application/json;charset=utf-8
//     body: { searchRange: 1|2,        // 1=标题 2=正文
//             searchType: 1|2|3,       // 1=精确(短语) 2=模糊(分词) — verified
//             searchContent: "<kw>",
//             sxx: [4|3|2|1],          // 时效性 4=尚未生效 3=有效 2=已修改 1=已废止
//             gbrq: [], sxrq: [],      // 公布/施行日期范围 ["YYYY-MM-DD","YYYY-MM-DD"]
//             gbrqYear: [],
//             flfgCodeId: [...],       // 类别 codeIdList — MUST be the full leaf
//                                      // list, a parent codeId alone matches 0
//             zdjgCodeId: [],
//             pageNum: 1, pageSize: 10 // pagination goes IN THE BODY
//                                      // (query-string pageNum/pageSize ignored)
//           }
//     -> { total, rows: [{ bbbs, title (with <em class='highlight'>), gbrq,
//          sxrq, sxx, zdjgName, flxz, flfgCodeId, zdjgCodeId, score }], code, msg }
//
//   GET https://flk.npc.gov.cn/law-search/search/flfgDetails?bbbs=<bbbs>
//     -> { code, msg, data: { title, flxz, zdjgName, gbrq, sxrq, sxx,
//          ossFile: {ossWordPath, ossPdfPath, ...}, content: <TOC tree, titles
//          only — NO article body text>, xgwj, lsyg } }
//
//   GET https://flk.npc.gov.cn/law-search/download/pc?format=docx&bbbs=<bbbs>&fileId=
//     -> { code, msg, data: { url: "<presigned https://flkoss.obs-bj2.cucloud.cn/...docx>" } }
//     The presigned docx is the ONLY machine route to the full body text; we
//     download it and extract word/document.xml (see docx.js).
//
//   GET https://flk.npc.gov.cn/law-search/search/enumData
//     -> category trees; flfg codeIds captured in LAW_TYPE_TO_FLFG below.
//
// Public detail page (for 链接 lines): https://flk.npc.gov.cn/detail?id=<bbbs>
// (the old detail2.html?id= form is gone; the SPA route reads query.id).

const { fetchJson, fetchBuffer, DegradedError } = require('../_lib/http');
const { extractDocxText } = require('./docx');

// LAW_DB_API_URL historically defaulted to https://flk.npc.gov.cn/api (the dead
// legacy API). Accept an env override but strip a trailing /api and unexpanded
// "${...}" placeholders, falling back to the real origin.
const FLK_ORIGIN = (() => {
  const v = process.env.LAW_DB_API_URL;
  if (v && !v.startsWith('${')) {
    try {
      return new URL(v.replace(/\/api\/?$/, '')).origin;
    } catch (e) {
      console.error('[flk] ignoring invalid LAW_DB_API_URL:', v);
    }
  }
  return 'https://flk.npc.gov.cn';
})();

function baseHeaders(extra) {
  const h = Object.assign(
    {
      Referer: FLK_ORIGIN + '/',
      Accept: 'application/json, text/plain, */*',
    },
    extra || {}
  );
  // flk has no public API-key program; only attach auth if a real key is set.
  const key = process.env.LAW_DB_API_KEY;
  if (key && key.trim() && !key.startsWith('${')) {
    h.Authorization = 'Bearer ' + key.trim();
  }
  return h;
}

// 类别 codeIdList values from GET /law-search/search/enumData (2026-06-12).
// Parent codeId alone returns 0 rows — the full leaf list is required.
const LAW_TYPE_TO_FLFG = {
  法律: [101, 102, 110, 120, 130, 140, 150, 155, 160, 170, 180, 190, 195, 200],
  行政法规: [201, 210, 215],
  地方性法规: [221, 222, 230, 260, 270, 290, 295, 300, 305, 310],
  司法解释: [311, 320, 330, 340, 350],
  // 部门规章 / 地方政府规章 / 规范性文件 are NOT in flk's corpus
  // (flk covers 宪法/法律/行政法规/监察法规/地方法规/司法解释 only).
};

const STATUS_TO_SXX = {
  现行有效: [3],
  已修改: [2],
  已废止: [1],
  尚未生效: [4],
};

const stripTags = (s) => String(s || '').replace(/<[^>]+>/g, '');

function assertApiOk(j, what) {
  if (!j || (j.code !== undefined && Number(j.code) !== 200)) {
    throw new DegradedError(`flk ${what} 返回错误：${(j && j.msg) || JSON.stringify(j).slice(0, 160)}`);
  }
}

/**
 * Search 法律法规.
 * @returns {{total:number, rows:object[]}}
 */
async function searchList(opts) {
  const {
    keyword,
    lawType,
    status,
    dateRange,
    pageNum = 1,
    pageSize = 10,
    searchType = 1,
    searchRange = 1,
    deadline,
  } = opts;

  const payload = {
    searchRange,
    sxrq: [],
    gbrq:
      dateRange && dateRange.start && dateRange.end
        ? [dateRange.start, dateRange.end]
        : [],
    searchType,
    sxx: STATUS_TO_SXX[status] || [],
    gbrqYear: [],
    flfgCodeId: LAW_TYPE_TO_FLFG[lawType] || [],
    zdjgCodeId: [],
    searchContent: keyword,
    pageNum,
    pageSize,
  };

  const j = await fetchJson(`${FLK_ORIGIN}/law-search/search/list`, {
    method: 'POST',
    headers: baseHeaders({ 'Content-Type': 'application/json;charset=utf-8' }),
    body: JSON.stringify(payload),
    deadline,
    rps: 5,
  });
  assertApiOk(j, 'search/list');
  if (!Array.isArray(j.rows)) {
    throw new DegradedError(`flk search/list 返回了意外结构：${JSON.stringify(j).slice(0, 160)}`);
  }
  return { total: j.total || 0, rows: j.rows };
}

/** GET flfgDetails (metadata + TOC; no body text). */
async function lawDetails(bbbs, deadline) {
  const j = await fetchJson(
    `${FLK_ORIGIN}/law-search/search/flfgDetails?bbbs=${encodeURIComponent(bbbs)}`,
    { headers: baseHeaders(), deadline, rps: 5 }
  );
  assertApiOk(j, 'search/flfgDetails');
  return j.data;
}

/** Resolve the presigned docx URL, download it, extract plain text. */
async function fetchLawText(bbbs, deadline) {
  const j = await fetchJson(
    `${FLK_ORIGIN}/law-search/download/pc?format=docx&bbbs=${encodeURIComponent(bbbs)}&fileId=`,
    { headers: baseHeaders(), deadline, rps: 5 }
  );
  assertApiOk(j, 'download/pc');
  const url = j.data && j.data.url;
  if (!url) throw new DegradedError('flk download/pc 未返回 docx 下载链接');
  const buf = await fetchBuffer(url, { deadline, rps: 5 });
  return extractDocxText(buf);
}

function detailPageUrl(bbbs) {
  return `${FLK_ORIGIN}/detail?id=${bbbs}`;
}

module.exports = {
  FLK_ORIGIN,
  LAW_TYPE_TO_FLFG,
  STATUS_TO_SXX,
  searchList,
  lawDetails,
  fetchLawText,
  detailPageUrl,
  stripTags,
};
