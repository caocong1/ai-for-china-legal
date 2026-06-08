---
name: contract-drafting
description: >
  合同起草编排入口。将五个可独立触发的子技能（需求收集 / 框架设计 / 条款起草 /
  风险自查 / 输出生成）按顺序编排，也支持直接触发单一子技能。适用于买卖合同、
  技术服务合同、租赁合同等商事合同的完整起草流程。
argument-hint: "[合同类型] [我方立场] [关键条款要求]（若单独触发子技能：子技能名称）"
---

# 合同起草（contract-drafting）— 编排入口

> **迁移说明**：本文件由原「完整工作流 SKILL.md」改造为**编排入口**。
> 原有五步工作流（需求收集→框架设计→条款起草→风险自查→输出生成）已拆分为
> 五个独立可触发的子技能，内容完整迁移，语义无丢失。
> 子技能路径：`commercial-legal/skills/contract-drafting/<子技能名>/SKILL.md`

---

## 事项上下文

**事项上下文。** 检查实践级别 `commercial-legal/CLAUDE.md` 中的 `## 事项工作区` 部分。
如果未启用（默认），则使用实践级上下文。如果已启用且没有活跃事项，询问：
「这个起草属于哪个事项？运行事项工作区功能（如已集成）切换到对应事项，或说 `practice-level`。」
加载活跃事项的 `matter.md` 获取事项级上下文。输出写入事项文件夹。

---

## 子技能编排顺序

下列五个子技能按顺序执行，构成完整合同起草工作流。
**每个子技能均可单独触发**（通过 `/commercial-legal:<子技能名>` 或直接引用路径）。

| 步骤 | 子技能 | 路径 | 可单独触发 | 说明 |
|-----|-------|-----|---------|-----|
| 1 | `requirements-intake` | `skills/contract-drafting/requirements-intake/SKILL.md` | ✓ | 收集合同类型、当事方、金额、交付、特殊需求，信息不全时主动追问 |
| 2 | `framework-design` | `skills/contract-drafting/framework-design/SKILL.md` | ✓ | 确定标准条款清单+特别条款（数据/IP/竞业/担保），担保条款提示主体资格陷阱 |
| 3 | `clause-drafting` | `skills/contract-drafting/clause-drafting/SKILL.md` | ✓ | 逐条起草，引用民法典 577/585/496-498，遵循五原则，为最深子技能 |
| 4 | `risk-self-check` | `skills/contract-drafting/risk-self-check/SKILL.md` | ✓ | 五维度可勾选自查（结构/立场/常见风险/交易破坏者/效力瑕疵） |
| 5 | `output-generation` | `skills/contract-drafting/output-generation/SKILL.md` | ✓ | 整合输出：合同草案+起草说明+风险提示+谈判要点+法律依据 |

---

## 编排调用方式

### 完整流程（从头到尾）

触发条件：用户说「起草一份[合同类型]合同」或未指定子技能。

执行顺序：
```
requirements-intake → framework-design → clause-drafting → risk-self-check → output-generation
```

每步完成后，自动进入下一步，除非：
- 步骤 1 中信息不全（停下追问）
- 步骤 4 中出现 🔴 阻断风险（停下处理）

### 单一子技能触发

用户可随时直接触发某一子技能，例如：
- `/commercial-legal:requirements-intake` — 仅运行需求收集
- `/commercial-legal:clause-drafting` — 仅运行条款起草（需提供框架或描述）
- `/commercial-legal:risk-self-check` — 对现有草案运行风险自查

---

## 事项上下文护栏

### 配置文件读取

在任何子技能执行前，本编排入口须确认：
1. `commercial-legal/CLAUDE.md` 已加载
2. 关键字段（`## 审查立场`、`## 升级矩阵`）不含 `[PLACEHOLDER]`
3. 若含占位符，按 `skills/_shared/practice-profile-schema.md` §3.2 提示律师

### 立场一致性

本编排入口确保所有子技能使用**同一个**甲方/乙方立场：
- 步骤 1 确认立场，记录到会话上下文
- 步骤 2-5 均引用同一立场，不重复确认

### 升级触发

若在步骤 1 中合同金额超过实践配置文件升级阈值，本编排入口在进入步骤 2 前提示升级。

---

## 法律依据引用规范

所有子技能的法律依据引用须遵循：
- 前置：`commercial-legal/skills/_shared/legal-basis-conventions.md`（引用规范）
- 前置：`commercial-legal/skills/_shared/civil-code-contract-citations.md`（民法典合同编引用库）
- 按 法条 / 案例 / 学说 三类分类
- 模型回忆内容均标注 `[模型知识 — 需验证]` `[待验证]`

**核心法条**（子技能中重点引用）：

| 法条 | 子技能关联 | 来源标签 |
|------|---------|---------|
| 《民法典》第496-498条（格式条款） | clause-drafting | `[待验证]` |
| 《民法典》第506条（禁止免责） | clause-drafting, risk-self-check | `[待验证]` |
| 《民法典》第577条（违约责任） | clause-drafting | `[待验证]` |
| 《民法典》第584条（赔偿范围） | clause-drafting, output-generation | `[待验证]` |
| 《民法典》第585条（违约金） | clause-drafting, risk-self-check | `[待验证]` |
| 《民法典》第683条（担保主体） | framework-design, risk-self-check | `[待验证]` |

---

> 中国采成文法体系，本插件所有引用仅作参考，不具判例法约束力。
> 验证资源：国家法律法规数据库 https://flk.npc.gov.cn
