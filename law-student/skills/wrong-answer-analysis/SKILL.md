---
name: wrong-answer-analysis
description: >
  错题分析编排入口（新增技能）。编排四个错题分析子技能（错误模式识别 →
  知识薄弱点诊断 → 针对性补强方案 → 进步追踪），系统化分析学习者的错题，
  找到根本原因并制定补强方案。
  深度内容已拆分至子技能目录，见 skills/wrong-answer-analysis/<子技能名>/SKILL.md。
argument-hint: "[错题内容或错题记录]"
---

# 错题分析（编排入口）

> **本技能为新增技能**，专门针对法考备考中的错题进行系统化分析。
> 子技能路径：`law-student/skills/wrong-answer-analysis/<子技能名>/SKILL.md`
>
> **教育声明**：错题分析仅供学习改进参考，帮助识别薄弱环节，不替代系统学习。

---

## 目的

协调四个错题分析子技能，帮助学习者从错题中发现规律性的错误模式，
诊断知识薄弱环节，制定针对性的补强方案，并追踪补强效果。

---

## 前置条件：加载学习者画像

**在开始错题分析之前，读取学习者配置文件 `law-student/CLAUDE.md`。**
如果配置文件缺失或仍有 `[PLACEHOLDER]`，显示以下提示：

> 我注意到你还没有配置法考学习档案——错题分析需要参考你的薄弱学科和历史成绩
> 来准确诊断错误原因。
>
> **两个选择：**
> - 运行 `/law-student:cold-start-interview`（约5分钟）来配置你的学习档案。
> - 说 **「临时模式」**，我会使用通用默认值并在输出上标记 `[临时模式]`。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **error-pattern-recognition** | 错误模式识别：分类错误类型、识别重复错误模式、发现系统性错误 | `skills/wrong-answer-analysis/error-pattern-recognition/SKILL.md` | `/law-student:error-pattern-recognition` |
| 2 | **knowledge-gap-diagnosis** | 知识薄弱点诊断：定位知识漏洞的学科和章节、评估薄弱程度 | `skills/wrong-answer-analysis/knowledge-gap-diagnosis/SKILL.md` | `/law-student:knowledge-gap-diagnosis` |
| 3 | **targeted-remediation** | 针对性补强方案：制定个性化补强计划、推荐学习资源和方法 | `skills/wrong-answer-analysis/targeted-remediation/SKILL.md` | `/law-student:targeted-remediation` |
| 4 | **progress-tracking** | 进步追踪与自测：追踪补强效果、生成阶段性评估报告 | `skills/wrong-answer-analysis/progress-tracking/SKILL.md` | `/law-student:progress-tracking` |

**顺序说明**：错误模式识别在前（发现是什么错）→ 知识薄弱点诊断（找出为什么错）→ 补强方案（解决怎么补）→ 进步追踪（检验效果）。

---

## 入口级护栏

### 教育声明

所有错题分析输出须标注：

```
[教育声明：本错题分析仅供学习改进参考，不替代系统学习和教师指导。]
```

### 错题输入格式

支持以下错题输入方式：
1. **文字描述**：直接输入错题的题干和选项
2. **错题截图描述**：描述错题内容（无法直接识别图片时）
3. **批量导入**：一次提交多道错题

### 分析客观性

- 错题分析须客观，不批评学习者
- 错误归因须基于证据（错题内容），不臆断
- 薄弱点诊断须具体到知识点层级，不泛泛而谈

---

## 共享资源

- `law-student/skills/_shared/legal-basis-conventions.md` — 法考培训引用规范
- `law-student/skills/_shared/law-exam-citations.md` — 法考高频法条引用库
- `law-student/skills/_shared/practice-profile-schema.md` — 学习者配置契约

---

## 输出

完整错题分析流程输出：
- **错题分析报告**：错误模式 + 薄弱点诊断 + 补强方案 + 进步追踪
- **补强计划表**：按优先级排序的补强任务和时间安排
- **阶段评估报告**：补强效果评估和后续建议
- 工作产物标记：「法考学习材料 — 仅供学习参考，不构成法律建议」
