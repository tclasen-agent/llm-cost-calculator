/**
 * models — published
 * Source: sources.api; each model source and its /endpoints API
 * Review frequency: Weekly; immediately on endpoint, price or model changes.
 * Update: Refresh the selected endpoint atomically (provider/tag, precision, price pair and limits). Prices are USD/token. Exclude promotional/tiered endpoints unless supported. Never substitute aggregate model prices. Preserve stable IDs. Refresh evaluation text from the model card.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-09-22",
    "frequency": "Weekly; immediately on endpoint, price or model changes.",
    "source": "sources.api; each model source and its /endpoints API",
    "how": "Refresh the selected endpoint atomically (provider/tag, precision, price pair and limits). Prices are USD/token. Exclude promotional/tiered endpoints unless supported. Never substitute aggregate model prices. Preserve stable IDs. Refresh evaluation text from the model card."
  },
  "values": {
    "ds41": {
      "name": "DeepSeek: DeepSeek V4.1 Flash",
      "source": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash",
      "apiModel": "deepseek/deepseek-v4.1-flash",
      "evidence": "Vendor reports DeepSWE 1.1 74.2 and CyberGym 88.1 at maximum reasoning effort; agent harness and precision affect results.",
      "endpoint": {
        "provider_name": "Relace",
        "tag": "relace/fp4",
        "quantization": "fp4",
        "context_length": 1048576,
        "max_completion_tokens": 943718,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000013",
          "completion": "0.00000052",
          "input_cache_read": "0.00000001"
        }
      }
    },
    "glm53": {
      "name": "Z.ai: GLM 5.3",
      "source": "https://huggingface.co/zai-org/GLM-5.3",
      "apiModel": "z-ai/glm-5.3",
      "evidence": "Vendor reports CyberGym 84.5 and Toolathlon Verified 73.0; agentic coding, research and security candidate.",
      "endpoint": {
        "provider_name": "InferenceNet",
        "tag": "inference-net/fp4",
        "quantization": "fp4",
        "context_length": 1000000,
        "max_completion_tokens": 131072,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.0000009",
          "completion": "0.000003",
          "input_cache_read": "0.00000015"
        }
      }
    },
    "glm53flash": {
      "name": "Z.ai: GLM 5.3 Flash",
      "source": "https://huggingface.co/zai-org/GLM-5.3-Flash",
      "apiModel": "z-ai/glm-5.3-flash",
      "evidence": "Multimodal agentic candidate with published coding and tool-use evaluations; a lower-cost alternative to GLM-5.3.",
      "endpoint": {
        "provider_name": "Z.AI",
        "tag": "z-ai/fp8",
        "quantization": "fp8",
        "context_length": 1048576,
        "max_completion_tokens": 131072,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000015",
          "completion": "0.0000005",
          "input_cache_read": "0.00000003"
        }
      }
    },
    "qwen38large": {
      "name": "Qwen: Qwen3.8 2.4T A95B",
      "source": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B",
      "apiModel": "qwen/qwen3.8-2.4t-a95b",
      "evidence": "Large open-weight flagship with published coding, reasoning, tool-use and instruction-following evaluations. Cluster-scale deployment.",
      "endpoint": {
        "provider_name": "DeepInfra",
        "tag": "deepinfra/fp4",
        "quantization": "fp4",
        "context_length": 262144,
        "max_completion_tokens": 131072,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.000002",
          "completion": "0.000006",
          "input_cache_read": "0.0000002"
        }
      }
    },
    "qwen38small": {
      "name": "Qwen: Qwen3.8 27B",
      "source": "https://huggingface.co/Qwen/Qwen3.8-27B",
      "apiModel": "qwen/qwen3.8-27b",
      "evidence": "Compact frontier-generation alternative with published instruction-following, reasoning and coding evaluations; not claimed to lead all models.",
      "endpoint": {
        "provider_name": "Darkbloom",
        "tag": "darkbloom/fp4",
        "quantization": "fp4",
        "context_length": 262144,
        "max_completion_tokens": 32768,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.0000001",
          "completion": "0.0000018"
        }
      }
    },
    "minimax27": {
      "name": "MiniMax: MiniMax M2.7",
      "source": "https://huggingface.co/MiniMaxAI/MiniMax-M2.7",
      "apiModel": "minimax/minimax-m2.7",
      "evidence": "Vendor reports SWE-Pro 56.22 and GDPval-AA Elo 1495; software engineering and office-work candidate.",
      "endpoint": {
        "provider_name": "Minimax",
        "tag": "minimax/fp8",
        "quantization": "fp8",
        "context_length": 204800,
        "max_completion_tokens": 131072,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.0000003",
          "completion": "0.0000012",
          "input_cache_read": "0.00000006"
        }
      }
    },
    "nemotron-lightning": {
      "name": "NVIDIA: Nemotron 3.5 Lightning",
      "source": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16",
      "apiModel": "nvidia/nemotron-3.5-lightning",
      "endpoint": {
        "provider_name": "Darkbloom",
        "tag": "darkbloom/int4",
        "quantization": "int4",
        "context_length": 262144,
        "max_completion_tokens": 32768,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.000000065",
          "completion": "0.00000018"
        }
      }
    },
    "kimi3": {
      "name": "MoonshotAI: Kimi K3",
      "source": "https://huggingface.co/moonshotai/Kimi-K3",
      "apiModel": "moonshotai/kimi-k3",
      "endpoint": {
        "provider_name": "Relace",
        "tag": "relace/fp4",
        "quantization": "fp4",
        "context_length": 1048576,
        "max_completion_tokens": 943718,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.0000017",
          "completion": "0.0000085",
          "input_cache_read": "0.00000017"
        }
      }
    },
    "nemotron-ultra": {
      "name": "NVIDIA: Nemotron 3 Ultra",
      "source": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16",
      "apiModel": "nvidia/nemotron-3-ultra-550b-a55b",
      "endpoint": {
        "provider_name": "DeepInfra",
        "tag": "deepinfra/fp4",
        "quantization": "fp4",
        "context_length": 262144,
        "max_completion_tokens": 16384,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.0000005",
          "completion": "0.0000022",
          "input_cache_read": "0.0000001"
        }
      }
    },
    "nemotron-super": {
      "name": "NVIDIA: Nemotron 3 Super",
      "source": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8",
      "apiModel": "nvidia/nemotron-3-super-120b-a12b",
      "endpoint": {
        "provider_name": "DeepInfra",
        "tag": "deepinfra/bf16",
        "quantization": "bf16",
        "context_length": 262144,
        "max_completion_tokens": 16384,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.000000085",
          "completion": "0.0000004"
        }
      }
    },
    "minimax": {
      "name": "MiniMax: MiniMax M2.5",
      "source": "https://huggingface.co/MiniMaxAI/MiniMax-M2.5",
      "apiModel": "minimax/minimax-m2.5",
      "endpoint": {
        "provider_name": "Venice",
        "tag": "venice",
        "quantization": "unknown",
        "context_length": 198000,
        "max_completion_tokens": 32768,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000027",
          "completion": "0.00000095",
          "input_cache_read": "0.00000003"
        }
      }
    },
    "qwen80": {
      "name": "Qwen: Qwen3 Coder Next",
      "source": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
      "apiModel": "qwen/qwen3-coder-next",
      "endpoint": {
        "provider_name": "Parasail",
        "tag": "parasail/bf16",
        "quantization": "bf16",
        "context_length": 262144,
        "max_completion_tokens": 235929,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000012",
          "completion": "0.0000008",
          "input_cache_read": "0.00000007"
        }
      }
    },
    "kimi25": {
      "name": "MoonshotAI: Kimi K2.5",
      "source": "https://huggingface.co/moonshotai/Kimi-K2.5",
      "apiModel": "moonshotai/kimi-k2.5",
      "endpoint": {
        "provider_name": "SiliconFlow",
        "tag": "siliconflow/int4",
        "quantization": "int4",
        "context_length": 262144,
        "max_completion_tokens": 235929,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000045",
          "completion": "0.00000225",
          "input_cache_read": "0.00000007"
        }
      }
    },
    "nemotron-nano": {
      "name": "NVIDIA: Nemotron 3 Nano 30B A3B",
      "source": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16",
      "apiModel": "nvidia/nemotron-3-nano-30b-a3b",
      "endpoint": {
        "provider_name": "Novita",
        "tag": "novita/fp4",
        "quantization": "fp4",
        "context_length": 262144,
        "max_completion_tokens": 32768,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000005",
          "completion": "0.0000002"
        }
      }
    },
    "deepseek": {
      "name": "DeepSeek: DeepSeek V3.2",
      "source": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2",
      "apiModel": "deepseek/deepseek-v3.2",
      "endpoint": {
        "provider_name": "DeepInfra",
        "tag": "deepinfra/fp4",
        "quantization": "fp4",
        "context_length": 163840,
        "max_completion_tokens": 16384,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000026",
          "completion": "0.00000038",
          "input_cache_read": "0.00000013"
        }
      }
    },
    "oss120": {
      "name": "OpenAI: gpt-oss-120b",
      "source": "https://huggingface.co/openai/gpt-oss-120b",
      "apiModel": "openai/gpt-oss-120b",
      "endpoint": {
        "provider_name": "AkashML",
        "tag": "akashml/bf16",
        "quantization": "bf16",
        "context_length": 131072,
        "max_completion_tokens": 117964,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000003",
          "completion": "0.00000017",
          "input_cache_read": "0.00000003"
        }
      }
    },
    "qwen30": {
      "name": "Qwen: Qwen3 Coder 30B A3B Instruct",
      "source": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
      "apiModel": "qwen/qwen3-coder-30b-a3b-instruct",
      "endpoint": {
        "provider_name": "Novita",
        "tag": "novita/fp8",
        "quantization": "fp8",
        "context_length": 160000,
        "max_completion_tokens": 32768,
        "max_prompt_tokens": null,
        "pricing": {
          "prompt": "0.00000007",
          "completion": "0.00000027"
        }
      }
    }
  }
};
