---
phase: 08-family-legal
plan: "01"
subsystem: family-legal
tags:
  - citation-spine
  - practice-profile
  - divorce-agreement
  - sub-skills
  - family-law
  - china-law
dependency_graph:
  requires:
    - construction-legal/skills/_shared/legal-basis-conventions.md (结构参照)
    - commercial-legal/skills/_shared/civil-code-contract-citations.md (合同编通则锚点参照)
  provides:
    - family-legal/skills/_shared/legal-basis-conventions.md
    - family-legal/skills/_shared/family-law-citations.md
    - family-legal/skills/_shared/practice-profile-schema.md
    - family-legal/CLAUDE.md
    - family-legal/skills/divorce-agreement/property-division-clauses/SKILL.md
    - family-legal/skills/divorce-agreement/child-custody-visitation/SKILL.md
    - family-legal/skills/divorce-agreement/debt-handling/SKILL.md
    - family-legal/skills/divorce-agreement/effectiveness-registration/SKILL.md
    - family-legal/skills/divorce-agreement/SKILL.md (编排入口)
  affects:
    - family-legal (插件，后续 08-02/08-03 直接复用 _shared 脊柱与 CLAUDE.md)
tech_stack:
  added:
    - family-legal/skills/_shared (共享引用脊柱目录，新建)
    - family-legal/skills/divorce-agreement/<sub-skill> (子技能目录结构，新建)
  patterns:
    - 婚姻家事法律引用规范（来源分类/来源标签/待验证/司法解释保守标注/旧法条号迁移警示）
    - 实践配置文件契约（散文 CLAUDE.md 单一真相来源，字段映射，技能读取契约）
    - 深层子技能结构（frontmatter/目的/前置/详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据）
    - 婚姻家事高敏感护栏（家暴强制升级/未成年人利益最大化/情绪护栏/律师审查护栏）
key_files:
  created:
    - family-legal/skills/_shared/legal-basis-conventions.md
    - family-legal/skills/_shared/family-law-citations.md
    - family-legal/skills/_shared/practice-profile-schema.md
    - family-legal/CLAUDE.md
    - family-legal/skills/divorce-agreement/property-division-clauses/SKILL.md
    - family-legal/skills/divorce-agreement/child-custody-visitation/SKILL.md
    - family-legal/skills/divorce-agreement/debt-handling/SKILL.md
    - family-legal/skills/divorce-agreement/effectiveness-registration/SKILL.md
  modified:
    - family-legal/skills/divorce-agreement/SKILL.md (浅骨架改造为编排入口)
decisions:
  - 婚姻家事版引用脊柱以 construction-legal 同名文件为最新骨架改编，增加旧法条号→民法典新条号迁移警示章节（原婚姻法/继承法→民法典对照，禁止回退旧法）
  - practice-profile-schema 沿用 CLAUDE.md 散文单一真相来源，不引入冲突 YAML/JSON 格式；纠正现有访谈「生成 YAML 格式」表述
  - family-legal/CLAUDE.md 新增 ## 敏感度校准 章节（婚姻家事特有），高敏感度护栏（家暴/未成年人/情绪危机/涉刑）凌驾于代理立场之上
  - divorce-agreement 四个子技能每个 200+ 行，夫妻共同债务认定（司法解释规则描述规则不写裸条号）、协议可撤销（复用合同编结构，标复用商事脊柱）均严格遵循保守标注纪律
metrics:
  duration: "约 30 分钟"
  completed_date: "2026-06-05"
  tasks_completed: 4
  tasks_total: 4
  files_created: 8
  files_modified: 1
---

# Phase 08 Plan 01: 婚姻家事引用脊柱 + 实践配置模板 + 离婚协议起草子技能拆分 Summary

民法典婚姻家庭编/继承编引用脊柱 + 实践配置模板（新建 family-legal/CLAUDE.md）+ 离婚协议起草拆分为四个独立触发子技能（208-230 行深度），高敏感护栏（家暴/未成年人/情绪危机）贯穿全体。

---

## 完成内容

### Task 1: 建立婚姻家事法律引用脊柱

**新建 `family-legal/skills/_shared/legal-basis-conventions.md`**（152行）：

- 来源分类：法条（民法典婚姻家庭编/继承编/妇女权益保障法/未成年人保护法/反家庭暴力法）/ 司法解释 / 案例 / 学说
- 来源标签表：复用五个标准标签，不新造冲突标签
- 待验证标记规则：触发情形表（含司法解释条号/抚养费数值/彩礼比例/案号等均须标待验证）
- 司法解释具体条号保守标注：修订说明表 + 保守标注规则（中度把握锚点 + 规则类描述规则表）
- **旧法条号→民法典新条号迁移警示**（新增章节）：迁移对照表（原婚姻法第17/18/32条→现第1062/1063/1079条；原继承法第3/10/19条→现第1122/1127/1141条）+ 严禁回退旧法纪律
- 成文法优先与案例定位：明确指导性案例不具判例法约束力
- 法院层级与机构定位：家事审判庭/民政婚姻登记/公证/不动产登记/妇联反家暴庇护/司法鉴定
- 引用最小格式汇总表 + 验证资源

**新建 `family-legal/skills/_shared/family-law-citations.md`**（约250行）：

按 A/B/C/D/E/F/G 七部分分类组织：
- A：民法典婚姻家庭编核心条文——中度把握锚点（第1062/1063/1065/1086/1087/1088/1090/1091/1092/1076/1077/1084/1079条，均标「建议复核」）+ 完整规则摘要
- B：民法典继承编核心条文——中度把握锚点（第1122/1125/1127/1128/1129/1130条 + 遗嘱形式第1134-1139条 + 第1140/1141/1142/1143/1144/1145/1160/1161/1158条，把握充分标「建议复核」，不足降级描述规则）
- C：妇女权益保障法（相关规则，条号一律待验证）
- D：合同编通则锚点（仅用于离婚协议本质为合同的可撤销/解除结构参照，标「复用商事合同脊柱结论，建议复核」，严禁错套婚姻家庭编实体规则）
- E：司法解释规则（共同债务认定三路径/离婚损害赔偿适用/房产婚后还贷增值/彩礼返还/必留份计算/遗产债务清偿，均描述规则，条号一律待验证）
- F：案例占位结构（共同财产认定/共同债务认定/离婚损害赔偿/遗嘱效力四类占位，含案号填写说明）
- G：学说占位结构（婚前房产增值性质/共同债务认定标准/必留份计算方法三争议）
- 中度把握锚点汇总表（22个锚点全覆盖）+ 引用库使用说明 + 更新规则

**关键法律引用纪律遵守**：
- 中度把握锚点（婚姻家庭编 1062/1063/1065/1076/1077/1079/1084/1088/1090/1091；继承编 1122/1127/1134-1139/1141/1158）全部明确标注「建议复核」
- 司法解释规则（共同债务/房产还贷增值/彩礼返还/必留份计算）一律描述规则不写裸条号
- 无旧法条号（未出现原婚姻法第17/18/32条或原继承法第3/10/19条）
- 无错套合同编条号到婚姻家庭编实体规则
- 案例案号一律占位 + 待验证

---

### Task 2: 建立婚姻家事版实践配置契约 + 新建 family-legal/CLAUDE.md

**新建 `family-legal/CLAUDE.md`**（约200行，首次创建）：

- 顶部：敏感性提示（婚姻家事高度敏感，含家暴/未成年人利益/人身安全）+ 时效性提示（司法解释修订）
- `## 我们是谁`：执业角色与当事人画像，含执业角色分类（婚姻家事律师/法务/当事人本人/无律师当事人）、主要事项类型、典型财产构成
- `## 谁在使用`：角色选项 + 非律师角色双提示（常规升级 + 婚姻家事特别提示含家暴情形）
- `## 可用集成`：法院家事审判庭/民政婚姻登记（冷静期）/公证/不动产登记/司法鉴定/妇联反家暴庇护
- `## 审查与代理立场`：整体代理立场（离婚一方侧主张方/被主张方/某继承人侧/遗嘱人侧/中立）+ 立场说明表 + 协议审查严格度（保守/平衡/进取）+ 诉讼倾向
- `## 敏感度校准`（婚姻家事特有）：家暴识别等级/涉未成年子女/情绪危机等级/涉刑风险 + 敏感度等级与处理策略表
- `## 风险校准`：四级风险（🔴/🟠/🟡/🟢）+ 婚姻家事典型触发情形
- `## 升级矩阵`：角色权限表 + 强制升级触发条件（家暴/未成年人/涉刑/重大财产/协议生效前/遗嘱定稿前/收到诉讼）+ 诉讼/保护令/公证触发表
- `## 文书风格`：离婚协议/继承分析/遗嘱/财产分割/律师函风格
- `## 输出`：律师/非律师双版工作产物标题 + 审查者注释块（含司法解释条号待验证提示与敏感性提示）+ 下一步决策树（10选项）
- `## 共享护栏`：情绪护栏/未成年人利益最大化/家暴识别与人身安全/律师审查护栏/时效性触发/验证用户法律事实（旧法条号自动纠正）/来源标签规范/目的地特权检查/地方性规定提示（彩礼/房产/抚养费地区差异）

**新建 `family-legal/skills/_shared/practice-profile-schema.md`**（约180行）：

- 配置文件是什么/真相来源：CLAUDE.md 散文单一真相来源，架构决策（不引入冲突新格式），纠正访谈「YAML 格式」表述
- 字段映射表（14个字段组 → CLAUDE.md 章节 → 读取技能，含敏感度校准字段组为婚姻家事特有）
- 技能读取契约：标准读取流程 + 配置缺失提示（含临时模式敏感度警示）+ 临时模式默认值表（敏感度默认最高为婚姻家事特有）
- 代理立场选择（离婚一方侧/某继承人侧/遗嘱人侧/中立）：立场读取规则表 + 缺失时处理 + **立场边界（未成年人护栏与家暴护栏不可被立场覆盖）**
- 敏感情形与强制升级契约（婚姻家事特有）：8种情形触发表 + 强制升级输出格式
- 重跑/编辑/版本控制
- 法律事实合理性检查（7种触发情形，含旧法条号自动纠正、司法解释条号标待验证）
- Schema 与 CLAUDE.md 章节对照表

---

### Task 3: 拆分 divorce-agreement 为四个可独立触发子技能

**新建 `property-division-clauses/SKILL.md`**（208行）：

- 前置：代理立场区分（主张方关注共同财产足额分割/追查隐匿；被主张方关注个人财产剥离/合理折价）
- 详细步骤：(1)共同财产清单梳理表（8类财产/权属性质/证明材料）(2)个人财产清单梳理表(3)各类财产分割条款拟定（房产/存款/股权/投资/知识产权收益）(4)隐瞒财产救济保留条款（第1092条）
- 法律依据：第1062/1063/1065/1087/1092条（均建议复核）+ 房产还贷增值（司法解释描述规则）+ 案例占位

**新建 `child-custody-visitation/SKILL.md`**（230行）：

- 未成年人利益最大化护栏贯穿全程（不可被代理立场覆盖）
- 详细步骤：(1)子女基本情况核查表(2)抚养权归属分析（三年龄段法定原则+8因素综合考量表）(3)抚养费标准与支付安排（金额/支付方式/大额费用分担/调整机制）(4)探望权安排（频率/时长/假期/接送/通讯）(5)变更抚养关系情形
- 家暴/抢夺藏匿子女强制升级（🔴关键）
- 法律依据：第1084/1086条（建议复核）+ 未成年人保护法/反家庭暴力法（条号待验证）

**新建 `debt-handling/SKILL.md`**（209行）：

- 关键纪律：共同债务认定司法解释规则描述规则不写裸条号
- 详细步骤：(1)债务类型识别分类表（6类）(2)共同债务认定三路径（共债共签/家庭日常生活需要/超出举证责任）(3)个人债务情形表(4)对外清偿与内部分担（两层约定结构：内部分担+对外效力局限说明）(5)虚构债务识别（识别信号+第1092条处理）
- 法律依据：第1087/1092条（建议复核）+ 夫妻共同债务认定规则（司法解释描述规则，条号待验证）

**新建 `effectiveness-registration/SKILL.md`**（214行）：

- 详细步骤：(1)协议离婚三要素核查（自愿+书面四项+民政登记）(2)冷静期时间轴图示（30日撤回+30日申请发证）(3)协议反悔可撤销情形（欺诈/胁迫/重大误解/显失公平，复用合同编结构参照，标「复用商事脊柱，建议复核」）(4)财产分割协议与离婚登记关联效力（以登记完成为生效条件）(5)协议不成转诉讼路径（家事调解/诉讼离婚比较表）
- 家暴情形：无需冷静期直接诉讼，同时申请人身安全保护令，强制升级
- 法律依据：第1076/1077/1079条（建议复核）+ 反家庭暴力法（条号待验证）+ 合同编可撤销结构参照

---

### Task 4: 改造 divorce-agreement/SKILL.md 为编排入口

**修改 `family-legal/skills/divorce-agreement/SKILL.md`**（浅骨架16行→201行编排入口）：

- 顶部迁移说明（指向四个子技能路径），无语义丢失
- 实践配置加载（读取 family-legal/CLAUDE.md，缺失时标准提示）+ 临时模式（敏感度默认最高）
- 当事人画像确认（5项询问，含敏感情形优先识别）
- 代理立场加载表 + 立场缺失处理（不得自行假设立场单方输出）
- 入口级强制升级护栏（家暴/涉刑/未成年人重大利益/重大财产隐匿，含标准升级输出格式）
- 子技能编排顺序表（4子技能+路径+单独触发命令）
- 当事人情绪护栏（中立克制/危机信号识别/不判断对错）
- 未成年人利益最大化护栏（不可被立场覆盖）
- 协议不成转诉讼路径提示（家事调解/诉讼离婚，家暴直接诉讼）
- 目的地/特权检查 + 地方性规定提示（彩礼/房产/抚养费/民政操作流程地方差异）

---

## 偏差与自动修正

无 — 计划按预期执行，无需修正。

---

## 已知 Stubs

无 — 所有四个子技能均为完整实质性内容（208-230行），无数据空值流向 UI 或占位文本作为主要输出。案例/学说使用明确标注为「占位结构」的占位，已在技能内明确告知用户须填入真实案号后使用，不属于阻碍技能目标的 Stub。

---

## Threat Flags

无新增安全威胁面——本计划创建的全部文件为提示词/技能定义文件（.md），不引入网络端点、身份认证路径、文件系统访问或数据库 Schema 变更。

---

## 法律引用质量自检

- 旧法条号排除：已全文搜索，未发现原婚姻法（第17/18/32条等）或原继承法（第3/10/19条等）条号
- 中度把握锚点：22个锚点全部标注「建议复核」，未超出 family-law-citations.md 锚点范围
- 司法解释条号：共同债务认定、房产还贷增值、彩礼返还、必留份计算均以描述规则呈现，无裸条号
- 合同编锚点：仅用于协议可撤销/解除结构参照，明确标「复用商事脊柱」，未错套到婚姻家庭编实体规则
- 案例：全部为占位结构 + 待验证标注
- 待验证标记：司法解释具体条号、案例案号、数值（抚养费比例/彩礼）均标 `[待验证]`

---

## 提交记录

| 提交哈希 | 任务 | 主要内容 |
|---------|------|---------|
| deb320e | Task 1 | 婚姻家事法律引用脊柱（引用规范 + 民法典婚姻家庭编/继承编引用库） |
| 6d0b38d | Task 2 | 新建 family-legal/CLAUDE.md + 婚姻家事版配置契约 |
| da7f691 | Task 3 | 四个 divorce-agreement 子技能（财产分割/子女抚养/债务处理/协议生效） |
| 3978558 | Task 4 | divorce-agreement/SKILL.md 改造为编排入口 |

---

## Self-Check: PASSED

所有创建文件均存在：

- ✓ family-legal/skills/_shared/legal-basis-conventions.md
- ✓ family-legal/skills/_shared/family-law-citations.md
- ✓ family-legal/skills/_shared/practice-profile-schema.md
- ✓ family-legal/CLAUDE.md
- ✓ family-legal/skills/divorce-agreement/property-division-clauses/SKILL.md (208行)
- ✓ family-legal/skills/divorce-agreement/child-custody-visitation/SKILL.md (230行)
- ✓ family-legal/skills/divorce-agreement/debt-handling/SKILL.md (209行)
- ✓ family-legal/skills/divorce-agreement/effectiveness-registration/SKILL.md (214行)
- ✓ family-legal/skills/divorce-agreement/SKILL.md (编排入口，201行)

所有提交均存在：deb320e, 6d0b38d, da7f691, 3978558
