# 诉讼仲裁插件

管理诉讼仲裁案件组合——案件 intake、证据目录、代理词起草、期限管理、外律状态。适配中国法院诉讼和仲裁机构仲裁。

## 安装

```
/litigation-legal:cold-start-interview
```

## 可用技能

本插件包含 **6 个编排入口**，每个入口下有 4–5 个可独立触发的深层子技能（共 32 个子技能）。

### 编排入口

| 技能 | 命令 | 说明 |
|------|------|------|
| 冷启动访谈 | `/litigation-legal:cold-start-interview` | 初始化实践配置文件（首次使用必运行）|
| 案件录入 | `/litigation-legal:matter-intake` | 录入新诉讼/仲裁案件（五步：主体冲突预检→案件识别→关键日期→证据保全→初始理论）|
| 答辩起草 | `/litigation-legal:defense-drafting` | 答辩状起草（五步：策略→管辖异议→实体答辩→程序时效抗辩→装配）|
| 证据管理 | `/litigation-legal:evidence-management` | 证据管理（四步：收集→三性审查→目录→交换）|
| 代理词起草 | `/litigation-legal:representation-drafting` | 代理词起草（四步：争议焦点→事实论证→法律论证→装配）|
| 时效监控 | `/litigation-legal:limitation-monitoring` | 诉讼时效监控（四步：时效识别→起算点→中止中断→台账预警）|

### 可独立触发的子技能（示例）

子技能均可单独触发，例如：

- `/litigation-legal:subject-conflict-precheck` — 主体资格预检与利益冲突门槛
- `/litigation-legal:case-identification` — 案件识别与风险分级
- `/litigation-legal:evidence-catalog` — 生成规范化证据目录
- `/litigation-legal:case-management` — 更新利益冲突清除/证据保全/外部律师/和解策略配置
- `/litigation-legal:limitation-period-identification` — 识别适用时效期间

完整子技能列表见 `.claude-plugin/plugin.json`。

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
