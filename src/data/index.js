// Shared projections only. Edit the adjacent dataset files, never copy their facts here.
import {data,datasets} from './registry.js?v=29';
export {data,datasets};
export const reviewed=datasets.models.maintenance.reviewed;
export const models=Object.entries(data.models).map(([id,m])=>({
 id,name:m.name,source:m.source,apiModel:m.apiModel,
 apiSource:`${data.sources.api}/${m.apiModel}/endpoints`,
 provider:`${m.endpoint.provider_name} via OpenRouter`,providerTag:m.endpoint.tag,
 quantization:m.endpoint.quantization,context:m.endpoint.context_length,
 maxOutput:m.endpoint.max_completion_tokens,maxInput:m.endpoint.max_prompt_tokens??null,
 input:Number(m.endpoint.pricing.prompt)*1e6,output:Number(m.endpoint.pricing.completion)*1e6,
 cached:m.endpoint.pricing.input_cache_read==null?null:Number(m.endpoint.pricing.input_cache_read)*1e6,
 planningMemoryGB:data.inferenceMemory[id],...(m.evidence?{evidence:m.evidence}:{})
}));
export const formatDataText=(text,values)=>text.replace(/\{(\w+)\}/g,(_,key)=>String(values[key]));
export const hardware=Object.entries(data.hardware).map(([id,h])=>{
 const base=h.baseHardwareId?data.hardware[h.baseHardwareId]:null;
 const sourceRefs={...base,...h};
 const textValues={...h,baseMemory:base?.memory};
 return {id,...h,name:formatDataText(h.name,textValues),package:formatDataText(h.package,textValues),...(base?{memory:base.memory*h.nodes}:{}),...Object.fromEntries(['source','priceSource','runtimeSource'].filter(k=>sourceRefs[k+'Ref']&&(k!=='priceSource'||!base)).map(k=>[k,data.sources[sourceRefs[k+'Ref']]]))};
});
export const purchaseAllowances=Object.fromEntries(Object.entries(data.purchaseAllowances).map(([id,value])=>[id,typeof value==='number'?value:(data.hardware[value.baseHardwareId].price??data.purchaseAllowances[value.baseHardwareId])*value.nodes+value.extras]));
export const rentals=Object.entries(data.rentals).map(([id,r])=>({id,...r,
 name:`Lambda ${r.gpus}× ${r.gpu}`,memory:r.gpus*r.vram,hourly:Number((r.gpus*r.perGpu).toFixed(2)),
 source:data.sources.rental,billingSource:data.sources.rentalBilling,
 package:`${r.cpu} vCPU · ${r.ram} GiB host RAM · ${r.storage} local SSD`,terms:data.rentalTerms
}));
export const workloads=Object.entries(data.workloads).map(([id,w])=>[id,w.name]);
export const defaults=data.inferenceDefaults;
export const profiles=Object.fromEntries(Object.entries(data.workloads).map(([id,w])=>[id,[w.calls,w.input,w.output,w.activity]]));
export const taskModels=Object.fromEntries(Object.entries(data.workloads).map(([id,w])=>[id,w.models]));
export const taskRationale=Object.fromEntries(Object.entries(data.workloads).map(([id,w])=>[id,w.rationale]));
export const trainingModels=Object.entries(data.trainingModels).map(([id,t])=>{
 const model=models.find(m=>m.id===id)??t;
 return {id,name:model.name,source:model.source,context:model.context,...t,eligibility:data.trainingEligibility,recipe:t.qlora!=null&&t.lora!=null};
});
export const trainingSystems=Object.entries(data.trainingSystems).map(([id,t])=>{
 if(t.rentalId){const r=rentals.find(r=>r.id===t.rentalId);return {id,name:`${r.name} ${r.vram} GB`,gpus:r.gpus,vram:r.vram,hourly:r.hourly,source:r.source,kind:t.kind};}
 if(t.hardwareId){const h=hardware.find(h=>h.id===t.hardwareId),gpus=h.gpus,vram=h.memory/gpus;return {id,name:formatDataText(t.name,{gpus,vram}),gpus,vram,price:h.price??purchaseAllowances[t.hardwareId],watts:t.powerPolicyRef?data.inferencePolicy[t.powerPolicyRef]:t.watts,source:h.source,kind:t.kind};}
 return {id,...t};
});
const buy=trainingSystems.find(h=>h.id===data.trainingDefaults.buy),rent=trainingSystems.find(h=>h.id===data.trainingDefaults.rent);
export const trainingDefaults={...data.methodDefaults,...data.trainingDefaults,quote:buy.price,watts:buy.watts,setup:buy.price*data.inferencePolicy.setupFraction,rentRate:rent.hourly};
export const trainingSource=data.sources.training;
export const trainingMethods=data.trainingMethods,methodDefaults=data.methodDefaults,methodSources=data.methodSources;
export const frontierReviewed=datasets.frontier.maintenance.reviewed;
export const {benchmarkVersion,missingBenchmarks}=data.frontier;
export const benchmarkSource=data.sources.benchmark,methodologySource=data.sources.methodology;

export const referenceModels=data.frontier.referenceModels.map(m=>({...data.frontier.referencePolicy,...m}));

export const selectedBenchmarks=Object.fromEntries(Object.entries(data.frontier.selectedBenchmarks).map(([id,m])=>[id,{...m,source:m.source??data.sources.benchmark}]));
