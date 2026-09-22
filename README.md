# Inference Ledger

A static, responsive calculator comparing a complete purchased AI system, an actual rented GPU instance, and an API endpoint for the same named model.

## Simple planning and provenance

Simple mode always provides a complete three-way comparison. Choose a task and scale; model and hardware suggestions fill downstream selections. Every numerical planning input is populated. Advanced fields show automatic defaults versus your overrides; clearing a field or restoring assumptions regenerates defaults. Reset restores the default scenario and clears the URL.

Published catalog prices/specifications and actual rental/API rates retain dated vendor links. Workload, memory, throughput, unquoted purchase prices, power, cooling, fees and lifecycle review intervals are **planning assumptions**, not benchmarks, quotes or industry facts. `src/planning.js` documents the full set. Estimates are suitable for early budgeting; validate them before purchasing. Advanced overrides persist across simple changes and shared URLs; review their relevance after changing hardware or workload.

- Purchase catalog: actual Apple, NVIDIA, AMD, Framework, HP, Puget and Supermicro offerings. NVIDIA Spark's $4,699 US MSRP comes from its [price-change announcement](https://forums.developer.nvidia.com/t/2-23-2026-price-change-announcement/361713). AMD's $3,999 Ryzen AI Halo system price is [reported by AMD](https://www.amd.com/en/blogs/2026/amd-ryzen-ai-halo-is-designed-for-the-agentic-era.html). Both need checkout confirmation. Other full-system prices use explicitly labeled planning allowances. Configurable workstations and clusters require a complete build description and quote, including networking.
- Rental catalog: [Lambda on-demand instances](https://lambda.ai/instances). Rates are USD per GPU-hour multiplied by actual GPU count, not whole-server prices accidentally applied per card. For example, the 8× H100 SXM instance is 8 × $3.99 = $31.92/hour. Host resources are the published full-instance CPU, RAM and local SSD. Stock and region availability are not verified. Additional storage, taxes and fees need evidence.
- API catalog: [OpenRouter's public model and endpoint APIs](https://openrouter.ai/api/v1/models). Each model has a specific provider tag, precision, context/output limits and a consistent input/output price pair from one endpoint. Promotional endpoints and tiered prices were excluded from this snapshot. The raw selected endpoint records are in `src/api-snapshot.json`. No cached-input discount is assumed. Published cached prices are recorded for provenance but not used. Credit purchase, platform, tax and other fees need documented monthly inputs. Routing to different providers changes the comparison; users must validate availability, rate limits and quality.
- Model cards remain linked for original evaluation results and deployment instructions. Task suggestions are editorial starting points, not a universal model ranking. API precision may differ from local precision. No quality parity is implied.

## Decision panels

Buy, rent and API panels show comparable monthly operating costs, upfront cash and the same automatic horizon total. Visible breakdowns reconcile with the calculator, including electricity, cooling, support, reserved compute and token charges. Hardware panels show full-demand capacity and the number of systems required; the buy panel shows separate sustained payback against renting and API. Price sources and assumptions remain labeled.

## Workflow

1. Select task and people/teams. Task templates fill calls, input/output tokens and concurrency. Assisted tasks use 9–5 weekdays; factory teams use 24/7 and an aggressive 2,880 calls/team/day default. These are assumptions, not observed industry averages.
2. Choose a model or accept the task suggestion.
3. Accept the least-cost memory-fit purchase allowance and an actual memory-fit rental, or select other systems. Systems estimated not to fit are explicitly unavailable; adding replicas does not pool memory. Memory fit is not a runtime compatibility guarantee.

Purchase prices without published totals receive editable whole-system allowances. Default throughput is a coarse proxy (unified memory 30 output-equivalent tokens/s, workstation/rental GPU 100, square-root node and concurrency scaling capped at 4× concurrency benefit; input tokens weighted at one tenth of output). Memory estimates assume 4-bit deployment and explicit headroom. These are deliberately transparent assumptions, not vendor measurements.

Defaults include 8% upfront purchase extras, $20/month local support, $50/month rental extras, 25% cooling overhead, and a 3/6-month model/hardware competitiveness policy. Aggressive defaults assume annual rental reductions of 50% and API token reductions of 80%, compounded monthly; purchase cost stays at today’s price. None of these allowances is a verified quote or obsolescence forecast.

## Power and cooling — Loudoun County, Virginia

Utility: Dominion Energy Virginia, business account, as requested. Simple mode assumes the marginal published GS-1 rate at 1,000 kWh/month baseline; account eligibility is unverified. Advanced mode allows confirmed GS-1 billing or a replacement bill rate. Standard **GS-1** is available only for eligible small-business accounts; the calculator requires the user to confirm this schedule and enter whole-site peak demand below 30 kW. It does not infer the building's tariff from a single computer's consumption. Other business tariffs, town tax jurisdictions, special contracts and minimum-demand arrangements require a documented all-in incremental bill rate instead.

Source: [Dominion's filed tariff](https://cdn-dominionenergy-prd-001.azureedge.net/-/media/content/rates-and-tariffs/pdfs/virginia/shared/entire-filed-tariff.pdf), downloaded September 22, 2026, and [Loudoun County commercial utility tax](https://www.loudoun.gov/1570/Business-Tax-Rates).

The implementation includes GS-1 distribution/generation blocks at 1,400 kWh, summer generation rates in June–September, base transmission, applicable standard riders effective September 2026, deferred fuel, the sales/use surcharge, and the consumption-tax tiers at 2,500 and 50,000 kWh. County commercial tax is $0.92 plus $0.005393/kWh, capped at $72/account/month. It calculates the incremental bill above existing site consumption, first adding IT, then cooling. Existing fixed meter charges cancel. Additional meter/installation costs belong in the quoted cost fields. Special exemptions, contracts and data-center tax classifications are outside this small-business calculation.

Monthly IT kWh and extra cooling kWh start with planning allowances and can be replaced by the technical/HVAC team. They remain separate; no PSU-rating or GPU-TDP conversion is made. Monthly kWh inputs are treated as a recurring planning energy budget, with seasonal tariff changes applied. Future tariffs are unknown and the published rate structure is held constant for projections. New workload measurements should include corresponding updated energy measurements.

## Cost model

Capacity = estimated or measured completed requests/hour × operating hours for each system independently. Measurements must include both prefill and decode and match the chosen workload, model, runtime, precision and concurrency. Runtime peak memory is compared with verified/user-documented usable memory and the catalog's installed capacity. Summed VRAM or node memory alone does not establish sharding support.

Unserved work is charged at the same-model API endpoint. Paid rental hours cover the full operating window, assuming instances can be stopped/restarted outside that window. Persistent-storage and other fees are separate. The user must enter documented setup, support, tax, API-platform and other fees, even when confirmed zero. All numbers entered by the user are marked as user-supplied evidence, not independently verified by the application.

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
