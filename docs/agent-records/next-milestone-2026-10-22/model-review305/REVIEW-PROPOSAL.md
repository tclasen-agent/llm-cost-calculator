# Independent model source and proposal review

- Target System: project
- Change Classification: project
- Authorized Scope: APP-000305 new model-review305/** independent static evidence only; all source/304/306 read-only
- Affected Paths or Resources: pinned304/306 inventories, primary receipts, 19 selected endpoint tuples, README pointers and prospective two-leaf GLM price refresh
- Owning Role: Reviewer /root/calculator_review305
- Related Requirements: REQ-000057; owning AGENTS requirements1–9, canonical data ownership and preserved buy/rent/API/user inputs
- Related Tasks: TASK-000165 / RUN-000160 plan revision9
- Approval Requirements: APP-000305 review admission; separate implementation admission, independent affected review and normal public owning-repo PR/main/live verification remain mandatory

Decision: PASS_SOURCE_PROPOSAL_ONLY. This independent execution authored neither source candidate. Authority is APP305 under existing owner project grant; this is a review finding for Coordinator/project authority, not an approval of unseen implementation or final product acceptance. Observation: 2026-10-23T08:10:37.726158+00:00.

Exact subjects: model-audit304/CANDIDATE.json SHA256 e17c4825ea71267b37f7f1b9464429673b932e4a2bae56a8d20b9e160ef38ff4 and model-recovery306/CANDIDATE.json SHA256 87c6a3a657571814ce1d5bd4be443e0ad93fe2eaf14c7efe49980416f0baafda. Complete inventories, bytes, modes and source baselines match. qualified-map.json binds all135 subject entries, all19 qualified model records, original body digests, exact JSON pointers and independently computed full-row canonical digests. Recorded head7071c89bf1832b07b6066889c381ef7d10979d20 was not re-queried via Git; recorded source file bytes were independently compared directly. No Git operation was authorized or performed.

Expected versus observed criteria: all16 automated static criteria verified with no failure. Two candidate pins and complete path sets match; every listed file is a regular non-symlink with matching digest/size/mode; all recorded canonical source baselines match. Exactly19 IDs and38 raw receipts cover each ID's endpoint API and actual canonical README. Every raw response has status200 in both receipt and retained header, exact original/final canonical URL, coherent UTC, matching body digest/size, no recorded retry or redirect. Retained collector has fixed GET, no authentication, no follow redirect and finite30s timeout.38 old DNS failures plus1 web query and38 recovery GETs plus1 web query yield78 cumulative, no inferred endpoint absence from DNS. Body bytes948949 remain below20MiB. Static evidence cannot independently prove absence of unrecorded requests or replay network execution.

The same provider/tag/quantization tuple is present for18 models:17 have no owned-field drift. Only glm53 differs, at raw /data/endpoints/9 in body SHA256 1a9341cf7e94c61c0e96758087eca8493e5abbf3fbcdaaff97f1f0736e1da377, observed2026-10-23T08:00:56.106376+00:00. The single coherent Inceptron/inceptron/fp4/fp4 row supports prompt USD/token0.00000055→0.0000004 and cache-read USD/token0.00000018→0.00000012. Completion0.00000196, context1048576, max completion943718, null max prompt, and all routing/precision fields remain identical. Raw status0/discount0/null tier are metadata observations, not future availability guarantees. Cache remains provenance only. Exact proposed endpoint equals the independently projected raw owned fields.

qwen30 Novita/novita/fp8/fp8 is absent from its two-row response; this is selected-tuple absence, not model unavailability. Retain its historical tuple and explicit evidence gap. Neither different-provider alternative is qualified or selected. No invented zero/free/unknown rate or known-to-unknown precision substitution is permitted.

All19 README identities and their pointers were inspected. The eight existing evaluation descriptions have relevant retained line evidence; DeepSeek and GLM table headers/values/settings and MiniMax values support vendor-report wording. Qwen descriptions remain vendor claims, GLM Flash score chart remains unfetched, and no new image score is claimed. README frontmatter does not establish linked legal terms, immutable revisions, actual config/weights, serving precision or runtime compatibility. These remain unverified. models.maintenance.reviewed remains2026-09-27; neither dataset-wide nor global/full-card freshness can advance. Frontier weekly work remains a separate dependency. Public source bodies, request metadata and public project facts were inspected; a narrow credential-pattern scan found no private-key/token patterns. This is not exhaustive secret detection.

Qualified future scope is exactly the two GLM leaves in src/data/models.js plus required generated inventory and evidence/tests under separate admission. Preserve every other rate, provider, precision, ID, card/evaluation, limit, default, benchmark, memory fact and user measurement. Optional endpoint metadata/schema expansion in the proposal is excluded from this PASS and needs separate design/affected review. Maintained facts stay uniquely owned by src/data; audit snapshots are immutable evidence.

Implementation remains unverified/excluded here: no source edit, inventory generation, npm tests/build, browser/default/reset/saved/shared/all-enabled-selector transitions, transactional invalid preservation, both-mode buy/rent/API behavior, Git/publication or Pages/live check occurred. Root must admit implementation, perform meaningful data/provenance/default-path verification, regenerate inventory, run required tests/build/browser checks, obtain independent affected-candidate review, and complete normal public PR/main/authorized live verification before product acceptance. This source-proposal PASS supplies none of those later outcomes.

Evaluator: verify.py v1, Python standard library, static file decoding/hash/comparison only; one run exit0. Read-only cat/rg/Python inspections and one credential-pattern scan also exit0; no failed operation or retry. Requested model inherited parent; actual native model/reasoning/CPU/token/cost unknown. CPU2 bound, each pure command under120s, completed before15 active-minute checkpoint; precise active/CPU telemetry unavailable. No services/processes or scheduled work continue. Source/304/306 remain read-only. Only NEW model-review305 files were created. No network, lifecycle/inference/auth/GPU/install/Git/delegation operation.

Evidence identities:

{"path": "qualified-map.json", "sha256": "f96ba667a15354a1ded2c81e7509258fdf074a0deb9275071c7d98356b868cca", "bytes": 56380, "mode": "0o644"}

{"path": "verify.py", "sha256": "7258177eb939fa71fad72f2d7284e2d400b3834132a54f7f1ca2f243af3f1421", "bytes": 8328, "mode": "0o644"}

Worker handoff: review evidence is local and frozen, not remote-main delivery. Root owns canonical records, IDs, implementation, affected review, Git and live checks. Rollback: no product mutation to undo; preserve evidence and return any changed subject for affected review. No subject changes after this exact review are covered. Claim released; ALL STOP.
