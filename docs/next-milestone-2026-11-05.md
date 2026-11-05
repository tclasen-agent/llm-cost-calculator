# November planning-cycle readiness

Mode: execute. Owner: /root/november_integration, sole candidate/index/integration owner for NOV-INTEGRATE-20261105. The former /root/knowledge_calculator assignment was paused with no running processes or delegates; the dedicated project factory took over on November 5 under the renewed user request to advance this project through implementation, validation, review and delivery to its next milestone.
Authority: the current user request, “Please advance every project to the next milestone.” Operating revision: DARK-FACTORY-2026-10-31.
Baseline: `3173d8b6a94955bc25e50e42735e4430c2bcba54`, clean main, fetched origin/main unchanged.

The calculator has no uncompleted product milestone recorded after its delivered full-data review. This bounded maintenance milestone repairs the initial scenario's stale October start month under the existing monthly maintenance policy in src/data/README.md and inference-defaults.js. Implementation choices are inferred within the requested progress scope; no new calculator capability is claimed.

Acceptance: fresh/reset scenarios begin in November; buy, rent, and API estimates remain usable; valid saved/shared past starting months and their measurements remain unchanged; invalid inputs preserve rejected originals; generated inventory remains exact. Existing scenario tests exercise these behaviors. The data boundary and full build/tests remain required.

Only the start month was reviewed against the session date, 2026-11-05. Other default assumptions remain the October 24 snapshot; prices, hardware, tariffs and models have not been newly reviewed. The overall catalog accuracy date must remain its oldest review date. No external-data freshness or live deployment claim follows from this partial refresh.

Baseline verification: npm test passed 134 tests; npm run build passed; 22 datasets and 1,174 field paths passed the data contract. The first candidate test run failed one assertion that required every dataset review date to equal the overall catalog date. That assumption contradicted the explicit partial-refresh policy and the existing oldest-date regression. Corrected it to enforce the canonical minimum and retain the October 24 overall date; endpoint precision assertions remain unchanged. Final implementation verification: npm test passed all 134 tests; npm run build passed; generated inventory covers 22 datasets and 1,174 fields; git diff --check passed. Existing saved/shared September scenario regression and complete buy/rent/API paths passed.

## Independent review and delivery

NOV-REVIEW-20261105 independently passed the exact candidate: all 134 tests, build, exact inventory, diff check, and separate Node acceptance assertions for November initial/reset scenarios, three usable estimate paths, saved/shared September measurements and quotes, retained rejected inputs, and the conservative October 24 overall accuracy date. No code or product findings. Product SHA-256 bindings:

| Path | SHA-256 |
|---|---|
| src/data/inference-defaults.js | a54ebff00044054eeb78acf56f10a7c346ef434374c347e6835cf155f7c96e81 |
| src/data/INVENTORY.md | 7d24b0a1e66b95d2ac5f1fb9e9d703b315c4824135647895d0a9a2ab55527dd7 |
| tests/data.test.js | 4bea4b01f2936afdc7884296e906e990b81d16bc6050c45d90c88b002e4f4a17 |

Integration confirmed those hashes and binary diff SHA-256 `8141cd71e4fc755b7c971604b932bbc52da09dafd18d462fcef65305628a691b` before adding this factual delivery record. A fresh fetch confirmed the baseline still equals remote main. GitHub reports main has no branch protection and no rulesets; Pages serves main at the repository root. Direct trunk integration follows existing repository permissions, with host CI and live verification still required before completion. No package release/version change is needed for this monthly default maintenance.

Requirements revision NOV-20261105-1 (AI-inferred, delegated-approved by the explicit next-milestone request): NOV-001 November fresh/reset start; NOV-002 preserve three estimate paths and user-owned historical inputs; NOV-003 exact inventory and conservative freshness. NOV-001 traces to inference-defaults.js and scenario tests; NOV-002 to existing scenario/sharing tests and live browser acceptance; NOV-003 to INVENTORY.md and data.test.js. Review evidence above covers each requirement. Architecture and new feature design are inapplicable to this scalar default maintenance; no factory process change is proposed. No arbitrary resource cap applies.

Current state: reviewed, integration in progress; CI, deployment identity and live behavior remain pending. Stop after this bounded readiness milestone and enter idle. A full source/data refresh is outside this milestone and has not been claimed or scheduled.
