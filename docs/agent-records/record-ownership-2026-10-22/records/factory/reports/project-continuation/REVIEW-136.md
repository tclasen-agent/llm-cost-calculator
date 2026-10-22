# TASK-000136 / RUN-000131 — independent Calculator catalog review

- Target System: project
- Change Classification: project
- Authorized Scope: read-only pinned Calculator candidate; this report; ignored `artifacts/catalog-review-20261022/reviewer/**` and standard generated local check output
- Affected Paths or Resources: six candidate files below, public primary sources, isolated loopback browser contexts, existing local movie
- Owning Role: Reviewer `/root/calculator_catalog_review`
- Related Requirements: REQ-000055; canonical Calculator AGENTS.md and src/data/README.md
- Related Tasks: TASK-000136 validates TASK-000130, parent TASK-000109
- Approval Requirements: APP-000055 / APP-000049 / PLAN revision4; Coordinator owns promotion and live release verification

Decision: **PASS for the bounded partial catalog-maintenance candidate**, with the evidence limitations and historical gaps below. No product defect was established. This is an independent review recommendation, not delivery, a complete current audit, endpoint availability certification, or measured hardware compatibility. Required release and remote-main acceptance remain pending with Coordinator.

Reviewed at 2026-10-22T06:22Z. Requested model/reasoning: gpt-6.1-sol/high; actual model/reasoning, tokens and cost unknown. Fresh execution had no implementation authorship. Loaded the delegated Reviewer core/role/task/run, APP55/49, matching profile and PLAN, canonical project AGENTS/README/data README, relevant acceptance/approval/Git/change-control sources. IMPLEMENTATION-130 was treated as a claim set.

## Exact subject and scope

Canonical root `/Users/Shared/llm-cost-calculator`; origin `https://github.com/tclasen-agent/llm-cost-calculator.git`. Head **`2c404493cb59eed0d250e6308db60bbe1cecdab5`**, tree `3062791a3797523dbe16bb724e4aaf492dfbfc21`, branch `work/catalog-review-20261022`; tracked/untracked nonignored working tree clean before and after checks. Baseline `0418b3ab3b4bf4589745bcae89c4a1206796339f`. Read-only `gh pr view` confirmed [PR4](https://github.com/tclasen-agent/llm-cost-calculator/pull/4) OPEN/draft, base main, matching exact head; merge-state CLEAN is not merge or CI approval.

Exactly six maintained paths differ from baseline: `src/data/models.js`, `src/data/rentals.js`, `src/data/frontier.js`, generated `src/data/INVENTORY.md`, `tests/data.test.js`, `tests/engine.test.js`. Independently rehashed every file and recomputed SHA256 of compact JSON file-map: **`cca2a606db803df33752706c6dfa1c4ab651154bf4c13104c2bbd283b638f025`**, matching the assigned candidate. The four built data/inventory files also match their source SHA256s. No stable ID, default scenario, benchmark version, selected provider/tag/precision/limits, audit dataset/date, unrelated dataset, algorithm, dependency, lock, allowlist or configuration change appears in the diff. `git diff --check` passed. Reviewer made no maintained project edit, Git write, outside message, model call, merge or deployment.

## Independent primary-source findings

Fresh retrievals at **2026-10-22T06:11:37–06:11:45Z** produced **73 HTTP200 receipts**: 19 publisher cards, 19 model endpoint listings, rental and billing documents, leaderboard and methodology, 25 exact benchmark pages, and six official provider model pages. Each receipt stores URL/final URL/UTC/status/size/SHA256; every stored body digest was independently checked. See ignored `reviewer/receipts.json`, `reviewer/source-results.json`, and `reviewer/cards-review.json`. An initial sandbox network failure was preserved; the single escalated retrieval succeeded. The web tool also independently opened OpenRouter, Lambda and official OpenAI pages; AA's large page exceeded that tool's body limit, so the pinned direct public retrieval was used.

All **17 currently available selected endpoint tuples** match provider name, provider tag, quantization, context/max prompt/max output, every maintained raw USD/token pricing string and zero discount. Selection requires the exact provider/tag/precision, not aggregate model pricing. Changed coherent uncached pairs, in USD/million tokens:

| ID | Selected endpoint / precision | Input | Output | Cache-read provenance |
|---|---|---:|---:|---:|
| ds41 | Relace / relace / unknown | .07 | .50 | .008 |
| glm53 | Inceptron / inceptron/fp4 | .55 | 1.96 | .18 |
| qwen38small | Darkbloom / darkbloom/fp4 | .035 | 2.20 | .0175 |
| nemotron-lightning | Darkbloom / darkbloom/int4 | .025 | .12 | .0125 |
| kimi3 | Relace / relace/fp4 | .30 | 12 | .25 |
| kimi25 | SiliconFlow / siliconflow/int4 | .50 | 2.50 | .15 |
| oss120 | AkashML / akashml/bf16 | .03 | .187 | .03 |

Sources are the model-specific [OpenRouter endpoint API](https://openrouter.ai/api/v1/models/deepseek/deepseek-v4.1-flash/endpoints), with each exact URL/hash in receipts. The unchanged default qwen80 is Parasail/parasail/bf16, .12 input/.80 output, 262144 context/235929 max completion. Its complete tuple also matches the fresh source. Cache prices remain provenance; calculator arithmetic uses uncached input plus output. No rounding loss in raw maintained strings was found. Publisher text supports the retained explicitly vendor-attributed DeepSWE/CyberGym, GLM and MiniMax numeric claims; other qualitative descriptions do not become certified measurements.

All **25 benchmark entries** were checked against the declared AA Intelligence Index **v4.3.2**, exact model page/title, score and task cost. The seven changed leaves match the displayed evaluated values: GPT-6 Sol task cost 1.04; GPT-6 Luna score38/task cost .07; original DeepSeek V4.1 Flash task cost .40/score39; GLM5.3 Flash .28/score42; Nemotron Ultra .47/score23; Lightning .08/score13; Qwen3 Coder Next .47/score9. Reference titles identify max reasoning; retained selected labels identify max/xhigh/high/reasoning/non-reasoning or the AA evaluated configuration. Values are the published rounded presentation, not invented precision.

[Original DeepSeek Flash's page](https://artificialanalysis.ai/models/deepseek-v4-1-flash) explicitly marks it deprecated and points to newer Flash1017. Its original max page has score39/task cost .40; the newer leaderboard variant was not substituted. The evaluator's task cost includes its token/cache/reasoning mix and benchmark weighting, unlike the calculator's uncached cost per user call. The [methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking) and exact pages are preserved with hashes.

All six [official provider model pages](https://developers.openai.com/api/docs/models/gpt-6-sol) independently match maintained standard input/output pairs, 1050000 context,128000 output,272000 long-input threshold, 2x input/1.5x output, and supported max reasoning. The GPT-5.6 Sol page supports the alias and qualified promotion through at least November21,2026. These are maintained comparison facts, not a new provider choice.

Three **known unavailable current facts remain historical**, rather than being presented as freshly verified tuples: qwen38large DeepInfra/deepinfra/fp4 and qwen30 Novita/novita/fp8 are absent from current endpoint lists; MiniMaxM2.7's current exact evaluator page has score23 but **N/A task cost**, while the older score/cost pair remains unchanged. The top comments disclose those partial-review limits, and models/frontier stay reviewed2026-09-27. These values cannot support a claim that every catalog entry is currently available or fully reverified. Four previously excluded missing-cost entries remain excluded; no missing benchmark was imputed.

Independently parsed every row in all four GPU-count tables from [Lambda](https://lambda.ai/instances): **22/22 complete tuples** match GPU/count/VRAM/vCPU/GiB RAM/published storage unit/per-GPU USD/hour. Independently checked whole-instance hourly price = count × perGPU and memory = count × VRAM; training rental references inherit GPU count, per-card memory and full-instance price. [Billing](https://docs.lambda.ai/public-cloud/billing/) confirms minute increments; price table tax caveat remains. Therefore the rentals-only review-date advance to2026-10-22 is supported. It does not establish stock, region availability, sharding compatibility or continuous-instance operational suitability. All other dataset review dates and global oldest-date2026-09-27 remain unchanged.

Independently checked all **75 original receipt bodies** against their hashes (74HTTP200, one preserved wrong-slug404), then compared **all513 field-ledger leaves**, including old/new values and26changed leaves, against the actual Git baseline and candidate modules. Counts and values agree. The ledger itself is not an independent source; the fresh receipts and semantic checks above supply that evidence. `reviewer/original-evidence-check.json` records this comparison.

## Fresh execution and browser findings

Environment: Node26.12.0, npm11.20.0, FFmpeg9.0.2; existing cached Playwright/Chromium153, GPU disabled. No dependency installation or pin change. Fresh `npm test` reports **125 passed/0failed**; `npm run build` succeeds; fresh `npm run data:check` reports22datasets/1155field paths/current inventory. Logs are `reviewer/test.log`, `build.log`, `inventory.log`. Existing unit tests remain intact; new tests meaningfully cover fractional conversion and mixed uncached billing, rather than weakening contract checks.

Own newly launched headless contexts served the freshly built dist from owned ephemeral loopback ports; browser egress was restricted to that origin, with synthetic localStorage/URL inputs. No original personal profile or private browser state was accessed. `reviewer/browser-results.json` and `training-browser-results.json`, traces and screenshots retain observations.

| Required behavior | Independent observation |
|---|---|
| Initial/default/reset/saved reload | Three finite buy/rent/API results; reset restores current defaults; saved reload remains usable |
| Valid saved/shared input | Explicit fee/evidence overrides and Unicode survive; valid shared users/fees survive reload |
| Invalid saved/shared recovery | Negative, unavailable ID, oversized fee, malformed text and oversized shared value retain their originals exactly while returning complete defaults |
| Transactional invalid edit | Oversized token edit retains the previous usable state and explanation |
| Every enabled default inference selector | **69 transitions passed**: workloads8,models17,purchase14,rental17,autoModel2,autoHardware2,autoRental2,tariff1,tariffConfirmed2,localTax2,frontier basis2; each preserved three finite results and selected value |
| Calculation units | Independently recomputed uncached API usage from requests × (inputTokens×inputPrice + outputTokens×outputPrice)/1e6 + extras in each checked inference state |
| Disabled controls | Actual DOM disabled flags and nonempty explanations confirmed, including qwen38large/kimi3; no forced compatible state invented |
| Training inheritance/reload/separation | UI and storage use8×3.99=$31.92/hour for H100x8; persists after reload; return to inference has all three paths and leaves training state intact |
| Inventory | Built inventory URL HTTP200, containing the reviewed rental date |

The broad reviewer browser script **exited1**, and is not reported as an all-pass suite. Attempt1's fixture omitted the evidence field from its override list. Attempt2 reloaded a valid shared URL which superseded the injected invalid saved object. Both are diagnosed fixture failures, retained in attempt1/2 logs/results. Final bounded rerun completed the required inference checks and all69 transitions, then a supplemental changed-price loop used Playwright `isDisabled()` on an option and tried disabled kimi3; the app retained qwen80, as its disabled DOM/title and independent targeted check confirm. No fourth broad attempt occurred. The separately planned focused training/disabled-controls/inventory browser operation passed at exit0 with0pageerrors. Required positive observations above remain valid; no product failure or unrun success is inferred from the script exit.

Coverage is default-state enabled options, not every Cartesian state or every training recipe/selector. The unchanged regression tests cover broader training behavior. The maintenance patch introduces no training UI/algorithm change. Exact hardware performance and scientific quality equivalence are excluded.

## Movie and evidence limits

Independently SHA256-checked the supplied movie **`70280df52611fedc08a8475babc36ec42cff52ae89c9f26dfd51757e432c5ab8`**; ffprobe counted **6672/6672frames**,266.88s,H264/yuv420p,1440×1000,25fps. Independent full decode exited0 with an empty error log. The20-case index agrees with the18main+2supplement result inventories and two sequential encoded durations223.52+43.36seconds. Encoding script uses ordinary unaccelerated concatenation, without speed-up filters. Movie-probe/decode and extracted independent samples are under reviewer/.

Visually inspected independently decoded default/recovery/selector/DeepSeek/training frames, plus the claimed provider/rate samples. Captions, actual app state, old freshness date, recovery warning, selected original DeepSeek and manual8×H100 training estimate are readable. The caption-only PASS is not proof of its assertion. Some samples named “rate-visible”/“provider-visible” show the configuration/results rather than the raw numeric field; exact numeric evidence comes from DOM/storage assertions and the separate own screenshot `training-own.png`, which visibly shows31.92. This is a media-presentation limitation, not a failed unit conversion.

Source-provenance limit: original and reviewer traces show HTTP200 requests for the expected three catalog scripts, but **do not archive their JavaScript response bodies**, so those traces alone cannot cryptographically prove the movie-served JS hash. `reviewer/trace-provenance.json` records that gap rather than inventing hashes. Candidate six-file hash checks, original field ledger, changed values seen/asserted in the recording, and fresh independently checked dist/browser source jointly support the reviewed behavior. Exact source-body hash binding of the historical movie is **unverified**. This does not block the bounded maintenance recommendation; it must not be relabeled as a fully cryptographically bound recording or current live view.

## Cleanup, ownership and next action

All own browser/context/server closes were awaited. All four reviewer loopback ports51016,51053,51127,51186 independently return ECONNREFUSED61. Read-only process inspection found no remaining reviewer helper or Playwright temporary Chromium profile process; only the inspection shell/rg matched. Required subprocesses are terminal. Generated evidence is retained, not uploaded. Reviewer's only organization write is this report; ignored reviewer artifacts and normal dist output are the only project writes.

Initial30active-minute checkpoint not exhausted (review started06:10UTC); CPU jobs at most2, noGPU/model. Broad-browser two diagnosed retries exhausted and retained; source fetch used one diagnosed escalation; trace extraction's two diagnosed assumptions were stopped and converted into an explicit evidence gap. No costs/token usage fabricated.

**Delivery pending:** project PR4 is still open/draft at the reviewed commit; no reviewed candidate merge/main containment or affected live Pages verification is claimed. Prior PR3/live recovery is historical baseline evidence, not this release. Coordinator retains the promotion claim. Next safe action: use normal protected PR/main promotion for this exact candidate under APP49/55, verify merged content/checks and existing Pages deployment points at that content, then verify both live modes, affected prices/benchmark views, complete default/reset/recovery paths and inventory. No hosting/config change is included. This report likewise remains pending Coordinator's separate organization review/delivery; worker completion does not close TASK136 or its parent.
