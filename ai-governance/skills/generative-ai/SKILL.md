---
name: generative-ai
description: >
  生成式 AI 合规编排入口 — 将生成式 AI 合规拆分为四个可独立触发的子技能
  （服务类型与合规要求识别/训练数据合规/内容安全机制建设/用户保护与备案管理），
  可完整流程运行，也可单独触发任一子技能
---

> **迁移说明**：深度内容已拆分到子技能。本文件作为编排入口。

# generative-ai — 生成式 AI 合规编排入口

## 目的与整体流程概览

生成式 AI 合规帮助企业满足生成式人工智能服务管理暂行办法等法规的合规要求，包括服务类型识别、训练数据合规、内容安全机制建设、用户保护与备案管理。

**整体合规流程（顺序调用，也可单独触发任一子技能）**：

```
服务类型与合规要求识别 → 训练数据合规 → 内容安全机制建设 → 用户保护与备案管理
```

---

## 前置：加载实践配置

读取 `ai-governance/CLAUDE.md` 加载关键配置。若关键字段含 `[PLACEHOLDER]`，进入临时模式。

---

## 子技能编排顺序表

| 步骤 | 子技能名称 | 子技能路径 | 可单独触发 |
|-----|----------|----------|-----------|
| 1 | 服务类型与合规要求识别 | `skills/generative-ai/service-type-compliance-identification/SKILL.md` | `/ai-governance:service-type-compliance-identification` |
| 2 | 训练数据合规 | `skills/generative-ai/training-data-compliance/SKILL.md` | `/ai-governance:training-data-compliance` |
| 3 | 内容安全机制建设 | `skills/generative-ai/content-safety-mechanism/SKILL.md` | `/ai-governance:content-safety-mechanism` |
| 4 | 用户保护与备案管理 | `skills/generative-ai/user-protection-filing/SKILL.md` | `/ai-governance:user-protection-filing` |

---

## 入口级护栏

### 1. 行刑衔接升级
AI 服务违规可能升格刑事时，**立即强制升级执业律师**，标 `[强制升级 — 行刑衔接]`。

### 2. AI 治理合规立场护栏
- **绝不提供规避备案·伪造评估·绕过内容安全审查的方法**
- 识别即拒绝，标 `[合规边界 — 拒绝]`

### 3. 备案时限护栏
涉及备案义务时，强标时限提示。

---

## 法律依据引用规范

1. 引用 `ai-governance/skills/_shared/legal-basis-conventions.md`
2. 引用 `ai-governance/skills/_shared/ai-law-citations.md`
3. 生成式AI暂行办法一律描述规则 + `[待验证 — AI 治理法规快速演进]`
