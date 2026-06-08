---
name: cold-start-interview
description: 刑事合规冷启动访谈——编排入口，顺序调用四个访谈子技能（身份与企业画像→合规立场与服务范围→风险与升级矩阵→文书风格与监管资源），初始化并填充 criminal-compliance/CLAUDE.md 对应散文章节（非独立 YAML）。也可单独触发任一子技能更新特定章节。
argument-hint: "[可选：企业名称或业务简述，访谈将系统采集所有配置]"
---

# 冷启动访谈 — 刑事合规实践配置文件初始化

> 本技能编排四个可独立触发的访谈子技能，顺序初始化 `criminal-compliance/CLAUDE.md`。律师/合规官/法务可运行完整访谈，也可单独触发某一子技能更新特定章节。

---

## 目的

**冷启动访谈**是刑事合规工作的起点，通过系统化访谈采集企业的身份画像、服务立场、风险矩阵与文书风格，将结果填充到 `criminal-compliance/CLAUDE.md` 的对应散文章节，使所有后续刑事合规技能能够读取个性化配置、按立场调整侧重与护栏。

**访谈结果填充 `criminal-compliance/CLAUDE.md` 对应散文章节，非独立 YAML 文件。**

---

## 访谈子技能顺序表

| 步骤 | 子技能 | 路径 | 斜杠命令 | 可单独触发 | 填充章节 |
|-----|-------|------|---------|---------|---------|
| 1 | 身份与企业画像 | `skills/cold-start-interview/identity-enterprise-profile/SKILL.md` | `/criminal-compliance:identity-enterprise-profile` | 是 | `## 我们是谁` / `## 谁在使用` / `## 可用集成` |
| 2 | 合规立场与服务范围 | `skills/cold-start-interview/compliance-stance-scope/SKILL.md` | `/criminal-compliance:compliance-stance-scope` | 是 | `## 合规与服务立场`（整体立场 + 合规严格度 + 是否已涉案） |
| 3 | 风险与升级矩阵 | `skills/cold-start-interview/risk-escalation/SKILL.md` | `/criminal-compliance:risk-escalation` | 是 | `## 刑事风险校准` / `## 升级矩阵` / `## 共享护栏`（涉刑强制升级 + 合规边界） |
| 4 | 文书风格与监管资源 | `skills/cold-start-interview/style-regulatory-resources/SKILL.md` | `/criminal-compliance:style-regulatory-resources` | 是 | `## 文书风格` / `## 输出` / `## 共享护栏`（地方试点提示） |

---

## 写入 `criminal-compliance/CLAUDE.md` 说明

> **访谈结果填充 `criminal-compliance/CLAUDE.md` 的散文章节，不创建独立 YAML 文件。**

`criminal-compliance/CLAUDE.md` 是刑事合规实践配置的**唯一真相来源**，所有 criminal-compliance 技能从此文件读取立场与配置。

访谈子技能完成后，将采集结果写入 CLAUDE.md 对应章节（`##` 标题锚点），保持章节结构不变，避免破坏技能的章节定位读取。

---

## 运行模式

**完整访谈流程（推荐首次使用）**：依次运行步骤1→2→3→4，全面初始化 `criminal-compliance/CLAUDE.md`。

**单独更新某部分**：针对配置变化（如服务立场改变、新增地区经营），单独触发对应子技能更新特定章节：
- 更新企业画像：`/criminal-compliance:identity-enterprise-profile`
- 更新服务立场：`/criminal-compliance:compliance-stance-scope`（服务立场或是否已涉案变化时优先运行）
- 更新风险矩阵：`/criminal-compliance:risk-escalation`
- 更新文书风格：`/criminal-compliance:style-regulatory-resources`

**直接编辑**：律师/合规官/法务可直接编辑 `criminal-compliance/CLAUDE.md`，无需重新运行访谈。编辑时须保持章节结构（`##` 标题）不变。

**版本控制与回滚**：

```bash
# 查看历史版本
git log criminal-compliance/CLAUDE.md

# 对比变更
git diff HEAD~1 HEAD -- criminal-compliance/CLAUDE.md

# 回滚到特定版本
git checkout <commit-hash> -- criminal-compliance/CLAUDE.md
```

---

## 护栏说明

### 写入前确认护栏

每个访谈子技能在写入 CLAUDE.md 前，均向用户回显将写入的内容并请求确认，避免误写。

### 用户陈述法律事实合理性检查

当用户在访谈中提供具体罪名条号、定罪量刑数额、期限等时：

- **具体罪名条号**：标 `[待验证]`，以构成要件描述记录，不写裸条号
- **定罪量刑数额**：描述规则并标 `[待验证]`，不写裸数额（数额依司法解释，快速变化）
- **涉案企业合规规范性文件文号**：描述规则并标 `[待验证 — 规范性文件快速演进]`，不写具体文号

检查提示：

> 你提到 [X]；具体罪名条号/数额/文号须以现行法律/司法解释/规范性文件核实，建议以构成要件描述/规则描述方式记录，标 `[待验证]`。

### 合规预防与辩护立场护栏

所有输出立足于帮助企业事前预防刑事风险、涉案后依法合规整改争取从宽，不作有罪无罪的最终结论。

---

## 法律引用说明

- 刑法总则中度把握锚点（第30/31条等）标「建议复核」
- 各具体罪名条号一律 `[条号待验证]`，以构成要件描述呈现
- 涉案企业合规规范性文件描述规则并标 `[待验证 — 规范性文件快速演进，须核实现行版本]`
- 案例案号一律 `[待验证]`，不具判例法约束力

验证资源：
- 国家法律法规数据库：https://flk.npc.gov.cn
- 最高人民检察院官网：https://www.spp.gov.cn
