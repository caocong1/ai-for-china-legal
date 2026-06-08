---
phase: 07-construction-legal
plan: 03
type: execute
wave: 2
depends_on:
  - 07-01
  - 07-02
files_modified:
  - construction-legal/skills/commercial-housing-review/presale-license-subject/SKILL.md
  - construction-legal/skills/commercial-housing-review/deposit-subscription/SKILL.md
  - construction-legal/skills/commercial-housing-review/delivery-breach/SKILL.md
  - construction-legal/skills/commercial-housing-review/loan-termination-risk/SKILL.md
  - construction-legal/skills/commercial-housing-review/SKILL.md
  - construction-legal/skills/cold-start-interview/identity-project/SKILL.md
  - construction-legal/skills/cold-start-interview/review-stance/SKILL.md
  - construction-legal/skills/cold-start-interview/risk-escalation/SKILL.md
  - construction-legal/skills/cold-start-interview/style-local-rules/SKILL.md
  - construction-legal/skills/cold-start-interview/SKILL.md
  - construction-legal/.claude-plugin/plugin.json
autonomous: true
requirements:
  - COMMERCIAL-HOUSING-NEW
  - INTERVIEW-DECOMP
  - PLUGIN-REGISTER
user_setup: []

must_haves:
  truths:
    - "存在全新的 commercial-housing-review（商品房买卖合同审查）主技能，律师/购房人代理可单独触发任一子能力（预售许可与主体核查 / 定金与认购书 / 交付与违约 含逾期交房办证与面积误差 / 贷款解除与风险）或运行完整审查流程"
    - "commercial-housing-review 覆盖预售许可五证核查、定金罚则、逾期交房与逾期办证违约责任、面积误差比超 3% 处理规则、按揭贷款不成的合同解除，规则均来自商品房买卖合同司法解释，描述规则、具体条号一律待验证"
    - "律师/法务可以单独触发冷启动访谈的任一部分（身份与项目 / 审查立场 含发包人承包人中立购房人侧 / 风险与升级 / 文书风格与地方规定），访谈结果写入 construction-legal/CLAUDE.md 对应章节（非独立 YAML）"
    - "每个 commercial-housing-review 与访谈子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据/字段映射，深度子技能 150+ 行实质内容、访谈子技能含完整问卷与写入映射"
    - "plugin.json 注册全部技能（contract-review/payment-dispute/bidding-compliance/commercial-housing-review/cold-start-interview 五个编排入口 + 二十个子技能）并升级到 0.2.0，JSON 2 空格缩进合法"
  artifacts:
    - path: "construction-legal/skills/commercial-housing-review/presale-license-subject/SKILL.md"
      provides: "预售许可与主体核查子技能（商品房预售许可证 + 五证核查 + 开发商主体资质 + 现售条件）"
      contains: '预售许可\|五证'
      min_lines: 150
    - path: "construction-legal/skills/commercial-housing-review/deposit-subscription/SKILL.md"
      provides: "定金与认购书子技能（认购书/定金/订金性质 + 定金罚则 + 认购书向正式合同转化 + 诚意金返还）"
      contains: '定金\|认购'
      min_lines: 150
    - path: "construction-legal/skills/commercial-housing-review/delivery-breach/SKILL.md"
      provides: "交付与违约子技能（逾期交房违约 + 逾期办证违约 + 面积误差 3% 处理 + 质量与保修）"
      contains: '逾期交房\|面积误差'
      min_lines: 150
    - path: "construction-legal/skills/commercial-housing-review/loan-termination-risk/SKILL.md"
      provides: "贷款解除与风险子技能（按揭贷款不成解除 + 退房退款 + 一房二卖与查封风险 + 网签备案）"
      contains: '贷款\|按揭\|网签'
      min_lines: 150
    - path: "construction-legal/skills/commercial-housing-review/SKILL.md"
      provides: "商品房买卖合同审查编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "construction-legal/skills/cold-start-interview/identity-project/SKILL.md"
      provides: "访谈子技能一：主体画像与项目组合采集，填充 construction-legal/CLAUDE.md 身份章节"
      contains: '主体画像\|项目类型'
      min_lines: 80
    - path: "construction-legal/skills/cold-start-interview/review-stance/SKILL.md"
      provides: "访谈子技能二：审查与争议立场（发包人/承包人/中立/购房人侧 + 审查严格度），填充 construction-legal/CLAUDE.md 立场章节"
      contains: '发包人\|承包人\|审查立场'
      min_lines: 80
    - path: "construction-legal/skills/cold-start-interview/risk-escalation/SKILL.md"
      provides: "访谈子技能三：风险等级与升级矩阵（诉讼/仲裁/优先受偿权行使触发），填充 construction-legal/CLAUDE.md 风险与升级章节"
      contains: "升级"
      min_lines: 80
    - path: "construction-legal/skills/cold-start-interview/style-local-rules/SKILL.md"
      provides: "访谈子技能四：文书风格与造价鉴定资源及地方性规定，填充 construction-legal/CLAUDE.md 文书风格与共享护栏章节"
      contains: '文书风格\|地方'
      min_lines: 80
    - path: "construction-legal/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（顺序调用四个访谈子技能，初始化 construction-legal/CLAUDE.md）"
      min_lines: 40
    - path: "construction-legal/.claude-plugin/plugin.json"
      provides: "注册全部技能（5 编排入口 + 20 子技能）并升级到 0.2.0"
      contains: "0.2.0"
      min_lines: 20
  key_links:
    - from: "construction-legal/skills/commercial-housing-review/delivery-breach/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用面积误差 3% 与逾期违约规则（商品房买卖司法解释，描述规则不写裸条号）"
      pattern: "construction-law-citations|3%|百分之三|逾期交房"
    - from: "construction-legal/skills/commercial-housing-review/deposit-subscription/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用定金罚则（民法典第587条 + 商品房买卖司法解释认购定金规则）"
      pattern: "construction-law-citations|定金|第587条"
    - from: "construction-legal/skills/commercial-housing-review/SKILL.md"
      to: "四个 commercial-housing-review 子技能"
      via: "编排入口指向子技能路径"
      pattern: "presale-license-subject|deposit-subscription|delivery-breach|loan-termination-risk"
    - from: "construction-legal/skills/cold-start-interview/SKILL.md"
      to: "四个访谈子技能"
      via: "编排入口顺序调用"
      pattern: "identity-project|review-stance|risk-escalation|style-local-rules"
    - from: "construction-legal/skills/cold-start-interview/review-stance/SKILL.md"
      to: "construction-legal/CLAUDE.md"
      via: "访谈写入审查与争议立场章节"
      pattern: "审查与争议立场|代理立场|购房人侧"
    - from: "construction-legal/.claude-plugin/plugin.json"
      to: "全部技能"
      via: "注册五个编排入口与二十个子技能"
      pattern: "commercial-housing-review|presale-license-subject|review-stance|0.2.0"
---

<objective>
完成建设工程插件深化的最后一环：新增 commercial-housing-review（商品房买卖合同审查）全新主技能、拆分冷启动访谈、并在 plugin.json 注册全部技能升级到 0.2.0。

本计划交付三块内容：
1. **新增 commercial-housing-review（商品房买卖合同审查）主技能** — 按 CONTEXT「新增 1 个全新主技能」决策，创建四个可独立触发的子技能 + 编排入口：预售许可与主体核查 / 定金与认购书 / 交付与违约（含逾期交房、逾期办证、面积误差 3%）/ 贷款解除与风险。规则主要来自商品房买卖合同司法解释与城市房地产管理法，按 CONTEXT 纪律**描述规则、具体条号一律待验证**；定金罚则复用民法典第587条（建议复核）。
2. **冷启动访谈拆分** — 将 cold-start-interview（现 ~14 行三部分访谈）拆为四个可独立触发的访谈子技能：身份与项目（主体画像与项目组合）/ 审查立场（发包人/承包人/中立/购房人侧 + 审查严格度）/ 风险与升级（风险等级 + 升级矩阵 + 诉讼/仲裁/优先受偿权行使触发）/ 文书风格与地方规定（文书风格 + 造价鉴定资源 + 地方性规定）。访谈结果填充 07-01 新建的 construction-legal/CLAUDE.md 对应章节（**非独立 YAML**，纠正旧表述），原 SKILL.md 改为编排入口顺序调用四个子技能。
3. **plugin.json 注册与版本升级** — 注册全部技能（五个编排入口：cold-start-interview / contract-review / payment-dispute / bidding-compliance / commercial-housing-review；二十个子技能：访谈 4 + 施工合同审查 4 + 工程款争议 4 + 招投标合规 4 + 商品房审查 4）并升级版本到 0.2.0，更新 description 概述五大模块。

Purpose: 关闭「ROADMAP 第三能力面 commercial-housing-review 全新主技能缺失 + 访谈未拆分 + 全部技能未注册」的最后 gap，使 construction-legal 达到与 commercial-legal / ip-legal 同等的完整深层子技能集水平。
Output: 4 个 commercial-housing-review 子技能 + 1 个商品房编排入口 + 4 个访谈子技能 + 1 个访谈编排入口 + 更新后的 plugin.json（0.2.0，25 个技能条目）。

依赖说明：本计划属 wave 2，依赖 07-01（_shared 引用脊柱、construction-legal/CLAUDE.md、contract-review 子技能路径）与 07-02（payment-dispute / bidding-compliance 子技能路径）。plugin.json 注册须包含 07-01 与 07-02 产出的全部技能路径，故须在两者完成后执行。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民法典合同编/城市房地产管理法 为分析基础，商品房买卖合同司法解释、城市房地产开发经营管理条例 为补充）；指导性案例作参考非判例法（案号标待验证）；法院层级识别；行业监管特色（房地产开发与预售许可主管部门、网签备案系统、不动产登记机构、住建主管部门）；执业环境适配（建设工程/房地产律师 / 开发商法务 / 购房人代理 / 内部法务）。命名约定：技能名 kebab-case；斜杠命令 /construction-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/行政法规/部门规章 与 案例/学说 分类，带来源标签；商品房买卖合同司法解释具体条号一律标待验证、描述规则呈现；中度把握锚点（定金罚则=民法典第587条、定金合同/数额=第586条、竞合=第588条 不回退、违约金调整=第585条第2款、法定解除=第563条 复用商事脊柱）标建议复核；面积误差 3% 规则、逾期交房办证违约金调整、按揭不成解除均描述规则不写裸条号；司法解释条号与案例案号一律标待验证，不臆造、不回退已知错误。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/07-construction-legal/07-CONTEXT.md
@CLAUDE.md
@construction-legal/CLAUDE.md
@construction-legal/skills/cold-start-interview/SKILL.md
@construction-legal/.claude-plugin/plugin.json
@construction-legal/skills/_shared/legal-basis-conventions.md
@construction-legal/skills/_shared/construction-law-citations.md
@construction-legal/skills/_shared/practice-profile-schema.md
@construction-legal/skills/contract-review/SKILL.md
@construction-legal/skills/payment-dispute/SKILL.md
@construction-legal/skills/bidding-compliance/SKILL.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@ip-legal/.claude-plugin/plugin.json
@data-compliance/.claude-plugin/plugin.json
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 新增 commercial-housing-review（商品房买卖合同审查）四个可独立触发的子技能</name>
  <read_first>
    - construction-legal/skills/_shared/legal-basis-conventions.md（07-01 产出 — 引用规范）
    - construction-legal/skills/_shared/construction-law-citations.md（07-01 产出 — 引用库，重点：城市房地产管理法预售/现售、商品房买卖司法解释 定金/逾期交房办证/面积误差3%/按揭解除、民法典通则定金罚则第587条/解除第563条/违约金第585条第2款）
    - construction-legal/skills/_shared/practice-profile-schema.md（07-01 产出 — 配置读取契约，商品房审查立场字段）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板，子技能读取商品房审查立场 开发商侧/购房人侧、审查严格度、风险校准）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（定金罚则第587条/定金合同第586条/竞合第588条/解除第563条 已核实锚点参照，复用结论）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 违约金/风险分级范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    construction-legal/skills/commercial-housing-review/presale-license-subject/SKILL.md,
    construction-legal/skills/commercial-housing-review/deposit-subscription/SKILL.md,
    construction-legal/skills/commercial-housing-review/delivery-breach/SKILL.md,
    construction-legal/skills/commercial-housing-review/loan-termination-risk/SKILL.md
  </files>
  <action>
    创建全新主技能 commercial-housing-review 的四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：presale-license-subject / deposit-subscription / delivery-breach / loan-termination-risk；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 construction-legal/CLAUDE.md 配置含**商品房审查立场 开发商侧/购房人侧** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/司法解释/行政法规 与 案例/学说 分类，引用 _shared/construction-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 commercial-housing-review 编排入口调用，也可由律师/购房人代理单独触发（/construction-legal:<name>），**并须按审查立场（开发商侧 vs 购房人侧）调整侧重**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment。**

    商品房买卖审查核心视角：商品房买卖合同审查面向**预售/现售合同的合规与风险**，规则主要来自商品房买卖合同司法解释（具体条号一律待验证，描述规则）+ 城市房地产管理法 + 民法典合同编通则。与 contract-review（施工合同 发包人-承包人）的区别：本技能是**开发商-购房人的房屋买卖合同**审查，购房人保护色彩强（面积误差、逾期、退房）。

    分工：
    - presale-license-subject（预售许可与主体核查）：**商品房预售许可证**（取得预售许可证方可预售、未取得预售许可签订的预售合同效力 一般无效但起诉前取得可认定有效的规则 描述规则不写裸条号）；**五证核查**（国有土地使用证/建设用地规划许可证/建设工程规划许可证/建筑工程施工许可证/商品房预售许可证，逐项核查）；**开发商主体资质**（房地产开发企业资质、项目公司、是否被列入异常/失信）；**现售条件**（现房销售的法定条件）。深化：五证核查表（证件/核查要点/风险）、预售许可效力判定表、开发商主体风险核查清单、预售 vs 现售条件对照表。**按审查立场区分**：购房人侧重点核验五证防烂尾，开发商侧确保合规。引用预售许可与现售（城市房地产管理法 + 司法解释，描述规则，条号待验证）。边界条件：内部认购/未取证销售、车位/储藏室、小产权房风险。
    - deposit-subscription（定金与认购书）：**认购书性质**（认购书/预订书是否构成本约或预约、定金条款）；**定金罚则**（交付定金一方违约无权要求返还、收受定金一方违约双倍返还=民法典第587条 建议复核；定金数额不超过主合同标的额 20% 的规则=第586条 建议复核；竞合不并用=第588条 不回退）；**订金/诚意金/认筹金**（非定金、原则可返还）；**认购书向正式合同转化**（因不可归责双方原因未能订立本约的定金返还、因一方原因致本约不能订立的定金罚则适用 描述规则）。深化：定金 vs 订金 vs 诚意金性质对照表、定金罚则适用决策表、认购书转正式合同情形表、定金返还/罚没判定流程。**按审查立场区分**：购房人侧争取定金返还，开发商侧主张定金罚没或转化。引用定金罚则=第587条、定金合同=第586条、竞合=第588条（复用商事脊柱建议复核，**不回退**）+ 商品房认购定金司法解释规则（描述规则）。边界条件：认筹金/排号费的返还、格式认购书加重购房人责任条款效力、定金与违约金竞合。
    - delivery-breach（交付与违约）：**逾期交房违约责任**（交付条件 竣工验收合格、逾期交房违约金计算与调整、催告与解除）；**逾期办证违约责任**（办理产权登记 不动产权证 的协助义务、逾期办证违约金、解除条件）；**面积误差处理**（合同约定面积与产权登记面积误差，**面积误差比绝对值在 3% 以内据实结算、超出 3% 的处理：买受人可请求解除合同并退款付息，或不解除时由出卖人承担面积误差比超 3% 部分房价款及相应处理 描述规则不写裸条号**——商品房买卖司法解释，具体条号待验证）；**质量与保修**（主体结构质量不合格可退房、保修责任）。深化：逾期交房/办证违约金审查表、面积误差 3% 处理决策表（误差比 ≤3% / >3% 分支与退补规则）、退房条件清单、质量与保修对照表。**按审查立场区分**：购房人侧主张违约金/退房/面积退补，开发商侧限缩违约责任。引用面积误差 3% 与逾期违约金调整（商品房买卖司法解释，描述规则，条号待验证）+ 违约金调整=第585条第2款（建议复核）。边界条件：违约金过高过低调整、套内面积 vs 建筑面积、精装修与交付标准争议。
    - loan-termination-risk（贷款解除与风险）：**按揭贷款不成的合同解除**（因不可归责于当事人的事由 如银行政策/限购导致贷款未获批，当事人可请求解除合同并退还已付款项及利息——商品房买卖司法解释 描述规则不写裸条号）；**退房退款**（解除后已付房款/定金/利息的返还）；**一房二卖与查封风险**（同一房屋多重买卖的履行顺位与赔偿、房屋被查封/抵押的风险、出卖人将房屋抵押或出售给第三人的责任）；**网签备案与登记**（网签备案的作用与不等于物权登记、预告登记保护、不动产登记）。深化：按揭不成解除情形表（可归责 vs 不可归责）、退房退款项目表、一房二卖履行顺位与赔偿表、网签/预告登记/不动产登记保护对照表。**按审查立场区分**：购房人侧争取贷款不成无责解除与登记保护，开发商侧明确可归责情形。引用按揭解除与一房二卖（商品房买卖司法解释，描述规则，条号待验证）。边界条件：限购限贷政策变化、首付比例调整、预告登记与抵押权冲突、烂尾楼停贷风险 `[待验证]`。
  </action>
  <verify>
    <automated>for d in presale-license-subject deposit-subscription delivery-breach loan-termination-risk; do f="construction-legal/skills/commercial-housing-review/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '预售许可\|五证' construction-legal/skills/commercial-housing-review/presale-license-subject/SKILL.md && grep -q '定金\|认购' construction-legal/skills/commercial-housing-review/deposit-subscription/SKILL.md && grep -q '面积误差\|逾期交房' construction-legal/skills/commercial-housing-review/delivery-breach/SKILL.md && grep -q '贷款\|按揭\|网签' construction-legal/skills/commercial-housing-review/loan-termination-risk/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个 commercial-housing-review 子技能 SKILL.md 全部存在，路径为 construction-legal/skills/commercial-housing-review/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置含商品房审查立场/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - presale-license-subject 含预售许可效力与五证核查；deposit-subscription 含定金罚则（第587条建议复核）与认购书转化；delivery-breach 含逾期交房办证违约与面积误差 3% 处理（描述规则）；loan-termination-risk 含按揭不成解除与一房二卖网签
    - 每个子技能体现按审查立场（开发商侧/购房人侧）调整侧重
    - 法律依据按来源分类引用 _shared 库，定金罚则/竞合/解除/违约金通则锚点标建议复核（竞合 588 不回退）、商品房买卖司法解释规则（面积误差3%/逾期违约/按揭解除）描述规则不写裸条号、具体条号标待验证
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 commercial-housing-review 四个可独立触发的子技能并大幅深化（每个 150+ 行）；presale-license-subject 预售许可五证、deposit-subscription 定金认购、delivery-breach 逾期违约与面积误差 3%、loan-termination-risk 按揭解除与一房二卖网签；各子技能按审查立场（开发商/购房人侧）调整；法律依据分类引用 _shared 库，通则锚点标建议复核不回退、司法解释规则描述规则、具体条号待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 创建 commercial-housing-review 编排入口</name>
  <read_first>
    - 本计划 Task 1 产出的四个 commercial-housing-review 子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - construction-legal/skills/contract-review/SKILL.md（07-01 产出的编排入口 — 风格参照）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板，读取商品房审查立场）
  </read_first>
  <files>
    construction-legal/skills/commercial-housing-review/SKILL.md
  </files>
  <action>
    创建 construction-legal/skills/commercial-housing-review/SKILL.md 编排入口：frontmatter（name: commercial-housing-review，description 说明它是商品房买卖合同审查编排入口，编排四个子技能，argument-hint「[商品房买卖合同/预售合同/认购书]」）。正文：(1) 顶部说明：本技能为商品房买卖合同审查主技能，面向预售/现售合同的合规与购房人风险（区别于施工合同的发包人-承包人审查）；(2) 目的与整体审查流程概览（预售许可与主体核查 → 定金与认购书 → 交付与违约 含逾期与面积误差 → 贷款解除与风险）；(3) 前置：加载**商品房审查立场**——读取 construction-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /construction-legal:cold-start-interview 或说「临时模式」），含临时模式段落（默认双向提示开发商与购房人风险、律师角色、审查严格度保守、标 `[临时模式]`）；(4) 子技能编排顺序表——预售许可与主体核查 / 定金与认购书 / 交付与违约 / 贷款解除与风险，每行说明该子技能做什么、对应子技能路径（skills/commercial-housing-review/<name>/SKILL.md）、可单独触发的斜杠命令（/construction-legal:<name>）+ 说明（按审查环节择需）；(5) 入口级护栏：合同性质确认（预售/现售/认购书）、商品房审查立场加载（开发商侧 vs 购房人侧）、**购房人保护提示**（面积误差/逾期/退房规则向购房人倾斜）、五证与网签备案核查提醒、目的地/特权检查、地方性规定提示（限购限贷与地方商品房政策）、时效性提示（司法解释与房地产政策易变）。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=construction-legal/skills/commercial-housing-review/SKILL.md; grep -q '^name: commercial-housing-review' "$f" && grep -q 'presale-license-subject' "$f" && grep -q 'deposit-subscription' "$f" && grep -q 'delivery-breach' "$f" && grep -q 'loan-termination-risk' "$f" && grep -q '临时模式' "$f" && grep -q '购房人\|开发商\|预售' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/skills/commercial-housing-review/SKILL.md 存在，frontmatter name: commercial-housing-review + description 编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/construction-legal:<name>）
    - 含入口级护栏：合同性质确认、商品房审查立场加载（开发商/购房人侧）、购房人保护提示、五证与网签核查、目的地/特权检查、地方性规定提示（限购限贷）
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>commercial-housing-review 编排入口存在，指向四个子技能，入口级护栏（合同性质、商品房审查立场、购房人保护、五证网签、特权检查、地方性规定）齐全。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 cold-start-interview 为四个访谈子技能 + 编排入口</name>
  <read_first>
    - construction-legal/skills/cold-start-interview/SKILL.md（现有浅骨架 — 三部分访谈；末尾「生成 YAML 格式」须纠正为写入 construction-legal/CLAUDE.md；改造对象）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板，访谈各子技能填充对应章节）
    - construction-legal/skills/_shared/practice-profile-schema.md（07-01 产出 — 字段映射表，访谈按此填充）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - data-compliance/.claude-plugin/plugin.json（访谈子技能 description 写法参照 — identity-team/compliance-stance/risk-escalation/style-cross-border-policy 范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    construction-legal/skills/cold-start-interview/identity-project/SKILL.md,
    construction-legal/skills/cold-start-interview/review-stance/SKILL.md,
    construction-legal/skills/cold-start-interview/risk-escalation/SKILL.md,
    construction-legal/skills/cold-start-interview/style-local-rules/SKILL.md,
    construction-legal/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将现有 cold-start-interview/SKILL.md 的三部分访谈拆分迁移并深化到四个可独立触发的访谈子技能，并改造原 SKILL.md 为编排入口。**关键纠正**：现有 SKILL.md 末尾「生成 建设工程 实践配置文件（YAML 格式）」表述须改为「填充 construction-legal/CLAUDE.md 对应章节」（与 practice-profile-schema 架构决策一致，不另存独立 YAML）。

    四个访谈子技能（每个独立 SKILL.md，含 frontmatter name kebab-case + description + argument-hint；含章节：目的、前置（读取 practice-profile-schema 字段映射 + 说明填充 construction-legal/CLAUDE.md 哪个章节 + 可单独触发）、访谈问题清单（结构化问卷，每个字段对应 CLAUDE.md 占位符）、写入映射（字段→CLAUDE.md 章节）、法律事实合理性检查（条号/期限/规模标准口述时标待验证）、边界条件（用户跳过/不确定时的默认处理）。**每个访谈子技能须 80+ 行实质内容（含完整问卷与写入映射）。**）：
    - identity-project（身份与项目）：采集主体画像与项目组合（组织/律所/企业名称、实体类型、**所在建设工程角色** 发包人/承包人/监理/造价/开发商/购房人代理、**项目类型组合** 房建/市政/装饰/安装/商品房买卖、典型项目规模与造价区间、主要痛点、团队规模、负责人）+ 谁在使用（角色、律师联系人）+ 可用集成（造价鉴定与监管资源）。写入 construction-legal/CLAUDE.md 的 ## 我们是谁 / ## 谁在使用 / ## 可用集成。
    - review-stance（审查立场）：采集**整体代理立场**（发包人侧/承包人侧/中立审查/购房人侧）+ 合同审查严格度 + 争议处理倾向 + 商品房审查立场。写入 construction-legal/CLAUDE.md 的 ## 审查与争议立场（含 ### 合同审查严格度 / ### 争议处理倾向 / ### 商品房审查立场）。**强调代理立场是建设工程审查核心变量。**
    - risk-escalation（风险与升级）：采集风险等级定义 + 升级矩阵（角色权限/自动升级触发）+ 诉讼/仲裁/优先受偿权行使触发。写入 construction-legal/CLAUDE.md 的 ## 风险校准 / ## 升级矩阵。
    - style-local-rules（文书风格与地方规定）：采集文书风格（合同审查意见书/工程款主张函/争议分析/商品房审查报告风格 + 工作产物存放位置）+ 造价鉴定资源再确认 + **地方性规定与地方建设主管部门**偏好（建设工程受地方规章影响大）+ 项目类型识别偏好。写入 construction-legal/CLAUDE.md 的 ## 文书风格 / ## 输出 / ## 共享护栏（项目类型识别 / 地方性规定提示）。

    编排入口 construction-legal/skills/cold-start-interview/SKILL.md：保留 frontmatter（name: cold-start-interview，更新 description 说明它顺序调用四个访谈子技能初始化 construction-legal/CLAUDE.md）。正文：(1) 顶部迁移说明 + **纠正旧 YAML 表述为填充 construction-legal/CLAUDE.md**；(2) 目的（初始化/更新建设工程实践配置档案）；(3) 子技能顺序表——身份与项目 → 审查立场 → 风险与升级 → 文书风格与地方规定，每行说明、子技能路径、单独触发斜杠命令（/construction-legal:<name>，支持单独更新某一部分）；(4) 说明访谈结果写入 construction-legal/CLAUDE.md（散文模板，非 YAML），支持完整重跑/单独更新/直接编辑/git 版本控制。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in identity-project review-stance risk-escalation style-local-rules; do f="construction-legal/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q 'construction-legal/CLAUDE.md' "$f" || { echo "NO CLAUDE.md TARGET $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 60 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=construction-legal/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$e" && grep -q 'identity-project' "$e" && grep -q 'review-stance' "$e" && grep -q 'risk-escalation' "$e" && grep -q 'style-local-rules' "$e" && grep -q 'construction-legal/CLAUDE.md' "$e" && ! grep -q 'YAML 格式' "$e"</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md 全部存在，路径为 construction-legal/skills/cold-start-interview/<kebab-name>/SKILL.md，各含 frontmatter + 结构化问卷 + 写入 construction-legal/CLAUDE.md 章节映射，各 ≥60 非空行
    - identity-project 采集主体画像与项目组合；review-stance 采集代理立场（发包人/承包人/中立/购房人侧）与审查严格度及商品房立场；risk-escalation 采集风险等级与升级矩阵含优先受偿权行使触发；style-local-rules 采集文书风格与造价资源与地方性规定
    - 每个访谈子技能明确写入 construction-legal/CLAUDE.md 对应章节（非独立 YAML）
    - cold-start-interview/SKILL.md 改造为编排入口，顺序调用四个子技能，**旧「YAML 格式」表述已纠正为填充 construction-legal/CLAUDE.md**
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能（身份与项目/审查立场/风险与升级/文书风格与地方规定），均填充 construction-legal/CLAUDE.md 对应章节；原 SKILL.md 改为编排入口顺序调用，旧 YAML 表述已纠正为写入 construction-legal/CLAUDE.md。</done>
</task>

<task type="auto">
  <name>Task 4: plugin.json 注册全部技能并升级到 0.2.0</name>
  <read_first>
    - construction-legal/.claude-plugin/plugin.json（现有 — 4 个扁平技能注册，version 0.1.0；改造对象）
    - ip-legal/.claude-plugin/plugin.json（注册范式 — 编排入口 + 子技能扁平注册、每条 name/path、description 概述模块写法、version 0.2.0）
    - data-compliance/.claude-plugin/plugin.json（注册范式参照）
    - 07-01/07-02/本计划产出的全部 SKILL.md 路径（确认注册路径与 name 一致）
    - CLAUDE.md（文件格式：JSON 2 空格缩进、命名约定 kebab-case、文件以换行符结尾）
  </read_first>
  <files>
    construction-legal/.claude-plugin/plugin.json
  </files>
  <action>
    更新 construction-legal/.claude-plugin/plugin.json：以 ip-legal/.claude-plugin/plugin.json 为注册范式（编排入口与子技能均扁平列入 skills 数组，每条含 name/path，可含 description）。
    - version 升级到 "0.2.0"。
    - description 更新为概述五大模块：冷启动访谈（身份项目/审查立场/风险升级/文书地方规定）、施工合同审查（主体资质与合同效力/工期与质量/价款与结算/违约与解除）、工程款争议处理（优先受偿权/结算依据黑白合同/质量抗辩反索赔/利息垫资）、建设工程招投标合规（必须招标范围/招标投标程序/串通投标/中标无效投诉）、商品房买卖合同审查（预售许可主体/定金认购/交付违约面积误差/贷款解除风险），五大模块二十个子技能加五个编排入口。
    - skills 数组注册全部 25 条（顺序：五个编排入口在前或按模块分组均可，须全部包含），每条 name 与 SKILL.md frontmatter name 一致、path 与文件实际路径一致：
      - 编排入口 5：cold-start-interview / contract-review / payment-dispute / bidding-compliance / commercial-housing-review（path = skills/<主技能>/SKILL.md）
      - 访谈子技能 4：identity-project / review-stance / risk-escalation / style-local-rules（path = skills/cold-start-interview/<name>/SKILL.md）
      - 施工合同审查子技能 4：subject-qualification-validity / schedule-quality / price-settlement / breach-termination（path = skills/contract-review/<name>/SKILL.md）
      - 工程款争议子技能 4：priority-payment-right / settlement-basis-dual-contract / quality-defense-counterclaim / interest-advance-funding（path = skills/payment-dispute/<name>/SKILL.md）
      - 招投标合规子技能 4：mandatory-bidding-scope / bidding-procedure / collusion-fraud / bid-invalidity-complaint（path = skills/bidding-compliance/<name>/SKILL.md）
      - 商品房审查子技能 4：presale-license-subject / deposit-subscription / delivery-breach / loan-termination-risk（path = skills/commercial-housing-review/<name>/SKILL.md）
    - 保留 author 字段。
    - **严格 JSON 2 空格缩进、文件以换行符结尾、无尾部空格。**
    完成后运行 JSON 合法性检查确认无语法错误。
  </action>
  <verify>
    <automated>f=construction-legal/.claude-plugin/plugin.json; python3 -c "import json; d=json.load(open('$f')); assert d['version']=='0.2.0', 'version not 0.2.0'; names={s['name'] for s in d['skills']}; req={'cold-start-interview','contract-review','payment-dispute','bidding-compliance','commercial-housing-review','identity-project','review-stance','risk-escalation','style-local-rules','subject-qualification-validity','schedule-quality','price-settlement','breach-termination','priority-payment-right','settlement-basis-dual-contract','quality-defense-counterclaim','interest-advance-funding','mandatory-bidding-scope','bidding-procedure','collusion-fraud','bid-invalidity-complaint','presale-license-subject','deposit-subscription','delivery-breach','loan-termination-risk'}; missing=req-names; assert not missing, f'missing skills: {missing}'; n=len(d['skills']); assert n>=25, f'expected >=25 skills, got {n}'; print('OK', n, 'skills, version', d['version'])"; for p in $(python3 -c "import json; [print(s['path']) for s in json.load(open('$f'))['skills']]"); do test -f "construction-legal/$p" || { echo "MISSING PATH construction-legal/$p"; exit 1; }; done; echo "ALL PATHS EXIST"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/.claude-plugin/plugin.json version 为 0.2.0
    - skills 数组含全部 25 条（5 编排入口 + 20 子技能），每条 name 与对应 SKILL.md frontmatter name 一致、path 与实际文件路径一致且文件存在
    - description 概述五大模块（访谈/施工合同审查/工程款争议/招投标合规/商品房审查）
    - JSON 语法合法（python3 json.load 通过），2 空格缩进、文件以换行符结尾、无尾部空格
  </acceptance_criteria>
  <done>plugin.json 注册全部 25 个技能（5 编排入口 + 20 子技能）并升级到 0.2.0，description 概述五大模块，全部 path 指向存在的 SKILL.md，JSON 合法 2 空格缩进。</done>
</task>

</tasks>

<verification>
- 四个 commercial-housing-review 子技能 + 一个商品房编排入口 + 四个访谈子技能 + 一个访谈编排入口 + 更新后的 plugin.json 全部存在且格式合规
- commercial-housing-review 覆盖预售许可五证/定金认购/逾期违约与面积误差 3%/按揭解除与一房二卖网签，规则来自商品房买卖司法解释描述规则、条号待验证
- cold-start-interview 拆为四个访谈子技能，均填充 construction-legal/CLAUDE.md（非 YAML），旧 YAML 表述已纠正
- plugin.json 注册全部 25 技能、升级 0.2.0、全部 path 存在、JSON 合法
- 法律依据按来源分类、通则锚点（定金587/竞合588不回退/解除563/违约金585条第2款）标建议复核、规则类描述规则、司法解释条号与案例案号标待验证，无臆造、无回退已知错误
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('construction-legal/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 建设工程插件达到完整深层子技能集：5 个主技能（4 深化 + 1 新增 commercial-housing-review）各拆为 4 个可独立触发子技能，共 20 子技能 + 5 编排入口
- commercial-housing-review 商品房买卖审查能力完整（预售许可/定金认购/交付违约面积误差/贷款解除风险），可单点或整流程调用
- 冷启动访谈拆分并写入 construction-legal/CLAUDE.md（非 YAML），支持单独更新各部分
- plugin.json 注册全部技能升级 0.2.0，JSON 合法
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/07-construction-legal/07-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
