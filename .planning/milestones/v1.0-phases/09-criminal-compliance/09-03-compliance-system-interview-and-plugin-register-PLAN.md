---
phase: 09-criminal-compliance
plan: 03
type: execute
wave: 2
depends_on:
  - 09-01
  - 09-02
files_modified:
  - criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md
  - criminal-compliance/skills/compliance-system-building/policy-process-design/SKILL.md
  - criminal-compliance/skills/compliance-system-building/organization-training/SKILL.md
  - criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md
  - criminal-compliance/skills/compliance-system-building/SKILL.md
  - criminal-compliance/skills/cold-start-interview/identity-enterprise-profile/SKILL.md
  - criminal-compliance/skills/cold-start-interview/compliance-stance-scope/SKILL.md
  - criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md
  - criminal-compliance/skills/cold-start-interview/style-regulatory-resources/SKILL.md
  - criminal-compliance/skills/cold-start-interview/SKILL.md
  - criminal-compliance/.claude-plugin/plugin.json
autonomous: true
requirements:
  - COMPLIANCE-SYSTEM-NEW
  - INTERVIEW-DECOMP
  - PLUGIN-REGISTER
user_setup: []

must_haves:
  truths:
    - "存在全新的 compliance-system-building（刑事合规体系建设）主技能，律师/合规官/法务可单独触发任一子能力（合规风险识别 / 合规制度与流程设计 / 合规组织与培训 / 合规有效性评估与整改）或运行完整合规体系建设流程"
    - "compliance-system-building 覆盖全面刑事合规风险识别与风险地图、合规政策与行为准则与重点领域专项制度与禁止性清单、合规组织架构三道防线与培训考核、合规有效性评估指标与定期审计与整改闭环与有效合规衔接合规不起诉；有效合规认定标准属规范性文件标待验证，涉刑情形强制升级辩护律师"
    - "律师/合规官/法务可以单独触发冷启动访谈的任一部分（身份与企业画像 / 合规立场与服务范围 / 风险与升级 / 文书风格与监管资源），访谈结果写入 criminal-compliance/CLAUDE.md 对应章节（非独立 YAML）"
    - "每个 compliance-system-building 与访谈子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据/字段映射，深度子技能 150+ 行实质内容、访谈子技能含完整问卷与写入映射"
    - "plugin.json 注册全部技能（risk-assessment/non-prosecution/corporate-crime/compliance-system-building/cold-start-interview 五个编排入口 + 二十个子技能）并升级到 0.2.0，JSON 2 空格缩进合法"
  artifacts:
    - path: "criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md"
      provides: "合规风险识别子技能（业务·岗位·区域·关联方维度全面刑事合规风险梳理 + 风险地图与重点领域 + 与 risk-assessment 衔接）"
      contains: "风险\|风险地图"
      min_lines: 150
    - path: "criminal-compliance/skills/compliance-system-building/policy-process-design/SKILL.md"
      provides: "合规制度与流程设计子技能（合规政策与行为准则 + 重点领域专项制度 反商业贿赂·反垄断·数据·安全生产·财税 + 合规审批与禁止性清单 + 合规流程嵌入业务）"
      contains: "制度\|行为准则"
      min_lines: 150
    - path: "criminal-compliance/skills/compliance-system-building/organization-training/SKILL.md"
      provides: "合规组织与培训子技能（合规组织架构 首席合规官·合规部门·业务合规员 + 三道防线 + 合规培训与考核 + 合规文化）"
      contains: "三道防线\|合规组织"
      min_lines: 150
    - path: "criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md"
      provides: "合规有效性评估与整改子技能（有效性评估指标 + 定期审计与自查 + 问题整改闭环 + 有效合规衔接合规不起诉，有效合规标准规范性文件待验证）"
      contains: "有效性\|有效合规"
      min_lines: 150
    - path: "criminal-compliance/skills/compliance-system-building/SKILL.md"
      provides: "刑事合规体系建设编排入口（指向四个子技能 + 入口级护栏含涉刑强制升级与不提供规避侦查方法）"
      min_lines: 40
    - path: "criminal-compliance/skills/cold-start-interview/identity-enterprise-profile/SKILL.md"
      provides: "访谈子技能一：执业角色与企业画像采集，填充 criminal-compliance/CLAUDE.md 身份章节"
      contains: "执业角色\|企业"
      min_lines: 80
    - path: "criminal-compliance/skills/cold-start-interview/compliance-stance-scope/SKILL.md"
      provides: "访谈子技能二：合规立场与服务范围（事前合规/风险评估/合规不起诉/单位犯罪辩护 + 合规严格度 + 是否已涉案），填充 criminal-compliance/CLAUDE.md 立场章节"
      contains: "服务立场\|合规不起诉\|是否已涉案"
      min_lines: 80
    - path: "criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md"
      provides: "访谈子技能三：风险等级定义与升级矩阵（已立案/强制措施/具体罪名风险/重大涉案强制升级刑事辩护律师 + 涉案应对合规边界护栏），填充 criminal-compliance/CLAUDE.md 风险与升级章节"
      contains: "强制升级\|辩护\|涉案"
      min_lines: 80
    - path: "criminal-compliance/skills/cold-start-interview/style-regulatory-resources/SKILL.md"
      provides: "访谈子技能四：文书风格与检察公安行业监管第三方监督评估资源及地方涉案企业合规试点口径，填充 criminal-compliance/CLAUDE.md 文书风格与共享护栏章节"
      contains: "文书风格\|地方\|检察"
      min_lines: 80
    - path: "criminal-compliance/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（顺序调用四个访谈子技能，初始化 criminal-compliance/CLAUDE.md）"
      min_lines: 40
    - path: "criminal-compliance/.claude-plugin/plugin.json"
      provides: "注册全部技能（5 编排入口 + 20 子技能）并升级到 0.2.0"
      contains: "0.2.0"
      min_lines: 20
  key_links:
    - from: "criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md"
      to: "criminal-compliance/skills/_shared/criminal-law-citations.md"
      via: "引用单位犯罪与具体罪名构成要件作为风险识别依据（刑法第30/31条 + 具体罪名待验证）"
      pattern: "criminal-law-citations|第30条|罪名|风险"
    - from: "criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md"
      to: "criminal-compliance/skills/_shared/legal-basis-conventions.md"
      via: "有效合规认定标准遵循涉案企业合规规范性文件快速演进标注（描述规则不硬写文号）"
      pattern: "legal-basis-conventions|有效合规|待验证"
    - from: "criminal-compliance/skills/compliance-system-building/SKILL.md"
      to: "四个 compliance-system-building 子技能"
      via: "编排入口指向子技能路径"
      pattern: "compliance-risk-identification|policy-process-design|organization-training|effectiveness-evaluation"
    - from: "criminal-compliance/skills/cold-start-interview/SKILL.md"
      to: "四个访谈子技能"
      via: "编排入口顺序调用"
      pattern: "identity-enterprise-profile|compliance-stance-scope|risk-escalation|style-regulatory-resources"
    - from: "criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md"
      to: "criminal-compliance/CLAUDE.md"
      via: "访谈写入风险校准与升级矩阵章节（含涉刑强制升级与合规边界护栏）"
      pattern: "强制升级|涉案|辩护|合规边界"
    - from: "criminal-compliance/.claude-plugin/plugin.json"
      to: "全部技能"
      via: "注册五个编排入口与二十个子技能"
      pattern: "compliance-system-building|compliance-risk-identification|risk-escalation|0.2.0"
---

<objective>
完成刑事合规插件深化的最后一环：新增 compliance-system-building（刑事合规体系建设）全新主技能、拆分冷启动访谈、并在 plugin.json 注册全部技能升级到 0.2.0。

本计划交付三块内容：
1. **新增 compliance-system-building（刑事合规体系建设）主技能** — 按 CONTEXT「新增 1 个全新主技能」决策，创建四个可独立触发的子技能 + 编排入口：合规风险识别（业务·岗位·区域·关联方维度全面风险梳理 + 风险地图 + 与 risk-assessment 衔接）/ 合规制度与流程设计（合规政策与行为准则 + 重点领域专项制度 + 合规审批与禁止性清单 + 合规流程嵌入业务）/ 合规组织与培训（合规组织架构 + 三道防线 + 培训考核 + 合规文化）/ 合规有效性评估与整改（有效性指标 + 定期审计与自查 + 整改闭环 + 有效合规衔接合规不起诉）。有效合规认定标准属规范性文件，一律描述规则 + `[待验证]`。
2. **冷启动访谈拆分** — 将 cold-start-interview（现 ~10 行三部分访谈）拆为四个可独立触发的访谈子技能：身份与企业画像（执业角色与企业行业·规模·业务模式·历史涉案·重点刑事风险领域）/ 合规立场与服务范围（事前合规/风险评估/合规不起诉/单位犯罪辩护 + 合规严格度 + 是否已涉案）/ 风险与升级（刑事风险等级 + 角色权限 + 已立案/强制措施/具体罪名风险/重大涉案强制升级刑事辩护律师 + 涉案应对合规边界）/ 文书风格与监管资源（文书风格 + 检察公安行业监管第三方监督评估资源 + 地方涉案企业合规试点口径）。访谈结果填充 09-01 新建的 criminal-compliance/CLAUDE.md 对应章节（**非独立 YAML**，纠正旧表述），原 SKILL.md 改为编排入口顺序调用四个子技能。
3. **plugin.json 注册与版本升级** — 注册全部技能（五个编排入口：cold-start-interview / risk-assessment / non-prosecution / corporate-crime / compliance-system-building；二十个子技能：访谈 4 + 刑事风险评估 4 + 合规不起诉 4 + 单位犯罪预防 4 + 合规体系建设 4）并升级版本到 0.2.0，更新 description 概述五大模块。

Purpose: 关闭「ROADMAP 第四能力面 compliance-system-building 全新主技能缺失 + 访谈未拆分 + 全部技能未注册」的最后 gap，使 criminal-compliance 达到与 commercial-legal / family-legal 同等的完整深层子技能集水平。
Output: 4 个 compliance-system-building 子技能 + 1 个合规体系建设编排入口 + 4 个访谈子技能 + 1 个访谈编排入口 + 更新后的 plugin.json（0.2.0，25 个技能条目）。

依赖说明：本计划属 wave 2，依赖 09-01（_shared 引用脊柱、criminal-compliance/CLAUDE.md、risk-assessment 子技能路径）与 09-02（non-prosecution / corporate-crime 子技能路径）。plugin.json 注册须包含 09-01 与 09-02 产出的全部技能路径，故须在两者完成后执行。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（刑法、刑事诉讼法 为分析基础，涉案企业合规规范性文件 为补充）；指导性案例作参考非判例法（案号标待验证）；法院层级识别（+ 检察机关四级）；行业监管特色（检察机关·第三方监督评估机制·税务市场监管证监药监环保应急网信）；执业环境适配（刑事合规律师 / 企业合规官 / 企业法务 / 当事人本人）。命名约定：技能名 kebab-case；斜杠命令 /criminal-compliance:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/规范性文件 与 案例/学说 分类，带来源标签；中度把握锚点（单位犯罪第30/31条·自首第67条·立功第68条·缓刑第72条·不起诉第177条·认罪认罚第15条）标建议复核；**各具体罪名条号一律标 `[待验证]`，以构成要件描述呈现，绝不臆造具体罪名条号与法定刑档；定罪量刑数额标准描述规则不写裸数额**；**涉案企业合规试点、第三方监督评估机制、有效合规认定标准、认罪认罚从宽指导意见属规范性文件且快速演进，一律描述规则并标 `[待验证]`，不硬写文号、发文日期、具体条款编号**；司法解释条号与案例案号一律标待验证，不臆造。**刑事合规护栏（合规预防与辩护立场 / 不提供规避侦查或逃避责任方法 / 涉刑强制升级刑事辩护律师 / 律师审查）贯穿。**
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/09-criminal-compliance/09-CONTEXT.md
@CLAUDE.md
@criminal-compliance/skills/cold-start-interview/SKILL.md
@criminal-compliance/.claude-plugin/plugin.json
@criminal-compliance/skills/_shared/legal-basis-conventions.md
@criminal-compliance/skills/_shared/criminal-law-citations.md
@criminal-compliance/skills/_shared/practice-profile-schema.md
@criminal-compliance/CLAUDE.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@construction-legal/.claude-plugin/plugin.json
@data-compliance/.claude-plugin/plugin.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: 新增 compliance-system-building（刑事合规体系建设）四个子技能 + 编排入口</name>
  <read_first>
    - criminal-compliance/skills/_shared/legal-basis-conventions.md（09-01 产出 — 引用规范，重点：规范性文件来源类别 + 涉案企业合规快速演进标注 + 具体罪名条号待验证 + 合规预防与辩护定位）
    - criminal-compliance/skills/_shared/criminal-law-citations.md（09-01 产出 — 引用库，重点：单位犯罪第30/31条·具体罪名构成要件占位 七类·涉案企业合规规范性文件·有效合规要点）
    - criminal-compliance/skills/_shared/practice-profile-schema.md（09-01 产出 — 配置读取契约，服务立场 事前合规体系建设、涉刑强制升级契约、合规边界契约）
    - criminal-compliance/CLAUDE.md（09-01 产出 — 配置模板，子技能读取服务立场/合规严格度/涉刑强制升级护栏）
    - criminal-compliance/skills/risk-assessment/SKILL.md 及其子技能（09-01 产出 — 合规风险识别须与 risk-assessment 衔接，避免重复并说明分工）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 完整章节范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、风险等级、占位案例学说）
    - construction-legal/skills/contract-review/SKILL.md（编排入口范式 — 入口级护栏、子技能编排表）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md,
    criminal-compliance/skills/compliance-system-building/policy-process-design/SKILL.md,
    criminal-compliance/skills/compliance-system-building/organization-training/SKILL.md,
    criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md,
    criminal-compliance/skills/compliance-system-building/SKILL.md
  </files>
  <action>
    创建全新主技能 compliance-system-building（刑事合规体系建设），含四个可独立触发的子技能 + 一个编排入口。每个子技能是独立 SKILL.md，含 YAML frontmatter（name kebab-case：compliance-risk-identification / policy-process-design / organization-training / effectiveness-evaluation；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 criminal-compliance/CLAUDE.md 配置含**服务立场 事前合规体系建设 + 合规严格度 + 涉刑强制升级护栏 + 合规边界护栏** + 引用 _shared 规范/引用库/契约 + 与其他子技能及 risk-assessment 分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格，含涉案情形识别与强制升级、合规边界拒绝）、`## 法律依据`（按 法条/司法解释/规范性文件 与 案例/学说 分类，引用 _shared/criminal-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 compliance-system-building 编排入口调用，也可由律师/合规官/法务单独触发（/criminal-compliance:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。** **单位犯罪第30/31条标建议复核；具体罪名一律构成要件描述 + 条号待验证；有效合规认定标准与涉案企业合规规范性文件一律描述规则 + `[待验证]`，不硬写文号。**

    分工：
    - compliance-risk-identification（合规风险识别）：**全面刑事合规风险梳理**（业务维度·岗位维度·区域维度·关联方维度），构建**合规风险地图**（重点风险领域·风险敞口·优先级），识别重点合规领域（税收·商业贿赂·非法集资·数据·安全生产·环境·反垄断）。**与 risk-assessment 分工说明**：risk-assessment 面向单次刑事风险评估（行业罪名·岗位行为·风险等级·风险清单），本子技能面向体系化建设的全面风险底图与重点领域确定，二者衔接但不重复。深化：合规风险识别维度表（维度/识别要点/重点领域）、合规风险地图模板（领域·风险点·敞口·优先级）、重点合规领域清单。引用单位犯罪第30/31条与具体罪名构成要件（_shared 引用库，条号待验证）作为风险识别依据。边界条件：风险识别全面性vs成本、新型业务风险、行刑衔接风险。错误处理含识别已发生风险事件的强制升级。
    - policy-process-design（合规制度与流程设计）：**合规政策与行为准则**（总体合规政策·员工行为准则·合规承诺）；**重点领域专项合规制度**（反商业贿赂·反垄断·数据合规·安全生产·财税合规·招投标合规）；**合规审批与禁止性清单**（关键决策合规审批·红线禁止性行为清单）；**合规流程嵌入业务**（业务流程中的合规控制点·三重一大·关联交易审批）。深化：合规制度体系表（层级/制度/覆盖领域）、重点领域专项制度要点表、禁止性行为清单模板、合规控制点嵌入业务流程示意。引用涉案企业合规有效合规要点（规范性文件描述·待验证，不硬写文号）、各重点领域对应罪名构成要件（条号待验证）。边界条件：制度形式化vs可落地、制度与现有管理体系整合、中小企业制度简化。错误处理含制度须法律审查、制度不得为规避侦查留口子（合规边界）。
    - organization-training（合规组织与培训）：**合规组织架构**（首席合规官/合规负责人·合规管理部门·业务条线合规员·合规委员会）；**三道防线**（业务部门一道防线·合规与风控二道防线·内审三道防线）；**合规培训与考核**（分层分类培训·案例警示教育·合规考核与问责）；**合规文化**（合规从高层做起·合规激励与问责）。深化：合规组织架构与职责表、三道防线职责分工表、合规培训计划表（对象/内容/频次）、合规考核与问责要点。引用单位犯罪双罚制第31条（建议复核，责任人员与组织保障关系）、涉案企业合规组织保障要点（规范性文件描述·待验证）。边界条件：组织独立性与汇报关系、合规资源投入、合规与业务张力。错误处理含组织设计须结合企业实际、涉案识别强制升级。
    - effectiveness-evaluation（合规有效性评估与整改）：**合规体系有效性评估指标**（制度健全性·执行有效性·监测发现能力·响应整改能力）；**定期审计与自查**（合规审计·专项检查·自查自纠）；**问题整改闭环**（发现·整改·验证·复盘）；**有效合规衔接合规不起诉**（**有效合规是涉案企业合规从宽的关键，但具体认定标准属规范性文件，一律描述规则 + `[待验证]`**，路由 non-prosecution）。深化：合规有效性评估指标表（维度/指标/评估方法）、合规审计与自查流程表、整改闭环管理表、有效合规要点与合规不起诉衔接说明（待验证）。引用涉案企业合规有效合规认定（规范性文件描述·待验证 — 规范性文件快速演进，须核实现行版本）、第三方监督评估对有效合规的考察（描述规则·待验证）。边界条件：有效性的客观衡量难、纸面合规vs实质合规、评估独立性。错误处理含涉案后的有效合规评估须律师与第三方介入、强制升级、不得以评估之名行规避侦查之实（合规边界）。

    创建编排入口 compliance-system-building/SKILL.md：frontmatter（name: compliance-system-building，description 概述四子技能）。正文：顶部迁移/说明一行；目的与整体流程概览（合规风险识别 → 合规制度与流程设计 → 合规组织与培训 → 合规有效性评估与整改）；前置加载服务立场（读取 criminal-compliance/CLAUDE.md，缺失提示运行 cold-start-interview 或临时模式，临时模式默认事前合规体系建设立场·律师角色·合规严格度保守·标 `[临时模式]`）；子技能编排顺序表（逐行说明·路径·斜杠命令 /criminal-compliance:<name>·可单独触发）；入口级护栏（企业画像确认、服务立场加载、涉案情形识别与强制升级刑事辩护律师、合规预防与辩护立场护栏、不提供规避侦查或逃避责任方法护栏、目的地/特权检查、地方涉案企业合规试点提示、与 risk-assessment 及 non-prosecution 衔接说明）。
  </action>
  <verify>
    <automated>for d in compliance-risk-identification policy-process-design organization-training effectiveness-evaluation; do f="criminal-compliance/skills/compliance-system-building/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=criminal-compliance/skills/compliance-system-building/SKILL.md; grep -q '^name: compliance-system-building' "$e" && grep -q 'compliance-risk-identification' "$e" && grep -q 'policy-process-design' "$e" && grep -q 'organization-training' "$e" && grep -q 'effectiveness-evaluation' "$e" && grep -q '临时模式' "$e" && grep -q '涉案\|强制升级\|辩护' "$e"; grep -q '风险\|风险地图' criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md && grep -q '制度\|行为准则\|禁止性' criminal-compliance/skills/compliance-system-building/policy-process-design/SKILL.md && grep -q '三道防线\|合规组织' criminal-compliance/skills/compliance-system-building/organization-training/SKILL.md && grep -q '有效性\|有效合规' criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个 compliance-system-building 子技能 SKILL.md + 一个编排入口 SKILL.md 全部存在，路径正确，name 为对应 kebab-case
    - 每个子技能含 YAML frontmatter（name + description + argument-hint），含章节：目的、前置（含服务立场 + 合规严格度 + 涉刑强制升级护栏 + 合规边界护栏 + 与 risk-assessment 分工读取）、详细步骤、检查清单、输出模板、边界条件、错误处理（含涉案强制升级、合规边界拒绝）、## 法律依据，且每个 ≥100 非空行
    - compliance-risk-identification 含多维度风险梳理与风险地图与 risk-assessment 分工；policy-process-design 含合规政策行为准则与重点领域专项制度与禁止性清单；organization-training 含合规组织架构与三道防线与培训考核；effectiveness-evaluation 含有效性评估指标与整改闭环与有效合规衔接合规不起诉（有效合规标准待验证）
    - 编排入口含子技能编排顺序表、临时模式、入口级护栏（涉案强制升级辩护律师 / 合规预防与辩护立场 / 不提供规避侦查方法 / 与 risk-assessment·non-prosecution 衔接）
    - 单位犯罪第30/31条标建议复核；具体罪名构成要件描述 + 条号待验证；有效合规认定标准与涉案企业合规规范性文件描述规则不硬写文号；无臆造具体罪名条号
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 compliance-system-building 主技能（compliance-risk-identification 合规风险识别 / policy-process-design 合规制度与流程设计 / organization-training 合规组织与培训 / effectiveness-evaluation 合规有效性评估与整改）四个可独立触发子技能 + 编排入口；每个子技能 150+ 行，按服务立场调整侧重、贯穿涉刑强制升级与合规边界护栏，与 risk-assessment 分工清晰；有效合规标准与涉案企业合规规范性文件描述规则待验证不硬写文号、具体罪名构成要件描述 + 条号待验证；法律依据按来源分类引用 _shared 库标待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 cold-start-interview 为四个访谈子技能 + 改造编排入口</name>
  <read_first>
    - criminal-compliance/skills/cold-start-interview/SKILL.md（现有 ~10 行三部分访谈 — 拆分迁移的源；末尾「生成 YAML 格式」表述须纠正为填充 criminal-compliance/CLAUDE.md）
    - criminal-compliance/skills/_shared/practice-profile-schema.md（09-01 产出 — 字段映射表与写入契约，访谈子技能据此采集并写入 CLAUDE.md）
    - criminal-compliance/CLAUDE.md（09-01 产出 — 访谈填充目标，对照各章节）
    - data-compliance/.claude-plugin/plugin.json（访谈子技能 description 写法参照）
    - construction-legal/.claude-plugin/plugin.json（访谈子技能 + 编排入口注册范式与 description 写法）
    - construction-legal/skills/cold-start-interview/SKILL.md（如存在，访谈编排入口范式参照）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    criminal-compliance/skills/cold-start-interview/identity-enterprise-profile/SKILL.md,
    criminal-compliance/skills/cold-start-interview/compliance-stance-scope/SKILL.md,
    criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md,
    criminal-compliance/skills/cold-start-interview/style-regulatory-resources/SKILL.md,
    criminal-compliance/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将现有 cold-start-interview/SKILL.md 三部分访谈拆为四个可独立触发的访谈子技能，每个独立 SKILL.md，含 YAML frontmatter（name kebab-case：identity-enterprise-profile / compliance-stance-scope / risk-escalation / style-regulatory-resources；description；argument-hint）。每个访谈子技能 MUST 含章节：目的、前置（可单独触发说明 + 读取/创建 criminal-compliance/CLAUDE.md 对应章节 + 依据 practice-profile-schema 字段映射）、访谈问卷（分组问题，含追问与默认值）、写入映射（问卷答案 → criminal-compliance/CLAUDE.md 哪个章节哪个字段）、写入前确认（向用户回显将写入内容）、检查清单、边界条件、错误处理。**每个访谈子技能须 80+ 行实质内容（含完整问卷与写入映射），不得是骨架。** **纠正现有访谈末尾「生成 YAML 格式」表述：访谈结果填充 criminal-compliance/CLAUDE.md 对应章节，非独立 YAML 文件。**

    分工（采集字段对照 09-01 practice-profile-schema 与 CLAUDE.md 章节）：
    - identity-enterprise-profile（身份与企业画像）：采集执业角色（刑事合规律师/企业合规官/企业法务/当事人本人/非律师有律师可咨询/非律师无律师可咨询）、服务对象（企业侧合规预防 / 涉案企业辩护）、企业画像（行业·规模·业务模式·是否涉外·历史涉案情况·重点刑事风险领域 税收·商业贿赂·非法集资·环境·安全生产）、团队与可用集成（检察·公安·行业监管·第三方监督评估资源）。写入 criminal-compliance/CLAUDE.md ## 我们是谁 / ## 谁在使用 / ## 可用集成。
    - compliance-stance-scope（合规立场与服务范围）：采集整体服务立场（事前合规体系建设/事前刑事风险评估/涉案企业合规不起诉/单位犯罪预防/单位犯罪辩护）、合规严格度（保守/平衡/务实）、**是否已涉案**（纯预防/有苗头线索/已立案或强制措施）。写入 criminal-compliance/CLAUDE.md ## 合规与服务立场（整体服务立场 + ### 合规严格度 + ### 是否已涉案）。**强调服务立场是核心变量、是否已涉案触发强制升级。**
    - risk-escalation（风险与升级）：采集刑事风险等级定义（🔴关键/🟠高/🟡中/🟢低，涉具体罪名或已涉案为关键）、角色权限表、**自动/强制升级触发条件**（已立案/被采取强制措施/面临侦查/可能构成具体罪名/重大涉案/涉及人身自由一律强制升级刑事辩护律师）、涉案应对合规边界（绝不规避侦查·伪造毁灭证据·逃避责任）。写入 criminal-compliance/CLAUDE.md ## 刑事风险校准 / ## 升级矩阵 / ## 共享护栏（涉刑强制升级护栏 + 合规边界护栏）。
    - style-regulatory-resources（文书风格与监管资源）：采集文书风格（刑事风险评估报告/合规制度文本/合规不起诉申请与整改报告/辩护研究）、检察公安行业监管第三方监督评估资源、**地方涉案企业合规试点口径与偏好**（各地试点适用口径·第三方监督评估机制运行差异）。写入 criminal-compliance/CLAUDE.md ## 文书风格 / ## 输出 / ## 共享护栏（### 地方涉案企业合规试点提示）。

    改造 cold-start-interview/SKILL.md 为访谈编排入口：保留 frontmatter（name: cold-start-interview，更新 description 说明顺序调用四个访谈子技能初始化 criminal-compliance/CLAUDE.md）。正文：顶部迁移说明一行；目的（初始化或更新实践配置档案）；访谈子技能顺序表（身份与企业画像 → 合规立场与服务范围 → 风险与升级 → 文书风格与监管资源，逐行说明·路径·斜杠命令 /criminal-compliance:<name>·可单独触发）；写入 criminal-compliance/CLAUDE.md 的整体说明（**填充散文模板对应章节，非独立 YAML**，纠正旧表述）；支持完整重跑/单独更新某部分/直接编辑/git 版本控制的说明；护栏（写入前确认、用户陈述法律事实合理性检查 含具体罪名条号与数额标待验证、合规预防与辩护立场提示）。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in identity-enterprise-profile compliance-stance-scope risk-escalation style-regulatory-resources; do f="criminal-compliance/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q 'criminal-compliance/CLAUDE.md\|CLAUDE.md' "$f" || { echo "NO WRITE TARGET $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 60 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; i=criminal-compliance/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$i" && grep -q 'identity-enterprise-profile' "$i" && grep -q 'compliance-stance-scope' "$i" && grep -q 'risk-escalation' "$i" && grep -q 'style-regulatory-resources' "$i" && grep -q 'CLAUDE.md' "$i" && ! grep -q 'YAML 格式' "$i"; grep -q '服务立场\|是否已涉案' criminal-compliance/skills/cold-start-interview/compliance-stance-scope/SKILL.md && grep -q '强制升级\|辩护\|涉案' criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md + 改造后的编排入口全部存在，路径正确，name 为对应 kebab-case
    - 每个访谈子技能含 frontmatter + 目的 + 前置（可单独触发 + 读取/创建 CLAUDE.md + 字段映射依据）+ 访谈问卷 + 写入映射（→ criminal-compliance/CLAUDE.md 章节字段）+ 写入前确认 + 检查清单 + 边界条件 + 错误处理，且每个 ≥60 非空行
    - identity-enterprise-profile 写入 ## 我们是谁/## 谁在使用/## 可用集成；compliance-stance-scope 写入 ## 合规与服务立场（服务立场 + 合规严格度 + 是否已涉案）；risk-escalation 写入 ## 刑事风险校准/## 升级矩阵/## 共享护栏（涉刑强制升级 + 合规边界）；style-regulatory-resources 写入 ## 文书风格/## 输出/## 共享护栏（地方试点提示）
    - cold-start-interview 编排入口顺序调用四个子技能，正文明确写入 criminal-compliance/CLAUDE.md（散文章节，非独立 YAML），**不含「YAML 格式」旧表述**，含重跑/编辑/版本控制说明与写入前确认护栏
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能（identity-enterprise-profile / compliance-stance-scope / risk-escalation / style-regulatory-resources，各 80+ 行含完整问卷与写入映射）+ 改造后的访谈编排入口；访谈结果填充 criminal-compliance/CLAUDE.md 对应章节（非独立 YAML，纠正旧 YAML 表述）；服务立场/是否已涉案/涉刑强制升级/合规边界/地方试点字段映射齐备。</done>
</task>

<task type="auto">
  <name>Task 3: plugin.json 注册全部技能并升级到 0.2.0</name>
  <read_first>
    - criminal-compliance/.claude-plugin/plugin.json（现有 — 仅注册 4 个扁平技能、version 0.1.0；本任务全面重写注册）
    - construction-legal/.claude-plugin/plugin.json（注册范式 — 五编排入口 + 二十子技能扁平注册、每条 name/path/description、version 0.2.0、description 概述五大模块）
    - 本阶段 09-01 / 09-02 / 本计划 Task 1-2 产出的全部 SKILL.md 路径（确认 name 与 path 一致）：
      - risk-assessment 编排入口 + 四子技能（industry-crime-identification / position-conduct-risk / risk-level-likelihood / risk-list-control-output）
      - non-prosecution 编排入口 + 四子技能（applicability-assessment / compliance-plan / third-party-monitoring / application-hearing）
      - corporate-crime 编排入口 + 四子技能（unit-crime-constitution / common-unit-crime-types / internal-control-prevention / incident-response）
      - compliance-system-building 编排入口 + 四子技能（compliance-risk-identification / policy-process-design / organization-training / effectiveness-evaluation）
      - cold-start-interview 编排入口 + 四子技能（identity-enterprise-profile / compliance-stance-scope / risk-escalation / style-regulatory-resources）
    - CLAUDE.md（命名约定 kebab-case·斜杠命令；文件格式：JSON 2 空格缩进、换行结尾）
  </read_first>
  <files>
    criminal-compliance/.claude-plugin/plugin.json
  </files>
  <action>
    全面重写 criminal-compliance/.claude-plugin/plugin.json：
    - version 升级到 "0.2.0"。
    - description 更新为概述五大模块的散文（参照 construction-legal/family-legal plugin.json description 写法）：刑事合规全流程辅助：冷启动访谈（身份与企业画像/合规立场与服务范围/风险与升级/文书风格与监管资源）、刑事风险评估（行业高发罪名识别/岗位与行为风险点/风险等级与可能性评估/风险清单与控制建议输出）、合规不起诉方案（适用条件评估/合规计划制定/第三方监督评估配合/不起诉申请与听证）、单位犯罪预防（单位犯罪构成识别/常见单位犯罪类型/内控与防范机制/涉案应对）、刑事合规体系建设（合规风险识别/合规制度与流程设计/合规组织与培训/合规有效性评估与整改）；五大模块二十个子技能加五个编排入口；用于合规预防与辩护，涉刑强制升级刑事辩护律师。
    - skills 数组注册全部 25 个条目（5 编排入口 + 20 子技能），每条含 name（kebab-case）、path（skills/<主技能>/<子技能>/SKILL.md 或 skills/<主技能>/SKILL.md）、description（一句话说明，子技能 description 须体现其覆盖点与待验证/护栏要点，参照 construction-legal 子技能 description 详尽风格）。
    - 五个编排入口：cold-start-interview / risk-assessment / non-prosecution / corporate-crime / compliance-system-building。
    - 二十个子技能按上述 read_first 列表逐一注册，path 与 09-01 / 09-02 / 本计划产出的实际文件路径完全一致。
    - 保持 author 字段不变。
    - **严格遵守 JSON 2 空格缩进、文件以换行符结尾、无尾部空格；注册前后均通过 JSON 合法性校验。**
  </action>
  <verify>
    <automated>p=criminal-compliance/.claude-plugin/plugin.json; python3 -c "import json; d=json.load(open('$p')); assert d['version']=='0.2.0', d['version']; names=[s['name'] for s in d['skills']]; paths=[s['path'] for s in d['skills']]; assert len(d['skills'])==25, len(d['skills']); req=['cold-start-interview','risk-assessment','non-prosecution','corporate-crime','compliance-system-building','industry-crime-identification','position-conduct-risk','risk-level-likelihood','risk-list-control-output','applicability-assessment','compliance-plan','third-party-monitoring','application-hearing','unit-crime-constitution','common-unit-crime-types','internal-control-prevention','incident-response','compliance-risk-identification','policy-process-design','organization-training','effectiveness-evaluation','identity-enterprise-profile','compliance-stance-scope','risk-escalation','style-regulatory-resources']; missing=[n for n in req if n not in names]; assert not missing, missing; import os; badp=[pp for pp in paths if not os.path.isfile(os.path.join('criminal-compliance',pp))]; assert not badp, badp; print('OK 25 skills 0.2.0 all paths exist')"</automated>
  </verify>
  <acceptance_criteria>
    - criminal-compliance/.claude-plugin/plugin.json version 为 0.2.0，JSON 合法、2 空格缩进、以换行符结尾、无尾部空格
    - skills 数组含 25 个条目：5 个编排入口（cold-start-interview / risk-assessment / non-prosecution / corporate-crime / compliance-system-building）+ 20 个子技能，name 全部 kebab-case
    - 每个子技能 path 与 09-01 / 09-02 / 本计划产出的实际 SKILL.md 文件路径完全一致（校验脚本确认文件存在）
    - 每条含 name / path / description，description 体现覆盖点与刑事合规护栏/待验证要点
    - description 概述五大模块二十子技能加五编排入口，体现合规预防与辩护立场与涉刑强制升级
  </acceptance_criteria>
  <done>plugin.json 注册全部 25 个技能（5 编排入口 + 20 子技能）并升级到 0.2.0；description 概述五大模块；全部 path 与实际文件一致、JSON 2 空格缩进合法、以换行符结尾、无尾部空格；criminal-compliance 达到与 construction-legal / family-legal 同等的完整深层子技能集注册水平。</done>
</task>

</tasks>

<verification>
- 新增 compliance-system-building 四个子技能 + 编排入口、cold-start-interview 四个访谈子技能 + 编排入口、plugin.json（0.2.0，25 条目）全部存在且格式合规
- compliance-system-building 覆盖 合规风险识别（与 risk-assessment 分工）/合规制度与流程设计/合规组织与培训三道防线/合规有效性评估与整改（有效合规衔接合规不起诉，标准待验证）
- cold-start-interview 四子技能写入 criminal-compliance/CLAUDE.md 对应章节（非独立 YAML，旧 YAML 表述已纠正），服务立场/是否已涉案/涉刑强制升级/合规边界/地方试点字段映射齐备
- 中度把握锚点（单位犯罪30/31·自首67·立功68·缓刑72·不起诉177·认罪认罚15）标「建议复核」；具体罪名构成要件描述 + 条号待验证；有效合规认定标准与涉案企业合规规范性文件描述规则不硬写文号；司法解释条号、案例案号待验证，无臆造具体罪名条号
- 刑事合规护栏（合规预防与辩护立场/不提供规避侦查或逃避责任方法/涉刑强制升级刑事辩护律师/律师审查）贯穿新主技能与访谈
- plugin.json 25 条目 path 全部与实际文件一致、version 0.2.0、JSON 2 空格缩进合法
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('criminal-compliance/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 律师/合规官/法务可单独触发任一合规体系建设子能力与任一访谈子能力（compliance-system-building 4 + 访谈 4，各自有 frontmatter + 触发名）
- compliance-system-building 四子技能各 150+ 行、访谈四子技能各 80+ 行含完整问卷与写入映射，按服务立场调整侧重、贯穿涉刑强制升级与合规边界护栏
- 刑事合规法律引用按 法条/司法解释/规范性文件 与 案例/学说 分类并标待验证；中度把握锚点标建议复核；具体罪名构成要件描述 + 条号待验证；有效合规标准与涉案企业合规规范性文件描述规则不硬写文号
- cold-start-interview 编排入口顺序调用四个访谈子技能、填充 criminal-compliance/CLAUDE.md（非独立 YAML）、旧 YAML 表述已纠正
- plugin.json 注册全部 25 个技能并升级 0.2.0，path 全部与实际文件一致、JSON 合法
- criminal-compliance 达到与 commercial-legal / family-legal 同等的完整深层子技能集水平（五大模块二十子技能加五编排入口）
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/09-criminal-compliance/09-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
