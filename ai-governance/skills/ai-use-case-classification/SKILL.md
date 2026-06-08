---
name: ai-use-case-classification
description: >
  AI 使用案例分类编排入口 — 将 AI 使用案例分类拆分为四个可独立触发的子技能
  （应用场景盘点/风险等级分类/合规要求映射/分类报告输出），
  可完整流程运行，也可单独触发任一子技能
---

> **迁移说明**：深度内容已拆分到子技能。本文件作为编排入口。

# ai-use-case-classification — AI 使用案例分类编排入口

## 目的与整体流程概览

AI 使用案例分类帮助企业系统盘点所有 AI 应用场景，分类评估合规风险等级，映射适用的合规要求，输出完整的 AI 使用案例分类报告。

**整体分类流程（顺序调用，也可单独触发任一子技能）**：

```
应用场景盘点 → 风险等级分类 → 合规要求映射 → 分类报告输出
```

---

## 前置：加载实践配置

读取 `ai-governance/CLAUDE.md` 加载关键配置。若关键字段含 `[PLACEHOLDER]`，进入临时模式。

---

## 子技能编排顺序表

| 步骤 | 子技能名称 | 子技能路径 | 可单独触发 |
|-----|----------|----------|-----------|
| 1 | 应用场景盘点 | `skills/ai-use-case-classification/use-case-inventory/SKILL.md` | `/ai-governance:use-case-inventory` |
| 2 | 风险等级分类 | `skills/ai-use-case-classification/risk-level-classification/SKILL.md` | `/ai-governance:risk-level-classification` |
| 3 | 合规要求映射 | `skills/ai-use-case-classification/compliance-requirement-mapping/SKILL.md` | `/ai-governance:compliance-requirement-mapping` |
| 4 | 分类报告输出 | `skills/ai-use-case-classification/classification-report-output/SKILL.md` | `/ai-governance:classification-report-output` |

---

## 入口级护栏

### 1. 行刑衔接升级
识别到 AI 应用场景可能涉及刑事风险时，**立即强制升级执业律师**，标 `[强制升级 — 行刑衔接]`。

### 2. AI 治理合规立场护栏
- **绝不提供隐瞒 AI 应用场景·规避合规评估的方法**
- 识别即拒绝，标 `[合规边界 — 拒绝]`

---

## 法律依据引用规范

1. 引用 `ai-governance/skills/_shared/legal-basis-conventions.md`
2. 引用 `ai-governance/skills/_shared/ai-law-citations.md`
3. 所有 AI 治理规章一律描述规则 + `[待验证 — AI 治理法规快速演进]`
