// Historical source-evidence check; current editable facts belong to src/data.
// Run from any directory. --live rechecks the configured URL without changing files.
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {data} from '../../../src/data/index.js';

const hardwareId='macbook-m5-pro-64',h=data.hardware[hardwareId];
const url=data.sources[h.priceSourceRef];
const receipt=data.audit.sourceReviews[`datasets.sources.values.${h.priceSourceRef}`];
assert.ok(receipt,'Missing canonical source receipt');
let bytes;
if(process.argv.includes('--live')){
 const response=await fetch(url);assert.ok(response.ok,`Source HTTP ${response.status}`);
 bytes=Buffer.from(await response.arrayBuffer());
}else{
 bytes=gunzipSync(await readFile(new URL('./apple-config.html.gz',import.meta.url)));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),receipt.sha256);
}
const products=[...bytes.toString().matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match=>JSON.parse(match[1]));
const product=products.find(product=>product['@type']==='Product'&&product.url===url);
assert.ok(product,'Exact configured Product URL absent');
assert.match(product.name,/16-inch.*M5\s+Pro.*18-core CPU.*20-core GPU.*Space Black.*Standard display.*64GB memory.*1TB storage/);
const offer=product.offers.find(offer=>offer.sku===receipt.sku);
assert.ok(offer,'Exact configured SKU absent');
assert.equal(offer.priceCurrency,'USD');assert.equal(offer.price,h.price);
console.log(JSON.stringify({mode:process.argv.includes('--live')?'live primary source':'immutable historical primary source',product:product.name,url,price:offer.price,currency:offer.priceCurrency,sku:offer.sku},null,2));
