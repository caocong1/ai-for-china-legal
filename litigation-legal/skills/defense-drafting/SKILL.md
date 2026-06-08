---
name: defense-drafting
description: >
  答辩状起草编排入口。编排五个子技能（答辩策略选择 → 管辖权异议（如适用）→
  实体抗辩起草 → 程序抗辩与时效抗辩 → 答辩状装配），
  对照实践配置文件起草答辩状，包含研究闸门前置、特权标题和入口级护栏。
  深度内容已拆分至五个子技能，见 skills/defense-drafting/<子技能名>/SKILL.md。
  由 /litigation-legal:defense-drafting 调用。
argument-hint: "[案件 slug 或事项路径]"
---

# 答辩状起草（编排入口）

> **迁移说明**：原答辩状起草深度内容（答辩策略选择、管辖权异议审查、实体抗辩逐项起草、
> 诉讼时效与程序抗辩、答辩状格式装配与交付前质量检查）已拆分迁移至五个子技能。
> 本文件为编排入口，负责前置护栏和子技能调用顺序。
> 子技能路径：`litigation-legal/skills/defense-drafting/<子技能名>/SKILL.md`。

---

## 研究闸门前置

> ⚠️ **研究闸门**：除非用户明确豁免联网检索，**必须先运行 `shared/research-gate/SKILL.md`**，
> 完成研究底稿后再进入本技能。

研究闸门保障：
- 核验本案适用的最新民事诉讼法/仲裁法/民法典版本
- 检索对方主张的法律条文是否准确
- 搜索类案（如有，用于支撑或反驳）

---

## 事项上下文

检查 `litigation-legal/CLAUDE.md` 中的 `## 事项工作区` 部分。如果已启用且有活跃事项，加载 `matter.md` 获取事项级上下文，输出写入事项文件夹。如果未启用（默认），使用实践级上下文。

---

## 目的与整体答辩起草流程

本技能协调五个子技能，系统完成从案件信息加载到答辩状交付的全流程：

1. **读取对方起诉状/仲裁申请** → 识别程序类型和诉讼请求
2. **加载实践配置文件** → 确认我方角色倾向和文书风格
3. **策略决策** → 确定各路线优先级
4. **逐项起草** → 管辖异议（如有）+ 实体抗辩 + 程序时效抗辩
5. **装配交付** → 组装完整文书 + 质量检查

---

## 子技能编排顺序

律师可单独触发任一子技能（见「单独触发」说明），也可通过本入口运行完整答辩流程：

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **defense-strategy** | 答辩策略选择：从起诉状决策实体/程序/反诉路线，输出策略决策表；仲裁场景识别仲裁协议有效性与或裁或审 | `skills/defense-drafting/defense-strategy/SKILL.md` | `/litigation-legal:defense-strategy` |
| 2 | **jurisdiction-objection** | 管辖权异议：审查级别/地域/专属/约定管辖，判断可行性，生成管辖权异议申请书；仲裁协议效力异议路径 | `skills/defense-drafting/jurisdiction-objection/SKILL.md` | `/litigation-legal:jurisdiction-objection` |
| 3 | **substantive-defense** | 实体抗辩起草：逐请求承认/否认/抗辩 + 事实抗辩 + 法律抗辩（请求权基础/合同效力/履行抗辩权/违约金调整）| `skills/defense-drafting/substantive-defense/SKILL.md` | `/litigation-legal:substantive-defense` |
| 4 | **procedural-limitation-defense** | 程序抗辩与诉讼时效：时效3年（第188条）+ 中止/中断排查 + 时效须主动提出警示 + 其他程序抗辩 | `skills/defense-drafting/procedural-limitation-defense/SKILL.md` | `/litigation-legal:procedural-limitation-defense` |
| 5 | **defense-assembly** | 答辩状装配：按法院格式组装 + 证据清单 + 交付前质量检查（特权标题/研究闸门/引用标注）+ 下一步决策树 | `skills/defense-drafting/defense-assembly/SKILL.md` | `/litigation-legal:defense-assembly` |

**顺序说明**：策略先行（确定路线）→ 管辖先处理（须在答辩期内提出）→ 实体抗辩（核心内容）→ 程序时效（补充且时效抗辩须主动决策）→ 装配交付（汇总组装）。

**管辖权异议说明**：管辖权异议须在答辩期内（15日）提出，逾期则丧失权利 `[待验证]`。如策略决策认为需要提管辖权异议，必须在准备实体答辩的同时优先处理。

**单独触发场景**：

- 只需决策答辩路线：`/litigation-legal:defense-strategy [案件]`
- 只需审查管辖问题：`/litigation-legal:jurisdiction-objection [案件]`
- 已有策略，只需起草实体抗辩段落：`/litigation-legal:substantive-defense [案件]`
- 只需分析时效：`/litigation-legal:procedural-limitation-defense [案件]`
- 前序子技能已完成，只需装配文书：`/litigation-legal:defense-assembly [案件]`

---

## 前置条件：加载实践配置文件

**在开始之前，读取实践配置文件 `litigation-legal/CLAUDE.md`。** 如果配置文件缺失或仍有 PLACEHOLDER，显示以下提示：

> 我注意到你还没有配置诉讼实践档案——这是让我根据你的执业立场、文书风格和角色倾向来定制输出的关键。
>
> **两个选择：**
> - 运行 `/litigation-legal:cold-start-interview`（约 2 分钟）来配置你的档案，然后我会根据你的真实执业环境进行起草。
> - 说 **「临时模式」**，我会使用通用默认值——律师角色、因案而异立场、简洁有力文书风格——并在每个输出上标记 `[临时模式 — 配置你的档案以获得定制输出]`。

### 临时模式

如果用户说「临时模式」，正常运行，使用以下通用默认值：律师角色，因案而异立场，简洁有力文书风格。在每个子技能输出和最终答辩状上标记 `[临时模式]`。在输出末尾附加：

> 「这是一次通用默认值运行。运行 `/litigation-legal:cold-start-interview` 来获得根据你的真实执业立场、常用法院、和解策略定制的输出。」

---

## 入口级护栏

以下护栏在编排入口层执行，不依赖子技能：

### 答辩期把控

**已核实规则**：普通程序下，被告应于收到起诉状副本之日起**十五日**内提出答辩状（《民事诉讼法》2023修正，条号待验证）。

在调用任何子技能前，确认：
- 起诉状/仲裁申请的送达日期
- 答辩期限截止日（送达日 + 15日）
- 管辖权异议（如需要）须与答辩期同步处理

若距答辩期截止 ≤ 5 个工作日，标记 `[紧急 — 答辩期限临近，管辖权异议与答辩需同步加急处理]`。

### 特权标题检查

在生成任何输出之前，检查输出目的地。工作底稿受律师-当事人特权保护，不得直接发给对方。提交给法院/仲裁机构的文书须按格式正式提交。

从 `litigation-legal/CLAUDE.md → ## 输出 → 工作产物标题` 读取合适的特权标题：
- 律师角色：「律师工作产物 — 受律师-当事人特权保护 / 保密」
- 非律师角色：「研究笔记 — 非法律建议，供律师审查」

### 仲裁场景识别

若案件为仲裁程序（对方提交仲裁申请书，非诉状），自动调整：
- defense-strategy 中优先检查仲裁协议有效性与或裁或审规则
- jurisdiction-objection 走仲裁协议效力异议路径（不走民诉法管辖权异议路径）
- defense-assembly 使用仲裁答辩状格式

### 时效抗辩提前告知

在调用 procedural-limitation-defense 之前，向律师提前告知：

> **诉讼时效抗辩须当事人主动提出，法院不主动适用。如未在一审答辩阶段主张，即视为永久放弃，二审及再审均不可补提。** 请在答辩阶段就此明确决策。

### 起诉状缺失

若未收到对方起诉状/仲裁申请，**停止并提示**：「尚未收到对方起诉状，无法进入答辩起草流程。请在收到后再触发本技能。」不自动推断对方诉求。

---

## 共享资源加载

进入子技能前，读取以下共享资源（子技能自身也会读取，此处列出确保编排时已加载）：

- `litigation-legal/skills/_shared/civil-procedure-citations.md` — 诉讼仲裁引用库（民诉法/仲裁法/时效/证据规定）
- `litigation-legal/skills/_shared/legal-basis-conventions.md` — 引用规范（法条/案例/学说 + 来源标签 + 待验证规则）
- `shared/research-gate/SKILL.md` — 研究闸门（已在顶部前置）
- `shared/references/document-structures.md` — 诉讼文书结构模板（答辩状/代理意见/证据目录）

---

## 输出：完整答辩流程完成

完整流程由 `defense-assembly` 子技能最终组装，包含：
- 答辩状正文（按法院格式）
- 管辖权异议申请书（如适用，独立文件）
- 证据清单（简要版，完整版由 evidence-management 技能处理）
- 交付前质量检查结果

输出继承实践配置文件 `## 输出` 中的工作产物标题和文书风格。答辩状和工作底稿受律师-当事人特权保护，仅在特权圈内分发。
