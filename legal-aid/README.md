# legal-aid

> 法律援助法律技能套件（v0.2.0）

## 概述

legal-aid 插件覆盖法律援助工作全流程，包含 5 大模块、5 个编排入口和 20 个深层子技能。

## 模块结构

### 冷启动访谈（cold-start-interview）

初始化实践配置文件（`CLAUDE.md`），4 个子技能：

| 子技能 | 职责 |
|-------|------|
| identity-role-profile | 身份与角色画像 |
| service-stance-scope | 服务立场与范围 |
| quality-escalation | 质量标准与升级 |
| style-local-resources | 文书风格与本地资源 |

### 客户 intake（client-intake）

法援案件当事人信息收集与初步筛选，4 个子技能：

| 子技能 | 职责 |
|-------|------|
| party-identity-verification | 当事人身份与基本信息核实 |
| case-fact-collection | 案件事实初步收集 |
| eligibility-preliminary-assessment | 法援资格初步评估 |
| conflict-check-referral | 利益冲突审查与案件分流 |

### 案件管理（case-management）

法援案件全流程管理，4 个子技能：

| 子技能 | 职责 |
|-------|------|
| case-docket-assignment | 案件登记与指派 |
| case-progress-tracking | 案件进展跟踪 |
| quality-review-supervision | 质量审查与监督 |
| case-closure-archiving | 结案归档与统计 |

### 法律文书模板（document-templates）

法援常用文书起草与审核，4 个子技能：

| 子技能 | 职责 |
|-------|------|
| legal-aid-application-form | 法律援助申请书 |
| power-of-attorney-agreement | 委托代理协议/指定辩护函 |
| litigation-document-drafting | 诉讼文书起草 |
| case-closure-report | 结案报告与质量自查 |

### 法律援助申请（legal-aid-application）

法律援助申请全流程，4 个子技能：

| 子技能 | 职责 |
|-------|------|
| eligibility-assessment | 援助条件评估 |
| material-preparation | 申请材料准备 |
| application-submission-tracking | 申请提交与审查跟踪 |
| review-result-response | 审查结果应对 |

## 配置文件

实践配置文件（`CLAUDE.md`）由冷启动访谈生成，所有技能从此文件读取个性化设置。

## 核心法律依据

- 法律援助法（2021年，2022年1月1日施行）
- 法律援助条例（国务院）
- 办理法律援助案件程序规定（司法部）
- 法律援助质量标准和评估办法

所有条文号均标注 `[待验证]`，引用前请通过国家法律法规数据库核验。
