# 中国大陆法律源 — 实测可访问性与引用策略

**验证日期**: 2026-05-26（2026-08-10 增补：商业库评估与官方源联邦路线见第 7 节，元典改为兜底定位，新增最高法公报/国家规章库条目）
**验证环境**: WebFetch（HTML → markdown）+ WebSearch（headless Linux）

---

## 1. 法律源优先级

| 级别 | 类型 | 首选源 | 抓取方式 | 状态 |
|------|------|--------|----------|------|
| L1 | 法律/司法解释全文 | `www.court.gov.cn/zixun/xiangqing/{id}.html` | WebFetch | ✅ 全文可抓 |
| L1 | 行政法规/部门规章 | `www.gov.cn/gongbao/.../content_{id}.html` | WebFetch | ⚠️ 已索引，待直测 |
| L1(备份) | 法律法规 | `flk.npc.gov.cn` | ❌ 不可直接抓 | 动态 SPA |
| L2 | 入库案例 | `rmfyalk.court.gov.cn` | JSON API（需登录） | ✅ rmfyalk 连接器（共道账号登录后检索/详情；收录统计接口匿名可用） |
| L2 | 指导/公报/典型案例 | `www.court.gov.cn/shenpan/gengduo/` 等 | WebFetch | ✅ |
| L2 | 最高法公报 | `gongbao.court.gov.cn` | WebFetch | ✅ http 协议可抓（https 被奇安信云 WAF 按客户端指纹拦截返回 502，浏览器正常） |
| L3 | 裁判文书网 | `wenshu.court.gov.cn` | ⚠️ 检索需登录 | wenshu 浏览器连接器（本人扫码登录后人速检索，已实测可用）或转地方法院 |
| L3(替代) | 地方法院公开判决 | 各省高院/中院/金融法院官网 | WebFetch + site: | ✅ |
| L4 | 监管文件 | `www.gov.cn`、各监管局 | WebFetch + site: | ✅ |
| L5 | 律所文章 | zhonglun.com, junhe.com, grandall.com.cn | WebFetch | ⚠️ 部分 timeout |
| L5 | 法律公众号 | `mp.weixin.qq.com` | ❌ 直链不稳 | 搜狗微信 fallback |

## 2. 经实测的金牌 URL

以下 URL 经 WebFetch 实测能拿到全文，可在 skill 模板中直接引用：

| 法规/解释 | URL | 用途 |
|-----------|-----|------|
| 担保制度解释（法释〔2020〕28号） | `https://www.court.gov.cn/zixun/xiangqing/282721.html` | 第21条管辖、第25条保证方式 |
| 独立保函司法解释（法释〔2016〕24号） | `https://www.court.gov.cn/zixun-xiangqing-31291.html` | 第1条开立主体限于银行/非银金融机构 |

> 注：`/zixun-xiangqing-{id}.html`（旧式）和 `/zixun/xiangqing/{id}.html`（新式）两套 URL 都有效。

## 3. 关键入库案例编号

| 编号 | 主题 | 用途 |
|------|------|------|
| `2024-10-2-358-001` | 独立保函主体资格认定（担保公司不属于银行/非银金融机构） | 保函案件首选依据 |

## 4. 关键监管源

| 文件 | 找法 | 关键作用 |
|------|------|----------|
| 非银行金融机构行政许可事项实施办法（金融监管总局令〔2023〕第3号） | WebSearch `site:gov.cn` | 划定"非银行金融机构"范围，不含融资担保公司 |
| 融资担保公司监督管理条例（国务院令第683号） | WebSearch `site:gov.cn` | 融资担保公司业务范围，不含开立独立保函 |
| 招标投标法 + 实施条例 | WebSearch `site:gov.cn` | 投标保证金、弄虚作假依据 |
| 民法典 第686-693条（保证）+ 第388条（担保合同） | court.gov.cn 或 site:gov.cn | 保证合同主体规则、保证方式 |
| 民事诉讼法 第24条 | site:gov.cn | 合同纠纷管辖：被告住所地/合同履行地 |

## 5. 头部律所文章源（仅作线索）

| 律所 | URL |
|------|-----|
| 中伦 | zhonglun.com |
| 君合 | junhe.com |
| 金杜 | kmferguson.com |
| 大成 | grandall.com.cn |
| 康达 | kangdalawyers.com |
| 天同 | tiantonglaw.com |

## 6. MCP 连接器能力（如已配置）

### 6.1 law-database（flk 官方源，A 级，无需 Key）

直连国家法律法规数据库，**法规检索首选**：

| 能力 | 工具 | 说明 |
|------|------|------|
| 法规检索 | `search_laws` | 列表检索，支持类别/状态/发布/施行日期过滤 |
| 法条级检索 | `search_law_articles` | 正文关键词检索，对高命中法规抓全文并展开命中条文原文 |
| 法规全文 | `get_law_detail` | docx 全文，按"条"截断 |
| 单条法条 | `get_article_detail` | 法规名+条号定位条文（支持「188」「第一百八十八条」写法） |
| 引用核验 | `verify_citations` | 抽取《法规》第X条引用，核验存在性/时效性/条文并给出权威原文；案号如实标注无法在线核验 |
| 关联案例 | `search_cases_by_law` | 最高法指导/典型案例标题匹配 |

局限：flk 不收录部门规章/地方政府规章（转国家规章库 www.gov.cn/zhengce/xxgk/gjgzk）；行政法规另见司法部国家行政法规库 xzfg.moj.gov.cn；无案例库。

### 6.2 yuandian（元典智库，B 级商业库，需 API Key）— 兜底/最后选择

**定位：最后选择**。法规检索以 flk 官方源（6.1）优先；案例检索优先 wenshu 连接器与 court.gov.cn 指导/典型案例。元典（厂商宣称 1.7 亿+ 文书库）按调用计点——赠送积分 2026-09 到期后不再续费，连接器转入冷藏，仅在官方源与 wenshu 均不可用时启用。其幻觉校验接口（`verify_legal_citations`）为 VIP 专属，非 VIP 账号返回 403。

**API Key**：未配置 `YUANDIAN_API_KEY` 时首次调用返回「需要元典 API Key」提示——向用户索取后以 `apiKey` 参数重试，连接器临时保存到系统临时目录（0600），后续调用免带。

### 6.3 rmfyalk（人民法院案例库，A 级官方案例源，需登录）

**定位：权威案例首选**。入库案例（指导性案例/参考案例等，2026-08 收录 5521 篇）经最高法筛选，重质量不重数量。连接器通过浏览器持久会话调用站内 JSON API：

| 能力 | 工具 | 说明 |
|------|------|------|
| 案例检索 | `search_cases` | 全文/标题/案号/入库编号/关键词/基本案情等字段，精确/模糊 |
| 案例详情 | `get_case_detail` | 按 gid/案号/入库编号，含基本案情、裁判理由、裁判要旨 |
| 收录统计 | `get_library_stats` | 匿名可用 |

**登录**：检索/详情接口匿名返回 401——`npm run connector:rmfyalk:login` 打开可见窗口，用户本人完成共道统一认证（account.court.gov.cn），会话存本机 profile 后 headless 复用。

## 7. 商业库评估与官方源联邦路线（2026-08）

原则：**不为公开网页的二次聚合付费**；第三方结果只负责"发现"，最终回官方源确认。

| 产品 | 结论 | 说明 |
|------|------|------|
| 北大法宝 MCP (mcp.pkulaw.com) | 唯一建议试用的校验型辅助源 | 法规时效/版本校验、法条案号识别、官方源漏检补召回；支持 MCP/CLI；自助充值最低档约 18 元，验证无效即停 |
| 元典开放平台 | 兜底/最后选择 | 见 6.2；赠送积分 2026-09 到期后冷藏 |
| 法信 | 不作数据源 | 人民法院出版社独家内容（理解与适用、审判指导参考）确有增量，但服务协议禁止系统提取/建库，只适合人工查阅 |
| 法研开放平台 (data.court.gov.cn) | 观察 | 宣称标准接口，但个人套餐与下游授权不透明 |
| 法意 MCP (mcp.lawyee.net) | 观察 | 注册建设中，服务尚未开放 |
| 威科先行 / 律商联讯 | 不推荐 | 中国法数据无个人自助 API |

**官方源联邦检索路线（主方案）**：flk（已接入 law-database）→ 国家行政法规库 xzfg.moj.gov.cn → 国家规章库 gov.cn/zhengce/xxgk/gjgzk → 国务院政策文件库 sousuo.www.gov.cn/zcwjk → 人民法院案例库 rmfyalk（公开 JSON API 已实测可用，无登录无验证码）→ 最高法公报 gongbao.court.gov.cn（2026-08 实测 502，待复测）/ 最高检发布厅 spp.gov.cn。

## 8. 重测信号

以下信号出现时，应重测并更新验证日期：

- WebFetch `court.gov.cn` 任一示例 URL 返回 4xx/5xx
- `flk.npc.gov.cn` 重新可被 WebFetch 抓到内容（可能改为 SSR）
- `wenshu.court.gov.cn` 恢复正常
- `gongbao.court.gov.cn` https 对非浏览器客户端恢复可用（2026-08 奇安信云 WAF 按客户端指纹拦截 curl 返回 502；当前经 http 协议正常抓取，若 http 亦失效需重测）
- 有 X server 环境可用（届时可测试 chrome-devtools 抓取动态页）
