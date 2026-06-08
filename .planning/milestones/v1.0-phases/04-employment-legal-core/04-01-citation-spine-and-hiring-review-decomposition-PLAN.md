---
phase: 04-employment-legal-core
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - employment-legal/skills/_shared/legal-basis-conventions.md
  - employment-legal/skills/_shared/labor-law-citations.md
  - employment-legal/skills/_shared/practice-profile-schema.md
  - employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md
  - employment-legal/skills/hiring-review/probation-working-hours/SKILL.md
  - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
  - employment-legal/skills/hiring-review/service-period-penalty/SKILL.md
  - employment-legal/skills/hiring-review/hiring-review-assembly/SKILL.md
  - employment-legal/skills/hiring-review/SKILL.md
autonomous: true
requirements:
  - LABOR-CITATION-SPINE
  - PROFILE-SCHEMA
  - HIRING-REVIEW-DECOMP
user_setup: []

must_haves:
  truths:
    - "存在一个劳动人事专用的法律依据引用规范（来源标签 + 法条/案例/学说 分类 + 待验证），所有劳动技能可复用"
    - "存在一个可复用的劳动合同法/劳动法/争议仲裁/社保 引用库，已核实锚点（经济补偿N=第47条、违法解除2N=第87条、二倍工资=第82条、无固定期限=第14条、试用期上限=第19条、竞业23-24条、仲裁时效1年=争议仲裁法第27条、一裁终局=争议仲裁法第47条）明确标注，其余不确定条号标待验证"
    - "存在劳动法版实践配置文件契约，明确字段、存储位置（employment-legal/CLAUDE.md）、技能读取规则，并映射到 employment-legal/CLAUDE.md 章节"
    - "律师/HR 可以单独触发雇佣审查的任一子能力（必备条款/试用期工时/社保报酬/服务期违约金/装配）而无需运行整个审查流程"
    - "每个雇佣审查子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容"
    - "现有 hiring-review/SKILL.md（213 行）深度内容（必备条款九项、试用期分档表、工时与加班费、社保与公积金、竞业限制、违约金两情形、解除条款）无丢失地迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "employment-legal/skills/_shared/legal-basis-conventions.md"
      provides: "劳动法语境的 法条/案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表 + 地方性规定标注 + 仲裁/法院定位"
      contains: "待验证"
      min_lines: 60
    - path: "employment-legal/skills/_shared/labor-law-citations.md"
      provides: "劳动合同法/劳动法/争议仲裁法/社保法/带薪年休假条例/女职工保护规定 的可复用引用库（按来源分类、已核实锚点 + 待验证）"
      contains: "第47条"
      min_lines: 120
    - path: "employment-legal/skills/_shared/practice-profile-schema.md"
      provides: "劳动法版实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 employment-legal/CLAUDE.md 映射"
      min_lines: 60
    - path: "employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md"
      provides: "文件定位 + 必备条款（第17条九项）检查子技能"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/hiring-review/probation-working-hours/SKILL.md"
      provides: "试用期分档（第19条）+ 工时制度 + 加班费子技能"
      contains: "第19条"
      min_lines: 150
    - path: "employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md"
      provides: "社保公积金（放弃社保无效）+ 劳动报酬 + 二倍工资（第82条）子技能"
      contains: "第82条"
      min_lines: 150
    - path: "employment-legal/skills/hiring-review/service-period-penalty/SKILL.md"
      provides: "服务期 + 违约金合法性（第25条仅两情形）子技能"
      min_lines: 150
    - path: "employment-legal/skills/hiring-review/hiring-review-assembly/SKILL.md"
      provides: "雇佣审查装配 + 地方性规定 + 审查备忘录 + 交付前检查子技能"
      min_lines: 120
    - path: "employment-legal/skills/hiring-review/SKILL.md"
      provides: "雇佣审查编排入口（指向五个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "employment-legal/skills/hiring-review/probation-working-hours/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用试用期上限条文（劳动合同法第19条）"
      pattern: "labor-law-citations|第19条"
    - from: "employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用二倍工资条文（劳动合同法第82条）"
      pattern: "labor-law-citations|第82条"
    - from: "employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md"
      to: "employment-legal/skills/_shared/legal-basis-conventions.md"
      via: "引用来源分类规范"
      pattern: "legal-basis-conventions"
    - from: "employment-legal/skills/hiring-review/SKILL.md"
      to: "五个雇佣审查子技能"
      via: "编排入口指向子技能路径"
      pattern: "document-mandatory-terms|probation-working-hours|social-insurance-wages|service-period-penalty|hiring-review-assembly"
    - from: "employment-legal/skills/_shared/practice-profile-schema.md"
      to: "employment-legal/CLAUDE.md"
      via: "映射访谈/审查字段到实践配置模板章节"
      pattern: "审查立场|风险校准|地方性"
---

<objective>
将劳动人事插件的核心雇佣审查能力从单一扁平技能拆分为深度子技能体系，并建立全插件复用的法律引用脊柱与劳动法版实践配置契约。

本计划交付三块内容：
1. **劳动法引用脊柱（citation spine）** — 一套所有劳动技能共享的法律依据引用规范（来源标签 + 法条/案例/学说 分类 + 待验证 + 地方性规定标注 + 劳动仲裁/法院定位），以及一个可复用的劳动合同法/劳动法/劳动争议调解仲裁法/社会保险法引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 04-02 / 04-03 直接引用，避免每个技能重复维护条文。
2. **劳动法版实践配置契约** — employment-legal/skills/_shared/practice-profile-schema.md：明确配置文件是什么、在哪（employment-legal/CLAUDE.md）、技能怎么读，以及访谈/审查字段与 employment-legal/CLAUDE.md 章节的映射。关闭「技能间通过明确配置契约协调」的 gap。
3. **雇佣审查拆分** — 按 CONTEXT「深层子技能拆分」决策，将 hiring-review（现 213 行单一线性流程）拆为五个可独立触发的子技能：文件定位与必备条款 / 试用期与工时合规 / 社保公积金与劳动报酬 / 服务期与违约金合法性 / 雇佣审查装配。现有 hiring-review/SKILL.md 的深度内容（必备条款九项、试用期分档表、工时与加班费三档、社保与公积金、竞业限制、违约金两情形、解除条款、地方性规定、审查备忘录、交付前质量检查）拆分迁移到对应子技能，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分，现实只有 5 个扁平技能（多为浅骨架）」的核心 gap，并为劳动法语境建立可复用引用脊柱。引用脊柱与配置契约先行，保证三个计划的引用与配置读取一致。
Output: 1 个引用规范 + 1 个引用库 + 1 个配置契约 + 5 个雇佣审查子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（劳动合同法2012修正、劳动法、劳动争议调解仲裁法、社会保险法、职工带薪年休假条例、女职工劳动保护特别规定为分析基础）；指导性案例作参考非判例法；地方性规定识别（北京/上海/广东/深圳等社保基数、竞业补偿指引、特殊工时、高温津贴）+ 劳动仲裁委员会 + 法院四级；行业监管特色；执业环境适配（律所/HR 法务）。命名约定：技能名 kebab-case；斜杠命令 /employment-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/案例/学说 分类，带来源标签；不确定条号一律标 `[待验证]`，不臆造条号。已核实可复用锚点：经济补偿 N=《劳动合同法》第47条；违法解除赔偿金 2N=第87条；未订书面劳动合同二倍工资=第82条；无固定期限劳动合同=第14条；试用期上限=第19条；竞业限制（人员范围/经济补偿/期限不超2年）=第23-24条；劳动仲裁时效1年=《劳动争议调解仲裁法》第27条；部分案件一裁终局=《劳动争议调解仲裁法》第47条。其余条号（如过失辞退第39条/非过失第40条/裁员第41条/经济补偿情形第46条/违约金第25条）若非高度确信，标 `[待验证]` 并以「描述规则 + 待验证」呈现。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/phases/04-employment-legal-core/04-CONTEXT.md
@CLAUDE.md
@employment-legal/CLAUDE.md
@employment-legal/skills/hiring-review/SKILL.md
@employment-legal/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@commercial-legal/skills/_shared/practice-profile-schema.md
@litigation-legal/skills/_shared/civil-procedure-citations.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立劳动法律引用脊柱（来源分类规范 + 劳动合同法/劳动法/争议仲裁/社保 引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考；文件格式约定；命名约定）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（结构与质量模板 — 来源分类/标签表/待验证规则/成文法优先/最小引用格式；劳动法版改编以此为骨架）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（引用库结构模板 — 法条/案例/学说三类表格组织、按主题分组、待验证标注方式）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（领域改编范式 — 已核实锚点「已核实」标注方式、版本说明块、占位案例/学说结构、已核实锚点汇总表、引用库使用说明；争议仲裁/时效部分结构可借鉴）
    - employment-legal/CLAUDE.md（实践配置模板 — 已有来源标签规范、地方性规定识别表、风险等级、审查立场结构）
  </read_first>
  <files>
    employment-legal/skills/_shared/legal-basis-conventions.md,
    employment-legal/skills/_shared/labor-law-citations.md
  </files>
  <action>
    创建 employment-legal/skills/_shared/legal-basis-conventions.md：定义劳动人事全插件统一的法律依据引用规范。以 commercial-legal 同名文件为骨架改编，章节包含：「来源分类」（三类：法条=现行成文法条文号，含劳动合同法/劳动法/劳动争议调解仲裁法/社会保险法/职工带薪年休假条例/女职工劳动保护特别规定/相关行政法规与司法解释；案例=最高院指导性案例或参考案例；学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用 employment-legal/CLAUDE.md 已有的 [法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供] 五标签，不新造冲突标签）；「待验证标记规则」（凡模型回忆的条文号、距最后更新超 6 个月的法规、用户口述的条款号或金额/期限/比例阈值，均须标 `[待验证]` 并说明验证途径）；「成文法优先与案例定位」（成文法为分析基础；指导性案例仅作参考、明确不具判例法约束力）；「地方性规定与争议处理机构标注」（地方性规定识别：北京/上海/广东/深圳等社保基数、竞业补偿指引、特殊工时审批、高温津贴等差异，引用时标 `[管辖 flagged — 需验证地方性规定]`；争议处理机构：劳动人事争议仲裁委员会 + 基层/中院/高院/最高院四级法院）；「引用最小格式」（法条含：法律名称+条号+现行有效版本如「2012修正」；案例含：案号或指导案例编号+裁判要点+法院层级）。验证资源列入：国家法律法规数据库 flk.npc.gov.cn、人力资源社会保障部官网、最高人民法院官网、中国裁判文书网 wenshu.court.gov.cn。不在本文件放完整法条正文——它是规范，不是法条库。

    创建 employment-legal/skills/_shared/labor-law-citations.md：可复用的劳动人事高频引用库，按「法条 / 案例 / 学说」三类组织，并按主题分组：（A）劳动合同法（2012修正）核心条文——劳动合同订立与必备条款（第17条九项）、无固定期限劳动合同（第14条）、试用期（第19条分档与试用期工资不低于约定工资80%且不低于最低工资）、未订书面劳动合同二倍工资（第82条）、服务期与培训违约金（第22条）、竞业限制人员范围/补偿/期限不超2年（第23-24条）、违约金限制仅服务期与竞业限制两情形（第25条）、解除事由（协商第36条、过失第39条、非过失第40条、经济性裁员第41条）、经济补偿情形（第46条）、经济补偿计算 N（第47条）、违法解除赔偿金 2N（第87条）；（B）劳动法核心条文——工时制度（标准工时每日不超8小时每周不超40小时）、加班费三档（工作日150%/休息日200%/法定节假日300%）、最低工资、休息休假；（C）劳动争议调解仲裁法核心条文——调解仲裁诉讼程序衔接、劳动仲裁时效一般1年（第27条，及从知道或应当知道权利受侵害之日起算、中止中断、劳动关系存续期间拖欠报酬争议不受1年限制）、部分案件一裁终局（第47条：小额追索劳动报酬/工伤医疗费/经济补偿或赔偿金不超当地月最低工资12个月金额；执行国家劳动标准的工时/休息休假/社保争议）、仲裁前置原则；（D）社会保险法/住房公积金——用人单位法定缴纳义务、五险范围、放弃社保条款无效；（E）职工带薪年休假条例——年休假分档（满1年不满10年5天/满10年不满20年10天/满20年15天）、未休年休假折算 300%（含本人当日工资的100%即正常工作期间工资 + 另付200%，合计300%，须准确表述）；（F）女职工劳动保护特别规定——产假98天、难产/多胞胎增加、哺乳期保护、孕期产期哺乳期解除限制。

    **关键纪律（必须遵守）**：
    - 已核实锚点明确标注「已核实」且不标待验证（或标「已核实锚点，建议复核」）：经济补偿 N=《劳动合同法》第47条；违法解除赔偿金 2N=第87条；未订书面劳动合同二倍工资=第82条；无固定期限劳动合同=第14条；试用期上限分档=第19条；竞业限制（人员范围/经济补偿/期限不超2年）=第23-24条；劳动仲裁时效一般1年=《劳动争议调解仲裁法》第27条；部分案件一裁终局=《劳动争议调解仲裁法》第47条。
    - 其余具体条号若非高度确信，一律在条号处标 `[待验证]`，并以「描述规则 + 待验证」方式呈现，绝不臆造条号。**特别注意**：解除事由的过失第39条/非过失第40条/裁员第41条/经济补偿情形第46条/服务期违约金第22条/违约金限制第25条/协商解除第36条等条号在现有 skill 中已出现，但须按本纪律核实——若非高度确信，写「《劳动合同法》关于[过失性辞退/非过失性辞退/经济性裁员/...]的规定（第XX条 `[待验证]`）」而非硬写裸条号；加班费各档比例与年休假天数等「规则」已核实但「条号」标待验证。
    - 每条引用行末尾带来源标签（多数为 `[模型知识 — 需验证]`），并标 `[待验证]`（已核实锚点除外，但仍建议核验）。
    - 案例类放占位结构 + 填写说明（指导案例编号、裁判要点、法院层级、参考价值），明确「案例须经检索核验、模型回忆案号风险高、默认标 `[待验证]`」；至少含解雇/竞业限制/未休年休假/劳动关系认定四类占位。学说类放占位结构 + 填写说明（观点、作者/出处、争议性）。
    - 文末附「已核实锚点汇总」表（锚点 / 法律依据 / 规则摘要）与「引用库使用说明」「更新规则」，参照 civil-procedure-citations.md 的同名章节。

    务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>test -f employment-legal/skills/_shared/legal-basis-conventions.md && test -f employment-legal/skills/_shared/labor-law-citations.md && grep -q '法条' employment-legal/skills/_shared/legal-basis-conventions.md && grep -q '案例' employment-legal/skills/_shared/legal-basis-conventions.md && grep -q '学说' employment-legal/skills/_shared/legal-basis-conventions.md && grep -q '待验证' employment-legal/skills/_shared/legal-basis-conventions.md && grep -q '第47条' employment-legal/skills/_shared/labor-law-citations.md && grep -q '第87条' employment-legal/skills/_shared/labor-law-citations.md && grep -q '第82条' employment-legal/skills/_shared/labor-law-citations.md && grep -q '第14条' employment-legal/skills/_shared/labor-law-citations.md && grep -q '第19条' employment-legal/skills/_shared/labor-law-citations.md && grep -q '第27条' employment-legal/skills/_shared/labor-law-citations.md && grep -q '一裁终局' employment-legal/skills/_shared/labor-law-citations.md && grep -q '300%\|百分之三百' employment-legal/skills/_shared/labor-law-citations.md</automated>
  </verify>
  <acceptance_criteria>
    - employment-legal/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节明确区分 法条/案例/学说 三类，并涵盖劳动合同法/劳动法/争议仲裁法/社保法语境
    - legal-basis-conventions.md 含「待验证」标记规则，复用 employment-legal/CLAUDE.md 五个来源标签（不新造冲突标签），含地方性规定标注 + 劳动仲裁委员会/四级法院定位
    - legal-basis-conventions.md 明确「成文法为分析基础、指导性案例仅作参考不具判例法约束力」
    - employment-legal/skills/_shared/labor-law-citations.md 存在，按 法条/案例/学说 三类组织，分组覆盖 劳动合同法/劳动法/争议仲裁法/社保法/年休假条例/女职工保护规定
    - 已核实锚点明确呈现：经济补偿N=第47条、违法解除2N=第87条、二倍工资=第82条、无固定期限=第14条、试用期=第19条、竞业23-24条、仲裁时效1年=争议仲裁法第27条、一裁终局=争议仲裁法第47条
    - 任何模型回忆且不确信的具体条号标 `[待验证]`，以「描述规则 + 待验证」呈现（含第39/40/41/46/25/22/36条等若不确信），无臆造条号；案例类默认标 `[待验证]`
    - 含已核实锚点汇总表与引用库使用说明
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个劳动共享引用文件存在；来源分类规范区分 法条/案例/学说 并定义待验证规则与地方性规定/仲裁/法院定位；引用库覆盖劳动合同法/劳动法/争议仲裁法/社保法/年休假/女职工保护，已核实锚点（47/87/82/14/19/23-24条 + 仲裁时效1年/一裁终局）明确、不确定条号标待验证、无臆造。</done>
</task>

<task type="auto">
  <name>Task 2: 建立劳动法版实践配置文件契约</name>
  <read_first>
    - commercial-legal/skills/_shared/practice-profile-schema.md（结构与质量模板 — 真相来源决策、字段映射表、技能读取契约、甲方/乙方立场选择、重跑/编辑/版本控制、法律事实合理性检查、schema 与 CLAUDE.md 章节对照）
    - employment-legal/CLAUDE.md（实践配置模板 — 我们是谁/谁在使用/可用集成/审查立场（雇佣审查：试用期/工时/社保/竞业；解雇审查：法定解除/经济补偿）/风险校准/升级矩阵/文书风格/输出/共享护栏（地方性规定识别））
    - employment-legal/skills/hiring-review/SKILL.md（现有审查技能 — 看其如何读取 CLAUDE.md 字段，保持读取契约一致）
    - employment-legal/skills/cold-start-interview/SKILL.md（现有访谈四部分 — 字段映射的来源；注意其末尾「生成 YAML」表述须在 schema 中纠正为写入 CLAUDE.md）
    - CLAUDE.md（命名；文件格式）
  </read_first>
  <files>
    employment-legal/skills/_shared/practice-profile-schema.md
  </files>
  <action>
    创建 employment-legal/skills/_shared/practice-profile-schema.md，以 commercial-legal 同名文件为骨架改编为劳动法语境。包含章节：
    - 「配置文件是什么 / 真相来源」：明确真相来源是 employment-legal/CLAUDE.md（散文模板），由 /employment-legal:cold-start-interview 生成更新，律师/HR 可直接编辑；记录架构决策（不引入与现有体系冲突的新 JSON/YAML 格式，沿用 CLAUDE.md 单一真相来源，理由同 commercial 版）。**明确纠正**：现有 cold-start-interview/SKILL.md 末尾「生成 YAML 格式」的表述应理解为填充 employment-legal/CLAUDE.md 对应章节的占位符，而非另存独立 YAML 文件。
    - 「字段映射表」：将访谈/审查收集的字段对应到 employment-legal/CLAUDE.md 章节，并标注哪些技能读取该字段。至少覆盖映射组：身份与团队（## 我们是谁/## 谁在使用 → hiring-review/termination-review 工作产物标题、角色判断）；审查立场（## 审查立场 → 雇佣审查：试用期/工时/社保/竞业 → hiring-review 各子技能；解雇审查：法定解除/经济补偿 N/N+1/2N 倾向 → termination-review）；竞业限制配置（## 审查立场 → 竞业限制：适用人员范围/经济补偿标准/期限/范围 → non-compete-review）；风险校准（## 风险校准 → 🔴/🟠/🟡/🟢 等级 → 所有审查技能风险分级）；升级矩阵（## 升级矩阵 → HR/主办律师/法务总监权限 → 各技能升级路由）；文书风格（## 文书风格/## 输出 → 解雇通知风格/工作产物标题 → 各装配子技能）；地方性规定（## 共享护栏 → 地方性规定识别 → 各技能地方性规定标记）。
    - 「技能读取契约」：技能在实质性工作前须读取 employment-legal/CLAUDE.md、检查关键字段是否含 [PLACEHOLDER]、据此选运行模式；配置缺失/含占位符时的标准提示（运行 cold-start-interview 或说「临时模式」）；临时模式默认值表（风险偏好平衡、角色律师、管辖中国大陆法律、地方性规定按工作地点逐案确认、经济补偿按法定 N 标准、竞业补偿与人员范围按法定下限标记常见风险）。
    - 「审查方立场（用人单位方/劳动者方）选择」：技能在审查前确认服务对象（## 谁在使用 → 服务对象），据此加载对应立场（用人单位方=合规与风险预防视角；劳动者方=权益主张视角），参照 commercial-legal practice-profile-schema 的「甲方/乙方立场选择」逻辑改编为劳动语境。
    - 「重跑 / 编辑 / 版本控制」：完整重跑 vs 单独更新某部分；直接编辑；git 版本控制与回滚（git log/diff/checkout employment-legal/CLAUDE.md）。
    - 「法律事实合理性检查」：用户口述条号/金额阈值/期限/比例（如经济补偿月数、竞业补偿比例、试用期月数、违约金数额）时写入前合理性检查（条号核查、阈值合理性如竞业期限不超2年、时效性标记、矛盾澄清），含 `[前提 flagged — 需验证]` 流程。
    - 「schema 与 CLAUDE.md 模板章节对照」表。
    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。
  </action>
  <verify>
    <automated>f=employment-legal/skills/_shared/practice-profile-schema.md; test -f "$f" && grep -q 'employment-legal/CLAUDE.md' "$f" && grep -q '字段映射' "$f" && grep -q '临时模式' "$f" && grep -q '用人单位方\|劳动者方' "$f" && grep -q '风险校准' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - employment-legal/skills/_shared/practice-profile-schema.md 存在
    - 明确真相来源为 employment-legal/CLAUDE.md，并记录「不引入冲突新格式」的架构决策，且纠正现有访谈「生成 YAML」的表述
    - 含字段映射表，覆盖 身份/审查立场/竞业限制配置/风险校准/升级矩阵/文书风格/地方性规定 各组并标注读取技能
    - 含技能读取契约 + 临时模式默认值 + 用人单位方/劳动者方立场选择逻辑 + 法律事实合理性检查
    - 含 schema 与 employment-legal/CLAUDE.md 章节对照表
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>劳动法版实践配置契约存在；定义配置文件是什么/在哪/技能怎么读，字段映射到 employment-legal/CLAUDE.md 章节，含临时模式与用人单位方/劳动者方立场选择与法律事实合理性检查，并纠正现有访谈 YAML 表述。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 hiring-review 为五个可独立触发的子技能</name>
  <read_first>
    - employment-legal/skills/hiring-review/SKILL.md（现有 213 行深度技能 — 全部内容；这是要拆分迁移的源，也是质量基准：第一步定位、第二步必备条款九项、第三步关键风险（3.1 试用期分档表/3.2 工时与加班费三档/3.3 社保公积金/3.4 竞业限制/3.5 违约金两情形/3.6 解除条款）、第四步地方性规定、第五步组装备忘录、交付前质量检查）
    - employment-legal/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - employment-legal/skills/_shared/labor-law-citations.md（Task 1 产出 — 引用库，各子技能法律依据引用此处）
    - employment-legal/skills/_shared/practice-profile-schema.md（Task 2 产出 — 配置读取契约）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板/边界条件表/错误处理表/## 法律依据 按法条案例学说分类的完整范式）
    - employment-legal/CLAUDE.md（实践配置模板 — 审查立场（雇佣审查各维度）/风险校准/升级矩阵/输出/地方性规定）
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md,
    employment-legal/skills/hiring-review/probation-working-hours/SKILL.md,
    employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md,
    employment-legal/skills/hiring-review/service-period-penalty/SKILL.md,
    employment-legal/skills/hiring-review/hiring-review-assembly/SKILL.md
  </files>
  <action>
    将现有 hiring-review/SKILL.md 的深度内容拆分迁移到五个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：document-mandatory-terms / probation-working-hours / social-insurance-wages / service-period-penalty / hiring-review-assembly；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 employment-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/案例/学说 分类，引用 _shared/labor-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」中说明：可被 hiring-review 编排入口调用，也可由律师/HR 单独触发。**每个子技能须 150+ 行实质内容，深度对标 penalty-assessment，不得是骨架。** 拆分时须深化现有内容（补充边界条件、错误处理、输出模板、法律依据三类分类），而非仅搬运。

    分工（迁移现有第一至五步与质量检查，无丢失）：
    - document-mandatory-terms（文件定位与必备条款）：迁移「第一步 定位」（文件类型/用人单位性质/劳动者类型/工作地点/合同期限/是否涉及竞业六问表）+「第二步 必备条款检查」（《劳动合同法》第17条九项必备条款逐项核查，缺失标 🟡）。深化：每项必备条款的常见缺陷与修改建议；无固定期限劳动合同触发情形（第14条：连续订立二次固定期限、连续工作满十年、未订书面合同满一年视为已订无固定期限）的识别。边界条件：非劳动合同文件（如劳务协议/实习协议/合作协议）须先定性是否构成劳动关系再审查。
    - probation-working-hours（试用期与工时合规）：迁移「3.1 试用期」（第19条分档表：3月≤期限<1年→不超1月；1年≤期限<3年→不超2月；3年以上或无固定期限→不超6月；以完成一定工作任务为期限/期限<3月→不得约定试用期；试用期工资不低于约定工资80%且不低于最低工资；同一用人单位与同一劳动者只能约定一次试用期）+「3.2 工时制度」（标准工时每日≤8小时每周≤40小时；综合计算/不定时工时需劳动行政部门批准；加班费三档150%/200%/300%；「自愿加班」规避加班费标 🔴）。深化：试用期违法的法律后果（已履行的按转正工资补足差额）；加班费计算基数合法性。边界条件：综合计算工时制下加班费计算方式不同。
    - social-insurance-wages（社保公积金与劳动报酬）：迁移「3.3 社会保险和住房公积金」（五险一金法定缴纳义务；「自愿放弃社保」条款无效标 🔴；「社保补贴代替缴纳」不免除法定义务标 🟠；缴纳基数合规）+ 劳动报酬条款审查（工资标准不低于最低工资、工资支付周期、克扣/拖欠风险）+ **未订书面劳动合同二倍工资（第82条，已核实锚点）**（用工之日起超一个月不满一年未订书面劳动合同，应付二倍工资；满一年视为已订立无固定期限劳动合同）。边界条件：劳动者本人书面要求不缴社保时用人单位仍负法定义务；外籍/退休返聘人员社保特殊。
    - service-period-penalty（服务期与违约金合法性）：迁移「3.5 违约金」（《劳动合同法》第25条：除服务期（专项培训，第22条，违约金不超培训费用且不超未履行部分应分摊费用）与竞业限制两情形外，用人单位不得与劳动者约定由劳动者承担违约金；「提前离职违约金」「未提前30天通知违约金」均标 🔴 无效）+ 服务期与培训约定审查。深化：服务期与劳动合同期限不一致的处理；违约金数额上限计算。边界条件：竞业限制违约金详见 non-compete-review 子技能（分工说明，不重叠）。
    - hiring-review-assembly（雇佣审查装配）：迁移「第四步 地方性规定检查」（北京/上海/广东/深圳等地方性差异表，标 `[管辖 flagged — 需验证地方性规定]`）+「第五步 组装审查备忘录」（工作产物标题、底线、问题按风险等级分类、修改建议、下一步建议）+「交付前的质量检查」+「以下一步决策树结束」。本子技能负责汇总各子技能发现、按 🔴/🟠/🟡/🟢 分级、组装最终审查备忘录。从配置文件读工作产物标题与文书风格。边界条件：竞业限制条款若存在，提示可调用 non-compete-review 深度审查。
    遵守文件格式约定。输出模板用 markdown 结构示意（沿用现有 SKILL.md 与 penalty-assessment 风格）。所有法律依据引用 _shared/labor-law-citations.md，已核实锚点（第47/82条等）明确、不确定条号标待验证。
  </action>
  <verify>
    <automated>for d in document-mandatory-terms probation-working-hours social-insurance-wages service-period-penalty hiring-review-assembly; do f="employment-legal/skills/hiring-review/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第19条' employment-legal/skills/hiring-review/probation-working-hours/SKILL.md && grep -q '第82条' employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md && grep -q '第17条\|必备条款' employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md && grep -q '地方性' employment-legal/skills/hiring-review/hiring-review-assembly/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 五个子技能 SKILL.md 全部存在，路径为 employment-legal/skills/hiring-review/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按 法条/案例/学说 分类，标待验证），且每个 ≥100 非空行（深度对标 penalty-assessment）
    - probation-working-hours 含第19条试用期分档表与工时/加班费三档；social-insurance-wages 含第82条二倍工资与放弃社保无效；document-mandatory-terms 含第17条九项必备条款
    - service-period-penalty 含第25条违约金仅两情形限制；hiring-review-assembly 含地方性规定表 + 审查备忘录组装 + 交付前检查
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>hiring-review 拆为五个可独立触发的子技能；现有 213 行深度内容（必备条款九项、试用期分档、工时加班费、社保公积金、违约金两情形、地方性规定、审查备忘录）无丢失迁移并深化；试用期引用第19条、二倍工资引用第82条；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 hiring-review/SKILL.md 为编排入口</name>
  <read_first>
    - employment-legal/skills/hiring-review/SKILL.md（现有 — 改造对象）
    - 本计划 Task 3 产出的五个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、事项上下文、目的地检查、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - employment-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 04-03 统一更新）
  </read_first>
  <files>
    employment-legal/skills/hiring-review/SKILL.md
  </files>
  <action>
    将 employment-legal/skills/hiring-review/SKILL.md 改造为编排入口：保留 frontmatter（name: hiring-review，更新 description 说明它现在编排五个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/hiring-review/<子技能名>/SKILL.md）；(2) 目的与整体审查流程概览；(3) 前置：加载审查立场——读取 employment-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /employment-legal:cold-start-interview 或说「临时模式」），含临时模式段落（平衡风险偏好、律师角色、中国劳动法体系、地方性规定逐案确认、经济补偿法定 N 标准，标 `[临时模式]`）；(4) 子技能编排顺序表——文件定位与必备条款 → 试用期与工时合规 → 社保公积金与劳动报酬 → 服务期与违约金合法性 → 雇佣审查装配，每行说明该子技能做什么、对应子技能路径（skills/hiring-review/<name>/SKILL.md）、可单独触发的斜杠命令（/employment-legal:<name>）+ 顺序说明；(5) 入口级护栏：用人单位方/劳动者方立场确认（从 ## 谁在使用 服务对象读取）、地方性规定识别（工作地点驱动）、目的地/特权检查、若涉及竞业限制提示可调用 non-compete-review。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=employment-legal/skills/hiring-review/SKILL.md; grep -q '^name: hiring-review' "$f" && grep -q 'document-mandatory-terms' "$f" && grep -q 'probation-working-hours' "$f" && grep -q 'social-insurance-wages' "$f" && grep -q 'service-period-penalty' "$f" && grep -q 'hiring-review-assembly' "$f" && grep -q '临时模式' "$f" && grep -q '地方性\|用人单位方\|劳动者方' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - employment-legal/skills/hiring-review/SKILL.md 仍有 frontmatter name: hiring-review，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向五个子技能路径并说明可单独触发（/employment-legal:<name>）
    - 保留入口级护栏：加载实践配置文件 + 临时模式、用人单位方/劳动者方立场确认、地方性规定识别、目的地/特权检查
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 hiring-review/SKILL.md 成为指向五个子技能的编排入口，入口级护栏（立场确认、地方性规定、临时模式、特权检查）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 五个雇佣审查子技能 + 一个引用规范 + 一个引用库 + 一个配置契约 + 一个编排入口全部存在且格式合规
- 劳动引用脊柱（来源分类规范 + 劳动合同法/劳动法/争议仲裁/社保 引用库）与配置契约可被 04-02 / 04-03 复用
- 现有 hiring-review 213 行深度内容（必备条款、试用期分档、工时加班费、社保公积金、违约金两情形、地方性规定、审查备忘录）无丢失迁移并深化
- 已核实锚点（经济补偿N=47条、违法解除2N=87条、二倍工资=82条、无固定期限=14条、试用期=19条、竞业23-24条、仲裁时效1年=争议仲裁法27条、一裁终局=争议仲裁法47条）明确；不确定条号均标 `[待验证]`，无臆造条号
- JSON/YAML 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('employment-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/HR 可单独触发任一雇佣审查子能力（5 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 劳动法律引用按 法条/案例/学说 分类并标待验证；已核实锚点明确呈现
- 劳动法版实践配置契约定义清楚，技能据此读取 employment-legal/CLAUDE.md
- hiring-review 编排入口指向五个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/04-employment-legal-core/04-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
