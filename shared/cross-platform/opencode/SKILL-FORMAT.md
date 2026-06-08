# OpenCode 技能格式规范

## 概述

OpenCode 使用 YAML 格式的技能定义文件。技能内容通过 YAML 的 `content` 字段嵌入 Markdown。

## 文件格式

### skill.yaml 结构

```yaml
name: skill-name
description: 技能描述
argument_hint: "[参数提示]"
version: "1.0.0"
content: |
  # 技能标题

  ## 目的
  ...

  ## 工作流
  ...

  ## 输出
  ...
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 技能标识符（kebab-case） |
| `description` | ✅ | 技能描述（单行） |
| `argument_hint` | ❌ | 参数提示 |
| `version` | ❌ | 版本号 |
| `content` | ✅ | 技能内容（Markdown，使用 YAML `|` 块标量） |

### 目录结构

```
plugin-name/
├── plugin.yaml                # 插件清单
├── skills/
│   ├── skill-name.yaml        # 技能定义
│   └── sub-skill-name.yaml    # 子技能
├── agents/
│   └── agent-name.yaml        # Agent 定义
└── config/
    └── settings.yaml          # 插件配置
```

### plugin.yaml 结构

```yaml
name: plugin-name
version: "1.0.0"
description: 插件描述
skills:
  - name: skill-name
    file: skills/skill-name.yaml
  - name: sub-skill-name
    file: skills/sub-skill-name.yaml
    parent: skill-name
agents:
  - name: agent-name
    file: agents/agent-name.yaml
config:
  file: config/settings.yaml
```

### 触发方式

- 技能：`/skill-name`
- 带参数：`/skill-name [参数]`

## 转换规则（从 Qwen Code SKILL.md）

### 1. Frontmatter + Content → YAML

```yaml
# 源 SKILL.md:
# ---
# name: skill-name
# description: >
#   技能描述
# argument-hint: "[hint]"
# ---
# # 标题
# 内容...

# 目标 skill.yaml:
name: skill-name
description: 技能描述
argument_hint: "[hint]"
version: "1.0.0"
content: |
  # 标题
  内容...
```

### 2. 目录结构映射

| 源（Qwen Code） | 目标（OpenCode） |
|----------------|------------------|
| `skills/skill-name/SKILL.md` | `skills/skill-name.yaml` |
| `skills/skill-name/sub/SKILL.md` | `skills/skill-name-sub.yaml` |
| `_shared/` | 内容内联到各 yaml |
| `CLAUDE.md` | `config/settings.yaml` |

### 3. 内容调整

- YAML frontmatter 字段映射到顶层 YAML 字段
- Markdown 内容放入 `content` 字段（使用 `|` 块标量）
- 子技能引用改为 `/sub-skill-name` 格式

## 功能差异

| 功能 | 支持状态 | 替代方案 |
|------|---------|---------|
| YAML frontmatter | ✅ 原生 | 转换为顶层字段 |
| Markdown 内容 | ✅ | 嵌入 content 字段 |
| MCP 协议 | ⚠️ 基础 | 通过 HTTP 桥接 |
| 子代理 | ⚠️ 有限 | 通过技能链接 |
| 钩子系统 | ❌ | 不支持 |
| 上下文管理 | ⚠️ 手动 | 通过配置文件 |

## 注意事项

1. `content` 字段必须使用 `|` 块标量，保持 Markdown 格式
2. 技能文件扁平化到 skills/ 目录
3. plugin.yaml 是必需文件
4. 子技能通过 `parent` 字段关联父技能
