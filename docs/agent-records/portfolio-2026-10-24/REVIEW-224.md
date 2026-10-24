# Independent full-data review

- ID: REVIEW-224
- Status: verified
- Target System: project
- Change Classification: project
- Authorized Scope: independent read-only review of TASK-000212 candidate and review-owned TASK-000224 / RUN-000219 evidence
- Affected Paths or Resources: /Users/Shared/llm-cost-calculator; owned temporary loopback/browser resources
- Owning Role: Reviewer /root/review_calculator_all_data, fresh execution without implementation authorship
- Related Requirements: REQ-000057; project AGENTS.md rules 1–9
- Related Tasks: TASK-000224, TASK-000212
- Approval Requirements: APP-000397 technical recommendation; operator project promotion authority and normal protected delivery remain separate
- Decision Time: 2026-10-24T20:32:00Z
- Plan Revision: 1

Technical review PASS. This is an independent review of the full maintained-data refresh, including assumptions and missing evidence. It is not remote-main delivery or a compatibility certification.

Reviewed repository: https://github.com/tclasen-agent/llm-cost-calculator.git. Baseline `cef513dc15f335027c67a58ff952665e06feae40`; PR9 subject `26b681ccbc730cc00d362737d9d852c3f42394a3`, tree `8cdcce3e5f61962bf6cca45a20d2bd6fc6a7544f`. Initial status had only the admitted untracked TASK-000224.md and RUN-000219.md. One registered primary worktree, no submodule output; no unrelated tracked changes. The final affected source delta is removal of the single historical partial-review comment in src/data/frontier.js. I inspected its exact diff: no value, metadata, import or executable code changes. Prior behavioral checks remain applicable; the source hash below binds the corrected file.

| Criterion | Independently observed evidence | Outcome |
|---|---|---|
| Full maintained-data breadth | Registry has 22 datasets and recursively 1,174 scalar/null/empty-collection leaves. Every dataset leaf count and JSON values SHA256 matches SOURCE-RECEIPTS.json. Every referenced receipt ID resolves. Assumptions, defaults, links, training policies/methods and the empty exact-run registry are included, not only prices. | verified |
| Actual primary evidence | All 92 non-null receipt digests match retained raw bodies under /private/tmp/calculator-audit-20261024. Eight web-only receipts honestly have null digests. I separately browsed primary pages on October 24 and compared current changing facts below. A digest is provenance, not independently a correctness test. | verified with stated sampling |
| Model endpoints and checkpoint/memory facts | Independently parsed all 19 retained endpoint responses. Selected provider/tag/precision/context/prompt/output limits and all maintained price fields match the same row; each has discount 0 and null service tier. Independently parsed all 19 HF model-size summaries: every maintained checkpoint parameter total matches; every four-bit memory assumption exceeds raw half-byte parameter storage. This arithmetic does not prove runtime fit. | verified |
| Benchmarks and reference data | Independently parsed all 14 selected and seven reference score/task-cost pairs plus v4.3.2 presence. All match retrieved evaluator pages. All five excluded models have N/A measured task cost. DeepSeek original variant cost is 0.48; MiniMax M2.7 is excluded; GPT-6.1 Sol is 52 / 0.72. Current official reference price/limit checks below corroborate the added release. | verified |
| Hardware, rental, utility and recipe coverage | Inspected complete-system scope, null/allowance handling and reference derivations. Current primary checks corroborate HP prices/placeholder, Apple variants, Framework retained/new configurations, all 22 Lambda table records, county taxes, Unsloth recipes and experimental PPO. Hash-verified filed tariff text supports GS-1 energy blocks, all 17 riders, tax tiers, surcharge and eligibility. | verified, no availability/quote/pilot claim |
| Assumptions and evidence gaps | Inspected inference/training memory, speed, power, fee, lifecycle, month/calendar, method and workload defaults and their maintenance procedures. They remain labeled assumptions; no unsupported recalibration, synthetic user evidence, measured equivalence or exact reviewed configuration was inserted. New distinct model/hardware releases have explicit further-review dispositions. | verified |
| Canonical architecture and required checks | All maintained data stays in registered src/data modules; application diff is cache-version references. No constants allowlist change. Test updates follow current tuples/dates and add migration, quote and withdrawn-benchmark checks without removing behavior checks. npm test exit0, 263 pass/0 fail/0 skipped. npm run build exit0. npm run data:inventory exit0, 22/1,174, generated file unchanged. git diff --check exit0. Node v26.12.1/macOS. | verified |
| Initial/reset/saved/shared/recovery browser behavior | Independently reran committed browser-check.mjs against 127.0.0.1:4213 with existing headless Chromium/GPU disabled: 140 assertions, 67 enabled default-state inference options, 15 explained incompatible options, 46 training selectors, zero page exceptions. Actual storage/URL measurements, saved quote, stable ID, reset and retained rejected historical input pass. | verified within script scope |
| Selector breadth and transactional rendering | The 140-assertion script alone is narrower than prior 348-transition evidence: training checks only rendering text and default-state inference loops omit workload/model traversal and actual disabled rejection. A separate independent supplement traversed all enabled models under every enabled workload: 144 workload/model transitions, 16 disabled model attempts rejected without persisted-state mutation, 605 assertions. Each accepted transition checks three finite calculated paths, three rendered scorecards with finite costs and independently computed uncached API billing. Invalid token edits preserve both saved state and displayed last result with explanation. Exact served inventory bytes match. Zero page exceptions. Existing unchanged unit tests additionally traverse system selections per enabled model. Counts describe separate coverage; no equivalence or exhaustive Cartesian UI claim is made. | verified, prior coverage not silently substituted |
| Git delivery and live site | No reviewer Git mutation, merge or deployment. PR9 checks were reported successful by Coordinator but are not independently re-queried here. Remote main, merge containment, final candidate mapping and live-site observations remain Coordinator work under applicable authority. | pending/excluded from technical PASS |

Current primary-source spot checks were actually browsed, rather than inferred from implementer claims:

- HP G1a BN8E8UA shows sale price 4499 with 128 GB / 1 TB / PRO 395; RTX 4000 Ada BP6K7UA shows 4639 with 20 GB GPU / 64 GB host / 1 TB. The RTX 2000 Ada BP6K5UA page shows a 0.00 placeholder; null remains appropriate. [G1a](https://www.hp.com/us-en/shop/pdp/hp-z2-mini-g1a-workstation-desktop-pc-wolf-pro-security-edition-p-bn8e8ua-aba-1), [4000 Ada](https://www.hp.com/us-en/shop/pdp/hp-z2-mini-g1i-workstation-desktop-pc-wolf-pro-security-edition-p-bp6k7ua-aba-1), [2000 Ada](https://www.hp.com/us-en/shop/pdp/hp-z2-mini-g1i-workstation-desktop-pc-wolf-pro-security-edition-p-bp6k5ua-aba-1).
- Qwen30 currently has the complete SiliconFlow FP8 endpoint at prompt/completion 0.00000007 / 0.00000028 USD/token, context 262144, max completion 235929, null max prompt; the prior Novita endpoint is absent. [OpenRouter endpoint response](https://openrouter.ai/api/v1/models/qwen/qwen3-coder-30b-a3b-instruct/endpoints).
- All four GPU-count tables list the maintained 22 Lambda configurations, including per-GPU rates and complete-instance resources. [Lambda tables](https://lambda.ai/instances).
- Loudoun commercial electricity tax remains 0.92/month plus 0.005393/kWh capped at 72/month. [County rates](https://www.loudoun.gov/1570/Business-Tax-Rates). The filed tariff web tool returned inaccessible; the same-day primary PDF body was hash-verified and its extracted rates/tiers inspected instead. Its GS-1 filing is effective January 1, 2026; deferred fuel effective August 1, 2026. [Filed tariff](https://cdn-dominionenergy-prd-001.azureedge.net/-/media/content/rates-and-tariffs/pdfs/virginia/shared/entire-filed-tariff.pdf).
- Apple confirms maintained M5 Max 18/40 and M5 Ultra 36/80 configurations and relevant 128/256/512 GB options; no configured price was invented. [Apple specifications](https://www.apple.com/mac-studio/specs/). Framework advertises PRO 495/192 GB while the specs tab still lists Max+ 395/64/128 GB; retaining stable IDs and recording a distinct candidate is appropriate. [Framework specs](https://frame.work/desktop?tab=specs).
- GPT-6.1 Sol official standard input/output prices are 2/10 USD per million, context 1,050,000/output 128,000; above 272K input the multipliers are 2/1.5. [Official API page](https://developers.openai.com/api/docs/models/gpt-6.1-sol). The evaluator web tool exceeded its large-page limit for the DeepSeek page, so benchmark pair checks used hash-verified retained primary bodies, rather than claiming a fresh successful web render.
- Unsloth still lists QLoRA 14/65 GB and BF16 LoRA 44/210 GB for GPT-OSS20/120; these remain supervised recipe references. [Unsloth guide](https://unsloth.ai/docs/models/gpt-oss-how-to-run-and-fine-tune). TRL still locates PPOTrainer in experimental.ppo with policy/reference/reward/value model roles. [TRL PPO](https://huggingface.co/docs/trl/main/ppo_trainer).

Source/date limitation: I independently checked the whole registry accounting, all endpoint/checkpoint/benchmark tuples and the representative current sources above. I did not independently refetch all 100 source URLs or produce new user measurements. All-field review claims for unchanged editorial text and assumptions are assessed against their disclosed policy and evidence limits. The global October 24 date means a source/assumption review, not an offer, purchase quote, compatibility proof or pilot. Preserving unknown/null fields is required behavior.

Resource/failure history: initial sandboxed loopback bind failed EPERM; ordinary approved escalation allowed the same server. No product check failed. Both browser executions exited0 and closed contexts/browser in finally; owned server terminated with130 and port4213 subsequently returned ECONNREFUSED. No GPU, model request, paid resource, dependency install, outside message or unrelated write. No delegated workers. Raw source bodies were only read. Reviewer temporary scripts/logs/results are retained under /private/tmp/calculator-review224-*; durable summaries and hashes are below.

Handoff: TASK-000224/RUN-000219, Reviewer /root/review_calculator_all_data, project scope only. Product source remained read-only for this worker. Coordinator applied the exact inspected comment deletion. Reviewer owns this report, APP-000397 and review checkpoint additions in the assigned task/run. All browser/server claims are released. No merge occurred. Next safe action: Coordinator freezes the technical subject plus explicitly scoped evidence additions, checks the map, obtains any currently required operator promotion permission, completes normal PR checks/merge, verifies owning-remote main content and the affected live site. Keep tasks nonterminal until that delivery is observed. Corrective/revert PR is the rollback; no force/reset/clean.

Evidence and evaluator identity (SHA256):

```json
{
  "/private/tmp/calculator-review224-tests.log": "8d0d6fc24bd93b5a48e0dc7705778777edec20bfc9c9ace0c7ff1f839ccdc7ee",
  "/private/tmp/calculator-review224-build.log": "3027e21f477b1fa6fea618dc75dfeb3366c4f561829fc898add77bad2a2bcd7b",
  "/private/tmp/calculator-review224-inventory.log": "2316f0478d919b91c8a32c90d85545978ffc82469c9f2ba825084b0e1b7fd362",
  "/private/tmp/calculator-review224-hashes.json": "af5c9758fe2e2e9e783841e97ddbf06604c1d7d99f1342561133a2383aa26a73",
  "/private/tmp/calculator-review224-tuples.json": "4e15df84c7d3c8b9e3dff4c3918c68056ce084d0f9b3f6992e71b08534bb3163",
  "/private/tmp/calculator-review224-checkpoints.json": "67c676b9c7a101eb02cb2d4750c8bb27bb2cc95dc4152aa09cb4c4e6a9169918",
  "/private/tmp/calculator-review224-benchmarks.json": "df3f2f32c25ffeac0955993f1f989605ca4bbe354bafc1aa26f756dee3fa7a03",
  "/private/tmp/calculator-review224-browser.json": "91c599f64cceffe0350b42e10d716ee835e3f3eb8b363b1063d4788b6be3884f",
  "/private/tmp/calculator-review224-supplement.mjs": "cb637c7b36f558c9c2e4cd3a8bb2cbb465694cb75a6922cfc5cfa192a2341ca8",
  "/private/tmp/calculator-review224-supplement.json": "3d98860fe3802e707babad7b0e462c05c0d5ebd5936c9db24c0ec752bd80b21d",
  "AGENTS.md": "295d29e4310d32c14c2a63ebc02545476feb5f860b2e35242e3d6596ac1a9fb8",
  "src/data/README.md": "5d01b31447b7c2814dfdc784f838261adfaf5879a79522d75ac64aa99ff66b93",
  "src/data/registry.js": "d04513778e5cd10d7df78f45695155df575495620e755356904b64759da1965f",
  "src/data/frontier.js": "4bb7d8367cab8a714c2f75932c36a36a1306807f93e82a318b623b71a3851103",
  "docs/agent-records/portfolio-2026-10-24/VALIDATION.md": "85ccf7d24733625ee51170c05c06e62561dd2a4c9395b641be378945b437ee8d",
  "docs/agent-records/portfolio-2026-10-24/SOURCE-RECEIPTS.json": "94b594366463cbd595d17c933bf84115d13aad7edefa0bff5980e5ae7f829003",
  "docs/agent-records/portfolio-2026-10-24/BROWSER-RESULTS.json": "aafa12d853d86058e0328134443ba7d4b124b6d3a8d1c5f8da186a64c94419ca",
  "docs/agent-records/portfolio-2026-10-24/browser-check.mjs": "adfe8a1db8437c54d14957264b44da622f9ebade0fbd9bd315d24e80bb658587",
  "/Users/Shared/agent-org/AGENTS.md": "a70c0bfd3142f63c18892f8ff299e81bb1f2aa0e4094bb4d69736cceaf3f61f3",
  "/Users/Shared/agent-org/policies/AUTHORITY.md": "082de2f8fec06bc6dc9027d2f8605ca61cda12a5f5c175d1c3019bd1035d1118",
  "/Users/Shared/agent-org/policies/SCOPE_BOUNDARIES.md": "928bd2564f7090cfc2379c5362e9265aab83d6ec42ee830106c4da24a3380b82",
  "/Users/Shared/agent-org/agents/reviewer/AGENTS.md": "44c74153fcb9a21eb69026d303428666ef4e5cc878cd9cccdd2607c5fa8920ff",
  "/Users/Shared/agent-org/agents/reviewer/CONTEXT.md": "40eeb8053d4ba743fb805bd2ddde44c603c926d66b99b2c9b49046db54e5c872",
  "/Users/Shared/agent-org/policies/ACCEPTANCE.md": "e4df277eb7c64b7a3f89f8620e914912e6772a130a96b6891e2bea7935d202c5",
  "/Users/Shared/agent-org/policies/APPROVALS.md": "65e6f15ab93cdf1aba5eecc172a51aa8484e0be35a67e29936b5b3cacca976b2",
  "/Users/Shared/agent-org/policies/GIT.md": "5e0494d5903bada6d309295d06b8fcf815972165a05e517cc692a6460b806001",
  "/Users/Shared/agent-org/policies/CHANGE_CONTROL.md": "95b9916fbbd0ce42e8d32c70b98c20b9bc15103761e62af18df8c69459254207"
}
```
