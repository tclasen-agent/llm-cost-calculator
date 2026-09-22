import {models,hardware} from './catalog.js?v=6';
import {calculate,normalize,combinedPayback} from './engine.js?v=6';
export const taskModels={chat:['oss120','qwen30'],research:['minimax','kimi3','kimi25','oss120'],bizdev:['oss120','minimax','kimi3'],swe:['qwen80','minimax','kimi3','kimi25','qwen30'],support:['oss120','qwen30'],writing:['oss120','minimax','kimi3'],security:['qwen80','kimi3','minimax','kimi25'],custom:['qwen80','oss120']};
export const evidence={qwen80:'SWE-bench Verified 70.6 (vendor model card).',minimax:'SWE-bench Verified 80.2; BrowseComp 76.3 with context management (vendor report).',kimi25:'SWE-Bench Verified 76.8 (vendor harness).',kimi3:'Terminal-Bench 2.1 88.3; BrowseComp 91.2 with compaction (vendor, max effort).',oss120:'Reasoning and tool-use candidate; no directly comparable task score recorded here.',qwen30:'Efficient coding candidate; no directly comparable task score recorded here.',deepseek:'Large reasoning candidate; no directly comparable task score recorded here.'};
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
