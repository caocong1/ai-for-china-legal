# 诉讼仲裁插件

管理诉讼仲裁案件组合——案件 intake、证据目录、代理词起草、期限管理、外律状态。适配中国法院诉讼和仲裁机构仲裁。

## 安装

```
/litigation-legal:cold-start-interview
```

## 可用技能

| 技能 | 命令 | 说明 |
|------|------|------|
| 案件录入 | `/litigation-legal:matter-intake` | 录入新诉讼/仲裁案件 |
| 案件更新 | `/litigation-legal:matter-update` | 更新现有案件状态 |
| 组合状态 | `/litigation-legal:portfolio-status` | 查看案件组合总览 |
| 时间线 | `/litigation-legal:chronology` | 构建案件时间线 |
| 证据目录 | `/litigation-legal:evidence-catalog` | 整理证据目录 |
| 代理词起草 | `/litigation-legal:agent-draft` | 起草代理词/答辩状 |
| 证据保全 | `/litigation-legal:legal-hold` | 管理证据保全 |
| 事项工作区 | `/litigation-legal:matter-workspace` | 管理案件事项 |
| 冷启动访谈 | `/litigation-legal:cold-start-interview` | 初始化实践配置 |

## 本插件不做什么

- 不提供法律意见或法律结论
- 不替代执业律师的判断
- 不自动提交法院文件
- 不保证案件结果的预测

## 配置文件

实践配置文件位于：
```
~/.claude/plugins/config/ai-for-china-legal/litigation-legal/CLAUDE.md
```
