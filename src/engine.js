import {defaults,models,hardware,rentals,workloads} from './catalog.js?v=18';
import {energyCost} from './energy.js?v=18';
export function normalize(raw={}){
 const s={...defaults};
 for(const [k,v] of Object.entries(defaults)){
  if(v===null||typeof v==='number'){
   const x=raw[k];s[k]=(x===null||x===''||x===undefined)?v:Number.isFinite(Number(x))?Math.max(0,Math.min(1e12,Number(x))):v;
  }else if(typeof raw[k]==='string')s[k]=raw[k].slice(0,2000);
 }
 for(const [k,items] of [['model',models],['hardware',hardware],['rental',rentals]])if(!items.some(x=>x.id===s[k]))s[k]=defaults[k];
 if(!workloads.some(w=>w[0]===s.workload))s.workload=defaults.workload;
 if(!/^20\d\d-(0[1-9]|1[0-2])$/.test(s.start))s.start=defaults.start;
 if(!['gs1','bill'].includes(s.tariff))s.tariff='gs1';
 for(const k of ['autoRental','autoModel','tariffConfirmed','localTax'])s[k]=s[k]?1:0;
 for(const k of ['purchaseDiscount','apiDecline','rentalDecline'])s[k]=Math.min(99,s[k]);
 s.users=Math.min(1000000,Math.floor(s.users));
 if(s.concurrency!==null)s.concurrency=Math.max(1,Math.floor(Math.min(100000,s.concurrency)));
 return s;
}
export function schedule(start,factory,offset=0){
 const [y,m]=start.split('-').map(Number),first=new Date(Date.UTC(y,m-1+offset,1));
 const year=first.getUTCFullYear(),month=first.getUTCMonth()+1,days=new Date(Date.UTC(year,month,0)).getUTCDate();
 let business=0;for(let d=1;d<=days;d++){const weekday=new Date(Date.UTC(year,month-1,d)).getUTCDay();if(weekday!==0&&weekday!==6)business++;}
 return {year,month,days:factory?days:business,hours:(factory?days*24:business*8),calendarDays:days};
}
export function suggestRental(s){
 const h=hardware.find(h=>h.id===s.hardware);
 const target=s.rentalMemory??s.localMemory??h.gpuCeiling??h.memory;
 return rentals.filter(r=>r.memory>=target).sort((a,b)=>a.hourly-b.hourly||a.memory-b.memory)[0]??null;
}
export function optimize(raw){const s=normalize(raw);if(s.autoRental){const r=suggestRental(s);if(r)s.rental=r.id;}return s;}
export function clearMeasurements(raw,scope='all'){
 const s={...raw};
 if(scope!=='rental')for(const k of ['localRph','localMemory','localAvailable','itKwh','coolingKwh'])s[k]=null;
 if(scope!=='rental')for(const k of ['localEvidence','localRuntime','energySource'])s[k]='';
 if(scope!=='local')for(const k of ['rentalRph','rentalMemory','rentalAvailable'])s[k]=null;
 if(scope!=='local')for(const k of ['rentalEvidence','rentalRuntime'])s[k]='';
 return s;
}
export function sustainedPayback(rows,key){
 // Require strict savings at the end; no declaration from equality or a temporary crossing.
 if(rows.at(-1).buy===null||rows.at(-1)[key]===null||rows.at(-1).buy>=rows.at(-1)[key])return null;
 let last=0;for(let i=0;i<rows.length;i++)if(rows[i].buy>rows[i][key])last=i;
 if(last===rows.length-1)return null;
 const a=rows[last],b=rows[last+1],gap=a.buy-a[key],nextGap=b.buy-b[key];
 return Math.max(0,last+(gap>0?gap/(gap-nextGap):0));
}
export function calculate(raw){
 const s=normalize(raw),m=models.find(m=>m.id===s.model),h=hardware.find(h=>h.id===s.hardware),r=rentals.find(r=>r.id===s.rental);
 const issues=[];const usage=s.calls!==null&&s.input!==null&&s.output!==null&&s.concurrency!==null&&!!s.usageSource;
 if(!usage)issues.push('Measured workload: calls, input/output tokens, concurrency and evidence.');
 const context=usage&&s.input+s.output<=m.context&&(!m.maxOutput||s.output<=m.maxOutput)&&(!m.maxInput||s.input<=m.maxInput);
 if(usage&&!context)issues.push('The selected API endpoint does not support this request length.');
 const purchase=s.quote!==null&&s.quoteSource?s.quote:h.price;
 const priceKnown=purchase!==null&&(s.quote===null||!!s.quoteSource)&&(!h.needsBuild||!!s.buildDetails);
 const localReady=s.localRph!==null&&s.localMemory!==null&&s.localAvailable!==null&&s.localAvailable<=(h.gpuCeiling??h.memory)&&s.localMemory<=s.localAvailable&&!!s.localEvidence&&!!s.localRuntime;
 const rentalReady=s.rentalRph!==null&&s.rentalMemory!==null&&s.rentalAvailable!==null&&s.rentalAvailable<=r.memory&&s.rentalMemory<=s.rentalAvailable&&!!s.rentalEvidence&&!!s.rentalRuntime;
 if(!priceKnown)issues.push('A complete-system purchase quote, including the configured host and networking.');
 if(!localReady)issues.push('Purchase-system benchmark, runtime/precision, usable memory and peak memory.');
 if(!rentalReady)issues.push('Rental-instance benchmark, runtime/precision, usable memory and peak memory.');
 const costsKnown=['localSetup','rentalSetup','localExtras','rentalExtras','apiExtras'].every(k=>s[k]!==null)&&!!s.costSource;
 if(!costsKnown)issues.push('Installation, support, fees and taxes from your quotes (enter 0 only if confirmed).');
 const demandRph=s.users*s.calls/(s.workload==='swe-factory'?24:8);
 const localUnits=localReady&&s.localRph>0?Math.max(1,Math.ceil(demandRph/s.localRph)):null;
 const rentalUnits=rentalReady&&s.rentalRph>0?Math.max(1,Math.ceil(demandRph/s.rentalRph)):null;
 if(localUnits===null)issues.push('Purchase configuration cannot serve this model; choose compatible hardware. No API fallback is used.');
 if(rentalUnits===null)issues.push('Rental configuration cannot serve this model; choose a compatible instance. No API fallback is used.');
 const energyInputs={...s,itKwh:s.itKwh===null?null:s.itKwh*(localUnits??1),coolingKwh:s.coolingKwh===null?null:s.coolingKwh*(localUnits??1),peakKw:s.peakKw===null?null:s.peakKw+(localUnits===null?0:Math.max(0,localUnits-1)*((s.itKwh??0)/Math.max(1,schedule(s.start,s.workload==='swe-factory').hours)))};
 const firstSchedule=schedule(s.start,s.workload==='swe-factory');
 const power=energyCost(energyInputs,firstSchedule.month);
 if(!power)issues.push('Measured IT/cooling energy and confirmed Dominion tariff or bill rate.');
 const changed=s.purchaseDiscount>0||s.apiDecline>0||s.rentalDecline>0;
 if(changed&&!s.priceEvidence)issues.push('Evidence for the entered discount or future contractual price changes.');
 const priceValid=!changed||!!s.priceEvidence;
 const capital=priceKnown&&s.localSetup!==null&&priceValid?localUnits===null?null:(purchase*(1-s.purchaseDiscount/100)+s.localSetup)*localUnits:null;
 const apiReady=usage&&context&&priceValid&&s.apiExtras!==null&&!!s.costSource;
 const buyReady=usage&&priceValid&&localReady&&localUnits!==null&&capital!==null&&power!==null&&s.localExtras!==null&&!!s.costSource;
 const rentReady=usage&&priceValid&&rentalReady&&rentalUnits!==null&&s.rentalSetup!==null&&s.rentalExtras!==null&&!!s.costSource;
 const ready=buyReady&&rentReady&&apiReady&&costsKnown&&priceValid;
 let buy=buyReady?capital:null,rent=rentReady?s.rentalSetup*rentalUnits:null,api=apiReady?0:null;
 const rows=[{month:0,buy,rent,api}];
 const unit=(s.input*m.input+s.output*m.output)/1e6;
 for(let i=0;i<120;i++){
  const cal=schedule(s.start,s.workload==='swe-factory',i),requests=usage?s.users*s.calls*cal.days:null;
  const apiFactor=priceValid?(1-s.apiDecline/100)**(i/12):1,rentFactor=priceValid?(1-s.rentalDecline/100)**(i/12):1;
  const apiUsage=usage&&context?requests*unit*apiFactor:null;
  const localCapacity=buyReady?s.localRph*cal.hours*localUnits:null,rentalCapacity=rentReady?s.rentalRph*cal.hours*rentalUnits:null;
  const localOverflow=0;
  const rentalOverflow=0;
  // Measured energy is a monthly budget for the selected schedule. Never infer wall power from TDP.
  const energy=energyCost(energyInputs,cal.month);
  const buyMonthly=buyReady?energy.total+s.localExtras*localUnits:null;
  const compute=r.hourly*cal.hours*rentFactor*(rentalUnits??1);
  const rentMonthly=rentReady?compute+s.rentalExtras*rentalUnits:null;
  const apiMonthly=apiReady?apiUsage+s.apiExtras:null;
  if(buy!==null)buy+=buyMonthly;if(rent!==null)rent+=rentMonthly;if(api!==null)api+=apiMonthly;
  rows.push({month:i+1,buy,rent,api,buyMonthly,rentMonthly,apiMonthly,compute,apiUsage,localOverflow,rentalOverflow,requests,localCapacity,rentalCapacity,energy,hours:cal.hours});
 }
 const usefulMonths=Math.min(120,Math.max(1,Math.min(s.modelRefresh>0?s.modelRefresh:3,s.hardwareRefresh>0?s.hardwareRefresh:6)));
 const at=(key,t)=>{const lo=Math.floor(t),hi=Math.ceil(t),a=rows[lo][key],b=rows[hi][key];return a===null||b===null?null:a+(b-a)*(t-lo);};
 const windowRows=rows.slice(0,Math.ceil(usefulMonths)+1);
 const crossing=key=>{const t=sustainedPayback(windowRows,key);return t!==null&&t<=usefulMonths?t:null;};
 const paybackApi=buyReady&&apiReady?crossing('api'):null,paybackRent=buyReady&&rentReady?crossing('rent'):null;
 const payback=paybackApi!==null&&paybackRent!==null?Math.max(paybackApi,paybackRent):null;
 const months=Math.min(24,Math.max(12,Math.ceil(usefulMonths*2)));
 const lifecycle=buyReady&&(payback===null||payback>=usefulMonths);
 const period=usefulMonths,amortized={},decisionCosts={};
 for(const key of ['buy','rent','api']){decisionCosts[key]=at(key,period);amortized[key]=decisionCosts[key]===null?null:decisionCosts[key]/period;}
 const buyEligible=ready&&payback!==null&&payback<usefulMonths;
 const unrecovered=buyReady&&rentReady&&apiReady?Math.max(0,decisionCosts.buy-Math.min(decisionCosts.rent,decisionCosts.api)):null;
 const phases={};
 for(const [key,prefix,units] of [['buy','local',localUnits],['rent','rental',rentalUnits]]){
  const prefill=s[prefix+'Prefill'],decode=s[prefix+'Decode'];
  const prefillSeconds=prefill>0?s.input/prefill:null,decodeSeconds=decode>0?s.output/decode:null;
  const total=prefillSeconds!==null&&decodeSeconds!==null?prefillSeconds+decodeSeconds:null;
  phases[key]={prefill,decode,units,prefillSeconds,decodeSeconds,prefillShare:total>0?prefillSeconds/total:null,decodeShare:total>0?decodeSeconds/total:null,requiredPrefill:demandRph*s.input/3600,requiredDecode:demandRph*s.output/3600,ratio:s.output>0?s.input/s.output:null};
 }
 return {usefulMonths,decisionCosts,buyEligible,unrecovered,phases,amortizationMonths:period,amortizationBasis:'useful competitiveness window — earlier model or hardware refresh',amortized,s,m,h,r,localUnits,rentalUnits,usage,context,ready,issues,purchase,capital,power,localReady,rentalReady,apiReady,buyReady,rentReady,rows,payback,paybackApi,paybackRent,months,lifecycle,first:rows[1],last:rows[months],firstSchedule};
}
