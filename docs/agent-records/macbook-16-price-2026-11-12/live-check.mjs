// Task-owned delivery evidence. Uses isolated synthetic saved inputs.
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {hardware} from '../../../src/catalog.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const source='d1cd25879182215ed63e8815eacb2e1b9eaba0f5';
const base='https://tclasen-agent.github.io/llm-cost-calculator/';
const out=new URL('./',import.meta.url),checks=[],errors=[];
const h=hardware.find(h=>h.id==='macbook-m5-pro-64');
const check=(pass,label)=>{checks.push({label,pass:!!pass});if(!pass)throw Error(label);};
const hash=b=>createHash('sha256').update(b).digest('hex');
for(const path of ['src/data/hardware.js','src/data/purchase-allowances.js','src/data/sources.js','src/data/audit.js','src/data/INVENTORY.md','src/planning.js']){
 const r=await fetch(base+path+'?price-correction='+source);
 check(r.ok&&hash(Buffer.from(await r.arrayBuffer()))===hash(await readFile(new URL('../../../'+path,import.meta.url))),path+' deployed bytes match reviewed source');
}
await mkdir(new URL('video/',out),{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:new URL('video/',out).pathname,size:{width:1440,height:1000}}});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const caption=async text=>{await page.evaluate(text=>{let e=document.querySelector('#acceptance-caption');if(!e){e=document.createElement('div');e.id='acceptance-caption';Object.assign(e.style,{position:'fixed',bottom:'12px',left:'20px',right:'20px',padding:'18px',background:'#10213e',color:'white',font:'20px sans-serif',zIndex:99999,border:'2px solid #6cc9f0'});document.body.append(e);}e.textContent=text;},text);await page.waitForTimeout(2200);};
try{
 await page.goto(base+'?price-correction='+source);await page.waitForSelector('#controls select[name=hardware]',{state:'attached'});
 await page.locator('#controls select[name=model]').selectOption('granite42');
 await page.locator('#controls select[name=hardware]').selectOption(h.id);
 check(await page.locator('#controls select[name=hardware] option:checked').textContent()===h.name,'exact 16-inch selection displayed');
 check(await page.locator('#controls input[name=quote]').inputValue()===String(h.price),'published equipment price fills quote');
 check((await page.locator('#controls input[name=quoteSource]').inputValue()).includes(h.priceSource),'automatic quote references exact configured source');
 check(!(await page.locator('#controls input[name=buildDetails]').inputValue()).includes('Planning allowance'),'published build not described as allowance');
 const valid=await page.evaluate(async()=>{const{initialScenario}=await import('./src/scenario.js?v=31');const s=initialScenario(JSON.parse(localStorage.getItem('inference-ledger-v2')));return s.valid&&s.result.buyReady&&s.result.rentReady&&s.result.apiReady;});
 check(valid,'selected configuration keeps buy/rent/API usable');
 await page.locator('#controls input[name=quote]').evaluate(e=>{for(let p=e.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;});
 await page.locator('#controls input[name=quote]').scrollIntoViewIfNeeded();
 await caption('M5-16-001: Exact 16-inch configuration, published Apple equipment price and configured source. Extras remain separate.');
 await page.screenshot({path:new URL('published-price.png',out).pathname});
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('inference-ledger-v2'));Object.assign(s,{quote:12345,quoteSource:'Synthetic saved quote',localRph:17,localEvidence:'Synthetic saved measurement',overrides:'quote,quoteSource,localRph,localEvidence'});localStorage.setItem('inference-ledger-v2',JSON.stringify(s));});
 await page.goto(base);await page.waitForSelector('#controls select[name=hardware]',{state:'attached'});
 check(await page.locator('#controls input[name=quote]').inputValue()==='12345','saved user quote retained');
 check(await page.locator('#controls input[name=localRph]').inputValue()==='17','saved measurement retained');
 await caption('M5-16-002: User-saved quotes and measurements survive the catalog correction.');
 await page.locator('#reset').click();check(await page.locator('#controls input[name=quote]').inputValue()!=='12345','reset clears synthetic quote');
 await page.locator('[data-mode=training]').click();await page.waitForSelector('#training-controls select[name=method]');
 check(!(await page.locator('#training-workspace').innerText()).includes('NaN'),'training mode renders finite results');
 const inventory=await fetch(base+'src/data/INVENTORY.md?price-correction='+source);check(inventory.ok,'inventory link available');
 check(errors.length===0,'no browser runtime errors');
 await writeFile(new URL('live-results.json',out),JSON.stringify({checkedAt:new Date().toISOString(),source,url:base,checks,errors},null,2)+'\n');
 console.log(JSON.stringify({passed:checks.length}));
}finally{await context.close();const video=await page.video().path();await browser.close();await rename(video,new URL('video/verified-16-inch-price.webm',out));}
