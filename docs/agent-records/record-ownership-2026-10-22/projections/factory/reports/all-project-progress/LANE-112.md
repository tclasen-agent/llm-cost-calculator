# llm-cost-calculator — derived source extract

Source: `agent-org/factory/reports/all-project-progress/LANE-112.md` at immutable `105c9f55b7f208b6f1717e522acfcc29f37a93eb`.

Source SHA-256: `9bb4f7645c13c2744feed63fcba3fee34aaa3a4a6e15df3eb7599587eae194cc`.

This is a derived project-only documentary extract, not a byte-identical source copy, new verification, or current authority. The quoted spans below retain their original wording and chronological claims. Omitted text belongs to shared governance, another owner, or mixed context. Historical pending statements and failures remain historical; use the relocation README for the documented latest outcome. References to local artifacts identify evidence only; their bytes are not included.

Source line 18, characters 130–190:

>  calculator HEAD `3f356cf63586922a53ee88db5d414841ed19565a`.

Source line 18, characters 274–339:

>  push, no admin) and `tclasen-agent/llm-cost-calculator` (public;

Source line 20, characters 404–464:

>  Calculator open-issue/open-PR searches both returned empty.

Source line 24, characters 249–335:

>  calculator records 114 passing tests, build and ten representative browser scenarios.

Source line 26, characters 0–55:

> ## Calculator: ready repair of persisted-input recovery

Source line 28, characters 0–316:

> Accepted obligation: calculator `AGENTS.md` items 6 and 9 and README “Valid default and selections” require invalid saved/shared inputs to recover to complete defaults while retaining the original, preserve valid user overrides, and keep buy/rent/API usable. No new feature, price refresh or external fact is needed.

Source line 30, characters 0–625:

> Observed violation at current HEAD: `src/engine.js:6` normalizes negative numeric values to zero and unknown IDs to defaults. `src/scenario.js:7` validates only after planning/normalization; `src/app.js:20` normalizes localStorage before recovery and `src/sharing.js:4` normalizes URL fields before recovery. Consequently the original invalid input is lost, `initialScenario().recovered` is false, and app render overwrites the saved state with sanitized values. This contradicts the explicit recovery promise. Existing tests cover oversized token budgets, not negative saved fees or unknown identifiers before normalization.

Source line 32, characters 0–84:

> Actual bounded reproduction, exit 0, from calculator root (imports only; no writes):

Source line 34, characters 0–5:

> ```sh

Source line 35, characters 0–31:

> node --input-type=module <<'JS'

Source line 36, characters 0–42:

> import {defaults} from './src/catalog.js';

Source line 37, characters 0–50:

> import {initialScenario} from './src/scenario.js';

Source line 38, characters 0–57:

> import {encodeState,decodeState} from './src/sharing.js';

Source line 39, characters 0–65:

> const raw={...defaults,model:'retired-or-unknown-id',autoModel:0,

Source line 40, characters 0–55:

>  localDecode:123,localEvidence:'prior model benchmark',

Source line 41, characters 0–40:

>  overrides:'localDecode,localEvidence'};

Source line 42, characters 0–86:

> for(const [label,value] of [['saved',raw],['shared',decodeState(encodeState(raw))]]) {

Source line 43, characters 0–32:

>  const r=initialScenario(value);

Source line 44, characters 0–62:

>  console.log({label,recovered:r.recovered,model:r.state.model,

Source line 45, characters 0–51:

>   ready:r.result.ready,rejected:r.rejected??null});

Source line 46, characters 0–1:

> }

Source line 47, characters 0–75:

> const r=initialScenario({...defaults,apiExtras:-12,overrides:'apiExtras'});

Source line 48, characters 0–86:

> console.log({recovered:r.recovered,apiExtras:r.state.apiExtras,ready:r.result.ready});

Source line 49, characters 0–2:

> JS

Source line 50, characters 0–3:

> ```

Source line 52, characters 0–299:

> Observed: saved and shared unknown model silently become `qwen80`, `recovered:false`, `ready:true`, `rejected:null`; negative saved fee becomes `apiExtras:0`, `recovered:false`, `ready:true`. These are failure demonstrations, not passing recovery tests. No financial price correctness claim is made.

Source line 54, characters 0–479:

> Proposed exact initial write scope: `src/scenario.js`, `src/sharing.js`, `src/app.js`, `tests/scenario.test.js`, `tests/engine.test.js`, `README.md`. Generated ignored verification/video output may be written to a new task-specific `artifacts/` subdirectory. No `src/data/` edit, inventory regeneration, dependency, tariff, catalog date, training-policy or deployment change is necessary. Any new tracked helper/test file requires Coordinator scope reconciliation before writing.

Source line 56, characters 0–32:

> Steps and observable acceptance:

Source line 58, characters 0–338:

> 1. Add meaningful failing cases for explicit negative/nonfinite saved numeric fields and unavailable model/hardware/rental/workload IDs; retain coverage for valid partial/older scenarios using defaults for missing fields. Do not redefine every harmless normalization as corruption or change the low-level economics normalization contract.

Source line 59, characters 0–292:

> 2. Validate raw persisted inference input before normalization can destroy it. `initialScenario` must select complete current defaults and return the exact rejected input for invalid persisted configurations; preserve valid inputs and unrelated overrides. Keep transactional editing behavior.

Source line 60, characters 0–555:

> 3. Give app initialization and popstate access to raw schema-2 URL fields and parsed localStorage values. Preserve `decodeState`'s existing normalized public contract for arithmetic/test callers if adding a separate raw parser is simplest. Save rejected inputs to existing `inference-ledger-recovery-v1` before render rewrites active storage/URL. Define malformed JSON handling explicitly and retain its original text if included; do not silently discard it in an empty catch. Use the existing recovery message. Keep inference/training storage separation.

Source line 61, characters 0–464:

> 4. Unit assertions must verify original object/text is retained without mutation, defaults yield all three estimates, valid quoted/measurement/Unicode/null values round-trip, old supported inputs still load, direct invalid edits retain the last usable calculation, reset is complete, and enabled selector transitions remain usable. Execute `npm test` and `npm run build`; existing baseline is 114 tests, but do not hard-code that count as final expected inventory.

Source line 62, characters 0–519:

> 5. Browser exercise the built local app: seed invalid localStorage, reload, see recovery message and three estimates, inspect exact recovery storage; open invalid schema-2 shared URL and repeat; check back/forward, valid saved inputs, reset, selectors and training return. Record a fresh playable contextual demo and verify no page errors. Preserve the previous demo. Repository has no tracked Playwright suite; use existing local browser tooling/evidence scripts without adding a dependency unless separately admitted.

Source line 63, characters 0–436:

> 6. Fresh independent reviewer checks raw-data preservation and absence of inference/training regressions. Coordinator owns narrow PR, required checks/review, ordinary merge and verified owning remote-main content. Public repository requires synthetic/nonsecret evidence only. Pages deployment is expressly excluded by current task; clarify separately if any configured workflow would deploy on main merge before creating remote effects.

Source line 65, characters 0–467:

> Recommendation: one developer at gpt-6.1-sol/medium or high if persistence/browser edge cases expand; 30 active minutes initial implementation/checkpoint, two diagnosed retries. Independent review separately admitted. Rollback is ordinary revert PR; preserve recovery data and prior artifacts. No credential, owner-choice, price-source or private-data dependency blocks this code repair. Parent must admit this exact scope and reconcile current main before execution.

Source line 116, characters 0–470:

> Completed: read-only Git/source/requirements/demo inspection; live GitHub repository/issue/PR/branch observations; two small calculator Node reproduction probes. No tests, build, heavy/GPU work, project writes, external messages, Git mutation, deployment or spending. Failed shell remote reads retained above; no blind retries. Only changed path is this report. Report hash can be captured by Coordinator after final content freeze; no self-referential hash is asserted.

Source line 120, characters 0–246:

> Exact next safe action: Coordinator admit calculator raw-input recovery repair with the six named tracked paths and task-specific ignored browser evidence, reconcile remote main through an authorized network path, then transfer a developer claim.
