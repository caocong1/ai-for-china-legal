# Changelog

本文件记录 AI for China Legal 的主要变更。仓库版本、文档里程碑和墨律生产 skill 包版本可能不是同一个编号：

- 仓库代码/文档里程碑使用 `v1.x`，`package.json` 与之同步（当前 `1.6.0`）。
- 墨律生产 skill 包建议使用 `YYYY.MM.DD.N`，例如 `2026.06.15.1`。

## [v1.6.0] - 2026-11-02

按案例库 LWC-2026-0010 迭代：律师把一份外包用工合规调查报告改定后发回，本版把定稿与原稿逐段比对的结果落到规则里。

**比对结果。** 律师以模型成稿为底稿定稿：章节结构全部保留，36 条脚注原样保留，751 段未改；改写 120 段、删除 21 段，整节删去三个附件（待补充资料清单、凭证核对明细、统计表），正文删去约 4,700 字、新增约 600 字。删改集中在：问题清单的答复覆盖率与各单位答复不一致之处、逐项调查局限、风险评级与整改期限、确定性的裁判预测、指令性措辞、对委托人自身制度的批评、同一事实的重复叙述。依据与事实没有更正。

**怎么学。** 律师定稿是一位律师在一个事项中的判断，可能受客户关系等现实因素影响，不是标准答案。删改分三类处理：通用的成稿规范照做；合理但可以有别的做法的取舍记为偏好，进实践配置或作为《成稿说明》中的选项，不改默认；照做会降低质量或掩盖风险的不学，例如删去影响认定的答复与证据不一致、弱化高风险结论。偏好须有第二个事项印证才改默认。

### Added

- `employment-legal/skills/_shared/outsourcing-compliance-playbook.md`：发包方外包用工合规调查作业手册。内容有：「现状评析 + 操作指引」报告骨架（律师框架，定稿采用）；三层证据（合同条款、履行证据、各单位书面答复）与凭证勾稽；高信号识别（发包方编制逐人结算表、服务费与工资基本相等、原员工转外包、消控室单人值守、超龄用工、敏感个人信息）；按三类处理的客户成稿取舍；核验过的保安、消控、农民工工资、税务依据，以及首稿曾引用、检索不到出处的五项「不得引用」；操作指引八个模块。
- `shared/feedback-refinement/scripts/docx_blocks.py`、`final_diff.py`：律师定稿比对脚本，只用标准库。按标题路径分节对齐、逐段给出字符级差异；脚注按引用顺序比较，因为 WPS 回存会重排脚注 id。
- 实践配置新增「客户报告成稿偏好」字段（`employment-legal/CLAUDE.md`、`practice-profile-schema.md`），冷启动访谈 `style-local-rules` 增加 Q3b：风险等级与整改优先级、待补充资料附件、调查方法与局限、用语。

### Changed

- `document-delivery-qa.md` 新增 5.4「律师定稿反馈的取舍：照做、偏好、不学」。A 类照做：标题写全交付物、去内部称谓、概率语气（高风险不淡化）、建议而非指令且不自设期限、同一事实只写一处、不推测定性、人名最小化、无依据的数字写成示例、守住委托范围。B 类偏好：风险等级、附件取舍、调查方法与局限、答复覆盖率、评析点名、用语，按实践配置，未配置的在《成稿说明》第四节写明另一种做法。C 类不学：影响认定的答复与证据不一致、框架要求的内容、委托人制度的实质缺口、高风险结论照写。5.1、5.2 相应补充。
- `workforce-compliance-dd` 入口与 `dd-report-assembly`：intake 增加「报告类型」「交付模式」两个必答项，客户成稿偏好读实践配置；工作稿与客户成稿分开写附录、风险等级、日期占位与目录域规则（修正了「目录域设 updateFields」「成稿恒标律师复核稿」与客户成稿模式的冲突）；发包方外包调查按作业手册装配。
- `dispatch-vs-outsourcing-checklist.md`：新增结算编制、服务费与工资、人员来源三项要素；各单位书面答复作为履行证据；保安服务差额征税不作派遣证据（财税〔2016〕68号第四条，首稿曾据此误判）。
- `labor-law-citations.md`：法释〔2025〕12号第21条（废止解释（一）第32条第1款）逐字核实；《劳务派遣暂行规定》第4条、第27条条号核实；新增《保障农民工工资支付条例》第18条与第19条第1款原文、指导性案例237号、财税〔2016〕68号第四条、《安全生产法》第49条、人社部发〔2016〕29号第2条；H 节增「未能核实、不得引用」。
- `due-diligence-playbook.md` 第 5、6 节：客户成稿模式下问题清单是否作附件、调查局限是否逐项写，属律师偏好；影响认定的不一致仍在正文写明。
- `feedback-refinement` 新增第 0.1 节「律师定稿比对」，含三类处理与判断线索。
- 说明站：`workforce-compliance-dd`、`cold-start-interview`、`feedback-refinement` 三页的摘要数据随之更新并重新生成。

## [v1.5.0] - 2026-11-01

给律师看的 skill 说明站（`docs/`）。律师不读 SKILL.md 原文，也能知道每个 skill 做什么、怎么做到、分几步、内置了哪些法律判断，并对这些判断逐条提意见。

### Added

- `docs/`：静态站点。首页（一个事项怎么走、十三个领域、怎么读、怎么提意见）、`docs/skills/`（全部 skill 索引，可过滤）、`docs/feedback/`（怎么提意见）、每个插件一页、每个顶层 skill 一页（概要、适用与边界、输入与产出、开始前、执行步骤、主要法律依据、引用的共享规则、交付前检查、何时暂停或升级、请律师重点核对、示例提示词、源文件）。共享流程（总路由、动态 intake、研究闸门、反馈精炼）同样成页。
- `docs/data/skills/parts/*.json`：每个 skill 的律师版摘要数据，由通读 SKILL.md 的子代理按 `docs/data/skills/schema.json` 产出；每个子技能对应一个步骤，带做法、内置规则、法律依据、产出和「请律师核对」；每个 skill 另有 5–12 条审阅条目。
- `scripts/build-docs-site.py`：从数据生成全站（Python 标准库）；`scripts/validate-skill-digest.py`：数据结构校验。
- 页面上的每条核对与审阅条目可一键复制成带 skill 标识、步骤号和条目号的引用，便于粘到微信或 GitHub issue。
- 审阅条目下按文字重合自动列出相关的步骤批注（提示，可能不全）；步骤标签附源文件自己的编号（「步骤 6 · 原文第四步」）；路径、命令和英文标识等宽显示，首页「标记与术语」解释英文标记。
- 设计按 design-skill-lab 的 design-studio 流程做，经两轮新上下文评审（`.design/critique/2026-11-01-site/`）：第一轮的 320 宽重排问题（P1）已修复，第二轮结论仍为 fix，此后的修正未再送评，残留项见 `report-r2.md`。全站 90 页在 320 与 390 宽下无横向滚动，内部链接与锚点全部可达。
- `.design/`：站点的设计真相文件（PRODUCT、brief、surface 契约、decisions、DESIGN.md、评审报告），按 design-skill-lab 的 design-studio 流程产出；`.design/shots/` 不入库。

### 维护约定

- 改了 SKILL.md 后，相应更新 `docs/data/skills/parts/` 里的摘要，再运行 `python3 scripts/build-docs-site.py`。
- 说明与源文件不一致时，以源文件为准。摘要时发现的源文件内部不一致（入口与子技能的命令名、访谈时长、阈值刻度前后不一等）已写进各页「请律师重点核对」，待逐项核对后回改 SKILL.md。

## [v1.4.0] - 2026-11-01

两件事：一是开场提问机制改造，二是落地案例库 LWC-2026-0008、0009 的「Skill 改进映射」，并修正此后同类事项独立复核发现的语料库错误。

**为什么改提问机制。** 用户反映十多次任务中模型从未反问。核查 2026-10-14 至 11-01 在 Claude Code 中执行的 11 项法律任务的会话记录，结论如下：

- 没有一次提问；`INTAKE_DECISION` 从未出现在回复中，判断只在模型的思考里完成；
- 模型其实识别出了问题，例如租金基数的两种读法、原仲裁是否已出裁决、两份模板冲突，但都选择写进《成稿说明》，交付时再请律师确认；
- 原因：
  - 旧规则把「提问」等同于「阻断」，只有阻断项才能问，v1.3.0 又收窄了阻断范围；
  - 《成稿说明》让延后处理没有成本；
  - 语料仓未安装为 Claude Code skill，intake 常在读完材料、准备起草时才被读到，有两次在起草开始之后；
  - 示例与 LWC-2026-0007 的成功经验都在示范「不问」；
- 案例记录 LWC-2026-0006、0008 曾把只出现在思考中的判断记成「已输出」，其中 0006 的说法来自上下文压缩时生成的摘要。

### Added

- `shared/legal-document-intake/references/questionnaire-mode.md`：问卷文档模式。全部问题一次写成一份 Word，操作员发给律师填写，或由律师在微信按编号回复，再粘贴回会话按题号合并。包括文档结构、写法、pandoc 转换要点（每项单独成段、全角题号）、给律师的转发语、合并表与追问规则，以及一份脱敏示例。
- `scripts/setup-claude-skills.sh`：把总路由与动态 intake 链接到 `~/.claude/skills/`，Claude Code 在任务开始时即可加载。README、INSTALL 增加 Claude Code 安装说明。
- intake 示例 9—12（来自 2026-10 的实际任务，都是「该问而没问」）：
  - 9：变更型补充协议，律师给的数字与原合同对不上；
  - 10：拟提交法院的答辩状，举证期限与是否反诉未定；
  - 11：整份仲裁方案取决于原仲裁是否已出裁决；
  - 12：律师与操作员各给了一份模板。
- `question-routing.md` 第 0 节「问题来源与典型问题」。
- 研究闸门「第零步」：检索或派出检索代理前，先确认 intake 已输出并已提问。
- `source-policy.md`：
  - 第 7 项：律师或客户提供的底稿，其中的依据同样逐条核验（LWC-2026-0009 的律师稿里有 3 处依据查无出处）；
  - 第 8 项：笔录与扫描件中的手写更正，OCR 识别不到，须回原页图像核对。
  - `quality-gates.md` 增加对应检查项。
- `authoritative-sources.md` 第 11 节：flk 批量下载触发人机验证、裁判文书网需登录（镜像只作线索）、企业信用公示系统需验证码、「某中院司法指引」类转载。
- `document-delivery-qa.md`：
  - 第 2 节新增「以律师自改稿或返回稿为底稿」和「扫描件模板」；
  - 第 4 节新增版式稳定性：固定行距、`gridCol`、中文宽表 3 列、`officecli` 告警与模板哈希比对、校验换文件名；
  - 《成稿说明》第一节写明开工前问过的问题及答复如何落实。
- `document-structures.md`：政府主导项目的措辞（「建议贵司与政府进一步确认，并将取得批准文件作为实施前提」，同时保留中性的法律定位）；律师改过的上一轮成果按其体例续写。
- `operator-orchestration.md`：复核的实际耗时与失败方式（启动即失败直接重试或换模型；同一复核者续审第二轮约 10 分钟；改版重发可做范围复核）。
- commercial-legal：
  - `contract-drafting/framework-design` §1E「补充协议（合同变更）框架」：原合同条款交叉审计表（被修改 / 被援引 / 可能被对方援引）、基数确认、存续条款、付款作为生效条件与骨架；
  - `requirements-intake` 步骤 3「数字对账」：读法不一致时量化差额，并按 intake 提问；
  - `clause-drafting` §2H：约定解除、违约显著轻微、优惠回吐写成补缴租金而非违约金、回吐款滞纳金费率、条件式改期；
  - `civil-code-contract-citations.md`：租赁、解除、违约金、附条件等条文，另增 1.3 映射表；
  - `transaction-procedure-citations.md`：
    - 39 号文；
    - 中央企业权益类交易的指定场所（333 号、137 号）；
    - 32 号令第四条参股口径；
    - 第八节「资产出租与租金减免」；
    - 第九节「国有企业子公司解散清算与注销」；
    - 12 号令第七条、2024 年 8 号文二（一）3、6 等锚点。
- litigation-legal：
  - `defense-drafting` 入口「Intake 前置」；
  - `defense-strategy` §3.5「多被告与家庭成员利益一致性检查」，逐个论点量化「采纳该前提我方所得」；
  - `defense-assembly` 4.5「事实句对证据」自检。
- family-legal：
  - `estate-scope-debt`「征收安置利益」专题：被征收人、在册人口与非在册人口的区分；确认单是析产、赠与还是格式文件；剩余款按构成拆分；同一项目判决优先；先出安置利益构成表；
  - `legal-succession-order` 继子女扶养关系的认定，依据婚姻家庭编解释（二）第十八、十九条与典型案例；
  - `family-law-citations.md` 新增 H 节「常见错引对照表」。
- `search-playbooks.md`「征收安置析产与继承 Playbook」。

### Changed

- **`legal-document-intake` 重写提问部分。** 核心是把「问」与「停」分开：
  - 候选问题按七个来源逐项找：指令读法、底稿版本、只有律师或客户知道的状态、整体前提、客户取舍、受众与交付、材料缺口；
  - 问题分四档：必须确认、建议确认、可按默认、材料请求，并配有「《成稿说明》测试」；
  - `intake_status` 增加 `ask`：没有必须确认项、但有会改变正文的问题时，起草前提问；可以等答复，也可以在操作员要求或截止紧迫时按推荐答案先写；
  - 两种提问方式：直接问（Claude Code `AskUserQuestion`，墨律 `ask_user`）与问卷文档；操作员未指定时用一道单选题让其选择；
  - 答复合并时输出合并表；
  - `INTAKE_DECISION` 增加 `questions` 与 `ask_mode` 字段，并规定必须写在回复里，只在思考中判断不算输出；
  - 用两件旧任务的原始提示词做了前向测试：新上下文的模型只跑 intake。仲裁案中，模型在读到示例前就独立列出了同一必须确认题；租赁案的示例已含答案，只验证了流程与问卷渲染。据测试结果补了以下规则：
    - 对我方有利、答案可预见的起草选择归「可按默认」，避免问多；
    - 对方当前履约状态（是否已逾期）列入问题来源，避免问少；
    - 推荐不是默认，必须确认题未答复不按推荐处理；
    - 选择题在有必须确认项时不提供「不问」；
    - 材料里说法相反时不算已有答案；
    - 材料请求先对账，通常不超过 5 项；
    - 能从指令推出的事项写进「我们对材料的理解」，不作为题目；
    - `ask_mode: pending`；
    - 文本清单与问卷结构一致。
- `ai-for-china-legal-workflow`：
  - intake 步骤对应上述改动；
  - 「条件性继续回答的是要不要停，不是要不要问」；
  - 恢复规则支持问卷答复；
  - 说明经符号链接安装时的路径解析。
- 语料仓 `CLAUDE.md` 顶部增加「用本库处理具体法律事项时（先读）」。模型被要求使用本库时最先读到这里。
- `ASK-USER-PROTOCOL.md`：`AskUserQuestion` 的对应规则（每次 1—4 题、推荐项在前、题干自足）与问卷模式指引。
- `operator-quickstart.md`：启动提示词增加「提问方式」；增加问卷转发与答复粘贴的提示词。
- `feedback-refinement`：案例记录的 intake 审计以会话转录为准，并记录题量、答复率与答复是否改变成果。
- 引用编号更正：
  - 法发〔2026〕10 号原文按「（一）」至「（二十四）」分项，8 处「第 19 条」改为「第（十九）项」；data-compliance 同表的（六）（七）（十二）一并改正；
  - 《民法典》第 506 条为第（一）（二）项，不是第 1、2 款，`clause-drafting` 与 `carveout-review` 中已改正。

### Fixed

- construction-legal（此前同类事项的四轮独立复核发现，2026-11-01 对照官方原文核实）：
  - 土壤污染状况调查：《土壤污染防治法》已由《生态环境法典》第 1242 条废止（法典 2026-08-15 施行），改引法典第 454 条第 2、3 款；
  - 《划拨用地目录》2025 年修订（自然资源部令第 16 号）；
  - 不同主体之间的房屋承继应办转移登记，不是「更名」；
  - 契税以全部补缴价款计，纳税义务发生于改变土地使用条件当日，不随出让价款分期；
  - 划转视为转让、房地一并转移、受让方不再是原土地使用权人时，丧失补办申请资格；
  - 增值税简易计税过渡政策的三个条件；
  - 免评估的范围；
  - 合资公司两种设立方式的比较；
  - 闲置土地的期限后果。
- `land-contribution-jv` 与 `transaction-procedure-citations.md` 都把「预披露加正式披露合计不少于 40 个工作日」写成产权转让口径，实为增资规则（操作规则第 51 条；39 号文第六项）。
- litigation-legal：
  - 简易程序举证期限应为「不得超过十五日」；
  - 普通程序举证期限「不得少于十五日」出自民诉法解释第九十九条，不是民诉法；
  - 答辩期为民诉法第一百二十八条；
  - 反诉时机以我方举证通知书为准，外限为法庭辩论结束前（民诉法解释第二百三十二、二百三十三条）。
- family-legal：《民法典》第 1122 条第二款、第 1161 条引文措辞与原文不一致，已改正。
- 插件版本：commercial-legal 0.5.0、litigation-legal 0.3.3、family-legal 0.2.2、construction-legal 0.3.1、employment-legal 0.4.2、data-compliance 0.2.2；`package.json` 1.4.0。

## [v1.3.0] - 2026-10-22

案例驱动迭代：落地案例库 LWC-2026-0007 的「Skill 改进映射」。该案是律所致客户的咨询型法律备忘录（存量划拨土地变性 + 与房地产开发企业设立项目公司），在律所既有模板内成稿，另附给承办律师的成稿说明，律师评价「很满意」。本版本把这次的交付方式与判断顺序固化下来，不固化该案结论。

### Added

- `construction-legal/skills/land-use-redevelopment/`：存量土地变性与合作开发工作流，包括编排入口和三个子技能：
  - `land-use-change-path`：规划前提；供地方式三层判断（国家一般规则 / 国家保留通道 / 地方通道及其前提）；附条件结论与签约前提；替代路径（政府收回、协商收储）；
  - `land-premium-contract`：「双评估」价差与地方计收档位；复算与现金口径；分期与利息；全款后登记；示范文本 GF-2025-2601；房地一致；资金来源；
  - `land-contribution-jv`：作价出资即转让与 25% 条件；预告登记、项目公司受让、合作开发合同的路径比较；资质不可承继；国资参股；税负提示。
- `construction-legal/skills/_shared/land-law-citations.md`：全国性锚点，2026-10-22 按官方原文核验，逐条区分「已核实」与「代理核对」；附常见错引对照表。
- `construction-legal/skills/_shared/local-rules-chengdu.md`：地方规则样板，包括城市更新条例、低效用地再开发意见（按日期分档计收，30% 档已于 2026-04-30 届满）、转让管理办法（预告登记、先投入后转让）、已失效文件清单。
- `commercial-legal/skills/_shared/transaction-procedure-citations.md`：
  - 新增第八节「中央企业投资监管与参股管理」，覆盖 34 号令、国资发改革规〔2023〕41 号（126 号已废止）、46 号令、2010 年主业沿革、检索不到的国资文件的处理；
  - 第三节 32 号令、12 号令的条号核验升级；增资 40 个工作日与产权转让披露口径分开。
- `shared/references/document-structures.md`：新增「法律备忘录（致客户，咨询型）」骨架与写法：委托说明、材料简称、确认与保证、基本事实来源句、小节标题即结论、小结、结语、落款、附件、逐字脚注与「同前注」。
- `shared/research-gate/references/search-playbooks.md`：新增「存量土地变性 / 城市更新 / 土地合作开发 Playbook」。
- `shared/research-gate/references/source-policy.md`：新增「客户材料中的依据、地方文件时效与反向条款」：客户援引的依据逐条判定；检索不到的文件不据此分析；地方文件先查有效期；有利依据同摘反向条款。`quality-gates.md` 增加对应检查项。
- `shared/research-gate/references/authoritative-sources.md`：新增第 10 节，记录自然资源、国资、金融与地方政府源的实测情况（自然资源部站点不可连、成都市政府系网站返回 412、国资委未公开文件用转载本）、转载本规则；flk 收录地方性法规。
- `shared/legal-document-intake/references/intake-examples.md`：示例 8，给客户的咨询型备忘录（旧稿作模板，政府设定时限），决策为 ready / conditional / critical。

### Changed

- **客户成稿模式**：
  - `document-delivery-qa.md`：通用前提由「最终成果恒标待执业律师复核」改为按交付模式放置人审标记——律师拟原样转发客户的成稿，正文不放内部标记，人审要求由《成稿说明》、`REVIEW_STATUS` 与宿主人审标识承担；
  - 第 5 节改为「客户成稿模式与《成稿说明》」，给出九节结构；
  - 第 2—4 节补充：以旧稿作模板、直接格式模板、每个引用一个脚注与「同前注」、核心属性重置、模板残留检索、客户成稿不设 `updateFields`、pandoc reference-doc 的 `tblInd` 顺序、中文字体映射渲染。
- **条件性继续的边界**（workflow「条件性继续」、intake 第二步、question-routing §6）：经律师转发客户的咨询型备忘录可以写附条件结论；阻断限于以下情形：提交法院、仲裁机构或监管机关；向第三方出具、供其依赖的法律意见书；要求无保留结论；缺口改变委托问题或我方身份。
- workflow：
  - 新增土地变性 / 城市更新 / 合作开发路由与触发词；
  - `INTAKE_DECISION` 须在第一次实质检索或派出子代理前输出（0002、0005、0007 三次读取了 intake 却未输出）；
  - 客户成稿模式交付要求。
- intake：`REVIEW_STATUS` 补充复核模型不可用时的替换、未做第二轮复核的声明；客户成稿模式下，未消解分歧写入《成稿说明》。
- 操作员编排：
  - `operator-orchestration.md` 新增「按议题拆分检索」的统一规则，以及复核输入输出约定（官方原文目录、三档输出、能否发送的总体评价）；
  - `operator-quickstart.md` 第 6 节换用 LWC-2026-0007 实测有效的复核提示词。
- 插件版本：construction-legal 0.3.0（新模块）、commercial-legal 0.4.2；marketplace 与 README / INSTALL 计数同步（69 个顶层 skill、281 个子技能）；`package.json` 1.3.0。

## [v1.2.2] - 2026-10-15

开源生态调研回灌（工具与数据源登记，均标「未实测」）。

### Changed

- `shared/research-gate/references/authoritative-sources.md`：flk JSON 接口可直连说明；元典官方 DSH 插件与统一 MCP 端点；新增企查查法律数据 MCP（含法条 / 案号引用核验）与得理开放平台行；第 9 节新增 GSXT 403 与企查查 / 元典替代、`lawtext/laws` 变化监测、`law-crawler-unified`。
- `shared/references/document-delivery-qa.md`：第 6 节工具参考（docx-redline-js 的「拒绝全部恢复源稿」门禁、Docxodus、OfficeCLI、adeu / safe-docx、vespper 样本、pandoc 中文模板、公文版式；避开 AGPL 与专有脚本）。
- `shared/references/due-diligence-playbook.md`：OCR 工具选型（RapidOCR / MinerU 4 / PaddleOCR-VL / oar-ocr）与「无法院文书准确率、须自评」提示。
- `package.json` 1.2.2。

## [v1.2.1] - 2026-10-15

2026 年法规更新回灌（外部调研，以官方页面核验为主；二手来源与未核实项逐条标注）。

### Changed

- employment-legal `labor-law-citations.md`：法释〔2025〕12号条号按官方转载全文重排（第 1–2、3、10、13–16、19 条）；新增 I 节超龄劳动者（人社部等令第 56 号，2026-07-01）与延迟退休到龄；案例类登记北京 2025 年度仲裁典型案例；配套法释〔2026〕14号、案由规定第三次修正。`local-rules-beijing.md` 补非全日制时薪、2026 年度基数补差口径、陪产假 / 育儿假核实、生育津贴直发。
- employment-legal `workforce-compliance-dd`：超龄 / 退休返聘定性与合同制度检查项改按令第 56 号。
- commercial-legal `transaction-procedure-citations.md`：国务院令第 784 号认缴截止 2027-06-30 升为已核实；新增七节（国资交易操作规则、登记文书规范 2026 年版、鼓励外商投资目录 2025 年版、对外投资规定、仲裁法 2025 修订、反不正当竞争法 2025 修订、法释〔2026〕6号、商标法 2026 修订、负面清单与申报标准现行状态）。
- regulatory-legal `administrative-law-citations.md`：H.3 补 36 号令条文细节、2026 年版惩戒清单文号 caveat、两部规章协调待核；新增 I 节（行政复议法实施条例 2026 修订、法释〔2026〕3号起诉期限、治安管理处罚法 2025、税务行政处罚裁量基准 2026 年版、金融失信名单、增值税法、54 号令现行状态）；B.3 / B.4 行内指向。
- data-compliance / construction-legal / litigation-legal / criminal-compliance `_shared` 引用库：各新增「2026 年更新」节——网络安全法 2025 修正条号后移、个人信息出境认证办法、网信办令第 24 / 25 号；建工解释（二）法释〔2026〕12号与实际施工人路径限制；仲裁法 2025 修订版本说明、法释〔2026〕19号刑民交叉、法发〔2026〕10号、法释〔2025〕15号、案由修正、律师法重新编号、指导案例清理；法释〔2026〕6号第 8 条等。
- research-gate 信用修复 playbook 版本时效清单：2026 年版清单文号二次检索 caveat、裁量基准 2026 年版、复议条例 2026 修订。
- 插件版本：employment-legal 0.4.1、commercial-legal 0.4.1、regulatory-legal 0.2.2、litigation-legal 0.3.2、data-compliance 0.2.1、construction-legal 0.2.1、criminal-compliance 0.2.1；`package.json` 1.2.1。

## [v1.2] - 2026-10-15

案例驱动迭代：落地案例库 LWC-2026-0001 至 0006 记录的「Skill 改进映射」。递归锚点与地方标准的核验日期写在各引用库行内。

### Added

- `shared/ai-for-china-legal-workflow/`（2026-08 已提交）与 `shared/legal-document-intake/`：顶层自动路由与法律事项动态 Intake——`known / derived / material_missing / optional_missing` 判定、可观察 `INTAKE_DECISION`、微信 `[CLARIFY:]` 中继、答复合并恢复、问题路由、边界示例、操作员快速说明、品牌无关执行档。
- `shared/legal-document-intake/SKILL.md`：`execution_profile` 进入 `INTAKE_DECISION`；正式法律意见书、对外尽调 / 合规报告、拟提交法院 / 监管机关文书默认 `critical`；交付前可观察的 `REVIEW_STATUS`（独立复核未执行必须显式声明）。
- `employment-legal/skills/workforce-compliance-dd/`：劳动用工合规调查工作流（三表交叉比对、用工形态定性、合同与制度审查、报告与附录装配）。
- `employment-legal/skills/_shared/dispatch-vs-outsourcing-checklist.md`：派遣 / 外包 / 委托代缴 / 代发薪 / 挂靠定性对照表（LWC-2026-0005 / 0006 两次提出）。
- `employment-legal/skills/_shared/local-rules-beijing.md`：北京最低工资、社保基数、生育假的版本化锚点。
- `employment-legal/skills/_shared/labor-law-citations.md`：G 节法释〔2025〕12 号、H 节劳务派遣。
- `commercial-legal/skills/equity-transaction-dd/`：股权交易法律尽调工作流（资料室清点与覆盖审计、分章事实底稿、交易程序核查、报告 / 问题清单 / 编制说明）。
- `commercial-legal/skills/_shared/transaction-procedure-citations.md`：公司法、外商投资法实施条例第 44 / 46 条、国资交易办法、经营者集中申报标准锚点及验证状态。
- `shared/references/due-diligence-playbook.md`：资料清单、事实底稿、覆盖审计、问题清单三分类、子代理与复核规则的共享数据结构。
- `shared/references/document-delivery-qa.md`：修订稿可逆性、模板包成稿、pandoc 中文模板、渲染与结构校验、交付说明清单。
- `shared/research-gate/references/`：税务 / 信用 / 上市公司公告源实测（authoritative-sources 第 9 节）；原件、摘要与占位规则（source-policy）；信用修复、劳动用工合规调查、股权尽调程序三个 playbook。
- `regulatory-legal/skills/_shared/administrative-law-citations.md`：H 节信用修复与失信惩戒锚点（税务总局令第 54 号、2025 年第 12 号公告、发改委令第 36 号、2026 年版惩戒清单，2026-09-13 核实）。
- `shared/feedback-refinement/SKILL.md`：脱敏案例捕获步骤与人工操作员反馈来源。
- `shared/inkstatute-integration/AGENT-UX-OPTIMIZATION.md`：墨律 agent 体验优化记录；`ASK-USER-PROTOCOL.md` 增加人工微信中继模式。
- `scripts/setup-codex-skills.sh`：Codex 安装总路由与动态 intake。

### Changed

- 17 个 employment / family / litigation 入口技能的「生成文档前必须反问」改为动态 intake 输出确认（commercial-legal 已于 2026-08-28 改）。
- `commercial-legal`：审查 / 起草 / 责任分析入口接入动态 intake；实践配置字段四态模型（concrete / matter_dependent / missing / not_applicable）与事项级动态确认策略；冷启动访谈固定写入 `CLAUDE.md`。
- `shared/ai-for-china-legal-workflow/SKILL.md`：新增尽调与信用修复路由；交付步骤引用 QA 清单并要求 `REVIEW_STATUS`。
- `shared/research-gate/SKILL.md`：材料清点与检索词构建之间插入动态 intake 步骤。
- README 重写为以实际使用为主的项目文档，区分独立 Qwen 使用、Codex 操作员模式和墨律集成使用；修正共享参考文档位置；更新 connector 状态说明。
- 插件版本：commercial-legal 0.4.0、employment-legal 0.4.0、litigation-legal 0.3.1、family-legal 0.2.1、regulatory-legal 0.2.1。

## [v1.1] - 2026-06-08

### Added

- 共享中国法研究基础设施：
  - `shared/research-gate/SKILL.md`
  - `shared/research-gate/references/authoritative-sources.md`
  - `shared/research-gate/references/quality-gates.md`
  - `shared/research-gate/references/search-playbooks.md`
  - `shared/research-gate/references/source-policy.md`
- 共享法律参考：
  - `shared/references/document-structures.md`
  - `shared/references/guarantee-bond-playbook.md`
  - `shared/references/subject-qualification-traps.md`
- 跨平台格式说明：`shared/cross-platform/`。
- 内部回归验证材料和前向测试记录模板。

### Changed

- 顶层 skill 在法律文书生成前统一依赖 research gate，强化目录清点、五维检索、来源分级、引用标注和失败回退。
- 诉讼类文书结构、主体资格陷阱等能力从单点经验沉淀为共享参考。

## [v1.0] - 2026-06-08

### Added

- 13 个法律插件完成首版定义：
  - `commercial-legal`
  - `litigation-legal`
  - `employment-legal`
  - `data-compliance`
  - `ip-legal`
  - `regulatory-legal`
  - `ai-governance`
  - `construction-legal`
  - `family-legal`
  - `criminal-compliance`
  - `law-student`
  - `legal-aid`
  - `legal-builder-hub`
- 66 个顶层插件 skill，覆盖冷启动访谈、合同审查/起草、诉讼 intake、证据管理、答辩状/代理词、劳动争议、数据出境、AI 合规等场景。
- 插件级 `.claude-plugin/` 元数据、`CLAUDE.md` 实践配置模板和 README。
- Qwen Code 项目级安装脚本：
  - `scripts/setup-skills.sh`
  - `scripts/cleanup-skills.sh`
- 跨平台转换脚本：
  - `scripts/convert-skills.js`
  - `npm run convert`
  - `npm run test:compatibility`
- MCP connector 规格：
  - `law-database`
  - `wenshu`
  - `gsxt`
  - `trademark`
  - `patent`
  - `wechat-notify`
- `law-database` 原型实现：HTTP client、MCP server、缓存、健康检查、重试、熔断、限流。
- 4 个 managed agent cookbook：法规监控、裁判文书监控、企业变更监控、时效监控。
- `run-agent.js` agent runner 初版。
- 安装、快速开始、connector 和项目总结文档。

### Notes

- Qwen Code 项目级 skill 安装已验证。
- Claude/Kimi/OpenCode 等平台的完整安装和运行仍需逐平台验证。
- 多数 connector 仍需要真实数据源 API、凭证和合规接入方案后才能生产使用。
