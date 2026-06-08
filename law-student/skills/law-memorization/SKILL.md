---
name: law-memorization
description: >
  法条记忆编排入口。编排四个法条记忆子技能（法律体系图谱 → 重点法条识别 →
  记忆技巧应用 → 间隔复习自测），系统训练学习者高效记忆法考核心法条。
  深度内容已拆分至子技能目录，见 skills/law-memorization/<子技能名>/SKILL.md。
argument-hint: "[学科名称或知识点]"
---

# 法条记忆（编排入口）

> **迁移说明**：原法条记忆技能深度内容已拆分迁移至四个可独立触发的子技能。
> 本文件为编排入口，负责前置护栏和子技能调用顺序。
> 子技能路径：`law-student/skills/law-memorization/<子技能名>/SKILL.md`
>
> **教育声明**：本技能辅助法条记忆训练，记忆效果因人而异，建议结合教材系统学习。

---

## 目的

协调四个法条记忆子技能，帮助学习者建立系统的法条知识体系、识别高频考点、
运用多种记忆技巧、通过间隔复习巩固记忆，最终提升法考客观题的法条应用能力。

---

## 前置条件：加载学习者画像

**在开始记忆训练之前，读取学习者配置文件 `law-student/CLAUDE.md`。**
如果配置文件缺失或仍有 `[PLACEHOLDER]`，显示以下提示：

> 我注意到你还没有配置法考学习档案——这有助于我根据你的薄弱学科和学习风格
> 来定制记忆训练计划。
>
> **两个选择：**
> - 运行 `/law-student:cold-start-interview`（约5分钟）来配置你的学习档案。
> - 说 **「临时模式」**，我会使用通用默认值并在输出上标记 `[临时模式]`。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **legal-system-mapping** | 法律体系与部门法知识图谱：构建学科框架、法条关联网络、体系化记忆基础 | `skills/law-memorization/legal-system-mapping/SKILL.md` | `/law-student:legal-system-mapping` |
| 2 | **key-provision-identification** | 重点法条识别与高频考点：按学科标记高频/中频/低频法条，聚焦核心考点 | `skills/law-memorization/key-provision-identification/SKILL.md` | `/law-student:key-provision-identification` |
| 3 | **memory-technique-application** | 记忆技巧应用：对比记忆、联想记忆、案例串联、口诀记忆、图表记忆等 | `skills/law-memorization/memory-technique-application/SKILL.md` | `/law-student:memory-technique-application` |
| 4 | **spaced-repetition-review** | 间隔复习与自测：制定复习计划、生成自测题目、追踪记忆强度 | `skills/law-memorization/spaced-repetition-review/SKILL.md` | `/law-student:spaced-repetition-review` |

**顺序说明**：体系图谱在前（建立框架）→ 重点识别（确定优先级）→ 记忆技巧（高效编码）→ 间隔复习（长期巩固）。

---

## 入口级护栏

### 教育声明

所有记忆训练输出须标注：

```
[教育声明：本内容仅供法考学习参考，法条内容请以教材和国家法律法规数据库为准。]
```

### 法条准确性护栏

1. **所有具体条文号须标注 `[待验证]`**，建议学习者对照教材核实
2. **记忆口诀和联想方法**可能过度简化法律规则，须提醒学习者回归法条原文
3. **不得因记忆训练而产生对法条的错误理解**

---

## 共享资源

- `law-student/skills/_shared/legal-basis-conventions.md` — 法考培训引用规范
- `law-student/skills/_shared/law-exam-citations.md` — 法考高频法条引用库
- `law-student/skills/_shared/practice-profile-schema.md` — 学习者配置契约

---

## 输出

完整记忆训练流程输出：
- **知识图谱**：学科法律体系结构图
- **重点法条清单**：按优先级排序的核心法条
- **记忆卡片**：含记忆技巧的法条记忆卡
- **复习计划**：间隔复习时间表
- 工作产物标记：「法考学习材料 — 仅供学习参考，不构成法律建议」
