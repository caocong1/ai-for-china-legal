# Changelog

本文件记录 AI for China Legal 的主要变更。仓库版本、文档里程碑和墨律生产 skill 包版本可能不是同一个编号：

- 仓库代码/文档里程碑使用 `v1.x`。
- `package.json` 当前仍为 `1.0.0`。
- 墨律生产 skill 包建议使用 `YYYY.MM.DD.N`，例如 `2026.06.15.1`。

## [Unreleased]

### Added

- `shared/feedback-refinement/SKILL.md`：面向墨律反馈导出的 skill 精炼工作流。
- `shared/inkstatute-integration/AGENT-UX-OPTIMIZATION.md`：墨律 agent 体验优化记录。
- 墨律集成说明：README 增加子模块使用、同步服务分发、反馈驱动更新流程。

### Changed

- README 重写为以实际使用为主的项目文档，区分独立 Qwen 使用和墨律集成使用。
- README 修正项目结构：共享参考文档位于 `shared/references/`，不是根目录 `references/`。
- README 更新 connector 状态说明，避免把所有非 `law-database` connector 都描述成可直接生产使用。

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
