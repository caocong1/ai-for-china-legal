# 03-CONTEXT.md — 核心插件完善：诉讼仲裁

**Phase**: 3
**Name**: 核心插件完善 — 诉讼仲裁
**Date**: 2026-06-04

---

## Domain

本阶段交付诉讼仲裁插件（litigation-legal）的完整技能集，沿用 Phase 2 商事合同插件已验证的深化模式：将每个扁平技能拆分为 4-6 个可独立触发的子技能，建立全插件复用的法律引用脊柱（民诉法/仲裁法/证据规定 的 法条/案例/学说 分类 + 待验证标记），并定义实践配置文件契约使所有技能从同一处个性化读取。

覆盖能力：案件录入（matter-intake）、答辩状起草（defense-drafting）、证据目录管理（evidence-management）、代理词起草（representation-drafting）、冷启动访谈（cold-start-interview），并按 ROADMAP 新增「诉讼时效监控」（limitation-monitoring）技能。

## Canonical Refs

- `litigation-legal/` — 诉讼仲裁插件根目录
- `litigation-legal/.claude-plugin/plugin.json` — 插件配置（本阶段升级到 0.3.0，注册全部子技能）
- `litigation-legal/CLAUDE.md` — 中国化实践配置模板（诉讼语境）
- `litigation-legal/skills/matter-intake/SKILL.md` — 现有案件录入技能（深度参照）
- `litigation-legal/skills/defense-drafting/SKILL.md` — 现有答辩状起草技能（待深化拆分）
- `litigation-legal/skills/evidence-management/SKILL.md` — 现有证据目录技能（待深化拆分）
- `litigation-legal/skills/representation-drafting/SKILL.md` — 现有代理词技能（待深化拆分）
- `litigation-legal/skills/cold-start-interview/SKILL.md` — 现有访谈技能（待深化拆分）
- `commercial-legal/skills/_shared/legal-basis-conventions.md` — Phase 2 引用规范脊柱（本阶段为诉讼语境改编一份）
- `commercial-legal/skills/_shared/civil-code-contract-citations.md` — Phase 2 引用库模板（本阶段对应产出 civil-procedure-citations.md）
- `commercial-legal/skills/_shared/practice-profile-schema.md` — Phase 2 配置契约模板（本阶段对应产出诉讼版）
- `shared/references/document-structures.md` — 诉讼文书结构模板（答辩状/代理词/证据目录已存在）
- `shared/references/subject-qualification-traps.md` — 主体资格陷阱清单
- `shared/research-gate/SKILL.md` — 研究闸门（诉讼文书起草前置）
- `CLAUDE.md` — 全局配置模板

## Decisions

### 技能深度和范围

**决策**：深层子技能拆分（沿用 Phase 2 模式）
- 每个主技能拆分为 4-6 个子技能
- 每个子技能包含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、按来源分类的法律依据
- 拆分示例：
  - **matter-intake（案件录入）** 拆分为：主体资格与冲突预检 / 案件识别与分级 / 关键日期与时效起算 / 证据保全与种子文档 / 初始理论与立场（4-5 子技能）
  - **defense-drafting（答辩状）** 拆分为：答辩策略选择 / 管辖权异议 / 实体抗辩起草 / 程序抗辩与时效抗辩 / 答辩状装配（4-5 子技能）
  - **evidence-management（证据目录）** 拆分为：证据收集与保管链 / 三性审查（真实性/合法性/关联性）/ 三大类证据目录编制 / 举证期限与证据交换（4 子技能）
  - **representation-drafting（代理词）** 拆分为：争议焦点梳理 / 事实论证 / 法律论证与法条适用 / 代理词装配与庭审材料（4 子技能）
  - **limitation-monitoring（诉讼时效监控，新增）** 拆分为：时效期间识别 / 起算点判定 / 中止中断事由分析 / 监控台账与预警（4 子技能）

**为什么**：律师需要详细、可操作、可单独触发的技能。诉讼场景中律师往往只需单点能力（如「只查这个案件的时效是否届满」「只生成证据目录」），不必每次跑完整流程。

**如何应用**：规划时为每个主技能创建子技能目录 `skills/<主技能>/<子技能>/SKILL.md`，每个子技能有独立 SKILL.md 与 frontmatter；原 SKILL.md 改为编排入口。

### 冷启动访谈策略

**决策**：完整访谈流程 → 写入实践配置文件
- 冷启动访谈拆分为可独立触发的子技能，按部分收集律师执业立场
- 访谈结果写入实践配置文件 `litigation-legal/CLAUDE.md`（散文模板，律师可读可编辑），而非引入新文件格式
- 每个技能从该配置文件读取个性化设置（角色倾向、风险校准、和解策略、文书风格、管辖偏好）
- 支持重新运行访谈、单独更新某一部分、直接编辑、git 版本控制
- 访谈内容：身份与团队、角色倾向（原告/被告/两者）、风险校准（严重程度/可能性/重大性阈值）、案件管理（冲突检查/证据保全/外部律师）、和解策略、文书风格、管辖偏好

**为什么**：与 Phase 2 一致——律师希望技能按其工作方式个性化，而非固定模板。`litigation-legal/CLAUDE.md` 已是人类友好的散文真相来源，沿用避免双重真相来源。

**如何应用**：定义 practice-profile-schema（诉讼版）记录「配置文件是什么、在哪、技能怎么读」与字段映射；访谈子技能填充 `litigation-legal/CLAUDE.md` 对应章节。

### 技能结构和组织

**决策**：独立技能包（可独立触发）
- 每个子技能是完整的 SKILL.md，含 frontmatter（name/description/argument-hint）
- 子技能可单独触发（`/litigation-legal:<子技能名>`），也可由编排入口顺序调用
- 技能之间通过共享的 `litigation-legal/CLAUDE.md` 实践配置文件协调
- 共享引用脊柱放在 `litigation-legal/skills/_shared/`

**为什么**：律师希望技能模块化、按需调用，单点能力不被整流程绑架。

**如何应用**：编排入口 SKILL.md 保留跨子技能护栏（研究闸门、立场加载、事项上下文、临时模式），正文改为子技能编排顺序表，逐一指向子技能路径并说明可单独触发。

### 中国法律适配深度

**决策**：全面法律研究（诉讼仲裁语境）
- 引用法律条文：民事诉讼法（2023修正）、仲裁法、最高法《关于民事诉讼证据的若干规定》、民法典（诉讼时效）、相关司法解释
- 引用最高人民法院指导性案例（参考，非判例法约束力）
- 引用地方性法规与各级法院/仲裁机构规则（如适用）
- 引用学术观点（标注作者/出处和争议性）
- 对不确定内容标注 `[待验证]`，所有引用按来源标记（法条/案例/学说）+ 来源标签（[法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]）

**已核实可复用锚点**（其余条号若非高度确信，一律标 `[待验证]`）：
- 诉讼时效一般期间 3 年 = 《民法典》第188条
- 普通程序举证期限/答辩期 15 日 = 民事诉讼法相应条款
- 仲裁协议独立性、或裁或审（一裁终局排斥诉讼）= 仲裁法相应条款

**关键纪律**：不臆造条号。不确定具体条号时，描述规则并标 `[待验证]`，不硬写可能错误的条号。

**为什么**：律师需要全面、可核验的法律研究支持，诉讼场景对条号准确性和时效起算/抗辩的法律依据要求极高，错误条号会误导诉讼策略。

**如何应用**：建立诉讼版引用脊柱（legal-basis-conventions 改编 + civil-procedure-citations 引用库），每个子技能输出含 `## 法律依据` 章节，按 法条/案例/学说 分类引用脊柱并标待验证。

## Deferred Ideas

- 跨插件技能复用（如证据三性审查在劳动人事/数据合规插件复用）
- 裁判文书网 / 企业信用信息公示系统 MCP 连接器接入（Phase 16）
- 诉讼时效监控的定时 Agent 化（每日扫描事项台账、临界预警）（Phase 15）
- 保全申请、执行立案、上诉/再审等更下游诉讼阶段技能（后续里程碑）

## Scope Notes

本阶段仅覆盖诉讼仲裁插件（litigation-legal）。其他插件（劳动人事在 Phase 4，数据合规在 Phase 5 等）不在本阶段范围。

不修改 commercial-legal 插件（仅将其 `_shared` 文件作为结构与质量模板参照，诉讼版引用脊柱在 `litigation-legal/skills/_shared/` 下新建，不复用 commercial-legal 的文件路径）。

不包含 MCP 连接器实现（Phase 16）和定时 Agent（Phase 15）。本阶段在工作目录的当前 git 分支提交，不新建分支。
