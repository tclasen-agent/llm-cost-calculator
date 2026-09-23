import {verifiedConfiguration} from './verification.js?v=24';
import {defaults,hardware,rentals,models} from './catalog.js?v=24';
import {gs1Variable} from './energy.js?v=24';
import {normalize,schedule} from './engine.js?v=24';
// Deliberately editable planning assumptions, not measurements or vendor benchmarks.
export const profiles={chat:[30,1500,500,.1],research:[40,12000,2500,.2],bizdev:[35,6000,1500,.15],swe:[75,12000,2500,.4],'swe-factory':[2880,24000,4000,8],support:[100,3000,700,.3],writing:[35,4000,2000,.15],security:[60,16000,3000,.4]};
const modelGB={'nemotron-lightning':24,kimi3:700,'nemotron-ultra':360,'nemotron-super':90,minimax:160,qwen80:60,kimi25:420,'nemotron-nano':24,deepseek:440,oss120:85,qwen30:24};
const prices={'strix-framework-64':2500,'strix-framework-128':3500,'strix-hp-128':4500,'m5-256':8000,'m5-512':12000,'hp-2000':3000,'hp-4000':4000,'puget-5080':4500,'puget-5090':6500,'puget-pro-4000-blackwell':6000,'puget-pro-5000-blackwell':9000,'puget-pro-6000-blackwell-ws':15000,'supermicro-h100':300000,'spark-x2':10398,'spark-x4':20796,'m5-512-x2':24500,'m5-512-x4':49500};
export function planning(raw={}){
 let s=normalize(raw); const overrides=new Set(s.overrides.split(',').filter(Boolean));
 const [calls,input,output,activity]=profiles[s.workload];
 const set=(k,v)=>{if(!overrides.has(k)||s[k]===null||s[k]==='')s[k]=v;};
 s.users=Math.max(1,s.users||1);
 set('calls',calls);set('input',input);set('output',output);set('concurrency',Math.max(1,Math.ceil(s.users*activity)));
 set('usageSource','Planning assumption: task template; replace with pilot usage.');
 const required=(models.find(m=>m.id===s.model).planningMemoryGB??modelGB[s.model])+Math.max(0,s.concurrency-1)*.5;
 if(s.autoHardware){const candidates=hardware.filter(h=>verifiedConfiguration('inference',s,'buy',h.id)&&(h.gpuCeiling??h.memory)*.85>=required);s.hardware=(candidates.sort((a,b)=>(a.price??prices[a.id])-(b.price??prices[b.id]))[0]??{id:s.hardware}).id;}
 const h=hardware.find(h=>h.id===s.hardware);
 if(s.autoRental){s.rental=(rentals.filter(r=>verifiedConfiguration('inference',s,'rent',r.id)&&r.memory*.9>=required).sort((a,b)=>a.hourly-b.hourly)[0]??{id:s.rental}).id;}
 const r=rentals.find(r=>r.id===s.rental),cal=schedule(s.start,s.workload==='swe-factory');
 const available=(h.gpuCeiling??h.memory)*.85,rv=r.memory*.9;
 const localFits=required<=available,rentalFits=required<=rv;
 const nodes=h.id.endsWith('x4')?4:h.id.endsWith('x2')?2:1;
 // Aggregate throughput proxy includes prompt processing; no measured parity is implied.
 const localTps=(h.kind==='VRAM'?100:30)*Math.sqrt(nodes)*Math.min(4,Math.sqrt(s.concurrency));
 const rentTps=100*Math.sqrt(r.gpus)*Math.min(4,Math.sqrt(s.concurrency));
 set('localAvailable',available);set('rentalAvailable',rv);
 set('localMemory',required);set('rentalMemory',required);
 set('localPrefill',localTps*10);set('localDecode',localTps);set('rentalPrefill',rentTps*10);set('rentalDecode',rentTps);
 const rate=(pre,dec)=>{if((s.input>0&&pre<=0)||(s.output>0&&dec<=0))return 0;const seconds=(s.input>0?s.input/pre:0)+(s.output>0?s.output/dec:0);return seconds>0?3600/seconds:3600;};
 set('localRph',localFits?rate(s.localPrefill,s.localDecode):0);
 set('rentalRph',rentalFits?rate(s.rentalPrefill,s.rentalDecode):0);
 for(const prefix of ['local','rental']){set(prefix+'Runtime','Planning assumption: 4-bit runtime; validate quality and deployment support');set(prefix+'Evidence','Planning proxy, not a benchmark. A non-fitting model makes that hardware path unavailable; no API fallback.');}
 set('quote',h.price??prices[h.id]);set('quoteSource',h.price?`Published catalog price: ${h.priceSource}`:'Planning allowance for the whole system; replace with a vendor quote.');set('buildDetails',h.package+' Planning allowance includes a complete host and cluster networking; obtain an exact configuration.');
 set('localSetup',Math.round(s.quote*.08));set('localExtras',20);set('rentalSetup',0);set('rentalExtras',50);set('apiExtras',0);
 set('costSource','Planning allowances: 8% purchase extras, $20/month local support, $50/month rental extras, $0 API extras. Not quotes.');
 const watts=h.id==='supermicro-h100'?10000:h.kind==='VRAM'?600:200*nodes;
 set('itKwh',watts/1000*cal.hours+watts*.1/1000*(cal.calendarDays*24-cal.hours));set('coolingKwh',s.itKwh*.25);
 set('energySource','Planning assumption: 200 W per unified-memory node, 600 W workstation or 10 kW HGX; 10% idle power; cooling adds 25%. Replace with measurements.');
 set('tariff','bill');set('baselineKwh',1000);set('peakKw',5);set('tariffConfirmed',0);set('localTax',1);
 // Published GS-1 marginal charges at a representative baseline; eligibility remains an assumption.
 set('billRate',Number(((gs1Variable(1100,cal.month)-gs1Variable(1000,cal.month))/100).toFixed(5)));set('billSource','Planning assumption: published Dominion GS-1 marginal rate at 1,000 kWh baseline in Loudoun; account eligibility assumed. Select verified GS-1 in advanced settings or replace with your bill.');
 set('purchaseDiscount',0);set('rentalDecline',50);set('apiDecline',80);set('priceEvidence','Aggressive scenario: rental compute falls 50% annually; API token rates fall 80% annually, compounded monthly. Current purchase cost unchanged. These are assumptions, not provider promises.');
 set('modelRefresh',3);set('hardwareRefresh',6);set('lifecycleSource','Aggressive adoption policy: reassess better/larger models every 3 months and hardware price/performance every 6 months. Treat the earlier event as the investment deadline. Hardware does not physically expire; these are competitiveness assumptions.');
 return normalize(s);
}
export function assumptionNotes(s){return [
 'Task activity, token counts and concurrency are editable planning templates, not measured usage.',
 'Memory fit and processing speeds are rough 4-bit planning proxies. Validate runtime support, quality and performance before purchase.',
 'Unknown equipment prices use whole-system budget allowances. Published catalog prices and actual rental/API rates retain their source links.',
 'Power, cooling, fees and review intervals are planning assumptions. Advanced fields let your team replace them.',
 ...(s.localRph===0?['This purchase configuration is estimated not to fit the model; choose compatible hardware to enable the purchase path.']:[]),
 ...(s.rentalRph===0?['This rental configuration is estimated not to fit the model; choose a compatible instance to enable the rental path.']:[])
 ];}
