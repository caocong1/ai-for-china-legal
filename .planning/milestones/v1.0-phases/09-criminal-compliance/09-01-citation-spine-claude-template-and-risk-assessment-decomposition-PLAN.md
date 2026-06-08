---
phase: 09-criminal-compliance
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - criminal-compliance/skills/_shared/legal-basis-conventions.md
  - criminal-compliance/skills/_shared/criminal-law-citations.md
  - criminal-compliance/skills/_shared/practice-profile-schema.md
  - criminal-compliance/CLAUDE.md
  - criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md
  - criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md
  - criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md
  - criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md
  - criminal-compliance/skills/risk-assessment/SKILL.md
autonomous: true
requirements:
  - CRIMINAL-CITATION-SPINE
  - PROFILE-SCHEMA
  - CLAUDE-TEMPLATE
  - RISK-ASSESSMENT-DECOMP
user_setup: []

must_haves:
  truths:
    - "存在一个刑事合规专用的法律依据引用规范（来源标签 + 法条/司法解释/规范性文件 与 案例/学说 分类 + 待验证 + 具体罪名条号一律待验证纪律 + 涉案企业合规规范性文件快速演进标注），所有 criminal-compliance 技能可复用"
    - "存在一个可复用的 刑法总则(单位犯罪第30/31条·自首第67条·立功第68条·缓刑第72条)/刑事诉讼法(不起诉第177条·认罪认罚从宽第15条)/涉案企业合规规范性文件/具体罪名构成要件占位 引用库，中度把握锚点（单位犯罪第30条/双罚制第31条/自首第67条/立功第68条/缓刑第72条/不起诉第177条/认罪认罚第15条）明确标注「建议复核」，具体罪名条号与定罪量刑数额一律待验证、以构成要件描述呈现，涉案企业合规规范性文件描述规则不硬写文号，不臆造"
    - "存在刑事合规版实践配置文件契约，明确字段、存储位置（criminal-compliance/CLAUDE.md）、技能读取规则，并映射到 criminal-compliance/CLAUDE.md 章节，立场字段区分事前合规体系建设/风险评估/合规不起诉/单位犯罪辩护，且含是否已涉案与涉刑强制升级字段"
    - "新建 criminal-compliance/CLAUDE.md 实践配置模板（执业角色与企业画像 / 合规与服务立场 事前合规/风险评估/合规不起诉/单位犯罪辩护 + 合规严格度 + 是否已涉案 / 刑事风险校准 / 升级矩阵 含已立案·强制措施·具体罪名风险·重大涉案强制升级刑事辩护律师 / 文书风格 / 输出 / 共享护栏 含合规预防与辩护立场护栏·不提供规避侦查或逃避责任方法护栏·律师审查护栏·涉刑强制升级护栏·地方涉案企业合规试点提示），可由冷启动访谈填充、律师可直接编辑"
    - "律师/合规官/法务可以单独触发刑事风险评估的任一子能力（行业高发罪名识别 / 岗位与行为风险点 / 风险等级与可能性评估 / 风险清单与控制建议输出）而无需运行整个流程"
    - "每个 risk-assessment 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；现有 risk-assessment 浅骨架三步纲要无丢失迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "criminal-compliance/skills/_shared/legal-basis-conventions.md"
      provides: "刑事合规语境的 法条/司法解释/规范性文件 + 案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表 + 具体罪名条号一律待验证纪律 + 涉案企业合规规范性文件快速演进标注 + 行业/机构定位（检察机关·公安·行业监管·第三方监督评估机制）+ 合规预防与辩护定位"
      contains: "待验证"
      min_lines: 70
    - path: "criminal-compliance/skills/_shared/criminal-law-citations.md"
      provides: "刑法总则(单位犯罪第30/31条·自首第67条·立功第68条·缓刑第72条)/刑事诉讼法(不起诉第177条·认罪认罚从宽第15条)/涉案企业合规规范性文件/具体罪名构成要件占位 的可复用引用库（按来源分类、中度把握锚点 + 待验证）"
      contains: "第30条"
      min_lines: 150
    - path: "criminal-compliance/skills/_shared/practice-profile-schema.md"
      provides: "刑事合规版实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 criminal-compliance/CLAUDE.md 映射 + 事前合规/风险评估/合规不起诉/单位犯罪辩护立场选择 + 是否已涉案与涉刑强制升级字段"
      min_lines: 70
    - path: "criminal-compliance/CLAUDE.md"
      provides: "刑事合规实践配置模板：执业角色与企业画像 / 谁在使用 / 可用集成 检察公安监管第三方监督评估 / 合规与服务立场 / 刑事风险校准 / 升级矩阵 含强制升级 / 文书风格 / 输出 / 共享护栏 含合规预防与辩护立场护栏·不提供规避侦查方法护栏·律师审查护栏·涉刑强制升级护栏·地方试点提示"
      contains: "强制升级"
      min_lines: 90
    - path: "criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md"
      provides: "行业高发罪名识别子技能（按行业识别高发刑事风险点·构成要件描述·具体罪名条号待验证）"
      contains: "罪名"
      min_lines: 150
    - path: "criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md"
      provides: "岗位与行为风险点子技能（采购·销售·财务·高管·法务 岗位行为风险点 职务侵占·挪用资金·单位行贿·内幕交易等 构成要件描述）"
      contains: "岗位"
      min_lines: 150
    - path: "criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md"
      provides: "风险等级与可能性评估子技能（可能性×影响矩阵·刑事风险等级·是否已现实化 苗头线索立案）"
      contains: "风险等级"
      min_lines: 150
    - path: "criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md"
      provides: "风险清单与控制建议输出子技能（风险点·罪名·岗位·可能性·影响·控制建议·责任部门·刑事风险评估报告）"
      contains: "风险清单"
      min_lines: 150
    - path: "criminal-compliance/skills/risk-assessment/SKILL.md"
      provides: "刑事风险评估编排入口（指向四个子技能 + 入口级护栏含涉案情形识别与涉刑强制升级）"
      min_lines: 40
  key_links:
    - from: "criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md"
      to: "criminal-compliance/skills/_shared/criminal-law-citations.md"
      via: "引用单位犯罪总则与具体罪名构成要件（刑法第30/31条 + 具体罪名待验证）"
      pattern: "criminal-law-citations|第30条|第31条|罪名"
    - from: "criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md"
      to: "criminal-compliance/CLAUDE.md"
      via: "读取刑事风险校准等级与是否已涉案"
      pattern: "CLAUDE.md|风险等级|涉案|强制升级"
    - from: "criminal-compliance/skills/risk-assessment/SKILL.md"
      to: "四个 risk-assessment 子技能"
      via: "编排入口指向子技能路径"
      pattern: "industry-crime-identification|position-conduct-risk|risk-level-likelihood|risk-list-control-output"
    - from: "criminal-compliance/skills/_shared/practice-profile-schema.md"
      to: "criminal-compliance/CLAUDE.md"
      via: "映射访谈/立场/涉案/升级字段到实践配置模板章节（含事前合规/合规不起诉/单位犯罪辩护立场与涉刑强制升级）"
      pattern: "服务立场|合规不起诉|是否已涉案|强制升级"
---

<objective>
将刑事合规插件从 v0.1.0 的扁平浅骨架深化为深层子技能体系，建立全插件复用的法律引用脊柱、刑事合规版实践配置契约，并**新建** criminal-compliance/CLAUDE.md 实践配置模板。

本计划交付四块内容：
1. **刑事合规引用脊柱（citation spine）** — 一套所有 criminal-compliance 技能共享的法律依据引用规范（来源标签 + 法条/司法解释/规范性文件 与 案例/学说 分类 + 待验证 + **具体罪名条号一律待验证纪律** + **涉案企业合规规范性文件快速演进标注** + 行业/机构定位 + 合规预防与辩护定位），以及一个可复用的 刑法总则/刑事诉讼法/涉案企业合规规范性文件/具体罪名构成要件占位 引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 09-02 / 09-03 直接引用，避免每个技能重复维护条文。
2. **刑事合规版实践配置契约** — criminal-compliance/skills/_shared/practice-profile-schema.md：明确配置文件是什么、在哪（criminal-compliance/CLAUDE.md）、技能怎么读，以及访谈/立场/涉案/升级字段与 criminal-compliance/CLAUDE.md 章节的映射；**立场字段区分事前合规体系建设/风险评估/合规不起诉/单位犯罪辩护**（刑事合规工作的核心变量），并含**是否已涉案与涉刑强制升级字段**。
3. **新建 criminal-compliance/CLAUDE.md 实践配置模板** — 刑事合规语境的散文模板：执业角色与企业画像 / 谁在使用 / 可用集成（检察·公安·行业监管·第三方监督评估机制资源）/ 合规与服务立场（事前合规/风险评估/合规不起诉/单位犯罪辩护 + 合规严格度 + 是否已涉案）/ 刑事风险校准 / 升级矩阵（已立案/强制措施/具体罪名风险/重大涉案强制升级刑事辩护律师）/ 文书风格 / 输出 / 共享护栏（合规预防与辩护立场护栏 / 不提供规避侦查或逃避责任方法护栏 / 律师审查护栏 / 涉刑强制升级护栏 / 地方涉案企业合规试点提示）。当前插件**尚无此文件**，本计划首次创建。
4. **刑事风险评估拆分** — 按 CONTEXT「深层子技能拆分」决策，将 risk-assessment（现 ~16 行浅骨架）拆为四个可独立触发的子技能：行业高发罪名识别 / 岗位与行为风险点 / 风险等级与可能性评估 / 风险清单与控制建议输出。现有三步纲要（需求收集 / 法律分析 / 输出生成）拆分迁移并大幅深化，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分 + 5 能力面，现实只有 4 个扁平浅骨架且无 CLAUDE.md」的核心 gap，并为刑事合规语境建立可复用引用脊柱与配置真相来源。引用脊柱、配置契约与 CLAUDE.md 先行，保证三个计划的引用与配置读取一致。
Output: 1 个引用规范 + 1 个引用库 + 1 个配置契约 + 1 个新建 CLAUDE.md + 4 个 risk-assessment 子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（刑法、刑事诉讼法 为分析基础，相关司法解释与涉案企业合规规范性文件 为补充）；指导性案例作参考非判例法（最高检/最高院涉案企业合规典型案例可参考，案号标待验证）；法院层级识别（基层/中院/高院/最高院四级 + 检察机关 基层院·分院·省院·最高检）；行业监管特色（检察机关·公安机关·行业监管 税务·市场监管·证监·药监·环保·应急·网信 ·第三方监督评估机制）；执业环境适配（刑事合规律师 / 企业合规官 / 企业法务 / 当事人本人 / 非律师但有律师可咨询）。命名约定：技能名 kebab-case；斜杠命令 /criminal-compliance:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/规范性文件 与 案例/学说 分类，带来源标签。中度把握锚点（须标「已核实锚点（中度把握），建议复核」）：单位犯罪定义=刑法第30条；单位犯罪双罚制=第31条；自首=第67条；立功=第68条；缓刑条件=第72条；不起诉=刑事诉讼法第177条；认罪认罚从宽=刑事诉讼法第15条。**各具体罪名条号（虚开增值税专用发票罪·非法吸收公众存款罪·集资诈骗罪·职务侵占罪·挪用资金罪·单位行贿罪·对非国家工作人员行贿罪·污染环境罪·重大责任事故罪等）一律标 `[待验证]`，以构成要件描述呈现，绝不臆造具体罪名条号与法定刑档。** 定罪量刑数额标准（虚开税额·非法吸收金额·贿赂数额）一律描述规则 + `[待验证]`，不写裸数额裸条号。**涉案企业合规试点、第三方监督评估机制管理规定（2021）、认罪认罚从宽指导意见属规范性文件且快速演进，一律描述规则并标 `[待验证]`，不硬写文号、发文日期、具体条款编号。** 司法解释具体条号、案例案号一律标 `[待验证]`，描述规则呈现，绝不臆造。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/09-criminal-compliance/09-CONTEXT.md
@CLAUDE.md
@family-legal/CLAUDE.md
@criminal-compliance/skills/risk-assessment/SKILL.md
@criminal-compliance/skills/cold-start-interview/SKILL.md
@criminal-compliance/.claude-plugin/plugin.json
@family-legal/skills/_shared/legal-basis-conventions.md
@family-legal/skills/_shared/family-law-citations.md
@family-legal/skills/_shared/practice-profile-schema.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立刑事合规法律引用脊柱（来源分类规范 + 刑法总则/刑事诉讼法/涉案企业合规规范性文件/具体罪名构成要件占位 引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考、法院层级识别、行业监管特色；文件格式约定；命名约定）
    - family-legal/skills/_shared/legal-basis-conventions.md（最近一次领域改编范式 — 来源分类、来源标签表、待验证规则、司法解释条号保守标注章节、中度把握锚点表、保守纪律；刑事合规版以此为最新骨架改编，新增「规范性文件」来源类别）
    - family-legal/skills/_shared/family-law-citations.md（引用库结构模板 — 中度把握锚点「建议复核」标注方式、版本说明块、占位案例/学说结构、中度把握锚点汇总表、引用库使用说明；刑事合规版直接借鉴结构）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准，了解 ## 法律依据 分类范式将如何被引用脊柱支撑）
  </read_first>
  <files>
    criminal-compliance/skills/_shared/legal-basis-conventions.md,
    criminal-compliance/skills/_shared/criminal-law-citations.md
  </files>
  <action>
    创建 criminal-compliance/skills/_shared/legal-basis-conventions.md：定义刑事合规全插件统一的法律依据引用规范。以 family-legal 同名文件为最新骨架改编，章节包含：「来源分类」（按刑事合规语境分层：法律=刑法、刑事诉讼法 等全国人大及其常委会制定；司法解释=最高人民法院/最高人民检察院发布的定罪量刑标准与办案规定，**具体条号与数额标准一律标 `[待验证]`，描述规则呈现**；**规范性文件=涉案企业合规改革试点工作相关文件、企业合规第三方监督评估机制管理规定（2021）、认罪认罚从宽制度指导意见 等检察机关/多部门联合发布的规范性文件——属快速演进文件，一律描述规则并标 `[待验证]`，不硬写文号·发文日期·具体条款编号**；案例=最高检/最高院涉案企业合规典型案例、指导性案例可参考，**案号一律 `[待验证]`**，不具判例法约束力；学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用五标签 [法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]，不新造冲突标签）；「待验证标记规则」（凡模型回忆的条文号、**具体罪名条号**、定罪量刑数额标准、司法解释条号、规范性文件文号、案例案号、距最后更新超 6 个月的法规，均须标 `[待验证]` 并说明验证途径）；**「具体罪名条号一律待验证」纪律章节**（**关键章节**：刑法总则锚点 单位犯罪第30/31条·自首第67条·立功第68条·缓刑第72条 与刑诉法不起诉第177条·认罪认罚第15条 可在标「建议复核」前提下引用；但**各具体罪名条号 一律标 `[待验证]`，以构成要件描述呈现，绝不臆造具体罪名条号与法定刑档**；定罪量刑数额标准 一律描述规则 + `[待验证]`，不写裸数额裸条号；列举须谨慎处理的高频具体罪名：虚开增值税专用发票罪·非法吸收公众存款罪·集资诈骗罪·职务侵占罪·挪用资金罪·单位行贿罪·对非国家工作人员行贿罪·串通投标罪·污染环境罪·重大责任事故罪·非法经营罪 等，**一律构成要件描述 + 待验证**）；**「涉案企业合规规范性文件快速演进标注」纪律章节**（**关键章节**：涉案企业合规改革仍处试点演进中，文号·机制细节·有效合规认定标准快速变化，**一律描述规则并标 `[待验证 — 规范性文件快速演进，须核实现行版本]`，不硬写文号·发文日期·条款编号**）；「成文法优先与案例定位」（成文法为分析基础；指导性案例/典型案例仅作参考、明确不具判例法约束力；案号默认标待验证）；「法院/机构层级与定位」（法院四级：基层/中级/高级/最高院；**检察机关四级：基层人民检察院·分院·省级院·最高检，不起诉决定权在检察机关**；公安机关侦查；行业监管 税务·市场监管·证监·药监·环保·应急·网信；**第三方监督评估机制管理委员会与评估组织**；涉及特定地区时标 `[地方 flagged — 需核实地方涉案企业合规试点口径与地方裁判尺度]`）；**「合规预防与辩护定位」章节**（**关键章节**：本插件用途为合规风险预防、合规体系建设、合规不起诉争取与刑事辩护；**绝不提供规避侦查、伪造毁灭证据、串供、对抗调查、转移资产逃避责任的方法**；涉及已立案/强制措施/具体罪名风险/重大涉案时强制升级执业刑事辩护律师）；「引用最小格式」（法律含：名称+条号 `[待验证]`，刑法总则/刑诉法中度把握锚点条号可引并标建议复核，具体罪名含 名称+构成要件描述 不写裸条号；司法解释含：名称+描述规则 不写裸条号裸数额；规范性文件含：名称描述+规则描述 不硬写文号；案例含：案号 `[待验证]`+要点+发布机关）。验证资源列入：国家法律法规数据库 flk.npc.gov.cn、最高人民检察院官网 spp.gov.cn、最高人民法院官网 court.gov.cn、中国裁判文书网、北大法宝。不在本文件放完整法条正文——它是规范，不是法条库。

    创建 criminal-compliance/skills/_shared/criminal-law-citations.md：可复用的刑事合规高频引用库，按「法条（法律）/ 司法解释 / 规范性文件 / 案例 / 学说」分类组织，并按主题分组：
    （A）刑法总则核心条文——中度把握锚点（标「已核实锚点（中度把握），建议复核」）：单位犯罪定义（公司·企业·事业单位·机关·团体实施的危害社会的行为，法律规定为单位犯罪的应当负刑事责任）=**第30条**；单位犯罪双罚制（对单位判处罚金，并对其直接负责的主管人员和其他直接责任人员判处刑罚；分则另有规定的依照规定）=**第31条**；自首（犯罪以后自动投案如实供述自己的罪行，可以从轻或者减轻处罚，犯罪较轻的可以免除处罚）=**第67条**；立功（揭发他人犯罪行为查证属实，或提供重要线索得以侦破其他案件等，可以从轻或者减轻处罚）=**第68条**；缓刑适用条件（被判处拘役·三年以下有期徒刑，符合犯罪情节较轻·有悔罪表现·没有再犯危险·宣告缓刑对所居住社区无重大不良影响等条件可宣告缓刑）=**第72条**。
    （B）刑事诉讼法核心条文——中度把握锚点（建议复核）：不起诉（法定不起诉·酌定相对不起诉·存疑不起诉的情形与适用）=**第177条**；认罪认罚从宽（犯罪嫌疑人·被告人自愿如实供述罪行，承认指控的犯罪事实，愿意接受处罚的，可以依法从宽处理）=**第15条**。
    （C）具体罪名——**构成要件描述 + 条号一律 `[待验证]`**（**严禁臆造具体罪名条号与法定刑档**）：按主题分组列举高频单位/职务相关罪名，每条仅写「罪名 + 保护法益 + 客观行为构成要件描述 + 主体（单位/自然人/特殊主体）+ 主观要件 + 定罪量刑数额标准（描述「依司法解释，标 `[待验证]`」，不写裸数额）」，条号统一标 `[条号待验证]`：税收类（虚开增值税专用发票罪、逃税罪、骗取出口退税罪）；金融类（非法吸收公众存款罪、集资诈骗罪、操纵证券市场罪、内幕交易罪）；职务类（职务侵占罪、挪用资金罪、非国家工作人员受贿罪）；商业贿赂类（单位行贿罪、对非国家工作人员行贿罪、对单位行贿罪）；扰乱市场秩序类（非法经营罪、合同诈骗罪、假冒注册商标罪、串通投标罪）；环境与安全类（污染环境罪、重大责任事故罪、重大劳动安全事故罪）；走私类（走私普通货物物品罪等）。**每条罪名条号统一 `[条号待验证]`，至少覆盖上述七类各 1-2 个代表罪名作为构成要件描述范例，并明确「本节为风险识别用构成要件速查，所有具体罪名条号与定罪数额须以现行刑法与司法解释核实」。**
    （D）涉案企业合规规范性文件——**描述规则 + `[待验证 — 规范性文件快速演进]`，不硬写文号**：涉案企业合规改革试点的适用范围与基本流程（涉嫌经济·职务等犯罪、认罪认罚、愿意合规整改、可能判处的刑罚区间等条件，描述规则）；企业合规第三方监督评估机制（管理委员会·专业人员名录·评估组织的启动·组成·评估流程·考察期·评估报告，描述规则，**不硬写文号·条款编号**）；拟不起诉公开听证（描述规则）；认罪认罚从宽制度指导意见（值班律师·量刑建议·具结书的一般规则，描述规则）。明确「以上均为规范性文件，文号·机制细节·有效合规认定标准快速演进，引用前须核实现行版本，标 `[待验证]`」。
    （E）司法解释——**描述规则 + 条号数额一律 `[待验证]`**：具体罪名的定罪量刑数额标准（虚开税额·非法吸收金额·贿赂数额·污染环境后果·损失数额等）以「依相关司法解释，标 `[待验证]`」描述，**不写裸数额裸条号**；单位犯罪与自然人犯罪的处理规则、自首立功的认定细化（描述规则）。
    （F）案例——占位结构 + 填写说明：至少含 涉案企业合规不起诉典型案例/单位犯罪认定/自首立功认定/有效合规认定 四类占位，每条含 案号 `[待验证]`、要点、发布机关（最高检/最高院）、参考价值，明确「案号默认待验证、典型案例仅作参考不具判例法约束力」。
    （G）学说——占位结构 + 填写说明（如有效合规的认定标准、合规计划的可验证性、单位犯罪责任人范围、合规不起诉适用边界等学说争议）。

    **关键纪律（必须遵守 — 不臆造具体罪名条号，规范性文件不硬写文号，合规预防与辩护立场）**：
    - 中度把握锚点明确标注「已核实锚点（中度把握），建议复核」且不臆造其他条号：刑法总则 30/31/67/68/72；刑诉法 177/15。
    - **各具体罪名条号一律 `[条号待验证]`，以构成要件描述呈现，绝不臆造具体罪名条号与法定刑档；定罪量刑数额标准一律描述规则 + `[待验证]`，不写裸数额裸条号。**
    - **涉案企业合规试点、第三方监督评估机制管理规定、认罪认罚从宽指导意见一律描述规则并标 `[待验证 — 规范性文件快速演进]`，不硬写文号·发文日期·条款编号。**
    - 司法解释、案例案号一律标 `[待验证]`，描述规则呈现。
    - **强调合规预防与辩护立场：本引用库仅用于合规风险识别、预防与辩护研究，绝不支持规避侦查·伪造毁灭证据·逃避法律责任。**
    - 每条引用行末尾带来源标签（多数为 `[模型知识 — 需验证]`），并按上述规则标 `[待验证]`（中度把握锚点除外，但仍建议复核）。
    - 文末附「中度把握锚点汇总」表（锚点 / 法律依据 / 规则摘要）与「引用库使用说明」「更新规则」，参照 family-law-citations.md 同名章节，**更新规则中强调具体罪名条号须以现行刑法核实、涉案企业合规规范性文件快速演进、引用前核实现行版本**。

    务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>cf=criminal-compliance/skills/_shared/legal-basis-conventions.md; lf=criminal-compliance/skills/_shared/criminal-law-citations.md; test -f "$cf" && test -f "$lf" && grep -q '法条\|法律' "$cf" && grep -q '司法解释' "$cf" && grep -q '规范性文件' "$cf" && grep -q '案例' "$cf" && grep -q '学说' "$cf" && grep -q '待验证' "$cf" && grep -q '罪名' "$cf" && grep -q '规避侦查\|逃避\|辩护' "$cf" && grep -q '第30条' "$lf" && grep -q '第31条' "$lf" && grep -q '第67条' "$lf" && grep -q '第68条' "$lf" && grep -q '第72条' "$lf" && grep -q '第177条' "$lf" && grep -q '第15条' "$lf" && grep -q '涉案企业合规\|第三方监督评估' "$lf" && grep -q '构成要件\|罪名' "$lf" && grep -q '认罪认罚' "$lf"</automated>
  </verify>
  <acceptance_criteria>
    - criminal-compliance/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节区分 法条/司法解释/规范性文件 与 案例/学说，并涵盖 刑法/刑事诉讼法/涉案企业合规规范性文件 语境
    - legal-basis-conventions.md 含「待验证」标记规则 + **「具体罪名条号一律待验证」纪律章节（含高频罪名列举与禁止臆造具体罪名条号法定刑档的纪律）** + **「涉案企业合规规范性文件快速演进标注」纪律章节** + **「合规预防与辩护定位」章节（含拒绝规避侦查/逃避责任、涉刑强制升级辩护律师）**，复用五个来源标签（不新造冲突标签），含法院四级与检察机关四级、公安·行业监管·第三方监督评估机制定位
    - legal-basis-conventions.md 明确「成文法为分析基础、涉案企业合规典型案例/指导性案例仅作参考不具判例法约束力、案例案号默认待验证」
    - criminal-compliance/skills/_shared/criminal-law-citations.md 存在，按来源分类组织，分组覆盖 刑法总则/刑事诉讼法/具体罪名构成要件占位/涉案企业合规规范性文件/司法解释/案例/学说
    - 中度把握锚点明确呈现并标「建议复核」：刑法总则 单位犯罪第30条/双罚制第31条/自首第67条/立功第68条/缓刑第72条；刑诉法 不起诉第177条/认罪认罚从宽第15条
    - 具体罪名（税收·金融·职务·商业贿赂·扰乱市场·环境安全·走私 七类各代表罪名）以构成要件描述 + `[条号待验证]` 呈现，无臆造具体罪名条号与法定刑档；定罪量刑数额标准描述规则不写裸数额；涉案企业合规规范性文件描述规则不硬写文号；司法解释条号·案例案号一律待验证
    - 含中度把握锚点汇总表与引用库使用说明（更新规则强调具体罪名条号须核实、规范性文件快速演进、引用前核实现行版本）
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个刑事合规共享引用文件存在；来源分类规范区分 法条/司法解释/规范性文件 与 案例/学说，含待验证规则、具体罪名条号一律待验证纪律、涉案企业合规规范性文件快速演进标注、合规预防与辩护定位与法院/检察/监管/第三方监督评估机构定位；引用库覆盖 刑法总则（单位犯罪30/31·自首67·立功68·缓刑72）/刑事诉讼法（不起诉177·认罪认罚15）/具体罪名构成要件占位/涉案企业合规规范性文件描述/司法解释，中度把握锚点（30/31/67/68/72/177/15）标「建议复核」、具体罪名构成要件描述、定罪量刑数额与司法解释与规范性文件描述规则、条号/文号/案号标待验证、无臆造。</done>
</task>

<task type="auto">
  <name>Task 2: 建立刑事合规版实践配置契约 + 新建 criminal-compliance/CLAUDE.md 实践配置模板</name>
  <read_first>
    - family-legal/skills/_shared/practice-profile-schema.md（最近一次新插件配置契约范式 — 真相来源决策、字段映射表、技能读取契约、临时模式默认值、立场选择、重跑/编辑/版本控制、法律事实合理性检查、schema 与 CLAUDE.md 章节对照）
    - family-legal/CLAUDE.md（最近一次新建插件实践配置模板范式 — 画像/立场/敏感度校准/风险校准/升级矩阵/文书风格/输出/共享护栏 完整章节结构与占位符写法、强制升级触发与角色权限表；刑事合规版以此为最新范本改编为合规与辩护语境）
    - criminal-compliance/skills/cold-start-interview/SKILL.md（现有访谈三部分 — 字段映射来源；注意末尾「生成 YAML 格式」表述须在 schema 中纠正为写入 CLAUDE.md）
    - CLAUDE.md（命名；文件格式；中国化原则——法院层级识别、行业监管特色）
  </read_first>
  <files>
    criminal-compliance/skills/_shared/practice-profile-schema.md,
    criminal-compliance/CLAUDE.md
  </files>
  <action>
    **第一部分 — 新建 criminal-compliance/CLAUDE.md 实践配置模板**（当前插件无此文件，首次创建）。以 family-legal/CLAUDE.md 为最新范式，改编为刑事合规语境的散文模板，含占位符 [PLACEHOLDER]。章节：
    - 顶部说明块：本文件由 /criminal-compliance:cold-start-interview 生成更新，律师/法务/合规官可直接编辑，所有 criminal-compliance 技能从此读取立场；**用途声明：本插件用于合规风险预防、合规体系建设、合规不起诉争取与刑事辩护研究，绝不提供规避侦查·伪造毁灭证据·逃避法律责任的方法；涉及已立案/强制措施/具体罪名风险/重大涉案一律强制升级执业刑事辩护律师**；时效性提示：涉案企业合规试点·第三方监督评估机制·具体罪名定罪量刑标准快速演进，涉及具体条号·文号·数额配置建议核实现行版本。
    - `## 我们是谁`（执业角色与企业画像）：组织/律所/企业名称、实体类型（律所刑事/合规业务部·企业合规部·企业法务·当事人）、**执业角色**（刑事合规律师/企业合规官/企业法务/当事人本人/非律师但有律师可咨询/非律师且无律师可咨询——影响输出定性与升级）、**主要服务事项**（事前刑事风险评估/合规体系建设/涉案企业合规不起诉/单位犯罪预防/单位犯罪辩护/混合）、企业画像（行业·规模·业务模式·是否涉外·历史涉案情况·重点刑事风险领域 如税收·商业贿赂·非法集资·环境·安全生产）、主要痛点、团队规模、负责人。
    - `## 谁在使用`：角色（刑事合规律师/企业合规官/企业法务/当事人本人/非律师但有律师可咨询/非律师且无律师可咨询）、律师联系人。含**非律师角色提示**（输出作为合规研究与初步分析供律师审查；合规不起诉申请提交·合规整改报告定稿·涉案应对方案·向司法机关提交材料等重大法律后果步骤前暂停升级）。
    - `## 可用集成`（检察·公安·监管·第三方监督评估资源）：当地检察机关（不起诉决定·拟不起诉听证）、公安机关、行业监管部门（税务·市场监管·证监·药监·环保·应急·网信）、第三方监督评估机制管理委员会与评估组织、司法鉴定/会计审计机构、中国裁判文书网、文档存储、企业微信/钉钉。
    - `## 合规与服务立场`：**整体服务立场**（事前合规体系建设/事前刑事风险评估/涉案企业合规不起诉/单位犯罪预防/单位犯罪辩护——刑事合规工作的核心变量，同一企业不同立场侧重不同：事前预防关注风险地图与制度建设，涉案应对关注合规整改与从宽争取）；`### 合规严格度`（保守 一切疑点从严标红并升级/平衡/务实）；`### 是否已涉案`（**关键字段**：纯预防 无现实刑事风险/有苗头线索/已立案或被采取强制措施——已涉案一律强制升级刑事辩护律师）。
    - `## 刑事风险校准`：🔴关键/🟠高/🟡中等/🟢低 等级定义（结合刑事风险：可能构成具体罪名·已立案或强制措施=关键`[强制升级]`/重大刑事风险敞口·高发罪名行为模式=高/合规制度缺失·一般风险点=中/已有合规控制的低风险点=低）；明确「涉及可能构成具体罪名或已涉案一律 `[强制升级]`」。
    - `## 升级矩阵`：角色/可独立处理事项/需升级条件表（非律师当事人或法务/企业合规官/助理律师/主办刑事律师/合伙人）；**自动/强制升级触发条件**（**企业或个人已被立案、被采取强制措施 拘留·逮捕·取保候审·监视居住、面临侦查、可能构成具体罪名、重大涉案、涉及人身自由**，无论风险等级一律强制升级给执业刑事辩护律师）；合规不起诉申请/听证/向司法机关提交材料触发升级表。
    - `## 文书风格`：刑事风险评估报告风格（客观·风险导向·可操作）、合规制度文本风格（规范·可落地）、合规不起诉申请与整改报告风格（务实·可验证·配合检察机关）、单位犯罪预防/辩护研究风格、工作产物存放位置。
    - `## 输出`：工作产物标题（律师角色 vs 非律师角色，沿用特权标题/研究笔记两版）、审查者注释块（含具体罪名条号待验证·规范性文件快速演进提示与合规边界提示）、下一步决策树模板（开展刑事风险评估/建设合规体系/制定合规整改计划/申请合规不起诉/配合第三方监督评估/升级刑事辩护律师/如实供述认罪认罚/观望）。
    - `## 共享护栏`：无静默补充原则；**合规预防与辩护立场护栏**（输出立足于事前预防与涉案后依法合规整改争取从宽，不替企业作有罪无罪最终结论）；**不提供规避侦查或逃避责任方法护栏**（**绝不提供规避侦查·伪造或毁灭证据·串供·对抗调查·转移资产逃避责任·帮助逃避法律追究的方法；识别此类需求即拒绝并提示依法整改·如实供述·认罪认罚争取从宽**）；**涉刑强制升级护栏**（识别已立案/强制措施/可能构成具体罪名/重大涉案即强制升级执业刑事辩护律师）；**律师审查护栏**（重大法律后果步骤前非律师须升级）；时效性触发（涉案企业合规规范性文件·具体罪名司法解释修订）；验证用户陈述的法律事实（罪名/条号/数额/期限）；来源标签规范表；目的地/特权检查（注意面向检察机关/公安/第三方监督评估时特权失效，提供脱敏版本）；`### 地方涉案企业合规试点提示`（各地涉案企业合规试点适用口径·第三方监督评估机制运行存在地区差异，标 `[地方 flagged — 需核实地方涉案企业合规试点口径]`）。
    - `## 事项工作区` 与 `## 审查过的种子文档`（沿用范式，适配刑事合规：如「XX 刑事风险评估」「XX 合规整改计划」「XX 单位犯罪预防」）。

    **第二部分 — 创建 criminal-compliance/skills/_shared/practice-profile-schema.md**，以 family-legal 同名文件为最新骨架改编为刑事合规语境。章节：
    - 「配置文件是什么 / 真相来源」：明确真相来源是 criminal-compliance/CLAUDE.md（散文模板，本阶段新建），由 /criminal-compliance:cold-start-interview 生成更新，律师/法务/合规官可直接编辑；记录架构决策（不引入冲突新 JSON/YAML 格式，沿用 CLAUDE.md 单一真相来源，理由同 family 版）。**明确纠正**：现有 cold-start-interview/SKILL.md 末尾「生成 刑事合规 实践配置文件（YAML 格式）」的表述应理解为填充 criminal-compliance/CLAUDE.md 对应章节，而非另存独立 YAML 文件。
    - 「字段映射表」：将访谈/立场/涉案收集的字段对应到 criminal-compliance/CLAUDE.md 章节，并标注哪些技能读取该字段。至少覆盖映射组：执业角色与企业画像（## 我们是谁/## 谁在使用 → 所有技能工作产物标题、非律师升级、行业风险领域识别）；**整体服务立场 事前合规/风险评估/合规不起诉/单位犯罪辩护**（## 合规与服务立场 → 整体服务立场 → 所有技能审查侧重与风险分级）；合规严格度（## 合规与服务立场 → 合规严格度 → 各子技能风险标红强度）；**是否已涉案**（## 合规与服务立场 → 是否已涉案 → 所有技能涉案识别与强制升级路由，non-prosecution 与 corporate-crime 涉案应对子技能尤重）；刑事风险校准（## 刑事风险校准 → 等级 → 所有技能）；升级矩阵与强制升级触发（## 升级矩阵 → 各技能升级路由 + 已立案/强制措施/具体罪名风险/重大涉案强制升级刑事辩护律师）；文书风格（## 文书风格/## 输出 → 各评估/制度/申请子技能）；检察公安监管第三方监督评估资源（## 可用集成 → non-prosecution 听证与第三方监督评估路由、risk-assessment 监管对接路由）；地方涉案企业合规试点（## 共享护栏 → 各技能地方试点口径标记）。
    - 「技能读取契约」：技能在实质性工作前须读取 criminal-compliance/CLAUDE.md、检查关键字段是否含 [PLACEHOLDER]、据此选运行模式；配置缺失/含占位符时标准提示（运行 cold-start-interview 或说「临时模式」）；临时模式默认值表（服务立场默认事前合规预防、角色律师、合规严格度保守、**是否已涉案默认按用户陈述逐案判断且一旦识别涉案即强制升级**、行业风险领域按企业陈述逐案判断）。
    - 「服务立场（事前合规体系建设 vs 风险评估 vs 合规不起诉 vs 单位犯罪辩护）选择」：技能在工作前确认服务立场（从 ## 合规与服务立场 读取），据此加载对应立场审查侧重（如事前预防关注风险地图与制度建设、涉案应对关注合规整改与从宽争取、辩护关注责任切割与量刑）与风险标记强度，参照 family practice-profile-schema 的立场选择逻辑改编为刑事合规语境。**强调：服务立场是刑事合规工作最核心变量，缺失时须显式提示并默认事前合规预防；同时无论立场如何，合规预防与辩护立场护栏、不提供规避侦查方法护栏、涉刑强制升级护栏不可被立场覆盖。**
    - 「涉案情形与强制升级契约」（**刑事合规特有**）：技能识别到企业或个人已被立案/被采取强制措施/面临侦查/可能构成具体罪名/重大涉案时，无论服务立场与风险等级一律强制升级执业刑事辩护律师，输出标 `[强制升级 — 涉刑情形]`；说明该契约凌驾于服务立场之上，且本插件不替代辩护律师的专业判断与辩护工作。
    - 「合规边界契约」（**刑事合规特有**）：技能识别到用户需求涉及规避侦查·伪造或毁灭证据·串供·对抗调查·转移资产逃避责任时，一律拒绝并提示「合规的唯一正道是依法整改·如实供述·认罪认罚争取从宽」，输出标 `[合规边界 — 拒绝]`；说明该契约不可被任何立场或配置覆盖。
    - 「重跑 / 编辑 / 版本控制」：完整重跑 vs 单独更新某部分；直接编辑；git 版本控制与回滚（git log/diff/checkout criminal-compliance/CLAUDE.md）。
    - 「法律事实合理性检查」：用户口述罪名/条号/数额/期限（如具体罪名条号、定罪量刑数额、听证期限、考察期）时写入前合理性检查（**具体罪名条号标待验证·以构成要件描述**、**定罪量刑数额标待验证不写裸数额**、**涉案企业合规规范性文件文号标待验证**、时效性标记、矛盾澄清），含 `[前提 flagged — 需验证]` 流程；特别强调刑事合规须以现行刑法核实具体罪名条号、规范性文件快速演进、口述条号数额须标待验证。
    - 「schema 与 CLAUDE.md 模板章节对照」表。
    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。两文件均为本任务产出，注意 criminal-compliance/CLAUDE.md 是**新建**。
  </action>
  <verify>
    <automated>cm=criminal-compliance/CLAUDE.md; sc=criminal-compliance/skills/_shared/practice-profile-schema.md; test -f "$cm" && test -f "$sc" && grep -q '合规\|风险评估\|不起诉' "$cm" && grep -q '服务立场\|合规与服务立场' "$cm" && grep -q '是否已涉案\|涉案' "$cm" && grep -q '规避侦查\|伪造\|毁灭证据' "$cm" && grep -q '强制升级\|升级矩阵' "$cm" && grep -q '辩护律师\|刑事辩护' "$cm" && grep -q '地方' "$cm" && grep -q 'criminal-compliance/CLAUDE.md' "$sc" && grep -q '字段映射' "$sc" && grep -q '临时模式' "$sc" && grep -q '强制升级\|涉刑情形' "$sc" && grep -q '合规边界\|规避侦查' "$sc" && grep -q '事前合规\|合规不起诉\|单位犯罪辩护' "$sc"</automated>
  </verify>
  <acceptance_criteria>
    - criminal-compliance/CLAUDE.md 新建存在，含 ## 我们是谁（执业角色与企业画像，含执业角色律师/合规官/法务/当事人、服务事项、行业刑事风险领域）、## 谁在使用、## 可用集成（检察公安监管第三方监督评估资源）、## 合规与服务立场（含整体服务立场 事前合规/风险评估/合规不起诉/单位犯罪辩护 + ### 合规严格度 + ### 是否已涉案）、## 刑事风险校准、## 升级矩阵（含已立案/强制措施/具体罪名风险/重大涉案强制升级刑事辩护律师）、## 文书风格、## 输出、## 共享护栏（含合规预防与辩护立场护栏 + 不提供规避侦查或逃避责任方法护栏 + 涉刑强制升级护栏 + 律师审查护栏 + 地方涉案企业合规试点提示）
    - criminal-compliance/CLAUDE.md 含律师/非律师双版工作产物标题，用途声明体现合规预防与辩护立场、拒绝规避侦查、涉刑强制升级
    - criminal-compliance/skills/_shared/practice-profile-schema.md 存在，明确真相来源为 criminal-compliance/CLAUDE.md，记录「不引入冲突新格式」架构决策，纠正现有访谈「生成 YAML」表述
    - schema 含字段映射表，覆盖 执业角色企业画像/整体服务立场事前合规风险评估合规不起诉单位犯罪辩护/合规严格度/是否已涉案/刑事风险校准/升级矩阵/文书风格/检察公安监管第三方监督评估资源/地方试点 各组并标注读取技能
    - schema 含技能读取契约 + 临时模式默认值（服务立场默认事前合规预防、涉案即强制升级）+ 服务立场选择逻辑（立场核心变量、缺失默认事前预防、合规预防与辩护及拒绝规避侦查及涉刑强制升级护栏不可被立场覆盖）+ 涉案情形与强制升级契约 + 合规边界契约（拒绝规避侦查）+ 法律事实合理性检查（具体罪名条号标待验证、数额标待验证、规范性文件文号标待验证）+ schema 与 CLAUDE.md 章节对照表
    - 两文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新建 criminal-compliance/CLAUDE.md 实践配置模板（执业角色与企业画像/合规与服务立场含事前合规风险评估合规不起诉单位犯罪辩护与合规严格度与是否已涉案/刑事风险校准/升级矩阵含已立案强制措施具体罪名风险重大涉案强制升级刑事辩护律师/文书风格/输出/共享护栏含合规预防与辩护立场护栏不提供规避侦查方法护栏涉刑强制升级护栏律师审查护栏与地方涉案企业合规试点提示）；刑事合规版配置契约定义配置文件是什么/在哪/技能怎么读，字段映射到 CLAUDE.md 章节，含临时模式与服务立场选择（立场核心变量、护栏不可覆盖）与涉案情形强制升级契约与合规边界契约与法律事实合理性检查（具体罪名条号数额标待验证），并纠正现有访谈 YAML 表述。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 risk-assessment 为四个可独立触发的子技能</name>
  <read_first>
    - criminal-compliance/skills/risk-assessment/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；这是要拆分迁移并大幅深化的源）
    - criminal-compliance/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - criminal-compliance/skills/_shared/criminal-law-citations.md（Task 1 产出 — 引用库，重点：单位犯罪第30/31条、具体罪名构成要件占位 七类、定罪量刑数额描述规则、涉案企业合规规范性文件描述）
    - criminal-compliance/skills/_shared/practice-profile-schema.md（Task 2 产出 — 配置读取契约，服务立场字段、是否已涉案与涉刑强制升级契约、合规边界契约）
    - criminal-compliance/CLAUDE.md（Task 2 产出 — 配置模板，子技能读取服务立场/合规严格度/是否已涉案/刑事风险校准/涉刑强制升级护栏）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板含 markdown 结构/边界条件表/错误处理表/## 法律依据 按分类的完整范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md,
    criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md,
    criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md,
    criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md
  </files>
  <action>
    将现有 risk-assessment/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：industry-crime-identification / position-conduct-risk / risk-level-likelihood / risk-list-control-output；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 criminal-compliance/CLAUDE.md 配置含**服务立场 + 是否已涉案 + 涉刑强制升级护栏 + 合规边界护栏** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格，含涉案情形识别与强制升级、合规边界拒绝）、`## 法律依据`（按 法条/司法解释/规范性文件 与 案例/学说 分类，引用 _shared/criminal-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 risk-assessment 编排入口调用，也可由律师/合规官/法务单独触发（/criminal-compliance:<name>），**并须按服务立场（事前合规预防 vs 涉案应对）调整侧重，且识别涉案情形即强制升级、识别规避侦查需求即拒绝（合规边界）**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** 拆分时须深化（补充边界条件、错误处理、输出模板、法律依据分类），而非仅搬运纲要。**所有具体罪名一律以构成要件描述 + `[条号待验证]` 呈现，绝不臆造具体罪名条号与定罪量刑数额。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - industry-crime-identification（行业高发罪名识别）：覆盖现纲要「需求收集 + 法律分析」中行业维度并深化。按企业所属行业识别高发刑事风险点与对应罪名类别——制造/贸易（虚开增值税专用发票·走私·假冒注册商标·重大责任事故）、金融/投资（非法吸收公众存款·集资诈骗·操纵市场·内幕交易）、医药（商业贿赂·生产销售假药劣药）、房地产/建设（串通投标·商业贿赂）、环保敏感行业（污染环境）、安全生产高危行业（重大责任事故·重大劳动安全事故）。深化：行业刑事风险点对照表（行业/高发罪名/典型行为模式/触发情形）、各罪名构成要件速查表（罪名/保护法益/客观行为/主体单位或自然人/主观要件/定罪量刑数额「描述规则·待验证」）。**所有具体罪名条号一律 `[条号待验证]`，以构成要件描述呈现，定罪量刑数额描述规则不写裸数额。** **按服务立场区分**：事前预防关注全面风险点排查，涉案应对关注已涉嫌罪名的构成要件比对。引用单位犯罪第30/31条（建议复核）、具体罪名构成要件（_shared 引用库，条号待验证）。边界条件：单位犯罪与自然人犯罪区分、一行多罪、新型业务模式罪名定性不明（标待验证 + 升级）。错误处理含识别已涉案/可能构成具体罪名的强制升级。
    - position-conduct-risk（岗位与行为风险点）：覆盖现纲要「法律分析」中岗位维度并深化。按岗位识别职务相关行为风险点——采购（受贿·对非国家工作人员行贿·串通投标）、销售（商业贿赂·合同诈骗·假冒注册商标）、财务（虚开发票·职务侵占·挪用资金·逃税）、高管/实控人（背信损害上市公司利益·内幕交易·单位行贿决策责任）、法务/合规（共同犯罪边界·明知风险）。深化：岗位行为风险点对照表（岗位/高发罪名/风险行为/红线行为/控制要点）、单位犯罪责任人员范围（直接负责的主管人员·其他直接责任人员，构成要件描述）、职务侵占vs挪用资金vs贪污区分表（主体与行为差异，**条号待验证**）。**按服务立场区分**：事前预防关注岗位红线与制度防范，涉案应对关注责任人员范围与责任切割。引用单位犯罪双罚制第31条（建议复核，直接负责主管人员与其他直接责任人员）、具体职务罪名构成要件（条号待验证）。边界条件：单位意志与个人行为区分、明知与共谋、合规人员自身风险。错误处理含涉案责任人员强制升级辩护律师。
    - risk-level-likelihood（风险等级与可能性评估）：覆盖现纲要「法律分析 + 输出生成」中评估维度并深化。**风险评估方法**（风险发生可能性×影响程度矩阵、刑事风险等级 🔴关键/🟠高/🟡中/🟢低、**是否已现实化分层 无风险·苗头·线索·已立案或强制措施**）；可能性评估因素（行为是否触及构成要件·内控强弱·行业监管强度·历史涉案）；影响评估因素（可能罪名法定刑档·罚金·责任人人身自由·企业声誉与经营资质）。深化：刑事风险评估矩阵表（可能性×影响→等级）、风险等级定义与处置表（对应控制建议与升级）、是否已现实化分层与处置表。**从 criminal-compliance/CLAUDE.md 读取刑事风险校准与是否已涉案；一旦评估为「可能构成具体罪名」或「已立案/强制措施」即标 `[强制升级]` 升级刑事辩护律师，不在本插件内继续作辩护策略判断。** **按服务立场区分**：事前预防侧重可能性与控制，涉案应对侧重已现实化分层与升级。引用单位犯罪第30/31条、缓刑第72条（建议复核，影响评估参考可能刑罚区间）。边界条件：风险敞口难量化、多罪并存、行刑衔接（行政违法升格刑事）。错误处理含已涉案强制升级。
    - risk-list-control-output（风险清单与控制建议输出）：覆盖现纲要「输出生成」并深化。整合前三个子技能成果，输出**刑事风险评估报告**：风险清单（风险点·对应罪名 构成要件描述·岗位/业务环节·可能性·影响·风险等级·控制建议·责任部门·整改时限）、重点风险摘要、控制建议（事前防范措施·制度·审批·留痕·禁止性清单·培训，与 compliance-system-building 衔接）、待升级事项清单。深化：刑事风险清单表（多列结构，列数一致）、控制建议分级表（立即/限期/持续）、风险评估报告输出模板（markdown 结构）、与合规体系建设衔接说明。**按服务立场区分**：事前预防输出完整风险地图与控制清单，涉案应对输出聚焦已涉嫌问题与整改建议（衔接 non-prosecution 合规计划）。引用单位犯罪第30/31条与具体罪名（条号待验证）、涉案企业合规规范性文件（描述规则·待验证，作为整改建议方向）。边界条件：报告面向企业内部vs面向检察机关（特权与脱敏）、风险清单的动态更新、控制建议落地难。错误处理含报告定稿前律师审查、涉案强制升级、报告不得包含规避侦查内容（合规边界）。
  </action>
  <verify>
    <automated>for d in industry-crime-identification position-conduct-risk risk-level-likelihood risk-list-control-output; do f="criminal-compliance/skills/risk-assessment/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '罪名\|构成要件' criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md && grep -q '岗位\|第31条' criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md && grep -q '风险等级\|可能性' criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md && grep -q '风险清单\|控制建议' criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 criminal-compliance/skills/risk-assessment/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置（含服务立场 + 是否已涉案 + 涉刑强制升级护栏 + 合规边界护栏读取）、详细步骤、检查清单、输出模板、边界条件、错误处理（含涉案情形强制升级、合规边界拒绝）、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行（深度对标 social-insurance-wages）
    - industry-crime-identification 含行业高发罪名识别与构成要件描述（具体罪名条号待验证）；position-conduct-risk 含岗位行为风险点与单位犯罪责任人员范围第31条；risk-level-likelihood 含可能性×影响矩阵与是否已现实化分层；risk-list-control-output 含刑事风险清单与控制建议报告
    - 每个子技能体现按服务立场（事前预防/涉案应对）调整侧重，且涉刑强制升级与合规边界（拒绝规避侦查）护栏贯穿
    - 法律依据引用 _shared 库，中度把握锚点（单位犯罪30/31·自首67·立功68·缓刑72·不起诉177·认罪认罚15）标「建议复核」、具体罪名构成要件描述 + 条号待验证、定罪量刑数额描述规则不写裸数额、涉案企业合规规范性文件描述规则不硬写文号、无臆造具体罪名条号
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>risk-assessment 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；industry-crime-identification 行业高发罪名识别、position-conduct-risk 岗位与行为风险点、risk-level-likelihood 风险等级与可能性评估、risk-list-control-output 风险清单与控制建议输出；各子技能按服务立场调整侧重且贯穿涉刑强制升级与合规边界护栏；法律依据按来源分类引用 _shared 库，中度把握锚点标建议复核、具体罪名构成要件描述 + 条号待验证、定罪量刑数额与规范性文件描述规则、无臆造。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 risk-assessment/SKILL.md 为编排入口</name>
  <read_first>
    - criminal-compliance/skills/risk-assessment/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - construction-legal/skills/contract-review/SKILL.md（最近一次编排入口范式 — 风格参照）
    - criminal-compliance/CLAUDE.md（Task 2 产出 — 配置模板）
    - criminal-compliance/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 09-03 统一更新）
  </read_first>
  <files>
    criminal-compliance/skills/risk-assessment/SKILL.md
  </files>
  <action>
    将 criminal-compliance/skills/risk-assessment/SKILL.md 改造为编排入口：保留 frontmatter（name: risk-assessment，更新 description 说明它现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/risk-assessment/<子技能名>/SKILL.md）；(2) 目的与整体刑事风险评估流程概览（行业高发罪名识别 → 岗位与行为风险点 → 风险等级与可能性评估 → 风险清单与控制建议输出）；(3) 前置：加载**服务立场**——读取 criminal-compliance/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /criminal-compliance:cold-start-interview 或说「临时模式」），含临时模式段落（事前合规预防立场、律师角色、合规严格度保守、**是否已涉案按用户陈述逐案判断且识别涉案即强制升级**、标 `[临时模式]`）；(4) 子技能编排顺序表——行业高发罪名识别 → 岗位与行为风险点 → 风险等级与可能性评估 → 风险清单与控制建议输出，每行说明该子技能做什么、对应子技能路径（skills/risk-assessment/<name>/SKILL.md）、可单独触发的斜杠命令（/criminal-compliance:<name>）+ 顺序说明；(5) 入口级护栏：企业画像确认（从 ## 我们是谁 读取）、**服务立场加载（从 ## 合规与服务立场 — 事前合规预防/涉案应对，强调立场决定评估侧重）**、合规严格度加载、**涉案情形识别（已立案/强制措施/可能构成具体罪名/重大涉案即强制升级刑事辩护律师，本插件不替代辩护工作）**、**合规预防与辩护立场护栏（输出立足预防与依法整改，不替企业作有罪无罪最终结论）**、**不提供规避侦查或逃避责任方法护栏（识别此类需求即拒绝并提示依法整改如实供述认罪认罚）**、目的地/特权检查（面向检察机关/公安/第三方监督评估时特权失效）、地方涉案企业合规试点提示。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=criminal-compliance/skills/risk-assessment/SKILL.md; grep -q '^name: risk-assessment' "$f" && grep -q 'industry-crime-identification' "$f" && grep -q 'position-conduct-risk' "$f" && grep -q 'risk-level-likelihood' "$f" && grep -q 'risk-list-control-output' "$f" && grep -q '临时模式' "$f" && grep -q '服务立场\|合规预防\|事前' "$f" && grep -q '涉案\|强制升级\|辩护' "$f" && grep -q '规避侦查\|合规边界\|依法整改' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - criminal-compliance/skills/risk-assessment/SKILL.md 仍有 frontmatter name: risk-assessment，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/criminal-compliance:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式（涉案即强制升级）、企业画像确认、服务立场加载（事前预防/涉案应对）、合规严格度、涉案情形识别与强制升级刑事辩护律师、合规预防与辩护立场护栏、不提供规避侦查或逃避责任方法护栏、目的地/特权检查、地方涉案企业合规试点提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 risk-assessment/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（服务立场确认、企业画像、合规严格度、涉案情形强制升级刑事辩护律师、合规预防与辩护立场护栏、不提供规避侦查方法护栏、临时模式、特权检查、地方试点提示）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 risk-assessment 子技能 + 一个引用规范 + 一个引用库 + 一个配置契约 + 一个新建 CLAUDE.md + 一个编排入口全部存在且格式合规
- 刑事合规引用脊柱（来源分类规范含规范性文件 + 具体罪名条号一律待验证纪律 + 涉案企业合规规范性文件快速演进标注 + 合规预防与辩护定位 + 刑法总则/刑事诉讼法/具体罪名构成要件占位/涉案企业合规规范性文件 引用库）与配置契约可被 09-02 / 09-03 复用
- 现有 risk-assessment 浅骨架三步纲要无丢失迁移并大幅深化
- 中度把握锚点（单位犯罪30/31·自首67·立功68·缓刑72·不起诉177·认罪认罚15）标「建议复核」；具体罪名一律构成要件描述 + `[条号待验证]`；定罪量刑数额描述规则不写裸数额；涉案企业合规规范性文件描述规则不硬写文号；司法解释条号、案例案号均标 `[待验证]`，无臆造具体罪名条号与法定刑档
- 刑事合规护栏（合规预防与辩护立场/不提供规避侦查或逃避责任方法/涉刑强制升级刑事辩护律师/律师审查）贯穿配置模板与各子技能
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('criminal-compliance/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/合规官/法务可单独触发任一刑事风险评估子能力（4 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容，并按服务立场调整侧重、贯穿涉刑强制升级与合规边界护栏
- 刑事合规法律引用按 法条/司法解释/规范性文件 与 案例/学说 分类并标待验证；中度把握锚点明确呈现并标建议复核；具体罪名构成要件描述 + 条号待验证；涉案企业合规规范性文件描述规则不硬写文号
- 新建 criminal-compliance/CLAUDE.md 实践配置模板（执业角色与企业画像、服务立场事前合规/风险评估/合规不起诉/单位犯罪辩护、合规严格度、是否已涉案、升级矩阵含涉刑强制升级、合规预防与辩护及拒绝规避侦查护栏）存在
- 刑事合规版实践配置契约定义清楚，技能据此读取 criminal-compliance/CLAUDE.md，含涉案情形强制升级契约与合规边界契约
- risk-assessment 编排入口指向四个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/09-criminal-compliance/09-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
