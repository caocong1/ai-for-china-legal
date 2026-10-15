# 共享法律引用库

本目录存放跨插件共享的法律引用文件和专项 playbook，供各专项 skill 引用。

## 文件清单

| 文件 | 内容 | 状态 |
|------|------|------|
| `document-structures.md` | 各类法律文书的通用结构模板（含诉讼方案 13 段结构、证据目录 3 大类分组、风险段强制要求、保函/担保案件强化要求） | ✅ 已完成 |
| `guarantee-bond-playbook.md` | 保函/担保案件专用 playbook（触发信号、主体资格核验流程、保证方式分析、案由锁定、反例预警） | ✅ 已完成 |
| `subject-qualification-traps.md` | 主体资格陷阱清单（融资担保公司/银行分支机构/保险公司/上市公司/国企/外商投资企业等 7 类主体） | ✅ 已完成 |
| `due-diligence-playbook.md` | 尽职调查 / 合规调查共享 playbook：开工必答项、资料清单 schema、分章事实底稿 schema、覆盖审计、问题清单三分类、子代理与复核规则（源于 LWC-2026-0005 / 0006） | ✅ 已完成 |
| `document-delivery-qa.md` | Word / PDF 交付 QA 清单：Track Changes 可逆性、模板包成稿、Markdown → pandoc 中文模板、渲染与结构校验、交付说明（源于 LWC-2026-0001 至 0006） | ✅ 已完成 |

## 原始规划（待拆分）

`document-structures.md` 当前包含所有文书类型的结构模板。后续可考虑拆分为以下独立文件：

- `litigation-structures.md` — 诉讼文书专项结构模板
- `contract-structures.md` — 合同文书结构模板
- `opinion-structures.md` — 法律意见书结构模板
- `correspondence-structures.md` — 律师函件结构模板

目前所有模板已整合在 `document-structures.md` 中，功能完整，拆分非必需。
