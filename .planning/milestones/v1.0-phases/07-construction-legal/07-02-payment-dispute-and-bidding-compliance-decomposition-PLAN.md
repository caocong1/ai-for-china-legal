---
phase: 07-construction-legal
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md
  - construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md
  - construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md
  - construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md
  - construction-legal/skills/payment-dispute/SKILL.md
  - construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md
  - construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md
  - construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md
  - construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md
  - construction-legal/skills/bidding-compliance/SKILL.md
autonomous: true
requirements:
  - PAYMENT-DISPUTE-DECOMP
  - BIDDING-COMPLIANCE-DECOMP
user_setup: []

must_haves:
  truths:
    - "律师/法务可以单独触发工程款争议处理的任一子能力（工程价款优先受偿权 / 结算依据与黑白合同 / 质量抗辩与反索赔 / 工程款利息与垫资）而无需运行整个流程"
    - "律师/法务可以单独触发建设工程招投标合规的任一子能力（必须招标范围与方式 / 招标投标程序 / 串通投标与虚假招标 / 中标无效与异议投诉）而无需运行整个流程"
    - "每个 payment-dispute 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；承包人工程价款优先受偿权引用民法典第807条（中度把握）标建议复核，优先受偿权范围/行使期限/与消费者购房人顺位来自司法解释描述规则不写裸条号；黑白合同以备案中标合同结算描述规则"
    - "每个 bidding-compliance 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；必须招标范围与规模标准、串通投标、中标无效来自招标投标法及实施条例，具体条号与规模阈值标待验证、描述规则呈现"
    - "现有 payment-dispute 与 bidding-compliance 浅骨架三步纲要无丢失迁移到子技能，两个原 SKILL.md 改为编排入口"
  artifacts:
    - path: "construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md"
      provides: "工程价款优先受偿权子技能（成立要件 + 范围与行使期限 + 与抵押权/消费者购房人权利顺位）"
      contains: "优先受偿"
      min_lines: 150
    - path: "construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md"
      provides: "结算依据与黑白合同子技能（结算依据认定 + 备案中标合同结算 黑白合同 + 未签证变更与实际履行）"
      contains: '黑白合同\|备案'
      min_lines: 150
    - path: "construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md"
      provides: "质量抗辩与反索赔子技能（发包人质量抗辩 + 质量不合格工程款处理 + 反索赔工期延误/质量缺陷）"
      contains: '质量抗辩\|反索赔'
      min_lines: 150
    - path: "construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md"
      provides: "工程款利息与垫资子技能（欠付利息计付标准与起算 + 垫资及垫资利息约定效力）"
      contains: '利息\|垫资'
      min_lines: 150
    - path: "construction-legal/skills/payment-dispute/SKILL.md"
      provides: "工程款争议处理编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md"
      provides: "必须招标范围与方式子技能（必须招标项目范围与规模标准 + 公开/邀请招标 + 可不招标情形）"
      contains: "必须招标"
      min_lines: 150
    - path: "construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md"
      provides: "招标投标程序子技能（招标公告与资格审查 + 招标文件 + 投标开标评标定标 + 中标通知书与合同签订）"
      contains: '评标\|开标'
      min_lines: 150
    - path: "construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md"
      provides: "串通投标与虚假招标子技能（投标人间串通 + 招标人与投标人串通 + 弄虚作假骗取中标 + 围标陪标识别）"
      contains: "串通投标"
      min_lines: 150
    - path: "construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md"
      provides: "中标无效与异议投诉子技能（中标无效情形 + 异议与投诉处理 + 行政监督与法律责任）"
      contains: '中标无效\|投诉'
      min_lines: 150
    - path: "construction-legal/skills/bidding-compliance/SKILL.md"
      provides: "建设工程招投标合规编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用承包人工程价款优先受偿权（民法典第807条 + 施工合同司法解释范围/期限规则）"
      pattern: "construction-law-citations|第807条|优先受偿"
    - from: "construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用黑白合同以备案中标合同结算规则（施工合同司法解释，描述规则不写裸条号）"
      pattern: "construction-law-citations|黑白合同|备案中标"
    - from: "construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md"
      to: "construction-legal/skills/_shared/construction-law-citations.md"
      via: "引用必须招标范围与规模标准（招标投标法及实施条例，描述规则，规模阈值待验证）"
      pattern: "construction-law-citations|必须招标|招标投标法"
    - from: "construction-legal/skills/payment-dispute/SKILL.md"
      to: "四个 payment-dispute 子技能"
      via: "编排入口指向子技能路径"
      pattern: "priority-payment-right|settlement-basis-dual-contract|quality-defense-counterclaim|interest-advance-funding"
    - from: "construction-legal/skills/bidding-compliance/SKILL.md"
      to: "四个 bidding-compliance 子技能"
      via: "编排入口指向子技能路径"
      pattern: "mandatory-bidding-scope|bidding-procedure|collusion-fraud|bid-invalidity-complaint"
---

<objective>
将建设工程插件的 payment-dispute（工程款争议处理）与 bidding-compliance（建设工程招投标合规）两个主技能从扁平浅骨架深化为深层子技能体系，每个拆为四个可独立触发的子技能并改造原 SKILL.md 为编排入口。

本计划交付两块内容：
1. **工程款争议处理拆分** — 将 payment-dispute（现 ~18 行浅骨架）拆为四个可独立触发的子技能：工程价款优先受偿权 / 结算依据与黑白合同 / 质量抗辩与反索赔 / 工程款利息与垫资。现有三步纲要（需求收集 / 法律分析 / 输出生成）拆分迁移并大幅深化，原 SKILL.md 改为编排入口。承包人工程价款优先受偿权引用民法典第807条（中度把握锚点）标建议复核；优先受偿权范围/行使期限/不得对抗消费者购房人、黑白合同以备案中标合同结算来自施工合同司法解释，按 CONTEXT 纪律**描述规则不写裸条号**。
2. **建设工程招投标合规拆分** — 将 bidding-compliance（现 ~18 行浅骨架）拆为四个可独立触发的子技能：必须招标范围与方式 / 招标投标程序 / 串通投标与虚假招标 / 中标无效与异议投诉。现有三步纲要拆分迁移并大幅深化，原 SKILL.md 改为编排入口。必须招标范围与规模标准、串通投标、中标无效来自招标投标法及实施条例与必须招标的工程建设项目规定，**具体条号与规模阈值标待验证、描述规则呈现**。

本计划与 07-01 在文件路径上**无重叠**（07-01 在 _shared、CLAUDE.md、contract-review；本计划在 payment-dispute、bidding-compliance），故同属 wave 1 可并行。本计划的子技能在「前置」中引用 07-01 产出的 _shared 引用脊柱与 construction-legal/CLAUDE.md（这是内容引用而非文件写入，不构成文件写入依赖；若并行执行时 07-01 的 _shared/CLAUDE.md 尚未落地，子技能仍可生成，引用以路径声明形式存在，执行 07-01 后即生效）。

Purpose: 关闭「工程款争议处理与招投标合规仅有扁平浅骨架」的 gap，交付律师/法务可单点调用的工程款回收（含优先受偿权）与招投标合规深层能力。
Output: 4 个 payment-dispute 子技能 + 1 个工程款编排入口 + 4 个 bidding-compliance 子技能 + 1 个招投标编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民法典建设工程合同/招标投标法 为分析基础，建设工程施工合同司法解释(一)、招标投标法实施条例、必须招标的工程建设项目规定 为补充）；指导性案例作参考非判例法（建设工程典型案例可参考，案号标待验证）；法院层级识别（建设工程争议金额大常由中院一审、建设工程仲裁亦常见）；行业监管特色（招标投标行政监督部门 发改委/住建/水利/交通等按行业、住建主管部门）；执业环境适配（建设工程律师 / 发包人或承包人内部法务 / 招标代理 / 造价人员）。命名约定：技能名 kebab-case；斜杠命令 /construction-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/行政法规/部门规章 与 案例/学说 分类，带来源标签。中度把握锚点（标「建议复核」）：承包人工程价款优先受偿权=民法典第807条；通则部分复用商事脊柱已核实锚点（违约金调整=第585条第2款、竞合=第588条 不回退、法定解除=第563条）。规则类（来自司法解释，描述规则不写裸条号）：优先受偿权范围/行使期限/不得对抗消费者购房人；黑白合同以备案中标合同结算；无效合同参照约定折价补偿；质量不合格工程款处理；欠付工程款利息计付。招标投标法及实施条例的必须招标范围/规模标准/串通投标/中标无效**描述规则，具体条号与规模阈值一律 `[待验证]`**。司法解释条号与案例案号一律标待验证，不臆造，**不回退已知错误**。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/07-construction-legal/07-CONTEXT.md
@CLAUDE.md
@construction-legal/skills/payment-dispute/SKILL.md
@construction-legal/skills/bidding-compliance/SKILL.md
@construction-legal/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@commercial-legal/skills/contract-review/SKILL.md
@employment-legal/skills/hiring-review/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 payment-dispute 为四个可独立触发的子技能</name>
  <read_first>
    - construction-legal/skills/payment-dispute/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；拆分迁移并大幅深化的源）
    - construction-legal/skills/_shared/legal-basis-conventions.md（07-01 产出 — 引用规范）
    - construction-legal/skills/_shared/construction-law-citations.md（07-01 产出 — 引用库，重点：优先受偿权第807条、黑白合同备案结算、无效折价补偿、质量价款抗辩、欠付利息、垫资 司法解释规则、通则违约锚点）
    - construction-legal/skills/_shared/practice-profile-schema.md（07-01 产出 — 配置读取契约，代理立场/争议处理倾向字段）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板，子技能读取代理立场/争议处理倾向/造价鉴定资源/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板/边界条件/错误处理/## 法律依据 三类分类）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险分级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md,
    construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md,
    construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md,
    construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md
  </files>
  <action>
    将现有 payment-dispute/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：priority-payment-right / settlement-basis-dual-contract / quality-defense-counterclaim / interest-advance-funding；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 construction-legal/CLAUDE.md 配置含**代理立场与争议处理倾向** + 引用 _shared 规范/引用库/契约 + 与其他子技能及 contract-review 的分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/司法解释/行政法规 与 案例/学说 分类，引用 _shared/construction-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 payment-dispute 编排入口调用，也可由律师/法务单独触发（/construction-legal:<name>），**并须按代理立场（发包人侧 抗辩 vs 承包人侧 主张）调整**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - priority-payment-right（工程价款优先受偿权）：覆盖现纲要「法律分析」核心并深化。**优先受偿权成立要件**（承包人地位、合同有效或无效折价补偿后的价款、工程具备折价拍卖条件 即非不宜折价拍卖如学校医院等公益设施、发包人逾期未付经催告）；**权利范围**（优先受偿的价款范围 工程款本金含人工/材料/机械等成本，不含发包人逾期付款损失/利息是否在内的争议 描述规则）；**行使期限**（自发包人应付工程价款之日起的法定期限，**期限阈值标 `[待验证]`**，提示「司法解释明确行使期限，须核实现行版本天数」）；**权利顺位**（优先于抵押权与其他债权、但不得对抗已支付大部分款项的消费者购房人——民法典第807条 + 施工合同司法解释规则，**描述规则**）。深化：优先受偿权成立要件核对表、可优先受偿范围争议表、行使期限计算与到期预警表、与抵押权/购房人顺位判定表。**按代理立场区分**：承包人侧关注及时行使勿过期，发包人侧关注抗辩 不成立/范围/已过期。引用优先受偿权=民法典第807条（建议复核）+ 司法解释范围期限规则（描述规则，期限待验证）。边界条件：实际施工人（挂靠/转包）能否主张优先受偿权、装饰装修工程优先受偿权、行使方式（协议折价/请求拍卖/诉讼）。
    - settlement-basis-dual-contract（结算依据与黑白合同）：覆盖现纲要「需求收集 + 法律分析」中结算依据维度并深化。**结算依据认定**（合同约定结算方式、送审与审定、约定逾期不答复视为认可送审价条款的效力 描述规则、固定价/据实结算/造价鉴定）；**黑白合同**（实际履行的施工合同与备案中标合同实质性内容 工程价款/工期/质量 不一致的，应以备案中标合同作为结算依据；何为「实质性内容」与「不一致」的认定 描述规则不写裸条号）；**未签证变更与实际履行**（变更未签证时以实际施工/往来证据/鉴定确定）；造价鉴定的启动与质证衔接（提示与造价机构协作）。深化：结算依据优先级判定表、黑白合同识别与结算依据选择流程图（文字描述）、未签证变更举证清单、逾期答复条款效力审查表。**按代理立场区分**：承包人侧争取据实/高结算依据，发包人侧主张以备案合同/约定控价。引用黑白合同备案结算（描述规则）+ 无效折价补偿（描述规则）。边界条件：多份合同并存、补充协议与备案合同关系、招标范围外工程的结算。
    - quality-defense-counterclaim（质量抗辩与反索赔）：覆盖现纲要「法律分析」中质量与反请求维度并深化。**发包人质量抗辩**（以工程质量不合格抗辩拒付或少付工程款的成立条件）；**质量不合格工程款处理**（经验收不合格且修复后仍不合格的不予支付/修复后合格的扣减修复费用——施工合同司法解释规则 描述规则）；**反索赔**（发包人对承包人的工期延误违约金、质量缺陷修复费、第三方损失等反请求与工程款抵销）；质量责任与举证（谁主张质量问题谁举证、鉴定）。深化：质量抗辩成立要件表、质量不合格工程款处理决策表、反索赔项目清单与抵销表、质量举证与鉴定要点。**按代理立场区分**：发包人侧组织质量抗辩与反索赔，承包人侧反驳质量抗辩并主张系发包人原因/已验收。引用质量价款抗辩与不合格处理（司法解释描述规则）+ 违约金（第585条第2款 建议复核）。边界条件：已交付使用视为认可质量、保修责任与质量抗辩区分、地基基础与主体结构终身责任。
    - interest-advance-funding（工程款利息与垫资）：覆盖现纲要「法律分析」中利息垫资维度与「输出生成」并深化。**欠付工程款利息**（利息计付标准 有约定从约定无约定按同期同类贷款利率或 LPR 的规则、**起算时间** 交付之日/提交结算文件之日/起诉之日的规则——施工合同司法解释 描述规则不写裸条号）；**垫资及垫资利息**（垫资约定的效力 有效、垫资利息有约定且不超过同期贷款利率部分予以支持的规则 描述规则）；工程款主张的本金+利息组装。深化：利息计付标准与起算时点对照表、垫资与垫资利息效力判定表、本息计算输出模板。**按代理立场区分**：承包人侧主张利息起算尽早，发包人侧抗辩起算时点与标准。引用欠付利息与垫资规则（司法解释描述规则）。边界条件：约定利率过高的调整、复利、逾期付款违约金与利息竞合。本子技能与 priority-payment-right 衔接（利息是否纳入优先受偿范围 提示存争议）。
  </action>
  <verify>
    <automated>for d in priority-payment-right settlement-basis-dual-contract quality-defense-counterclaim interest-advance-funding; do f="construction-legal/skills/payment-dispute/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '优先受偿\|第807条' construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md && grep -q '黑白合同\|备案' construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md && grep -q '质量抗辩\|反索赔' construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md && grep -q '利息\|垫资' construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个 payment-dispute 子技能 SKILL.md 全部存在，路径为 construction-legal/skills/payment-dispute/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置含代理立场/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - priority-payment-right 含成立要件/范围/行使期限（待验证）/顺位并引用第807条建议复核；settlement-basis-dual-contract 含结算依据与黑白合同备案结算（描述规则）；quality-defense-counterclaim 含质量抗辩与反索赔抵销；interest-advance-funding 含利息计付起算与垫资效力
    - 每个子技能体现按代理立场（发包人侧抗辩/承包人侧主张）调整
    - 法律依据引用 _shared 库，第807条标建议复核、司法解释规则（优先受偿权范围期限/黑白合同/质量价款/利息垫资）描述规则不写裸条号、行使期限阈值标待验证、其余条号标待验证、无回退已知错误
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>payment-dispute 拆为四个可独立触发的子技能并大幅深化（每个 150+ 行）；priority-payment-right 优先受偿权第807条建议复核与范围期限顺位描述规则、settlement-basis-dual-contract 黑白合同备案结算、quality-defense-counterclaim 质量抗辩反索赔、interest-advance-funding 利息与垫资；各子技能按代理立场调整；法律依据分类引用 _shared 库，锚点标建议复核、司法解释规则描述规则、期限与其余条号标待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 改造 payment-dispute/SKILL.md 为编排入口</name>
  <read_first>
    - construction-legal/skills/payment-dispute/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 1 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板，读取代理立场/争议处理倾向）
  </read_first>
  <files>
    construction-legal/skills/payment-dispute/SKILL.md
  </files>
  <action>
    将 construction-legal/skills/payment-dispute/SKILL.md 改造为编排入口：保留 frontmatter（name: payment-dispute，更新 description 说明它现在编排四个子技能，argument-hint「[工程款争议 — 优先受偿权/结算/质量抗辩/利息垫资]」）。正文：(1) 顶部一行迁移说明指向子技能（路径 skills/payment-dispute/<子技能名>/SKILL.md）；(2) 目的与整体工程款争议处理流程概览（结算依据确定 → 质量抗辩与反索赔核查 → 利息计算 → 优先受偿权可行性与期限）；(3) 前置：加载**代理立场与争议处理倾向**——读取 construction-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /construction-legal:cold-start-interview 或说「临时模式」），含临时模式段落（中立立场、律师角色、争议处理协商优先并**提示优先受偿权行使期限勿过期**、标 `[临时模式]`）；(4) 子技能编排顺序表——工程价款优先受偿权 / 结算依据与黑白合同 / 质量抗辩与反索赔 / 工程款利息与垫资，每行说明、子技能路径、可单独触发斜杠命令（/construction-legal:<name>）+ 说明（按争议焦点择需，优先受偿权注意行使期限）；(5) 入口级护栏：主体画像/代理立场加载（承包人侧主张 vs 发包人侧抗辩）、争议处理倾向（协商/鉴定/仲裁/诉讼）、**优先受偿权行使期限预警**（从 ## 升级矩阵 读取触发，提示期限临近升级）、造价鉴定资源确认（从 ## 可用集成）、与 contract-review 分工提示（合同效力/结算条款来自合同审查）、目的地/特权检查、地方性规定提示、时效性提示（司法解释条号易变）。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=construction-legal/skills/payment-dispute/SKILL.md; grep -q '^name: payment-dispute' "$f" && grep -q 'priority-payment-right' "$f" && grep -q 'settlement-basis-dual-contract' "$f" && grep -q 'quality-defense-counterclaim' "$f" && grep -q 'interest-advance-funding' "$f" && grep -q '临时模式' "$f" && grep -q '优先受偿\|代理立场\|争议处理' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/skills/payment-dispute/SKILL.md 仍有 frontmatter name: payment-dispute，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/construction-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、代理立场加载、争议处理倾向、优先受偿权行使期限预警、造价鉴定资源、contract-review 分工提示、目的地/特权检查、地方性规定提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 payment-dispute/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（代理立场、争议处理倾向、优先受偿权期限预警、造价鉴定资源、contract-review 分工、特权检查、地方性规定）保留，无语义丢失。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 bidding-compliance 为四个可独立触发的子技能</name>
  <read_first>
    - construction-legal/skills/bidding-compliance/SKILL.md（现有浅骨架 — 三步纲要；拆分迁移并大幅深化的源）
    - construction-legal/skills/_shared/legal-basis-conventions.md（07-01 产出 — 引用规范）
    - construction-legal/skills/_shared/construction-law-citations.md（07-01 产出 — 引用库，重点：招标投标法及实施条例必须招标范围/规模标准/程序/串通投标/中标无效，必须招标的工程建设项目规定，规模阈值与条号待验证）
    - construction-legal/skills/_shared/practice-profile-schema.md（07-01 产出 — 配置读取契约）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板，子技能读取代理立场/项目类型/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险分级）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md,
    construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md,
    construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md,
    construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md
  </files>
  <action>
    将现有 bidding-compliance/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：mandatory-bidding-scope / bidding-procedure / collusion-fraud / bid-invalidity-complaint；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 construction-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/行政法规/部门规章 与 案例/学说 分类，引用 _shared/construction-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 bidding-compliance 编排入口调用，也可由律师/法务/招标代理单独触发（/construction-legal:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - mandatory-bidding-scope（必须招标范围与方式）：**必须招标的工程建设项目范围**（关系社会公共利益公众安全的基础设施/公用事业、全部或部分使用国有资金投资或国家融资、使用国际组织或外国政府贷款援助资金的项目；及其规模标准 施工/重要设备材料采购/勘察设计监理等服务的金额或规模门槛——招标投标法及实施条例、必须招标的工程建设项目规定，**规模阈值与具体条号一律 `[待验证]`，描述规则 + 提示核实现行规模标准**）；**招标方式**（公开招标 vs 邀请招标的适用）；**可不招标/可直接发包情形**（依法不招标的例外）。深化：必须招标判定决策表（项目性质 + 资金来源 + 规模标准）、规模标准核实清单（标注待验证）、招标方式选择表、可不招标情形清单。边界条件：规模标准临界、PPP/特许经营、应招标未招标导致合同无效（衔接 contract-review subject-qualification-validity）。引用必须招标范围与规模（描述规则，阈值待验证）。
    - bidding-procedure（招标投标程序）：**招标公告与资格审查**（公告发布、资格预审/资格后审）；**招标文件**（编制要求、评标办法 经评审最低价/综合评估法、最高/最低投标限价、答疑与澄清、不得设置歧视性或排他性条款）；**投标**（投标文件、投标保证金、联合体投标）；**开标评标定标**（开标程序、评标委员会组成与回避、废标情形、定标）；**中标通知书与合同签订**（中标通知书的法律效力、30 日内签订书面合同 期限标注待验证、不得订立背离实质性内容的其他协议 黑白合同衔接）。深化：招投标全流程时间轴表、资格审查与评标办法对照表、废标情形清单、中标后合同签订合规表。边界条件：电子招投标、招标代理责任、招标文件歧视性条款识别。引用招投标程序规则（描述规则，期限/条号待验证）。
    - collusion-fraud（串通投标与虚假招标）：**投标人之间串通投标**（协商报价、约定中标人、轮流中标、围标陪标的认定情形）；**招标人与投标人串通**（泄露标底/评标信息、协助特定投标人、明招暗定）；**弄虚作假骗取中标**（伪造资质业绩、提供虚假财务/人员/业绩证明）；**围标陪标识别**（投标文件雷同、报价规律异常、关联企业投标、保证金同源等异常信号）。深化：串通投标认定情形表（横向/纵向）、弄虚作假情形清单、围标陪标异常信号识别表、法律后果（中标无效 + 行政处罚 + 刑事 串通投标罪提示，刑事条号待验证）。边界条件：合理低价与恶意低价区分、关联企业同时投标的认定、举报与证据。引用串通投标与弄虚作假规则（描述规则，条号待验证）。
    - bid-invalidity-complaint（中标无效与异议投诉）：**中标无效情形**（串通投标/弄虚作假骗取中标/应招标未招标或规避招标/违反程序影响中标结果等导致中标无效——描述规则）；**异议**（投标人或利害关系人对资格审查/开标/评标结果的异议提出与答复期限 期限待验证）；**投诉**（向行政监督部门投诉的条件、期限、受理与处理 期限待验证）；**行政监督与法律责任**（监督部门、责令改正/罚款/取消投标资格等 描述规则）；中标无效后的处理（重新招标/确定其他中标人/合同效力衔接 contract-review）。深化：中标无效情形表、异议投诉路径与期限表（标注待验证）、行政监督部门按行业对照表、中标无效后果与救济流程。边界条件：异议前置与投诉的关系、中标无效与合同无效的关系、提起行政诉讼。引用中标无效与异议投诉规则（描述规则，期限/条号待验证）。
  </action>
  <verify>
    <automated>for d in mandatory-bidding-scope bidding-procedure collusion-fraud bid-invalidity-complaint; do f="construction-legal/skills/bidding-compliance/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '必须招标' construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md && grep -q '评标\|开标' construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md && grep -q '串通投标' construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md && grep -q '中标无效\|投诉' construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个 bidding-compliance 子技能 SKILL.md 全部存在，路径为 construction-legal/skills/bidding-compliance/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - mandatory-bidding-scope 含必须招标范围与规模标准（阈值待验证）与招标方式；bidding-procedure 含资格审查/招标文件/开标评标定标/中标通知书与合同签订；collusion-fraud 含横向纵向串通与弄虚作假与围标识别；bid-invalidity-complaint 含中标无效情形与异议投诉路径（期限待验证）
    - 法律依据引用 _shared 库，招标投标法及实施条例规则描述规则、规模标准/期限/具体条号一律标待验证、无臆造
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>bidding-compliance 拆为四个可独立触发的子技能并大幅深化（每个 150+ 行）；mandatory-bidding-scope 必须招标范围与规模（阈值待验证）、bidding-procedure 招投标程序、collusion-fraud 串通投标与弄虚作假、bid-invalidity-complaint 中标无效与异议投诉；法律依据分类引用 _shared 库，规则描述规则、规模标准与条号标待验证。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 bidding-compliance/SKILL.md 为编排入口</name>
  <read_first>
    - construction-legal/skills/bidding-compliance/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - construction-legal/CLAUDE.md（07-01 产出 — 配置模板）
  </read_first>
  <files>
    construction-legal/skills/bidding-compliance/SKILL.md
  </files>
  <action>
    将 construction-legal/skills/bidding-compliance/SKILL.md 改造为编排入口：保留 frontmatter（name: bidding-compliance，更新 description 说明它现在编排四个子技能，argument-hint「[招投标合规 — 必须招标/程序/串通投标/中标无效]」）。正文：(1) 顶部一行迁移说明指向子技能（路径 skills/bidding-compliance/<子技能名>/SKILL.md）；(2) 目的与整体招投标合规流程概览（必须招标判定 → 程序合规 → 串通/虚假识别 → 中标无效与异议投诉）；(3) 前置：加载立场——读取 construction-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /construction-legal:cold-start-interview 或说「临时模式」），含临时模式段落（中立立场、律师角色、必须招标范围与规模标准按现行规定核实、标 `[临时模式]`）；(4) 子技能编排顺序表——必须招标范围与方式 / 招标投标程序 / 串通投标与虚假招标 / 中标无效与异议投诉，每行说明、子技能路径、可单独触发斜杠命令（/construction-legal:<name>）+ 说明（按合规审查目的择需）；(5) 入口级护栏：项目类型与资金来源确认（影响是否必须招标，从 ## 我们是谁 / ## 共享护栏 项目类型识别）、立场加载（招标人侧合规 vs 投标人侧维权）、与 contract-review 分工提示（应招标未招标/中标无效导致合同无效衔接 subject-qualification-validity）、行政监督部门按行业识别、目的地/特权检查、地方性规定提示（招投标地方规章）、时效性提示（规模标准与程序规定可能更新）。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=construction-legal/skills/bidding-compliance/SKILL.md; grep -q '^name: bidding-compliance' "$f" && grep -q 'mandatory-bidding-scope' "$f" && grep -q 'bidding-procedure' "$f" && grep -q 'collusion-fraud' "$f" && grep -q 'bid-invalidity-complaint' "$f" && grep -q '临时模式' "$f" && grep -q '必须招标\|项目类型\|中标无效' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - construction-legal/skills/bidding-compliance/SKILL.md 仍有 frontmatter name: bidding-compliance，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/construction-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、项目类型与资金来源确认、立场加载、contract-review 分工提示（中标无效→合同无效）、行政监督部门识别、目的地/特权检查、地方性规定提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 bidding-compliance/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（项目类型与资金来源、立场、contract-review 分工、行政监督部门、特权检查、地方性规定）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 payment-dispute 子技能 + 一个工程款编排入口 + 四个 bidding-compliance 子技能 + 一个招投标编排入口全部存在且格式合规
- payment-dispute 覆盖优先受偿权（第807条建议复核 + 范围期限顺位描述规则）/黑白合同结算/质量抗辩反索赔/利息垫资；bidding-compliance 覆盖必须招标范围（规模待验证）/程序/串通投标/中标无效异议投诉
- 现有 payment-dispute 与 bidding-compliance 浅骨架三步纲要无丢失迁移并大幅深化
- 法律依据按来源分类、中度把握锚点（第807条 + 通则 585条第2款/588/563）标建议复核、规则类描述规则不写裸条号、司法解释条号/规模标准/期限/案例案号标 `[待验证]`，无臆造、无回退已知错误
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('construction-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/法务可单独触发任一工程款争议处理与招投标合规子能力（8 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 工程价款优先受偿权引用第807条标建议复核、范围/行使期限/顺位描述规则；黑白合同备案结算描述规则；必须招标范围与规模标准、串通投标、中标无效描述规则且规模/条号标待验证
- payment-dispute 与 bidding-compliance 各拆为 4 个可独立触发子技能 + 编排入口，护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/07-construction-legal/07-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
