# Data-only proposal — preserve current source pending evidence

- Target System: project
- Change Classification: project
- Authorized Scope: APP-000304 NEW model-audit304/** evidence/proposal only; source/application/userstate read-only
- Affected Paths or Resources: public primary-source unauthenticated metadata GET attempts and this audit prefix
- Owning Role: Researcher /root/calculator_audit304
- Related Requirements: REQ-000057; owning AGENTS requirements 1–9
- Related Tasks: TASK-000165 / RUN-000160 plan revision 7
- Approval Requirements: APP-000304; independent APP305 and separately admitted implementation/normal PR/main delivery remain pending

Proposed current diff: none. Do not move `models.maintenance.reviewed` or global/full-audit dates. Every endpoint remains a historical snapshot; failed source access supplies no evidence for new prices, zero/free rates, availability, new provider, precision, limits or substitutions. Preserve IDs, cards, evaluation prose, memory assumptions, defaults and saved/shared inputs.

A future separately admitted audit should use a working unauthenticated public metadata transport, stop immediately on shared transport failure, fetch the 19 canonical `/endpoints` APIs with raw JSON receipts, and review the primary cards before any full-dataset freshness claim. Compare provider/tag/precision, coherent prompt/completion/cache rates, context/output/prompt limits, status and promotional/tier restrictions. Missing selected tuples remain explicit gaps; healthy unknown precision is not a qualified replacement for known precision. No candidate is chosen here.

If a later audit verifies only endpoints, propose explicit per-model endpoint review metadata with UTC, primary source URL and evidence digest in canonical `src/data/models.js`; keep the dataset date historical until cards/evaluations and all owned fields are reviewed. Do not publish this evidence matrix as a second maintained price table. Its snapshots document this audit only. Model architecture, license and evaluation claims require specific primary evidence and remain outside any endpoint-only refresh.

Any admitted implementation must update only the canonical dataset owners and regenerate inventory, then pass canonical tests/build and preserved initial/reset/saved/shared/both-mode selector transactional checks with usable buy/rent/API paths. No implementation, test run, release or delivery was performed here. Frontier weekly audit is a separately scoped dependency, not an implicit edit. Root owns independent305, any renewed audit budget, source admission and normal public owning-repository PR/main delivery.
