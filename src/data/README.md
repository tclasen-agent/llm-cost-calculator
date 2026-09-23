# Maintained data

This folder is the single editable home for data that changes over time. Each topical `.js` file has an instruction comment and machine-readable maintenance metadata. [INVENTORY.md](INVENTORY.md) lists **every field**, grouped by its owning file, with current values, source, update procedure and review frequency. Frequencies are maintenance policies, not promises that an external source updates on that schedule.

`registry.js` registers and recursively freezes the datasets. `index.js` builds shared application views and resolves references. These two files contain derivations, not independently maintained facts. Existing modules such as `../catalog.js` re-export those views for compatibility. There is no background price fetch.

## Files to update

| File | Information owned here | Review trigger |
|---|---|---|
| [audit.js](audit.js) | Full-audit coverage, evidence gaps, candidate dispositions and migration notes; references canonical datasets | Each full audit; candidate availability changes |
| [models.js](models.js) | Model identities/cards, vendor evaluation text and selected provider endpoint: price pair, cached rate, precision, provider tag and token limits | Weekly; model/endpoint/price changes |
| [hardware.js](hardware.js) | Complete-system configurations, installed memory, GPU allocation ceiling, published price and source references | Monthly; before purchase; specification changes |
| [rentals.js](rentals.js) | Per-GPU hourly price, GPU count/model/VRAM and complete-instance CPU/RAM/SSD | Weekly; before rental |
| [rental-terms.js](rental-terms.js) | Billing, tax, storage and availability caveats | Billing changes |
| [purchase-allowances.js](purchase-allowances.js) | Unquoted whole-system purchase budgets, including clusters | Monthly; replace with a quote for a decision |
| [inference-memory.js](inference-memory.js) | Per-model planning memory in GB | Model, runtime, precision or workload change |
| [workloads.js](workloads.js) | Task names, activity/token templates, model shortlists and editorial rationale | Monthly; new releases or pilot findings |
| [inference-defaults.js](inference-defaults.js) | Initial inference scenario, including start month, selected IDs and empty user-evidence fields | Each planning cycle; start month monthly |
| [inference-policy.js](inference-policy.js) | Memory/speed/power proxies, cost allowances, work hours, energy baseline, price-decline and lifecycle assumptions | Each planning cycle; relevant measurements change |
| [tariff.js](tariff.js) | All GS-1 rates/riders, seasonal and consumption blocks, taxes/caps and eligibility threshold | Check monthly; every tariff/tax effective date |
| [frontier.js](frontier.js) | Benchmark version, scores, task costs, evaluated settings, comparison API prices/limits, promotional conditions and comparison wording | Weekly; benchmark/pricing/promotion changes |
| [training-models.js](training-models.js) | Total checkpoint parameters, training-only model metadata and published supervised recipe memory | Model/recipe revision |
| [training-eligibility.js](training-eligibility.js) | License and stack-support qualification | License/support change |
| [training-systems.js](training-systems.js) | References to shared hardware/rentals, training power assumptions and custom-system defaults | Monthly; each campaign/configuration |
| [training-defaults.js](training-defaults.js) | Dataset/run/cost/energy defaults and empty user-evidence fields | Dataset version, campaign or bill change |
| [method-defaults.js](method-defaults.js) | Auxiliary models, rollouts, generation/forward rates, teacher/reward cost and method parameters | Each recipe/experiment |
| [training-policy.js](training-policy.js) | Usable memory, per-parameter memory, activation scaling and monthly capacity assumptions | Stack/optimizer change or new pilot |
| [training-methods.js](training-methods.js) | Supported method labels, uses and limitations | Quarterly; implementation changes |
| [method-sources.js](method-sources.js) | Training method documentation/paper links | Quarterly; documentation moves |
| [sources.js](sources.js) | Shared source URLs referenced by the other files and UI | Related review; monthly link check |
| [reviewed-configurations.js](reviewed-configurations.js) | Reviewed exact configuration evidence and expiry dates | Before expiry; any tested-scope change |

## Update workflow (required)

1. Locate the field in the inventory and edit its owning file's `values`. Follow the source and procedure in that file. Preserve stable IDs used by saved scenarios; when removing an ID, explicitly test/document how old links normalize.
2. Keep factual values separate from assumptions. Null means unknown; zero is an actual zero. Published prices require source evidence. A budget allowance does not become a verified quote because it is editable. Preserve historical snapshot provenance in Git history.
3. For a new field, choose the correct file and ensure its maintenance instructions cover its units, source, update method and frequency. Split into another registered dataset when a different review policy is required. Keep the top comment and metadata synchronized.
4. Update `maintenance.reviewed` only after reviewing the relevant source. Retain the original date during a structural refactor. Known future events, such as a promotion's `through` date, trigger review even between regular checks.
5. Run `npm run data:inventory`, `npm test`, and `npm run build`. Review the generated inventory diff alongside the data diff. Tests/build reject stale inventories, unregistered files, missing instructions, invalid references, duplicate derived price fields and new unclassified numeric literals or embedded source URLs/dates in application modules.
6. Deploy source changes to GitHub Pages and check both calculator modes and the inventory link. Build output copies this folder; do not edit `dist/` directly.

## Units and source-of-truth relationships

- `models.*.endpoint.pricing`: raw provider **USD per token** strings. `prompt` and `completion` must come from the **same selected endpoint**. `input_cache_read` is provenance only; no cached discount is calculated. The shared view converts to USD/million tokens. Endpoint context/max prompt/max completion limits are tokens. Precision and provider routing belong to that same record. Unknown limits are null. Only fields used by the application or its price provenance are retained; the old raw response (including transient health statistics) remains in Git history, not as a second maintained price table.
- `hardware.*.memory` and `gpuCeiling`: GB, with `kind` distinguishing installed VRAM/unified memory. Package/name templates use `{memory}`, `{baseMemory}` and `{nodes}` to render shared specifications without copying their values. Other build details are maintained in the package description. Shared source URLs use `sourceRef`, `priceSourceRef` and `runtimeSourceRef` keys into `sources.js`.
- `rentals.*.perGpu`: USD/GPU-hour. `gpus × perGpu` produces whole-instance USD/hour; `gpus × vram` produces aggregate memory. `cpu` is vCPU, `ram` is GiB, and `storage` retains its published unit. Neither aggregate VRAM nor a price establishes compatibility.
- `purchase-allowances`: scalar values are USD for a complete system. Cluster records reference a base system and node count plus incremental networking/installation `extras` in USD; the base price is inherited, not copied. `hardware` cluster memory similarly derives from its base system and node count.
- `training-systems`: `rentalId` derives GPU count, VRAM and price from the inference rental record. `hardwareId` derives GPU count, memory, source and published price (or the shared purchase allowance). Initial training quote, watts, setup and rental rate derive from the selected systems. Custom systems are user scenarios. Training and inference electricity/support/cooling assumptions remain separate because their billing units and operating profiles differ.
- `workloads`: calls per person/team per day, input/output tokens per call, concurrent activity per person/team; `models` is an ordered editorial shortlist, not a measured ranking.
- `inference-policy`: `*Usable`, `*Fraction` are fractions; `*Decline` is percent/year; refresh/projection/display intervals are months. Speed proxies are tokens/sec; prefill multiplier is dimensionless. Energy is watts converted to kWh using the selected schedule; the idle fraction applies outside scheduled hours. Scenario numbers are assumptions, not provider forecasts.
- `tariff`: USD/kWh except `ridersCents` (cents/kWh), county fixed/cap (USD/account/month), blocks (kWh), peak threshold (kW), and summer start/end (month numbers). Update all affected tier/season tests using a separately calculated expected bill.
- `frontier`: API prices are USD/million tokens, `taskCost` is evaluator-measured USD/benchmark task and `score` uses the declared benchmark version. `referencePolicy` owns common context/output/long-input thresholds and reasoning setting. Multipliers apply only above the long-input threshold. Do not reuse scores across incompatible benchmark versions. `missingBenchmarks` records why an entry is excluded rather than inventing a score.
- `training-models`: parameters in **billions of total checkpoint parameters**, not active MoE parameters; `qlora`/`lora` are GB for the documented supervised recipe only. Other metadata for inference models is inherited from `models.js`.
- `training-defaults` / `method-defaults`: examples, epochs, tokens/example, corpus tokens/pass, sequence tokens, sequences/GPU, runs/campaign and runs/month. `Low`/`High` are whole-system training tokens/sec; `Forward` is processed tokens/sec and `Generation` is generated tokens/sec including prompt-processing time. `Peak` is aggregate measured GB (zero selects the heuristic). `watts` is whole-system watts; electricity USD/kWh; cooling and overhead percentages; support USD/month; rent extras USD/run; setup time hours/run; teacher cost USD/run; reward cost USD/response; reward time seconds/response. Parameter sizes are billions; adapter/trainable percentages are percent of total parameters.
- `training-policy`: frozen/quantized/trainable bytes per parameter; activation GB scaled by sequence/reference-sequence and microbatch. These are recipe assumptions; actual memory is not established by arithmetic.
- `reviewed-configurations`: exact model revision, runtime/library versions, full hardware configuration, reproduction command/config/logs, measured result, evidence URL, `reviewedOn`, `expiresOn`, and full `scope` expected by `verification.js`. Add successful and out-of-scope tests when introducing a record. An empty list leaves verified status unavailable; both modes permit labeled estimates without these records. Expired records remain historical and cannot enable recommendations.

## User-maintained inputs

The defaults files also enumerate every persisted input. Actual overrides live in the user's browser or shared URL, not in this directory. Recheck workload/token/concurrency inputs monthly or on workflow changes; quotes/fees before decisions; site consumption/peak/bill rate each billing cycle; throughput, precision and memory after every configuration change; training dataset/recipe/cadence for each campaign; lifecycle and price-trend inputs each planning cycle. Evidence strings should identify the source, date, configuration and scope. Reset restores current defaults, but a catalog update does not silently replace user overrides. Exported results and old links are historical scenarios, not immutable catalog snapshots: opening a link uses current catalog data plus its saved inputs.

## What stays in code

Arithmetic, unit conversions, schema versions, validation bounds and visual layout are implementation constants. They do not require market-data refresh. `scripts/code-constants.json` classifies allowed numerical literals in application code; it is not a location for prices, forecasts or empirical assumptions. Adding a maintained fact there is prohibited by the root `AGENTS.md`. Static checks catch common boundary violations; reviewers must also enforce the semantic rule for explanatory prose and existing literal values.
