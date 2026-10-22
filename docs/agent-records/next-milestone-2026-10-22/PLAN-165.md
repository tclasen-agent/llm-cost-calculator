# Resolve one unavailable selected API endpoint, revision 1

- Target System: project
- Change Classification: project
- Authorized Scope: this preparation prefix only; proposed five-file maintained-data increment requires separate admission
- Affected Paths or Resources: docs/agent-records/next-milestone-2026-10-22/** now; src/data/models.js, src/data/INVENTORY.md, tests/data.test.js, tests/engine.test.js, tests/scenario.test.js after admission; isolated ignored evidence and normal existing Pages maintenance delivery by Coordinator
- Owning Role: Planner
- Related Requirements: REQ-000057; canonical project AGENTS requirements 1–9
- Related Tasks: TASK-000165
- Approval Requirements: APP-000122 preparation only; exact source-receipt/candidate admission, fresh independent review, owning PR/main and authorized existing Pages/live verification
- Revision: 1
- Status: proposed
- Next Action: Coordinator pin its fresh official endpoint response, independently admit this one-model atomic replacement, then assign Developer

The useful next deliverable is **one current, coherent selected-provider record for existing stable model ID `qwen38large`**, resolving a specific gap intentionally left by delivered catalog PR4. No open GitHub issue supplies a different milestone according to Coordinator's fresh query. The local canonical data instructions require atomic selected-endpoint updates and immediate review on endpoint changes. Existing-catalog review has already been delivered and must not be repeated as new progress.

Coordinator's current official OpenRouter endpoint readback reports the old selected DeepInfra/fp4 tuple absent and a SiliconFlow/fp8 tuple present with status0. This is supplied source evidence, not a worker HTTP observation. Root pinned HTTP200 official response at `artifacts/next-milestone-20261022/qwen38large-endpoints.json`, SHA256 `9a54385dc0ba8a65c28a463869c954df306b4c9191dabdb1be06da6f5fddab21`, with `source-receipt.json` retrieval UTC 2026-10-22T15:46:35.800046+00:00. Worker rehashed the exact bytes and found one `siliconflow/fp8` row. Receipt records status0 and discount0. Fresh independent review must compare the complete tuple and eligibility before implementation approval. Numeric maintained facts stay solely in `src/data/`; this plan deliberately references response fields instead of becoming another catalog. The official endpoint is `sources.api` plus the unchanged model apiModel and `/endpoints`; no aggregate model price or arbitrary provider fallback is acceptable.

Proposed exact edits:

1. `src/data/models.js`: replace only `values.qwen38large.endpoint` atomically with the accepted SiliconFlow/fp8 endpoint's exact provider/tag/quantization, input/output/cache pricing and complete context/output/prompt limits. Adjust the existing partial-review comment to show this gap resolved and `qwen30` still unresolved. Preserve stable ID, apiModel, model card/evaluation, all other model records and whole-dataset maintenance.reviewed. Do not invent missing fields or convert absent limits into claimed support.
2. `src/data/INVENTORY.md`: regenerate with the canonical command, no manual edits.
3. `tests/data.test.js`: exact source-bound tuple projection and decimal USD/token conversion/cache regression.
4. `tests/engine.test.js`: request-limit boundary and coherent uncached input/output billing for this model; cache provenance does not introduce cache savings. A numerically unchanged input/output price must not conceal changed endpoint identity/limits.
5. `tests/scenario.test.js`: preserve stable-ID saved/shared recovery and scoped overrides across catalog replacement; ensure default and all enabled transitions retain complete buy/rent/API results. Preserve the existing honest rejection of `qwen38large` when available hardware cannot fit its independent planning memory.

Read-only diagnosis established that endpoint precision and self-hosted recipe memory have separate canonical owners: `src/data/index.js` exposes endpoint.quantization, but `planningMemoryGB` comes from inference-memory; `src/planning.js` sizes hardware from the latter and does not consume API precision. Therefore a provider switch from fp4 to fp8 **must not** double self-hosted memory, certify local FP8 support, reset user measurements or imply quality equivalence. Preserve inference-memory and all existing assumptions byte-for-byte. The existing UI associates provider precision with API evidence; no UI redesign or migration is needed for this scoped data replacement.

| Requirement | Acceptance oracle | Responsible verifier |
| --- | --- | --- |
| One canonical owner, current coherent provider tuple | Reviewer independently compares full selected record against pinned fresh official response and model identity. No mixed-provider price/limit fields, stale provider tag, unsupported promotion or aggregate price. | Fresh independent Reviewer |
| Honest review scope | qwen30, all unrelated model records, dataset-wide date, audit date, defaults and assumptions unchanged; comment narrows the remaining gap without declaring complete current pricing. Inventory matches generated bytes. | Independent source/diff/data-contract review |
| Correct units/limits | Exact decimal conversion for input/output/cache, uncached workload total, context boundary at accepted limit and one beyond, output/prompt boundaries where declared. | Canonical meaningful regression tests and independent calculation |
| Preserved user inputs and complete defaults | Initial/reset/saved/shared/default and enabled selector outcomes usable across buy/rent/API; original invalid input retained in recovery; unrelated overrides retained. The large model's unfit selector stays disabled with explanation. | Existing tests plus new focused saved-ID test; isolated recorded browser journey |
| Delivered release | Reviewed exact candidate merges through normal PR/main, existing Pages build serves exact content, live initial/reset/recovery/selectors and endpoint evidence verify with no page errors. | Coordinator owning delivery plus independent review |

Admission sequence: freeze official response and eligibility interpretation; reject if endpoint identity/status/discount/limits are ambiguous. Obtain exact five-path admission. Preserve before hashes and old input recovery fixtures. Implement tuple/comment and tests, regenerate inventory, run canonical tests/build, record isolated affected browser behavior with source identity/timestamp index, then obtain fresh independent review. Coordinator performs ordinary existing Pages maintenance PR/check/main/build/live verification. Source changes after review reopen affected checks.

Executable commands after admission, from the owning root (not executed by preparation):

```sh
npm run data:inventory
npm test
npm run build
```

Browser verification uses an isolated task profile/data and port selected by Coordinator. Record initial defaults, reset, valid old stable-ID saved/shared scenario and an invalid combination recovery, then inspect API provider precision/limit explanation and enabled model/task/hardware/rental transitions. All expected unavailable choices remain unavailable; no override is fabricated merely to enable a model. A product recording and index are required by the current milestone instruction. No dependency install is necessary if current pinned tools are available; a missing dependency returns to root admission rather than invoking npm ci silently.

Resource proposal: Developer gpt-6.1-sol/high (requested; actual unknown), CPU jobs2, 20 active-minute checkpoint; independent Reviewer 15 active-minute checkpoint; at most2 diagnosed retries preserving all failed logs/source receipts. Public official source retrieval and isolated browser/server execution require root dependent admission; no model/GPU/downloaded corpus. No market sweep, new model/hardware/default/source registry, dataset schema, build pin or code-constant allowlist change. External primary-source verification is mandatory before numeric changes, even though subscription permission persists.

Stop if the current healthy exact tuple disappears, source status semantics contradict selection, source facts require unrelated architecture change, default paths regress, raw receipt is unavailable, claim is canceled or canonical verification fails. Keep qwen30 historical rather than use an unhealthy or unknown-precision substitute. Rollback restores only five task-owned files from SOURCE-165 baseline, keeps all receipt/failure evidence and user recovery storage, and revalidates any deployed content through Coordinator's normal revert PR. No whole-repo reset. This proposal does not implement or publish anything.
