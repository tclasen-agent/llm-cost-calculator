const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import fs from 'node:fs';
const base=process.env.CALCULATOR_URL||'http://127.0.0.1:4212/';
const browser=await chromium.launch({headless:true,args:['--disable-gpu'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];const check=(ok,label,details)=>{results.push({label,pass:!!ok,...(details?{details}:{})});if(!ok)throw Error(label+' '+JSON.stringify(details));};
const ready=async()=>page.evaluate(async()=>{const {initialScenario}=await import('./src/scenario.js?v=31');const raw=JSON.parse(localStorage.getItem('inference-ledger-v2'));const s=initialScenario(raw);return {valid:s.valid,buy:s.result.buyReady,rent:s.result.rentReady,api:s.result.apiReady,recovered:s.recovered};});
try{
 await page.goto(base);await page.waitForSelector('#controls select[name=model]');
 check((await page.locator('#data-freshness time').getAttribute('datetime'))==='2026-10-24','full catalog review date');
 check(Object.values(await ready()).filter(x=>typeof x==='boolean').length>0,'initial calculator loads');
 let r=await ready();check(r.valid&&r.buy&&r.rent&&r.api,'initial buy rent API usable',r);
 const selects=await page.locator('#controls select').evaluateAll(es=>es.map(e=>({name:e.name,options:[...e.options].map(o=>({value:o.value,disabled:o.disabled,title:o.title}))})));
 let enabled=0,disabled=0;
 for(const spec of selects){for(const option of spec.options){
  await page.locator('#reset').click();const actual=await page.locator(`#controls select[name="${spec.name}"] option`).evaluateAll((os,v)=>os.find(o=>o.value===v)?{disabled:os.find(o=>o.value===v).disabled,title:os.find(o=>o.value===v).title}:null,option.value);
  if(actual?.disabled){disabled++;check(!!actual.title,`disabled ${spec.name}:${option.value} explains reason`);continue;}
  if(!actual)continue;
  await page.locator(`#controls select[name="${spec.name}"]`).selectOption(option.value,{force:true});r=await ready();check(r.valid&&r.buy&&r.rent&&r.api,`enabled inference ${spec.name}:${option.value}`,r);enabled++;
 }}
 await page.locator('#reset').click();
 // Real browser saved-input and URL recovery, including quotes/measurements.
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('inference-ledger-v2'));Object.assign(s,{model:'qwen30',autoModel:0,autoHardware:0,autoRental:0,localRph:17,localEvidence:'Existing reviewed pilot',quote:12345,quoteSource:'User-owned quote',overrides:'localRph,localEvidence,quote,quoteSource'});localStorage.setItem('inference-ledger-v2',JSON.stringify(s));});
 await page.reload();await page.waitForSelector('#controls select[name=model]');
 check(await page.locator('#controls select[name=model]').inputValue()==='qwen30','saved stable model ID survives refresh');
 check(await page.locator('#controls input[name=localRph]').inputValue()==='17','saved measured throughput survives refresh');
 check(await page.locator('#controls input[name=quote]').inputValue()==='12345','saved system quote survives refresh');
 const query=await page.evaluate(async()=>{const {encodeState}=await import('./src/sharing.js?v=31');return encodeState(JSON.parse(localStorage.getItem('inference-ledger-v2')));});
 await page.goto(base+'?'+query);await page.waitForSelector('#controls select[name=model]');check(await page.locator('#controls input[name=localRph]').inputValue()==='17','shared URL preserves measured throughput');
 await page.locator('#reset').click();r=await ready();check(r.valid&&r.buy&&r.rent&&r.api,'reset complete buy rent API',r);
 await page.evaluate(()=>localStorage.setItem('inference-ledger-v2',JSON.stringify({model:'removed-model',quote:12345,quoteSource:'Preserve this input'})));
 await page.goto(base);await page.waitForSelector('#controls select[name=model]');check(await page.locator('#input-feedback').isVisible(),'invalid historical input recovery visible');check(await page.evaluate(()=>JSON.parse(localStorage.getItem('inference-ledger-recovery-v1')).quote===12345),'rejected user inputs preserved');
 await page.locator('#reset').click();await page.locator('[data-mode=training]').click();await page.waitForSelector('#training-controls select[name=method]');
 const trainingSelects=await page.locator('#training-controls select').evaluateAll(es=>es.map(e=>({name:e.name,options:[...e.options].filter(o=>!o.disabled).map(o=>o.value)})));
 let training=0;
 for(const spec of trainingSelects)for(const value of spec.options){await page.locator('#training-reset').click();const option=page.locator(`#training-controls select[name="${spec.name}"] option[value="${value}"]`);if(!await option.count())continue;await page.locator(`#training-controls select[name="${spec.name}"]`).selectOption(value,{force:true});check((await page.locator('#training-workspace').innerText()).includes('What will it take to adapt your model?'),`training ${spec.name}:${value} renders`);training++;}
 await page.locator('#training-reset').click();check(!(await page.locator('#training-workspace').innerText()).includes('NaN'),'training reset has finite display');
 await page.locator('[data-mode=inference]').click();await page.screenshot({path:(process.env.BROWSER_SCREENSHOT||'/private/tmp/calculator-browser.png'),fullPage:false});
 check(errors.length===0,'no browser exceptions',errors);
 fs.writeFileSync((process.env.BROWSER_RESULTS||'/private/tmp/calculator-browser-results.json'),JSON.stringify({url:base,checkedAt:new Date().toISOString(),enabledInferenceTransitions:enabled,disabledExplained:disabled,trainingTransitions:training,results,errors},null,2));console.log(JSON.stringify({pass:true,enabled,disabled,training,checks:results.length,errors}));
}catch(e){fs.writeFileSync((process.env.BROWSER_RESULTS||'/private/tmp/calculator-browser-results.json'),JSON.stringify({url:base,results,errors,failure:String(e)},null,2));throw e;}finally{await browser.close();}
