# 快速开始

**60 秒** 开始使用你的插件。

## 安装

### 在 Qwen Code 中安装

1. **打开 Qwen Code** (终端)
2. **添加市场源** — 将本项目路径添加为 Skill 市场源
3. **选择插件** — 根据你的执业领域选择对应插件
4. **运行设置** — 执行 `/<plugin>:cold-start-interview` 完成冷启动访谈

### 在 Kimi Code 中安装

1. **打开 Kimi Code**
2. **添加技能源** — 将本项目路径添加为技能源
3. **选择插件** — 选择对应插件
4. **运行设置** — 执行对应设置命令

## 安装作用域：用户级，非项目级

安装时如果询问作用域，**选择用户级 (user scope)**。

原因：项目级作用域会限制插件只能读取项目文件夹内的文件，但很多技能需要读取你的桌面文档、下载文件等。用户级作用域不会给插件额外访问权限——插件只能读取你明确指向的文件或当前目录中的文件，只是让插件在任何文件夹下都能工作。

## 哪个插件适合我？

| 你是… | 安装… | 第一个命令 |
|---|---|---|
| 商事合同律师 / 法务 | `commercial-legal` | `/commercial-legal:review` |
| 诉讼律师 / 法务 | `litigation-legal` | `/litigation-legal:matter-intake` |
| 劳动法律师 / HR 法务 | `employment-legal` | `/employment-legal:hiring-review` |
| 数据合规律师 / DPO | `data-compliance` | `/data-compliance:pia-generation` |
| 知识产权律师 | `ip-legal` | `/ip-legal:clearance` |
| 建设工程律师 | `construction-legal` | `/construction-legal:contract-review` |
| 婚姻家事律师 | `family-legal` | `/family-legal:divorce-agreement` |
| 刑事合规律师 | `criminal-compliance` | `/criminal-compliance:risk-assessment` |
| 监管合规律师 | `regulatory-legal` | `/regulatory-legal:reg-feed-watcher` |
| AI 治理负责人 | `ai-governance` | `/ai-governance:use-case-triage` |
| 法学生 / 法考备考 | `law-student` | `/law-student:case-brief` |
| 法律援助律师 | `legal-aid` | `/legal-aid:client-intake` |
| 法律运营 / 寻找技能 | `legal-builder-hub` | `/legal-builder-hub:registry-browser` |

## 你安装的是什么

每个插件通过"冷启动访谈"学习你的工作方式，将你的审查立场、升级规则、文书风格写入实践配置文件，每个技能都从中读取配置。这个配置文件属于你——可以编辑、重新运行设置、或要求技能更新。

**所有输出均为律师审查草稿。** 插件会标注不确定的内容、按来源标记引用，并对不可逆操作设置门槛。律师审查、验证并承担责任。插件加速审查过程，不替代律师判断。

## 常见问题

- **"命令未找到"** — 确认已正确安装插件
- **"请先运行设置"** — 执行 `/<plugin>:cold-start-interview`
- **"我无法读取 [文件]"** — 检查插件作用域，确保是用户级安装
