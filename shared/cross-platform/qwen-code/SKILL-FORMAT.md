# Qwen Code 技能格式规范

## 概述

Qwen Code 是本项目的**主要开发平台**。SKILL.md + YAML frontmatter 格式即为源格式，无需转换。

## 文件格式

### SKILL.md 结构

```markdown
---
name: skill-name
description: >
  技能描述（支持多行）
argument-hint: "[参数提示]"
---

# 技能标题

## 目的
...

## 详细步骤
...

## 检查清单
...

## 输出模板
...

## 边界条件
...

## 错误处理
...

## 法律依据
...
```

### Frontmatter 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 技能标识符（kebab-case） |
| `description` | ✅ | 技能描述，支持多行 YAML |
| `argument-hint` | ❌ | 参数提示，显示在命令后 |

### 目录结构

```
plugin-name/
├── README.md
├── CLAUDE.md                    # 实践配置（唯一真相来源）
├── skills/
│   ├── _shared/                 # 共享引用文件
│   │   ├── legal-basis-conventions.md
│   │   └── citations.md
│   ├── skill-name/
│   │   ├── SKILL.md             # 编排入口或独立技能
│   │   └── sub-skill/
│   │       └── SKILL.md         # 子技能
│   └── ...
└── ...
```

### 触发方式

- 编排入口：`/plugin-name:skill-name`
- 子技能：`/plugin-name:sub-skill-name`
- 冷启动访谈：`/plugin-name:cold-start-interview`

### 特殊支持

| 功能 | 支持状态 | 说明 |
|------|---------|------|
| YAML frontmatter | ✅ 原生 | 直接解析 |
| Markdown 内容 | ✅ 原生 | 直接渲染 |
| MCP 协议 | ✅ 原生 | 通过 connectors/ 配置 |
| 子代理 | ✅ 原生 | 通过 agent 工具 |
| 钩子系统 | ✅ 原生 | 通过 hooks 配置 |
| 上下文管理 | ✅ 自动 | CLAUDE.md 自动加载 |
| 研究闸门 | ✅ 原生 | shared/research-gate/ |

## 安装方式

```bash
# 通过 setup 脚本创建符号链接
bash scripts/setup-skills.sh

# 或直接复制到 .qwen/skills/
cp -r plugin-name/skills/* .qwen/skills/
```

## 注意事项

1. SKILL.md 文件名必须为大写
2. frontmatter 的 `---` 分隔符不能省略
3. description 字段使用 YAML 多行语法（`>` 或 `|`）时注意缩进
4. 子技能路径使用相对路径，相对于插件根目录
