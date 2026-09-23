/**
 * rentals — published
 * Source: sources.rental and sources.rentalBilling
 * Review frequency: Weekly and before renting; on billing changes.
 * Update: Replace published per-GPU USD/hour and full-instance resources together. Total memory and hourly price are derived. Confirm stock/region separately.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-09-23",
    "frequency": "Weekly and before renting; on billing changes.",
    "source": "sources.rental and sources.rentalBilling",
    "how": "Replace published per-GPU USD/hour and full-instance resources together. Total memory and hourly price are derived. Confirm stock/region separately."
  },
  "values": {
    "quadro": {
      "gpu": "Quadro RTX 6000",
      "gpus": 1,
      "vram": 24,
      "cpu": 14,
      "ram": 46,
      "storage": "512 GiB",
      "perGpu": 0.69
    },
    "a6000": {
      "gpu": "A6000",
      "gpus": 1,
      "vram": 48,
      "cpu": 14,
      "ram": 100,
      "storage": "512 GiB",
      "perGpu": 1.09
    },
    "a100": {
      "gpu": "A100 PCIe",
      "gpus": 1,
      "vram": 40,
      "cpu": 30,
      "ram": 225,
      "storage": "512 GiB",
      "perGpu": 1.99
    },
    "h100-pcie": {
      "gpu": "H100 PCIe",
      "gpus": 1,
      "vram": 80,
      "cpu": 26,
      "ram": 225,
      "storage": "1 TiB",
      "perGpu": 3.29
    },
    "h100": {
      "gpu": "H100 SXM",
      "gpus": 1,
      "vram": 80,
      "cpu": 26,
      "ram": 225,
      "storage": "2.75 TiB",
      "perGpu": 4.29
    },
    "gh200": {
      "gpu": "GH200",
      "gpus": 1,
      "vram": 96,
      "cpu": 64,
      "ram": 432,
      "storage": "4 TiB",
      "perGpu": 2.29
    },
    "a6000-x2": {
      "gpu": "A6000",
      "gpus": 2,
      "vram": 48,
      "cpu": 28,
      "ram": 200,
      "storage": "1 TiB",
      "perGpu": 1.09
    },
    "a6000-x4": {
      "gpu": "A6000",
      "gpus": 4,
      "vram": 48,
      "cpu": 56,
      "ram": 400,
      "storage": "1 TiB",
      "perGpu": 1.09
    },
    "h100-x2": {
      "gpu": "H100 SXM",
      "gpus": 2,
      "vram": 80,
      "cpu": 52,
      "ram": 450,
      "storage": "5.5 TiB",
      "perGpu": 4.19
    },
    "h100-x4": {
      "gpu": "H100 SXM",
      "gpus": 4,
      "vram": 80,
      "cpu": 104,
      "ram": 900,
      "storage": "11 TiB",
      "perGpu": 4.09
    },
    "h100-x8": {
      "gpu": "H100 SXM",
      "gpus": 8,
      "vram": 80,
      "cpu": 208,
      "ram": 1800,
      "storage": "22 TiB",
      "perGpu": 3.99
    },
    "b200": {
      "gpu": "B200 SXM6",
      "gpus": 1,
      "vram": 180,
      "cpu": 26,
      "ram": 360,
      "storage": "2.75 TiB",
      "perGpu": 6.99
    },
    "b200-x8": {
      "gpu": "B200 SXM6",
      "gpus": 8,
      "vram": 180,
      "cpu": 208,
      "ram": 2900,
      "storage": "22 TiB",
      "perGpu": 6.69
    },
    "b200-x2": {
      "gpu": "B200 SXM6",
      "gpus": 2,
      "vram": 180,
      "cpu": 52,
      "ram": 720,
      "storage": "5.5 TiB",
      "perGpu": 6.89
    },
    "b200-x4": {
      "gpu": "B200 SXM6",
      "gpus": 4,
      "vram": 180,
      "cpu": 104,
      "ram": 1440,
      "storage": "11 TiB",
      "perGpu": 6.79
    },
    "a100-x2": {
      "gpu": "A100 PCIe",
      "gpus": 2,
      "vram": 40,
      "cpu": 60,
      "ram": 450,
      "storage": "1 TiB",
      "perGpu": 1.99
    },
    "a100-x4": {
      "gpu": "A100 PCIe",
      "gpus": 4,
      "vram": 40,
      "cpu": 120,
      "ram": 900,
      "storage": "1 TiB",
      "perGpu": 1.99
    },
    "a100-sxm": {
      "gpu": "A100 SXM",
      "gpus": 1,
      "vram": 40,
      "cpu": 30,
      "ram": 220,
      "storage": "512 GiB",
      "perGpu": 1.99
    },
    "a100-sxm-x8": {
      "gpu": "A100 SXM",
      "gpus": 8,
      "vram": 40,
      "cpu": 124,
      "ram": 1800,
      "storage": "5.8 TiB",
      "perGpu": 1.99
    },
    "a100-80-x8": {
      "gpu": "A100 SXM",
      "gpus": 8,
      "vram": 80,
      "cpu": 240,
      "ram": 1800,
      "storage": "19.5 TiB",
      "perGpu": 2.79
    },
    "v100-x8": {
      "gpu": "Tesla V100",
      "gpus": 8,
      "vram": 16,
      "cpu": 88,
      "ram": 448,
      "storage": "5.8 TiB",
      "perGpu": 0.79
    },
    "a10": {
      "gpu": "A10",
      "gpus": 1,
      "vram": 24,
      "cpu": 30,
      "ram": 226,
      "storage": "1.3 TiB",
      "perGpu": 1.29
    }
  }
};
