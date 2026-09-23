/**
 * trainingModels — published
 * Source: models.*.source; sources.training; training-only model source
 * Review frequency: Each model revision/addition or recipe/stack change.
 * Update: Record total checkpoint parameters in billions, not active MoE counts. Confirm license/stack eligibility; recipe memory GB applies only to the documented supervised objective.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-09-23",
    "frequency": "Each model revision/addition or recipe/stack change.",
    "source": "models.*.source; sources.training; training-only model source",
    "how": "Record total checkpoint parameters in billions, not active MoE counts. Confirm license/stack eligibility; recipe memory GB applies only to the documented supervised objective."
  },
  "values": {
    "ds41": {
      "parameters": 763
    },
    "glm53": {
      "parameters": 753
    },
    "glm53flash": {
      "parameters": 321
    },
    "qwen38large": {
      "parameters": 2400
    },
    "qwen38small": {
      "parameters": 28
    },
    "minimax27": {
      "parameters": 229
    },
    "nemotron-lightning": {
      "parameters": 32
    },
    "kimi3": {
      "parameters": 2800
    },
    "nemotron-ultra": {
      "parameters": 561
    },
    "nemotron-super": {
      "parameters": 124
    },
    "minimax": {
      "parameters": 229
    },
    "qwen80": {
      "parameters": 80
    },
    "kimi25": {
      "parameters": 1000
    },
    "nemotron-nano": {
      "parameters": 32
    },
    "deepseek": {
      "parameters": 685
    },
    "oss120": {
      "parameters": 117,
      "qlora": 65,
      "lora": 210
    },
    "qwen30": {
      "parameters": 31
    },
    "oss20": {
      "parameters": 21,
      "name": "OpenAI: gpt-oss-20b",
      "context": 131072,
      "source": "https://huggingface.co/openai/gpt-oss-20b",
      "qlora": 14,
      "lora": 44
    }
  }
};
