export const reviewed = '2026-09-22';
export const benchmarkSource = 'https://github.com/ml-explore/mlx-lm/blob/main/mlx_lm/BENCHMARKS.md';
// Specs are sourced; costs, cache coefficients, power and cross-model throughput are planning assumptions.
export const models = [
  {id:'qwen30', name:'Qwen3-Coder 30B · A3B', params:30.5, active:3.3, context:262144, kv:0.1, tag:'Efficient coding', source:'https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct', note:'A practical small MoE for code and tool use. The M4 reference is the related Qwen3-30B Instruct, not this Coder checkpoint.'},
  {id:'qwen80', name:'Qwen3-Coder-Next 80B · A3B', params:80, active:3, context:262144, kv:0.08, tag:'Agentic coding', source:'https://huggingface.co/Qwen/Qwen3-Coder-Next', note:'Hybrid architecture; the cache allowance is an editable approximation, not a full hybrid-state allocator.'},
  {id:'oss120', name:'gpt-oss-120b', params:117, active:5.1, context:131072, kv:0.08, tag:'Reasoning & tools', source:'https://huggingface.co/openai/gpt-oss-120b', note:'Native MXFP4 mixed precision differs from the generic Q4 estimate. Verify actual file size and runtime support.'},
  {id:'minimax', name:'MiniMax M2.5', params:230, active:10, context:196608, kv:0.2, tag:'Software engineering', source:'https://huggingface.co/MiniMaxAI/MiniMax-M2.5', note:'Strong SWE candidate. Generic quantization and cache estimates require validation with the chosen runtime.'},
  {id:'deepseek', name:'DeepSeek V3.2', params:685, active:37, context:131072, kv:0.07, tag:'Large reasoning model', source:'https://huggingface.co/deepseek-ai/DeepSeek-V3.2', note:'Large MoE with MLA. At Q4 it needs hundreds of GB; memory fit alone does not guarantee practical speed.'}
];
const apple='https://www.apple.com/mac-studio/specs/';
const gpu='https://docs.nvidia.com/brev/reference/gpu-types';
export const hardware = [
  {id:'m5-256',name:'Mac Studio M5 Ultra',variant:'256 GB unified',memory:256,reserve:24,price:8000,idle:30,load:250,decode:113.33,prefill:1753.9,source:apple,proxy:true,note:'M4 Max proxy; no M5 speed uplift. Price is a budget placeholder.'},
  {id:'m5-512',name:'Mac Studio M5 Ultra',variant:'512 GB unified',memory:512,reserve:40,price:12000,idle:35,load:270,decode:113.33,prefill:1753.9,source:apple,proxy:true,note:'Same M4 Max speed proxy as 256 GB; extra memory does not automatically increase throughput.'},
  {id:'spark',name:'NVIDIA DGX Spark',variant:'128 GB unified',memory:128,reserve:16,price:4700,idle:30,load:240,decode:55,prefill:1400,source:'https://marketplace.nvidia.com/en-us/enterprise/personal-ai-supercomputers/dgx-spark/',note:'GB10. Synthetic throughput assumptions, not measured DGX benchmarks; confirm current vendor quote.'},
  {id:'4090',name:'Dual RTX 4090 PC',variant:'2 × 24 GB VRAM',memory:48,reserve:4,price:6500,idle:110,load:1000,decode:130,prefill:2200,source:'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/',note:'Tensor sharding required. PCIe overhead and software compatibility matter; VRAM is not automatically pooled.'},
  {id:'5090',name:'Dual RTX 5090 PC',variant:'2 × 32 GB VRAM',memory:64,reserve:6,price:9500,idle:120,load:1300,decode:180,prefill:3500,source:gpu,note:'Requires suitable PSU, cooling, chassis and multi-GPU runtime. Synthetic system-level throughput.'},
  {id:'rtx6000',name:'Dual RTX 6000 Ada',variant:'2 × 48 GB VRAM',memory:96,reserve:8,price:16000,idle:100,load:750,decode:160,prefill:3000,source:'https://www.nvidia.com/en-us/design-visualization/rtx-6000/',note:'48 GB Ada cards, distinct from 96 GB Blackwell PRO cards. Sharding required.'},
  {id:'pro6000',name:'RTX PRO 6000 Blackwell',variant:'96 GB VRAM workstation',memory:96,reserve:8,price:12500,idle:90,load:800,decode:210,prefill:4000,source:'https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/',note:'Single 96 GB card plus host budget. Synthetic throughput; quote your complete workstation.'},
  {id:'a100',name:'Dual A100 80 GB',variant:'2 × 80 GB PCIe server',memory:160,reserve:10,price:24000,idle:170,load:950,decode:180,prefill:4500,source:gpu,note:'Used-market planning budget including host. Server cooling, power and interconnect must be checked.'},
  {id:'h100',name:'Dual H100 80 GB',variant:'2 × 80 GB PCIe server',memory:160,reserve:10,price:60000,idle:200,load:1100,decode:300,prefill:8500,source:'https://www.nvidia.com/en-us/data-center/h100/',note:'PCIe 80 GB configuration, not SXM. Synthetic throughput; home installation may require infrastructure.'}
];
export const defaults = {modelRefresh:3,hardwareRefresh:12,nextModelGrowth:2,autoModel:1,autoHardware:1,matchHardware:1,workload:'custom',model:'qwen80',hardware:'m5-256',users:5,agents:2,activity:50,batch:0,requests:50,days:22,hours:8,input:8000,output:2000,context:16384,bits:4,kv:0.08,headroom:15,efficiency:70,batchExponent:0.6,speed:100,decodeOverride:0,prefillOverride:0,price:8000,memory:256,reserve:24,idle:30,load:250,electricity:0.18,cooling:1.1,maintenance:20,setup:0,months:36,resale:0,apiInput:1,apiCached:0.1,cache:20,apiOutput:5,rentalHardware:'h100',rental:2,rentalHours:176,rentalExtra:50,rentalSetup:0,rentalMemory:160,rentalReserve:10,rentalEfficiency:70,rentalSpeed:100,rentalDecodeOverride:0,rentalPrefillOverride:0,rentalBatchExponent:0.6};

// Illustrative business usage assumptions; calibrate against actual request logs.
// requests is calls per agent per workday, not complete user tasks.
export const workloads = [
 {id:'chat',name:'Simple Chat',agents:1,activity:10,requests:20,input:1200,output:350,context:4096,note:'20 short exchanges per person per day; one assistant.'},
 {id:'research',name:'Research',agents:2,activity:25,requests:30,input:6000,output:1500,context:16384,note:'About 10 research tasks per person per day, each with 6 model calls across 2 agents.'},
 {id:'bizdev',name:'Business Development',agents:1,activity:20,requests:30,input:4000,output:1000,context:8192,note:'About 10 prospect research or outreach tasks per person per day, 3 model calls each.'},
 {id:'swe',name:'Software Engineering',agents:2,activity:40,requests:75,input:12000,output:2500,context:32768,note:'About 15 coding tasks per person per day, 10 calls each across 2 parallel agents.'},
 {id:'support',name:'Customer Support',agents:1,activity:35,requests:50,input:2500,output:600,context:8192,note:'About 25 assisted cases per person per day, 2 calls each.'},
 {id:'writing',name:'Writing & Content',agents:1,activity:20,requests:20,input:3500,output:1800,context:8192,note:'About 5 drafting tasks per person per day, 4 generation or revision calls each.'},
 {id:'security',name:'Security Analysis',agents:2,activity:35,requests:60,input:16000,output:2000,context:32768,note:'About 12 code or log analysis tasks per person per day, 10 calls each across 2 agents.'}
];
export function applyWorkload(state,id) {
 const preset=workloads.find(w=>w.id===id);
 if(!preset)return {...state,workload:'custom'};
 const {agents,activity,requests,input,output,context}=preset;
 return {...state,workload:id,agents,activity,requests,input,output,context,batch:0,days:21.67,hours:8,rentalHours:173.36};
}

// Whole-configuration illustrative rental budgets, not listings or verified availability.
const rentalRates={'m5-256':1.5,'m5-512':2.5,spark:1,4090:1.4,5090:2.2,rtx6000:2.5,pro6000:2.2,a100:3,h100:5};
for(const h of hardware){h.rental=rentalRates[h.id];h.nodes=1;}
for(const [baseId,nodes,factor,networkCost] of [['m5-256',2,1.5,300],['m5-512',2,1.5,300],['m5-512',4,2.4,900],['spark',2,1.4,300],['spark',4,2,1200]]){
 const base=hardware.find(h=>h.id===baseId),mac=baseId.startsWith('m5');
 hardware.push({...base,id:`${baseId}-x${nodes}`,name:`${nodes} × ${base.name} cluster`,variant:`${base.memory*nodes} GB total · ${mac?'EXO / Thunderbolt 5 RDMA':'ConnectX networking'}`,nodes,memory:base.memory*nodes,reserve:base.reserve*nodes,price:base.price*nodes+networkCost,idle:base.idle*nodes,load:base.load*nodes+30,decode:base.decode*factor,prefill:base.prefill*factor,rental:base.rental*nodes,source:mac?'https://github.com/exo-explore/exo':'https://www.nvidia.com/en-us/products/workstations/dgx-spark/',note:`Model sharding across ${nodes} nodes. Includes $${networkCost} illustrative networking budget. Assumed ${factor}× single-node throughput, NOT a cluster benchmark. Exact model/runtime support and rental availability require verification.`});
}
models.push(
 {id:'kimi25',name:'Kimi K2.5',params:1000,active:32,context:262144,kv:0.1,tag:'Frontier coding & research',source:'https://huggingface.co/moonshotai/Kimi-K2.5',note:'Open weights; 1T total / 32B active. Model-card SWE-Bench Verified: 76.8 with vendor harness. Generic Q4 and cache estimates; exact runtime support unverified.'},
 {id:'kimi3',name:'Kimi K3',params:2800,active:104,context:1048576,kv:0.1,tag:'Frontier long-horizon agents',source:'https://huggingface.co/moonshotai/Kimi-K3',note:'Open weights under Kimi K3 license. Native MXFP4; generic Q4 memory is approximate. Terminal-Bench 2.1: 88.3; BrowseComp: 91.2 with context compaction, vendor-reported at max effort. EXO/MLX support for this exact model is unverified.'}
);

// Parameter totals include embeddings; marketing size labels are rounded.
// Hybrid Mamba state is approximated by the editable cache allowance, not an allocator model.
models.push(
 {id:'nemotron-nano',name:'Nemotron 3 Nano 30B · A3B',params:31.6,active:3.6,context:1048576,kv:0.08,tag:'Efficient reasoning & sub-agents',source:'https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16',note:'Hybrid Mamba/attention MoE. Approx. 31.6B total including embeddings; rounded 30B in the model name. Up to 1M context requires runtime configuration and sufficient memory. Generic Q4 is not a BF16 checkpoint size. Hybrid cache and throughput are planning approximations.'},
 {id:'nemotron-lightning',name:'Nemotron 3.5 Lightning 30B · A3B',params:31.6,active:3.6,context:1048576,kv:0.08,tag:'Fast tool use & specialized agents',source:'https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16',note:'Hybrid MoE with configurable reasoning. Approx. 31.6B total including embeddings. Published BF16 single-H100 recipe uses 256K context; 1M needs additional resources. No speculative-decoding speedup is assumed. Verify quantization and exact runtime support.'},
 {id:'nemotron-super',name:'Nemotron 3 Super 120B · A12B',params:123.6,active:12.7,context:1048576,kv:0.08,tag:'Multi-agent reasoning & coding',source:'https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16',note:'Hybrid LatentMoE with multi-token prediction; approx. 123.6B total and 12.7B active, rounded in the model name. Generic 4-bit sizing is not an exact NVFP4 allocation. MTP speedup is not modeled. Hybrid cache, Mac/EXO compatibility and performance need validation.'},
 {id:'nemotron-ultra',name:'Nemotron 3 Ultra 550B · A55B',params:560.5,active:55,context:1048576,kv:0.1,tag:'Large-scale reasoning & agents',source:'https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16',note:'Hybrid LatentMoE; approx. 560.5B total, marketed as 550B. Published BF16 recipes target multi-GPU datacenter systems. A Q4 memory fit on a Mac or Spark cluster does not establish deployability. Generic quantization, hybrid state and throughput require validation.'}
);
