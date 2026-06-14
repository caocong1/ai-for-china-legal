'use strict';
// law-database MCP connector — 国家法律法规数据库 + 最高法案例列表.
// Launched as `node index.js`; line-delimited JSON-RPC over stdio.
// Node 18+ built-ins only, zero npm dependencies. ALL logging -> stderr.

const path = require('path');

// Fixtures mode for tests: LAW_DB_FIXTURES=1 -> read canned responses from
// ./fixtures instead of the network (FIXTURES_DIR may still override).
if (process.env.LAW_DB_FIXTURES && !process.env.FIXTURES_DIR) {
  process.env.FIXTURES_DIR = path.join(__dirname, 'fixtures');
}

const { serve } = require('../_lib/rpc');
const { DegradedError, fetchText } = require('../_lib/http');
const cache = require('../_lib/cache');
const { TIER, METHOD, VALIDITY, provenanceBlock, validityFromSxx, sxxLabel } = require('../_lib/provenance');
const { getSource } = require('../_lib/sources');
const flk = require('./flk');
const cases = require('./cases');

const SERVER = 'law-database';
const SERVER_INFO = { name: 'law-database', version: '1.0.0' };
// Each tools/call must finish well under the app's 60s timeout.
const BUDGET_MS = 40000;
const DETAIL_MAX_CHARS = 8000;

const WENSHU_NOTE = '全网裁判文书与入库案例请用 mcp__wenshu__search_cases（如可用）';

// ---------------------------------------------------------------------------
// Tool schemas — VERBATIM from connectors/law-database/connector.json "tools".
// ---------------------------------------------------------------------------
const TOOLS = [
  {
    name: 'search_laws',
    description: '根据关键词、法规类型、发布机构等条件搜索法律法规',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: '搜索关键词',
        },
        lawType: {
          type: 'string',
          enum: ['法律', '行政法规', '部门规章', '地方性法规', '地方政府规章', '司法解释', '规范性文件'],
          description: '法规类型',
        },
        issuingAuthority: {
          type: 'string',
          description: '发布机构（如：全国人大、国务院、最高人民法院）',
        },
        dateRange: {
          type: 'object',
          properties: {
            start: { type: 'string', format: 'date' },
            end: { type: 'string', format: 'date' },
          },
          description: '发布日期范围',
        },
        status: {
          type: 'string',
          enum: ['现行有效', '已修改', '已废止', '尚未生效'],
          description: '法规状态',
        },
        page: {
          type: 'integer',
          default: 1,
          description: '页码',
        },
        pageSize: {
          type: 'integer',
          default: 20,
          description: '每页数量',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_law_detail',
    description: '根据法规文号获取法律法规全文及详细信息',
    inputSchema: {
      type: 'object',
      properties: {
        documentNumber: {
          type: 'string',
          description: '法规文号（如：主席令第XX号）',
        },
        lawName: {
          type: 'string',
          description: '法规名称',
        },
        includeHistory: {
          type: 'boolean',
          default: false,
          description: '是否包含修订历史',
        },
        includeRelatedCases: {
          type: 'boolean',
          default: false,
          description: '是否包含关联案例',
        },
      },
      required: [],
    },
  },
  {
    name: 'search_cases_by_law',
    description: '根据法律法规查找引用该法规的裁判文书',
    inputSchema: {
      type: 'object',
      properties: {
        lawName: {
          type: 'string',
          description: '法规名称',
        },
        documentNumber: {
          type: 'string',
          description: '法规文号',
        },
        articleNumber: {
          type: 'string',
          description: '条文编号（如：第一百四十三条）',
        },
        courtLevel: {
          type: 'string',
          enum: ['基层', '中级', '高级', '最高'],
          description: '法院层级',
        },
        page: {
          type: 'integer',
          default: 1,
          description: '页码',
        },
        pageSize: {
          type: 'integer',
          default: 20,
          description: '每页数量',
        },
      },
      required: [],
    },
  },
];

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

function flkHitBlock(row) {
  const title = flk.stripTags(row.title);
  const lines = [
    `标题: ${title}`,
    `类型: ${row.flxz || '未知'}`,
    `制定机关: ${row.zdjgName || '未知'}`,
    `公布日期: ${row.gbrq || '未知'}`,
    `施行日期: ${row.sxrq || '未知'}`,
  ];
  if (Number(row.sxx) === 4) lines.push('法规状态: 尚未生效');
  return (
    lines.join('\n') +
    '\n' +
    provenanceBlock({
      tier: TIER.L1_REGULATION,
      channel: getSource('flk').channel_level,
      url: flk.detailPageUrl(row.bbbs),
      method: METHOD.FLK_API,
      validity: validityFromSxx(row.sxx),
    })
  );
}

function flkDegradeText(toolHint, err) {
  const reason = (err && err.message) || String(err);
  return [
    `国家法律法规数据库（flk.npc.gov.cn）当前不可达或已降级，未能完成${toolHint}。`,
    `降级原因: ${reason}`,
    '建议改用本地法规库工具 search_law（如可用），或稍后重试。',
    '引用任何非全文来源时请标注 [搜索摘要-未抓全文]。',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// search_laws
// ---------------------------------------------------------------------------
async function searchLaws(args, deadline) {
  const keyword = String(args.keyword || '').trim();
  if (!keyword) {
    return { text: '请提供 keyword 参数（搜索关键词），例如 {"keyword":"民法典"}。', cacheable: false };
  }
  const pageNum = Math.max(1, parseInt(args.page, 10) || 1);
  const pageSize = clamp(parseInt(args.pageSize, 10) || 10, 1, 20);

  const notes = [];
  if (args.lawType && !flk.LAW_TYPE_TO_FLFG[args.lawType]) {
    notes.push(
      `注意: flk 不收录「${args.lawType}」（其覆盖范围为宪法/法律/行政法规/监察法规/地方法规/司法解释），` +
        '本次按全部类别搜索；部门规章/地方政府规章建议查国家规章库 https://xzfg.moj.gov.cn 。'
    );
  }

  try {
    // searchType:1 = 精确短语（标题），precision first; fall back to 模糊.
    let mode = '精确';
    let resp = await flk.searchList({
      keyword,
      lawType: args.lawType,
      status: args.status,
      dateRange: args.dateRange,
      pageNum,
      pageSize,
      searchType: 1,
      deadline,
    });
    if (resp.rows.length === 0) {
      mode = '模糊';
      resp = await flk.searchList({
        keyword,
        lawType: args.lawType,
        status: args.status,
        dateRange: args.dateRange,
        pageNum,
        pageSize,
        searchType: 2,
        deadline,
      });
    }

    let rows = resp.rows;
    if (args.issuingAuthority) {
      // flk filters 制定机关 by internal code ids; we filter client-side on
      // the returned 制定机关 name instead (substring match).
      const auth = String(args.issuingAuthority).trim();
      rows = rows.filter((r) => (r.zdjgName || '').includes(auth));
      if (rows.length === 0) {
        notes.push(`注意: 按发布机构「${auth}」过滤后本页无结果（过滤在返回页内进行）。`);
      }
    }

    if (rows.length === 0) {
      return {
        text:
          `国家法律法规数据库未找到与「${keyword}」匹配的法规（已尝试精确与模糊匹配）。\n` +
          (notes.length ? notes.join('\n') + '\n' : '') +
          '可尝试更换关键词，或使用本地法规库工具 search_law（如可用）。',
        cacheable: true,
      };
    }

    const header =
      `国家法律法规数据库（flk.npc.gov.cn）「${keyword}」${mode}匹配: 共 ${resp.total} 条，` +
      `第 ${pageNum} 页显示 ${rows.length} 条。`;
    const text =
      [header, ...notes].join('\n') + '\n\n' + rows.map(flkHitBlock).join('\n\n');
    return { text, cacheable: true };
  } catch (err) {
    console.error('[search_laws] degraded:', (err && err.stack) || err);
    return { text: flkDegradeText('法规搜索', err), cacheable: false };
  }
}

// ---------------------------------------------------------------------------
// get_law_detail
// ---------------------------------------------------------------------------

// Gold URLs verified in shared/research-gate/references/authoritative-sources.md
// (court.gov.cn serves these full texts reliably; both are 现行有效).
const GOLD_DOCS = [
  {
    match: /担保制度|法释〔2020〕28号|法释\[2020\]28号/,
    title: '最高人民法院关于适用《中华人民共和国民法典》有关担保制度的解释（法释〔2020〕28号）',
    url: 'https://www.court.gov.cn/zixun/xiangqing/282721.html',
  },
  {
    match: /独立保函|法释〔2016〕24号|法释\[2016\]24号/,
    title: '最高人民法院关于审理独立保函纠纷案件若干问题的规定（法释〔2016〕24号）',
    url: 'https://www.court.gov.cn/zixun-xiangqing-31291.html',
  },
];

const ARTICLE_SPLIT_RE = /(?=第[一二三四五六七八九十百千零〇0-9]+条)/;

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/(p|div|li|h[1-6]|tr|br)>/gi, '\n')
    .replace(/<br[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function truncateByArticles(fullText, maxChars) {
  const parts = fullText.split(ARTICLE_SPLIT_RE);
  const head = parts[0] || '';
  const articles = parts.slice(1);
  const totalArticles = articles.length;

  // Keep title/题注 from the head but drop a very long 目录 block.
  let headOut = head.trim();
  if (headOut.length > 600) headOut = headOut.slice(0, 600) + '\n……（目录等前置内容已截断）';

  let used = headOut.length;
  const kept = [];
  for (const a of articles) {
    if (used + a.length > maxChars) break;
    kept.push(a.trimEnd());
    used += a.length;
  }

  let body = headOut + (kept.length ? '\n\n' + kept.join('\n') : '');
  let note = '';
  if (totalArticles === 0) {
    // Document without 条 structure: plain char truncation.
    if (fullText.length > maxChars) {
      body = fullText.slice(0, maxChars);
      note = `\n……（正文未按"条"分节，已按字数截断，全文约 ${fullText.length} 字，完整文本见上方链接）`;
    } else {
      body = fullText;
    }
  } else if (kept.length < totalArticles) {
    note = `\n……（已截断：共 ${totalArticles} 条，以上显示前 ${kept.length} 条，全文约 ${fullText.length} 字，完整文本见上方链接）`;
  }
  return body + note;
}

function pickBestRow(rows, term) {
  const scored = rows.map((r) => {
    const title = flk.stripTags(r.title);
    let score = 0;
    if (title === term) score += 100;
    else if (title.includes(term)) score += 50;
    if (Number(r.sxx) === 3) score += 5; // prefer 现行有效
    if (r.flxz === '法律' || r.flxz === '宪法' || r.flxz === '司法解释') score += 2;
    return { row: r, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.length ? scored[0].row : null;
}

async function getLawDetail(args, deadline) {
  const term = String(args.lawName || args.documentNumber || '').trim().replace(/[《》]/g, '');
  if (!term) {
    return { text: '请提供 lawName（法规名称）或 documentNumber（法规文号）。', cacheable: false };
  }

  const notes = [];
  if (!args.lawName && args.documentNumber) {
    notes.push('注意: flk 不支持按文号检索，已将文号作为标题关键词搜索，命中率可能较低。');
  }

  // --- primary: flk ---
  try {
    let resp = await flk.searchList({ keyword: term, pageNum: 1, pageSize: 10, searchType: 1, deadline });
    if (resp.rows.length === 0) {
      resp = await flk.searchList({ keyword: term, pageNum: 1, pageSize: 10, searchType: 2, deadline });
    }
    const best = pickBestRow(resp.rows, term);
    if (!best) throw new DegradedError(`flk 未检索到「${term}」`);

    const title = flk.stripTags(best.title);
    const fullText = await flk.fetchLawText(best.bbbs, deadline);

    const metaLines = [
      `标题: ${title}`,
      `类型: ${best.flxz || '未知'}`,
      `制定机关: ${best.zdjgName || '未知'}`,
      `公布日期: ${best.gbrq || '未知'}`,
      `施行日期: ${best.sxrq || '未知'}`,
      `法规状态: ${sxxLabel(best.sxx)}`,
    ];

    if (args.includeHistory) {
      try {
        const detail = await flk.lawDetails(best.bbbs, deadline);
        const related = (detail && detail.xgwj) || [];
        if (Array.isArray(related) && related.length) {
          metaLines.push(
            '相关文件: ' + related.slice(0, 5).map((x) => flk.stripTags(x.title || x.name || '')).filter(Boolean).join('；')
          );
        } else {
          metaLines.push('修订历史: flk 详情接口未提供该文件的修订历史记录。');
        }
      } catch (e) {
        console.error('[get_law_detail] includeHistory fetch failed:', e.message);
        metaLines.push('修订历史: 获取失败（不影响正文）。');
      }
    }
    if (args.includeRelatedCases) {
      metaLines.push(`关联案例: 请使用 search_cases_by_law 工具查询；${WENSHU_NOTE}。`);
    }

    const prov = provenanceBlock({
      tier: TIER.L1_REGULATION,
      channel: getSource('flk').channel_level,
      url: flk.detailPageUrl(best.bbbs),
      method: METHOD.FLK_API,
      validity: validityFromSxx(best.sxx),
    });

    const text =
      [...metaLines, ...notes].join('\n') +
      '\n' +
      prov +
      '\n\n正文:\n' +
      truncateByArticles(fullText, DETAIL_MAX_CHARS);
    return { text, cacheable: true };
  } catch (flkErr) {
    console.error('[get_law_detail] flk path failed:', (flkErr && flkErr.stack) || flkErr);

    // --- fallback 1: hardcoded gold URLs (court.gov.cn full texts) ---
    const gold = GOLD_DOCS.find((g) => g.match.test(term));
    if (gold) {
      try {
        const html = await fetchText(gold.url, { deadline, rps: 5 });
        const text = htmlToText(html);
        const prov = provenanceBlock({
          tier: TIER.L1_COURT,
          channel: getSource('court').channel_level,
          url: gold.url,
          method: METHOD.COURT_FETCH,
          validity: VALIDITY.ACTIVE,
        });
        return {
          text:
            `标题: ${gold.title}\n（flk 不可达，已从最高人民法院官网金牌链接获取全文）\n` +
            prov +
            '\n\n正文:\n' +
            truncateByArticles(text, DETAIL_MAX_CHARS),
          cacheable: true,
        };
      } catch (goldErr) {
        console.error('[get_law_detail] gold URL fallback failed:', goldErr.message);
      }
    }

    // --- fallback 2: honest failure ---
    const prov = provenanceBlock({
      tier: TIER.SUMMARY_ONLY,
      channel: 'E',
      url: flk.FLK_ORIGIN + '/',
      method: METHOD.NO_FULLTEXT,
      validity: VALIDITY.UNKNOWN,
    });
    return {
      text:
        `未能从权威源获取「${term}」的全文。\n` +
        `失败原因: ${(flkErr && flkErr.message) || flkErr}\n` +
        prov +
        '\n\n后续引用该法规内容时请标注 [搜索摘要-未抓全文]，' +
        '或改用本地法规库工具 search_law（如可用）后再核对正文。',
      cacheable: false,
    };
  }
}

// ---------------------------------------------------------------------------
// search_cases_by_law
// ---------------------------------------------------------------------------
async function searchCasesByLaw(args, deadline) {
  const raw = String(args.lawName || args.documentNumber || '').trim();
  const keyword = raw.replace(/[《》]/g, '').replace(/^中华人民共和国/, '');
  const pageNum = Math.max(1, parseInt(args.page, 10) || 1);
  const pageSize = clamp(parseInt(args.pageSize, 10) || 10, 1, 20);

  const notes = [];
  if (args.articleNumber) {
    notes.push(
      `注意: 案例列表页仅含标题，无法按条文「${args.articleNumber}」过滤；条文级检索请用裁判文书工具。`
    );
  }
  if (args.courtLevel && args.courtLevel !== '最高') {
    notes.push(
      `注意: 本工具覆盖最高人民法院发布的指导性/典型案例；「${args.courtLevel}」法院的裁判文书请用裁判文书工具。`
    );
  }

  try {
    const { items, fetchedPages, failedPages } = await cases.fetchCaseLists(deadline);
    const filtered = keyword ? items.filter((it) => it.title.includes(keyword)) : items;
    const start = (pageNum - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    if (pageItems.length === 0) {
      return {
        text:
          (keyword
            ? `未在最高人民法院指导性案例/典型案例列表（已抓取 ${fetchedPages} 页）的标题中找到与「${keyword}」相关的案例。`
            : '案例列表为空。') +
          '\n说明: 该匹配仅基于案例标题，标题未提及法规名不代表不存在相关案例。\n' +
          (notes.length ? notes.join('\n') + '\n' : '') +
          WENSHU_NOTE,
        cacheable: true,
      };
    }

    const blocks = pageItems.map((it) =>
      [
        `标题: ${it.title}`,
        `发布栏目: ${it.source}`,
        `发布日期: ${it.date || '未知'}`,
        provenanceBlock({
          tier: TIER.L2_GUIDING,
          channel: getSource('court').channel_level,
          url: it.url,
          method: METHOD.COURT_FETCH,
          validity: VALIDITY.UNKNOWN,
        }),
      ].join('\n')
    );

    const header =
      `最高人民法院指导性/典型案例标题匹配「${keyword || '（未提供关键词，返回最新案例）'}」: ` +
      `共 ${filtered.length} 条，第 ${pageNum} 页显示 ${pageItems.length} 条` +
      (failedPages ? `（有 ${failedPages} 个列表页抓取失败，结果可能不全）` : '') +
      '。';
    return {
      text: [header, ...notes].join('\n') + '\n\n' + blocks.join('\n\n') + '\n\n' + WENSHU_NOTE,
      cacheable: true,
    };
  } catch (err) {
    console.error('[search_cases_by_law] degraded:', (err && err.stack) || err);
    return {
      text:
        '最高人民法院官网案例列表当前不可达，未能完成案例检索。\n' +
        `降级原因: ${(err && err.message) || err}\n` +
        WENSHU_NOTE,
      cacheable: false,
    };
  }
}

// ---------------------------------------------------------------------------
// dispatch
// ---------------------------------------------------------------------------
async function callTool(name, args) {
  const deadline = Date.now() + BUDGET_MS;
  console.error(`[law-database] tools/call ${name} args=${JSON.stringify(args).slice(0, 300)}`);

  switch (name) {
    case 'search_laws':
      return cache.withCache(SERVER, name, args, () => searchLaws(args, deadline));
    case 'get_law_detail':
      return cache.withCache(SERVER, name, args, () => getLawDetail(args, deadline));
    case 'search_cases_by_law':
      return cache.withCache(SERVER, name, args, () => searchCasesByLaw(args, deadline));
    default:
      throw new Error(`未知工具: ${name}（可用: search_laws, get_law_detail, search_cases_by_law）`);
  }
}

serve({ serverInfo: SERVER_INFO, tools: TOOLS, callTool });
console.error(
  `[law-database] connector ready (fixtures=${process.env.FIXTURES_DIR ? 'on' : 'off'}, ` +
    `cacheTTL=${cache.ttlSeconds()}s)`
);
