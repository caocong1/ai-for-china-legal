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
| **Connectors (连接器)** | 基于 MCP 协议的服务器，连接外部数据源（规划中） |

## 插件列表

### 交易与咨询类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [商事合同](commercial-legal/README.md) | 买卖合同、技术服务合同、租赁合同审查，含主体资格预检 | 4 |
| [数据合规](data-compliance/README.md) | 个保法/数据安全法合规、PIA、数据出境 | 3 |
| [劳动人事](employment-legal/README.md) | 劳动合同、竞业限制、裁员方案 | 5 |
| [知识产权](ip-legal/README.md) | 商标/专利/著作权初步筛查 | 4 |
| [AI 治理](ai-governance/README.md) | 深度合成备案、算法备案、生成式 AI 合规 | 4 |
| [监管合规](regulatory-legal/README.md) | 监管动态监控、行政处罚应对 | 3 |

### 诉讼类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [诉讼仲裁](litigation-legal/README.md) | 案件管理、证据目录、答辩状、代理词起草 | 5 |

### 中国特有领域

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [建设工程](construction-legal/README.md) | 施工合同、工程款争议、商品房买卖 | 4 |
| [婚姻家事](family-legal/README.md) | 离婚协议、遗嘱、继承 | 4 |
| [刑事合规](criminal-compliance/README.md) | 刑事风险评估、合规不起诉 | 4 |

### 学习与实务类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [法考培训](law-student/README.md) | 法考刷题、案例研习 | 4 |
| [法律援助](legal-aid/README.md) | 法援案件管理、客户 intake | 4 |

### 生态系统

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [法律技能中心](legal-builder-hub/README.md) | 社区技能发现、安装、安全审查 | 4 |

## 共享法律研究基础设施

v1.1 新增。从 `cn-lawyer-docs-skill` 项目汲取经过真实案例（国航重庆诉重庆双业担保）测试验证的能力：

| 目录 | 说明 |
|------|------|
| [shared/research-gate/](shared/research-gate/SKILL.md) | **中国法研究闸门** — 所有法律文书生成前的强制检索前置机制。包含目录清点、五维度搜索（正向依据/反向依据/程序陷阱）、来源分级（L1-L5）、两段式检索协议 |
| [shared/research-gate/references/](shared/research-gate/references/) | 研究闸门参考文档：权威来源 URL、质量闸门、搜索策略（保函/管辖/主体资格）、引用策略与失败回退链 |
| [shared/references/document-structures.md](shared/references/document-structures.md) | 诉讼文书结构模板（诉讼方案 13 段、起诉状、答辩状、证据目录 3 大类分组、风险段 5 类强制要求） |
| [shared/references/guarantee-bond-playbook.md](shared/references/guarantee-bond-playbook.md) | 保函/担保案件专用 playbook：裁判共识、保证方式分析、案由锁定、OCR 校验、反例预警 |
| [shared/references/subject-qualification-traps.md](shared/references/subject-qualification-traps.md) | 主体资格陷阱清单（融资担保公司、银行分支机构、上市公司、国企等 7 类主体） |

## 真实案例测试框架

| 目录 | 说明 |
|------|------|
| [learning-materials/guohang-chongqing-shuangye/](learning-materials/guohang-chongqing-shuangye/README.md) | 国航重庆分公司诉重庆双业担保公司测试案例。含 10 维度评估标准（gold-rubric.md）、前向测试记录模板、最小/诊断型提示词集合 |

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
├── shared/                       # 共享法律研究基础设施 (v1.1 新增)
│   ├── CLAUDE.md                 # 共享资源使用说明
│   ├── research-gate/            # 研究闸门
│   │   ├── SKILL.md              # 核心逻辑
│   │   └── references/           # 权威来源、质量闸门、搜索策略、引用策略
│   └── references/               # 共享模板和 playbook
│       ├── document-structures.md
│       ├── guarantee-bond-playbook.md
│       └── subject-qualification-traps.md
│
├── learning-materials/           # 真实案例测试框架 (v1.1 新增)
│   └── guohang-chongqing-shuangye/
│       ├── evaluation/gold-rubric.md
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
| Phase 16 | MCP 连接器开发 | ✅ 完成 |
| Phase 17 | 跨平台适配 | ✅ 完成 |
| **v1.1** | **共享法律研究基础设施** — 研究闸门、质量闸门、搜索策略、真实案例测试框架 | ✅ 完成 |
| 后续 | 各插件 skill 内容完善、MCP 连接器实现、定时 Agent 运行时 | 规划中 |

## 许可证

本项目参考 MIT 许可证（待正式确定）

## 贡献

欢迎提交 Issue 和 Pull Request。贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。
