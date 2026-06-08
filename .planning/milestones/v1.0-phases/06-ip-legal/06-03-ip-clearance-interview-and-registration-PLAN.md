---
phase: 06-ip-legal
plan: 03
type: execute
wave: 2
depends_on:
  - 06-01
  - 06-02
files_modified:
  - ip-legal/skills/ip-clearance/trademark-clearance/SKILL.md
  - ip-legal/skills/ip-clearance/patent-fto/SKILL.md
  - ip-legal/skills/ip-clearance/copyright-tradename-domain-clearance/SKILL.md
  - ip-legal/skills/ip-clearance/clearance-risk-report/SKILL.md
  - ip-legal/skills/ip-clearance/SKILL.md
  - ip-legal/skills/cold-start-interview/identity-team/SKILL.md
  - ip-legal/skills/cold-start-interview/enforcement-stance/SKILL.md
  - ip-legal/skills/cold-start-interview/risk-escalation/SKILL.md
  - ip-legal/skills/cold-start-interview/style-search-databases/SKILL.md
  - ip-legal/skills/cold-start-interview/SKILL.md
  - ip-legal/.claude-plugin/plugin.json
autonomous: true
requirements:
  - IP-CLEARANCE-NEW
  - INTERVIEW-DECOMP
  - PLUGIN-REGISTER
user_setup: []

must_haves:
  truths:
    - "存在全新的 ip-clearance（知识产权清权）主技能，律师/IP 经理可单独触发任一清权子能力（商标清权检索 / 专利清权 FTO 初步分析 / 著作权与字号域名清权 / 清权风险评估与清权报告）或运行完整多维清权流程"
    - "ip-clearance 实现多维清权检索（商标/专利/著作权/字号/域名）+ 风险评估分级 + 清权报告组装，清权结论分 可用/有风险/不可用 三档"
    - "律师/IP 经理可以单独触发冷启动访谈的任一部分（身份与团队 / 维权与申请立场 / 风险与升级 / 文书风格与检索数据库），访谈结果写入 ip-legal/CLAUDE.md 对应章节（非独立 YAML）"
    - "每个 ip-clearance 与访谈子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据/字段映射，深度子技能 150+ 行实质内容、访谈子技能含完整问卷与写入映射"
    - "plugin.json 注册全部技能（trademark-search/patent-analysis/copyright-registration/ip-clearance/cold-start-interview 五个编排入口 + 二十个子技能）并升级到 0.2.0，JSON 2 空格缩进合法"
  artifacts:
    - path: "ip-legal/skills/ip-clearance/trademark-clearance/SKILL.md"
      provides: "商标清权检索子技能（拟用商标在先障碍检索 + 近似类似判断 + 可注册可使用性初判）"
      contains: "清权"
      min_lines: 150
    - path: "ip-legal/skills/ip-clearance/patent-fto/SKILL.md"
      provides: "专利清权 FTO 初步分析子技能（拟实施技术方案在先专利检索 + 自由实施初判 + 侵权风险与规避设计提示）"
      contains: "FTO\|自由实施"
      min_lines: 150
    - path: "ip-legal/skills/ip-clearance/copyright-tradename-domain-clearance/SKILL.md"
      provides: "著作权与字号域名清权子技能（作品素材来源合规 + 企业字号在先权利 + 域名商标冲突 + 不正当竞争风险）"
      contains: "字号\|域名"
      min_lines: 150
    - path: "ip-legal/skills/ip-clearance/clearance-risk-report/SKILL.md"
      provides: "清权风险评估与清权报告子技能（多维清权风险分级 + 清权结论 可用/有风险/不可用 + 清权报告组装）"
      contains: "清权报告"
      min_lines: 150
    - path: "ip-legal/skills/ip-clearance/SKILL.md"
      provides: "知识产权清权编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "ip-legal/skills/cold-start-interview/identity-team/SKILL.md"
      provides: "访谈子技能一：权利人画像与 IP 组合采集，填充 ip-legal/CLAUDE.md 身份章节"
      contains: "权利人\|IP 组合"
      min_lines: 80
    - path: "ip-legal/skills/cold-start-interview/enforcement-stance/SKILL.md"
      provides: "访谈子技能二：维权与申请立场（商标/专利/著作权策略 + 清权严格度），填充 ip-legal/CLAUDE.md 立场章节"
      contains: "维权\|清权严格度"
      min_lines: 80
    - path: "ip-legal/skills/cold-start-interview/risk-escalation/SKILL.md"
      provides: "访谈子技能三：风险等级与升级矩阵（维权/异议/诉讼触发），填充 ip-legal/CLAUDE.md 风险与升级章节"
      contains: "升级"
      min_lines: 80
    - path: "ip-legal/skills/cold-start-interview/style-search-databases/SKILL.md"
      provides: "访谈子技能四：文书风格与检索数据库及行业，填充 ip-legal/CLAUDE.md 文书风格与共享护栏章节"
      contains: "检索数据库\|文书风格"
      min_lines: 80
    - path: "ip-legal/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（顺序调用四个访谈子技能，初始化 ip-legal/CLAUDE.md）"
      min_lines: 40
    - path: "ip-legal/.claude-plugin/plugin.json"
      provides: "注册全部技能（5 编排入口 + 20 子技能）并升级到 0.2.0"
      contains: "0.2.0"
      min_lines: 20
  key_links:
    - from: "ip-legal/skills/ip-clearance/trademark-clearance/SKILL.md"
      to: "ip-legal/skills/trademark-search/similarity-assessment/SKILL.md"
      via: "清权复用商标近似判断方法（分工说明，不重复实现）"
      pattern: "similarity-assessment|近似|trademark-search"
    - from: "ip-legal/skills/ip-clearance/patent-fto/SKILL.md"
      to: "ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md"
      via: "FTO 复用专利侵权比对方法（全面覆盖/等同，分工说明）"
      pattern: "all-elements-rule|doctrine-of-equivalents|全面覆盖|patent-analysis"
    - from: "ip-legal/skills/ip-clearance/SKILL.md"
      to: "四个 ip-clearance 子技能"
      via: "编排入口指向子技能路径"
      pattern: "trademark-clearance|patent-fto|copyright-tradename-domain-clearance|clearance-risk-report"
    - from: "ip-legal/skills/cold-start-interview/SKILL.md"
      to: "四个访谈子技能"
      via: "编排入口顺序调用"
      pattern: "identity-team|enforcement-stance|risk-escalation|style-search-databases"
    - from: "ip-legal/skills/cold-start-interview/enforcement-stance/SKILL.md"
      to: "ip-legal/CLAUDE.md"
      via: "访谈写入维权与申请立场章节"
      pattern: "维权与申请立场|商标策略|清权严格度"
    - from: "ip-legal/.claude-plugin/plugin.json"
      to: "全部技能"
      via: "注册五个编排入口与二十个子技能"
      pattern: "ip-clearance|trademark-clearance|enforcement-stance|0.2.0"
---

<objective>
完成知识产权插件深化的最后一环：新增 ip-clearance（知识产权清权）全新主技能、拆分冷启动访谈、并在 plugin.json 注册全部技能升级到 0.2.0。

本计划交付三块内容：
1. **新增 ip-clearance（知识产权清权 / clearance）主技能** — 按 CONTEXT「新增 1 个全新主技能」决策，创建四个可独立触发的子技能 + 编排入口：商标清权检索 / 专利清权 FTO 初步分析 / 著作权与字号域名清权 / 清权风险评估与清权报告。实现多维清权检索（商标/专利/著作权/字号/域名）+ 风险评估分级 + 清权报告组装，清权结论分 可用/有风险/不可用 三档。清权子技能复用 06-01 的商标近似判断与 06-02 的专利侵权比对方法（分工说明，不重复实现核心算法），聚焦「拟用/拟实施前的清权」视角。
2. **冷启动访谈拆分** — 将 cold-start-interview（现 ~14 行三部分访谈）拆为四个可独立触发的访谈子技能：身份与团队（权利人画像与 IP 组合）/ 维权与申请立场（商标/专利/著作权策略 + 清权严格度）/ 风险与升级（风险等级 + 升级矩阵 + 维权/异议/诉讼触发）/ 文书风格与检索数据库（文书风格 + 可用检索数据库 + 行业）。访谈结果填充 06-01 新建的 ip-legal/CLAUDE.md 对应章节（**非独立 YAML**，纠正旧表述），原 SKILL.md 改为编排入口顺序调用四个子技能。
3. **plugin.json 注册与版本升级** — 注册全部技能（五个编排入口：cold-start-interview / trademark-search / patent-analysis / copyright-registration / ip-clearance；二十个子技能：访谈 4 + 商标 4 + 专利 4 + 著作权 4 + 清权 4）并升级版本到 0.2.0，更新 description 概述五大模块。

Purpose: 关闭「ROADMAP 第四能力面 ip-clearance 全新主技能缺失 + 访谈未拆分 + 全部技能未注册」的最后 gap，使 ip-legal 达到与 commercial-legal / data-compliance 同等的完整深层子技能集水平。
Output: 4 个 ip-clearance 子技能 + 1 个清权编排入口 + 4 个访谈子技能 + 1 个访谈编排入口 + 更新后的 plugin.json（0.2.0，25 个技能条目）。

依赖说明：本计划属 wave 2，依赖 06-01（_shared 引用脊柱、ip-legal/CLAUDE.md、trademark-search 子技能路径）与 06-02（patent-analysis / copyright-registration 子技能路径）。plugin.json 注册须包含 06-01 与 06-02 产出的全部技能路径，故须在两者完成后执行。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（商标法/专利法/著作权法/反不正当竞争法 为分析基础，相关司法解释/审查指南为补充）；指导性案例作参考非判例法（案号标待验证）；法院层级识别；行业监管特色（国家知识产权局商标局/专利局、国家版权局、企业字号登记机关市场监管总局、域名 CNNIC）；执业环境适配（IP 律师 / 企业 IP 经理 / 内部法务）。命名约定：技能名 kebab-case；斜杠命令 /ip-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/部门规章 与 案例/学说 分类，带来源标签；IP 法 2020/2021 修正后条号重排保守标待验证；中度把握锚点（商标侵权第57条、专利权期限第42条、著作权保护期、自愿登记）标建议复核；规则类（全面覆盖+等同、商标近似、混淆可能性、仿冒混淆不正当竞争）描述规则不写裸条号；司法解释条号与案例案号一律标待验证，不臆造。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/06-ip-legal/06-CONTEXT.md
@CLAUDE.md
@ip-legal/CLAUDE.md
@ip-legal/skills/cold-start-interview/SKILL.md
@ip-legal/.claude-plugin/plugin.json
@ip-legal/skills/_shared/legal-basis-conventions.md
@ip-legal/skills/_shared/ip-law-citations.md
@ip-legal/skills/_shared/practice-profile-schema.md
@ip-legal/skills/trademark-search/SKILL.md
@ip-legal/skills/patent-analysis/SKILL.md
@ip-legal/skills/copyright-registration/SKILL.md
@data-compliance/.claude-plugin/plugin.json
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@commercial-legal/skills/contract-review/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 新增 ip-clearance（知识产权清权）四个可独立触发的子技能</name>
  <read_first>
    - ip-legal/skills/_shared/legal-basis-conventions.md（06-01 产出 — 引用规范）
    - ip-legal/skills/_shared/ip-law-citations.md（06-01 产出 — 引用库，重点：商标在先权利/近似、专利权范围/侵权、著作权权属、反不正当竞争仿冒混淆）
    - ip-legal/skills/_shared/practice-profile-schema.md（06-01 产出 — 配置读取契约，清权严格度字段）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板，子技能读取清权严格度/各策略/检索数据库/风险校准）
    - ip-legal/skills/trademark-search/similarity-assessment/SKILL.md + prior-rights-obstacles/SKILL.md（06-01 产出 — 清权复用商标近似与在先权利方法，分工说明）
    - ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md + doctrine-of-equivalents/SKILL.md（06-02 产出 — FTO 复用专利侵权比对方法，分工说明）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 风险分级/报告组装范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    ip-legal/skills/ip-clearance/trademark-clearance/SKILL.md,
    ip-legal/skills/ip-clearance/patent-fto/SKILL.md,
    ip-legal/skills/ip-clearance/copyright-tradename-domain-clearance/SKILL.md,
    ip-legal/skills/ip-clearance/clearance-risk-report/SKILL.md
  </files>
  <action>
    创建全新主技能 ip-clearance 的四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：trademark-clearance / patent-fto / copyright-tradename-domain-clearance / clearance-risk-report；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 ip-legal/CLAUDE.md 配置含清权严格度 + 引用 _shared 规范/引用库/契约 + 与其他子技能及 trademark-search/patent-analysis 的分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按来源分类引用 _shared/ip-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 ip-clearance 编排入口调用，也可由律师/IP 经理单独触发（/ip-legal:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment。**

    清权（clearance）核心视角：**在拟用商标/拟实施技术/拟使用作品素材/拟用字号域名之前**，检索在先权利障碍并评估侵权/被异议风险，给出可用/有风险/不可用结论。与 trademark-search（已有商标查询）和 patent-analysis（已有侵权分析）的区别：清权是**前瞻性、多维度、面向自身拟用行为的合规检索**，复用近似判断与侵权比对方法但**聚焦清权决策**，不重复实现核心算法（分工说明引用对应子技能）。

    分工：
    - trademark-clearance（商标清权检索）：拟用商标/标识的清权。拟用标识厘清（文字/图形/组合 + 拟用商品服务类别）；在先商标障碍检索（复用 trademark-search/search-query 检索方法 + similarity-assessment 近似判断 + prior-rights-obstacles 在先权利，**分工说明：清权调用这些方法，聚焦「我能不能用」**）；可注册性初判（绝对/相对障碍）+ **可使用性初判**（即使不能注册，使用是否侵犯在先注册商标——商标法第57条侵权，中度把握标建议复核）；清权结论（可注册可使用/可使用不可注册/有侵权风险不建议用）。深化：商标清权检索范围表（拟用类别 + 关联类别 + 驰名跨类）、可注册性 vs 可使用性区分表、商标清权结论模板。边界条件：未注册商标的在先使用抗辩、拟用标识含他人字号/姓名的在先权利冲突。
    - patent-fto（专利清权 FTO 初步分析）：拟实施技术方案的自由实施（Freedom-to-Operate）初步分析。拟实施技术方案厘清（产品/方法技术特征）；在先专利检索（相关技术领域有效专利，含发明/实用新型/外观设计）；**FTO 初判**（拟实施方案是否落入他人有效专利保护范围——复用 patent-analysis/all-elements-rule 全面覆盖 + doctrine-of-equivalents 等同比对，**分工说明：FTO 调用侵权比对方法判断「我实施会不会侵权」**）；侵权风险评估 + **规避设计提示**（若落入保护范围，提示技术特征规避方向）；专利权稳定性参考（障碍专利是否可能无效）。深化：FTO 检索范围与技术领域确定表、落入保护范围判定表（逐专利逐权利要求）、规避设计方向提示表。边界条件：本技能为**初步 FTO 非正式 FTO 检索报告**（提示正式 FTO 须专业检索机构 + 专利代理师/律师）；外观设计 FTO 的整体视觉效果比对；FTO 仅覆盖检索到的专利（检索不完备性免责）。
    - copyright-tradename-domain-clearance（著作权与字号域名清权）：作品素材/字号/域名的清权。**作品与素材著作权来源合规**（拟使用的图片/字体/音乐/代码等素材是否取得授权、是否落入他人著作权、开源协议合规 `[待验证 — 协议条款]`）；**企业字号在先权利**（拟用字号是否与在先企业名称/字号冲突，是否构成不正当竞争仿冒——反不正当竞争法擅自使用他人有一定影响的企业名称，**描述规则条号待验证**）；**域名与商标冲突**（拟注册域名是否与他人在先商标冲突、是否构成恶意抢注/不正当竞争）；商标与字号、域名的权利冲突协调。深化：素材著作权清权检查表（来源/授权/开源协议）、字号冲突检索（企业信用信息系统）与不正当竞争判定表、域名商标冲突判定表。边界条件：合理使用与法定许可的边界、字体著作权争议、AI 生成素材的权属与来源风险 `[待验证]`。引用反不正当竞争法仿冒混淆（描述规则，条号待验证）与著作权权属。
    - clearance-risk-report（清权风险评估与清权报告）：汇总前三个子技能发现，**多维清权风险分级**（按商标/专利/著作权/字号/域名各维度分别评级 🔴🟠🟡🟢，读取 ## 维权与申请立场 → 清权严格度 调整门槛）；**清权结论**（综合给出三档：✅ 可用 / ⚠ 有风险 可附条件使用或规避后使用 / ❌ 不可用 建议放弃或重新设计）；**清权报告组装**（报告结构：清权对象/检索范围/各维度发现/风险分级/清权结论/规避或整改建议/检索局限免责）。深化：多维清权风险汇总表模板、清权结论决策矩阵（各维度最高风险决定总结论，按清权严格度调整）、清权报告完整 markdown 模板。本子技能是 ip-clearance 的装配收口。边界条件：检索不完备性免责（清权基于已检索范围，不排除未检索到的在先权利）；清权报告非侵权鉴定/非保证不被诉；高风险维度的升级提示（读取 ## 升级矩阵）。引用各维度法律依据汇总。

    遵守文件格式约定。输出模板用 markdown 结构示意。所有法律依据引用 _shared/ip-law-citations.md，中度把握锚点标建议复核、规则类描述规则不写裸条号、其余条号标待验证。
  </action>
  <verify>
    <automated>for d in trademark-clearance patent-fto copyright-tradename-domain-clearance clearance-risk-report; do f="ip-legal/skills/ip-clearance/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '清权\|可使用性' ip-legal/skills/ip-clearance/trademark-clearance/SKILL.md && grep -q 'FTO\|自由实施\|规避' ip-legal/skills/ip-clearance/patent-fto/SKILL.md && grep -q '字号\|域名' ip-legal/skills/ip-clearance/copyright-tradename-domain-clearance/SKILL.md && grep -q '清权报告\|可用\|不可用' ip-legal/skills/ip-clearance/clearance-risk-report/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个 ip-clearance 子技能 SKILL.md 全部存在，路径为 ip-legal/skills/ip-clearance/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - trademark-clearance 含可注册性与可使用性初判并分工引用 trademark-search 方法；patent-fto 含 FTO 初判与规避设计并分工引用 patent-analysis 比对方法；copyright-tradename-domain-clearance 含素材著作权/字号/域名清权；clearance-risk-report 含多维风险分级与三档清权结论（可用/有风险/不可用）及清权报告模板
    - 子技能读取清权严格度（从 ip-legal/CLAUDE.md）调整风险门槛
    - 法律依据按来源分类引用 _shared 库，中度把握锚点标建议复核、规则类描述规则、其余条号标待验证
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 ip-clearance 四个可独立触发的清权子技能；多维清权（商标/专利FTO/著作权字号域名）+ 风险分级 + 三档清权结论 + 清权报告组装；复用 trademark-search 近似判断与 patent-analysis 侵权比对（分工不重复实现）；读取清权严格度；法律依据分类引用 _shared 库，中度把握锚点标建议复核、规则类描述规则、其余条号待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 创建 ip-clearance 编排入口</name>
  <read_first>
    - 本计划 Task 1 产出的四个 ip-clearance 子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板，读取清权严格度）
    - ip-legal/skills/trademark-search/SKILL.md（06-01 产出的编排入口 — 风格参照）
  </read_first>
  <files>
    ip-legal/skills/ip-clearance/SKILL.md
  </files>
  <action>
    创建 ip-legal/skills/ip-clearance/SKILL.md 编排入口：frontmatter（name: ip-clearance，description 说明它是知识产权多维清权编排入口，编排四个清权子技能，argument-hint「[拟用商标/拟实施技术/拟用素材或字号域名]」）。正文：(1) 顶部说明：本技能为知识产权清权（clearance）主技能，面向拟用/拟实施前的多维在先权利障碍检索与风险评估；(2) 目的与整体清权流程概览（商标清权 + 专利 FTO + 著作权字号域名清权 → 清权风险评估与报告）；(3) 前置：加载维权立场与**清权严格度**——读取 ip-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /ip-legal:cold-start-interview 或说「临时模式」），含临时模式段落（清权严格度保守 任何风险即标记、律师角色、标 `[临时模式]`）；(4) 子技能编排顺序表——商标清权检索 / 专利清权 FTO 初步分析 / 著作权与字号域名清权（这三个按清权对象可并行或择需）→ 清权风险评估与清权报告（收口），每行说明该子技能做什么、对应子技能路径（skills/ip-clearance/<name>/SKILL.md）、可单独触发的斜杠命令（/ip-legal:<name>）+ 说明（按清权对象选择维度，报告子技能汇总收口）；(5) 入口级护栏：清权对象与拟用行为确认、清权严格度加载、**清权为初步检索非正式 FTO/侵权鉴定**的免责提示、检索数据库可用性确认（从 ## 可用集成）、行业识别、目的地/特权检查、与 trademark-search / patent-analysis 的分工提示（清权聚焦拟用前瞻性检索）、时效性提示。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=ip-legal/skills/ip-clearance/SKILL.md; grep -q '^name: ip-clearance' "$f" && grep -q 'trademark-clearance' "$f" && grep -q 'patent-fto' "$f" && grep -q 'copyright-tradename-domain-clearance' "$f" && grep -q 'clearance-risk-report' "$f" && grep -q '临时模式' "$f" && grep -q '清权严格度\|清权' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/skills/ip-clearance/SKILL.md 存在，frontmatter name: ip-clearance + description 编排说明
    - 正文含子技能编排顺序表，逐一指向四个清权子技能路径并说明可单独触发（/ip-legal:<name>）
    - 含入口级护栏：清权对象确认、清权严格度加载、初步检索免责提示、检索数据库可用性、行业识别、目的地/特权检查、与 trademark-search/patent-analysis 分工提示
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>ip-clearance 编排入口存在，指向四个清权子技能，入口级护栏（清权对象、清权严格度、初步检索免责、检索数据库、行业识别、特权检查、分工）齐全。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 cold-start-interview 为四个访谈子技能 + 编排入口</name>
  <read_first>
    - ip-legal/skills/cold-start-interview/SKILL.md（现有浅骨架 — 三部分访谈；末尾「生成 YAML 格式」须纠正为写入 ip-legal/CLAUDE.md；改造对象）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板，访谈各子技能填充对应章节）
    - ip-legal/skills/_shared/practice-profile-schema.md（06-01 产出 — 字段映射表，访谈按此填充）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - data-compliance/.claude-plugin/plugin.json（访谈子技能 description 写法参照 — identity-team/compliance-stance/risk-escalation/style-cross-border-policy 范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    ip-legal/skills/cold-start-interview/identity-team/SKILL.md,
    ip-legal/skills/cold-start-interview/enforcement-stance/SKILL.md,
    ip-legal/skills/cold-start-interview/risk-escalation/SKILL.md,
    ip-legal/skills/cold-start-interview/style-search-databases/SKILL.md,
    ip-legal/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将现有 cold-start-interview/SKILL.md 的三部分访谈拆分迁移并深化到四个可独立触发的访谈子技能，并改造原 SKILL.md 为编排入口。**关键纠正**：现有 SKILL.md 末尾「生成 知识产权 实践配置文件（YAML 格式）」表述须改为「填充 ip-legal/CLAUDE.md 对应章节」（与 practice-profile-schema 架构决策一致，不另存独立 YAML）。

    四个访谈子技能（每个独立 SKILL.md，含 frontmatter name kebab-case + description + argument-hint；含章节：目的、前置（读取 practice-profile-schema 字段映射 + 说明填充 ip-legal/CLAUDE.md 哪个章节 + 可单独触发）、访谈问题清单（结构化问卷，每个字段对应 CLAUDE.md 占位符）、写入映射（字段→CLAUDE.md 章节）、法律事实合理性检查（条号/期限口述时标待验证）、边界条件（用户跳过/不确定时的默认处理）。**每个访谈子技能须 80+ 行实质内容（含完整问卷与写入映射）。**）：
    - identity-team（身份与团队）：采集权利人画像与 IP 组合（组织/律所名称、实体类型、所属行业、IP 组合概况 商标/专利/著作权数量与类型、核心品牌技术、IP 痛点、IP 团队规模、IP 负责人）+ 谁在使用（角色、律师联系人）+ 可用集成（检索数据库与工具）。写入 ip-legal/CLAUDE.md 的 ## 我们是谁 / ## 谁在使用 / ## 可用集成。
    - enforcement-stance（维权与申请立场）：采集整体维权立场（进取维权/平衡/防御）+ 商标策略 + 专利策略 + 著作权策略 + 清权严格度。写入 ip-legal/CLAUDE.md 的 ## 维权与申请立场（含 ### 商标策略 / ### 专利策略 / ### 著作权策略 / ### 清权严格度）。
    - risk-escalation（风险与升级）：采集风险等级定义 + 升级矩阵（角色权限/自动升级触发）+ 维权/异议/诉讼触发。写入 ip-legal/CLAUDE.md 的 ## 风险校准 / ## 升级矩阵。
    - style-search-databases（文书风格与检索数据库）：采集文书风格（检索报告/侵权分析意见书/清权报告/维权函风格 + 工作产物存放位置）+ 可用检索数据库再确认 + 行业识别偏好。写入 ip-legal/CLAUDE.md 的 ## 文书风格 / ## 输出 / ## 共享护栏（行业识别）。

    编排入口 ip-legal/skills/cold-start-interview/SKILL.md：保留 frontmatter（name: cold-start-interview，更新 description 说明它顺序调用四个访谈子技能初始化 ip-legal/CLAUDE.md）。正文：(1) 顶部迁移说明 + **纠正旧 YAML 表述为填充 ip-legal/CLAUDE.md**；(2) 目的（初始化/更新知识产权实践配置档案）；(3) 子技能顺序表——身份与团队 → 维权与申请立场 → 风险与升级 → 文书风格与检索数据库，每行说明、子技能路径、单独触发斜杠命令（/ip-legal:<name>，支持单独更新某一部分）；(4) 说明访谈结果写入 ip-legal/CLAUDE.md（散文模板，非 YAML），支持完整重跑/单独更新/直接编辑/git 版本控制。遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in identity-team enforcement-stance risk-escalation style-search-databases; do f="ip-legal/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q 'ip-legal/CLAUDE.md' "$f" || { echo "NO CLAUDE.md TARGET $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 60 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=ip-legal/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$e" && grep -q 'identity-team' "$e" && grep -q 'enforcement-stance' "$e" && grep -q 'risk-escalation' "$e" && grep -q 'style-search-databases' "$e" && grep -q 'ip-legal/CLAUDE.md' "$e" && ! grep -q 'YAML 格式' "$e"</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md 全部存在，路径为 ip-legal/skills/cold-start-interview/<kebab-name>/SKILL.md，各含 frontmatter + 结构化问卷 + 写入 ip-legal/CLAUDE.md 章节映射，各 ≥60 非空行
    - identity-team 采集权利人画像与 IP 组合；enforcement-stance 采集维权立场与商标/专利/著作权策略及清权严格度；risk-escalation 采集风险等级与升级矩阵；style-search-databases 采集文书风格与检索数据库
    - 每个访谈子技能明确写入 ip-legal/CLAUDE.md 对应章节（非独立 YAML）
    - cold-start-interview/SKILL.md 改造为编排入口，顺序调用四个子技能，**旧「YAML 格式」表述已纠正为填充 ip-legal/CLAUDE.md**
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能（身份与团队/维权与申请立场/风险与升级/文书风格与检索数据库），均填充 ip-legal/CLAUDE.md 对应章节；原 SKILL.md 改为编排入口顺序调用，旧 YAML 表述已纠正为写入 ip-legal/CLAUDE.md。</done>
</task>

<task type="auto">
  <name>Task 4: plugin.json 注册全部技能并升级到 0.2.0</name>
  <read_first>
    - ip-legal/.claude-plugin/plugin.json（现有 — 4 个扁平技能注册，version 0.1.0；改造对象）
    - data-compliance/.claude-plugin/plugin.json（注册范式 — 编排入口 + 子技能扁平注册、每条 name/path/description、description 概述五大模块写法、version 0.2.0）
    - 06-01/06-02/本计划产出的全部 SKILL.md 路径（确认注册路径与 name 一致）
    - CLAUDE.md（文件格式：JSON 2 空格缩进、命名约定 kebab-case、文件以换行符结尾）
  </read_first>
  <files>
    ip-legal/.claude-plugin/plugin.json
  </files>
  <action>
    更新 ip-legal/.claude-plugin/plugin.json：以 data-compliance/.claude-plugin/plugin.json 为注册范式（编排入口与子技能均扁平列入 skills 数组，每条含 name/path/description）。
    - version 升级到 "0.2.0"。
    - description 更新为概述五大模块：冷启动访谈（身份团队/维权立场/风险升级/文书检索）、商标查询与近似分析（检索查询/近似判断/类似商品/在先权利障碍）、专利侵权初步分析（权利要求解读/全面覆盖/等同原则/现有技术抗辩）、著作权登记（作品类型/权属/登记材料/登记流程）、知识产权清权 clearance（商标清权/专利FTO/著作权字号域名清权/清权报告），五大模块二十个子技能加五个编排入口。
    - skills 数组注册全部 25 条（顺序：五个编排入口在前或按模块分组均可，须全部包含），每条 name 与 SKILL.md frontmatter name 一致、path 与文件实际路径一致、description 简述：
      - 编排入口 5：cold-start-interview / trademark-search / patent-analysis / copyright-registration / ip-clearance（path = skills/<主技能>/SKILL.md）
      - 访谈子技能 4：identity-team / enforcement-stance / risk-escalation / style-search-databases（path = skills/cold-start-interview/<name>/SKILL.md）
      - 商标子技能 4：search-query / similarity-assessment / goods-services-classification / prior-rights-obstacles（path = skills/trademark-search/<name>/SKILL.md）
      - 专利子技能 4：claim-construction / all-elements-rule / doctrine-of-equivalents / prior-art-defense（path = skills/patent-analysis/<name>/SKILL.md）
      - 著作权子技能 4：work-type-determination / ownership-determination / registration-materials / registration-process（path = skills/copyright-registration/<name>/SKILL.md）
      - 清权子技能 4：trademark-clearance / patent-fto / copyright-tradename-domain-clearance / clearance-risk-report（path = skills/ip-clearance/<name>/SKILL.md）
    - 保留 author 字段。
    - **严格 JSON 2 空格缩进、文件以换行符结尾、无尾部空格。**
    完成后运行 JSON 合法性检查确认无语法错误。
  </action>
  <verify>
    <automated>f=ip-legal/.claude-plugin/plugin.json; python3 -c "import json; d=json.load(open('$f')); assert d['version']=='0.2.0', 'version not 0.2.0'; names={s['name'] for s in d['skills']}; req={'cold-start-interview','trademark-search','patent-analysis','copyright-registration','ip-clearance','identity-team','enforcement-stance','risk-escalation','style-search-databases','search-query','similarity-assessment','goods-services-classification','prior-rights-obstacles','claim-construction','all-elements-rule','doctrine-of-equivalents','prior-art-defense','work-type-determination','ownership-determination','registration-materials','registration-process','trademark-clearance','patent-fto','copyright-tradename-domain-clearance','clearance-risk-report'}; missing=req-names; assert not missing, f'missing skills: {missing}'; n=len(d['skills']); assert n>=25, f'expected >=25 skills, got {n}'; print('OK', n, 'skills, version', d['version'])"; for p in $(python3 -c "import json; [print(s['path']) for s in json.load(open('$f'))['skills']]"); do test -f "ip-legal/$p" || { echo "MISSING PATH ip-legal/$p"; exit 1; }; done; echo "ALL PATHS EXIST"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/.claude-plugin/plugin.json version 为 0.2.0
    - skills 数组含全部 25 条（5 编排入口 + 20 子技能），每条 name 与对应 SKILL.md frontmatter name 一致、path 与实际文件路径一致且文件存在
    - description 概述五大模块（访谈/商标/专利/著作权/清权）
    - JSON 语法合法（python3 json.load 通过），2 空格缩进、文件以换行符结尾、无尾部空格
  </acceptance_criteria>
  <done>plugin.json 注册全部 25 个技能（5 编排入口 + 20 子技能）并升级到 0.2.0，description 概述五大模块，全部 path 指向存在的 SKILL.md，JSON 合法 2 空格缩进。</done>
</task>

</tasks>

<verification>
- 四个 ip-clearance 子技能 + 一个清权编排入口 + 四个访谈子技能 + 一个访谈编排入口 + 更新后的 plugin.json 全部存在且格式合规
- ip-clearance 实现多维清权（商标/专利FTO/著作权字号域名）+ 风险分级 + 三档清权结论（可用/有风险/不可用）+ 清权报告，复用 trademark-search/patent-analysis 方法（分工不重复实现）
- cold-start-interview 拆为四个访谈子技能，均填充 ip-legal/CLAUDE.md（非 YAML），旧 YAML 表述已纠正
- plugin.json 注册全部 25 技能、升级 0.2.0、全部 path 存在、JSON 合法
- 法律依据按来源分类、中度把握锚点标建议复核、规则类描述规则、其余条号与案例案号标待验证，无臆造
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('ip-legal/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 知识产权插件达到完整深层子技能集：5 个主技能（4 深化 + 1 新增 ip-clearance）各拆为 4 个可独立触发子技能，共 20 子技能 + 5 编排入口
- ip-clearance 多维清权能力完整（商标/专利FTO/著作权字号域名 + 风险评估 + 清权报告），可单点或整流程调用
- 冷启动访谈拆分并写入 ip-legal/CLAUDE.md（非 YAML），支持单独更新各部分
- plugin.json 注册全部技能升级 0.2.0，JSON 合法
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/06-ip-legal/06-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
