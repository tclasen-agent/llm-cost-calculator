# GLM selected endpoint rate update

- Target System: project
- Change Classification: project
- Authorized Scope: APP311 only two glm53 rate leaves/generated inventory/one data test/new311 evidence
- Affected Paths or Resources: src/data/models.js; src/data/INVENTORY.md; tests/data.test.js; model-update311/**
- Owning Role: Developer /root/calculator_audit304
- Related Requirements: REQ-000057; owningAGENTS1–9
- Related Tasks: TASK-000165 / RUN-000160 revision10
- Approval Requirements: APP311; fresh affected305/rootbrowser/normal owning PR/main/live pending

Implemented exactly the two305-qualified GLM prompt/cache-read USD/token string leaves in models.js. The whole resulting selected endpoint equals the frozen306 coherent raw row. Provider/tag/fp4, companion completion price, context/output/prompt limits and every other model/card/evaluation/default/date remain byte-identical. Cache remains provenance only. Canonical inventory was regenerated; only the corresponding two rows differ.

One new data test binds the full selected tuple and verifies raw USD/token→USD/million conversion and actual engine API charges for620 synthetic October requests. Independently calculated cost is0.6138USD from ordinary prompt plus completion pricing; the test would fail if cache pricing were incorrectly applied. First execution caught strict binary floating-point comparison; corrected just that test assertion to existing1e-12 tolerance while retaining exact raw strings. Original failure retained.

Canonical inventory exit0; npm test260/260 pass; npm run build exit0. Command logs and exact exits/timing are retained. CHECKS.json proves source/inventory/test scope and exact immutable304/306/305 identities. No browser or live claim; root owns those checks and fresh affected305 review. No network/inference/auth/native/GPU/dependency install. One unnecessary read-only git status occurred despite the no-Git task boundary; no Git mutation and no more Git commands.
