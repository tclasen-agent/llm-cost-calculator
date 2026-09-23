import {verifiedConfiguration,verificationMessage} from './verification.js?v=23';
// Training estimates are separate from inference capacity and replication.
export const trainingSource='https://unsloth.ai/docs/models/gpt-oss-how-to-run-and-fine-tune';
// Rounded total checkpoint parameter counts from the linked publisher model cards,
// reviewed 2026-09-23. Total resident parameters, never MoE active parameters.
import {models as inferenceModels} from './catalog.js?v=23';
const parameterBillions={ds41:763,glm53:753,glm53flash:321,qwen38large:2400,qwen38small:28,minimax27:229,'nemotron-lightning':32,kimi3:2800,'nemotron-ultra':561,'nemotron-super':124,minimax:229,qwen80:80,kimi25:1000,'nemotron-nano':32,deepseek:685,oss120:117,qwen30:31};
export const trainingModels=inferenceModels.filter(m=>Object.hasOwn(parameterBillions,m.id)).map(m=>({
 id:m.id,name:m.name,source:m.source,context:m.context,parameters:parameterBillions[m.id],
 eligibility:'Open weights; adaptation remains subject to the model license and training-stack support.',
 ...(m.id==='oss120'?{qlora:65,lora:210,recipe:true}:{recipe:false})
}));
trainingModels.push({id:'oss20',name:'OpenAI: gpt-oss-20b',parameters:21,context:131072,source:'https://huggingface.co/openai/gpt-oss-20b',qlora:14,lora:44,recipe:true});
export const trainingSystems=[
 {id:'workstation96',name:'96 GB NVIDIA workstation',gpus:1,vram:96,price:15000,watts:700,source:'https://www.pugetsystems.com/products/workstations/configure/',kind:'buy'},
 {id:'hgx640',name:'8 × H100 80 GB HGX server',gpus:8,vram:80,price:300000,watts:10000,source:'https://www.supermicro.com/en/products/system/gpu/4u/sys-421ge-tnhr2-lcc',kind:'buy'},
 {id:'h100',name:'Lambda 1 × H100 SXM 80 GB',gpus:1,vram:80,hourly:4.29,kind:'rent'},
 {id:'b200',name:'Lambda 1 × B200 180 GB',gpus:1,vram:180,hourly:6.99,kind:'rent'},
 {id:'h100x4',name:'Lambda 4 × H100 SXM 80 GB',gpus:4,vram:80,hourly:16.36,kind:'rent'},
 {id:'customBuy',name:'Custom purchase cluster',gpus:8,vram:80,price:0,watts:10000,kind:'buy'},
 {id:'customRent',name:'Custom rental cluster',gpus:8,vram:80,hourly:0,kind:'rent'},
 {id:'h100x8',name:'Lambda 8 × H100 SXM 80 GB',gpus:8,vram:80,hourly:31.92,kind:'rent'}
];
export const trainingDefaults={autoBuy:1,autoRent:1,model:'oss120',method:'qlora',task:'security',recipeConfirmed:0,adapterPercent:.1,customBuyGPUs:8,customBuyVRAM:80,customRentGPUs:8,customRentVRAM:80,rentQuoteEvidence:'',examples:10000,tokens:4000,epochs:2,sequence:4096,microbatch:1,runs:3,runsPerMonth:1,buy:'workstation96',rent:'h100',buyLow:125,buyHigh:500,rentLow:250,rentHigh:1000,buyEvidence:'',rentEvidence:'',buyPeak:0,rentPeak:0,buySharding:0,rentSharding:0,quote:15000,quoteEvidence:'',setup:1200,watts:700,electricity:.15,cooling:25,support:20,rentRate:4.29,rentExtras:10,overhead:20,setupHours:1,allocationMonths:12};
export function normalizeTraining(raw={}){
 const s={...trainingDefaults};
 for(const [k,d] of Object.entries(s)){
  if(typeof d==='number'){const n=Number(raw[k]);if(raw[k]!==''&&raw[k]!==null&&raw[k]!==undefined&&Number.isFinite(n))s[k]=Math.max(0,Math.min(1e9,n));}
  else if(typeof raw[k]==='string')s[k]=raw[k].slice(0,1000);
 }
 for(const [key,values] of [['model',trainingModels.map(m=>m.id)],['method',['qlora','lora']],['task',['security','custom']],['buy',trainingSystems.filter(h=>h.kind==='buy').map(h=>h.id)],['rent',trainingSystems.filter(h=>h.kind==='rent').map(h=>h.id)]])if(!values.includes(s[key]))s[key]=trainingDefaults[key];
 for(const k of ['examples','tokens','sequence','microbatch','runs'])s[k]=Math.max(1,Math.floor(s[k]));
 s.epochs=Math.max(.01,s.epochs);s.runsPerMonth=Math.max(.01,s.runsPerMonth);s.allocationMonths=Math.max(1,Math.min(120,s.allocationMonths));
 s.sequence=Math.min(trainingModels.find(m=>m.id===s.model).context,s.sequence);s.microbatch=Math.min(1024,s.microbatch);s.cooling=Math.min(1000,s.cooling);s.overhead=Math.min(1000,s.overhead);
 s.adapterPercent=Math.min(10,s.adapterPercent);
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
 const tokens=s.examples*s.tokens*s.epochs;
 // Recipe floor plus a deliberately conservative, editable activation allowance.
 // This is a sensitivity heuristic, not a model of attention kernels or proof of fit.
 const baseGB=model.parameters*(s.method==='qlora'?.625:2);
 const adapterGB=model.parameters*s.adapterPercent/100*16;
 const recipeGB=model.recipe?model[s.method]:baseGB+adapterGB;
 const activationGB=8*(s.sequence/4096)*s.microbatch;
 const estimatedGB=recipeGB+activationGB;
 function path(kind){
  const h={...trainingSystems.find(h=>h.id===s[kind])};
  if(h.id==='customBuy'){h.gpus=s.customBuyGPUs;h.vram=s.customBuyVRAM;}
  if(h.id==='customRent'){h.gpus=s.customRentGPUs;h.vram=s.customRentVRAM;}
  const requiredGB=s[kind+'Peak']>0?s[kind+'Peak']:estimatedGB;
  const availableGB=h.gpus*h.vram*.95;
  const minimumGPUs=Math.ceil(requiredGB/(h.vram*.95));
  const issues=[];
  const notes=[];
  if(!model.recipe&&!s.recipeConfirmed)issues.push('Generic memory estimate: confirm LoRA/QLoRA support for this exact model and training stack.');
  if(h.id==='customBuy'&&(!s.quoteEvidence.trim()||s.quote<=0))issues.push('Enter a positive complete-system purchase quote and its reference.');
  if(h.id==='customRent'&&(!s.rentQuoteEvidence.trim()||s.rentRate<=0))issues.push('Enter a positive whole-cluster rental rate and its reference.');
  if(requiredGB>availableGB)issues.push('Estimated peak memory exceeds the 95% GPU memory budget.');
  if(h.gpus>1&&!s[kind+'Sharding'])issues.push('Planning assumes model and training-state sharding across these GPUs. Validate the exact recipe, interconnect and per-device memory before renting or buying.');
  if(h.allowance)notes.push('Cluster rental rate is a planning allowance: equivalent 8-GPU node rates plus 20% networking allowance. Obtain a cluster quote including reservation minimums, fees and availability.');
  if(s[kind+'Low']<=0||s[kind+'High']<=0)issues.push('Enter positive training throughput for both ends of the range.');
  if(s[kind+'Low']>s[kind+'High'])issues.push('The lower throughput must not exceed the upper throughput.');
  if(issues.length)return {kind,h,requiredGB,availableGB,minimumGPUs,issues,notes,ready:false};
  const hours=[s[kind+'High'],s[kind+'Low']].map(tps=>tokens/tps/3600*(1+s.overhead/100)+s.setupHours);
  const capital=s.quote+s.setup;
  const allocation=capital/(s.allocationMonths*s.runsPerMonth);
  const operating=hours.map(t=>kind==='rent'?t*s.rentRate+s.rentExtras:t*s.watts/1000*(1+s.cooling/100)*s.electricity+s.support/s.runsPerMonth);
  const perRun=operating.map(v=>v+(kind==='buy'?allocation:0));
  const campaign=operating.map(v=>v*s.runs+(kind==='buy'?capital:0));
  return {kind,h,requiredGB,availableGB,minimumGPUs,issues,notes,ready:true,hours,cadenceFits:hours[1]*s.runsPerMonth<=730,gpuHours:hours.map(t=>t*h.gpus),operating,perRun,campaign,capital:kind==='buy'?capital:0};
 }
 const buy=path('buy'),rent=path('rent');
 let payback=null;
 if(buy.ready&&rent.ready){
  // Conservative crossing: slow purchase operating cost vs fast rental cost.
  const saving=rent.operating[0]-buy.operating[1];
  if(saving>0)payback=Math.ceil(buy.capital/saving);
 }
 return {s,model,tokens,baseGB,adapterGB,recipeGB,activationGB,estimatedGB,buy,rent,payback,paybackWithinWindow:payback!==null&&buy.cadenceFits&&payback<=s.runsPerMonth*s.allocationMonths};
}


function resetTrainingSystem(s,kind,id){
 const h=trainingSystems.find(h=>h.id===id);
 s[kind]=id;
 for(const suffix of ['Low','High','Evidence','Peak','Sharding'])s[kind+suffix]=trainingDefaults[kind+suffix];
 if(kind==='buy'){s.quote=h.price;s.watts=h.watts;s.setup=h.price*.08;s.quoteEvidence='';}
 else {s.rentRate=h.hourly;s.rentQuoteEvidence='';}
}

// Automatic selection is restricted to independently reviewed configurations.
// An empty evidence registry must never fall back to a memory-fit candidate.
export function planTraining(raw={}){
 const s=normalizeTraining(raw),r=calculateTraining(s);
 for(const kind of ['buy','rent']){
  const automatic=kind==='buy'?s.autoBuy:s.autoRent;
  if(!automatic)continue;
  const candidates=trainingSystems.filter(h=>h.kind===kind&&verifiedConfiguration('training',s,kind,h.id)&&h.gpus*h.vram*.95>=r.estimatedGB);
  candidates.sort((a,b)=>(kind==='buy'?a.price-b.price:a.hourly-b.hourly)||a.gpus-b.gpus||a.id.localeCompare(b.id));
  const next=candidates[0];
  if(next&&next.id!==s[kind])resetTrainingSystem(s,kind,next.id);
 }
 return s;
}

export function updateTraining(raw,key,value){
 const s=normalizeTraining({...raw,[key]:value});
 const side=key==='buy'?'buy':key==='rent'?'rent':null;
 if(side){resetTrainingSystem(s,side,s[side]);s[side==='buy'?'autoBuy':'autoRent']=0;}
 const upstream=['model','method','sequence','microbatch','tokens','adapterPercent'];
 if(upstream.includes(key)){
  for(const kind of ['buy','rent'])for(const suffix of ['Low','High','Evidence','Peak','Sharding'])s[kind+suffix]=trainingDefaults[kind+suffix];
 }
 if(['model','method'].includes(key))s.recipeConfirmed=0;
 // Measurements and hardware-specific quotes refer to the currently selected
 // system. Pin that system so another suggestion cannot inherit its evidence.
 const buyFields=['buyLow','buyHigh','buyPeak','buyEvidence','buySharding','quote','quoteEvidence','setup','watts','customBuyGPUs','customBuyVRAM'];
 const rentFields=['rentLow','rentHigh','rentPeak','rentEvidence','rentSharding','rentRate','rentQuoteEvidence','customRentGPUs','customRentVRAM'];
 if(buyFields.includes(key))s.autoBuy=0;
 if(rentFields.includes(key))s.autoRent=0;
 if(['autoBuy','autoRent'].includes(key)&&s[key]){
  const kind=key==='autoBuy'?'buy':'rent';
  resetTrainingSystem(s,kind,s[kind]);
 }
 return planTraining(s);
}

// Estimates alone never authorize a hardware recommendation. Shared inputs are untrusted.
export function calculateTraining(raw){
 const r=estimateTraining(raw);
 for(const kind of ['buy','rent']){
  if(!verifiedConfiguration('training',r.s,kind,r.s[kind])){
   const p=r[kind];
   r[kind]={kind,h:p.h,requiredGB:p.requiredGB,availableGB:p.availableGB,minimumGPUs:p.minimumGPUs,notes:[],ready:false,verified:false,issues:[verificationMessage]};
  }
 }
 if(!r.buy.ready||!r.rent.ready){r.payback=null;r.paybackWithinWindow=false;}
 return r;
}
