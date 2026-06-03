# 商事合同插件

审查买卖合同、技术服务合同、租赁合同等对中国大陆执业律师的商事合同，追踪履约期限，路由升级问题，生成业务人员可读的审查摘要。

## 安装

```
/commercial-legal:cold-start-interview
```

## 可用技能

| 技能 | 命令 | 说明 |
|------|------|------|
| 合同审查 | `/commercial-legal:review` | 审查各类商事合同 |
| 续约追踪 | `/commercial-legal:renewal-tracker` | 追踪合同续约和取消期限 |
| 升级标记 | `/commercial-legal:escalation-flagger` | 标记需要升级审批的问题 |
| 事项工作区 | `/commercial-legal:matter-workspace` | 管理合同审查事项 |
| 冷启动访谈 | `/commercial-legal:cold-start-interview` | 初始化实践配置 |

## 本插件不做什么

- 不提供法律意见或法律结论
- 不替代执业律师的判断
- 不保证审查的完整性
- 不自动签署合同或发送修订给对方

## 配置文件

实践配置文件位于：
```
~/.claude/plugins/config/ai-for-china-legal/commercial-legal/CLAUDE.md
```
