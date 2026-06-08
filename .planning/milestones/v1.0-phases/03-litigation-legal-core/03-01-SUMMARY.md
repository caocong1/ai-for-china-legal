---
phase: 03-litigation-legal-core
plan: "01"
subsystem: litigation-legal
tags:
  - citation-spine
  - practice-profile
  - matter-intake
  - sub-skill-decomposition
  - litigation-legal
dependency_graph:
  requires:
    - "02-xx (commercial-legal patterns: legal-basis-conventions, practice-profile-schema, civil-code-contract-citations)"
  provides:
    - "litigation-legal/skills/_shared/legal-basis-conventions.md"
    - "litigation-legal/skills/_shared/civil-procedure-citations.md"
    - "litigation-legal/skills/_shared/practice-profile-schema.md"
    - "litigation-legal/skills/matter-intake/** (orchestrator + 5 sub-skills)"
  affects:
    - "03-02 (defense-drafting decomposition — will reuse _shared citation spine)"
    - "03-03 (evidence-management + limitation-monitoring — will reuse _shared spine + key-dates sub-skill pattern)"
tech_stack:
  added: []
  patterns:
    - "Sub-skill decomposition with independent-trigger frontmatter (name/description/argument-hint)"
    - "Citation spine: 法条/案例/学说 three-class + source-label + 待验证 discipline"
    - "Practice profile schema: single-truth-source (CLAUDE.md) + field-mapping + reading-contract"
    - "Orchestrator pattern: gateway guards → ordered sub-skill table → slash-command triggers"
key_files:
  created:
    - "litigation-legal/skills/_shared/legal-basis-conventions.md"
    - "litigation-legal/skills/_shared/civil-procedure-citations.md"
    - "litigation-legal/skills/_shared/practice-profile-schema.md"
    - "litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md"
    - "litigation-legal/skills/matter-intake/case-identification/SKILL.md"
    - "litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md"
    - "litigation-legal/skills/matter-intake/evidence-preservation/SKILL.md"
    - "litigation-legal/skills/matter-intake/initial-theory/SKILL.md"
  modified:
    - "litigation-legal/skills/matter-intake/SKILL.md"
decisions:
  - "civil-procedure-citations: 条号 [待验证] — 除第188条/15日规则/仲裁独立性/或裁或审等六个已核实锚点外，所有具体条号一律标[待验证]；不臆造条号"
  - "practice-profile-schema: 沿用 CLAUDE.md 单一真相来源，不引入新 JSON/YAML 格式（与 commercial-legal 保持对称）"
  - "matter-intake orchestrator: 利益冲突硬门槛在编排入口层强制执行，子技能详细逻辑不重复"
  - "_log.yaml schema: 新增 subject_qualification 和 limitation 字段以支持主体预检状态和时效初判记录"
metrics:
  duration: "27分钟（1631秒）"
  completed_date: "2026-06-04"
  tasks_completed: 4
  tasks_total: 4
  files_created: 8
  files_modified: 1
---

# Phase 03 Plan 01: 诉讼引用脊柱 + 案件录入拆分 Summary

诉讼仲裁插件建立了可复用引用脊柱（law-basis-conventions + civil-procedure-citations）和实践配置契约，并将 matter-intake 从 311 行单一扁平技能拆分为五个可独立触发的深度子技能（共 1,408 行）+ 123 行编排入口。

---

## 执行结果

### Task 1：诉讼法律引用脊柱

**已完成。** 创建两个共享引用文件：

- `legal-basis-conventions.md`（243行）：法条/案例/学说三类来源分类规范，五来源标签表（复用 litigation-legal/CLAUDE.md 定义，不新造冲突标签），待验证触发规则表，四级法院 + 专门法院 + 仲裁机构层级标注，成文法优先原则，管辖判断链，验证资源列表（flk.npc.gov.cn / court.gov.cn / wenshu.court.gov.cn）。
- `civil-procedure-citations.md`（318行）：按法条/案例/学说三类 + 四大主题分组（A.民诉法/B.仲裁法/C.证据规定/D.民法典时效）组织的可复用引用库。已核实六个锚点明确标注：第188条3年时效 + 起算点（知道/应当知道）、答辩期15日、举证期不少于15日、仲裁协议独立性、或裁或审。其余条号均标 `[待验证]`，案例类放占位结构。

**已核实锚点汇总表**已写入两个文件，后续 03-02 / 03-03 子技能可直接引用，无需重复维护。

### Task 2：诉讼版实践配置文件契约

**已完成。** 创建 `practice-profile-schema.md`（266行）：

- 明确真相来源为 `litigation-legal/CLAUDE.md`，架构决策：不引入新 JSON/YAML 格式
- 九大字段映射组：身份与团队 / 角色倾向 / 风险校准 / 利益冲突清除 / 证据保全 / 外部律师合作 / 和解策略 / 文书风格与输出 / 管辖识别
- 技能读取契约：读取时机 + 缺失/PLACEHOLDER 时标准提示 + 临时模式默认值表
- 角色倾向（原告/被告/两者）立场选择逻辑，绝不默默假设立场
- 法律事实合理性检查四规则（条文号核查/时效期间核查/时效性flagged/矛盾澄清）+ 写入前确认流程
- schema 与 CLAUDE.md 章节对照表

### Task 3：matter-intake 拆分为五个子技能

**已完成。** 现有深度内容无丢失迁移，五个子技能总计 1,408 行：

| 子技能 | 行数 | 核心迁移内容 |
|-------|------|------------|
| subject-conflict-precheck | 232 | 主体资格预检七类陷阱 + 利益冲突三路径门槛（路径1/2/3 + conflicts.override yaml + 不要默默进行纪律）|
| case-identification | 274 | 案件识别五字段 + 角色确认规则（四种配置场景）+ 管辖判断五步链 + 风险分级矩阵 + 重大性评估 |
| key-dates-limitation | 276 | 答辩期/举证期/庭审/监管四类日期 + 时效起算初判（第188条3年）+ 时效五状态标记 + 深度分析提示 |
| evidence-preservation | 254 | 外部律师六字段 + 内部负责人五角色 + 证据保全三路径 + 种子文档登记 + 风险触发标记 |
| initial-theory | 372 | 理论四要素 + Slug 规则 + matter.md / history.md / _log.yaml 完整模板 + 写入前确认 + 下一步决策树 + 本技能不做什么 |

每个子技能均含：YAML frontmatter（name kebab-case + description + argument-hint）、目的、前置读取、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（法条/案例/学说三类，引用 _shared 库，标待验证）。

`_log.yaml` schema 扩展：新增 `subject_qualification`（主体预检状态）和 `limitation`（时效初判字段，含 anchor 指向民法典第188条）。

### Task 4：改造 matter-intake 编排入口

**已完成。** `matter-intake/SKILL.md` 改造为 123 行编排入口：

- 顶部迁移说明（含日期和无丢失声明）
- 四项入口级护栏：配置文件加载（含临时模式提示）/ 事项工作区上下文 / 利益冲突硬门槛（未执行=STOP）/ 目的地特权检查
- 子技能编排顺序表（6列：顺序/名称/核心职责/路径/触发命令/是否硬门槛）
- 步骤间上下文传递说明（会话工作记忆机制）
- 单独触发说明（五个斜杠命令）
- 引用共享资源汇总表

---

## 偏差记录

**无偏差。** 计划按任务完整执行，无需自动修复、无需规则 2 补充、无架构性变更。

唯一扩展：`_log.yaml` schema 新增 `subject_qualification` 和 `limitation` 两个顶层字段（Rule 2 — 正确性要求：主体预检状态和时效初判结果需有结构化记录位置，否则无法在 portfolio-status 汇总中检索）。此扩展在 initial-theory 子技能的 schema 示例中已包含，与计划任务完全兼容。

---

## 已知 Stubs

**扫描结果：无影响目标功能的 stubs。**

各子技能的「案例类」和「学说类」法律依据使用了占位结构（`[待填入]`）——这是计划明确要求的模式（参照 civil-code-contract-citations.md 的占位结构）。这些占位不影响技能的核心功能（主体预检/冲突检查/风险分级/时效起算/证据保全/装配），属于「经检索核验后填充」的预期状态，不构成功能性 stub。

---

## Threat Flags

无新增安全相关表面（本计划仅创建提示词文件和 YAML schema 模板，不涉及网络端点、认证路径或文件访问模式变更）。

---

## Self-Check: PASSED

**文件存在性：**
- litigation-legal/skills/_shared/legal-basis-conventions.md — FOUND
- litigation-legal/skills/_shared/civil-procedure-citations.md — FOUND
- litigation-legal/skills/_shared/practice-profile-schema.md — FOUND
- litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md — FOUND
- litigation-legal/skills/matter-intake/case-identification/SKILL.md — FOUND
- litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md — FOUND
- litigation-legal/skills/matter-intake/evidence-preservation/SKILL.md — FOUND
- litigation-legal/skills/matter-intake/initial-theory/SKILL.md — FOUND
- litigation-legal/skills/matter-intake/SKILL.md — FOUND (modified)

**提交存在性：**
- 90e9ae1 (Task 1: citation spine) — FOUND
- 102799c (Task 2: practice-profile-schema) — FOUND
- 3a983bc (Task 3: five sub-skills) — FOUND
- 6ad9da8 (Task 4: orchestrator) — FOUND

**关键内容验证：**
- 第188条 in civil-procedure-citations.md — PASS
- 15日 in civil-procedure-citations.md — PASS
- 仲裁 in civil-procedure-citations.md — PASS
- 第188条 in key-dates-limitation/SKILL.md — PASS
- _log.yaml in initial-theory/SKILL.md — PASS
- subject-qualification-traps in subject-conflict-precheck/SKILL.md — PASS
- 所有五个子技能路径 in matter-intake/SKILL.md — PASS
- JSON validity (litigation-legal/**/*.json) — PASS
