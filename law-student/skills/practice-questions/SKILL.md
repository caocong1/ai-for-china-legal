---
name: practice-questions
description: >
  模拟题生成编排入口。编排四个模拟题子技能（题型设计 → 情景构建 → 答案解析 →
  难度校准），系统生成法考模拟题供学习者训练。
  深度内容已拆分至子技能目录，见 skills/practice-questions/<子技能名>/SKILL.md。
argument-hint: "[学科名称或知识点范围]"
---

# 模拟题生成（编排入口）

> **迁移说明**：原模拟题生成技能深度内容已拆分迁移至四个可独立触发的子技能。
> 本文件为编排入口，负责前置护栏和子技能调用顺序。
> 子技能路径：`law-student/skills/practice-questions/<子技能名>/SKILL.md`
>
> **教育声明**：本技能生成的模拟题仅供学习训练，不保证与真题完全一致。

---

## 目的

协调四个模拟题子技能，按法考出题标准生成高质量的模拟题，
帮助学习者检验学习效果、适应考试题型、提升应试能力。

---

## 前置条件：加载学习者画像

**在生成模拟题之前，读取学习者配置文件 `law-student/CLAUDE.md`。**
如果配置文件缺失或仍有 `[PLACEHOLDER]`，显示以下提示：

> 我注意到你还没有配置法考学习档案——这有助于我根据你的薄弱学科和备考阶段
> 来定制模拟题的难度和考查范围。
>
> **两个选择：**
> - 运行 `/law-student:cold-start-interview`（约5分钟）来配置你的学习档案。
> - 说 **「临时模式」**，我会使用通用默认值并在输出上标记 `[临时模式]`。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **question-type-design** | 题型设计与知识点覆盖：选择题/判断题/简答题/案例分析题的出题设计 | `skills/practice-questions/question-type-design/SKILL.md` | `/law-student:question-type-design` |
| 2 | **scenario-construction** | 案例情景构建：为案例型题目构建合理的法律情景和事实背景 | `skills/practice-questions/scenario-construction/SKILL.md` | `/law-student:scenario-construction` |
| 3 | **answer-key-explanation** | 答案与解析撰写：生成标准答案、详细解析、法律依据和易错点说明 | `skills/practice-questions/answer-key-explanation/SKILL.md` | `/law-student:answer-key-explanation` |
| 4 | **difficulty-calibration** | 难度校准与区分度：根据学习者水平调整题目难度，确保区分度 | `skills/practice-questions/difficulty-calibration/SKILL.md` | `/law-student:difficulty-calibration` |

---

## 入口级护栏

### 教育声明

所有模拟题输出须标注：

```
[教育声明：本模拟题仅供学习训练使用，不保证与法考真题一致。法考备考请以当年大纲和指定教材为准。]
```

### 出题准确性护栏

1. **题目涉及的法律规定须准确**，所有条文号标注 `[待验证]`
2. **不得生成可能误导学习者的争议性题目**（除非明确标注争议点）
3. **答案解析须完整**，不能仅给答案不给理由
4. **避免与真题高度雷同**（防止学习者误以为是真题）

---

## 共享资源

- `law-student/skills/_shared/legal-basis-conventions.md` — 法考培训引用规范
- `law-student/skills/_shared/law-exam-citations.md` — 法考高频法条引用库
- `law-student/skills/_shared/practice-profile-schema.md` — 学习者配置契约

---

## 输出

完整模拟题生成流程输出：
- **模拟试卷**：含题目、选项、答题纸
- **答案与解析**：每题含标准答案、法律依据、详细解析
- **难度说明**：每题难度标注和考查知识点
- 工作产物标记：「法考学习材料 — 仅供学习参考，不构成法律建议」
