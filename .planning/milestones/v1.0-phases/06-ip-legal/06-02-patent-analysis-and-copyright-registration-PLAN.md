---
phase: 06-ip-legal
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - ip-legal/skills/patent-analysis/claim-construction/SKILL.md
  - ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md
  - ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md
  - ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md
  - ip-legal/skills/patent-analysis/SKILL.md
  - ip-legal/skills/copyright-registration/work-type-determination/SKILL.md
  - ip-legal/skills/copyright-registration/ownership-determination/SKILL.md
  - ip-legal/skills/copyright-registration/registration-materials/SKILL.md
  - ip-legal/skills/copyright-registration/registration-process/SKILL.md
  - ip-legal/skills/copyright-registration/SKILL.md
autonomous: true
requirements:
  - PATENT-DECOMP
  - COPYRIGHT-DECOMP
user_setup: []

must_haves:
  truths:
    - "律师/IP 经理可以单独触发专利侵权初步分析的任一子能力（技术特征比对与权利要求解读 / 全面覆盖原则 / 等同原则 / 现有技术抗辩与不侵权抗辩）而无需运行整个流程"
    - "律师/IP 经理可以单独触发著作权登记的任一子能力（作品类型认定 / 权属判定 / 登记材料准备 / 登记流程）而无需运行整个流程"
    - "每个 patent-analysis 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；专利侵权判定全面覆盖原则与等同原则（手段-功能-效果基本相同 + 本领域普通技术人员无需创造性劳动可联想）描述规则不写裸条号；专利权期限引用专利法第42条（中度把握）标建议复核"
    - "每个 copyright-registration 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；著作权保护期（终生+死后50年/法人视听作品首次发表后50年）与自愿登记原则（非确权具初步证据效力）明确，思想表达二分体现"
    - "现有 patent-analysis 与 copyright-registration 浅骨架三步纲要无丢失迁移到子技能，两个原 SKILL.md 改为编排入口"
  artifacts:
    - path: "ip-legal/skills/patent-analysis/claim-construction/SKILL.md"
      provides: "技术特征比对与权利要求解读子技能（权利要求拆解为技术特征 + 独立/从属权利要求 + 说明书附图解释 + 被诉技术方案特征提取）"
      contains: "权利要求"
      min_lines: 150
    - path: "ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md"
      provides: "全面覆盖原则子技能（字面侵权 + 技术特征逐一比对 + 缺一不可原则）"
      contains: "全面覆盖"
      min_lines: 150
    - path: "ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md"
      provides: "等同原则子技能（手段-功能-效果三要素 + 本领域普通技术人员无需创造性劳动可联想 + 禁止反悔与捐献限制）"
      contains: "等同"
      min_lines: 150
    - path: "ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md"
      provides: "现有技术抗辩与不侵权抗辩子技能（现有技术抗辩 + 先用权抗辩 + 不侵权抗辩 + 专利权稳定性初判）"
      contains: "现有技术"
      min_lines: 150
    - path: "ip-legal/skills/patent-analysis/SKILL.md"
      provides: "专利侵权初步分析编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "ip-legal/skills/copyright-registration/work-type-determination/SKILL.md"
      provides: "作品类型认定子技能（独创性判断 + 法定作品类型 + 思想表达二分 + 不受保护对象）"
      contains: "独创性"
      min_lines: 150
    - path: "ip-legal/skills/copyright-registration/ownership-determination/SKILL.md"
      provides: "权属判定子技能（创作者原始取得 + 职务作品 + 委托作品 + 法人作品 + 合作作品 + 约定）"
      contains: "职务作品"
      min_lines: 150
    - path: "ip-legal/skills/copyright-registration/registration-materials/SKILL.md"
      provides: "登记材料准备子技能（申请主体证明 + 作品说明 + 权利归属证明 + 创作发表证明 + 样本要求）"
      contains: "登记材料"
      min_lines: 150
    - path: "ip-legal/skills/copyright-registration/registration-process/SKILL.md"
      provides: "登记流程子技能（中国版权保护中心登记 + 软件著作权登记 + 流程周期 + 登记证书效力）"
      contains: "登记证书\|初步证据"
      min_lines: 150
    - path: "ip-legal/skills/copyright-registration/SKILL.md"
      provides: "著作权登记编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md"
      to: "ip-legal/skills/_shared/ip-law-citations.md"
      via: "引用等同原则规则（专利侵权司法解释，描述规则不写裸条号）"
      pattern: "ip-law-citations|等同|手段.*功能.*效果"
    - from: "ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md"
      to: "ip-legal/skills/_shared/ip-law-citations.md"
      via: "引用全面覆盖原则规则"
      pattern: "ip-law-citations|全面覆盖"
    - from: "ip-legal/skills/copyright-registration/work-type-determination/SKILL.md"
      to: "ip-legal/skills/_shared/ip-law-citations.md"
      via: "引用著作权法定作品类型与保护期"
      pattern: "ip-law-citations|作品类型|50年|五十年"
    - from: "ip-legal/skills/patent-analysis/SKILL.md"
      to: "四个 patent-analysis 子技能"
      via: "编排入口指向子技能路径"
      pattern: "claim-construction|all-elements-rule|doctrine-of-equivalents|prior-art-defense"
    - from: "ip-legal/skills/copyright-registration/SKILL.md"
      to: "四个 copyright-registration 子技能"
      via: "编排入口指向子技能路径"
      pattern: "work-type-determination|ownership-determination|registration-materials|registration-process"
---

<objective>
将知识产权插件的 patent-analysis（专利侵权初步分析）与 copyright-registration（著作权登记）两个主技能从扁平浅骨架深化为深层子技能体系，每个拆为四个可独立触发的子技能并改造原 SKILL.md 为编排入口。

本计划交付两块内容：
1. **专利侵权初步分析拆分** — 将 patent-analysis（现 ~18 行浅骨架）拆为四个可独立触发的子技能：技术特征比对与权利要求解读 / 全面覆盖原则 / 等同原则 / 现有技术抗辩与不侵权抗辩。现有三步纲要（需求收集 / 法律分析 / 输出生成）拆分迁移并大幅深化，原 SKILL.md 改为编排入口。专利侵权判定的核心方法论（全面覆盖原则 + 等同原则）来自专利侵权司法解释，按 CONTEXT 纪律**描述规则不写裸条号**；专利权期限引用专利法第42条（中度把握锚点）标建议复核。
2. **著作权登记拆分** — 将 copyright-registration（现 ~18 行浅骨架）拆为四个可独立触发的子技能：作品类型认定 / 权属判定 / 登记材料准备 / 登记流程。现有三步纲要拆分迁移并大幅深化，原 SKILL.md 改为编排入口。著作权保护期（终生+死后50年/法人视听作品首次发表后50年，规则稳定）、自愿登记原则（登记非确权但具初步证据效力）、思想表达二分须明确体现。

本计划与 06-01 在文件路径上**无重叠**（06-01 在 _shared、CLAUDE.md、trademark-search；本计划在 patent-analysis、copyright-registration），故同属 wave 1 可并行。本计划的子技能在「前置」中引用 06-01 产出的 _shared 引用脊柱与 ip-legal/CLAUDE.md（这是内容引用而非文件写入，不构成文件写入依赖；若并行执行时 06-01 的 _shared/CLAUDE.md 尚未落地，子技能仍可生成，引用以路径声明形式存在，执行 06-01 后即生效）。

Purpose: 关闭「专利侵权分析与著作权登记仅有扁平浅骨架」的 gap，交付律师/IP 经理可单点调用的专利侵权判定与著作权登记深层能力。
Output: 4 个 patent-analysis 子技能 + 1 个专利编排入口 + 4 个 copyright-registration 子技能 + 1 个著作权编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（专利法 2020修正/2021施行、著作权法 2020修正/2021施行 为分析基础，专利侵权/著作权司法解释、专利审查指南/作品自愿登记办法 为补充）；指导性案例作参考非判例法（最高院知识产权法庭典型案例可参考，案号标待验证）；法院层级识别（专利案件一审多由中院/知识产权法院管辖、最高院知识产权法庭二审）；行业监管特色（国家知识产权局专利局、国家版权局/中国版权保护中心）；执业环境适配（IP 律师 / 企业 IP 经理 / 专利代理师 / 内部法务）。命名约定：技能名 kebab-case；斜杠命令 /ip-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释/部门规章 与 案例/学说 分类，带来源标签；**IP 法 2020/2021 修正后条号重排，须极度保守**。中度把握锚点（标「建议复核」）：专利权期限=专利法第42条（发明20年/实用新型10年/外观设计15年，自申请日，外观15年系2021修正）；著作权保护期=自然人终生+死后50年/法人视听作品首次发表后50年；著作权自愿登记。规则类（来自司法解释，描述规则不写裸条号）：专利侵权判定=全面覆盖原则+等同原则（等同=手段-功能-效果基本相同+本领域普通技术人员无需创造性劳动可联想；禁止反悔/捐献原则限制等同）；权利要求解释（以权利要求内容为准，说明书及附图可解释）；作品独创性与思想表达二分。其余专利法/著作权法具体条号一律标 `[待验证]`，不臆造。
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/06-ip-legal/06-CONTEXT.md
@CLAUDE.md
@ip-legal/skills/patent-analysis/SKILL.md
@ip-legal/skills/copyright-registration/SKILL.md
@ip-legal/skills/_shared/legal-basis-conventions.md
@ip-legal/skills/_shared/ip-law-citations.md
@ip-legal/skills/_shared/practice-profile-schema.md
@ip-legal/CLAUDE.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
@commercial-legal/skills/contract-review/SKILL.md
@employment-legal/skills/hiring-review/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 patent-analysis 为四个可独立触发的子技能</name>
  <read_first>
    - ip-legal/skills/patent-analysis/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；这是要拆分迁移并大幅深化的源）
    - ip-legal/skills/_shared/legal-basis-conventions.md（06-01 产出 — 引用规范）
    - ip-legal/skills/_shared/ip-law-citations.md（06-01 产出 — 引用库，重点：专利法第42条专利权期限、专利侵权全面覆盖+等同原则规则、权利要求解释、先用权）
    - ip-legal/skills/_shared/practice-profile-schema.md（06-01 产出 — 配置读取契约）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板，子技能读取维权立场/专利策略/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板/边界条件表/错误处理表/## 法律依据 三类分类的完整范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    ip-legal/skills/patent-analysis/claim-construction/SKILL.md,
    ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md,
    ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md,
    ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md
  </files>
  <action>
    将现有 patent-analysis/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：claim-construction / all-elements-rule / doctrine-of-equivalents / prior-art-defense；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 ip-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/司法解释/部门规章 与 案例/学说 分类，引用 _shared/ip-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 patent-analysis 编排入口调用，也可由律师/IP 经理单独触发（/ip-legal:<name>）。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - claim-construction（技术特征比对与权利要求解读）：覆盖现纲要「需求收集」与侵权比对的前置步骤。专利信息收集（专利号/专利类型 发明/实用新型/外观设计、权利要求书、说明书及附图、专利权人、法律状态 有效/失效/年费）；**权利要求解读**（以权利要求的内容为准，说明书及附图可用于解释权利要求 — **描述规则不写裸条号**）；**权利要求拆解为技术特征**（独立权利要求确定最大保护范围 / 从属权利要求附加技术特征 / 将权利要求分解为若干技术特征 A+B+C+D）；被诉技术方案技术特征提取（将被诉产品/方法分解为对应技术特征 a+b+c+d）；制作技术特征比对表（权利要求技术特征 vs 被诉方案技术特征，逐一对应）。深化：权利要求技术特征拆解表模板、独立/从属权利要求选择策略、外观设计专利的设计要点判断（不同于发明实用新型，以图片/照片确定保护范围，整体视觉效果）、技术特征对应关系表。边界条件：功能性特征的解释（结合说明书实施方式）、外观设计专利与发明专利的比对方法差异。本子技能是 all-elements-rule 与 doctrine-of-equivalents 的前置。
    - all-elements-rule（全面覆盖原则）：覆盖现纲要「法律分析」核心一。**全面覆盖原则（字面侵权）**：被诉技术方案包含与权利要求记载的**全部技术特征相同**的对应技术特征，构成字面侵权（**全面覆盖/全部技术特征原则，描述规则不写裸条号**）；**缺一不可原则**：被诉方案缺少权利要求中任一技术特征，则不落入保护范围（不构成字面侵权，但须续判等同）；逐一比对方法。深化：技术特征逐一比对判定表（每个技术特征：相同/不同/缺少）、字面侵权结论矩阵、「多余指定原则已废止」提示（不得随意忽略非必要技术特征）。引用全面覆盖原则（专利侵权司法解释，描述规则）。边界条件：被诉方案在权利要求基础上增加额外技术特征仍可能落入保护范围（增加不影响覆盖判断）；技术特征相同 vs 等同的衔接（字面不相同时转 doctrine-of-equivalents）。
    - doctrine-of-equivalents（等同原则）：覆盖现纲要「法律分析」核心二。**等同原则**：被诉技术特征与权利要求技术特征虽不相同但**等同**的，亦落入保护范围；**等同特征判定三要素**（以基本相同的**手段**，实现基本相同的**功能**，达到基本相同的**效果**），且**本领域普通技术人员无需经过创造性劳动就能联想到**（来自专利侵权司法解释，**完整描述规则不写裸条号**）；**等同原则的限制**（**禁止反悔原则**：专利权人在申请/无效程序中放弃的技术方案不得通过等同重新纳入；**捐献原则**：说明书中记载但未写入权利要求的技术方案视为捐献给公众，不得主张等同）。深化：等同三要素逐项判定表（手段/功能/效果基本相同性）、禁止反悔与捐献原则适用判断流程、等同侵权结论模板。引用等同原则规则（专利侵权司法解释，描述规则）。边界条件：等同的时间点（侵权行为发生时）；功能性特征的等同判定特殊规则；等同原则不适用于已捐献/已反悔的技术方案。
    - prior-art-defense（现有技术抗辩与不侵权抗辩）：覆盖现纲要「法律分析」抗辩维度与「输出生成」。**现有技术抗辩**（被诉方案实施的是申请日前已有的现有技术，不构成侵权 — 描述规则）；**先用权抗辩**（在专利申请日前已制造相同产品/使用相同方法或已作必要准备，在原有范围内继续制造使用不构成侵权 — 描述规则，**条号待验证**）；**不侵权抗辩**（被诉方案缺少必要技术特征/落入现有技术）；**专利权稳定性初判**（专利是否可能被宣告无效——新颖性/创造性瑕疵初步评估，提示可提专利无效宣告请求）；专利侵权初步分析综合结论（侵权可能性高/中/低，含字面+等同+抗辩综合）。深化：抗辩类型对照表（现有技术/先用权/合法来源/权利用尽）、专利权稳定性风险初判表、侵权分析综合结论模板。本子技能汇总前三个子技能发现给出专利侵权初步分析综合意见。引用现有技术抗辩与先用权规则（条号待验证，描述规则）。边界条件：本技能为**初步分析**非正式侵权鉴定（提示正式鉴定须专业机构/司法鉴定）；专利无效宣告由专门程序处理（提示后续里程碑）；合法来源抗辩仅免赔不免停止侵害。

    遵守文件格式约定。输出模板用 markdown 结构示意。所有法律依据引用 _shared/ip-law-citations.md，专利权期限=专利法第42条标「建议复核」、全面覆盖+等同原则描述规则不写裸条号、其余条号标待验证。
  </action>
  <verify>
    <automated>for d in claim-construction all-elements-rule doctrine-of-equivalents prior-art-defense; do f="ip-legal/skills/patent-analysis/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '权利要求' ip-legal/skills/patent-analysis/claim-construction/SKILL.md && grep -q '全面覆盖\|缺一不可' ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md && grep -q '等同' ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md && grep -q '现有技术\|先用权' ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 ip-legal/skills/patent-analysis/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行
    - claim-construction 含权利要求拆解为技术特征与解读；all-elements-rule 含全面覆盖/缺一不可；doctrine-of-equivalents 含等同三要素（手段-功能-效果）+ 禁止反悔/捐献；prior-art-defense 含现有技术抗辩与先用权
    - 全面覆盖+等同原则描述规则不写裸条号；专利权期限=专利法第42条标「建议复核」；其余条号标待验证
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>patent-analysis 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；claim-construction 权利要求技术特征解读、all-elements-rule 全面覆盖、doctrine-of-equivalents 等同三要素+禁止反悔捐献、prior-art-defense 现有技术与先用权抗辩；全面覆盖+等同原则描述规则、专利法42条标建议复核、其余条号标待验证。</done>
</task>

<task type="auto">
  <name>Task 2: 改造 patent-analysis/SKILL.md 为编排入口</name>
  <read_first>
    - ip-legal/skills/patent-analysis/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 1 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板）
    - ip-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 06-03 统一更新）
  </read_first>
  <files>
    ip-legal/skills/patent-analysis/SKILL.md
  </files>
  <action>
    将 ip-legal/skills/patent-analysis/SKILL.md 改造为编排入口：保留 frontmatter（name: patent-analysis，更新 description 说明它现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/patent-analysis/<子技能名>/SKILL.md）；(2) 目的与整体专利侵权初步分析流程概览（权利要求解读 → 全面覆盖比对 → 等同原则比对 → 抗辩与综合结论）；(3) 前置：加载维权立场——读取 ip-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /ip-legal:cold-start-interview 或说「临时模式」），含临时模式段落（平衡维权立场、律师角色、按全面覆盖+等同逐一比对、标 `[临时模式]`）；(4) 子技能编排顺序表——技术特征比对与权利要求解读 → 全面覆盖原则 → 等同原则 → 现有技术抗辩与不侵权抗辩，每行说明该子技能做什么、对应子技能路径、可单独触发的斜杠命令（/ip-legal:<name>）+ 顺序说明（先字面后等同，再抗辩）；(5) 入口级护栏：权利人画像/专利组合确认（从 ## 我们是谁 + ## 维权与申请立场 → 专利策略读取）、**本技能为初步分析非正式侵权鉴定**的免责提示、行业识别、目的地/特权检查、若涉及拟实施技术方案的清权提示可调用 ip-clearance（06-03 专利 FTO）、时效性提示（IP 法修正条号重排）。不得丢失任何护栏语义。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=ip-legal/skills/patent-analysis/SKILL.md; grep -q '^name: patent-analysis' "$f" && grep -q 'claim-construction' "$f" && grep -q 'all-elements-rule' "$f" && grep -q 'doctrine-of-equivalents' "$f" && grep -q 'prior-art-defense' "$f" && grep -q '临时模式' "$f" && grep -q '初步分析\|鉴定\|专利策略\|清权' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/skills/patent-analysis/SKILL.md 仍有 frontmatter name: patent-analysis，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/ip-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、权利人/专利策略确认、初步分析免责提示、行业识别、目的地/特权检查、清权 FTO 衔接提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 patent-analysis/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（立场确认、专利策略、初步分析免责、行业识别、临时模式、特权检查、FTO 衔接）保留，无语义丢失。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 copyright-registration 为四个可独立触发的子技能</name>
  <read_first>
    - ip-legal/skills/copyright-registration/SKILL.md（现有浅骨架 — 三步纲要；这是要拆分迁移并大幅深化的源）
    - ip-legal/skills/_shared/legal-basis-conventions.md（06-01 产出 — 引用规范）
    - ip-legal/skills/_shared/ip-law-citations.md（06-01 产出 — 引用库，重点：著作权保护期 50年、法定作品类型、职务/委托/合作作品权属、思想表达二分、作品自愿登记办法/软件著作权登记办法）
    - ip-legal/skills/_shared/practice-profile-schema.md（06-01 产出 — 配置读取契约）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板，子技能读取维权立场/著作权策略/检索数据库/风险校准）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    ip-legal/skills/copyright-registration/work-type-determination/SKILL.md,
    ip-legal/skills/copyright-registration/ownership-determination/SKILL.md,
    ip-legal/skills/copyright-registration/registration-materials/SKILL.md,
    ip-legal/skills/copyright-registration/registration-process/SKILL.md
  </files>
  <action>
    将现有 copyright-registration/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：work-type-determination / ownership-determination / registration-materials / registration-process；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 ip-legal/CLAUDE.md 配置 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/司法解释/部门规章 与 案例/学说 分类，引用 _shared/ip-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 copyright-registration 编排入口调用，也可由律师/IP 经理单独触发（/ip-legal:<name>）。**每个子技能须 150+ 行实质内容。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - work-type-determination（作品类型认定）：覆盖现纲要「需求收集」与作品定性。**作品独创性判断**（作品须具有独创性 + 能以一定形式表现的智力成果）；**法定作品类型**（文字作品/口述作品/音乐戏剧曲艺舞蹈杂技艺术作品/美术建筑作品/摄影作品/视听作品 2020修正后旧称电影作品/工程设计图产品设计图地图示意图等图形作品和模型作品/计算机软件/符合作品特征的其他智力成果 — **法定类型描述，条号待验证**）；**思想表达二分**（著作权保护表达不保护思想/思路/操作方法/数学概念/通用素材）；**不受著作权保护的对象**（法律法规、国家机关决议决定命令、时事新闻、历法通用数表通用表格公式等 — 描述规则，条号待验证）。深化：作品类型判定决策表、独创性判断要点（高度由作品类型而定）、思想表达二分应用示例表、不受保护对象清单。引用著作权法定作品类型与独创性（条号待验证，描述规则）。边界条件：实用艺术品的艺术性与实用性分离、计算机软件作为特殊作品类型（适用软件著作权登记）、AI 生成内容的独创性争议提示 `[待验证 — 学说与判例尚在发展]`。
    - ownership-determination（权属判定）：覆盖现纲要「法律分析」权属维度。**创作者原始取得**（创作作品的自然人是作者，著作权自作品创作完成时自动产生 — 自动保护原则）；**职务作品**（为完成法人或非法人组织工作任务所创作，一般职务作品作者享有著作权但单位有优先使用权 / 特殊职务作品 如主要利用单位物质技术条件并由单位承担责任的工程设计图等、计算机软件、法律或合同约定的，著作权由单位享有作者享署名权 — 描述规则，**条号待验证**）；**委托作品**（受托人创作，著作权归属由委托合同约定，无约定归受托人 — 描述规则）；**法人作品**（由法人主持代表其意志创作并承担责任的，法人视为作者 — 描述规则）；**合作作品**（共同创作，著作权由合作作者共同享有，可分割使用的可单独行使 — 描述规则）；权利归属约定优先。深化：权属类型判定流程表、职务作品一般 vs 特殊对比表、各权属类型默认归属与约定空间表。引用职务/委托/合作/法人作品权属规则（条号待验证，描述规则）。边界条件：单位与员工权属争议、多方合作权属约定缺失、委托开发软件权属（与许可/转让合同衔接，提示 commercial-legal 知识产权条款）。
    - registration-materials（登记材料准备）：覆盖现纲要「需求收集」材料维度。**申请主体证明**（自然人身份证明/法人营业执照/组织机构证明）；**作品说明**（作品名称、类别、创作目的/过程/独创性说明）；**权利归属证明**（原始取得/职务/委托/合作/转让继承的证明文件，对应 ownership-determination 结论）；**创作完成与发表证明**（创作完成时间、是否发表及首次发表时间地点）；**作品样本要求**（文字作品文本、美术摄影作品图样、软件源程序与文档鉴别材料 等不同作品类型样本要求 — 描述规则，**具体要求条号/办法待验证**）；委托代理的代理材料。深化：按作品类型的登记材料清单表（文字/美术/摄影/视听/软件）、软件著作权登记特殊材料（源程序前后各连续30页 + 文档，具体页数 `[待验证 — 须核实登记办法最新要求]`）、材料完整性检查表。引用作品自愿登记办法/计算机软件著作权登记办法（描述规则，条号/具体要求待验证）。边界条件：作品样本涉及商业秘密的处理（软件源程序例外删除规则 `[待验证]`）、未发表作品登记、合作作品多权利人登记。
    - registration-process（登记流程）：覆盖现纲要「法律分析」「输出生成」流程维度。**登记机构**（一般作品=中国版权保护中心及地方版权局/著作权登记机构；计算机软件=中国版权保护中心 — 描述）；**登记流程**（提交申请 → 受理 → 形式审查 → 补正（如需）→ 登记 → 公告 → 发证，周期 `[待验证 — 随机构与作品类型而定]`）；**登记证书效力**（**著作权自愿登记，登记不是著作权产生的前提**——著作权自创作完成自动产生；登记证书可作为**著作权归属的初步证据**，发生纠纷时举证便利 — 规则稳定，描述）；登记后变更/补充登记/撤销。深化：登记流程步骤表（含各环节预期周期 `[待验证]`）、登记证书效力说明（初步证据 vs 确权区别）、自愿登记 vs 强制登记澄清（中国著作权登记为自愿）。引用著作权自愿登记原则与登记证书初步证据效力（规则稳定，描述）。边界条件：登记不审查独创性实质（形式审查为主）、登记不等于权利无瑕疵（可被推翻）、境外作品登记。本子技能汇总前三个子技能给出著作权登记综合方案。

    遵守文件格式约定。输出模板用 markdown 结构示意。所有法律依据引用 _shared/ip-law-citations.md，著作权保护期/自愿登记规则稳定标建议复核、作品类型/权属/登记办法描述规则不写裸条号、其余条号标待验证。
  </action>
  <verify>
    <automated>for d in work-type-determination ownership-determination registration-materials registration-process; do f="ip-legal/skills/copyright-registration/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '独创性\|思想表达' ip-legal/skills/copyright-registration/work-type-determination/SKILL.md && grep -q '职务作品\|委托作品\|合作作品' ip-legal/skills/copyright-registration/ownership-determination/SKILL.md && grep -q '登记材料\|样本' ip-legal/skills/copyright-registration/registration-materials/SKILL.md && grep -q '初步证据\|自愿登记' ip-legal/skills/copyright-registration/registration-process/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 ip-legal/skills/copyright-registration/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按来源分类，标待验证），且每个 ≥100 非空行
    - work-type-determination 含独创性与思想表达二分；ownership-determination 含职务/委托/合作/法人作品权属；registration-materials 含按作品类型材料清单与软件特殊材料；registration-process 含自愿登记原则与登记证书初步证据效力
    - 著作权保护期与自愿登记规则标「建议复核」；作品类型/权属/登记办法描述规则不写裸条号；其余条号标待验证
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>copyright-registration 拆为四个可独立触发的子技能；现有三步纲要无丢失迁移并大幅深化（每个 150+ 行）；work-type-determination 独创性与思想表达二分、ownership-determination 职务委托合作法人权属、registration-materials 材料清单与软件特殊材料、registration-process 自愿登记与登记证书初步证据效力；著作权保护期/自愿登记标建议复核、权属/作品类型描述规则、其余条号标待验证。</done>
</task>

<task type="auto">
  <name>Task 4: 改造 copyright-registration/SKILL.md 为编排入口</name>
  <read_first>
    - ip-legal/skills/copyright-registration/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - employment-legal/skills/hiring-review/SKILL.md（编排入口范式 — 子技能顺序表 + 单独触发斜杠命令写法）
    - ip-legal/CLAUDE.md（06-01 产出 — 配置模板）
    - ip-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 06-03 统一更新）
  </read_first>
  <files>
    ip-legal/skills/copyright-registration/SKILL.md
  </files>
  <action>
    将 ip-legal/skills/copyright-registration/SKILL.md 改造为编排入口：保留 frontmatter（name: copyright-registration，更新 description 说明它现在编排四个子技能）。正文改为：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/copyright-registration/<子技能名>/SKILL.md）；(2) 目的与整体著作权登记流程概览（作品类型认定 → 权属判定 → 登记材料准备 → 登记流程）；(3) 前置：加载维权立场——读取 ip-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /ip-legal:cold-start-interview 或说「临时模式」），含临时模式段落（平衡维权立场、律师角色、著作权按独创性与思想表达二分判断、标 `[临时模式]`）；(4) 子技能编排顺序表——作品类型认定 → 权属判定 → 登记材料准备 → 登记流程，每行说明该子技能做什么、对应子技能路径、可单独触发的斜杠命令（/ip-legal:<name>）+ 顺序说明；(5) 入口级护栏：权利人画像确认（从 ## 我们是谁）、著作权策略加载（从 ## 维权与申请立场 → 著作权策略，是否登记主要作品/软件著作权立场）、**自愿登记原则提示**（登记非确权，著作权自创作完成自动产生，登记为初步证据）、行业识别（文创/软件等）、目的地/特权检查、若涉及作品/素材来源合规提示可调用 ip-clearance（06-03 著作权清权）、时效性提示。不得丢失任何护栏语义。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=ip-legal/skills/copyright-registration/SKILL.md; grep -q '^name: copyright-registration' "$f" && grep -q 'work-type-determination' "$f" && grep -q 'ownership-determination' "$f" && grep -q 'registration-materials' "$f" && grep -q 'registration-process' "$f" && grep -q '临时模式' "$f" && grep -q '自愿登记\|著作权策略\|清权\|初步证据' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - ip-legal/skills/copyright-registration/SKILL.md 仍有 frontmatter name: copyright-registration，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/ip-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式、权利人/著作权策略确认、自愿登记原则提示、行业识别、目的地/特权检查、著作权清权衔接提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 copyright-registration/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（立场确认、著作权策略、自愿登记原则、行业识别、临时模式、特权检查、清权衔接）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 patent-analysis 子技能 + 一个专利编排入口 + 四个 copyright-registration 子技能 + 一个著作权编排入口全部存在且格式合规
- 现有 patent-analysis 与 copyright-registration 浅骨架三步纲要无丢失迁移并大幅深化
- 专利侵权判定全面覆盖原则与等同原则（手段-功能-效果 + 本领域普通技术人员无需创造性劳动可联想 + 禁止反悔/捐献）描述规则不写裸条号；专利权期限=专利法第42条标「建议复核」
- 著作权保护期（终生+死后50年/法人视听作品首次发表后50年）与自愿登记原则（登记非确权、初步证据效力）明确，思想表达二分体现；权属/作品类型描述规则不写裸条号
- 法律依据按 法条/司法解释/部门规章 与 案例/学说 分类，案例案号标 `[待验证]`，无臆造
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('ip-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/IP 经理可单独触发任一专利侵权初步分析子能力与任一著作权登记子能力（8 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 专利侵权方法论（全面覆盖+等同）与著作权登记规则（自愿登记/保护期/权属）准确，规则类描述规则不写裸条号，中度把握锚点标建议复核，其余条号标待验证
- patent-analysis 与 copyright-registration 两个编排入口各指向四个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/06-ip-legal/06-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
