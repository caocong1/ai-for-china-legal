---
name: cold-start-interview
description: AI 治理冷启动访谈编排入口——按顺序调用四个子技能，将访谈结果写入 ai-governance/CLAUDE.md 各章节
---

# 冷启动访谈 — AI 治理（编排入口）

## 目的

通过四个子技能的顺序访谈，完成 `ai-governance/CLAUDE.md` 实践配置文件的初始化或增量更新。

**重要纠正**：访谈结果写入 `ai-governance/CLAUDE.md` 的各章节，**不是**生成独立的 YAML 文件。CLAUDE.md 是所有 ai-governance 技能读取立场与配置的唯一来源。

## 访谈子技能顺序表

| 顺序 | 子技能 | 路径 | 采集内容 | 写入 CLAUDE.md 章节 |
|------|--------|------|---------|-------------------|
| 1 | 身份与企业画像 | `cold-start-interview/identity-enterprise-profile/` | 执业角色、AI服务类型、企业画像 | `## 我们是谁` + `## 谁在使用` |
| 2 | 合规立场与服务范围 | `cold-start-interview/compliance-stance-scope/` | 整体服务立场、合规严格度、监管关系 | `## 合规与监管立场` |
| 3 | 风险与升级 | `cold-start-interview/risk-escalation/` | 风险等级定义、角色权限、强制升级 | `## AI 合规风险校准` + `## 升级矩阵` |
| 4 | 文书风格与监管资源 | `cold-start-interview/style-regulatory-resources/` | 文书风格、监管资源 | `## 文书风格` + `## 可用集成` |

## 流程

### 初始化

1. 检查 `ai-governance/CLAUDE.md` 是否存在。
2. 如不存在：从模板创建，所有字段为 `[PLACEHOLDER]`。
3. 如已存在：读取现有内容，进入增量更新模式。

### 顺序执行

按上表顺序依次调用四个子技能。每个子技能完成后将结果写入 CLAUDE.md 对应章节。

### 完成

全部四个子技能完成后输出更新摘要，提示用户可直接编辑 CLAUDE.md 微调。

## 支持的操作模式

- **完整重新运行**：`/ai-governance:cold-start-interview 首次运行`
- **增量更新**：`/ai-governance:cold-start-interview 更新`
- **单章节更新**：`/ai-governance:cold-start-interview 身份与企业画像`
- **直接编辑**：用户可直接编辑 `ai-governance/CLAUDE.md`

## 初始化异常处理

- CLAUDE.md 不存在且无法创建：提示检查插件安装，中止访谈。
- 子技能运行中用户中断：已写入内容保留，下次从断点继续。

## 护栏

- **不生成独立 YAML 文件**：所有配置写入 CLAUDE.md。
- **不覆盖用户未确认的内容**：每个子技能写入前须用户确认。
- **法律事实验证**：用户口述的条号·文号须标 `[待验证]`。
