# regulatory-legal

> 行政监管合规全流程辅助：冷启动访谈、监管动态监测、监管报告起草、行政处罚应对、合规体系建设。

本插件已完整交付，包含 5 个编排入口和 20 个深度子技能，覆盖行政监管合规日常实务全流程。

## 实践配置文件

**`regulatory-legal/CLAUDE.md`** 是唯一真相来源，存储企业画像、合规立场、风险矩阵、升级触发条件与文书风格偏好。

- 首次使用请运行 `/regulatory-legal:cold-start-interview` 初始化配置（约 10-15 分钟）
- 律师/合规官/法务可直接编辑 `regulatory-legal/CLAUDE.md`，无需重新运行访谈
- 所有子技能在执行实质性工作前先读取此文件

## 模块与子技能

### 1. 冷启动访谈（cold-start-interview）

初始化或更新 `regulatory-legal/CLAUDE.md` 实践配置档案。顺序调用四个访谈子技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| identity-enterprise-profile | 采集执业角色、企业画像与可用集成资源 | `/regulatory-legal:identity-enterprise-profile` |
| compliance-stance-scope | 配置合规立场（主动合规/处罚应对/中立）与审查严格度 | `/regulatory-legal:compliance-stance-scope` |
| risk-escalation | 配置风险等级定义、角色权限表与自动升级触发条件 | `/regulatory-legal:risk-escalation` |
| style-regulatory-resources | 配置文书风格偏好与地方监管资源 | `/regulatory-legal:style-regulatory-resources` |

### 2. 监管动态监测（regulatory-monitoring）

编排四个子技能，系统化追踪适用于企业的监管规则变化（新规/修订/废止/征求意见稿）：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| authority-rule-source-identification | 识别监管机关与规则来源 | `/regulatory-legal:authority-rule-source-identification` |
| capture-classification | 捕获并分类监管动态 | `/regulatory-legal:capture-classification` |
| impact-gap-assessment | 评估新规影响与合规差距 | `/regulatory-legal:impact-gap-assessment` |
| alert-register | 生成监管预警简报与合规义务台账 | `/regulatory-legal:alert-register` |

### 3. 监管报告起草（regulatory-report）

编排四个子技能，起草向监管机构提交的各种报告（定期报告/专项报告/重大事件报告/整改报告/自查报告）：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| report-type-requirement-identification | 识别报告类型与具体要求 | `/regulatory-legal:report-type-requirement-identification` |
| data-fact-gathering | 数据采集与事实整理 | `/regulatory-legal:data-fact-gathering` |
| structure-drafting | 报告结构与正文起草 | `/regulatory-legal:structure-drafting` |
| compliance-statement-submission | 合规声明与提交注意事项 | `/regulatory-legal:compliance-statement-submission` |

### 4. 行政处罚应对（penalty-response）

编排四个子技能，应对行政处罚通知、决定或检查通知：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| legality-review | 行政处罚合法性审查（主体/程序/事实/法律适用） | `/regulatory-legal:legality-review` |
| statement-defense-hearing | 陈述/申辩/听证材料准备 | `/regulatory-legal:statement-defense-hearing` |
| mitigation-no-penalty | 从轻/减轻/不予处罚论证 | `/regulatory-legal:mitigation-no-penalty` |
| review-litigation-bridge | 行政复议/行政诉讼衔接方案 | `/regulatory-legal:review-litigation-bridge` |

### 5. 合规体系建设（compliance-system）

编排四个子技能，按 PDCA 循环系统化建设企业合规管理体系：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| compliance-risk-identification | 合规风险识别与评估 | `/regulatory-legal:compliance-risk-identification` |
| policy-duty-design | 合规制度与职责设计 | `/regulatory-legal:policy-duty-design` |
| operation-training | 合规运行与培训 | `/regulatory-legal:operation-training` |
| evaluation-improvement | 合规评价与持续改进 | `/regulatory-legal:evaluation-improvement` |

## 主要斜杠命令

| 命令 | 用途 |
|-----|------|
| `/regulatory-legal:cold-start-interview` | 初始化或全量更新实践配置档案 |
| `/regulatory-legal:regulatory-monitoring` | 监管动态监测（完整流程） |
| `/regulatory-legal:regulatory-report` | 监管报告起草（完整流程） |
| `/regulatory-legal:penalty-response` | 行政处罚应对（完整流程） |
| `/regulatory-legal:compliance-system` | 合规体系建设（完整流程） |

## 法律法规提示

本插件覆盖的主要法律依据：行政处罚法（2021修订）、行政复议法（2023修订）、行政诉讼法（2017修正）、行政许可法、各行业的专门监管法规及部门规章。具体条号引用前请通过[国家法律法规数据库](https://flk.npc.gov.cn)核实现行版本。

## 本插件不做什么

- 不提供法律意见或法律结论
- 不替代执业律师的判断
- 不自动向监管机构提交任何文件或报告
- 不保证行政处罚的结果
