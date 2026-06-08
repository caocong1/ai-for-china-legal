# 04-CONTEXT.md — 核心插件完善：劳动人事

**Phase**: 4
**Name**: 核心插件完善 — 劳动人事
**Date**: 2026-06-05

---

## Domain

本阶段交付劳动人事插件（employment-legal）的完整技能集，沿用 Phase 2 商事合同插件与 Phase 3 诉讼仲裁插件已验证的深化模式：将每个扁平技能拆分为 4-6 个可独立触发的子技能，建立全插件复用的法律引用脊柱（劳动合同法 / 劳动法 / 劳动争议调解仲裁法 / 社会保险法 的 法条/案例/学说 分类 + 待验证标记），并定义实践配置文件契约使所有技能从同一处个性化读取。

当前 employment-legal 的 5 个扁平技能（v1.0 浅骨架，见 04-SUMMARY.md）须深化拆分：

- **hiring-review（雇佣审查）** — 现 213 行，覆盖必备条款/试用期/工时/社保/竞业/违约金/解除六个风险面，但为单一线性流程，须拆为可独立触发的深层子技能。
- **termination-review（解雇审查）** — 现 55 行浅骨架，仅列法定情形与补偿标准纲要，须深化为合法性 + 经济补偿 + 程序 + 违法解除救济的完整能力。
- **non-compete-review（竞业限制）** — 现 54 行浅骨架，仅列 5 个审查要点，须深化为人员范围 + 期限补偿 + 可执行性的完整能力。
- **leave-management（假期管理）** — 现 61 行浅骨架，仅列年休假/病假/产假标准纲要，须深化为各类假期的完整审查能力。
- **cold-start-interview（冷启动访谈）** — 现 62 行四部分访谈，须拆为可独立触发的访谈子技能并写入 employment-legal/CLAUDE.md。

并按 ROADMAP 新增「劳动争议处理」（labor-dispute-handling）技能：调解 / 仲裁（一裁终局）/ 诉讼 / 时效（劳动仲裁时效 1 年）的完整争议解决路径能力。

覆盖能力：冷启动访谈（cold-start-interview）、雇佣审查（hiring-review）、解雇审查（termination-review）、竞业限制审查（non-compete-review）、假期管理（leave-management），并按 ROADMAP 新增「劳动争议处理」（labor-dispute-handling）技能。

## Canonical Refs

- `employment-legal/` — 劳动人事插件根目录
- `employment-legal/.claude-plugin/plugin.json` — 插件配置（本阶段升级到 0.3.0，注册全部子技能）
- `employment-legal/CLAUDE.md` — 中国化实践配置模板（劳动法语境）
- `employment-legal/skills/hiring-review/SKILL.md` — 现有雇佣审查技能（213 行，深度参照与拆分源）
- `employment-legal/skills/termination-review/SKILL.md` — 现有解雇审查技能（浅骨架，待深化拆分）
- `employment-legal/skills/non-compete-review/SKILL.md` — 现有竞业限制技能（浅骨架，待深化拆分）
- `employment-legal/skills/leave-management/SKILL.md` — 现有假期管理技能（浅骨架，待深化拆分）
- `employment-legal/skills/cold-start-interview/SKILL.md` — 现有访谈技能（待深化拆分）
- `commercial-legal/skills/_shared/legal-basis-conventions.md` — Phase 2 引用规范脊柱（本阶段为劳动法语境改编一份）
- `commercial-legal/skills/_shared/civil-code-contract-citations.md` — Phase 2 引用库模板（本阶段对应产出 labor-law-citations.md）
- `commercial-legal/skills/_shared/practice-profile-schema.md` — Phase 2 配置契约模板（本阶段对应产出劳动法版）
- `litigation-legal/skills/_shared/civil-procedure-citations.md` — Phase 3 引用库（领域改编范式参照，争议仲裁部分可借鉴时效/程序结构）
- `commercial-legal/skills/contract-review/SKILL.md` — 编排入口范式参照
- `commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md` — 深层子技能质量基准
- `CLAUDE.md` — 全局配置模板

## Decisions

### 技能深度和范围

**决策**：深层子技能拆分（沿用 Phase 2 / Phase 3 模式）
- 每个主技能拆分为 4-6 个子技能
- 每个子技能包含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、按来源分类的法律依据（每个子技能 150+ 行的实质内容，非占位骨架）
- 拆分示例：
  - **hiring-review（雇佣审查）** 拆分为：文件定位与必备条款 / 试用期与工时合规 / 社保公积金与劳动报酬 / 服务期与违约金合法性 / 雇佣审查装配（5 子技能）
  - **termination-review（解雇审查）** 拆分为：解除事由合法性（过失/非过失/经济性裁员）/ 经济补偿与赔偿金计算（N / N+1 / 2N）/ 解除程序合规 / 违法解除救济与风险预防（4 子技能）
  - **non-compete-review（竞业限制）** 拆分为：人员范围与保密义务 / 期限与经济补偿合规 / 竞业范围与可执行性 / 违约责任与救济（4 子技能）
  - **leave-management（假期管理）** 拆分为：年休假合规（折算/未休工资 300%）/ 病假与医疗期 / 生育假与女职工特别保护 / 其他法定假期与考勤制度（4 子技能）
  - **cold-start-interview（冷启动访谈）** 拆分为：身份与团队 / 审查立场（用人单位方/劳动者方）/ 风险与升级 / 文书风格与地方性规定（4 子技能）
  - **labor-dispute-handling（劳动争议处理，新增）** 拆分为：争议定性与时效（劳动仲裁时效 1 年）/ 调解路径 / 仲裁路径（一裁终局识别）/ 诉讼路径与衔接（4 子技能）

**为什么**：劳动法律师与 HR 法务需要详细、可操作、可单独触发的技能。劳动场景中往往只需单点能力（如「只算这次解雇的经济补偿」「只查这个竞业限制条款是否可执行」「只判断这个争议适用哪条时效」），不必每次跑完整流程。现有 5 个扁平技能多为浅骨架，深度不足以支撑实质执业。

**如何应用**：规划时为每个主技能创建子技能目录 `skills/<主技能>/<子技能>/SKILL.md`，每个子技能有独立 SKILL.md 与 frontmatter；原 SKILL.md 改为编排入口。现有 hiring-review 的 213 行深度内容无丢失拆分迁移到子技能。

### 冷启动访谈策略

**决策**：完整访谈流程 → 写入实践配置文件
- 冷启动访谈拆分为可独立触发的子技能，按部分收集律师/HR 执业立场
- 访谈结果写入实践配置文件 `employment-legal/CLAUDE.md`（散文模板，律师可读可编辑），而非引入新文件格式
- 每个技能从该配置文件读取个性化设置（审查立场：用人单位方/劳动者方、风险偏好、升级矩阵、文书风格、地方性规定偏好、解雇经济补偿倾向、竞业限制人员范围与补偿标准）
- 支持重新运行访谈、单独更新某一部分、直接编辑、git 版本控制

**为什么**：与 Phase 2 / Phase 3 一致——律师希望技能按其工作方式个性化，而非固定模板。`employment-legal/CLAUDE.md` 已是人类友好的散文真相来源，沿用避免双重真相来源。注意现有 cold-start-interview/SKILL.md 末尾「生成 YAML 格式」的表述须纠正为「填充 employment-legal/CLAUDE.md 对应章节」，与配置契约一致。

**如何应用**：定义 practice-profile-schema（劳动法版）记录「配置文件是什么、在哪、技能怎么读」与字段映射；访谈子技能填充 `employment-legal/CLAUDE.md` 对应章节。

### 技能结构和组织

**决策**：独立技能包（可独立触发）
- 每个子技能是完整的 SKILL.md，含 frontmatter（name/description/argument-hint）
- 子技能可单独触发（`/employment-legal:<子技能名>`），也可由编排入口顺序调用
- 技能之间通过共享的 `employment-legal/CLAUDE.md` 实践配置文件协调
- 共享引用脊柱放在 `employment-legal/skills/_shared/`

**为什么**：律师/HR 希望技能模块化、按需调用，单点能力不被整流程绑架。

**如何应用**：编排入口 SKILL.md 保留跨子技能护栏（立场加载、临时模式、地方性规定标记、用人单位方/劳动者方立场选择、目的地/特权检查），正文改为子技能编排顺序表，逐一指向子技能路径并说明可单独触发。

### 中国法律适配深度

**决策**：全面法律研究（劳动人事语境）
- 引用法律条文：劳动合同法（2012修正）、劳动法、劳动争议调解仲裁法、社会保险法、职工带薪年休假条例、女职工劳动保护特别规定、相关司法解释
- 引用最高人民法院指导性案例（参考，非判例法约束力）
- 引用地方性规定（北京/上海/广东/深圳等社保基数、竞业补偿指引、特殊工时、高温津贴等）
- 引用学术观点（标注作者/出处和争议性）
- 对不确定内容标注 `[待验证]`，所有引用按来源标记（法条/案例/学说）+ 来源标签（[法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]）

**已核实可复用锚点**（其余条号若非高度确信，一律标 `[待验证]`）：
- 经济补偿 N（每满一年一个月工资）= 《劳动合同法》第47条
- 违法解除赔偿金 2N（经济补偿标准的二倍）= 《劳动合同法》第87条
- 未订书面劳动合同二倍工资 = 《劳动合同法》第82条
- 无固定期限劳动合同（连续订立二次固定期限/连续工作满十年等）= 《劳动合同法》第14条
- 试用期上限（按合同期限分档）= 《劳动合同法》第19条
- 竞业限制（人员范围、经济补偿、期限不超过 2 年）= 《劳动合同法》第23-24条
- 劳动仲裁时效一般 1 年 = 《劳动争议调解仲裁法》第27条
- 部分案件一裁终局（小额追索劳动报酬、工伤医疗费等；标准执行国家劳动标准）= 《劳动争议调解仲裁法》第47条

**关键纪律**：不臆造条号。不确定具体条号时，描述规则并标 `[待验证]`，不硬写可能错误的条号。劳动法的过失性辞退（第39条）/非过失性辞退（第40条）/经济性裁员（第41条）/经济补偿情形（第46条）等条号在现有 skill 中已出现，须核实——若非高度确信，标 `[待验证]` 并以「描述规则 + 待验证」呈现。

**为什么**：律师/HR 需要全面、可核验的法律研究支持，劳动场景对条号准确性（经济补偿/赔偿金计算、时效、解除事由）要求极高，错误条号会直接误导解雇方案与争议应对。

**如何应用**：建立劳动法版引用脊柱（legal-basis-conventions 改编 + labor-law-citations 引用库），每个子技能输出含 `## 法律依据` 章节，按 法条/案例/学说 分类引用脊柱并标待验证。

## Deferred Ideas

- 跨插件技能复用（如劳动争议处理复用 litigation-legal 的诉讼时效监控/证据三性审查）
- 工伤认定与劳动能力鉴定专项技能（后续里程碑）
- 集体合同/集体协商/民主程序专项技能（后续里程碑）
- 劳务派遣/外包用工合规专项技能（后续里程碑）
- 社保稽核与公积金专项合规技能（后续里程碑）
- HR 系统 / 考勤系统 MCP 连接器接入（Phase 16）
- 劳动争议时效/医疗期/竞业补偿期限的定时 Agent 化提醒（Phase 15）

## Scope Notes

本阶段仅覆盖劳动人事插件（employment-legal）。其他插件（数据合规在 Phase 5、知识产权在 Phase 6 等）不在本阶段范围。

不修改 commercial-legal 与 litigation-legal 插件（仅将其 `_shared` 文件作为结构与质量模板参照，劳动法版引用脊柱在 `employment-legal/skills/_shared/` 下新建，不复用其他插件的文件路径）。

不包含 MCP 连接器实现（Phase 16）和定时 Agent（Phase 15）。本阶段在工作目录的当前 git 分支提交，不新建分支。

## Plan Split

- **04-01**（wave 1）：劳动法引用脊柱（legal-basis-conventions.md 改编 + labor-law-citations.md 劳动合同法/劳动法/争议仲裁/社保 引用库 + practice-profile-schema.md 配置契约）+ hiring-review（雇佣审查）拆为 5 个子技能 + 编排入口。
- **04-02**（wave 1，与 04-01 无文件重叠）：termination-review（解雇审查）拆为 4 个子技能 + 编排入口；non-compete-review（竞业限制）拆为 4 个子技能 + 编排入口。
- **04-03**（wave 2，依赖 04-01 的 _shared 脊柱与 04-02 的产出路径用于注册）：leave-management（假期管理）拆为 4 个子技能 + 编排入口；cold-start-interview（冷启动访谈）拆为 4 个子技能 + 编排入口；新增 labor-dispute-handling（劳动争议处理）编排入口 + 4 个子技能；plugin.json 注册全部技能并升级到 0.3.0。
