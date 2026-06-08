---
name: cold-start-interview
description: >
  冷启动访谈编排入口：初始化诉讼仲裁实践配置文件（litigation-legal/CLAUDE.md），
  按四步子技能顺序收集身份与团队、风险校准、案件管理、文书风格配置。
  每个子技能也可单独触发以只更新对应章节：
  /litigation-legal:identity-team、:risk-calibration、:case-management、:document-style。
argument-hint: ""
---

# 冷启动访谈（编排入口）

> **迁移说明**：本文件已由 03-03 计划从扁平技能改造为编排入口。原有四部分访谈内容已深化迁移至四个子技能。律师可单独触发任一子技能，只更新对应章节，无需重跑整个访谈流程。

## 目的

通过结构化的访谈流程，收集诉讼律师的执业立场、案件管理偏好、风险校准和文书风格，初始化或更新 `litigation-legal/CLAUDE.md` 实践配置文件。

**配置写入目标**：`litigation-legal/CLAUDE.md`（唯一真相来源，遵循 `practice-profile-schema.md` 契约）

---

## 子技能编排顺序

| 步骤 | 子技能 | 写入章节 | 路径 | 单独触发命令 |
|------|-------|---------|------|-----------|
| 1 | `identity-team` | `## 我们是谁` / `## 谁在使用` / `## 可用集成` | `skills/cold-start-interview/identity-team/SKILL.md` | `/litigation-legal:identity-team` |
| 2 | `risk-calibration` | `## 风险校准`（严重程度/可能性/重大性阈值）| `skills/cold-start-interview/risk-calibration/SKILL.md` | `/litigation-legal:risk-calibration` |
| 3 | `case-management` | `## 利益冲突清除` / `## 证据保全` / `## 外部律师合作` / `## 和解策略` | `skills/cold-start-interview/case-management/SKILL.md` | `/litigation-legal:case-management` |
| 4 | `document-style` | `## 文书风格` / `## 输出` | `skills/cold-start-interview/document-style/SKILL.md` | `/litigation-legal:document-style` |

**完整重跑**：按步骤 1 → 2 → 3 → 4 顺序执行，律师在每步确认后继续，整个流程约 10-15 分钟。

**部分更新**：律师可单独触发某一子技能，只更新配置文件的对应章节，不影响其他章节的已有配置。

---

## 使用场景

| 场景 | 建议操作 |
|------|---------|
| 首次使用 litigation-legal 插件 | 运行完整冷启动访谈（本编排入口）|
| 换了新律所/公司 | 运行 `/litigation-legal:identity-team` 更新身份信息 |
| 调整风险阈值 | 运行 `/litigation-legal:risk-calibration` 更新风险校准 |
| 新增外部律师合作/调整和解策略 | 运行 `/litigation-legal:case-management` |
| 调整代理词风格/引用偏好 | 运行 `/litigation-legal:document-style` |
| 配置文件字段过期（超过6个月）| 运行完整冷启动访谈全面更新 |

---

## 写入规则

1. **唯一真相来源**：所有配置写入 `litigation-legal/CLAUDE.md`；不创建额外配置文件
2. **不静默覆盖**：已填充字段显示当前值，询问是否更新；不自动覆盖
3. **写入前确认**：每个子技能写入前展示将写入的内容，律师确认后方执行
4. **版本控制**：`litigation-legal/CLAUDE.md` 纳入 git 版本控制，可随时回滚
5. **法律事实合理性检查**：对用户口述的时效期间、条文号和金额阈值进行合理性检查（由 `risk-calibration` 子技能执行）

---

## 完整重跑 vs 部分更新

### 完整重跑

运行本编排入口（`/litigation-legal:cold-start-interview`），按顺序运行全部四个子技能：

```
[1/4] 身份与团队 → [2/4] 风险校准 → [3/4] 案件管理 → [4/4] 文书风格
```

每步结束后：
- 展示将写入的内容
- 律师确认写入
- 提示可选择继续下一步或中止

### 部分更新

单独触发某一子技能，只访谈并更新对应章节：

```bash
/litigation-legal:identity-team      # 只更新身份与团队
/litigation-legal:risk-calibration   # 只更新风险校准
/litigation-legal:case-management    # 只更新案件管理（利益冲突/证据保全/外律/和解）
/litigation-legal:document-style     # 只更新文书风格
```

---

## 配置缺失时的处理

当其他诉讼技能检测到 `litigation-legal/CLAUDE.md` 缺失或关键字段含 `[PLACEHOLDER]` 时，将提示：

> 我注意到你还没有配置你的诉讼实践档案——这是让我根据你的角色倾向、风险校准和文书风格来定制输出的关键。
>
> **两个选择：**
> - 运行 `/litigation-legal:cold-start-interview`（约 10-15 分钟）来配置你的档案
> - 说 **「临时模式」**，我会使用通用默认值并在每个输出上标记 `[临时模式 — 配置你的档案以获得定制输出]`

---

## 关联契约

- **配置契约**：`litigation-legal/skills/_shared/practice-profile-schema.md`
- **配置模板**：`litigation-legal/CLAUDE.md`
- **下游技能**：matter-intake / defense-drafting / representation-drafting / limitation-monitoring / evidence-management（均从 `litigation-legal/CLAUDE.md` 读取配置）
