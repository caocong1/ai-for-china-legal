# 13-CONTEXT.md — 新增插件深化：法律援助

**Phase**: 13
**Name**: 新增插件 — 法律援助（legal-aid）
**Date**: 2026-06-08
**Status**: Complete (backfilled)

## Domain

将法律援助插件从 v0.1.0 扁平浅骨架深化为完整子技能集。建立法律援助引用脊柱，新建 legal-aid/CLAUDE.md 实践配置模板，新增 legal-aid-application 主技能，拆分 client-intake/case-management/document-templates/cold-start-interview 各 4 子技能。

## Scope

- 引用脊柱 + CLAUDE.md + _shared
- 新增 legal-aid-application (4 子技能)
- 拆分 client-intake (4 子技能)
- 拆分 case-management (4 子技能)
- 拆分 document-templates (4 子技能)
- 拆分 cold-start-interview (4 子技能)
- plugin.json 注册 25 技能升级 0.2.0
