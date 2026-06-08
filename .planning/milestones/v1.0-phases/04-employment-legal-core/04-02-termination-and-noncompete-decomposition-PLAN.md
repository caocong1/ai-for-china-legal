---
phase: 04-employment-legal-core
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - employment-legal/skills/termination-review/grounds-legality/SKILL.md
  - employment-legal/skills/termination-review/severance-calculation/SKILL.md
  - employment-legal/skills/termination-review/termination-procedure/SKILL.md
  - employment-legal/skills/termination-review/unlawful-termination-remedy/SKILL.md
  - employment-legal/skills/termination-review/SKILL.md
  - employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md
  - employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md
  - employment-legal/skills/non-compete-review/scope-enforceability/SKILL.md
  - employment-legal/skills/non-compete-review/breach-liability-remedy/SKILL.md
  - employment-legal/skills/non-compete-review/SKILL.md
autonomous: true
requirements:
  - TERMINATION-REVIEW-DECOMP
  - NONCOMPETE-REVIEW-DECOMP
user_setup: []

must_haves:
  truths:
    - "律师/HR 可以单独触发解雇审查的任一子能力（解除事由合法性 / 经济补偿与赔偿金计算 / 解除程序合规 / 违法解除救济）而无需运行整个审查流程"
    - "律师/HR 可以单独触发竞业限制审查的任一子能力（人员范围与保密义务 / 期限与经济补偿 / 竞业范围与可执行性 / 违约责任与救济）而无需运行整个审查流程"
    - "经济补偿计算子技能能区分 N / N+1 / 2N 三种情形，并把已核实锚点（经济补偿N=第47条、违法解除2N=第87条）与不确定条号（解除事由第39/40/41条等）清楚区分"
    - "竞业限制子技能能识别人员范围（高管/高级技术/负有保密义务人员）、期限不超2年、经济补偿强制性（第23-24条已核实锚点），并对地方性补偿比例标地方性规定待核验"
    - "每个解雇/竞业子技能都有详细步骤、检查清单、输出模板、边界条件、错误处理和按来源分类的法律依据，每个 150+ 行实质内容"
    - "现有 termination-review（55 行浅骨架）与 non-compete-review（54 行浅骨架）内容无丢失地迁移到子技能并深化，原 SKILL.md 改为编排入口"
  artifacts:
    - path: "employment-legal/skills/termination-review/grounds-legality/SKILL.md"
      provides: "解除事由合法性子技能：协商解除/过失性辞退/非过失性辞退/经济性裁员 的法定条件核查 + 禁止解除情形（医疗期/孕产哺乳期/工伤等）"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/termination-review/severance-calculation/SKILL.md"
      provides: "经济补偿与赔偿金计算子技能：N（第47条）/ N+1（代通知金）/ 2N（违法解除第87条）三情形 + 工资基数 + 高收入封顶 + 年限计算"
      contains: "第47条"
      min_lines: 150
    - path: "employment-legal/skills/termination-review/termination-procedure/SKILL.md"
      provides: "解除程序合规子技能：提前30天通知/代通知金、工会通知、解除证明、档案社保转移、送达与举证"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/termination-review/unlawful-termination-remedy/SKILL.md"
      provides: "违法解除救济与风险预防子技能：恢复劳动关系 vs 2N（第87条）的选择、举证责任、风险预防清单"
      contains: "第87条"
      min_lines: 150
    - path: "employment-legal/skills/termination-review/SKILL.md"
      provides: "解雇审查编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
    - path: "employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md"
      provides: "人员范围与保密义务子技能：高管/高级技术/负有保密义务人员（第23条）+ 保密义务与竞业限制区别"
      contains: "第23"
      min_lines: 150
    - path: "employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md"
      provides: "期限与经济补偿合规子技能：期限不超2年（第24条）+ 经济补偿强制性/月度支付/地方性比例指引"
      contains: "第24"
      min_lines: 150
    - path: "employment-legal/skills/non-compete-review/scope-enforceability/SKILL.md"
      provides: "竞业范围与可执行性子技能：地域/行业/竞品范围合理性 + 过宽不可执行风险"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/non-compete-review/breach-liability-remedy/SKILL.md"
      provides: "违约责任与救济子技能：违约金/继续履行、用人单位未付补偿时劳动者解除竞业限制、三个月规则"
      contains: "## 法律依据"
      min_lines: 150
    - path: "employment-legal/skills/non-compete-review/SKILL.md"
      provides: "竞业限制审查编排入口（指向四个子技能 + 入口级护栏）"
      min_lines: 40
  key_links:
    - from: "employment-legal/skills/termination-review/severance-calculation/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用经济补偿N（第47条）与违法解除2N（第87条）"
      pattern: "labor-law-citations|第47条|第87条"
    - from: "employment-legal/skills/termination-review/grounds-legality/SKILL.md"
      to: "employment-legal/skills/_shared/legal-basis-conventions.md"
      via: "引用来源分类规范与待验证规则（解除事由条号待核实）"
      pattern: "legal-basis-conventions|待验证"
    - from: "employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md"
      to: "employment-legal/skills/_shared/labor-law-citations.md"
      via: "引用竞业限制期限/补偿条文（第23-24条）"
      pattern: "labor-law-citations|第24"
    - from: "employment-legal/skills/termination-review/SKILL.md"
      to: "四个解雇审查子技能"
      via: "编排入口指向子技能路径"
      pattern: "grounds-legality|severance-calculation|termination-procedure|unlawful-termination-remedy"
    - from: "employment-legal/skills/non-compete-review/SKILL.md"
      to: "四个竞业限制子技能"
      via: "编排入口指向子技能路径"
      pattern: "personnel-scope-confidentiality|term-and-compensation|scope-enforceability|breach-liability-remedy"
    - from: "employment-legal/skills/non-compete-review/SKILL.md"
      to: "employment-legal/CLAUDE.md"
      via: "从 ## 审查立场 > 竞业限制 读取适用人员范围/经济补偿标准"
      pattern: "竞业限制|审查立场"
---

<objective>
将劳动人事插件的解雇审查（termination-review）与竞业限制审查（non-compete-review）从浅骨架扁平技能拆分为深度子技能体系，每个子技能可独立触发。

本计划交付两块内容：
1. **解雇审查拆分** — 按 CONTEXT「深层子技能拆分」决策，将 termination-review（现 55 行浅骨架，仅列法定情形纲要与补偿标准纲要）拆为四个可独立触发的子技能：解除事由合法性（过失/非过失/经济性裁员/协商）/ 经济补偿与赔偿金计算（N / N+1 / 2N）/ 解除程序合规 / 违法解除救济与风险预防。现有 55 行内容（解雇原因四类、合法性检查表、经济补偿计算纲要、程序要求清单、风险评估表）无丢失迁移到对应子技能并实质深化，原 SKILL.md 改为编排入口。
2. **竞业限制审查拆分** — 将 non-compete-review（现 54 行浅骨架，仅列 5 个审查要点纲要）拆为四个可独立触发的子技能：人员范围与保密义务 / 期限与经济补偿合规 / 竞业范围与可执行性 / 违约责任与救济。现有 54 行内容（适用人员范围、期限、经济补偿、范围、违约金五要点）无丢失迁移到对应子技能并实质深化，原 SKILL.md 改为编排入口。

本计划与 04-01 同属 wave 1，两者 files_modified 无任何重叠（04-01 触及 _shared/ 与 hiring-review/；本计划仅触及 termination-review/ 与 non-compete-review/），可并行执行。本计划的子技能引用 04-01 产出的 _shared 引用脊柱与配置契约——但因 wave 1 并行，子技能以「前置：读取 _shared/labor-law-citations.md 等」的方式声明依赖路径（执行期这些文件由 04-01 同 wave 产出或已存在），不内联复制条文；若执行时 _shared 文件尚未生成，按引用路径声明并标注，不阻塞本计划独立完成。

Purpose: 关闭「termination-review 与 non-compete-review 为 55/54 行浅骨架，深度不足以支撑解雇方案与竞业限制条款的实质执业」的核心 gap。解雇与竞业是劳动场景中风险最高、条号准确性要求最高的两块（经济补偿/赔偿金计算直接关系金额、竞业限制可执行性直接关系条款是否有效），须按 CONTEXT「全面法律研究」纪律深化。
Output: 4 个解雇审查子技能 SKILL.md + 1 个解雇编排入口 + 4 个竞业限制子技能 SKILL.md + 1 个竞业编排入口（共 10 个文件）。

中国化原则约束（来自 CLAUDE.md，必须遵守）：成文法为主（劳动合同法2012修正、劳动法、相关司法解释为分析基础）；指导性案例作参考非判例法；地方性规定识别（北京/上海/广东/深圳等竞业补偿指引、经济补偿计算口径差异）+ 劳动仲裁委员会 + 法院四级；执业环境适配（用人单位方/劳动者方立场）。命名约定：技能名 kebab-case；斜杠命令 /employment-legal:<skill>。文件格式：JSON 2 空格缩进、文件以换行符结尾、无尾部空格、markdown 表格列数一致。

法律内容硬性要求：引用按 法条/案例/学说 分类，带来源标签；不确定条号一律标 `[待验证]`，不臆造条号。已核实可复用锚点：经济补偿 N（每满一年一个月工资）=《劳动合同法》第47条；违法解除赔偿金 2N（经济补偿标准二倍）=第87条；竞业限制（人员范围/经济补偿/期限不超2年）=第23-24条。其余条号（解除事由：协商第36条、过失第39条、非过失第40条、经济性裁员第41条、经济补偿情形第46条；服务期违约金第22条）若非高度确信，标 `[待验证]` 并以「描述规则 + 待验证」呈现，绝不硬写裸条号。
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
@employment-legal/skills/termination-review/SKILL.md
@employment-legal/skills/non-compete-review/SKILL.md
@employment-legal/skills/_shared/legal-basis-conventions.md
@employment-legal/skills/_shared/labor-law-citations.md
@employment-legal/skills/_shared/practice-profile-schema.md
@commercial-legal/skills/contract-review/SKILL.md
@commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 拆分 termination-review 为四个可独立触发的子技能</name>
  <read_first>
    - employment-legal/skills/termination-review/SKILL.md（现有 55 行浅骨架 — 全部内容；这是要拆分迁移的源：解雇原因分析四类、合法性检查表、经济补偿计算纲要第47条、程序要求清单、风险评估表）
    - employment-legal/skills/_shared/legal-basis-conventions.md（04-01 Task 1 产出 — 引用规范；若执行时尚未生成，按路径声明依赖）
    - employment-legal/skills/_shared/labor-law-citations.md（04-01 Task 1 产出 — 引用库，各子技能法律依据引用此处的解除事由/经济补偿/赔偿金条文）
    - employment-legal/skills/_shared/practice-profile-schema.md（04-01 Task 2 产出 — 配置读取契约，读 ## 审查立场 > 解雇审查 的经济补偿倾向 N/N+1/2N）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能质量基准 — 目的/详细步骤含表格/检查清单/输出模板/边界条件表/错误处理表/## 法律依据 按法条案例学说分类的完整范式）
    - employment-legal/CLAUDE.md（实践配置模板 — ## 审查立场 > 解雇审查（法定解除情形 39/40/41条、经济补偿 N/N+1 倾向）/风险校准/升级矩阵/文书风格（解雇通知风格）/共享护栏（地方性规定））
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    employment-legal/skills/termination-review/grounds-legality/SKILL.md,
    employment-legal/skills/termination-review/severance-calculation/SKILL.md,
    employment-legal/skills/termination-review/termination-procedure/SKILL.md,
    employment-legal/skills/termination-review/unlawful-termination-remedy/SKILL.md
  </files>
  <action>
    将现有 termination-review/SKILL.md 的内容拆分迁移到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：grounds-legality / severance-calculation / termination-procedure / unlawful-termination-remedy；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 employment-legal/CLAUDE.md 配置 ## 审查立场 > 解雇审查 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可被 termination-review 编排入口调用也可单独触发 /employment-legal:<name>）、详细步骤（含表格与检查要点）、检查清单、输出模板（markdown 结构示意）、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/案例/学说 分类，引用 _shared/labor-law-citations.md，标待验证，含案例/学说占位）。**每个子技能须 150+ 行实质内容，深度对标 penalty-assessment，不得是骨架。** 拆分时须深化现有内容（补充边界条件、错误处理、输出模板、法律依据三类分类），而非仅搬运。

    分工（迁移现有解雇原因/合法性/补偿/程序/风险五块，无丢失）：
    - grounds-legality（解除事由合法性）：迁移「第一步 解雇原因分析」（协商解除、过失性辞退、非过失性辞退、经济性裁员）+「第二步 合法性检查」表（过错/非过错/经济性裁员的法定条件与检查要点）。深化：每类解除的法定构成要件逐项核查（过失性辞退：试用期不符合录用条件/严重违反规章制度/严重失职营私舞弊重大损害/兼职影响本职拒不改正/欺诈胁迫致合同无效/被追究刑责；非过失性辞退：医疗期满不能从事原工作及另行安排工作/不能胜任经培训或调岗仍不能胜任/客观情况重大变化协商不成；经济性裁员：法定情形 + 裁减20人或10%以上 + 优先留用 + 报告劳动行政部门程序）+ **禁止解除情形**（医疗期内、孕期产期哺乳期、工伤丧失或部分丧失劳动能力、患职业病或因工负伤、连续工作满一定年限距退休不足一定期限、法律法规其他情形——非过失辞退与经济性裁员不得适用）。**关键纪律**：协商第36条/过失第39条/非过失第40条/经济性裁员第41条/禁止解除第42条 等条号若非高度确信，写「《劳动合同法》关于[过失性辞退]的规定（第39条 `[待验证]`）」描述规则 + 待验证，不硬写裸条号。边界条件：规章制度未经民主程序公示则不能作为解除依据；末位淘汰不等于「不能胜任工作」。
    - severance-calculation（经济补偿与赔偿金计算）：迁移「第三步 经济补偿计算」（**第47条已核实锚点**：满1年=1个月工资；6个月以上不满1年按1年算；不满6个月=半个月工资；高收入者不超当地上年度职工月平均工资3倍、补偿年限不超12年）。深化为三情形清晰区分：（a）**N**（法定经济补偿，第47条，适用第46条规定的经济补偿情形——协商由用人单位提出、非过失辞退、经济性裁员、合同到期用人单位不续或降低条件续订劳动者不同意等）；（b）**N+1**（代通知金：非过失性辞退未提前30天通知时额外支付一个月工资，N 为经济补偿、+1 为代通知金，二者性质不同——代通知金不计入经济补偿基数）；（c）**2N**（违法解除赔偿金，**第87条已核实锚点**，为经济补偿标准二倍，劳动者不要求恢复劳动关系或劳动关系已不能继续时适用，与 N 不并用）。含「月工资」定义（解除前12个月平均应得工资，含奖金津贴补贴；低于最低工资按最低工资）。提供计算工作表/示例（工龄→年限→月工资基数→封顶判断→金额）。**关键纪律**：第47条与第87条标已核实锚点；第46条经济补偿情形条号若不确信标 `[待验证]`。边界条件：月工资高于3倍封顶时年限封顶12年；工作不满6个月的半个月补偿；2008年1月1日前后工龄分段计算的历史问题（标 `[待验证]` 提示核查）。
    - termination-procedure（解除程序合规）：迁移「第四步 程序要求」清单（提前30天书面通知或代通知金、通知工会、出具解除证明、办理档案社保转移）。深化：各类解除对应的法定程序差异（过失性辞退无需提前通知但需事先通知工会理由；非过失辞退需提前30天通知或代通知金；经济性裁员需提前30天向工会或全体职工说明并听取意见 + 向劳动行政部门报告）+ 送达合规（书面送达、留置送达、公告送达的举证）+ 解除证明的法定内容 + 15日内办理档案社保转移。边界条件：通知工会瑕疵在诉讼前补正的效力（标 `[待验证]`）；电子送达/EMS 送达的举证要点。错误处理：未通知工会、未出具解除证明、未办转移的法律后果分别说明。
    - unlawful-termination-remedy（违法解除救济与风险预防）：迁移「第五步 风险评估」表（违法解除→双倍赔偿金、程序瑕疵→解除无效）。深化为劳动者救济路径选择（**恢复劳动关系**：劳动者要求继续履行且合同能够继续履行的，用人单位应继续履行并支付解除之日至恢复期间工资；**2N 赔偿金**：劳动者不要求继续履行或合同已不能继续履行的，按第87条支付赔偿金——二者择一，不并用）+ 举证责任（用人单位对解除合法性承担举证责任）+ 用人单位风险预防清单（事由证据固定、规章制度民主程序与公示、绩效考核记录、通知与送达留痕、工会程序）。**关键纪律**：第87条标已核实锚点；恢复劳动关系条号若不确信标 `[待验证]`。边界条件：合同已到期、客观上无法继续履行（岗位撤销/企业注销）时不支持恢复劳动关系；劳动者主张恢复劳动关系与赔偿金不可兼得。

    各子技能在「前置」中说明分工互补：grounds-legality 定性（能不能解）→ severance-calculation 算钱（合法解除给多少）→ termination-procedure 走程序（怎么解才合规）→ unlawful-termination-remedy 兜底（解错了怎么救济、怎么预防）。遵守文件格式约定。输出模板用 markdown 结构示意。所有法律依据引用 _shared/labor-law-citations.md，已核实锚点（第47/87条）明确、不确定条号（第36/39/40/41/42/46条等）标待验证。
  </action>
  <verify>
    <automated>for d in grounds-legality severance-calculation termination-procedure unlawful-termination-remedy; do f="employment-legal/skills/termination-review/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第47条' employment-legal/skills/termination-review/severance-calculation/SKILL.md && grep -q '第87条' employment-legal/skills/termination-review/severance-calculation/SKILL.md && grep -q 'N+1\|代通知金' employment-legal/skills/termination-review/severance-calculation/SKILL.md && grep -q '2N\|二倍\|双倍' employment-legal/skills/termination-review/unlawful-termination-remedy/SKILL.md && grep -q '医疗期\|孕期\|哺乳期\|禁止解除' employment-legal/skills/termination-review/grounds-legality/SKILL.md && grep -q '工会\|解除证明' employment-legal/skills/termination-review/termination-procedure/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 employment-legal/skills/termination-review/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按 法条/案例/学说 分类，标待验证），且每个 ≥100 非空行
    - severance-calculation 含第47条 N 计算与第87条 2N，且 N / N+1（代通知金）/ 2N 三情形清晰区分
    - grounds-legality 含协商/过失/非过失/经济性裁员四类条件 + 禁止解除情形（医疗期/孕产哺乳期/工伤等）；不确定条号（第36/39/40/41/42/46条）标待验证不臆造
    - unlawful-termination-remedy 含恢复劳动关系 vs 2N 赔偿金择一 + 举证责任 + 风险预防清单；termination-procedure 含工会通知/解除证明/档案社保转移
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>termination-review 拆为四个可独立触发的子技能；现有 55 行内容（解雇原因四类、合法性检查、经济补偿计算、程序要求、风险评估）无丢失迁移并深化；经济补偿引用第47条、违法解除引用第87条，N/N+1/2N 三情形清晰；解除事由条号不确信处标待验证；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 2: 拆分 non-compete-review 为四个可独立触发的子技能</name>
  <read_first>
    - employment-legal/skills/non-compete-review/SKILL.md（现有 54 行浅骨架 — 全部内容；这是要拆分迁移的源：适用人员范围、期限、经济补偿、范围、违约金五审查要点）
    - employment-legal/skills/_shared/legal-basis-conventions.md（04-01 Task 1 产出 — 引用规范）
    - employment-legal/skills/_shared/labor-law-citations.md（04-01 Task 1 产出 — 引用库，竞业限制第23-24条引用此处）
    - employment-legal/skills/_shared/practice-profile-schema.md（04-01 Task 2 产出 — 配置读取契约，读 ## 审查立场 > 竞业限制 的适用人员范围/经济补偿标准/期限/范围）
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md（深度子技能质量基准）
    - employment-legal/CLAUDE.md（实践配置模板 — ## 审查立场 > 竞业限制（适用人员范围/经济补偿标准/期限/范围定义）/风险校准/共享护栏（地方性规定：北京/上海竞业补偿指引））
    - CLAUDE.md（命名约定 kebab-case；文件格式）
  </read_first>
  <files>
    employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md,
    employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md,
    employment-legal/skills/non-compete-review/scope-enforceability/SKILL.md,
    employment-legal/skills/non-compete-review/breach-liability-remedy/SKILL.md
  </files>
  <action>
    将现有 non-compete-review/SKILL.md 的五要点内容拆分迁移到四个子技能，每个是独立 SKILL.md，含 YAML frontmatter（name kebab-case：personnel-scope-confidentiality / term-and-compensation / scope-enforceability / breach-liability-remedy；description；argument-hint）。每个子技能 MUST 含标准章节：目的、前置（读取 employment-legal/CLAUDE.md 配置 ## 审查立场 > 竞业限制 + 引用 _shared 规范/引用库/契约 + 与其他子技能分工说明 + 可被 non-compete-review 编排入口调用也可单独触发 /employment-legal:<name>）、详细步骤（含表格与检查要点）、检查清单、输出模板、边界条件（表格）、错误处理（表格）、`## 法律依据`（按 法条/案例/学说 分类，引用 _shared/labor-law-citations.md，标待验证，含案例/学说占位）。**每个子技能须 150+ 行实质内容，深度对标 penalty-assessment，不得是骨架。** 拆分时须深化现有五要点（补充边界条件、错误处理、输出模板、法律依据三类分类），而非仅搬运。

    分工（迁移现有 适用人员范围/期限/经济补偿/范围/违约金 五要点，无丢失）：
    - personnel-scope-confidentiality（人员范围与保密义务）：迁移「1. 适用人员范围」（高级管理人员、高级技术人员、其他负有保密义务人员，**第23条已核实锚点**——竞业限制人员范围限于此三类）。深化：人员范围认定（职位 vs 实际接触商业秘密——竞业限制对象应实际负有保密义务，对普通员工约定竞业限制即便有补偿也可能因不属法定人员范围而存争议，标 `[待验证]`）+ 保密义务与竞业限制的区别（保密义务可对全体劳动者约定且无须支付补偿；竞业限制仅限三类人员且须支付补偿——二者不可混同）+ 商业秘密界定（技术信息/经营信息、秘密性/价值性/保密措施三要件）。边界条件：对不负有保密义务的普通员工约定竞业限制的效力风险；保密协议被误标为竞业限制协议。
    - term-and-compensation（期限与经济补偿合规）：迁移「2. 期限」（**法定上限不超过2年，第24条已核实锚点**）+「3. 经济补偿」（必须支付经济补偿、补偿标准地方有不同指引、支付方式）。深化：期限审查（超2年部分无效；竞业限制起算自劳动合同解除或终止之日）+ 经济补偿强制性（**未约定补偿或约定无补偿的条款效力**：实践中劳动者履行竞业限制义务后可主张按解除前12个月平均工资的一定比例按月支付——地方性指引常见 30%–50%，须标地方性规定 `[管辖 flagged — 需验证地方性规定]`，不硬写统一比例）+ 月度支付（补偿应在竞业限制期限内按月支付）+ **用人单位三个月未支付补偿**（劳动者可请求解除竞业限制约定，标 `[待验证]` 提示核查司法解释）。**关键纪律**：第24条标已核实锚点；30%–50% 比例与三个月规则标地方性/待验证，不臆造统一数字。边界条件：在职期间发放的所谓「竞业限制补偿」是否可折抵离职后补偿（争议，标 `[待验证]`）。
    - scope-enforceability（竞业范围与可执行性）：迁移「4. 范围」（与本单位生产或经营同类产品、从事同类业务、有竞争关系的用人单位）。深化为可执行性三维分析：地域范围合理性（全国/特定区域，过宽影响劳动者生存权可能被认定不合理）+ 行业/竞品范围合理性（限于实际有竞争关系的同业，泛化到「所有相关行业」过宽）+ 岗位/业务范围（与劳动者原岗位实际接触的商业秘密相关）。范围过宽的不可执行风险评估表 + 与劳动者择业权/生存权的平衡。边界条件：竞业范围明显超出用人单位实际经营范围；竞品名单开放式列举（「包括但不限于」）的解释风险。
    - breach-liability-remedy（违约责任与救济）：迁移「5. 违约金」（是否约定违约金、违约金金额是否合理）。深化：劳动者违约的救济（支付违约金 + 用人单位可要求继续履行竞业限制义务——违约金与继续履行可并存）+ 违约金合理性（违约金过高劳动者可请求调整，参照实际损失，标 `[待验证]`）+ **用人单位救济与劳动者救济双向**（劳动者违约付违约金；用人单位未付补偿，劳动者履行后可主张补偿、三个月未付可解除竞业限制）+ 与服务期违约金的区别（竞业限制违约金是第25条允许的两种用人单位可约定违约金情形之一，详见 service-period-penalty 子技能分工说明，不重叠）。**关键纪律**：违约金条号第25条若不确信标 `[待验证]`。边界条件：约定畸高违约金的调整；用人单位主张继续履行但竞业期已过的处理。

    各子技能在「前置」中说明分工互补：personnel-scope-confidentiality 定主体（谁能被约束）→ term-and-compensation 定对价（多久、给多少）→ scope-enforceability 定范围（限制是否合理可执行）→ breach-liability-remedy 定后果（违约怎么办、双向救济）。遵守文件格式约定。所有法律依据引用 _shared/labor-law-citations.md，已核实锚点（第23-24条）明确、不确定条号与比例标待验证/地方性。
  </action>
  <verify>
    <automated>for d in personnel-scope-confidentiality term-and-compensation scope-enforceability breach-liability-remedy; do f="employment-legal/skills/non-compete-review/$d/SKILL.md"; test -f "$f" || { echo "MISSING $f"; exit 1; }; grep -q "^name: $d" "$f" || { echo "BAD FRONTMATTER $f"; exit 1; }; grep -q '## 法律依据' "$f" || { echo "NO 法律依据 $f"; exit 1; }; grep -q '待验证' "$f" || { echo "NO 待验证 $f"; exit 1; }; lines=$(grep -vc '^$' "$f"); [ "$lines" -ge 100 ] || { echo "TOO SHORT $f ($lines)"; exit 1; }; done; grep -q '第23' employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md && grep -q '第24\|不超过 2 年\|不超过2年\|两年\|2 年' employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md && grep -q '保密' employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md && grep -q '违约金' employment-legal/skills/non-compete-review/breach-liability-remedy/SKILL.md && grep -q '地方性\|管辖 flagged' employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md</automated>
  </verify>
  <acceptance_criteria>
    - 四个子技能 SKILL.md 全部存在，路径为 employment-legal/skills/non-compete-review/<kebab-name>/SKILL.md
    - 每个子技能含 YAML frontmatter，name 为对应 kebab-case 名，含 description 与 argument-hint
    - 每个子技能含章节：目的、前置、详细步骤、检查清单、输出模板、边界条件、错误处理、## 法律依据（按 法条/案例/学说 分类，标待验证），且每个 ≥100 非空行
    - personnel-scope-confidentiality 含第23条三类人员 + 保密义务与竞业限制区别；term-and-compensation 含期限不超2年（第24条）+ 经济补偿强制性 + 地方性补偿比例标 `[管辖 flagged]`/待验证
    - scope-enforceability 含地域/行业/岗位三维可执行性分析；breach-liability-remedy 含违约金 + 双向救济（劳动者违约/用人单位未付补偿三个月可解除）
    - 30%–50% 补偿比例与三个月规则等不确信处标地方性/待验证，不臆造统一数字
    - 所有文件无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>non-compete-review 拆为四个可独立触发的子技能；现有 54 行五要点（人员范围、期限、补偿、范围、违约金）无丢失迁移并深化；人员范围/期限/补偿引用第23-24条，可执行性三维分析与双向救济完整；地方性补偿比例标待核验；法律依据按来源分类引用 _shared 库。</done>
</task>

<task type="auto">
  <name>Task 3: 改造 termination-review 与 non-compete-review 的 SKILL.md 为编排入口</name>
  <read_first>
    - employment-legal/skills/termination-review/SKILL.md（现有 — 改造对象）
    - employment-legal/skills/non-compete-review/SKILL.md（现有 — 改造对象）
    - 本计划 Task 1 / Task 2 产出的八个子技能 SKILL.md（确认路径与触发名一致）
    - commercial-legal/skills/contract-review/SKILL.md（编排入口范式 — 迁移说明、事项上下文、目的地检查、前置加载立场、临时模式段落、子技能编排顺序表、入口级护栏写法）
    - employment-legal/CLAUDE.md（## 审查立场 > 解雇审查/竞业限制；## 谁在使用 服务对象；## 共享护栏 地方性规定）
    - employment-legal/.claude-plugin/plugin.json（注册结构参考；本任务不改它，由 04-03 统一更新）
  </read_first>
  <files>
    employment-legal/skills/termination-review/SKILL.md,
    employment-legal/skills/non-compete-review/SKILL.md
  </files>
  <action>
    将两个原 SKILL.md 分别改造为编排入口（参照 commercial-legal/skills/contract-review/SKILL.md 范式）：

    **termination-review/SKILL.md（解雇审查编排入口）**：保留 frontmatter（name: termination-review，更新 description 说明它现在编排四个子技能）。正文：(1) 顶部一行迁移说明，指明深度内容已拆分到子技能（路径 skills/termination-review/<子技能名>/SKILL.md）；(2) 目的与整体解雇审查流程概览；(3) 前置：加载审查立场——读取 employment-legal/CLAUDE.md 的 ## 审查立场 > 解雇审查，缺失或含占位符时显示标准提示（运行 /employment-legal:cold-start-interview 或说「临时模式」），含临时模式段落（平衡风险偏好、经济补偿按法定 N 标准、标 `[临时模式]`）；(4) 子技能编排顺序表——解除事由合法性（能不能解）→ 经济补偿与赔偿金计算（合法解除给多少）→ 解除程序合规（怎么解才合规）→ 违法解除救济与风险预防（解错了怎么救济），每行说明该子技能做什么、子技能路径、可单独触发的斜杠命令 /employment-legal:<name> + 顺序说明；(5) 入口级护栏：用人单位方/劳动者方立场确认（从 ## 谁在使用 服务对象读取——用人单位方=合规与风险预防；劳动者方=权益主张与赔偿计算）、禁止解除情形前置检查（涉孕产哺乳/医疗期/工伤先标🔴）、地方性规定识别（工作地点驱动）、目的地/特权检查（解雇文书特权性）。

    **non-compete-review/SKILL.md（竞业限制审查编排入口）**：保留 frontmatter（name: non-compete-review，更新 description 说明它现在编排四个子技能）。正文：(1) 顶部迁移说明；(2) 目的与整体竞业限制审查流程概览；(3) 前置：读取 employment-legal/CLAUDE.md 的 ## 审查立场 > 竞业限制（适用人员范围/经济补偿标准/期限/范围），缺失或含占位符时标准提示 + 临时模式段落（竞业补偿与人员范围按法定下限标记常见风险、标 `[临时模式]`）；(4) 子技能编排顺序表——人员范围与保密义务（谁能被约束）→ 期限与经济补偿合规（多久、给多少）→ 竞业范围与可执行性（限制是否合理）→ 违约责任与救济（违约怎么办），每行说明 + 路径 + 单独触发命令 + 顺序说明；(5) 入口级护栏：用人单位方/劳动者方立场确认、地方性补偿比例识别（标 `[管辖 flagged — 需验证地方性规定]`）、与 hiring-review 的违约金审查分工提示（竞业限制违约金在此深审，服务期违约金在 hiring-review/service-period-penalty）。

    两个入口不得丢失任何护栏语义——若某段落已迁移到子技能，这里用一句话引用而非删除。遵守文件格式约定（无尾部空格、换行结尾、表格列数一致）。
  </action>
  <verify>
    <automated>t=employment-legal/skills/termination-review/SKILL.md; grep -q '^name: termination-review' "$t" && grep -q 'grounds-legality' "$t" && grep -q 'severance-calculation' "$t" && grep -q 'termination-procedure' "$t" && grep -q 'unlawful-termination-remedy' "$t" && grep -q '临时模式' "$t" && grep -q '用人单位方\|劳动者方' "$t"; n=employment-legal/skills/non-compete-review/SKILL.md; grep -q '^name: non-compete-review' "$n" && grep -q 'personnel-scope-confidentiality' "$n" && grep -q 'term-and-compensation' "$n" && grep -q 'scope-enforceability' "$n" && grep -q 'breach-liability-remedy' "$n" && grep -q '临时模式' "$n" && grep -q '用人单位方\|劳动者方' "$n"</automated>
  </verify>
  <acceptance_criteria>
    - termination-review/SKILL.md 仍有 frontmatter name: termination-review，description 更新为编排说明；正文含指向四个解雇子技能的编排顺序表 + 可单独触发命令
    - non-compete-review/SKILL.md 仍有 frontmatter name: non-compete-review，description 更新为编排说明；正文含指向四个竞业子技能的编排顺序表 + 可单独触发命令
    - 两入口均保留入口级护栏：加载实践配置文件 + 临时模式、用人单位方/劳动者方立场确认、地方性规定识别、目的地/特权检查
    - termination-review 入口含禁止解除情形前置检查提示；non-compete-review 入口含与 hiring-review 服务期违约金的分工提示
    - 两文件顶部均含一行迁移说明指向子技能
    - 无尾部空格、以换行符结尾、markdown 表格列数一致
  </acceptance_criteria>
  <done>原 termination-review/SKILL.md 与 non-compete-review/SKILL.md 分别成为指向各自四个子技能的编排入口；入口级护栏（立场确认、地方性规定、临时模式、特权检查、禁止解除前置/违约金分工）保留，无语义丢失。</done>
</task>

</tasks>

<verification>
- 四个解雇子技能 + 解雇编排入口 + 四个竞业子技能 + 竞业编排入口全部存在且格式合规（共 10 个文件）
- 现有 termination-review 55 行内容（解雇原因四类、合法性检查、经济补偿计算、程序要求、风险评估）无丢失迁移并深化；non-compete-review 54 行五要点（人员范围、期限、补偿、范围、违约金）无丢失迁移并深化
- 已核实锚点（经济补偿N=第47条、违法解除2N=第87条、竞业23-24条）明确；不确定条号（第36/39/40/41/42/46/25条、补偿比例、三个月规则）均标 `[待验证]` 或地方性标记，无臆造条号
- 经济补偿计算清晰区分 N / N+1（代通知金）/ 2N（违法解除赔偿金）三情形
- 与 04-01 无 files_modified 重叠，可同 wave 并行
- JSON/YAML 合法性回归：`python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('employment-legal/**/*.json', recursive=True)]"`（本计划不改 json）
</verification>

<success_criteria>
- 律师/HR 可单独触发任一解雇子能力（4 个）与任一竞业子能力（4 个），各自有 frontmatter + 触发名
- 每个子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据，150+ 行实质内容
- 经济补偿 N/N+1/2N 三情形清晰区分，竞业人员范围/期限/补偿/可执行性/双向救济完整
- 劳动法律引用按 法条/案例/学说 分类并标待验证；已核实锚点明确呈现
- termination-review 与 non-compete-review 编排入口分别指向各自四个子技能且护栏无丢失
- 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定
</success_criteria>

<output>
Create `.planning/phases/04-employment-legal-core/04-02-SUMMARY.md` when done. 列出所有新建/修改文件路径。
</output>
