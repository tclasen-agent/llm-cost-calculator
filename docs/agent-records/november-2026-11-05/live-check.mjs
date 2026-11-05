// Reproduce with PLAYWRIGHT_MODULE and CHROMIUM_PATH pointing to installed tools.
// Synthetic browser state only; source and existing user browser profiles are untouched.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base='https://tclasen-agent.github.io/llm-cost-calculator/';
const out=new URL('./',import.meta.url);
const checks=[];
const check=(pass,label)=>{checks.push({label,pass:!!pass});if(!pass)throw Error(label);};
const digest=b=>createHash('sha256').update(b).digest('hex');
for(const path of ['src/data/inference-defaults.js','src/data/INVENTORY.md']){
 const response=await fetch(base+path+'?november-identity=1');
 check(response.ok,`${path} HTTP success`);
 check(digest(Buffer.from(await response.arrayBuffer()))===digest(await readFile(new URL('../../../'+path,import.meta.url))),`${path} deployed bytes match source`);
}
const browser=await chromium.launch({headless:true,args:['--disable-gpu'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
await mkdir(new URL('video/',out),{recursive:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:new URL('video/',out).pathname,size:{width:1440,height:1000}}});
const page=await context.newPage();
const caption=async text=>{await page.evaluate(t=>{let e=document.querySelector('#milestone-caption');if(!e){e=document.createElement('div');e.id='milestone-caption';Object.assign(e.style,{position:'fixed',bottom:'10px',left:'20px',right:'20px',padding:'18px',background:'#10213e',color:'white',font:'20px sans-serif',zIndex:99999,border:'2px solid #6cc9f0'});document.body.append(e);}e.textContent=t;},text);await page.waitForTimeout(2200);};
try{
 await page.goto(base);await page.waitForSelector('#controls input[name=start]',{state:'attached'});
 await page.locator('#controls input[name=start]').evaluate(e=>{e.closest('details').open=true;});
 check(await page.locator('#controls input[name=start]').inputValue()==='2026-11','NOV-001 fresh November');
 check(await page.locator('#data-freshness time').getAttribute('datetime')==='2026-10-24','NOV-003 conservative overall accuracy');
 await caption('NOV-001: Fresh plans start in November. NOV-003: Catalog accuracy remains October 24.');
 const complete=await page.evaluate(async()=>{const {initialScenario}=await import('./src/scenario.js?v=31');const s=initialScenario(JSON.parse(localStorage.getItem('inference-ledger-v2')));return s.valid&&s.result.buyReady&&s.result.rentReady&&s.result.apiReady;});
 check(complete,'NOV-002 complete buy rent API');
 await caption('NOV-002: Buy, rent and API estimates remain available. These are planning estimates.');
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('inference-ledger-v2'));Object.assign(s,{start:'2026-09',localRph:17,localEvidence:'Synthetic historical pilot',quote:12345,quoteSource:'Synthetic historical quote',overrides:'start,localRph,localEvidence,quote,quoteSource'});localStorage.setItem('inference-ledger-v2',JSON.stringify(s));});
 await page.reload();await page.waitForSelector('#controls input[name=start]',{state:'attached'});
 check(await page.locator('#controls input[name=start]').inputValue()==='2026-09','NOV-002 saved September preserved');
 check(await page.locator('#controls input[name=localRph]').inputValue()==='17','NOV-002 measurement preserved');
 await caption('NOV-002: A saved September scenario and its measured throughput survive the update.');
 await page.locator('#reset').click();check(await page.locator('#controls input[name=start]').inputValue()==='2026-11','NOV-001 reset November');
 await caption('NOV-001: Explicit reset restores the current November default.');
 await page.locator('[data-mode=training]').click();await page.waitForSelector('#training-controls select[name=method]');
 check(!(await page.locator('#training-workspace').innerText()).includes('NaN'),'training smoke finite');
 await caption('Training mode still renders its feasibility and cost estimates.');
 const response=await context.request.get(base+'src/data/INVENTORY.md');
 check(response.ok()&&(await response.text()).includes('2026-11'),'NOV-003 live inventory accessible');
 await page.screenshot({path:new URL('training.png',out).pathname});
 await page.locator('[data-mode=inference]').click();await caption('November readiness verified on the deployed build. No full market-data refresh is claimed.');
 await writeFile(new URL('live-results.json',out),JSON.stringify({checkedAt:new Date().toISOString(),source:'b680be4941df88caeaf618878e467bb006891671',url:base,checks},null,2)+'\n');
 console.log(JSON.stringify({passed:checks.length}));
}finally{await context.close();const video=await page.video().path();await browser.close();console.log('Video: '+video);}
