---
phase: 06-ip-legal
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - ip-legal/skills/_shared/legal-basis-conventions.md
  - ip-legal/skills/_shared/ip-law-citations.md
  - ip-legal/skills/_shared/practice-profile-schema.md
  - ip-legal/CLAUDE.md
  - ip-legal/skills/trademark-search/search-query/SKILL.md
  - ip-legal/skills/trademark-search/similarity-assessment/SKILL.md
  - ip-legal/skills/trademark-search/goods-services-classification/SKILL.md
  - ip-legal/skills/trademark-search/prior-rights-obstacles/SKILL.md
  - ip-legal/skills/trademark-search/SKILL.md
autonomous: true
requirements:
  - IP-CITATION-SPINE
  - PROFILE-SCHEMA
  - CLAUDE-TEMPLATE
  - TRADEMARK-DECOMP
user_setup: []

must_haves:
  truths:
    - "存在一个知识产权专用的法律依据引用规范（来源标签 + 法条/司法解释/部门规章 与 案例/学说 分类 + 待验证 + IP 法 2020/2021 修正条号重排保守标注），所有 ip-legal 技能可复用"
    - "存在一个可复用的 商标法/专利法/著作权法/反不正当竞争法/相关司法解释 引用库，中度把握锚点（专利权期限=专利法第42条、商标侵权类型=商标法第57条、商标注册10年可续展、著作权保护期终生+50年/法人首次发表后50年、专利侵权全面覆盖+等同原则规则、商标近似规则）明确标注「建议复核」，其余条号一律标待验证，不臆造"
    - "存在知识产权版实践配置文件契约，明确字段、存储位置（ip-legal/CLAUDE.md）、技能读取规则，并映射到 ip-legal/CLAUDE.md 章节"
    - "新建 ip-legal/CLAUDE.md 实践配置模板（权利人画像 / IP 组合 / 维权与申请立场 含商标/专利/著作权策略与清权严格度 / 检索数据库 / 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏），可由冷启动访谈填充、律师可直接编辑"
    - "律师/IP 经理可以单独触发商标查询与近似分析的任一子能力（商标检索查询 / 近似判断 / 类似商品判定 / 在先权利障碍分析）而无需运行整个流程"
    - "每个 trademark-search 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；现有 trademark-search 浅骨架三步纲要无丢失迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "ip-legal/skills/_shared/legal-basis-conventions.md"
      provides: "知识产权语境的 法条/司法解释/部门规章 + 案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表 + IP 法 2020/2021 修正条号重排保守标注 + 行业/机构定位（商标局/专利局/版权局/知识产权法院）"
      contains: "待验证"
      min_lines: 70
    - path: "ip-legal/skills/_shared/ip-law-citations.md"
      provides: "商标法/专利法/著作权法/反不正当竞争法/相关司法解释 的可复用引用库（按来源分类、中度把握锚点 + 待验证）"
      contains: "第42条"
      min_lines: 150
    - path: "ip-legal/skills/_shared/practice-profile-schema.md"
      provides: "知识产权版实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 ip-legal/CLAUDE.md 映射"
      min_lines: 70
    - path: "ip-legal/CLAUDE.md"
      provides: "知识产权实践配置模板：权利人画像 / IP 组合 / 维权与申请立场 / 检索数据库 / 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏"
      contains: "权利人"
      min_lines: 90
    - path: "ip-legal/skills/trademark-search/search-query/SKILL.md"
      provides: "商标检索与查询子技能（检索数据库选择 / 检索式构造 / 尼斯分类应用 / 结果整理）"
      contains: "检索"
      min_lines: 150
    - path: "ip-legal/skills/trademark-search/similarity-assessment/SKILL.md"
      provides: "商标近似判断子技能（音/形/义三要素 + 整体观察与隔离比对 + 混淆可能性）"
      contains: "混淆"
      min_lines: 150
    - path: "ip-legal/skills/trademark-search/goods-services-classification/SKILL.md"
      provides: "类似商品与服务判定子技能（区分表应用 + 跨类保护 + 关联性判断）"
      contains: "类似商品"
      min_lines: 150
    - path: "ip-legal/skills/trademark-search/prior-rights-obstacles/SKILL.md"
      provides: "在先权利与障碍分析子技能（在先注册/申请 + 驰名商标 + 在先字号著作权外观设计 + 注册障碍评估）"
      contains: "在先权利"
      min_lines: 150
    - path: "ip-legal/skills/trademark-search/SKILL.md"
      provides: "商标查询与近似分析编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "ip-legal/skills/trademark-search/similarity-assessment/SKILL.md"
      to: "ip-legal/skills/_shared/ip-law-citations.md"
      via: "引用商标侵权类型与近似判断规则（商标法第57条 + 商标授权确权司法解释）"
      pattern: "ip-law-citations|第57条|混淆"
    - from: "ip-legal/skills/trademark-search/prior-rights-obstacles/SKILL.md"
      to: "ip-legal/skills/_shared/ip-law-citations.md"
      via: "引用在先权利与驰名商标保护规则"
      pattern: "ip-law-citations|在先权利|驰名商标"
    - from: "ip-legal/skills/trademark-search/SKILL.md"
      to: "四个 trademark-search 子技能"
      via: "编排入口指向子技能路径"
      pattern: "search-query|similarity-assessment|goods-services-classification|prior-rights-obstacles"
    - from: "ip-legal/skills/_shared/practice-profile-schema.md"
      to: "ip-legal/CLAUDE.md"
      via: "映射访谈/审查字段到实践配置模板章节"
      pattern: "维权立场|IP 组合|权利人"
---

<objective>
将知识产权插件从 v0.1.0 的扁平浅骨架深化为深层子技能体系，建立全插件复用的法律引用脊柱、知识产权版实践配置契约，并**新建** ip-legal/CLAUDE.md 实践配置模板。

本计划交付四块内容：
1. **知识产权引用脊柱（citation spine）** — 一套所有 ip-legal 技能共享的法律依据引用规范（来源标签 + 法条/司法解释/部门规章 与 案例/学说 分类 + 待验证 + **IP 法 2020/2021 修正条号重排保守标注** + 行业/机构定位），以及一个可复用的 商标法/专利法/著作权法/反不正当竞争法/相关司法解释 引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 06-02 / 06-03 直接引用，避免每个技能重复维护条文。
2. **知识产权版实践配置契约** — ip-legal/skills/_shared/practice-profile-schema.md：明确配置文件是什么、在哪（ip-legal/CLAUDE.md）、技能怎么读，以及访谈/审查字段与 ip-legal/CLAUDE.md 章节的映射。
3. **新建 ip-legal/CLAUDE.md 实践配置模板** — 知识产权语境的散文模板：权利人画像与 IP 组合 / 谁在使用 / 可用集成（检索数据库）/ 维权与申请立场（商标/专利/著作权策略 + 清权严格度）/ 风险校准 / 升级矩阵（维权/异议/诉讼触发）/ 文书风格 / 输出 / 共享护栏（行业识别 / 时效性触发 / IP 法修正版本提示）。当前插件**尚无此文件**，本计划首次创建。
4. **商标查询与近似分析拆分** — 按 CONTEXT「深层子技能拆分」决策，将 trademark-search（现 ~18 行浅骨架）拆为四个可独立触发的子技能：商标检索与查询 / 商标近似判断 / 类似商品与服务判定 / 在先权利与障碍分析。现有三步纲要（需求收集 / 法律分析 / 输出生成）拆分迁移并大幅深化，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分 + 5 能力面，现实只有 4 个扁平浅骨架且无 CLAUDE.md」的核心 gap，并为知识产权语境建立可复用引用脊柱与配置真相来源。引用脊柱、配置契约与 CLAUDE.md 先行，保证三个计划的引用与配置读取一致。
Output: 1 个引用规范 + 1 个引用库 + 1 个配置契约 + 1 个新建 CLAUDE.md + 4 个 trademark-search 子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（商标法 / 专利法 / 著作权法 2020修正 2021施行 / 反不正当竞争法 为分析基础，相关司法解释、商标审查审理指南/专利审查指南为补充）；指导性案例作参考非判例法（最高院/知识产权法庭典型案例可参考，案号标待验证）；法院层级识别（基层/中院/知识产权法院/最高院知识产权法庭四级）；行业监管特色（国家知识产权局商标局/专利局、国家版权局多头管理识别）；执业环境适配（IP 律师 / 企业 IP 经理 / 内部法务）。命名约定：技能名 kebab-case；斜杠命令 /ip-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/部门规章 与 案例/学说 分类，带来源标签；**IP 法 2020/2021 修正后条号重排，须极度保守**——商标法/专利法/著作权法/反不正当竞争法/司法解释 的具体条号若不确定，描述规则并标 `[待验证]`，绝不臆造条号；司法解释具体条号与案例案号一律标 `[待验证]`。中度把握锚点（须标「已核实锚点（中度把握），建议复核」）：专利权期限=专利法第42条（发明20年/实用新型10年/外观设计15年，自申请日，外观15年系2021修正）；商标侵权类型=商标法第57条；商标注册有效期10年可续展（每次续展10年）；著作权保护期=自然人终生+死后50年/法人/视听作品首次发表后50年；著作权自愿登记（非确权，具初步证据效力）。规则类（来自司法解释，描述规则不写裸条号）：专利侵权判定=全面覆盖原则+等同原则（手段-功能-效果基本相同+本领域普通技术人员无需创造性劳动可联想）；商标近似=相关公众一般注意力+整体比对与隔离观察+混淆可能性；类似商品=区分表参照+关联性判断；作品独创性与思想表达二分。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/06-ip-legal/06-CONTEXT.md
@CLAUDE.md
@commercial-legal/CLAUDE.md
@data-compliance/CLAUDE.md
@ip-legal/skills/trademark-search/SKILL.md
@ip-legal/skills/cold-start-interview/SKILL.md
@ip-legal/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@commercial-legal/skills/_shared/practice-profile-schema.md
@data-compliance/skills/_shared/legal-basis-conventions.md
@data-compliance/skills/_shared/data-protection-citations.md
@data-compliance/skills/_shared/practice-profile-schema.md
@litigation-legal/skills/_shared/civil-procedure-citations.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立知识产权法律引用脊柱（来源分类规范 + 商标法/专利法/著作权法/反不正当竞争法/司法解释 引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考、法院层级识别、行业监管特色；文件格式约定；命名约定）
    - data-compliance/skills/_shared/legal-basis-conventions.md（最近一次领域改编范式 — 六类来源分类、来源标签表、待验证规则、快速演进/版本提示章节、保守纪律；知识产权版以此为最新骨架改编）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（原始引用规范范式 — 来源分类/标签表/待验证规则/成文法优先/最小引用格式）
    - data-compliance/skills/_shared/data-protection-citations.md（引用库结构模板 — 已核实锚点「建议复核」标注方式、版本说明块、占位案例/学说结构、已核实锚点汇总表、引用库使用说明）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（领域改编范式 — 司法解释组织方式、占位案例/学说结构）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（引用库结构模板 — 法条/案例/学说三类表格组织、按主题分组、待验证标注方式、版本说明块）
  </read_first>
  <files>
    ip-legal/skills/_shared/legal-basis-conventions.md,
    ip-legal/skills/_shared/ip-law-citations.md
  </files>
  <action>
    创建 ip-legal/skills/_shared/legal-basis-conventions.md：定义知识产权全插件统一的法律依据引用规范。以 data-compliance 同名文件为最新骨架改编，章节包含：「来源分类」（按知识产权语境分层：法律=商标法/专利法/著作权法 2020修正/反不正当竞争法 等全国人大及其常委会制定；司法解释=最高人民法院发布，如商标授权确权行政案件审理若干问题的规定、专利侵权纠纷案件应用法律若干问题的解释（一）（二）、著作权民事纠纷案件适用法律若干问题的解释，**具体条号一律标 `[待验证]`，描述规则呈现**；部门规章/审查规范=国家知识产权局商标审查审理指南、专利审查指南、作品自愿登记办法、计算机软件著作权登记办法 等，`[待验证]`；案例=最高院指导性案例/最高院知识产权法庭典型案例可参考，**案号一律 `[待验证]`**，不具判例法约束力；学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用五标签 [法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]，不新造冲突标签）；「待验证标记规则」（凡模型回忆的条文号、**IP 法 2020/2021 修正后的具体条号**、司法解释条号、案例案号、距最后更新超 6 个月的法规、用户口述的条款号或期限阈值，均须标 `[待验证]` 并说明验证途径）；**「IP 法 2020/2021 修正版本提示 — 条号重排保守标注」**（商标法 2019 修正、专利法 2020 修正/2021施行、著作权法 2020 修正/2021施行、反不正当竞争法 2019 修正，修正导致条号重排；除少数中度把握锚点条号外，其余条号默认标 `[待验证 — IP 法修正后条号重排，须核实现行版本]`，并提示「保守原则：不确定即标待验证，不臆造旧版条号」）；「成文法优先与案例定位」（成文法为分析基础；指导性案例/知识产权法庭典型案例仅作参考、明确不具判例法约束力；知识产权诉讼案例较多但模型回忆案号风险高，默认标待验证）；「法院层级与机构定位」（法院四级：基层法院/中级法院/知识产权法院 北京上海广州及部分中院知产庭/最高院知识产权法庭；行政机构：国家知识产权局=商标局商标注册与异议/专利局专利审查，国家版权局=著作权登记与行政管理，地方知识产权局/版权局；涉及特定行业时标 `[行业 flagged — 需核实主管部门规定]`）；「引用最小格式」（法律含：名称+修正年份+条号 `[待验证]`；司法解释含：名称+发布年份+描述规则 不写裸条号；部门规章/审查指南含：名称+发布机关；案例含：案号 `[待验证]`+要点+法院层级）。验证资源列入：国家法律法规数据库 flk.npc.gov.cn、国家知识产权局 www.cnipa.gov.cn、中国商标网 sbj.cnipa.gov.cn、中国版权保护中心、中国裁判文书网、北大法宝。不在本文件放完整法条正文——它是规范，不是法条库。

    创建 ip-legal/skills/_shared/ip-law-citations.md：可复用的知识产权高频引用库，按「法条（法律）/ 司法解释 / 部门规章与审查指南 / 案例 / 学说」分类组织，并按主题分组：
    （A）商标法（2019年修正）核心条文——商标注册有效期 10 年、期满可续展（每次续展 10 年）（规则稳定，**具体条号建议复核**）、商标侵权类型（**第57条**，中度把握锚点，七类侵权行为含未经许可在同一种商品上使用相同商标、在同一种商品上使用近似商标或在类似商品上使用相同/近似商标致混淆等，标「已核实锚点（中度把握），建议复核」）、驰名商标保护（跨类保护规则，**条号 `[待验证]`**）、在先权利（不得损害他人现有在先权利，**条号 `[待验证]`**）、注册商标专用权范围（**条号 `[待验证]`**）；
    （B）专利法（2020年修正，2021年6月1日施行）核心条文——专利权期限（**第42条**，中度把握锚点：发明专利 20 年、实用新型 10 年、外观设计 15 年，均自申请日起算；外观设计 15 年系 2021 修正后 旧为 10 年；标「已核实锚点（中度把握），建议复核」）、专利权保护范围以权利要求内容为准说明书及附图可解释（**条号 `[待验证]`**）、发明/实用新型/外观设计三种专利类型与授权条件（新颖性/创造性/实用性，**条号 `[待验证]`**）、专利侵权与不视为侵权情形（先用权等，**条号 `[待验证]`**）；
    （C）著作权法（2020年修正，2021年6月1日施行）核心条文——保护期（自然人作品=作者终生及死亡后 50 年；法人作品、视听作品=首次发表后 50 年，规则稳定，**具体条号建议复核**）、法定作品类型（文字/口述/音乐戏剧曲艺舞蹈杂技艺术/美术建筑/摄影/视听 旧称电影/工程设计图产品设计图/计算机软件等，**条号 `[待验证]`**）、著作权人享有的人身权与财产权（发表/署名/修改/保护作品完整 + 复制/发行/出租/展览/表演/放映/广播/信息网络传播/摄制/改编/翻译/汇编等，**条号 `[待验证]`**）、职务作品/委托作品/合作作品权属规则（**条号 `[待验证]`**）、思想表达二分（受保护的是表达不是思想，基本原理）；
    （D）反不正当竞争法（2019年修正）核心条文——擅自使用与他人有一定影响的商品名称包装装潢/企业名称字号等引人误认（仿冒混淆，**条号 `[待验证]`**）、商业秘密保护（**条号 `[待验证]`**）、与商标/字号/域名冲突的不正当竞争规则；
    （E）司法解释——商标授权确权行政案件审理若干问题的规定（商标近似/类似商品/混淆可能性判断规则，**描述规则，不写裸条号**）、专利侵权纠纷案件应用法律若干问题的解释（一）（二）（**全面覆盖原则 + 等同原则**：等同 = 手段-功能-效果基本相同 + 本领域普通技术人员无需创造性劳动可联想；禁止反悔/捐献原则；权利要求解释；**描述规则，不写裸条号**）、著作权民事纠纷案件适用法律若干问题的解释（独创性/合理使用/赔偿，**描述规则**）；
    （F）部门规章与审查指南——商标审查审理指南（国家知识产权局）、专利审查指南（国家知识产权局）、作品自愿登记办法、计算机软件著作权登记办法（中国版权保护中心/版权局），**具体规则与条号一律 `[待验证]`**。

    **关键纪律（必须遵守 — IP 法 2020/2021 修正后条号重排，保守优先）**：
    - 中度把握锚点明确标注「已核实锚点（中度把握），建议复核」且不臆造其他条号：专利权期限=专利法第42条（发明20/实用新型10/外观15自申请日）；商标侵权类型=商标法第57条。规则稳定但条号建议复核：商标注册10年可续展；著作权保护期终生+50年/法人首次发表后50年；著作权自愿登记。
    - **除上述中度把握锚点外，商标法/专利法/著作权法/反不正当竞争法的其余具体条号一律标 `[待验证 — IP 法修正后条号重排，须核实现行版本]`，以「描述规则 + 待验证」呈现，绝不硬写裸条号。**
    - **专利侵权判定（全面覆盖原则 + 等同原则）、商标近似判断、类似商品判定来自司法解释与审查指南，描述规则即可，不写裸条号。** 等同原则三要素（手段-功能-效果基本相同）与「本领域普通技术人员无需创造性劳动可联想」须完整描述。
    - 司法解释的具体条号一律标 `[待验证]`，以描述规则呈现。
    - 每条引用行末尾带来源标签（多数为 `[模型知识 — 需验证]`），并按上述规则标 `[待验证]`（中度把握锚点除外，但仍建议复核）。
    - 案例类放占位结构 + 填写说明（含案号、裁判要点、法院层级、参考价值），明确「知识产权诉讼案例较多但模型回忆案号风险高、默认标 `[待验证]`」；至少含 商标近似侵权/专利等同侵权/著作权侵权/不正当竞争仿冒 四类占位。学说类放占位结构 + 填写说明（如等同原则适用边界、独创性标准、混淆可能性认定的学说争议）。
    - 文末附「中度把握锚点汇总」表（锚点 / 法律依据 / 规则摘要）与「引用库使用说明」「更新规则」，参照 data-protection-citations.md / civil-procedure-citations.md 的同名章节，**更新规则中强调 IP 法修正频繁、条号易变，建议每次引用条号前核实现行版本**。

    务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>cf=ip-legal/skills/_shared/legal-basis-conventions.md; lf=ip-legal/skills/_shared/ip-law-citations.md; test -f "$cf" && test -f "$lf" && grep -q '法条\|法律' "$cf" && grep -q '司法解释' "$cf" && grep -q '审查指南\|部门规章' "$cf" && grep -q '案例' "$cf" && grep -q '学说' "$cf" && grep -q '待验证' "$cf" && grep -q '修正\|重排\|版本' "$cf" && grep -q '第42条' "$lf" && grep -q '第57条' "$lf" && grep -q '续展' "$lf" && grep -q '50年\|五十年' "$lf" && grep -q '全面覆盖' "$lf" && grep -q '等同' "$lf" && grep -q '混淆' "$lf"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节区分 法条/司法解释/部门规章 与 案例/学说，并涵盖 商标法/专利法/著作权法/反不正当竞争法语境
    - legal-basis-conventions.md 含「待验证」标记规则 + **「IP 法 2020/2021 修正版本提示 — 条号重排保守标注」**章节，复用五个来源标签（不新造冲突标签），含法院四级与商标局/专利局/版权局机构定位
    - legal-basis-conventions.md 明确「成文法为分析基础、指导性案例/典型案例仅作参考不具判例法约束力、案例案号默认待验证」
    - ip-legal/skills/_shared/ip-law-citations.md 存在，按来源分类组织，分组覆盖 商标法/专利法/著作权法/反不正当竞争法/司法解释/审查指南
    - 中度把握锚点明确呈现并标「建议复核」：专利权期限=专利法第42条（发明20/实用新型10/外观15自申请日）、商标侵权类型=商标法第57条、商标注册10年可续展、著作权保护期终生+50年/法人首次发表后50年、著作权自愿登记；规则类（全面覆盖+等同原则、商标近似、类似商品判定）描述规则不写裸条号
    - 除中度把握锚点外的具体条号、司法解释条号、案例案号一律标 `[待验证]` 并以「描述规则 + 待验证」呈现；无臆造条号
    - 含中度把握锚点汇总表与引用库使用说明（更新规则强调 IP 法修正频繁、条号易变、引用前核实现行版本）
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个知识产权共享引用文件存在；来源分类规范区分 法条/司法解释/部门规章 与 案例/学说，含待验证规则、IP 法修正条号重排保守标注与法院/机构定位；引用库覆盖 商标法/专利法/著作权法/反不正当竞争法/司法解释，中度把握锚点（专利法42/商标法57/商标续展10年/著作权50年/自愿登记）标「建议复核」、规则类（全面覆盖+等同/商标近似/类似商品）描述规则、其余条号标待验证、无臆造。</done>
</task>

<task type="auto">
  <name>Task 2: 建立知识产权版实践配置契约 + 新建 ip-legal/CLAUDE.md 实践配置模板</name>
  <read_first>
    - data-compliance/skills/_shared/practice-profile-schema.md（最近一次新插件配置契约范式 — 真相来源决策、字段映射表、技能读取契约、临时模式默认值、立场选择、重跑/编辑/版本控制、法律事实合理性检查、schema 与 CLAUDE.md 章节对照）
    - commercial-legal/skills/_shared/practice-profile-schema.md（原始配置契约范式 — 立场选择逻辑、写入前确认流程）
    - data-compliance/CLAUDE.md（最近一次新建插件实践配置模板范式 — 画像/立场/风险校准/升级矩阵/文书风格/输出/共享护栏 完整章节结构与占位符写法、时效性触发与行业识别表）
    - commercial-legal/CLAUDE.md（实践配置模板范式 — 完整章节结构与审查者注释块/决策树/来源标签表写法）
    - ip-legal/skills/cold-start-interview/SKILL.md（现有访谈三部分 — 字段映射来源；注意末尾「生成 YAML 格式」表述须在 schema 中纠正为写入 CLAUDE.md）
    - CLAUDE.md（命名；文件格式；中国化原则——法院层级识别、行业监管特色）
  </read_first>
  <files>
    ip-legal/skills/_shared/practice-profile-schema.md,
    ip-legal/CLAUDE.md
  </files>
  <action>
    **第一部分 — 新建 ip-legal/CLAUDE.md 实践配置模板**（当前插件无此文件，首次创建）。以 data-compliance/CLAUDE.md 为最新范式，改编为知识产权语境的散文模板，含占位符 [PLACEHOLDER]。章节：
    - 顶部说明块：本文件由 /ip-legal:cold-start-interview 生成更新，律师/IP 经理可直接编辑，所有 ip-legal 技能从此读取立场；**时效性提示：IP 法（商标法/专利法/著作权法）2019/2020/2021 修正导致条号重排，本文件涉及具体条号的配置建议核实现行版本**。
    - `## 我们是谁`（权利人画像与 IP 组合）：组织/律所名称、实体类型、所属行业（科技/制造/文创/消费品/医药等——影响 IP 类型与行业识别）、**IP 组合概况**（持有商标数量/类别、专利数量与类型 发明/实用新型/外观设计、著作权/软件著作权、字号与域名）、核心品牌/核心技术、主要 IP 痛点（如频繁被仿冒/海外维权/专利布局/清权需求）、IP 团队规模、IP 负责人。
    - `## 谁在使用`：角色（知识产权律师/企业 IP 经理/内部法务/商标代理人 专利代理师/非律师但有律师可咨询/非律师且无律师可咨询）、律师联系人。含非律师角色提示（输出作为研究供律师审查）。
    - `## 可用集成`（检索数据库与工具）：中国商标网（商标查询）、专利检索系统（国家知识产权局/商业专利数据库）、版权登记系统、企业信用信息系统（字号检索）、域名 whois、IP 管理系统、企业微信/钉钉、文档存储。
    - `## 维权与申请立场`：整体维权立场（进取维权型/平衡型/防御型）；`### 商标策略`（注册防御范围 全类/核心类、近似容忍度、异议/无效宣告倾向、是否申请驰名商标认定）；`### 专利策略`（专利类型偏好、侵权维权倾向 主动维权/防御、FTO 清权严格度、规避设计倾向）；`### 著作权策略`（是否登记主要作品、软件著作权登记立场、维权方式 协商/行政投诉/诉讼）；`### 清权严格度`（清权风险容忍度 保守 任何风险即标红/平衡/进取、清权范围 仅商标/全维度商标专利著作权字号域名、清权结论门槛）。
    - `## 风险校准`：🔴关键/🟠高/🟡中等/🟢低 等级定义（结合 IP 侵权风险：商标侵权赔偿/专利侵权禁令与赔偿/著作权侵权法定赔偿；恶意侵权惩罚性赔偿 `[待验证具体条款]`）。
    - `## 升级矩阵`：角色/可独立处理事项/需升级条件表（IP 经理/主办律师/法务总监）；自动升级触发条件（如核心品牌被仿冒、收到侵权警告函/起诉、清权发现高风险障碍、拟提起异议/无效宣告/诉讼、海外 IP 事务）；维权/异议/诉讼触发（商标异议期限、无效宣告、专利无效宣告请求、维权诉讼立案）。
    - `## 文书风格`：检索报告风格、侵权分析意见书风格、清权报告风格、维权函/律师函风格、工作产物存放位置。
    - `## 输出`：工作产物标题（律师角色 vs 非律师角色，沿用特权标题/研究笔记两版）、审查者注释块（含 IP 法修正版本提示）、下一步决策树模板（出具检索/分析报告/启动申请/发维权函/异议无效/诉讼/观望）。
    - `## 共享护栏`：无静默补充原则；**时效性触发（IP 法修正频繁，距最后更新超 6 个月或涉及具体条号即标 `[时效性 flagged — 需验证现行 IP 法版本]`，特别提示 IP 法 2019/2020/2021 修正条号重排）**；验证用户陈述的法律事实（条号/期限/赔偿数额）；来源标签规范表；目的地/特权检查；`### 行业识别`（科技/制造/文创/医药/消费品等行业的 IP 特殊要求 + 国家知识产权局 商标局/专利局、国家版权局多头管理，标 `[行业 flagged — 需核实主管部门规定]`）。
    - `## 事项工作区` 与 `## 审查过的种子文档`（沿用范式）。

    **第二部分 — 创建 ip-legal/skills/_shared/practice-profile-schema.md**，以 data-compliance 同名文件为最新骨架改编为知识产权语境。章节：
    - 「配置文件是什么 / 真相来源」：明确真相来源是 ip-legal/CLAUDE.md（散文模板，本阶段新建），由 /ip-legal:cold-start-interview 生成更新，律师/IP 经理可直接编辑；记录架构决策（不引入冲突新 JSON/YAML 格式，沿用 CLAUDE.md 单一真相来源，理由同 data-compliance 版）。**明确纠正**：现有 cold-start-interview/SKILL.md 末尾「生成 知识产权 实践配置文件（YAML 格式）」的表述应理解为填充 ip-legal/CLAUDE.md 对应章节，而非另存独立 YAML 文件。
    - 「字段映射表」：将访谈/审查收集的字段对应到 ip-legal/CLAUDE.md 章节，并标注哪些技能读取该字段。至少覆盖映射组：权利人画像与 IP 组合（## 我们是谁/## 谁在使用 → 所有技能工作产物标题、IP 类型识别、清权范围判断）；维权立场（## 维权与申请立场 → 整体维权立场 → 所有技能风险分级）；商标策略（## 维权与申请立场 → 商标策略 → trademark-search 各子技能、ip-clearance 商标清权）；专利策略（## 维权与申请立场 → 专利策略 → patent-analysis 各子技能、ip-clearance 专利 FTO）；著作权策略（## 维权与申请立场 → 著作权策略 → copyright-registration 各子技能、ip-clearance 著作权清权）；清权严格度（## 维权与申请立场 → 清权严格度 → ip-clearance 各子技能）；风险校准（## 风险校准 → 等级 → 所有技能）；升级矩阵与维权触发（## 升级矩阵 → 各技能升级路由 + 异议/诉讼触发）；文书风格（## 文书风格/## 输出 → 各装配/报告子技能）；检索数据库（## 可用集成 → search-query、ip-clearance 检索路由）；行业识别（## 共享护栏 → 行业识别 → 各技能行业标记）。
    - 「技能读取契约」：技能在实质性工作前须读取 ip-legal/CLAUDE.md、检查关键字段是否含 [PLACEHOLDER]、据此选运行模式；配置缺失/含占位符时标准提示（运行 cold-start-interview 或说「临时模式」）；临时模式默认值表（维权立场平衡、角色律师、清权严格度按保守标记常见障碍、商标近似按相关公众一般注意力逐案判断、专利侵权按全面覆盖+等同逐一比对、著作权按独创性与思想表达二分判断）。
    - 「权利人立场（进取维权 vs 防御 vs 平衡；清权严格度）选择」：技能在工作前确认维权立场与清权严格度（从 ## 维权与申请立场 读取），据此加载对应立场与风险标记强度，参照 commercial/data-compliance practice-profile-schema 的立场选择逻辑改编为知识产权语境。
    - 「重跑 / 编辑 / 版本控制」：完整重跑 vs 单独更新某部分；直接编辑；git 版本控制与回滚（git log/diff/checkout ip-legal/CLAUDE.md）。
    - 「法律事实合理性检查」：用户口述条号/期限/赔偿数额（如专利权期限、商标续展期限、著作权保护期、法定赔偿上限）时写入前合理性检查（条号核查、**IP 法修正条号标待验证**、时效性标记、矛盾澄清），含 `[前提 flagged — 需验证]` 流程；特别强调 IP 法 2019/2020/2021 修正条号重排，口述条号须标待验证。
    - 「schema 与 CLAUDE.md 模板章节对照」表。
    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。两文件均为本任务产出，注意 ip-legal/CLAUDE.md 是**新建**。
  </action>
  <verify>
    <automated>cm=ip-legal/CLAUDE.md; sc=ip-legal/skills/_shared/practice-profile-schema.md; test -f "$cm" && test -f "$sc" && grep -q '权利人\|我们是谁' "$cm" && grep -q '维权\|维权与申请立场' "$cm" && grep -q '商标策略' "$cm" && grep -q '专利策略' "$cm" && grep -q '清权' "$cm" && grep -q '升级矩阵' "$cm" && grep -q '行业' "$cm" && grep -q 'ip-legal/CLAUDE.md' "$sc" && grep -q '字段映射' "$sc" && grep -q '临时模式' "$sc" && grep -q '清权严格度\|维权立场' "$sc"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/CLAUDE.md 新建存在，含 ## 我们是谁（权利人画像与 IP 组合，含行业/商标专利著作权数量/核心品牌技术/痛点）、## 谁在使用、## 可用集成（检索数据库）、## 维权与申请立场（含 ### 商标策略 + ### 专利策略 + ### 著作权策略 + ### 清权严格度）、## 风险校准、## 升级矩阵（含维权/异议/诉讼触发）、## 文书风格、## 输出、## 共享护栏（含 ### 行业识别 + 时效性触发）
    - ip-legal/CLAUDE.md 含律师/非律师双版工作产物标题，时效性触发体现 IP 法 2019/2020/2021 修正条号重排特点
    - ip-legal/skills/_shared/practice-profile-schema.md 存在，明确真相来源为 ip-legal/CLAUDE.md，记录「不引入冲突新格式」架构决策，纠正现有访谈「生成 YAML」表述
    - schema 含字段映射表，覆盖 权利人画像IP组合/维权立场/商标策略/专利策略/著作权策略/清权严格度/风险校准/升级矩阵/文书风格/检索数据库/行业识别 各组并标注读取技能
    - schema 含技能读取契约 + 临时模式默认值 + 维权立场/清权严格度 立场选择逻辑 + 法律事实合理性检查（IP 法修正条号标待验证）+ schema 与 CLAUDE.md 章节对照表
    - 两文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新建 ip-legal/CLAUDE.md 实践配置模板（权利人画像与 IP 组合/维权与申请立场含商标专利著作权策略与清权严格度/风险校准/升级矩阵/文书风格/输出/共享护栏含行业识别）；知识产权版配置契约定义配置文件是什么/在哪/技能怎么读，字段映射到 CLAUDE.md 章节，含临时模式与维权立场/清权严格度选择与法律事实合理性检查，并纠正现有访谈 YAML 表述。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 trademark-search 为四个可独立触发的子技能</name>
  <read_first>
    - ip-legal/skills/trademark-search/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；这是要拆分迁移并大幅深化的源）
    - ip-legal/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - ip-legal/skills/_shared/ip-law-citations.md（Task 1 产出 — 引用库，各子技能法律依据引用此处，重点：商标法第57条、商标近似/类似商品/混淆司法解释规则、在先权利/驰名商标）
    - ip-legal/skills/_shared/practice-profile-schema.md（Task 2 产出 — 配置读取契约）
    - ip-legal/CLAUDE.md（Task 2 产出 — 配置模板，子技能读取维权立场/商标策略/检索数据库/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板含 markdown 结构/边界条件表/错误处理表/## 法律依据 按三类分类的完整范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    ip-legal/skills/trademark-search/search-query/SKILL.md,
    ip-legal/skills/trademark-search/similarity-assessment/SKILL.md,
    ip-legal/skills/trademark-search/goods-services-classification/SKILL.md,
    ip-legal/skills/trademark-search/prior-rights-obstacles/SKILL.md
  </files>
  <action>
    将现有 trademark-search/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：search-query / similarity-assessment / goods-services-classification / prior-rights-obstacles；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 ip-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/司法解释/部门规章 与 案例/学说 分类，引用 _shared/ip-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 trademark-search 编排入口调用，也可由律师/IP 经理单独触发（/ip-legal:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** 拆分时须深化（补充边界条件、错误处理、输出模板、法律依据分类），而非仅搬运纲要。

    分工（迁移现有三步纲要并深化，无丢失）：
    - search-query（商标检索与查询）：覆盖现纲要「需求收集」并深化。检索数据库选择（中国商标网 sbj.cnipa.gov.cn 官方查询/商业数据库，从 ## 可用集成 读取可用工具）；检索目标厘清（拟用商标的文字/图形/组合、申请人、指定商品服务类别）；尼斯分类与《类似商品和服务区分表》应用（45 类 1-34 商品 + 35-45 服务，确定检索类别）；检索式构造（文字商标按读音/字形/含义近似检索、图形商标按维也纳分类要素编码检索、组合商标分别检索各要素）；查询结果整理（在先相同/近似商标列表、申请号注册号/申请人/类别/状态 有效/无效/驳回复审中/异议中）。深化：检索策略表（精确/近似/拼音/谐音/图形要素）、检索类别确定决策表、结果整理输出表模板。边界条件：图形商标检索须人工辅助（维也纳分类编码不准确）、跨类检索范围。
    - similarity-assessment（商标近似判断）：覆盖现纲要「法律分析」核心并深化。商标近似判断三要素（**音/形/义**：读音相同近似、字形/图形外观近似、含义相同近似）；判断标准（以**相关公众一般注意力**为标准，整体观察与隔离比对相结合，对**显著部分**重点比对——来自商标授权确权司法解释，**描述规则**）；**混淆可能性**判断（是否容易导致相关公众对商品/服务来源产生混淆或误认为存在关联）；近似与混淆的关系。深化：音/形/义三维比对表模板、整体观察 vs 显著部分对比方法、混淆可能性影响因素表（商标显著性与知名度/商品关联度/相关公众）、近似度分级（高度近似/一定近似/不近似）。引用商标法第57条（侵权类型，中度把握锚点）。边界条件：弱显著性商标（通用名称/描述性）的近似判断标准放宽；驰名商标的近似认定交由 prior-rights-obstacles 处理跨类。
    - goods-services-classification（类似商品与服务判定）：覆盖现纲要「法律分析」中的商品服务维度并深化。《类似商品和服务区分表》（基于尼斯分类）应用（类似群组判定、同一类似群推定类似）；类似商品/服务判断（功能用途/生产部门/销售渠道/消费对象/原料 等关联性因素）；区分表的参照地位（参照但非绝对，可结合个案突破）；跨类保护与商品服务关联性判断。深化：类似群组判定流程表、商品服务关联性因素表、区分表突破情形说明。边界条件：区分表未列明的新商品/服务、商品与服务之间的类似判定。引用商标授权确权司法解释类似商品判定规则（描述规则，不写裸条号）。
    - prior-rights-obstacles（在先权利与障碍分析）：覆盖现纲要「法律分析」中的障碍维度与「输出生成」并深化。在先权利类型（在先注册商标/在先申请商标 申请在先原则/驰名商标 跨类保护/在先字号 企业名称/在先著作权/在先外观设计专利/在先姓名肖像权等，不得损害他人现有在先权利，**条号待验证**）；注册障碍评估（绝对障碍 缺乏显著性/通用名称/欺骗性等 + 相对障碍 与在先商标冲突）；可注册性与可使用性初判；驰名商标跨类保护规则。深化：在先权利障碍清单表、障碍严重性分级（绝对障碍/相对障碍/可克服障碍）、可注册性结论模板（可注册/有障碍可尝试/建议放弃）。本子技能汇总前三个子技能发现给出商标查询综合结论。引用驰名商标保护与在先权利规则（条号待验证）。边界条件：在先权利人是否实际使用/是否在三年内（撤三可能）；与拟用商标清权的衔接（提示 ip-clearance 商标清权 06-03）。

    遵守文件格式约定。输出模板用 markdown 结构示意（沿用 social-insurance-wages / penalty-assessment 风格）。所有法律依据引用 _shared/ip-law-citations.md，中度把握锚点（商标法第57条等）标「建议复核」、商标近似/类似商品/混淆规则描述规则不写裸条号、其余条号标待验证。
  </action>
  <verify>
    <automated>for d in search-query similarity-assessment goods-services-classification prior-rights-obstacles; do f="ip-legal/skills/trademark-search/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '检索\|尼斯' ip-legal/skills/trademark-search/search-query/SKILL.md && grep -q '混淆' ip-legal/skills/trademark-search/similarity-assessment/SKILL.md && grep -q '类似商品\|区分表' ip-legal/skills/trademark-search/goods-services-classification/SKILL.md && grep -q '在先权利\|驰名商标' ip-legal/skills/trademark-search/prior-rights-obstacles/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 ip-legal/skills/trademark-search/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行（深度对标 social-insurance-wages）
    - search-query 含检索数据库选择与尼斯分类；similarity-assessment 含音/形/义三要素与混淆可能性（描述规则）；goods-services-classification 含区分表与类似商品判定；prior-rights-obstacles 含在先权利与驰名商标
    - 法律依据引用 _shared 库，商标法第57条标「建议复核」、商标近似/类似商品/混淆规则描述规则不写裸条号、其余条号标待验证
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>trademark-search 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；search-query 检索与尼斯分类、similarity-assessment 音形义与混淆、goods-services-classification 类似商品、prior-rights-obstacles 在先权利与驰名商标；法律依据按来源分类引用 _shared 库，商标法第57条标建议复核、近似/类似/混淆规则描述规则、其余条号标待验证。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 trademark-search/SKILL.md 为编排入口</name>
  <read_first>
    - ip-legal/skills/trademark-search/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - ip-legal/CLAUDE.md（Task 2 产出 — 配置模板）
    - ip-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 06-03 统一更新）
  </read_first>
  <files>
    ip-legal/skills/trademark-search/SKILL.md
  </files>
  <action>
    将 ip-legal/skills/trademark-search/SKILL.md 改造为编排入口：保留 frontmatter（name: trademark-search，更新 description 说明它现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/trademark-search/<子技能名>/SKILL.md）；(2) 目的与整体商标查询近似分析流程概览（检索 → 近似判断 → 类似商品判定 → 在先权利障碍综合结论）；(3) 前置：加载维权立场——读取 ip-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /ip-legal:cold-start-interview 或说「临时模式」），含临时模式段落（平衡维权立场、律师角色、商标近似按相关公众一般注意力逐案判断、清权严格度保守、标 `[临时模式]`）；(4) 子技能编排顺序表——商标检索与查询 → 商标近似判断 → 类似商品与服务判定 → 在先权利与障碍分析，每行说明该子技能做什么、对应子技能路径（skills/trademark-search/<name>/SKILL.md）、可单独触发的斜杠命令（/ip-legal:<name>）+ 顺序说明；(5) 入口级护栏：权利人画像/IP 组合确认（从 ## 我们是谁 读取）、商标策略加载（从 ## 维权与申请立场 → 商标策略）、检索数据库可用性确认（从 ## 可用集成）、行业识别、目的地/特权检查、若涉及拟用商标全维度清权提示可调用 ip-clearance（06-03）、时效性提示（IP 法修正条号重排）。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=ip-legal/skills/trademark-search/SKILL.md; grep -q '^name: trademark-search' "$f" && grep -q 'search-query' "$f" && grep -q 'similarity-assessment' "$f" && grep -q 'goods-services-classification' "$f" && grep -q 'prior-rights-obstacles' "$f" && grep -q '临时模式' "$f" && grep -q '商标策略\|检索数据库\|行业\|清权' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/skills/trademark-search/SKILL.md 仍有 frontmatter name: trademark-search，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/ip-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、权利人画像/IP 组合确认、商标策略加载、检索数据库可用性、行业识别、目的地/特权检查、清权衔接提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 trademark-search/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（立场确认、商标策略、检索数据库、行业识别、临时模式、特权检查、清权衔接）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 trademark-search 子技能 + 一个引用规范 + 一个引用库 + 一个配置契约 + 一个新建 CLAUDE.md + 一个编排入口全部存在且格式合规
- 知识产权引用脊柱（来源分类规范含司法解释/审查指南 + 商标法/专利法/著作权法/反不正当竞争法/司法解释 引用库）与配置契约可被 06-02 / 06-03 复用
- 现有 trademark-search 浅骨架三步纲要无丢失迁移并大幅深化
- 中度把握锚点（专利权期限=专利法第42条、商标侵权类型=商标法第57条、商标注册10年可续展、著作权保护期终生+50年/法人首次发表后50年、著作权自愿登记）标「建议复核」；规则类（全面覆盖+等同/商标近似/类似商品/混淆）描述规则不写裸条号；其余条号、司法解释条号、案例案号均标 `[待验证]`，无臆造
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('ip-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/IP 经理可单独触发任一商标查询近似分析子能力（4 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 知识产权法律引用按 法条/司法解释/部门规章 与 案例/学说 分类并标待验证；中度把握锚点明确呈现并标建议复核；IP 法修正条号保守标待验证
- 新建 ip-legal/CLAUDE.md 实践配置模板（权利人画像/IP 组合/维权立场/检索数据库/升级规则）存在
- 知识产权版实践配置契约定义清楚，技能据此读取 ip-legal/CLAUDE.md
- trademark-search 编排入口指向四个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/06-ip-legal/06-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
