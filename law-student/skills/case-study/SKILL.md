---
name: case-study
description: >
  案例研习编排入口。编排四个案例研习子技能（案件事实识别 → 法律问题定性 →
  多方观点论证 → 结论结构化输出），训练学习者掌握法律案例分析方法论。
  深度内容已拆分至子技能目录，见 skills/case-study/<子技能名>/SKILL.md。
argument-hint: "[案例材料或事实描述]"
---

# 案例研习（编排入口）

> **迁移说明**：原案例研习技能深度内容已拆分迁移至四个可独立触发的子技能。
> 本文件为编排入口，负责前置护栏和子技能调用顺序。
> 子技能路径：`law-student/skills/case-study/<子技能名>/SKILL.md`
>
> **教育声明**：本技能仅供法考学习训练使用，案例分析结论不构成法律建议。

---

## 目的

协调四个案例研习子技能，按法律案例分析的标准方法论（事实识别 → 法律定性 → 多方论证 → 结论输出）
系统训练学习者的案例分析能力，适应法考主观题的答题要求。

---

## 前置条件：加载学习者画像

**在开始案例分析之前，读取学习者配置文件 `law-student/CLAUDE.md`。**
如果配置文件缺失或仍有 `[PLACEHOLDER]`，显示以下提示：

> 我注意到你还没有配置法考学习档案——这有助于我根据你的学历背景、
> 薄弱学科和学习风格来调整案例分析的训练难度和讲解深度。
>
> **两个选择：**
> - 运行 `/law-student:cold-start-interview`（约5分钟）来配置你的学习档案。
> - 说 **「临时模式」**，我会使用通用默认值并在输出上标记 `[临时模式]`。

### 临时模式

`[临时模式]` 默认值：
- 身份：法学本科在校生（首次备考）
- 分析深度：详细逐步分析
- 法条引用：总是引用
- 学科侧重：无预设（根据案例内容自动识别）

---

## 子技能编排顺序

学习者可单独触发任一子技能（如只需练习事实识别，直接运行第1步），也可通过本入口运行完整案例研习：

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **case-fact-identification** | 案件事实识别与争议焦点归纳：区分法律事实与非事实、识别关键时间线与主体关系、归纳争议焦点 | `skills/case-study/case-fact-identification/SKILL.md` | `/law-student:case-fact-identification` |
| 2 | **legal-issue-analysis** | 法律问题定性与请求权基础分析：识别法律关系类型、检索请求权基础、法律要件拆解 | `skills/case-study/legal-issue-analysis/SKILL.md` | `/law-student:legal-issue-analysis` |
| 3 | **multi-perspective-argumentation** | 多方观点论证与利益衡量：原被告双方立场、不同学说观点、利益衡量分析 | `skills/case-study/multi-perspective-argumentation/SKILL.md` | `/law-student:multi-perspective-argumentation` |
| 4 | **conclusion-structured-output** | 结论形成与结构化表达：形成法律结论、IRAC/请求权基础答题结构、法考主观题答题模板 | `skills/case-study/conclusion-structured-output/SKILL.md` | `/law-student:conclusion-structured-output` |

**顺序说明**：事实识别在前（无事实则无分析）→ 法律定性（确定适用何种法律规则）→ 多方论证（培养辩证思维）→ 结论输出（训练答题格式）。

**单独触发场景（举例）**：
- 只想练习找争议焦点：`/law-student:case-fact-identification [案例材料]`
- 已有事实梳理，只想练习法律定性：`/law-student:legal-issue-analysis [事实摘要]`
- 只想练习多角度论证：`/law-student:multi-perspective-argumentation [法律问题]`
- 已有分析结论，只想练习答题结构：`/law-student:conclusion-structured-output [分析内容]`

---

## 入口级护栏

### 教育声明

所有案例研习输出须在首部或尾部标注：

```
[教育声明：本案例分析仅供法考学习训练，不构成针对具体案件的法律意见。]
```

### 事实不足时的处理

若案例材料信息不足以完成完整分析：
1. 列出缺失的关键事实
2. 标注 `[事实不足 — 需要补充：XXX]`
3. 基于现有事实进行可能方向的分析（标注假设前提）

### 成文法优先

分析须遵循成文法优先原则：
- 先检索现行成文法条文
- 指导性案例仅作参考，标注「参考」而非「依据」
- 所有具体条文号描述规则后标注 `[待验证]`

---

## 共享资源

进入子技能前，本入口统一读取以下共享资源：

- `law-student/skills/_shared/legal-basis-conventions.md` — 法考培训引用规范
- `law-student/skills/_shared/law-exam-citations.md` — 法考高频法条引用库
- `law-student/skills/_shared/practice-profile-schema.md` — 学习者配置契约

---

## 输出

完整案例研习流程由 `conclusion-structured-output` 子技能最终组装，输出：
- **案例分析训练报告**：事实梳理 + 争议焦点 + 法律定性 + 多方论证 + 结构化结论
- **答题要点提示**（可选）：对照法考主观题评分要点的自检清单
- 工作产物标记：「法考学习材料 — 仅供学习参考，不构成法律建议」
