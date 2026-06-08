---
name: evaluate-ai-coding-framework
description: 系统性评估和选型外部 AI 编码规范/技能框架，判断与 Qwen Code 的兼容性和适配方案
source: auto-skill
extracted_at: '2026-06-08T07:59:25.113Z'
---

# Evaluate AI Coding Framework — AI 编码框架选型评估

当用户需要为项目选择外部 AI 编码规范框架（如 superpowers、cursorrules、GSD 等）时，系统性地调研、评估兼容性、横向对比并给出选型建议。

## 适用场景

- 用户说"看看 XXX 框架能不能用"
- 用户说"搜一下现在有哪些类似的插件/框架"
- 用户说"做个横向对比选型"
- 新建项目需要规范化的开发方法论
- 需要评估外部框架与当前工具链（Qwen Code / Claude Code / Cursor 等）的兼容性

## 完整工作流

### 第一步：深度调研目标框架

对每个候选框架，收集以下信息：

1. **基本信息** — GitHub URL、Stars、最近更新时间、维护状态
2. **支持的工具链** — 明确列出支持哪些 AI 编码工具（Claude Code、Qwen Code、Cursor、Copilot、Gemini CLI 等）
3. **架构与格式** — 文件组织方式（SKILL.md / .mdc / plugin.json / AGENTS.md 等）
4. **核心能力** — 提供哪些技能/规则/工作流
5. **方法论深度** — 是简单的代码风格规则，还是完整的开发方法论（TDD、调试、计划、审查）
6. **社区生态** — 社区活跃度、贡献者数量、issue/PR 处理速度

### 第二步：Qwen Code 兼容性评估

对每个框架按以下维度评估与 Qwen Code 的兼容性：

| 兼容性维度 | 评估要点 |
|-----------|---------|
| **Skill 格式** | 是否使用 SKILL.md + YAML frontmatter？与 `.qwen/skills/<name>/SKILL.md` 格式差异 |
| **目录结构** | 技能组织方式是否可映射到 `.qwen/skills/` |
| **Agent 系统** | 是否依赖特定工具的子代理调度（如 Claude Code 的 agent 系统） |
| **Hook 机制** | 是否依赖特定工具的事件钩子（hooks.json） |
| **Plugin 元数据** | 是否需要 plugin.json 等工具专有配置 |
| **路径引用** | 是否使用绝对路径或工具特有的路径约定 |
| **MCP 依赖** | 是否依赖 MCP 服务器或特定连接器 |

**兼容性评级：**
- ✅ **原生兼容** — 格式和架构直接可用，仅需路径调整
- ⚠️ **需适配** — 核心方法论可用，但部分功能需改造（如子代理编排）
- ❌ **不兼容** — 深度依赖其他工具专有特性，移植成本过高

**移植难度分类：**
- **低** — 纯方法论内容，无工具依赖（如 TDD 流程、调试方法论、头脑风暴模板）
- **中** — 涉及工具交互但可替代（如 Git 操作、代码审查流程、计划执行）
- **高** — 深度依赖特定工具系统（如子代理并行调度、专有 hook 事件）

### 第三步：横向对比矩阵

构建多维度对比表，至少包含以下维度：

```markdown
| 维度 | 框架 A | 框架 B | 框架 C |
|------|:------:|:------:|:------:|
| Qwen Code 兼容 | ✅/⚠️/❌ | ... | ... |
| 新建项目适用性 | ⭐1-5 | ... | ... |
| 方法论深度 | ⭐1-5 | ... | ... |
| 技术栈覆盖 | ⭐1-5 | ... | ... |
| 可维护性 | ⭐1-5 | ... | ... |
| 社区活跃度 | ⭐1-5 | ... | ... |
| TDD/质量保障 | ⭐1-5 | ... | ... |
| 子代理编排 | ⭐1-5 | ... | ... |
| 与现有体系互补性 | ⭐1-5 | ... | ... |
```

### 第四步：当前项目差距分析

1. 读取当前项目的 `.qwen/skills/`、`.claude-plugin/`、`CLAUDE.md` 等
2. 列出当前已有的能力清单
3. 识别能力差距（哪些维度缺失或薄弱）
4. 将差距与候选框架的能力做映射

### 第五步：选型建议

输出结构化建议，包含：

1. **推荐方案** — 选择哪个（或哪组）框架，以及为什么
2. **组合策略** — 多个框架如何互补（如 A 负责方法论、B 负责项目管理、C 负责领域知识）
3. **移植路线图** — 按优先级排列需要移植的技能，标注难度
4. **风险评估** — 移植过程中可能遇到的问题和应对方案
5. **替代方案** — 如果推荐方案不可行，备选是什么

### 第六步：输出报告

最终输出格式：

```markdown
## AI 编码框架选型报告

### 候选框架概览
[每个框架一段简介]

### 兼容性评估
[每个框架的 Qwen Code 兼容性详情]

### 横向对比矩阵
[对比表格]

### 差距分析
[当前项目缺失的能力]

### 推荐方案
[具体建议 + 组合策略]

### 移植路线图
[按优先级排列的技能移植清单]

### 下一步
[具体行动建议]
```

## 已知框架参考（2026-06 调研结果）

| 框架 | 类型 | Qwen Code 兼容 | 核心特色 |
|------|------|:--------------:|---------|
| [obra/superpowers](https://github.com/obra/superpowers) | 方法论技能包 | ⚠️ 需适配 | 子代理驱动开发、TDD、系统化调试、14 个核心技能 |
| [anthropics/claude-code plugins](https://github.com/anthropics/claude-code) | 官方插件集 | ❌ 专有格式 | 14 个官方插件（code-review、feature-dev 等） |
| [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 规则集合 | ❌ .mdc 格式 | 39.9k stars，海量技术栈规则 |
| GSD (user-level) | 项目管理技能 | ✅ 原生兼容 | 50+ 技能，完整项目生命周期 |

> 此列表可能过时，每次执行时应重新搜索验证。

## 关键决策原则

| 原则 | 说明 |
|------|------|
| 方法论 > 规则 | 优先选择提供完整开发方法论的框架，而非简单的代码风格规则 |
| 兼容性 > 功能丰富 | 与当前工具链的兼容性比功能数量更重要 |
| 组合优于单一 | 多个互补的框架组合通常优于寻找一个"完美"框架 |
| 实测 > 设计 | 经过社区实测验证的技能比纯设计的更可靠 |
| 低移植成本优先 | 先移植低难度的纯方法论技能，快速获得收益 |
| **最小必要集** | 不需要全量移植，只选择能补全当前能力缺口的核心技能（如 Superpowers 14 个技能中只移植 3 个） |
| **技术栈感知** | 选型建议要考虑目标技术栈（如 Tauri+SolidJS vs Electron+React），不同栈对 AI vibe coding 友好度不同 |
| **开发模式适配** | 如果用户主要做 vibe coding（AI 写代码，人验收），优先选择强制 TDD 和验证的框架 |

## 实战经验：组合策略模式

**典型场景：** 用户已有 GSD（项目管理），想评估 Superpowers（方法论）

**推荐组合：**
```
GSD（项目管理层）
  ↓ discuss → spec → plan → execute → verify → ship
Superpowers（方法论层，仅移植 3 个核心技能）
  ↓ test-driven-development（强制 TDD）
  ↓ systematic-debugging（4 步根因分析）
  ↓ verification-before-completion（完成前自检）
领域技能（专业知识层）
  ↓ 项目特定的 skills（如法律、金融、医疗等）
```

**为什么不全量移植 Superpowers？**
- GSD 已覆盖 brainstorm、planning、code review、branch 管理
- Superpowers 的 `subagent-driven-development` 依赖 Claude Code 子代理系统，移植成本高
- 只移植 GSD 缺失的 3 个方法论技能，ROI 最高

## 技术栈选型参考（AI Vibe Coding 友好度）

| 技术栈 | AI 生成质量 | 生态成熟度 | 推荐场景 |
|--------|:-----------:|:---------:|---------|
| **Electron + React + TS** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 桌面端首选，AI 训练数据最丰富 |
| **Tauri + SolidJS + TS** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 轻量桌面端，Rust 后端需注意 |
| Tauri + React + TS | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 轻量桌面端，React 生态更成熟 |
| Next.js + TS | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Web 应用首选 |
| Python + FastAPI | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 后端 API，AI 生成质量高 |
| WPF/WinUI (C#) | ⭐⭐ | ⭐⭐⭐⭐ | 不推荐，XAML AI 生成质量差 |

**关键洞察：**
- Vibe coding 最重要的是 **AI 别犯错**，选择训练数据最丰富的技术栈
- Tauri 的 Rust 后端部分，AI 容易在 FFI、异步、生命周期上出错
- 如果选 Tauri，建议前端用 React/SolidJS，后端尽量简单（只做系统调用）

## 与其他 skill 的关系

- **本 skill** → 评估和选型阶段（选什么）
- **integrate-external-skill** → 整合执行阶段（怎么装）
- 选型完成后，使用 `integrate-external-skill` 执行实际移植工作
