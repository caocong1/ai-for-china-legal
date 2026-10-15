# Changelog

本文件记录 AI for China Legal 的主要变更。仓库版本、文档里程碑和墨律生产 skill 包版本可能不是同一个编号：

- 仓库代码/文档里程碑使用 `v1.x`，`package.json` 与之同步（当前 `1.2.0`）。
- 墨律生产 skill 包建议使用 `YYYY.MM.DD.N`，例如 `2026.06.15.1`。

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
