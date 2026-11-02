# Product: AI for China Legal · Skill 说明站

## What it is

一套静态页面（`docs/`），把 ai-for-china-legal 里 13 个插件、69 个顶层 skill、约 280 个子技能和 4 个共享流程，按律师能读的方式讲清：能做什么、怎么做到、步骤是什么、内置了哪些法律判断，并让律师就这些判断提意见。

## Who uses it

| Role | Frequency | Device and scene | Strong at / struggles with |
| --- | --- | --- | --- |
| 执业律师（审阅者） | 一次读 1–3 个 skill，之后按需回看 | 办公室 24 寸或笔记本，白天；也可能在手机微信里打开链接 | 读长篇法律文本很快；不读 Markdown 源码，不懂 orchestrator / 子技能这类词 |
| 操作员 / 维护者 | 每次改 skill 后重建 | 笔记本 | 懂仓库结构，需要从页面跳回源文件 |

## Jobs

| Job | Role | Frequency | Done well looks like |
| --- | --- | --- | --- |
| 弄清一个 skill 具体做什么、步骤是什么 | 律师 | 每次 1–3 个 | 不开 SKILL.md 就能复述步骤与规则 |
| 找到内置的法律假设并提意见 | 律师 | 每个 skill 3–10 条 | 能一键复制「skill · 步骤 · 核对点 · 原文」粘到微信 |
| 理解每个事项都要走的流程（intake → 研究闸门 → 专项 skill → 交付） | 律师 | 首次 | 首页一屏讲完 |
| 从页面跳到源文件改 skill | 维护者 | 每次改动 | 每页末尾有源文件链接 |

## Constraints

- Targets: web 1280×800、390×844（微信内置浏览器）、打印 A4。
- System of record: 无既有系统；`docs/assets/site.css` 是 token 的实现，`.design/system/DESIGN.md` 描述它。
- Accessibility: WCAG 2.2 AA；对比度用 color_tools 计算。
- Languages and scripts: 简体中文正文；英文仅 skill id、命令、文件路径（等宽）。最长串：命令 `/construction-legal:commercial-housing-review`、文件路径。
- 无构建依赖：Python 3 标准库生成 HTML；无框架、无外部字体 CDN（大陆网络）；file:// 与 GitHub Pages 子路径都可用。

## Voice

- 讲清楚，不吹（「逐条识别风险」，不是「智能赋能」）
- 用律师的词（立场、请求权、举证），不是开发者的词（orchestrator、prompt）
- 直陈规则，不加形容词
- 每条结论可追到源文件

## Equity: never changes silently

- 页面路径 `docs/<plugin>/<skill>/`；skill 的 id 与命令名；源文件路径。

## Evidence

| Claim | Source | Date |
| --- | --- | --- |
| 律师不会通读 SKILL.md，需要摘要页才能提意见 | 用户需求原话 | 2026-11-01 |
| 11 项真实任务里模型从未提问，律师的意见要能回流到 skill | CHANGELOG v1.4.0 | 2026-11-01 |

## Not doing

- 不做在线编辑、评论系统、登录；意见经微信或 GitHub issue 回流。
- 不复述 SKILL.md 全文；不展示客户材料。
