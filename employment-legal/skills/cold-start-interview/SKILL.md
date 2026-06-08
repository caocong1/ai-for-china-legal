---
name: cold-start-interview
description: >
  冷启动访谈编排入口。编排四个访谈子技能（身份与团队 → 审查立场 → 风险与升级 → 文书风格与地方性规定），
  将访谈结果写入 employment-legal/CLAUDE.md 对应章节，使所有劳动人事技能可按个性化配置运行。
  支持整体运行或单独重跑某一部分。深度内容已拆分至子技能目录，见 skills/cold-start-interview/<子技能名>/SKILL.md。
argument-hint: ""
---

# 冷启动访谈（编排入口）

> **迁移说明**：原冷启动访谈内容（基本信息、审查立场、地方性规定、文书风格四部分）已拆分迁移至四个可独立触发的访谈子技能。本文件为编排入口，支持整体运行完整访谈或单独重跑某一部分配置更新。子技能路径：`employment-legal/skills/cold-start-interview/<子技能名>/SKILL.md`。
>
> **纠正说明**：访谈结果**填充 `employment-legal/CLAUDE.md` 对应章节**（散文模板，律师可读可编辑，可 git 版本控制），**不生成独立 YAML 文件**。每次访谈子技能运行后，更新 `employment-legal/CLAUDE.md` 的对应章节，其他章节不受影响。

---

## 目的

通过结构化的访谈流程，将律师/HR 的执业立场、风险偏好、升级矩阵和文书风格写入 `employment-legal/CLAUDE.md`，使所有劳动人事技能能够个性化运行。

访谈结果直接写入：

- `## 我们是谁` / `## 谁在使用` / `## 可用集成` ← identity-team
- `## 审查立场`（雇佣/解雇/竞业） ← review-stance
- `## 风险校准` / `## 升级矩阵` ← risk-escalation
- `## 文书风格` / `## 输出` / `## 共享护栏 → 地方性规定识别` ← style-local-rules

---

## 遵循契约

本编排入口及四个访谈子技能遵循 `employment-legal/skills/_shared/practice-profile-schema.md` 定义的字段映射契约，确保：

1. 所有字段写入到 `employment-legal/CLAUDE.md` 的正确章节
2. 用户口述的法律事实（条款号/金额/期限）在写入前经过合理性检查
3. 访谈支持重跑/单独更新/直接编辑/git 版本控制

---

## 访谈总流程概览

1. 运行 `identity-team` → 填充身份与团队信息（约 1-2 分钟）
2. 运行 `review-stance` → 确认审查立场（约 2-3 分钟）
3. 运行 `risk-escalation` → 设置风险校准与升级矩阵（约 1-2 分钟）
4. 运行 `style-local-rules` → 选择文书风格与地方性规定（约 1-2 分钟）

整体访谈约 5-10 分钟。完成后，`employment-legal/CLAUDE.md` 的所有 `[PLACEHOLDER]` 替换为实际配置，所有劳动人事技能可据此个性化运行。

---

## 子技能编排顺序

律师/HR 可单独触发任一访谈子技能（只更新 `employment-legal/CLAUDE.md` 的对应部分），也可通过本入口完整运行：

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|-----------|---------|
| 1 | identity-team（身份与团队） | 公司/律所名称、团队规模、工作地点、使用角色、集成情况 → 写入 `## 我们是谁`/`## 谁在使用`/`## 可用集成` | `skills/cold-start-interview/identity-team/SKILL.md` | `/employment-legal:identity-team` |
| 2 | review-stance（审查立场） | 用人单位方/劳动者方视角、试用期/工时/社保/竞业标准立场、解雇经济补偿倾向(N/N+1/2N) → 写入 `## 审查立场` | `skills/cold-start-interview/review-stance/SKILL.md` | `/employment-legal:review-stance` |
| 3 | risk-escalation（风险与升级） | 风险等级定义确认、升级矩阵（角色权限/触发条件/自动升级）→ 写入 `## 风险校准`/`## 升级矩阵` | `skills/cold-start-interview/risk-escalation/SKILL.md` | `/employment-legal:risk-escalation` |
| 4 | style-local-rules（文书风格与地方性规定） | 雇佣/解雇/备忘录文书风格、输出格式偏好、工作地点地方性规定勾选 → 写入 `## 文书风格`/`## 输出`/`## 共享护栏` | `skills/cold-start-interview/style-local-rules/SKILL.md` | `/employment-legal:style-local-rules` |

---

## 入口级护栏

### 写入前法律事实合理性检查

在每个子技能将用户口述的法律事实写入 `employment-legal/CLAUDE.md` 之前，须对照 `employment-legal/skills/_shared/practice-profile-schema.md` §6 的合理性检查规则进行校验。主要检查点：

- 竞业限制期限不超过 2 年（《劳动合同法》第24条，已核实）
- 经济补偿 2N 仅适用于违法解除（第87条，已核实）
- 仲裁时效为 1 年（《劳动争议调解仲裁法》第27条，已核实）
- 其他用户口述条款号/金额/期限标注 `[前提 flagged — 需验证]`

### 重跑与单独更新说明

| 场景 | 操作方式 |
|------|---------|
| 服务对象发生变化（如从专做用人单位方转为兼做劳动者方） | 单独重跑 `/employment-legal:review-stance` |
| 更换主要工作地点 | 单独重跑 `/employment-legal:style-local-rules` |
| 升级矩阵人员变动 | 单独重跑 `/employment-legal:risk-escalation` |
| 直接编辑 CLAUDE.md | 直接编辑即可，无需重跑访谈 |
| git 版本控制 | `git log --oneline employment-legal/CLAUDE.md` 查看历史；`git diff HEAD~1 employment-legal/CLAUDE.md` 查看变更 |

### 临时模式

如果用户不想运行完整访谈，可在任何劳动人事技能中说**「临时模式」**，系统将使用 `practice-profile-schema.md` §3.3 定义的临时默认值运行，并在输出上标记 `[临时模式 — 配置你的档案以获得定制输出]`。
