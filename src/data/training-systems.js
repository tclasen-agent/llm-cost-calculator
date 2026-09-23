/**
 * training-systems — assumption
 * Source: hardware and rentals canonical records; pilot power measurements
 * Review frequency: Monthly and before each campaign; custom quotes per run.
 * Update: Use rentalId/hardwareId references, never duplicate their prices/resources. Purchase power is measured or explicitly assumed watts. Custom configurations require user evidence.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "assumption",
    "reviewed": "2026-09-23",
    "frequency": "Monthly and before each campaign; custom quotes per run.",
    "source": "hardware and rentals canonical records; pilot power measurements",
    "how": "Use rentalId/hardwareId references, never duplicate their prices/resources. Purchase power is measured or explicitly assumed watts. Custom configurations require user evidence."
  },
  "values": {
    "workstation96": {
      "hardwareId": "puget-pro-6000-blackwell-ws",
      "name": "{vram} GB NVIDIA workstation",
      "watts": 700,
      "kind": "buy"
    },
    "hgx640": {
      "hardwareId": "supermicro-h100",
      "name": "{gpus} × H100 {vram} GB HGX server",
      "kind": "buy",
      "powerPolicyRef": "hgxWatts"
    },
    "h100": {
      "rentalId": "h100",
      "kind": "rent"
    },
    "b200": {
      "rentalId": "b200",
      "kind": "rent"
    },
    "h100x4": {
      "rentalId": "h100-x4",
      "kind": "rent"
    },
    "customBuy": {
      "name": "Custom purchase cluster",
      "gpus": 8,
      "vram": 80,
      "price": 0,
      "watts": 10000,
      "kind": "buy"
    },
    "customRent": {
      "name": "Custom rental cluster",
      "gpus": 8,
      "vram": 80,
      "hourly": 0,
      "kind": "rent"
    },
    "h100x8": {
      "rentalId": "h100-x8",
      "kind": "rent"
    }
  }
};
