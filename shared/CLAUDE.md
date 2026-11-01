# Shared — 共享法律研究基础设施

本目录提供跨插件共享的法律研究基础设施，所有专项 skill 均可引用。

## 目录结构

```
shared/
├── CLAUDE.md                          # 本文件
├── ai-for-china-legal-workflow/       # 顶层自动路由（intake → 研究闸门 → 专项技能 → 文档交付）
├── legal-document-intake/             # 法律事项动态 Intake
│   ├── SKILL.md                       # 问题分档 / 两种提问方式 / INTAKE_DECISION / 执行档 / REVIEW_STATUS
│   └── references/                    # 问题路由、问卷文档模式、边界示例、操作员快速说明、多模型编排
├── research-gate/                     # 研究闸门（强制检索前置机制）
│   ├── SKILL.md                       # 研究闸门核心逻辑
│   └── references/
│       ├── authoritative-sources.md   # 实测可访问的权威来源 URL（含税务 / 信用 / 公告源）
│       ├── quality-gates.md           # 研究质量闸门
│       ├── search-playbooks.md        # 专项搜索策略（保函、管辖、信用修复、用工合规、股权尽调、存量土地变性）
│       └── source-policy.md           # 引用策略、原件与摘要规则、失败回退链
├── references/                        # 共享模板和 playbook
│   ├── README.md
│   ├── document-structures.md         # 诉讼文书结构模板；法律备忘录（致客户）骨架与写法
│   ├── guarantee-bond-playbook.md     # 保函/担保案件专用 playbook
│   ├── subject-qualification-traps.md # 主体资格陷阱清单
│   ├── due-diligence-playbook.md      # 尽调 / 合规调查数据结构与闸门
│   └── document-delivery-qa.md        # Word / PDF 交付 QA 清单；客户成稿模式与《成稿说明》
├── feedback-refinement/               # 律师反馈 → skill 精炼 → 案例库
├── inkstatute-integration/            # 墨律 ask_user 协议与 agent 体验记录
└── cross-platform/                    # 跨平台格式说明
```

### 尽职调查 / 合规调查

`commercial-legal/skills/equity-transaction-dd` 与 `employment-legal/skills/workforce-compliance-dd` 共用 `shared/references/due-diligence-playbook.md` 的资料清单、事实底稿、覆盖审计与问题清单结构；默认执行档 `critical`。

### 文档交付

任何 Word / PDF 交付前执行 `shared/references/document-delivery-qa.md`；`high` / `critical` 事项交付前输出 `legal-document-intake/SKILL.md` 规定的 `REVIEW_STATUS`。

律师要求「可以直接给客户」时，按该清单第 5 节交付客户成稿与《成稿说明（致承办律师）》两份文件：客户成稿正文不放内部标记，人审要求由《成稿说明》与 `REVIEW_STATUS` 承载；咨询型备忘录骨架见 `document-structures.md`。

### 存量土地变性与合作开发

`construction-legal/skills/land-use-redevelopment` 编排划拨补办出让、改变用途、价款与出让合同、土地进入项目公司与合作开发。锚点在 `construction-legal/skills/_shared/land-law-citations.md` 与 `local-rules-<city>.md`；国资锚点在 `commercial-legal/skills/_shared/transaction-procedure-citations.md` 第八节。国有企业主体或亿元级价款的，默认 `critical`。

## 使用规则

### 研究闸门

所有生成法律文书（诉讼方案、起诉状、合同审查、法律意见书、律师函件）的 workflow，**除非用户明确豁免联网检索**，必须先运行 `shared/research-gate/SKILL.md`。

运行顺序：
1. 读取 `shared/research-gate/SKILL.md`（核心逻辑）
2. 按需读取 `shared/research-gate/references/` 下的参考文档
3. 完成研究底稿后再进入专项文书生成

### 共享模板

专项 skill 生成文书时，应引用 `shared/references/document-structures.md` 中的结构模板，确保文书结构符合中国律师实务要求。

### 保函/担保案件

任何涉及保函、担保公司、融资担保公司的案件，**必须**同时引用：
- `shared/research-gate/references/search-playbooks.md`（保函搜索策略）
- `shared/references/guarantee-bond-playbook.md`（保函案件专用 playbook）
- `shared/references/subject-qualification-traps.md`（主体资格陷阱）

## 与各插件的关系

```
各插件 skill（litigation-legal, commercial-legal, 等）
         │
         ├── 第一步：shared/research-gate/SKILL.md（研究闸门）
         │
         └── 第二步：专项 skill 本身（文书生成）
                      │
                      └── 引用 shared/references/（结构模板、playbook）
```

研究闸门是**横切关注点**，不归属任何单一插件。所有插件共享同一套研究标准。
