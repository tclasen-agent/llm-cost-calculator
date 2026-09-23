/**
 * hardware — published
 * Source: Each record source/priceSource
 * Review frequency: Monthly and before purchase; on product/configuration changes.
 * Update: Verify complete system specifications, memory type/allocation, host, storage and networking. Use null for an unverified price; put estimates in purchaseAllowances.
 * Values and maintenance metadata below are authoritative; regenerate INVENTORY.md after edits.
 */
export default {
  "maintenance": {
    "kind": "published",
    "reviewed": "2026-09-22",
    "frequency": "Monthly and before purchase; on product/configuration changes.",
    "source": "Each record source/priceSource",
    "how": "Verify complete system specifications, memory type/allocation, host, storage and networking. Use null for an unverified price; put estimates in purchaseAllowances."
  },
  "values": {
    "spark": {
      "name": "NVIDIA DGX Spark",
      "memory": 128,
      "kind": "unified",
      "price": 4699,
      "priceKind": "US MSRP, announced February 23, 2026; not a checkout quote",
      "package": "GB10, 20-core Arm CPU, {memory} GB unified memory, 4 TB NVMe, DGX OS, ConnectX-7, supplied enclosure and 240 W power supply. PSU rating is not measured consumption.",
      "sourceRef": "nvidiaSpark",
      "priceSourceRef": "nvidiaSparkPrice"
    },
    "strix-amd-128": {
      "name": "AMD Ryzen AI Halo · Strix Halo",
      "memory": 128,
      "kind": "unified",
      "price": 3999,
      "priceKind": "AMD-reported Micro Center system price, July 2026 comparison; confirm checkout",
      "package": "Complete Ryzen AI Halo developer platform: Ryzen AI Max+ 395, {memory} GB unified memory. Storage and OS variant must be confirmed with the retailer.",
      "sourceRef": "amdHalo",
      "priceSourceRef": "amdHaloPrice"
    },
    "strix-framework-64": {
      "name": "Framework Desktop Max+ 395 · {memory} GB",
      "memory": 64,
      "kind": "unified",
      "gpuCeiling": 48,
      "price": null,
      "package": "Framework desktop chassis and Ryzen AI Max+ 395 / Radeon 8060S platform, {memory} GB onboard RAM. Select SSD and OS in a complete-system quote; no bare-mainboard price is used.",
      "sourceRef": "frameworkDesktop"
    },
    "strix-framework-128": {
      "name": "Framework Desktop Max+ 395 · {memory} GB",
      "memory": 128,
      "kind": "unified",
      "gpuCeiling": 96,
      "price": null,
      "package": "Framework desktop chassis and Ryzen AI Max+ 395 / Radeon 8060S platform, {memory} GB onboard RAM. SSD and OS need a complete-system quote. Vendor lists 96 GB dedicated GPU allocation; Linux can differ.",
      "sourceRef": "frameworkDesktop"
    },
    "strix-hp-128": {
      "name": "HP Z2 Mini G1a · BN8E8UA",
      "memory": 128,
      "kind": "unified",
      "price": null,
      "package": "Ryzen AI Max+ PRO 395, Radeon 8060S, {memory} GB RAM, 1 TB NVMe, Windows 11 Pro, OEM mini chassis and 300 W power adapter. Price not verified.",
      "sourceRef": "hpZ2G1a"
    },
    "m5-256": {
      "name": "Mac Studio M5 Ultra · {memory} GB",
      "memory": 256,
      "kind": "unified",
      "price": null,
      "package": "36-core CPU / 80-core GPU, {memory} GB unified RAM, 1 TB SSD, macOS, complete Mac Studio. Exact configured price and inference performance need evidence; no M4 proxy is used.",
      "sourceRef": "appleStudio"
    },
    "m5-512": {
      "name": "Mac Studio M5 Ultra · {memory} GB",
      "memory": 512,
      "kind": "unified",
      "price": null,
      "package": "36-core CPU / 80-core GPU, {memory} GB unified RAM, 1 TB SSD, macOS, complete Mac Studio. Exact configured price and inference performance need evidence; no M4 proxy is used.",
      "sourceRef": "appleStudio"
    },
    "hp-2000": {
      "name": "HP Z2 Mini G1i · RTX 2000 Ada",
      "memory": 16,
      "kind": "VRAM",
      "price": null,
      "package": "BP6K5UA: Core Ultra 7 265, RTX 2000 Ada {memory} GB, 32 GB host RAM, 1 TB SSD, Windows 11 Pro, complete OEM workstation. Host RAM is not VRAM.",
      "sourceRef": "hpZ2G1i2000",
      "gpus": 1
    },
    "hp-4000": {
      "name": "HP Z2 Mini G1i · RTX 4000 Ada",
      "memory": 20,
      "kind": "VRAM",
      "price": null,
      "package": "BP6K7UA: Core Ultra 7 265, RTX 4000 Ada {memory} GB, 64 GB host RAM, 1 TB SSD, Windows 11 Pro, complete OEM workstation.",
      "sourceRef": "hpZ2G1i4000",
      "gpus": 1
    },
    "puget-5080": {
      "name": "Puget workstation · RTX 5080",
      "memory": 16,
      "kind": "VRAM",
      "price": null,
      "package": "Vendor-configured complete workstation with RTX 5080. CPU, host RAM, SSD, chassis, PSU, cooling and OS must be specified in the vendor quote. Published GPU add-on prices are not complete-system prices.",
      "needsBuild": true,
      "sourceRef": "pugetWorkstation",
      "gpus": 1
    },
    "puget-5090": {
      "name": "Puget workstation · RTX 5090",
      "memory": 32,
      "kind": "VRAM",
      "price": null,
      "package": "Vendor-configured complete workstation with RTX 5090. CPU, host RAM, SSD, chassis, PSU, cooling and OS must be specified in the vendor quote. Published GPU add-on prices are not complete-system prices.",
      "needsBuild": true,
      "sourceRef": "pugetWorkstation",
      "gpus": 1
    },
    "puget-pro-4000-blackwell": {
      "name": "Puget workstation · RTX PRO 4000 Blackwell",
      "memory": 24,
      "kind": "VRAM",
      "price": null,
      "package": "Vendor-configured complete workstation with RTX PRO 4000 Blackwell. CPU, host RAM, SSD, chassis, PSU, cooling and OS must be specified in the vendor quote. Published GPU add-on prices are not complete-system prices.",
      "needsBuild": true,
      "sourceRef": "pugetWorkstation",
      "gpus": 1
    },
    "puget-pro-5000-blackwell": {
      "name": "Puget workstation · RTX PRO 5000 Blackwell",
      "memory": 48,
      "kind": "VRAM",
      "price": null,
      "package": "Vendor-configured complete workstation with RTX PRO 5000 Blackwell. CPU, host RAM, SSD, chassis, PSU, cooling and OS must be specified in the vendor quote. Published GPU add-on prices are not complete-system prices.",
      "needsBuild": true,
      "sourceRef": "pugetWorkstation",
      "gpus": 1
    },
    "puget-pro-6000-blackwell-ws": {
      "name": "Puget workstation · RTX PRO 6000 Blackwell WS",
      "memory": 96,
      "kind": "VRAM",
      "price": null,
      "package": "Vendor-configured complete workstation with RTX PRO 6000 Blackwell WS. CPU, host RAM, SSD, chassis, PSU, cooling and OS must be specified in the vendor quote. Published GPU add-on prices are not complete-system prices.",
      "needsBuild": true,
      "sourceRef": "pugetWorkstation",
      "gpus": 1
    },
    "supermicro-h100": {
      "name": "Supermicro 4U · 8× H100 HGX",
      "memory": 640,
      "kind": "VRAM",
      "price": null,
      "package": "SYS-421GE-TNHR2-LCC H100 configuration: HGX 8-GPU platform, dual Xeon, liquid cooling. CPU SKU, RAM, storage and onsite cooling installation require an integrated system quote.",
      "needsBuild": true,
      "sourceRef": "supermicroHgx",
      "gpus": 8
    },
    "spark-x2": {
      "name": "{nodes}× DGX Spark cluster",
      "kind": "distributed unified",
      "price": null,
      "package": "{nodes} complete GB10 / {baseMemory} GB / 4 TB Spark systems plus ConnectX networking. Total memory is arithmetic across nodes, not automatically pooled. Cluster quote must include networking. No scaling factor is assumed.",
      "needsBuild": true,
      "baseHardwareId": "spark",
      "nodes": 2
    },
    "spark-x4": {
      "name": "{nodes}× DGX Spark cluster",
      "kind": "distributed unified",
      "price": null,
      "package": "{nodes} complete GB10 / {baseMemory} GB / 4 TB Spark systems plus ConnectX networking. Total memory is arithmetic across nodes, not automatically pooled. Cluster quote must include networking. No scaling factor is assumed.",
      "needsBuild": true,
      "baseHardwareId": "spark",
      "nodes": 4
    },
    "m5-512-x2": {
      "name": "{nodes}× Mac Studio {baseMemory} GB · EXO cluster",
      "kind": "distributed unified",
      "price": null,
      "package": "{nodes} complete M5 Ultra 36-core CPU / 80-core GPU, {baseMemory} GB RAM, 1 TB SSD systems with Thunderbolt networking. EXO documents RDMA support; exact topology, model compatibility and performance require validation. Networking must be included in the cluster quote.",
      "needsBuild": true,
      "runtimeSourceRef": "exoRuntime",
      "baseHardwareId": "m5-512",
      "nodes": 2
    },
    "m5-512-x4": {
      "name": "{nodes}× Mac Studio {baseMemory} GB · EXO cluster",
      "kind": "distributed unified",
      "price": null,
      "package": "{nodes} complete M5 Ultra 36-core CPU / 80-core GPU, {baseMemory} GB RAM, 1 TB SSD systems with Thunderbolt networking. EXO documents RDMA support; exact topology, model compatibility and performance require validation. Networking must be included in the cluster quote.",
      "needsBuild": true,
      "runtimeSourceRef": "exoRuntime",
      "baseHardwareId": "m5-512",
      "nodes": 4
    }
  }
};
