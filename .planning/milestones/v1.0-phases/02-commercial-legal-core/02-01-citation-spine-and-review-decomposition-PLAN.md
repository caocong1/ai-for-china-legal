---
phase: 02-commercial-legal-core
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - commercial-legal/skills/_shared/legal-basis-conventions.md
  - commercial-legal/skills/_shared/civil-code-contract-citations.md
  - commercial-legal/skills/contract-review/risk-identification/SKILL.md
  - commercial-legal/skills/contract-review/clause-revision/SKILL.md
  - commercial-legal/skills/contract-review/negotiation-points/SKILL.md
  - commercial-legal/skills/contract-review/legal-basis/SKILL.md
  - commercial-legal/skills/contract-review/output-formatting/SKILL.md
  - commercial-legal/skills/contract-review/SKILL.md
autonomous: true
requirements:
  - REVIEW-DECOMP
  - CITATION-SPINE
user_setup: []

must_haves:
  truths:
    - "律师可以单独触发合同审查的任一子能力（风险识别/条款修改建议/谈判要点/法律依据/输出格式化）而无需运行整个审查流程"
    - "每个合同审查子技能都有详细步骤、检查清单、输出模板、边界条件和错误处理"
    - "合同审查相关法律引用按来源分类（法条/案例/学说）并对不确定内容标注待验证"
    - "存在一个所有技能可复用的法律依据引用规范（来源标签 + 法条/案例/学说 分类 + 待验证）"
    - "现有 contract-review/SKILL.md 作为编排入口指向五个子技能，深度内容不丢失"
  artifacts:
    - path: "commercial-legal/skills/_shared/legal-basis-conventions.md"
      provides: "法条/案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表"
      min_lines: 40
    - path: "commercial-legal/skills/_shared/civil-code-contract-citations.md"
      provides: "民法典合同编 + 司法解释 + 指导性案例的可复用引用库（按来源分类、标注待验证）"
      min_lines: 60
    - path: "commercial-legal/skills/contract-review/risk-identification/SKILL.md"
      provides: "条款级风险识别子技能"
      contains: "## 法律依据"
      min_lines: 60
    - path: "commercial-legal/skills/contract-review/clause-revision/SKILL.md"
      provides: "逐条修改建议子技能"
      contains: "## 法律依据"
      min_lines: 60
    - path: "commercial-legal/skills/contract-review/negotiation-points/SKILL.md"
      provides: "谈判策略与底线子技能"
      min_lines: 50
    - path: "commercial-legal/skills/contract-review/legal-basis/SKILL.md"
      provides: "法条/案例/学说引用子技能"
      contains: "法条"
      min_lines: 60
    - path: "commercial-legal/skills/contract-review/output-formatting/SKILL.md"
      provides: "审查报告生成子技能"
      min_lines: 50
  key_links:
    - from: "commercial-legal/skills/contract-review/legal-basis/SKILL.md"
      to: "commercial-legal/skills/_shared/legal-basis-conventions.md"
      via: "引用来源分类规范"
      pattern: "legal-basis-conventions"
    - from: "commercial-legal/skills/contract-review/SKILL.md"
      to: "五个子技能"
      via: "编排入口指向子技能路径"
      pattern: "risk-identification|clause-revision|negotiation-points|legal-basis|output-formatting"
---

<objective>
将商事合同插件的核心审查能力从单一扁平技能拆分为深度子技能体系，并建立全插件复用的法律引用规范与引用库。

本计划交付两块内容：
1. **引用脊柱（citation spine）** — 一套所有技能共享的法律依据引用规范（来源标签 + 法条/案例/学说 分类 + 待验证标记）以及一个可复用的民法典合同编/司法解释/指导性案例引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 02-02 / 02-03 直接引用，避免每个技能重复维护法条。
2. **合同审查拆分** — 按 CONTEXT「深层子技能拆分」决策，将 contract-review 拆为五个可独立触发的子技能：风险识别 / 条款修改建议 / 谈判要点 / 法律依据 / 输出格式化。现有 contract-review/SKILL.md 的深度内容（主体资格预检、违约金四维分析、管辖法律差异、修改粒度等）拆分迁移到对应子技能，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分，现实只有 4 个扁平技能」的核心 gap。引用脊柱先行，保证三个计划的引用一致。
Output: 2 个共享引用文件 + 5 个审查子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民法典合同编、司法解释、行政法规、部门规章为分析基础）；指导性案例作参考非判例法；法院层级识别；行业监管特色；执业环境适配。命名约定：技能名 kebab-case；斜杠命令 /commercial-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/phases/02-commercial-legal-core/02-CONTEXT.md
@CLAUDE.md
@commercial-legal/CLAUDE.md
@commercial-legal/skills/contract-review/SKILL.md
@commercial-legal/.claude-plugin/plugin.json
@shared/references/subject-qualification-traps.md
@shared/research-gate/references/quality-gates.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立法律引用脊柱（来源分类规范 + 民法典合同编引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考；文件格式约定）
    - commercial-legal/CLAUDE.md（实践配置模板 — 已有的「来源标签规范」表 + 「时效性触发」+「验证用户陈述的法律事实」）
    - commercial-legal/skills/contract-review/SKILL.md（看现有「来源归属」「无默默补充」段落的措辞与标签，保持一致）
    - shared/research-gate/references/quality-gates.md（Gate 1 法律依据完整性、L1 来源要求）
  </read_first>
  <files>
    commercial-legal/skills/_shared/legal-basis-conventions.md,
    commercial-legal/skills/_shared/civil-code-contract-citations.md
  </files>
  <action>
    创建 commercial-legal/skills/_shared/legal-basis-conventions.md：定义全插件统一的法律依据引用规范。包含章节：「来源分类」（三类：法条 / 案例 / 学说 —— 法条=现行成文法条文号、案例=最高院指导性案例或参考案例、学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用 commercial-legal/CLAUDE.md 已有的 [法宝] / [法规网站] / [网络搜索 — 需验证] / [模型知识 — 需验证] / [用户提供] 五标签，不要新造冲突标签）；「待验证标记规则」（凡 [模型知识 — 需验证] 回忆的条文号/案号、距最后更新超 6 个月的法规、用户口述的条款号，均须标注 `[待验证]` 并说明验证途径）；「成文法优先与案例定位」（成文法为分析基础；指导性案例仅作参考、明确说明不具判例法约束力；标注法院层级）；「引用最小格式」（法条须含：法律名称+条号+现行有效版本/修订标注；案例须含：案号或指导案例编号+裁判要点+法院层级）。不要在本文件放完整法条正文——它是规范，不是法条库。

    创建 commercial-legal/skills/_shared/civil-code-contract-citations.md：一个可复用的商事合同高频引用库，按「法条 / 案例 / 学说」三类组织。法条类至少覆盖民法典合同编核心条文（合同效力、格式条款 496-498、违约责任 577、损失赔偿与可预见性规则 584、违约金调整 585、免责条款效力 506、情势变更 533 等）与相关司法解释（如合同编通则司法解释、买卖合同司法解释），逐条标注现行有效版本并对任何模型回忆条文标 `[待验证]`。案例类放占位结构 + 填写说明（指导性案例编号、裁判要点、法院层级、参考价值说明），并明确标注「案例须经检索核验，模型回忆案号风险高，默认标 `[待验证]`」。学说类放占位结构 + 填写说明（观点、作者/出处、争议性）。每条引用行末尾带来源标签。务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>test -f commercial-legal/skills/_shared/legal-basis-conventions.md && test -f commercial-legal/skills/_shared/civil-code-contract-citations.md && grep -q '法条' commercial-legal/skills/_shared/legal-basis-conventions.md && grep -q '案例' commercial-legal/skills/_shared/legal-basis-conventions.md && grep -q '学说' commercial-legal/skills/_shared/legal-basis-conventions.md && grep -q '待验证' commercial-legal/skills/_shared/legal-basis-conventions.md && grep -q '585' commercial-legal/skills/_shared/civil-code-contract-citations.md</automated>
  </verify>
  <acceptance_criteria>
    - commercial-legal/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节明确区分 法条 / 案例 / 学说 三类
    - legal-basis-conventions.md 含「待验证」标记规则，且复用 commercial-legal/CLAUDE.md 已有的五个来源标签（不新造冲突标签）
    - legal-basis-conventions.md 明确「成文法为分析基础、指导性案例仅作参考不具判例法约束力」并要求标注法院层级
    - commercial-legal/skills/_shared/civil-code-contract-citations.md 存在，按 法条/案例/学说 三类组织，法条类覆盖民法典 496-498、506、577、584、585 等核心条文
    - civil-code-contract-citations.md 对任何模型回忆的条文号/案号标注 `[待验证]`，案例类默认标 `[待验证]`
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个共享引用文件存在；来源分类规范区分 法条/案例/学说 并定义待验证规则；引用库覆盖民法典合同编核心条文并对不确定内容标待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 contract-review 为五个可独立触发的子技能</name>
  <read_first>
    - commercial-legal/skills/contract-review/SKILL.md（现有深度技能 — 全部内容；这是要拆分迁移的源，也是质量基准）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（Task 1 产出 — 引用库）
    - commercial-legal/CLAUDE.md（实践配置模板 — 审查立场/升级矩阵/输出/共享护栏，子技能须从此读取个性化设置）
    - shared/references/subject-qualification-traps.md（主体资格陷阱 — 风险识别子技能引用）
    - CLAUDE.md（命名约定：kebab-case；文件格式）
  </read_first>
  <files>
    commercial-legal/skills/contract-review/risk-identification/SKILL.md,
    commercial-legal/skills/contract-review/clause-revision/SKILL.md,
    commercial-legal/skills/contract-review/negotiation-points/SKILL.md,
    commercial-legal/skills/contract-review/legal-basis/SKILL.md,
    commercial-legal/skills/contract-review/output-formatting/SKILL.md
  </files>
  <action>
    将现有 contract-review/SKILL.md 的深度内容拆分迁移到五个子技能，每个子技能是独立 SKILL.md，含 YAML frontmatter（name kebab-case：risk-identification / clause-revision / negotiation-points / legal-basis / output-formatting；description；argument-hint）。每个子技能 MUST 含这些标准章节：目的、前置（读取实践配置文件 + 引用 _shared 规范）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（按 法条/案例/学说 分类，引用 _shared/civil-code-contract-citations.md，标待验证）。

    分工：
    - risk-identification（风险识别）：迁移现有「主体资格预检」「定位」「交易破坏者检查」「逐项对比」中的风险识别与双重严重性（法律风险🔴🟠🟡🟢 + 商业摩擦）部分 + 违约金/责任限制四维识别。引用 shared/references/subject-qualification-traps.md。边界条件：合同无金额时停下询问（迁移现有「合同金额处理」段落）；无实践配置文件时走临时模式。
    - clause-revision（条款修改建议）：迁移「逐项对比」的建议修改块 + 完整「修改粒度」段落（词<短语<句子<条款）。输出模板=逐条修改建议（含原文引用、偏离类型、具体替换语言、对方不让步时的备选）。
    - negotiation-points（谈判要点）：从审查立场推导谈判策略与底线（交易破坏者=硬底线、可接受备选=让步空间、有利条款=交易筹码）。迁移「有利条款和缺失」「升级路由」中与谈判相关部分。边界条件：对方为大公司 vs 中小企业的策略差异。
    - legal-basis（法律依据）：本子技能专门产出审查的法律依据章节，直接引用 _shared/legal-basis-conventions.md 与 civil-code-contract-citations.md。迁移现有「管辖法律差异检查」「来源归属」「无默默补充」段落。输出=按 法条/案例/学说 分类、带来源标签、对不确定标待验证的引用清单。
    - output-formatting（输出格式化）：迁移「组装备忘录」「输出格式」（完整备忘录/微信群摘要/修订文档）「交付前质量检查」「下一步决策树」「目的地检查」「静默模式」。从实践配置文件 `## 输出` 读工作产物标题。

    每个子技能在「前置」中说明：可被 contract-review 编排入口调用，也可由律师单独触发。不要在 <action> 或 SKILL.md 的 action 性段落放完整合同条款代码块——输出模板用 markdown 结构示意即可（与现有 SKILL.md 风格一致）。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in risk-identification clause-revision negotiation-points legal-basis output-formatting; do f="commercial-legal/skills/contract-review/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '## 法律依据' commercial-legal/skills/contract-review/legal-basis/SKILL.md && grep -q '修改粒度\|词\|短语' commercial-legal/skills/contract-review/clause-revision/SKILL.md && grep -rq 'civil-code-contract-citations\|legal-basis-conventions' commercial-legal/skills/contract-review/legal-basis/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 五个子技能 SKILL.md 全部存在，路径为 commercial-legal/skills/contract-review/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名（risk-identification 等），含 description 与 argument-hint
    - 每个子技能含章节：目的、详细步骤、检查清单、输出模板、边界条件、错误处理
    - risk-identification 引用 shared/references/subject-qualification-traps.md 且含双重严重性（法律风险 + 商业摩擦）
    - clause-revision 含完整「修改粒度」逻辑（词 < 短语 < 句子 < 条款）
    - legal-basis 子技能含 `## 法律依据` 并引用 _shared/legal-basis-conventions.md 与 civil-code-contract-citations.md，引用按 法条/案例/学说 分类、标待验证
    - output-formatting 含完整备忘录 + 微信群摘要 + 修订文档三种输出 + 交付前质量检查
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>contract-review 拆为五个可独立触发的子技能；现有深度内容（主体资格、违约金四维、管辖差异、修改粒度、备忘录组装）无丢失地迁移到对应子技能；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 3: 改造 contract-review/SKILL.md 为编排入口</name>
  <read_first>
    - commercial-legal/skills/contract-review/SKILL.md（现有 — 改造对象）
    - 本计划 Task 2 产出的五个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 02-03 统一更新）
  </read_first>
  <files>
    commercial-legal/skills/contract-review/SKILL.md
  </files>
  <action>
    将 commercial-legal/skills/contract-review/SKILL.md 改造为「编排入口」：保留 frontmatter（name: contract-review，更新 description 说明它现在编排五个子技能）。正文改为：(1) 目的与整体审查流程概览；(2) 子技能编排顺序表——风险识别 → 法律依据 → 条款修改建议 → 谈判要点 → 输出格式化，每行说明该子技能做什么、对应子技能路径（skills/contract-review/<name>/SKILL.md）、可单独触发的说明；(3) 保留「前置条件：加载审查立场」「临时模式」「事项上下文」「目的地检查」这些跨子技能的入口级护栏（避免重复，细节指向子技能）；(4) 在顶部加一行迁移说明，指明深度内容已拆分到子技能。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=commercial-legal/skills/contract-review/SKILL.md; grep -q '^name: contract-review' "$f" && grep -q 'risk-identification' "$f" && grep -q 'clause-revision' "$f" && grep -q 'negotiation-points' "$f" && grep -q 'legal-basis' "$f" && grep -q 'output-formatting' "$f" && grep -q '临时模式' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - commercial-legal/skills/contract-review/SKILL.md 仍有 frontmatter name: contract-review，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向五个子技能路径并说明可单独触发
    - 保留入口级护栏：加载审查立场、临时模式、事项上下文、目的地检查
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 contract-review/SKILL.md 成为指向五个子技能的编排入口，入口级护栏保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 五个审查子技能 + 两个共享引用文件 + 一个编排入口全部存在且格式合规
- 法律引用脊柱（来源分类规范 + 民法典合同编引用库）可被后续计划复用
- 现有 contract-review 深度内容无丢失地迁移
- JSON/YAML 合法性：运行 `python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('commercial-legal/**/*.json', recursive=True)]"`（本计划不改 json，作回归确认）
</verification>

<success_criteria>
- 律师可单独触发任一审查子能力（5 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据
- 法律引用按 法条/案例/学说 分类并标待验证
- contract-review 编排入口指向五个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/02-commercial-legal-core/02-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
