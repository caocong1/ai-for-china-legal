---
name: project-status
description: 检查项目里程碑进度和当前状态
source: auto-skill
extracted_at: '2026-06-03T07:26:04.463Z'
---

# Project Status — 检查项目进度

读取 `.planning/ROADMAP.md` 和 `.planning/STATE.md` 文件，显示当前项目的里程碑进度。

## 步骤

1. **读取 ROADMAP.md** — 显示所有阶段及状态
2. **读取 STATE.md** — 显示当前里程碑、进度百分比、当前阶段
3. **汇总输出** — 简洁展示完成度和下一步建议

## 输出格式

```
## 项目状态

| 指标 | 值 |
|------|-----|
| 里程碑 | vX.X |
| 完成度 | X% (N/17 阶段) |
| 当前阶段 | Phase N - 名称 |

### 阶段列表
[表格形式显示各阶段状态]

### 下一步
[基于当前状态的建议]
```
