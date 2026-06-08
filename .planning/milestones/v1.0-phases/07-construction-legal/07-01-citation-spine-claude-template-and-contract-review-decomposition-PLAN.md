---
phase: 07-construction-legal
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - construction-legal/skills/_shared/legal-basis-conventions.md
  - construction-legal/skills/_shared/construction-law-citations.md
  - construction-legal/skills/_shared/practice-profile-schema.md
  - construction-legal/CLAUDE.md
  - construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md
  - construction-legal/skills/contract-review/schedule-quality/SKILL.md
  - construction-legal/skills/contract-review/price-settlement/SKILL.md
  - construction-legal/skills/contract-review/breach-termination/SKILL.md
  - construction-legal/skills/contract-review/SKILL.md
autonomous: true
requirements:
  - CONSTRUCTION-CITATION-SPINE
  - PROFILE-SCHEMA
  - CLAUDE-TEMPLATE
  - CONTRACT-REVIEW-DECOMP
user_setup: []

must_haves:
  truths:
    - "存在一个建设工程专用的法律依据引用规范（来源标签 + 法条/司法解释/行政法规/部门规章 与 案例/学说 分类 + 待验证 + 司法解释具体条号保守标注），所有 construction-legal 技能可复用"
    - "存在一个可复用的 民法典建设工程合同(第788-808条)/建筑法/招标投标法/城市房地产管理法/建设工程施工合同司法解释(一)/商品房买卖合同司法解释 引用库，中度把握锚点（建设工程合同定义=民法典第788条、竣工验收=第799条、承包人价款优先受偿权=第807条、建设工程合同章=第788-808条 + 通则部分复用商事脊柱已核实锚点 588/585条第2款/563/533/681/686）明确标注「建议复核」，司法解释具体条号一律标待验证、描述规则呈现，不臆造"
    - "存在建设工程版实践配置文件契约，明确字段、存储位置（construction-legal/CLAUDE.md）、技能读取规则，并映射到 construction-legal/CLAUDE.md 章节，立场字段区分发包人侧/承包人侧/中立/购房人侧"
    - "新建 construction-legal/CLAUDE.md 实践配置模板（主体画像 发包人/承包人/监理/购房人侧 / 项目类型 房建市政装饰商品房买卖 / 审查与争议立场 含各审查严格度 / 风险校准 / 升级矩阵 含诉讼仲裁优先受偿权行使触发 / 文书风格 / 输出 / 共享护栏 含项目类型识别与地方性规定提示），可由冷启动访谈填充、律师可直接编辑"
    - "律师/法务可以单独触发施工合同审查的任一子能力（主体资质与合同效力 / 工期与质量 / 价款与结算 / 违约与解除）而无需运行整个流程"
    - "每个 contract-review 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；现有 contract-review 浅骨架三步纲要无丢失迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "construction-legal/skills/_shared/legal-basis-conventions.md"
      provides: "建设工程语境的 法条/司法解释/行政法规/部门规章 + 案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表 + 司法解释具体条号保守标注 + 行业/机构定位（住建部/地方建设主管部门/工程造价与质量监督机构/法院四级与建设工程仲裁）"
      contains: "待验证"
      min_lines: 70
    - path: "construction-legal/skills/_shared/construction-law-citations.md"
      provides: "民法典建设工程合同(第788-808条)/建筑法/招标投标法/城市房地产管理法/施工合同司法解释(一)/商品房买卖合同司法解释 的可复用引用库（按来源分类、中度把握锚点 + 待验证）"
      contains: "第807条"
      min_lines: 150
    - path: "construction-legal/skills/_shared/practice-profile-schema.md"
      provides: "建设工程版实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 construction-legal/CLAUDE.md 映射 + 发包人/承包人/中立/购房人侧立场选择"
      min_lines: 70
    - path: "construction-legal/CLAUDE.md"
      provides: "建设工程实践配置模板：主体画像与项目组合 / 谁在使用 / 可用集成 造价鉴定资源 / 审查与争议立场 / 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏 含项目类型识别与地方性规定"
      contains: "发包人"
      min_lines: 90
    - path: "construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md"
      provides: "主体资质与合同效力子技能（发包人/承包人资质 + 施工许可与必须招标 + 无效情形转包违法分包无资质未招标黑白合同 + 无效合同折价补偿）"
      contains: "转包"
      min_lines: 150
    - path: "construction-legal/skills/contract-review/schedule-quality/SKILL.md"
      provides: "工期与质量子技能（开竣工与工期顺延 + 竣工验收 + 质量标准与保修 + 工程质量责任）"
      contains: "竣工验收"
      min_lines: 150
    - path: "construction-legal/skills/contract-review/price-settlement/SKILL.md"
      provides: "价款与结算子技能（计价方式 固定总价单价成本加酬金 + 工程量与变更签证 + 结算依据 + 进度款与质保金）"
      contains: "结算"
      min_lines: 150
    - path: "construction-legal/skills/contract-review/breach-termination/SKILL.md"
      provides: "违约与解除子技能（工期/质量违约 + 发包人/承包人法定解除 + 损失赔偿 + 已完工程处理）"
      contains: "解除"
      min_lines: 150
    - path: "construction-legal/skills/contract-review/SKILL.md"
      provides: "施工合同审查编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用建设工程合同定义与黑白合同/无效折价补偿规则（民法典第788条 + 施工合同司法解释(一)）"
      pattern: "construction-law-citations|第788条|黑白合同|折价补偿"
    - from: "construction-legal/skills/contract-review/schedule-quality/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用竣工验收规则（民法典第799条）"
      pattern: "construction-law-citations|第799条|竣工验收"
    - from: "construction-legal/skills/contract-review/SKILL.md"
      to: "四个 contract-review 子技能"
      via: "编排入口指向子技能路径"
      pattern: "subject-qualification-validity|schedule-quality|price-settlement|breach-termination"
    - from: "construction-legal/skills/_shared/practice-profile-schema.md"
      to: "construction-legal/CLAUDE.md"
      via: "映射访谈/审查字段到实践配置模板章节（含发包人/承包人/购房人侧立场）"
      pattern: "审查立场|发包人|承包人|主体画像"
---

<objective>
将建设工程插件从 v0.1.0 的扁平浅骨架深化为深层子技能体系，建立全插件复用的法律引用脊柱、建设工程版实践配置契约，并**新建** construction-legal/CLAUDE.md 实践配置模板。

本计划交付四块内容：
1. **建设工程引用脊柱（citation spine）** — 一套所有 construction-legal 技能共享的法律依据引用规范（来源标签 + 法条/司法解释/行政法规/部门规章 与 案例/学说 分类 + 待验证 + **司法解释具体条号保守标注** + 行业/机构定位），以及一个可复用的 民法典建设工程合同/建筑法/招标投标法/城市房地产管理法/施工合同司法解释(一)/商品房买卖合同司法解释 引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 07-02 / 07-03 直接引用，避免每个技能重复维护条文。
2. **建设工程版实践配置契约** — construction-legal/skills/_shared/practice-profile-schema.md：明确配置文件是什么、在哪（construction-legal/CLAUDE.md）、技能怎么读，以及访谈/审查字段与 construction-legal/CLAUDE.md 章节的映射；**立场字段区分发包人侧/承包人侧/中立/购房人侧**（建设工程审查的核心变量）。
3. **新建 construction-legal/CLAUDE.md 实践配置模板** — 建设工程语境的散文模板：主体画像与项目组合（发包人/承包人/监理/购房人代理）/ 谁在使用 / 可用集成（造价鉴定资源）/ 审查与争议立场（发包人侧/承包人侧/中立/购房人侧 + 各审查严格度）/ 风险校准 / 升级矩阵（诉讼/仲裁/优先受偿权行使触发）/ 文书风格 / 输出 / 共享护栏（项目类型识别 / 时效性触发 / 地方性规定提示）。当前插件**尚无此文件**，本计划首次创建。
4. **施工合同审查拆分** — 按 CONTEXT「深层子技能拆分」决策，将 contract-review（现 ~18 行浅骨架）拆为四个可独立触发的子技能：主体资质与合同效力 / 工期与质量 / 价款与结算 / 违约与解除。现有三步纲要（需求收集 / 法律分析 / 输出生成）拆分迁移并大幅深化，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分 + 5 能力面，现实只有 4 个扁平浅骨架且无 CLAUDE.md」的核心 gap，并为建设工程语境建立可复用引用脊柱与配置真相来源。引用脊柱、配置契约与 CLAUDE.md 先行，保证三个计划的引用与配置读取一致。
Output: 1 个引用规范 + 1 个引用库 + 1 个配置契约 + 1 个新建 CLAUDE.md + 4 个 contract-review 子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民法典合同编建设工程合同 第788-808条、建筑法、招标投标法、城市房地产管理法 为分析基础，建设工程施工合同司法解释(一)、商品房买卖合同司法解释、质量管理条例/招标投标法实施条例 为补充）；指导性案例作参考非判例法（最高院/建设工程典型案例可参考，案号标待验证）；法院层级识别（基层/中院/高院/最高院四级 + 建设工程仲裁常见）；行业监管特色（住建部/地方住建主管部门、工程造价与质量监督机构、招标投标行政监督部门）；执业环境适配（建设工程律师 / 发包人或承包人内部法务 / 监理与造价人员 / 房地产购房人代理）。命名约定：技能名 kebab-case；斜杠命令 /construction-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/行政法规/部门规章 与 案例/学说 分类，带来源标签。中度把握锚点（须标「已核实锚点（中度把握），建议复核」）：建设工程合同定义=民法典第788条；竣工验收=民法典第799条；承包人工程价款优先受偿权=民法典第807条；建设工程合同章=民法典合同编第788-808条。通则部分复用商事脊柱已核实锚点（**严禁回退已知错误**）：违约金与定金竞合=第588条（不是 585条第2款）；违约金调整=第585条第2款；违约损害赔偿=第583条；可预见性损失=第584条；法定解除=第563条；情势变更=第533条；保证合同=第681条/连带保证=第686条。规则类（来自司法解释，描述规则不写裸条号）：黑白合同以备案中标合同结算；无效施工合同参照合同约定折价补偿（参照合同约定支付工程价款）；优先受偿权范围与行使期限；面积误差比超 3% 处理；逾期交房/办证违约金调整。**司法解释（施工合同司法解释(一)、商品房买卖司法解释）具体条号、行政法规具体条号、案例案号一律标 `[待验证]`，描述规则呈现，绝不臆造。**
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/07-construction-legal/07-CONTEXT.md
@CLAUDE.md
@commercial-legal/CLAUDE.md
@ip-legal/CLAUDE.md
@construction-legal/skills/contract-review/SKILL.md
@construction-legal/skills/cold-start-interview/SKILL.md
@construction-legal/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@commercial-legal/skills/_shared/practice-profile-schema.md
@ip-legal/skills/_shared/legal-basis-conventions.md
@ip-legal/skills/_shared/ip-law-citations.md
@ip-legal/skills/_shared/practice-profile-schema.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立建设工程法律引用脊柱（来源分类规范 + 民法典建设工程合同/建筑法/招标投标法/城市房地产管理法/司法解释 引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考、法院层级识别、行业监管特色；文件格式约定；命名约定）
    - ip-legal/skills/_shared/legal-basis-conventions.md（最近一次领域改编范式 — 来源分类、来源标签表、待验证规则、版本/保守标注章节、保守纪律；建设工程版以此为最新骨架改编）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（原始引用规范范式 — 来源分类/标签表/待验证规则/成文法优先/最小引用格式）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（**核心脊柱 — 建设工程合同属民法典合同编典型合同**；引用库结构 法条/案例/学说三类表格、按主题分组、待验证标注、版本说明块；通则部分锚点 违约金第585条第2款/竞合第588条/法定解除第563条/情势变更第533条/保证第681、686条 直接复用其已核实结论）
    - ip-legal/skills/_shared/ip-law-citations.md（引用库结构模板 — 已核实锚点「建议复核」标注方式、版本说明块、占位案例/学说结构、已核实锚点汇总表、引用库使用说明）
  </read_first>
  <files>
    construction-legal/skills/_shared/legal-basis-conventions.md,
    construction-legal/skills/_shared/construction-law-citations.md
  </files>
  <action>
    创建 construction-legal/skills/_shared/legal-basis-conventions.md：定义建设工程全插件统一的法律依据引用规范。以 ip-legal 同名文件为最新骨架改编，章节包含：「来源分类」（按建设工程语境分层：法律=民法典合同编（建设工程合同 第788-808条）/建筑法/招标投标法/城市房地产管理法 等全国人大及其常委会制定；司法解释=最高人民法院发布，如最高法关于审理建设工程施工合同纠纷案件适用法律问题的解释(一)、商品房买卖合同纠纷司法解释，**具体条号一律标 `[待验证]`，描述规则呈现**；行政法规=国务院制定，如建设工程质量管理条例、建设工程安全生产管理条例、招标投标法实施条例、城市房地产开发经营管理条例，`[待验证]`；部门规章/规范性文件=住建部/发改委等，如必须招标的工程建设项目规定、工程总承包与资质管理相关规章，`[待验证]`；案例=最高院指导性案例/建设工程典型案例可参考，**案号一律 `[待验证]`**，不具判例法约束力；学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用五标签 [法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供]，不新造冲突标签）；「待验证标记规则」（凡模型回忆的条文号、**司法解释条号**、行政法规条号、案例案号、规模标准/期限阈值、距最后更新超 6 个月的法规、用户口述的条款号或金额，均须标 `[待验证]` 并说明验证途径）；「司法解释具体条号保守标注」（建设工程施工合同司法解释经(一)(二)整合与历次修订、商品房买卖合同司法解释亦经修订，条号易变；除民法典建设工程合同中度把握锚点外，司法解释具体条号默认标 `[待验证 — 司法解释条号易变，须核实现行版本]`，以「描述规则 + 待验证」呈现，提示「保守原则：不确定即标待验证，不臆造」）；「成文法优先与案例定位」（成文法为分析基础；指导性案例/建设工程典型案例仅作参考、明确不具判例法约束力；案号默认标待验证）；「法院层级与机构定位」（法院四级：基层/中级/高级/最高院，**建设工程争议金额大常由中院一审、建设工程仲裁亦常见**；行政机构：住房和城乡建设部=施工许可/资质/质量安全监管，地方住建主管部门，工程造价管理与工程质量监督机构，招标投标行政监督部门 发改委/住建/水利/交通等按行业，房地产开发与预售许可主管部门；涉及特定地区时标 `[地方 flagged — 需核实地方性法规与地方建设主管部门规定]`）；「引用最小格式」（法律含：名称+条号 `[待验证]`，民法典建设工程合同锚点条号可引并标建议复核；司法解释含：名称+描述规则 不写裸条号；行政法规/部门规章含：名称+发布机关；案例含：案号 `[待验证]`+要点+法院层级）。验证资源列入：国家法律法规数据库 flk.npc.gov.cn、住建部 www.mohurd.gov.cn、全国建筑市场监管公共服务平台、中国招标投标公共服务平台、中国裁判文书网、北大法宝。不在本文件放完整法条正文——它是规范，不是法条库。

    创建 construction-legal/skills/_shared/construction-law-citations.md：可复用的建设工程高频引用库，按「法条（法律）/ 司法解释 / 行政法规与部门规章 / 案例 / 学说」分类组织，并按主题分组：
    （A）民法典合同编 — 建设工程合同（第788-808条）核心条文：建设工程合同定义（承包人进行工程建设、发包人支付价款的合同，含勘察/设计/施工合同）=**第788条**（中度把握锚点，标「已核实锚点（中度把握），建议复核」）；竣工验收（建设工程竣工经验收合格后方可交付使用，未经验收或验收不合格不得交付使用）=**第799条**（中度把握锚点，建议复核）；承包人工程价款优先受偿权（发包人未按约支付价款，承包人可催告后就该工程折价或拍卖的价款优先受偿，与抵押权/消费者购房人权利顺位由司法解释细化）=**第807条**（中度把握锚点，建议复核）；建设工程合同整章=**第788-808条**（规则稳定，逐条具体条号建议复核：含发包人/承包人义务、隐蔽工程、勘察设计施工质量、不合理工期、转包与分包限制等，**除上述三锚点外逐条条号标 `[待验证]`**）。
    （B）民法典合同编通则（援引商事脊柱已核实锚点，**严禁回退已知错误**）：违约责任=第577条 `[待验证]`、违约损害赔偿=**第583条**、可预见性损失范围=**第584条**、违约金调整（过低增加/过高适当减少）=**第585条第2款**（第1款=约定违约金/损失计算方法、第3款=迟延履行后仍须履行）、违约金与定金竞合（择一不并用）=**第588条**（**注意：不是 585条第2款，这是经核实纠正的高风险锚点**）、定金合同/数额=第586条、定金罚则=第587条、法定解除=**第563条**、情势变更=**第533条**、保证合同定义=**第681条**、连带责任保证=**第686条**——以上沿用 Phase 2 已核实 anchor list，标「已核实锚点（中度把握），建议复核」并注明「复用商事合同脊柱结论」。
    （C）建筑法核心规则：施工许可证制度、从事建筑活动的单位资质等级、禁止无资质或超资质承揽、禁止转包与违法分包、建设工程质量与安全生产责任（**条号一律 `[待验证]`**，描述规则）。
    （D）招标投标法与实施条例：必须招标的工程建设项目范围与规模标准（**描述规则 + 规模标准，具体条号与金额阈值 `[待验证]`**）、公开招标与邀请招标、招标投标程序、串通投标与弄虚作假骗取中标、中标无效（描述规则，条号 `[待验证]`）。
    （E）城市房地产管理法 + 商品房买卖：商品房预售许可与现售条件、房地产开发企业资质、网签备案（**条号 `[待验证]`**，描述规则）。
    （F）司法解释——最高法建设工程施工合同司法解释(一)：黑白合同以备案中标合同结算（实际履行的施工合同与备案中标合同实质性内容不一致，以备案中标合同作为结算依据，**描述规则，不写裸条号**）、无效施工合同折价补偿（建设工程施工合同无效但工程经竣工验收合格的，可参照合同关于工程价款的约定折价补偿承包人，**描述规则**）、承包人工程价款优先受偿权的范围/行使期限/不得对抗消费者购房人（**描述规则，期限阈值标 `[待验证]`**）、工程质量不合格的价款处理与质量抗辩、工期顺延与签证、垫资及利息约定效力（**描述规则**）；商品房买卖合同司法解释：定金/认购与诚意金、逾期交房与逾期办证违约责任及违约金调整、**面积误差比绝对值在 3% 以内据实结算、超出 3% 的处理（买受人可解除或多退少补，超 3% 部分价款的特别返还规则）**、按揭贷款不成的合同解除、一房二卖（**均描述规则，具体条号一律 `[待验证]`**）。
    （G）行政法规与部门规章——建设工程质量管理条例、建设工程安全生产管理条例、招标投标法实施条例、城市房地产开发经营管理条例、必须招标的工程建设项目规定，**具体规则与条号一律 `[待验证]`**。

    **关键纪律（必须遵守 — 不臆造条号，司法解释条号保守优先）**：
    - 中度把握锚点明确标注「已核实锚点（中度把握），建议复核」且不臆造其他条号：建设工程合同定义=民法典第788条；竣工验收=第799条；承包人价款优先受偿权=第807条；建设工程合同章=第788-808条。
    - 通则部分复用商事脊柱已核实锚点（违约金调整 585条第2款、竞合 588条、损害赔偿 583条、可预见 584条、法定解除 563条、情势变更 533条、保证 681/686条），标「已核实锚点（中度把握），建议复核」并注「复用商事脊柱」，**严禁回退已知错误（竞合是 588条不是 585条第2款）**。
    - **除上述锚点外，建设工程合同分则逐条、建筑法/招标投标法/城市房地产管理法的具体条号一律标 `[待验证]`，以「描述规则 + 待验证」呈现，绝不硬写裸条号。**
    - **司法解释（施工合同司法解释(一)、商品房买卖司法解释）的具体条号一律标 `[待验证]`，描述规则呈现。** 黑白合同备案结算、无效合同折价补偿、优先受偿权范围期限、面积误差 3% 规则、逾期违约金调整必须完整描述规则。
    - 行政法规具体条号、规模标准/金额/期限阈值一律标 `[待验证]`；案例放占位结构 + 填写说明（含案号、裁判要点、法院层级、参考价值），明确「案号默认标 `[待验证]`」；至少含 黑白合同结算/无效合同折价补偿/优先受偿权行使/商品房逾期交房 四类占位。学说类放占位结构 + 填写说明（如优先受偿权性质 法定优先权/留置权 学说争议、垫资性质、黑白合同实质性内容认定）。
    - 每条引用行末尾带来源标签（多数为 `[模型知识 — 需验证]`），并按上述规则标 `[待验证]`（中度把握锚点除外，但仍建议复核）。
    - 文末附「中度把握锚点汇总」表（锚点 / 法律依据 / 规则摘要）与「引用库使用说明」「更新规则」，参照 ip-law-citations.md / civil-code-contract-citations.md 同名章节，**更新规则中强调建设工程司法解释条号易变，建议每次引用条号前核实现行版本**。

    务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>cf=construction-legal/skills/_shared/legal-basis-conventions.md; lf=construction-legal/skills/_shared/construction-law-citations.md; test -f "$cf" && test -f "$lf" && grep -q '法条\|法律' "$cf" && grep -q '司法解释' "$cf" && grep -q '行政法规\|部门规章' "$cf" && grep -q '案例' "$cf" && grep -q '学说' "$cf" && grep -q '待验证' "$cf" && grep -q '第788条' "$lf" && grep -q '第799条' "$lf" && grep -q '第807条' "$lf" && grep -q '第588条' "$lf" && grep -q '第585条' "$lf" && grep -q '黑白合同' "$lf" && grep -q '折价补偿' "$lf" && grep -q '优先受偿' "$lf" && grep -q '3%\|百分之三' "$lf" && grep -q '必须招标' "$lf"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节区分 法条/司法解释/行政法规/部门规章 与 案例/学说，并涵盖 民法典建设工程合同/建筑法/招标投标法/城市房地产管理法 语境
    - legal-basis-conventions.md 含「待验证」标记规则 + 「司法解释具体条号保守标注」章节，复用五个来源标签（不新造冲突标签），含法院四级与建设工程仲裁、住建部/地方住建/造价质量监督/招标投标监督机构定位
    - legal-basis-conventions.md 明确「成文法为分析基础、指导性案例/典型案例仅作参考不具判例法约束力、案例案号默认待验证」
    - construction-legal/skills/_shared/construction-law-citations.md 存在，按来源分类组织，分组覆盖 民法典建设工程合同(第788-808)/通则锚点/建筑法/招标投标法/城市房地产管理法/施工合同司法解释(一)/商品房买卖司法解释/行政法规
    - 中度把握锚点明确呈现并标「建议复核」：建设工程合同定义=第788条、竣工验收=第799条、优先受偿权=第807条、建设工程合同章=第788-808条；通则锚点复用商事脊柱（竞合=588条不回退、违约金调整=585条第2款、解除=563条、情势变更=533条、保证=681/686条）
    - 司法解释具体条号（黑白合同结算、无效折价补偿、优先受偿权范围期限、面积误差3%、逾期违约金）一律标 `[待验证]` 并以「描述规则 + 待验证」呈现；建筑法/招标投标法/城市房地产管理法分则条号、行政法规条号、案例案号一律待验证；无臆造条号
    - 含中度把握锚点汇总表与引用库使用说明（更新规则强调司法解释条号易变、引用前核实现行版本）
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个建设工程共享引用文件存在；来源分类规范区分 法条/司法解释/行政法规/部门规章 与 案例/学说，含待验证规则、司法解释条号保守标注与法院/机构定位；引用库覆盖 民法典建设工程合同(第788-808)/建筑法/招标投标法/城市房地产管理法/施工合同司法解释(一)/商品房买卖司法解释，中度把握锚点（第788/799/807条、第788-808区间 + 通则 588/585条第2款/563/533/681/686）标「建议复核」、规则类（黑白合同/折价补偿/优先受偿权/面积误差3%/逾期违约金）描述规则、司法解释与其余条号标待验证、无臆造、无回退已知错误。</done>
</task>

<task type="auto">
  <name>Task 2: 建立建设工程版实践配置契约 + 新建 construction-legal/CLAUDE.md 实践配置模板</name>
  <read_first>
    - ip-legal/skills/_shared/practice-profile-schema.md（最近一次新插件配置契约范式 — 真相来源决策、字段映射表、技能读取契约、临时模式默认值、立场选择、重跑/编辑/版本控制、法律事实合理性检查、schema 与 CLAUDE.md 章节对照）
    - commercial-legal/skills/_shared/practice-profile-schema.md（原始配置契约范式 — 立场选择逻辑、写入前确认流程）
    - ip-legal/CLAUDE.md（最近一次新建插件实践配置模板范式 — 画像/立场/风险校准/升级矩阵/文书风格/输出/共享护栏 完整章节结构与占位符写法、时效性触发与行业识别表）
    - commercial-legal/CLAUDE.md（实践配置模板范式 — 完整章节结构与审查者注释块/决策树/来源标签表写法）
    - construction-legal/skills/cold-start-interview/SKILL.md（现有访谈三部分 — 字段映射来源；注意末尾「生成 YAML 格式」表述须在 schema 中纠正为写入 CLAUDE.md）
    - CLAUDE.md（命名；文件格式；中国化原则——法院层级识别、行业监管特色）
  </read_first>
  <files>
    construction-legal/skills/_shared/practice-profile-schema.md,
    construction-legal/CLAUDE.md
  </files>
  <action>
    **第一部分 — 新建 construction-legal/CLAUDE.md 实践配置模板**（当前插件无此文件，首次创建）。以 ip-legal/CLAUDE.md 为最新范式，改编为建设工程语境的散文模板，含占位符 [PLACEHOLDER]。章节：
    - 顶部说明块：本文件由 /construction-legal:cold-start-interview 生成更新，律师/法务可直接编辑，所有 construction-legal 技能从此读取立场；**时效性提示：建设工程施工合同司法解释经(一)(二)整合与历次修订、商品房买卖合同司法解释亦经修订，本文件涉及具体条号的配置建议核实现行版本**。
    - `## 我们是谁`（主体画像与项目组合）：组织/律所/企业名称、实体类型、**所在建设工程角色**（发包人 建设单位/承包人 施工总承包或专业分包/监理单位/造价咨询/房地产开发商/购房人代理——影响审查立场默认值）、**项目类型组合**（房屋建筑/市政基础设施/装饰装修/安装/公路水利等专业工程/商品房买卖，影响适用规则与资质要求）、典型项目规模与造价区间、主要痛点（如工程款拖欠/工期索赔/黑白合同/转包分包/商品房逾期交付）、团队规模、负责人。
    - `## 谁在使用`：角色（建设工程律师/发包人或承包人内部法务/监理或造价人员/房地产法务/非律师但有律师可咨询/非律师且无律师可咨询）、律师联系人。含非律师角色提示（输出作为研究供律师审查）。
    - `## 可用集成`（造价鉴定与监管资源）：工程造价咨询/鉴定机构、工程质量检测机构、全国建筑市场监管公共服务平台（资质/业绩查询）、中国招标投标公共服务平台、企业信用信息系统（主体核查）、网签备案系统（商品房）、项目管理/OA、文档存储。
    - `## 审查与争议立场`：**整体代理立场**（发包人侧/承包人侧/中立审查/购房人侧——建设工程审查的核心变量，同一合同不同立场侧重不同）；`### 合同审查严格度`（保守 任何不利条款即标红/平衡/进取）；`### 争议处理倾向`（协商优先/造价鉴定/仲裁/诉讼、是否倾向行使优先受偿权）；`### 商品房审查立场`（开发商侧 vs 购房人侧，逾期违约金/面积误差/退房的容忍度）。
    - `## 风险校准`：🔴关键/🟠高/🟡中等/🟢低 等级定义（结合建设工程风险：合同无效与折价补偿/工程款回收与优先受偿权时效/工期与质量索赔/商品房逾期与退房；惩罚性或加重责任 `[待验证具体条款]`）。
    - `## 升级矩阵`：角色/可独立处理事项/需升级条件表（内部法务/主办律师/法务总监或合伙人）；自动升级触发条件（如合同可能无效 转包/未招标/黑白合同、工程款数额重大、拟行使优先受偿权 注意行使期限、收到解除通知或起诉、商品房群体性退房）；**诉讼/仲裁/优先受偿权行使触发**（仲裁条款识别、优先受偿权行使期限临近、诉讼时效、举证/造价鉴定申请期限）。
    - `## 文书风格`：合同审查意见书风格、工程款主张/优先受偿权行使函风格、争议分析意见风格、商品房合同审查报告风格、工作产物存放位置。
    - `## 输出`：工作产物标题（律师角色 vs 非律师角色，沿用特权标题/研究笔记两版）、审查者注释块（含司法解释条号待验证提示）、下一步决策树模板（出具审查意见/补充签证/主张工程款或优先受偿权/发解除通知/申请造价鉴定/仲裁或诉讼/观望）。
    - `## 共享护栏`：无静默补充原则；**时效性触发（司法解释修订频繁，距最后更新超 6 个月或涉及具体条号即标 `[时效性 flagged — 需验证现行司法解释版本]`）**；验证用户陈述的法律事实（条号/期限/金额/规模标准）；来源标签规范表；目的地/特权检查；`### 项目类型识别`（房建/市政/装饰/安装/商品房买卖等项目类型的特殊规则 + 资质要求识别）；`### 地方性规定提示`（建设工程受地方建设主管部门规章与地方性法规影响大，标 `[地方 flagged — 需核实地方性规定与地方建设主管部门要求]`）。
    - `## 事项工作区` 与 `## 审查过的种子文档`（沿用范式）。

    **第二部分 — 创建 construction-legal/skills/_shared/practice-profile-schema.md**，以 ip-legal 同名文件为最新骨架改编为建设工程语境。章节：
    - 「配置文件是什么 / 真相来源」：明确真相来源是 construction-legal/CLAUDE.md（散文模板，本阶段新建），由 /construction-legal:cold-start-interview 生成更新，律师/法务可直接编辑；记录架构决策（不引入冲突新 JSON/YAML 格式，沿用 CLAUDE.md 单一真相来源，理由同 ip-legal 版）。**明确纠正**：现有 cold-start-interview/SKILL.md 末尾「生成 建设工程 实践配置文件（YAML 格式）」的表述应理解为填充 construction-legal/CLAUDE.md 对应章节，而非另存独立 YAML 文件。
    - 「字段映射表」：将访谈/审查收集的字段对应到 construction-legal/CLAUDE.md 章节，并标注哪些技能读取该字段。至少覆盖映射组：主体画像与项目组合（## 我们是谁/## 谁在使用 → 所有技能工作产物标题、项目类型识别、资质要求）；**整体代理立场 发包人/承包人/中立/购房人侧**（## 审查与争议立场 → 整体代理立场 → 所有技能审查侧重与风险分级）；合同审查严格度（## 审查与争议立场 → 合同审查严格度 → contract-review 各子技能、commercial-housing-review）；争议处理倾向（## 审查与争议立场 → 争议处理倾向 → payment-dispute 各子技能、优先受偿权行使）；商品房审查立场（## 审查与争议立场 → 商品房审查立场 → commercial-housing-review 各子技能）；风险校准（## 风险校准 → 等级 → 所有技能）；升级矩阵与诉讼/仲裁/优先受偿权触发（## 升级矩阵 → 各技能升级路由 + 行使期限触发）；文书风格（## 文书风格/## 输出 → 各审查/争议子技能）；造价鉴定资源（## 可用集成 → payment-dispute 结算/鉴定路由）；项目类型识别与地方性规定（## 共享护栏 → 各技能项目标记与地方性规定提示）。
    - 「技能读取契约」：技能在实质性工作前须读取 construction-legal/CLAUDE.md、检查关键字段是否含 [PLACEHOLDER]、据此选运行模式；配置缺失/含占位符时标准提示（运行 cold-start-interview 或说「临时模式」）；临时模式默认值表（代理立场中立审查、角色律师、合同审查严格度保守、争议处理协商优先并提示优先受偿权行使期限、商品房按购房人与开发商双向提示、项目类型按合同标的逐案判断）。
    - 「代理立场（发包人侧 vs 承包人侧 vs 中立 vs 购房人侧）选择」：技能在工作前确认代理立场（从 ## 审查与争议立场 读取），据此加载对应立场审查侧重（如同一无效情形对发包人/承包人后果不同、逾期违约金对开发商/购房人方向相反）与风险标记强度，参照 commercial/ip practice-profile-schema 的立场选择逻辑改编为建设工程语境。**强调：代理立场是建设工程审查最核心变量，缺失时须显式提示并默认中立。**
    - 「重跑 / 编辑 / 版本控制」：完整重跑 vs 单独更新某部分；直接编辑；git 版本控制与回滚（git log/diff/checkout construction-legal/CLAUDE.md）。
    - 「法律事实合理性检查」：用户口述条号/期限/金额/规模标准（如优先受偿权行使期限、必须招标规模标准、面积误差比、逾期违约金率）时写入前合理性检查（条号核查、**司法解释条号标待验证**、时效性标记、矛盾澄清），含 `[前提 flagged — 需验证]` 流程；特别强调建设工程司法解释条号易变、口述条号须标待验证。
    - 「schema 与 CLAUDE.md 模板章节对照」表。
    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。两文件均为本任务产出，注意 construction-legal/CLAUDE.md 是**新建**。
  </action>
  <verify>
    <automated>cm=construction-legal/CLAUDE.md; sc=construction-legal/skills/_shared/practice-profile-schema.md; test -f "$cm" && test -f "$sc" && grep -q '发包人' "$cm" && grep -q '承包人' "$cm" && grep -q '审查与争议立场\|代理立场' "$cm" && grep -q '项目类型' "$cm" && grep -q '优先受偿' "$cm" && grep -q '升级矩阵' "$cm" && grep -q '地方' "$cm" && grep -q 'construction-legal/CLAUDE.md' "$sc" && grep -q '字段映射' "$sc" && grep -q '临时模式' "$sc" && grep -q '发包人\|承包人\|购房人' "$sc"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/CLAUDE.md 新建存在，含 ## 我们是谁（主体画像与项目组合，含建设工程角色发包人/承包人/监理/购房人侧、项目类型、痛点）、## 谁在使用、## 可用集成（造价鉴定资源）、## 审查与争议立场（含整体代理立场 + ### 合同审查严格度 + ### 争议处理倾向 + ### 商品房审查立场）、## 风险校准、## 升级矩阵（含诉讼/仲裁/优先受偿权行使触发）、## 文书风格、## 输出、## 共享护栏（含 ### 项目类型识别 + ### 地方性规定提示 + 时效性触发）
    - construction-legal/CLAUDE.md 含律师/非律师双版工作产物标题，时效性触发体现建设工程司法解释修订特点
    - construction-legal/skills/_shared/practice-profile-schema.md 存在，明确真相来源为 construction-legal/CLAUDE.md，记录「不引入冲突新格式」架构决策，纠正现有访谈「生成 YAML」表述
    - schema 含字段映射表，覆盖 主体画像项目组合/整体代理立场发包人承包人中立购房人侧/合同审查严格度/争议处理倾向/商品房审查立场/风险校准/升级矩阵/文书风格/造价鉴定资源/项目类型识别 各组并标注读取技能
    - schema 含技能读取契约 + 临时模式默认值 + 代理立场选择逻辑（强调立场为核心变量、缺失默认中立）+ 法律事实合理性检查（司法解释条号标待验证）+ schema 与 CLAUDE.md 章节对照表
    - 两文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新建 construction-legal/CLAUDE.md 实践配置模板（主体画像与项目组合/审查与争议立场含发包人承包人中立购房人侧与各审查严格度/风险校准/升级矩阵含优先受偿权行使触发/文书风格/输出/共享护栏含项目类型识别与地方性规定）；建设工程版配置契约定义配置文件是什么/在哪/技能怎么读，字段映射到 CLAUDE.md 章节，含临时模式与代理立场选择（立场核心变量）与法律事实合理性检查，并纠正现有访谈 YAML 表述。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 contract-review 为四个可独立触发的子技能</name>
  <read_first>
    - construction-legal/skills/contract-review/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；这是要拆分迁移并大幅深化的源）
    - construction-legal/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - construction-legal/skills/_shared/construction-law-citations.md（Task 1 产出 — 引用库，重点：建设工程合同定义第788条、竣工验收第799条、优先受偿权第807条、黑白合同/无效折价补偿/工期质量司法解释规则、通则违约解除锚点）
    - construction-legal/skills/_shared/practice-profile-schema.md（Task 2 产出 — 配置读取契约，代理立场字段）
    - construction-legal/CLAUDE.md（Task 2 产出 — 配置模板，子技能读取代理立场/合同审查严格度/项目类型/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板含 markdown 结构/边界条件表/错误处理表/## 法律依据 按三类分类的完整范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md,
    construction-legal/skills/contract-review/schedule-quality/SKILL.md,
    construction-legal/skills/contract-review/price-settlement/SKILL.md,
    construction-legal/skills/contract-review/breach-termination/SKILL.md
  </files>
  <action>
    将现有 contract-review/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：subject-qualification-validity / schedule-quality / price-settlement / breach-termination；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 construction-legal/CLAUDE.md 配置含**代理立场** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/司法解释/行政法规/部门规章 与 案例/学说 分类，引用 _shared/construction-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 contract-review 编排入口调用，也可由律师/法务单独触发（/construction-legal:<name>），**并须按代理立场（发包人侧 vs 承包人侧）调整审查侧重**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** 拆分时须深化（补充边界条件、错误处理、输出模板、法律依据分类），而非仅搬运纲要。

    分工（迁移现有三步纲要并深化，无丢失）：
    - subject-qualification-validity（主体资质与合同效力）：覆盖现纲要「需求收集 + 法律分析」中主体与效力维度并深化。发包人主体（建设单位是否合法、是否取得用地/规划/施工许可、是否依法招标）；承包人资质（建筑业企业资质等级、是否超越资质等级、专业分包资质，建筑法资质规则，条号待验证）；**合同效力审查**——重点识别无效情形：承包人无资质或超资质、必须招标项目未招标或中标无效、转包、违法分包（再分包/肢解分包/分包给无资质方）、借用资质挂靠、黑白合同（实际履行合同与备案中标合同实质性内容不一致）；**无效后果**——无效但竣工验收合格的参照合同约定折价补偿承包人（施工合同司法解释(一) 规则，**描述规则不写裸条号**）。深化：主体资质核查表（发包人/承包人逐项）、合同无效情形清单表（情形/法律依据/后果）、黑白合同实质性内容比对方法、无效合同折价补偿处理流程。**按代理立场区分**：发包人侧关注以无效抗辩或追责，承包人侧关注无效后折价补偿与工程款主张。引用建设工程合同定义=民法典第788条（建议复核）、黑白合同/无效折价补偿规则（描述规则）、建筑法资质（条号待验证）。边界条件：备案与未备案、阴阳合同的认定难点、挂靠的实际施工人权利。
    - schedule-quality（工期与质量）：覆盖现纲要「法律分析」中工期质量维度并深化。开工/竣工日期与工期约定；**工期顺延**（不可抗力、设计变更、发包人原因 未及时提供图纸/场地/资金、监理指令，签证与索赔程序）；停工窝工；**竣工验收**（竣工经验收合格方可交付使用、未经验收或验收不合格不得交付使用=民法典第799条 建议复核；验收程序、未组织验收的拟制交付/擅自使用视为认可质量的规则 描述规则）；质量标准（合格/约定更高标准）、保修期与保修责任、地基基础与主体结构终身责任；工程质量责任主体。深化：工期节点与顺延事由表、签证索赔时限检查表、竣工验收与交付条件表、质量标准与保修期对照表。**按代理立场区分**：发包人侧关注工期违约与质量缺陷追责，承包人侧关注工期顺延签证与不合理工期抗辩。引用竣工验收=民法典第799条（建议复核）、工期质量司法解释规则（描述规则）、质量管理条例（条号待验证）。边界条件：未约定工期/质量标准时的认定、隐蔽工程验收、质保金与保修责任的关系（交由 price-settlement）。
    - price-settlement（价款与结算）：覆盖现纲要「法律分析」中价款维度并深化。计价方式（固定总价 含包死价风险、固定单价、可调价、成本加酬金）；**工程量与变更签证**（变更签证有效性、未签证变更的实际履行举证、签证审批权限）；**结算依据认定**（合同约定结算方法、送审/审定、是否约定逾期不答复视为认可送审价的条款及其效力 描述规则）；进度款支付节点；**质保金/质量保证金**（预留比例与返还期限、与保修责任关系）；甲供材与暂估价；工程款数额确定与造价鉴定的衔接（提示 payment-dispute）。深化：计价方式对照与风险表、变更签证有效性判定表、结算依据与逾期答复条款审查表、进度款与质保金时间轴。**按代理立场区分**：发包人侧关注控价与高估冒算抗辩，承包人侧关注足额结算与签证留痕。引用黑白合同备案结算（描述规则）、结算与质保金司法解释规则（描述规则不写裸条号）。边界条件：黑白合同下结算依据（与 subject-qualification-validity 衔接）、未结算工程的价款主张、约定不明的结算。
    - breach-termination（违约与解除）：覆盖现纲要「法律分析 + 输出生成」中违约解除维度并深化。违约类型（工期违约、质量违约、发包人欠付工程款/不提供条件、承包人停工）；**违约金与损害赔偿**（违约金调整=民法典第585条第2款 建议复核、损害赔偿可预见性=第583/584条 建议复核，复用商事脊柱锚点）；**法定解除**（发包人/承包人法定解除事由、第563条 建议复核 + 施工合同司法解释(一)关于发包人/承包人解除权的规则 描述规则）；**解除后果**（已完工程的折价或验收、未完工程处理、损失赔偿、解除时工程款结算）；情势变更=第533条（建议复核）。深化：违约情形与责任表、违约金过高过低调整方法、法定解除事由与程序表、解除后已完工程处理流程。**按代理立场区分**：发包人侧关注承包人违约解除与索赔，承包人侧关注发包人欠款解除与工程款及损失。引用违约金=第585条第2款、解除=第563条、情势变更=第533条（复用商事脊柱，**竞合用第588条不回退**）、施工合同司法解释解除规则（描述规则）。边界条件：约定解除条件、通知解除的生效、解除与优先受偿权行使的衔接（提示 payment-dispute）。

    遵守文件格式约定。输出模板用 markdown 结构示意（沿用 social-insurance-wages / penalty-assessment 风格）。所有法律依据引用 _shared/construction-law-citations.md，中度把握锚点（第788/799/807条、通则 585条第2款/588/563/533）标「建议复核」、司法解释规则（黑白合同/折价补偿/工期质量/结算/解除）描述规则不写裸条号、其余条号标待验证。
  </action>
  <verify>
    <automated>for d in subject-qualification-validity schedule-quality price-settlement breach-termination; do f="construction-legal/skills/contract-review/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '转包\|黑白合同\|折价补偿' construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md && grep -q '竣工验收' construction-legal/skills/contract-review/schedule-quality/SKILL.md && grep -q '结算\|质保金' construction-legal/skills/contract-review/price-settlement/SKILL.md && grep -q '解除' construction-legal/skills/contract-review/breach-termination/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 construction-legal/skills/contract-review/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置（含代理立场读取）、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行（深度对标 social-insurance-wages）
    - subject-qualification-validity 含资质与无效情形（转包/违法分包/未招标/黑白合同）与无效折价补偿；schedule-quality 含工期顺延与竣工验收（第799条）；price-settlement 含计价方式/变更签证/结算依据/质保金；breach-termination 含违约金/法定解除/解除后果
    - 每个子技能体现按代理立场（发包人侧/承包人侧）调整审查侧重
    - 法律依据引用 _shared 库，中度把握锚点（第788/799/807、通则 585条第2款/588/563/533）标「建议复核」、司法解释规则描述规则不写裸条号、其余条号标待验证、无回退已知错误
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>contract-review 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；subject-qualification-validity 资质与黑白合同无效折价补偿、schedule-quality 工期顺延与竣工验收、price-settlement 计价结算质保金、breach-termination 违约金法定解除；各子技能按代理立场调整侧重；法律依据按来源分类引用 _shared 库，中度把握锚点标建议复核、司法解释规则描述规则、其余条号标待验证、无回退已知错误。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 contract-review/SKILL.md 为编排入口</name>
  <read_first>
    - construction-legal/skills/contract-review/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - construction-legal/CLAUDE.md（Task 2 产出 — 配置模板）
    - construction-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 07-03 统一更新）
  </read_first>
  <files>
    construction-legal/skills/contract-review/SKILL.md
  </files>
  <action>
    将 construction-legal/skills/contract-review/SKILL.md 改造为编排入口：保留 frontmatter（name: contract-review，更新 description 说明它现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/contract-review/<子技能名>/SKILL.md）；(2) 目的与整体施工合同审查流程概览（主体资质与合同效力 → 工期与质量 → 价款与结算 → 违约与解除）；(3) 前置：加载**代理立场**——读取 construction-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /construction-legal:cold-start-interview 或说「临时模式」），含临时模式段落（中立审查立场、律师角色、合同审查严格度保守、项目类型按合同标的逐案判断、标 `[临时模式]`）；(4) 子技能编排顺序表——主体资质与合同效力 → 工期与质量 → 价款与结算 → 违约与解除，每行说明该子技能做什么、对应子技能路径（skills/contract-review/<name>/SKILL.md）、可单独触发的斜杠命令（/construction-legal:<name>）+ 顺序说明；(5) 入口级护栏：主体画像/项目类型确认（从 ## 我们是谁 读取）、**代理立场加载（从 ## 审查与争议立场 — 发包人侧/承包人侧/中立，强调立场决定审查侧重）**、合同审查严格度加载、项目类型识别（房建/市政/装饰/商品房买卖）、目的地/特权检查、若涉及工程款回收与优先受偿权提示可调用 payment-dispute（07-02）、地方性规定提示、时效性提示（司法解释条号易变）。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=construction-legal/skills/contract-review/SKILL.md; grep -q '^name: contract-review' "$f" && grep -q 'subject-qualification-validity' "$f" && grep -q 'schedule-quality' "$f" && grep -q 'price-settlement' "$f" && grep -q 'breach-termination' "$f" && grep -q '临时模式' "$f" && grep -q '代理立场\|发包人\|承包人\|审查立场' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/skills/contract-review/SKILL.md 仍有 frontmatter name: contract-review，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/construction-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、主体画像/项目类型确认、代理立场加载（发包人/承包人/中立）、合同审查严格度、目的地/特权检查、payment-dispute 衔接提示、地方性规定提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 contract-review/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（代理立场确认、主体画像、项目类型、合同审查严格度、临时模式、特权检查、payment-dispute 衔接、地方性规定）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 contract-review 子技能 + 一个引用规范 + 一个引用库 + 一个配置契约 + 一个新建 CLAUDE.md + 一个编排入口全部存在且格式合规
- 建设工程引用脊柱（来源分类规范含司法解释/行政法规/部门规章 + 民法典建设工程合同/建筑法/招标投标法/城市房地产管理法/司法解释 引用库）与配置契约可被 07-02 / 07-03 复用
- 现有 contract-review 浅骨架三步纲要无丢失迁移并大幅深化
- 中度把握锚点（建设工程合同定义=第788条、竣工验收=第799条、优先受偿权=第807条、建设工程合同章=第788-808条、通则 585条第2款/588/563/533/681/686）标「建议复核」；规则类（黑白合同/无效折价补偿/工期质量/结算/解除/面积误差）描述规则不写裸条号；司法解释条号、行政法规条号、案例案号均标 `[待验证]`，无臆造、无回退已知错误
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('construction-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/法务可单独触发任一施工合同审查子能力（4 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容，并按代理立场调整侧重
- 建设工程法律引用按 法条/司法解释/行政法规/部门规章 与 案例/学说 分类并标待验证；中度把握锚点明确呈现并标建议复核；司法解释条号保守标待验证
- 新建 construction-legal/CLAUDE.md 实践配置模板（主体画像 发包人/承包人/监理/购房人侧、项目类型、审查立场、升级规则）存在
- 建设工程版实践配置契约定义清楚，技能据此读取 construction-legal/CLAUDE.md
- contract-review 编排入口指向四个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/07-construction-legal/07-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
