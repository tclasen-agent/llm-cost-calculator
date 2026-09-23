import {defaults,hardware,rentals,models} from './catalog.js?v=29';
import {gs1Variable} from './energy.js?v=29';
import {normalize,schedule} from './engine.js?v=29';
import {data,profiles,purchaseAllowances} from './data/index.js?v=29';
export {profiles} from './data/index.js?v=29';
const policy=data.inferencePolicy,prices=purchaseAllowances;
export function planning(raw={}){
 let s=normalize(raw); const overrides=new Set(s.overrides.split(',').filter(Boolean));
 const [calls,input,output,activity]=profiles[s.workload];
 const set=(k,v)=>{if(!overrides.has(k)||s[k]===null||s[k]==='')s[k]=v;};
 s.users=Math.max(1,s.users||1);
 set('calls',calls);set('input',input);set('output',output);set('concurrency',Math.max(1,Math.ceil(s.users*activity)));
 set('usageSource','Planning assumption: task template; replace with pilot usage.');
 const previousHardware=s.hardware,previousRental=s.rental;
 const required=models.find(m=>m.id===s.model).planningMemoryGB+Math.max(0,s.concurrency-1)*policy.concurrencyMemoryGB;
 const localRequired=overrides.has('localMemory')&&s.localMemory!==null?s.localMemory:required;
 const rentalRequired=overrides.has('rentalMemory')&&s.rentalMemory!==null?s.rentalMemory:required;
 if(s.autoHardware){const candidates=hardware.filter(h=>(h.gpuCeiling??h.memory)*policy.localUsable>=localRequired);s.hardware=(candidates.sort((a,b)=>(a.price??prices[a.id])-(b.price??prices[b.id]))[0]??{id:s.hardware}).id;}
 const h=hardware.find(h=>h.id===s.hardware);
 if(s.autoRental){s.rental=(rentals.filter(r=>r.memory*policy.rentalUsable>=rentalRequired).sort((a,b)=>a.hourly-b.hourly)[0]??{id:s.rental}).id;}
 if(s.hardware!==previousHardware)for(const key of ['localPrefill','localDecode','localRph','localAvailable','localMemory','localRuntime','localEvidence','quote','quoteSource','buildDetails','localSetup','itKwh','coolingKwh','energySource'])overrides.delete(key);
 if(s.rental!==previousRental)for(const key of ['rentalPrefill','rentalDecode','rentalRph','rentalAvailable','rentalMemory','rentalRuntime','rentalEvidence','rentalSetup','rentalExtras'])overrides.delete(key);
 s.overrides=[...overrides].join(',');
 const r=rentals.find(r=>r.id===s.rental),cal=schedule(s.start,s.workload==='swe-factory');
 const available=(h.gpuCeiling??h.memory)*policy.localUsable,rv=r.memory*policy.rentalUsable;
 const nodes=h.nodes??1;
 // Aggregate throughput proxy includes prompt processing; no measured parity is implied.
 const localTps=(h.kind==='VRAM'?policy.gpuTps:policy.unifiedTps)*Math.sqrt(nodes)*Math.min(policy.concurrencySpeedCap,Math.sqrt(s.concurrency));
 const rentTps=policy.gpuTps*Math.sqrt(r.gpus)*Math.min(policy.concurrencySpeedCap,Math.sqrt(s.concurrency));
 set('localAvailable',available);set('rentalAvailable',rv);
 set('localMemory',required);set('rentalMemory',required);
 set('localPrefill',localTps*policy.prefillMultiplier);set('localDecode',localTps);set('rentalPrefill',rentTps*policy.prefillMultiplier);set('rentalDecode',rentTps);
 const rate=(pre,dec)=>{if((s.input>0&&pre<=0)||(s.output>0&&dec<=0))return 0;const seconds=(s.input>0?s.input/pre:0)+(s.output>0?s.output/dec:0);return seconds>0?3600/seconds:3600;};
 set('localRph',s.localMemory<=s.localAvailable?rate(s.localPrefill,s.localDecode):0);
 set('rentalRph',s.rentalMemory<=s.rentalAvailable?rate(s.rentalPrefill,s.rentalDecode):0);
 for(const prefix of ['local','rental']){set(prefix+'Runtime',policy.runtimeDescription);set(prefix+'Evidence','Planning proxy, not a benchmark. A non-fitting model makes that hardware path unavailable; no API fallback.');}
 set('quote',h.price??prices[h.id]);set('quoteSource',h.price?`Published catalog price: ${h.priceSource}`:'Planning allowance for the whole system; replace with a vendor quote.');set('buildDetails',h.package+' Planning allowance includes a complete host and cluster networking; obtain an exact configuration.');
 set('localSetup',Math.round(s.quote*policy.setupFraction));set('localExtras',policy.localExtras);set('rentalSetup',policy.rentalSetup);set('rentalExtras',policy.rentalExtras);set('apiExtras',policy.apiExtras);
 set('costSource',`Planning allowances: ${policy.setupFraction*100}% purchase extras, $${policy.localExtras}/month local support, $${policy.rentalExtras}/month rental extras, $${policy.apiExtras} API extras. Not quotes.`);
 const watts=h.id==='supermicro-h100'?policy.hgxWatts:h.kind==='VRAM'?policy.workstationWatts:policy.unifiedWatts*nodes;
 set('itKwh',watts/1000*cal.hours+watts*policy.idleFraction/1000*(cal.calendarDays*24-cal.hours));set('coolingKwh',s.itKwh*policy.coolingFraction);
 set('energySource',`Planning assumption: ${policy.unifiedWatts} W per unified-memory node, ${policy.workstationWatts} W workstation or ${policy.hgxWatts/1000} kW HGX; ${policy.idleFraction*100}% idle power; cooling adds ${policy.coolingFraction*100}%. Replace with measurements.`);
 set('tariff','bill');set('baselineKwh',policy.baselineKwh);set('peakKw',policy.peakKw);set('tariffConfirmed',0);set('localTax',1);
 // Published GS-1 marginal charges at a representative baseline; eligibility remains an assumption.
 set('billRate',Number(((gs1Variable(policy.baselineKwh+policy.marginalSampleKwh,cal.month)-gs1Variable(policy.baselineKwh,cal.month))/policy.marginalSampleKwh).toFixed(5)));set('billSource',`Planning assumption: published Dominion GS-1 marginal rate at ${policy.baselineKwh.toLocaleString('en-US')} kWh baseline in Loudoun; account eligibility assumed. Select verified GS-1 in advanced settings or replace with your bill.`);
 set('purchaseDiscount',policy.purchaseDiscount);set('rentalDecline',policy.rentalDecline);set('apiDecline',policy.apiDecline);set('priceEvidence',`Aggressive scenario: rental compute falls ${policy.rentalDecline}% annually; API token rates fall ${policy.apiDecline}% annually, compounded monthly. Current purchase cost unchanged. These are assumptions, not provider promises.`);
 set('modelRefresh',policy.modelRefresh);set('hardwareRefresh',policy.hardwareRefresh);set('lifecycleSource',`Aggressive adoption policy: reassess better/larger models every ${policy.modelRefresh} months and hardware price/performance every ${policy.hardwareRefresh} months. Treat the earlier event as the investment deadline. Hardware does not physically expire; these are competitiveness assumptions.`);
 return normalize(s);
}
export function assumptionNotes(s){return [
 'Task activity, token counts and concurrency are editable planning templates, not measured usage.',
 'Memory fit and processing speeds are rough planning proxies. Validate runtime support, quality and performance before purchase.',
 'Unknown equipment prices use whole-system budget allowances. Published catalog prices and actual rental/API rates retain their source links.',
 'Power, cooling, fees and review intervals are planning assumptions. Advanced fields let your team replace them.',
 ...(s.localRph===0?['This purchase configuration is estimated not to fit the model; choose compatible hardware to enable the purchase path.']:[]),
 ...(s.rentalRph===0?['This rental configuration is estimated not to fit the model; choose a compatible instance to enable the rental path.']:[])
 ];}
