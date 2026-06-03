# AI for China Legal — 面向中国大陆律师的 AI 法律工具套件

> **重要声明**: 本工具所有输出均为供律师审查的草稿，非法律建议，非法律结论，不能替代执业律师。律师需对最终作品负责。

## 概述

AI for China Legal 是一套模块化的法律 AI 插件套件，为 Qwen Code、Kimi Code、OpenCode 等 Agent 平台提供端到端的中国大陆法律工作流辅助能力。

本项目的架构和设计模式参考了 Anthropic 的 [claude-for-legal](https://github.com/anthropics/claude-for-legal) 项目，但针对中国大陆法律体系、执业环境和监管要求进行了全面的中国化适配。

## 核心概念

| 概念 | 说明 |
|------|------|
| **Plugins (插件)** | 自包含的业务领域包（如商事合同、诉讼仲裁），包含 Skills、Agents 和实践配置文件模板 |
| **Skills (技能)** | 领域专业知识，通过斜杠命令调用（如 `/commercial-legal:review`）或自动触发 |
| **Agents (代理)** | 定时或事件驱动的工作流（如裁判文书监控、法规动态监控），在后台运行 |
| **实践配置文件** | 通过"冷启动访谈"生成的个性化配置，描述团队的审查立场、升级规则和文书风格 |
| **Connectors (连接器)** | 基于 MCP 协议的服务器，连接外部数据源（裁判文书网、企业信用系统、法规库等） |

## 快速开始

### 安装（以 Qwen Code 为例）

1. **添加市场源** — 将本项目路径添加为 Skill 市场源
2. **选择插件** — 根据你的执业领域选择对应插件
3. **运行设置** — 执行 `/<plugin>:cold-start-interview` 完成冷启动访谈
4. **连接数据源** — 配置裁判文书网、企业信用信息公示系统等 MCP 连接器

### 哪个插件适合我？

| 你是… | 安装… | 第一个命令 |
|---|---|---|
| 商事合同律师 / 法务 | `commercial-legal` | `/commercial-legal:review` |
| 诉讼律师 / 法务 | `litigation-legal` | `/litigation-legal:matter-intake` |
| 劳动法律师 / HR 法务 | `employment-legal` | `/employment-legal:hiring-review` |
| 数据合规律师 / DPO | `data-compliance` | `/data-compliance:pia-generation` |
| 知识产权律师 | `ip-legal` | `/ip-legal:clearance` |
| 建设工程律师 | `construction-legal` | `/construction-legal:contract-review` |
| 婚姻家事律师 | `family-legal` | `/family-legal:divorce-agreement` |
| 刑事合规律师 | `criminal-compliance` | `/criminal-compliance:risk-assessment` |
| 监管合规律师 | `regulatory-legal` | `/regulatory-legal:reg-feed-watcher` |
| AI 治理负责人 | `ai-governance` | `/ai-governance:use-case-triage` |
| 法学生 / 法考备考 | `law-student` | `/law-student:case-brief` |
| 法律援助律师 | `legal-aid` | `/legal-aid:client-intake` |
| 法律运营 / 寻找技能 | `legal-builder-hub` | `/legal-builder-hub:registry-browser` |

## 插件列表

### 交易与咨询类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [商事合同](commercial-legal/README.md) | 买卖合同、技术服务合同、租赁合同审查 | 待开发 |
| [数据合规](data-compliance/README.md) | 个保法/数据安全法合规、PIA、数据出境 | 待开发 |
| [劳动人事](employment-legal/README.md) | 劳动合同、竞业限制、裁员方案 | 待开发 |
| [知识产权](ip-legal/README.md) | 商标/专利/著作权初步筛查 | 待开发 |
| [AI 治理](ai-governance/README.md) | 深度合成备案、算法备案、生成式 AI 合规 | 待开发 |
| [监管合规](regulatory-legal/README.md) | 监管动态监控、行政处罚应对 | 待开发 |

### 诉讼类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [诉讼仲裁](litigation-legal/README.md) | 案件管理、证据目录、代理词起草 | 待开发 |

### 中国特有领域

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [建设工程](construction-legal/README.md) | 施工合同、工程款争议、商品房买卖 | 待开发 |
| [婚姻家事](family-legal/README.md) | 离婚协议、遗嘱、继承 | 待开发 |
| [刑事合规](criminal-compliance/README.md) | 刑事风险评估、合规不起诉 | 待开发 |

### 学习与实务类

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [法考培训](law-student/README.md) | 法考刷题、案例研习 | 待开发 |
| [法律援助](legal-aid/README.md) | 法援案件管理、客户 intake | 待开发 |

### 生态系统

| 插件 | 说明 | Skills 数量 |
|------|------|------------|
| [法律技能中心](legal-builder-hub/README.md) | 社区技能发现、安装、安全审查 | 待开发 |

## 项目结构

```
ai-for-china-legal/
├── .claude-plugin/
│   └── marketplace.json          # 市场清单
├── CLAUDE.md                     # 全局配置模板
├── README.md                     # 本文件
├── CONNECTORS.md                 # MCP 连接器说明
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

### 中国特有 MCP 连接器

| 连接器 | 数据源 | 用途 |
|--------|--------|------|
| 裁判文书网 | wenshu.court.gov.cn | 案例检索 |
| 企业信用 | gsxt.gov.cn | 工商查询 |
| 商标查询 | sbj.cnipa.gov.cn | 商标近似查询 |
| 专利查询 | pss-system.cnipa.gov.cn | 专利检索 |
| 执行信息 | zxgk.court.gov.cn | 失信被执行查询 |
| 法规库 | 北大法宝/威科先行 | 法规检索 |
| 微信/钉钉 | 企业微信/钉钉 API | 通知推送 |

## 开发路线

| 阶段 | 内容 | 状态 |
|------|------|------|
| Phase 1 | 项目骨架搭建 | ✅ 完成 |
| Phase 2 | 核心插件开发 (商事/诉讼/劳动) | 🚧 进行中 |
| Phase 3 | 中国化实践配置 | 待开始 |
| Phase 4 | MCP 连接器开发 | 待开始 |
| Phase 5 | 定时 Agent 开发 | 待开始 |
| Phase 6 | 跨平台适配 | 待开始 |

## 许可证

本项目参考 MIT 许可证（待正式确定）

## 贡献

欢迎提交 Issue 和 Pull Request。贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。
