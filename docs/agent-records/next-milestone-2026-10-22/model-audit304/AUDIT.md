# Weekly model facts audit — incomplete

- Target System: project
- Change Classification: project
- Authorized Scope: APP-000304 NEW model-audit304/** evidence/proposal only; source/application/userstate read-only
- Affected Paths or Resources: public primary-source unauthenticated metadata GET attempts and this audit prefix
- Owning Role: Researcher /root/calculator_audit304
- Related Requirements: REQ-000057; owning AGENTS requirements 1–9
- Related Tasks: TASK-000165 / RUN-000160 plan revision 7
- Approval Requirements: APP-000304; independent APP305 and separately admitted implementation/normal PR/main delivery remain pending

Observed 2026-10-23 UTC. Baseline main `7071c89bf1832b07b6066889c381ef7d10979d20`. All 19 maintained models and their selected provider, tag, precision, price pair/cache rate, context, output and prompt limits are inventoried in [audit-matrix.json](audit-matrix.json). Maintained tuples are historical snapshots, not fresh price claims. Model cards/evaluation text and identities were not reverified.

| Stable ID | Historical selected tag / precision | Current endpoint coverage | Card coverage | Disposition |
|---|---|---|---|---|
| ds41 | relace / unknown | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| glm53 | inceptron/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| glm53flash | z-ai/fp8 / fp8 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| qwen38large | siliconflow/fp8 / fp8 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| qwen38small | darkbloom/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| minimax27 | minimax/fp8 / fp8 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| nemotron-lightning | darkbloom/int4 / int4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| kimi3 | relace/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| nemotron-ultra | deepinfra/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| nemotron-super | deepinfra/bf16 / bf16 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| minimax | venice / unknown | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| qwen80 | parasail/bf16 / bf16 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| kimi25 | siliconflow/int4 / int4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| nemotron-nano | novita/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| deepseek | deepinfra/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| oss120 | akashml/bf16 / bf16 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| qwen30 | novita/fp8 / fp8 | Provisional selected-row absence in web extractor; local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| oss20 | akashml/fp4 / fp4 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |
| granite42 | deepinfra/bf16 / bf16 | Unknown: local DNS failure | Unknown: local DNS failure | Retain historical tuple |

The web tool successfully opened the [canonical qwen30 endpoint API](https://openrouter.ai/api/v1/models/qwen/qwen3-coder-30b-a3b-instruct/endpoints). Its extracted JSON showed two different-provider rows and no maintained selected row. This is provisional provenance only: original HTTP response bytes/status/headers and raw JSON SHA256 are unavailable. No price or eligible replacement is certified by that observation. Preserve the qwen30 gap. A healthy row with unknown precision cannot establish a replacement for reviewed known precision; this audit selects no replacement, including known-precision alternatives.

All 38 local attempts failed before HTTP with DNS Errno8. Their zero-byte files are failure placeholders, not raw JSON. The script wrongly continued across the shared DNS failure instead of stopping after diagnosis; all distinct operations were attempted once, without retries. Coverage cannot be called complete merely because the attempted URL list covers all models.

No price/context/output/status tuple has raw-source current verification. No full-audit or model maintenance date can advance. No endpoint/model field, assumption, default, stable ID, benchmark or runtime was changed. Frontier has a separate overdue weekly review dependency; rentals were separately fresh per APP304 and were not re-audited.

Budget: 39 conservative requests/metadata attempts total (1 successful web query, 38 failed local attempts), cap40; raw response cache0 bytes, cap20MiB; max2 local workers; zero retries, inference/account/auth/browser/native/GPU/install/Git mutation. No 429 observed. No remaining network action is scheduled. Actual active CPU/token/cost telemetry unknown; start/read/fetch/freeze timestamps are wall-clock observations only.
