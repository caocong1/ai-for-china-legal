# 独立 Agent 格式规范

## 概述

独立 Agent 模式将技能封装为可通过 API 调用的独立服务。每个 Agent 包含系统提示词、用户模板和工具配置。

## 文件格式

### agent.json 结构

```json
{
  "name": "agent-name",
  "version": "1.0.0",
  "description": "Agent 描述",
  "model": "qwen-max",
  "system_prompt_file": "prompts/system.md",
  "user_template_file": "prompts/user-template.md",
  "tools": [
    {
      "type": "mcp",
      "server": "law-database",
      "tools": ["search_laws", "get_law_detail"]
    }
  ],
  "parameters": {
    "temperature": 0.3,
    "max_tokens": 4096,
    "top_p": 0.9
  },
  "input_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "用户查询"
      },
      "context": {
        "type": "object",
        "description": "上下文信息"
      }
    },
    "required": ["query"]
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "result": {
        "type": "string",
        "description": "Agent 输出"
      },
      "confidence": {
        "type": "number",
        "description": "置信度 0-1"
      }
    }
  }
}
```

### 目录结构

```
agent-name/
├── agent.json                 # Agent 配置
├── prompts/
│   ├── system.md              # 系统提示词
│   └── user-template.md       # 用户输入模板
├── tools/
│   └── tool-config.json       # 工具配置
└── server.js                  # API 服务入口（可选）
```

### prompts/system.md

从 SKILL.md 提取的核心指令，包含：
- 角色定义
- 工作流程
- 输出格式要求
- 护栏和边界条件
- 法律依据引用规范

### prompts/user-template.md

用户输入的模板，使用 `{{variable}}` 占位符：

```markdown
请分析以下案例：

## 案件材料
{{case_materials}}

## 分析要求
{{analysis_requirements}}

## 输出格式
请按照以下结构输出：
1. 案由分析
2. 法律依据
3. 风险评估
4. 建议方案
```

### 触发方式

```bash
# API 调用
curl -X POST http://localhost:3000/agents/agent-name/run \
  -H "Content-Type: application/json" \
  -d '{"query": "分析这个案例", "context": {...}}'
```

## 转换规则（从 Qwen Code SKILL.md）

### 1. SKILL.md → system.md + user-template.md

```
SKILL.md 结构部分          → system.md
  - 目的                   → 角色定义
  - 详细步骤               → 工作流程
  - 检查清单               → 输出质量要求
  - 边界条件               → 边界条件
  - 错误处理               → 异常处理
  - 法律依据               → 法律依据

SKILL.md 交互部分          → user-template.md
  - argument-hint          → 输入变量
  - 输出模板               → 输出格式要求
```

### 2. 目录结构映射

| 源（Qwen Code） | 目标（独立 Agent） |
|----------------|-------------------|
| `skills/skill-name/SKILL.md` | `agent-name/agent.json` + `prompts/` |
| `_shared/` | 内联到 system.md |
| `CLAUDE.md` | agent.json 的 parameters |
| MCP 连接器引用 | tools/tool-config.json |

### 3. 内容调整

- 将交互式指令转换为系统提示词
- 将用户交互模式转换为 API 输入/输出模式
- 子技能编排转换为多步骤 Agent 工作流
- MCP 工具调用转换为 HTTP API 调用

## 功能差异

| 功能 | 支持状态 | 替代方案 |
|------|---------|---------|
| YAML frontmatter | ❌ | JSON 配置 |
| Markdown 内容 | ✅ | 作为 prompt 文件 |
| MCP 协议 | ⚠️ 需桥接 | HTTP API 封装 |
| 子代理 | ⚠️ 需实现 | 多 Agent 编排 |
| 钩子系统 | ❌ | Webhook |
| 上下文管理 | ✅ 手动 | API 参数传递 |
| 文件读写 | ✅ 完全控制 | 通过工具配置 |

## 部署

### 使用 Node.js 服务

```javascript
// server.js
import express from 'express';
import { readFileSync } from 'fs';

const app = express();
app.use(express.json());

const config = JSON.parse(readFileSync('./agent.json', 'utf-8'));
const systemPrompt = readFileSync(config.system_prompt_file, 'utf-8');

app.post('/agents/:name/run', async (req, res) => {
  // 1. Load user template and fill variables
  // 2. Call LLM API with system prompt + user input
  // 3. Execute tool calls if needed
  // 4. Return result
});

app.listen(3000);
```

## 注意事项

1. system.md 应包含完整的角色定义和行为规范
2. user-template.md 的变量使用 `{{variable}}` 语法
3. agent.json 的 input/output schema 用于 API 文档和验证
4. 工具配置需要指定 MCP 服务器名称和工具列表
5. 独立 Agent 需要自行管理对话历史和上下文
