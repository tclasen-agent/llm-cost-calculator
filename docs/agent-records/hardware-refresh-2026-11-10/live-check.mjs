// Synthetic isolated browser state. Set PLAYWRIGHT_MODULE/CHROMIUM_PATH for installed tools.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base='https://tclasen-agent.github.io/llm-cost-calculator/';
const source='cc2fe4f09ed6f71a47c45ca2d74beb8af5a63e8c';
const out=new URL('./',import.meta.url),checks=[],errors=[];
const check=(pass,label)=>{checks.push({label,pass:!!pass});if(!pass)throw Error(label);};
const hash=b=>createHash('sha256').update(b).digest('hex');
const manifest=JSON.parse(await readFile(new URL('candidate-sha256.json',out)));
for(const path of Object.keys(manifest).filter(p=>p.startsWith('src/'))){
 const r=await fetch(base+path+'?hardware-refresh='+source);
 check(r.ok&&hash(Buffer.from(await r.arrayBuffer()))===hash(await readFile(new URL('../../../'+path,import.meta.url))),path+' deployed bytes match reviewed source');
}
await mkdir(new URL('video/',out),{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:new URL('video/',out).pathname,size:{width:1440,height:1000}}});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const caption=async t=>{await page.evaluate(t=>{let e=document.querySelector('#acceptance-caption');if(!e){e=document.createElement('div');e.id='acceptance-caption';Object.assign(e.style,{position:'fixed',bottom:'10px',left:'20px',right:'20px',padding:'18px',background:'#10213e',color:'white',font:'20px sans-serif',zIndex:99999,border:'2px solid #6cc9f0'});document.body.append(e);}e.textContent=t;},t);await page.waitForTimeout(2200);};
try{
 await page.goto(base+'?hardware-refresh='+source);await page.waitForSelector('#controls select[name=hardware]',{state:'attached'});
 check(await page.locator('#data-freshness time').getAttribute('datetime')==='2026-11-10','HW-003 full registry review date');
 await caption('HW-003: Maintained data and benchmarks reviewed November 10. Assumptions remain estimates.');
 const ids=await page.evaluate(async()=>{const {hardware}=await import('./src/catalog.js?v=31');return hardware.filter(h=>/macbook-|rtx-pro-6000-server/.test(h.id)).map(h=>h.id);});
 check(ids.length===4,'HW-001/002 four new selections');
 for(const id of ids){
  await page.locator('#controls select[name=model]').selectOption('granite42');
  await page.locator('#controls select[name=hardware]').selectOption(id);
  check(await page.locator('#controls select[name=hardware]').inputValue()===id,id+' selector works');
  const valid=await page.evaluate(async()=>{const {initialScenario}=await import('./src/scenario.js?v=31');const s=initialScenario(JSON.parse(localStorage.getItem('inference-ledger-v2')));return s.valid&&s.result.buyReady&&s.result.rentReady&&s.result.apiReady;});
  check(valid,id+' retains buy/rent/API');
  await caption('HW-001/002: '+await page.locator('#controls select[name=hardware] option:checked').textContent()+'. Purchase and performance values are labeled planning estimates.');
 }
 await page.screenshot({path:new URL('inference.png',out).pathname});
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('inference-ledger-v2'));Object.assign(s,{start:'2026-09',localRph:17,localEvidence:'Synthetic saved pilot',quote:12345,quoteSource:'Synthetic saved quote',overrides:'start,localRph,localEvidence,quote,quoteSource'});localStorage.setItem('inference-ledger-v2',JSON.stringify(s));});
 await page.goto(base);await page.waitForSelector('#controls select[name=hardware]',{state:'attached'});
 check(await page.locator('#controls input[name=start]').inputValue()==='2026-09','HW-004 saved start preserved');
 check(await page.locator('#controls input[name=localRph]').inputValue()==='17','HW-004 saved measurement preserved');
 check(await page.locator('#controls input[name=quote]').inputValue()==='12345','HW-004 saved quote preserved');
 await caption('HW-004: Saved dates, measured throughput and purchase quotes remain user-owned.');
 await page.locator('#reset').click();check(await page.locator('#controls input[name=start]').inputValue()==='2026-11','HW-004 reset current defaults');
 await page.locator('[data-mode=training]').click();await page.waitForSelector('#training-controls select[name=method]');
 check(!(await page.locator('#training-workspace').innerText()).includes('NaN'),'training finite rendering');
 await caption('HW-002: Server resources are shared with fine-tuning. Feasibility remains assumption-based unless measured.');
 await page.screenshot({path:new URL('training.png',out).pathname});
 check(errors.length===0,'no browser runtime errors');
 await writeFile(new URL('live-results.json',out),JSON.stringify({checkedAt:new Date().toISOString(),source,url:base,checks,errors},null,2)+'\n');
 console.log(JSON.stringify({passed:checks.length}));
}finally{await context.close();const video=await page.video().path();await browser.close();console.log('Video: '+video);}
