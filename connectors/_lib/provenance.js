'use strict';
// provenance.js — machine-readable provenance lines for result blocks.
//
// Every sourced block ends with EXACTLY these lines (one per line, Chinese
// full-width colons are NOT used — ASCII colon + space, per contract):
//   来源层级: L1-法规        (or L1-法院 / L2-指导 / L2-入库 / 搜索摘要-未抓全文)
//   渠道等级: A              (A-E)
//   链接: <url>
//   获取方式: <flk-api|xzfg|court-fetch|gov-fetch|缓存|未获全文>
//   时效状态: <现行有效|已修改|已废止|未知>

const TIER = {
  L1_REGULATION: 'L1-法规',
  L1_COURT: 'L1-法院',
  L2_GUIDING: 'L2-指导',
  L2_DATABASE: 'L2-入库',
  SUMMARY_ONLY: '搜索摘要-未抓全文',
};

const METHOD = {
  FLK_API: 'flk-api',
  XZFG: 'xzfg',
  COURT_FETCH: 'court-fetch',
  GOV_FETCH: 'gov-fetch',
  CACHED: '缓存',
  NO_FULLTEXT: '未获全文',
};

const VALIDITY = {
  ACTIVE: '现行有效',
  MODIFIED: '已修改',
  REPEALED: '已废止',
  UNKNOWN: '未知',
};

/**
 * flk 时效性 code (sxx) -> provenance 时效状态.
 * flk codes: 4=尚未生效, 3=有效, 2=已修改, 1=已废止.
 * The provenance line value set is fixed to 现行有效|已修改|已废止|未知, so
 * 尚未生效 maps to 未知 here; display blocks show the precise flk label via
 * sxxLabel() instead.
 */
function validityFromSxx(sxx) {
  switch (Number(sxx)) {
    case 3:
      return VALIDITY.ACTIVE;
    case 2:
      return VALIDITY.MODIFIED;
    case 1:
      return VALIDITY.REPEALED;
    default:
      return VALIDITY.UNKNOWN;
  }
}

/** Human-facing flk 时效性 label (includes 尚未生效). */
function sxxLabel(sxx) {
  switch (Number(sxx)) {
    case 4:
      return '尚未生效';
    case 3:
      return '现行有效';
    case 2:
      return '已修改';
    case 1:
      return '已废止';
    default:
      return '未知';
  }
}

/**
 * Format the provenance block.
 * @param {object} p
 * @param {string} p.tier     one of TIER values
 * @param {string} p.channel  channel level "A".."E"
 * @param {string} p.url      source link
 * @param {string} p.method   one of METHOD values
 * @param {string} [p.validity] one of VALIDITY values (default 未知)
 */
function provenanceBlock({ tier, channel, url, method, validity }) {
  return [
    `来源层级: ${tier}`,
    `渠道等级: ${channel}`,
    `链接: ${url}`,
    `获取方式: ${method}`,
    `时效状态: ${validity || VALIDITY.UNKNOWN}`,
  ].join('\n');
}

module.exports = { TIER, METHOD, VALIDITY, provenanceBlock, validityFromSxx, sxxLabel };
