# ip-legal

> 知识产权全流程辅助：冷启动访谈、商标查询与近似分析、专利侵权初步分析、著作权登记、知识产权清权 clearance。

本插件已完整交付，包含 5 个编排入口和 20 个深度子技能，覆盖知识产权日常实务全流程。

## 实践配置文件

**`ip-legal/CLAUDE.md`** 是唯一真相来源，存储权利人画像、IP 组合概况、维权立场、风险矩阵与文书风格偏好。

- 首次使用请运行 `/ip-legal:cold-start-interview` 初始化配置（约 10-15 分钟）
- 律师/IP 经理可直接编辑 `ip-legal/CLAUDE.md`，无需重新运行访谈
- 所有子技能在执行实质性工作前先读取此文件

## 模块与子技能

### 1. 冷启动访谈（cold-start-interview）

初始化或更新 `ip-legal/CLAUDE.md` 实践配置档案。顺序调用四个访谈子技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| identity-team | 采集权利人画像、IP 组合、执业角色、可用检索数据库 | `/ip-legal:identity-team` |
| enforcement-stance | 采集整体维权立场、商标/专利/著作权策略、清权严格度 | `/ip-legal:enforcement-stance` |
| risk-escalation | 采集风险等级定义、角色权限表、升级触发条件、维权时限参考 | `/ip-legal:risk-escalation` |
| style-search-databases | 采集文书风格、工作产物存放、检索数据库再确认、行业识别偏好 | `/ip-legal:style-search-databases` |

### 2. 商标查询与近似分析（trademark-search）

从检索查询到在先权利障碍的完整商标清查链路：

| 子技能 | 功能 |
|-------|------|
| search-query | 确认检索目标、尼斯分类、选择数据库、构造检索式、整理结果 |
| similarity-assessment | 音/形/义三要素比对、整体观察与隔离比对、混淆可能性评估 |
| goods-services-classification | 区分表类似群组查阅、关联性因素分析 |
| prior-rights-obstacles | 识别全类型在先权利（注册商标/驰名商标/著作权/字号等）、障碍分级评估 |

### 3. 专利侵权初步分析（patent-analysis）

全面覆盖原则与等同原则的双轨侵权分析：

| 子技能 | 功能 |
|-------|------|
| claim-construction | 拆解权利要求技术特征、理解保护边界 |
| all-elements-rule | 全面覆盖原则（字面侵权）逐一特征核查 |
| doctrine-of-equivalents | 等同原则分析（手段/功能/效果基本相同判断） |
| prior-art-defense | 现有技术抗辩——检索申请日前现有技术，构建不侵权抗辩 |

### 4. 著作权登记（copyright-registration）

作品类型判断到登记流程的全流程方案：

| 子技能 | 功能 |
|-------|------|
| work-type-determination | 识别著作权法保护类型（文字/美术/软件/视听等）、独创性审查、保护期评估 |
| ownership-determination | 职务作品/委托作品/合作作品/法人作品权属判定，识别权属争议风险 |
| registration-materials | 按作品类型列出申请材料清单、材料规范要求 |
| registration-process | 版权保护中心受理流程、审查周期参考、登记证书效力 |

### 5. 知识产权清权（ip-clearance）

多维度在先权利障碍检索与风险评估，给出 ✅可用 / ⚠有风险 / ❌不可用 三档清权结论：

| 子技能 | 功能 |
|-------|------|
| trademark-clearance | 拟用商标在先权利障碍检索、可注册性与可使用性分析 |
| patent-fto | 拟实施技术方案专利 FTO 初步分析、规避设计提示 |
| copyright-tradename-domain-clearance | 作品素材著作权合规、字号在先权利冲突、域名与商标冲突分析 |
| clearance-risk-report | 汇总多维清权发现，按 🔴🟠🟡🟢 四级评估，输出清权报告 |

## 主要斜杠命令

| 命令 | 用途 |
|-----|------|
| `/ip-legal:cold-start-interview` | 初始化或全量更新实践配置档案 |
| `/ip-legal:trademark-search` | 商标查询与近似分析（完整流程） |
| `/ip-legal:patent-analysis` | 专利侵权初步分析（完整流程） |
| `/ip-legal:copyright-registration` | 著作权登记全流程方案 |
| `/ip-legal:ip-clearance` | 知识产权清权（多维度） |

## 法律法规提示

本插件覆盖的主要法律依据：商标法（2019修正）、专利法（2020修正/2021施行）、著作权法（2020修正/2021施行）、反不正当竞争法（2019修正）及相关司法解释。上述法律均经历条号重排，具体条号引用前请通过[国家法律法规数据库](https://flk.npc.gov.cn)核实现行版本。
