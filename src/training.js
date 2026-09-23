import {trainingWorkload,methodDefaults,methodKeys,trainingMethods} from './training-methods.js?v=29';
import {verifiedConfiguration} from './verification.js?v=29';
import {data,trainingModels,trainingSystems,trainingDefaults} from './data/index.js?v=29';
export {trainingSource,trainingModels,trainingSystems,trainingDefaults} from './data/index.js?v=29';
const policy=data.trainingPolicy;
export function normalizeTraining(raw={}){
 const s={...trainingDefaults};
 for(const [k,d] of Object.entries(s)){
  if(typeof d==='number'){const n=Number(raw[k]);if(raw[k]!==''&&raw[k]!==null&&raw[k]!==undefined&&Number.isFinite(n))s[k]=Math.max(0,Math.min(k==='corpusTokens'?1e15:1e9,n));}
  else if(typeof raw[k]==='string')s[k]=raw[k].slice(0,1000);
 }
 for(const [key,values] of [['model',trainingModels.map(m=>m.id)],['method',trainingMethods.map(m=>m.id)],['updateMethod',['qlora','lora','full','partial']],['referenceMode',['resident','precompute']],['teacherMode',['local','external','precomputed']],['task',['security','custom']],['buy',trainingSystems.filter(h=>h.kind==='buy').map(h=>h.id)],['rent',trainingSystems.filter(h=>h.kind==='rent').map(h=>h.id)]])if(!values.includes(s[key]))s[key]=trainingDefaults[key];
 for(const k of ['examples','tokens','sequence','microbatch','runs'])s[k]=Math.max(1,Math.floor(s[k]));
 s.epochs=Math.max(.01,s.epochs);s.runsPerMonth=Math.max(.01,s.runsPerMonth);s.allocationMonths=Math.max(1,Math.min(data.inferencePolicy.projectionMonths,s.allocationMonths));
 s.sequence=Math.min(trainingModels.find(m=>m.id===s.model).context,s.sequence);s.microbatch=Math.min(1024,s.microbatch);s.cooling=Math.min(1000,s.cooling);s.overhead=Math.min(1000,s.overhead);
 s.adapterPercent=Math.min(10,s.adapterPercent);
 s.trainablePercent=Math.max(.01,Math.min(100,s.trainablePercent));
 s.corpusTokens=Math.max(1,s.corpusTokens);s.teacherParameters=Math.max(.001,s.teacherParameters);
 for(const key of ['completionTokens','policyUpdates'])s[key]=Math.max(1,Math.floor(s[key]));
 s.generations=Math.max(s.method==='grpo'?2:1,Math.floor(s.generations));
 for(const key of ['referenceModel','rolloutCopy'])s[key]=s[key]?1:0;
 for(const k of ['customBuyGPUs','customRentGPUs'])s[k]=Math.max(1,Math.min(4096,Math.floor(s[k])));
 for(const k of ['customBuyVRAM','customRentVRAM'])s[k]=Math.max(1,Math.min(4096,s[k]));
 for(const k of ['buySharding','rentSharding','recipeConfirmed','autoBuy','autoRent'])s[k]=s[k]?1:0;
 if(raw.autoBuy===undefined&&s.buy==='customBuy')s.autoBuy=0;
 if(raw.autoRent===undefined&&s.rent==='customRent')s.autoRent=0;
 return s;
}
export function encodeTraining(raw){const s=normalizeTraining(raw),p=new URLSearchParams({mode:'training',training:'1'});for(const [k,v] of Object.entries(s))p.set('ft_'+k,String(v));return p.toString();}
export function decodeTraining(query){const p=new URLSearchParams(query);if(p.get('mode')!=='training'||p.get('training')!=='1')return null;const s={};for(const k of Object.keys(trainingDefaults))if(p.has('ft_'+k))s[k]=p.get('ft_'+k);return normalizeTraining(s);}
export function estimateTraining(raw){
 const s=normalizeTraining(raw),model=trainingModels.find(m=>m.id===s.model);
 const workload=trainingWorkload(s,model);
 const {tokens,baseGB,adapterGB,recipeGB,activationGB,estimatedGB}=workload;
 function path(kind){
  const h={...trainingSystems.find(h=>h.id===s[kind])};
  if(h.id==='customBuy'){h.gpus=s.customBuyGPUs;h.vram=s.customBuyVRAM;}
  if(h.id==='customRent'){h.gpus=s.customRentGPUs;h.vram=s.customRentVRAM;}
  const requiredGB=s[kind+'Peak']>0?s[kind+'Peak']:estimatedGB;
  const availableGB=h.gpus*h.vram*policy.usableMemory;
  const minimumGPUs=Math.ceil(requiredGB/(h.vram*policy.usableMemory));
  const issues=[];
  const notes=[];
  if(!workload.recipeReference)notes.push('Generic recipe assumption: training-stack support for this model and method needs a pilot.');
  if(h.id==='customBuy'&&(!s.quoteEvidence.trim()||s.quote<=0))issues.push('Enter a positive complete-system purchase quote and its reference.');
  if(h.id==='customRent'&&(!s.rentQuoteEvidence.trim()||s.rentRate<=0))issues.push('Enter a positive whole-cluster rental rate and its reference.');
  if(requiredGB>availableGB)issues.push(`Estimated peak memory exceeds the ${policy.usableMemory*100}% GPU memory budget.`);
  if(h.gpus>1)notes.push('Planning assumes model and training-state sharding across these GPUs. Validate the exact recipe, interconnect and per-device memory before renting or buying.');
  if(s[kind+'Low']<=0||s[kind+'High']<=0)issues.push('Enter positive training throughput for both ends of the range.');
  if(s[kind+'Low']>s[kind+'High'])issues.push('The lower throughput must not exceed the upper throughput.');
  if((workload.referenceTokens+workload.rewardTokens)>0&&s[kind+'Forward']<=0)issues.push('Enter positive auxiliary forward throughput.');
  if(workload.generationTokens>0&&s[kind+'Generation']<=0)issues.push('Enter positive generation throughput including prompt-processing time.');
  if(workload.distill&&s.teacherMode==='local'&&s.completionTokens>s.tokens)issues.push('Mean processed tokens per example must include the teacher response.');
  if(workload.distill&&s.teacherMode==='external'&&s.teacherCost<=0)issues.push('Enter the external teacher cost per run, or choose an already prepared dataset.');
  if(issues.length)return {kind,h,requiredGB,availableGB,minimumGPUs,issues,notes,ready:false};
  const generationHours=workload.generationTokens?stageHours(workload.generationTokens,s[kind+'Generation']):0;
  const forwardHours=(workload.referenceTokens+workload.rewardTokens)?stageHours(workload.referenceTokens+workload.rewardTokens,s[kind+'Forward']):0;
  const rewardHours=workload.samples*s.rewardSeconds/3600;
  const auxiliaryHours=generationHours+forwardHours+rewardHours;
  // PPO throughput must cover the policy AND critic update, not just policy training.
  const hours=[s[kind+'High'],s[kind+'Low']].map(tps=>(tokens/tps/3600+auxiliaryHours)*(1+s.overhead/100)+s.setupHours);
  const capital=s.quote+s.setup;
  const allocation=capital/(s.allocationMonths*s.runsPerMonth);
  const operating=hours.map(t=>(kind==='rent'?t*s.rentRate+s.rentExtras:t*s.watts/1000*(1+s.cooling/100)*s.electricity+s.support/s.runsPerMonth)+workload.externalCost);
  const perRun=operating.map(v=>v+(kind==='buy'?allocation:0));
  const campaign=operating.map(v=>v*s.runs+(kind==='buy'?capital:0));
  return {kind,h,requiredGB,availableGB,minimumGPUs,issues,notes,ready:true,hours,auxiliaryHours,generationHours,forwardHours,rewardHours,cadenceFits:hours[1]*s.runsPerMonth<=policy.monthlyHours,gpuHours:hours.map(t=>t*h.gpus),operating,perRun,campaign,capital:kind==='buy'?capital:0};
 }
 const buy=path('buy'),rent=path('rent');
 let payback=null;
 if(buy.ready&&rent.ready){
  // Conservative crossing: slow purchase operating cost vs fast rental cost.
  const saving=rent.operating[0]-buy.operating[1];
  if(saving>0)payback=Math.ceil(buy.capital/saving);
 }
 return {s,model,workload,tokens,baseGB,adapterGB,recipeGB,activationGB,estimatedGB,buy,rent,payback,paybackWithinWindow:payback!==null&&buy.cadenceFits&&payback<=s.runsPerMonth*s.allocationMonths};
}


function resetTrainingSystem(s,kind,id){
 const h=trainingSystems.find(h=>h.id===id);
 s[kind]=id;
 for(const suffix of ['Low','High','Forward','Generation','Evidence','Peak','Sharding'])s[kind+suffix]=trainingDefaults[kind+suffix];
 if(kind==='buy'){s.quote=h.price;s.watts=h.watts;s.setup=h.price*data.inferencePolicy.setupFraction;s.quoteEvidence='';}
 else {s.rentRate=h.hourly;s.rentQuoteEvidence='';}
}

// Prefer higher-confidence estimates, then the least expensive fitting system.
export function planTraining(raw={}){
 const s=normalizeTraining(raw),r=calculateTraining(s);
 for(const kind of ['buy','rent']){
  const automatic=kind==='buy'?s.autoBuy:s.autoRent;
  if(!automatic)continue;
  const candidates=trainingSystems.filter(h=>h.kind===kind&&!h.id.startsWith('custom')&&h.gpus*h.vram*policy.usableMemory>=r.estimatedGB);
  const high=h=>highConfidence(r,h,r.estimatedGB);
  candidates.sort((a,b)=>Number(high(b))-Number(high(a))||(kind==='buy'?a.price-b.price:a.hourly-b.hourly)||a.gpus-b.gpus||a.id.localeCompare(b.id));
  const next=candidates[0];
  if(next&&next.id!==s[kind])resetTrainingSystem(s,kind,next.id);
 }
 return s;
}

export function updateTraining(raw,key,value){
 const s=normalizeTraining({...raw,[key]:value});
 const side=key==='buy'?'buy':key==='rent'?'rent':null;
 if(side){resetTrainingSystem(s,side,s[side]);s[side==='buy'?'autoBuy':'autoRent']=0;}
 const upstream=['model','method','sequence','microbatch','tokens','adapterPercent',...methodKeys.filter(k=>!k.startsWith('buy')&&!k.startsWith('rent'))];
 if(upstream.includes(key)){
  for(const kind of ['buy','rent'])for(const suffix of ['Low','High','Forward','Generation','Evidence','Peak','Sharding'])s[kind+suffix]=trainingDefaults[kind+suffix];
 }
 if(upstream.includes(key))s.recipeConfirmed=0;
 // Measurements and hardware-specific quotes refer to the currently selected
 // system. Pin that system so another suggestion cannot inherit its evidence.
 const buyFields=['buyForward','buyGeneration','buyLow','buyHigh','buyPeak','buyEvidence','buySharding','quote','quoteEvidence','setup','watts','customBuyGPUs','customBuyVRAM'];
 const rentFields=['rentForward','rentGeneration','rentLow','rentHigh','rentPeak','rentEvidence','rentSharding','rentRate','rentQuoteEvidence','customRentGPUs','customRentVRAM'];
 if(buyFields.includes(key))s.autoBuy=0;
 if(rentFields.includes(key))s.autoRent=0;
 if(['autoBuy','autoRent'].includes(key)&&s[key]){
  const kind=key==='autoBuy'?'buy':'rent';
  resetTrainingSystem(s,kind,s[kind]);
 }
 return planTraining(s);
}

// Confidence concerns feasibility only; throughput remains an independent assumption.
function highConfidence(r,h,requiredGB){
 return r.workload.recipeReference&&h.gpus===1&&!h.id.startsWith('custom')
  &&r.s.sequence<=policy.activationSequence&&r.s.microbatch===trainingDefaults.microbatch
  &&r.s.adapterPercent<=trainingDefaults.adapterPercent
  &&requiredGB<=h.gpus*h.vram*policy.highConfidenceMemory;
}
export function calculateTraining(raw){
 const r=estimateTraining(raw);
 for(const kind of ['buy','rent']){
  const p=r[kind];
  p.verified=Boolean(verifiedConfiguration('training',r.s,kind,r.s[kind]));
  p.confidence=!p.ready?'unavailable':p.verified?'verified':!r.s[kind+'Peak']&&highConfidence(r,p.h,p.requiredGB)?'high':'estimated';
  p.confidenceLabel={unavailable:'Configuration unavailable',verified:'Reviewed configuration',high:'High confidence · estimated feasibility',estimated:'Planning estimate · feasibility needs a pilot'}[p.confidence];
  if(p.ready&&!p.verified)p.notes.push(p.confidence==='high'
   ?`Published supervised recipe, single GPU and modeled peak within ${policy.highConfidenceMemory*100}% of installed VRAM. This is an assumption-based assessment, not a demonstrated run on this system; throughput is not validated.`
   :'Memory fits under the modeled assumptions. Runtime support, per-device peaks and throughput are not demonstrated for this configuration.');
 }
 return r;
}

function stageHours(tokens,tps){return tokens/tps/3600;}
