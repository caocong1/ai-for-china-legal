---
name: cold-start-interview
description: >
  冷启动访谈编排入口。编排四个访谈子技能（身份与学习画像 → 学习立场与目标 →
  薄弱环节与升级 → 学习风格与资源），将访谈结果写入 law-student/CLAUDE.md
  对应章节，使所有法考培训技能可按个性化配置运行。
  深度内容已拆分至子技能目录，见 skills/cold-start-interview/<子技能名>/SKILL.md。
argument-hint: ""
---

# 冷启动访谈（编排入口）

> **迁移说明**：原冷启动访谈内容已拆分迁移至四个可独立触发的访谈子技能。
> 本文件为编排入口，支持整体运行完整访谈或单独重跑某一部分配置更新。
> 子技能路径：`law-student/skills/cold-start-interview/<子技能名>/SKILL.md`
>
> **纠正说明**：访谈结果**填充 `law-student/CLAUDE.md` 对应章节**（散文模板，学习者可读可编辑），
> **不生成独立 YAML 文件**。

---

## 目的

通过结构化的访谈流程，将学习者的身份信息、学习目标、薄弱环节和学习偏好
写入 `law-student/CLAUDE.md`，使所有法考培训技能能够个性化运行。

访谈结果直接写入：

- `## 我是谁` ← identity-enterprise-profile
- `## 学习目标` ← study-stance-goals
- `## 薄弱环节` ← weakness-escalation
- `## 学习偏好` ← style-resources

---

## 遵循契约

本编排入口及四个访谈子技能遵循 `law-student/skills/_shared/practice-profile-schema.md` 定义的字段映射契约。

---

## 访谈总流程概览

1. 运行 `identity-enterprise-profile` → 填充身份与学习画像（约1-2分钟）
2. 运行 `study-stance-goals` → 确认学习目标与备考计划（约2-3分钟）
3. 运行 `weakness-escalation` → 识别薄弱环节与升级规则（约1-2分钟）
4. 运行 `style-resources` → 选择学习风格与资源（约1-2分钟）

整体访谈约 5-10 分钟。完成后，`law-student/CLAUDE.md` 的所有 `[PLACEHOLDER]` 替换为实际配置。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|-----------|---------|
| 1 | identity-enterprise-profile | 身份信息、学历背景、备考次数、目标考试时间 → 写入 `## 我是谁` | `skills/cold-start-interview/identity-enterprise-profile/SKILL.md` | `/law-student:identity-enterprise-profile` |
| 2 | study-stance-goals | 目标分数、考试侧重、每日学习时间、备考阶段 → 写入 `## 学习目标` | `skills/cold-start-interview/study-stance-goals/SKILL.md` | `/law-student:study-stance-goals` |
| 3 | weakness-escalation | 各学科自评、错题类型、历史成绩、升级规则 → 写入 `## 薄弱环节` | `skills/cold-start-interview/weakness-escalation/SKILL.md` | `/law-student:weakness-escalation` |
| 4 | style-resources | 学习风格、教材、刷题工具、笔记方式、输出偏好 → 写入 `## 学习偏好` | `skills/cold-start-interview/style-resources/SKILL.md` | `/law-student:style-resources` |

---

## 入口级护栏

### 写入前法律事实合理性检查

在每个子技能将用户口述的信息写入 `law-student/CLAUDE.md` 之前，须对照 `practice-profile-schema.md` 的检查规则进行校验：

- 分数线以当年司法部公告为准
- 考试日期以当年司法部公告为准
- 用户口述的大纲变化以官方发布为准

### 重跑与单独更新说明

| 场景 | 操作方式 |
|------|---------|
| 备考阶段变化（如从基础进入冲刺） | 单独重跑 `/law-student:study-stance-goals` |
| 发现新的薄弱学科 | 单独重跑 `/law-student:weakness-escalation` |
| 更换教材或刷题工具 | 单独重跑 `/law-student:style-resources` |
| 直接编辑 CLAUDE.md | 直接编辑即可，无需重跑访谈 |

### 临时模式

如果用户不想运行完整访谈，可在任何法考培训技能中说**「临时模式」**，系统将使用 `practice-profile-schema.md` 定义的临时默认值运行。
