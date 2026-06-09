# 安装指南

> ⚠️ 本文档仅记录**实际验证过**的安装方式。

## 项目现状

当前项目处于 **SKILL.md 定义完成** 阶段：
- 13 个插件，共 **66 个顶层 skill**（含 336 个子技能 SKILL.md）已定义
- `shared/` 共享研究基础设施已建立（研究闸门、质量闸门、搜索策略）
- SKILL.md 文件**未被任何 Agent 平台自动发现**——需要通过符号链接手动注册

## 平台 skill 加载机制（已验证）

### Qwen Code

| 位置 | 是否自动发现 |
|------|-------------|
| `~/.qwen/skills/<skill>/SKILL.md` | ✅ 全局 skill，所有项目可用 |
| `<project>/.qwen/skills/<skill>/SKILL.md` | ✅ 项目级 skill，仅该项目可用 |
| 其他目录中的 SKILL.md | ❌ 不会被发现 |

### Claude Code

| 方式 | 是否验证 |
|------|----------|
| `claude plugin add <github-url>` | ❌ 待验证（本项目在 Gitee，不在 GitHub） |
| 本地目录注册为 marketplace | ❌ 待验证 |

## 方式 A：项目级 skill（Qwen Code，已验证可用）

**原理**：Qwen Code 自动发现 `<project>/.qwen/skills/` 目录下的 skill。

### 一键脚本

```bash
cd /path/to/ai-for-china-legal
bash scripts/setup-skills.sh
```

### 手动操作

```bash
cd /path/to/ai-for-china-legal
bash scripts/setup-skills.sh
```

这会创建 67 个符号链接，将各插件的 SKILL.md 链接到 `.qwen/skills/` 目录下，避免命名冲突。

### 验证

在新 session 中打开本项目目录，检查系统提示中是否出现 skill 名称（如 `commercial-contract-review`、`litigation-matter-intake` 等）。

### 卸载

```bash
bash scripts/cleanup-skills.sh
```

## 方式 B：全局 skill（Qwen Code，原理可行未验证）

```bash
# 将技能链接到全局目录
ln -sf /path/to/ai-for-china-legal/commercial-legal/skills/contract-review ~/.qwen/skills/commercial-contract-review
# ... 对其他 skill 重复
```

**注意**：全局安装后所有项目都能用，可能与其他项目的 skill 冲突。

## 方式 C：Claude Code（待验证）

本项目有 `.claude-plugin/marketplace.json` 定义，符合 Claude Code 插件格式。但实际安装需要：

1. 将项目推送到 GitHub（当前在 Gitee）
2. 通过 `claude plugin add` 安装

**此方式尚未验证。**

## 当前可用的 skill 列表

安装后，以下 skill 可用（共 67 个：66 插件 + 1 共享）：

### 商事合同 (4)
- `commercial-cold-start-interview` — 冷启动访谈
- `commercial-contract-review` — 合同审查
- `commercial-contract-drafting` — 合同起草
- `commercial-liability-analysis` — 违约责任分析

### 诉讼仲裁 (6)
- `litigation-cold-start-interview` — 冷启动访谈
- `litigation-matter-intake` — 案件录入
- `litigation-defense-drafting` — 答辩状起草
- `litigation-evidence-management` — 证据管理
- `litigation-representation-drafting` — 代理词起草
- `litigation-limitation-monitoring` — 诉讼时效监控

### 劳动人事 (6)
- `employment-cold-start-interview` — 冷启动访谈
- `employment-hiring-review` — 招聘审查
- `employment-termination-review` — 离职审查
- `employment-non-compete-review` — 竞业限制
- `employment-leave-management` — 休假管理
- `employment-labor-dispute-handling` — 劳动争议处理

### 数据合规 (5)
- `data-cold-start-interview` — 冷启动访谈
- `data-pia-generation` — 个人信息保护影响评估
- `data-cross-border-assessment` — 数据出境评估
- `data-data-security-compliance` — 数据安全合规
- `data-network-security-compliance` — 网络安全合规

### 知识产权 (5)
- `ip-cold-start-interview` — 冷启动访谈
- `ip-trademark-search` — 商标查询
- `ip-patent-analysis` — 专利分析
- `ip-copyright-registration` — 著作权登记
- `ip-ip-clearance` — 知识产权清查

### 监管合规 (5)
- `regulatory-cold-start-interview` — 冷启动访谈
- `regulatory-regulatory-monitoring` — 监管监控
- `regulatory-penalty-response` — 行政处罚应对
- `regulatory-compliance-system` — 合规体系建设
- `regulatory-regulatory-report` — 监管报告起草

### AI 治理 (5)
- `ai-governance-cold-start-interview` — 冷启动访谈
- `ai-governance-deep-synthesis-filing` — 深度合成备案
- `ai-governance-algorithm-filing` — 算法备案
- `ai-governance-generative-ai` — 生成式 AI 合规
- `ai-governance-ai-use-case-classification` — AI 用例分类

### 建设工程 (5)
- `construction-cold-start-interview` — 冷启动访谈
- `construction-contract-review` — 施工合同审查
- `construction-payment-dispute` — 工程款争议
- `construction-bidding-compliance` — 招投标合规
- `construction-commercial-housing-review` — 商品房买卖审查

### 婚姻家事 (5)
- `family-cold-start-interview` — 冷启动访谈
- `family-divorce-agreement` — 离婚协议
- `family-will-drafting` — 遗嘱起草
- `family-inheritance` — 继承事务
- `family-property-division` — 财产分割

### 刑事合规 (5)
- `criminal-cold-start-interview` — 冷启动访谈
- `criminal-risk-assessment` — 风险评估
- `criminal-non-prosecution` — 合规不起诉
- `criminal-corporate-crime` — 单位犯罪
- `criminal-compliance-system-building` — 合规体系建设

### 法考培训 (5)
- `law-cold-start-interview` — 冷启动访谈
- `law-practice-questions` — 客观题刷题
- `law-case-study` — 案例研习
- `law-law-memorization` — 法律记忆
- `law-wrong-answer-analysis` — 错题分析

### 法律援助 (5)
- `legal-aid-cold-start-interview` — 冷启动访谈
- `legal-aid-client-intake` — 客户 intake
- `legal-aid-case-management` — 案件管理
- `legal-aid-document-templates` — 文书模板
- `legal-aid-legal-aid-application` — 法援申请

### 法律技能中心 (5)
- `legal-builder-cold-start-interview` — 冷启动访谈
- `legal-builder-skill-discovery` — 技能发现
- `legal-builder-installation` — 技能安装
- `legal-builder-security-review` — 安全审查
- `legal-builder-skill-registry` — 技能注册表

### 共享研究基础设施 (1)
- `shared-research-gate` — 中国法研究闸门

## 待验证事项

- [ ] Qwen Code skill 市场提交流程
- [ ] Claude Code 从 GitHub 仓库安装插件
- [ ] Kimi Code / OpenCode 等其他平台的 skill 加载机制
