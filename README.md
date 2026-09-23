# Inference Ledger

A static calculator comparing purchased hardware, rented GPU instances and provider-specific API endpoints, with a separate fine-tuning planner.

## Data maintenance

All maintained data lives in **[src/data/](src/data/README.md)**. Start with the **[field-by-field inventory](src/data/INVENTORY.md)** to find an exact value, its source, how to update it and how frequently to review it. Each editable data file also contains maintenance instructions at the top.

The catalog is a dated snapshot, not a live feed. Shared projections derive endpoint prices, rental totals and training hardware from their canonical records. Source review dates and limitations are displayed with the calculator. Default workload, performance, memory, energy, fee and lifecycle values are planning assumptions unless replaced with appropriate evidence. Their values are documented in the generated inventory rather than duplicated here.

[AGENTS.md](AGENTS.md) makes this architecture mandatory for future changes. Tests and builds check the data contract and inventory freshness.

## Inference estimates and fine-tuning verification

Inference accepts approximate published performance, user estimates and maintained planning heuristics. Automatic selection chooses systems that fit the estimated memory requirement. The default provides buy, rent and API costs; incompatible choices are disabled and invalid edits retain the previous usable calculation. Estimates do not certify runtime compatibility or benchmark performance.

Changing a model, workload or system resets measurements scoped to the previous configuration. System changes also reset its quote and setup assumptions. Unrelated overrides remain saved. Invalid saved/shared scenarios recover to complete defaults, with the original retained in browser recovery storage.

Fine-tuning allows assumption-based estimates when memory fits and cost and throughput inputs are usable. Automatic selection prefers high-confidence feasibility: a published supervised recipe, single GPU, standard sequence/batch/adapter settings and the memory ceiling maintained in training-policy.js. Generic recipes and sharded systems remain lower-confidence estimates. Model cards, memory fit and user confirmations cannot certify compatibility. Inference may use those inputs as labeled planning estimates. Neither mode silently adds API overflow to hardware costs.

## Calculations and assumptions

Inference sizes independent serving replicas to cover the full workload. Capacity uses prefill/decode processing time or a supplied benchmark. Purchase cash includes equipment and setup; recurring cost includes power, cooling and support. Rentals bill full instances over the operating schedule, with extras separate. API cost uses the selected endpoint's input/output pair, without cache savings. The common economic window is bounded by the configured model and hardware review deadlines; a temporary cost crossing does not establish sustained payback. Future cloud price changes are scenario assumptions.

The capability comparison uses the declared benchmark version and evaluated settings from the shared data folder. Missing evidence is excluded, not imputed. Benchmark task cost and estimated cost per user call are distinct measures; neither guarantees equivalent local quantization quality or task success.

Electricity uses either a documented incremental bill rate or the centralized Dominion GS-1 tariff and Loudoun taxes, subject to eligibility. The incremental tariff calculation adds IT and then cooling above existing site consumption. Existing fixed-meter charges cancel. Special contracts, exemptions and other jurisdictions require a suitable bill rate.

Fine-tuning supports supervised adapters, full/partial tuning, continued pretraining, preference optimization, offline distillation and reinforcement-learning recipes. It accounts for training and auxiliary stages using independently supplied throughput. Memory figures are recipe heuristics or documented references, not purchase requirements. Dataset preparation, staff, idle power, financing, replacements and failed experiments are outside the estimate. Exact reviewed evidence is required only for verified status, not estimated hardware costs and duration.

## Valid default and selections

The landing page leads with an available cost estimate. Hardware evidence gaps do not replace a working API estimate with a page-level error. Model/task choices that would invalidate the current calculation are disabled; incompatible edits retain the previous result and show an explanation. Invalid saved or shared inputs recover to current defaults, with the original input retained in browser recovery storage.

## Saved scenarios

Browser storage and share URLs preserve user inputs separately for inference and training. Reopening a scenario combines its saved inputs with the current catalog; it does not restore an immutable old price snapshot. Review old quotes and measurements before using them. Reset restores current defaults. Download assumptions exports the active mode's input/result evidence.

## Development and release

```sh
npm ci
npm run data:inventory  # after editing maintained data
npm test
npm run build
npm start
```

Runtime remains dependency-free. Acorn is a development-only parser for enforcing the data boundary. The build copies the app and shared data folder to `dist/`. CI installs pinned development dependencies, checks data and tests, then builds. GitHub Pages serves the repository's main branch; a release is complete only after the Pages build succeeds and live behavior is verified.

Training policy migration: existing saved inputs and shared links retain their measurements and quotes. Automatic selection now prefers higher-confidence fitting hardware; if it changes systems, existing system-scoped measurements and quotes reset as before. Manual selections remain pinned. No scenario schema change is required.
