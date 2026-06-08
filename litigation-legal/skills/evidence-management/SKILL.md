---
name: evidence-management
description: >
  证据管理编排入口。编排四个子技能（证据收集与保管链 → 三性审查 → 三大类证据目录编制 →
  举证期限与证据交换），对照实践配置文件管理诉讼案件证据，包含研究闸门前置、
  三大类证据目录强制分组硬门禁入口级提示和护栏。
  深度内容已拆分至四个子技能，见 skills/evidence-management/<子技能名>/SKILL.md。
  由 /litigation-legal:evidence-management 调用。
argument-hint: "[案件 slug 或事项路径]"
---

# 证据管理（编排入口）

> **迁移说明**：原证据管理深度内容（证据收集清单、证据分类、三性审查、三大类证据目录强制分组硬门禁、
> 证据交换准备）已拆分迁移至四个子技能。
> 本文件为编排入口，负责前置护栏和子技能调用顺序。
> 子技能路径：`litigation-legal/skills/evidence-management/<子技能名>/SKILL.md`。

---

## 研究闸门前置

> ⚠️ **研究闸门**：除非用户明确豁免联网检索，**必须先运行 `shared/research-gate/SKILL.md`**，
> 完成研究底稿后再进入本技能。

研究闸门保障：
- 核验电子数据取证规则（证据规定最新版本）
- 搜索特殊证据类型的司法认定标准（如区块链存证、公证电子数据等）
- 核验举证期限相关规定

---

> ⚠️ **三大类证据目录强制分组硬门禁（入口级提示）**：
>
> **证据目录必须按三大类分组列示（每类至少1项；缺类视为质量闸门不通过）。**
> **Flat list（不分组）不满足质量闸门，拒绝输出。**
>
> 三大类强制分组细则在 evidence-catalog 子技能中执行，
> 但本入口保留此硬门禁提示：任何证据目录输出必须经过 evidence-catalog 子技能处理。

---

## 事项上下文

检查 `litigation-legal/CLAUDE.md` 中的 `## 事项工作区` 部分。如果已启用且有活跃事项，加载 `matter.md` 获取事项级上下文，输出写入事项文件夹。

---

## 目的与整体证据管理流程

本技能协调四个子技能，系统完成从证据收集到证据交换的全流程：

1. **收集与保管链** → 收集所有相关证据，建立保管链记录
2. **三性审查** → 对每条证据审查真实性/合法性/关联性，评估证明力
3. **三大类目录编制** → 按强制分组规则编制证据目录（硬门禁）
4. **举证期限管理** → 确保在期限内提交，管理逾期风险

---

## 子技能编排顺序

律师可单独触发任一子技能（见「单独触发」说明），也可通过本入口运行完整证据管理流程：

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **evidence-collection** | 证据收集与保管链：收集合同/邮件/微信/财务凭证/证人证言/鉴定；电子数据取证合法性与保管链（来源/提取方式/完整性校验/公证存证）；三大类初步归类 | `skills/evidence-management/evidence-collection/SKILL.md` | `/litigation-legal:evidence-collection` |
| 2 | **three-properties-review** | 三性审查：对每条证据逐项审查真实性/合法性/关联性；评估证明力；起草对方证据质证要点；识别举证责任分配（谁主张谁举证原则）| `skills/evidence-management/three-properties-review/SKILL.md` | `/litigation-legal:three-properties-review` |
| 3 | **evidence-catalog** | 三大类证据目录编制：按第一类（基础交易关系）/ 第二类（法律关系及索赔事实）/ 第三类（被告违约事实）强制分组，缺类标记补强方向，执行 flat list 硬门禁 | `skills/evidence-management/evidence-catalog/SKILL.md` | `/litigation-legal:evidence-catalog` |
| 4 | **evidence-exchange** | 举证期限与证据交换：举证期限管理（普通程序不少于15日）、逾期举证风险评估（逾期一般不予认可）、证据交换准备、申请鉴定/证据保全/调查取证时点管理 | `skills/evidence-management/evidence-exchange/SKILL.md` | `/litigation-legal:evidence-exchange` |

**顺序说明**：收集先行（有证据才能审查）→ 三性审查（筛选可用证据）→ 目录编制（按分组整理）→ 举证期限管理（确保按期提交）。

**单独触发场景**：

- 只需收集证据和建立保管链：`/litigation-legal:evidence-collection [案件]`
- 只需审查我方或对方证据的三性：`/litigation-legal:three-properties-review [案件]`
- 只需编制证据目录：`/litigation-legal:evidence-catalog [案件]`
- 只需管理举证期限和证据交换：`/litigation-legal:evidence-exchange [案件]`

---

## 前置条件：加载实践配置文件

**在开始之前，读取实践配置文件 `litigation-legal/CLAUDE.md`。** 如果配置文件缺失或仍有 PLACEHOLDER，显示以下提示：

> 我注意到你还没有配置诉讼实践档案。
>
> **两个选择：**
> - 运行 `/litigation-legal:cold-start-interview`（约 2 分钟）来配置你的档案。
> - 说 **「临时模式」**，我会使用通用默认值——律师角色、因案而异立场——并在每个输出上标记 `[临时模式]`。

### 临时模式

如果用户说「临时模式」，正常运行，使用通用默认值。在每个子技能输出上标记 `[临时模式]`。

---

## 入口级护栏

以下护栏在编排入口层执行，不依赖子技能：

### 三大类证据目录硬门禁（入口级）

> **核心护栏**：证据目录输出前，必须经过 evidence-catalog 子技能的三大类分组检查。
> 任何未经分组的 flat list 不得输出。本入口不产生 flat list 证据清单。

### 举证期限提前确认

在调用任何子技能前，确认：
- 举证截止日是否已确定？（从开庭通知书或庭前会议记录获取）
- 是否有紧迫的申请事项（申请鉴定/证据保全/调查取证）需要在举证期限内完成？

若距举证截止 ≤ 5 个工作日，标记 `[举证期限紧急]`，优先处理 evidence-exchange 子技能。

### 电子数据合法性预警

在处理电子数据类证据前，提示律师确认取证方式是否合法。以侵害他人合法权益或违反法律禁止性规定取得的电子数据，不得提交（可能被认定为非法证据 `[待验证]`）。

---

## 共享资源加载

进入子技能前，读取以下共享资源：

- `litigation-legal/skills/_shared/civil-procedure-citations.md` — 诉讼仲裁引用库（重点：C节证据规定全节 + A.5举证/答辩期）
- `litigation-legal/skills/_shared/legal-basis-conventions.md` — 引用规范
- `shared/research-gate/SKILL.md` — 研究闸门（已在顶部前置）
- `shared/references/document-structures.md` — 诉讼文书结构模板（证据目录三大类模板）

---

## 输出：完整证据管理流程完成

完整流程由各子技能分别输出，汇总包含：
- 证据收集汇总表（含保管链记录）— evidence-collection
- 三性审查报告（含质证要点）— three-properties-review
- 三大类证据目录（强制分组）— evidence-catalog
- 举证期限管理报告 + 质证准备状态 — evidence-exchange

输出继承实践配置文件 `## 输出` 中的工作产物标题。证据分析工作底稿受律师-当事人特权保护，仅在特权圈内分发。
