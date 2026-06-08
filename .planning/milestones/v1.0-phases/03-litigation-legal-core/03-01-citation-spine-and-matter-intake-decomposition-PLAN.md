---
phase: 03-litigation-legal-core
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - litigation-legal/skills/_shared/legal-basis-conventions.md
  - litigation-legal/skills/_shared/civil-procedure-citations.md
  - litigation-legal/skills/_shared/practice-profile-schema.md
  - litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md
  - litigation-legal/skills/matter-intake/case-identification/SKILL.md
  - litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md
  - litigation-legal/skills/matter-intake/evidence-preservation/SKILL.md
  - litigation-legal/skills/matter-intake/initial-theory/SKILL.md
  - litigation-legal/skills/matter-intake/SKILL.md
autonomous: true
requirements:
  - LITIGATION-CITATION-SPINE
  - PROFILE-SCHEMA
  - MATTER-INTAKE-DECOMP
user_setup: []

must_haves:
  truths:
    - "存在一个诉讼仲裁专用的法律依据引用规范（来源标签 + 法条/案例/学说 分类 + 待验证），所有诉讼技能可复用"
    - "存在一个可复用的民诉法/仲裁法/证据规定引用库，已核实锚点（时效3年=民法典188条、举证期限/答辩期15日、仲裁协议独立性、或裁或审）明确标注，其余不确定条号标待验证"
    - "存在诉讼版实践配置文件契约，明确字段、存储位置（litigation-legal/CLAUDE.md）、技能读取规则，并映射到 litigation-legal/CLAUDE.md 章节"
    - "律师可以单独触发案件录入的任一子能力（主体冲突预检/案件识别分级/关键日期与时效/证据保全/初始理论）而无需运行整个录入流程"
    - "每个案件录入子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据"
    - "现有 matter-intake/SKILL.md 深度内容（主体资格预检、利益冲突三路径门槛、风险分级、_log.yaml schema）无丢失地迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "litigation-legal/skills/_shared/legal-basis-conventions.md"
      provides: "诉讼语境的 法条/案例/学说 来源分类规范 + 待验证标记规则 + 来源标签表 + 法院层级标注 + 仲裁机构定位"
      contains: "待验证"
      min_lines: 60
    - path: "litigation-legal/skills/_shared/civil-procedure-citations.md"
      provides: "民诉法/仲裁法/证据规定/民法典诉讼时效 的可复用引用库（按来源分类、已核实锚点 + 待验证）"
      contains: "第188条"
      min_lines: 80
    - path: "litigation-legal/skills/_shared/practice-profile-schema.md"
      provides: "诉讼版实践配置文件契约：字段定义 + 存储位置 + 技能读取规则 + 与 litigation-legal/CLAUDE.md 映射"
      min_lines: 60
    - path: "litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md"
      provides: "主体资格预检 + 利益冲突三路径门槛子技能"
      contains: "## 法律依据"
      min_lines: 60
    - path: "litigation-legal/skills/matter-intake/case-identification/SKILL.md"
      provides: "案件识别（案由/角色/管辖/来源）+ 风险分级 + 重大性子技能"
      min_lines: 60
    - path: "litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md"
      provides: "关键日期 + 诉讼时效起算初判子技能"
      contains: "第188条"
      min_lines: 50
    - path: "litigation-legal/skills/matter-intake/evidence-preservation/SKILL.md"
      provides: "证据保全 + 外部律师 + 种子文档子技能"
      min_lines: 50
    - path: "litigation-legal/skills/matter-intake/initial-theory/SKILL.md"
      provides: "初始理论 + 立场 + _log.yaml/matter.md 装配子技能"
      min_lines: 50
    - path: "litigation-legal/skills/matter-intake/SKILL.md"
      provides: "案件录入编排入口（指向五个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md"
      to: "litigation-legal/skills/_shared/civil-procedure-citations.md"
      via: "引用诉讼时效条文（民法典188条）"
      pattern: "civil-procedure-citations|第188条"
    - from: "litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md"
      to: "litigation-legal/skills/_shared/legal-basis-conventions.md"
      via: "引用来源分类规范"
      pattern: "legal-basis-conventions"
    - from: "litigation-legal/skills/matter-intake/SKILL.md"
      to: "五个录入子技能"
      via: "编排入口指向子技能路径"
      pattern: "subject-conflict-precheck|case-identification|key-dates-limitation|evidence-preservation|initial-theory"
    - from: "litigation-legal/skills/_shared/practice-profile-schema.md"
      to: "litigation-legal/CLAUDE.md"
      via: "映射访谈/录入字段到实践配置模板章节"
      pattern: "风险校准|和解策略|角色倾向"
---

<objective>
将诉讼仲裁插件的核心录入能力从单一扁平技能拆分为深度子技能体系，并建立全插件复用的法律引用脊柱与诉讼版实践配置契约。

本计划交付三块内容：
1. **诉讼引用脊柱（citation spine）** — 一套所有诉讼技能共享的法律依据引用规范（来源标签 + 法条/案例/学说 分类 + 待验证 + 法院层级标注 + 仲裁机构定位），以及一个可复用的民诉法/仲裁法/证据规定/民法典诉讼时效引用库。这是 CONTEXT「全面法律研究」决策的可复用基础设施，后续 03-02 / 03-03 直接引用，避免每个技能重复维护条文。
2. **诉讼版实践配置契约** — litigation-legal/skills/_shared/practice-profile-schema.md：明确配置文件是什么、在哪（litigation-legal/CLAUDE.md）、技能怎么读，以及访谈/录入字段与 litigation-legal/CLAUDE.md 章节的映射。关闭「技能间通过明确配置契约协调」的 gap。
3. **案件录入拆分** — 按 CONTEXT「深层子技能拆分」决策，将 matter-intake 拆为五个可独立触发的子技能：主体资格与冲突预检 / 案件识别与分级 / 关键日期与时效起算 / 证据保全与种子文档 / 初始理论与装配。现有 matter-intake/SKILL.md 的深度内容（主体资格预检清单、利益冲突三路径门槛、风险分级矩阵、_log.yaml schema、matter.md/history.md 模板）拆分迁移到对应子技能，原 SKILL.md 改为编排入口。

Purpose: 关闭「CONTEXT envisions 深度子技能拆分，现实只有 5 个扁平技能」的核心 gap，并为诉讼语境建立可复用引用脊柱。引用脊柱与配置契约先行，保证三个计划的引用与配置读取一致。
Output: 2 个共享引用文件 + 1 个配置契约 + 5 个录入子技能 SKILL.md + 1 个改造后的编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民事诉讼法2023修正、仲裁法、最高法《关于民事诉讼证据的若干规定》、民法典诉讼时效为分析基础）；指导性案例作参考非判例法；法院四级层级识别（基层/中院/高院/最高院）+ 专门法院 + 仲裁机构；行业监管特色；执业环境适配。命名约定：技能名 kebab-case；斜杠命令 /litigation-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/案例/学说 分类，带来源标签；不确定条号一律标 `[待验证]`，不臆造条号。已核实可复用锚点：诉讼时效一般3年=《民法典》第188条；普通程序举证期限/答辩期15日=民事诉讼法；仲裁协议独立性、或裁或审=仲裁法。其余条号若非高度确信，标 `[待验证]`。
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
@litigation-legal/skills/matter-intake/SKILL.md
@litigation-legal/.claude-plugin/plugin.json
@commercial-legal/skills/_shared/legal-basis-conventions.md
@commercial-legal/skills/_shared/civil-code-contract-citations.md
@commercial-legal/skills/_shared/practice-profile-schema.md
@shared/references/subject-qualification-traps.md
@shared/references/document-structures.md
@shared/research-gate/references/quality-gates.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 建立诉讼法律引用脊柱（来源分类规范 + 民诉法/仲裁法/证据规定引用库）</name>
  <read_first>
    - CLAUDE.md（全局 — 中国化原则：成文法为主、指导性案例参考；文件格式约定）
    - commercial-legal/skills/_shared/legal-basis-conventions.md（结构与质量模板 — 来源分类/标签表/待验证规则/最小引用格式；诉讼版改编以此为骨架）
    - commercial-legal/skills/_shared/civil-code-contract-citations.md（引用库结构模板 — 法条/案例/学说三类表格组织、待验证标注方式）
    - litigation-legal/CLAUDE.md（实践配置模板 — 已有来源标签规范、管辖识别（四级法院 + 仲裁机构）、时效性触发）
    - shared/research-gate/references/quality-gates.md（Gate 1 法律依据完整性、L1 来源要求）
  </read_first>
  <files>
    litigation-legal/skills/_shared/legal-basis-conventions.md,
    litigation-legal/skills/_shared/civil-procedure-citations.md
  </files>
  <action>
    创建 litigation-legal/skills/_shared/legal-basis-conventions.md：定义诉讼仲裁全插件统一的法律依据引用规范。以 commercial-legal 同名文件为骨架改编，章节包含：「来源分类」（三类：法条=现行成文法条文号，含民事诉讼法/仲裁法/证据规定/民法典/司法解释；案例=最高院指导性案例或参考案例；学说=学术观点须标注作者/出处与争议性）；「来源标签表」（复用 litigation-legal/CLAUDE.md 已有的 [法宝]/[法规网站]/[网络搜索 — 需验证]/[模型知识 — 需验证]/[用户提供] 五标签，不新造冲突标签）；「待验证标记规则」（凡模型回忆的条文号/案号、距最后更新超 6 个月的法规、用户口述的条款号或时效期间，均须标 `[待验证]` 并说明验证途径）；「成文法优先与案例定位」（成文法为分析基础；指导性案例仅作参考、明确不具判例法约束力）；「法院层级与管辖标注」（基层/中院/高院/最高院四级 + 海事/知识产权/金融专门法院 + 仲裁委员会，引用案例须标层级）；「引用最小格式」（法条含：法律名称+条号+现行有效版本；案例含：案号或指导案例编号+裁判要点+法院层级）。验证资源列入：国家法律法规数据库 flk.npc.gov.cn、最高人民法院官网、中国裁判文书网 wenshu.court.gov.cn。不在本文件放完整法条正文——它是规范，不是法条库。

    创建 litigation-legal/skills/_shared/civil-procedure-citations.md：可复用的诉讼仲裁高频引用库，按「法条 / 案例 / 学说」三类组织，并按主题分组：（A）民事诉讼法（2023修正）核心条文——起诉与受理、级别/地域/专属管辖、管辖权异议、答辩期、普通程序与简易程序、举证期限、证据交换、二审与再审；（B）仲裁法核心条文——仲裁协议有效要件、仲裁协议独立性、或裁或审（一裁终局排斥诉讼）、仲裁庭组成、裁决撤销与不予执行；（C）最高法《关于民事诉讼证据的若干规定》——举证责任分配、证据三性（真实性/合法性/关联性）、举证期限与逾期后果、电子数据、鉴定；（D）《民法典》诉讼时效——一般时效、起算点、中止、中断、最长权利保护期间。

    **关键纪律（必须遵守）**：
    - 已核实锚点明确标注且不标待验证：诉讼时效一般期间3年=《民法典》第188条；普通程序举证期限/答辩期15日=民事诉讼法相应规定（条号若不确定描述规则并标待验证，但「15日」这一规则已核实）；仲裁协议独立性、或裁或审（一裁终局排斥诉讼）=仲裁法相应规定。
    - 其余具体条号若非高度确信，一律在条号处标 `[待验证]`，并以「描述规则 + 待验证」方式呈现，绝不臆造条号。例如管辖、答辩期具体条号、证据规定具体条号、再审条号等如不确信，写「民事诉讼法关于[规则]的规定 `[待验证]`」而非硬写条号。
    - 每条引用行末尾带来源标签（多数为 `[模型知识 — 需验证]`），并标 `[待验证]`（已核实锚点除外，但仍建议核验）。
    - 案例类放占位结构 + 填写说明（指导案例编号、裁判要点、法院层级、参考价值），明确「案例须经检索核验、模型回忆案号风险高、默认标 `[待验证]`」。学说类放占位结构 + 填写说明（观点、作者/出处、争议性）。

    务必遵守 CLAUDE.md 文件格式：markdown 表格列数一致、无尾部空格、文件以换行符结尾。
  </action>
  <verify>
    <automated>test -f litigation-legal/skills/_shared/legal-basis-conventions.md && test -f litigation-legal/skills/_shared/civil-procedure-citations.md && grep -q '法条' litigation-legal/skills/_shared/legal-basis-conventions.md && grep -q '案例' litigation-legal/skills/_shared/legal-basis-conventions.md && grep -q '学说' litigation-legal/skills/_shared/legal-basis-conventions.md && grep -q '待验证' litigation-legal/skills/_shared/legal-basis-conventions.md && grep -q '第188条' litigation-legal/skills/_shared/civil-procedure-citations.md && grep -q '仲裁' litigation-legal/skills/_shared/civil-procedure-citations.md && grep -q '15日\|十五日' litigation-legal/skills/_shared/civil-procedure-citations.md</automated>
  </verify>
  <acceptance_criteria>
    - litigation-legal/skills/_shared/legal-basis-conventions.md 存在，含「来源分类」章节明确区分 法条/案例/学说 三类，并涵盖民诉法/仲裁法/证据规定语境
    - legal-basis-conventions.md 含「待验证」标记规则，复用 litigation-legal/CLAUDE.md 五个来源标签（不新造冲突标签），含四级法院 + 仲裁机构层级标注规则
    - legal-basis-conventions.md 明确「成文法为分析基础、指导性案例仅作参考不具判例法约束力」
    - litigation-legal/skills/_shared/civil-procedure-citations.md 存在，按 法条/案例/学说 三类组织，分组覆盖 民诉法/仲裁法/证据规定/民法典诉讼时效
    - 已核实锚点明确呈现：诉讼时效3年=《民法典》第188条；举证期限/答辩期15日=民诉法；仲裁协议独立性、或裁或审=仲裁法
    - 任何模型回忆且不确信的具体条号标 `[待验证]`，以「描述规则 + 待验证」呈现，无臆造条号；案例类默认标 `[待验证]`
    - 两文件均无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>两个诉讼共享引用文件存在；来源分类规范区分 法条/案例/学说 并定义待验证规则与法院/仲裁层级标注；引用库覆盖民诉法/仲裁法/证据规定/民法典时效，已核实锚点明确、不确定条号标待验证、无臆造。</done>
</task>

<task type="auto">
  <name>Task 2: 建立诉讼版实践配置文件契约</name>
  <read_first>
    - commercial-legal/skills/_shared/practice-profile-schema.md（结构与质量模板 — 真相来源决策、字段映射表、技能读取契约、重跑/编辑/版本控制、法律事实合理性检查、schema 与 CLAUDE.md 章节对照）
    - litigation-legal/CLAUDE.md（实践配置模板 — 我们是谁/谁在使用（角色倾向）/风险校准/利益冲突清除/外部律师/证据保全/和解策略/文书风格/输出/共享护栏/事项工作区）
    - litigation-legal/skills/matter-intake/SKILL.md（现有录入技能 — 看其如何读取 CLAUDE.md 字段，保持读取契约一致）
    - litigation-legal/skills/cold-start-interview/SKILL.md（现有访谈四部分 — 字段映射的来源）
  </read_first>
  <files>
    litigation-legal/skills/_shared/practice-profile-schema.md
  </files>
  <action>
    创建 litigation-legal/skills/_shared/practice-profile-schema.md，以 commercial-legal 同名文件为骨架改编为诉讼语境。包含章节：
    - 「配置文件是什么 / 真相来源」：明确真相来源是 litigation-legal/CLAUDE.md（散文模板），由 /litigation-legal:cold-start-interview 生成更新，律师可直接编辑；记录架构决策（不引入与现有体系冲突的新 JSON/YAML 格式，沿用 CLAUDE.md 单一真相来源，理由同 commercial 版）。
    - 「字段映射表」：将访谈/录入收集的字段对应到 litigation-legal/CLAUDE.md 章节，并标注哪些技能读取该字段。至少覆盖映射组：身份与团队（## 我们是谁/## 谁在使用 → matter-intake/各起草技能）；角色倾向（## 谁在使用 → 角色倾向 → matter-intake 立场预填、defense/representation 立场驱动）；风险校准（## 风险校准 → 严重程度/可能性/重大性阈值 → matter-intake 风险分级）；利益冲突清除（## 利益冲突清除 → matter-intake 冲突门槛）；证据保全（## 证据保全 → matter-intake/evidence-management）；外部律师（## 外部律师合作 → matter-intake）；和解策略（## 和解策略 → matter-intake 初始立场、下游和解评估）；文书风格（## 文书风格/## 输出 → defense/representation/evidence 输出格式与工作产物标题）；管辖识别（## 共享护栏 → 管辖识别 → 各技能管辖判断）。
    - 「技能读取契约」：技能在实质性工作前须读取 litigation-legal/CLAUDE.md、检查关键字段是否含 [PLACEHOLDER]、据此选运行模式；配置缺失/含占位符时的标准提示（运行 cold-start-interview 或说「临时模式」）；临时模式默认值表（风险偏好平衡、角色律师、管辖中国大陆法律、角色倾向因案而异不预填、不自动升级）。
    - 「角色倾向（原告/被告/两者）立场选择」：技能在录入/起草前确认我方角色，据此加载下游立场（参照 matter-intake 现有「角色驱动下游技能」逻辑）。
    - 「重跑 / 编辑 / 版本控制」：完整重跑 vs 单独更新某部分；直接编辑；git 版本控制与回滚。
    - 「法律事实合理性检查」：用户口述条号/阈值/时效期间时写入前合理性检查（条号核查、阈值合理性、时效性标记、矛盾澄清），含 `[前提 flagged — 需验证]` 流程。
    - 「schema 与 CLAUDE.md 模板章节对照」表。
    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。
  </action>
  <verify>
    <automated>f=litigation-legal/skills/_shared/practice-profile-schema.md; test -f "$f" && grep -q 'litigation-legal/CLAUDE.md' "$f" && grep -q '字段映射' "$f" && grep -q '临时模式' "$f" && grep -q '角色倾向' "$f" && grep -q '风险校准' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - litigation-legal/skills/_shared/practice-profile-schema.md 存在
    - 明确真相来源为 litigation-legal/CLAUDE.md，并记录「不引入冲突新格式」的架构决策
    - 含字段映射表，覆盖 身份/角色倾向/风险校准/利益冲突/证据保全/外部律师/和解策略/文书风格/管辖 各组并标注读取技能
    - 含技能读取契约 + 临时模式默认值 + 角色倾向立场选择逻辑 + 法律事实合理性检查
    - 含 schema 与 litigation-legal/CLAUDE.md 章节对照表
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>诉讼版实践配置契约存在；定义配置文件是什么/在哪/技能怎么读，字段映射到 litigation-legal/CLAUDE.md 章节，含临时模式与角色倾向立场选择与法律事实合理性检查。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 matter-intake 为五个可独立触发的子技能</name>
  <read_first>
    - litigation-legal/skills/matter-intake/SKILL.md（现有深度技能 — 全部内容；这是要拆分迁移的源，也是质量基准：主体资格预检、利益冲突三路径门槛、来源、风险分级、重大性、外部律师、内部负责人、证据保全、关键日期、初始立场、_log.yaml schema、matter.md/history.md 模板、写入前确认、本技能不做什么）
    - litigation-legal/skills/_shared/legal-basis-conventions.md（Task 1 产出 — 引用规范）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（Task 1 产出 — 引用库，时效起算引用此处）
    - litigation-legal/skills/_shared/practice-profile-schema.md（Task 2 产出 — 配置读取契约）
    - litigation-legal/CLAUDE.md（实践配置模板 — 风险校准/角色倾向/利益冲突/证据保全/外部律师/输出）
    - shared/references/subject-qualification-traps.md（主体资格陷阱 — 预检子技能引用）
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md,
    litigation-legal/skills/matter-intake/case-identification/SKILL.md,
    litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md,
    litigation-legal/skills/matter-intake/evidence-preservation/SKILL.md,
    litigation-legal/skills/matter-intake/initial-theory/SKILL.md
  </files>
  <action>
    将现有 matter-intake/SKILL.md 的深度内容拆分迁移到五个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：subject-conflict-precheck / case-identification / key-dates-limitation / evidence-preservation / initial-theory；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 litigation-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（按 法条/案例/学说 分类，引用 _shared/civil-procedure-citations.md，标待验证）。每个子技能在「前置」中说明：可被 matter-intake 编排入口调用，也可由律师单独触发。

    分工（迁移现有第0-10步与写入逻辑，无丢失）：
    - subject-conflict-precheck（主体资格与冲突预检）：迁移「第0步 主体资格预检」（融资担保公司/银行分支/保险公司保证保险/上市公司无决议/国企事业单位无审批等清单，引用 shared/references/subject-qualification-traps.md）+「第2步 利益冲突检查」（完整三路径门槛：路径1立即检查/路径2标记待处理/路径3跳过并记录，conflicts.override yaml，「不要默默进行」纪律）。这是录入的硬门槛子技能。边界条件：未执行冲突检查时 STOP 不创建任何文件；主体资格问题须在 matter.md 显著标记并调整案由。
    - case-identification（案件识别与分级）：迁移「第1步 识别」（案件名称/对方当事人/案件类型/我方角色/管辖——法院四级层级 + 仲裁机构）+「第3步 来源」+「第4步 风险分级」（严重程度/可能性/综合评级矩阵/敞口/非金钱敞口，对照实践配置文件风险校准）+「第5步 重大性」（准备金/披露/监控阈值）。角色须从配置文件 ## 谁在使用 → 角色倾向 预填并确认，绝不默默假设。边界条件：风险校准薄时不假装精确。
    - key-dates-limitation（关键日期与时效起算）：迁移「第9步 关键日期」（答辩期限、下次听证、监管期限）+ 深化诉讼时效起算初判：识别案由对应的时效期间（一般3年=《民法典》第188条），初判起算点（知道或应当知道权利受损害及义务人之日），标记是否临近届满，并提示可运行 03-03 的 limitation-monitoring 做深度时效分析。答辩期/举证期限以民诉法15日为锚（条号不确信标待验证）。边界条件：时效起算点不清时不下结论，标 `[需律师确认]` 并列出待查事实。
    - evidence-preservation（证据保全与种子文档）：迁移「第6步 外部律师」（律所/主办合伙人/邮箱/聘用状态/预算）+「第7步 内部负责人」+「第8步 证据保全」（已发出？范围/保管人/下次刷新默认六个月；未发出且活跃诉讼则紧急标记）+ 各步骤的种子文档机会。边界条件：风险中等以上且无外部律师→标记；证据保全未发出且合理预期诉讼→紧急标记并提供发出选项。
    - initial-theory（初始理论与装配）：迁移「第10步 初始立场」（一段话理论：我方故事/对方故事/pivot fact/初始立场 fight|settle|investigate|wait，含 `[需律师确认]`）+「写入输出」全部（Slug 规则、matter.md 模板、history.md 第零条目、_log.yaml schema 追加行）+「写入前确认」+「以下一步决策树结束」+「本技能不做什么」。本子技能负责最终装配三件产物。
    遵守文件格式约定。输出模板用 markdown 结构示意（沿用现有 SKILL.md 风格，保留 _log.yaml 代码块示例）。
  </action>
  <verify>
    <automated>for d in subject-conflict-precheck case-identification key-dates-limitation evidence-preservation initial-theory; do f="litigation-legal/skills/matter-intake/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; done; grep -q '## 法律依据' litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md && grep -q 'subject-qualification-traps' litigation-legal/skills/matter-intake/subject-conflict-precheck/SKILL.md && grep -q '第188条' litigation-legal/skills/matter-intake/key-dates-limitation/SKILL.md && grep -q '_log.yaml' litigation-legal/skills/matter-intake/initial-theory/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 五个子技能 SKILL.md 全部存在，路径为 litigation-legal/skills/matter-intake/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按 法条/案例/学说 分类，标待验证）
    - subject-conflict-precheck 引用 shared/references/subject-qualification-traps.md 且含完整利益冲突三路径门槛（含 conflicts.override yaml 与「未执行→STOP」）
    - key-dates-limitation 含诉讼时效起算初判并引用《民法典》第188条（3年），答辩期/举证期以民诉法15日为锚
    - initial-theory 含完整 _log.yaml schema 追加行 + matter.md + history.md 模板 + 写入前确认
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>matter-intake 拆为五个可独立触发的子技能；现有深度内容（主体资格预检、冲突三路径门槛、风险分级、关键日期、证据保全、初始理论、_log.yaml schema）无丢失迁移；时效起算引用民法典188条；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 matter-intake/SKILL.md 为编排入口</name>
  <read_first>
    - litigation-legal/skills/matter-intake/SKILL.md（现有 — 改造对象）
    - 本计划 Task 3 产出的五个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、子技能编排顺序表、入口级护栏、临时模式段落写法）
    - litigation-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 03-03 统一更新）
  </read_first>
  <files>
    litigation-legal/skills/matter-intake/SKILL.md
  </files>
  <action>
    将 litigation-legal/skills/matter-intake/SKILL.md 改造为编排入口：保留 frontmatter（name: matter-intake，更新 description 说明它现在编排五个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能；(2) 目的与整体录入流程概览；(3) 子技能编排顺序表——主体资格与冲突预检（硬门槛）→ 案件识别与分级 → 关键日期与时效起算 → 证据保全与种子文档 → 初始理论与装配，每行说明该子技能做什么、对应子技能路径（skills/matter-intake/<name>/SKILL.md）、可单独触发的斜杠命令（/litigation-legal:<name>）；(4) 保留跨子技能的入口级护栏：加载实践配置文件（litigation-legal/CLAUDE.md，含临时模式提示）、事项工作区上下文（litigation-legal 默认启用）、利益冲突未执行=硬门槛（指向 subject-conflict-precheck，强调未清除前不创建任何文件）、目的地/特权检查。不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=litigation-legal/skills/matter-intake/SKILL.md; grep -q '^name: matter-intake' "$f" && grep -q 'subject-conflict-precheck' "$f" && grep -q 'case-identification' "$f" && grep -q 'key-dates-limitation' "$f" && grep -q 'evidence-preservation' "$f" && grep -q 'initial-theory' "$f" && grep -q '冲突\|门槛' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - litigation-legal/skills/matter-intake/SKILL.md 仍有 frontmatter name: matter-intake，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向五个子技能路径并说明可单独触发（/litigation-legal:<name>）
    - 保留入口级护栏：加载实践配置文件 + 临时模式、事项工作区上下文、利益冲突硬门槛、目的地/特权检查
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 matter-intake/SKILL.md 成为指向五个子技能的编排入口，入口级护栏（冲突硬门槛、事项上下文、临时模式、特权检查）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 五个录入子技能 + 两个共享引用文件 + 一个配置契约 + 一个编排入口全部存在且格式合规
- 诉讼引用脊柱（来源分类规范 + 民诉法/仲裁法/证据规定引用库）与配置契约可被 03-02 / 03-03 复用
- 现有 matter-intake 深度内容（主体资格、冲突门槛、风险分级、_log.yaml schema）无丢失迁移
- 时效起算引用《民法典》第188条；不确定条号均标 `[待验证]`，无臆造条号
- JSON/YAML 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('litigation-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师可单独触发任一录入子能力（5 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据
- 诉讼法律引用按 法条/案例/学说 分类并标待验证；已核实锚点（时效3年/答辩举证15日/仲裁独立性与或裁或审）明确呈现
- 诉讼版实践配置契约定义清楚，技能据此读取 litigation-legal/CLAUDE.md
- matter-intake 编排入口指向五个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/03-litigation-legal-core/03-01-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
