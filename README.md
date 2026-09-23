# Inference Ledger

A static, responsive calculator comparing a complete purchased AI system, an actual rented GPU instance, and an API endpoint for the same named model.

## Verified hardware only

Hardware selection and recommendations now fail closed in both inference and fine-tuning. **There are currently no reviewed end-to-end configuration records**, so all purchase/rental choices are disabled and their cost, duration and payback recommendations are unavailable. API pricing remains available as an estimate. Model and dataset controls remain usable; memory heuristics are explicitly unverified and are not buying requirements.

A published specification, memory-fit estimate, notebook title, user checkbox, quote, saved state or shared URL cannot certify compatibility. `src/verification.js` keeps reviewed records separate from user inputs and matches the exact recorded workload and recipe without extrapolating. Automatic selection filters through this gate; it never falls back to an unverified system. More GPUs do not establish working distributed support.

Before adding a record, review a reproducible successful end-to-end run: exact model revision, complete purchasable system or rental instance (GPU, host RAM, storage and interconnect), runtime/library versions, quantization, adapter recipe, command/configuration, logs, per-device memory and throughput measurements, and the tested context/batch/concurrency. Record the evidence URL, review and expiry dates, and exact input scope. Add matching and out-of-scope regression tests. Specifications and pricing sources alone are insufficient. Verification is bounded evidence, not a guarantee of task quality or every future software version.

The arithmetic helpers `estimateEconomics` and `estimateTraining` are retained for isolated financial regression tests. UI, exports and recommendation paths use the guarded `calculate` and `calculateTraining` functions. Do not wire the arithmetic helpers directly into product recommendations.

## Simple planning and provenance

Choose a task and scale; model suggestions fill downstream inputs. Hardware paths require reviewed configuration evidence and may be unavailable. Every numerical planning input is populated. Advanced fields show automatic defaults versus your overrides; clearing a field or restoring assumptions regenerates defaults. Reset restores the default scenario and clears the URL.

Published catalog prices/specifications and actual rental/API rates retain dated vendor links. Workload, memory, throughput, unquoted purchase prices, power, cooling, fees and lifecycle review intervals are **planning assumptions**, not benchmarks, quotes or industry facts. `src/planning.js` documents the full set. These assumptions do not qualify a hardware configuration for selection or purchase. Advanced overrides persist across simple changes and shared URLs; review their relevance after changing hardware or workload.

- Purchase catalog: actual Apple, NVIDIA, AMD, Framework, HP, Puget and Supermicro offerings. NVIDIA Spark's $4,699 US MSRP comes from its [price-change announcement](https://forums.developer.nvidia.com/t/2-23-2026-price-change-announcement/361713). AMD's $3,999 Ryzen AI Halo system price is [reported by AMD](https://www.amd.com/en/blogs/2026/amd-ryzen-ai-halo-is-designed-for-the-agentic-era.html). Both need checkout confirmation. Other full-system prices use explicitly labeled planning allowances. Configurable workstations and clusters require a complete build description and quote, including networking.
- Rental catalog: [Lambda on-demand instances](https://lambda.ai/instances). Rates are USD per GPU-hour multiplied by actual GPU count, not whole-server prices accidentally applied per card. For example, the 8× H100 SXM instance is 8 × $3.99 = $31.92/hour. Host resources are the published full-instance CPU, RAM and local SSD. Stock and region availability are not verified. Additional storage, taxes and fees need evidence.
- API catalog: [OpenRouter's public model and endpoint APIs](https://openrouter.ai/api/v1/models). Each model has a specific provider tag, precision, context/output limits and a consistent input/output price pair from one endpoint. Promotional endpoints and tiered prices were excluded from this snapshot. The raw selected endpoint records are in `src/api-snapshot.json`. No cached-input discount is assumed. Published cached prices are recorded for provenance but not used. Credit purchase, platform, tax and other fees need documented monthly inputs. Routing to different providers changes the comparison; users must validate availability, rate limits and quality.
- Model cards remain linked for original evaluation results and deployment instructions. Task suggestions are editorial starting points, not a universal model ranking. API precision may differ from local precision. No quality parity is implied.

## Decision panels

Buy, rent and API panels show comparable monthly operating costs, upfront cash and the same automatic horizon total. Visible breakdowns reconcile with the calculator, including electricity, cooling, support, reserved compute and token charges. Hardware panels show full-demand capacity and the number of systems required; the buy panel shows separate sustained payback against renting and API. Price sources and assumptions remain labeled.

## Workflow

1. Select task and people/teams. Task templates fill calls, input/output tokens and concurrency. Assisted tasks use 9–5 weekdays; factory teams use 24/7 and an aggressive 2,880 calls/team/day default. These are assumptions, not observed industry averages.
2. Choose a model or accept the task suggestion.
3. Hardware selection is restricted to reviewed configurations. Until matching evidence is available, the hardware paths remain disabled. No memory-fit fallback is allowed.

Purchase prices without published totals receive editable whole-system allowances. Default throughput is a coarse proxy (unified memory 30 output-equivalent tokens/s, workstation/rental GPU 100, square-root node and concurrency scaling capped at 4× concurrency benefit; input tokens weighted at one tenth of output). Memory estimates assume 4-bit deployment and explicit headroom. These are deliberately transparent assumptions, not vendor measurements.

Defaults include 8% upfront purchase extras, $20/month local support, $50/month rental extras, 25% cooling overhead, and a 3/6-month model/hardware competitiveness policy. Aggressive defaults assume annual rental reductions of 50% and API token reductions of 80%, compounded monthly; purchase cost stays at today’s price. None of these allowances is a verified quote or obsolescence forecast.

## Power and cooling — Loudoun County, Virginia

Utility: Dominion Energy Virginia, business account, as requested. Simple mode assumes the marginal published GS-1 rate at 1,000 kWh/month baseline; account eligibility is unverified. Advanced mode allows confirmed GS-1 billing or a replacement bill rate. Standard **GS-1** is available only for eligible small-business accounts; the calculator requires the user to confirm this schedule and enter whole-site peak demand below 30 kW. It does not infer the building's tariff from a single computer's consumption. Other business tariffs, town tax jurisdictions, special contracts and minimum-demand arrangements require a documented all-in incremental bill rate instead.

Source: [Dominion's filed tariff](https://cdn-dominionenergy-prd-001.azureedge.net/-/media/content/rates-and-tariffs/pdfs/virginia/shared/entire-filed-tariff.pdf), downloaded September 22, 2026, and [Loudoun County commercial utility tax](https://www.loudoun.gov/1570/Business-Tax-Rates).

The implementation includes GS-1 distribution/generation blocks at 1,400 kWh, summer generation rates in June–September, base transmission, applicable standard riders effective September 2026, deferred fuel, the sales/use surcharge, and the consumption-tax tiers at 2,500 and 50,000 kWh. County commercial tax is $0.92 plus $0.005393/kWh, capped at $72/account/month. It calculates the incremental bill above existing site consumption, first adding IT, then cooling. Existing fixed meter charges cancel. Additional meter/installation costs belong in the quoted cost fields. Special exemptions, contracts and data-center tax classifications are outside this small-business calculation.

Monthly IT kWh and extra cooling kWh start with planning allowances and can be replaced by the technical/HVAC team. They remain separate; no PSU-rating or GPU-TDP conversion is made. Monthly kWh inputs are treated as a recurring planning energy budget, with seasonal tariff changes applied. Future tariffs are unknown and the published rate structure is held constant for projections. New workload measurements should include corresponding updated energy measurements.

## Cost model

Capacity = estimated or measured completed requests/hour × operating hours for each system independently. Measurements must include both prefill and decode and match the chosen workload, model, runtime, precision and concurrency. Runtime peak memory is compared with verified/user-documented usable memory and the catalog's installed capacity. Summed VRAM or node memory alone does not establish sharding support.

Hardware paths never fall back to the API for unserved work. Paid rental hours cover the full operating window, assuming instances can be stopped/restarted outside that window. Persistent-storage and other fees are separate. The user must enter documented setup, support, tax, API-platform and other fees, even when confirmed zero. All numbers entered by the user are marked as user-supplied evidence, not independently verified by the application.

The cash-flow engine evaluates 120 months. The chart automatically extends beyond a short competitiveness window. An earlier crossing that later reverses is not accepted. The default display spans 12 months; only the first 3 months count toward the default purchase decision. Unknown paths are omitted, not plotted as free. Simple mode fills every required input with sourced data or labeled assumptions; invalid advanced overrides are reported. Resale, financing, growth, future hardware purchases and future model capability are not forecast.

Historical declines cannot establish a future annual discount. Optional price changes therefore require a contract/reference and are explicitly conditional user inputs. Lifecycle alerts are compact, with a details modal, and use editable planning review intervals; no universal industry-standard replacement cycle is asserted.

## Development

```sh
npm test
npm run build
npm start
```

No dependencies or API keys are needed at runtime. The site uses a dated static catalog, not a background price feed. Source updates require review and a new deployment. GitHub Actions runs tests, builds `dist/`, and deploys GitHub Pages.

## Exclusive paths, normalized costs and phase performance

Buy and rent scale whole system/instance quantities upward to cover all demand; neither includes API requests. Capacity scaling assumes independent serving replicas and linear replication. Setup/support/storage allowances are per configured unit; all electricity/cooling usage is aggregated before tariff calculation. A memory-incompatible or zero-throughput path is unavailable, not supplemented with API.

All three cards show upfront cash, first-month recurring operations, and amortized all-in monthly cost. The latter divides cumulative spend by a common comparison period: the earlier model or hardware refresh deadline (3 months by default). Fractional months interpolate cumulative cash flows. Break-even is not a prediction of physical useful life. Amortization periods are capped at the 120-month calculation window.

Prefill and decode speeds are separately editable per configured system at selected concurrency. Request service time = input tokens / prefill tokens-per-second + output tokens / decode tokens-per-second. Requests/hour = 3600 / service time unless overridden by a benchmark. No overlap, queueing, network latency or batching efficiency is additionally modeled. Cards compare hardware phase-speed ratio with task token ratio and show phase-time shares plus fleet token demand. Default speed proxies are not benchmark results.

## Frontier additions (2026-09-22)

Added DeepSeek V4.1 Flash, GLM-5.3, GLM-5.3 Flash, Qwen3.8 2.4T A95B, Qwen3.8 27B and MiniMax M2.7. Vendor model cards provide evaluation evidence; provider-specific nonpromotional endpoint prices are captured in api-snapshot.json. Task shortlists are editorial, with office work/instruction-following used as explicit proxies for business, support and writing. Vendor benchmark settings differ; no universal cross-model ranking is claimed. Memory planning allowances remain assumptions. The largest Qwen may exceed every catalog rental's usable-memory budget; it is flagged rather than assigned a fictional rental.

## Long View decision overview

The top of the page is a standalone decision overview: cumulative cash curves with a zero-dollar baseline, readable month/USD axes, line patterns and direct endpoint labels, an accessible month inspector, and synchronized upfront/operating/amortized/total cost summaries. The headline ranks available paths at the displayed automatic horizon, with savings against the next available option. Joint purchase payback is marked only if sustained against both alternatives. Shading beyond assumed hardware life flags that replacements are not included. Unavailable configurations and assumptions are visible in this same overview. Supporting configuration and detailed evidence follow below.

## Aggressive innovation scenario

Default economic deadline = min(model refresh 3 months, hardware competitiveness 6 months). These are aggressive adoption assumptions, not physical expiration dates or industry guarantees. A better model may be larger, smaller or more efficient; no specific future parameter size is asserted. A purchase must recover its cost against both alternatives strictly before this deadline; later savings never qualify it for recommendation. Amortization uses the same useful window. The 12-month graph retains faded same-model context after the deadline; it does not simulate purchasing replacement generations.

Default rental compute price declines 50%/year and API input/output rates decline 80%/year, via monthly compounding. Power, support and fixed fees do not decline. Purchase equipment is bought at current cost (default purchase discount 0%). The rates are sensitivity assumptions, not contracted prices. Trend context: [NVIDIA annual generation cadence](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Kicks-Off-the-Next-Generation-of-AI-With-Rubin--Six-New-Chips-One-Incredible-AI-Supercomputer/) and [Stanford historical inference cost declines](https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts). Neither source validates the exact default forecast.

## Cost–capability comparison

Below Long View, the Pareto chart compares the selected model with GPT-5.6 Sol/Terra/Luna and GPT-6 Astra/Sol/Luna (max reasoning). The default pairs Artificial Analysis Intelligence Index v4.3.2 scores with its measured weighted cost per benchmark task, checked September 23, 2026. It is a frontier only among displayed configurations, not the whole market or a task-specific success measure. Sources are linked in the UI and `src/frontier-data.js`. Estimated or unverified scores are excluded rather than imputed.

The optional per-call view applies the configured input/output token mix to each model’s sourced API rates. It accounts for OpenAI’s >272K input pricing and context/output limits, and excludes caching, tool fees and subscription costs. It is not cost per successful business task; that requires a shared pilot including reasoning usage, retries and tools. The basis is saved in configuration URLs. Benchmark quality does not certify a local quantization or selected provider.

## Fine-tuning mode

Inference remains the landing mode, including when training settings were previously saved. The Inference / Fine-tuning toggle preserves separate settings. Training share links open fine-tuning explicitly, and Download assumptions exports the active mode's inputs and calculations.

Fine-tuning covers supervised LoRA (BF16 base) and QLoRA for every open-weight model currently in the inference picker, plus gpt-oss-20b. `src/training.js` derives the selector from the existing model catalog and an explicit reviewed parameter-count registry. New inference entries need training eligibility and parameter evidence before inclusion. Model-card URLs are retained in each training profile. Counts are rounded total checkpoint parameters reported by publisher cards, not active MoE counts; special auxiliary modules and mixed precision require recipe validation. Multimodal models are included for text-only adaptation; image/video training is outside this version.

The gpt-oss profiles use Unsloth's reported recipe memory references (120b: 65 GB QLoRA / 210 GB LoRA; 20b: 14 / 44 GB). Other models use a generic assumption: total parameters × 0.625 bytes for quantized base weights or 2 bytes for BF16 base weights, plus 16 bytes per trainable adapter parameter (default 0.1% of total parameters). Both approaches add an illustrative activation allowance of 8 GB × sequence length / 4,096 × per-GPU microbatch. This is not an architecture-specific peak-memory predictor. Users can enter measured aggregate peaks. All models require reviewed end-to-end configuration records before cost comparisons are enabled; user confirmation is insufficient. Open weights do not prove that every LoRA/QLoRA implementation works; model licenses remain applicable.

Usable GPU memory is assumed to be 95% of installed VRAM. Memory-only GPU counts do not unlock hardware selection. Multi-GPU paths require reviewed evidence of a successful sharded training run. Custom clusters and positive quotes do not bypass the verification gate. No inference replication or linear training speedup is inferred.

Training time = examples × mean processed tokens × epochs / whole-system training tokens/sec, plus percentage evaluation/checkpoint overhead and fixed loading/export time. Defaults of 125–500 tokens/sec for purchase and 250–1,000 for rental are independent illustrative sensitivity assumptions, not hardware benchmarks or model-scaled predictions. Model, method, sequence, microbatch, adapter, token-length or hardware changes invalidate relevant overrides and restore those explicit assumptions. Use a pilot for defensible estimates. The calculator predicts run completion, not achievement of a capability target.

The two result cards show hours, GPU-hours, operating cost per run, allocated cost per run and campaign cash. Purchase allocation uses expected runs/month × allocation months; campaign cash includes full equipment and installation upfront. Rental uses the full instance/cluster hourly rate plus per-run extras. Purchase operations include training energy, cooling and support allocated by run cadence. Payback compares the slower purchase case with the faster rental case; recovery beyond the chosen allocation window does not justify buying. Data preparation, staff, evaluation-lab hosting, idle power, financing, replacements and failed experiments are excluded. Full-parameter fine-tuning, DPO and RL are not yet modeled.

Sources reviewed 2026-09-23: publisher model cards linked in the selector; [Unsloth gpt-oss requirements](https://unsloth.ai/docs/models/gpt-oss-how-to-run-and-fine-tune); [120B recipe](https://github.com/unslothai/notebooks/blob/main/python_scripts/gpt-oss-%28120B%29_A100-Fine-tuning.py). Hardware rates reuse the dated Lambda catalog; purchase totals are editable planning allowances, not verified quotes.

Run cadence is checked against a 730-hour planning month. If the slower case cannot fit on the configured system, the UI flags it and does not qualify purchase payback within the allocation window; it does not silently add parallel training clusters.
