---
phase: 05-data-compliance
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md
  - data-compliance/skills/cross-border-assessment/security-assessment-filing/SKILL.md
  - data-compliance/skills/cross-border-assessment/standard-contract/SKILL.md
  - data-compliance/skills/cross-border-assessment/cross-border-assembly/SKILL.md
  - data-compliance/skills/cross-border-assessment/SKILL.md
  - data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md
  - data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md
  - data-compliance/skills/data-security-compliance/security-management-system/SKILL.md
  - data-compliance/skills/data-security-compliance/risk-assessment-reporting/SKILL.md
  - data-compliance/skills/data-security-compliance/SKILL.md
autonomous: true
requirements:
  - CROSS-BORDER-DECOMP
  - DATA-SECURITY-COMPLIANCE
user_setup: []

must_haves:
  truths:
    - "律师/DPO 可以单独触发数据出境评估的任一子能力（出境路径判定三路径 / 安全评估申报 / 标准合同备案 / 出境装配含认证）而无需运行整个流程"
    - "出境路径判定子技能正确呈现 PIPL 第38条三路径（安全评估 / 保护认证 / 标准合同）+ 跨境单独同意第39条 + 跨境前个人信息保护影响评估第40条，网信办办法的适用门槛/阈值数值标待验证"
    - "新增 data-security-compliance（数据安全法合规检查）技能，覆盖数据分类分级（DSL第21条 核心/重要/一般）/ 重要数据识别与出境（DSL第31条）/ 数据安全管理制度 / 风险评估与报告，四个子技能可独立触发 + 编排入口"
    - "现有 cross-border-assessment（浅骨架四步纲要：出境数据识别/接收方评估/风险评估/生成报告）内容无丢失迁移到子技能并深化，原 SKILL.md 改为编排入口"
    - "每个子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容（编排入口 ≥40 行）"
    - "新增 data-security-compliance 编排入口指向四个子技能且含入口级护栏（数据处理者/CIIO 立场、重要数据识别、行业监管、临时模式）"
  artifacts:
    - path: "data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md"
      provides: "出境路径判定子技能：三路径判定（安全评估/保护认证/标准合同 第38条）+ 跨境单独同意第39条 + 影响评估第40条 + 触发情形与门槛判断"
      contains: "第38条"
      min_lines: 150
    - path: "data-compliance/skills/cross-border-assessment/security-assessment-filing/SKILL.md"
      provides: "安全评估申报子技能：数据出境安全评估办法（2022）申报情形/自评估/申报材料/评估有效期（具体条号与时限待验证）"
      contains: "安全评估"
      min_lines: 150
    - path: "data-compliance/skills/cross-border-assessment/standard-contract/SKILL.md"
      provides: "标准合同备案子技能：个人信息出境标准合同办法（2023）标准合同范本/备案/适用门槛（数值待验证）+ 影响评估"
      contains: "标准合同"
      min_lines: 150
    - path: "data-compliance/skills/cross-border-assessment/cross-border-assembly/SKILL.md"
      provides: "出境装配子技能：保护认证路径 + 出境前合规清单 + 出境记录 + 出境评估报告组装"
      contains: "## 法律依据"
      min_lines: 120
    - path: "data-compliance/skills/cross-border-assessment/SKILL.md"
      provides: "数据出境评估编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md"
      provides: "数据分类分级子技能：DSL第21条 国家核心数据/重要数据/一般数据三级 + 行业分类分级标准衔接"
      contains: "第21条"
      min_lines: 150
    - path: "data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md"
      provides: "重要数据识别与处理子技能：重要数据目录 + 重要数据出境（DSL第31条）+ 风险评估报送"
      contains: "第31条"
      min_lines: 150
    - path: "data-compliance/skills/data-security-compliance/security-management-system/SKILL.md"
      provides: "数据安全管理制度子技能：全流程数据安全管理制度 + 安全教育培训 + 技术措施 + 负责人/机构"
      contains: "## 法律依据"
      min_lines: 150
    - path: "data-compliance/skills/data-security-compliance/risk-assessment-reporting/SKILL.md"
      provides: "数据安全风险评估与报告子技能：风险监测 + 安全事件应急处置与报告 + 数据交易合规"
      contains: "安全事件"
      min_lines: 150
    - path: "data-compliance/skills/data-security-compliance/SKILL.md"
      provides: "数据安全法合规检查编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用跨境三路径与单独同意/影响评估（PIPL第38-40条）"
      pattern: "data-protection-citations|第38条|第39条|第40条"
    - from: "data-compliance/skills/cross-border-assessment/SKILL.md"
      to: "四个出境子技能"
      via: "编排入口指向子技能路径"
      pattern: "pathway-determination|security-assessment-filing|standard-contract|cross-border-assembly"
    - from: "data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用数据分类分级（DSL第21条）"
      pattern: "data-protection-citations|第21条"
    - from: "data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用重要数据出境（DSL第31条）"
      pattern: "data-protection-citations|第31条"
    - from: "data-compliance/skills/data-security-compliance/SKILL.md"
      to: "四个数据安全子技能"
      via: "编排入口指向子技能路径"
      pattern: "data-classification-grading|important-data-handling|security-management-system|risk-assessment-reporting"
---

<objective>
将数据出境评估从浅骨架深化为四个可独立触发的子技能，并**新增**数据安全法合规检查（data-security-compliance）主技能（四子技能 + 编排入口）。

本计划交付两块内容：
1. **数据出境评估拆分** — 按 CONTEXT「深层子技能拆分」决策，将 cross-border-assessment（现 ~16 行浅骨架四步纲要：出境数据识别 / 接收方评估 / 风险评估 / 生成报告）拆为四个可独立触发的子技能：出境路径判定（三路径） / 安全评估申报 / 标准合同备案 / 出境装配（保护认证 + 合规清单）。原 SKILL.md 改为编排入口。
2. **新增数据安全法合规检查** — 按 CONTEXT 覆盖 ROADMAP 第三能力面，新建 data-security-compliance 主技能，拆为四个子技能：数据分类分级（DSL第21条核心/重要/一般） / 重要数据识别与处理（DSL第31条出境） / 数据安全管理制度 / 风险评估与报告，外加一个编排入口。

Purpose: 关闭「ROADMAP 要求数据出境评估 + 数据安全法合规检查两个能力面，现实出境评估为浅骨架、数据安全法合规检查完全缺失」的 gap。本计划与 05-01 无文件重叠（05-01 写 _shared/CLAUDE.md/pia-generation，本计划写 cross-border-assessment/data-security-compliance），可与 05-01 并行（wave 1）。本计划依赖 05-01 产出的 _shared 引用脊柱与 data-compliance/CLAUDE.md 作为引用与配置读取来源——这是**内容引用依赖**（子技能在「前置」与「## 法律依据」中引用 _shared 与 CLAUDE.md），但**无文件写入重叠**，故 depends_on 留空、同处 wave 1；执行编排须保证 05-01 的 _shared 与 CLAUDE.md 先就绪或同批交付（若执行时 _shared 尚未生成，子技能仍按引用路径声明引用，内容核验在阶段验证时统一回归）。
Output: 4 个出境子技能 + 1 个出境编排入口 + 4 个数据安全子技能 + 1 个数据安全编排入口。

中国化原则约束（来自 CLAUDE.md）：成文法为主（PIPL/DSL/CSL + 网信办出境评估办法 2022/标准合同办法 2023 + 关基条例 + 国家标准）；行业监管特色（网信办统筹数据出境与数据安全、行业主管部门重要数据目录）；执业环境适配（DPO/法务/外部律师）。命名 kebab-case；斜杠命令 /data-compliance:<skill>。文件格式：JSON 2 空格缩进、换行结尾、无尾部空格、表格列数一致。

法律内容硬性要求：**快速演进监管领域，保守优先**。已核实锚点：跨境三路径（安全评估/保护认证/标准合同）=PIPL第38条；跨境单独同意=第39条；跨境前影响评估=第40条；数据分类分级=DSL第21条；重要数据出境=DSL第31条。**网信办办法的适用门槛（如标准合同适用的个人信息数量阈值、安全评估强制申报的数量阈值）、申报材料清单、评估有效期、备案时限等具体条号与数值一律标 `[待验证 — 数值随办法修订变动，须核实最新版]`，绝不臆造。** 重要数据目录由各地区各部门制定，具体标准标 `[行业监管 flagged — 需核实主管部门规定]`。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/05-data-compliance/05-CONTEXT.md
@CLAUDE.md
@data-compliance/skills/cross-border-assessment/SKILL.md
@data-compliance/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@litigation-legal/skills/_shared/civil-procedure-citations.md
@employment-legal/skills/_shared/labor-law-citations.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@commercial-legal/skills/contract-review/SKILL.md

> 注：本计划子技能引用 05-01 产出的 data-compliance/skills/_shared/{legal-basis-conventions.md, data-protection-citations.md, practice-profile-schema.md} 与 data-compliance/CLAUDE.md。执行时若这些文件已由 05-01 生成则直接读取核验；否则按声明的引用路径编写（阶段验证统一回归引用一致性）。
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 cross-border-assessment 为四个子技能 + 改造编排入口</name>
  <read_first>
    - data-compliance/skills/cross-border-assessment/SKILL.md（现有浅骨架四步纲要 — 出境数据识别/接收方评估/风险评估/生成评估报告；要拆分迁移并大幅深化的源）
    - data-compliance/skills/_shared/data-protection-citations.md（05-01 产出 — 引用库，重点：PIPL第38-40条跨境、DSL第31条重要数据出境、CSL第37条关基本地化、出境评估办法、标准合同办法）
    - data-compliance/skills/_shared/legal-basis-conventions.md（05-01 产出 — 引用规范）
    - data-compliance/skills/_shared/practice-profile-schema.md（05-01 产出 — 配置读取契约）
    - data-compliance/CLAUDE.md（05-01 产出 — 读取跨境政策/首选路径/数据处理者画像/CIIO）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 完整章节范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/contract-review/SKILL.md + employment-legal/skills/hiring-review/SKILL.md（编排入口范式）
    - CLAUDE.md（命名；文件格式）
  </read_first>
  <files>
    data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md,
    data-compliance/skills/cross-border-assessment/security-assessment-filing/SKILL.md,
    data-compliance/skills/cross-border-assessment/standard-contract/SKILL.md,
    data-compliance/skills/cross-border-assessment/cross-border-assembly/SKILL.md,
    data-compliance/skills/cross-border-assessment/SKILL.md
  </files>
  <action>
    将现有 cross-border-assessment/SKILL.md 的浅骨架四步纲要拆分迁移并**大幅深化**到四个子技能（每个独立 SKILL.md，含 frontmatter：name kebab-case / description / argument-hint），并将原 SKILL.md 改造为编排入口。每个子技能 MUST 含标准章节：目的、前置（读取 data-compliance/CLAUDE.md 跨境政策 + 引用 _shared 规范/引用库/契约 + 分工说明 + 可单独触发）、详细步骤（含表格）、检查清单、输出模板（markdown 结构）、边界条件（表）、错误处理（表）、`## 法律依据`（按 法条/行政法规/部门规章/国家标准 与 案例/学说 分类，引用 _shared/data-protection-citations.md，标待验证，含占位）。**每个子技能 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment。**

    分工（迁移现有四步并深化，无丢失）：
    - pathway-determination（出境路径判定）：覆盖现纲要「出境数据识别」并深化为路径判定核心。个人信息跨境提供三路径（第38条，已核实：①通过国家网信部门组织的安全评估；②按规定经专业机构进行个人信息保护认证；③按网信部门制定的标准合同与境外接收方订立合同；以及法律行政法规或网信部门规定的其他条件）；跨境单独同意（第39条，已核实：向境外提供须向个人告知境外接收方名称/联系方式/处理目的方式/个人信息种类/个人行使权利方式等，并取得单独同意）；跨境前个人信息保护影响评估（第40条，已核实：关键信息基础设施运营者和处理个人信息达到规定数量的处理者，应当将境内收集产生的个人信息存储在境内；确需出境的须经安全评估）；路径选择决策树（CIIO？重要数据？个人信息数量是否达到强制安全评估门槛？→ 安全评估；否则保护认证或标准合同——具体数量门槛标 `[待验证 — 数值随办法修订，须核实最新版]`）。深化：三路径适用条件对照表、路径选择决策树、出境数据与接收方初步识别表。边界条件：重要数据出境一律走安全评估（与 DSL 第31条衔接，提示可调 data-security-compliance/important-data-handling）。
    - security-assessment-filing（安全评估申报）：依《数据出境安全评估办法》（2022 网信办）。申报情形（CIIO 出境个人信息和重要数据、出境重要数据、处理个人信息达到规定数量门槛的处理者出境个人信息——**门槛数值标 `[待验证]`**）；出境风险自评估（出境目的范围方式合法正当必要性、数据规模范围种类敏感程度、境外接收方保护能力、出境后转移再转移风险、当地数据保护法律政策与网络安全环境）；申报材料（申报书、风险自评估报告、与境外接收方拟订立的法律文件等——**具体清单以「描述规则」呈现并标 `[待验证]`**）；评估有效期与重新评估情形（**有效期年限标 `[待验证 — 随办法修订变动]`**）。深化：自评估要点表、申报流程步骤表、重新评估触发表。边界条件：评估未通过/有效期届满时数据出境的合规处理。
    - standard-contract（标准合同备案）：依《个人信息出境标准合同办法》（2023 网信办）。适用门槛（非 CIIO 且处理个人信息数量未达安全评估强制门槛——**门槛数值（如累计出境人数、敏感个人信息人数）一律标 `[待验证]`**）；标准合同范本核心条款（处理者与接收方义务、个人作为第三方受益人的权利、接收方所在地保护政策影响、违约责任与争议解决）；备案（订立标准合同 + 个人信息保护影响评估后向省级网信部门备案——**备案时限标 `[待验证]`**）；与第40条跨境影响评估衔接。深化：标准合同条款审查表、备案材料与流程表、适用条件判断表。边界条件：通过捆绑或拆分规避数量门槛属违规（标 🔴）。
    - cross-border-assembly（出境装配）：覆盖现纲要「接收方评估」「风险评估」「生成评估报告」并深化。保护认证路径说明（按规定经专业机构进行个人信息保护认证，适用情形——具体规定标 `[待验证]`）；境外接收方综合评估（保护能力/法律环境/再转移约束）；出境前合规清单（路径确认/单独同意/影响评估/合同或评估或认证就位/记录留存）；出境评估报告组装（从 CLAUDE.md 读工作产物标题与文书风格）。深化：三路径合规清单对照、出境记录模板、出境评估报告完整 markdown 模板、交付前质量检查。本子技能负责汇总路径判定与申报/合同发现组装最终出境评估报告。边界条件：多路径并存或路径变更时的处理。

    **改造编排入口** data-compliance/skills/cross-border-assessment/SKILL.md：保留 frontmatter（name: cross-border-assessment，description 更新为编排说明）。正文：(1) 顶部迁移说明指向子技能；(2) 目的与出境评估整体流程概览；(3) 前置：读取 data-compliance/CLAUDE.md 跨境政策，缺失/占位时标准提示（运行 cold-start-interview 或「临时模式」），临时模式段落（平衡偏好、律师角色、路径按门槛逐案判定不预设、标 `[临时模式]`）；(4) 子技能编排顺序表——出境路径判定 → 安全评估申报 / 标准合同备案（按路径二选一或认证）→ 出境装配，每行说明做什么 + 子技能路径 + 单独触发斜杠命令（/data-compliance:<name>）；(5) 入口级护栏：数据处理者/CIIO 立场确认、重要数据识别提示（衔接 data-security-compliance）、单独同意与影响评估强制项、行业监管识别、目的地/特权检查、时效性提示（出境办法高频更新、门槛数值须核实最新版）。

    遵守文件格式约定。所有法律依据引用 _shared/data-protection-citations.md，第38-40条已核实明确、办法门槛/时限/有效期数值标待验证。
  </action>
  <verify>
    <automated>for d in pathway-determination security-assessment-filing standard-contract cross-border-assembly; do f="data-compliance/skills/cross-border-assessment/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=data-compliance/skills/cross-border-assessment/SKILL.md; grep -q '^name: cross-border-assessment' "$e" && grep -q 'pathway-determination' "$e" && grep -q 'security-assessment-filing' "$e" && grep -q 'standard-contract' "$e" && grep -q 'cross-border-assembly' "$e" && grep -q '临时模式' "$e" && grep -q '第38条' data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md && grep -q '第39条\|第40条\|单独同意\|影响评估' data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个出境子技能 SKILL.md 全部存在，路径为 data-compliance/skills/cross-border-assessment/<kebab-name>/SKILL.md，各含 frontmatter（name/description/argument-hint）
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行
    - pathway-determination 含第38条三路径 + 第39条单独同意 + 第40条影响评估 + 路径选择决策树；security-assessment-filing 含申报情形/自评估/申报材料（门槛与时限标待验证）；standard-contract 含标准合同范本/备案/适用门槛（数值待验证）
    - cross-border-assembly 含保护认证路径 + 出境前合规清单 + 出境评估报告组装
    - cross-border-assessment/SKILL.md 改为编排入口：含子技能编排顺序表（指向四子技能 + 单独触发命令）+ 入口级护栏（CIIO/重要数据/单独同意/行业监管/临时模式/特权检查）+ 迁移说明
    - 网信办办法的门槛数值/时限/有效期一律标 `[待验证]`，无臆造数值
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cross-border-assessment 拆为四个可独立触发的子技能 + 编排入口；现有四步纲要无丢失迁移并大幅深化；第38条三路径、第39-40条单独同意与影响评估已核实明确；网信办办法门槛/时限/有效期标待验证、无臆造；法律依据按来源分类引用 _shared 库；编排入口护栏无丢失。</done>
</task>

<task type="auto">
  <name>Task 2: 新增 data-security-compliance（数据安全法合规检查）四个子技能 + 编排入口</name>
  <read_first>
    - data-compliance/skills/_shared/data-protection-citations.md（05-01 产出 — 引用库，重点：DSL第21条分类分级、DSL第31条重要数据出境、数据安全管理制度/事件报告条号待验证、CSL衔接）
    - data-compliance/skills/_shared/legal-basis-conventions.md（05-01 产出 — 引用规范，含部门规章/国标来源分类与行业监管定位）
    - data-compliance/skills/_shared/practice-profile-schema.md（05-01 产出 — 配置读取契约）
    - data-compliance/CLAUDE.md（05-01 产出 — 读取数据安全立场/数据处理者画像/CIIO/行业/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 完整章节范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准）
    - employment-legal/skills/hiring-review/SKILL.md + commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - CLAUDE.md（命名 kebab-case；文件格式；中国化原则——行业监管特色）
  </read_first>
  <files>
    data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md,
    data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md,
    data-compliance/skills/data-security-compliance/security-management-system/SKILL.md,
    data-compliance/skills/data-security-compliance/risk-assessment-reporting/SKILL.md,
    data-compliance/skills/data-security-compliance/SKILL.md
  </files>
  <action>
    新建 data-security-compliance 主技能：四个子技能（独立 SKILL.md，含 frontmatter：name kebab-case / description / argument-hint）+ 一个编排入口。每个子技能 MUST 含标准章节：目的、前置（读取 data-compliance/CLAUDE.md 数据安全立场 + 引用 _shared 规范/引用库/契约 + 分工说明 + 可单独触发）、详细步骤（含表格）、检查清单、输出模板（markdown 结构）、边界条件（表）、错误处理（表）、`## 法律依据`（按 法条/行政法规/部门规章/国家标准 与 案例/学说 分类，引用 _shared/data-protection-citations.md，标待验证，含占位）。**每个子技能 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment。**

    分工（依《数据安全法》构建，无现有源可迁移，须自建深度内容）：
    - data-classification-grading（数据分类分级）：依 DSL 第21条（已核实，国家建立数据分类分级保护制度——按数据在经济社会发展中的重要程度，以及一旦遭到篡改/破坏/泄露或非法获取非法利用对国家安全/公共利益/合法权益的危害程度，将数据分为：国家核心数据（关系国家安全、国民经济命脉、重要民生、重大公共利益等，实行更严格管理）、重要数据、一般数据）。详细步骤：分类分级方法（按业务/数据主体/敏感程度分类，按危害程度定级）、与行业分类分级标准衔接（各行业各地区主管部门制定本行业本领域重要数据具体目录，标 `[行业监管 flagged — 需核实主管部门规定]`）、分级清单建立。深化：三级数据判定表、分类分级实施流程表、与个人信息/敏感个人信息交叉关系（个人信息分级不等同 DSL 分级）。边界条件：跨行业数据按最高敏感等级处理。
    - important-data-handling（重要数据识别与处理）：重要数据识别（目录由各地区各部门制定，企业须对照主管部门目录识别，标 `[待验证]` `[行业监管 flagged]`）；重要数据处理者义务（明确数据安全负责人和管理机构、定期开展风险评估并向主管部门报送风险评估报告——具体条号 `[待验证]`）；重要数据出境（DSL 第31条，已核实：关键信息基础设施运营者在境内运营中收集和产生的重要数据出境安全管理适用 CSL；其他数据处理者重要数据出境安全管理办法由网信部门会同有关部门制定——出境须经安全评估，衔接 cross-border-assessment/security-assessment-filing）。深化：重要数据识别对照表、风险评估报送要点表、重要数据出境路径表。边界条件：尚未发布本行业目录时的从严推定与待验证标注。
    - security-management-system（数据安全管理制度）：全流程数据安全管理制度（覆盖收集/存储/使用/加工/传输/提供/公开/删除全生命周期——具体条号 `[待验证]`）；组织保障（数据安全负责人与管理机构、重要数据处理者强制设立）；安全教育培训；技术措施（加密/备份/访问控制/审计/容灾）；制度文件清单与落地审查。深化：全流程管理制度对照表、组织与责任矩阵、技术措施清单表。边界条件：CIIO 适用 CSL 等保与关基更高要求（衔接 network-security-compliance，分工说明不重叠）。
    - risk-assessment-reporting（风险评估与报告）：数据安全风险监测与评估（重要数据处理者定期风险评估、风险监测）；数据安全事件应急处置与报告（发生数据安全事件应立即处置、按规定告知用户并向有关主管部门报告——报告时限与对象 `[待验证]`）；数据交易合规（数据交易中介服务机构要求处理者说明数据来源、审核交易双方身份、留存审核交易记录——具体条号 `[待验证]`）；执法配合与数据调取（境内数据未经主管机关批准不得向外国司法或执法机构提供——DSL 相关规定 `[待验证]`）。深化：风险评估周期与要点表、安全事件分级与处置/报告流程表、数据交易合规清单。边界条件：跨境执法数据调取请求的合规应对（标 🔴 须审批）。

    **新建编排入口** data-compliance/skills/data-security-compliance/SKILL.md：frontmatter（name: data-security-compliance / description 编排说明 / argument-hint）。正文：(1) 目的与数据安全法合规整体流程概览（依《数据安全法》开展数据分类分级、重要数据管理、安全制度建设与风险评估报告）；(2) 前置：读取 data-compliance/CLAUDE.md 数据安全立场，缺失/占位时标准提示（运行 cold-start-interview 或「临时模式」），临时模式段落（保守分类分级、重要数据从严推定、标 `[临时模式]`）；(3) 子技能编排顺序表——数据分类分级 → 重要数据识别与处理 → 数据安全管理制度 → 风险评估与报告，每行说明做什么 + 子技能路径 + 单独触发命令（/data-compliance:<name>）；(4) 入口级护栏：数据处理者/CIIO 立场确认、重要数据识别提示、行业监管识别（重要数据目录主管部门）、目的地/特权检查、重要数据出境衔接 cross-border-assessment、时效性提示。

    遵守文件格式约定。所有法律依据引用 _shared/data-protection-citations.md，DSL第21条/第31条已核实明确、其余管理制度/事件报告/数据交易条号标待验证，重要数据目录标行业监管待验证。
  </action>
  <verify>
    <automated>for d in data-classification-grading important-data-handling security-management-system risk-assessment-reporting; do f="data-compliance/skills/data-security-compliance/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=data-compliance/skills/data-security-compliance/SKILL.md; grep -q '^name: data-security-compliance' "$e" && grep -q 'data-classification-grading' "$e" && grep -q 'important-data-handling' "$e" && grep -q 'security-management-system' "$e" && grep -q 'risk-assessment-reporting' "$e" && grep -q '临时模式' "$e" && grep -q '第21条' data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md && grep -q '第31条' data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md && grep -q '核心数据\|重要数据' data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个数据安全子技能 SKILL.md 全部存在，路径为 data-compliance/skills/data-security-compliance/<kebab-name>/SKILL.md，各含 frontmatter（name/description/argument-hint）
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行
    - data-classification-grading 含 DSL第21条三级（国家核心数据/重要数据/一般数据）+ 行业目录衔接；important-data-handling 含 DSL第31条重要数据出境 + 风险评估报送；security-management-system 含全流程管理制度 + 组织保障 + 技术措施；risk-assessment-reporting 含安全事件应急处置与报告 + 数据交易合规
    - data-security-compliance/SKILL.md 编排入口：含子技能编排顺序表（指向四子技能 + 单独触发命令）+ 入口级护栏（CIIO/重要数据/行业监管/临时模式/出境衔接/特权检查）
    - 重要数据目录标 `[行业监管 flagged]`；管理制度/事件报告/数据交易具体条号标 `[待验证]`，无臆造
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 data-security-compliance 主技能（四子技能 + 编排入口）；DSL第21条分类分级三级、第31条重要数据出境已核实明确；管理制度/事件报告/数据交易条号与重要数据目录标待验证/行业监管；法律依据按来源分类引用 _shared 库；编排入口护栏完整、衔接 cross-border-assessment。</done>
</task>

</tasks>

<verification>
- 四个出境子技能 + 出境编排入口 + 四个数据安全子技能 + 数据安全编排入口全部存在且格式合规
- 现有 cross-border-assessment 浅骨架四步纲要无丢失迁移并大幅深化
- 已核实锚点（跨境三路径=PIPL38条、跨境单独同意=39条、影响评估=40条、数据分类分级=DSL21条、重要数据出境=DSL31条）明确；网信办办法门槛/时限/有效期数值、重要数据目录、管理制度/事件报告条号均标 `[待验证]`/`[行业监管 flagged]`，无臆造
- 两个新编排入口护栏完整（CIIO 立场、重要数据识别、行业监管、临时模式、出境与数据安全互相衔接、特权检查）
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('data-compliance/**/*.json', recursive=True)]"`（本计划不改 json，由 05-03 统一注册）
</verification>

<success_criteria>
- 律师/DPO 可单独触发任一出境子能力（4 个）与任一数据安全子能力（4 个），各自有 frontmatter + 触发名
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 数据合规法律引用按来源分类并标待验证；第38-40条、DSL21/31条已核实明确；网信办办法门槛/时限保守标待验证
- cross-border-assessment 与 data-security-compliance 两编排入口指向各自四子技能且护栏无丢失、互相衔接
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/05-data-compliance/05-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
