# Weekly model endpoint audit — recovered primary evidence

- Target System: project
- Change Classification: project
- Authorized Scope: APP-000306 NEW model-recovery306/** public source audit/proposals only; APP304 and all src/application/userstate read-only
- Affected Paths or Resources: 38 unauthenticated primary-source metadata GETs, one web metadata query, this NEW prefix
- Owning Role: Researcher /root/calculator_audit304
- Related Requirements: REQ-000057; owning AGENTS requirements1–9 and canonical weekly model review
- Related Tasks: TASK-000165 / RUN-000160 plan revision8
- Approval Requirements: APP-000306; independent305, separate implementation admission and normal owning-public-repository delivery pending

All19 maintained model endpoint APIs and their19 actual canonical README cards returned HTTP200. The matrix records every expected provider/tag/precision, prompt/completion/cache rate, context, output/prompt limit, current status/discount/tier, raw source URL/UTC/hash and JSON pointer.18 selected tuples are present and one remains absent. Exactly one selected tuple has maintained-field drift: GLM5.3 same-provider pricing. These are source observations, not future availability, runtime compatibility or quality guarantees.

| ID | Maintained selected tag / precision | Current exact selected tuple | Card review |
|---|---|---|---|
| ds41 | relace / unknown | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |
| glm53 | inceptron/fp4 / fp4 | Present; status0/discount0; two price leaves drift | README retrieved; claim pointers reviewed |
| glm53flash | z-ai/fp8 / fp8 | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |
| qwen38large | siliconflow/fp8 / fp8 | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |
| qwen38small | darkbloom/fp4 / fp4 | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |
| minimax27 | minimax/fp8 / fp8 | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |
| nemotron-lightning | darkbloom/int4 / int4 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| kimi3 | relace/fp4 / fp4 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| nemotron-ultra | deepinfra/fp4 / fp4 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| nemotron-super | deepinfra/bf16 / bf16 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| minimax | venice / unknown | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| qwen80 | parasail/bf16 / bf16 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| kimi25 | siliconflow/int4 / int4 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| nemotron-nano | novita/fp4 / fp4 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| deepseek | deepinfra/fp4 / fp4 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| oss120 | akashml/bf16 / bf16 | Present; status0/discount0; owned fields unchanged | README retrieved; identity reviewed |
| qwen30 | novita/fp8 / fp8 | Absent; retained historical gap | README retrieved; identity reviewed |
| oss20 | akashml/fp4 / fp4 | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |
| granite42 | deepinfra/bf16 / bf16 | Present; status0/discount0; owned fields unchanged | README retrieved; claim pointers reviewed |

[Source evidence](source-evidence.json) preserves HTTP headers, final URLs, UTC, SHA256 and byte sizes for every raw body. [Audit matrix](audit-matrix.json) stores exact historical/current tuples and per-card line pointers, including all eight maintained evaluation descriptions. Selected tuples are matched by provider_name AND tag AND quantization; neither aggregate model price nor a different provider is substituted. Native checkpoint precision never establishes serving endpoint precision. Existing unknown-precision selected records remain unknown; none is newly qualified. Status0, discount0 and null service_tier are raw metadata predicates, not certified uptime.

The [GLM5.3 primary endpoint API](https://openrouter.ai/api/v1/models/z-ai/glm-5.3/endpoints) same Inceptron/fp4 row changes prompt and cache-read pricing only. Full exact rates/old-new/digest/UTC are in [proposed-data-diff.json](proposed-data-diff.json), which references one coherent raw endpoint row. No numeric pricing is maintained in this prose.17 other present selected tuples have no owned-field drift. qwen30 Novita/fp8 remains absent in the [raw primary endpoint response](raw/qwen30-endpoints.body); two different-provider alternatives are observed but not selected. The healthy unknown-precision alternative cannot replace known precision; no replacement is forced.

README inspection corroborates existing vendor-report evaluation wording and identity with source line pointers. Vendor results remain vendor claims; no independent benchmark quality or default choice is asserted. GLM Flash benchmark chart is an unfetched image; methodology text was observed, no numerical score claim added. Linked license terms, architecture config, pinned revisions, image scores and external papers were not reverified. Dataset-wide/full-audit freshness therefore remains historical; do not advance whole review dates from this endpoint/card partial review. Frontier weekly maintenance is a separate overdue dependency, untouched; rental freshness comes from separate work.

Prior304 remains immutable with39 conservative attempts including38 pre-HTTP DNS failures. Those transport failures are not endpoint absence. Recovery306 used38 unauthenticated raw GETs plus1 mandatory primary web query:39new/78cumulative, within40new/79cumulative. All38 raw GETs HTTP200; no retry/redirect/auth/account/inference/browser/GPU/install/Git mutation. Body cache948949bytes under20MiB; every network GET timeout30s, max1 concurrency, underCPU2 envelope. No429 or shared transport failure occurred. Precise CPU/model/token/cost telemetry unknown.
