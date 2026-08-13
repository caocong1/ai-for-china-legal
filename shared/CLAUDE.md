# Shared — 共享法律研究基础设施

本目录提供跨插件共享的法律研究基础设施，所有专项 skill 均可引用。

## 目录结构

```
shared/
├── CLAUDE.md                          # 本文件
├── research-gate/                     # 研究闸门（强制检索前置机制）
│   ├── SKILL.md                       # 研究闸门核心逻辑
│   └── references/
│       ├── authoritative-sources.md   # 实测可访问的权威来源 URL
│       ├── official-source-routing.md # 十个官方库路由与效力纪律
│       ├── agentic-search-routing.md  # 复杂问题检索加宽
│       ├── quality-gates.md           # 研究质量闸门
│       ├── search-playbooks.md        # 专项搜索策略（保函、管辖等）
│       └── source-policy.md           # 引用策略和失败回退链
├── legal-reasoning/                   # 法律推理调度（横切，不替代领域插件）
│   └── SKILL.md
└── references/                        # 共享模板和 playbook
    ├── README.md
    ├── document-structures.md         # 诉讼/合同/意见书/函件结构模板
    ├── guarantee-bond-playbook.md     # 保函/担保案件专用 playbook
    ├── subject-qualification-traps.md # 主体资格陷阱清单
    └── contract-review-quality-gates.md
```

## 使用规则

### 研究闸门

所有生成法律文书（诉讼方案、起诉状、合同审查、法律意见书、律师函件）的 workflow，**除非用户明确豁免联网检索**，必须先运行 `shared/research-gate/SKILL.md`。

运行顺序：
1. 读取 `shared/research-gate/SKILL.md`（核心逻辑）
2. 按需读取 `shared/research-gate/references/` 下的参考文档（含十库路由）
3. 需要完整论证链时读取 `shared/legal-reasoning/SKILL.md`，再进入领域插件
4. 完成研究底稿后再进入专项文书生成

合同审查另加载 `shared/references/contract-review-quality-gates.md`。外部 Git 参考仓库的钉选 SHA 见 `.planning/SOURCE_INDEX.md`。

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
         ├── 可选：shared/legal-reasoning/SKILL.md（推理步骤调度）
         │
         └── 第二步：专项 skill 本身（文书生成）
                      │
                      └── 引用 shared/references/（结构模板、playbook、合同质量门禁）
```

研究闸门是**横切关注点**，不归属任何单一插件。所有插件共享同一套研究标准。
