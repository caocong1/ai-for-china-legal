---
name: cold-start-interview
description: 监管合规冷启动访谈编排入口——按顺序调用四个子技能，将访谈结果写入 regulatory-legal/CLAUDE.md 各章节
---

# 冷启动访谈 — 监管合规（编排入口）

## 目的

通过四个子技能的顺序访谈，完成 `regulatory-legal/CLAUDE.md` 实践配置文件的初始化或增量更新。

**重要纠正**：访谈结果写入 `regulatory-legal/CLAUDE.md` 的各章节，**不是**生成独立的 YAML 文件。CLAUDE.md 是所有 regulatory-legal 技能读取立场与配置的唯一来源。

## 访谈子技能顺序表

| 顺序 | 子技能 | 路径 | 斜杠命令 | 采集内容 | 写入 CLAUDE.md 章节 |
|------|--------|------|---------|---------|-------------------|
| 1 | 身份与企业画像 | `cold-start-interview/identity-enterprise-profile/` | `/regulatory-legal:cold-start-interview` → 身份与企业画像 | 执业角色、主要服务事项、企业画像（所属行业·主管监管机关·规模·业务模式·涉外·受罚·风险领域·痛点·团队·负责人） | `## 我们是谁` + `## 谁在使用` |
| 2 | 合规立场与服务范围 | `cold-start-interview/compliance-stance-scope/` | `/regulatory-legal:cold-start-interview` → 合规立场与服务范围 | 整体服务立场、合规严格度、监管关系 | `## 合规与监管立场`（含 `### 合规严格度` + `### 监管关系`） |
| 3 | 风险与升级 | `cold-start-interview/risk-escalation/` | `/regulatory-legal:cold-start-interview` → 风险与升级 | 行政违法风险等级定义、角色权限、强制升级触发偏好、行政程序时限护栏偏好 | `## 行政违法风险校准` + `## 升级矩阵` |
| 4 | 文书风格与监管资源 | `cold-start-interview/style-regulatory-resources/` | `/regulatory-legal:cold-start-interview` → 文书风格与监管资源 | 四类文书风格偏好、可用监管资源、地方性法规与裁量基准差异 | `## 文书风格` + `## 可用集成` + `## 共享护栏`（`### 地方性法规与裁量基准提示`） |

## 流程

### 初始化

1. 检查 `regulatory-legal/CLAUDE.md` 是否存在。
2. 如不存在：从模板创建 CLAUDE.md（使用 `references/` 目录下的模板或内嵌默认结构），所有字段为 `[PLACEHOLDER]`。
3. 如已存在：读取现有内容，进入增量更新模式。

### 顺序执行

按上表顺序依次调用四个子技能。每个子技能完成后：

1. 将采集结果写入 CLAUDE.md 对应章节。
2. 向用户展示写入内容摘要，确认无误。
3. 进入下一个子技能。

### 完成

全部四个子技能完成后：

1. 输出 CLAUDE.md 更新摘要——列出所有已填写/更新的字段。
2. 提示用户可直接编辑 CLAUDE.md 进行微调。
3. 提示可重新运行本访谈更新特定章节。

## 支持的操作模式

### 完整重新运行

按顺序执行全部四个子技能，覆盖 CLAUDE.md 全部配置章节。

```
/regulatory-legal:cold-start-interview 首次运行
```

### 增量更新

读取 CLAUDE.md 现有内容，仅更新用户选择修改的章节。

```
/regulatory-legal:cold-start-interview 更新
```

### 单章节更新

仅运行指定的子技能，更新对应的 CLAUDE.md 章节。

```
/regulatory-legal:cold-start-interview 身份与企业画像
/regulatory-legal:cold-start-interview 合规立场与服务范围
/regulatory-legal:cold-start-interview 风险与升级
/regulatory-legal:cold-start-interview 文书风格与监管资源
```

### 直接编辑

用户可直接编辑 `regulatory-legal/CLAUDE.md`，无需运行访谈。编辑后所有 regulatory-legal 技能自动从更新后的配置读取。

### Git 版本控制

建议在每次 CLAUDE.md 更新后提交 git，以便追溯配置变更历史。

```
git add regulatory-legal/CLAUDE.md
git commit -m "更新监管合规实践配置"
```

## 初始化异常处理

- CLAUDE.md 不存在且无法创建模板：提示用户检查插件安装，中止访谈。
- CLAUDE.md 格式异常（章节缺失）：尝试识别已有章节，对缺失章节使用 PLACEHOLDER 补充，告知用户。
- 子技能运行中用户中断：已写入的内容保留，下次运行时从断点继续或重新运行该子技能。

## 护栏

- **不生成独立 YAML 文件**：所有配置写入 CLAUDE.md 章节。
- **不覆盖用户未确认的内容**：每个子技能写入前须用户确认。
- **不删除 CLAUDE.md 中的非配置内容**：如 `## 输出`、`## 事项工作区`、`## 审查过的种子文档` 等章节不由访谈写入，不修改。
- **法律事实验证**：用户口述的条号·文号·罚款数额·时限·标准号等须标 `[待验证]`，不写入裸数字。
