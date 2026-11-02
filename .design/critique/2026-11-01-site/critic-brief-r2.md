# Critic brief: AI for China Legal · Skill 说明站, round 2

You are a fresh design critic. Load the critique-design skill (`<design-skill-lab>/skills/critique-design/SKILL.md`) and follow mode `fresh`, round 2. You have not seen how this was made; do not ask. Judge only what the files below show, against the brief and the contracts. Write in Chinese.

Repo root: `<repo>` (paths below are relative to it).

## Read first

| File | Why |
| --- | --- |
| `.design/PRODUCT.md`, `.design/brief.md` | audience, jobs, design read, attributes |
| `.design/surfaces/skill.md`, `home.md`, `catalog.md` | contracts (updated after round 1: finish lines and first viewports) |
| `.design/critique/2026-11-01-site/report.md` | the round-1 report: every finding and its evidence |
| `<design-skill-lab>/skills/critique-design/references/rubric.md` | floor, anchors, gate; round-2 procedure (section 4, step 9) |
| `.design/system/DESIGN.md` | only to check drift from the system |

## Screenshot manifest (round 2)

Capture set: `.design/shots/final-r2/`, `capture_id` 20261102T052032Z-ce50 (frozen), contact sheet `.design/shots/final-r2/contact-sheet.png`. Files are `<route>-<state>-<W>x<H>-<theme>.png`. Same routes, sizes and themes as round 1 (`final/`, set a687), plus four new routes.

| Priority | File | What to look at |
| --- | --- | --- |
| first | `reflow-contract-review-default-320x640-light.png`, `reflow-intake-default-320x640-light.png`, `reflow-housing-default-320x640-light.png` | D1: the three pages that scrolled sideways at 320 |
| first | `skill-steps-default-390x844-light.png` | D2: distance from step 1 to its first note at 390 |
| first | `skill-top-default-1280x800-light.png`, `skill-top-default-390x844-light.png` | D2/D7: notes visible in the first viewport; TOC collapsed at 390 |
| first | `skill-review-default-1280x800-light.png` | D3: review items cross-referenced to step notes |
| | `shared-intake-default-1280x800-light.png` | D4: one numbering system |
| | `plugin-default-1280x800-light.png` | D8: first rows of the skill list |
| | `home-default-1280x800-light.png`, `home-terms-default-1280x800-light.png` | D5/D13: flow titles, glossary, flow numbers |
| | `index-default-1280x800-light.png` | D11: number column, duplicate group heading |
| | the rest of the set | regressions at the other sizes and in dark |

You may open `docs/**/index.html` (file://) yourself: tab through focus, click 「复制引用」, resize to 320, check print emulation. A whole-site overflow check script is at `<scratchpad>/reflow.mjs` (`node <path>`); it reports pages whose document is wider than the viewport at 320 and 390.

## Re-check first (round 2)

| Finding | Round-1 evidence | Re-captured evidence (same size, theme, state) |
| --- | --- | --- |
| D1 P1 320 reflow | `01-reflow-320.png` | `reflow-*-320x640-light.png` (3 files); `node reflow.mjs` over all pages |
| D2 P2 notes far from steps; idea not in first viewport | `02-notes-buried-390.png` | `skill-steps-default-390x844-light.png`, `skill-top-default-*` |
| D3 P2 one assumption, two numbers | `03-duplicate-ids.png` | `skill-review-default-1280x800-light.png` |
| D4 P2 step numbering clash | `04-step-numbering.png` | `shared-intake-default-1280x800-light.png` |
| D5 P2 developer identifiers in prose | `05-dev-identifiers.png` | `shared-intake-default-1280x800-light.png`, `skill-steps-default-*`, `home-default-1280x800-light.png`, `home-terms-default-1280x800-light.png` |
| D6 P2 copy fallback | `06-copy-fallback.png` | open any skill page; `docs/assets/site.js` |
| D7 P2 390 first viewport | `07-toc-390.png` | `skill-top-default-390x844-light.png` |
| D8 P2 domain page first viewport | `08-plugin-fold.png` | `plugin-default-1280x800-light.png` |
| D9–D14 P3 | `09-…` to `14-…` | the matching shots above |

Accepted by the owner, not to be raised again: none.

## Claims to verify

Mark each `kept`, `partial` or `missing`.

- No page scrolls sideways at 320 or 390.
- At 390, the first note of step 1 is within one screen of the step's heading; the page-head note box is in the 390 first viewport.
- Every review item names the step note it restates, or says it has none.
- Each step has one number; titles no longer carry the source's own 「第X步」.
- Paths, commands and identifiers are monospace and break only after `/ _ - : .`; the home page explains the English markers.
- Vermilion marks only notes (their rule and label), review numbers, the one solid button and the current nav/TOC item, plus hover and focus states.

## Track B: open only after your Track A findings are written down

- Lint (1280, 390, 320; light and dark): `.design/critique/2026-11-01-site/lint-skill-r2.txt`, `lint-home-r2.txt`, `lint-index-r2.txt`, `lint-intake-r2.txt`
- Contrast matrix: `.design/critique/2026-11-01-site/matrix.txt` (read only the `--color-bg`, `--color-well`, `--color-accent-subtle` columns per mode)
- Capture log: `.design/shots/final-r2/capture-report.json`

## Not included, on purpose

The conversation, `decisions.md`, drafts, and the author's scores or opinion. If a judgement seems to need them, write the finding anyway and mark it `needs confirmation`.

## Return

- Write `.design/critique/2026-11-01-site/report-r2.md` from the critique report template; crops for new findings as `r2-NN-<slug>.png` in the same folder. If you cannot write files, end your reply with the whole report in one fenced block.
- Reply with the disposition first (`ship`, `fix`, `rebuild` or `recapture`), then the re-check table (each round-1 finding: `resolved`, `partial` or `unresolved`), then at most three regressions, then the re-scored dimensions as `before > after` with one line of evidence each, and the gate.
- Budget: about 45 tool calls. Do not modify anything under `docs/` or `scripts/`.
