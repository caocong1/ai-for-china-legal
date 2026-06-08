---
phase: 02-commercial-legal-core
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - commercial-legal/skills/cold-start-interview/identity-team/SKILL.md
  - commercial-legal/skills/cold-start-interview/review-stance/SKILL.md
  - commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md
  - commercial-legal/skills/cold-start-interview/document-style/SKILL.md
  - commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md
  - commercial-legal/skills/cold-start-interview/SKILL.md
  - commercial-legal/skills/_shared/practice-profile-schema.md
autonomous: true
requirements:
  - INTERVIEW-DECOMP
  - PROFILE-MECHANISM
user_setup: []

must_haves:
  truths:
    - "律师可以单独触发冷启动访谈的任一部分（身份与团队/审查立场/升级规则/文书风格/管辖法律）而无需重跑整个访谈"
    - "访谈结果写入一个明确定义的实践配置文件，所有商事合同技能从同一处读取个性化设置"
    - "实践配置文件的字段、位置和读取契约被显式记录，技能据此读取（甲方/乙方立场、升级矩阵、文书风格、管辖法律）"
    - "访谈支持重新运行、编辑、版本控制，并对用户口述的法律事实做合理性检查"
    - "每个访谈子技能含详细问题流、边界条件（缺省/跳过/部分配置）和错误处理"
  artifacts:
    - path: "commercial-legal/skills/_shared/practice-profile-schema.md"
      provides: "实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 commercial-legal/CLAUDE.md 模板的映射"
      min_lines: 60
    - path: "commercial-legal/skills/cold-start-interview/identity-team/SKILL.md"
      provides: "身份与团队结构访谈子技能"
      min_lines: 40
    - path: "commercial-legal/skills/cold-start-interview/review-stance/SKILL.md"
      provides: "审查立场访谈子技能（甲方/乙方、风险偏好、交易破坏者、可接受备选）"
      min_lines: 60
    - path: "commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md"
      provides: "升级规则访谈子技能（升级矩阵、审批人、自动触发）"
      min_lines: 40
    - path: "commercial-legal/skills/cold-start-interview/document-style/SKILL.md"
      provides: "文书风格访谈子技能（输出格式、语气、法条/案例引用偏好）"
      min_lines: 40
    - path: "commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md"
      provides: "管辖法律访谈子技能（主要管辖、地方性法规、法院偏好、行业特殊要求）"
      min_lines: 40
  key_links:
    - from: "commercial-legal/skills/_shared/practice-profile-schema.md"
      to: "commercial-legal/CLAUDE.md"
      via: "映射访谈字段到实践配置模板章节"
      pattern: "审查立场|升级矩阵|输出"
    - from: "commercial-legal/skills/cold-start-interview/SKILL.md"
      to: "五个访谈子技能"
      via: "编排入口指向子技能"
      pattern: "identity-team|review-stance|escalation-rules|document-style|jurisdiction-profile"
---

<objective>
按 CONTEXT「完整访谈流程」与「冷启动访谈策略」决策，将冷启动访谈从单一扁平技能拆分为五个可独立触发的访谈子技能，并显式定义实践配置文件契约（schema），使所有商事合同技能从同一处读取个性化设置。

本计划交付：
1. **实践配置文件契约** — commercial-legal/skills/_shared/practice-profile-schema.md：明确配置文件的字段、存储位置、版本/重跑/编辑机制，以及与现有 commercial-legal/CLAUDE.md 实践配置模板的映射关系。这关闭 CONTEXT「每个技能从实践配置文件读取个性化设置」的契约 gap——现状是访谈输出 YAML、但读取契约散落在各技能的散文里。
2. **访谈拆分** — 将 cold-start-interview 拆为五个子技能：身份与团队 / 审查立场 / 升级规则 / 文书风格 / 管辖法律。现有访谈 5 部分内容深化迁移（补充每部分的问题流细节、边界条件、错误处理），原 SKILL.md 改为编排入口。

注意：CONTEXT 提到配置可为 `.claude-plugin/profile.json` 或类似，但现有体系已用 commercial-legal/CLAUDE.md（散文模板）+ 访谈输出 YAML 双轨。本计划不强行引入新文件格式，而是用 practice-profile-schema.md 把「配置文件是什么、在哪、技能怎么读」一次性定清楚（Claude 的 Discretion，记录选择），与现有 commercial-legal/CLAUDE.md 模板对齐而非冲突。

Purpose: 关闭「访谈应深度拆分 + 技能间通过明确配置契约协调」的 gap。本计划与 02-01 无文件重叠，可并行。
Output: 5 个访谈子技能 SKILL.md + 1 个配置契约文件 + 1 个改造后的编排入口。

中国化原则与命名/文件格式约束同 CLAUDE.md（成文法为主、法院层级识别、执业环境适配；kebab-case；JSON 2 空格、换行结尾、无尾部空格、表格列数一致）。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/phases/02-commercial-legal-core/02-CONTEXT.md
@CLAUDE.md
@commercial-legal/CLAUDE.md
@commercial-legal/skills/cold-start-interview/SKILL.md
@commercial-legal/.claude-plugin/plugin.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: 定义实践配置文件契约（practice-profile-schema）</name>
  <read_first>
    - commercial-legal/CLAUDE.md（实践配置模板全文 — 我们是谁/谁在使用/可用集成/审查立场（甲方+乙方）/升级矩阵/文书风格/输出/共享护栏/事项工作区/种子文档；这是配置文件的真相来源）
    - commercial-legal/skills/cold-start-interview/SKILL.md（现有访谈输出的 YAML 结构 — 需与 CLAUDE.md 模板对齐）
    - commercial-legal/skills/contract-review/SKILL.md（看现有技能如何读取「实践配置文件」的散文契约，schema 须覆盖这些读取点）
    - CLAUDE.md（全局 — 文件格式约定）
  </read_first>
  <files>
    commercial-legal/skills/_shared/practice-profile-schema.md
  </files>
  <action>
    创建 commercial-legal/skills/_shared/practice-profile-schema.md，一次性定清楚实践配置契约。包含章节：(1)「配置文件是什么」——说明真相来源是 commercial-legal/CLAUDE.md 实践配置模板（散文形式），冷启动访谈填充它；明确不引入与现有体系冲突的新文件（记录此 Discretion 选择及理由）。(2)「字段映射表」——把访谈五部分逐字段映射到 commercial-legal/CLAUDE.md 的章节（我们是谁→身份；审查立场（甲方/乙方）→审查立场；升级矩阵→升级规则；文书风格/输出→文书风格；共享护栏/管辖识别→管辖法律），列「字段 | 配置模板章节 | 谁读取（哪些技能）」三列。(3)「技能读取契约」——技能在工作流开头如何读配置、配置缺失/含占位符时的行为（指向临时模式）、哪一方立场（甲方/乙方）如何选择。(4)「重跑/编辑/版本控制」——重新运行访谈更新配置、用户可直接编辑、版本与回滚约定。(5)「法律事实合理性检查」——复用 commercial-legal/CLAUDE.md「验证用户陈述的法律事实」与「时效性触发」规则，要求访谈写入前对用户口述的条文号/阈值做合理性检查并标 `[前提 flagged — 需验证]`。务必遵守文件格式约定（表格列数一致、无尾部空格、换行结尾）。
  </action>
  <verify>
    <automated>f=commercial-legal/skills/_shared/practice-profile-schema.md; test -f "$f" && grep -q '审查立场' "$f" && grep -q '升级矩阵\|升级规则' "$f" && grep -q '甲方' "$f" && grep -q '乙方' "$f" && grep -q '临时模式' "$f" && grep -q 'CLAUDE.md' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - commercial-legal/skills/_shared/practice-profile-schema.md 存在
    - 含字段映射表（三列：字段 | 配置模板章节 | 读取技能），覆盖身份/审查立场（甲方+乙方）/升级矩阵/文书风格/管辖法律
    - 含技能读取契约：配置缺失或占位符时指向临时模式；甲方/乙方立场如何选择
    - 含重跑/编辑/版本控制说明
    - 含法律事实合理性检查规则（复用 CLAUDE.md 的验证 + 时效性触发，标 `[前提 flagged — 需验证]`）
    - 明确以 commercial-legal/CLAUDE.md 为真相来源、不引入冲突的新配置文件（记录 Discretion 选择）
    - 无尾部空格、换行结尾、表格列数一致
  </acceptance_criteria>
  <done>实践配置文件契约显式定义：字段映射、读取契约、重跑/编辑/版本、合理性检查，与现有 commercial-legal/CLAUDE.md 模板对齐。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 cold-start-interview 为五个访谈子技能</name>
  <read_first>
    - commercial-legal/skills/cold-start-interview/SKILL.md（现有访谈 — 五部分全文，拆分迁移的源）
    - commercial-legal/skills/_shared/practice-profile-schema.md（Task 1 产出 — 字段映射与写入契约）
    - commercial-legal/CLAUDE.md（实践配置模板 — 每个子技能写入对应章节的目标结构）
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    commercial-legal/skills/cold-start-interview/identity-team/SKILL.md,
    commercial-legal/skills/cold-start-interview/review-stance/SKILL.md,
    commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md,
    commercial-legal/skills/cold-start-interview/document-style/SKILL.md,
    commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md
  </files>
  <action>
    将现有访谈五部分拆分迁移到五个独立子技能 SKILL.md，每个含 YAML frontmatter（name kebab-case：identity-team / review-stance / escalation-rules / document-style / jurisdiction-profile；description；argument-hint）。每个子技能 MUST 含：目的、问题流（细化现有问题，补充追问逻辑）、写入目标（指向 practice-profile-schema 与 commercial-legal/CLAUDE.md 对应章节）、边界条件（用户跳过某问题/部分配置/独立执业无团队等缺省处理）、错误处理（用户口述法律事实的合理性检查、矛盾回答的澄清）。

    分工：
    - identity-team：迁移「第一部分 基本信息」（律师角色、执业年限、执业领域、团队结构、升级路径、审批权限）+ commercial-legal/CLAUDE.md「我们是谁/谁在使用/可用集成」。边界：独立执业无团队时如何简化。
    - review-stance：迁移「第二部分 审查立场」（风险偏好保守/平衡/进取、甲方立场重点、乙方立场重点、交易破坏者清单、可接受备选）。这是最深的子技能，须覆盖甲乙双立场全部维度（责任限制/违约金/知识产权/数据保护/期限终止/管辖）。
    - escalation-rules：迁移「第三部分 升级规则」（升级矩阵金额阈值、风险等级升级、自动触发、审批人信息）。
    - document-style：迁移「第四部分 文书风格」（输出格式偏好、文书语气、是否含法条/案例引用、是否双语、常用模板）。
    - jurisdiction-profile：迁移「第五部分 管辖法律」（主要管辖、地方性法规、法院管辖偏好、行业/客户/合规特殊要求）+ commercial-legal/CLAUDE.md「管辖识别」（经济特区/民族自治/自贸区/港澳台）。体现法院层级识别与行业监管特色。

    每个子技能在「前置」说明：可被 cold-start-interview 编排入口调用，也可单独触发以只更新配置文件某一部分。不要在 SKILL.md 放完整 YAML 配置代码块的重复副本——指向 practice-profile-schema 即可，写入说明用散文 + 必要的小结构示意。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in identity-team review-stance escalation-rules document-style jurisdiction-profile; do f="commercial-legal/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '甲方' commercial-legal/skills/cold-start-interview/review-stance/SKILL.md && grep -q '乙方' commercial-legal/skills/cold-start-interview/review-stance/SKILL.md && grep -q '保守\|平衡\|进取' commercial-legal/skills/cold-start-interview/review-stance/SKILL.md && grep -q '经济特区\|自贸区\|港澳台' commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 五个访谈子技能 SKILL.md 全部存在，路径 commercial-legal/skills/cold-start-interview/<kebab-name>/SKILL.md
    - 每个含 frontmatter name 为对应 kebab-case + description + argument-hint
    - 每个含：目的、问题流、写入目标（指向 schema/CLAUDE.md 章节）、边界条件、错误处理
    - review-stance 覆盖甲方+乙方双立场全维度 + 风险偏好（保守/平衡/进取）+ 交易破坏者 + 可接受备选
    - jurisdiction-profile 含管辖识别（经济特区/民族自治/自贸区/港澳台）并体现法院层级
    - 每个子技能含用户口述法律事实的合理性检查（错误处理）
    - 无尾部空格、换行结尾、表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为五个可独立触发的访谈子技能；五部分内容深化迁移；写入目标对齐 practice-profile-schema 与 commercial-legal/CLAUDE.md。</done>
</task>

<task type="auto">
  <name>Task 3: 改造 cold-start-interview/SKILL.md 为编排入口</name>
  <read_first>
    - commercial-legal/skills/cold-start-interview/SKILL.md（现有 — 改造对象，保留「输出」YAML 结构与「后续」说明）
    - 本计划 Task 2 产出的五个访谈子技能（确认路径与触发名）
    - commercial-legal/skills/_shared/practice-profile-schema.md（Task 1 产出 — 入口指向契约）
  </read_first>
  <files>
    commercial-legal/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将 commercial-legal/skills/cold-start-interview/SKILL.md 改造为访谈编排入口：保留 frontmatter（name: cold-start-interview，更新 description 说明它编排五个访谈子技能并生成完整实践配置文件）。正文改为：(1) 目的与完整访谈流程概览；(2) 子技能编排顺序表——identity-team → review-stance → escalation-rules → document-style → jurisdiction-profile，每行说明该子技能收集什么、对应路径、可单独触发（用于只更新配置某一部分）；(3) 保留并指向 practice-profile-schema 作为输出契约（现有「输出」YAML 结构可保留为「完整配置示意」，但注明真相来源/写入规则见 schema）；(4) 保留「后续」（重跑、编辑、版本控制）。顶部加迁移说明指向子技能。不丢失现有任何语义。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=commercial-legal/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$f" && grep -q 'identity-team' "$f" && grep -q 'review-stance' "$f" && grep -q 'escalation-rules' "$f" && grep -q 'document-style' "$f" && grep -q 'jurisdiction-profile' "$f" && grep -q 'practice-profile-schema\|实践配置' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - commercial-legal/skills/cold-start-interview/SKILL.md 仍有 frontmatter name: cold-start-interview，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向五个访谈子技能路径并说明可单独触发
    - 指向 practice-profile-schema 作为输出契约；保留「后续」（重跑/编辑/版本控制）
    - 顶部含迁移说明
    - 无尾部空格、换行结尾、表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview/SKILL.md 成为指向五个访谈子技能的编排入口，输出契约指向 schema，重跑/编辑/版本控制语义保留。</done>
</task>

</tasks>

<verification>
- 五个访谈子技能 + 配置契约文件 + 编排入口全部存在且格式合规
- 实践配置文件契约显式定义且与 commercial-legal/CLAUDE.md 模板对齐
- 现有访谈五部分内容无丢失地深化迁移
- JSON/YAML 回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('commercial-legal/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 律师可单独触发任一访谈部分（5 个子技能各有 frontmatter + 触发名）
- 配置文件契约清晰，所有技能从同一处读取个性化设置
- review-stance 覆盖甲乙双立场全维度；jurisdiction-profile 体现法院层级与管辖识别
- 访谈支持重跑/编辑/版本控制，含法律事实合理性检查
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/02-commercial-legal-core/02-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
