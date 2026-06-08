# ai-governance

> AI 治理合规全流程辅助：冷启动访谈、深度合成备案、算法备案、生成式 AI 合规、AI 应用场景分类。

本插件已完整交付，包含 5 个编排入口和 20 个深度子技能，覆盖 AI 治理合规日常实务全流程。

## 实践配置文件

**`ai-governance/CLAUDE.md`** 是唯一真相来源，存储企业画像、AI 应用概况、合规立场、风险矩阵与文书风格偏好。

- 首次使用请运行 `/ai-governance:cold-start-interview` 初始化配置（约 10-15 分钟）
- 律师/合规官/法务可直接编辑 `ai-governance/CLAUDE.md`，无需重新运行访谈
- 所有子技能在执行实质性工作前先读取此文件

## 模块与子技能

### 1. 冷启动访谈（cold-start-interview）

初始化或更新 `ai-governance/CLAUDE.md` 实践配置档案。顺序调用四个访谈子技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| identity-enterprise-profile | 采集执业角色、企业画像与 AI 应用概况 | `/ai-governance:identity-enterprise-profile` |
| compliance-stance-scope | 配置合规立场（备案/安全评估/内容审核）与审查严格度 | `/ai-governance:compliance-stance-scope` |
| risk-escalation | 配置风险等级定义、角色权限表与自动升级触发条件 | `/ai-governance:risk-escalation` |
| style-regulatory-resources | 配置文书风格偏好与监管资源（网信办/工信部/科技部） | `/ai-governance:style-regulatory-resources` |

### 2. 深度合成备案（deep-synthesis-filing）

编排四个子技能，按《互联网信息服务深度合成管理规定》完成深度合成服务备案：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| deep-synthesis-scope-identification | 识别是否属于深度合成服务及具体类别 | `/ai-governance:deep-synthesis-scope-identification` |
| filing-material-preparation | 备案材料准备与审查 | `/ai-governance:deep-synthesis-filing-material-preparation` |
| security-assessment-filing | 安全评估与备案申报 | `/ai-governance:security-assessment-filing` |
| post-filing-compliance | 备案后持续合规义务管理 | `/ai-governance:post-filing-compliance` |

### 3. 算法备案（algorithm-filing）

编排四个子技能，按《互联网信息服务算法推荐管理规定》完成算法备案：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| algorithm-type-identification | 识别算法推荐类型（生成合成/个性化推送/排序精选/检索过滤/调度决策） | `/ai-governance:algorithm-type-identification` |
| filing-requirement-analysis | 备案要求分析与适用条件判断 | `/ai-governance:filing-requirement-analysis` |
| filing-material-preparation | 备案材料准备（算法自评估报告/算法机制说明等） | `/ai-governance:algorithm-filing-material-preparation` |
| post-filing-change-management | 备案后变更管理（算法更新/重大变更报告） | `/ai-governance:post-filing-change-management` |

### 4. 生成式 AI 合规（generative-ai）

编排四个子技能，按《生成式人工智能服务管理暂行办法》确保生成式 AI 服务合规：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| service-type-compliance-identification | 识别生成式 AI 服务类型与适用合规要求 | `/ai-governance:service-type-compliance-identification` |
| training-data-compliance | 训练数据合规审查（来源合法性/个人信息保护/知识产权） | `/ai-governance:training-data-compliance` |
| content-safety-mechanism | 内容安全机制建设（过滤/标识/审核/应急处置） | `/ai-governance:content-safety-mechanism` |
| user-protection-filing | 用户权益保护与备案（用户协议/投诉机制/个人信息保护） | `/ai-governance:user-protection-filing` |

### 5. AI 应用场景分类（ai-use-case-classification）

编排四个子技能，对企业 AI 应用场景进行全面盘点与合规分类：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| use-case-inventory | AI 应用场景全面盘点 | `/ai-governance:use-case-inventory` |
| risk-level-classification | 按风险等级分类（高/中/低） | `/ai-governance:risk-level-classification` |
| compliance-requirement-mapping | 合规要求映射（每个场景对应的法规义务） | `/ai-governance:compliance-requirement-mapping` |
| classification-report-output | 输出分类报告与合规建议 | `/ai-governance:classification-report-output` |

## 主要斜杠命令

| 命令 | 用途 |
|-----|------|
| `/ai-governance:cold-start-interview` | 初始化或全量更新实践配置档案 |
| `/ai-governance:deep-synthesis-filing` | 深度合成备案（完整流程） |
| `/ai-governance:algorithm-filing` | 算法备案（完整流程） |
| `/ai-governance:generative-ai` | 生成式 AI 合规审查（完整流程） |
| `/ai-governance:ai-use-case-classification` | AI 应用场景分类与合规映射（完整流程） |

## 法律法规提示

本插件覆盖的主要法律依据：互联网信息服务深度合成管理规定（2023）、互联网信息服务算法推荐管理规定（2022）、生成式人工智能服务管理暂行办法（2023）、网络安全法（2017）、数据安全法（2021）、个人信息保护法（2021）、科学技术进步法（2021修订）及相关国家标准。具体条号引用前请通过[国家法律法规数据库](https://flk.npc.gov.cn)核实现行版本。

## 本插件不做什么

- 不提供法律意见或法律结论
- 不替代执业律师的判断
- 不保证审查的完整性
- 不自动向网信办或任何监管机构提交备案或申报文件
