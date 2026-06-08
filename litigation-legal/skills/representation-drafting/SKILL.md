---
name: representation-drafting
description: >
  代理词起草编排入口：统筹争议焦点梳理、事实论证、法律论证与法条适用、代理词装配四个子技能，
  输出完整代理词、辩论提纲和法庭陈述材料。必须先运行研究闸门（shared/research-gate/SKILL.md）。
  每个子技能也可单独触发：/litigation-legal:dispute-focus、:fact-argumentation、
  :legal-argumentation、:representation-assembly。
argument-hint: "[案件 slug] [庭审阶段]"
---

# 代理词起草（编排入口）

> **迁移说明**：本文件已由 03-03 计划从扁平技能改造为编排入口。原有内容（案件回顾/代理词结构/法律依据检索/格式模板/辩论提纲/法庭陈述/研究闸门前置）已深化迁移至四个子技能。律师可单独触发任一子技能，无需运行整个流程。

> **研究闸门**：除非用户明确豁免联网检索，必须先运行 `shared/research-gate/SKILL.md`，完成研究底稿后再进入本编排入口或任一子技能。

## 目的

统筹代理词起草的完整工作流，或单独触发某一子技能以更新/补充特定部分。

---

## 入口级护栏

在进入任一子技能前，执行以下检查：

### 研究闸门前置

```
必须先运行 shared/research-gate/SKILL.md，研究底稿完成后方可开始起草。
豁免条件：律师明确声明「豁免联网检索」。
```

### 加载实践配置文件

读取 `litigation-legal/CLAUDE.md`：

1. 检查关键字段是否已填充（不含 `[PLACEHOLDER]`）
2. 提取：代理词风格、工作产物标题、角色倾向（原告/被告）、是否需要案例引用/法条引用
3. 若配置缺失：提示运行 `/litigation-legal:cold-start-interview` 或选择临时模式

**临时模式默认值（配置文件未填充时）**：

| 字段 | 临时模式默认值 |
|-----|-------------|
| 代理词风格 | 规范正式，含法条引用 |
| 角色倾向 | 因案而异（直接询问）|
| 工作产物标题 | 律师工作产物 — 受律师-当事人特权保护 / 保密 |

### 事项上下文

确认案件 slug 或案件信息（当事人/案件类型/审理机构），加载事项工作区（如启用）。

### 特权检查

确认代理词的交付目的地（法庭提交/律师内部/其他），对外部交付目的地提示净化特权标题。

---

## 子技能编排顺序

编排入口按以下顺序调用子技能（每个子技能也可单独触发）：

| 步骤 | 子技能 | 职责 | 路径 | 单独触发命令 |
|------|-------|------|------|-----------|
| 1 | `dispute-focus` | 梳理争议焦点，生成争议焦点对照表（我方/对方/证据 pivot）| `skills/representation-drafting/dispute-focus/SKILL.md` | `/litigation-legal:dispute-focus` |
| 2 | `fact-argumentation` | 起草事实部分，生成事实论证段落 + 事实-证据对应表 | `skills/representation-drafting/fact-argumentation/SKILL.md` | `/litigation-legal:fact-argumentation` |
| 3 | `legal-argumentation` | 起草法律部分，完成要件分析/法律涵摄/指导性案例引用，生成法律依据清单 | `skills/representation-drafting/legal-argumentation/SKILL.md` | `/litigation-legal:legal-argumentation` |
| 4 | `representation-assembly` | 装配完整代理词（开头/事实/法律/请求），生成辩论提纲 + 法庭陈述 + 交付前检查 | `skills/representation-drafting/representation-assembly/SKILL.md` | `/litigation-legal:representation-assembly` |

**完整流程**：按步骤 1 → 2 → 3 → 4 顺序执行，律师在关键节点确认后继续。

**部分触发**：律师可单独触发步骤 1、2、3 或 4，只运行对应子技能并获得对应产出，不重跑整个流程。

---

## 依赖关系

| 子技能 | 依赖前置 | 说明 |
|-------|---------|------|
| dispute-focus | 案件事实、证据目录、对方主张（起诉状/答辩状）| 可无前序子技能产出，直接触发 |
| fact-argumentation | dispute-focus 产出（争议焦点对照表）| 直接触发时需律师提供争议焦点 |
| legal-argumentation | dispute-focus + fact-argumentation 产出 | 直接触发时需律师提供争议焦点和事实论证要点 |
| representation-assembly | dispute-focus + fact-argumentation + legal-argumentation 三者产出 | 直接触发时需律师提供完整的事实/法律论证材料 |

---

## 法律引用规范

所有子技能均须遵循引用规范（来自编排入口继承）：

- 成文法优先：先援引法条，再辅以案例；不以案例替代法条
- 不确信条号：一律标 `[待验证]`，不臆造条号
- 案例引用：所有案号/指导案例编号默认标 `[待验证]`
- 指导性案例：标注「参考，不具判例法约束力」
- 引用来源：每条引用附加来源标签（`[模型知识 — 需验证]` / `[法宝]` / `[用户提供]` 等）
- 已核实锚点正确使用：民法典第188条（诉讼时效3年/起算点）；答辩期/举证期15日

参考：`litigation-legal/skills/_shared/civil-procedure-citations.md`（引用库）和 `litigation-legal/skills/_shared/legal-basis-conventions.md`（引用规范）。

---

## 完整流程输出清单

| 产出物 | 来源子技能 | 说明 |
|-------|---------|------|
| 争议焦点对照表 | dispute-focus | 焦点/我方观点/对方观点/证据 pivot/优劣势评估 |
| 事实论证段落 | fact-argumentation | 含事实-证据对应表 |
| 法律论证段落 | legal-argumentation | 含要件分析/涵摄表/法律依据清单 |
| 代理词全文 | representation-assembly | 开头+事实+法律+代理请求 |
| 辩论提纲 | representation-assembly | 庭审辩论要点，按焦点排序 |
| 开庭陈述（如适用）| representation-assembly | 精简版，限时 3-5 分钟 |
| 结案陈词 | representation-assembly | 总结强化我方立场 |
| 交付前检查报告 | representation-assembly | 特权/研究闸门/引用验证/格式合规 |
