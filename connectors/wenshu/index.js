'use strict';
// wenshu MCP connector — 中国裁判文书网 (wenshu.court.gov.cn).
// Launched as `node index.js`; line-delimited JSON-RPC over stdio.
// Node 18+ built-ins only, zero npm dependencies. ALL logging -> stderr.

const { serve } = require('../_lib/rpc');
const { DegradedError, fetchJson } = require('../_lib/http');
const cache = require('../_lib/cache');

const SERVER = 'wenshu';
const SERVER_INFO = { name: 'wenshu', version: '1.0.0' };
const BUDGET_MS = 40000;

// Environment configuration
const API_URL = (process.env.WENSHU_API_URL || 'https://wenshu.court.gov.cn/api').replace(/\/$/, '');
const API_KEY = process.env.WENSHU_API_KEY || '';

// Check if API key is configured
function checkApiKey() {
  if (!API_KEY) {
    return {
      error: true,
      message: 'WENSHU_API_KEY not configured. Set it in .env to enable case search. ' +
               'Get API access from https://wenshu.court.gov.cn after registration.'
    };
  }
  return { error: false };
}

// ---------------------------------------------------------------------------
// Tool schemas — VERBATIM from connectors/wenshu/connector.json "tools".
// ---------------------------------------------------------------------------
const TOOLS = [
  {
    name: 'search_cases',
    description: '根据关键词、案由、法院、日期范围等条件搜索裁判文书',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: '搜索关键词',
        },
        causeOfAction: {
          type: 'string',
          description: '案由分类（如：买卖合同纠纷、劳动争议）',
        },
        courtName: {
          type: 'string',
          description: '法院名称',
        },
        courtLevel: {
          type: 'string',
          enum: ['基层', '中级', '高级', '最高'],
          description: '法院层级',
        },
        dateRange: {
          type: 'object',
          properties: {
            start: { type: 'string', format: 'date' },
            end: { type: 'string', format: 'date' },
          },
          description: '裁判日期范围',
        },
        caseType: {
          type: 'string',
          enum: ['民事', '刑事', '行政', '执行', '其他'],
          description: '案件类型',
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
    name: 'get_case_detail',
    description: '根据案号获取裁判文书详情',
    inputSchema: {
      type: 'object',
      properties: {
        caseNumber: {
          type: 'string',
          description: '案号（如：(2026)京01民初1234号）',
        },
      },
      required: ['caseNumber'],
    },
  },
  {
    name: 'get_case_statistics',
    description: '获取案件统计数据（裁判趋势、地域分布等）',
    inputSchema: {
      type: 'object',
      properties: {
        causeOfAction: {
          type: 'string',
          description: '案由分类',
        },
        courtName: {
          type: 'string',
          description: '法院名称',
        },
        timeRange: {
          type: 'string',
          enum: ['近1月', '近3月', '近6月', '近1年', '近3年'],
          description: '统计时间范围',
        },
        groupBy: {
          type: 'string',
          enum: ['月份', '法院', '案由', '地域'],
          description: '分组维度',
        },
      },
      required: ['causeOfAction'],
    },
  },
];

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

function mapCourtLevel(level) {
  const map = { '基层': 1, '中级': 2, '高级': 3, '最高': 4 };
  return map[level] || null;
}

function mapCaseType(caseType) {
  const map = { '民事': 'ms', '刑事': 'xs', '行政': 'xz', '执行': 'zx', '其他': 'qt' };
  return map[caseType] || null;
}

function mapTimeRange(range) {
  const now = new Date();
  const end = now.toISOString().slice(0, 10);
  let months = 0;
  if (range === '近1月') months = 1;
  else if (range === '近3月') months = 3;
  else if (range === '近6月') months = 6;
  else if (range === '近1年') months = 12;
  else if (range === '近3年') months = 36;
  
  if (months > 0) {
    const start = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
    return { start: start.toISOString().slice(0, 10), end };
  }
  return null;
}

// ---------------------------------------------------------------------------
// search_cases
// ---------------------------------------------------------------------------
async function searchCases(args, deadline) {
  const keyCheck = checkApiKey();
  if (keyCheck.error) {
    return { text: keyCheck.message, cacheable: false };
  }

  const keyword = String(args.keyword || '').trim();
  const pageNum = Math.max(1, parseInt(args.page, 10) || 1);
  const pageSize = clamp(parseInt(args.pageSize, 10) || 10, 1, 50);

  // Build request body
  const body = {
    pageId: pageNum,
    pageSize: pageSize,
    sortFields: 'cprelateddesc',
  };

  // Add search conditions
  const conditions = [];
  if (keyword) {
    conditions.push({ key: 's8', value: keyword });
  }
  if (args.causeOfAction) {
    conditions.push({ key: 's11', value: args.causeOfAction });
  }
  if (args.courtName) {
    conditions.push({ key: 's2', value: args.courtName });
  }
  if (args.courtLevel) {
    const level = mapCourtLevel(args.courtLevel);
    if (level) conditions.push({ key: 's9', value: String(level) });
  }
  if (args.caseType) {
    const type = mapCaseType(args.caseType);
    if (type) conditions.push({ key: 's10', value: type });
  }
  if (args.dateRange && (args.dateRange.start || args.dateRange.end)) {
    const start = args.dateRange.start || '1996-01-01';
    const end = args.dateRange.end || new Date().toISOString().slice(0, 10);
    conditions.push({ key: 'cprqStart', value: start });
    conditions.push({ key: 'cprqEnd', value: end });
  }

  if (conditions.length > 0) {
    body.condition = conditions;
  }

  try {
    const url = `${API_URL}/wenshu/website/queryDocument`;
    const headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    };

    const resp = await fetchJson(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      deadline,
      rps: 1,
    });

    if (!resp || !resp.data || !Array.isArray(resp.data.queryResult)) {
      return {
        text: `裁判文书网未返回有效数据。响应: ${JSON.stringify(resp).slice(0, 200)}`,
        cacheable: true,
      };
    }

    const results = resp.data.queryResult;
    const total = resp.data.totalCount || results.length;

    if (results.length === 0) {
      return {
        text: `裁判文书网未找到与「${keyword || '（无关键词）'}」匹配的案例。` +
              `可尝试更换关键词或调整筛选条件。`,
        cacheable: true,
      };
    }

    const header = `裁判文书网搜索结果: 共 ${total} 条，第 ${pageNum} 页显示 ${results.length} 条。`;
    const blocks = results.map((item) => {
      const lines = [
        `案号: ${item.caseNumber || item.s7 || '未知'}`,
        `标题: ${item.caseName || item.s1 || '未知'}`,
        `法院: ${item.courtName || item.s2 || '未知'}`,
        `裁判日期: ${item.judgeDate || item.s31 || '未知'}`,
        `案由: ${item.causeAction || item.s11 || '未知'}`,
      ];
      if (item.summary || item.s3) {
        lines.push(`摘要: ${String(item.summary || item.s3).slice(0, 200)}`);
      }
      return lines.join('\n');
    });

    return {
      text: header + '\n\n' + blocks.join('\n\n'),
      cacheable: true,
    };
  } catch (err) {
    console.error('[search_cases] error:', (err && err.stack) || err);
    const reason = (err && err.message) || String(err);
    return {
      text: `裁判文书网查询失败。\n原因: ${reason}\n` +
            `建议: 检查 WENSHU_API_KEY 是否有效，或稍后重试。`,
      cacheable: false,
    };
  }
}

// ---------------------------------------------------------------------------
// get_case_detail
// ---------------------------------------------------------------------------
async function getCaseDetail(args, deadline) {
  const keyCheck = checkApiKey();
  if (keyCheck.error) {
    return { text: keyCheck.message, cacheable: false };
  }

  const caseNumber = String(args.caseNumber || '').trim();
  if (!caseNumber) {
    return {
      text: '请提供 caseNumber（案号）参数，例如 {"caseNumber":"(2026)京01民初1234号"}。',
      cacheable: false,
    };
  }

  try {
    const url = `${API_URL}/wenshu/website/getDocContent`;
    const headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    };

    const resp = await fetchJson(url, {
      method: 'POST',
      body: JSON.stringify({ caseNumber }),
      headers,
      deadline,
      rps: 1,
    });

    if (!resp || !resp.data) {
      return {
        text: `裁判文书网未找到案号为「${caseNumber}」的文书。\n` +
              `响应: ${JSON.stringify(resp).slice(0, 200)}`,
        cacheable: true,
      };
    }

    const doc = resp.data;
    const lines = [
      `案号: ${doc.caseNumber || caseNumber}`,
      `标题: ${doc.caseName || doc.title || '未知'}`,
      `法院: ${doc.courtName || '未知'}`,
      `裁判日期: ${doc.judgeDate || doc.judgeDate || '未知'}`,
      `案由: ${doc.causeAction || '未知'}`,
      `案件类型: ${doc.caseType || '未知'}`,
    ];

    if (doc.parties) {
      lines.push(`\n当事人:\n${doc.parties}`);
    }

    if (doc.legalBasis) {
      lines.push(`\n法律依据:\n${doc.legalBasis}`);
    }

    if (doc.judgmentResult || doc.content) {
      const content = doc.judgmentResult || doc.content || '';
      lines.push(`\n裁判结果:\n${content.slice(0, 8000)}`);
      if (content.length > 8000) {
        lines.push('......（正文已截断）');
      }
    }

    return {
      text: lines.join('\n'),
      cacheable: true,
    };
  } catch (err) {
    console.error('[get_case_detail] error:', (err && err.stack) || err);
    const reason = (err && err.message) || String(err);
    return {
      text: `获取案号「${caseNumber}」的文书详情失败。\n原因: ${reason}\n` +
            `建议: 检查案号格式是否正确，或 WENSHU_API_KEY 是否有效。`,
      cacheable: false,
    };
  }
}

// ---------------------------------------------------------------------------
// get_case_statistics
// ---------------------------------------------------------------------------
async function getCaseStatistics(args, deadline) {
  const keyCheck = checkApiKey();
  if (keyCheck.error) {
    return { text: keyCheck.message, cacheable: false };
  }

  const causeOfAction = String(args.causeOfAction || '').trim();
  if (!causeOfAction) {
    return {
      text: '请提供 causeOfAction（案由分类）参数，例如 {"causeOfAction":"买卖合同纠纷"}。',
      cacheable: false,
    };
  }

  // Build request
  const body = {
    causeAction: causeOfAction,
  };

  if (args.courtName) {
    body.courtName = args.courtName;
  }

  if (args.timeRange) {
    const range = mapTimeRange(args.timeRange);
    if (range) {
      body.dateStart = range.start;
      body.dateEnd = range.end;
    }
  }

  if (args.groupBy) {
    body.groupBy = args.groupBy;
  }

  try {
    const url = `${API_URL}/wenshu/website/getStatistics`;
    const headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    };

    const resp = await fetchJson(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      deadline,
      rps: 1,
    });

    if (!resp || !resp.data) {
      return {
        text: `裁判文书网未返回有效统计数据。\n` +
              `响应: ${JSON.stringify(resp).slice(0, 200)}`,
        cacheable: true,
      };
    }

    const stats = resp.data;
    const lines = [`案由「${causeOfAction}」统计结果:`];

    if (stats.totalCount !== undefined) {
      lines.push(`总案件数: ${stats.totalCount}`);
    }

    if (args.timeRange) {
      lines.push(`时间范围: ${args.timeRange}`);
    }

    if (stats.distribution && Array.isArray(stats.distribution)) {
      lines.push(`\n按${args.groupBy || '分组'}统计:`);
      for (const item of stats.distribution.slice(0, 20)) {
        lines.push(`  ${item.name || item.label}: ${item.count}件`);
      }
    }

    if (stats.trend && Array.isArray(stats.trend)) {
      lines.push(`\n裁判趋势:`);
      for (const item of stats.trend.slice(0, 20)) {
        lines.push(`  ${item.period || item.date}: ${item.count}件`);
      }
    }

    return {
      text: lines.join('\n'),
      cacheable: true,
    };
  } catch (err) {
    console.error('[get_case_statistics] error:', (err && err.stack) || err);
    const reason = (err && err.message) || String(err);
    return {
      text: `获取案由「${causeOfAction}」的统计数据失败。\n原因: ${reason}\n` +
            `建议: 检查 WENSHU_API_KEY 是否有效，或稍后重试。`,
      cacheable: false,
    };
  }
}

// ---------------------------------------------------------------------------
// dispatch
// ---------------------------------------------------------------------------
async function callTool(name, args) {
  const deadline = Date.now() + BUDGET_MS;
  console.error(`[wenshu] tools/call ${name} args=${JSON.stringify(args).slice(0, 300)}`);

  switch (name) {
    case 'search_cases':
      return cache.withCache(SERVER, name, args, () => searchCases(args, deadline));
    case 'get_case_detail':
      return cache.withCache(SERVER, name, args, () => getCaseDetail(args, deadline));
    case 'get_case_statistics':
      return cache.withCache(SERVER, name, args, () => getCaseStatistics(args, deadline));
    default:
      throw new Error(`未知工具: ${name}（可用: search_cases, get_case_detail, get_case_statistics）`);
  }
}

serve({ serverInfo: SERVER_INFO, tools: TOOLS, callTool });
console.error(
  `[wenshu] connector ready (apiKey=${API_KEY ? 'configured' : 'missing'}, ` +
    `cacheTTL=${cache.ttlSeconds()}s)`
);
