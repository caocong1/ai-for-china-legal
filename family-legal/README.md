# family-legal

婚姻家事法律 AI 插件——五大模块二十个子技能，规则基于民法典婚姻家庭编（第1040-1118条）与继承编（第1119-1163条）。

## 模块与子技能

### 1. 冷启动访谈 `/family-legal:cold-start-interview`

初始化婚姻家事实践配置档案（`family-legal/CLAUDE.md`），顺序调用四个访谈子技能：

- **`/family-legal:identity-party-profile`** — 采集执业角色、当事人画像与可用集成资源（法院/民政/公证/鉴定/妇联）
- **`/family-legal:review-representation-stance`** — 配置代理立场（离婚一方/某继承人/遗嘱人/中立）、协议审查严格度与诉讼倾向
- **`/family-legal:sensitivity-escalation`** — 配置敏感度校准（家暴/未成年人/情绪危机/涉刑）与升级矩阵
- **`/family-legal:style-local-rules`** — 配置文书风格偏好与地方性规定（彩礼/房产分割/抚养费裁判口径）

### 2. 离婚协议起草 `/family-legal:divorce-agreement`

编排四个子技能，拟定完整离婚协议：

- **`/family-legal:property-division-clauses`** — 财产分割条款（共同财产/个人财产/房产/股权/隐匿财产救济保留条款）
- **`/family-legal:child-custody-visitation`** — 子女抚养权归属、抚养费与探望权（最有利于未成年子女原则，民法典第1084条）
- **`/family-legal:debt-handling`** — 夫妻共同债务认定（共债共签/家庭日常生活需要）与个人债务排除
- **`/family-legal:effectiveness-registration`** — 协议离婚程序（第1076条）、冷静期30日（第1077条）、可撤销路径

### 3. 继承权分析 `/family-legal:inheritance`

编排四个子技能，完成继承权全链分析：

- **`/family-legal:legal-succession-order`** — 法定继承顺序（第一/第二顺序，第1127条）、同顺序均等分配、丧偶儿媳女婿继承（第1129条）
- **`/family-legal:testate-succession-validity`** — 遗嘱继承效力（遗嘱优先于法定继承、数份遗嘱以最后为准、遗赠扶养协议优先，第1158条）
- **`/family-legal:estate-scope-debt`** — 遗产范围认定（第1122条）、夫妻共同财产析产后继承、遗产债务清偿上限（第1161条）
- **`/family-legal:subrogation-transmission`** — 代位继承（第1128条）、转继承、丧失继承权（第1125条）

### 4. 遗嘱起草 `/family-legal:will-drafting`

编排四个子技能，起草并核查遗嘱：

- **`/family-legal:will-form-selection`** — 遗嘱形式选择（自书/代书/打印/录音录像/口头/公证，第1134-1139条）
- **`/family-legal:testamentary-capacity-intent`** — 遗嘱能力与意思表示真实性（第1143条），精神状态评估
- **`/family-legal:content-reserved-share`** — 遗嘱处分范围、必留份安排（第1141条）、附义务遗嘱（第1144条）
- **`/family-legal:witnessing-effectiveness`** — 见证人资格（第1140条）、各形式生效要件、遗产管理人（第1145条）

### 5. 财产分割方案 `/family-legal:property-division`

编排四个子技能，制定财产分割方案：

- **`/family-legal:community-property-identification`** — 夫妻共同财产认定（第1062条）、个人财产边界（第1063条）、约定财产制（第1065条）
- **`/family-legal:special-asset-division`** — 房产（婚前购买/父母出资/按揭增值/加名）、股权、知识产权收益、养老金等特殊财产
- **`/family-legal:division-principles-care`** — 照顾子女/女方/无过错方原则（第1087条）、家务补偿（第1088条）、经济帮助（第1090条）、离婚损害赔偿（第1091条）
- **`/family-legal:concealed-asset-remedy`** — 隐藏转移挥霍共同财产少分不分（第1092条）、调查令/财产保全申请

## 实践配置文件与冷启动流程

所有技能从 `family-legal/CLAUDE.md` 读取实践配置，包括代理立场、敏感度校准、文书风格和地方性规定。首次使用前运行：

```bash
/family-legal:cold-start-interview
```

访谈完成后结果填入 `family-legal/CLAUDE.md`，后续可直接编辑该文件或只更新某章节：

```bash
# 只更新代理立场（如更换代理事项立场）
/family-legal:review-representation-stance
```

配置文件字段契约见 `family-legal/skills/_shared/practice-profile-schema.md`。

## 敏感度护栏

婚姻家事事项高度敏感，以下护栏**凌驾于代理立场之上**，任何立场不得覆盖：

| 情形 | 处理 |
|------|------|
| 家庭暴力/虐待/遗弃（确认或疑似） | 优先人身安全 → 提示保护令路径 → 强制升级律师 |
| 涉刑事（重婚/虐待罪/遗弃罪/拒执罪） | 暂停常规分析 → 强制升级刑事律师 |
| 未成年人重大利益受损 | 最有利于未成年子女原则（第1084条）→ 强制升级 |
| 当事人情绪危机 | 暂停法律分析 → 提示心理支持资源 |
| 协议离婚生效前/遗嘱定稿前（非律师） | 暂停 → 须律师审核后继续 |

## 法律依据

- **民法典婚姻家庭编**：第1040-1118条（夫妻财产、离婚条件、子女抚养、损害赔偿）
- **民法典继承编**：第1119-1163条（遗产范围、法定继承、遗嘱继承、遗赠扶养协议）
- **反家庭暴力法**：人身安全保护令相关条款（具体条号 `[待验证]`）
- **妇女权益保障法**：婚姻家庭财产权利相关规定（具体条号 `[待验证]`）
- **最高人民法院婚姻家庭编司法解释**：具体适用规则（条号 `[待验证 — 司法解释条号易变，须核实现行版本]`）
