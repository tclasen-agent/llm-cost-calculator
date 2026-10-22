# Independent record ownership review 159 — llm-cost-calculator

- Target System: project
- Change Classification: project
- Authorized Scope: read-only frozen candidate; this review report only
- Affected Paths or Resources: docs/agent-records/record-ownership-2026-10-22/REVIEW-159.md
- Owning Role: Reviewer
- Related Requirements: REQ-000056
- Related Tasks: TASK-000159, TASK-000151
- Approval Requirements: APP-000110 review admission / APP-000109 user authority; independent approval and normal owning-main delivery remain required

TASK-000159 / RUN-000154; fresh independent execution `/root/record_ownership_review`, no implementation authorship. Observed 2026-10-22T14:38:57.554984+00:00. Requested model/reasoning gpt-6.1-sol/high; actual runtime configuration, token usage, billing and precise active time unknown. Review is within the 20-active-minute checkpoint, CPU-only. No delegation, subject correction, Git write, network write, model/runtime/native/GPU action or archived evidence-script execution occurred.

**Verdict: FAIL — ownership isolation blocks publication.** This reviews documentary relocation only. It does not accept product behavior, an experiment, a deployment or a milestone. The six-repository frozen candidate is rejected overall because two owning archives require correction.

Binding: root manifest SHA256 `0a7b043b98dd1581e372f1e5c7e90fea687450023a9a146200b22865b3b8c0eb`; this repository's worker manifest SHA256 `bd07e03ac0c16de26fddfeb7b300340776998c48ebca04dfe45ba929fa255a01`. Candidate has 80 files / 450580 bytes on `docs/record-ownership-20261022`, base/HEAD `6f211d553c9a8d834afbce0c80be572662ecdf95`, committed base tree `3062791a3797523dbe16bb724e4aaf492dfbfc21`. The file manifest binds the uncommitted documentation content; the base tree alone does not. Owning remote: https://github.com/tclasen-agent/llm-cost-calculator.git.

| Criterion | Expected / independently observed | Outcome |
| --- | --- | --- |
| Exact candidate and source identity | All listed file sizes/hashes match; worker-manifest digest matches. All 1217 immutable source-inventory files rehashed without mismatch at source commit `105c9f55b7f208b6f1717e522acfcc29f37a93eb`. | PASS |
| Exact copies and derived provenance | All source/destination digests in all shipped routing/provenance versions match; every declared exact-copy mode compares byte-identically. Native JSON Pointer/JSONL selections compare to original values (89 units); explicit character spans (497) and retained Markdown ranges after declared omissions compare without mismatch. Owner-paraphrase and transformed excerpts are labeled as derived. | PASS |
| Ownership isolation | Full retained-record alias/name scan and semantic review, distinguishing substantive other-owner facts from source identities and native worker identifiers. Blocking findings below. | FAIL |
| Coverage and history | Earlier cleanup/enrollment Markdown, later continuation and tracked native review/Git/learning metadata have explicit route/exclusion entries. Versioned records and source hashes remain recoverable. Historical failed, partial, unknown and pending statements remain documentary history; new guides do not turn them into fresh acceptance. | PASS, bounded static audit |
| Scope and payload | HEAD remains at admitted base; status has only the owning documentation prefix. Retained payloads are tracked textual records/metadata; references to media, corpus and local artifacts do not import their payloads. Credential-pattern scan found no credential payload. No application changes or application tests needed for this relocation. | PASS |
| Navigation | Every relative link in new archive-root Markdown resolves locally; archive guides explicitly explain original relative/local links and absent runtime artifacts. Remote main links are delivery targets, not independently observed publication. | PASS, local navigation only |
| Normal delivery | Candidate is still local documentation on its scoped branch. No new PR, merge or owning-remote main containment is established by this review. | PENDING; Coordinator owns delivery |

R159-L1 — critical public-repository ownership disclosure. `projections/tasks/project/TASK-000090.md:167` retains an unrelated owner’s PR/main/tree delivery tuple. It comes from immutable `agent-org/tasks/project/TASK-000090.md`, source line33, characters138–225 (zero-based character offsets with exclusive end), SHA256 `995cd95d991ba1b291faf3f350e888c6446b9fa945a6fd88b29a03fc8310df40`. `source-routing.json` declares exactly that selected span. The tuple is reproducible and correctly hashed, but belongs only in the other owner’s repository. This candidate targets the public `tclasen-agent/llm-cost-calculator` repository, so publication must remain blocked. The report deliberately does not repeat the unrelated delivery identifiers.

Correct the retained span, its provenance/destination hashes and dependent indexes/manifests in a freshly frozen candidate. Keep the rejected source/candidate snapshots immutable locally. Source-document filenames, native worker execution names and a brief worker reassignment label were inspected separately as coordination/provenance identifiers; they do not establish another project's product or test result and are not this finding.

Evidence is in the authorized ignored local review directory, not a portable project payload: `review159/audit.json` SHA256 `664cef7353030f373e2c0f58b8c64d87f04eb97c8caf23c9a18ff34a390878dc`, `review159/findings.json` SHA256 `23454cfbc27f67fc66bd68d18bc75650d46f4effeab102263a58162a7036adb3`, `review159/navigation-source.json` SHA256 `47f8752c6ef25ebf4dc8d90d788a609115147ae6b445337d5384a6614270e62e` beneath the root record-routing artifact directory. Static audit checks passed except the stated isolation findings. Formal organization tooling is unchanged; its structural validation does not prove product or ownership acceptance. External links and original test/runtime claims were not rerun or freshly verified; no original evidence script was executed.

Handoff: claim returns to Coordinator. Next safe action: preserve rejected v1 snapshots, admit only the named ownership repair, then freeze new exact content and obtain fresh affected independent review before any publication. No renewed operator permission is required for already authorized correct owning-repository publication. No task or parent completion is asserted.
