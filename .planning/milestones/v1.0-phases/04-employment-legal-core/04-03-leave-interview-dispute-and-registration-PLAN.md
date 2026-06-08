---
phase: 04-employment-legal-core
plan: 03
type: execute
wave: 2
depends_on:
  - 04-01
  - 04-02
files_modified:
  - employment-legal/skills/leave-management/annual-leave/SKILL.md
  - employment-legal/skills/leave-management/sick-leave-medical-period/SKILL.md
  - employment-legal/skills/leave-management/maternity-female-protection/SKILL.md
  - employment-legal/skills/leave-management/statutory-leave-attendance/SKILL.md
  - employment-legal/skills/leave-management/SKILL.md
  - employment-legal/skills/cold-start-interview/identity-team/SKILL.md
  - employment-legal/skills/cold-start-interview/review-stance/SKILL.md
  - employment-legal/skills/cold-start-interview/risk-escalation/SKILL.md
  - employment-legal/skills/cold-start-interview/style-local-rules/SKILL.md
  - employment-legal/skills/cold-start-interview/SKILL.md
  - employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md
  - employment-legal/skills/labor-dispute-handling/mediation-path/SKILL.md
  - employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md
  - employment-legal/skills/labor-dispute-handling/litigation-path/SKILL.md
  - employment-legal/skills/labor-dispute-handling/SKILL.md
  - employment-legal/.claude-plugin/plugin.json
autonomous: true
requirements:
  - LEAVE-MANAGEMENT-DECOMP
  - COLD-START-INTERVIEW-DECOMP
  - LABOR-DISPUTE-HANDLING
  - PLUGIN-REGISTRATION
user_setup: []

must_haves:
  truths:
    - "律师/HR 可以单独触发假期管理的任一子能力（年休假合规 / 病假与医疗期 / 生育假与女职工保护 / 其他法定假期与考勤）而无需运行整个流程"
    - "冷启动访谈拆为可独立触发的访谈子技能，按部分收集执业立场并填充 employment-legal/CLAUDE.md 对应章节（不再生成独立 YAML）"
    - "新增 labor-dispute-handling 技能，覆盖争议定性与时效（劳动仲裁时效1年=第27条）/ 调解路径 / 仲裁路径（一裁终局识别=第47条）/ 诉讼路径与衔接，四个子技能可独立触发 + 编排入口"
    - "未休年休假工资 300% 表述准确（正常工作期间工资100% + 另付200%，合计300%），不误写为额外300%"
    - "plugin.json 升级到 0.3.0 并注册全部子技能（冷启动4 + 雇佣5 + 解雇4 + 竞业4 + 假期4 + 争议4 + 六个编排入口），JSON 合法、2空格缩进"
    - "现有 leave-management（61 行）与 cold-start-interview（62 行）内容无丢失迁移到子技能并深化，原 SKILL.md 改为编排入口；cold-start-interview 末尾「生成 YAML」表述纠正为填充 employment-legal/CLAUDE.md"
  artifacts:
    - path: "employment-legal/skills/leave-management/annual-leave/SKILL.md"
      provides: "年休假合规子技能：分档（5/10/15天）+ 折算 + 未休工资300%（100%+200%）"
      contains: "300%"
      min_lines: 150
    - path: "employment-legal/skills/leave-management/sick-leave-medical-period/SKILL.md"
      provides: "病假与医疗期子技能：医疗期分档 + 病假工资（不低于最低工资80%）+ 医疗期内禁止解除衔接"
      contains: "医疗期"
      min_lines: 150
    - path: "employment-legal/skills/leave-management/maternity-female-protection/SKILL.md"
      provides: "生育假与女职工特别保护子技能：产假98天/难产多胞胎增加 + 孕期产期哺乳期保护 + 三期解除限制"
      contains: "98 天"
      min_lines: 150
    - path: "employment-legal/skills/leave-management/statutory-leave-attendance/SKILL.md"
      provides: "其他法定假期与考勤制度子技能：婚丧假/陪产假/工伤停工留薪 + 考勤与请假制度合规"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/leave-management/SKILL.md"
      provides: "假期管理编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "employment-legal/skills/cold-start-interview/identity-team/SKILL.md"
      provides: "访谈子技能：身份与团队 → 填充 ## 我们是谁 / ## 谁在使用"
      contains: "employment-legal/CLAUDE.md"
      min_lines: 80
    - path: "employment-legal/skills/cold-start-interview/review-stance/SKILL.md"
      provides: "访谈子技能：审查立场（用人单位方/劳动者方）→ 填充 ## 审查立场（雇佣/解雇/竞业）"
      contains: "用人单位方"
      min_lines: 80
    - path: "employment-legal/skills/cold-start-interview/risk-escalation/SKILL.md"
      provides: "访谈子技能：风险偏好与升级矩阵 → 填充 ## 风险校准 / ## 升级矩阵"
      contains: "风险"
      min_lines: 80
    - path: "employment-legal/skills/cold-start-interview/style-local-rules/SKILL.md"
      provides: "访谈子技能：文书风格与地方性规定 → 填充 ## 文书风格 / ## 输出 / ## 共享护栏"
      contains: "地方性"
      min_lines: 80
    - path: "employment-legal/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（指向四个访谈子技能，写入 CLAUDE.md，纠正 YAML 表述）"
      min_lines: 40
    - path: "employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md"
      provides: "争议定性与时效子技能：劳动争议范围认定 + 仲裁时效1年（第27条）+ 起算/中止中断/存续期间拖欠报酬例外"
      contains: "第27条"
      min_lines: 150
    - path: "employment-legal/skills/labor-dispute-handling/mediation-path/SKILL.md"
      provides: "调解路径子技能：企业调解委员会/基层调解组织/调解协议效力与支付令"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md"
      provides: "仲裁路径子技能：仲裁前置 + 一裁终局识别（第47条）+ 申请书/证据/管辖"
      contains: "一裁终局"
      min_lines: 150
    - path: "employment-legal/skills/labor-dispute-handling/litigation-path/SKILL.md"
      provides: "诉讼路径与衔接子技能：不服裁决起诉/一裁终局的有限救济/执行衔接"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/labor-dispute-handling/SKILL.md"
      provides: "劳动争议处理编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "employment-legal/.claude-plugin/plugin.json"
      provides: "插件配置升级到 0.3.0 并注册全部子技能与六个编排入口"
      contains: "0.3.0"
      min_lines: 40
  key_links:
    - from: "employment-legal/skills/cold-start-interview/review-stance/SKILL.md"
      to: "employment-legal/CLAUDE.md"
      via: "访谈结果写入 ## 审查立场 章节（非独立 YAML）"
      pattern: "employment-legal/CLAUDE.md|审查立场"
    - from: "employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用劳动仲裁时效1年（争议仲裁法第27条）"
      pattern: "labor-law-citations|第27条"
    - from: "employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用部分案件一裁终局（争议仲裁法第47条）"
      pattern: "labor-law-citations|一裁终局|第47条"
    - from: "employment-legal/skills/leave-management/annual-leave/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用职工带薪年休假条例（未休年休假300%）"
      pattern: "labor-law-citations|300%"
    - from: "employment-legal/.claude-plugin/plugin.json"
      to: "全部子技能与编排入口 SKILL.md"
      via: "skills 数组注册每个技能路径"
      pattern: "labor-dispute-handling|annual-leave|review-stance"
    - from: "employment-legal/skills/cold-start-interview/SKILL.md"
      to: "employment-legal/skills/_shared/practice-profile-schema.md"
      via: "访谈编排入口遵循配置契约字段映射写入 CLAUDE.md"
      pattern: "practice-profile-schema|CLAUDE.md"
---

<objective>
完成劳动人事插件的剩余技能深化（假期管理、冷启动访谈），新增劳动争议处理技能，并统一注册全部技能、升级插件版本——使 employment-legal 成为可交付的完整技能集。

本计划交付四块内容：
1. **假期管理拆分** — 将 leave-management（现 61 行浅骨架，仅列年休假/病假/产假标准纲要）拆为四个可独立触发的子技能：年休假合规（分档/折算/未休工资300%）/ 病假与医疗期 / 生育假与女职工特别保护 / 其他法定假期与考勤制度。现有 61 行内容无丢失迁移并深化，原 SKILL.md 改为编排入口。
2. **冷启动访谈拆分** — 将 cold-start-interview（现 62 行四部分访谈）拆为四个可独立触发的访谈子技能：身份与团队 / 审查立场（用人单位方/劳动者方）/ 风险与升级 / 文书风格与地方性规定。访谈结果填充 employment-legal/CLAUDE.md 对应章节（而非生成独立 YAML——纠正现有末尾「生成 YAML 格式」表述），原 SKILL.md 改为编排入口。
3. **新增 labor-dispute-handling（劳动争议处理）** — 按 ROADMAP 新增技能，拆为四个子技能：争议定性与时效（劳动仲裁时效1年=第27条）/ 调解路径 / 仲裁路径（一裁终局识别=第47条）/ 诉讼路径与衔接，加编排入口。
4. **plugin.json 注册与版本升级** — 升级到 0.3.0，注册全部子技能（冷启动4 + 雇佣5 + 解雇4 + 竞业4 + 假期4 + 争议4）与六个编排入口（cold-start-interview / hiring-review / termination-review / non-compete-review / leave-management / labor-dispute-handling），更新 description。

本计划为 wave 2，依赖 04-01（_shared 引用脊柱与配置契约——访谈与争议子技能引用）与 04-02（解雇/竞业子技能路径——plugin.json 须注册它们）。plugin.json 注册任务必须等 04-01 与 04-02 的子技能目录全部就位后执行，故注册任务读取磁盘上已存在的全部 SKILL.md 路径再写入数组，避免漏注册。

Purpose: 关闭剩余三个浅骨架/缺失技能的 gap（leave-management 61 行、cold-start-interview 须拆分并纠正 YAML 表述、labor-dispute-handling 完全缺失），并完成全插件注册——使 Phase 4 交付一个律师/HR 可单点调用、可个性化、覆盖入职到争议全链路的完整劳动人事技能集。
Output: 4 个假期子技能 + 假期编排入口 + 4 个访谈子技能 + 访谈编排入口 + 4 个争议子技能 + 争议编排入口 + 升级注册后的 plugin.json（共 16 个文件）。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（劳动合同法、劳动法、劳动争议调解仲裁法、职工带薪年休假条例、女职工劳动保护特别规定为分析基础）；指导性案例作参考非判例法；地方性规定识别（北京/上海/广东产假天数、陪产假、护理假差异）+ 劳动人事争议仲裁委员会 + 法院四级；执业环境适配。命名约定：技能名 kebab-case；斜杠命令 /employment-legal:<skill>；JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/案例/学说 分类，带来源标签；不确定条号一律标 `[待验证]`，不臆造条号。已核实可复用锚点：劳动仲裁时效一般1年=《劳动争议调解仲裁法》第27条；部分案件一裁终局=《劳动争议调解仲裁法》第47条。未休年休假 300% 须准确表述（正常工作期间工资100% + 另付200%，合计300%，非额外300%）。年休假天数（5/10/15）、产假天数（98 + 难产15 + 多胞胎每胎15）、医疗期分档为「规则已核实、具体条号若不确信标待验证」。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/phases/04-employment-legal-core/04-CONTEXT.md
@CLAUDE.md
@employment-legal/CLAUDE.md
@employment-legal/skills/leave-management/SKILL.md
@employment-legal/skills/cold-start-interview/SKILL.md
@employment-legal/.claude-plugin/plugin.json
@employment-legal/skills/_shared/legal-basis-conventions.md
@employment-legal/skills/_shared/labor-law-citations.md
@employment-legal/skills/_shared/practice-profile-schema.md
@litigation-legal/skills/_shared/civil-procedure-citations.md
@commercial-legal/skills/contract-review/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 leave-management 为四个子技能并改造编排入口</name>
  <read_first>
    - employment-legal/skills/leave-management/SKILL.md（现有 61 行浅骨架 — 全部内容；这是要拆分迁移的源：假期类型识别七类、年休假分档与未休工资300%、病假医疗期分档与病假工资80%、产假98天/难产/多胞胎、合规检查清单）
    - employment-legal/skills/_shared/labor-law-citations.md（04-01 产出 — 引用库，年休假条例/女职工保护规定/病假医疗期条文引用此处）
    - employment-legal/skills/_shared/legal-basis-conventions.md（04-01 产出 — 引用规范）
    - employment-legal/skills/_shared/practice-profile-schema.md（04-01 产出 — 配置读取契约）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能质量基准）
    - employment-legal/CLAUDE.md（## 风险校准 / ## 共享护栏 地方性规定（产假天数地方差异））
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    employment-legal/skills/leave-management/annual-leave/SKILL.md,
    employment-legal/skills/leave-management/sick-leave-medical-period/SKILL.md,
    employment-legal/skills/leave-management/maternity-female-protection/SKILL.md,
    employment-legal/skills/leave-management/statutory-leave-attendance/SKILL.md,
    employment-legal/skills/leave-management/SKILL.md
  </files>
  <action>
    将现有 leave-management/SKILL.md 的内容拆分迁移到四个子技能（独立 SKILL.md，含 frontmatter name kebab-case：annual-leave / sick-leave-medical-period / maternity-female-protection / statutory-leave-attendance；description；argument-hint），并把原 SKILL.md 改造为编排入口。每个子技能 MUST 含：目的、前置（读 CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 分工说明 + 可单独触发 /employment-legal:<name>）、详细步骤（含表格）、检查清单、输出模板、边界条件（表格）、错误处理（表格）、`## 法律依据`（法条/案例/学说 分类，引用 _shared/labor-law-citations.md，标待验证，含案例/学说占位）。**每个子技能 150+ 行实质内容，深度对标 penalty-assessment。**

    分工（迁移现有七类假期识别/年休假/病假/产假/合规检查，无丢失）：
    - annual-leave（年休假合规）：迁移年休假分档（满1年不满10年5天/满10年不满20年10天/满20年15天）+ **未休年休假工资300%**。深化：折算规则（当年度入职/离职按当年已工作时间折算应休天数，折算后不足1整天不支付）+ **300% 准确表述**（用人单位安排未休的，应支付未休年休假工资报酬，按日工资收入的300%——其中含用人单位支付正常工作期间工资即100%，故另需额外支付200%，合计300%；务必准确，不得写成「额外300%」）+ 可跨1个年度安排 + 不能休的折算上限。边界条件：累计工作时间含在不同单位的工作年限（须证明）；职工书面提出不休年休假的处理。
    - sick-leave-medical-period（病假与医疗期）：迁移病假医疗期分档（实际工作年限10年以下：本单位第1年3个月、满1年4个月……；10年以上：第1年6个月、满1年7个月……）+ 病假工资（不低于当地最低工资80%）。深化：医疗期计算周期（按一定时间段累计计算）+ 医疗期内禁止非过失辞退/经济性裁员（衔接 termination-review/grounds-legality 禁止解除）+ 医疗期满仍不能工作的处理（另行安排/解除并支付经济补偿与医疗补助费）。**关键纪律**：医疗期分档与病假工资规则已核实但具体规章条号若不确信标 `[待验证]`（医疗期依据为原劳动部《企业职工患病或非因工负伤医疗期规定》`[待验证]`）。边界条件：特殊疾病（癌症等）医疗期延长；停工留薪期（工伤）与医疗期的区别。
    - maternity-female-protection（生育假与女职工特别保护）：迁移产假（基础98天/难产增加15天/多胞胎每多1个增加15天/地方有不同规定）。深化：地方性延长生育假/奖励假差异（标 `[管辖 flagged — 需验证地方性规定]`，不硬写统一天数）+ 产前检查时间计入工作时间 + 哺乳期每日哺乳时间 + 孕期产期哺乳期（三期）特别保护（不得降低工资、不得解除/辞退——衔接 termination-review 禁止解除）+ 生育津贴与产假工资关系。边界条件：流产产假按怀孕月份分档；男职工陪产假/护理假地方规定。错误处理：将地方奖励假误作全国统一标准。
    - statutory-leave-attendance（其他法定假期与考勤制度）：迁移假期类型识别（陪产假、丧假、婚假及其他法定假期）+「第三步 合规检查」清单（假期天数/工资是否符合法定标准、是否有规避法定假期条款）。深化：婚假/丧假地方规定差异（标地方性）+ 工伤停工留薪期 + 法定节假日与调休 + 考勤与请假制度合规审查（旷工认定、未批准休假的处理、考勤制度民主程序与公示——衔接规章制度有效性）。边界条件：将考勤罚款误作合法处罚（用人单位不得随意设定罚款）。本子技能负责假期管理的「兜底 + 考勤制度」层面。

    然后改造 leave-management/SKILL.md 为编排入口：frontmatter（name: leave-management，更新 description）；正文含 (1) 顶部迁移说明；(2) 目的与假期审查流程概览；(3) 前置加载配置 + 临时模式段落（按法定标准、地方性逐案确认、标 `[临时模式]`）；(4) 子技能编排顺序表（年休假合规 → 病假与医疗期 → 生育假与女职工保护 → 其他法定假期与考勤，含路径与单独触发命令）；(5) 入口级护栏（地方性规定识别——产假/陪产假/护理假地方差异；与 termination-review 禁止解除的衔接提示——医疗期/三期内禁止解除）。

    遵守文件格式约定。所有法律依据引用 _shared/labor-law-citations.md，年休假/产假天数等规则已核实、具体条号不确信标待验证。
  </action>
  <verify>
    <automated>for d in annual-leave sick-leave-medical-period maternity-female-protection statutory-leave-attendance; do f="employment-legal/skills/leave-management/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '300%' employment-legal/skills/leave-management/annual-leave/SKILL.md && grep -q '医疗期' employment-legal/skills/leave-management/sick-leave-medical-period/SKILL.md && grep -q '98 天\|98天' employment-legal/skills/leave-management/maternity-female-protection/SKILL.md && grep -q '考勤\|婚假\|丧假' employment-legal/skills/leave-management/statutory-leave-attendance/SKILL.md; i=employment-legal/skills/leave-management/SKILL.md; grep -q '^name: leave-management' "$i" && grep -q 'annual-leave' "$i" && grep -q 'sick-leave-medical-period' "$i" && grep -q 'maternity-female-protection' "$i" && grep -q 'statutory-leave-attendance' "$i" && grep -q '临时模式' "$i"</automated>
  </verify>
  <acceptance_criteria>
    - 四个假期子技能 SKILL.md 全部存在，路径为 employment-legal/skills/leave-management/<kebab-name>/SKILL.md，含 frontmatter + 标准章节 + ≥100 非空行
    - annual-leave 含分档（5/10/15天）+ 折算 + 未休工资 300%（准确表述为含100%正常工资 + 另付200%，合计300%）
    - sick-leave-medical-period 含医疗期分档 + 病假工资80% + 医疗期内禁止解除衔接；maternity-female-protection 含产假98天/难产/多胞胎 + 三期保护 + 地方性差异标记
    - statutory-leave-attendance 含婚丧假/陪产假/工伤停工留薪 + 考勤请假制度合规
    - leave-management/SKILL.md 改造为编排入口，指向四个子技能 + 单独触发命令 + 临时模式 + 地方性/禁止解除衔接护栏
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>leave-management 拆为四个可独立触发的子技能 + 编排入口；现有 61 行内容无丢失迁移并深化；未休年休假 300% 准确表述；产假98天/医疗期分档规则保留、不确定条号标待验证；地方性差异标记完整。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 cold-start-interview 为四个访谈子技能并改造编排入口（纠正 YAML 表述）</name>
  <read_first>
    - employment-legal/skills/cold-start-interview/SKILL.md（现有 62 行四部分访谈 — 全部内容；这是要拆分的源：第一部分基本信息（律师角色/服务对象）、第二部分审查立场（风险偏好/用人单位立场重点/劳动者立场重点/交易破坏者）、第三部分地方性规定、第四部分文书风格；**注意末尾「生成 YAML 格式」须纠正为填充 employment-legal/CLAUDE.md**）
    - employment-legal/CLAUDE.md（实践配置模板 — 全部章节，访谈结果写入此处：## 我们是谁 / ## 谁在使用 / ## 可用集成 / ## 审查立场（雇佣/解雇/竞业）/ ## 风险校准 / ## 升级矩阵 / ## 文书风格 / ## 输出 / ## 共享护栏）
    - employment-legal/skills/_shared/practice-profile-schema.md（04-01 产出 — 字段映射表，访谈子技能据此把字段写入对应 CLAUDE.md 章节；含「现有访谈 YAML 表述纠正」说明）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    employment-legal/skills/cold-start-interview/identity-team/SKILL.md,
    employment-legal/skills/cold-start-interview/review-stance/SKILL.md,
    employment-legal/skills/cold-start-interview/risk-escalation/SKILL.md,
    employment-legal/skills/cold-start-interview/style-local-rules/SKILL.md,
    employment-legal/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将现有 cold-start-interview/SKILL.md 的四部分访谈拆分迁移到四个访谈子技能（独立 SKILL.md，含 frontmatter name kebab-case：identity-team / review-stance / risk-escalation / style-local-rules；description；argument-hint），并改造原 SKILL.md 为编排入口。每个访谈子技能 MUST 含：目的、前置（说明本子技能填充 employment-legal/CLAUDE.md 哪些章节 + 遵循 _shared/practice-profile-schema.md 字段映射 + 可单独触发用于只更新某部分配置）、访谈问题清单（结构化提问）、**写入映射**（每个问题答案 → employment-legal/CLAUDE.md 对应章节的 [PLACEHOLDER] 替换，明示是写入 CLAUDE.md 散文模板而非生成 YAML）、法律事实合理性检查（用户口述条号/金额/比例时按 schema 的合理性检查流程，标 `[前提 flagged — 需验证]`）、边界条件、错误处理。**每个访谈子技能 80+ 行实质内容**（访谈子技能偏交互，目标 80+ 行而非 150+，但须含完整问题集 + 写入映射 + 合理性检查）。

    分工（迁移现有四部分，无丢失，并补充解雇/竞业立场字段）：
    - identity-team（身份与团队）：迁移第一部分基本信息（律师角色：合伙人/资深/初级/法务/HR + 执业年限领域；服务对象：用人单位方/劳动者方/双方 + 主要行业）。写入映射：→ ## 我们是谁（公司/律所名称、实体类型、团队规模、升级联系人、每月雇佣事务量、主要雇佣类型、主要工作地点、痛点）+ ## 谁在使用（角色、律师联系人）+ ## 可用集成。
    - review-stance（审查立场）：迁移第二部分审查立场（风险偏好；用人单位立场审查重点：试用期/工时/社保/竞业/解雇保护；劳动者立场审查重点：工资福利/工作条件/解雇补偿/竞业补偿；交易破坏者清单）。深化补充：解雇审查立场（经济补偿 N/N+1/2N 倾向、是否高于法定标准）+ 竞业限制配置（适用人员范围/经济补偿标准/期限/范围）。写入映射：→ ## 审查立场（### 雇佣审查 各维度 + ### 解雇审查 经济补偿倾向 + 竞业限制配置）。明确按服务对象（用人单位方/劳动者方）加载对应立场。
    - risk-escalation（风险与升级）：访谈风险偏好等级定义确认（🔴/🟠/🟡/🟢 含义是否调整）+ 升级矩阵（HR/主办律师/法务总监权限与升级条件、自动升级触发：竞业限制/解雇/群体性事件）。写入映射：→ ## 风险校准 + ## 升级矩阵。
    - style-local-rules（文书风格与地方性规定）：迁移第三部分地方性规定（主要工作地点 北京/上海/广州/深圳/其他 + 需特别关注的地方性规定）+ 第四部分文书风格（输出格式偏好：完整备忘录/简短摘要/修改建议；雇佣文件风格/解雇通知风格/内部备忘录风格/工作产物存放）。写入映射：→ ## 文书风格 + ## 输出 + ## 共享护栏（### 地方性规定识别 表，按工作地点勾选关注项）。

    然后改造 cold-start-interview/SKILL.md 为访谈编排入口：frontmatter（name: cold-start-interview，更新 description）；正文含 (1) 顶部迁移说明（四部分访谈已拆为可独立运行的子技能，可整体运行或单独更新某部分）；(2) 目的与访谈总流程概览；(3) 子技能编排顺序表（身份与团队 → 审查立场 → 风险与升级 → 文书风格与地方性规定，含路径与单独触发命令——支持只重跑某一部分）；(4) **明确纠正**：访谈结果填充 employment-legal/CLAUDE.md 对应章节（散文模板，律师可读可编辑、可 git 版本控制），**不生成独立 YAML 文件**——指出原文件末尾「生成 YAML 格式」表述作废；(5) 入口级护栏（写入前法律事实合理性检查、重跑/单独更新/直接编辑/版本控制说明）。

    遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。
  </action>
  <verify>
    <automated>for d in identity-team review-stance risk-escalation style-local-rules; do f="employment-legal/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q 'employment-legal/CLAUDE.md' "$f" || { echo "NO CLAUDE.md MAPPING $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 60 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '用人单位方\|劳动者方' employment-legal/skills/cold-start-interview/review-stance/SKILL.md && grep -q '地方性' employment-legal/skills/cold-start-interview/style-local-rules/SKILL.md; i=employment-legal/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$i" && grep -q 'identity-team' "$i" && grep -q 'review-stance' "$i" && grep -q 'risk-escalation' "$i" && grep -q 'style-local-rules' "$i" && grep -q 'CLAUDE.md' "$i" && ! grep -q '生成劳动人事实践配置文件（YAML 格式）' "$i"</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md 全部存在，路径为 employment-legal/skills/cold-start-interview/<kebab-name>/SKILL.md，含 frontmatter + 问题清单 + 写入映射 + ≥60 非空行
    - 每个访谈子技能明确写入 employment-legal/CLAUDE.md 对应章节（非 YAML），并遵循 practice-profile-schema 字段映射
    - review-stance 覆盖用人单位方/劳动者方立场 + 雇佣/解雇（N/N+1/2N 倾向）/竞业配置；style-local-rules 覆盖文书风格 + 地方性规定
    - cold-start-interview/SKILL.md 改造为编排入口，指向四个访谈子技能 + 支持单独重跑某部分，并明确纠正「生成 YAML」表述为填充 CLAUDE.md（原 YAML 表述句已移除）
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能 + 编排入口；四部分访谈无丢失迁移并补充解雇/竞业立场字段；访谈结果填充 employment-legal/CLAUDE.md 对应章节，原「生成 YAML」表述已纠正；遵循 _shared 配置契约字段映射。</done>
</task>

<task type="auto">
  <name>Task 3: 新增 labor-dispute-handling（劳动争议处理）技能 + 四个子技能 + 编排入口</name>
  <read_first>
    - employment-legal/skills/_shared/labor-law-citations.md（04-01 产出 — 引用库 C 组 劳动争议调解仲裁法核心条文：仲裁时效1年第27条、一裁终局第47条、仲裁前置）
    - employment-legal/skills/_shared/legal-basis-conventions.md（04-01 产出 — 引用规范 + 劳动仲裁委员会/法院四级定位）
    - employment-legal/skills/_shared/practice-profile-schema.md（04-01 产出 — 配置读取契约，读服务对象/风险偏好/升级矩阵）
    - litigation-legal/skills/_shared/civil-procedure-citations.md（Phase 3 引用库 — 时效/程序/管辖结构范式参照；争议仲裁的时效中止中断/起算结构可借鉴，但不复用其文件路径，引用劳动法版 _shared）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能质量基准）
    - employment-legal/CLAUDE.md（## 谁在使用 服务对象 / ## 风险校准 / ## 升级矩阵）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md,
    employment-legal/skills/labor-dispute-handling/mediation-path/SKILL.md,
    employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md,
    employment-legal/skills/labor-dispute-handling/litigation-path/SKILL.md,
    employment-legal/skills/labor-dispute-handling/SKILL.md
  </files>
  <action>
    新建 labor-dispute-handling 技能：四个子技能（独立 SKILL.md，含 frontmatter name kebab-case：dispute-classification-limitation / mediation-path / arbitration-path / litigation-path；description；argument-hint）+ 一个编排入口 SKILL.md（name: labor-dispute-handling）。每个子技能 MUST 含：目的、前置（读 CLAUDE.md 服务对象/风险/升级 + 引用 _shared 规范/引用库/契约 + 分工说明 + 可单独触发 /employment-legal:<name>）、详细步骤（含表格）、检查清单、输出模板、边界条件（表格）、错误处理（表格）、`## 法律依据`（法条/案例/学说 分类，引用 _shared/labor-law-citations.md，标待验证，含案例/学说占位）。**每个子技能 150+ 行实质内容，深度对标 penalty-assessment。**

    分工（覆盖 调解 / 仲裁一裁终局 / 诉讼 / 时效 完整争议解决路径）：
    - dispute-classification-limitation（争议定性与时效）：劳动争议范围认定（确认劳动关系/订立履行变更解除终止合同/除名辞退辞职离职/工作时间休息休假社保福利培训劳动保护/劳动报酬工伤医疗费经济补偿赔偿金等——哪些属劳动争议、哪些属民事纠纷）+ **仲裁时效（第27条已核实锚点）**：一般时效1年、自当事人知道或应当知道权利被侵害之日起算、时效中止（不可抗力等）与中断（主张权利/请求救济/对方同意履行）、**劳动关系存续期间因拖欠劳动报酬发生争议不受1年限制**（劳动关系终止的自终止之日起1年）。**关键纪律**：第27条标已核实锚点；争议范围条号若不确信标 `[待验证]`。边界条件：超过仲裁时效但对方未抗辩的处理；时效起算点争议（如经济补偿从离职之日还是知道之日）。错误处理：将不属劳动争议的纠纷误入仲裁前置。
    - mediation-path（调解路径）：调解组织（企业劳动争议调解委员会、基层人民调解组织、乡镇街道劳动争议调解组织）+ 调解协议效力（不具强制执行力，但**支付令**：因拖欠劳动报酬/工伤医疗费/经济补偿或赔偿金达成调解协议，用人单位不履行的，劳动者可持调解协议书依法向法院申请支付令 `[待验证]`）+ 调解与仲裁/诉讼的衔接（调解不成可申请仲裁）。边界条件：调解协议反悔；调解时效不停止的风险（须及时申请仲裁保全时效）。
    - arbitration-path（仲裁路径）：**仲裁前置原则**（劳动争议须先经仲裁，对裁决不服方可起诉，部分一裁终局除外）+ **一裁终局识别（第47条已核实锚点）**：（一）追索劳动报酬/工伤医疗费/经济补偿或赔偿金，不超过当地月最低工资标准12个月金额的争议；（二）因执行国家劳动标准在工作时间/休息休假/社会保险等方面发生的争议——这两类仲裁裁决为终局裁决，自作出之日起生效 + 仲裁申请书要素/证据准备/管辖（劳动合同履行地或用人单位所在地仲裁委员会）+ 举证责任（与用人单位掌握管理的证据由用人单位举证）。**关键纪律**：第47条标已核实锚点；管辖/举证条号若不确信标 `[待验证]`。边界条件：一裁终局对劳动者与用人单位的不同救济（劳动者不服可起诉；用人单位仅能在法定情形下向中院申请撤销）。
    - litigation-path（诉讼路径与衔接）：不服非终局裁决的起诉（收到裁决书之日起15日内向法院起诉 `[待验证]`）+ **一裁终局的有限救济**（劳动者对终局裁决不服可在15日内起诉；用人单位不能起诉，只能在法定情形——适用法律错误/仲裁庭无管辖权/违反法定程序/裁决依据伪造证据/对方隐瞒证据/仲裁员贪腐——下自裁决书送达30日内向中级法院申请撤销 `[待验证]`）+ 诉讼与执行衔接（生效裁决/判决的强制执行）+ 一审二审审级。**关键纪律**：15日/30日期限与撤销情形若不确信标 `[待验证]`。边界条件：仲裁裁决部分终局部分非终局的处理；先予执行的适用。

    然后创建 labor-dispute-handling/SKILL.md 编排入口（参照 contract-review 范式）：frontmatter（name: labor-dispute-handling，description 说明编排四个争议子技能）；正文含 (1) 目的与争议处理全流程概览（定性时效 → 调解 → 仲裁 → 诉讼）；(2) 前置加载配置（服务对象决定立场：用人单位方=防御/合规；劳动者方=主张权益）+ 临时模式段落（标 `[临时模式]`）；(3) 子技能编排顺序表（争议定性与时效 → 调解路径 → 仲裁路径 → 诉讼路径与衔接，含路径与单独触发命令）；(4) 入口级护栏（**时效优先**：进入任何路径前先经 dispute-classification-limitation 检查时效是否届满 + 一裁终局识别提示 + 用人单位方/劳动者方立场护栏 + 跨插件提示：诉讼证据三性/时效监控可后续接入 litigation-legal，标为 Deferred 不在本阶段实现）。

    遵守文件格式约定。所有法律依据引用 _shared/labor-law-citations.md，已核实锚点（第27条仲裁时效1年、第47条一裁终局）明确、不确定条号（15日/30日期限、撤销情形、争议范围条号）标待验证。
  </action>
  <verify>
    <automated>for d in dispute-classification-limitation mediation-path arbitration-path litigation-path; do f="employment-legal/skills/labor-dispute-handling/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第27条' employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md && grep -q '一裁终局' employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md && grep -q '仲裁前置\|前置' employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md && grep -q '调解' employment-legal/skills/labor-dispute-handling/mediation-path/SKILL.md; i=employment-legal/skills/labor-dispute-handling/SKILL.md; grep -q '^name: labor-dispute-handling' "$i" && grep -q 'dispute-classification-limitation' "$i" && grep -q 'mediation-path' "$i" && grep -q 'arbitration-path' "$i" && grep -q 'litigation-path' "$i"</automated>
  </verify>
  <acceptance_criteria>
    - 四个争议子技能 + 编排入口 SKILL.md 全部存在，路径为 employment-legal/skills/labor-dispute-handling/<kebab-name>/SKILL.md 与 .../SKILL.md
    - 每个子技能含 frontmatter + 标准章节 + ## 法律依据（法条/案例/学说 分类，标待验证）+ ≥100 非空行
    - dispute-classification-limitation 含仲裁时效1年（第27条）+ 起算/中止中断/存续期间拖欠报酬例外；arbitration-path 含仲裁前置 + 一裁终局识别（第47条）
    - mediation-path 含调解组织/调解协议效力/支付令；litigation-path 含不服裁决起诉/一裁终局有限救济/执行衔接（15日/30日期限标待验证）
    - labor-dispute-handling/SKILL.md 编排入口指向四个子技能 + 时效优先护栏 + 用人单位方/劳动者方立场 + 单独触发命令
    - 已核实锚点（第27条、第47条）明确，不确定条号/期限标待验证不臆造；所有文件无尾部空格、换行结尾、表格列数一致
  </acceptance_criteria>
  <done>新增 labor-dispute-handling 技能，四个子技能（争议定性与时效/调解/仲裁一裁终局/诉讼）+ 编排入口完整；仲裁时效1年引用第27条、一裁终局引用第47条，均为已核实锚点；期限与撤销情形不确信处标待验证；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 4: plugin.json 注册全部技能并升级到 0.3.0</name>
  <read_first>
    - employment-legal/.claude-plugin/plugin.json（现有 0.2.0，注册 5 个扁平技能 — 改造对象）
    - 磁盘上全部已生成的 SKILL.md（04-01 / 04-02 / 本计划 Task 1-3 产出）：用 `find employment-legal/skills -name SKILL.md` 列出全部路径再注册，避免漏注册
    - 其他插件的 plugin.json（如 commercial-legal/.claude-plugin/plugin.json）作为注册结构/版本号格式参照
    - CLAUDE.md（命名约定；JSON 2 空格缩进、文件以换行符结尾、无尾部空格）
  </read_first>
  <files>
    employment-legal/.claude-plugin/plugin.json
  </files>
  <action>
    更新 employment-legal/.claude-plugin/plugin.json：
    1. 版本号 "version" 从 "0.2.0" 升到 "0.3.0"。
    2. 更新 "description"，反映完整技能集（含冷启动访谈、雇佣审查、解雇审查、竞业限制、假期管理、劳动争议处理及各深度子技能）。
    3. 重建 "skills" 数组：先 `find employment-legal/skills -name SKILL.md` 列出磁盘上全部 SKILL.md，逐一注册。须包含六个编排入口（cold-start-interview / hiring-review / termination-review / non-compete-review / leave-management / labor-dispute-handling）+ 全部子技能：
       - 冷启动访谈子技能：identity-team / review-stance / risk-escalation / style-local-rules
       - 雇佣审查子技能（04-01）：document-mandatory-terms / probation-working-hours / social-insurance-wages / service-period-penalty / hiring-review-assembly
       - 解雇审查子技能（04-02）：grounds-legality / severance-calculation / termination-procedure / unlawful-termination-remedy
       - 竞业限制子技能（04-02）：personnel-scope-confidentiality / term-and-compensation / scope-enforceability / breach-liability-remedy
       - 假期管理子技能：annual-leave / sick-leave-medical-period / maternity-female-protection / statutory-leave-attendance
       - 劳动争议处理子技能：dispute-classification-limitation / mediation-path / arbitration-path / litigation-path
       每个条目含 name（与 SKILL.md frontmatter 的 name 一致）、path（相对插件根的 skills/<...>/SKILL.md）、description（简短中文）。**不注册 _shared 下的非技能文件（legal-basis-conventions.md / labor-law-citations.md / practice-profile-schema.md 不是 SKILL.md，不进 skills 数组）。**
    4. 保留 "name" 与 "author" 字段不变。
    严格遵守 JSON 格式：2 空格缩进、键名与现有结构一致（name/version/description/author/skills）、文件以换行符结尾、无尾部空格、无尾随逗号。注册后 name 与各 SKILL.md frontmatter name 必须一一对应（验证脚本会比对）。
  </action>
  <verify>
    <automated>f=employment-legal/.claude-plugin/plugin.json; python3 -c "import json; d=json.load(open('$f')); assert d['version']=='0.3.0', d['version']; names={s['name'] for s in d['skills']}; need={'cold-start-interview','hiring-review','termination-review','non-compete-review','leave-management','labor-dispute-handling','identity-team','review-stance','risk-escalation','style-local-rules','document-mandatory-terms','probation-working-hours','social-insurance-wages','service-period-penalty','hiring-review-assembly','grounds-legality','severance-calculation','termination-procedure','unlawful-termination-remedy','personnel-scope-confidentiality','term-and-compensation','scope-enforceability','breach-liability-remedy','annual-leave','sick-leave-medical-period','maternity-female-protection','statutory-leave-attendance','dispute-classification-limitation','mediation-path','arbitration-path','litigation-path'}; missing=need-names; assert not missing, ('MISSING '+str(missing)); import os; [ (lambda p: (os.path.isfile(p) or (_ for _ in ()).throw(AssertionError('NO FILE '+p))))('employment-legal/'+s['path']) for s in d['skills'] ]; print('OK', len(names), 'skills registered')"</automated>
  </verify>
  <acceptance_criteria>
    - employment-legal/.claude-plugin/plugin.json 为合法 JSON，version 为 "0.3.0"
    - skills 数组注册全部六个编排入口 + 全部 22 个子技能（共 28 个技能条目），每个 name 与对应 SKILL.md frontmatter name 一致、path 指向存在的文件
    - description 更新为反映完整技能集
    - _shared 下的引用规范/引用库/配置契约（非 SKILL.md）未被错误注册进 skills 数组
    - 2 空格缩进、以换行符结尾、无尾部空格、无尾随逗号
  </acceptance_criteria>
  <done>plugin.json 升级到 0.3.0，注册全部编排入口与子技能（每个 path 指向存在的 SKILL.md、name 一致），description 更新，JSON 合法且格式合规。</done>
</task>

</tasks>

<verification>
- 假期四子技能 + 假期编排入口 + 访谈四子技能 + 访谈编排入口 + 争议四子技能 + 争议编排入口 + 升级注册后的 plugin.json 全部存在且格式合规（共 16 个文件）
- 现有 leave-management 61 行与 cold-start-interview 62 行内容无丢失迁移并深化；cold-start-interview「生成 YAML」表述已纠正为填充 employment-legal/CLAUDE.md
- 新增 labor-dispute-handling 覆盖 定性时效/调解/仲裁一裁终局/诉讼 完整路径
- 已核实锚点（仲裁时效1年=第27条、一裁终局=第47条、未休年休假300%准确表述）明确；不确定条号（15日/30日期限、撤销情形、医疗期/争议范围条号、产假地方天数）均标 `[待验证]` 或地方性标记，无臆造
- plugin.json 升级 0.3.0，注册全部 28 个技能条目，name 与 SKILL.md 一一对应
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('employment-legal/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 律师/HR 可单独触发任一假期子能力（4）、访谈子能力（4，支持只更新某部分配置）、争议子能力（4）
- 每个深度子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行（访谈子技能 80+ 行含完整问题集 + 写入映射）
- 冷启动访谈结果填充 employment-legal/CLAUDE.md 对应章节，不生成独立 YAML（表述已纠正）
- labor-dispute-handling 提供入职到争议全链路的争议解决能力，仲裁时效1年/一裁终局已核实锚点明确
- plugin.json 升级到 0.3.0 并注册全部技能，Phase 4 交付完整可调用的 employment-legal 技能集
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/04-employment-legal-core/04-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
