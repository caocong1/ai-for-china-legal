# Changelog

本文件记录 AI for China Legal 的主要变更。仓库版本、文档里程碑和墨律生产 skill 包版本可能不是同一个编号：

- 仓库代码/文档里程碑使用 `v1.x`，`package.json` 与之同步（当前 `1.3.0`）。
- 墨律生产 skill 包建议使用 `YYYY.MM.DD.N`，例如 `2026.06.15.1`。

## [v1.3.0] - 2026-10-22

案例驱动迭代：落地案例库 LWC-2026-0007 的「Skill 改进映射」。该案是律所致客户的咨询型法律备忘录（存量划拨土地变性 + 与房地产开发企业设立项目公司），在律所既有模板内成稿，另附给承办律师的成稿说明，律师评价「很满意」。本版本把这次的交付方式与判断顺序固化下来，不固化该案结论。

### Added

- `construction-legal/skills/land-use-redevelopment/`：存量土地变性与合作开发工作流，包括编排入口和三个子技能：
  - `land-use-change-path`：规划前提；供地方式三层判断（国家一般规则 / 国家保留通道 / 地方通道及其前提）；附条件结论与签约前提；替代路径（政府收回、协商收储）；
  - `land-premium-contract`：「双评估」价差与地方计收档位；复算与现金口径；分期与利息；全款后登记；示范文本 GF-2025-2601；房地一致；资金来源；
  - `land-contribution-jv`：作价出资即转让与 25% 条件；预告登记、项目公司受让、合作开发合同的路径比较；资质不可承继；国资参股；税负提示。
- `construction-legal/skills/_shared/land-law-citations.md`：全国性锚点，2026-10-22 按官方原文核验，逐条区分「已核实」与「代理核对」；附常见错引对照表。
- `construction-legal/skills/_shared/local-rules-chengdu.md`：地方规则样板，包括城市更新条例、低效用地再开发意见（按日期分档计收，30% 档已于 2026-04-30 届满）、转让管理办法（预告登记、先投入后转让）、已失效文件清单。
- `commercial-legal/skills/_shared/transaction-procedure-citations.md`：
  - 新增第八节「中央企业投资监管与参股管理」，覆盖 34 号令、国资发改革规〔2023〕41 号（126 号已废止）、46 号令、2010 年主业沿革、检索不到的国资文件的处理；
  - 第三节 32 号令、12 号令的条号核验升级；增资 40 个工作日与产权转让披露口径分开。
- `shared/references/document-structures.md`：新增「法律备忘录（致客户，咨询型）」骨架与写法：委托说明、材料简称、确认与保证、基本事实来源句、小节标题即结论、小结、结语、落款、附件、逐字脚注与「同前注」。
- `shared/research-gate/references/search-playbooks.md`：新增「存量土地变性 / 城市更新 / 土地合作开发 Playbook」。
- `shared/research-gate/references/source-policy.md`：新增「客户材料中的依据、地方文件时效与反向条款」：客户援引的依据逐条判定；检索不到的文件不据此分析；地方文件先查有效期；有利依据同摘反向条款。`quality-gates.md` 增加对应检查项。
- `shared/research-gate/references/authoritative-sources.md`：新增第 10 节，记录自然资源、国资、金融与地方政府源的实测情况（自然资源部站点不可连、成都市政府系网站返回 412、国资委未公开文件用转载本）、转载本规则；flk 收录地方性法规。
- `shared/legal-document-intake/references/intake-examples.md`：示例 8，给客户的咨询型备忘录（旧稿作模板，政府设定时限），决策为 ready / conditional / critical。

### Changed

- **客户成稿模式**：
  - `document-delivery-qa.md`：通用前提由「最终成果恒标待执业律师复核」改为按交付模式放置人审标记——律师拟原样转发客户的成稿，正文不放内部标记，人审要求由《成稿说明》、`REVIEW_STATUS` 与宿主人审标识承担；
  - 第 5 节改为「客户成稿模式与《成稿说明》」，给出九节结构；
  - 第 2—4 节补充：以旧稿作模板、直接格式模板、每个引用一个脚注与「同前注」、核心属性重置、模板残留检索、客户成稿不设 `updateFields`、pandoc reference-doc 的 `tblInd` 顺序、中文字体映射渲染。
- **条件性继续的边界**（workflow「条件性继续」、intake 第二步、question-routing §6）：经律师转发客户的咨询型备忘录可以写附条件结论；阻断限于以下情形：提交法院、仲裁机构或监管机关；向第三方出具、供其依赖的法律意见书；要求无保留结论；缺口改变委托问题或我方身份。
- workflow：
  - 新增土地变性 / 城市更新 / 合作开发路由与触发词；
  - `INTAKE_DECISION` 须在第一次实质检索或派出子代理前输出（0002、0005、0007 三次读取了 intake 却未输出）；
  - 客户成稿模式交付要求。
- intake：`REVIEW_STATUS` 补充复核模型不可用时的替换、未做第二轮复核的声明；客户成稿模式下，未消解分歧写入《成稿说明》。
- 操作员编排：
  - `operator-orchestration.md` 新增「按议题拆分检索」的统一规则，以及复核输入输出约定（官方原文目录、三档输出、能否发送的总体评价）；
  - `operator-quickstart.md` 第 6 节换用 LWC-2026-0007 实测有效的复核提示词。
- 插件版本：construction-legal 0.3.0（新模块）、commercial-legal 0.4.2；marketplace 与 README / INSTALL 计数同步（69 个顶层 skill、281 个子技能）；`package.json` 1.3.0。

## [v1.2.2] - 2026-10-15

开源生态调研回灌（工具与数据源登记，均标「未实测」）。

### Changed

- `shared/research-gate/references/authoritative-sources.md`：flk JSON 接口可直连说明；元典官方 DSH 插件与统一 MCP 端点；新增企查查法律数据 MCP（含法条 / 案号引用核验）与得理开放平台行；第 9 节新增 GSXT 403 与企查查 / 元典替代、`lawtext/laws` 变化监测、`law-crawler-unified`。
- `shared/references/document-delivery-qa.md`：第 6 节工具参考（docx-redline-js 的「拒绝全部恢复源稿」门禁、Docxodus、OfficeCLI、adeu / safe-docx、vespper 样本、pandoc 中文模板、公文版式；避开 AGPL 与专有脚本）。
- `shared/references/due-diligence-playbook.md`：OCR 工具选型（RapidOCR / MinerU 4 / PaddleOCR-VL / oar-ocr）与「无法院文书准确率、须自评」提示。
- `package.json` 1.2.2。

## [v1.2.1] - 2026-10-15

2026 年法规更新回灌（外部调研，以官方页面核验为主；二手来源与未核实项逐条标注）。

### Changed

- employment-legal `labor-law-citations.md`：法释〔2025〕12号条号按官方转载全文重排（第 1–2、3、10、13–16、19 条）；新增 I 节超龄劳动者（人社部等令第 56 号，2026-07-01）与延迟退休到龄；案例类登记北京 2025 年度仲裁典型案例；配套法释〔2026〕14号、案由规定第三次修正。`local-rules-beijing.md` 补非全日制时薪、2026 年度基数补差口径、陪产假 / 育儿假核实、生育津贴直发。
- employment-legal `workforce-compliance-dd`：超龄 / 退休返聘定性与合同制度检查项改按令第 56 号。
- commercial-legal `transaction-procedure-citations.md`：国务院令第 784 号认缴截止 2027-06-30 升为已核实；新增七节（国资交易操作规则、登记文书规范 2026 年版、鼓励外商投资目录 2025 年版、对外投资规定、仲裁法 2025 修订、反不正当竞争法 2025 修订、法释〔2026〕6号、商标法 2026 修订、负面清单与申报标准现行状态）。
- regulatory-legal `administrative-law-citations.md`：H.3 补 36 号令条文细节、2026 年版惩戒清单文号 caveat、两部规章协调待核；新增 I 节（行政复议法实施条例 2026 修订、法释〔2026〕3号起诉期限、治安管理处罚法 2025、税务行政处罚裁量基准 2026 年版、金融失信名单、增值税法、54 号令现行状态）；B.3 / B.4 行内指向。
- data-compliance / construction-legal / litigation-legal / criminal-compliance `_shared` 引用库：各新增「2026 年更新」节——网络安全法 2025 修正条号后移、个人信息出境认证办法、网信办令第 24 / 25 号；建工解释（二）法释〔2026〕12号与实际施工人路径限制；仲裁法 2025 修订版本说明、法释〔2026〕19号刑民交叉、法发〔2026〕10号、法释〔2025〕15号、案由修正、律师法重新编号、指导案例清理；法释〔2026〕6号第 8 条等。
- research-gate 信用修复 playbook 版本时效清单：2026 年版清单文号二次检索 caveat、裁量基准 2026 年版、复议条例 2026 修订。
- 插件版本：employment-legal 0.4.1、commercial-legal 0.4.1、regulatory-legal 0.2.2、litigation-legal 0.3.2、data-compliance 0.2.1、construction-legal 0.2.1、criminal-compliance 0.2.1；`package.json` 1.2.1。

## [v1.2] - 2026-10-15

案例驱动迭代：落地案例库 LWC-2026-0001 至 0006 记录的「Skill 改进映射」。递归锚点与地方标准的核验日期写在各引用库行内。

### Added

- `shared/ai-for-china-legal-workflow/`（2026-08 已提交）与 `shared/legal-document-intake/`：顶层自动路由与法律事项动态 Intake——`known / derived / material_missing / optional_missing` 判定、可观察 `INTAKE_DECISION`、微信 `[CLARIFY:]` 中继、答复合并恢复、问题路由、边界示例、操作员快速说明、品牌无关执行档。
- `shared/legal-document-intake/SKILL.md`：`execution_profile` 进入 `INTAKE_DECISION`；正式法律意见书、对外尽调 / 合规报告、拟提交法院 / 监管机关文书默认 `critical`；交付前可观察的 `REVIEW_STATUS`（独立复核未执行必须显式声明）。
- `employment-legal/skills/workforce-compliance-dd/`：劳动用工合规调查工作流（三表交叉比对、用工形态定性、合同与制度审查、报告与附录装配）。
- `employment-legal/skills/_shared/dispatch-vs-outsourcing-checklist.md`：派遣 / 外包 / 委托代缴 / 代发薪 / 挂靠定性对照表（LWC-2026-0005 / 0006 两次提出）。
- `employment-legal/skills/_shared/local-rules-beijing.md`：北京最低工资、社保基数、生育假的版本化锚点。
- `employment-legal/skills/_shared/labor-law-citations.md`：G 节法释〔2025〕12 号、H 节劳务派遣。
- `commercial-legal/skills/equity-transaction-dd/`：股权交易法律尽调工作流（资料室清点与覆盖审计、分章事实底稿、交易程序核查、报告 / 问题清单 / 编制说明）。
- `commercial-legal/skills/_shared/transaction-procedure-citations.md`：公司法、外商投资法实施条例第 44 / 46 条、国资交易办法、经营者集中申报标准锚点及验证状态。
- `shared/references/due-diligence-playbook.md`：资料清单、事实底稿、覆盖审计、问题清单三分类、子代理与复核规则的共享数据结构。
- `shared/references/document-delivery-qa.md`：修订稿可逆性、模板包成稿、pandoc 中文模板、渲染与结构校验、交付说明清单。
- `shared/research-gate/references/`：税务 / 信用 / 上市公司公告源实测（authoritative-sources 第 9 节）；原件、摘要与占位规则（source-policy）；信用修复、劳动用工合规调查、股权尽调程序三个 playbook。
- `regulatory-legal/skills/_shared/administrative-law-citations.md`：H 节信用修复与失信惩戒锚点（税务总局令第 54 号、2025 年第 12 号公告、发改委令第 36 号、2026 年版惩戒清单，2026-09-13 核实）。
- `shared/feedback-refinement/SKILL.md`：脱敏案例捕获步骤与人工操作员反馈来源。
- `shared/inkstatute-integration/AGENT-UX-OPTIMIZATION.md`：墨律 agent 体验优化记录；`ASK-USER-PROTOCOL.md` 增加人工微信中继模式。
- `scripts/setup-codex-skills.sh`：Codex 安装总路由与动态 intake。

### Changed

- 17 个 employment / family / litigation 入口技能的「生成文档前必须反问」改为动态 intake 输出确认（commercial-legal 已于 2026-08-28 改）。
- `commercial-legal`：审查 / 起草 / 责任分析入口接入动态 intake；实践配置字段四态模型（concrete / matter_dependent / missing / not_applicable）与事项级动态确认策略；冷启动访谈固定写入 `CLAUDE.md`。
- `shared/ai-for-china-legal-workflow/SKILL.md`：新增尽调与信用修复路由；交付步骤引用 QA 清单并要求 `REVIEW_STATUS`。
- `shared/research-gate/SKILL.md`：材料清点与检索词构建之间插入动态 intake 步骤。
- README 重写为以实际使用为主的项目文档，区分独立 Qwen 使用、Codex 操作员模式和墨律集成使用；修正共享参考文档位置；更新 connector 状态说明。
- 插件版本：commercial-legal 0.4.0、employment-legal 0.4.0、litigation-legal 0.3.1、family-legal 0.2.1、regulatory-legal 0.2.1。

## [v1.1] - 2026-06-08

### Added

- 共享中国法研究基础设施：
  - `shared/research-gate/SKILL.md`
  - `shared/research-gate/references/authoritative-sources.md`
  - `shared/research-gate/references/quality-gates.md`
  - `shared/research-gate/references/search-playbooks.md`
  - `shared/research-gate/references/source-policy.md`
- 共享法律参考：
  - `shared/references/document-structures.md`
  - `shared/references/guarantee-bond-playbook.md`
  - `shared/references/subject-qualification-traps.md`
- 跨平台格式说明：`shared/cross-platform/`。
- 内部回归验证材料和前向测试记录模板。

### Changed

- 顶层 skill 在法律文书生成前统一依赖 research gate，强化目录清点、五维检索、来源分级、引用标注和失败回退。
- 诉讼类文书结构、主体资格陷阱等能力从单点经验沉淀为共享参考。

## [v1.0] - 2026-06-08

### Added

- 13 个法律插件完成首版定义：
  - `commercial-legal`
  - `litigation-legal`
  - `employment-legal`
  - `data-compliance`
  - `ip-legal`
  - `regulatory-legal`
  - `ai-governance`
  - `construction-legal`
  - `family-legal`
  - `criminal-compliance`
  - `law-student`
  - `legal-aid`
  - `legal-builder-hub`
- 66 个顶层插件 skill，覆盖冷启动访谈、合同审查/起草、诉讼 intake、证据管理、答辩状/代理词、劳动争议、数据出境、AI 合规等场景。
- 插件级 `.claude-plugin/` 元数据、`CLAUDE.md` 实践配置模板和 README。
- Qwen Code 项目级安装脚本：
  - `scripts/setup-skills.sh`
  - `scripts/cleanup-skills.sh`
- 跨平台转换脚本：
  - `scripts/convert-skills.js`
  - `npm run convert`
  - `npm run test:compatibility`
- MCP connector 规格：
  - `law-database`
  - `wenshu`
  - `gsxt`
  - `trademark`
  - `patent`
  - `wechat-notify`
- `law-database` 原型实现：HTTP client、MCP server、缓存、健康检查、重试、熔断、限流。
- 4 个 managed agent cookbook：法规监控、裁判文书监控、企业变更监控、时效监控。
- `run-agent.js` agent runner 初版。
- 安装、快速开始、connector 和项目总结文档。

### Notes

- Qwen Code 项目级 skill 安装已验证。
- Claude/Kimi/OpenCode 等平台的完整安装和运行仍需逐平台验证。
- 多数 connector 仍需要真实数据源 API、凭证和合规接入方案后才能生产使用。
