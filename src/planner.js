import {models,hardware} from './catalog.js?v=9';
import {calculate,normalize,combinedPayback} from './engine.js?v=9';
export const taskModels={chat:['oss120','qwen30'],research:['minimax','kimi3','kimi25','oss120'],bizdev:['oss120','minimax','kimi3'],swe:['qwen80','minimax','kimi3','kimi25','qwen30'],support:['oss120','qwen30'],writing:['oss120','minimax','kimi3'],security:['qwen80','kimi3','minimax','kimi25'],custom:['qwen80','oss120']};
export const evidence={qwen80:'SWE-bench Verified 70.6 (vendor model card).',minimax:'SWE-bench Verified 80.2; BrowseComp 76.3 with context management (vendor report).',kimi25:'SWE-Bench Verified 76.8 (vendor harness).',kimi3:'Terminal-Bench 2.1 88.3; BrowseComp 91.2 with compaction (vendor, max effort).',oss120:'Reasoning and tool-use candidate; no directly comparable task score recorded here.',qwen30:'Efficient coding candidate; no directly comparable task score recorded here.',deepseek:'Large reasoning candidate; no directly comparable task score recorded here.'};
// Extend task shortlists without changing existing default recommendations.
for(const task of ['chat','support','writing','bizdev','custom'])taskModels[task].push('nemotron-lightning','nemotron-nano','nemotron-super');
for(const task of ['research','swe','security'])taskModels[task].push('nemotron-super','nemotron-ultra','nemotron-lightning','nemotron-nano');
Object.assign(evidence,{
 'nemotron-nano':'LiveCodeBench v6: 68.3 (NVIDIA BF16 model card); efficient reasoning and coding candidate.',
 'nemotron-lightning':'SWE-bench Verified: 51.56; PinchBench: 85.37 (NVIDIA BF16 model card).',
 'nemotron-super':'SWE-bench Verified: 60.47 with OpenHands (NVIDIA BF16 model-card evaluation).',
 'nemotron-ultra':'SWE-bench Verified: 71.9 (NVIDIA BF16 model-card evaluation); large agentic reasoning candidate.'
});
export function hardwareState(state,h){return normalize({...state,hardware:h.id,price:h.price,memory:h.memory,reserve:h.reserve,idle:h.idle,load:h.load,decodeOverride:0,prefillOverride:0,rental:state.matchHardware?h.rental:state.rental});}
export function candidates(state){return hardware.map(h=>({h,r:calculate(hardwareState(state,h))})).filter(({r})=>r.fits&&r.contextOk).sort((a,b)=>{const fullA=a.r.localFraction>=.999,fullB=b.r.localFraction>=.999;return Number(fullB)-Number(fullA)||(fullA?a.h.price-b.h.price:b.r.localFraction-a.r.localFraction)||a.h.price-b.h.price;});}
export function optimize(raw,{model=true,hardware:chooseHardware=true}={}){
 let s=normalize(raw);
 if(model&&s.autoModel){const shortlist=taskModels[s.workload]||taskModels.custom;const id=shortlist.find(id=>candidates({...s,model:id,kv:models.find(m=>m.id===id).kv}).some(c=>c.r.localFraction>=.999))||shortlist[0];s={...s,model:id,kv:models.find(m=>m.id===id).kv,decodeOverride:0,prefillOverride:0};}
 if(chooseHardware&&s.autoHardware){const options=candidates(s);if(options.length)s=hardwareState(s,options[0].h);}
 return normalize(s);
}
export function autoHorizon(raw){
 const r=calculate(raw),payback=combinedPayback(r.payback,r.paybackVsRental);
 // A longer projection is not credible enough to imply a useful equipment lifetime.
 const months=payback===null?60:Math.min(120,Math.max(12,Math.ceil(payback*1.25/6)*6));
 return {months,payback,note:payback===null?'No sustained payback against both alternatives. Showing a 5-year planning window.':payback>120?'Payback exceeds 10 years; the chart stops at 10 years because equipment life and prices are uncertain.':`View extends beyond the estimated ${payback.toFixed(1)}-month payback against both alternatives. Payback excludes resale.`};
}

// Lifecycle review is a risk overlay. It does not forecast undisclosed model specs or prices.
export function lifecycleRisk(r){
 const payback=combinedPayback(r.payback,r.paybackVsRental);
 const applicable=r.requests>0&&r.fits&&r.contextOk;
 const modelRisk=applicable&&(payback===null||payback>r.s.modelRefresh);
 const hardwareRisk=applicable&&(payback===null||payback>r.s.hardwareRefresh);
 const nextRequired=r.weight*r.s.nextModelGrowth+r.cache;
 const nextFits=nextRequired<=r.available;
 const weightHeadroom=r.weight>0?Math.max(0,(r.available-r.cache)/r.weight):0;
 const reviewAt=Math.min(r.s.modelRefresh,r.s.hardwareRefresh);
 const unrecoveredVsApi=Math.max(0,r.capital-(r.cloud-r.recurring)*reviewAt);
 const unrecoveredVsRent=Math.max(0,r.capital-r.s.rentalSetup-(r.rentalMonthly-r.recurring)*reviewAt);
 return {applicable,payback,modelRisk,hardwareRisk,warning:modelRisk||hardwareRisk,nextRequired,nextFits,weightHeadroom,reviewAt,unrecoveredVsApi,unrecoveredVsRent};
}
