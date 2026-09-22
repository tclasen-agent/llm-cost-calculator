import {models, hardware, defaults, workloads} from './catalog.js?v=3';
export function normalize(raw) {
  const s={...defaults};
  s.workload=workloads.some(w=>w.id===raw.workload)?raw.workload:'custom';
  for(const key of Object.keys(defaults)) {
    if(typeof defaults[key]==='number') { const n=Number(raw[key] ?? defaults[key]); s[key]=Number.isFinite(n)?Math.max(0,n):defaults[key]; }
  }
  s.model=models.some(m=>m.id===raw.model)?raw.model:defaults.model;
  s.rentalHardware=hardware.some(h=>h.id===raw.rentalHardware)?raw.rentalHardware:defaults.rentalHardware;
  s.rentalEfficiency=Math.min(100,s.rentalEfficiency); s.rentalBatchExponent=Math.min(1,s.rentalBatchExponent);
  s.hardware=hardware.some(h=>h.id===raw.hardware)?raw.hardware:defaults.hardware;
  for(const k of ['activity','cache','efficiency','resale']) s[k]=Math.min(100,s[k]);
  s.bits=[4,8,16].includes(s.bits)?s.bits:4;
  s.days=Math.min(30,s.days); s.hours=Math.min(24,s.hours); s.rentalHours=Math.min(720,s.rentalHours);
  s.months=Math.max(1,Math.min(120,Math.round(s.months))); s.batch=Math.min(4096,Math.round(s.batch));
  s.context=Math.max(1,Math.min(1048576,s.context)); s.batchExponent=Math.min(1,s.batchExponent);
  s.cooling=Math.max(1,s.cooling); s.load=Math.max(s.idle,s.load);
  return s;
}
export function calculate(raw) {
  const s=normalize(raw), m=models.find(x=>x.id===s.model), h=hardware.find(x=>x.id===s.hardware);
  const concurrency=Math.ceil(s.users*s.agents*s.activity/100);
  const batch=Math.max(1,s.batch||concurrency);
  const requests=s.users*s.agents*s.requests*s.days;
  const weight=m.params*s.bits/8*(1+s.headroom/100); // billions of parameters -> decimal GB
  const cache=s.context*s.kv/1000*batch; // decimal MB/token -> decimal GB
  const required=weight+cache, available=Math.max(0,s.memory-s.reserve);
  const fits=required<=available;
  const contextOk=s.input+s.output<=s.context && s.context<=m.context;
  // This is an explicit heuristic, not a measured benchmark model.
  const scale=Math.sqrt(3.3/m.active)*Math.pow(30.5/m.params,0.15)*(4/s.bits);
  const decode=(s.decodeOverride||h.decode*scale)*s.speed/100*Math.pow(batch,s.batchExponent);
  const prefill=(s.prefillOverride||h.prefill*scale)*s.speed/100*Math.pow(batch,s.batchExponent);
  const secondsPerRequest=(s.input ? s.input/(prefill||Number.MIN_VALUE):0)+(s.output ? s.output/(decode||Number.MIN_VALUE):0);
  const hours=s.days*s.hours;
  const capacity=fits&&contextOk&&secondsPerRequest>0?hours*3600*s.efficiency/100/secondsPerRequest:0;
  const localRequests=Math.min(requests,capacity);
  const localFraction=requests>0?localRequests/requests:0;
  const activeHours=localRequests>0&&Number.isFinite(secondsPerRequest)?Math.min(hours,localRequests*secondsPerRequest/3600):0;
  const energyKwh=(s.idle*720+(s.load-s.idle)*activeHours)/1000*s.cooling;
  const powerCost=energyKwh*s.electricity;
  const unitCloud=(s.input*((1-s.cache/100)*s.apiInput+s.cache/100*s.apiCached)+s.output*s.apiOutput)/1e6;
  const cloud=requests*unitCloud;
  const overflow=(requests-localRequests)*unitCloud;
  const recurring=powerCost+s.maintenance+overflow;
  const capital=s.price+s.setup;
  const savings=cloud-recurring;
  const payback=savings>0?capital/savings:null;
  const resale=s.price*s.resale/100;
  const localTco=capital+recurring*s.months-resale;
  const cloudTco=cloud*s.months;
  // The rental is an independently sized machine serving the SAME model and token mix.
  const rentalHardware=hardware.find(h=>h.id===s.rentalHardware);
  const rentalAvailable=Math.max(0,s.rentalMemory-s.rentalReserve);
  const rentalFits=required<=rentalAvailable;
  const rentalDecode=(s.rentalDecodeOverride||rentalHardware.decode*scale)*s.rentalSpeed/100*Math.pow(batch,s.rentalBatchExponent);
  const rentalPrefill=(s.rentalPrefillOverride||rentalHardware.prefill*scale)*s.rentalSpeed/100*Math.pow(batch,s.rentalBatchExponent);
  const rentalSeconds=(s.input?s.input/(rentalPrefill||Number.MIN_VALUE):0)+(s.output?s.output/(rentalDecode||Number.MIN_VALUE):0);
  // Bill every provisioned hour; only hours overlapping the workload window serve requests.
  const rentalServingHours=Math.min(hours,s.rentalHours);
  const rentalCapacity=rentalFits&&contextOk&&rentalSeconds>0?rentalServingHours*3600*s.rentalEfficiency/100/rentalSeconds:0;
  const rentalRequests=Math.min(requests,rentalCapacity);
  const rentalFraction=requests>0?rentalRequests/requests:0;
  const rentalOverflow=(requests-rentalRequests)*unitCloud;
  const rentalCompute=s.rental*s.rentalHours;
  const rentalMonthly=rentalCompute+s.rentalExtra+rentalOverflow;
  const rentalTco=s.rentalSetup+rentalMonthly*s.months;
  const rentalSavings=rentalMonthly-recurring;
  const rentalCapitalGap=capital-s.rentalSetup;
  const paybackVsRental=rentalSavings>0?Math.max(0,rentalCapitalGap/rentalSavings):null;
  // Volume threshold amortizes capex over the selected horizon, excluding surplus rental capacity.
  const incrementalEnergy=secondsPerRequest/3600*(s.load-s.idle)/1000*s.cooling*s.electricity;
  const fixedMonthly=(capital-resale)/s.months+s.maintenance+s.idle*720/1000*s.cooling*s.electricity;
  const margin=unitCloud-incrementalEnergy;
  const threshold=margin>0?fixedMonthly/margin:null;
  const thresholdFeasible=threshold!==null&&fits&&contextOk&&threshold<=capacity;
  return {s,m,h,concurrency,batch,requests,weight,cache,required,available,fits,contextOk,decode,prefill,capacity,localRequests,localFraction,activeHours,energyKwh,powerCost,cloud,overflow,recurring,capital,payback,localTco,cloudTco,rentalMonthly,rentalTco,rentalHardware,rentalAvailable,rentalFits,rentalDecode,rentalPrefill,rentalCapacity,rentalRequests,rentalFraction,rentalOverflow,rentalCompute,rentalServingHours,paybackVsRental,threshold,thresholdFeasible,perStream:decode/batch,ttft:prefill>0?s.input*batch/prefill:Infinity,latency:secondsPerRequest*batch};
}

// Owning must recover its cost against both alternatives before the chart marks payback.
export function combinedPayback(apiPayback, rentalPayback) {
  return [apiPayback, rentalPayback].every(n => typeof n === 'number' && Number.isFinite(n) && n >= 0)
    ? Math.max(apiPayback, rentalPayback) : null;
}
