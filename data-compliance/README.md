# data-compliance

> 数据合规全流程辅助：冷启动访谈、个人信息保护影响评估（PIA）、网络安全合规、数据安全合规、跨境数据传输评估。

本插件已完整交付，包含 5 个编排入口和 20 个深度子技能，覆盖数据合规日常实务全流程。

## 实践配置文件

**`data-compliance/CLAUDE.md`** 是唯一真相来源，存储数据处理者画像、合规立场、风险矩阵、升级触发条件与文书风格偏好。

- 首次使用请运行 `/data-compliance:cold-start-interview` 初始化配置（约 10-15 分钟）
- 律师/DPO 可直接编辑 `data-compliance/CLAUDE.md`，无需重新运行访谈
- 所有子技能在执行实质性工作前先读取此文件

## 模块与子技能

### 1. 冷启动访谈（cold-start-interview）

初始化或更新 `data-compliance/CLAUDE.md` 实践配置档案。顺序调用四个访谈子技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| identity-team | 采集执业角色（律师/DPO/法务/合规官）、团队信息与企业画像 | `/data-compliance:identity-team` |
| compliance-stance | 配置合规立场（PIA/网络安全/数据安全/跨境）与审查严格度 | `/data-compliance:compliance-stance` |
| risk-escalation | 配置风险等级定义、角色权限表与自动升级触发条件 | `/data-compliance:risk-escalation` |
| style-cross-border-policy | 配置文书风格偏好与跨境数据传输政策设置 | `/data-compliance:style-cross-border-policy` |

### 2. 个人信息保护影响评估（pia-generation）

编排四个子技能，按《个人信息保护法》第 55-56 条生成完整 PIA 报告：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| trigger-consent-basis | 判断是否触发 PIA 要求，验证同意/合法性基础 | `/data-compliance:trigger-consent-basis` |
| data-mapping-necessity | 数据流转映射与必要性/比例性评估 | `/data-compliance:data-mapping-necessity` |
| risk-mitigation-assessment | 隐私风险评估与缓解措施 adequacy 评价 | `/data-compliance:risk-mitigation-assessment` |
| pia-report-assembly | 组装 PIA 报告文档 | `/data-compliance:pia-report-assembly` |

### 3. 网络安全合规（network-security-compliance）

编排四个子技能，按《网络安全法》（2017）进行全面合规审查：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| mlps-grading | 等级保护定级与备案审查 | `/data-compliance:mlps-grading` |
| cii-protection | 关键信息基础设施识别与特殊保护义务 | `/data-compliance:cii-protection` |
| operator-obligations | 网络运营者一般安全义务审查（实名制/日志/技术措施/应急预案） | `/data-compliance:operator-obligations` |
| personal-info-collection | 个人信息收集使用合规审查（CSL-PIPL 衔接） | `/data-compliance:personal-info-collection` |

### 4. 数据安全合规（data-security-compliance）

编排四个子技能，按《数据安全法》（2021）进行合规检查：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| data-classification-grading | 数据分类分级制度建设/审查 | `/data-compliance:data-classification-grading` |
| important-data-handling | 重要数据识别与处理义务合规 | `/data-compliance:important-data-handling` |
| security-management-system | 数据安全管理制度建设/审查 | `/data-compliance:security-management-system` |
| risk-assessment-reporting | 风险评估与安全事件报告机制建设 | `/data-compliance:risk-assessment-reporting` |

### 5. 跨境数据传输评估（cross-border-assessment）

编排四个子技能，按《个人信息保护法》第 38-40 条及 CAC 跨境规定评估跨境合规：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| pathway-determination | 判断适用路径（安全评估/标准合同/保护认证） | `/data-compliance:pathway-determination` |
| security-assessment-filing | 安全评估申报（路径一） | `/data-compliance:security-assessment-filing` |
| standard-contract | 标准合同条款备案（路径三） | `/data-compliance:standard-contract` |
| cross-border-assembly | 组装跨境合规报告 | `/data-compliance:cross-border-assembly` |

## 主要斜杠命令

| 命令 | 用途 |
|-----|------|
| `/data-compliance:cold-start-interview` | 初始化或全量更新实践配置档案 |
| `/data-compliance:pia-generation` | 个人信息保护影响评估（完整流程） |
| `/data-compliance:network-security-compliance` | 网络安全合规审查（完整流程） |
| `/data-compliance:data-security-compliance` | 数据安全合规检查（完整流程） |
| `/data-compliance:cross-border-assessment` | 跨境数据传输评估（完整流程） |

## 法律法规提示

本插件覆盖的主要法律依据：个人信息保护法（2021）、网络安全法（2017）、数据安全法（2021）、数据出境安全评估办法（2022）、个人信息出境标准合同办法（2023）及相关国家标准（GB/T 35273 等）。上述法律均经历条号重排，具体条号引用前请通过[国家法律法规数据库](https://flk.npc.gov.cn)核实现行版本。

## 本插件不做什么

- 不提供法律意见或法律结论
- 不替代执业律师或 DPO 的判断
- 不保证审查的完整性
- 不自动向监管部门提交备案或申报文件
