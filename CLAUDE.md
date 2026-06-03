# CLAUDE.md

AI for China Legal 指导文件。本项目是一个法律 AI 插件套件，包含 13 个第一方插件，覆盖商事合同、诉讼仲裁、劳动人事、数据合规、知识产权、监管合规、AI 治理、建设工程、婚姻家事、刑事合规、法考培训、法律援助和社区技能中心。

本项目的工作主要是编辑提示词内容（skills、agents、hooks）、插件元数据和连接器配置——不是应用程序代码。

## 项目结构

```
.claude-plugin/marketplace.json   # 市场清单
<plugin>/                         # 13 个插件
  .claude-plugin/plugin.json      # 插件元数据
  CLAUDE.md                       # 实践配置文件模板
  README.md                       # 插件说明
  skills/<name>/SKILL.md          # 技能定义
  agents/<name>.md                # 子代理
  hooks/hooks.json                # 钩子配置
managed-agent-cookbooks/<name>/   # 定时 Agent 配置
scripts/                          # 验证和部署脚本
references/                       # 共享模板
connectors/                       # MCP 连接器
```

## 中国化原则

1. **成文法为主** — 所有法律分析基于中国现行成文法（法律、行政法规、部门规章、地方性法规）
2. **指导性案例参考** — 最高院指导性案例作为参考，不具有判例法约束力
3. **法院层级识别** — 自动识别基层法院/中院/高院/最高院四级体系
4. **行业监管特色** — 考虑中国特有的行业监管体系（网信办、工信部、市场监管总局等）
5. **执业环境适配** — 适配中国律师执业环境和律所管理模式

## 验证

运行验证脚本：

```bash
# JSON/YAML 合法性检查
python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('**/*.json', recursive=True)]"
```

## 命名约定

- 插件名使用小写字母和连字符 (kebab-case)，如 `commercial-legal`
- Skill 名使用小写字母和连字符，如 `contract-review`
- 斜杠命令格式: `/<plugin>:<skill>`，如 `/commercial-legal:review`
- 文件名使用小写字母和连字符

## 文件格式

- 所有 JSON 文件使用 2 空格缩进
- 所有文本文件以换行符结尾
- 无尾部空格
- Markdown 表格保持列数一致
