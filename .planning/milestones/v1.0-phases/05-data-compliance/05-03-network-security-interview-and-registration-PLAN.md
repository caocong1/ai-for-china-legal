---
phase: 05-data-compliance
plan: 03
type: execute
wave: 2
depends_on:
  - 05-01
  - 05-02
files_modified:
  - data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md
  - data-compliance/skills/network-security-compliance/cii-protection/SKILL.md
  - data-compliance/skills/network-security-compliance/operator-obligations/SKILL.md
  - data-compliance/skills/network-security-compliance/personal-info-collection/SKILL.md
  - data-compliance/skills/network-security-compliance/SKILL.md
  - data-compliance/skills/cold-start-interview/identity-team/SKILL.md
  - data-compliance/skills/cold-start-interview/compliance-stance/SKILL.md
  - data-compliance/skills/cold-start-interview/risk-escalation/SKILL.md
  - data-compliance/skills/cold-start-interview/style-cross-border-policy/SKILL.md
  - data-compliance/skills/cold-start-interview/SKILL.md
  - data-compliance/.claude-plugin/plugin.json
autonomous: true
requirements:
  - NETWORK-SECURITY-COMPLIANCE
  - COLD-START-INTERVIEW-DECOMP
  - PLUGIN-REGISTRATION
user_setup: []

must_haves:
  truths:
    - "新增 network-security-compliance（网络安全法合规检查）技能，覆盖网络安全等级保护（CSL第21条）/ 关键信息基础设施保护（CSL第31条起）/ 网络运营者义务 / 个人信息收集合规，四个子技能可独立触发 + 编排入口"
    - "冷启动访谈拆为可独立触发的访谈子技能（身份与团队 / 合规立场 / 风险与升级 / 文书风格与跨境政策），按部分收集执业立场并填充 data-compliance/CLAUDE.md 对应章节（不再生成独立 YAML）"
    - "现有 cold-start-interview（三部分访谈）内容无丢失迁移到子技能并深化，原 SKILL.md 改为编排入口；末尾「生成 YAML 格式」表述纠正为填充 data-compliance/CLAUDE.md"
    - "plugin.json 升级到 0.2.0 并注册全部子技能（PIA4 + 出境4 + 数据安全4 + 网络安全4 + 访谈4 + 五个编排入口 = 25 个技能条目），JSON 合法、2空格缩进"
    - "网络安全等级保护与关基保护引用 CSL第21条/第31条起（已核实），等保定级标准与关基认定具体条号、日志留存期限等标待验证"
    - "每个子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据（网络安全子技能 150+ 行；访谈子技能 80+ 行）"
  artifacts:
    - path: "data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md"
      provides: "网络安全等级保护子技能：CSL第21条 等保定级/备案/测评/整改（等保2.0五级，定级标准条号待验证）"
      contains: "第21条"
      min_lines: 150
    - path: "data-compliance/skills/network-security-compliance/cii-protection/SKILL.md"
      provides: "关键信息基础设施保护子技能：CSL第31条起 关基识别/运营者安全保护义务/数据本地化与出境（第37条待验证）"
      contains: "第31条"
      min_lines: 150
    - path: "data-compliance/skills/network-security-compliance/operator-obligations/SKILL.md"
      provides: "网络运营者义务子技能：实名制/日志留存不少于六个月/技术措施/应急预案/安全监测（具体条号待验证）"
      contains: "## 法律依据"
      min_lines: 150
    - path: "data-compliance/skills/network-security-compliance/personal-info-collection/SKILL.md"
      provides: "个人信息收集合规子技能：CSL与PIPL衔接/收集使用规则/合法正当必要/同意与最小必要"
      contains: "最小必要"
      min_lines: 150
    - path: "data-compliance/skills/network-security-compliance/SKILL.md"
      provides: "网络安全法合规检查编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "data-compliance/skills/cold-start-interview/identity-team/SKILL.md"
      provides: "访谈子技能：身份与团队（数据处理者画像）→ 填充 ## 我们是谁 / ## 谁在使用 / ## 可用集成"
      contains: "data-compliance/CLAUDE.md"
      min_lines: 80
    - path: "data-compliance/skills/cold-start-interview/compliance-stance/SKILL.md"
      provides: "访谈子技能：合规立场（敏感数据政策/跨境政策/数据安全立场）→ 填充 ## 合规立场"
      contains: "敏感数据"
      min_lines: 80
    - path: "data-compliance/skills/cold-start-interview/risk-escalation/SKILL.md"
      provides: "访谈子技能：风险等级与升级矩阵与监管报告触发 → 填充 ## 风险校准 / ## 升级矩阵"
      contains: "风险"
      min_lines: 80
    - path: "data-compliance/skills/cold-start-interview/style-cross-border-policy/SKILL.md"
      provides: "访谈子技能：文书风格与行业监管/跨境路径偏好 → 填充 ## 文书风格 / ## 输出 / ## 共享护栏"
      contains: "行业监管"
      min_lines: 80
    - path: "data-compliance/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（指向四个访谈子技能，写入 data-compliance/CLAUDE.md，纠正 YAML 表述）"
      min_lines: 40
    - path: "data-compliance/.claude-plugin/plugin.json"
      provides: "插件配置升级到 0.2.0 并注册全部子技能与五个编排入口"
      contains: "0.2.0"
      min_lines: 40
  key_links:
    - from: "data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用网络安全等级保护（CSL第21条）"
      pattern: "data-protection-citations|第21条"
    - from: "data-compliance/skills/network-security-compliance/cii-protection/SKILL.md"
      to: "data-compliance/skills/_shared/data-protection-citations.md"
      via: "引用关键信息基础设施保护（CSL第31条起）"
      pattern: "data-protection-citations|第31条"
    - from: "data-compliance/skills/cold-start-interview/compliance-stance/SKILL.md"
      to: "data-compliance/CLAUDE.md"
      via: "访谈结果写入 ## 合规立场 章节（非独立 YAML）"
      pattern: "data-compliance/CLAUDE.md|合规立场"
    - from: "data-compliance/skills/cold-start-interview/SKILL.md"
      to: "data-compliance/skills/_shared/practice-profile-schema.md"
      via: "访谈编排入口遵循配置契约字段映射写入 CLAUDE.md"
      pattern: "practice-profile-schema|CLAUDE.md"
    - from: "data-compliance/.claude-plugin/plugin.json"
      to: "全部子技能与五个编排入口 SKILL.md"
      via: "skills 数组注册每个技能路径"
      pattern: "network-security-compliance|mlps-grading|compliance-stance|data-classification-grading|pathway-determination"
---

<objective>
新增网络安全法合规检查（network-security-compliance）主技能，拆分冷启动访谈为可独立触发的访谈子技能，并在 plugin.json 注册全部子技能、升级到 0.2.0。

本计划交付三块内容：
1. **新增网络安全法合规检查** — 按 CONTEXT 覆盖 ROADMAP 第四能力面，新建 network-security-compliance 主技能，拆为四个子技能：网络安全等级保护（CSL第21条等保2.0） / 关键信息基础设施保护（CSL第31条起 + 数据本地化） / 网络运营者义务（实名制/日志留存/技术措施/应急预案） / 个人信息收集合规（CSL与PIPL衔接），外加一个编排入口。
2. **冷启动访谈拆分** — 将 cold-start-interview（现 ~26 行三部分：基本信息 / 审查立场 / 文书风格）拆为四个可独立触发的访谈子技能：身份与团队 / 合规立场 / 风险与升级 / 文书风格与跨境政策，各填充 data-compliance/CLAUDE.md 对应章节。原 SKILL.md 改为编排入口，并纠正末尾「生成数据合规实践配置文件（YAML 格式）」为填充 data-compliance/CLAUDE.md。
3. **插件注册与版本升级** — plugin.json 注册全部 25 个技能条目（PIA 4 子 + 出境 4 子 + 数据安全 4 子 + 网络安全 4 子 + 访谈 4 子 + 五个编排入口），description 更新为完整能力描述，version 升级到 0.2.0。

Purpose: 关闭「ROADMAP 要求网络安全法合规检查 + 冷启动访谈两个能力面，现实网络安全法合规检查完全缺失、访谈为浅骨架」的 gap，并完成全插件技能注册使所有子技能可被斜杠命令触发。本计划依赖 05-01（_shared 脊柱 + CLAUDE.md）与 05-02（出境/数据安全子技能路径用于注册），且**修改 plugin.json 须在 05-01/05-02 全部产出路径就绪后**，故为 wave 2。
Output: 4 个网络安全子技能 + 1 个网络安全编排入口 + 4 个访谈子技能 + 1 个访谈编排入口 + 升级到 0.2.0 并注册全部技能的 plugin.json。

中国化原则约束（来自 CLAUDE.md）：成文法为主（CSL 2017 + 关键信息基础设施安全保护条例 2021 + 网络安全等级保护制度标准等保2.0 + PIPL 衔接）；行业监管特色（公安部主管等级保护与关基、网信办统筹、行业主管部门）；执业环境适配（DPO/法务/外部律师）。命名 kebab-case；斜杠命令 /data-compliance:<skill>。文件格式：JSON 2 空格缩进、换行结尾、无尾部空格、表格列数一致。

法律内容硬性要求：**快速演进监管领域，保守优先**。已核实锚点：网络安全等级保护制度=CSL第21条；关键信息基础设施安全保护=CSL第31条起。**等保定级标准具体条款号、关基个人信息和重要数据本地化与出境（第37条）的具体条号、网络运营者日志留存不少于六个月等具体条号一律标 `[待验证]`；等保 2.0 国家标准编号（GB/T 22239 等）标 `[待验证]`；关基认定办法/主管部门规定标 `[待验证]` `[行业监管 flagged]`，绝不臆造。**
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/05-data-compliance/05-CONTEXT.md
@CLAUDE.md
@data-compliance/skills/cold-start-interview/SKILL.md
@data-compliance/.claude-plugin/plugin.json
@data-compliance/skills/_shared/data-protection-citations.md
@data-compliance/skills/_shared/legal-basis-conventions.md
@data-compliance/skills/_shared/practice-profile-schema.md
@data-compliance/CLAUDE.md
@employment-legal/.claude-plugin/plugin.json
@employment-legal/skills/cold-start-interview/SKILL.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md

> 注：本计划引用 05-01 产出的 _shared 脊柱与 data-compliance/CLAUDE.md，并注册 05-01/05-02 产出的全部子技能路径。
</context>

<tasks>

<task type="auto">
  <name>Task 1: 新增 network-security-compliance（网络安全法合规检查）四个子技能 + 编排入口</name>
  <read_first>
    - data-compliance/skills/_shared/data-protection-citations.md（05-01 产出 — 引用库，重点：CSL第21条等保、CSL第31条起关基、CSL第37条本地化待验证、网络运营者义务条号待验证、等保2.0国标待验证）
    - data-compliance/skills/_shared/legal-basis-conventions.md（05-01 产出 — 引用规范，含部门规章/国标来源分类、公安部/网信办行业监管定位）
    - data-compliance/skills/_shared/practice-profile-schema.md（05-01 产出 — 配置读取契约）
    - data-compliance/CLAUDE.md（05-01 产出 — 读取数据安全立场/CIIO/数据处理者画像/行业）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 完整章节范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式）
    - CLAUDE.md（命名 kebab-case；文件格式；行业监管特色）
  </read_first>
  <files>
    data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md,
    data-compliance/skills/network-security-compliance/cii-protection/SKILL.md,
    data-compliance/skills/network-security-compliance/operator-obligations/SKILL.md,
    data-compliance/skills/network-security-compliance/personal-info-collection/SKILL.md,
    data-compliance/skills/network-security-compliance/SKILL.md
  </files>
  <action>
    新建 network-security-compliance 主技能：四个子技能（独立 SKILL.md，含 frontmatter：name kebab-case / description / argument-hint）+ 一个编排入口。每个子技能 MUST 含标准章节：目的、前置（读取 data-compliance/CLAUDE.md 数据安全立场/CIIO + 引用 _shared 规范/引用库/契约 + 分工说明 + 可单独触发）、详细步骤（含表格）、检查清单、输出模板（markdown 结构）、边界条件（表）、错误处理（表）、`## 法律依据`（按 法条/行政法规/部门规章/国家标准 与 案例/学说 分类，引用 _shared/data-protection-citations.md，标待验证，含占位）。**每个子技能 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment。**

    分工（依《网络安全法》构建，无现有源可迁移，须自建深度内容）：
    - mlps-grading（网络安全等级保护）：依 CSL 第21条（已核实，国家实行网络安全等级保护制度，网络运营者应按等级保护制度要求履行安全保护义务）+ 等保 2.0。详细步骤：等保定级（五级：第一级到第五级，按受侵害客体与危害程度，**定级标准具体条款与 GB/T 22239 等国标编号标 `[待验证]`**）、定级备案（向公安机关备案 `[待验证]`）、等级测评（第三级及以上须定期测评 `[待验证]`）、安全建设整改。深化：等保五级判定表、定级备案测评流程表、等保 2.0 安全要求维度（安全物理环境/通信网络/区域边界/计算环境/管理中心 + 管理要求，标 `[待验证]`）。边界条件：云计算/物联网/工业控制系统等扩展要求（等保 2.0 安全扩展要求，标 `[待验证]`）。
    - cii-protection（关键信息基础设施保护）：依 CSL 第31条起（已核实，国家对公共通信和信息服务、能源、交通、水利、金融、公共服务、电子政务等重要行业和领域，以及其他一旦遭到破坏丧失功能或数据泄露可能严重危害国家安全国计民生公共利益的关键信息基础设施，在网络安全等级保护制度基础上实行重点保护）+ 关键信息基础设施安全保护条例（2021）。详细步骤：关基识别（由保护工作部门认定并通知运营者，标 `[待验证]` `[行业监管 flagged]`）、关基运营者特别义务（设置专门安全管理机构与负责人、定期检测评估、应急演练等，具体条号 `[待验证]`）、数据本地化与出境（CSL 第37条 `[待验证具体条号]`：关基运营者在境内运营中收集和产生的个人信息和重要数据应在境内存储，确需出境的须经安全评估——衔接 cross-border-assessment）。深化：关基重点行业表、关基运营者义务清单表、本地化与出境路径表。边界条件：非关基但承载重要数据的系统仍受 DSL 约束（衔接 data-security-compliance）。
    - operator-obligations（网络运营者义务）：网络运营者一般安全义务（履行等级保护义务、制定内部安全管理制度与操作规程、采取防范计算机病毒和网络攻击的技术措施、采取数据分类与备份加密措施、网络日志留存不少于六个月 `[待验证具体条号]`）；网络实名制（要求用户提供真实身份信息，否则不得提供相关服务 `[待验证]`）；网络安全事件应急预案与处置、配合监督检查；违法信息处置义务。深化：运营者义务清单对照表、日志留存与实名制要点表、安全事件处置流程表。边界条件：小微主体义务的适度性（仍须基本义务，标说明）。
    - personal-info-collection（个人信息收集合规）：CSL 关于网络运营者收集使用个人信息的规则与 PIPL 衔接（合法正当必要原则、公开收集使用规则、明示目的方式范围并经被收集者同意、不得收集与其提供服务无关的个人信息——CSL 相关条号 `[待验证]`）；CSL 与 PIPL 的关系（PIPL 为个人信息保护专门法，CSL 网络运营者收集使用规则与 PIPL 第13-14条告知-同意、最小必要衔接，PIPL 优先适用个人信息保护事项）；用户信息保密与泄露补救、用户注销与删除更正权（与 PIPL 第44-47条衔接）。深化：CSL/PIPL 衔接对照表、收集使用合规清单、与 pia-generation 的分工说明（PIA 深度评估见 pia-generation，本子技能聚焦 CSL 网络运营者层面收集规则）。边界条件：个人信息保护的实体要求以 PIPL 为准，本子技能避免与 pia-generation 重复（分工说明）。

    **新建编排入口** data-compliance/skills/network-security-compliance/SKILL.md：frontmatter（name: network-security-compliance / description 编排说明 / argument-hint）。正文：(1) 目的与网络安全法合规整体流程概览（依《网络安全法》开展等级保护、关基保护、网络运营者义务与个人信息收集合规）；(2) 前置：读取 data-compliance/CLAUDE.md，缺失/占位时标准提示（运行 cold-start-interview 或「临时模式」），临时模式段落（CIIO 从严推定、等保定级保守、标 `[临时模式]`）；(3) 子技能编排顺序表——网络安全等级保护 → 关键信息基础设施保护 → 网络运营者义务 → 个人信息收集合规，每行说明做什么 + 子技能路径 + 单独触发命令（/data-compliance:<name>）；(4) 入口级护栏：数据处理者/CIIO 立场确认、关基识别提示、行业监管识别（公安部等保关基/网信办统筹）、目的地/特权检查、本地化出境衔接 cross-border-assessment、个人信息收集衔接 pia-generation、时效性提示。

    遵守文件格式约定。所有法律依据引用 _shared/data-protection-citations.md，CSL第21条/第31条起已核实明确、等保定级标准/关基认定/日志留存/第37条本地化具体条号与国标编号标待验证。
  </action>
  <verify>
    <automated>for d in mlps-grading cii-protection operator-obligations personal-info-collection; do f="data-compliance/skills/network-security-compliance/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=data-compliance/skills/network-security-compliance/SKILL.md; grep -q '^name: network-security-compliance' "$e" && grep -q 'mlps-grading' "$e" && grep -q 'cii-protection' "$e" && grep -q 'operator-obligations' "$e" && grep -q 'personal-info-collection' "$e" && grep -q '临时模式' "$e" && grep -q '第21条' data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md && grep -q '第31条' data-compliance/skills/network-security-compliance/cii-protection/SKILL.md && grep -q '等级保护\|等保' data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个网络安全子技能 SKILL.md 全部存在，路径为 data-compliance/skills/network-security-compliance/<kebab-name>/SKILL.md，各含 frontmatter（name/description/argument-hint）
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行
    - mlps-grading 含 CSL第21条等保 + 等保五级 + 定级备案测评（定级标准/国标编号标待验证）；cii-protection 含 CSL第31条起关基 + 数据本地化与出境（第37条待验证）；operator-obligations 含实名制/日志留存六个月/技术措施（条号待验证）；personal-info-collection 含 CSL与PIPL衔接 + 合法正当必要最小必要
    - network-security-compliance/SKILL.md 编排入口：含子技能编排顺序表（指向四子技能 + 单独触发命令）+ 入口级护栏（CIIO/关基/行业监管/临时模式/本地化出境衔接/收集衔接 PIA/特权检查）
    - 等保定级标准/关基认定/日志留存/第37条本地化条号与等保2.0国标编号一律标 `[待验证]`，关基认定标 `[行业监管 flagged]`，无臆造
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 network-security-compliance 主技能（四子技能 + 编排入口）；CSL第21条等保、第31条起关基已核实明确；等保定级标准/关基认定/日志留存/第37条本地化与国标编号标待验证；法律依据按来源分类引用 _shared 库；编排入口护栏完整、衔接 cross-border-assessment 与 pia-generation。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 cold-start-interview 为四个访谈子技能 + 改造编排入口</name>
  <read_first>
    - data-compliance/skills/cold-start-interview/SKILL.md（现有 ~26 行三部分访谈 — 基本信息/审查立场/文书风格；这是要拆分迁移并深化的源；末尾「生成数据合规实践配置文件（YAML 格式）」须纠正）
    - data-compliance/CLAUDE.md（05-01 产出 — 访谈填充目标，章节：我们是谁/谁在使用/可用集成/合规立场（敏感数据政策/跨境政策/数据安全立场）/风险校准/升级矩阵/文书风格/输出/共享护栏）
    - data-compliance/skills/_shared/practice-profile-schema.md（05-01 产出 — 字段映射契约，访谈子技能据此填充 CLAUDE.md 对应章节）
    - employment-legal/skills/cold-start-interview/SKILL.md（访谈编排入口范式 — 拆分后入口写法、写入 CLAUDE.md 而非 YAML）
    - employment-legal/skills/cold-start-interview/identity-team/SKILL.md 或同级访谈子技能（如存在，访谈子技能结构范式：问题清单 + 填充章节映射 + 合理性检查 + 写入说明）
    - commercial-legal/skills/_shared/practice-profile-schema.md（字段映射与立场选择参照）
    - CLAUDE.md（命名 kebab-case；文件格式）
  </read_first>
  <files>
    data-compliance/skills/cold-start-interview/identity-team/SKILL.md,
    data-compliance/skills/cold-start-interview/compliance-stance/SKILL.md,
    data-compliance/skills/cold-start-interview/risk-escalation/SKILL.md,
    data-compliance/skills/cold-start-interview/style-cross-border-policy/SKILL.md,
    data-compliance/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将现有 cold-start-interview/SKILL.md 三部分访谈拆分迁移并深化到四个访谈子技能（独立 SKILL.md，含 frontmatter：name kebab-case / description / argument-hint），并将原 SKILL.md 改造为编排入口。每个访谈子技能 MUST 含：目的、前置（说明填充 data-compliance/CLAUDE.md 对应章节、遵循 practice-profile-schema 字段映射、可单独触发）、访谈问题清单（分组提问，含追问与默认值提示）、字段→CLAUDE.md 章节映射表、法律事实合理性检查（用户口述条号/阈值时按 schema 合理性检查，标 `[前提 flagged — 需验证]`）、写入说明（填充 CLAUDE.md 对应章节占位符，**不另存 YAML**）、重跑/部分更新说明。**每个访谈子技能 80+ 行实质内容**（访谈类深度基准低于审查类，但须远超现有骨架）。

    分工（迁移现有三部分并深化，无丢失）：
    - identity-team（身份与团队）：迁移现「第一部分 基本信息」（律师角色和服务对象 DPO/法务/外部律师、主要数据合规领域）并深化为数据处理者画像采集。问题：组织/律所名称与实体类型、所属行业（影响行业监管）、数据处理者角色（个人信息处理者/受托处理者/是否 CIIO）、处理个人信息规模、是否处理敏感个人信息、是否有数据出境场景、合规团队规模、DPO/负责人、可用集成、角色（律师/DPO/非律师）。填充 ## 我们是谁 / ## 谁在使用 / ## 可用集成。
    - compliance-stance（合规立场）：迁移现「第二部分 审查立场」（风险偏好、PIA 审查重点、数据出境评估重点、交易破坏者清单）并深化为三维立场。问题：整体合规偏好（保守/平衡/进取）、敏感数据政策（敏感个人信息处理门槛/单独同意方式/未成年人信息）、跨境政策（是否允许出境/首选路径/本地化立场/接收方法域偏好/重要数据出境立场）、数据安全立场（分类分级策略/重要数据识别/等保定级倾向）。填充 ## 合规立场（### 敏感数据政策 / ### 跨境政策 / ### 数据安全立场）。
    - risk-escalation（风险与升级）：新增深化（现访谈未独立覆盖）。问题：风险等级定义、升级矩阵（DPO/主办律师/法务总监权限与升级条件）、自动升级触发（重要数据出境/大规模敏感个人信息/监管问询/数据泄露事件）、监管报告触发（数据安全事件报告/个人信息泄露通知义务）。填充 ## 风险校准 / ## 升级矩阵。合理性检查：用户口述罚款阈值/报告时限时标待验证。
    - style-cross-border-policy（文书风格与跨境政策/行业监管）：迁移现「第三部分 文书风格」（输出格式偏好、法律依据引用偏好）并深化。问题：合规报告/PIA/出境评估报告风格、监管沟通风格、工作产物存放位置、行业监管偏好（行业主管部门/特殊数据合规要求）、是否含法条引用/案例引用/双语。填充 ## 文书风格 / ## 输出 / ## 共享护栏（### 行业监管识别）。

    **改造编排入口** data-compliance/skills/cold-start-interview/SKILL.md：frontmatter（name: cold-start-interview，description 更新为编排说明）。正文：(1) 顶部迁移说明指向访谈子技能；(2) 访谈目的与整体流程；(3) 访谈子技能编排顺序表——身份与团队 → 合规立场 → 风险与升级 → 文书风格与跨境政策，每行说明收集什么 + 子技能路径 + 单独触发命令（/data-compliance:<name>）；(4) **纠正现有「生成数据合规实践配置文件（YAML 格式）」表述**——明确访谈结果写入 data-compliance/CLAUDE.md 对应章节（散文真相来源），不另存独立 YAML 文件；(5) 重跑/部分更新/直接编辑/git 版本控制说明。

    遵守文件格式约定。访谈子技能填充目标章节须与 data-compliance/CLAUDE.md 实际章节名一致，并遵循 practice-profile-schema 字段映射。
  </action>
  <verify>
    <automated>for d in identity-team compliance-stance risk-escalation style-cross-border-policy; do f="data-compliance/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q 'data-compliance/CLAUDE.md' "$f" || { echo "NO CLAUDE.md REF $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 60 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=data-compliance/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$e" && grep -q 'identity-team' "$e" && grep -q 'compliance-stance' "$e" && grep -q 'risk-escalation' "$e" && grep -q 'style-cross-border-policy' "$e" && grep -q 'data-compliance/CLAUDE.md' "$e" && ! grep -q 'YAML 格式' "$e"</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md 全部存在，路径为 data-compliance/skills/cold-start-interview/<kebab-name>/SKILL.md，各含 frontmatter（name/description/argument-hint）
    - 每个访谈子技能含：目的、前置、访谈问题清单、字段→CLAUDE.md 章节映射、合理性检查、写入说明（填充 CLAUDE.md 不另存 YAML），且每个 ≥60 非空行
    - identity-team 填充 ## 我们是谁/## 谁在使用/## 可用集成；compliance-stance 填充 ## 合规立场（敏感数据/跨境/数据安全）；risk-escalation 填充 ## 风险校准/## 升级矩阵；style-cross-border-policy 填充 ## 文书风格/## 输出/## 共享护栏
    - cold-start-interview/SKILL.md 改为编排入口：含访谈子技能编排顺序表 + 纠正「生成 YAML」为填充 data-compliance/CLAUDE.md + 重跑/编辑说明；编排入口正文不含「YAML 格式」表述
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能 + 编排入口；现有三部分访谈无丢失迁移并深化；各子技能填充 data-compliance/CLAUDE.md 对应章节、遵循 practice-profile-schema 字段映射；「生成 YAML」表述纠正为填充 CLAUDE.md。</done>
</task>

<task type="auto">
  <name>Task 3: plugin.json 注册全部子技能并升级到 0.2.0</name>
  <read_first>
    - data-compliance/.claude-plugin/plugin.json（现有 — name/version 0.1.0/description/author，待升级并注册 skills 数组）
    - employment-legal/.claude-plugin/plugin.json（注册结构范式 — skills 数组每条 name/path/description、编排入口与子技能并列注册、description 总览写法、版本号位置）
    - 本阶段全部 SKILL.md 路径（05-01 PIA 4子+入口、05-02 出境4子+入口/数据安全4子+入口、本计划网络安全4子+入口/访谈4子+入口）——确认每个 path 与 name 与实际文件一致
    - CLAUDE.md（命名约定；JSON 2 空格缩进；文件以换行符结尾）
  </read_first>
  <files>
    data-compliance/.claude-plugin/plugin.json
  </files>
  <action>
    更新 data-compliance/.claude-plugin/plugin.json：
    - version：0.1.0 → **0.2.0**
    - description：更新为完整能力总览（数据合规法律技能套件：覆盖冷启动访谈（身份/合规立场/风险升级/文书跨境）、个保法 PIA 生成（评估情形告知同意/数据映射最小必要/风险评估保护措施/报告组装）、数据出境评估（路径判定/安全评估申报/标准合同/装配）、数据安全法合规检查（分类分级/重要数据/管理制度/风险报告）、网络安全法合规检查（等级保护/关基保护/运营者义务/个人信息收集），五大模块二十个子技能加五个编排入口，覆盖 PIPL/DSL/CSL 全链路合规）
    - author：保留
    - 新增 skills 数组，注册 **25 个技能条目**，每条含 name（kebab-case，与 SKILL.md frontmatter name 一致）/ path（相对插件根的 skills/.../SKILL.md）/ description（一句话）：
      1. cold-start-interview（入口）— skills/cold-start-interview/SKILL.md
      2. identity-team — skills/cold-start-interview/identity-team/SKILL.md
      3. compliance-stance — skills/cold-start-interview/compliance-stance/SKILL.md
      4. risk-escalation — skills/cold-start-interview/risk-escalation/SKILL.md
      5. style-cross-border-policy — skills/cold-start-interview/style-cross-border-policy/SKILL.md
      6. pia-generation（入口）— skills/pia-generation/SKILL.md
      7. trigger-consent-basis — skills/pia-generation/trigger-consent-basis/SKILL.md
      8. data-mapping-necessity — skills/pia-generation/data-mapping-necessity/SKILL.md
      9. risk-mitigation-assessment — skills/pia-generation/risk-mitigation-assessment/SKILL.md
      10. pia-report-assembly — skills/pia-generation/pia-report-assembly/SKILL.md
      11. cross-border-assessment（入口）— skills/cross-border-assessment/SKILL.md
      12. pathway-determination — skills/cross-border-assessment/pathway-determination/SKILL.md
      13. security-assessment-filing — skills/cross-border-assessment/security-assessment-filing/SKILL.md
      14. standard-contract — skills/cross-border-assessment/standard-contract/SKILL.md
      15. cross-border-assembly — skills/cross-border-assessment/cross-border-assembly/SKILL.md
      16. data-security-compliance（入口）— skills/data-security-compliance/SKILL.md
      17. data-classification-grading — skills/data-security-compliance/data-classification-grading/SKILL.md
      18. important-data-handling — skills/data-security-compliance/important-data-handling/SKILL.md
      19. security-management-system — skills/data-security-compliance/security-management-system/SKILL.md
      20. risk-assessment-reporting — skills/data-security-compliance/risk-assessment-reporting/SKILL.md
      21. network-security-compliance（入口）— skills/network-security-compliance/SKILL.md
      22. mlps-grading — skills/network-security-compliance/mlps-grading/SKILL.md
      23. cii-protection — skills/network-security-compliance/cii-protection/SKILL.md
      24. operator-obligations — skills/network-security-compliance/operator-obligations/SKILL.md
      25. personal-info-collection — skills/network-security-compliance/personal-info-collection/SKILL.md
    严格遵守 JSON 2 空格缩进、文件以换行符结尾、无尾部空格。每个 path 必须指向实际存在的 SKILL.md（注册前用 ls/test 核对 05-01/05-02/本计划产出齐全）。description 字段为简洁中文一句话，准确反映该技能职责（已核实锚点可在描述中点出，如「分类分级 DSL第21条」「跨境三路径 PIPL第38条」「等级保护 CSL第21条」「告知-同意 PIPL第13-14条」）。
  </action>
  <verify>
    <automated>f=data-compliance/.claude-plugin/plugin.json; python3 -c "import json,sys; d=json.load(open('$f')); assert d['version']=='0.2.0', 'version not 0.2.0'; sk=d.get('skills',[]); assert len(sk)==25, 'expected 25 skills got %d'%len(sk); names={s['name'] for s in sk}; req={'cold-start-interview','identity-team','compliance-stance','risk-escalation','style-cross-border-policy','pia-generation','trigger-consent-basis','data-mapping-necessity','risk-mitigation-assessment','pia-report-assembly','cross-border-assessment','pathway-determination','security-assessment-filing','standard-contract','cross-border-assembly','data-security-compliance','data-classification-grading','important-data-handling','security-management-system','risk-assessment-reporting','network-security-compliance','mlps-grading','cii-protection','operator-obligations','personal-info-collection'}; missing=req-names; assert not missing, 'missing skills: %s'%missing; import os; [sys.exit('MISSING FILE '+os.path.join('data-compliance',s['path'])) for s in sk if not os.path.exists(os.path.join('data-compliance',s['path']))]; print('OK 25 skills, all paths exist, v0.2.0')"</automated>
  </verify>
  <acceptance_criteria>
    - data-compliance/.claude-plugin/plugin.json version 为 0.2.0
    - description 更新为完整能力总览，覆盖五大模块
    - skills 数组含 25 个条目（5 个编排入口 + 20 个子技能），每条 name/path/description 齐全
    - 每个 path 指向实际存在的 SKILL.md（无悬空路径）；每个 name 与对应 SKILL.md frontmatter name 一致且 kebab-case
    - JSON 合法、2 空格缩进、文件以换行符结尾、无尾部空格
  </acceptance_criteria>
  <done>plugin.json 升级到 0.2.0，注册全部 25 个技能条目（五入口 + 二十子技能），所有 path 指向实际文件，description 总览完整，JSON 合法 2 空格缩进。</done>
</task>

</tasks>

<verification>
- 四个网络安全子技能 + 网络安全编排入口 + 四个访谈子技能 + 访谈编排入口 + 升级注册后的 plugin.json 全部存在且格式合规
- 现有 cold-start-interview 三部分访谈无丢失迁移并深化，「生成 YAML」纠正为填充 data-compliance/CLAUDE.md
- 已核实锚点（等级保护=CSL21条、关基=CSL31条起）明确；等保定级标准/关基认定/日志留存/第37条本地化条号与等保2.0国标编号均标 `[待验证]`/`[行业监管 flagged]`，无臆造
- plugin.json 升级 0.2.0、注册 25 个技能、所有 path 指向实际文件、JSON 合法 2 空格缩进
- 全插件斜杠命令可触发：每个 SKILL.md 的 name 与 plugin.json 注册一致
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('data-compliance/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 律师/DPO 可单独触发任一网络安全子能力（4 个）与任一访谈子能力（4 个），各自有 frontmatter + 触发名
- 网络安全子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容；访谈子技能 80+ 行
- 数据合规法律引用按来源分类并标待验证；CSL21/31条已核实明确；等保定级/关基认定/日志留存保守标待验证
- 冷启动访谈拆为四子技能填充 data-compliance/CLAUDE.md，纠正 YAML 表述
- plugin.json 升级 0.2.0 并注册全部 25 个技能，所有 path 有效、JSON 合法
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/05-data-compliance/05-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
