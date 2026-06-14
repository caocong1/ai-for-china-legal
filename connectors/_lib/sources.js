'use strict';
// sources.js — registry of authoritative Chinese legal data sources.
// Channel levels: A (official primary) ... E (unverified aggregator).
// access: "json-api" (machine endpoint) | "html-fetch" (page scraping).

const SOURCES = [
  {
    id: 'flk',
    name: '国家法律法规数据库（全国人大常委会办公厅）',
    base_url: 'https://flk.npc.gov.cn',
    channel_level: 'A',
    doc_types: ['宪法', '法律', '行政法规', '监察法规', '地方性法规', '司法解释'],
    access: 'json-api',
    health_url: 'https://flk.npc.gov.cn/law-search/search/enumData',
  },
  {
    id: 'xzfg',
    name: '国家规章库（司法部）',
    base_url: 'https://xzfg.moj.gov.cn',
    channel_level: 'A',
    doc_types: ['部门规章', '地方政府规章'],
    access: 'html-fetch',
    health_url: 'https://xzfg.moj.gov.cn',
  },
  {
    id: 'gov-zcwjk',
    name: '国务院政策文件库',
    base_url: 'https://sousuo.www.gov.cn/zcwjk',
    channel_level: 'A',
    doc_types: ['行政法规', '规范性文件', '政策文件'],
    access: 'json-api',
    health_url: 'https://sousuo.www.gov.cn/zcwjk',
  },
  {
    id: 'court',
    name: '最高人民法院官网',
    base_url: 'https://www.court.gov.cn',
    channel_level: 'A',
    doc_types: ['司法解释', '指导性案例', '典型案例'],
    access: 'html-fetch',
    health_url: 'https://www.court.gov.cn',
  },
  {
    id: 'gov-gongbao',
    name: '国务院公报',
    base_url: 'https://www.gov.cn/gongbao',
    channel_level: 'A',
    doc_types: ['行政法规', '部门规章', '司法解释'],
    access: 'html-fetch',
    health_url: 'https://www.gov.cn/gongbao',
  },
  {
    id: 'rmfyalk',
    name: '人民法院案例库',
    base_url: 'https://rmfyalk.court.gov.cn',
    channel_level: 'A',
    doc_types: ['入库案例'],
    access: 'html-fetch',
    health_url: 'https://rmfyalk.court.gov.cn',
  },
  {
    id: 'spp',
    name: '最高人民检察院官网',
    base_url: 'https://www.spp.gov.cn',
    channel_level: 'A',
    doc_types: ['司法解释', '指导性案例'],
    access: 'html-fetch',
    health_url: 'https://www.spp.gov.cn',
  },
  {
    id: 'wenshu',
    name: '中国裁判文书网',
    base_url: 'https://wenshu.court.gov.cn',
    channel_level: 'C',
    doc_types: ['裁判文书'],
    access: 'html-fetch',
    health_url: 'https://wenshu.court.gov.cn',
  },
];

/** @returns {object|undefined} source descriptor by id */
function getSource(id) {
  return SOURCES.find((s) => s.id === id);
}

/** @returns {object[]} all registered sources */
function listSources() {
  return SOURCES.slice();
}

/** @returns {object[]} sources covering the given doc type, best channel first */
function sourcesForDocType(docType) {
  return SOURCES.filter((s) => s.doc_types.includes(docType)).sort((a, b) =>
    a.channel_level.localeCompare(b.channel_level)
  );
}

module.exports = { SOURCES, getSource, listSources, sourcesForDocType };
