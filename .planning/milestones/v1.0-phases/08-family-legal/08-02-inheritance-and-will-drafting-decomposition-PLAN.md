---
phase: 08-family-legal
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - family-legal/skills/inheritance/legal-succession-order/SKILL.md
  - family-legal/skills/inheritance/testate-succession-validity/SKILL.md
  - family-legal/skills/inheritance/estate-scope-debt/SKILL.md
  - family-legal/skills/inheritance/subrogation-transmission/SKILL.md
  - family-legal/skills/inheritance/SKILL.md
  - family-legal/skills/will-drafting/will-form-selection/SKILL.md
  - family-legal/skills/will-drafting/testamentary-capacity-intent/SKILL.md
  - family-legal/skills/will-drafting/content-reserved-share/SKILL.md
  - family-legal/skills/will-drafting/witnessing-effectiveness/SKILL.md
  - family-legal/skills/will-drafting/SKILL.md
autonomous: true
requirements:
  - INHERITANCE-DECOMP
  - WILL-DRAFTING-DECOMP
user_setup: []

must_haves:
  truths:
    - "律师/法务/当事人可以单独触发继承权分析的任一子能力（法定继承顺序与份额 / 遗嘱继承效力 / 遗产范围与债务清偿 / 代位继承与转继承）而无需运行整个流程"
    - "继承权分析覆盖法定继承顺序（第一顺序配偶子女父母 第1127条）、遗嘱继承优先于法定继承、遗产范围（第1122条）、遗产债务清偿以遗产实际价值为限、代位继承（第1128条）与转继承区分，规则来自民法典继承编与继承编司法解释，中度把握锚点标建议复核、司法解释具体条号待验证"
    - "律师/法务/当事人可以单独触发遗嘱起草的任一子能力（遗嘱形式选择 / 遗嘱能力与意思表示 / 遗嘱内容与必留份 / 见证与生效）而无需运行整个流程"
    - "遗嘱起草覆盖六种遗嘱形式（自书1134/代书1135/打印1136/录音录像1137/口头1138/公证1139，公证遗嘱不再具优先效力）、遗嘱能力与真实意思表示、必留份（第1141条）、见证人资格与生效要件，中度把握锚点标建议复核、把握不足条号描述规则待验证"
    - "每个 inheritance 与 will-drafting 子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容；现有浅骨架三步纲要无丢失迁移到子技能，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "family-legal/skills/inheritance/legal-succession-order/SKILL.md"
      provides: "法定继承顺序与份额子技能（第一顺序配偶子女父母第1127条 + 第二顺序 + 同顺序均等与照顾酌情第1130条 + 丧偶儿媳女婿第1129条）"
      contains: "第1127条"
      min_lines: 150
    - path: "family-legal/skills/inheritance/testate-succession-validity/SKILL.md"
      provides: "遗嘱继承效力子技能（遗嘱继承优先于法定继承 + 遗嘱有效要件 + 数份遗嘱以最后为准第1142条 + 遗赠与遗赠扶养协议优先第1158条）"
      contains: "遗嘱继承"
      min_lines: 150
    - path: "family-legal/skills/inheritance/estate-scope-debt/SKILL.md"
      provides: "遗产范围与债务清偿子技能（遗产范围第1122条 + 夫妻共同财产先析产后继承 + 遗产债务以遗产实际价值为限第1161条 + 无人继承遗产归属第1160条）"
      contains: "第1122条"
      min_lines: 150
    - path: "family-legal/skills/inheritance/subrogation-transmission/SKILL.md"
      provides: "代位继承与转继承子技能（代位继承第1128条 + 转继承 + 代位与转继承区分 + 丧失继承权第1125条）"
      contains: "代位继承"
      min_lines: 150
    - path: "family-legal/skills/inheritance/SKILL.md"
      provides: "继承权分析编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "family-legal/skills/will-drafting/will-form-selection/SKILL.md"
      provides: "遗嘱形式选择子技能（自书1134/代书1135/打印1136/录音录像1137/口头1138/公证1139 各形式要件与适用对照，公证遗嘱不再优先）"
      contains: "自书"
      min_lines: 150
    - path: "family-legal/skills/will-drafting/testamentary-capacity-intent/SKILL.md"
      provides: "遗嘱能力与意思表示子技能（完全民事行为能力 + 真实意思表示无欺诈胁迫 + 受欺诈胁迫遗嘱无效 + 伪造篡改遗嘱第1143条）"
      contains: "意思表示"
      min_lines: 150
    - path: "family-legal/skills/will-drafting/content-reserved-share/SKILL.md"
      provides: "遗嘱内容与必留份子技能（处分范围限于个人财产先析产 + 必留份第1141条 + 附义务遗嘱第1144条 + 遗赠与遗嘱区分）"
      contains: "必留份"
      min_lines: 150
    - path: "family-legal/skills/will-drafting/witnessing-effectiveness/SKILL.md"
      provides: "见证与生效子技能（见证人资格与人数第1140条 + 不能作见证人情形 + 各形式生效要件 日期签名见证签名 + 遗嘱执行与遗产管理人第1145条）"
      contains: "见证"
      min_lines: 150
    - path: "family-legal/skills/will-drafting/SKILL.md"
      provides: "遗嘱起草编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "family-legal/skills/inheritance/legal-succession-order/SKILL.md"
      to: "family-legal/skills/_shared/family-law-citations.md"
      via: "引用法定继承顺序（民法典第1127条）"
      pattern: "family-law-citations|第1127条|第一顺序"
    - from: "family-legal/skills/will-drafting/will-form-selection/SKILL.md"
      to: "family-legal/skills/_shared/family-law-citations.md"
      via: "引用六种遗嘱形式（民法典第1134-1139条）"
      pattern: "family-law-citations|第1134条|自书遗嘱|公证遗嘱"
    - from: "family-legal/skills/will-drafting/content-reserved-share/SKILL.md"
      to: "family-legal/skills/_shared/family-law-citations.md"
      via: "引用必留份规则（民法典第1141条）"
      pattern: "family-law-citations|第1141条|必留份"
    - from: "family-legal/skills/inheritance/SKILL.md"
      to: "四个 inheritance 子技能"
      via: "编排入口指向子技能路径"
      pattern: "legal-succession-order|testate-succession-validity|estate-scope-debt|subrogation-transmission"
    - from: "family-legal/skills/will-drafting/SKILL.md"
      to: "四个 will-drafting 子技能"
      via: "编排入口指向子技能路径"
      pattern: "will-form-selection|testamentary-capacity-intent|content-reserved-share|witnessing-effectiveness"
---

<objective>
继续婚姻家事插件深化：将 inheritance（继承权分析）与 will-drafting（遗嘱起草）两个主技能从扁平浅骨架拆分为可独立触发的深层子技能。

本计划交付两块内容：
1. **继承权分析拆分** — 将 inheritance（现 ~16 行浅骨架）拆为四个可独立触发的子技能：法定继承顺序与份额 / 遗嘱继承效力 / 遗产范围与债务清偿 / 代位继承与转继承。规则来自民法典继承编（第1119-1163条）与继承编司法解释(一)，中度把握锚点标「建议复核」、司法解释具体条号一律待验证、描述规则呈现。
2. **遗嘱起草拆分** — 将 will-drafting（现 ~16 行浅骨架）拆为四个可独立触发的子技能：遗嘱形式选择 / 遗嘱能力与意思表示 / 遗嘱内容与必留份 / 见证与生效。覆盖六种遗嘱形式（自书第1134条/代书第1135条/打印第1136条/录音录像第1137条/口头第1138条/公证第1139条，**民法典取消公证遗嘱优先效力**）、遗嘱能力、必留份（第1141条）、见证人资格与生效要件。

两个主技能原 SKILL.md 改为编排入口顺序调用各自四个子技能，现有三步纲要拆分迁移并大幅深化，无丢失。

Purpose: 关闭「inheritance 与 will-drafting 仅为浅骨架、ROADMAP 继承权分析与遗嘱起草能力面深度不足」的 gap。本计划属 wave 1，与 08-01 无文件重叠（08-01 修改 _shared/divorce-agreement/CLAUDE.md，本计划仅修改 inheritance/will-drafting），可并行；引用 08-01 产出的 _shared 脊柱与 CLAUDE.md 作为内容来源，但因 wave 1 并行执行，本计划在 read_first 中说明：若 _shared 脊柱尚未就绪，按 08-CONTEXT 中度把握锚点清单直接引用并标建议复核（内容自洽，不阻塞）。
Output: 4 个 inheritance 子技能 + 1 个继承编排入口 + 4 个 will-drafting 子技能 + 1 个遗嘱编排入口。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民法典继承编 第1119-1163条 为分析基础，继承编司法解释(一) 为补充）；指导性案例作参考非判例法（案号标待验证）；法院层级识别（继承纠纷通常基层法院一审，家事审判庭）；行业监管特色（公证机构=遗嘱公证/继承权公证、不动产登记机构=遗产析产登记）；执业环境适配（婚姻家事律师 / 个人法务 / 立遗嘱人或继承人本人 / 非律师但有律师可咨询）。命名约定：技能名 kebab-case；斜杠命令 /family-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释 与 案例/学说 分类，带来源标签。中度把握锚点（须标「已核实锚点（中度把握），建议复核」）：遗产范围=民法典第1122条；法定继承顺序=第1127条；遗嘱形式 自书第1134条/代书第1135条/打印第1136条/录音录像第1137条/口头第1138条/公证第1139条；必留份=第1141条；遗赠扶养协议=第1158条。继承编其他锚点（代位继承第1128条/丧偶儿媳女婿第1129条/同顺序均等照顾第1130条/丧失继承权第1125条/数份遗嘱以最后为准第1142条/伪造篡改第1143条/附义务遗嘱第1144条/见证人资格第1140条/遗产管理人第1145条/遗产债务以遗产实际价值为限第1161条/无人继承归属第1160条）标「建议复核」，**作者把握不足的条号降级为「描述规则 + `[待验证]`」，绝不臆造。** **严禁回退旧继承法条号（原继承法第3/10/19条等），一律使用民法典继承编新条号。** **司法解释（继承编司法解释(一)）具体条号、案例案号一律标 `[待验证]`，描述规则呈现。**
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/08-family-legal/08-CONTEXT.md
@CLAUDE.md
@family-legal/skills/inheritance/SKILL.md
@family-legal/skills/will-drafting/SKILL.md
@family-legal/.claude-plugin/plugin.json
@commercial-legal/skills/contract-review/SKILL.md
@construction-legal/skills/contract-review/SKILL.md
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 inheritance 为四个可独立触发的子技能</name>
  <read_first>
    - family-legal/skills/inheritance/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；拆分迁移并大幅深化的源）
    - family-legal/skills/_shared/legal-basis-conventions.md（08-01 产出 — 引用规范；若并行尚未就绪，按 08-CONTEXT 中度把握锚点清单与保守纪律直接引用）
    - family-legal/skills/_shared/family-law-citations.md（08-01 产出 — 引用库，重点：继承编 遗产范围第1122条/法定继承第1127条/代位继承第1128条/丧偶儿媳女婿第1129条/同顺序均等照顾第1130条/数份遗嘱第1142条/遗赠扶养第1158条/遗产债务第1161条/无人继承第1160条/丧失继承权第1125条；若并行尚未就绪，按 08-CONTEXT 锚点清单直接引用并标建议复核）
    - family-legal/skills/_shared/practice-profile-schema.md（08-01 产出 — 配置读取契约，代理立场=某继承人侧/中立字段；若尚未就绪，按 08-CONTEXT 决策读取代理立场与敏感度）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，子技能读取代理立场/敏感度/风险校准；若尚未就绪，按临时模式默认值 中立立场/敏感度最高）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板/边界条件/错误处理/## 法律依据 分类范式）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 步骤含表格、占位案例学说）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    family-legal/skills/inheritance/legal-succession-order/SKILL.md,
    family-legal/skills/inheritance/testate-succession-validity/SKILL.md,
    family-legal/skills/inheritance/estate-scope-debt/SKILL.md,
    family-legal/skills/inheritance/subrogation-transmission/SKILL.md
  </files>
  <action>
    将现有 inheritance/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：legal-succession-order / testate-succession-validity / estate-scope-debt / subrogation-transmission；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 family-legal/CLAUDE.md 配置含**代理立场 某继承人侧/中立 + 敏感度校准** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格，含敏感情形如继承人纠纷激化/涉刑识别与升级）、`## 法律依据`（按 法条/司法解释 与 案例/学说 分类，引用 _shared/family-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 inheritance 编排入口调用，也可由律师/法务/继承人单独触发（/family-legal:<name>），**并须按代理立场（代理哪个继承人）调整份额主张侧重**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - legal-succession-order（法定继承顺序与份额）：法定继承开始的条件（无遗嘱/遗赠扶养协议时）；**第一顺序继承人**（配偶、子女含婚生非婚生养子女有扶养关系继子女、父母含养父母有扶养关系继父母）；**第二顺序继承人**（兄弟姐妹、祖父母、外祖父母）=第1127条（建议复核）；**份额**（同一顺序一般均等，对生活有特殊困难且缺乏劳动能力的应予照顾、对尽主要扶养义务或共同生活的可多分、有扶养能力而不尽扶养义务的应不分或少分=第1130条 建议复核）；**丧偶儿媳/女婿**尽主要赡养义务作为第一顺序继承人=第1129条（建议复核）。深化：法定继承人范围与顺序表、份额计算与照顾酌情情形表、丧偶儿媳女婿继承地位判定、继承人资格核查清单。**按代理立场区分**：代理某继承人时关注其顺序资格与可多分情形。引用法定继承顺序=第1127条、份额均等照顾=第1130条、丧偶儿媳女婿=第1129条（建议复核）。边界条件：胎儿预留份、养子女与生父母继承、继父母子女继承。
    - testate-succession-validity（遗嘱继承效力）：**遗嘱继承优先于法定继承**（有效遗嘱按遗嘱、无遗嘱才法定）；**遗嘱有效要件概述**（形式合法、能力适格、意思真实、内容合法不违必留份——具体由 will-drafting 子技能深化，本处侧重效力认定与争议）；**数份遗嘱冲突**（内容相抵触以最后的遗嘱为准=第1142条 建议复核；公证遗嘱不再具优先效力的修订说明）；**遗赠与遗赠扶养协议**（遗赠扶养协议效力优先于遗嘱与法定继承=第1158条 建议复核；遗赠须在知道受遗赠后六十日内表示接受否则视为放弃 描述规则）。深化：遗嘱效力认定要件表、数份遗嘱顺位判定、遗赠扶养协议/遗嘱/法定继承顺位表、遗嘱无效与部分无效情形。**按代理立场区分**：主张遗嘱有效方vs主张无效方的举证侧重。引用数份遗嘱以最后为准=第1142条、遗赠扶养协议优先=第1158条（建议复核）。边界条件：遗嘱部分无效、遗嘱与遗赠扶养协议并存、受遗赠人先于遗嘱人死亡。
    - estate-scope-debt（遗产范围与债务清偿）：**遗产范围**（自然人死亡时遗留的个人合法财产=第1122条 建议复核；不属于遗产的 如专属人身性权利、保险金指定受益人、夫妻共同财产中属配偶部分）；**夫妻共同财产先析产后继承**（被继承人遗产为夫妻共同财产的，应先分出配偶一半再就另一半继承）；**遗产债务清偿**（继承遗产应清偿被继承人依法应缴税款和债务，以所得遗产实际价值为限，超过部分继承人自愿偿还不限=第1161条 建议复核；放弃继承对债务清偿的影响）；**无人继承又无人受遗赠**遗产归国家用于公益或集体所有制组织成员=第1160条（建议复核）。深化：遗产范围识别表（属遗产vs不属遗产）、先析产后继承计算步骤、遗产债务清偿顺序与限额表、放弃继承与债务关系。**按代理立场区分**：继承人关注限额清偿与析产份额，债权人关注遗产范围与清偿。引用遗产范围=第1122条、债务限额清偿=第1161条、无人继承归属=第1160条（建议复核）。边界条件：遗产分割前的债务、虚假放弃继承逃债、遗产与个人财产混同。
    - subrogation-transmission（代位继承与转继承）：**代位继承**（被继承人的子女先于被继承人死亡，由该子女的晚辈直系血亲代位继承其应继份；被继承人兄弟姐妹先于死亡的，由兄弟姐妹的子女代位=第1128条 建议复核）；**转继承**（继承人在继承开始后遗产分割前死亡且未放弃继承，其应继份转由其继承人继承）；**代位与转继承区分**（时间点：代位=被继承人死亡前；转继承=继承开始后分割前；主体与份额不同）；**丧失继承权**（故意杀害被继承人、为争夺遗产杀害其他继承人、遗弃或虐待情节严重、伪造篡改隐匿销毁遗嘱情节严重、胁迫欺骗设立变更撤销遗嘱；部分情形确有悔改可恢复=第1125条 建议复核）。深化：代位继承vs转继承对比表（发生时间/主体/份额）、代位继承范围（晚辈直系血亲）表、丧失继承权情形与恢复表、份额计算示例。**按代理立场区分**：代位/转继承人主张代位份额，其他继承人可能抗辩丧失继承权。引用代位继承=第1128条、丧失继承权=第1125条（建议复核）。边界条件：双重代位、代位继承人与被代位人的关系认定、丧失继承权的认定程序。
  </action>
  <verify>
    <automated>for d in legal-succession-order testate-succession-validity estate-scope-debt subrogation-transmission; do f="family-legal/skills/inheritance/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第1127条\|第一顺序' family-legal/skills/inheritance/legal-succession-order/SKILL.md && grep -q '遗嘱继承\|遗赠扶养' family-legal/skills/inheritance/testate-succession-validity/SKILL.md && grep -q '第1122条\|遗产范围' family-legal/skills/inheritance/estate-scope-debt/SKILL.md && grep -q '代位继承\|转继承' family-legal/skills/inheritance/subrogation-transmission/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 family-legal/skills/inheritance/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置含代理立场与敏感度/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - legal-succession-order 含第一二顺序与份额照顾酌情（第1127/1130条）及丧偶儿媳女婿（第1129条）；testate-succession-validity 含遗嘱优先与数份遗嘱以最后为准（第1142条）及遗赠扶养优先（第1158条）；estate-scope-debt 含遗产范围（第1122条）与先析产后继承及债务限额清偿（第1161条）；subrogation-transmission 含代位继承（第1128条）转继承区分与丧失继承权（第1125条）
    - 每个子技能体现按代理立场（代理某继承人）调整份额主张侧重
    - 法律依据引用 _shared 库（或按 08-CONTEXT 锚点），中度把握锚点（1122/1127/1158/1141 等）与继承编其他锚点（1128/1129/1130/1142/1125/1161/1160）标「建议复核」、司法解释规则描述规则不写裸条号、把握不足条号标待验证、无旧继承法条号回退
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>inheritance 拆为四个可独立触发的子技能并大幅深化（每个 150+ 行）；legal-succession-order 法定继承顺序份额、testate-succession-validity 遗嘱继承效力与遗赠扶养顺位、estate-scope-debt 遗产范围与债务限额清偿、subrogation-transmission 代位与转继承及丧失继承权；各子技能按代理立场调整份额主张侧重；法律依据按来源分类引用 _shared 库，中度把握锚点标建议复核、司法解释规则描述规则、把握不足条号待验证、无旧法条号回退。</done>
</task>

<task type="auto">
  <name>Task 2: 创建 inheritance 编排入口</name>
  <read_first>
    - family-legal/skills/inheritance/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 1 产出的四个 inheritance 子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - construction-legal/skills/contract-review/SKILL.md（最近一次编排入口范式 — 风格参照）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，读取代理立场与敏感度；若尚未就绪按临时模式默认值）
  </read_first>
  <files>
    family-legal/skills/inheritance/SKILL.md
  </files>
  <action>
    将 family-legal/skills/inheritance/SKILL.md 改造为编排入口：保留 frontmatter（name: inheritance，更新 description 说明它编排四个子技能，argument-hint「[继承情况/遗嘱/亲属关系/遗产清单]」）。正文：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/inheritance/<子技能名>/SKILL.md）；(2) 目的与整体继承权分析流程概览（法定继承顺序与份额 → 遗嘱继承效力 → 遗产范围与债务清偿 → 代位继承与转继承）；(3) 前置：加载**代理立场**——读取 family-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /family-legal:cold-start-interview 或说「临时模式」），含临时模式段落（中立审查立场、律师角色、**敏感度默认最高**、标 `[临时模式]`）；(4) 子技能编排顺序表——法定继承顺序与份额 / 遗嘱继承效力 / 遗产范围与债务清偿 / 代位继承与转继承，每行说明该子技能做什么、对应子技能路径（skills/inheritance/<name>/SKILL.md）、可单独触发的斜杠命令（/family-legal:<name>）+ 顺序说明；(5) 入口级护栏：当事人画像与亲属关系确认（从 ## 我们是谁 读取）、**代理立场加载（从 ## 审查与代理立场 — 某继承人侧/中立，强调立场决定份额主张侧重）**、**敏感情形识别（继承人纠纷激化/涉刑 如杀害被继承人争夺遗产/丧失继承权争议即强制升级）**、**当事人情绪护栏（丧亲悲痛，输出中立克制）**、目的地/特权检查、遗产析产涉房产时提示公证/不动产登记路径、地方性规定提示、时效性提示（继承编司法解释条号易变）。不得丢失任何护栏语义。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=family-legal/skills/inheritance/SKILL.md; grep -q '^name: inheritance' "$f" && grep -q 'legal-succession-order' "$f" && grep -q 'testate-succession-validity' "$f" && grep -q 'estate-scope-debt' "$f" && grep -q 'subrogation-transmission' "$f" && grep -q '临时模式' "$f" && grep -q '代理立场\|继承人\|审查立场' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - family-legal/skills/inheritance/SKILL.md 仍有 frontmatter name: inheritance，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/family-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式（敏感度默认最高）、当事人画像与亲属关系确认、代理立场加载（某继承人侧/中立）、敏感情形识别与强制升级（涉刑/丧失继承权争议）、当事人情绪护栏（丧亲）、目的地/特权检查、公证/不动产登记路径提示、地方性规定提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 inheritance/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（代理立场、当事人画像与亲属关系、敏感情形强制升级、丧亲情绪护栏、临时模式、特权检查、公证路径、地方性规定）保留，无语义丢失。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 will-drafting 为四个可独立触发的子技能</name>
  <read_first>
    - family-legal/skills/will-drafting/SKILL.md（现有浅骨架 — 三步纲要：需求收集/法律分析/输出生成；拆分迁移并大幅深化的源）
    - family-legal/skills/_shared/legal-basis-conventions.md（08-01 产出 — 引用规范；若并行尚未就绪按 08-CONTEXT 锚点清单）
    - family-legal/skills/_shared/family-law-citations.md（08-01 产出 — 引用库，重点：遗嘱形式 自书1134/代书1135/打印1136/录音录像1137/口头1138/公证1139、必留份第1141条、见证人资格第1140条、伪造篡改第1143条、附义务遗嘱第1144条、遗产管理人第1145条；若尚未就绪按 08-CONTEXT 锚点清单直接引用并标建议复核）
    - family-legal/skills/_shared/practice-profile-schema.md（08-01 产出 — 配置读取契约，代理立场=遗嘱人侧字段；若尚未就绪按 08-CONTEXT 决策）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，子技能读取代理立场 遗嘱人侧/敏感度/文书风格；若尚未就绪按临时模式默认值）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    family-legal/skills/will-drafting/will-form-selection/SKILL.md,
    family-legal/skills/will-drafting/testamentary-capacity-intent/SKILL.md,
    family-legal/skills/will-drafting/content-reserved-share/SKILL.md,
    family-legal/skills/will-drafting/witnessing-effectiveness/SKILL.md
  </files>
  <action>
    将现有 will-drafting/SKILL.md 的浅骨架三步纲要拆分迁移并**大幅深化**到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：will-form-selection / testamentary-capacity-intent / content-reserved-share / witnessing-effectiveness；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 family-legal/CLAUDE.md 配置含**代理立场 遗嘱人侧 + 敏感度 + 文书风格** + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意，遗嘱文本须严谨且形式要件齐备）、边界条件（表格）、错误处理（表格，含遗嘱人能力存疑/受胁迫识别与升级）、`## 法律依据`（按 法条/司法解释 与 案例/学说 分类，引用 _shared/family-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 will-drafting 编排入口调用，也可由律师/法务/立遗嘱人单独触发（/family-legal:<name>），**并以保障遗嘱人真实意愿与遗嘱有效性为核心**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment，不得是骨架。**

    分工（迁移现有三步纲要并深化，无丢失）：
    - will-form-selection（遗嘱形式选择）：**六种法定遗嘱形式及要件**——自书遗嘱（亲笔书写签名注明年月日=第1134条 建议复核）、代书遗嘱（两个以上见证人在场见证，由其中一人代书并由遗嘱人代书人见证人签名注明年月日=第1135条 建议复核）、打印遗嘱（两个以上见证人在场见证，遗嘱人和见证人在每一页签名注明年月日=第1136条 建议复核）、录音录像遗嘱（两个以上见证人在场见证，遗嘱人和见证人在录音录像中记录姓名肖像及年月日=第1137条 建议复核）、口头遗嘱（危急情况下两个以上见证人在场见证，危急情况消除后能书面或录音录像的口头遗嘱无效=第1138条 建议复核）、公证遗嘱（经公证机构办理=第1139条 建议复核）；**民法典取消公证遗嘱优先效力**（修订要点，数份遗嘱以最后为准）。深化：六种遗嘱形式要件对照表（形式/见证人要求/签名日期要求/适用情形/风险）、形式选择决策表（按遗嘱人书写能力/危急程度/财产复杂度推荐形式）、各形式常见无效陷阱清单。引用六种遗嘱形式=第1134-1139条（建议复核）、公证遗嘱不再优先（修订说明）。边界条件：自书与代书界限、打印遗嘱新规争议、口头遗嘱失效转换。
    - testamentary-capacity-intent（遗嘱能力与意思表示）：**遗嘱能力**（须为完全民事行为能力人，无民事行为能力人或限制民事行为能力人所立遗嘱无效；立遗嘱时有能力其后丧失不影响效力，立遗嘱时无能力其后恢复的遗嘱仍无效）；**真实意思表示**（须为遗嘱人真实意思，受欺诈胁迫所立遗嘱无效）；**伪造篡改**（伪造的遗嘱无效，遗嘱被篡改的篡改内容无效=第1143条 建议复核）；遗嘱人能力与意愿的核查与留痕（如录像记录、医疗证明、独立沟通）。深化：遗嘱能力判定与核查表、真实意思保障措施表（隔离干扰/独立沟通/留痕）、欺诈胁迫与伪造篡改情形及后果表、能力存疑时的处理流程。**错误处理含识别遗嘱人能力存疑或疑似受胁迫时暂停并强制升级。** 引用受欺诈胁迫遗嘱无效与伪造篡改=第1143条（建议复核），遗嘱能力规则（描述规则，能力具体条文把握不足标待验证）。边界条件：间歇性精神障碍者立遗嘱、高龄遗嘱人能力质疑、近亲属在场的意思自由。
    - content-reserved-share（遗嘱内容与必留份）：**处分范围**（遗嘱只能处分遗嘱人个人合法财产，处分共同财产部分无效，须先析产；不得处分他人财产或国家集体财产）；**必留份**（遗嘱应当为缺乏劳动能力又无生活来源的继承人保留必要的遗产份额=第1141条 建议复核；违反必留份的遗嘱部分无效，处理时先留必留份）；**附义务遗嘱**（遗嘱可附义务，继承人或受遗赠人无正当理由不履行义务的，经利害关系人或有关组织请求可取消其接受附义务部分遗产的权利=第1144条 建议复核）；**遗赠与遗嘱继承区分**（遗赠给法定继承人以外的人或组织）。深化：遗嘱处分范围核查表（个人财产vs共同财产vs他人财产）、必留份判定与计算表（缺乏劳动能力又无生活来源的认定）、附义务遗嘱条款拟定要点、遗嘱继承vs遗赠对照表。引用必留份=第1141条、附义务遗嘱=第1144条（建议复核）。边界条件：必留份与法定继承人范围、胎儿必留份、附义务无法履行。
    - witnessing-effectiveness（见证与生效）：**见证人资格**（无民事行为能力人限制民事行为能力人不能作见证人、继承人受遗赠人不能作见证人、与继承人受遗赠人有利害关系的人不能作见证人=第1140条 建议复核）；**见证人数**（代书/打印/录音录像/口头遗嘱均须两个以上见证人在场）；**各形式生效要件复核**（签名、注明年月日、见证人签名、每页签名等形式齐备）；**遗嘱执行与遗产管理人**（遗嘱可指定遗嘱执行人；遗产管理人的选任与职责=第1145条 建议复核）；遗嘱保管与生效（遗嘱自遗嘱人死亡时生效）。深化：见证人资格排除清单表、各遗嘱形式见证与签名日期要件核对表、遗嘱执行人与遗产管理人对照、遗嘱保管与生效流程。**错误处理含见证人不适格/形式要件缺失导致遗嘱无效的风险提示与强制复核。** 引用见证人资格=第1140条、遗产管理人=第1145条（建议复核）。边界条件：见证人临时回避、远程见证效力存疑 `[待验证]`、遗嘱原件丢失。
  </action>
  <verify>
    <automated>for d in will-form-selection testamentary-capacity-intent content-reserved-share witnessing-effectiveness; do f="family-legal/skills/will-drafting/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '自书\|第1134条' family-legal/skills/will-drafting/will-form-selection/SKILL.md && grep -q '意思表示\|遗嘱能力' family-legal/skills/will-drafting/testamentary-capacity-intent/SKILL.md && grep -q '必留份\|第1141条' family-legal/skills/will-drafting/content-reserved-share/SKILL.md && grep -q '见证\|第1140条' family-legal/skills/will-drafting/witnessing-effectiveness/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 family-legal/skills/will-drafting/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置含代理立场遗嘱人侧与敏感度/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - will-form-selection 含六种遗嘱形式（第1134-1139条）及公证遗嘱不再优先修订；testamentary-capacity-intent 含遗嘱能力与真实意思及伪造篡改（第1143条）；content-reserved-share 含处分范围先析产与必留份（第1141条）及附义务遗嘱（第1144条）；witnessing-effectiveness 含见证人资格（第1140条）与生效要件及遗产管理人（第1145条）
    - 每个子技能以保障遗嘱人真实意愿与遗嘱有效性为核心，错误处理含能力存疑/受胁迫/形式缺失的强制升级或复核
    - 法律依据引用 _shared 库（或按 08-CONTEXT 锚点），遗嘱形式与必留份等锚点标「建议复核」、把握不足条号描述规则标待验证、无旧继承法条号回退
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>will-drafting 拆为四个可独立触发的子技能并大幅深化（每个 150+ 行）；will-form-selection 六种遗嘱形式与公证不再优先、testamentary-capacity-intent 遗嘱能力与真实意思、content-reserved-share 处分范围先析产与必留份、witnessing-effectiveness 见证人资格与生效要件；以保障遗嘱人真实意愿与有效性为核心；法律依据按来源分类引用 _shared 库，中度把握锚点标建议复核、把握不足条号待验证、无旧法条号回退。</done>
</task>

<task type="auto">
  <name>Task 4: 创建 will-drafting 编排入口</name>
  <read_first>
    - family-legal/skills/will-drafting/SKILL.md（现有浅骨架 — 改造对象）
    - 本计划 Task 3 产出的四个 will-drafting 子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - construction-legal/skills/contract-review/SKILL.md（最近一次编排入口范式 — 风格参照）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，读取代理立场遗嘱人侧与文书风格；若尚未就绪按临时模式默认值）
  </read_first>
  <files>
    family-legal/skills/will-drafting/SKILL.md
  </files>
  <action>
    将 family-legal/skills/will-drafting/SKILL.md 改造为编排入口：保留 frontmatter（name: will-drafting，更新 description 说明它编排四个子技能，argument-hint「[立遗嘱人情况/财产清单/继承人信息]」）。正文：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/will-drafting/<子技能名>/SKILL.md）；(2) 目的与整体遗嘱起草流程概览（遗嘱形式选择 → 遗嘱能力与意思表示 → 遗嘱内容与必留份 → 见证与生效）；(3) 前置：加载**代理立场（遗嘱人侧）与文书风格**——读取 family-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /family-legal:cold-start-interview 或说「临时模式」），含临时模式段落（遗嘱人侧、律师角色、文书风格严谨、**敏感度默认最高**、标 `[临时模式]`）；(4) 子技能编排顺序表——遗嘱形式选择 / 遗嘱能力与意思表示 / 遗嘱内容与必留份 / 见证与生效，每行说明、子技能路径（skills/will-drafting/<name>/SKILL.md）、可单独触发斜杠命令（/family-legal:<name>）+ 顺序说明；(5) 入口级护栏：立遗嘱人画像与财产继承人确认（从 ## 我们是谁 读取）、文书风格加载（严谨、形式要件齐备）、**遗嘱能力与真实意思核查提示（能力存疑或疑似受胁迫即强制升级）**、**必留份与处分范围提示（先析产、为缺乏劳动能力又无生活来源继承人保留）**、公证路径提示（如选公证遗嘱）、目的地/特权检查、地方性规定提示、时效性提示（遗嘱形式新规与司法解释）。不得丢失任何护栏语义。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=family-legal/skills/will-drafting/SKILL.md; grep -q '^name: will-drafting' "$f" && grep -q 'will-form-selection' "$f" && grep -q 'testamentary-capacity-intent' "$f" && grep -q 'content-reserved-share' "$f" && grep -q 'witnessing-effectiveness' "$f" && grep -q '临时模式' "$f" && grep -q '遗嘱能力\|必留份\|遗嘱人' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - family-legal/skills/will-drafting/SKILL.md 仍有 frontmatter name: will-drafting，description 更新为编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/family-legal:<name>）
    - 保留入口级护栏：加载实践配置 + 临时模式（敏感度默认最高）、立遗嘱人画像确认、文书风格加载、遗嘱能力与真实意思核查（能力存疑/受胁迫强制升级）、必留份与处分范围提示、公证路径提示、目的地/特权检查、地方性规定提示
    - 顶部含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 will-drafting/SKILL.md 成为指向四个子技能的编排入口，入口级护栏（代理立场遗嘱人侧、立遗嘱人画像、文书风格、遗嘱能力与真实意思核查强制升级、必留份与处分范围、公证路径、临时模式、特权检查、地方性规定）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个 inheritance 子技能 + 一个继承编排入口 + 四个 will-drafting 子技能 + 一个遗嘱编排入口全部存在且格式合规
- inheritance 覆盖法定继承顺序份额/遗嘱继承效力与遗赠扶养顺位/遗产范围与债务限额清偿/代位与转继承及丧失继承权
- will-drafting 覆盖六种遗嘱形式（公证不再优先）/遗嘱能力与真实意思/必留份与处分范围/见证人资格与生效要件
- 中度把握锚点（遗产范围1122/法定继承1127/遗嘱形式1134-1139/必留份1141/遗赠扶养1158）标「建议复核」；继承编其他锚点（1128/1129/1130/1142/1143/1144/1140/1145/1125/1161/1160）标「建议复核」或把握不足降级描述规则待验证；司法解释条号与案例案号标 `[待验证]`，无臆造、无旧继承法条号回退
- 婚姻家事敏感护栏（继承人纠纷激化/涉刑/丧亲情绪/遗嘱能力存疑受胁迫强制升级）贯穿各子技能与编排入口
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('family-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/法务/当事人可单独触发任一继承权分析与遗嘱起草子能力（8 个子技能各自有 frontmatter + 触发名）
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 婚姻家事法律引用按 法条/司法解释 与 案例/学说 分类并标待验证；中度把握锚点明确呈现并标建议复核；司法解释条号保守标待验证；继承编一律用民法典新条号
- inheritance 与 will-drafting 编排入口各指向四个子技能且护栏无丢失（含丧亲情绪护栏、遗嘱能力核查强制升级）
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/08-family-legal/08-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
