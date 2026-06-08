---
phase: 09-criminal-compliance
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - criminal-compliance/skills/non-prosecution/applicability-assessment/SKILL.md
  - criminal-compliance/skills/non-prosecution/compliance-plan/SKILL.md
  - criminal-compliance/skills/non-prosecution/third-party-monitoring/SKILL.md
  - criminal-compliance/skills/non-prosecution/application-hearing/SKILL.md
  - criminal-compliance/skills/non-prosecution/SKILL.md
  - criminal-compliance/skills/corporate-crime/unit-crime-constitution/SKILL.md
  - criminal-compliance/skills/corporate-crime/common-unit-crime-types/SKILL.md
  - criminal-compliance/skills/corporate-crime/internal-control-prevention/SKILL.md
  - criminal-compliance/skills/corporate-crime/incident-response/SKILL.md
  - criminal-compliance/skills/corporate-crime/SKILL.md
autonomous: true
requirements:
  - NON-PROSECUTION-DECOMP
  - CORPORATE-CRIME-DECOMP
user_setup: []

must_haves:
  truths:
    - "律师/合规官/法务可以单独触发合规不起诉方案的任一子能力（适用条件评估 / 合规计划制定 / 第三方监督评估配合 / 不起诉申请与听证）而无需运行整个流程"
    - "non-prosecution 覆盖涉案企业合规适用范围与条件、不起诉类型 法定/酌定/存疑 刑事诉讼法第177条建议复核、认罪认罚从宽刑事诉讼法第15条建议复核、合规整改计划制定、第三方监督评估机制配合、不起诉申请与拟不起诉公开听证；涉案企业合规试点与第三方监督评估机制描述规则并标待验证不硬写文号，涉刑情形强制升级刑事辩护律师"
    - "律师/合规官/法务可以单独触发单位犯罪预防的任一子能力（单位犯罪构成识别 / 常见单位犯罪类型 / 内控与防范机制 / 涉案应对）而无需运行整个流程"
    - "corporate-crime 覆盖单位犯罪定义刑法第30条建议复核、双罚制第31条建议复核、常见单位犯罪类型 构成要件描述具体罪名条号待验证、内控与防范机制、涉案应对 自首第67条立功第68条建议复核与责任切割与强制升级辩护律师；不提供规避侦查或逃避责任方法护栏贯穿"
    - "每个 non-prosecution 与 corporate-crime 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；现有浅骨架三步纲要无丢失迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "criminal-compliance/skills/non-prosecution/applicability-assessment/SKILL.md"
      provides: "适用条件评估子技能（涉案企业合规适用范围与条件 + 不起诉类型法定/酌定/存疑第177条 + 认罪认罚从宽第15条）"
      contains: "第177条"
      min_lines: 150
    - path: "criminal-compliance/skills/non-prosecution/compliance-plan/SKILL.md"
      provides: "合规计划制定子技能（针对涉案问题的专项合规整改计划 整改措施·时间表·组织保障·可验证成果）"
      contains: "整改"
      min_lines: 150
    - path: "criminal-compliance/skills/non-prosecution/third-party-monitoring/SKILL.md"
      provides: "第三方监督评估配合子技能（第三方监督评估机制启动·组成·评估流程·配合要点，规则描述待验证不硬写文号）"
      contains: "第三方监督评估"
      min_lines: 150
    - path: "criminal-compliance/skills/non-prosecution/application-hearing/SKILL.md"
      provides: "不起诉申请与听证子技能（提交合规整改报告与不起诉申请、拟不起诉公开听证配合）"
      contains: "不起诉"
      min_lines: 150
    - path: "criminal-compliance/skills/non-prosecution/SKILL.md"
      provides: "合规不起诉方案编排入口（指向四个子技能 + 入口级护栏含涉案强制升级与合规边界）"
      min_lines: 40
    - path: "criminal-compliance/skills/corporate-crime/unit-crime-constitution/SKILL.md"
      provides: "单位犯罪构成识别子技能（单位犯罪定义第30条 + 双罚制第31条 + 单位犯罪与自然人犯罪区分 + 借单位之名个人犯罪区分）"
      contains: "第30条"
      min_lines: 150
    - path: "criminal-compliance/skills/corporate-crime/common-unit-crime-types/SKILL.md"
      provides: "常见单位犯罪类型子技能（走私·金融·税收·商业贿赂·扰乱市场·环境·安全生产 各类别构成要件描述具体罪名条号待验证）"
      contains: "罪名\|构成要件"
      min_lines: 150
    - path: "criminal-compliance/skills/corporate-crime/internal-control-prevention/SKILL.md"
      provides: "内控与防范机制子技能（事前防范制度审批留痕禁止性清单 + 重点环节风险控制 + 岗位制衡与举报机制）"
      contains: "内控\|防范"
      min_lines: 150
    - path: "criminal-compliance/skills/corporate-crime/incident-response/SKILL.md"
      provides: "涉案应对子技能（配合调查的合规边界 + 自首第67条立功第68条 + 单位与责任人员责任切割 + 强制升级刑事辩护律师）"
      contains: "强制升级\|辩护"
      min_lines: 150
    - path: "criminal-compliance/skills/corporate-crime/SKILL.md"
      provides: "单位犯罪预防编排入口（指向四个子技能 + 入口级护栏含涉案强制升级与不提供规避侦查方法）"
      min_lines: 40
  key_links:
    - from: "criminal-compliance/skills/non-prosecution/applicability-assessment/SKILL.md"
      to: "criminal-compliance/skills/_shared/criminal-law-citations.md"
      via: "引用不起诉类型与认罪认罚（刑事诉讼法第177/15条 + 涉案企业合规规范性文件）"
      pattern: "criminal-law-citations|第177条|第15条|涉案企业合规"
    - from: "criminal-compliance/skills/non-prosecution/third-party-monitoring/SKILL.md"
      to: "criminal-compliance/skills/_shared/legal-basis-conventions.md"
      via: "遵循涉案企业合规规范性文件快速演进标注（描述规则不硬写文号）"
      pattern: "legal-basis-conventions|第三方监督评估|待验证"
    - from: "criminal-compliance/skills/non-prosecution/SKILL.md"
      to: "四个 non-prosecution 子技能"
      via: "编排入口指向子技能路径"
      pattern: "applicability-assessment|compliance-plan|third-party-monitoring|application-hearing"
    - from: "criminal-compliance/skills/corporate-crime/unit-crime-constitution/SKILL.md"
      to: "criminal-compliance/skills/_shared/criminal-law-citations.md"
      via: "引用单位犯罪定义与双罚制（刑法第30/31条）"
      pattern: "criminal-law-citations|第30条|第31条|双罚制"
    - from: "criminal-compliance/skills/corporate-crime/incident-response/SKILL.md"
      to: "criminal-compliance/CLAUDE.md"
      via: "读取是否已涉案与涉刑强制升级护栏、合规边界护栏"
      pattern: "CLAUDE.md|涉案|强制升级|规避侦查"
    - from: "criminal-compliance/skills/corporate-crime/SKILL.md"
      to: "四个 corporate-crime 子技能"
      via: "编排入口指向子技能路径"
      pattern: "unit-crime-constitution|common-unit-crime-types|internal-control-prevention|incident-response"
---

<objective>
将刑事合规插件的 non-prosecution（合规不起诉方案）与 corporate-crime（单位犯罪预防）两个主技能从扁平浅骨架深化为可独立触发的深层子技能体系。

本计划交付两块内容：
1. **合规不起诉方案拆分** — 按 CONTEXT「深层子技能拆分」决策，将 non-prosecution（现 ~16 行浅骨架）拆为四个可独立触发的子技能：适用条件评估（涉案企业合规适用范围与条件 + 不起诉类型 法定/酌定/存疑 第177条 + 认罪认罚从宽 第15条）/ 合规计划制定（专项合规整改计划 措施·时间表·组织保障·可验证成果）/ 第三方监督评估配合（第三方监督评估机制启动·组成·评估流程·配合要点，规则描述待验证）/ 不起诉申请与听证（提交合规整改报告与不起诉申请、拟不起诉公开听证配合）。现有三步纲要拆分迁移并大幅深化，原 SKILL.md 改为编排入口。
2. **单位犯罪预防拆分** — 将 corporate-crime（现 ~16 行浅骨架）拆为四个可独立触发的子技能：单位犯罪构成识别（单位犯罪定义 第30条 + 双罚制 第31条 + 与自然人犯罪区分）/ 常见单位犯罪类型（走私·金融·税收·商业贿赂·扰乱市场·环境·安全生产 各类别构成要件描述，具体罪名条号待验证）/ 内控与防范机制（事前防范·重点环节风险控制·岗位制衡与举报）/ 涉案应对（配合调查的合规边界·自首立功·责任切割·强制升级辩护律师）。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分，现实 non-prosecution / corporate-crime 是扁平浅骨架三步纲要」的 gap，使两个主技能达到与 commercial-legal / family-legal 同等的深层子技能集水平。本计划属 wave 1，与 09-01 无文件重叠（仅引用 09-01 产出的 _shared 脊柱与 CLAUDE.md 作为内容来源，不修改它们），可与 09-01 并行执行；执行时若 _shared 脊柱尚未就绪，须按 CONTEXT/09-01 的引用纪律内联引用并标待验证（脊柱就绪后由 verify 校验一致性）。
Output: 4 个 non-prosecution 子技能 + 1 个合规不起诉编排入口 + 4 个 corporate-crime 子技能 + 1 个单位犯罪预防编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（刑法、刑事诉讼法 为分析基础，涉案企业合规规范性文件 为补充）；指导性案例作参考非判例法（最高检涉案企业合规典型案例可参考，案号标待验证）；法院层级识别（基层/中院/高院/最高院 + 检察机关四级，不起诉决定权在检察机关）；行业监管特色（检察机关·第三方监督评估机制管理委员会与评估组织·行业监管）；执业环境适配（刑事合规律师 / 企业合规官 / 企业法务 / 当事人本人）。命名约定：技能名 kebab-case；斜杠命令 /criminal-compliance:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/规范性文件 与 案例/学说 分类，带来源标签。中度把握锚点（须标「已核实锚点（中度把握），建议复核」）：单位犯罪定义=刑法第30条；双罚制=第31条；自首=第67条；立功=第68条；缓刑条件=第72条；不起诉=刑事诉讼法第177条；认罪认罚从宽=刑事诉讼法第15条。**各具体罪名条号一律标 `[待验证]`，以构成要件描述呈现，绝不臆造具体罪名条号与法定刑档；定罪量刑数额标准描述规则不写裸数额。** **涉案企业合规试点、第三方监督评估机制管理规定（2021）、认罪认罚从宽指导意见属规范性文件且快速演进，一律描述规则并标 `[待验证]`，不硬写文号、发文日期、具体条款编号。** 司法解释具体条号、案例案号一律标 `[待验证]`。**刑事合规护栏（合规预防与辩护立场 / 不提供规避侦查或逃避责任方法 / 涉刑强制升级刑事辩护律师 / 律师审查）须贯穿；涉案应对子技能须显式声明合规边界（配合调查·如实供述·认罪认罚，绝不规避侦查·伪造毁灭证据·串供）。**
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/09-criminal-compliance/09-CONTEXT.md
@CLAUDE.md
@criminal-compliance/skills/non-prosecution/SKILL.md
@criminal-compliance/skills/corporate-crime/SKILL.md
@criminal-compliance/.claude-plugin/plugin.json
@family-legal/skills/_shared/legal-basis-conventions.md
@family-legal/skills/_shared/family-law-citations.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@commercial-legal/skills/contract-review/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 non-prosecution 为四个可独立触发的子技能</name>
  <read_first>
    - criminal-compliance/skills/non-prosecution/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；拆分迁移并大幅深化的源）
    - criminal-compliance/skills/_shared/legal-basis-conventions.md（09-01 产出 — 引用规范，重点：规范性文件来源类别 + 涉案企业合规快速演进标注 + 具体罪名条号待验证 + 合规预防与辩护定位）
    - criminal-compliance/skills/_shared/criminal-law-citations.md（09-01 产出 — 引用库，重点：不起诉第177条、认罪认罚从宽第15条、涉案企业合规规范性文件描述、缓刑第72条）
    - criminal-compliance/skills/_shared/practice-profile-schema.md（09-01 产出 — 配置读取契约，服务立场 合规不起诉、是否已涉案与涉刑强制升级契约、合规边界契约）
    - criminal-compliance/CLAUDE.md（09-01 产出 — 配置模板，子技能读取服务立场/是否已涉案/升级矩阵/涉刑强制升级护栏/合规边界护栏）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 完整章节范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    criminal-compliance/skills/non-prosecution/applicability-assessment/SKILL.md,
    criminal-compliance/skills/non-prosecution/compliance-plan/SKILL.md,
    criminal-compliance/skills/non-prosecution/third-party-monitoring/SKILL.md,
    criminal-compliance/skills/non-prosecution/application-hearing/SKILL.md
  </files>
  <action>
    将现有 non-prosecution/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：applicability-assessment / compliance-plan / third-party-monitoring / application-hearing；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 criminal-compliance/CLAUDE.md 配置含**服务立场 合规不起诉 + 是否已涉案 + 涉刑强制升级护栏 + 合规边界护栏** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格，含涉案情形识别与强制升级、合规边界拒绝）、`## 法律依据`（按 法条/司法解释/规范性文件 与 案例/学说 分类，引用 _shared/criminal-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 non-prosecution 编排入口调用，也可由律师/合规官/法务单独触发（/criminal-compliance:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** 拆分时须深化（补充边界条件、错误处理、输出模板、法律依据分类），而非仅搬运纲要。**涉案企业合规试点与第三方监督评估机制属规范性文件且快速演进，一律描述规则并标 `[待验证]`，不硬写文号·发文日期·条款编号；不起诉第177条、认罪认罚从宽第15条标建议复核；具体罪名条号一律待验证。涉刑情形强制升级刑事辩护律师贯穿。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - applicability-assessment（适用条件评估）：覆盖现纲要「需求收集 + 法律分析」中适用性维度并深化。**涉案企业合规适用范围与条件**（企业涉嫌经济·职务等犯罪、认罪认罚、愿意合规整改、可能判处的刑罚区间适宜适用、不属排除情形——描述规则·待验证，不硬写文号）；**不起诉类型**（法定不起诉·酌定相对不起诉·存疑不起诉的情形与适用=刑事诉讼法第177条 建议复核）；**认罪认罚从宽**（自愿如实供述·承认指控·愿意接受处罚=刑事诉讼法第15条 建议复核）；评估涉案企业是否符合合规不起诉路径。深化：合规不起诉适用条件清单表（条件/是否满足/依据描述·待验证）、不起诉类型对照表（类型/适用情形/法律依据第177条 建议复核/后果）、认罪认罚与从宽关系表。**按服务立场区分**：合规不起诉立场聚焦争取从宽路径可行性。引用第177条、第15条（建议复核）、涉案企业合规适用条件（规范性文件描述·待验证）、可能刑罚区间参考缓刑第72条（建议复核）。边界条件：不符合合规不起诉条件的替代路径（量刑从宽）、罪名定性争议、是否已立案影响路径。错误处理含涉案强制升级辩护律师、规避侦查需求拒绝。
    - compliance-plan（合规计划制定）：覆盖现纲要「法律分析 + 输出生成」中整改维度并深化。针对涉案问题制定**专项合规整改计划**：问题诊断（涉案行为暴露的合规漏洞）、整改措施（制度·流程·组织·人员·技术）、整改时间表与里程碑、组织保障（责任人·资源·考核）、可验证成果（整改证据·有效性指标）。深化：合规整改计划要素表（要素/内容/可验证成果）、整改措施分类表（针对性·全面性·可落地性）、整改时间表模板、有效合规要点（与 compliance-system-building 衔接，**有效合规认定标准属规范性文件·待验证**）。**按服务立场区分**：合规不起诉立场聚焦针对涉案问题的可验证整改。引用涉案企业合规整改要求（规范性文件描述·待验证，不硬写文号）。边界条件：整改的真实性与形式化风险、整改周期与办案期限冲突、整改成本。错误处理含整改计划须律师审查、不得以整改之名行规避侦查之实（合规边界）。
    - third-party-monitoring（第三方监督评估配合）：覆盖现纲要「法律分析」中第三方机制维度并深化。**第三方监督评估机制**（管理委员会·专业人员名录·评估组织的启动条件·组成·评估流程·考察期·评估报告——描述规则·待验证，**不硬写文号·机制细节条款编号**）；企业配合要点（提供材料·接受现场检查·接受访谈·落实整改）；评估结论对不起诉决定的影响。深化：第三方监督评估流程表（阶段/企业配合事项/注意事项）、配合要点清单表、评估报告应对要点。**按服务立场区分**：合规不起诉立场聚焦如实充分配合以获积极评估。引用第三方监督评估机制（规范性文件描述·待验证 — 规范性文件快速演进，须核实现行版本）。边界条件：第三方评估机制在各地试点口径差异（地方 flagged）、评估不利结论应对、企业不配合后果。错误处理含配合中识别新涉案事实的强制升级、规避评估需求拒绝（合规边界）。
    - application-hearing（不起诉申请与听证）：覆盖现纲要「输出生成」并深化。**不起诉申请**（向检察机关提交合规整改报告·第三方评估报告·不起诉申请，论证符合不起诉条件第177条 建议复核）；**拟不起诉公开听证**（听证启动·参加人·企业陈述·答复检察机关与听证员询问·听证后处理——描述规则·待验证）；不起诉决定后的后续（合规承诺履行·行刑反向衔接 移送行政处罚的提示）。深化：不起诉申请材料清单表、听证准备要点表（陈述·答询·材料）、听证应对话术框架（合规·不规避）、不起诉决定后处理表。**按服务立场区分**：合规不起诉立场聚焦完整论证与听证有效呈现。引用不起诉第177条（建议复核）、拟不起诉听证（规范性文件描述·待验证）、行刑反向衔接（描述规则·待验证）。边界条件：听证非必经程序的情形、不起诉被否决的救济、被害人异议。错误处理含申请与听证须执业律师主导、强制升级辩护律师、听证陈述不得包含规避侦查或不实内容（合规边界）。
  </action>
  <verify>
    <automated>for d in applicability-assessment compliance-plan third-party-monitoring application-hearing; do f="criminal-compliance/skills/non-prosecution/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第177条\|不起诉' criminal-compliance/skills/non-prosecution/applicability-assessment/SKILL.md && grep -q '整改\|合规计划' criminal-compliance/skills/non-prosecution/compliance-plan/SKILL.md && grep -q '第三方监督评估' criminal-compliance/skills/non-prosecution/third-party-monitoring/SKILL.md && grep -q '听证\|不起诉申请\|不起诉' criminal-compliance/skills/non-prosecution/application-hearing/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 criminal-compliance/skills/non-prosecution/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name kebab-case + description + argument-hint），含章节：目的、前置（含服务立场 + 是否已涉案 + 涉刑强制升级护栏 + 合规边界护栏读取）、详细步骤、检查清单、输出模板、边界条件、错误处理（含涉案强制升级、合规边界拒绝）、## 法律依据，且每个 ≥100 非空行
    - applicability-assessment 含不起诉类型第177条与认罪认罚第15条与涉案企业合规适用条件描述；compliance-plan 含专项合规整改计划与可验证成果；third-party-monitoring 含第三方监督评估机制配合（规则描述不硬写文号）；application-hearing 含不起诉申请与拟不起诉公开听证
    - 涉案企业合规试点与第三方监督评估机制一律描述规则并标待验证、不硬写文号；不起诉第177条/认罪认罚第15条标建议复核；具体罪名条号待验证；涉刑情形强制升级辩护律师、合规边界（拒绝规避侦查）贯穿
    - 法律依据按 法条/司法解释/规范性文件 与 案例/学说 分类引用 _shared 库并标待验证
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>non-prosecution 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；applicability-assessment 适用条件评估、compliance-plan 合规计划制定、third-party-monitoring 第三方监督评估配合、application-hearing 不起诉申请与听证；涉案企业合规与第三方监督评估描述规则不硬写文号、不起诉第177条与认罪认罚第15条标建议复核、涉刑强制升级与合规边界护栏贯穿；法律依据按来源分类引用 _shared 库标待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 corporate-crime 为四个可独立触发的子技能</name>
  <read_first>
    - criminal-compliance/skills/corporate-crime/SKILL.md（现有浅骨架 — 三步纲要；拆分迁移并大幅深化的源）
    - criminal-compliance/skills/_shared/legal-basis-conventions.md（09-01 产出 — 引用规范，重点：具体罪名条号待验证纪律 + 合规预防与辩护定位）
    - criminal-compliance/skills/_shared/criminal-law-citations.md（09-01 产出 — 引用库，重点：单位犯罪第30条·双罚制第31条·自首第67条·立功第68条·具体罪名构成要件占位 七类·涉案企业合规规范性文件描述）
    - criminal-compliance/skills/_shared/practice-profile-schema.md（09-01 产出 — 配置读取契约，是否已涉案与涉刑强制升级契约、合规边界契约）
    - criminal-compliance/CLAUDE.md（09-01 产出 — 配置模板，子技能读取服务立场/是否已涉案/涉刑强制升级护栏/不提供规避侦查方法护栏）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    criminal-compliance/skills/corporate-crime/unit-crime-constitution/SKILL.md,
    criminal-compliance/skills/corporate-crime/common-unit-crime-types/SKILL.md,
    criminal-compliance/skills/corporate-crime/internal-control-prevention/SKILL.md,
    criminal-compliance/skills/corporate-crime/incident-response/SKILL.md
  </files>
  <action>
    将现有 corporate-crime/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：unit-crime-constitution / common-unit-crime-types / internal-control-prevention / incident-response；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 criminal-compliance/CLAUDE.md 配置含**服务立场 + 是否已涉案 + 涉刑强制升级护栏 + 合规边界护栏** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格，含涉案情形识别与强制升级、合规边界拒绝）、`## 法律依据`（按 法条/司法解释/规范性文件 与 案例/学说 分类，引用 _shared/criminal-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 corporate-crime 编排入口调用，也可由律师/合规官/法务单独触发（/criminal-compliance:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** **单位犯罪第30/31条·自首第67条·立功第68条标建议复核；所有具体罪名一律以构成要件描述 + `[条号待验证]` 呈现，绝不臆造具体罪名条号与法定刑档；定罪量刑数额描述规则不写裸数额。不提供规避侦查或逃避责任方法护栏贯穿，涉案应对子技能须显式声明合规边界。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - unit-crime-constitution（单位犯罪构成识别）：覆盖现纲要「法律分析」中单位犯罪构成维度并深化。**单位犯罪定义**（公司·企业·事业单位·机关·团体实施、法律规定为单位犯罪的应负刑事责任=刑法第30条 建议复核）；**双罚制**（对单位判处罚金，并对直接负责的主管人员和其他直接责任人员判刑；分则另有规定依规定=第31条 建议复核）；**单位犯罪与自然人犯罪区分**（以单位名义·为单位利益·违法所得归单位三要素）；**借单位之名个人犯罪的区分**（盗用单位名义·违法所得归个人不构成单位犯罪）。深化：单位犯罪构成要件表（主体/客观/主观/法益）、单位犯罪vs自然人犯罪识别表（三要素对照）、单位犯罪责任人员范围表（直接负责主管人员·其他直接责任人员）、单刑制与双罚制区分（分则另有规定情形描述）。**按服务立场区分**：预防立场关注构成识别防范，辩护立场关注不构成单位犯罪/责任切割。引用单位犯罪定义第30条·双罚制第31条（建议复核）。边界条件：单位人格否认、一人公司、单位犯罪与共同犯罪、为单位利益的认定。错误处理含涉案识别强制升级辩护律师。
    - common-unit-crime-types（常见单位犯罪类型）：覆盖现纲要「需求收集 + 法律分析」中罪名类型维度并深化。按类别梳理单位可构成的常见罪名——走私类、金融类（非法吸收公众存款·集资诈骗·操纵市场）、税收类（虚开增值税专用发票·逃税）、商业贿赂类（单位行贿·对非国家工作人员行贿·对单位行贿）、扰乱市场秩序类（非法经营·合同诈骗·串通投标·假冒注册商标）、环境类（污染环境）、安全生产类（重大责任事故·重大劳动安全事故）。深化：各类别罪名构成要件速查表（罪名/保护法益/客观行为/主体单位或自然人/主观要件/定罪量刑数额「描述规则·待验证」），每类至少 1-2 个代表罪名。**所有具体罪名条号一律 `[条号待验证]`，以构成要件描述呈现，定罪量刑数额描述规则不写裸数额。** **按服务立场区分**：预防立场用于识别本企业可能触及类型，辩护立场用于构成要件比对。引用单位犯罪第30/31条（建议复核）、各具体罪名构成要件（_shared 引用库，条号待验证）。边界条件：单位能否构成某罪（部分罪名仅自然人可构成）、罪名竞合、新型业务罪名定性不明（待验证 + 升级）。错误处理含涉嫌具体罪名强制升级辩护律师。
    - internal-control-prevention（内控与防范机制）：覆盖现纲要「法律分析 + 输出生成」中防范维度并深化。**事前防范**（合规制度·审批流程·业务留痕·禁止性行为清单·合规承诺）；**重点环节风险控制**（采购销售·财务税务·关联交易·对外捐赠赞助·招投标）；**岗位制衡与举报机制**（不相容岗位分离·内部举报·合规调查）。深化：重点环节风险控制表（环节/刑事风险/控制措施/责任部门）、禁止性行为清单模板（红线行为）、岗位制衡与举报机制要点表、内控有效性自查清单。**与 compliance-system-building 衔接说明**（本子技能聚焦单位犯罪防范的内控要点，体系化建设见 compliance-system-building）。**按服务立场区分**：预防立场为主要场景，输出可落地内控建议。引用单位犯罪双罚制第31条（建议复核，责任人员防范）、涉案企业合规有效合规要点（规范性文件描述·待验证）。边界条件：内控形式化风险、成本与效益、中小企业内控简化。错误处理含发现已发生风险事件的强制升级。
    - incident-response（涉案应对）：覆盖现纲要「输出生成」中涉案维度并深化。**单位涉嫌犯罪后的应对**——**配合调查的合规边界**（如实说明·提供材料·配合调查，**绝不伪造或毁灭证据·串供·转移资产逃避责任·对抗调查**）；**自首与立功**（单位自首·如实供述·检举立功=刑法第67/68条 建议复核，争取从宽）；**单位与责任人员的责任切割**（区分单位行为与个人行为·责任人员范围抗辩）；与合规不起诉路径衔接（涉案企业合规整改争取从宽，路由 non-prosecution）。深化：涉案应对步骤表（阶段/合规可为/合规边界 不可为）、配合调查合规边界清单表（可为：如实供述配合·依法整改 / 不可为：伪造毁灭证据·串供·转移资产·对抗调查）、自首立功认定与从宽要点表、责任切割抗辩要点。**本子技能须在显著位置声明：本插件不提供任何规避侦查·伪造毁灭证据·逃避法律责任的方法；合规的唯一正道是依法整改·如实供述·认罪认罚争取从宽。** **涉案应对一律强制升级执业刑事辩护律师，本插件输出仅作合规研究与初步分析，不替代辩护律师工作。** **按服务立场区分**：辩护立场聚焦责任切割与从宽，但护栏不可被立场覆盖。引用自首第67条·立功第68条·单位犯罪第30/31条（建议复核）、认罪认罚从宽第15条（建议复核，跨引）、涉案企业合规整改从宽（规范性文件描述·待验证）。边界条件：调查阶段不同（初查·立案·强制措施）的应对差异、个人与单位利益冲突、行刑衔接。错误处理含一律强制升级辩护律师、识别规避侦查需求即拒绝（合规边界）。
  </action>
  <verify>
    <automated>for d in unit-crime-constitution common-unit-crime-types internal-control-prevention incident-response; do f="criminal-compliance/skills/corporate-crime/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第30条\|单位犯罪' criminal-compliance/skills/corporate-crime/unit-crime-constitution/SKILL.md && grep -q '罪名\|构成要件' criminal-compliance/skills/corporate-crime/common-unit-crime-types/SKILL.md && grep -q '内控\|防范\|禁止性' criminal-compliance/skills/corporate-crime/internal-control-prevention/SKILL.md && grep -q '强制升级\|辩护\|合规边界\|规避侦查' criminal-compliance/skills/corporate-crime/incident-response/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 criminal-compliance/skills/corporate-crime/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name kebab-case + description + argument-hint），含章节：目的、前置（含服务立场 + 是否已涉案 + 涉刑强制升级护栏 + 合规边界护栏读取）、详细步骤、检查清单、输出模板、边界条件、错误处理（含涉案强制升级、合规边界拒绝）、## 法律依据，且每个 ≥100 非空行
    - unit-crime-constitution 含单位犯罪定义第30条与双罚制第31条与责任人员范围；common-unit-crime-types 含七类罪名构成要件描述（具体罪名条号待验证）；internal-control-prevention 含重点环节风险控制与禁止性行为清单；incident-response 含配合调查合规边界与自首立功第67/68条与责任切割与强制升级辩护律师
    - incident-response 显著声明不提供规避侦查/伪造毁灭证据/逃避责任方法、合规边界（可为/不可为）清晰、涉案一律强制升级辩护律师
    - 单位犯罪第30/31条·自首第67条·立功第68条标建议复核；所有具体罪名构成要件描述 + 条号待验证、定罪量刑数额描述规则不写裸数额；涉案企业合规规范性文件描述规则不硬写文号；无臆造具体罪名条号与法定刑档
    - 法律依据按来源分类引用 _shared 库并标待验证；所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>corporate-crime 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；unit-crime-constitution 单位犯罪构成识别、common-unit-crime-types 常见单位犯罪类型、internal-control-prevention 内控与防范机制、incident-response 涉案应对（合规边界 + 强制升级辩护律师）；单位犯罪30/31与自首67立功68标建议复核、具体罪名构成要件描述 + 条号待验证、不提供规避侦查方法护栏贯穿；法律依据按来源分类引用 _shared 库标待验证、无臆造。</done>
</task>

<task type="auto">
  <name>Task 3: 改造 non-prosecution/SKILL.md 与 corporate-crime/SKILL.md 为编排入口</name>
  <read_first>
    - criminal-compliance/skills/non-prosecution/SKILL.md（现有浅骨架 — 改造对象）
    - criminal-compliance/skills/corporate-crime/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 1 / Task 2 产出的八个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - construction-legal/skills/payment-dispute/SKILL.md（最近一次编排入口范式 — 风格参照）
    - criminal-compliance/CLAUDE.md（09-01 产出 — 配置模板）
    - criminal-compliance/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 09-03 统一更新）
  </read_first>
  <files>
    criminal-compliance/skills/non-prosecution/SKILL.md,
    criminal-compliance/skills/corporate-crime/SKILL.md
  </files>
  <action>
    将两个主技能 SKILL.md 各改造为编排入口，结构对称（参照 contract-review / payment-dispute 编排入口范式）。每个：保留 frontmatter（name 不变，更新 description 说明现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/<主技能>/<子技能名>/SKILL.md）；(2) 目的与整体流程概览；(3) 前置：加载**服务立场**——读取 criminal-compliance/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /criminal-compliance:cold-start-interview 或说「临时模式」），含临时模式段落（non-prosecution 默认合规不起诉立场且若未涉案提示先评估适用性；corporate-crime 默认事前预防立场；律师角色、合规严格度保守、**是否已涉案按用户陈述逐案判断且识别涉案即强制升级**、标 `[临时模式]`）；(4) 子技能编排顺序表——逐行说明该子技能做什么、对应子技能路径、可单独触发的斜杠命令（/criminal-compliance:<name>）+ 顺序说明；(5) 入口级护栏：企业画像确认（从 ## 我们是谁 读取）、**服务立场加载（从 ## 合规与服务立场，强调立场决定侧重）**、**涉案情形识别（已立案/强制措施/可能构成具体罪名/重大涉案即强制升级刑事辩护律师，本插件不替代辩护工作）**、**合规预防与辩护立场护栏**、**不提供规避侦查或逃避责任方法护栏（识别此类需求即拒绝并提示依法整改如实供述认罪认罚）**、目的地/特权检查（面向检察机关/公安/第三方监督评估时特权失效）、地方涉案企业合规试点提示。

    具体编排顺序：
    - non-prosecution（合规不起诉方案）：适用条件评估 → 合规计划制定 → 第三方监督评估配合 → 不起诉申请与听证；description 概述四子技能；前置强调需先确认是否已涉案与适用条件。
    - corporate-crime（单位犯罪预防）：单位犯罪构成识别 → 常见单位犯罪类型 → 内控与防范机制 → 涉案应对；description 概述四子技能；前置强调预防为主、涉案应对须强制升级辩护律师。

    不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>n=criminal-compliance/skills/non-prosecution/SKILL.md; c=criminal-compliance/skills/corporate-crime/SKILL.md; grep -q '^name: non-prosecution' "$n" && grep -q 'applicability-assessment' "$n" && grep -q 'compliance-plan' "$n" && grep -q 'third-party-monitoring' "$n" && grep -q 'application-hearing' "$n" && grep -q '临时模式' "$n" && grep -q '涉案\|强制升级\|辩护' "$n" && grep -q '规避侦查\|依法整改\|合规边界' "$n" && grep -q '^name: corporate-crime' "$c" && grep -q 'unit-crime-constitution' "$c" && grep -q 'common-unit-crime-types' "$c" && grep -q 'internal-control-prevention' "$c" && grep -q 'incident-response' "$c" && grep -q '临时模式' "$c" && grep -q '涉案\|强制升级\|辩护' "$c" && grep -q '规避侦查\|依法整改\|合规边界' "$c"</automated>
  </verify>
  <acceptance_criteria>
    - non-prosecution/SKILL.md 与 corporate-crime/SKILL.md 仍各有 frontmatter（name 不变），description 更新为编排说明
    - 各正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/criminal-compliance:<name>）
    - 各保留入口级护栏：加载实践配置 + 临时模式（涉案即强制升级）、企业画像确认、服务立场加载、涉案情形识别与强制升级刑事辩护律师、合规预防与辩护立场护栏、不提供规避侦查或逃避责任方法护栏、目的地/特权检查、地方涉案企业合规试点提示
    - non-prosecution 编排顺序为 适用条件评估→合规计划制定→第三方监督评估配合→不起诉申请与听证；corporate-crime 编排顺序为 单位犯罪构成识别→常见单位犯罪类型→内控与防范机制→涉案应对
    - 各顶部含一行迁移说明指向子技能；无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>non-prosecution 与 corporate-crime 两个主技能 SKILL.md 各成为指向四个子技能的编排入口，入口级护栏（服务立场确认、企业画像、涉案情形强制升级刑事辩护律师、合规预防与辩护立场护栏、不提供规避侦查方法护栏、临时模式、特权检查、地方试点提示）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 八个子技能（non-prosecution 4 + corporate-crime 4）+ 两个编排入口全部存在且格式合规
- non-prosecution 覆盖适用条件评估（第177条/第15条/涉案企业合规适用条件描述）、合规计划制定、第三方监督评估配合（规则描述不硬写文号）、不起诉申请与听证；corporate-crime 覆盖单位犯罪构成识别（第30/31条）、常见单位犯罪类型（构成要件描述）、内控与防范机制、涉案应对（合规边界 + 自首67立功68 + 强制升级辩护律师）
- 现有 non-prosecution / corporate-crime 浅骨架三步纲要无丢失迁移并大幅深化（每个子技能 150+ 行）
- 中度把握锚点（单位犯罪30/31·自首67·立功68·缓刑72·不起诉177·认罪认罚15）标「建议复核」；具体罪名一律构成要件描述 + `[条号待验证]`；定罪量刑数额描述规则不写裸数额；涉案企业合规规范性文件描述规则不硬写文号；司法解释条号、案例案号均标 `[待验证]`，无臆造具体罪名条号与法定刑档
- 刑事合规护栏（合规预防与辩护立场/不提供规避侦查或逃避责任方法/涉刑强制升级刑事辩护律师/律师审查）贯穿八个子技能与两个编排入口，incident-response 与各涉案处显式声明合规边界
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('criminal-compliance/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/合规官/法务可单独触发任一合规不起诉子能力与任一单位犯罪预防子能力（8 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容，并按服务立场调整侧重、贯穿涉刑强制升级与合规边界护栏
- 刑事合规法律引用按 法条/司法解释/规范性文件 与 案例/学说 分类并标待验证；中度把握锚点明确呈现并标建议复核；具体罪名构成要件描述 + 条号待验证；涉案企业合规规范性文件描述规则不硬写文号
- non-prosecution 与 corporate-crime 编排入口各指向四个子技能且护栏无丢失
- incident-response 子技能显著声明不提供规避侦查/逃避责任方法、合规边界清晰、涉案强制升级辩护律师
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/09-criminal-compliance/09-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
