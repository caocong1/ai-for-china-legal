---
phase: 06-ip-legal
plan: 02
subsystem: ip-legal
tags:
  - patent-analysis
  - copyright-registration
  - sub-skills
  - orchestration
dependency_graph:
  requires:
    - 06-01 (_shared/legal-basis-conventions.md, _shared/ip-law-citations.md, _shared/practice-profile-schema.md, ip-legal/CLAUDE.md)
  provides:
    - ip-legal/skills/patent-analysis/claim-construction/SKILL.md
    - ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md
    - ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md
    - ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md
    - ip-legal/skills/patent-analysis/SKILL.md (updated to orchestrator)
    - ip-legal/skills/copyright-registration/work-type-determination/SKILL.md
    - ip-legal/skills/copyright-registration/ownership-determination/SKILL.md
    - ip-legal/skills/copyright-registration/registration-materials/SKILL.md
    - ip-legal/skills/copyright-registration/registration-process/SKILL.md
    - ip-legal/skills/copyright-registration/SKILL.md (updated to orchestrator)
  affects:
    - 06-03 (ip-clearance and cold-start-interview可调用本plan子技能)
tech_stack:
  added: []
  patterns:
    - 四层子技能体系（编排入口 + 四个可独立触发子技能）
    - ip-law-citations _shared 引用脊柱（统一 IP 法条引用）
    - 自动保护/自愿登记原则明确区分（著作权 vs 商标/专利产生方式）
key_files:
  created:
    - ip-legal/skills/patent-analysis/claim-construction/SKILL.md
    - ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md
    - ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md
    - ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md
    - ip-legal/skills/copyright-registration/work-type-determination/SKILL.md
    - ip-legal/skills/copyright-registration/ownership-determination/SKILL.md
    - ip-legal/skills/copyright-registration/registration-materials/SKILL.md
    - ip-legal/skills/copyright-registration/registration-process/SKILL.md
  modified:
    - ip-legal/skills/patent-analysis/SKILL.md (改为编排入口)
    - ip-legal/skills/copyright-registration/SKILL.md (改为编排入口)
decisions:
  - 专利侵权判定核心方法论（全面覆盖+等同原则）来自专利侵权司法解释，采用「描述规则不写裸条号」策略，以防止因2020/2021修正条号重排导致的引用错误
  - 等同原则判断时间基准明确为侵权行为发生时（而非专利申请日），符合司法实践
  - 著作权保护期（自然人终生+死后50年；法人/视听作品首次发表后50年）因规则稳定，标「建议复核」而非「待验证」
  - 软件著作权登记与一般作品登记分为两条路径，分别对应《计算机软件著作权登记办法》和《作品自愿登记办法》
  - 委托作品权属默认归受托人（无约定时），明确警示委托方须书面约定以获得著作权
  - 合法来源抗辩「仅免赔不免停止侵害」的限制在 prior-art-defense 中明确说明
metrics:
  duration_minutes: 35
  completed_date: "2026-06-05"
  task_count: 4
  file_count: 10
---

# Phase 06 Plan 02: 专利侵权初步分析与著作权登记深层子技能体系 Summary

**一行总结**：将 patent-analysis（专利侵权初步分析）与 copyright-registration（著作权登记）从扁平浅骨架（各~18行）深化为各含四个可独立触发子技能+编排入口的完整子技能体系，专利侵权方法论采用司法解释描述规则不写裸条号，著作权保护期与自愿登记原则明确，合计创建8个子技能文件+更新2个编排入口，共10个文件。

---

## 完成的任务

| 任务 | 名称 | 提交 | 关键文件 |
|-----|------|------|---------|
| Task 1 | 拆分 patent-analysis 为四个可独立触发的子技能 | dd7e740 | claim-construction/SKILL.md, all-elements-rule/SKILL.md, doctrine-of-equivalents/SKILL.md, prior-art-defense/SKILL.md |
| Task 2 | 改造 patent-analysis/SKILL.md 为编排入口 | a2085bc | patent-analysis/SKILL.md |
| Task 3 | 拆分 copyright-registration 为四个可独立触发的子技能 | dee6d3a | work-type-determination/SKILL.md, ownership-determination/SKILL.md, registration-materials/SKILL.md, registration-process/SKILL.md |
| Task 4 | 改造 copyright-registration/SKILL.md 为编排入口 | 1fabc22 | copyright-registration/SKILL.md |

---

## 新建/修改文件列表

### 新建文件（8个）

| 文件路径 | 非空行数 | 核心内容 |
|---------|---------|---------|
| `ip-legal/skills/patent-analysis/claim-construction/SKILL.md` | 205 | 专利信息收集 + 权利要求解读 + 技术特征拆解（A+B+C+D格式）+ 被诉方案特征提取 + 综合比对表制作 |
| `ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md` | 164 | 全面覆盖原则字面侵权判断（技术特征逐一比对、缺一不可原则、多余指定原则已废止、增加特征不影响侵权认定） |
| `ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md` | 231 | 等同原则三要素（手段-功能-效果基本相同+普通技术人员可联想）+ 禁止反悔原则检查 + 捐献原则检查 |
| `ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md` | 240 | 现有技术抗辩 + 先用权抗辩 + 不侵权抗辩 + 专利权稳定性初判 + 专利侵权初步综合意见 |
| `ip-legal/skills/copyright-registration/work-type-determination/SKILL.md` | 211 | 独创性判断 + 法定作品类型认定（14类）+ 思想表达二分法应用 + 不受保护对象识别 + AI生成内容标注 |
| `ip-legal/skills/copyright-registration/ownership-determination/SKILL.md` | 203 | 创作者原始取得 + 职务作品（一般vs特殊对比表）+ 委托作品（无约定归受托人）+ 法人作品三要件 + 合作作品分割性 |
| `ip-legal/skills/copyright-registration/registration-materials/SKILL.md` | 172 | 按作品类型材料清单（文字/美术/摄影/视听/软件）+ 软件著作权特殊材料（源程序前后30页）+ 权属证明材料 |
| `ip-legal/skills/copyright-registration/registration-process/SKILL.md` | 219 | 自愿登记原则 + 初步证据效力（非确权）+ 登记流程步骤表 + 著作权保护期 + 登记后变更/补充/撤销 + 著作权登记综合方案 |

### 修改文件（2个）

| 文件路径 | 非空行数 | 改造内容 |
|---------|---------|---------|
| `ip-legal/skills/patent-analysis/SKILL.md` | 103 | 原浅骨架（18行）→ 编排入口：子技能顺序表 + 临时模式 + 初步分析免责 + 专利类型识别 + 行业识别 + FTO清权衔接 |
| `ip-legal/skills/copyright-registration/SKILL.md` | 105 | 原浅骨架（18行）→ 编排入口：子技能顺序表 + 临时模式 + 自愿登记原则提示 + 著作权策略加载 + 行业识别 + 清权衔接 |

---

## 关键决策与法律内容处理

### 专利侵权方法论
- **全面覆盖原则**与**等同原则**（手段-功能-效果三要素 + 本领域普通技术人员无需创造性劳动可联想）：来自专利侵权司法解释，全程「描述规则不写裸条号」，符合 CONTEXT 纪律
- **专利法第42条**（专利权期限：发明20年/实用新型10年/外观设计15年，自申请日）：标「已核实锚点（中度把握），建议复核」
- **禁止反悔原则**与**捐献原则**：作为等同原则的限制，详细步骤化处理（审查历史文档核查 + 说明书记载核查）
- **合法来源抗辩**：明确「仅免赔不免停止侵害」，防止用户误用

### 著作权登记规则
- **著作权保护期**（自然人终生+死后50年；法人/视听作品首次发表后50年）：规则稳定，标「建议复核」
- **自愿登记原则**与**自动保护**：在编排入口与 registration-process 子技能中双重说明，防止用户误认为须先登记才有保护
- **委托作品权属**：无约定时默认归受托人（创作者）——对委托方的常见陷阱明确警示
- **软件著作权**：单独路径（《计算机软件著作权登记办法》）与一般作品分开处理，样本要求标 `[待验证]`

### 法律依据引用规范
- 所有引用均遵循 `ip-legal/skills/_shared/legal-basis-conventions.md` 与 `ip-law-citations.md`
- 司法解释规则：全程描述规则，不写裸条号
- 中度把握锚点（专利法第42条/著作权保护期/自愿登记）：标「建议复核」
- 其余具体条号：统一标 `[待验证 — IP 法修正后条号重排，须核实现行版本]`
- 案例：占位结构，统一标 `[待验证]`

---

## 偏差记录

无 — 计划按原定规格执行。

（注：06-01 并行产出的 _shared 文件已按预期可用，子技能中的引用路径声明正确。）

---

## 自我检查

### 创建文件存在性验证

```
FOUND: ip-legal/skills/patent-analysis/claim-construction/SKILL.md
FOUND: ip-legal/skills/patent-analysis/all-elements-rule/SKILL.md
FOUND: ip-legal/skills/patent-analysis/doctrine-of-equivalents/SKILL.md
FOUND: ip-legal/skills/patent-analysis/prior-art-defense/SKILL.md
FOUND: ip-legal/skills/patent-analysis/SKILL.md
FOUND: ip-legal/skills/copyright-registration/work-type-determination/SKILL.md
FOUND: ip-legal/skills/copyright-registration/ownership-determination/SKILL.md
FOUND: ip-legal/skills/copyright-registration/registration-materials/SKILL.md
FOUND: ip-legal/skills/copyright-registration/registration-process/SKILL.md
FOUND: ip-legal/skills/copyright-registration/SKILL.md
```

### 提交哈希存在性验证

```
FOUND: dd7e740 (Task 1: patent-analysis 四个子技能)
FOUND: a2085bc (Task 2: patent-analysis 编排入口)
FOUND: dee6d3a (Task 3: copyright-registration 四个子技能)
FOUND: 1fabc22 (Task 4: copyright-registration 编排入口)
```

## Self-Check: PASSED
