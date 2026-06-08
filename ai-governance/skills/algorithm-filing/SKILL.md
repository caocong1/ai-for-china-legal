---
name: algorithm-filing
description: >
  算法备案编排入口 — 将算法备案拆分为四个可独立触发的子技能
  （算法类型识别与分类/备案要求分析/备案材料准备与提交/备案后变更管理），
  可完整流程运行，也可单独触发任一子技能
---

> **迁移说明**：深度内容已拆分到子技能。本文件作为编排入口，负责加载立场护栏与子技能调度。

# algorithm-filing — 算法备案编排入口

## 目的与整体流程概览

算法备案帮助企业（及其律师/合规官/法务）完成算法推荐服务备案义务，包括识别算法类型、分析备案要求、准备备案材料并完成提交、备案后变更管理。

**整体备案流程（顺序调用，也可单独触发任一子技能）**：

```
算法类型识别与分类 → 备案要求分析 → 备案材料准备与提交 → 备案后变更管理
```

---

## 前置：加载实践配置

读取 `ai-governance/CLAUDE.md` 加载关键配置：行业、AI服务类型、服务立场、监管关系、合规严格度、风险校准、升级矩阵。

若关键字段含 `[PLACEHOLDER]`，进入临时模式并标注 `[临时模式 — 请运行冷启动访谈完成配置]`。

---

## 子技能编排顺序表

| 步骤 | 子技能名称 | 子技能路径 | 可单独触发 |
|-----|----------|----------|-----------|
| 1 | 算法类型识别与分类 | `skills/algorithm-filing/algorithm-type-identification/SKILL.md` | `/ai-governance:algorithm-type-identification` |
| 2 | 备案要求分析 | `skills/algorithm-filing/filing-requirement-analysis/SKILL.md` | `/ai-governance:filing-requirement-analysis` |
| 3 | 备案材料准备与提交 | `skills/algorithm-filing/filing-material-preparation/SKILL.md` | `/ai-governance:algorithm-filing-material-preparation` |
| 4 | 备案后变更管理 | `skills/algorithm-filing/post-filing-change-management/SKILL.md` | `/ai-governance:post-filing-change-management` |

---

## 入口级护栏

### 1. 行刑衔接升级
识别到算法服务违规可能升格刑事时，**立即强制升级执业律师**，标 `[强制升级 — 行刑衔接]`。

### 2. AI 治理合规立场护栏
- **绝不提供规避算法备案义务的方法**
- 识别此类需求即拒绝，标 `[合规边界 — 拒绝]`

### 3. 备案时限护栏
涉及备案义务时，强标备案时限提示，不得静默放任。

---

## 法律依据引用规范

1. 引用 `ai-governance/skills/_shared/legal-basis-conventions.md`
2. 引用 `ai-governance/skills/_shared/ai-law-citations.md`
3. AI 治理专项规章一律描述规则 + `[待验证 — AI 治理法规快速演进]`
