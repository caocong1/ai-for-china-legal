---
name: limitation-monitoring
description: >
  诉讼时效监控编排入口：统筹时效期间识别、起算点判定、中止中断事由分析、监控台账与预警
  四个子技能，对案件中每个请求权进行完整的时效深度分析并建立持续监控台账。
  明确：时效抗辩须由当事人主动提出，法院不主动适用；时效届满不消灭实体权利但丧失胜诉权。
  每个子技能也可单独触发：/litigation-legal:limitation-period-identification、
  :accrual-determination、:tolling-interruption、:monitoring-ledger。
argument-hint: "[案件 slug 或「全部案件」]"
---

# 诉讼时效监控（编排入口）

> **时效抗辩核心护栏**：
>
> **诉讼时效届满不消灭实体权利，但义务人可主动提出时效抗辩，拒绝履行。法院不主动适用时效抗辩——只有义务人主动提出，才发生丧失胜诉权的法律效果。**
>
> 实践含义：即使时效可能已届满，律师仍应评估义务人是否会提出抗辩；义务人主动履行的，不得以时效为由请求返还。

## 目的

提供诉讼时效的深度持续监控能力：

1. **深度时效分析**（区别于 matter-intake 的初判）：精确识别时效期间、判定起算点、分析中止中断事由
2. **持续监控台账**：跨案件聚合，剩余天数动态计算，分级预警（黄/红）
3. **行动建议**：在时效届满前提供具体的中断手段建议（催款函/起诉/仲裁）

---

## 关键法律规则

### 核心护栏（已核实）

| 规则 | 法律依据 | 说明 |
|------|---------|------|
| **一般诉讼时效：3 年** | 《民法典》（2020年）第188条 | **已核实锚点** |
| **起算点**：知道或应当知道权利受损及义务人之日 | 《民法典》（2020年）第188条 | **已核实锚点** |
| **最长权利保护期间：20 年** | 《民法典》（2020年）第188条（条款款号 `[待验证]`）| 规则已核实，款号待验证 |
| 时效届满不消灭实体权利 | 《民法典》相关条文 `[条号待验证]` | 义务人抗辩权说（现行主流观点，具体条号待验证）|
| **时效抗辩须当事人主动提出** | 《民法典》/民事诉讼相关规定 `[条号待验证]` | **法院不主动适用** |

### 中止与中断的根本区别

| | 中止 | 中断 |
|--|------|------|
| 法律后果 | **继续计算剩余期间（不归零）** | **重新起算（归零）** |
| 法律依据 | 《民法典》第194条 `[待验证]` | 《民法典》第195条 `[待验证]` |
| 触发条件 | 最后六个月内不可抗力等法定障碍 | 主张权利/同意履行/提起诉讼仲裁等 |

---

## 与 matter-intake/key-dates-limitation 的分工

| 技能 | 定位 | 触发时机 |
|------|------|---------|
| `matter-intake/key-dates-limitation` | **初判**：案件录入时快速识别时效期间、初步判断起算点、标记临界状态，提示需要深度分析 | 案件录入阶段（每个案件一次）|
| `limitation-monitoring`（本技能）| **深度分析**：精确识别时效期间/判定起算点/分析中止中断事由/建立持续监控台账 | 有深度时效分析需求时（临近届满/存在中断事由/复杂案由）|

**衔接方式**：`key-dates-limitation` 产出的初判结果（时效期间/起算点/预警标记）作为本技能各子技能的起点输入，深化而非重复。

---

## 子技能编排顺序

| 步骤 | 子技能 | 职责 | 路径 | 单独触发命令 |
|------|-------|------|------|-----------|
| 1 | `limitation-period-identification` | 按案由识别适用时效期间（一般3年/特殊时效/最长20年保护期）| `skills/limitation-monitoring/limitation-period-identification/SKILL.md` | `/litigation-legal:limitation-period-identification` |
| 2 | `accrual-determination` | 精确判定起算点（按约定期限/未约定/分期/持续侵权等分情形）| `skills/limitation-monitoring/accrual-determination/SKILL.md` | `/litigation-legal:accrual-determination` |
| 3 | `tolling-interruption` | 分析中止中断事由（明确区分法律后果），计算调整后届满日 | `skills/limitation-monitoring/tolling-interruption/SKILL.md` | `/litigation-legal:tolling-interruption` |
| 4 | `monitoring-ledger` | 建立/更新监控台账，设置分级预警（<90天黄色/<30天红色），生成行动建议 | `skills/limitation-monitoring/monitoring-ledger/SKILL.md` | `/litigation-legal:monitoring-ledger` |

**完整流程**：按步骤 1 → 2 → 3 → 4 顺序执行。

**部分触发**：律师可单独触发任一子技能，例如：只确认时效期间（步骤1）；或只更新台账（步骤4）。

---

## 入口级护栏

在进入任一子技能前，执行以下检查：

### 加载事项上下文

1. 读取 `litigation-legal/CLAUDE.md` — 加载风险校准阈值（用于重大性预警联动）
2. 加载指定案件的事项工作区（如有）
3. 加载 `matter-intake/key-dates-limitation` 初判结果（如有）

### 引用规范

遵循 `litigation-legal/skills/_shared/civil-procedure-citations.md`（引用库）和 `litigation-legal/skills/_shared/legal-basis-conventions.md`（引用规范）：
- 已核实锚点（第188条）正确使用，无滥标待验证
- 不确信条号：一律标 `[待验证]`，不臆造
- 特殊时效条号和年限：一律标 `[待验证]`
- 案例引用：默认标 `[待验证]`

### 执业纪律

在完成深度时效分析后，始终提示：

> **执业提示**：本时效分析为辅助工具，不替代律师的专业判断。时效届满日的认定涉及起算点、中断事由等复杂法律问题，最终结论须由执业律师确认。

---

## 完整流程产出清单

| 产出物 | 来源子技能 | 说明 |
|-------|---------|------|
| 时效期间识别表 | limitation-period-identification | 案由 / 时效期间 / 依据 / 待验证标记 |
| 起算点判定表 | accrual-determination | 请求权 / 起算情形 / 起算日 / 届满日 |
| 中止中断事由分析表 | tolling-interruption | 事由 / 类型（中止/中断）/ 发生日 / 证据 / 调整后届满日 |
| 时效监控台账 | monitoring-ledger | 全部请求权台账 + 预警等级 |
| 行动建议清单 | monitoring-ledger | 优先行动、中断手段建议 |
