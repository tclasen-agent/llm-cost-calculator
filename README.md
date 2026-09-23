# Inference Ledger

A static calculator comparing purchased hardware, rented GPU instances and provider-specific API endpoints, with a separate fine-tuning planner.

## Data maintenance

All maintained data lives in **[src/data/](src/data/README.md)**. Start with the **[field-by-field inventory](src/data/INVENTORY.md)** to find an exact value, its source, how to update it and how frequently to review it. Each editable data file also contains maintenance instructions at the top.

The catalog is a dated snapshot, not a live feed. Shared projections derive endpoint prices, rental totals and training hardware from their canonical records. Source review dates and limitations are displayed with the calculator. Default workload, performance, memory, energy, fee and lifecycle values are planning assumptions unless replaced with appropriate evidence. Their values are documented in the generated inventory rather than duplicated here.

[AGENTS.md](AGENTS.md) makes this architecture mandatory for future changes. Tests and builds check the data contract and inventory freshness.

## Verified hardware only

Hardware selection and recommendations fail closed in inference and fine-tuning. Reviewed end-to-end records live in the shared data folder. An empty registry or an expired/out-of-scope record leaves the corresponding hardware path unavailable; API pricing remains a separate estimate.

Model cards, GPU specifications, memory heuristics, user checkboxes, quotes and shared URLs cannot certify compatibility. Evidence must cover the exact model revision, complete system, runtime versions, recipe, command/configuration, logs, memory measurements, throughput and workload. No fallback to unverified hardware or implicit API overflow is allowed.

## Calculations and assumptions

Inference sizes independent serving replicas to cover the full workload. Capacity uses prefill/decode processing time or a supplied benchmark. Purchase cash includes equipment and setup; recurring cost includes power, cooling and support. Rentals bill full instances over the operating schedule, with extras separate. API cost uses the selected endpoint's input/output pair, without cache savings. The common economic window is bounded by the configured model and hardware review deadlines; a temporary cost crossing does not establish sustained payback. Future cloud price changes are scenario assumptions.

The capability comparison uses the declared benchmark version and evaluated settings from the shared data folder. Missing evidence is excluded, not imputed. Benchmark task cost and estimated cost per user call are distinct measures; neither guarantees equivalent local quantization quality or task success.

Electricity uses either a documented incremental bill rate or the centralized Dominion GS-1 tariff and Loudoun taxes, subject to eligibility. The incremental tariff calculation adds IT and then cooling above existing site consumption. Existing fixed-meter charges cancel. Special contracts, exemptions and other jurisdictions require a suitable bill rate.

Fine-tuning supports supervised adapters, full/partial tuning, continued pretraining, preference optimization, offline distillation and reinforcement-learning recipes. It accounts for training and auxiliary stages using independently supplied throughput. Memory figures are recipe heuristics or documented references, not purchase requirements. Dataset preparation, staff, idle power, financing, replacements and failed experiments are outside the estimate. Exact reviewed configuration evidence remains mandatory for hardware costs and duration.

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
