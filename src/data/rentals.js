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
    "reviewed": "2026-09-22",
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
    }
  }
};
