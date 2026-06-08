# construction-legal

> 建设工程法律全流程辅助：冷启动访谈、施工合同审查、工程款争议处理、招投标合规、商品房买卖合同审查。

本插件已完整交付，包含 5 个编排入口和 20 个深度子技能，覆盖建设工程法律实务全流程。

## 实践配置文件

**`construction-legal/CLAUDE.md`** 是唯一真相来源，存储主体画像与项目组合、建设工程代理立场、风险矩阵、升级触发条件与文书风格偏好。

- 首次使用请运行 `/construction-legal:cold-start-interview` 初始化配置（约 10-15 分钟）
- 律师/法务可直接编辑 `construction-legal/CLAUDE.md`，无需重新运行访谈
- 所有子技能在执行实质性工作前先读取此文件

## 模块与子技能

### 1. 冷启动访谈（cold-start-interview）

初始化或更新 `construction-legal/CLAUDE.md` 实践配置档案。顺序调用四个访谈子技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| identity-project | 采集主体画像与项目组合（建设工程角色/项目类型/团队规模/可用集成） | `/construction-legal:identity-project` |
| review-stance | 采集整体代理立场（发包人/承包人/中立/购房人侧）、合同审查严格度、争议处理倾向及商品房审查立场 | `/construction-legal:review-stance` |
| risk-escalation | 采集风险等级定义、角色权限表、自动升级触发条件及诉讼/仲裁/优先受偿权行使触发规则 | `/construction-legal:risk-escalation` |
| style-local-rules | 采集文书风格、造价鉴定资源及地方建设主管部门规定偏好 | `/construction-legal:style-local-rules` |

### 2. 施工合同审查（contract-review）

全面覆盖主体资质、工期质量、价款结算、违约解除的施工合同审查链路：

| 子技能 | 功能 |
|-------|------|
| subject-qualification-validity | 承包人资质核查（施工总承包/专业资质/安全生产许可）、合同效力风险（未招标/违法分包/挂靠/黑白合同） |
| schedule-quality | 工期约定与顺延条件、竣工验收程序、质量标准与保修条款、工期质量违约责任分析 |
| price-settlement | 合同价款类型（固定总价/单价/成本加酬金）、进度款支付条件、结算依据与审核程序、价款调整机制 |
| breach-termination | 违约金约定与调整、法定/约定解除条件、解除后工程款结算与折价补偿、争议解决条款审查 |

### 3. 工程款争议处理（payment-dispute）

优先受偿权、黑白合同结算、质量抗辩反索赔、利息垫资的全流程争议处理：

| 子技能 | 功能 |
|-------|------|
| priority-payment-right | 行使条件与期限、折价/拍卖程序、与抵押权/其他债权的顺位、期限临近的自动预警 |
| settlement-basis-dual-contract | 黑白合同效力判断、以中标合同（白合同）作为结算依据的规则、无效合同折价补偿路径 |
| quality-defense-counterclaim | 发包人以质量问题抵扣工程款的抗辩评估、承包人反索赔（工期索赔/变更签证/赶工费）的材料准备 |
| interest-advance-funding | 工程款利息计算（拖欠利息/逾期付款利息起算）、垫资约定效力与利息主张、资金占用费的处理 |

### 4. 招投标合规（bidding-compliance）

必须招标范围到中标无效投诉的全流程合规审查：

| 子技能 | 功能 |
|-------|------|
| mandatory-bidding-scope | 工程项目必须招标的规模标准（国家+地方 `[地方 flagged]`）、依法必须招标但未招标的合同效力与法律责任 |
| bidding-procedure | 招标文件合规、资格预审、评标与定标程序、合同签订与备案、招标投标程序违规的法律后果 |
| collusion-fraud | 串通投标的认定标准与法律后果（中标无效/罚款/禁止参与招投标）、虚假材料投标的法律责任 |
| bid-invalidity-complaint | 中标无效的法定情形与处理、投诉举报程序（向招标投标监督管理机构）、中标无效后的合同处理与损失追偿 |

### 5. 商品房买卖合同审查（commercial-housing-review）

预售许可核查到贷款解除风险的商品房合同全流程审查：

| 子技能 | 功能 |
|-------|------|
| presale-license-subject | 五证逐项核查、预售许可证效力判定（含起诉前取得规则）、开发商主体资质（房地产开发企业资质/失信核查）、现售条件核查 |
| deposit-subscription | 认购书性质（预约/本约）、定金vs订金/诚意金区分、定金罚则（民法典第587条，建议复核）、认购书向正式合同转化、格式条款审查 |
| delivery-breach | 逾期交房/逾期办证违约责任、面积误差3%处理决策（描述规则，条号待验证）、质量与保修条款审查 |
| loan-termination-risk | 按揭不成的可归责vs不可归责分析、退房退款项目、一房二卖履行顺位与赔偿、网签备案/预告登记/不动产登记保护对比 |

## 主要斜杠命令

| 命令 | 用途 |
|-----|------|
| `/construction-legal:cold-start-interview` | 初始化或全量更新实践配置档案 |
| `/construction-legal:contract-review` | 施工合同审查（完整流程） |
| `/construction-legal:payment-dispute` | 工程款争议处理（完整流程） |
| `/construction-legal:bidding-compliance` | 招投标合规审查（完整流程） |
| `/construction-legal:commercial-housing-review` | 商品房买卖合同审查（完整流程） |

## 共享法律引用库

`construction-legal/skills/_shared/construction-law-citations.md` 是本插件的法律引用脊柱，包含：

- 民法典建设工程合同章（第788-808条）中度把握锚点（第788/799/807条已核实）
- 民法典合同编通则锚点（第533/563/583/584/585/586/587/588条，复用商事脊柱已核实结论）
- 建筑法、招标投标法、城市房地产管理法规则摘要（条号全部待验证）
- 施工合同司法解释(一)和商品房买卖合同司法解释规则描述（条号全部待验证）

> **司法解释条号提示**：建设工程施工合同司法解释与商品房买卖合同司法解释经历历次修订，具体条号易变。本插件中涉及司法解释具体条号的引用一律标有 `[待验证 — 司法解释条号易变，须核实现行版本]` 提示，请通过[国家法律法规数据库](https://flk.npc.gov.cn)或[最高人民法院官网](https://www.court.gov.cn)核实现行版本。

## 本插件不做什么

- 不提供法律意见或法律结论
- 不替代执业律师的判断
- 不保证审查的完整性
- 不自动发送解除通知、优先受偿权行使函件或诉讼材料
