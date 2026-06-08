---
phase: 03-litigation-legal-core
plan: 03
type: execute
wave: 2
depends_on:
  - 03-01
  - 03-02
files_modified:
  - litigation-legal/skills/representation-drafting/dispute-focus/SKILL.md
  - litigation-legal/skills/representation-drafting/fact-argumentation/SKILL.md
  - litigation-legal/skills/representation-drafting/legal-argumentation/SKILL.md
  - litigation-legal/skills/representation-drafting/representation-assembly/SKILL.md
  - litigation-legal/skills/representation-drafting/SKILL.md
  - litigation-legal/skills/cold-start-interview/identity-team/SKILL.md
  - litigation-legal/skills/cold-start-interview/risk-calibration/SKILL.md
  - litigation-legal/skills/cold-start-interview/case-management/SKILL.md
  - litigation-legal/skills/cold-start-interview/document-style/SKILL.md
  - litigation-legal/skills/cold-start-interview/SKILL.md
  - litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md
  - litigation-legal/skills/limitation-monitoring/accrual-determination/SKILL.md
  - litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md
  - litigation-legal/skills/limitation-monitoring/monitoring-ledger/SKILL.md
  - litigation-legal/skills/limitation-monitoring/SKILL.md
  - litigation-legal/.claude-plugin/plugin.json
autonomous: true
requirements:
  - REPRESENTATION-DECOMP
  - INTERVIEW-DECOMP
  - LIMITATION-MONITORING-NEW
  - PLUGIN-REGISTRATION
user_setup: []

must_haves:
  truths:
    - "律师可以单独触发代理词起草的任一子能力（争议焦点/事实论证/法律论证/代理词装配）而无需运行整个流程"
    - "律师可以单独触发冷启动访谈的任一部分（身份与团队/风险校准/案件管理/文书风格）而无需重跑整个访谈，结果写入 litigation-legal/CLAUDE.md"
    - "存在新的诉讼时效监控技能（编排入口 + 四个子技能：时效期间识别/起算点判定/中止中断事由/监控台账预警），引用民法典188条"
    - "每个子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据"
    - "plugin.json 升级到 0.3.0 并注册全部编排入口与子技能（代理词4 + 访谈4 + 时效监控编排入口1+子技能4 + matter-intake5 + defense5 + evidence4 + 各编排入口）"
    - "诉讼时效监控明确『时效抗辩须当事人主动提出、法院不主动适用』，并区分中止与中断的法律后果"
  artifacts:
    - path: "litigation-legal/skills/representation-drafting/dispute-focus/SKILL.md"
      provides: "争议焦点梳理子技能"
      min_lines: 50
    - path: "litigation-legal/skills/representation-drafting/fact-argumentation/SKILL.md"
      provides: "事实论证子技能（事实概述 + 证据支持 + 对方事实反驳）"
      min_lines: 50
    - path: "litigation-legal/skills/representation-drafting/legal-argumentation/SKILL.md"
      provides: "法律论证与法条适用子技能"
      contains: "## 法律依据"
      min_lines: 60
    - path: "litigation-legal/skills/representation-drafting/representation-assembly/SKILL.md"
      provides: "代理词装配子技能（开头/事实/法律/请求 + 辩论提纲 + 庭审陈述）"
      min_lines: 50
    - path: "litigation-legal/skills/representation-drafting/SKILL.md"
      provides: "代理词起草编排入口（指向四子技能 + 研究闸门 + 护栏）"
      min_lines: 40
    - path: "litigation-legal/skills/cold-start-interview/identity-team/SKILL.md"
      provides: "身份与团队 + 角色倾向访谈子技能"
      min_lines: 40
    - path: "litigation-legal/skills/cold-start-interview/risk-calibration/SKILL.md"
      provides: "风险校准访谈子技能（严重程度/可能性/重大性阈值）"
      min_lines: 40
    - path: "litigation-legal/skills/cold-start-interview/case-management/SKILL.md"
      provides: "案件管理访谈子技能（冲突检查/证据保全/外部律师/和解策略）"
      min_lines: 40
    - path: "litigation-legal/skills/cold-start-interview/document-style/SKILL.md"
      provides: "文书风格访谈子技能（代理词风格/输出格式/案例引用偏好）"
      min_lines: 40
    - path: "litigation-legal/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（指向四子技能 + 写入 litigation-legal/CLAUDE.md）"
      min_lines: 40
    - path: "litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md"
      provides: "诉讼时效期间识别子技能（一般3年/特殊时效/最长保护期间）"
      contains: "第188条"
      min_lines: 50
    - path: "litigation-legal/skills/limitation-monitoring/accrual-determination/SKILL.md"
      provides: "时效起算点判定子技能（知道或应当知道权利受损害及义务人之日）"
      min_lines: 50
    - path: "litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md"
      provides: "中止与中断事由分析子技能（区分法律后果）"
      contains: "中断"
      min_lines: 50
    - path: "litigation-legal/skills/limitation-monitoring/monitoring-ledger/SKILL.md"
      provides: "时效监控台账与预警子技能"
      min_lines: 50
    - path: "litigation-legal/skills/limitation-monitoring/SKILL.md"
      provides: "诉讼时效监控编排入口（指向四子技能 + 护栏）"
      contains: "主动提出"
      min_lines: 40
    - path: "litigation-legal/.claude-plugin/plugin.json"
      provides: "version 0.3.0 + 注册全部编排入口与子技能"
      contains: "0.3.0"
      min_lines: 60
  key_links:
    - from: "litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md"
      to: "litigation-legal/skills/_shared/civil-procedure-citations.md"
      via: "引用民法典诉讼时效条文"
      pattern: "civil-procedure-citations|第188条"
    - from: "litigation-legal/skills/cold-start-interview/SKILL.md"
      to: "litigation-legal/skills/_shared/practice-profile-schema.md"
      via: "访谈写入字段遵循配置契约"
      pattern: "practice-profile-schema|CLAUDE.md"
    - from: "litigation-legal/.claude-plugin/plugin.json"
      to: "全部子技能 SKILL.md"
      via: "skills 数组注册路径"
      pattern: "limitation-monitoring|representation-assembly|risk-calibration"
---

<objective>
按 CONTEXT「深层子技能拆分」「完整访谈流程」决策，完成诉讼仲裁插件剩余技能的深化拆分、新增诉讼时效监控技能，并在 plugin.json 注册全部技能、升级版本到 0.3.0。

本计划交付：
1. **代理词起草拆分** — 拆为四个子技能：争议焦点梳理 / 事实论证 / 法律论证与法条适用 / 代理词装配。现有 representation-drafting/SKILL.md 内容（案件回顾、代理词结构、法律依据检索、代理词格式模板、辩论提纲/法庭陈述、研究闸门前置）深化迁移；原 SKILL.md 改编排入口。
2. **冷启动访谈拆分** — 拆为四个子技能：身份与团队（含角色倾向）/ 风险校准 / 案件管理（冲突检查/证据保全/外部律师/和解策略）/ 文书风格。访谈结果写入 litigation-legal/CLAUDE.md 对应章节（遵循 03-01 的 practice-profile-schema 契约）；原 SKILL.md 改编排入口，支持单独更新某部分。
3. **新增 limitation-monitoring（诉讼时效监控）技能** — ROADMAP 要求的新技能。编排入口 + 四个子技能：时效期间识别 / 起算点判定 / 中止中断事由分析 / 监控台账与预警。引用《民法典》第188条（一般3年），明确「时效抗辩须当事人主动提出、法院不主动适用」，区分中止与中断的法律后果。
4. **plugin.json 注册 + 版本升级** — 升级 version 到 0.3.0，更新 description 反映深层子技能拆分，注册全部编排入口与子技能（含 03-01/03-02 产出的 matter-intake/defense/evidence 子技能 + 本计划的 representation/访谈/时效监控）。

Purpose: 关闭代理词/访谈仍扁平的 gap，补齐 ROADMAP 要求的诉讼时效监控技能，并让全部子技能可被发现/触发（plugin.json 注册）。本计划依赖 03-01（_shared 引用脊柱与配置契约）与 03-02（defense/evidence 子技能，注册时需引用其路径），故为 wave 2。
Output: 4 个代理词子技能 + 4 个访谈子技能 + 1 个时效监控编排入口 + 4 个时效监控子技能 + 2 个改造后的编排入口（代理词/访谈）+ 更新后的 plugin.json。

中国化原则约束（来自 CLAUDE.md）：成文法为主（民事诉讼法2023修正、仲裁法、最高法《关于民事诉讼证据的若干规定》、民法典诉讼时效）；指导性案例参考非判例法；法院四级 + 仲裁机构识别；执业环境适配。命名 kebab-case；斜杠命令 /litigation-legal:<skill>。文件格式：JSON 2 空格缩进、换行结尾、无尾部空格、表格列数一致。

法律内容硬性要求：引用按 法条/案例/学说 分类 + 来源标签；不确定条号一律标 `[待验证]`，不臆造条号。已核实锚点：诉讼时效一般3年=《民法典》第188条（起算点为知道或应当知道权利受损害及义务人之日，最长保护期间20年——此规则已核实，条号若引最长期间不确信则标待验证）；普通程序举证期限/答辩期15日=民事诉讼法；仲裁协议独立性、或裁或审=仲裁法。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/phases/03-litigation-legal-core/03-CONTEXT.md
@CLAUDE.md
@litigation-legal/CLAUDE.md
@litigation-legal/skills/representation-drafting/SKILL.md
@litigation-legal/skills/cold-start-interview/SKILL.md
@litigation-legal/.claude-plugin/plugin.json
@litigation-legal/skills/_shared/legal-basis-conventions.md
@litigation-legal/skills/_shared/civil-procedure-citations.md
@litigation-legal/skills/_shared/practice-profile-schema.md
@commercial-legal/.claude-plugin/plugin.json
@commercial-legal/skills/cold-start-interview/review-stance/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@shared/references/document-structures.md
@shared/research-gate/SKILL.md
---
依赖产出：03-01 的 _shared/* 与 matter-intake 子技能；03-02 的 defense-drafting/* 与 evidence-management/* 子技能（plugin.json 注册时需其路径）
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 representation-drafting 为四个可独立触发的子技能 + 编排入口</name>
  <read_first>
    - litigation-legal/skills/representation-drafting/SKILL.md（现有 — 全部内容；拆分迁移源：研究闸门前置、案件回顾、代理词结构（开头/事实/法律/结论）、法律依据检索、代理词格式模板、辩论提纲、法庭陈述）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能范式）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（03-01 产出 — 引用库）
    - litigation-legal/skills/_shared/legal-basis-conventions.md（03-01 产出 — 引用规范）
    - shared/references/document-structures.md（代理意见结构模板）
    - litigation-legal/CLAUDE.md（实践配置 — 代理词风格、角色倾向、输出）
    - shared/research-gate/SKILL.md（研究闸门）
    - CLAUDE.md（命名；文件格式）
  </read_first>
  <files>
    litigation-legal/skills/representation-drafting/dispute-focus/SKILL.md,
    litigation-legal/skills/representation-drafting/fact-argumentation/SKILL.md,
    litigation-legal/skills/representation-drafting/legal-argumentation/SKILL.md,
    litigation-legal/skills/representation-drafting/representation-assembly/SKILL.md,
    litigation-legal/skills/representation-drafting/SKILL.md
  </files>
  <action>
    将 representation-drafting/SKILL.md 深化拆分为四个子技能 + 改造原 SKILL.md 为编排入口。四个子技能各为独立 SKILL.md，含 frontmatter（name kebab-case：dispute-focus / fact-argumentation / legal-argumentation / representation-assembly；description；argument-hint）。每个 MUST 含：目的、前置（研究闸门提示 + 读取 litigation-legal/CLAUDE.md + 引用 _shared 规范/引用库）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（法条/案例/学说 分类、标待验证）。每个说明可被编排入口调用，也可单独触发。

    分工：
    - dispute-focus（争议焦点梳理）：从案件事实/证据/双方主张梳理争议焦点，对照法院归纳的争议焦点逐条列出我方立场与对方立场。输出=争议焦点对照表（焦点 / 我方观点 / 对方观点 / 关键事实 pivot）。边界条件：庭审已归纳焦点时以法院归纳为准。
    - fact-argumentation（事实论证）：迁移代理词「事实部分」——案件事实概述 + 证据支持（每项事实对应证据目录序号）+ 对方事实的反驳。输出=事实论证段落示意 + 事实-证据对应表。边界条件：未经质证/未采纳证据不得作为事实依据，标记。
    - legal-argumentation（法律论证与法条适用）：迁移代理词「法律部分」——适用法律识别、请求权基础/抗辩法律构成的要件分析、法律分析、指导性案例支持（参考非判例法）。引用 _shared/civil-procedure-citations.md（程序法）+ 民法典等实体法（实体法条号不确信标待验证）。输出=法律论证（按 要件→事实涵摄→结论 结构）+ 法律依据清单。
    - representation-assembly（代理词装配）：迁移代理词结构（开头：代理人身份/代理权限/简要意见 → 事实 → 法律 → 代理请求/理由总结）+ 辩论提纲 + 法庭陈述（开庭陈述/结案陈词）+ 交付前检查（特权标题、研究闸门完成、引用标待验证）+ 下一步决策树。从配置文件读代理词风格与工作产物标题。

    改造 representation-drafting/SKILL.md 为编排入口：保留 frontmatter（name: representation-drafting，更新 description）。正文：顶部迁移说明 + 研究闸门前置；目的概览；子技能编排顺序表——争议焦点梳理 → 事实论证 → 法律论证 → 代理词装配，逐行说明职责/路径/可单独触发；入口级护栏（研究闸门、加载实践配置文件含临时模式、事项上下文、特权检查）。
    遵守文件格式约定。文书模板用 markdown 结构示意。
  </action>
  <verify>
    <automated>for d in dispute-focus fact-argumentation legal-argumentation representation-assembly; do f="litigation-legal/skills/representation-drafting/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '## 法律依据' litigation-legal/skills/representation-drafting/legal-argumentation/SKILL.md; f=litigation-legal/skills/representation-drafting/SKILL.md; grep -q '^name: representation-drafting' "$f" && grep -q 'research-gate' "$f" && grep -q 'dispute-focus' "$f" && grep -q 'representation-assembly' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径 litigation-legal/skills/representation-drafting/<kebab-name>/SKILL.md，frontmatter name 正确
    - 每个子技能含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（法条/案例/学说 分类、标待验证）
    - legal-argumentation 含要件分析 + 引用 _shared 引用库 + 指导性案例标注「参考非判例法」
    - representation-assembly 含完整代理词结构 + 辩论提纲 + 法庭陈述 + 交付前检查
    - representation-drafting/SKILL.md 改为编排入口，含子技能编排表 + 研究闸门 + 护栏，顶部含迁移说明
    - 每个起草子技能前置保留研究闸门提示
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>representation-drafting 拆为四个可独立触发的子技能 + 编排入口；研究闸门与代理词深度内容无丢失迁移；法律论证引用 _shared 库并标待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 cold-start-interview 为四个可独立触发的子技能 + 编排入口</name>
  <read_first>
    - litigation-legal/skills/cold-start-interview/SKILL.md（现有 — 全部内容；四部分：基本信息、风险校准、案件管理、文书风格）
    - litigation-legal/skills/_shared/practice-profile-schema.md（03-01 产出 — 配置契约与字段映射；访谈写入须遵循）
    - litigation-legal/CLAUDE.md（实践配置模板 — 写入目标章节：我们是谁/谁在使用（角色倾向）/风险校准/利益冲突清除/外部律师/证据保全/和解策略/文书风格/输出）
    - commercial-legal/skills/cold-start-interview/review-stance/SKILL.md（访谈子技能范式：前置写入目标说明、问题流分组、写入前确认、单独触发说明）
    - CLAUDE.md（命名；文件格式）
  </read_first>
  <files>
    litigation-legal/skills/cold-start-interview/identity-team/SKILL.md,
    litigation-legal/skills/cold-start-interview/risk-calibration/SKILL.md,
    litigation-legal/skills/cold-start-interview/case-management/SKILL.md,
    litigation-legal/skills/cold-start-interview/document-style/SKILL.md,
    litigation-legal/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将 cold-start-interview/SKILL.md 拆为四个访谈子技能 + 改造原 SKILL.md 为编排入口。四个子技能各为独立 SKILL.md，含 frontmatter（name kebab-case：identity-team / risk-calibration / case-management / document-style；description；argument-hint）。每个 MUST 含：目的、前置（写入目标章节说明 + 引用 practice-profile-schema.md 字段映射 + 单独触发说明）、问题流（分组、含追问与示例）、边界条件（缺省/部分配置/矛盾回答）、错误处理、写入前确认。每个说明可被编排入口按顺序调用，也可单独触发以只更新对应章节。

    分工（写入 litigation-legal/CLAUDE.md 对应章节）：
    - identity-team（身份与团队）：律所/公司名称、实体类型、诉讼团队规模、最终升级联系人、每月案件量、主要案件类型、主要执业法院、角色（律师/非律师）+ **角色倾向（原告/被告/两者—默认X/因案而异）**。写入 ## 我们是谁 + ## 谁在使用。
    - risk-calibration（风险校准）：严重程度定义（极高/高/中/低 + 金额阈值）、可能性定义（高/中/低 百分比）、重大性阈值（准备金/披露/监控）。写入 ## 风险校准。含法律事实合理性检查（用户口述金额阈值时按 schema 第5节核查）。
    - case-management（案件管理）：利益冲突检查方法、证据保全偏好（自动/逐案 + 范围 + 刷新周期）、外部律师管理（合作律所/选择标准/预算审批）、和解策略（授权阈值/审批流程/和解倾向）。写入 ## 利益冲突清除 + ## 外部律师合作 + ## 证据保全 + ## 和解策略。
    - document-style（文书风格）：代理词风格、法律意见书风格、客户报告频率、工作产物存放位置、输出格式偏好（完整备忘录/状态摘要/法院文件草稿）、是否需要案例引用、是否需要法条引用。写入 ## 文书风格 + ## 输出。

    改造 cold-start-interview/SKILL.md 为编排入口：保留 frontmatter（name: cold-start-interview，更新 description）。正文：顶部迁移说明；目的；子技能编排顺序表——身份与团队 → 风险校准 → 案件管理 → 文书风格，逐行说明写入章节/路径/可单独触发（/litigation-legal:<name> 仅更新对应章节）；说明完整重跑 vs 部分更新；写入前确认与 git 版本控制提示。
    遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in identity-team risk-calibration case-management document-style; do f="litigation-legal/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '角色倾向' litigation-legal/skills/cold-start-interview/identity-team/SKILL.md && grep -q '和解' litigation-legal/skills/cold-start-interview/case-management/SKILL.md; f=litigation-legal/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$f" && grep -q 'identity-team' "$f" && grep -q 'risk-calibration' "$f" && grep -q 'case-management' "$f" && grep -q 'document-style' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md 全部存在，路径 litigation-legal/skills/cold-start-interview/<kebab-name>/SKILL.md，frontmatter name 正确
    - 每个子技能含：目的、前置（写入目标 + 引用 practice-profile-schema）、问题流、边界条件、错误处理、写入前确认
    - identity-team 含角色倾向（原告/被告/两者）；case-management 含和解策略；risk-calibration 含金额阈值合理性检查
    - 每个子技能写入 litigation-legal/CLAUDE.md 对应章节并说明可单独触发以只更新该章节
    - cold-start-interview/SKILL.md 改为编排入口，含编排表 + 完整重跑/部分更新说明 + 写入前确认
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能 + 编排入口；访谈结果写入 litigation-legal/CLAUDE.md 并遵循配置契约；支持单独更新与重跑。</done>
</task>

<task type="auto">
  <name>Task 3: 新增 limitation-monitoring（诉讼时效监控）技能（编排入口 + 四子技能）</name>
  <read_first>
    - litigation-legal/skills/_shared/civil-procedure-citations.md（03-01 产出 — 民法典诉讼时效引用库，重点：第188条、起算/中止/中断/最长保护期间）
    - litigation-legal/skills/_shared/legal-basis-conventions.md（03-01 产出 — 引用规范）
    - litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md（03-01 产出 — 时效起算初判，limitation-monitoring 做深度分析，分工互补不重叠）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能范式）
    - litigation-legal/CLAUDE.md（实践配置 — 事项工作区、输出、共享护栏）
    - CLAUDE.md（命名；文件格式）
  </read_first>
  <files>
    litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md,
    litigation-legal/skills/limitation-monitoring/accrual-determination/SKILL.md,
    litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md,
    litigation-legal/skills/limitation-monitoring/monitoring-ledger/SKILL.md,
    litigation-legal/skills/limitation-monitoring/SKILL.md
  </files>
  <action>
    新建 limitation-monitoring 技能：编排入口 SKILL.md + 四个子技能 SKILL.md。每个子技能含 frontmatter（name kebab-case：limitation-period-identification / accrual-determination / tolling-interruption / monitoring-ledger；description；argument-hint）+ 标准章节：目的、前置（读取 litigation-legal/CLAUDE.md 事项上下文 + 引用 _shared 规范/引用库 + 与 matter-intake/key-dates-limitation 分工说明）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（法条/案例/学说 分类、标待验证）。每个说明可被 limitation-monitoring 编排入口调用，也可单独触发。

    分工：
    - limitation-period-identification（时效期间识别）：按案由识别适用时效期间——一般诉讼时效3年（《民法典》第188条第1款，已核实）；特殊时效（如国际货物买卖/技术进出口、人身损害、其他单行法特殊时效——具体条号/年限不确信标待验证）；最长权利保护期间20年（自权利受到损害之日起，《民法典》第188条第2款，规则已核实，条款款号若不确信标待验证）。输出=时效期间识别表（案由 / 适用时效 / 期间 / 法律依据 / 待验证标记）。边界条件：案由不明时先定性请求权基础；多个请求权时分别识别。
    - accrual-determination（起算点判定）：判定时效起算点——一般起算点为「权利人知道或者应当知道权利受到损害以及义务人之日」（《民法典》第188条第2款，已核实规则）；分情形（约定履行期限/未约定履行期限/分期履行/持续侵权/连带债务）。输出=起算点判定表（请求权 / 起算事实 / 起算日 / 据此届满日 / 依据）。边界条件：起算事实不清时不下结论，标 `[需律师确认]` 并列待查事实；「应当知道」涉及举证，提示证据。
    - tolling-interruption（中止与中断事由分析）：**区分中止与中断的法律后果**——中止（时效期间最后六个月内因不可抗力等障碍不能行使请求权，障碍消除后继续计算；剩余期间）vs 中断（因权利人主张权利/义务人同意履行/提起诉讼或仲裁等，时效重新起算；归零重算）。识别本案是否存在中止/中断事由及其证据（催款函、对账、还款承诺、起诉等）。输出=中止/中断事由分析表（事由 / 类型（中止/中断）/ 发生日 / 证据 / 对届满日的影响）。边界条件：事由证据不足时标记举证风险；多次中断取最后一次重算。
    - monitoring-ledger（监控台账与预警）：建立/更新时效监控台账（每个事项的请求权、届满日、剩余天数、预警等级），设置临界预警（如剩余<90天黄色、<30天红色），并对临近届满项给出行动建议（发催款函中断时效/起诉/申请仲裁）。输出=时效监控台账表 + 预警清单 + 行动建议。可写入事项文件夹。边界条件：临近届满（如<30天）须紧急标记并显著提示；台账不替代律师判断。

    编排入口 limitation-monitoring/SKILL.md：frontmatter（name: limitation-monitoring；description；argument-hint）。正文：目的；**显著护栏「诉讼时效抗辩须由当事人主动提出，法院不主动适用；时效届满不消灭实体权利但丧失胜诉权（义务人可抗辩）」**；子技能编排顺序表——时效期间识别 → 起算点判定 → 中止中断事由分析 → 监控台账与预警，逐行说明职责/路径/可单独触发；入口级护栏（加载事项上下文、与 matter-intake/key-dates-limitation 分工、引用 _shared 引用库）。
    遵守文件格式约定。所有时效条文以《民法典》第188条为已核实锚点，其余特殊时效条号不确信标待验证。
  </action>
  <verify>
    <automated>for d in limitation-period-identification accrual-determination tolling-interruption monitoring-ledger; do f="litigation-legal/skills/limitation-monitoring/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '第188条' litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md && grep -q '中止' litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md && grep -q '中断' litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md; f=litigation-legal/skills/limitation-monitoring/SKILL.md; grep -q '^name: limitation-monitoring' "$f" && grep -q '主动提出' "$f" && grep -q 'limitation-period-identification' "$f" && grep -q 'monitoring-ledger' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - limitation-monitoring 编排入口 + 四个子技能 SKILL.md 全部存在，frontmatter name 正确
    - 每个子技能含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（法条/案例/学说 分类、标待验证）
    - limitation-period-identification 引用《民法典》第188条（一般3年 + 最长保护期间20年规则）
    - accrual-determination 含起算点判定（知道或应当知道权利受损害及义务人之日）
    - tolling-interruption 明确区分中止（继续计算剩余期间）与中断（重新起算）的法律后果
    - monitoring-ledger 含时效监控台账 + 临界预警 + 行动建议
    - 编排入口含显著护栏「时效抗辩须当事人主动提出、法院不主动适用」+ 子技能编排表
    - 特殊时效具体条号不确信标 `[待验证]`，无臆造条号
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 limitation-monitoring 技能（编排入口 + 四子技能）；引用民法典188条，区分中止/中断法律后果，含监控台账与预警；明确时效抗辩须当事人主动提出。</done>
</task>

<task type="auto">
  <name>Task 4: plugin.json 注册全部技能 + 升级版本到 0.3.0</name>
  <read_first>
    - litigation-legal/.claude-plugin/plugin.json（现有 — 改造对象，当前 0.2.0，5 个扁平技能）
    - commercial-legal/.claude-plugin/plugin.json（注册范式 — 0.3.0，编排入口 + 子技能逐一注册，description 写法）
    - 03-01 产出：litigation-legal/skills/matter-intake/<5 子技能> 与编排入口
    - 03-02 产出：litigation-legal/skills/defense-drafting/<5 子技能> 与 evidence-management/<4 子技能> 与各编排入口
    - 本计划 Task 1/2/3 产出：representation-drafting/<4 子技能>、cold-start-interview/<4 子技能>、limitation-monitoring/<编排入口+4 子技能>
    - CLAUDE.md（命名约定；JSON 2 空格缩进、文件以换行符结尾）
  </read_first>
  <files>
    litigation-legal/.claude-plugin/plugin.json
  </files>
  <action>
    更新 litigation-legal/.claude-plugin/plugin.json：
    - version: 0.2.0 → 0.3.0
    - description: 更新为反映「六大编排入口 + 全部可独立触发深层子技能」的说明（参照 commercial-legal/.claude-plugin/plugin.json 的 description 风格：列出编排入口数与子技能总数、说明子技能含详细步骤/检查清单/输出模板/法律依据，适配中国法院诉讼与仲裁）。
    - skills 数组：注册全部编排入口与子技能，每项含 name（kebab-case）/ path（skills/<主技能>/[<子技能>/]SKILL.md）/ description（简明说明该技能职责）。注册清单：
      1. cold-start-interview（编排入口）+ identity-team / risk-calibration / case-management / document-style
      2. matter-intake（编排入口）+ subject-conflict-precheck / case-identification / key-dates-limitation / evidence-preservation / initial-theory
      3. defense-drafting（编排入口）+ defense-strategy / jurisdiction-objection / substantive-defense / procedural-limitation-defense / defense-assembly
      4. evidence-management（编排入口）+ evidence-collection / three-properties-review / evidence-catalog / evidence-exchange
      5. representation-drafting（编排入口）+ dispute-focus / fact-argumentation / legal-argumentation / representation-assembly
      6. limitation-monitoring（编排入口）+ limitation-period-identification / accrual-determination / tolling-interruption / monitoring-ledger
    JSON 2 空格缩进、文件以换行符结尾、合法 JSON（无尾随逗号）。所有 path 必须与实际产出文件路径一致。
  </action>
  <verify>
    <automated>f=litigation-legal/.claude-plugin/plugin.json; python3 -c "import json; d=json.load(open('$f')); assert d['version']=='0.3.0', d['version']; names={s['name'] for s in d['skills']}; req={'cold-start-interview','identity-team','risk-calibration','case-management','document-style','matter-intake','subject-conflict-precheck','case-identification','key-dates-limitation','evidence-preservation','initial-theory','defense-drafting','defense-strategy','jurisdiction-objection','substantive-defense','procedural-limitation-defense','defense-assembly','evidence-management','evidence-collection','three-properties-review','evidence-catalog','evidence-exchange','representation-drafting','dispute-focus','fact-argumentation','legal-argumentation','representation-assembly','limitation-monitoring','limitation-period-identification','accrual-determination','tolling-interruption','monitoring-ledger'}; missing=req-names; assert not missing, ('MISSING:', missing); import os; [ (lambda p: (os.path.isfile('litigation-legal/'+p) or (_ for _ in ()).throw(AssertionError('BAD PATH '+p))))(s['path']) for s in d['skills']]; print('OK', len(d['skills']), 'skills')"</automated>
  </verify>
  <acceptance_criteria>
    - litigation-legal/.claude-plugin/plugin.json 的 version 为 0.3.0
    - description 更新为反映六大编排入口 + 深层子技能拆分
    - skills 数组注册全部 6 个编排入口 + 全部子技能（共 32 项：cold-start 1+4、matter-intake 1+5、defense 1+5、evidence 1+4、representation 1+4、limitation 1+4）
    - 每个注册项的 path 指向实际存在的 SKILL.md，name 为对应 kebab-case
    - JSON 合法（2 空格缩进、无尾随逗号、文件以换行符结尾）
  </acceptance_criteria>
  <done>plugin.json 升级到 0.3.0 并注册全部 6 编排入口与全部子技能，path 与实际文件一致，JSON 合法。</done>
</task>

</tasks>

<verification>
- 4 个代理词子技能 + 4 个访谈子技能 + 1 时效监控编排入口 + 4 时效监控子技能 + 2 编排入口（代理词/访谈）全部存在且格式合规
- limitation-monitoring 为 ROADMAP 要求的新技能，引用民法典188条、区分中止/中断、明确时效抗辩须主动提出
- plugin.json 升级 0.3.0 并注册全部编排入口与子技能，path 与实际文件一致
- JSON/YAML 合法性：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('litigation-legal/**/*.json', recursive=True)]"`
- 不确定条号均标 `[待验证]`，无臆造条号
</verification>

<success_criteria>
- 律师可单独触发任一代理词/访谈/时效监控子能力（各子技能有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据
- 访谈结果写入 litigation-legal/CLAUDE.md 并遵循配置契约，支持单独更新
- 诉讼时效监控引用民法典188条、区分中止/中断法律后果、含监控台账预警
- plugin.json 0.3.0 注册全部技能，JSON 合法
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/03-litigation-legal-core/03-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
