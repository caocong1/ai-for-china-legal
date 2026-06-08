---
phase: 03-litigation-legal-core
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - litigation-legal/skills/defense-drafting/defense-strategy/SKILL.md
  - litigation-legal/skills/defense-drafting/jurisdiction-objection/SKILL.md
  - litigation-legal/skills/defense-drafting/substantive-defense/SKILL.md
  - litigation-legal/skills/defense-drafting/procedural-limitation-defense/SKILL.md
  - litigation-legal/skills/defense-drafting/defense-assembly/SKILL.md
  - litigation-legal/skills/defense-drafting/SKILL.md
  - litigation-legal/skills/evidence-management/evidence-collection/SKILL.md
  - litigation-legal/skills/evidence-management/three-properties-review/SKILL.md
  - litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md
  - litigation-legal/skills/evidence-management/evidence-exchange/SKILL.md
  - litigation-legal/skills/evidence-management/SKILL.md
autonomous: true
requirements:
  - DEFENSE-DECOMP
  - EVIDENCE-DECOMP
user_setup: []

must_haves:
  truths:
    - "律师可以单独触发答辩状起草的任一子能力（答辩策略/管辖权异议/实体抗辩/程序与时效抗辩/答辩状装配）而无需运行整个起草流程"
    - "律师可以单独触发证据管理的任一子能力（证据收集与保管链/三性审查/证据目录编制/举证期限与证据交换）而无需运行整个流程"
    - "每个子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据"
    - "证据目录三大类强制分组规则（基础交易关系/法律关系及索赔事实/被告违约事实）无丢失，flat list 不满足质量闸门的硬门禁保留"
    - "答辩状装配子技能与 defense/jurisdiction/substantive/procedural 子技能协调输出完整答辩文件，研究闸门前置保留"
    - "程序与时效抗辩子技能引用诉讼时效（民法典188条）与举证期限/答辩期（民诉法15日），仲裁场景识别或裁或审、仲裁协议独立性"
  artifacts:
    - path: "litigation-legal/skills/defense-drafting/defense-strategy/SKILL.md"
      provides: "答辩策略选择子技能（实体/程序/反诉路线决策）"
      min_lines: 50
    - path: "litigation-legal/skills/defense-drafting/jurisdiction-objection/SKILL.md"
      provides: "管辖权异议子技能（级别/地域/专属管辖审查 + 异议申请书）"
      contains: "## 法律依据"
      min_lines: 50
    - path: "litigation-legal/skills/defense-drafting/substantive-defense/SKILL.md"
      provides: "实体抗辩起草子技能（承认/否认/抗辩 + 事实抗辩 + 法律抗辩）"
      min_lines: 60
    - path: "litigation-legal/skills/defense-drafting/procedural-limitation-defense/SKILL.md"
      provides: "程序抗辩与诉讼时效抗辩子技能"
      contains: "第188条"
      min_lines: 50
    - path: "litigation-legal/skills/defense-drafting/defense-assembly/SKILL.md"
      provides: "答辩状装配子技能（按法院格式组装 + 证据清单 + 交付前检查）"
      min_lines: 50
    - path: "litigation-legal/skills/defense-drafting/SKILL.md"
      provides: "答辩状起草编排入口（指向五子技能 + 研究闸门前置 + 护栏）"
      min_lines: 40
    - path: "litigation-legal/skills/evidence-management/evidence-collection/SKILL.md"
      provides: "证据收集与保管链子技能"
      min_lines: 50
    - path: "litigation-legal/skills/evidence-management/three-properties-review/SKILL.md"
      provides: "证据三性审查子技能（真实性/合法性/关联性 + 电子数据）"
      contains: "## 法律依据"
      min_lines: 60
    - path: "litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md"
      provides: "三大类证据目录编制子技能（强制分组硬门禁）"
      contains: "第一类"
      min_lines: 60
    - path: "litigation-legal/skills/evidence-management/evidence-exchange/SKILL.md"
      provides: "举证期限与证据交换子技能"
      contains: "举证期限"
      min_lines: 50
    - path: "litigation-legal/skills/evidence-management/SKILL.md"
      provides: "证据管理编排入口（指向四子技能 + 研究闸门前置 + 硬门禁）"
      min_lines: 40
  key_links:
    - from: "litigation-legal/skills/defense-drafting/procedural-limitation-defense/SKILL.md"
      to: "litigation-legal/skills/_shared/civil-procedure-citations.md"
      via: "引用诉讼时效与答辩期/举证期限条文"
      pattern: "civil-procedure-citations|第188条"
    - from: "litigation-legal/skills/evidence-management/three-properties-review/SKILL.md"
      to: "litigation-legal/skills/_shared/civil-procedure-citations.md"
      via: "引用民事诉讼证据规定"
      pattern: "civil-procedure-citations|证据"
    - from: "litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md"
      to: "shared/references/document-structures.md"
      via: "引用证据目录三大类模板"
      pattern: "document-structures|第一类|第二类|第三类"
    - from: "litigation-legal/skills/defense-drafting/SKILL.md"
      to: "五个答辩子技能"
      via: "编排入口指向子技能"
      pattern: "defense-strategy|jurisdiction-objection|substantive-defense|procedural-limitation-defense|defense-assembly"
    - from: "litigation-legal/skills/evidence-management/SKILL.md"
      to: "四个证据子技能"
      via: "编排入口指向子技能"
      pattern: "evidence-collection|three-properties-review|evidence-catalog|evidence-exchange"
---

<objective>
按 CONTEXT「深层子技能拆分」决策，将答辩状起草（defense-drafting）与证据管理（evidence-management）从扁平技能深化拆分为可独立触发的子技能。

本计划交付：
1. **答辩状起草拆分** — 拆为五个子技能：答辩策略选择 / 管辖权异议 / 实体抗辩起草 / 程序抗辩与时效抗辩 / 答辩状装配。现有 defense-drafting/SKILL.md 的内容（答辩类型选择、答辩要点、法律依据检索、答辩状格式模板、研究闸门前置）深化迁移到对应子技能，补充每个子技能的详细步骤、检查清单、输出模板、边界条件、错误处理与按来源分类的法律依据；原 SKILL.md 改为编排入口。
2. **证据管理拆分** — 拆为四个子技能：证据收集与保管链 / 三性审查 / 三大类证据目录编制 / 举证期限与证据交换。现有 evidence-management/SKILL.md 的内容（证据收集、证据分类、三性审查、三大类证据目录强制分组硬门禁、证据交换准备、研究闸门前置）深化迁移；原 SKILL.md 改为编排入口。**证据目录三大类强制分组与「flat list 不满足质量闸门」的硬门禁必须无丢失保留。**

Purpose: 关闭「CONTEXT envisions 深度子技能拆分，现实答辩/证据仍是扁平技能」的 gap。本计划与 03-01 无文件重叠（不改 matter-intake / _shared / plugin.json），可并行；引用 03-01 产出的 _shared 引用脊柱（同 wave 内，执行时若 _shared 尚未生成则以 commercial-legal/_shared 结构为参照并在路径上指向 litigation-legal/_shared）。
Output: 5 个答辩子技能 + 4 个证据子技能 + 2 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md）：成文法为主（民事诉讼法2023修正、仲裁法、最高法《关于民事诉讼证据的若干规定》、民法典诉讼时效）；指导性案例作参考非判例法；法院四级层级 + 仲裁机构识别；执业环境适配。命名 kebab-case；斜杠命令 /litigation-legal:<skill>。文件格式：JSON 2 空格缩进、换行结尾、无尾部空格、表格列数一致。

法律内容硬性要求：引用按 法条/案例/学说 分类 + 来源标签；不确定条号一律标 `[待验证]`，不臆造条号。已核实锚点：诉讼时效一般3年=《民法典》第188条；普通程序举证期限/答辩期15日=民事诉讼法；仲裁协议独立性、或裁或审=仲裁法。其余条号若非高度确信，标 `[待验证]`。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/phases/03-litigation-legal-core/03-CONTEXT.md
@CLAUDE.md
@litigation-legal/CLAUDE.md
@litigation-legal/skills/defense-drafting/SKILL.md
@litigation-legal/skills/evidence-management/SKILL.md
@litigation-legal/.claude-plugin/plugin.json
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@shared/references/document-structures.md
@shared/references/subject-qualification-traps.md
@shared/research-gate/SKILL.md
@shared/research-gate/references/quality-gates.md
@shared/research-gate/references/search-playbooks.md
---
03-01 产出（同 wave，执行时优先复用；路径在 litigation-legal/skills/_shared/ 下）：
- litigation-legal/skills/_shared/legal-basis-conventions.md
- litigation-legal/skills/_shared/civil-procedure-citations.md
- litigation-legal/skills/_shared/practice-profile-schema.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 defense-drafting 为五个可独立触发的子技能</name>
  <read_first>
    - litigation-legal/skills/defense-drafting/SKILL.md（现有 — 全部内容；拆分迁移源与质量基准：研究闸门前置、答辩策略（实体/程序/反诉）、答辩要点、法律依据检索、答辩状格式模板、证据清单表）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能范式：目的/详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据 七段结构与表格风格）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（03-01 产出 — 民诉法/仲裁法/时效引用库）
    - litigation-legal/skills/_shared/legal-basis-conventions.md（03-01 产出 — 引用规范）
    - litigation-legal/CLAUDE.md（实践配置 — 角色倾向、文书风格、输出工作产物标题）
    - shared/references/document-structures.md（答辩状 / 代理意见结构模板 + 起诉策略对比 + 管辖条文表）
    - shared/research-gate/SKILL.md（研究闸门 — 前置必跑）
    - CLAUDE.md（命名约定；文件格式）
  </read_first>
  <files>
    litigation-legal/skills/defense-drafting/defense-strategy/SKILL.md,
    litigation-legal/skills/defense-drafting/jurisdiction-objection/SKILL.md,
    litigation-legal/skills/defense-drafting/substantive-defense/SKILL.md,
    litigation-legal/skills/defense-drafting/procedural-limitation-defense/SKILL.md,
    litigation-legal/skills/defense-drafting/defense-assembly/SKILL.md
  </files>
  <action>
    将现有 defense-drafting/SKILL.md 深化拆分为五个子技能，每个独立 SKILL.md，含 YAML frontmatter（name kebab-case：defense-strategy / jurisdiction-objection / substantive-defense / procedural-limitation-defense / defense-assembly；description；argument-hint）。每个子技能 MUST 含：目的、前置（研究闸门 shared/research-gate/SKILL.md 提示 + 读取 litigation-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（按 法条/案例/学说 分类，引用 _shared/civil-procedure-citations.md，标待验证）。每个子技能在前置中说明：可被 defense-drafting 编排入口调用，也可由律师单独触发（/litigation-legal:<name>）。

    分工：
    - defense-strategy（答辩策略选择）：从对方起诉状/仲裁申请与案件事实，决策答辩路线——实体答辩（承认/否认/抗辩）、程序抗辩（管辖权异议/诉讼时效）、是否反诉。输出=答辩策略决策表（争议请求逐项 → 拟采路线 → 优先级）。从配置文件角色倾向加载我方立场。边界条件：仲裁案件须先识别仲裁协议有效性与或裁或审（一裁终局），避免错误提管辖权异议；缺对方起诉状时停下索取。
    - jurisdiction-objection（管辖权异议）：审查级别管辖（基层/中院/高院/最高院）+ 地域管辖（被告住所地/合同履行地/专属管辖）+ 约定管辖效力，判断是否提管辖权异议及胜算，生成管辖权异议申请书。引用 document-structures.md 管辖条文表。边界条件：答辩期内提出（民诉法规定的异议期，条号不确信标待验证）；过期则丧失；仲裁场景改为仲裁管辖/仲裁协议效力异议路径。
    - substantive-defense（实体抗辩起草）：针对原告每项诉讼请求逐条起草实体抗辩——承认/部分承认/否认 + 事实抗辩 + 法律抗辩（请求权基础不成立、合同无效/可撤销、已履行/抵销、违约金过高请求调整等）。引用 _shared 引用库的实体法条（民法典相关）。输出=逐项请求回应表 + 抗辩理由段落示意。
    - procedural-limitation-defense（程序抗辩与诉讼时效抗辩）：诉讼时效抗辩（一般3年=《民法典》第188条；起算点、中止中断、最长保护期间，提示可调用 limitation-monitoring 深度分析）+ 其他程序抗辩（主体不适格、重复起诉、未经前置程序等）+ 答辩期与举证期限把控（民诉法15日为锚，具体条号不确信标待验证）。边界条件：时效抗辩须由当事人主动提出（法院不主动适用），错过即视为放弃，必须显著提示。
    - defense-assembly（答辩状装配）：将策略 + 管辖异议（如有）+ 实体抗辩 + 程序时效抗辩组装为完整答辩状（按 document-structures.md 答辩状结构 + 法院格式：答辩人/被答辩人/案由/答辩请求/事实与理由/证据清单/此致法院/签名日期）+ 交付前质量检查（特权标题、研究闸门是否完成、引用是否标待验证）+ 下一步决策树。从配置文件 ## 输出 读工作产物标题与文书风格。
    遵守文件格式约定。文书模板用 markdown 结构示意（沿用现有 SKILL.md 风格）。
  </action>
  <verify>
    <automated>for d in defense-strategy jurisdiction-objection substantive-defense procedural-limitation-defense defense-assembly; do f="litigation-legal/skills/defense-drafting/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '## 法律依据' litigation-legal/skills/defense-drafting/jurisdiction-objection/SKILL.md && grep -q '第188条' litigation-legal/skills/defense-drafting/procedural-limitation-defense/SKILL.md && grep -q '答辩请求\|答辩人' litigation-legal/skills/defense-drafting/defense-assembly/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 五个子技能 SKILL.md 全部存在，路径 litigation-legal/skills/defense-drafting/<kebab-name>/SKILL.md，frontmatter name 正确
    - 每个子技能含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（法条/案例/学说 分类、标待验证）
    - 每个子技能在前置中保留研究闸门 shared/research-gate/SKILL.md 提示
    - procedural-limitation-defense 引用《民法典》第188条（时效3年）并显著提示「时效抗辩须当事人主动提出、法院不主动适用」
    - jurisdiction-objection 含级别/地域/专属管辖审查 + 管辖权异议申请书模板，并处理仲裁场景
    - defense-assembly 含完整答辩状结构 + 交付前质量检查 + 下一步决策树
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>defense-drafting 拆为五个可独立触发的子技能；研究闸门前置与现有答辩深度内容无丢失迁移；时效抗辩引用民法典188条并提示主动提出规则；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 2: 改造 defense-drafting/SKILL.md 为编排入口</name>
  <read_first>
    - litigation-legal/skills/defense-drafting/SKILL.md（现有 — 改造对象）
    - 本计划 Task 1 产出的五个子技能 SKILL.md（确认路径与触发名）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - shared/research-gate/SKILL.md（研究闸门 — 入口级前置护栏）
  </read_first>
  <files>
    litigation-legal/skills/defense-drafting/SKILL.md
  </files>
  <action>
    改造为编排入口：保留 frontmatter（name: defense-drafting，更新 description 为编排说明）。正文：(1) 顶部迁移说明 + 研究闸门前置（除非用户明确豁免联网检索，先跑 shared/research-gate/SKILL.md）；(2) 目的与整体答辩起草流程概览；(3) 子技能编排顺序表——答辩策略选择 → 管辖权异议（如适用）→ 实体抗辩起草 → 程序抗辩与时效抗辩 → 答辩状装配，逐行说明职责/路径（skills/defense-drafting/<name>/SKILL.md）/可单独触发（/litigation-legal:<name>）；(4) 入口级护栏：研究闸门、加载实践配置文件（角色倾向/文书风格，含临时模式）、事项上下文加载、答辩期把控提示、特权/目的地检查。无语义丢失。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=litigation-legal/skills/defense-drafting/SKILL.md; grep -q '^name: defense-drafting' "$f" && grep -q 'research-gate' "$f" && grep -q 'defense-strategy' "$f" && grep -q 'jurisdiction-objection' "$f" && grep -q 'substantive-defense' "$f" && grep -q 'procedural-limitation-defense' "$f" && grep -q 'defense-assembly' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - defense-drafting/SKILL.md 仍有 frontmatter name: defense-drafting，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向五个子技能路径并说明可单独触发
    - 保留研究闸门前置 + 加载实践配置文件 + 临时模式 + 事项上下文 + 特权检查护栏
    - 顶部含迁移说明
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>defense-drafting/SKILL.md 成为指向五个子技能的编排入口，研究闸门与入口级护栏保留。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 evidence-management 为四个可独立触发的子技能</name>
  <read_first>
    - litigation-legal/skills/evidence-management/SKILL.md（现有 — 全部内容；拆分迁移源与质量基准：研究闸门前置、证据收集、证据分类四类表、三性审查 checklist、证据目录三大类强制分组硬门禁、证据交换准备）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能范式）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（03-01 产出 — 证据规定/民诉法引用库）
    - litigation-legal/skills/_shared/legal-basis-conventions.md（03-01 产出 — 引用规范）
    - shared/references/document-structures.md（证据目录模板 — 三大类分组）
    - shared/research-gate/SKILL.md（研究闸门）
    - litigation-legal/CLAUDE.md（实践配置 — 文书风格、输出）
    - CLAUDE.md（命名；文件格式）
  </read_first>
  <files>
    litigation-legal/skills/evidence-management/evidence-collection/SKILL.md,
    litigation-legal/skills/evidence-management/three-properties-review/SKILL.md,
    litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md,
    litigation-legal/skills/evidence-management/evidence-exchange/SKILL.md
  </files>
  <action>
    将现有 evidence-management/SKILL.md 深化拆分为四个子技能，每个独立 SKILL.md，含 frontmatter（name kebab-case：evidence-collection / three-properties-review / evidence-catalog / evidence-exchange；description；argument-hint）。每个子技能 MUST 含：目的、前置（研究闸门提示 + 读取 litigation-legal/CLAUDE.md + 引用 _shared 规范/引用库 + 证据目录引用 document-structures.md）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（法条/案例/学说 分类，引用证据规定/民诉法，标待验证）。每个子技能说明可被 evidence-management 编排入口调用，也可单独触发。

    分工：
    - evidence-collection（证据收集与保管链）：迁移「第一步 证据收集」（合同/邮件/微信短信/财务凭证/证人证言/鉴定意见等清单）+ 深化电子数据取证与保管链（chain of custody：来源、提取方式、完整性校验、是否公证/区块链存证）。边界条件：电子数据须说明取证合法性（不得非法获取）；缺原件时标记原件核对风险。
    - three-properties-review（三性审查）：迁移「第三步 证据审查」三性 checklist，深化为逐证据的 真实性/合法性/关联性 三性逐项分析表 + 证明力评估 + 对方证据质证要点。引用最高法《关于民事诉讼证据的若干规定》（条号不确信标待验证）+ 举证责任分配（谁主张谁举证为原则）。边界条件：非法证据（如偷录侵犯他人合法权益）合法性存疑须标记；电子数据真实性审查要点。
    - evidence-catalog（三大类证据目录编制）：迁移「第四步 编制证据目录」**完整保留三大类强制分组硬门禁**（第一类 基础交易关系类 / 第二类 法律关系及索赔事实类 / 第三类 被告违约事实类，每类至少1项，缺类视为质量闸门不通过；「flat list 不分组不满足质量闸门」硬门禁必须保留）。引用 document-structures.md 证据目录模板。输出=三大类分组证据目录表（序号/证据名称/证据类型/证明目的/页码/备注）。边界条件：某类无证据时不得伪造，标记缺类并提示补强方向。
    - evidence-exchange（举证期限与证据交换）：迁移「第五步 证据交换准备」+ 深化举证期限管理（普通程序举证期限以民诉法为锚，逾期举证后果——可能不被采纳或承担费用，条号不确信标待验证）+ 证据交换/质证准备 + 申请调查取证/证据保全/鉴定的时点。边界条件：举证期限届满前未提交的证据须评估逾期举证风险；新证据须说明逾期正当理由。
    遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in evidence-collection three-properties-review evidence-catalog evidence-exchange; do f="litigation-legal/skills/evidence-management/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '真实性' litigation-legal/skills/evidence-management/three-properties-review/SKILL.md && grep -q '合法性' litigation-legal/skills/evidence-management/three-properties-review/SKILL.md && grep -q '关联性' litigation-legal/skills/evidence-management/three-properties-review/SKILL.md && grep -q '第一类' litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md && grep -q '第二类' litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md && grep -q '第三类' litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md && grep -q '举证期限' litigation-legal/skills/evidence-management/evidence-exchange/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径 litigation-legal/skills/evidence-management/<kebab-name>/SKILL.md，frontmatter name 正确
    - 每个子技能含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（法条/案例/学说 分类、标待验证）
    - three-properties-review 含 真实性/合法性/关联性 三性逐项分析并引用证据规定
    - evidence-catalog 完整保留三大类强制分组（第一类/第二类/第三类）+「flat list 不满足质量闸门」硬门禁
    - evidence-exchange 含举证期限管理与逾期举证后果
    - 每个子技能前置保留研究闸门提示
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>evidence-management 拆为四个可独立触发的子技能；三大类证据目录强制分组硬门禁无丢失保留；三性审查与举证期限深化；法律依据引用证据规定/民诉法并标待验证。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 evidence-management/SKILL.md 为编排入口</name>
  <read_first>
    - litigation-legal/skills/evidence-management/SKILL.md（现有 — 改造对象，注意保留三大类硬门禁的入口级提示）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - shared/research-gate/SKILL.md（研究闸门）
  </read_first>
  <files>
    litigation-legal/skills/evidence-management/SKILL.md
  </files>
  <action>
    改造为编排入口：保留 frontmatter（name: evidence-management，更新 description 为编排说明）。正文：(1) 顶部迁移说明 + 研究闸门前置；(2) 目的与整体证据管理流程概览；(3) 子技能编排顺序表——证据收集与保管链 → 三性审查 → 三大类证据目录编制 → 举证期限与证据交换，逐行说明职责/路径/可单独触发；(4) 入口级护栏：研究闸门、**三大类证据目录强制分组硬门禁的入口级提示**（细节在 evidence-catalog 子技能，但入口须保留「证据目录必须三大类分组、flat list 不满足质量闸门」这一句护栏）、加载实践配置文件、事项上下文。无语义丢失。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=litigation-legal/skills/evidence-management/SKILL.md; grep -q '^name: evidence-management' "$f" && grep -q 'research-gate' "$f" && grep -q 'evidence-collection' "$f" && grep -q 'three-properties-review' "$f" && grep -q 'evidence-catalog' "$f" && grep -q 'evidence-exchange' "$f" && grep -q '三大类\|分组' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - evidence-management/SKILL.md 仍有 frontmatter name: evidence-management，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发
    - 保留研究闸门前置 + 三大类证据目录强制分组硬门禁入口级提示 + 加载实践配置文件 + 事项上下文护栏
    - 顶部含迁移说明
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>evidence-management/SKILL.md 成为指向四个子技能的编排入口，研究闸门与三大类硬门禁入口级提示保留。</done>
</task>

</tasks>

<verification>
- 五个答辩子技能 + 四个证据子技能 + 两个编排入口全部存在且格式合规
- 答辩与证据现有深度内容无丢失迁移（答辩策略/管辖/实体/程序时效抗辩、三性审查、三大类证据目录硬门禁、举证期限）
- 时效抗辩引用《民法典》第188条；不确定条号均标 `[待验证]`，无臆造条号
- 研究闸门前置在两个编排入口与各起草子技能保留
- JSON/YAML 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('litigation-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师可单独触发任一答辩/证据子能力（9 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据
- 法律引用按 法条/案例/学说 分类并标待验证；时效3年/举证期限/仲裁规则锚点正确
- 证据目录三大类强制分组硬门禁无丢失
- 两个编排入口指向各自子技能且研究闸门与护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/03-litigation-legal-core/03-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
