# Inference Ledger · LLM Cost Calculator

A dependency-free SPA for deciding when to own local LLM hardware instead of paying for cloud inference. All calculations run in your browser. No account, API keys, backend, analytics, or external runtime dependencies.

## Run

Requires Node.js 22 or later. No install step needed.

```sh
npm start          # http://localhost:4173
npm test           # calculation tests
npm run build      # static deliverable in dist/
```

Serve `dist/` with any static host. Relative asset paths also work beneath a repository subpath. Do not open index.html using file://, because ES modules require HTTP. The included development server binds to localhost only.

## What's included

- Users, parallel agents, activity-derived concurrency and manual batch override.
- Per-call input/output volume, serving window, context, quantization and memory estimation.
- Mac Studio M5 Ultra 256/512 GB, DGX Spark, dual RTX 4090/5090, dual RTX 6000 Ada, RTX PRO 6000 Blackwell, dual A100 and dual H100.
- Qwen3-Coder 30B, Qwen3-Coder-Next, gpt-oss-120b, MiniMax M2.5 and DeepSeek V3.2. These are a curated SWE/reasoning shortlist suitable for evaluating security-code analysis; no cyber benchmark ranking or equal task quality is implied.
- Cloud API input/output/cache pricing; separate cloud GPU rental budget.
- Electricity, cooling, maintenance/admin, setup, horizon and terminal resale.
- Capacity-limited local serving plus priced API overflow, cumulative cost graph, cash payback and capacity-checked volume threshold.
- Editable performance assumptions, local browser persistence, JSON scenario export and reset.

## Data quality and provenance

Catalog reviewed **September 22, 2026**. Primary source URLs live beside each record in `src/catalog.js` and appear in the app. Model counts, context and hardware memory are spec-based. **Every purchase price, system power value, GPU performance rate, cache coefficient and default API rate is a planning assumption.** Replace these with actual quotes and measurements before purchasing hardware. Defaults are USD, exclude sales tax and financing, and model 30-day months.

Both M5 Ultra presets use an **M4 Max proxy**, without any M5 performance uplift. The source is [MLX-LM's benchmark table](https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/BENCHMARKS.md): Qwen3-30B-A3B-Instruct-2507 Q4 at 113.33 generation tok/s and 1,753.90 prompt tok/s on a 64 GB M4 Max, 2,048 prompt and 128 generated tokens, MLX-LM 0.28.2. This is a related Instruct checkpoint, not a measurement of the selected Coder model. Cross-model/precision/batch scaling is explicitly heuristic. More memory does not increase the two Mac presets' assumed speed.

Model sources: [Qwen Coder 30B](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct), [Qwen Coder Next](https://huggingface.co/Qwen/Qwen3-Coder-Next), [gpt-oss](https://huggingface.co/openai/gpt-oss-120b), [MiniMax M2.5](https://huggingface.co/MiniMaxAI/MiniMax-M2.5), [DeepSeek V3.2](https://huggingface.co/deepseek-ai/DeepSeek-V3.2).

Hardware sources: [Apple specs](https://www.apple.com/mac-studio/specs/), [DGX Spark](https://marketplace.nvidia.com/en-us/enterprise/personal-ai-supercomputers/dgx-spark/), [NVIDIA GPU types](https://docs.nvidia.com/brev/reference/gpu-types), [RTX PRO 6000](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/). Additional product links are in the catalog.

## Calculation contract

1. Requests/month = users × agents/user × calls/agent/day × work days. Every agent loop call is a request. Include billable reasoning tokens in output. Activity percentage affects concurrency only.
2. Auto batch = ceil(users × agents × active fraction), minimum 1. Manual batch overrides this. A lower batch can introduce queues that the latency estimate does not model.
3. Weight memory in decimal GB = total model parameters in billions × bits/8 × (1 + overhead fraction). MoE uses **total**, not active, parameters. Cache GB = context tokens × cache MB/token × batch / 1000. Installed memory minus reserve is usable. Cache coefficients are approximate, including hybrid/MLA architectures; use measured allocation. Native MXFP4 and mixed precision can deviate from generic Q4.
4. Batch-1 heuristic = reference × sqrt(3.3/active parameters) × (30.5/total parameters)^0.15 × 4/bits. A nonzero prefill/decode override replaces the heuristic rate. Both paths apply the speed multiplier and batch^exponent. These are synthetic estimates, not a performance model validated across architectures. Benchmark with your exact model, quantization, runtime, batch and context.
5. Service seconds/request = input / aggregate prefill + output / aggregate decode. Capacity = monthly serving seconds × utilization cap / service seconds. Local requests are capped by capacity; memory/context invalidity yields zero local requests. Per-stream decode = aggregate / batch. Prefill time and end-to-end batch latency exclude queueing, network, tool calls and scheduling delays.
6. API cost uses separate uncached input, cached input and output prices. The same rates price overflow. Default rates are examples; switching models does not change them. API caching does not reduce local prefill in this model.
7. Energy kWh = [idle W × 720 + (load − idle W) × active hours] / 1000 × cooling multiplier. Active hours = served requests × service seconds / 3600. Idle draw continues outside the serving window.
8. Local monthly expense = energy + maintenance + API overflow. Cash payback = (purchase + setup) / (API-only monthly cost − local monthly expense), if the denominator is positive. A result beyond the horizon is labeled. Resale does not affect cash payback.
9. Local horizon TCO = purchase + setup + monthly expense × months − terminal resale. Resale appears only in the final chart month. Volume threshold amortizes net capital over the horizon and accounts for idle/maintenance and incremental energy. Thresholds beyond local capacity are not presented as achievable.
10. Rental cost = full-configuration hourly price × billed hours + storage/egress. This is a budget reference only: the app does not establish rented capacity, memory, throughput or equivalence. Use API comparison for the capacity-constrained break-even result.

Memory fit does not guarantee runtime/quantization support. Multi-GPU configurations require model sharding; VRAM is not magically shared. No CPU offload, redundant failover, financing, tax treatment, hardware replacement or workload growth is modeled. Task success, latency requirements and provider rate limits must be evaluated independently. A model that costs less per token can cost more per successful task.

## Project map

- `src/catalog.js`: sourced specs and clearly identified editable assumptions.
- `src/engine.js`: pure calculation and input normalization.
- `src/app.js`: controls, charts, comparison table and local persistence.
- `tests/engine.test.js`: arithmetic, capacity, invalid fit/context and edge cases.
- `.github/workflows/ci.yml`: tests and static build on push / pull request.

To calibrate, benchmark the exact model at batch 1, input length and quantization; enter prefill/decode rates under Performance & memory assumptions, then adjust batch scaling from measured runs. Set exponent 0 for no batching gain. Set speed to 50% and 150% to test uncertainty. Prices should include the host, GPUs, RAM, storage, PSU, cooling and any electrical work.
