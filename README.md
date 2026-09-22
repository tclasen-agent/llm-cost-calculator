# Inference Ledger

A static, responsive calculator comparing a complete purchased AI system, an actual rented GPU instance, and an API endpoint for the same named model.

## Evidence policy — reviewed September 22, 2026

Catalog prices and specifications link to the vendor or provider that publishes them. A source verifies only the fields it actually reports. Published MSRP, provider list prices, configured quotes and user-entered measurements are distinguished. Missing values are `null`, never zero. No synthetic model throughput, memory-overhead coefficient, cooling multiplier, workload token preset, rental availability, or industry obsolescence period is supplied.

- Purchase catalog: actual Apple, NVIDIA, AMD, Framework, HP, Puget and Supermicro offerings. NVIDIA Spark's $4,699 US MSRP comes from its [price-change announcement](https://forums.developer.nvidia.com/t/2-23-2026-price-change-announcement/361713). AMD's $3,999 Ryzen AI Halo system price is [reported by AMD](https://www.amd.com/en/blogs/2026/amd-ryzen-ai-halo-is-designed-for-the-agentic-era.html). Both need checkout confirmation. Other full-system prices remain unknown. Configurable workstations and clusters require a complete build description and quote, including networking.
- Rental catalog: [Lambda on-demand instances](https://lambda.ai/instances). Rates are USD per GPU-hour multiplied by actual GPU count, not whole-server prices accidentally applied per card. For example, the 8× H100 SXM instance is 8 × $3.99 = $31.92/hour. Host resources are the published full-instance CPU, RAM and local SSD. Stock and region availability are not verified. Additional storage, taxes and fees need evidence.
- API catalog: [OpenRouter's public model and endpoint APIs](https://openrouter.ai/api/v1/models). Each model has a specific provider tag, precision, context/output limits and a consistent input/output price pair from one endpoint. Promotional endpoints and tiered prices were excluded from this snapshot. The raw selected endpoint records are in `src/api-snapshot.json`. No cached-input discount is assumed. Published cached prices are recorded for provenance but not used. Credit purchase, platform, tax and other fees need documented monthly inputs. Routing to different providers changes the comparison; users must validate availability, rate limits and quality.
- Model cards remain linked for original evaluation results and deployment instructions. Task suggestions are editorial starting points, not a universal model ranking. API precision may differ from local precision. No quality parity is implied.

## Workflow

1. Choose a task and number of people or autonomous teams. AI-assisted SWE follows 9–5 Monday–Friday. The full-auto factory operates all calendar hours, with no human in the loop. Calls/day, tokens/call and concurrency must come from a pilot/log; a job title alone cannot establish them. Holidays are not deducted. Calendar month length and weekdays are calculated.
2. Choose the model and inspect the exact API endpoint and rates.
3. Choose a complete purchase system and a real rental instance. Automatic rental suggestions choose the cheapest listed instance with at least the target memory. This is a memory shortlist, not proof of equal performance or deployability. If no instance matches, the UI says so. Separate benchmarks are required for each hardware path.

Each section keeps its basic controls visible and measurement/quote fields in collapsed advanced sections. Changing task, model, token mix, concurrency, scale, or selected system clears affected measurements. The complete configuration and evidence references are shareable in the URL. Do not enter confidential content into evidence notes intended for sharing. Reset clears the URL and restores defaults. Old schema-1 URLs/local storage are not imported: their illustrative values cannot be promoted to verified evidence.

## Power and cooling — Loudoun County, Virginia

Utility: Dominion Energy Virginia, business account, as requested. Standard **GS-1** is available only for eligible small-business accounts; the calculator requires the user to confirm this schedule and enter whole-site peak demand below 30 kW. It does not infer the building's tariff from a single computer's consumption. Other business tariffs, town tax jurisdictions, special contracts and minimum-demand arrangements require a documented all-in incremental bill rate instead.

Source: [Dominion's filed tariff](https://cdn-dominionenergy-prd-001.azureedge.net/-/media/content/rates-and-tariffs/pdfs/virginia/shared/entire-filed-tariff.pdf), downloaded September 22, 2026, and [Loudoun County commercial utility tax](https://www.loudoun.gov/1570/Business-Tax-Rates).

The implementation includes GS-1 distribution/generation blocks at 1,400 kWh, summer generation rates in June–September, base transmission, applicable standard riders effective September 2026, deferred fuel, the sales/use surcharge, and the consumption-tax tiers at 2,500 and 50,000 kWh. County commercial tax is $0.92 plus $0.005393/kWh, capped at $72/account/month. It calculates the incremental bill above existing site consumption, first adding IT, then cooling. Existing fixed meter charges cancel. Additional meter/installation costs belong in the quoted cost fields. Special exemptions, contracts and data-center tax classifications are outside this small-business calculation.

Monthly IT kWh and extra cooling kWh must be measured or documented by the technical/HVAC team. They remain separate; no PSU-rating or GPU-TDP conversion is made. Monthly kWh inputs are treated as a recurring measured energy budget, with seasonal tariff changes applied. Future tariffs are unknown and the published rate structure is held constant for projections. New workload measurements should include corresponding updated energy measurements.

## Cost model

Capacity = measured completed requests/hour × operating hours for each system independently. Measurements must include both prefill and decode and match the chosen workload, model, runtime, precision and concurrency. Runtime peak memory is compared with verified/user-documented usable memory and the catalog's installed capacity. Summed VRAM or node memory alone does not establish sharding support.

Unserved work is charged at the same-model API endpoint. Paid rental hours cover the full operating window, assuming instances can be stopped/restarted outside that window. Persistent-storage and other fees are separate. The user must enter documented setup, support, tax, API-platform and other fees, even when confirmed zero. All numbers entered by the user are marked as user-supplied evidence, not independently verified by the application.

The cash-flow engine evaluates 120 months. The chart automatically extends beyond the later sustained payback against both API and rental, capped at 120 months. An earlier crossing that later reverses is not accepted. If no joint payback exists, the display uses a five-year window; that is a presentation choice, not an equipment-life claim. Unknown paths are omitted, not plotted as free. A purchase recommendation is withheld until all required evidence exists. Resale, financing, growth, future hardware purchases and future model capability are not forecast.

Historical declines cannot establish a future annual discount. Optional price changes therefore require a contract/reference and are explicitly conditional user inputs. Lifecycle alerts are compact, with a details modal, and use only user-documented review intervals; no universal industry-standard replacement cycle is asserted.

## Development

```sh
npm test
npm run build
npm start
```

No dependencies or API keys are needed at runtime. The site uses a dated static catalog, not a background price feed. Source updates require review and a new deployment. GitHub Actions runs tests, builds `dist/`, and deploys GitHub Pages.
