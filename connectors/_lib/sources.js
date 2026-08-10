'use strict';
// sources.js — registry of authoritative Chinese legal data sources.
// Channel levels: A (official primary), B (licensed commercial legal
// database, e.g. 元典智库) ... E (unverified aggregator).
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
    name: '国家行政法规库（司法部）',
    base_url: 'https://xzfg.moj.gov.cn',
    channel_level: 'A',
    doc_types: ['行政法规'],
    access: 'html-fetch',
    health_url: 'https://xzfg.moj.gov.cn',
  },
  {
    id: 'gov-guizhangku',
    name: '国家规章库（中国政府网）',
    base_url: 'https://www.gov.cn/zhengce/xxgk/gjgzk',
    channel_level: 'A',
    doc_types: ['部门规章', '地方政府规章'],
    access: 'html-fetch',
    health_url: 'https://www.gov.cn/zhengce/xxgk/gjgzk/index.htm',
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
    access: 'json-api',
    health_url: 'https://rmfyalk.court.gov.cn/cpws_al_api/api/cpwsAl/indexTongji',
    note: '连接器已实现（connectors/rmfyalk）：检索/详情 JSON API 需共道账号登录（faxin-cpws-al-token），indexTongji 统计匿名可用',
  },
  {
    id: 'court-gongbao',
    name: '最高人民法院公报',
    base_url: 'http://gongbao.court.gov.cn',
    channel_level: 'A',
    doc_types: ['公报案例', '司法解释'],
    access: 'html-fetch',
    health_url: 'http://gongbao.court.gov.cn',
    note: '2026-08 实测：https 被奇安信云 WAF 按客户端指纹拦截（curl 502，浏览器正常）；http 协议可正常抓取',
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
  {
    id: 'yuandian',
    name: '元典开放平台（元典智库）',
    base_url: 'https://open.chineselaw.com',
    channel_level: 'B',
    doc_types: ['法律', '行政法规', '部门规章', '地方性法规', '司法解释', '法条', '裁判文书', '指导性案例', '典型案例'],
    access: 'json-api',
    health_url: 'https://open.chineselaw.com/api/apis?pageNum=1&pageSize=1',
    note: '兜底/最后选择：按调用计点；赠送积分 2026-09 到期后不再续费，转入冷藏',
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
