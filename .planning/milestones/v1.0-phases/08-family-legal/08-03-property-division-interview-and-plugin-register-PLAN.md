---
phase: 08-family-legal
plan: 03
type: execute
wave: 2
depends_on:
  - 08-01
  - 08-02
files_modified:
  - family-legal/skills/property-division/community-property-identification/SKILL.md
  - family-legal/skills/property-division/special-asset-division/SKILL.md
  - family-legal/skills/property-division/division-principles-care/SKILL.md
  - family-legal/skills/property-division/concealed-asset-remedy/SKILL.md
  - family-legal/skills/property-division/SKILL.md
  - family-legal/skills/cold-start-interview/identity-party-profile/SKILL.md
  - family-legal/skills/cold-start-interview/review-representation-stance/SKILL.md
  - family-legal/skills/cold-start-interview/sensitivity-escalation/SKILL.md
  - family-legal/skills/cold-start-interview/style-local-rules/SKILL.md
  - family-legal/skills/cold-start-interview/SKILL.md
  - family-legal/.claude-plugin/plugin.json
autonomous: true
requirements:
  - PROPERTY-DIVISION-NEW
  - INTERVIEW-DECOMP
  - PLUGIN-REGISTER
user_setup: []

must_haves:
  truths:
    - "存在全新的 property-division（财产分割方案）主技能，律师/法务/当事人可单独触发任一子能力（共同财产认定 / 特殊财产分割 房产股权公司 / 分割原则与照顾 / 隐藏转移财产救济）或运行完整分割方案流程"
    - "property-division 覆盖夫妻共同财产认定第1062条/个人财产第1063条/约定财产制第1065条、房产·股权·公司·知识产权·投资等特殊财产分割、照顾子女女方无过错方原则第1087条与家务补偿第1088条·经济帮助第1090条·离婚损害赔偿第1091条、隐藏转移财产少分不分第1092条与离婚后再次分割，中度把握锚点标建议复核、司法解释规则描述规则条号待验证"
    - "律师/法务/当事人可以单独触发冷启动访谈的任一部分（身份与当事人画像 / 审查与代理立场 离婚一方某继承人遗嘱人中立 / 敏感度与升级 家暴未成年人情绪危机 / 文书风格与地方规定），访谈结果写入 family-legal/CLAUDE.md 对应章节（非独立 YAML）"
    - "每个 property-division 与访谈子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据/字段映射，深度子技能 150+ 行实质内容、访谈子技能含完整问卷与写入映射"
    - "plugin.json 注册全部技能（divorce-agreement/inheritance/will-drafting/property-division/cold-start-interview 五个编排入口 + 二十个子技能）并升级到 0.2.0，JSON 2 空格缩进合法"
  artifacts:
    - path: "family-legal/skills/property-division/community-property-identification/SKILL.md"
      provides: "共同财产认定子技能（共同财产第1062条/个人财产第1063条/约定财产制第1065条 + 婚前财产婚后增值 自然vs主动）"
      contains: "第1062条"
      min_lines: 150
    - path: "family-legal/skills/property-division/special-asset-division/SKILL.md"
      provides: "特殊财产分割子技能（房产 婚前购买父母出资按揭增值加名 + 股权与公司份额 + 知识产权收益 + 股票基金投资 + 养老金保险）"
      contains: "房产"
      min_lines: 150
    - path: "family-legal/skills/property-division/division-principles-care/SKILL.md"
      provides: "分割原则与照顾子技能（照顾子女女方无过错方第1087条 + 家务补偿第1088条 + 经济帮助第1090条 + 离婚损害赔偿第1091条）"
      contains: "无过错方\|照顾"
      min_lines: 150
    - path: "family-legal/skills/property-division/concealed-asset-remedy/SKILL.md"
      provides: "隐藏转移财产救济子技能（隐藏转移变卖毁损挥霍少分不分第1092条 + 离婚后发现再次分割 + 举证与财产保全）"
      contains: "隐藏\|转移\|第1092条"
      min_lines: 150
    - path: "family-legal/skills/property-division/SKILL.md"
      provides: "财产分割方案编排入口（指向四个子技能 + 入口级护栏含敏感情形与未成年人利益）"
      min_lines: 40
    - path: "family-legal/skills/cold-start-interview/identity-party-profile/SKILL.md"
      provides: "访谈子技能一：执业角色与当事人画像采集，填充 family-legal/CLAUDE.md 身份章节"
      contains: "执业角色\|当事人"
      min_lines: 80
    - path: "family-legal/skills/cold-start-interview/review-representation-stance/SKILL.md"
      provides: "访谈子技能二：审查与代理立场（离婚一方/某继承人/遗嘱人/中立 + 协议审查严格度 + 诉讼倾向），填充 family-legal/CLAUDE.md 立场章节"
      contains: "代理立场\|离婚一方"
      min_lines: 80
    - path: "family-legal/skills/cold-start-interview/sensitivity-escalation/SKILL.md"
      provides: "访谈子技能三：敏感度校准与升级矩阵（家暴/未成年人/情绪危机/涉刑强制升级），填充 family-legal/CLAUDE.md 敏感度与升级章节"
      contains: "敏感度\|家暴\|升级"
      min_lines: 80
    - path: "family-legal/skills/cold-start-interview/style-local-rules/SKILL.md"
      provides: "访谈子技能四：文书风格与法院民政公证资源及地方性规定，填充 family-legal/CLAUDE.md 文书风格与共享护栏章节"
      contains: "文书风格\|地方"
      min_lines: 80
    - path: "family-legal/skills/cold-start-interview/SKILL.md"
      provides: "冷启动访谈编排入口（顺序调用四个访谈子技能，初始化 family-legal/CLAUDE.md）"
      min_lines: 40
    - path: "family-legal/.claude-plugin/plugin.json"
      provides: "注册全部技能（5 编排入口 + 20 子技能）并升级到 0.2.0"
      contains: "0.2.0"
      min_lines: 20
  key_links:
    - from: "family-legal/skills/property-division/community-property-identification/SKILL.md"
      to: "family-legal/skills/_shared/family-law-citations.md"
      via: "引用共同财产/个人财产/约定财产制（民法典第1062/1063/1065条）"
      pattern: "family-law-citations|第1062条|约定财产制"
    - from: "family-legal/skills/property-division/division-principles-care/SKILL.md"
      to: "family-legal/skills/_shared/family-law-citations.md"
      via: "引用照顾原则与家务补偿损害赔偿（民法典第1087/1088/1091条）"
      pattern: "family-law-citations|第1088条|第1091条|无过错方"
    - from: "family-legal/skills/property-division/SKILL.md"
      to: "四个 property-division 子技能"
      via: "编排入口指向子技能路径"
      pattern: "community-property-identification|special-asset-division|division-principles-care|concealed-asset-remedy"
    - from: "family-legal/skills/cold-start-interview/SKILL.md"
      to: "四个访谈子技能"
      via: "编排入口顺序调用"
      pattern: "identity-party-profile|review-representation-stance|sensitivity-escalation|style-local-rules"
    - from: "family-legal/skills/cold-start-interview/sensitivity-escalation/SKILL.md"
      to: "family-legal/CLAUDE.md"
      via: "访谈写入敏感度校准与升级矩阵章节"
      pattern: "敏感度|家暴|未成年|强制升级"
    - from: "family-legal/.claude-plugin/plugin.json"
      to: "全部技能"
      via: "注册五个编排入口与二十个子技能"
      pattern: "property-division|community-property-identification|sensitivity-escalation|0.2.0"
---

<objective>
完成婚姻家事插件深化的最后一环：新增 property-division（财产分割方案）全新主技能、拆分冷启动访谈、并在 plugin.json 注册全部技能升级到 0.2.0。

本计划交付三块内容：
1. **新增 property-division（财产分割方案）主技能** — 按 CONTEXT「新增 1 个全新主技能」决策，创建四个可独立触发的子技能 + 编排入口：共同财产认定 / 特殊财产分割（房产·股权·公司·知识产权·投资）/ 分割原则与照顾（照顾子女女方无过错方·家务补偿·经济帮助·损害赔偿）/ 隐藏转移财产救济（少分不分·离婚后再次分割）。规则主要来自民法典婚姻家庭编与婚姻家庭编司法解释，中度把握锚点标「建议复核」、司法解释具体条号一律待验证、描述规则呈现。
2. **冷启动访谈拆分** — 将 cold-start-interview（现 ~14 行三部分访谈）拆为四个可独立触发的访谈子技能：身份与当事人画像（执业角色与当事人婚姻继承情况）/ 审查与代理立场（离婚一方/某继承人/遗嘱人/中立 + 协议审查严格度 + 诉讼倾向）/ 敏感度与升级（家暴/未成年人/情绪危机识别 + 风险等级 + 升级矩阵含强制升级）/ 文书风格与地方规定（文书风格 + 法院民政公证资源 + 地方性规定 彩礼·房产·抚养费）。访谈结果填充 08-01 新建的 family-legal/CLAUDE.md 对应章节（**非独立 YAML**，纠正旧表述），原 SKILL.md 改为编排入口顺序调用四个子技能。
3. **plugin.json 注册与版本升级** — 注册全部技能（五个编排入口：cold-start-interview / divorce-agreement / inheritance / will-drafting / property-division；二十个子技能：访谈 4 + 离婚协议 4 + 继承权分析 4 + 遗嘱起草 4 + 财产分割 4）并升级版本到 0.2.0，更新 description 概述五大模块。

Purpose: 关闭「ROADMAP 第四能力面 property-division 全新主技能缺失 + 访谈未拆分 + 全部技能未注册」的最后 gap，使 family-legal 达到与 commercial-legal / construction-legal 同等的完整深层子技能集水平。
Output: 4 个 property-division 子技能 + 1 个财产分割编排入口 + 4 个访谈子技能 + 1 个访谈编排入口 + 更新后的 plugin.json（0.2.0，25 个技能条目）。

依赖说明：本计划属 wave 2，依赖 08-01（_shared 引用脊柱、family-legal/CLAUDE.md、divorce-agreement 子技能路径）与 08-02（inheritance / will-drafting 子技能路径）。plugin.json 注册须包含 08-01 与 08-02 产出的全部技能路径，故须在两者完成后执行。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（民法典婚姻家庭编 为分析基础，婚姻家庭编司法解释(一)、妇女权益保障法 为补充）；指导性案例作参考非判例法（案号标待验证）；法院层级识别；行业监管特色（不动产登记机构=房产析产、市场监管=股权变更、公证机构=财产协议公证、司法鉴定=财产评估）；执业环境适配（婚姻家事律师 / 个人法务 / 当事人本人 / 非律师但有律师可咨询）。命名约定：技能名 kebab-case；斜杠命令 /family-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/司法解释 与 案例/学说 分类，带来源标签；婚姻家庭编司法解释具体条号一律标待验证、描述规则呈现；中度把握锚点（共同财产第1062条/个人财产第1063条/约定财产制第1065条/家务补偿第1088条/经济帮助第1090条/损害赔偿第1091条）标建议复核；分割照顾原则第1087条/隐藏转移少分不分第1092条标建议复核，把握不足降级描述规则待验证；房产婚后还贷增值分割、股权分割、彩礼返还规则描述规则不写裸条号；**严禁回退旧婚姻法条号，一律用民法典婚姻家庭编新条号**；司法解释条号与案例案号一律标待验证，不臆造、不回退旧法条号。**婚姻家事敏感护栏（情绪/未成年人利益最大化/家暴人身安全/强制升级）贯穿。**
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/phases/08-family-legal/08-CONTEXT.md
@CLAUDE.md
@family-legal/CLAUDE.md
@family-legal/skills/cold-start-interview/SKILL.md
@family-legal/.claude-plugin/plugin.json
@family-legal/skills/_shared/legal-basis-conventions.md
@family-legal/skills/_shared/family-law-citations.md
@family-legal/skills/_shared/practice-profile-schema.md
@family-legal/skills/divorce-agreement/SKILL.md
@family-legal/skills/inheritance/SKILL.md
@family-legal/skills/will-drafting/SKILL.md
@construction-legal/.claude-plugin/plugin.json
@data-compliance/.claude-plugin/plugin.json
@employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 新增 property-division（财产分割方案）四个可独立触发的子技能</name>
  <read_first>
    - family-legal/skills/_shared/legal-basis-conventions.md（08-01 产出 — 引用规范）
    - family-legal/skills/_shared/family-law-citations.md（08-01 产出 — 引用库，重点：共同财产第1062条/个人财产第1063条/约定财产制第1065条、分割照顾原则第1087条、家务补偿第1088条、经济帮助第1090条、损害赔偿第1091条、隐藏转移少分不分第1092条、共同债务与房产还贷增值司法解释规则）
    - family-legal/skills/_shared/practice-profile-schema.md（08-01 产出 — 配置读取契约，代理立场 离婚一方侧字段、敏感情形强制升级契约）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，子技能读取代理立场 主张方/被主张方、协议审查严格度、敏感度校准、风险校准）
    - family-legal/skills/divorce-agreement/property-division-clauses/SKILL.md（08-01 产出 — 与本技能分工：divorce-agreement 侧重协议条款拟定，property-division 侧重复杂特殊财产认定与分割方案，避免重复，互相提示）
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md（深层子技能质量基准）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深层子技能质量基准 — 风险分级范式）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    family-legal/skills/property-division/community-property-identification/SKILL.md,
    family-legal/skills/property-division/special-asset-division/SKILL.md,
    family-legal/skills/property-division/division-principles-care/SKILL.md,
    family-legal/skills/property-division/concealed-asset-remedy/SKILL.md
  </files>
  <action>
    创建全新主技能 property-division 的四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：community-property-identification / special-asset-division / division-principles-care / concealed-asset-remedy；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 family-legal/CLAUDE.md 配置含**代理立场 主张方/被主张方 + 敏感度校准 + 未成年人利益护栏** + 引用 _shared 规范/引用库/契约 + 与其他子技能及 divorce-agreement 分工说明 + 可单独触发说明）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格，含敏感情形如对方隐匿巨额财产/涉刑/家暴影响分割识别与强制升级）、`## 法律依据`（按 法条/司法解释 与 案例/学说 分类，引用 _shared/family-law-citations.md，标待验证，含案例/学说占位）。每个子技能在「前置」说明：可被 property-division 编排入口调用，也可由律师/法务/当事人单独触发（/family-legal:<name>），**并须按代理立场（主张方 vs 被主张方）调整分割主张侧重，涉子女利益不得损害，识别家暴敏感情形即强制升级**。**每个子技能须 150+ 行实质内容，深度对标 social-insurance-wages / penalty-assessment。**

    财产分割方案核心视角：property-division 面向**离婚财产分割的认定与方案设计**（区别于 divorce-agreement/property-division-clauses 侧重协议文本条款拟定，本技能侧重复杂财产的法律性质认定、估值与分割方案、救济路径）。规则主要来自民法典婚姻家庭编（共同财产/个人财产/约定财产制/分割原则）+ 婚姻家庭编司法解释（房产还贷增值/股权分割等 描述规则、条号待验证）。

    分工：
    - community-property-identification（共同财产认定）：**夫妻共同财产范围**（工资奖金、生产经营投资收益、知识产权收益、继承赠与所得除遗嘱赠与明确归一方外、其他应归共同所有=第1062条 建议复核）；**个人财产**（婚前财产、一方因人身损害获得的赔偿或补偿、遗嘱或赠与合同确定只归一方、一方专用生活用品、其他应归一方=第1063条 建议复核）；**约定财产制**（婚前婚后所得约定各自所有/共同所有/部分各自部分共同，须采书面形式，对内有效对外须第三人知道=第1065条 建议复核）；**婚前财产婚后增值**（自然增值仍属个人、主动经营增值可能转化或补偿——司法解释规则 描述规则不写裸条号）。深化：共同财产vs个人财产认定表（财产类型/取得时间/性质/归属）、约定财产制效力与对抗第三人表、婚前财产婚后增值判定表（自然增值vs主动增值）、共同财产认定核查清单。**按代理立场区分**：主张方扩大共同财产范围，被主张方主张个人财产剥离。引用第1062/1063/1065条（建议复核）、婚前房产婚后增值（司法解释，描述规则）。边界条件：父母赠与的认定、公积金与养老金、约定财产制对抗债权人。
    - special-asset-division（特殊财产分割）：**房产**（婚前一方购买、父母出资购买 全额或部分、婚后共同还贷及增值部分补偿、婚后加名、按揭房产分割与剩余贷款承担——婚姻家庭编司法解释规则 描述规则不写裸条号）；**股权与公司份额**（有限公司股权分割与其他股东同意/优先购买、公司控制权、未实缴出资）；**知识产权收益**（已实现收益属共同、尚未取得的预期收益处理）；**股票基金等投资性资产**（估值时点、变现与折价）；**养老金与保险**（婚姻关系存续期间养老金、人身保险现金价值）。深化：房产分割决策表（婚前购买/父母出资/婚后还贷增值/加名 各情形分割与补偿）、股权与公司份额分割路径表（折价补偿/股权分割与股东同意）、各类特殊资产估值与分割方法对照、特殊财产分割核查清单。**按代理立场区分**：主张方争取增值与收益分割，被主张方主张个人来源与合理折价。引用婚后还贷增值与股权分割（司法解释，描述规则不写裸条号）+ 共同财产=第1062条（建议复核）。边界条件：父母出资性质（赠与一方vs双方vs借款）、公司经营连续性、跨境资产 `[待验证]`。
    - division-principles-care（分割原则与照顾）：**分割原则**（协议优先，协议不成由法院判决，照顾子女、女方和无过错方权益的原则=第1087条 建议复核）；**家务劳动补偿**（一方因抚育子女照料老人协助另一方工作等负担较多义务的，离婚时有权请求补偿=第1088条 建议复核）；**经济帮助**（离婚时一方生活困难，有负担能力的另一方应给予适当帮助=第1090条 建议复核）；**离婚损害赔偿**（重婚、与他人同居、实施家暴、虐待遗弃家庭成员、其他重大过错导致离婚的，无过错方有权请求损害赔偿=第1091条 建议复核）。深化：分割照顾原则适用表（照顾子女/女方/无过错方情形）、家务劳动补偿请求与数额考量表、经济帮助适用条件表、离婚损害赔偿情形与举证表（含家暴举证）。**按代理立场区分**：无过错方/家务付出方/困难方主张照顾与赔偿，对方主张合理限度。**涉家暴损害赔偿时强制升级并优先人身安全。** 引用分割照顾=第1087条、家务补偿=第1088条、经济帮助=第1090条、损害赔偿=第1091条（建议复核）。边界条件：家暴举证难、过错与分割比例的关系、损害赔偿与刑事程序衔接。
    - concealed-asset-remedy（隐藏转移财产救济）：**少分或不分**（一方隐藏、转移、变卖、毁损、挥霍夫妻共同财产，或伪造夫妻共同债务企图侵占另一方财产的，离婚分割时可少分或不分=第1092条 建议复核）；**离婚后再次分割**（离婚后发现有上述行为的，可向法院请求再次分割夫妻共同财产 描述规则）；**举证与财产保全**（财产线索收集、调查令、诉讼保全与行为保全、银行流水与股权工商信息查询）；防止转移的预防措施。深化：隐藏转移财产情形与认定表、少分不分与再次分割救济路径表、财产线索收集与举证清单、诉前/诉中财产保全申请要点。**按代理立场区分**：受损方主张少分不分与再次分割并申请保全，被主张方主张正当处分抗辩。引用隐藏转移少分不分=第1092条（建议复核）、离婚后再次分割（司法解释，描述规则）。边界条件：正常生活消费与挥霍的界限、再次分割的诉讼时效 `[待验证]`、虚构债务的认定。
  </action>
  <verify>
    <automated>for d in community-property-identification special-asset-division division-principles-care concealed-asset-remedy; do f="family-legal/skills/property-division/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第1062条\|共同财产' family-legal/skills/property-division/community-property-identification/SKILL.md && grep -q '房产\|股权' family-legal/skills/property-division/special-asset-division/SKILL.md && grep -q '无过错方\|家务\|损害赔偿' family-legal/skills/property-division/division-principles-care/SKILL.md && grep -q '隐藏\|转移\|第1092条' family-legal/skills/property-division/concealed-asset-remedy/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个 property-division 子技能 SKILL.md 全部存在，路径为 family-legal/skills/property-division/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter（name/description/argument-hint）+ 标准章节（目的/前置含代理立场与敏感度与未成年人利益护栏/详细步骤/检查清单/输出模板/边界条件/错误处理/## 法律依据），每个 ≥100 非空行
    - community-property-identification 含共同财产第1062条/个人财产第1063条/约定财产制第1065条与婚后增值；special-asset-division 含房产婚后还贷增值与股权公司分割；division-principles-care 含照顾原则第1087条与家务补偿第1088条经济帮助第1090条损害赔偿第1091条；concealed-asset-remedy 含隐藏转移少分不分第1092条与再次分割及财产保全
    - 每个子技能体现按代理立场（主张方/被主张方）调整分割侧重，涉家暴损害赔偿强制升级、未成年人利益不受损
    - 法律依据按来源分类引用 _shared 库，中度把握锚点（1062/1063/1065/1087/1088/1090/1091/1092）标建议复核、司法解释规则（房产还贷增值/股权分割/再次分割）描述规则不写裸条号、具体条号标待验证、无旧婚姻法条号回退
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>新增 property-division 四个可独立触发的子技能并大幅深化（每个 150+ 行）；community-property-identification 共同财产认定、special-asset-division 房产股权公司特殊财产、division-principles-care 照顾原则与家务补偿损害赔偿、concealed-asset-remedy 隐藏转移救济与再次分割保全；各子技能按代理立场调整且贯穿家暴强制升级与未成年人利益护栏；法律依据分类引用 _shared 库，中度把握锚点标建议复核、司法解释规则描述规则、具体条号待验证、无旧法条号回退。</done>
</task>

<task type="auto">
  <name>Task 2: 创建 property-division 编排入口</name>
  <read_first>
    - 本计划 Task 1 产出的四个 property-division 子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - family-legal/skills/divorce-agreement/SKILL.md（08-01 产出的编排入口 — 风格参照，且与本技能分工提示）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，读取代理立场与敏感度）
  </read_first>
  <files>
    family-legal/skills/property-division/SKILL.md
  </files>
  <action>
    创建 family-legal/skills/property-division/SKILL.md 编排入口：frontmatter（name: property-division，description 说明它是财产分割方案编排入口，编排四个子技能，argument-hint「[财产清单/分割争议/隐匿财产线索]」）。正文：(1) 顶部说明：本技能为财产分割方案主技能，面向离婚财产的法律性质认定、估值与分割方案设计及救济（与 divorce-agreement/property-division-clauses 协议条款拟定分工，复杂特殊财产与救济在本技能）；(2) 目的与整体分割流程概览（共同财产认定 → 特殊财产分割 → 分割原则与照顾 → 隐藏转移财产救济）；(3) 前置：加载**代理立场**——读取 family-legal/CLAUDE.md，缺失或含占位符时显示标准提示（运行 /family-legal:cold-start-interview 或说「临时模式」），含临时模式段落（中立审查立场、律师角色、协议审查严格度保守、**敏感度默认最高 强制开启情绪护栏与未成年人利益最大化与家暴识别**、标 `[临时模式]`）；(4) 子技能编排顺序表——共同财产认定 / 特殊财产分割 / 分割原则与照顾 / 隐藏转移财产救济，每行说明该子技能做什么、对应子技能路径（skills/property-division/<name>/SKILL.md）、可单独触发的斜杠命令（/family-legal:<name>）+ 顺序说明；(5) 入口级护栏：财产构成与当事人画像确认（从 ## 我们是谁 读取）、**代理立场加载（主张方/被主张方/中立，强调立场决定分割主张侧重）**、协议审查严格度加载、**敏感情形识别（家暴影响分割/对方隐匿巨额财产/涉刑/未成年人重大利益即强制升级，优先人身安全）**、**当事人情绪护栏（中立克制非煽动）**、**未成年人利益最大化护栏（涉子女财产安排以最有利于未成年子女为首要原则）**、目的地/特权检查、提示与 divorce-agreement 协议条款及 inheritance 析产的衔接、财产保全与鉴定评估路径提示、地方性规定提示（房产分割口径/彩礼地区差异）。遵守文件格式约定。
  </action>
  <verify>
    <automated>f=family-legal/skills/property-division/SKILL.md; grep -q '^name: property-division' "$f" && grep -q 'community-property-identification' "$f" && grep -q 'special-asset-division' "$f" && grep -q 'division-principles-care' "$f" && grep -q 'concealed-asset-remedy' "$f" && grep -q '临时模式' "$f" && grep -q '代理立场\|主张方\|分割' "$f" && grep -q '未成年\|家暴\|敏感' "$f"</automated>
  </verify>
  <acceptance_criteria>
    - family-legal/skills/property-division/SKILL.md 存在，frontmatter name: property-division + description 编排说明
    - 正文含子技能编排顺序表，逐一指向四个子技能路径并说明可单独触发（/family-legal:<name>）
    - 含入口级护栏：财产构成与当事人画像确认、代理立场加载（主张方/被主张方/中立）、敏感情形识别与强制升级（家暴/隐匿巨额财产/涉刑/未成年人）、当事人情绪护栏、未成年人利益最大化护栏、目的地/特权检查、与 divorce-agreement 及 inheritance 衔接提示、财产保全与鉴定路径、地方性规定提示
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>property-division 编排入口存在，指向四个子技能，入口级护栏（代理立场、当事人画像与财产构成、敏感情形强制升级、当事人情绪护栏、未成年人利益最大化、特权检查、与离婚协议及继承衔接、财产保全路径、地方性规定）齐全。</done>
</task>

<task type="auto">
  <name>Task 3: 拆分 cold-start-interview 为四个访谈子技能 + 编排入口</name>
  <read_first>
    - family-legal/skills/cold-start-interview/SKILL.md（现有浅骨架 — 三部分访谈；末尾「生成 YAML 格式」须纠正为写入 family-legal/CLAUDE.md；改造对象）
    - family-legal/CLAUDE.md（08-01 产出 — 配置模板，访谈各子技能填充对应章节）
    - family-legal/skills/_shared/practice-profile-schema.md（08-01 产出 — 字段映射表与敏感情形强制升级契约，访谈按此填充）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式）
    - data-compliance/.claude-plugin/plugin.json（访谈子技能 description 写法参照 — identity-team/compliance-stance/risk-escalation/style 范式）
    - construction-legal/skills/cold-start-interview/SKILL.md（最近一次访谈拆分范式 — 若已存在）
    - CLAUDE.md（命名约定 kebab-case；文件格式；中国化原则）
  </read_first>
  <files>
    family-legal/skills/cold-start-interview/identity-party-profile/SKILL.md,
    family-legal/skills/cold-start-interview/review-representation-stance/SKILL.md,
    family-legal/skills/cold-start-interview/sensitivity-escalation/SKILL.md,
    family-legal/skills/cold-start-interview/style-local-rules/SKILL.md,
    family-legal/skills/cold-start-interview/SKILL.md
  </files>
  <action>
    将现有 cold-start-interview/SKILL.md 的三部分访谈拆分迁移并深化到四个可独立触发的访谈子技能，并改造原 SKILL.md 为编排入口。**关键纠正**：现有 SKILL.md 末尾「生成 婚姻家事 实践配置文件（YAML 格式）」表述须改为「填充 family-legal/CLAUDE.md 对应章节」（与 practice-profile-schema 架构决策一致，不另存独立 YAML）。

    四个访谈子技能（每个独立 SKILL.md，含 frontmatter name kebab-case + description + argument-hint；含章节：目的、前置（读取 practice-profile-schema 字段映射 + 说明填充 family-legal/CLAUDE.md 哪个章节 + 可单独触发）、访谈问题清单（结构化问卷，每个字段对应 CLAUDE.md 占位符）、写入映射（字段→CLAUDE.md 章节）、法律事实合理性检查（条号/期限/份额/数额口述时标待验证、旧法条号纠正为民法典新条号）、边界条件（用户跳过/不确定时的默认处理）。**每个访谈子技能须 80+ 行实质内容（含完整问卷与写入映射）。**）：
    - identity-party-profile（身份与当事人画像）：采集执业角色与当事人画像（组织/律所/当事人名称、实体类型、**执业角色** 律师/法务/当事人本人/非律师、**主要事项类型** 离婚协议或诉讼/财产分割/子女抚养/继承权分析/遗嘱起草/遗产纠纷、典型事项规模与财产构成 房产·股权·公司·跨境、主要痛点、团队规模、负责人）+ 谁在使用（角色、律师联系人）+ 可用集成（法院·民政·公证·鉴定资源）。写入 family-legal/CLAUDE.md 的 ## 我们是谁 / ## 谁在使用 / ## 可用集成。
    - review-representation-stance（审查与代理立场）：采集**整体代理立场**（离婚一方侧/某继承人侧/遗嘱人侧/中立审查）+ 协议审查严格度 + 诉讼倾向（协议或调解优先/诉讼优先/视情况）。写入 family-legal/CLAUDE.md 的 ## 审查与代理立场（含 ### 协议审查严格度 / ### 诉讼倾向）。**强调代理立场是婚姻家事工作核心变量，且未成年人利益与家暴护栏不可被立场覆盖。**
    - sensitivity-escalation（敏感度与升级）：采集**敏感度校准**（高度敏感情形识别偏好 家暴/虐待遗弃/未成年人利益/当事人情绪危机/涉刑）+ 风险等级定义 + 升级矩阵（角色权限/**自动强制升级触发** 家暴人身安全/未成年人重大利益/涉刑/重大财产隐匿转移/协议离婚生效前/遗嘱定稿前）。写入 family-legal/CLAUDE.md 的 ## 敏感度校准 / ## 风险校准 / ## 升级矩阵。**本访谈子技能特别强调婚姻家事敏感护栏的固化（情绪/未成年人/家暴/强制升级）。**
    - style-local-rules（文书风格与地方规定）：采集文书风格（离婚协议/继承分析/遗嘱文本/财产分割方案/律师函风格 + 工作产物存放位置）+ 法院民政公证鉴定资源再确认 + **地方性规定**（彩礼返还/房产分割口径/抚养费标准/裁判尺度地区差异）。写入 family-legal/CLAUDE.md 的 ## 文书风格 / ## 输出 / ## 共享护栏（地方性规定提示）。

    编排入口 family-legal/skills/cold-start-interview/SKILL.md：保留 frontmatter（name: cold-start-interview，更新 description 说明它顺序调用四个访谈子技能初始化 family-legal/CLAUDE.md）。正文：(1) 顶部迁移说明 + **纠正旧 YAML 表述为填充 family-legal/CLAUDE.md**；(2) 目的（初始化/更新婚姻家事实践配置档案）；(3) 子技能顺序表——身份与当事人画像 → 审查与代理立场 → 敏感度与升级 → 文书风格与地方规定，每行说明、子技能路径、单独触发斜杠命令（/family-legal:<name>，支持单独更新某一部分）；(4) 说明访谈结果写入 family-legal/CLAUDE.md（散文模板，非 YAML），支持完整重跑/单独更新/直接编辑/git 版本控制；**(5) 婚姻家事敏感性说明：访谈过程对当事人情绪保持中立克制，敏感度与强制升级配置不可省略。** 遵守文件格式约定。
  </action>
  <verify>
    <automated>for d in identity-party-profile review-representation-stance sensitivity-escalation style-local-rules; do f="family-legal/skills/cold-start-interview/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q 'family-legal/CLAUDE.md' "$f" || { echo "NO CLAUDE.md TARGET $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 60 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; e=family-legal/skills/cold-start-interview/SKILL.md; grep -q '^name: cold-start-interview' "$e" && grep -q 'identity-party-profile' "$e" && grep -q 'review-representation-stance' "$e" && grep -q 'sensitivity-escalation' "$e" && grep -q 'style-local-rules' "$e" && grep -q 'family-legal/CLAUDE.md' "$e" && ! grep -q 'YAML 格式' "$e"</automated>
  </verify>
  <acceptance_criteria>
    - 四个访谈子技能 SKILL.md 全部存在，路径为 family-legal/skills/cold-start-interview/<kebab-name>/SKILL.md，各含 frontmatter + 结构化问卷 + 写入 family-legal/CLAUDE.md 章节映射，各 ≥60 非空行
    - identity-party-profile 采集执业角色与当事人画像及事项类型；review-representation-stance 采集代理立场（离婚一方/某继承人/遗嘱人/中立）与协议审查严格度及诉讼倾向；sensitivity-escalation 采集敏感度校准与风险等级与升级矩阵含强制升级（家暴/未成年人/涉刑）；style-local-rules 采集文书风格与法院民政公证资源与地方性规定
    - 每个访谈子技能明确写入 family-legal/CLAUDE.md 对应章节（非独立 YAML）；含法律事实合理性检查（旧法条号纠正/司法解释条号待验证）
    - cold-start-interview/SKILL.md 改造为编排入口，顺序调用四个子技能，**旧「YAML 格式」表述已纠正为填充 family-legal/CLAUDE.md**，含婚姻家事敏感性说明
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>cold-start-interview 拆为四个可独立触发的访谈子技能（身份与当事人画像/审查与代理立场/敏感度与升级/文书风格与地方规定），均填充 family-legal/CLAUDE.md 对应章节；原 SKILL.md 改为编排入口顺序调用，旧 YAML 表述已纠正为写入 family-legal/CLAUDE.md，并保留婚姻家事敏感护栏固化。</done>
</task>

<task type="auto">
  <name>Task 4: plugin.json 注册全部技能并升级到 0.2.0</name>
  <read_first>
    - family-legal/.claude-plugin/plugin.json（现有 — 4 个扁平技能注册，version 0.1.0；改造对象）
    - construction-legal/.claude-plugin/plugin.json（最近一次注册范式 — 编排入口 + 子技能扁平注册、每条 name/path/description、description 概述模块写法、version 0.2.0）
    - data-compliance/.claude-plugin/plugin.json（注册范式参照）
    - 08-01/08-02/本计划产出的全部 SKILL.md 路径（确认注册路径与 name 一致）
    - CLAUDE.md（文件格式：JSON 2 空格缩进、命名约定 kebab-case、文件以换行符结尾）
  </read_first>
  <files>
    family-legal/.claude-plugin/plugin.json
  </files>
  <action>
    更新 family-legal/.claude-plugin/plugin.json：以 construction-legal/.claude-plugin/plugin.json 为注册范式（编排入口与子技能均扁平列入 skills 数组，每条含 name/path/description）。
    - version 升级到 "0.2.0"。
    - description 更新为概述五大模块：冷启动访谈（身份当事人画像/审查代理立场/敏感度升级/文书地方规定）、离婚协议起草（财产分割条款/子女抚养与探望/债务处理/协议生效与登记）、继承权分析（法定继承顺序/遗嘱继承效力/遗产范围与债务/代位与转继承）、遗嘱起草（遗嘱形式选择/遗嘱能力与意思表示/遗嘱内容与必留份/见证与生效）、财产分割方案（共同财产认定/特殊财产分割/分割原则与照顾/隐藏转移财产救济），五大模块二十个子技能加五个编排入口，强调婚姻家事敏感护栏（未成年人利益最大化/家暴人身安全/律师审查）。
    - skills 数组注册全部 25 条（顺序：五个编排入口在前或按模块分组均可，须全部包含），每条 name 与 SKILL.md frontmatter name 一致、path 与文件实际路径一致：
      - 编排入口 5：cold-start-interview / divorce-agreement / inheritance / will-drafting / property-division（path = skills/<主技能>/SKILL.md）
      - 访谈子技能 4：identity-party-profile / review-representation-stance / sensitivity-escalation / style-local-rules（path = skills/cold-start-interview/<name>/SKILL.md）
      - 离婚协议子技能 4：property-division-clauses / child-custody-visitation / debt-handling / effectiveness-registration（path = skills/divorce-agreement/<name>/SKILL.md）
      - 继承权分析子技能 4：legal-succession-order / testate-succession-validity / estate-scope-debt / subrogation-transmission（path = skills/inheritance/<name>/SKILL.md）
      - 遗嘱起草子技能 4：will-form-selection / testamentary-capacity-intent / content-reserved-share / witnessing-effectiveness（path = skills/will-drafting/<name>/SKILL.md）
      - 财产分割子技能 4：community-property-identification / special-asset-division / division-principles-care / concealed-asset-remedy（path = skills/property-division/<name>/SKILL.md）
    - 保留 author 字段。
    - **严格 JSON 2 空格缩进、文件以换行符结尾、无尾部空格。**
    完成后运行 JSON 合法性检查确认无语法错误。
  </action>
  <verify>
    <automated>f=family-legal/.claude-plugin/plugin.json; python3 -c "import json; d=json.load(open('$f')); assert d['version']=='0.2.0', 'version not 0.2.0'; names={s['name'] for s in d['skills']}; req={'cold-start-interview','divorce-agreement','inheritance','will-drafting','property-division','identity-party-profile','review-representation-stance','sensitivity-escalation','style-local-rules','property-division-clauses','child-custody-visitation','debt-handling','effectiveness-registration','legal-succession-order','testate-succession-validity','estate-scope-debt','subrogation-transmission','will-form-selection','testamentary-capacity-intent','content-reserved-share','witnessing-effectiveness','community-property-identification','special-asset-division','division-principles-care','concealed-asset-remedy'}; missing=req-names; assert not missing, f'missing skills: {missing}'; n=len(d['skills']); assert n>=25, f'expected >=25 skills, got {n}'; print('OK', n, 'skills, version', d['version'])"; for p in $(python3 -c "import json; [print(s['path']) for s in json.load(open('$f'))['skills']]"); do test -f "family-legal/$p" || { echo "MISSING PATH family-legal/$p"; exit 1; }; done; echo "ALL PATHS EXIST"</automated>
  </verify>
  <acceptance_criteria>
    - family-legal/.claude-plugin/plugin.json version 为 0.2.0
    - skills 数组含全部 25 条（5 编排入口 + 20 子技能），每条 name 与对应 SKILL.md frontmatter name 一致、path 与实际文件路径一致且文件存在
    - description 概述五大模块（访谈/离婚协议/继承权分析/遗嘱起草/财产分割），体现婚姻家事敏感护栏
    - JSON 语法合法（python3 json.load 通过），2 空格缩进、文件以换行符结尾、无尾部空格
  </acceptance_criteria>
  <done>plugin.json 注册全部 25 个技能（5 编排入口 + 20 子技能）并升级到 0.2.0，description 概述五大模块，全部 path 指向存在的 SKILL.md，JSON 合法 2 空格缩进。</done>
</task>

</tasks>

<verification>
- 四个 property-division 子技能 + 一个财产分割编排入口 + 四个访谈子技能 + 一个访谈编排入口 + 更新后的 plugin.json 全部存在且格式合规
- property-division 覆盖共同财产认定（1062/1063/1065）/特殊财产房产股权公司分割/分割照顾原则（1087/1088/1090/1091）/隐藏转移救济（1092）与再次分割保全，规则来自婚姻家庭编与司法解释描述规则、条号待验证
- cold-start-interview 拆为四个访谈子技能，均填充 family-legal/CLAUDE.md（非 YAML），旧 YAML 表述已纠正，敏感护栏固化
- plugin.json 注册全部 25 技能、升级 0.2.0、全部 path 存在、JSON 合法
- 法律依据按来源分类、中度把握锚点（1062/1063/1065/1087/1088/1090/1091/1092）标建议复核、规则类描述规则、司法解释条号与案例案号标待验证，无臆造、无旧婚姻法条号回退
- 婚姻家事敏感护栏（情绪/未成年人利益最大化/家暴人身安全/强制升级）贯穿子技能与编排入口
- JSON 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('family-legal/**/*.json', recursive=True)]"`
</verification>

<success_criteria>
- 婚姻家事插件达到完整深层子技能集：5 个主技能（4 深化 + 1 新增 property-division）各拆为 4 个可独立触发子技能，共 20 子技能 + 5 编排入口
- property-division 财产分割方案能力完整（共同财产认定/特殊财产分割/分割原则与照顾/隐藏转移救济），可单点或整流程调用
- 冷启动访谈拆分并写入 family-legal/CLAUDE.md（非 YAML），支持单独更新各部分，敏感护栏固化
- plugin.json 注册全部技能升级 0.2.0，JSON 合法
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定，婚姻家事敏感护栏贯穿
</success_criteria>

<output>
Create `.planning/phases/08-family-legal/08-03-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
