# 跨平台适配指南

## 概述

AI for China Legal 支持多个 Agent 平台：Qwen Code、Kimi Code、OpenCode 等。本文档说明各平台的适配要点。

## Qwen Code

### 技能格式

```markdown
---
name: skill-name
description: 技能描述
argument-hint: "[参数提示]"
---

# 技能标题

## 目的
...

## 工作流
...

## 输出
...
```

### 安装方式

1. 添加市场源
2. 选择插件
3. 运行冷启动访谈

### 特性

- 支持 YAML frontmatter
- 支持 Markdown 格式
- 支持 MCP 协议

## Kimi Code

### 技能格式

```json
{
  "name": "skill-name",
  "description": "技能描述",
  "argument_hint": "参数提示",
  "content": "技能内容 Markdown"
}
```

### 安装方式

1. 添加技能源
2. 选择插件
3. 运行设置命令

### 特性

- JSON 格式技能定义
- 兼容 Qwen Code 技能
- 支持 MCP 协议

## OpenCode

### 技能格式

```yaml
name: skill-name
description: 技能描述
argument_hint: 参数提示
content: |
  技能内容 Markdown...
```

### 安装方式

1. 添加插件源
2. 安装插件
3. 运行初始化

### 特性

- YAML 格式技能定义
- 轻量级实现
- 支持基础 MCP 协议

## 跨平台兼容层

### 技能转换工具

```bash
# Qwen Code → Kimi Code
npm run convert -- --from qwen --to kimi --input ./skills --output ./kimi-skills

# Qwen Code → OpenCode
npm run convert -- --from qwen --to opencode --input ./skills --output ./opencode-skills
```

### 平台检测

```javascript
// 检测当前平台
const platform = process.env.AGENT_PLATFORM || 'qwen';

switch (platform) {
  case 'qwen':
    // Qwen Code 特定逻辑
    break;
  case 'kimi':
    // Kimi Code 特定逻辑
    break;
  case 'opencode':
    // OpenCode 特定逻辑
    break;
}
```

## MCP 协议兼容

所有平台都支持基础 MCP 协议。连接器配置如下：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["path/to/server.js"],
      "env": {}
    }
  }
}
```

## 测试

```bash
# 测试所有平台兼容性
npm run test:compatibility

# 测试特定平台
npm run test:compatibility -- --platform qwen
npm run test:compatibility -- --platform kimi
npm run test:compatibility -- --platform opencode
```

## 发布

```bash
# 发布到所有平台
npm run publish:all

# 发布到特定平台
npm run publish -- --platform qwen
npm run publish -- --platform kimi
npm run publish -- --platform opencode
```
