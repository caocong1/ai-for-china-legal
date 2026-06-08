# 12-CONTEXT.md — 新增插件深化：法考培训

**Phase**: 12
**Name**: 新增插件 — 法考培训（law-student）
**Date**: 2026-06-08
**Status**: Complete (backfilled)

## Domain

将法考培训插件从 v0.1.0 扁平浅骨架深化为完整子技能集。建立法考培训引用脊柱，新建 law-student/CLAUDE.md 实践配置模板，新增 wrong-answer-analysis 主技能，拆分 case-study/law-memorization/practice-questions/cold-start-interview 各 4 子技能。

## Scope

- 引用脊柱 + CLAUDE.md + _shared
- 新增 wrong-answer-analysis (4 子技能)
- 拆分 case-study (4 子技能)
- 拆分 law-memorization (4 子技能)
- 拆分 practice-questions (4 子技能)
- 拆分 cold-start-interview (4 子技能)
- plugin.json 注册 25 技能升级 0.2.0
