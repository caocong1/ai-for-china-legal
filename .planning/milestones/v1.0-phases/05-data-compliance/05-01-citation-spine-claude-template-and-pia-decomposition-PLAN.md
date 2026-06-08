---
phase: 05-data-compliance
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - data-compliance/skills/_shared/legal-basis-conventions.md
  - data-compliance/skills/_shared/data-protection-citations.md
  - data-compliance/skills/_shared/practice-profile-schema.md
  - data-compliance/CLAUDE.md
  - data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md
  - data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md
  - data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md
  - data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md
  - data-compliance/skills/pia-generation/SKILL.md
autonomous: true
requirements:
  - DATA-CITATION-SPINE
  - PROFILE-SCHEMA
  - CLAUDE-TEMPLATE
  - PIA-DECOMP
user_setup: []

must_haves:
  truths:
    - "存在一个数据合规专用的法律依据引用规范（来源标签 + 法条/行政法规/部门规章/国家标准 与 案例/学说 分类 + 待验证 + 快速演进监管时效性强标注），所有数据合规技能可复用"
    - "存在一个可复用的 PIPL/DSL/CSL/网信办办法/国家标准 引用库，已核实锚点（告知-同意=PIPL第13-14条、敏感个人信息单独同意=第28-29条、跨境三路径=第38条、跨境单独同意+影响评估=第39-40条、PIA情形与记录存3年=第55-56条、自动化决策=第24条、个人权利=第44-47条、数据分类分级=DSL第21条、重要数据出境=DSL第31条、等级保护=CSL第21条、关基保护=CSL第31条起）明确标注，网信办办法具体条号一律标待验证"
    - "存在数据合规版实践配置文件契约，明确字段、存储位置（data-compliance/CLAUDE.md）、技能读取规则，并映射到 data-compliance/CLAUDE.md 章节"
    - "新建 data-compliance/CLAUDE.md 实践配置模板（数据处理者画像 / 合规立场 / 敏感数据政策 / 跨境政策 / 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏），可由冷启动访谈填充、律师可直接编辑"
    - "律师/DPO 可以单独触发 PIA 生成的任一子能力（评估情形与告知-同意 / 数据映射与最小必要 / 风险评估与保护措施 / 报告组装）而无需运行整个流程"
    - "每个 PIA 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；现有 pia-generation 浅骨架四步纲要无丢失迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "data-compliance/skills/_shared/legal-basis-conventions.md"
      provides: "数据合规语境的 法条/行政法规/部门规章/国家标准 + 案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表 + 快速演进监管时效性强标注 + 行业监管/网信办定位"
      contains: "待验证"
      min_lines: 70
    - path: "data-compliance/skills/_shared/data-protection-citations.md"
      provides: "PIPL/DSL/CSL/网信办办法/国家标准 的可复用引用库（按来源分类、已核实锚点 + 待验证）"
      contains: "第38条"
      min_lines: 140
    - path: "data-compliance/skills/_shared/practice-profile-schema.md"
      provides: "数据合规版实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 data-compliance/CLAUDE.md 映射"
      min_lines: 70
    - path: "data-compliance/CLAUDE.md"
      provides: "数据合规实践配置模板：数据处理者画像 / 合规立场 / 敏感数据政策 / 跨境政策 / 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏"
      contains: "数据处理者"
      min_lines: 90
    - path: "data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md"
      provides: "PIA 评估情形与告知-同意基础子技能（PIA触发情形第55条 + 告知-同意第13-14条 + 敏感个人信息单独同意第28-29条 + 自动化决策第24条）"
      contains: "第13-14条"
      min_lines: 150
    - path: "data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md"
      provides: "处理活动梳理 + 最小必要原则 + 数据类目与敏感个人信息识别子技能"
      contains: "最小必要"
      min_lines: 150
    - path: "data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md"
      provides: "风险点识别 + 技术与组织保护措施 + 个人权利保障（第44-47条）子技能"
      contains: "第44-47条"
      min_lines: 150
    - path: "data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md"
      provides: "PIA 报告结构组装 + 评估记录存3年（第55-56条）+ 结论与整改子技能"
      contains: "第55-56条"
      min_lines: 120
    - path: "data-compliance/skills/pia-generation/SKILL.md"
      provides: "PIA 生成编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用告知-同意与敏感个人信息单独同意条文（PIPL第13-14条/第28-29条）"
      pattern: "data-protection-citations|第13-14条|第28-29条"
    - from: "data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用个人权利条文（PIPL第44-47条）"
      pattern: "data-protection-citations|第44-47条"
    - from: "data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用PIA情形与记录存3年（PIPL第55-56条）"
      pattern: "data-protection-citations|第55-56条|3 年|三年"
    - from: "data-compliance/skills/pia-generation/SKILL.md"
      to: "四个 PIA 子技能"
      via: "编排入口指向子技能路径"
      pattern: "trigger-consent-basis|data-mapping-necessity|risk-mitigation-assessment|pia-report-assembly"
    - from: "data-compliance/skills/_shared/practice-profile-schema.md"
      to: "data-compliance/CLAUDE.md"
      via: "映射访谈/审查字段到实践配置模板章节"
      pattern: "合规立场|跨境政策|数据处理者"
---

<objective>
将数据合规插件从 v0.1.0 的扁平浅骨架深化为深层子技能体系，建立全插件复用的法律引用脊柱、数据合规版实践配置契约，并**新建** data-compliance/CLAUDE.md 实践配置模板。

本计划交付四块内容：
1. **数据合规引用脊柱（citation spine）** — 一套所有数据合规技能共享的法律依据引用规范（来源标签 + 法条/行政法规/部门规章/国家标准 与 案例/学说 分类 + 待验证 + 快速演进监管时效性强标注 + 行业监管/网信办定位），以及一个可复用的 PIPL/DSL/CSL/网信办办法/国家标准 引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 05-02 / 05-03 直接引用，避免每个技能重复维护条文。
2. **数据合规版实践配置契约** — data-compliance/skills/_shared/practice-profile-schema.md：明确配置文件是什么、在哪（data-compliance/CLAUDE.md）、技能怎么读，以及访谈/审查字段与 data-compliance/CLAUDE.md 章节的映射。
3. **新建 data-compliance/CLAUDE.md 实践配置模板** — 数据合规语境的散文模板：数据处理者画像 / 谁在使用 / 可用集成 / 合规立场（敏感数据政策 / 跨境政策）/ 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏（行业监管识别 / 时效性触发）。当前插件**尚无此文件**，本计划首次创建。
4. **PIA 生成拆分** — 按 CONTEXT「深层子技能拆分」决策，将 pia-generation（现 ~16 行浅骨架）拆为四个可独立触发的子技能：评估情形与告知-同意基础 / 数据映射与最小必要 / 风险评估与保护措施 / PIA 报告组装。现有四步纲要（处理活动识别 / 风险评估 / 保护措施评估 / 生成报告）拆分迁移并深化，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分 + 5 能力面，现实只有 3 个扁平浅骨架且无 CLAUDE.md」的核心 gap，并为数据合规语境建立可复用引用脊柱与配置真相来源。引用脊柱、配置契约与 CLAUDE.md 先行，保证三个计划的引用与配置读取一致。
Output: 1 个引用规范 + 1 个引用库 + 1 个配置契约 + 1 个新建 CLAUDE.md + 4 个 PIA 子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（PIPL 2021 / DSL 2021 / CSL 2017 为分析基础，行政法规如关基条例、部门规章如网信办出境评估办法/标准合同办法、国家标准 GB/T 系列为补充）；指导性案例作参考非判例法（数据合规案例少，行政处罚决定可作参考）；行业监管特色（网信办/工信部/公安部/市场监管总局多头监管识别）；执业环境适配（企业 DPO / 法务 / 外部律师）。命名约定：技能名 kebab-case；斜杠命令 /data-compliance:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/行政法规/部门规章/国家标准 与 案例/学说 分类，带来源标签；**这是快速演进的监管领域，须保守**——网信办规章/办法的具体条号若不确定，描述规则并标 `[待验证]`，绝不臆造条号；国家标准（GB/T）编号与版本一律标 `[待验证]` 并提示推荐性/强制性区分。已核实可复用锚点（PIPL/DSL/CSL 法律层级，相对稳定）：告知-同意=PIPL第13-14条；敏感个人信息单独同意=第28-29条；跨境三路径=第38条；跨境单独同意+影响评估=第39-40条；PIA情形与记录存3年=第55-56条；自动化决策=第24条；个人权利=第44-47条；数据分类分级=DSL第21条；重要数据出境=DSL第31条；等级保护=CSL第21条；关基保护=CSL第31条起。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/05-data-compliance/05-CONTEXT.md
@CLAUDE.md
@commercial-legal/CLAUDE.md
@employment-legal/CLAUDE.md
@data-compliance/skills/pia-generation/SKILL.md
@data-compliance/skills/cold-start-interview/SKILL.md
@data-compliance/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@commercial-legal/skills/_shared/practice-profile-schema.md
@litigation-legal/skills/_shared/civil-procedure-citations.md
@employment-legal/skills/_shared/labor-law-citations.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立数据合规法律引用脊柱（来源分类规范 + PIPL/DSL/CSL/网信办办法/国家标准 引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考、行业监管特色；文件格式约定；命名约定）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（结构与质量模板 — 来源分类/标签表/待验证规则/成文法优先/最小引用格式；数据合规版改编以此为骨架）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（引用库结构模板 — 法条/案例/学说三类表格组织、按主题分组、待验证标注方式、版本说明块、审查要点框）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（领域改编范式 — 已核实锚点标注方式、占位案例/学说结构、已核实锚点汇总表、引用库使用说明）
    - employment-legal/skills/_shared/labor-law-citations.md（领域改编范式 — 法律+行政法规+部门规章并存的组织方式、已核实/待验证分层、「描述规则 + 条号待验证」呈现方式）
    - commercial-legal/CLAUDE.md + employment-legal/CLAUDE.md（来源标签规范、行业/管辖识别结构参考）
  </read_first>
  <files>
    data-compliance/skills/_shared/legal-basis-conventions.md,
    data-compliance/skills/_shared/data-protection-citations.md
  </files>
  <action>
    创建 data-compliance/skills/_shared/legal-basis-conventions.md：定义数据合规全插件统一的法律依据引用规范。以 commercial-legal 同名文件为骨架改编，章节包含：「来源分类」（按数据合规语境扩展为多层：法律=PIPL/DSL/CSL 等全国人大及其常委会制定；行政法规=国务院制定，如关键信息基础设施安全保护条例、网络数据安全管理条例（如适用，须标施行状态待验证）；部门规章/规范性文件=网信办/工信部/公安部等制定，如数据出境安全评估办法 2022、个人信息出境标准合同办法 2023、个人信息保护认证相关规定；国家标准=GB/T 系列推荐性标准与强制性标准须区分，如个人信息安全规范、数据出境安全评估指南；案例=最高院指导性案例或参考案例 + 监管行政处罚决定可作参考；学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用五标签 [法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]，不新造冲突标签）；「待验证标记规则」（凡模型回忆的条文号、**网信办规章/办法的具体条号**、国家标准编号与版本、距最后更新超 6 个月的法规、用户口述的条款号或阈值，均须标 `[待验证]` 并说明验证途径）；**「快速演进监管领域时效性强标注」**（数据合规法规更新频繁，办法每隔一两年修订；除 PIPL/DSL/CSL 法律层级稳定锚点外，部门规章/办法/国家标准的具体规则与条号默认标 `[时效性 flagged — 需验证最新法规版本]`，并提示「保守原则：不确定即标待验证，不臆造」）；「成文法优先与案例定位」（成文法为分析基础；指导性案例仅作参考、明确不具判例法约束力；数据合规案例少，监管行政处罚决定与监管问答可作实践参考但非判例）；「行业监管与机构定位」（多头监管识别：网信办=个人信息保护/数据出境/网络安全统筹；工信部=电信和互联网行业数据安全；公安部=网络安全等级保护与关基；市场监管总局/人民银行/卫健委等行业主管部门；地方网信办；涉及特定行业时标 `[行业监管 flagged — 需核实主管部门规定]`）；「引用最小格式」（法律含：名称+条号+施行/修订年份；行政法规/部门规章含：名称+施行年份+制定机关；国家标准含：标准号 GB/T XXXXX-YYYY + 名称 + 推荐性/强制性 `[待验证]`；案例含：案号或决定文号+要点+机关层级）。验证资源列入：国家法律法规数据库 flk.npc.gov.cn、国家网信办官网 www.cac.gov.cn、全国标准信息公共服务平台、北大法宝、中国裁判文书网。不在本文件放完整法条正文——它是规范，不是法条库。

    创建 data-compliance/skills/_shared/data-protection-citations.md：可复用的数据合规高频引用库，按「法条（法律）/ 行政法规 / 部门规章与办法 / 国家标准 / 案例 / 学说」分类组织，并按主题分组：
    （A）个人信息保护法 PIPL（2021年11月1日施行）核心条文——处理的合法性基础与告知-同意（第13-14条，已核实锚点）、敏感个人信息定义与单独同意（第28-29条，已核实锚点）、自动化决策（第24条，已核实锚点）、个人信息跨境提供三路径=安全评估/保护认证/标准合同（第38条，已核实锚点）、跨境单独同意（第39条，已核实锚点）+ 跨境前个人信息保护影响评估（第40条，已核实锚点）、个人在跨境中的权利告知、个人信息保护影响评估 PIA 应进行的情形（处理敏感个人信息、自动化决策、委托处理/对外提供/公开、跨境提供等）与评估报告及处理记录至少保存 3 年（第55-56条，已核实锚点）、个人权利查阅复制更正删除可携带（第44-47条，已核实锚点）、个人信息处理者合规审计义务（第54条 `[待验证]`）、合规管理与个人信息保护负责人（第52条 `[待验证]`）；
    （B）数据安全法 DSL（2021年9月1日施行）核心条文——数据分类分级保护制度=国家核心数据/重要数据/一般数据（第21条，已核实锚点）、重要数据处理者风险评估与报送（条号 `[待验证]`）、重要数据出境（关基运营者与重要数据出境须经安全评估，第31条，已核实锚点）、数据安全管理制度与全流程安全（条号 `[待验证]`）、数据安全事件应急处置与报告（条号 `[待验证]`）、数据交易合规（条号 `[待验证]`）；
    （C）网络安全法 CSL（2017年6月1日施行）核心条文——网络安全等级保护制度（第21条，已核实锚点）、关键信息基础设施安全保护（第31条起，已核实锚点）、关基个人信息和重要数据本地化存储与出境安全评估（第37条 `[待验证具体条号]`）、网络运营者安全义务（实名制、日志留存不少于六个月、技术措施，具体条号 `[待验证]`）、网络运营者收集使用个人信息规则与 PIPL 衔接（条号 `[待验证]`）；
    （D）行政法规——关键信息基础设施安全保护条例（2021年9月1日施行，国务院；关基认定/运营者义务/监测预警，具体条号 `[待验证]`）、网络数据安全管理条例（如适用，须标 `[待验证 — 须核实现行施行状态与条号]`）；
    （E）部门规章与办法——数据出境安全评估办法（2022 网信办；申报情形/自评估/申报材料/评估有效期，**具体条号一律 `[待验证]`，以描述规则呈现**）、个人信息出境标准合同办法（2023 网信办；标准合同范本/备案时限/适用门槛阈值，**具体条号与阈值数值一律 `[待验证]`**）、个人信息保护认证相关规定（`[待验证]`）、网络安全审查办法（`[待验证]`）；
    （F）国家标准——个人信息安全规范、信息安全技术 数据出境安全评估指南、网络安全等级保护基本要求（等保 2.0）等，**标准号 GB/T XXXXX-YYYY 与推荐性/强制性一律 `[待验证]`**。

    **关键纪律（必须遵守 — 这是快速演进监管领域，保守优先）**：
    - 已核实锚点明确标注「已核实」（或「已核实锚点，建议复核」）且不臆造：告知-同意=PIPL第13-14条；敏感个人信息单独同意=第28-29条；自动化决策=第24条；跨境三路径=第38条；跨境单独同意=第39条 + 影响评估=第40条；PIA情形与记录存3年=第55-56条；个人权利=第44-47条；数据分类分级=DSL第21条；重要数据出境=DSL第31条；等级保护=CSL第21条；关基保护=CSL第31条起。
    - **网信办规章/办法（出境评估办法、标准合同办法、认证规定、审查办法）的具体条号、申报材料清单具体项、备案时限、阈值数值（如标准合同适用的个人信息数量门槛）一律标 `[待验证]`，以「描述规则 + 待验证」呈现，绝不硬写裸条号或具体数字阈值。** 凡涉及数量门槛/时限/有效期的具体数值，标 `[待验证 — 数值随办法修订变动，须核实最新版]`。
    - 国家标准（GB/T）编号、版本年份、推荐性/强制性一律标 `[待验证]`。
    - 较新或施行状态不确定的法规（网络数据安全管理条例等）标 `[待验证 — 须核实现行施行状态]`。
    - 每条引用行末尾带来源标签（多数为 `[模型知识 — 需验证]`），并按上述规则标 `[待验证]`（已核实法律层级锚点除外，但仍建议复核）。
    - 案例类放占位结构 + 填写说明（含监管行政处罚决定文号、要点、机关、参考价值），明确「数据合规案例少、行政处罚决定可作参考、模型回忆风险高、默认标 `[待验证]`」；至少含违法跨境/未尽告知同意/敏感个人信息违规/等保未履行四类占位。学说类放占位结构 + 填写说明。
    - 文末附「已核实锚点汇总」表（锚点 / 法律依据 / 规则摘要）与「引用库使用说明」「更新规则」，参照 civil-procedure-citations.md / labor-law-citations.md 的同名章节，**更新规则中强调数据合规法规高频修订、建议每季度复核办法层级**。

    务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>cf=data-compliance/skills/_shared/legal-basis-conventions.md; lf=data-compliance/skills/_shared/data-protection-citations.md; test -f "$cf" && test -f "$lf" && grep -q '法条\|法律' "$cf" && grep -q '部门规章\|网信办' "$cf" && grep -q '国家标准\|GB/T' "$cf" && grep -q '案例' "$cf" && grep -q '学说' "$cf" && grep -q '待验证' "$cf" && grep -q '时效性' "$cf" && grep -q '第13-14条' "$lf" && grep -q '第28-29条' "$lf" && grep -q '第38条' "$lf" && grep -q '第55-56条\|第55条' "$lf" && grep -q '第44-47条' "$lf" && grep -q '第21条' "$lf" && grep -q '第31条' "$lf" && grep -q '出境\|跨境' "$lf"</automated>
  </verify>
  <acceptance_criteria>
    - data-compliance/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节区分 法条/行政法规/部门规章/国家标准 与 案例/学说，并涵盖 PIPL/DSL/CSL/网信办办法语境
    - legal-basis-conventions.md 含「待验证」标记规则 + **「快速演进监管时效性强标注」**章节，复用五个来源标签（不新造冲突标签），含行业监管/网信办多头监管定位
    - legal-basis-conventions.md 明确「成文法为分析基础、指导性案例仅作参考不具判例法约束力、数据合规案例少行政处罚决定可作参考」
    - data-compliance/skills/_shared/data-protection-citations.md 存在，按来源分类组织，分组覆盖 PIPL/DSL/CSL/行政法规/网信办办法/国家标准
    - 已核实锚点明确呈现：告知-同意=第13-14条、敏感单独同意=第28-29条、自动化决策=第24条、跨境三路径=第38条、跨境单独同意+影响评估=第39-40条、PIA情形与记录存3年=第55-56条、个人权利=第44-47条、数据分类分级=DSL第21条、重要数据出境=DSL第31条、等级保护=CSL第21条、关基保护=CSL第31条起
    - 网信办办法的具体条号/申报材料/备案时限/阈值数值一律标 `[待验证]` 并以「描述规则 + 待验证」呈现；国家标准编号与版本标 `[待验证]`；无臆造条号或硬写数值
    - 含已核实锚点汇总表与引用库使用说明（更新规则强调高频修订、建议每季度复核办法）
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个数据合规共享引用文件存在；来源分类规范区分 法条/行政法规/部门规章/国家标准 与 案例/学说，含待验证规则、快速演进监管时效性强标注与网信办多头监管定位；引用库覆盖 PIPL/DSL/CSL/办法/国家标准，已核实锚点（13-14/28-29/24/38/39-40/55-56/44-47 + DSL21/31 + CSL21/31）明确、网信办办法条号与国标编号标待验证、无臆造。</done>
</task>

<task type="auto">
  <name>Task 2: 建立数据合规版实践配置契约 + 新建 data-compliance/CLAUDE.md 实践配置模板</name>
  <read_first>
    - commercial-legal/skills/_shared/practice-profile-schema.md（结构与质量模板 — 真相来源决策、字段映射表、技能读取契约、立场选择、重跑/编辑/版本控制、法律事实合理性检查、schema 与 CLAUDE.md 章节对照）
    - commercial-legal/CLAUDE.md（实践配置模板范式 — 我们是谁/谁在使用/可用集成/审查立场/升级矩阵/文书风格/输出/共享护栏 完整章节结构与占位符写法）
    - employment-legal/CLAUDE.md（领域改编范式 — 风险校准表、地方性规定识别表、精简后的审查立场结构）
    - data-compliance/skills/cold-start-interview/SKILL.md（现有访谈三部分 — 字段映射来源；注意末尾「生成 YAML 格式」表述须在 schema 中纠正为写入 CLAUDE.md）
    - data-compliance/skills/pia-generation/SKILL.md + data-compliance/skills/cross-border-assessment/SKILL.md（现有技能 — 确认未来读取 CLAUDE.md 字段的方向）
    - CLAUDE.md（命名；文件格式；中国化原则——行业监管特色）
  </read_first>
  <files>
    data-compliance/skills/_shared/practice-profile-schema.md,
    data-compliance/CLAUDE.md
  </files>
  <action>
    **第一部分 — 新建 data-compliance/CLAUDE.md 实践配置模板**（当前插件无此文件，首次创建）。以 commercial-legal/CLAUDE.md 为范式，改编为数据合规语境的散文模板，含占位符 [PLACEHOLDER]。章节：
    - 顶部说明块：本文件由 /data-compliance:cold-start-interview 生成更新，律师/DPO 可直接编辑，所有数据合规技能从此读取立场。
    - `## 我们是谁`（数据处理者画像）：组织/律所名称、实体类型、所属行业（互联网/金融/医疗/教育/制造等——影响行业监管）、数据处理者角色（个人信息处理者/受托处理者/是否关键信息基础设施运营者 CIIO）、处理个人信息的大致规模（条/人级别——影响出境路径门槛）、是否处理敏感个人信息、是否有数据出境场景、合规团队规模、DPO/个人信息保护负责人、最大痛点。
    - `## 谁在使用`：角色（数据合规律师/企业 DPO/法务/非律师但有律师可咨询/非律师且无律师可咨询）、律师联系人。含非律师角色提示（输出作为研究供律师审查）。
    - `## 可用集成`：数据资产/数据地图工具、合规管理平台、隐私政策/同意管理平台 CMP、企业微信/钉钉。
    - `## 合规立场`：整体合规偏好（保守/平衡/进取）；`### 敏感数据政策`（处理敏感个人信息的内部门槛、单独同意获取方式、敏感数据最小化立场、是否处理不满十四周岁未成年人个人信息及监护人同意）；`### 跨境政策`（是否允许数据出境、首选出境路径（安全评估/保护认证/标准合同）、数据本地化立场、跨境接收方所在法域偏好/黑名单、重要数据出境立场）；`### 数据安全立场`（数据分类分级策略、重要数据识别立场、等级保护定级倾向）。
    - `## 风险校准`：🔴关键/🟠高/🟡中等/🟢低 等级定义（结合监管处罚风险：PIPL 最高营业额 5% 或五千万罚款 `[待验证]`、DSL/CSL 处罚）。
    - `## 升级矩阵`：角色/可独立处理事项/需升级条件表（DPO/主办律师/法务总监）；自动升级触发条件（如重要数据出境、大规模敏感个人信息处理、监管问询/检查、数据泄露事件）；监管报告触发（数据安全事件报告、个人信息泄露通知义务）。
    - `## 文书风格`：合规报告风格、PIA/出境评估报告风格、监管沟通风格、工作产物存放位置。
    - `## 输出`：工作产物标题（律师角色 vs 非律师角色，沿用特权标题/研究笔记两版）、审查者注释块、下一步决策树模板（出具报告/升级/补充事实/申报监管/观望）。
    - `## 共享护栏`：无静默补充原则；**时效性触发（数据合规法规高频更新，距最后更新超 6 个月或涉及网信办办法即标 `[时效性 flagged — 需验证最新法规版本]`）**；验证用户陈述的法律事实；来源标签规范表；目的地/特权检查；`### 行业监管识别`（互联网/金融/医疗/汽车/教育等行业特殊数据合规要求 + 网信办/工信部/公安部/行业主管部门多头监管，标 `[行业监管 flagged — 需核实主管部门规定]`）。
    - `## 事项工作区` 与 `## 审查过的种子文档`（沿用范式）。

    **第二部分 — 创建 data-compliance/skills/_shared/practice-profile-schema.md**，以 commercial-legal 同名文件为骨架改编为数据合规语境。章节：
    - 「配置文件是什么 / 真相来源」：明确真相来源是 data-compliance/CLAUDE.md（散文模板，本阶段新建），由 /data-compliance:cold-start-interview 生成更新，律师/DPO 可直接编辑；记录架构决策（不引入冲突新 JSON/YAML 格式，沿用 CLAUDE.md 单一真相来源，理由同 commercial 版）。**明确纠正**：现有 cold-start-interview/SKILL.md 末尾「生成数据合规实践配置文件（YAML 格式）」的表述应理解为填充 data-compliance/CLAUDE.md 对应章节，而非另存独立 YAML 文件。
    - 「字段映射表」：将访谈/审查收集的字段对应到 data-compliance/CLAUDE.md 章节，并标注哪些技能读取该字段。至少覆盖映射组：数据处理者画像（## 我们是谁/## 谁在使用 → 所有技能工作产物标题、CIIO 判断、出境门槛判断）；合规立场（## 合规立场 → 整体偏好 → 所有技能风险分级）；敏感数据政策（## 合规立场 → 敏感数据政策 → pia-generation 各子技能、network-security-compliance 个人信息收集）；跨境政策（## 合规立场 → 跨境政策 → cross-border-assessment 各子技能、data-security-compliance 重要数据出境）；数据安全立场（## 合规立场 → 数据安全立场 → data-security-compliance、network-security-compliance 定级）；风险校准（## 风险校准 → 等级 → 所有技能）；升级矩阵与监管报告（## 升级矩阵 → 各技能升级路由 + 报告触发）；文书风格（## 文书风格/## 输出 → 各装配子技能）；行业监管（## 共享护栏 → 行业监管识别 → 各技能行业标记）。
    - 「技能读取契约」：技能在实质性工作前须读取 data-compliance/CLAUDE.md、检查关键字段是否含 [PLACEHOLDER]、据此选运行模式；配置缺失/含占位符时标准提示（运行 cold-start-interview 或说「临时模式」）；临时模式默认值表（合规偏好平衡、角色律师、个人信息处理者非 CIIO 默认、敏感数据按严格门槛标记常见风险、跨境路径按门槛逐案判定不预设、数据安全按分类分级保守处理）。
    - 「数据处理者立场（处理者/受托处理者；CIIO/非 CIIO）选择」：技能在工作前确认数据处理者身份与是否 CIIO（从 ## 我们是谁 读取），据此加载对应立场与义务强度，参照 commercial practice-profile-schema 的立场选择逻辑改编为数据合规语境。
    - 「重跑 / 编辑 / 版本控制」：完整重跑 vs 单独更新某部分；直接编辑；git 版本控制与回滚（git log/diff/checkout data-compliance/CLAUDE.md）。
    - 「法律事实合理性检查」：用户口述条号/阈值/时限（如出境门槛人数、评估有效期、日志留存期限、记录保存年限）时写入前合理性检查（条号核查、**网信办办法阈值数值标待验证**、时效性标记、矛盾澄清），含 `[前提 flagged — 需验证]` 流程；特别强调数据合规阈值随办法修订变动，须标待验证。
    - 「schema 与 CLAUDE.md 模板章节对照」表。
    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。两文件均为本任务产出，注意 data-compliance/CLAUDE.md 是**新建**。
  </action>
  <verify>
    <automated>cm=data-compliance/CLAUDE.md; sc=data-compliance/skills/_shared/practice-profile-schema.md; test -f "$cm" && test -f "$sc" && grep -q '数据处理者\|我们是谁' "$cm" && grep -q '合规立场' "$cm" && grep -q '敏感数据政策' "$cm" && grep -q '跨境政策' "$cm" && grep -q '升级矩阵' "$cm" && grep -q '行业监管' "$cm" && grep -q 'data-compliance/CLAUDE.md' "$sc" && grep -q '字段映射' "$sc" && grep -q '临时模式' "$sc" && grep -q 'CIIO\|关键信息基础设施\|受托处理者' "$sc"</automated>
  </verify>
  <acceptance_criteria>
    - data-compliance/CLAUDE.md 新建存在，含 ## 我们是谁（数据处理者画像，含行业/CIIO/处理规模/是否处理敏感个人信息/是否出境）、## 谁在使用、## 可用集成、## 合规立场（含 ### 敏感数据政策 + ### 跨境政策 + ### 数据安全立场）、## 风险校准、## 升级矩阵（含监管报告触发）、## 文书风格、## 输出、## 共享护栏（含 ### 行业监管识别 + 时效性触发）
    - data-compliance/CLAUDE.md 含律师/非律师双版工作产物标题，时效性触发体现数据合规高频更新特点
    - data-compliance/skills/_shared/practice-profile-schema.md 存在，明确真相来源为 data-compliance/CLAUDE.md，记录「不引入冲突新格式」架构决策，纠正现有访谈「生成 YAML」表述
    - schema 含字段映射表，覆盖 数据处理者画像/合规立场/敏感数据政策/跨境政策/数据安全立场/风险校准/升级矩阵/文书风格/行业监管 各组并标注读取技能
    - schema 含技能读取契约 + 临时模式默认值 + 数据处理者/受托处理者/CIIO 立场选择逻辑 + 法律事实合理性检查（网信办办法阈值标待验证）+ schema 与 CLAUDE.md 章节对照表
    - 两文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新建 data-compliance/CLAUDE.md 实践配置模板（数据处理者画像/合规立场含敏感数据与跨境政策/风险校准/升级矩阵/文书风格/输出/共享护栏含行业监管）；数据合规版配置契约定义配置文件是什么/在哪/技能怎么读，字段映射到 CLAUDE.md 章节，含临时模式与处理者/受托/CIIO 立场选择与法律事实合理性检查，并纠正现有访谈 YAML 表述。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 pia-generation 为四个可独立触发的子技能</name>
  <read_first>
    - data-compliance/skills/pia-generation/SKILL.md（现有浅骨架 — 四步纲要：处理活动识别/风险评估/保护措施评估/生成PIA报告；这是要拆分迁移并大幅深化的源）
    - data-compliance/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - data-compliance/skills/_shared/data-protection-citations.md（Task 1 产出 — 引用库，各子技能法律依据引用此处）
    - data-compliance/skills/_shared/practice-profile-schema.md（Task 2 产出 — 配置读取契约）
    - data-compliance/CLAUDE.md（Task 2 产出 — 配置模板，子技能读取合规立场/敏感数据政策/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板含 markdown 结构/边界条件表/错误处理表/## 法律依据 按三类分类的完整范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md,
    data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md,
    data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md,
    data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md
  </files>
  <action>
    将现有 pia-generation/SKILL.md 的浅骨架四步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：trigger-consent-basis / data-mapping-necessity / risk-mitigation-assessment / pia-report-assembly；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 data-compliance/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/行政法规/部门规章/国家标准 与 案例/学说 分类，引用 _shared/data-protection-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 pia-generation 编排入口调用，也可由律师/DPO 单独触发（/data-compliance:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** 拆分时须深化（补充边界条件、错误处理、输出模板、法律依据分类），而非仅搬运纲要。

    分工（迁移现有四步纲要并深化，无丢失）：
    - trigger-consent-basis（评估情形与告知-同意基础）：覆盖「何时须做 PIA」与「处理合法性基础」。PIA 应进行的情形（第55条，已核实：处理敏感个人信息、利用个人信息进行自动化决策、委托处理/向他人提供/公开个人信息、向境外提供个人信息、其他对个人权益有重大影响的处理活动）；处理个人信息的合法性基础与告知-同意规则（第13-14条，已核实：取得同意/订立履行合同所必需/法定职责义务/突发公共卫生事件/新闻报道舆论监督/已公开信息合理处理 等基础；同意须自愿明确、知情、可撤回）；敏感个人信息单独同意与告知（第28-29条，已核实：敏感个人信息定义=生物识别/宗教信仰/特定身份/医疗健康/金融账户/行踪轨迹及不满十四周岁未成年人信息；处理须具特定目的与充分必要性，取得单独同意，部分情形书面同意）；自动化决策（第24条，已核实：保证透明度与结果公平，不得不合理差别待遇，向个人提供拒绝或不针对其个人特征的选项，重大影响决策可要求说明）。深化：每类触发情形的判定问句、同意机制审查要点表（撤回机制/捆绑同意禁止/单独同意场景清单）、未成年人监护人同意。边界条件：合法性基础为「合同所必需」时不需另取同意但仍需告知。
    - data-mapping-necessity（数据映射与最小必要）：覆盖现纲要「处理活动识别」并深化。处理活动梳理（处理目的/方式/类型/范围/保存期限/接收方/是否委托或对外提供/是否跨境）；个人信息类目清单与敏感个人信息识别标注；最小必要原则审查（与处理目的直接相关、采取对个人权益影响最小方式、收集范围限于实现目的最小范围、保存期限为实现目的所必要的最短时间）；委托处理与对外提供的处理者义务（受托处理者约束、共同处理者责任、第三方接收方约定）。深化：处理活动登记表模板、最小必要偏离判定表、数据保存期限合规表。边界条件：去标识化/匿名化数据的边界（匿名化信息不属于个人信息）。
    - risk-mitigation-assessment（风险评估与保护措施）：覆盖现纲要「风险评估」与「保护措施评估」并深化。风险点识别（处理目的方式合法正当必要性、对个人权益的影响及安全风险、保护措施合法有效且与风险程度相适应——对应第55条评估内容）；技术与组织保护措施评估（加密/去标识化/访问控制/最小授权/日志审计/安全培训/应急预案）；个人权利保障机制审查（查阅/复制/更正/补充/删除/可携带/解释说明，第44-47条，已核实；权利行使受理与响应机制）。深化：风险等级矩阵（可能性×影响）、保护措施充分性对照表、个人权利响应流程表。边界条件：跨境场景额外风险（境外接收方保护水平、当地政府调取）应交由 cross-border-assessment 深度评估（分工说明，不重叠）。
    - pia-report-assembly（PIA 报告组装）：覆盖现纲要「生成 PIA 报告」并深化。PIA 报告标准结构（处理活动概况/合法性基础/处理活动详情与数据映射/风险评估结论/保护措施/个人权利保障/整改建议/总体结论）；评估记录与报告保存（第55-56条，已核实：影响评估报告和处理情况记录应至少保存 3 年）；从配置文件读工作产物标题与文书风格；结论与整改建议（高风险须整改后处理、必要时停止）。深化：报告输出模板（完整 markdown 结构）、保存期限合规提示、与监管检查/合规审计衔接、交付前质量检查清单。本子技能负责汇总前三个子技能发现组装最终 PIA 报告。边界条件：若评估发现须重新设计处理活动，提示回到 trigger-consent-basis / data-mapping-necessity 重评。

    遵守文件格式约定。输出模板用 markdown 结构示意（沿用 social-insurance-wages / penalty-assessment 风格）。所有法律依据引用 _shared/data-protection-citations.md，已核实锚点（第13-14/28-29/24/55-56/44-47条等）明确、网信办办法条号标待验证。
  </action>
  <verify>
    <automated>for d in trigger-consent-basis data-mapping-necessity risk-mitigation-assessment pia-report-assembly; do f="data-compliance/skills/pia-generation/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第13-14条' data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md && grep -q '第28-29条' data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md && grep -q '最小必要' data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md && grep -q '第44-47条' data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md && grep -q '第55-56条\|第55条\|3 年\|三年' data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 data-compliance/skills/pia-generation/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行（深度对标 social-insurance-wages）
    - trigger-consent-basis 含告知-同意第13-14条 + 敏感单独同意第28-29条 + 自动化决策第24条 + PIA情形第55条；data-mapping-necessity 含最小必要原则；risk-mitigation-assessment 含个人权利第44-47条；pia-report-assembly 含记录存3年（第55-56条）
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>pia-generation 拆为四个可独立触发的子技能；现有四步纲要无丢失迁移并大幅深化（每个 150+ 行）；告知-同意引用第13-14条、敏感单独同意第28-29条、个人权利第44-47条、记录存3年第55-56条；法律依据按来源分类引用 _shared 库，网信办办法条号标待验证。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 pia-generation/SKILL.md 为编排入口</name>
  <read_first>
    - data-compliance/skills/pia-generation/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - data-compliance/CLAUDE.md（Task 2 产出 — 配置模板）
    - data-compliance/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 05-03 统一更新）
  </read_first>
  <files>
    data-compliance/skills/pia-generation/SKILL.md
  </files>
  <action>
    将 data-compliance/skills/pia-generation/SKILL.md 改造为编排入口：保留 frontmatter（name: pia-generation，更新 description 说明它现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/pia-generation/<子技能名>/SKILL.md）；(2) 目的与整体 PIA 流程概览（依《个人信息保护法》第55-56条生成个人信息保护影响评估报告，记录存 3 年）；(3) 前置：加载合规立场——读取 data-compliance/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /data-compliance:cold-start-interview 或说「临时模式」），含临时模式段落（平衡合规偏好、律师角色、个人信息处理者非 CIIO 默认、敏感数据严格门槛、标 `[临时模式]`）；(4) 子技能编排顺序表——评估情形与告知-同意基础 → 数据映射与最小必要 → 风险评估与保护措施 → PIA 报告组装，每行说明该子技能做什么、对应子技能路径（skills/pia-generation/<name>/SKILL.md）、可单独触发的斜杠命令（/data-compliance:<name>）+ 顺序说明；(5) 入口级护栏：数据处理者/受托处理者/CIIO 立场确认（从 ## 我们是谁 读取）、敏感个人信息识别提示（驱动单独同意要求）、行业监管识别、目的地/特权检查、若涉及数据出境提示可调用 cross-border-assessment、时效性提示（数据合规法规高频更新）。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=data-compliance/skills/pia-generation/SKILL.md; grep -q '^name: pia-generation' "$f" && grep -q 'trigger-consent-basis' "$f" && grep -q 'data-mapping-necessity' "$f" && grep -q 'risk-mitigation-assessment' "$f" && grep -q 'pia-report-assembly' "$f" && grep -q '临时模式' "$f" && grep -q '敏感\|CIIO\|出境\|行业监管' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - data-compliance/skills/pia-generation/SKILL.md 仍有 frontmatter name: pia-generation，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/data-compliance:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、数据处理者/CIIO 立场确认、敏感个人信息识别、行业监管识别、目的地/特权检查、出境衔接提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 pia-generation/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（立场确认、敏感个人信息识别、行业监管、临时模式、特权检查、出境衔接）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 PIA 子技能 + 一个引用规范 + 一个引用库 + 一个配置契约 + 一个新建 CLAUDE.md + 一个编排入口全部存在且格式合规
- 数据合规引用脊柱（来源分类规范含部门规章/国标 + PIPL/DSL/CSL/办法/国标 引用库）与配置契约可被 05-02 / 05-03 复用
- 现有 pia-generation 浅骨架四步纲要无丢失迁移并大幅深化
- 已核实锚点（告知-同意=13-14条、敏感单独同意=28-29条、自动化决策=24条、跨境三路径=38条、跨境单独同意+影响评估=39-40条、PIA情形与记录存3年=55-56条、个人权利=44-47条、数据分类分级=DSL21条、重要数据出境=DSL31条、等级保护=CSL21条、关基=CSL31条起）明确；网信办办法具体条号与阈值、国标编号均标 `[待验证]`，无臆造
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('data-compliance/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/DPO 可单独触发任一 PIA 子能力（4 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 数据合规法律引用按 法条/行政法规/部门规章/国家标准 与 案例/学说 分类并标待验证；已核实锚点明确呈现；网信办办法条号保守标待验证
- 新建 data-compliance/CLAUDE.md 实践配置模板（数据处理者画像/合规立场/敏感数据政策/跨境政策/升级规则）存在
- 数据合规版实践配置契约定义清楚，技能据此读取 data-compliance/CLAUDE.md
- pia-generation 编排入口指向四个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/05-data-compliance/05-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
