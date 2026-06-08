---
phase: 02-commercial-legal-core
plan: 03
type: execute
wave: 2
depends_on:
  - 02-01
  - 02-02
files_modified:
  - commercial-legal/skills/contract-drafting/requirements-intake/SKILL.md
  - commercial-legal/skills/contract-drafting/framework-design/SKILL.md
  - commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md
  - commercial-legal/skills/contract-drafting/risk-self-check/SKILL.md
  - commercial-legal/skills/contract-drafting/output-generation/SKILL.md
  - commercial-legal/skills/contract-drafting/SKILL.md
  - commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md
  - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
  - commercial-legal/skills/liability-analysis/damages-scope/SKILL.md
  - commercial-legal/skills/liability-analysis/carveout-review/SKILL.md
  - commercial-legal/skills/liability-analysis/SKILL.md
  - commercial-legal/.claude-plugin/plugin.json
autonomous: true
requirements:
  - DRAFTING-DECOMP
  - LIABILITY-DECOMP
  - PLUGIN-REGISTRATION
user_setup: []

must_haves:
  truths:
    - "律师可以单独触发合同起草的任一子能力（需求收集/框架设计/条款起草/风险自查/输出生成）"
    - "律师可以单独触发违约责任分析的任一子能力（责任限制/违约金评估/赔偿范围/例外清单）"
    - "起草与违约责任分析的每个子技能含详细步骤、检查清单、输出模板、边界条件、错误处理"
    - "起草与违约责任分析的法律引用按 法条/案例/学说 分类并引用共享引用库，标待验证"
    - "plugin.json 注册全部新子技能，JSON 合法且 2 空格缩进"
  artifacts:
    - path: "commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md"
      provides: "逐条条款起草子技能"
      contains: "## 法律依据"
      min_lines: 60
    - path: "commercial-legal/skills/contract-drafting/framework-design/SKILL.md"
      provides: "合同框架设计子技能（标准条款清单 + 特别条款）"
      min_lines: 50
    - path: "commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md"
      provides: "责任限制四维分析子技能"
      contains: "## 法律依据"
      min_lines: 60
    - path: "commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md"
      provides: "违约金合法性与商业影响评估子技能（民法典 585）"
      contains: "585"
      min_lines: 50
    - path: "commercial-legal/skills/liability-analysis/damages-scope/SKILL.md"
      provides: "赔偿范围界定子技能（民法典 584 可预见性规则）"
      contains: "584"
      min_lines: 40
    - path: "commercial-legal/skills/liability-analysis/carveout-review/SKILL.md"
      provides: "例外清单审查子技能"
      min_lines: 40
    - path: "commercial-legal/.claude-plugin/plugin.json"
      provides: "注册全部新子技能的插件元数据"
      contains: "liability-cap-analysis"
  key_links:
    - from: "commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md"
      to: "commercial-legal/skills/_shared/civil-code-contract-citations.md"
      via: "引用共享法条库"
      pattern: "civil-code-contract-citations|legal-basis-conventions"
    - from: "commercial-legal/.claude-plugin/plugin.json"
      to: "全部子技能 SKILL.md"
      via: "skills 数组注册路径"
      pattern: "skills/(contract-review|cold-start-interview|contract-drafting|liability-analysis)/"
---

<objective>
按 CONTEXT「深层子技能拆分」与「全面法律研究」决策，将合同起草与违约责任分析两个扁平技能深化拆分为可独立触发的子技能，复用 02-01 的法律引用脊柱，并更新 plugin.json 注册全部新子技能（含 02-01 / 02-02 产出）。

本计划交付：
1. **合同起草拆分** — contract-drafting 拆为五个子技能：需求收集 / 框架设计 / 条款起草 / 风险自查 / 输出生成。现有 5 步工作流深化迁移，补充每步的检查清单、输出模板、边界条件、错误处理，法律依据引用 02-01 的 _shared 引用库。
2. **违约责任分析拆分** — liability-analysis 拆为四个子技能：责任限制分析（四维）/ 违约金评估 / 赔偿范围界定 / 例外清单审查。现有四维分析与法条引用（584/585/506）深化迁移并引用共享库。
3. **插件注册** — 更新 commercial-legal/.claude-plugin/plugin.json：注册本阶段全部新子技能（contract-review 5 + cold-start-interview 5 + contract-drafting 5 + liability-analysis 4），保留四个编排入口，bump version。

依赖：本计划引用 02-01 的 _shared/legal-basis-conventions.md 与 civil-code-contract-citations.md，以及 02-02 的 practice-profile-schema.md；plugin.json 注册需要 02-01 / 02-02 的子技能路径全部就位 → 故为 wave 2。

Purpose: 关闭起草与违约责任两个扁平技能的深度 gap，并把所有子技能正式注册进插件，使其可被独立安装/触发（CONTEXT「独立技能包」决策）。
Output: 5 起草子技能 + 4 违约责任子技能 + 2 改造后编排入口 + 更新的 plugin.json。

中国化原则与命名/文件格式约束同 CLAUDE.md（成文法为主；kebab-case；JSON 2 空格缩进、换行结尾、无尾部空格、表格列数一致）。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/phases/02-commercial-legal-core/02-CONTEXT.md
@CLAUDE.md
@commercial-legal/CLAUDE.md
@commercial-legal/skills/contract-drafting/SKILL.md
@commercial-legal/skills/liability-analysis/SKILL.md
@commercial-legal/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@commercial-legal/skills/_shared/practice-profile-schema.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 contract-drafting 为五个起草子技能并改造编排入口</name>
  <read_first>
    - commercial-legal/skills/contract-drafting/SKILL.md（现有 5 步工作流 — 拆分迁移的源）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（02-01 — 法条库，起草条款引用）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（02-01 — 来源分类规范）
    - commercial-legal/skills/_shared/practice-profile-schema.md（02-02 — 起草从配置读审查立场）
    - commercial-legal/CLAUDE.md（审查立场/输出，起草须体现用户立场）
    - shared/references/subject-qualification-traps.md（担保条款主体资格陷阱）
    - CLAUDE.md（命名 kebab-case；文件格式）
  </read_first>
  <files>
    commercial-legal/skills/contract-drafting/requirements-intake/SKILL.md,
    commercial-legal/skills/contract-drafting/framework-design/SKILL.md,
    commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md,
    commercial-legal/skills/contract-drafting/risk-self-check/SKILL.md,
    commercial-legal/skills/contract-drafting/output-generation/SKILL.md,
    commercial-legal/skills/contract-drafting/SKILL.md
  </files>
  <action>
    将 contract-drafting 五步工作流拆为五个子技能 SKILL.md，每个含 frontmatter（name kebab-case：requirements-intake / framework-design / clause-drafting / risk-self-check / output-generation；description；argument-hint）+ 标准章节：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（引用 _shared 库，按 法条/案例/学说 分类、标待验证）。
    分工：requirements-intake 迁移「第一步 需求收集」并深化追问逻辑，边界=信息不全时停下询问而非默默假设；framework-design 迁移「第二步 框架设计」（标准条款清单按合同类型 + 特别条款：数据处理/知识产权/竞业/担保），担保条款引用 shared/references/subject-qualification-traps.md 提示主体资格；clause-drafting 迁移「第三步 条款起草」五原则，逐条起草并引用 civil-code-contract-citations 对应法条（违约责任 577、违约金 585、格式条款 496-498），为最深子技能；risk-self-check 迁移「第四步 风险自查」并扩展为可勾选边界条件检查（标准条款齐全、体现立场、预防常见风险、交易破坏者、效力瑕疵）；output-generation 迁移「第五步 输出生成」+「输出格式」（合同草案 + 起草说明 + 风险提示 + 谈判要点 + 法律依据；合同模板；条款库）。每个子技能「前置」说明可被编排入口调用或单独触发。
    然后改造 commercial-legal/skills/contract-drafting/SKILL.md 为编排入口：保留 frontmatter（name: contract-drafting，description 更新），正文为子技能编排顺序表（requirements-intake → framework-design → clause-drafting → risk-self-check → output-generation，逐一指向路径、说明可单独触发），保留事项上下文护栏，顶部加迁移说明，语义无丢失。不在 SKILL.md 放完整合同条款代码块，用 markdown 结构示意。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in requirements-intake framework-design clause-drafting risk-self-check output-generation; do f="commercial-legal/skills/contract-drafting/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '## 法律依据' commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md && grep -q 'civil-code-contract-citations\|legal-basis-conventions' commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md && f=commercial-legal/skills/contract-drafting/SKILL.md && grep -q 'requirements-intake' "$f" && grep -q 'output-generation' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - 五个起草子技能 SKILL.md 存在，路径 commercial-legal/skills/contract-drafting/&lt;kebab-name&gt;/SKILL.md，frontmatter name 正确
    - 每个含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`
    - clause-drafting 引用 _shared/civil-code-contract-citations.md，法律依据按 法条/案例/学说 分类、标待验证
    - framework-design 担保条款引用主体资格陷阱清单
    - contract-drafting/SKILL.md 改为编排入口，含子技能编排顺序表 + 迁移说明，保留事项上下文护栏
    - 无尾部空格、换行结尾、表格列数一致
  </acceptance_criteria>
  <done>contract-drafting 拆为五个可独立触发子技能并复用共享引用库；编排入口指向子技能、语义无丢失。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 liability-analysis 为四个违约责任子技能并改造编排入口</name>
  <read_first>
    - commercial-legal/skills/liability-analysis/SKILL.md（现有六步工作流 — 拆分迁移的源；已有 584/585 法条引用）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（02-01 — 法条库）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（02-01 — 来源分类规范）
    - commercial-legal/skills/_shared/practice-profile-schema.md（02-02 — 责任限制立场从配置读取）
    - commercial-legal/skills/contract-review/risk-identification/SKILL.md（02-01 — 违约金四维识别，明确分工避免重复：liability-analysis 做深度分析）
    - CLAUDE.md（命名 kebab-case；文件格式）
  </read_first>
  <files>
    commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md,
    commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md,
    commercial-legal/skills/liability-analysis/damages-scope/SKILL.md,
    commercial-legal/skills/liability-analysis/carveout-review/SKILL.md,
    commercial-legal/skills/liability-analysis/SKILL.md
  </files>
  <action>
    将 liability-analysis 拆为四个子技能 SKILL.md，每个含 frontmatter（name kebab-case：liability-cap-analysis / penalty-assessment / damages-scope / carveout-review；description；argument-hint）+ 标准章节：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（引用 _shared 库、按 法条/案例/学说 分类、标待验证）。
    分工：liability-cap-analysis 迁移「第二步 责任限制分析」四维（直接 vs 间接损失、基数定义逐字引用、例外交互、审查立场对照），从 practice-profile 读责任限制立场，基数不明确时错误处理（标引用语言 + 可能含义 + 签署前确认）；penalty-assessment 迁移「第三步 违约金评估」（合法性检查引民法典 585、过高/过低可请求调整、商业影响），案例类放占位 + 待验证；damages-scope 迁移「第四步 赔偿范围界定」（范围/直接间接/律师费、赔偿程序/通知/抗辩/和解），引用民法典 584 可预见性规则；carveout-review 迁移「第五步 例外清单审查」（完整性、过宽/过窄、争议风险），与 contract-review/risk-identification 的例外交互分析互补（此处做深度审查）。每个子技能「前置」说明可被编排入口调用或单独触发。
    然后改造 commercial-legal/skills/liability-analysis/SKILL.md 为编排入口：保留 frontmatter（name: liability-analysis，description 更新），正文为子技能编排顺序表（定位违约责任条款 → liability-cap-analysis → penalty-assessment → damages-scope → carveout-review → 风险自查输出），逐一指向路径、说明可单独触发；保留事项上下文护栏 + 现有「输出格式」报告骨架（注明各节细节见对应子技能）；顶部加迁移说明，语义无丢失。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in liability-cap-analysis penalty-assessment damages-scope carveout-review; do f="commercial-legal/skills/liability-analysis/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '585' commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md && grep -q '584' commercial-legal/skills/liability-analysis/damages-scope/SKILL.md && grep -q '## 法律依据' commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md && f=commercial-legal/skills/liability-analysis/SKILL.md && grep -q 'liability-cap-analysis' "$f" && grep -q 'carveout-review' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - 四个违约责任子技能 SKILL.md 存在，路径 commercial-legal/skills/liability-analysis/&lt;kebab-name&gt;/SKILL.md，frontmatter name 正确
    - 每个含：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`
    - liability-cap-analysis 含四维分析 + 从 practice-profile 读责任限制立场 + 基数不明确的错误处理
    - penalty-assessment 引用民法典 585；damages-scope 引用民法典 584
    - 法律依据引用 _shared 引用库、按 法条/案例/学说 分类、对模型回忆案号标待验证
    - liability-analysis/SKILL.md 改为编排入口，含编排顺序表 + 迁移说明，保留事项上下文护栏与报告骨架
    - 无尾部空格、换行结尾、表格列数一致
  </acceptance_criteria>
  <done>liability-analysis 拆为四个可独立触发子技能并复用共享引用库；编排入口指向子技能、语义无丢失。</done>
</task>

<task type="auto">
  <name>Task 3: 更新 plugin.json 注册全部新子技能</name>
  <read_first>
    - commercial-legal/.claude-plugin/plugin.json（现有 — 注册结构与缩进，2 空格）
    - 本阶段全部子技能目录（contract-review 5 + cold-start-interview 5 + contract-drafting 5 + liability-analysis 4 + 四个编排入口）确认路径与 name
    - CLAUDE.md（文件格式：JSON 2 空格缩进、换行结尾；命名约定）
  </read_first>
  <files>
    commercial-legal/.claude-plugin/plugin.json
  </files>
  <action>
    更新 commercial-legal/.claude-plugin/plugin.json 的 skills 数组：保留四个编排入口（cold-start-interview / contract-review / contract-drafting / liability-analysis），并新增注册全部子技能条目，每条含 name（kebab-case）、path（相对插件根，如 skills/contract-review/risk-identification/SKILL.md）、description（一句中文说明）。子技能清单：contract-review 下 risk-identification / clause-revision / negotiation-points / legal-basis / output-formatting；cold-start-interview 下 identity-team / review-stance / escalation-rules / document-style / jurisdiction-profile；contract-drafting 下 requirements-intake / framework-design / clause-drafting / risk-self-check / output-generation；liability-analysis 下 liability-cap-analysis / penalty-assessment / damages-scope / carveout-review。bump version（0.2.0 → 0.3.0）。更新顶层 description 提及子技能深度拆分。严格 2 空格缩进、文件以换行符结尾、无尾部空格。注册的每条 path 必须指向真实存在的文件。
  </action>
  <verify>
    <automated>python3 -c "import json,os; d=json.load(open('commercial-legal/.claude-plugin/plugin.json')); paths=[s['path'] for s in d['skills']]; missing=[p for p in paths if not os.path.exists('commercial-legal/'+p)]; assert not missing, ('MISSING PATHS: '+str(missing)); names=[s['name'] for s in d['skills']]; req=['risk-identification','clause-revision','negotiation-points','legal-basis','output-formatting','identity-team','review-stance','escalation-rules','document-style','jurisdiction-profile','requirements-intake','framework-design','clause-drafting','risk-self-check','output-generation','liability-cap-analysis','penalty-assessment','damages-scope','carveout-review']; miss=[n for n in req if n not in names]; assert not miss, ('UNREGISTERED: '+str(miss)); print('OK', len(paths), 'skills')"</automated>
  </verify>
  <acceptance_criteria>
    - commercial-legal/.claude-plugin/plugin.json 为合法 JSON，2 空格缩进，文件以换行符结尾，无尾部空格
    - skills 数组保留四个编排入口（cold-start-interview / contract-review / contract-drafting / liability-analysis）
    - skills 数组注册全部 19 个新子技能（5+5+5+4），每条 name 为 kebab-case，path 指向真实存在的 SKILL.md
    - version bump 至 0.3.0；顶层 description 提及子技能深度拆分
    - 验证脚本输出 OK，无 MISSING PATHS / UNREGISTERED
  </acceptance_criteria>
  <done>plugin.json 注册全部编排入口与 19 个子技能，全部 path 指向真实文件，JSON 合法且符合文件格式约定，version 0.3.0。</done>
</task>

</tasks>

<verification>
- 9 个新子技能（5 起草 + 4 违约责任）+ 2 编排入口改造 + plugin.json 更新全部完成
- 起草与违约责任子技能法律依据引用 02-01 共享库、按 法条/案例/学说 分类、标待验证
- plugin.json 合法且全部 path 可达：运行 Task 3 的验证脚本输出 OK
- 全插件 JSON 回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('commercial-legal/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 律师可单独触发起草 5 子能力与违约责任 4 子能力
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据
- 法律引用按 法条/案例/学说 分类、引用共享库、标待验证（民法典 584/585/506/577 等）
- plugin.json 注册全部子技能且 path 可达，version 0.3.0
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/02-commercial-legal-core/02-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
