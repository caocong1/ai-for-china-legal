---
phase: 03-litigation-legal-core
plan: "03"
subsystem: litigation-legal
tags:
  - representation-drafting
  - cold-start-interview
  - limitation-monitoring
  - plugin-registration
  - sub-skill-decomposition
dependency-graph:
  requires:
    - 03-01 (_shared 引用脊柱 + matter-intake 子技能)
    - 03-02 (defense-drafting + evidence-management 子技能)
  provides:
    - representation-drafting 四子技能 + 编排入口
    - cold-start-interview 四子技能 + 编排入口
    - limitation-monitoring 编排入口 + 四子技能（新技能）
    - plugin.json 0.3.0 注册全部 32 技能
  affects:
    - litigation-legal/CLAUDE.md（冷启动访谈写入目标）
    - 下游所有诉讼技能（均从 CLAUDE.md 读取配置）
tech-stack:
  added:
    - limitation-monitoring（诉讼时效监控新技能）
  patterns:
    - 编排入口 + 可独立触发子技能（与 commercial-legal 体系一致）
    - 研究闸门前置（代理词类技能）
    - 访谈子技能写入前确认 + 版本控制提示
    - 待验证标注规范（已核实锚点 vs 模型知识）
key-files:
  created:
    - litigation-legal/skills/representation-drafting/dispute-focus/SKILL.md
    - litigation-legal/skills/representation-drafting/fact-argumentation/SKILL.md
    - litigation-legal/skills/representation-drafting/legal-argumentation/SKILL.md
    - litigation-legal/skills/representation-drafting/representation-assembly/SKILL.md
    - litigation-legal/skills/cold-start-interview/identity-team/SKILL.md
    - litigation-legal/skills/cold-start-interview/risk-calibration/SKILL.md
    - litigation-legal/skills/cold-start-interview/case-management/SKILL.md
    - litigation-legal/skills/cold-start-interview/document-style/SKILL.md
    - litigation-legal/skills/limitation-monitoring/SKILL.md
    - litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md
    - litigation-legal/skills/limitation-monitoring/accrual-determination/SKILL.md
    - litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md
    - litigation-legal/skills/limitation-monitoring/monitoring-ledger/SKILL.md
  modified:
    - litigation-legal/skills/representation-drafting/SKILL.md（改造为编排入口）
    - litigation-legal/skills/cold-start-interview/SKILL.md（改造为编排入口）
    - litigation-legal/.claude-plugin/plugin.json（0.2.0→0.3.0，注册 32 技能）
decisions:
  - "代理词拆分为 dispute-focus / fact-argumentation / legal-argumentation / representation-assembly 四子技能，每个可单独触发"
  - "冷启动访谈拆分为 identity-team / risk-calibration / case-management / document-style 四子技能，写入 CLAUDE.md 对应章节，支持部分更新"
  - "新增 limitation-monitoring 为独立技能（非 matter-intake 子集），与 key-dates-limitation 分工：初判 vs 深度分析"
  - "plugin.json 注册 32 技能（6 编排入口 + 26 子技能）"
  - "时效抗辩护栏：须当事人主动提出，法院不主动适用——作为 limitation-monitoring 编排入口显著护栏"
metrics:
  duration: "约 30 分钟"
  completed_date: "2026-06-05"
  tasks_completed: 4
  tasks_total: 4
  files_created: 13
  files_modified: 3
---

# Phase 03 Plan 03: 代理词/访谈深化拆分 + 诉讼时效监控新增 + 全技能注册 Summary

**一句话总结**：拆分代理词起草（4子技能）和冷启动访谈（4子技能）为可独立触发的深层子技能，新增诉讼时效监控完整技能（引用民法典第188条，区分中止/中断法律后果），并在 plugin.json 0.3.0 中注册全部 32 个技能。

---

## 已完成任务

### Task 1: 拆分 representation-drafting 为四子技能 + 编排入口

**提交**：`f26e851`

**创建文件**：
- `litigation-legal/skills/representation-drafting/dispute-focus/SKILL.md`（争议焦点梳理：按来源分优先级/梳理双方立场/优劣势评估，含我方对照表输出）
- `litigation-legal/skills/representation-drafting/fact-argumentation/SKILL.md`（事实论证：三种叙事策略/未质证证据纪律/反驳策略，含事实-证据对应表）
- `litigation-legal/skills/representation-drafting/legal-argumentation/SKILL.md`（法律论证：请求权基础识别/要件分析/大前提-涵摄-结论三段论/指导性案例「参考非判例法」，含 `## 法律依据`）
- `litigation-legal/skills/representation-drafting/representation-assembly/SKILL.md`（代理词装配：完整结构/辩论提纲/法庭陈述/交付前5项检查）

**修改文件**：
- `litigation-legal/skills/representation-drafting/SKILL.md`（改造为编排入口：研究闸门护栏/子技能编排表/依赖关系/引用规范继承）

每个子技能含：目的、前置读取、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（法条/案例/学说三类）。

---

### Task 2: 拆分 cold-start-interview 为四子技能 + 编排入口

**提交**：`d33641e`

**创建文件**：
- `litigation-legal/skills/cold-start-interview/identity-team/SKILL.md`（身份与团队：机构名称/团队规模/执业角色/角色倾向原告-被告-两者，写入 `## 我们是谁` + `## 谁在使用`）
- `litigation-legal/skills/cold-start-interview/risk-calibration/SKILL.md`（风险校准：严重程度金额阈值/可能性百分比段/重大性阈值，含法律事实合理性检查，引用民法典第188条核查特殊时效口述）
- `litigation-legal/skills/cold-start-interview/case-management/SKILL.md`（案件管理：利益冲突检查/证据保全偏好（自动/逐案/范围/刷新周期）/外部律师/和解策略授权阈值，写入4个章节）
- `litigation-legal/skills/cold-start-interview/document-style/SKILL.md`（文书风格：代理词风格/输出格式偏好/法条引用偏好/案例引用偏好/工作产物标题确认）

**修改文件**：
- `litigation-legal/skills/cold-start-interview/SKILL.md`（改造为编排入口：完整重跑/部分更新两条路径/写入规则/关联契约）

每个子技能含：写入目标章节说明、问题流（分组）、边界条件、错误处理、写入前确认。支持单独触发仅更新对应章节（遵循 practice-profile-schema 契约）。

---

### Task 3: 新增 limitation-monitoring 诉讼时效监控技能

**提交**：`6c94c97`

**创建文件**：
- `litigation-legal/skills/limitation-monitoring/limitation-period-identification/SKILL.md`（时效期间识别：一般3年=《民法典》第188条已核实/特殊时效[待验证]/最长20年规则已核实条款款号[待验证]，含多请求权分别识别）
- `litigation-legal/skills/limitation-monitoring/accrual-determination/SKILL.md`（起算点判定：知道或应当知道=第188条已核实/按6种情形分类/「应当知道」举证要点，含起算点判定表）
- `litigation-legal/skills/limitation-monitoring/tolling-interruption/SKILL.md`（中止中断事由分析：明确区分法律后果——中止=继续计算剩余期间/中断=归零重新起算，含证据效力评估和举证风险）
- `litigation-legal/skills/limitation-monitoring/monitoring-ledger/SKILL.md`（监控台账：分级预警绿/蓝/黄/红/橙/灰/深红，<90天黄/<30天红/≤7天深红，含行动建议优先级）
- `litigation-legal/skills/limitation-monitoring/SKILL.md`（编排入口：显著护栏「时效抗辩须当事人主动提出，法院不主动适用」/中止中断对照表/与 key-dates-limitation 分工说明）

**与 matter-intake/key-dates-limitation 互补**：key-dates-limitation 完成录入时初判（快速/单次），limitation-monitoring 完成深度分析（精确/持续监控）。衔接方式：初判结果作为深度分析的起点输入。

---

### Task 4: plugin.json 注册全部技能 + 升级到 0.3.0

**提交**：`fa453b4`

**修改文件**：`litigation-legal/.claude-plugin/plugin.json`

变更内容：
- `version`: `0.2.0` → `0.3.0`
- `description`: 更新为反映六大编排入口 + 32 个深层子技能的完整说明
- `skills` 数组：从 5 条扁平技能扩展为 32 条（6 编排入口 + 26 子技能）

注册清单（32 条）：

| 组 | 编排入口 | 子技能数 |
|----|---------|---------|
| cold-start-interview | 1 | 4（identity-team/risk-calibration/case-management/document-style）|
| matter-intake | 1 | 5（subject-conflict-precheck/case-identification/key-dates-limitation/evidence-preservation/initial-theory）|
| defense-drafting | 1 | 5（defense-strategy/jurisdiction-objection/substantive-defense/procedural-limitation-defense/defense-assembly）|
| evidence-management | 1 | 4（evidence-collection/three-properties-review/evidence-catalog/evidence-exchange）|
| representation-drafting | 1 | 4（dispute-focus/fact-argumentation/legal-argumentation/representation-assembly）|
| limitation-monitoring | 1 | 4（limitation-period-identification/accrual-determination/tolling-interruption/monitoring-ledger）|
| **合计** | **6** | **26（总计 32）** |

JSON 验证：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('litigation-legal/**/*.json', recursive=True)]"` — 通过。

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Known Stubs

无影响核心功能的 stub。以下为占位符，属已设计的可扩展结构：

- 各子技能的「案例类」法律依据章节中包含「待填入」占位符（如：`[待填入：管辖权异议案例]`）——这是 _shared/civil-procedure-citations.md 已有的占位结构，由律师经法规数据库检索后填充，不影响技能的基本功能。
- 各子技能「学说类」法律依据同上。

---

## Threat Flags

无新的安全相关接触面。本计划仅创建和修改提示词/配置文件，不涉及网络端点、认证路径或数据库操作。

---

## Self-Check

### 文件存在性检查

所有 16 个文件（13 新建 + 3 修改）已确认存在。

### 提交存在性检查

所有 4 个任务提交已确认存在：
- `f26e851` feat(03-03): 拆分 representation-drafting 为四个子技能 + 编排入口
- `d33641e` feat(03-03): 拆分 cold-start-interview 为四个访谈子技能 + 编排入口
- `6c94c97` feat(03-03): 新增 limitation-monitoring 诉讼时效监控技能（编排入口 + 四子技能）
- `fa453b4` feat(03-03): plugin.json 升级到 0.3.0 并注册全部 32 个技能

## Self-Check: PASSED
