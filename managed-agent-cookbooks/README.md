# 定时 Agent 配置手册

本目录包含 4 个定时 Agent 配置文件，用于自动化监控中国法律领域的关键信息变化。

## 目录

- [概述](#概述)
- [Agent 列表](#agent-列表)
- [配置方法](#配置方法)
- [部署指南](#部署指南)
- [故障排查](#故障排查)

## 概述

定时 Agent 是基于 YAML 配置的自动化监控任务，按照预设的时间表定期执行，采集法律数据源信息并推送给相关人员。每个 Agent 都包含完整的错误处理、升级通知和插件集成配置。

### 架构说明

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│  数据源          │     │  定时 Agent   │     │  通知渠道     │
│                 │────>│              │────>│              │
│ - 裁判文书网     │     │ - 数据采集    │     │ - 企业微信    │
│ - 法规数据库     │     │ - 分析处理    │     │ - 钉钉       │
│ - 企业信用系统   │     │ - 报告生成    │     │ - 邮件       │
│ - 法院公开网     │     │ - 异常处理    │     │ - 短信       │
└─────────────────┘     └──────┬───────┘     └──────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │  插件集成     │
                        │              │
                        │ - 深度分析    │
                        │ - 影响评估    │
                        │ - 策略建议    │
                        └──────────────┘
```

## Agent 列表

| Agent | 文件 | 执行频率 | 描述 | 接收团队 |
|-------|------|---------|------|---------|
| 裁判文书监控 | `case-law-monitor.yaml` | 每天 9:00 | 监控裁判文书网新判例 | 律师团队 |
| 法规动态监控 | `regulation-monitor.yaml` | 每天 8:00 | 监控法律法规更新 | 合规团队 |
| 诉讼时效监控 | `deadline-monitor.yaml` | 每周一 9:00 + 每日 8:30 | 监控诉讼/仲裁期限 | 诉讼团队 |
| 企业工商变更 | `corporate-change-monitor.yaml` | 每天 10:00 | 监控企业工商变更 | 业务团队 |

### Agent 详细说明

#### 1. 裁判文书监控 (case-law-monitor)

**功能**：每日自动采集中国裁判文书网新发布的裁判文书，按法律领域分类分析并推送。

**数据源**：
- 主要：中国裁判文书网 (wenshu.court.gov.cn)
- 备用：中国法院网、最高人民法院指导性案例

**核心能力**：
- 按法律领域自动分类（合同、劳动、知产、公司纠纷等）
- 裁判趋势分析
- 地域裁判差异分析
- 自动关联插件进行深度分析

**集成插件**：commercial-legal、litigation-arbitration、labor-legal、ip-legal、criminal-compliance

#### 2. 法规动态监控 (regulation-monitor)

**功能**：每日自动采集国家法律法规数据库及各部委网站的法规更新，评估合规影响。

**数据源**：
- 主要：国家法律法规数据库 (flk.npc.gov.cn)、国务院政策文件库
- 备用：最高人民法院、最高人民检察院、各部委官网

**核心能力**：
- 法律法规全覆盖（法律、行政法规、部门规章、地方性法规、司法解释）
- 合规影响自动评级（高/中/低）
- 新旧法规对比分析
- 合规过渡期管理

**集成插件**：data-compliance、regulatory-compliance、labor-legal、construction-legal、ai-governance、commercial-legal

#### 3. 诉讼时效监控 (deadline-monitor)

**功能**：每周/每日自动检查所有活跃案件的诉讼期限，分级推送提醒。

**数据源**：
- 主要：案件管理系统 API
- 备用：本地缓存数据

**核心能力**：
- 多类型期限监控（诉讼时效、举证期限、答辩期限、上诉期限等）
- 三级紧急度分类（紧急/重要/一般）
- 法定节假日自动顺延
- 诉讼时效预警

**集成插件**：litigation-arbitration、commercial-legal、labor-legal、construction-legal

#### 4. 企业工商变更监控 (corporate-change-monitor)

**功能**：每日自动检查目标企业的工商登记变更，评估法律影响。

**数据源**：
- 主要：国家企业信用信息公示系统 (gsxt.gov.cn)
- 备用：天眼查、企查查

**核心能力**：
- 全类型工商变更监控
- 股权出质/冻结信息追踪
- 经营异常/行政处罚追踪
- 合同履行影响评估

**集成插件**：commercial-legal、litigation-arbitration、corporate-governance、criminal-compliance

## 配置方法

### 环境变量配置

每个 Agent 都需要配置相应的环境变量。推荐在项目根目录创建 `.env` 文件：

```bash
# 裁判文书网
WENSHU_API_KEY=your_wenshu_api_key
WENSHU_API_URL=https://wenshu.court.gov.cn/api

# 法规数据库
LAW_DB_API_KEY=your_law_db_api_key
LAW_DB_API_URL=https://flk.npc.gov.cn/api

# 企业信用系统
GSXT_API_KEY=your_gsxt_api_key
GSXT_API_URL=https://www.gsxt.gov.cn/api

# 案件管理系统
CASE_MANAGEMENT_API_URL=https://your-case-system.com/api
CASE_MANAGEMENT_API_KEY=your_case_api_key

# 通知渠道
NOTIFICATION_CHANNEL=wechat
WECHAT_CORP_ID=your_wechat_corp_id
WECHAT_AGENT_ID=your_wechat_agent_id
WECHAT_SECRET=your_wechat_secret
```

### 自定义监控参数

每个 Agent 支持通过环境变量自定义监控参数：

```bash
# 自定义裁判文书监控关键词
CASE_MONITOR_KEYWORDS='["买卖合同","劳动争议","竞业限制"]'

# 自定义法规监控地区
REGULATION_MONITOR_REGIONS='["北京","上海","广东","浙江"]'

# 自定义监控企业列表
MONITORED_COMPANIES='[{"name":"乙科技有限公司","code":"91110108XXXXXXXXXX"}]'

# 自定义期限阈值
DEADLINE_URGENT_DAYS=3
DEADLINE_IMPORTANT_DAYS=7
DEADLINE_NORMAL_DAYS=30
```

## 部署指南

### 前提条件

1. 确保已安装 Node.js >= 18
2. 确保已配置 MCP 连接器（参见 `connectors/` 目录）
3. 确保已配置通知渠道（企业微信/钉钉）
4. 确保各数据源 API 密钥已获取

### 部署步骤

1. **配置环境变量**

   将 `.env.example` 复制为 `.env` 并填写实际值。

2. **安装 MCP 连接器**

   确保 `connectors/` 目录下的连接器已正确配置并可用。

3. **注册定时任务**

   使用 cron 或任务调度系统注册各 Agent 的定时任务：

   ```bash
   # 法规动态监控 - 每天8:00
   0 8 * * * cd /path/to/project && node run-agent regulation-monitor

   # 裁判文书监控 - 每天9:00
   0 9 * * * cd /path/to/project && node run-agent case-law-monitor

   # 企业工商变更 - 每天10:00
   0 10 * * * cd /path/to/project && node run-agent corporate-change-monitor

   # 诉讼时效监控 - 每周一9:00
   0 9 * * 1 cd /path/to/project && node run-agent deadline-monitor

   # 诉讼时效紧急检查 - 每天8:30
   30 8 * * * cd /path/to/project && node run-agent deadline-monitor --urgent-only
   ```

4. **验证运行**

   手动执行一次各 Agent，确认输出正常：

   ```bash
   node run-agent regulation-monitor --dry-run
   node run-agent case-law-monitor --dry-run
   ```

## 故障排查

### 常见问题

| 问题 | 可能原因 | 解决方法 |
|------|---------|---------|
| 数据源连接失败 | API 密钥无效或网络问题 | 检查 API 密钥和网络连接 |
| 无数据返回 | 数据源维护或限流 | 检查数据源状态，等待限流恢复 |
| 通知发送失败 | 通知渠道配置错误 | 检查企业微信/钉钉配置 |
| 报告格式异常 | 模板变量缺失 | 检查输出模板和数据字段映射 |
| 期限计算错误 | 节假日数据未更新 | 更新年度节假日日历数据 |

### 日志查看

各 Agent 的运行日志保存在 `logs/` 目录下：

```
logs/
  case-law-monitor.log
  regulation-monitor.log
  deadline-monitor.log
  corporate-change-monitor.log
```

### 手动触发

如需手动触发某个 Agent（不等待定时调度）：

```bash
node run-agent case-law-monitor --force
node run-agent regulation-monitor --force
```
