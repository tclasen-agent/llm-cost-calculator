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
    "reviewed": "2026-11-10",
    "frequency": "Weekly; on benchmark version, pricing or promotion changes.",
    "source": "sources.benchmark, sources.methodology and record source/priceSource",
    "how": "Refresh comparable benchmark score, task cost and reasoning setting together. API prices USD/million tokens. Update all reference context limits and long-context multipliers; review promotion at its date. Never impute missing scores."
  },
  "values": {
    "benchmarkVersion": "Artificial Analysis Intelligence Index v5.0.1",
    "referenceModels": [
      {
        "id": "gpt-5.6-sol",
        "name": "GPT-5.6 Sol",
        "score": null,
        "taskCost": null,
        "input": 4,
        "output": 20,
        "source": "https://artificialanalysis.ai/models/gpt-5-6-sol",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-5.6-sol"
      },
      {
        "id": "gpt-5.6-terra",
        "name": "GPT-5.6 Terra",
        "score": 32.0,
        "taskCost": 3.73,
        "input": 2,
        "output": 12,
        "source": "https://artificialanalysis.ai/models/gpt-5-6-terra",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-5.6-terra"
      },
      {
        "id": "gpt-5.6-luna",
        "name": "GPT-5.6 Luna",
        "score": 24.0,
        "taskCost": 0.33,
        "input": 0.2,
        "output": 1.2,
        "source": "https://artificialanalysis.ai/models/gpt-5-6-luna",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-5.6-luna"
      },
      {
        "id": "gpt-6-astra",
        "name": "GPT-6 Astra",
        "score": 57.0,
        "taskCost": 6.24,
        "input": 10,
        "output": 50,
        "source": "https://artificialanalysis.ai/models/gpt-6-astra",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6-astra"
      },
      {
        "id": "gpt-6-sol",
        "name": "GPT-6 Sol",
        "score": 44.0,
        "taskCost": 2.47,
        "input": 2,
        "output": 10,
        "source": "https://artificialanalysis.ai/models/gpt-6-sol",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6-sol"
      },
      {
        "id": "gpt-6-luna",
        "name": "GPT-6 Luna",
        "score": 28.0,
        "taskCost": 0.15,
        "input": 0.1,
        "output": 0.5,
        "source": "https://artificialanalysis.ai/models/gpt-6-luna",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6-luna"
      },
      {
        "id": "gpt-6.1-sol",
        "name": "GPT-6.1 Sol",
        "score": 55.0,
        "taskCost": 1.27,
        "input": 2,
        "output": 10,
        "source": "https://artificialanalysis.ai/models/gpt-6-1-sol",
        "priceSource": "https://developers.openai.com/api/docs/models/gpt-6.1-sol"
      }
    ],
    "selectedBenchmarks": {
      "ds41": {
        "score": null,
        "taskCost": null,
        "variant": "max reasoning",
        "source": "https://artificialanalysis.ai/models/deepseek-v4-1-flash"
      },
      "glm53": {
        "score": 32.0,
        "taskCost": 5.01,
        "variant": "max reasoning",
        "source": "https://artificialanalysis.ai/models/glm-5-3"
      },
      "glm53flash": {
        "score": 28.0,
        "taskCost": 0.58,
        "variant": "AA evaluated configuration",
        "source": "https://artificialanalysis.ai/models/glm-5-3-flash"
      },
      "qwen38large": {
        "score": null,
        "taskCost": null,
        "variant": "AA evaluated configuration",
        "source": "https://artificialanalysis.ai/models/qwen3-8-2-4t-a95b"
      },
      "qwen38small": {
        "score": 20.0,
        "taskCost": 3.53,
        "variant": "xhigh reasoning",
        "source": "https://artificialanalysis.ai/models/qwen3-8-27b"
      },
      "kimi3": {
        "score": null,
        "taskCost": null,
        "variant": "max reasoning",
        "source": "https://artificialanalysis.ai/models/kimi-k3"
      },
      "nemotron-ultra": {
        "score": 12.0,
        "taskCost": 2.23,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b"
      },
      "nemotron-super": {
        "score": null,
        "taskCost": null,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/nvidia-nemotron-3-super-120b-a12b"
      },
      "nemotron-nano": {
        "score": null,
        "taskCost": null,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/nvidia-nemotron-3-nano-30b-a3b-reasoning"
      },
      "oss120": {
        "score": 4.0,
        "taskCost": 0.35,
        "variant": "high reasoning",
        "source": "https://artificialanalysis.ai/models/gpt-oss-120b"
      },
      "nemotron-lightning": {
        "score": 6.0,
        "taskCost": 0.31,
        "variant": "AA evaluated configuration",
        "source": "https://artificialanalysis.ai/models/nemotron-3-5-lightning"
      },
      "qwen80": {
        "score": null,
        "taskCost": null,
        "variant": "non-reasoning",
        "source": "https://artificialanalysis.ai/models/qwen3-coder-next"
      },
      "oss20": {
        "score": null,
        "taskCost": null,
        "variant": "high reasoning",
        "source": "https://artificialanalysis.ai/models/gpt-oss-20b"
      },
      "granite42": {
        "score": 5.0,
        "taskCost": 0.04,
        "variant": "reasoning",
        "source": "https://artificialanalysis.ai/models/granite-4-2-8b"
      },
      "kimi25": {
        "score": null,
        "taskCost": null,
        "variant": "Comparable current setting unavailable",
        "source": "https://artificialanalysis.ai/models/kimi-k2-5"
      },
      "minimax": {
        "score": null,
        "taskCost": null,
        "variant": "Comparable current setting unavailable",
        "source": "https://artificialanalysis.ai/models/minimax-m2-5"
      },
      "deepseek": {
        "score": null,
        "taskCost": null,
        "variant": "Comparable current setting unavailable",
        "source": "https://artificialanalysis.ai/models/deepseek-v3-2"
      },
      "qwen30": {
        "score": null,
        "taskCost": null,
        "variant": "Comparable current setting unavailable",
        "source": "https://artificialanalysis.ai/models/qwen3-coder-30b-a3b-instruct"
      },
      "minimax27": {
        "score": null,
        "taskCost": null,
        "variant": "Comparable current setting unavailable",
        "source": "https://artificialanalysis.ai/models/minimax-m2-7"
      }
    },
    "missingBenchmarks": {
      "kimi25": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "minimax": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "deepseek": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "qwen30": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "minimax27": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "gpt-5.6-sol": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "ds41": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "qwen38large": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "kimi3": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "nemotron-super": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "nemotron-nano": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "qwen80": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded.",
      "oss20": "No comparable Intelligence Index score and measured task cost are published for this exact model/setting under the current benchmark version; historical values are excluded."
    },
    "longInputMultiplier": 2,
    "longOutputMultiplier": 1.5,
    "promotion": {
      "model": "gpt-5.6-sol",
      "through": "2026-11-30",
      "qualification": ""
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
