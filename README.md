# AI for China Legal — 面向中国大陆律师的 AI 法律工具套件

> **重要声明**: 本工具所有输出均为供律师审查的草稿，非法律建议，非法律结论，不能替代执业律师。律师需对最终作品负责。

## 概述

AI for China Legal 是一套模块化的法律 AI 插件套件，面向中国大陆法律体系、执业环境和监管要求进行中国化适配。

本项目的架构和设计模式参考了 Anthropic 的 [claude-for-legal](https://github.com/anthropics/claude-for-legal) 项目。

## 核心概念

| 概念 | 说明 |
|------|------|
| **Plugins (插件)** | 自包含的业务领域包（如商事合同、诉讼仲裁），包含 Skills、Agents 和实践配置文件模板 |
| **Skills (技能)** | 领域专业知识，通过斜杠命令调用或自动触发 |
| **Agents (代理)** | 定时或事件驱动的工作流（如裁判文书监控、法规动态监控），在后台运行 |
| **实践配置文件** | 通过"冷启动访谈"生成的个性化配置，描述团队的审查立场、升级规则和文书风格 |
| **Connectors (连接器)** | 基于 MCP 协议的服务器，连接外部数据源（6 个已定义规格，law-database 已实现原型） |

## 安装

### Codex

```bash
cd /path/to/ai-for-china-legal
bash scripts/setup-codex-skills.sh
```

脚本只在个人 Codex skills 目录创建两个符号链接：总路由 `ai-for-china-legal-workflow` 和动态 `legal-document-intake`。不会复制法律语料，也不会覆盖已有同名文件。首次安装后新建一个 Codex 任务即可生效。

### Qwen Code

本项目使用符号链接方式将 SKILL.md 文件注册到 Qwen Code 的项目级 skill 目录（`.qwen/skills/`）。

```bash
cd /path/to/ai-for-china-legal
bash scripts/setup-skills.sh    # 注册 71 个 skill（68 插件 + 3 共享）
bash scripts/cleanup-skills.sh  # 卸载
```

注册后，在 Qwen Code 中打开本项目目录，各 skill 将自动加载。详见 [INSTALL.md](INSTALL.md)。

## 日常使用：操作员模式

忘记如何执行时，先看 [动态 Intake 操作员快速说明](shared/legal-document-intake/references/operator-quickstart.md)。其中包含启动任务、微信转问、律师回复后续接、换模型交接、独立复核和反馈入库的可复制提示词。

安装总路由后，提示词不需要附 skill 路径、状态字段或流程全文。保留这句即可自动触发：

```text
请使用 ai-for-china-legal 法律工作流，【审查/修订/起草】这个法律事项：【文件路径和具体要求】。
```

总路由默认采用资深中国大陆律师工作产物标准，无需每次写「以资深律师身份」。它会自动完成 intake 决策：需要律师补充时才输出 `[CLARIFY:]` 并暂停；不需要时会说明理由并直接继续。用户明确指定对方律师、裁判者或其他视角时，以本次指定为准。

律师回复后：

```text
以下是律师对上一轮问题的回复：【逐项粘贴】。请合并到原事项摘要，不重复提问；必须项解决后从上次暂停处继续完成成果。
```

## 插件列表

### 交易与咨询类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [商事合同](commercial-legal/README.md) | 买卖合同、技术服务合同、租赁合同审查，含主体资格预检；股权交易法律尽调 | 5 |
| [数据合规](data-compliance/README.md) | 个保法/数据安全法合规、PIA、数据出境 | 5 |
| [劳动人事](employment-legal/README.md) | 劳动合同、竞业限制、裁员方案、劳动用工合规调查 | 7 |
| [知识产权](ip-legal/README.md) | 商标/专利/著作权初步筛查 | 5 |
| [AI 治理](ai-governance/README.md) | 深度合成备案、算法备案、生成式 AI 合规 | 5 |
| [监管合规](regulatory-legal/README.md) | 监管动态监控、行政处罚应对 | 5 |

### 诉讼类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [诉讼仲裁](litigation-legal/README.md) | 案件管理、证据目录、答辩状、代理词起草 | 6 |

### 中国特有领域

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [建设工程](construction-legal/README.md) | 施工合同、工程款争议、商品房买卖 | 5 |
| [婚姻家事](family-legal/README.md) | 离婚协议、遗嘱、继承 | 5 |
| [刑事合规](criminal-compliance/README.md) | 刑事风险评估、合规不起诉 | 5 |

### 学习与实务类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [法考培训](law-student/README.md) | 法考刷题、案例研习 | 5 |
| [法律援助](legal-aid/README.md) | 法援案件管理、客户 intake | 5 |

### 生态系统

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [法律技能中心](legal-builder-hub/README.md) | 社区技能发现、安装、安全审查 | 5 |

## 共享法律工作基础设施

v1.1 新增。从既有实务验证经验中沉淀共享研究能力：

| 目录 | 说明 |
|------|------|
| [shared/ai-for-china-legal-workflow/](shared/ai-for-china-legal-workflow/SKILL.md) | **顶层自动路由** — 精确响应“请使用 ai-for-china-legal 法律工作流”，自动串联 intake、研究闸门、专项法律 skill 和文档交付 |
| [shared/legal-document-intake/](shared/legal-document-intake/SKILL.md) | **法律事项动态 Intake** — 先读材料，再只询问会改变成果的问题；支持 App `ask_user`、人工微信中继、答复合并恢复及多模型执行分级 |
| [shared/legal-document-intake/references/](shared/legal-document-intake/references/) | 动态问题路由、边界示例与品牌无关的多模型操作员编排建议 |
| [shared/research-gate/](shared/research-gate/SKILL.md) | **中国法研究闸门** — 所有法律文书生成前的强制检索前置机制。包含目录清点、五维度搜索（正向依据/反向依据/程序陷阱）、来源分级（L1-L5）、两段式检索协议 |
| [shared/research-gate/references/](shared/research-gate/references/) | 研究闸门参考文档：权威来源 URL（含税务 / 信用 / 上市公司公告源实测）、质量闸门、搜索策略（保函/管辖/主体资格/信用修复/劳动用工合规调查/股权尽调程序）、原件与摘要规则、引用策略与失败回退链 |
| [shared/references/document-structures.md](shared/references/document-structures.md) | 诉讼文书结构模板（诉讼方案 13 段、起诉状、答辩状、证据目录 3 大类分组、风险段 5 类强制要求） |
| [shared/references/guarantee-bond-playbook.md](shared/references/guarantee-bond-playbook.md) | 保函/担保案件专用 playbook：裁判共识、保证方式分析、案由锁定、OCR 校验、反例预警 |
| [shared/references/subject-qualification-traps.md](shared/references/subject-qualification-traps.md) | 主体资格陷阱清单（融资担保公司、银行分支机构、上市公司、国企等 7 类主体） |
| [shared/references/due-diligence-playbook.md](shared/references/due-diligence-playbook.md) | 尽职调查 / 合规调查共享数据结构：开工必答项、资料清单与去重、分章事实底稿、覆盖审计、问题清单三分类、子代理规则 |
| [shared/references/document-delivery-qa.md](shared/references/document-delivery-qa.md) | Word / PDF 交付 QA：修订稿可逆性、模板包成稿、pandoc 中文模板、渲染与结构校验、交付说明 |

## 真实案例测试框架

| 目录 | 说明 |
|------|------|
| `learning-materials/` | 内部验证材料目录。具体案件材料不随公开文档引用。 |

## 项目结构

```
ai-for-china-legal/
├── .claude-plugin/
│   └── marketplace.json          # 市场清单
├── .planning/
│   ├── PROJECT.md                # 项目概述和历史
│   └── ROADMAP.md                # 开发路线图
├── CLAUDE.md                     # 全局配置模板
├── README.md                     # 本文件
├── CONNECTORS.md                 # MCP 连接器说明
│
├── shared/                       # 共享法律工作基础设施
│   ├── CLAUDE.md                 # 共享资源使用说明
│   ├── ai-for-china-legal-workflow/ # 顶层自动路由
│   ├── legal-document-intake/    # 动态事项确认、微信中继与多模型编排
│   ├── research-gate/            # 研究闸门
│   │   ├── SKILL.md              # 核心逻辑
│   │   └── references/           # 权威来源、质量闸门、搜索策略、引用策略
│   └── references/               # 共享模板和 playbook
│       ├── document-structures.md
│       ├── guarantee-bond-playbook.md
│       └── subject-qualification-traps.md
│
├── learning-materials/           # 真实案例测试框架 (v1.1 新增)
│   └── <case>/
│       ├── evaluation/
│       ├── forward-tests/
│       └── prompts/
│
├── commercial-legal/             # 商事合同
├── litigation-legal/             # 诉讼仲裁
├── employment-legal/             # 劳动人事
├── data-compliance/              # 数据合规
├── ip-legal/                     # 知识产权
├── regulatory-legal/             # 监管合规
├── ai-governance/                # AI 治理
├── construction-legal/           # 建设工程
├── family-legal/                 # 婚姻家事
├── criminal-compliance/          # 刑事合规
├── law-student/                  # 法考培训
├── legal-aid/                    # 法律援助
├── legal-builder-hub/            # 法律技能中心
│
├── managed-agent-cookbooks/      # 定时 Agent 配方
├── connectors/                   # MCP 连接器
├── scripts/                      # 验证和部署脚本
└── references/                   # 共享模板
```

## 中国化适配要点

### 法律体系差异

| 美国原版 | 中国化适配 |
|----------|-----------|
| 联邦/州法院体系 | 最高院/高院/中院/基层法院四级体系 |
| 判例法 | 成文法为主，指导性案例参考 |
| 发现程序 (Discovery) | 证据交换制度 |
| 陪审团 | 人民陪审员制度 |
| GDPR/CCPA | 个保法/数据安全法/网络安全法 |
| FMLA/ADA | 劳动合同法/年休假条例 |
| Federal Register | 国务院公报/部委规章 |
| EU AI Act | 深度合成规定/生成式 AI 办法/算法推荐规定 |

## 开发路线

| 阶段 | 内容 | 状态 |
|------|------|------|
| Phase 1 | 项目骨架搭建 | ✅ 完成 |
| Phase 2-6 | 核心插件开发 (商事/诉讼/劳动/数据/知产) | ✅ 完成 |
| Phase 7-14 | 扩展插件 (建设工程/婚姻家事/刑事合规/AI治理/监管合规/法考/法援/技能中心) | ✅ 完成 |
| Phase 15 | 定时 Agent 开发 | ✅ 完成 |
| Phase 16 | MCP 连接器规格定义（6 个 connector.json，law-database 已实现原型） | ✅ 完成 |
| Phase 17 | 跨平台适配 | ✅ 完成 |
| **v1.1** | **共享法律研究基础设施** — 研究闸门、质量闸门、搜索策略、真实案例测试框架 | ✅ 完成 |
| 后续 | 各插件 skill 内容完善、其余 5 个连接器实现、定时 Agent 运行时完善 | 规划中 |

## 许可证

本项目参考 MIT 许可证（待正式确定）

## 贡献

欢迎提交 Issue 和 Pull Request。贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。
