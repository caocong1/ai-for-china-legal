# 05-CONTEXT.md — 新增插件深化：数据合规

**Phase**: 5
**Name**: 新增插件 — 数据合规
**Date**: 2026-06-05

---

## Domain

本阶段将数据合规插件（data-compliance）从 v0.1.0 的 3 个扁平浅骨架深化为完整深层子技能集，沿用 Phase 2 商事合同 / Phase 3 诉讼仲裁 / Phase 4 劳动人事已验证的深化模式：将每个主技能拆分为 4 个可独立触发的子技能，建立全插件复用的数据合规法律引用脊柱（个人信息保护法 PIPL / 数据安全法 DSL / 网络安全法 CSL / 网信办办法 的 法条/行政法规/部门规章 分类 + 待验证标记），定义实践配置文件契约使所有技能从同一处个性化读取，并新建 data-compliance/CLAUDE.md 实践配置模板。

当前 data-compliance 是 v0.1.0，仅有 3 个**扁平浅骨架**技能，且**尚无 data-compliance/CLAUDE.md 实践配置模板**：

- **pia-generation（个保法 PIA 生成）** — 现 ~16 行浅骨架，仅列「工作流」四步纲要，须深化拆分为评估情形与告知-同意基础 / 数据映射与最小必要（含敏感个人信息）/ 风险评估与保护措施 / PIA 报告组装（记录存 3 年）四个子技能。
- **cross-border-assessment（数据出境评估）** — 现 ~16 行浅骨架，仅列四步纲要，须深化拆分为出境路径判定（三路径）/ 安全评估申报 / 标准合同备案 / 出境装配（保护认证 + 影响评估）四个子技能。
- **cold-start-interview（冷启动访谈）** — 现 ~26 行三部分访谈，须拆为可独立触发的访谈子技能并填充 data-compliance/CLAUDE.md。

并按 ROADMAP 覆盖的 5 个能力面，**新增 2 个全新主技能**：

- **data-security-compliance（数据安全法合规检查，新增）** — 数据分类分级（DSL 第21条）/ 重要数据识别与出境（DSL 第31条）/ 数据安全管理制度 / 数据安全风险评估与报告，四个子技能 + 编排入口。
- **network-security-compliance（网络安全法合规检查，新增）** — 网络安全等级保护（CSL 第21条）/ 关键信息基础设施保护（CSL 第31条起）/ 网络运营者义务 / 个人信息收集合规，四个子技能 + 编排入口。

覆盖能力（对齐 ROADMAP Phase 5 五个能力面）：个保法 PIA 生成（pia-generation）、数据出境评估（cross-border-assessment）、数据安全法合规检查（data-security-compliance，新增）、网络安全法合规检查（network-security-compliance，新增）、冷启动访谈（cold-start-interview）。

## Canonical Refs

- `data-compliance/` — 数据合规插件根目录
- `data-compliance/.claude-plugin/plugin.json` — 插件配置（本阶段升级到 0.2.0，注册全部子技能与编排入口）
- `data-compliance/CLAUDE.md` — 中国化实践配置模板（数据合规语境，**本阶段新建**）
- `data-compliance/skills/pia-generation/SKILL.md` — 现有 PIA 技能（浅骨架，待深化拆分）
- `data-compliance/skills/cross-border-assessment/SKILL.md` — 现有出境评估技能（浅骨架，待深化拆分）
- `data-compliance/skills/cold-start-interview/SKILL.md` — 现有访谈技能（浅骨架，待深化拆分）
- `commercial-legal/skills/_shared/legal-basis-conventions.md` — Phase 2 引用规范脊柱（本阶段为数据合规语境改编一份）
- `commercial-legal/skills/_shared/civil-code-contract-citations.md` — Phase 2 引用库模板（本阶段对应产出 data-protection-citations.md）
- `commercial-legal/skills/_shared/practice-profile-schema.md` — Phase 2 配置契约模板（本阶段对应产出数据合规版）
- `commercial-legal/CLAUDE.md` — 实践配置模板范式（本阶段为数据合规语境新建一份）
- `litigation-legal/skills/_shared/civil-procedure-citations.md` — Phase 3 引用库（领域改编范式参照，已核实锚点标注/版本说明块/占位结构/已核实锚点汇总表/使用说明结构借鉴）
- `employment-legal/skills/_shared/labor-law-citations.md` — Phase 4 引用库（领域改编范式参照，已核实/待验证分层、行政法规与部门规章并存的组织方式借鉴）
- `commercial-legal/skills/contract-review/SKILL.md` — 编排入口范式参照
- `commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md` — 深层子技能质量基准
- `employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md` — 深层子技能质量基准（目的/详细步骤含表格/检查清单/输出模板/边界条件/错误处理/## 法律依据 三类分类的完整范式）
- `.planning/phases/04-employment-legal-core/04-01-*-PLAN.md` — PLAN 格式参照（frontmatter / must_haves / tasks 含 read_first/acceptance_criteria/action）
- `CLAUDE.md` — 全局配置模板（中国化原则、命名约定、文件格式）

## Decisions

### 技能深度和范围

**决策**：深层子技能拆分（沿用 Phase 2 / Phase 3 / Phase 4 模式）

- 每个主技能拆分为 4 个可独立触发的子技能
- 每个子技能包含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、按来源分类的法律依据（每个子技能 150+ 行的实质内容，非占位骨架）
- 拆分与新增示例：
  - **pia-generation（个保法 PIA 生成）** 拆分为：评估情形与告知-同意基础（评估触发情形 / 告知-同意 PIPL第13-14条 / 敏感个人信息单独同意第28-29条 / 自动化决策第24条）/ 数据映射与最小必要（处理活动梳理 / 最小必要原则 / 数据类目与敏感个人信息识别）/ 风险评估与保护措施（风险点识别 / 技术与组织保护措施 / 个人权利保障第44-47条）/ PIA 报告组装（报告结构 / 评估记录存 3 年 第55-56条 / 结论与整改）（4 子技能 + 编排入口）
  - **cross-border-assessment（数据出境评估）** 拆分为：出境路径判定（三路径：安全评估 / 保护认证 / 标准合同，PIPL第38条；触发情形判定）/ 安全评估申报（网信办安全评估办法申报材料与自评估）/ 标准合同备案（个人信息出境标准合同办法 + 单独同意第39条 + 影响评估第40条）/ 出境装配（保护认证路径 + 出境前合规清单 + 出境记录）（4 子技能 + 编排入口）
  - **data-security-compliance（数据安全法合规检查，新增）** 拆分为：数据分类分级（DSL第21条 国家核心数据 / 重要数据 / 一般数据）/ 重要数据识别与处理（重要数据目录 / 重要数据出境 DSL第31条 / 风险评估报送）/ 数据安全管理制度（全流程数据安全管理制度 / 安全教育培训 / 技术措施）/ 数据安全风险评估与报告（风险监测 / 安全事件处置与报告 / 数据交易合规）（4 子技能 + 编排入口）
  - **network-security-compliance（网络安全法合规检查，新增）** 拆分为：网络安全等级保护（CSL第21条 等保定级 / 备案 / 测评）/ 关键信息基础设施保护（CSL第31条起 关基识别 / 安全保护义务 / 数据本地化）/ 网络运营者义务（实名制 / 日志留存 / 安全监测 / 应急预案）/ 个人信息收集合规（CSL与PIPL衔接 / 收集使用规则 / 同意与最小必要）（4 子技能 + 编排入口）
  - **cold-start-interview（冷启动访谈）** 拆分为：身份与团队（数据处理者画像 / DPO/法务/外部律师角色）/ 合规立场（整体合规偏好 / 敏感数据政策 / 数据出境政策）/ 风险与升级（风险等级定义 / 升级矩阵 / 监管报告触发）/ 文书风格与跨境政策（文书风格 / 跨境路径偏好 / 行业监管特色）（4 子技能 + 编排入口）

**为什么**：数据合规律师、企业 DPO 与法务需要详细、可操作、可单独触发的技能。数据合规场景中往往只需单点能力（如「只判这次出境走哪条路径」「只做这个处理活动的 PIA」「只定这个系统的等保级别」「只识别哪些是重要数据」），不必每次跑完整流程。现有 3 个扁平技能均为浅骨架（~16-26 行），深度远不足以支撑实质执业。

**如何应用**：规划时为每个主技能创建子技能目录 `skills/<主技能>/<子技能>/SKILL.md`，每个子技能有独立 SKILL.md 与 frontmatter；原 SKILL.md 改为编排入口。现有浅骨架内容无丢失迁移到子技能并深化。

### 冷启动访谈策略

**决策**：完整访谈流程 → 写入实践配置文件（data-compliance/CLAUDE.md）

- 冷启动访谈拆分为可独立触发的子技能，按部分收集数据处理者 / DPO / 律师执业立场
- 访谈结果写入实践配置文件 `data-compliance/CLAUDE.md`（散文模板，**本阶段新建**，律师/DPO 可读可编辑），而非引入新文件格式
- 每个技能从该配置文件读取个性化设置（数据处理者画像、整体合规偏好、敏感数据政策、数据出境政策与首选路径、风险等级、升级矩阵、监管报告触发、行业监管特色）
- 支持重新运行访谈、单独更新某一部分、直接编辑、git 版本控制

**为什么**：与 Phase 2 / 3 / 4 一致——律师/DPO 希望技能按其组织的数据处理画像与合规立场个性化，而非固定模板。沿用 CLAUDE.md 散文真相来源避免双重真相来源。注意现有 cross-border-assessment / pia-generation / cold-start-interview 须在拆分后从 data-compliance/CLAUDE.md 读取配置。

**如何应用**：本阶段新建 data-compliance/CLAUDE.md（数据合规语境，章节：我们是谁=数据处理者画像 / 谁在使用 / 可用集成 / 合规立场（敏感数据政策 / 跨境政策）/ 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏（行业监管识别 / 时效性触发））；定义 practice-profile-schema（数据合规版）记录「配置文件是什么、在哪、技能怎么读」与字段映射；访谈子技能填充 data-compliance/CLAUDE.md 对应章节。

### 技能结构和组织

**决策**：独立技能包（可独立触发）

- 每个子技能是完整的 SKILL.md，含 frontmatter（name/description/argument-hint）
- 子技能可单独触发（`/data-compliance:<子技能名>`），也可由编排入口顺序调用
- 技能之间通过共享的 `data-compliance/CLAUDE.md` 实践配置文件协调
- 共享引用脊柱放在 `data-compliance/skills/_shared/`

**为什么**：律师/DPO 希望技能模块化、按需调用，单点能力不被整流程绑架。

**如何应用**：编排入口 SKILL.md 保留跨子技能护栏（合规立场加载、临时模式、行业监管标记、敏感数据/跨境政策选择、目的地/特权检查），正文改为子技能编排顺序表，逐一指向子技能路径并说明可单独触发。

### 中国法律适配深度

**决策**：全面法律研究（数据合规语境，成文法为主）

- 引用法律：个人信息保护法（PIPL，2021）、数据安全法（DSL，2021）、网络安全法（CSL，2017）
- 引用行政法规：关键信息基础设施安全保护条例（2021，国务院）；网络数据安全管理条例（如适用，须核实施行状态 `[待验证]`）
- 引用部门规章/规范性文件：数据出境安全评估办法（2022 网信办）、个人信息出境标准合同办法（2023 网信办）、个人信息保护认证相关规定、网络安全等级保护制度相关标准（等保 2.0）
- 引用国家标准（推荐性/强制性须区分）：个人信息安全规范、数据出境安全评估指南等（GB/T 系列 `[待验证]`）
- 案例少（数据合规以法条/行政法规/部门规章为主），案例类放占位结构，行政处罚决定可作参考
- 对不确定内容标 `[待验证]`，所有引用按来源标记（法条/行政法规/部门规章/国家标准 + 案例/学说）+ 来源标签（[法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]）

**已核实可复用锚点**（PIPL/DSL/CSL 法律层级条号较稳定；网信办规章具体条号一律标 `[待验证]`）：

- 告知-同意 = PIPL 第13-14条（处理个人信息的合法性基础与同意规则）
- 敏感个人信息单独同意 = PIPL 第28-29条（敏感个人信息定义与单独同意）
- 跨境提供三路径（安全评估 / 保护认证 / 标准合同）= PIPL 第38条
- 跨境单独同意 + 个人信息保护影响评估 = PIPL 第39-40条
- 个人信息保护影响评估（PIA）情形与记录存 3 年 = PIPL 第55-56条
- 自动化决策 = PIPL 第24条
- 个人权利（查阅 / 复制 / 更正 / 删除 / 可携带）= PIPL 第44-47条
- 数据分类分级 = DSL 第21条（国家核心数据 / 重要数据 / 一般数据）
- 重要数据出境（关基运营者 + 重要数据须经安全评估）= DSL 第31条
- 网络安全等级保护制度 = CSL 第21条
- 关键信息基础设施安全保护 = CSL 第31条起（含数据本地化与出境安全评估第37条 `[待验证具体条号]`）

**关键纪律**：不臆造条号。**这是快速演进的监管领域，须保守。** PIPL/DSL/CSL 法律层级的上述锚点条号相对稳定可用；但**网信办规章 / 办法的具体条号若不确定，描述规则并标 `[待验证]`，绝不硬写**（如安全评估办法的申报材料条款、标准合同办法的备案时限、等保定级标准的具体条款号）。国家标准（GB/T）的编号与版本一律标 `[待验证]`，并提示推荐性/强制性区分。法规版本与施行状态（尤其网络数据安全管理条例等较新法规）须标 `[待验证 — 须核实现行施行状态]`。

**为什么**：数据合规对监管要求准确性要求极高，且法规更新频繁（办法每隔一两年修订），错误条号或过时规则会直接误导出境路径选择、PIA 结论、等保定级与重要数据判定。律师/DPO 需要全面、可核验、明确标注时效与待验证的法律研究支持。

**如何应用**：建立数据合规版引用脊柱（legal-basis-conventions 改编，含「部门规章/办法/国家标准」的来源分类与「快速演进监管 — 时效性强标注」规则 + data-protection-citations 引用库覆盖 PIPL/DSL/CSL/网信办办法/国家标准），每个子技能输出含 `## 法律依据` 章节，按来源分类引用脊柱并标待验证。

## Deferred Ideas

- 跨插件技能复用（如数据合规复用 commercial-legal 的数据处理协议/DPA 条款审查）
- 算法备案 / 深度合成备案 / 生成式 AI 合规专项技能（Phase 11 AI 治理）
- 数据资产入表 / 数据交易所合规专项技能（后续里程碑）
- 个人信息保护合规审计（PIPL 第54条审计义务）专项技能（后续里程碑）
- 数据安全事件分级与应急演练专项技能（后续里程碑）
- GDPR / 域外数据法对照与跨法域合规专项技能（后续里程碑）
- 网信办 / 监管沙箱 / 北大法宝法规库 MCP 连接器接入（Phase 16）
- 数据出境评估有效期 / 标准合同备案到期 / 等保测评周期的定时 Agent 化提醒（Phase 15）

## Scope Notes

本阶段仅覆盖数据合规插件（data-compliance）。其他插件（知识产权在 Phase 6、建设工程在 Phase 7 等）不在本阶段范围。

不修改 commercial-legal / litigation-legal / employment-legal 插件（仅将其 `_shared` 文件与 CLAUDE.md 作为结构与质量模板参照，数据合规版引用脊柱与 CLAUDE.md 在 `data-compliance/` 下新建，不复用其他插件的文件路径）。

不包含 MCP 连接器实现（Phase 16）和定时 Agent（Phase 15）。算法备案 / 深度合成 / 生成式 AI 合规属 Phase 11 AI 治理，不在本阶段。本阶段在工作目录的当前 git 分支提交，**不新建分支**。

## Plan Split

- **05-01**（wave 1）：数据合规法律引用脊柱（legal-basis-conventions.md 改编，含部门规章/办法/国家标准来源分类 + 快速演进监管时效性强标注；data-protection-citations.md 覆盖 PIPL/DSL/CSL/网信办办法/国家标准 引用库）+ practice-profile-schema.md 配置契约 + **新建 data-compliance/CLAUDE.md** 实践配置模板（数据处理者画像 / 合规立场 / 敏感数据政策 / 跨境政策 / 升级规则）+ pia-generation（个保法 PIA）拆为 4 个子技能 + 编排入口。
- **05-02**（wave 1，与 05-01 无文件重叠）：cross-border-assessment（数据出境评估）拆为 4 个子技能（三路径判定 / 安全评估申报 / 标准合同 / 出境装配含认证）+ 编排入口；**新增** data-security-compliance（数据安全法合规检查）4 个子技能（数据分类分级 / 重要数据 / 数据安全管理制度 / 风险评估报告）+ 编排入口。
- **05-03**（wave 2，依赖 05-01 的 _shared 脊柱与 CLAUDE.md、05-02 的产出路径用于注册）：**新增** network-security-compliance（网络安全法合规检查）4 个子技能（等级保护 / 关基保护 / 网络运营者义务 / 个人信息收集合规）+ 编排入口；cold-start-interview（冷启动访谈）拆为 4 个子技能 + 编排入口；plugin.json 注册全部技能并升级到 0.2.0。

## 注意事项（STATE.md 已知问题）

`.planning/STATE.md` 当前被模板数据污染（错误显示全部 17 个阶段「✅ Complete」）。本阶段以 `ROADMAP.md`（Phase 5 = 🚧 Pending）为真相来源。本阶段不修复 STATE.md（超出范围），但执行时不得据 STATE.md 误判阶段已完成。
