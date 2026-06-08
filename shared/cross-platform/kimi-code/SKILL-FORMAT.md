# Kimi Code 技能格式规范

## 概述

Kimi Code 使用 `prompt.md` 作为技能定义文件，元数据通过文件头部 HTML 注释标记传递。技能注册通过 `manifest.json` 清单文件管理。

## 文件格式

### prompt.md 结构

```markdown
<!--
@name: skill-name
@description: 技能描述
@argument-hint: [参数提示]
@version: 1.0.0
-->

# 技能标题

## 目的
...

## 工作流
...

## 输出
...
```

### 元数据标记

| 标记 | 必填 | 说明 |
|------|------|------|
| `@name` | ✅ | 技能标识符（kebab-case） |
| `@description` | ✅ | 技能描述（单行） |
| `@argument-hint` | ❌ | 参数提示 |
| `@version` | ❌ | 版本号 |

### 目录结构

```
plugin-name/
├── manifest.json                # 技能清单
├── prompts/
│   ├── skill-name.md            # 技能定义
│   └── sub-skill-name.md        # 子技能
├── agents/
│   └── agent-name.md            # Agent 定义
└── config/
    └── settings.json            # 插件配置
```

### manifest.json 结构

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "插件描述",
  "skills": [
    {
      "name": "skill-name",
      "file": "prompts/skill-name.md",
      "description": "技能描述",
      "subSkills": [
        {
          "name": "sub-skill-name",
          "file": "prompts/sub-skill-name.md"
        }
      ]
    }
  ],
  "agents": [
    {
      "name": "agent-name",
      "file": "agents/agent-name.md"
    }
  ]
}
```

### 触发方式

- 技能：`@skill-name`
- 子技能：`@sub-skill-name`

## 转换规则（从 Qwen Code / OpenCode SKILL.md）

### 1. Frontmatter → HTML 注释

```
---                          →  <!--
name: skill-name             →  @name: skill-name
description: >               →  @description: 技能描述（合并为单行）
  技能描述                      （删除缩进，合并多行）
argument-hint: "[hint]"      →  @argument-hint: [hint]
---                          →  @version: 1.0.0
                               -->
```

### 2. 目录结构映射

| 源（Qwen Code） | 目标（Kimi Code） |
|----------------|------------------|
| `skills/skill-name/SKILL.md` | `prompts/skill-name.md` |
| `skills/skill-name/sub/SKILL.md` | `prompts/skill-name-sub.md` |
| `_shared/` | 内容内联到各 prompt.md |
| `CLAUDE.md` | `config/settings.json` |

### 3. 内容调整

- 子技能引用路径需改为 `@sub-skill-name` 格式
- 文件读取路径需适配 Kimi Code 的文件系统访问方式
- MCP 工具调用需改为 Kimi Code 支持的格式

## 功能差异

| 功能 | 支持状态 | 替代方案 |
|------|---------|---------|
| YAML frontmatter | ❌ | HTML 注释标记 |
| Markdown 内容 | ✅ | 直接使用 |
| MCP 协议 | ⚠️ 基础 | 通过 HTTP 桥接 |
| 子代理 | ⚠️ 有限 | 通过 prompt 链接 |
| 钩子系统 | ❌ | 不支持 |
| 上下文管理 | ⚠️ 手动 | 通过 @file 引用 |

## 注意事项

1. Kimi Code 不支持 YAML frontmatter，必须使用 HTML 注释
2. 多行 description 需合并为单行
3. 子技能扁平化到 prompts/ 目录，用连字符连接父技能名
4. manifest.json 是必需文件，缺少则技能不会被发现
