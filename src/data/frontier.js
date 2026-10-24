/**
 * frontier — published
 * Source: sources.benchmark, sources.methodology and record source/priceSource
 * Review frequency: Weekly; on benchmark version, pricing or promotion changes.
 * Update: Refresh comparable benchmark score, task cost and reasoning setting together. API prices USD/million tokens. Update all reference context limits and long-context multipliers; review promotion at its date. Never impute missing scores.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-10-24",
    "frequency": "Weekly; on benchmark version, pricing or promotion changes.",
    "source": "sources.benchmark, sources.methodology and record source/priceSource",
    "how": "Refresh comparable benchmark score, task cost and reasoning setting together. API prices USD/million tokens. Update all reference context limits and long-context multipliers; review promotion at its date. Never impute missing scores."
  },
  "values": {
    "benchmarkVersion": "Artificial Analysis Intelligence Index v4.3.2",
    "referenceModels": [
      {
        "id": "gpt-5.6-sol",
        "name": "GPT-5.6 Sol",
        "score": 47,
        "taskCost": 1.99,
        "input": 4,
        "output": 20,
        "source": "https://artificialanalysis.ai/models/gpt-5-6-sol",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-5.6-sol"
      },
      {
        "id": "gpt-5.6-terra",
        "name": "GPT-5.6 Terra",
        "score": 42,
        "taskCost": 1.4,
        "input": 2,
        "output": 12,
        "source": "https://artificialanalysis.ai/models/gpt-5-6-terra",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-5.6-terra"
      },
      {
        "id": "gpt-5.6-luna",
        "name": "GPT-5.6 Luna",
        "score": 37,
        "taskCost": 0.18,
        "input": 0.2,
        "output": 1.2,
        "source": "https://artificialanalysis.ai/models/gpt-5-6-luna",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
      },
      {
        "id": "gpt-6-astra",
        "name": "GPT-6 Astra",
        "score": 53,
        "taskCost": 3.26,
        "input": 10,
        "output": 50,
        "source": "https://artificialanalysis.ai/models/gpt-6-astra",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6-astra"
      },
      {
        "id": "gpt-6-sol",
        "name": "GPT-6 Sol",
        "score": 48,
        "taskCost": 1.04,
        "input": 2,
        "output": 10,
        "source": "https://artificialanalysis.ai/models/gpt-6-sol",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6-sol"
      },
      {
        "id": "gpt-6-luna",
        "name": "GPT-6 Luna",
        "score": 38,
        "taskCost": 0.07,
        "input": 0.1,
        "output": 0.5,
        "source": "https://artificialanalysis.ai/models/gpt-6-luna",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6-luna"
      },
      {
        "id": "gpt-6.1-sol",
        "name": "GPT-6.1 Sol",
        "score": 52,
        "taskCost": 0.72,
        "input": 2,
        "output": 10,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-sol",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
      }
    ],
    "selectedBenchmarks": {
      "ds41": {
        "score": 39,
        "taskCost": 0.48,
        "variant": "max reasoning",
        "source": "https://artificialanalysis.ai/models/deepseek-v4-1-flash"
      },
      "glm53": {
        "score": 45,
        "taskCost": 2.01,
        "variant": "max reasoning",
        "source": "https://artificialanalysis.ai/models/glm-5-3"
      },
      "glm53flash": {
        "score": 42,
        "taskCost": 0.28,
        "variant": "AA evaluated configuration",
        "source": "https://artificialanalysis.ai/models/glm-5-3-flash"
      },
      "qwen38large": {
        "score": 40,
        "taskCost": 2.16,
        "variant": "AA evaluated configuration",
        "source": "https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b"
      },
      "qwen38small": {
        "score": 34,
        "taskCost": 1.01,
        "variant": "xhigh reasoning",
        "source": "https://artificialanalysis.ai/models/qwen3-8-27b"
      },
      "kimi3": {
        "score": 44,
        "taskCost": 2,
        "variant": "max reasoning",
        "source": "https://artificialanalysis.ai/models/kimi-k3"
      },
      "nemotron-ultra": {
        "score": 23,
        "taskCost": 0.47,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b"
      },
      "nemotron-super": {
        "score": 13,
        "taskCost": 1.64,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/nvidia-nemotron-3-super-120b-a12b"
      },
      "nemotron-nano": {
        "score": 9,
        "taskCost": 0.02,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/nvidia-nemotron-3-nano-30b-a3b-reasoning"
      },
      "oss120": {
        "score": 12,
        "taskCost": 0.11,
        "variant": "high reasoning",
        "source": "https://artificialanalysis.ai/models/gpt-oss-120b"
      },
      "nemotron-lightning": {
        "score": 13,
        "taskCost": 0.08,
        "variant": "AA evaluated configuration",
        "source": "https://artificialanalysis.ai/models/nemotron-3-5-lightning"
      },
      "qwen80": {
        "score": 9,
        "taskCost": 0.47,
        "variant": "non-reasoning",
        "source": "https://artificialanalysis.ai/models/qwen3-coder-next"
      },
      "oss20": {
        "score": 9,
        "taskCost": 0.01,
        "variant": "high reasoning",
        "source": "https://artificialanalysis.ai/models/gpt-oss-20b"
      },
      "granite42": {
        "score": 11,
        "taskCost": 0.02,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/granite-4-2-8b"
      }
    },
    "missingBenchmarks": {
      "kimi25": "The model page reports an intelligence score but no measured cost per task for this benchmark version; excluded from the cost-per-task comparison.",
      "minimax": "The model page reports an intelligence score but no measured cost per task for this benchmark version; excluded from the cost-per-task comparison.",
      "deepseek": "The model page reports an intelligence score but no measured cost per task for this benchmark version; excluded from the cost-per-task comparison.",
      "qwen30": "The model page reports an intelligence score but no measured cost per task for this benchmark version; excluded from the cost-per-task comparison.",
      "minimax27": "The current model page no longer reports a measured cost per task for this benchmark version; excluded rather than retaining the previous cost."
    },
    "longInputMultiplier": 2,
    "longOutputMultiplier": 1.5,
    "promotion": {
      "model": "gpt-5.6-sol",
      "through": "2026-11-21",
      "qualification": "at least"
    },
    "referencePolicy": {
      "context": 1050000,
      "maxOutput": 128000,
      "longThreshold": 272000,
      "variant": "max reasoning"
    },
    "referenceLabel": "GPT-5.6, GPT-6 and GPT-6.1",
    "referenceNaming": "GPT-6.1 Sol is included alongside the published GPT-6 and GPT-5.6 comparison models. GPT-5.6 Sol is the gpt-5.6 alias."
  }
};
