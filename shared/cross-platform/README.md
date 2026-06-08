# 跨平台适配指南

## 概述

本项目（AI for China Legal）的技能定义可在多个 AI 编程助手平台上运行。由于各平台的技能格式、触发方式和文件组织存在差异，需要针对不同平台进行适配。

本目录记录各平台的格式要求和转换方法，确保技能内容可以在不同平台间无缝迁移。

## 支持的平台

| 平台 | 目录 | 技能格式 | 触发格式 | 状态 |
|------|------|---------|---------|------|
| OpenCode | `opencode/` | SKILL.md + frontmatter | `/plugin:skill` | 主要平台 |
| Qwen Code | `qwen-code/` | SKILL.md + YAML frontmatter | `/skill` | 适配完成 |
| Kimi Code | `kimi-code/` | prompt.md + 自定义格式 | `@skill` | 适配完成 |
| 独立 Agent | `standalone-agent/` | agent.json + prompts/ | API 调用 | 适配完成 |

## 核心差异对比

### 1. 技能定义文件格式

| 差异点 | OpenCode | Qwen Code | Kimi Code | 独立 Agent |
|-------|----------|-----------|-----------|-----------|
| 主文件 | SKILL.md | SKILL.md | prompt.md | agent.json |
| 元数据格式 | YAML frontmatter | YAML frontmatter | 文件头部注释 | JSON 配置 |
| 内容格式 | Markdown | Markdown | Markdown + 模板 | JSON + Prompt |
| 参数定义 | frontmatter 字段 | frontmatter 字段 | 注释标记 | JSON Schema |

### 2. 触发命令格式

| 平台 | 触发格式 | 示例 | 参数传递 |
|------|---------|------|---------|
| OpenCode | `/plugin-name:skill-name` | `/commercial-legal:review` | 命令后跟参数 |
| Qwen Code | `/skill-name` | `/contract-review` | 对话中提供 |
| Kimi Code | `@skill-name` | `@contract-review` | 上下文自动注入 |
| 独立 Agent | API endpoint | `POST /agents/review` | JSON body |

### 3. 文件组织结构

**OpenCode 格式（本项目主格式）：**
```
plugin-name/
  .claude-plugin/plugin.json
  skills/
    skill-name/
      SKILL.md
  agents/
    agent-name.md
  hooks/
    hooks.json
```

**Qwen Code 格式：**
```
plugin-name/
  skills/
    skill-name/
      SKILL.md
  agents/
    agent-name/
      agent.yaml
  config.yaml
```

**Kimi Code 格式：**
```
plugin-name/
  prompts/
    skill-name.md
  agents/
    agent-name.md
  manifest.json
```

**独立 Agent 格式：**
```
agent-name/
  agent.json
  prompts/
    system.md
    user-template.md
  tools/
    tool-config.json
```

## 转换工具

### OpenCode → Qwen Code

1. 保留 SKILL.md 内容不变
2. 调整 frontmatter 字段映射（参见 `qwen-code/SKILL-FORMAT.md`）
3. 将 `.claude-plugin/plugin.json` 转换为 `config.yaml`
4. 调整 agents 目录结构

### OpenCode → Kimi Code

1. 将 SKILL.md 重命名为 prompt.md
2. 将 frontmatter 转换为文件头部注释格式
3. 创建 manifest.json 清单文件
4. 调整目录结构

### OpenCode → 独立 Agent

1. 将 SKILL.md 拆分为 system prompt 和 user template
2. 创建 agent.json 配置文件
3. 定义工具调用接口
4. 编写 API 服务包装

## 平台特定功能

| 功能 | OpenCode | Qwen Code | Kimi Code | 独立 Agent |
|------|----------|-----------|-----------|-----------|
| 子代理 | 支持 | 支持 | 有限支持 | 需自行实现 |
| MCP 工具 | 原生支持 | 原生支持 | 不支持 | 需自行对接 |
| 钩子系统 | 支持 | 部分支持 | 不支持 | 需自行实现 |
| 上下文管理 | 自动 | 自动 | 手动 | 手动 |
| 多轮对话 | 支持 | 支持 | 支持 | 需自行实现 |
| 文件读写 | 受限 | 受限 | 受限 | 完全控制 |

## 维护说明

1. 以 OpenCode 格式为主格式，所有技能首先在此格式下开发
2. 其他平台的格式文件作为转换参考，定期与主格式同步
3. 平台特定功能差异在各平台的 SKILL-FORMAT.md 中记录
4. 新增技能时只需编写一次，通过转换规则适配其他平台
