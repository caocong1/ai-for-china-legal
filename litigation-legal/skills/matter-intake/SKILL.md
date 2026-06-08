---
name: matter-intake
description: >
  案件录入编排入口——按顺序调用五个子技能完成新案件录入，
  也可直接触发任意单个子技能。深度内容已拆分至子技能，本文件为编排层入口。
  当用户说「新案件」「录入案件」或想将新案件纳入组合时使用。
argument-hint: "[可选案件名称]"
---

> **迁移说明（2026-06-05）**：原 matter-intake/SKILL.md 的深度内容已拆分到五个子技能
> （主体资格与冲突预检 / 案件识别与分级 / 关键日期与时效起算 / 证据保全与种子文档 / 初始理论与装配）。
> 每个子技能可单独触发，亦可由本编排入口顺序调用。
> 原文件所有内容（主体资格预检清单、冲突三路径门槛、风险分级矩阵、关键日期、证据保全、初始立场、_log.yaml schema、matter.md 模板）
> **无丢失**地迁移至对应子技能，请查阅子技能 SKILL.md 获取详细内容。

# 案件录入（编排入口）

## 目的

每个新案件都经过相同的录入流程，以便组合保持可比性。本入口编排五个子技能的顺序调用，并维护跨子技能的入口级护栏，确保录入质量基准不被绕过。

`_log.yaml` 中的统一行让状态技能可以汇总。`matter.md` 中的叙事捕获行无法容纳的内容。`history.md` 在录入时播种为第零条目。

---

## 入口级护栏（进入任何子技能前执行）

在启动任何子技能之前，本编排入口强制执行以下四项护栏：

### 护栏 1：加载实践配置文件

读取 `litigation-legal/CLAUDE.md`（路径：`~/.claude/plugins/config/ai-for-china-legal/litigation-legal/CLAUDE.md`）。

检查关键字段是否已填充（不含 `[PLACEHOLDER]`）：
- `## 风险校准` — 用于步骤 2 风险分级
- `## 谁在使用` → 角色倾向 — 用于步骤 2 角色确认
- `## 利益冲突清除` — 用于步骤 1 冲突门槛

**配置文件缺失或含大量 `[PLACEHOLDER]` 时（临时模式）：**

> 我注意到你还没有配置你的诉讼实践档案。
>
> **两个选择：**
> - 运行 `/litigation-legal:cold-start-interview` 配置你的档案（约 5 分钟）
> - 说「**临时模式**」，我会使用通用默认值，并在每个输出上标记 `[临时模式 — 配置你的档案以获得定制输出]`

临时模式默认值见 `litigation-legal/skills/_shared/practice-profile-schema.md` → 三、技能读取契约 → 3.2 临时模式默认值。

### 护栏 2：事项工作区上下文

确认事项工作区已启用（`litigation-legal/CLAUDE.md` → `## 事项工作区` → 启用：✓）。

事项工作区默认启用：每个案件有独立的 `matters/[slug]/matter.md` 和 `matters/[slug]/history.md`。如事项工作区未启用，提示律师在配置文件中启用后再录入。

### 护栏 3：利益冲突硬门槛

**在创建任何案件文件之前，必须完成步骤 1（subject-conflict-precheck）的利益冲突检查，且状态须为「已清除 / 待处理 / 豁免」之一。**

利益冲突状态为「未执行」时，本编排入口**强制停止**——不进入步骤 2 及后续步骤，不创建任何文件（matter.md / history.md / _log.yaml 条目），直到律师通过三路径之一处理冲突状态。

详细逻辑见：`litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md`

### 护栏 4：目的地与特权检查

询问输出目的地（如首次询问未配置）：

- **律师角色** → 工作产物标题：「律师工作产物 — 受律师-当事人特权保护 / 保密」
- **非律师角色** → 工作产物标题：「研究笔记 — 非法律建议，供律师审查」

面向对方/外部的目的地（如发送给案件对方）会使特权保护失效。提示律师在共享前去除特权标题和内部风险评估内容。

---

## 子技能编排顺序

按以下顺序执行。每个子技能可单独触发（用 `/litigation-legal:<name>` 斜杠命令），也可由本入口顺序调用。

| 顺序 | 子技能名称 | 核心职责 | 子技能路径 | 单独触发命令 | 是否硬门槛 |
|-----|----------|---------|-----------|------------|-----------|
| **1** | 主体资格与冲突预检 | 核查主体资格陷阱；执行利益冲突三路径门槛；未清除时阻止所有文件创建 | `skills/matter-intake/subject-conflict-precheck/SKILL.md` | `/litigation-legal:subject-conflict-precheck` | **是（硬门槛）** |
| **2** | 案件识别与分级 | 确认案件名称/对方/类型/我方角色（绝不假设）/管辖；风险分级矩阵；重大性评估 | `skills/matter-intake/case-identification/SKILL.md` | `/litigation-legal:case-identification` | 否 |
| **3** | 关键日期与时效起算 | 答辩期限（15日）；举证截止；时效初判（民法典第188条 3年）；时效状态标记 | `skills/matter-intake/key-dates-limitation/SKILL.md` | `/litigation-legal:key-dates-limitation` | 否 |
| **4** | 证据保全与种子文档 | 外部律师（律所/合伙人/邮箱/聘用）；内部负责人；证据保全状态（已发/未发/紧急标记）；种子文档登记 | `skills/matter-intake/evidence-preservation/SKILL.md` | `/litigation-legal:evidence-preservation` | 否 |
| **5** | 初始理论与装配 | 一段话理论（我方/对方/pivot fact/立场）；Slug 生成；matter.md + history.md + _log.yaml 三件产物装配；写入前确认；下一步决策树 | `skills/matter-intake/initial-theory/SKILL.md` | `/litigation-legal:initial-theory` | 否 |

### 各步骤传递的上下文

步骤之间通过本次会话的工作记忆传递信息（无需写文件）：

- 步骤 1 → 步骤 2+：主体资格状态、冲突清除状态
- 步骤 2 → 步骤 4+：风险评级（中等以上时步骤 4 触发外部律师标记）
- 步骤 3 → 步骤 5：时效状态（预警/紧急时步骤 5 在下一步决策树中提示 limitation-monitoring）
- 步骤 4 → 步骤 5：外部律师状态、证据保全状态（装配到 matter.md 和 _log.yaml）

---

## 单独触发说明

律师可单独触发任一子技能，无需运行完整录入流程：

```
/litigation-legal:subject-conflict-precheck   — 仅执行主体预检和冲突检查
/litigation-legal:case-identification         — 仅执行案件识别与风险分级
/litigation-legal:key-dates-limitation        — 仅执行关键日期与时效初判
/litigation-legal:evidence-preservation       — 仅处理外部律师/内部负责人/证据保全
/litigation-legal:initial-theory              — 仅拟定理论并装配产物
```

单独触发时，子技能会检查所需的上游信息是否已存在（如 matter.md）；如需要上游结果但缺失，会提示律师先提供或先运行对应步骤。

---

## 引用的共享资源

本编排入口及各子技能读取以下共享资源（已在子技能前置中声明，此处汇总）：

| 资源 | 路径 | 用途 |
|------|------|------|
| 诉讼引用规范 | `litigation-legal/skills/_shared/legal-basis-conventions.md` | 法条/案例/学说分类 + 待验证规则 |
| 诉讼引用库 | `litigation-legal/skills/_shared/civil-procedure-citations.md` | 民诉法/仲裁法/证据规定/民法典时效 |
| 配置文件契约 | `litigation-legal/skills/_shared/practice-profile-schema.md` | 字段映射 + 读取契约 + 临时模式 |
| 主体资格陷阱 | `shared/references/subject-qualification-traps.md` | 特殊主体类型核查 |
| 实践配置文件 | `litigation-legal/CLAUDE.md` | 风险校准/角色倾向/和解策略/证据保全 |
