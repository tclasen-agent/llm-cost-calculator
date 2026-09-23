/**
 * workloads — assumption
 * Source: Illustrative usage templates and editorial shortlists; models.*.source; no archived usage pilots
 * Review frequency: Monthly; after workload changes, model releases or evaluations.
 * Update: Update calls/person/day, input/output tokens/call, concurrent activity/person, ordered editorial shortlist and rationale.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "Monthly; after workload changes, model releases or evaluations.",
    "source": "Illustrative usage templates and editorial shortlists; models.*.source; no archived usage pilots",
    "how": "Update calls/person/day, input/output tokens/call, concurrent activity/person, ordered editorial shortlist and rationale."
  },
  "values": {
    "chat": {
      "name": "Simple Chat",
      "calls": 30,
      "input": 1500,
      "output": 500,
      "activity": 0.1,
      "models": [
        "glm53flash",
        "qwen38small",
        "ds41",
        "glm53",
        "oss20",
        "granite42"
      ],
      "rationale": "Instruction following and general reasoning inform this shortlist."
    },
    "research": {
      "name": "Research",
      "calls": 40,
      "input": 12000,
      "output": 2500,
      "activity": 0.2,
      "models": [
        "ds41",
        "qwen38large",
        "glm53",
        "kimi3"
      ],
      "rationale": "Reasoning, tool-use and research evaluations inform this shortlist."
    },
    "bizdev": {
      "name": "Business Development",
      "calls": 35,
      "input": 6000,
      "output": 1500,
      "activity": 0.15,
      "models": [
        "minimax27",
        "glm53",
        "qwen38large",
        "glm53flash"
      ],
      "rationale": "Office-work and tool-use evaluations are proxies for business development; validate against your own workflow."
    },
    "swe": {
      "name": "AI-assisted SWE",
      "calls": 75,
      "input": 12000,
      "output": 2500,
      "activity": 0.4,
      "models": [
        "ds41",
        "glm53",
        "minimax27",
        "qwen38large",
        "qwen80"
      ],
      "rationale": "Coding-agent and repository-level evaluations inform this shortlist."
    },
    "swe-factory": {
      "name": "Full-auto software factory · 24/7",
      "calls": 2880,
      "input": 24000,
      "output": 4000,
      "activity": 8,
      "models": [
        "ds41",
        "glm53",
        "minimax27",
        "qwen38large"
      ],
      "rationale": "Coding and tool-use evaluations inform this shortlist; no benchmark guarantees unattended success."
    },
    "support": {
      "name": "Customer Support",
      "calls": 100,
      "input": 3000,
      "output": 700,
      "activity": 0.3,
      "models": [
        "glm53flash",
        "minimax27",
        "qwen38small",
        "glm53",
        "oss20",
        "granite42"
      ],
      "rationale": "Instruction following and tool-use are proxies for support quality; validate your policies and knowledge base."
    },
    "writing": {
      "name": "Writing & Content",
      "calls": 35,
      "input": 4000,
      "output": 2000,
      "activity": 0.15,
      "models": [
        "qwen38large",
        "minimax27",
        "glm53flash",
        "qwen38small"
      ],
      "rationale": "Instruction-following and office-work evaluations are proxies for writing quality; judge outputs against your brand and audience."
    },
    "security": {
      "name": "Security Analysis",
      "calls": 60,
      "input": 16000,
      "output": 3000,
      "activity": 0.4,
      "models": [
        "ds41",
        "glm53",
        "kimi3",
        "nemotron-ultra"
      ],
      "rationale": "Published security evaluations inform this shortlist where available; coding/reasoning capability alone is not a cyber benchmark."
    }
  }
};
