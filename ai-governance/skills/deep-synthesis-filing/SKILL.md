---
name: deep-synthesis-filing
description: >
  深度合成备案编排入口 — 将深度合成备案拆分为四个可独立触发的子技能
  （深度合成服务识别与分类/备案材料准备/安全评估与备案提交/备案后合规管理），
  可完整流程运行，也可单独触发任一子技能
---

> **迁移说明**：深度内容已拆分到子技能，路径为 `skills/deep-synthesis-filing/<子技能名>/SKILL.md`。本文件作为编排入口，负责加载立场护栏与子技能调度。

# deep-synthesis-filing — 深度合成备案编排入口

## 目的与整体流程概览

深度合成备案帮助企业（及其律师/合规官/法务）完成深度合成服务备案义务，包括识别深度合成服务类型、准备备案材料、完成安全评估与备案提交、备案后持续合规管理。

**整体备案流程（顺序调用，也可单独触发任一子技能）**：

```
深度合成服务识别与分类 → 备案材料准备 → 安全评估与备案提交 → 备案后合规管理
```

---

## 前置：加载实践配置

### 读取 ai-governance/CLAUDE.md

在启动任何子技能前，读取 `ai-governance/CLAUDE.md` 加载以下关键配置：

1. **执业角色与企业画像**（`## 我们是谁`）：行业、是否提供AI相关服务、AI服务类型描述 → 驱动深度合成服务识别范围
2. **服务立场**（`## 合规与监管立场`）：深度合成备案 → 决定各子技能审查侧重
3. **监管关系**（`## 合规与监管立场` > `### 监管关系`）：主动合规 vs 被动应对
4. **合规严格度**（`## 合规与监管立场` > `### 合规严格度`）：保守/平衡/务实
5. **AI 合规风险校准**（`## AI 合规风险校准`）
6. **升级矩阵**（`## 升级矩阵`）：强制升级触发条件

### 临时模式

若 `ai-governance/CLAUDE.md` 不存在或关键字段含 `[PLACEHOLDER]`，进入临时模式并标注 `[临时模式 — 请运行冷启动访谈完成配置]`。

---

## 子技能编排顺序表

| 步骤 | 子技能名称 | 子技能路径 | 可单独触发 | 主要内容 |
|-----|----------|----------|-----------|---------|
| 1 | 深度合成服务识别与分类 | `skills/deep-synthesis-filing/deep-synthesis-scope-identification/SKILL.md` | `/ai-governance:deep-synthesis-scope-identification` | 识别企业是否提供深度合成服务，分类确定适用的备案要求 |
| 2 | 备案材料准备 | `skills/deep-synthesis-filing/filing-material-preparation/SKILL.md` | `/ai-governance:filing-material-preparation` | 按备案要求准备材料清单与内容 |
| 3 | 安全评估与备案提交 | `skills/deep-synthesis-filing/security-assessment-filing/SKILL.md` | `/ai-governance:security-assessment-filing` | 完成安全评估并通过备案系统提交 |
| 4 | 备案后合规管理 | `skills/deep-synthesis-filing/post-filing-compliance/SKILL.md` | `/ai-governance:post-filing-compliance` | 备案后信息更新·变更管理·持续合规 |

---

## 入口级护栏

### 1. 行刑衔接升级

识别到 AI 服务违规可能升格刑事（侵犯公民个人信息·帮助信息网络犯罪活动等）时：
- **立即强制升级执业律师**，标 `[强制升级 — 行刑衔接]`
- 提示与 criminal-compliance 插件衔接

### 2. AI 治理合规立场护栏

- **绝不提供规避备案·虚假安全评估·绕过内容安全审查的方法**
- 识别此类需求即拒绝，标 `[合规边界 — 拒绝]`

### 3. 备案时限护栏

涉及备案义务或整改期限时：
- 强标备案时限提示
- 不得静默放任时限流逝

---

## 法律依据引用规范

所有子技能须遵循：

1. 引用 `ai-governance/skills/_shared/legal-basis-conventions.md`
2. 引用 `ai-governance/skills/_shared/ai-law-citations.md`
3. AI 治理专项规章一律描述规则 + `[待验证 — AI 治理法规快速演进]`
4. 刑法相关罪名条号一律 `[条号待验证]`
