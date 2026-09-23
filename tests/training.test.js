// Arithmetic regression tests use unverified estimates; verification.test.js tests the public safety boundary.
import test from 'node:test';
import assert from 'node:assert/strict';
import {estimateTraining as calculateTraining,normalizeTraining,trainingDefaults,encodeTraining,decodeTraining} from '../src/training.js';
test('default QLoRA example counts all processed tokens and both hardware paths fit',()=>{
 const r=calculateTraining({});assert.equal(r.tokens,80e6);assert.equal(r.estimatedGB,73);assert.equal(r.buy.ready,true);assert.equal(r.rent.ready,true);
 assert.equal(r.rent.hours[0],80e6/1000/3600*1.2+1);assert.equal(r.rent.hours[1],80e6/250/3600*1.2+1);
 assert.equal(r.rent.campaign[0],r.rent.operating[0]*3);assert.equal(r.buy.campaign[0],21600+r.buy.operating[0]*3);
});
test('BF16 LoRA cannot silently fit on a single 80 or 96 GB GPU',()=>{
 const r=calculateTraining({method:'lora'});assert.equal(r.buy.ready,false);assert.equal(r.rent.ready,false);assert.equal(r.payback,null);
});
test('multi GPU requires explicit sharding validation and does not imply faster training',()=>{
 const raw={method:'lora',rent:'h100x4',rentRate:16.36};assert.equal(calculateTraining(raw).rent.ready,false);
 const r=calculateTraining({...raw,rentSharding:1});assert.equal(r.rent.ready,true);assert.equal(r.rent.hours[0],calculateTraining({}).rent.hours[0]);assert.equal(r.rent.gpuHours[0],r.rent.hours[0]*4);
});
test('long context and microbatch increase modeled memory; peak measurement can replace it',()=>{
 const r=calculateTraining({sequence:32768,microbatch:2});assert.equal(r.estimatedGB,193);assert.equal(r.rent.ready,false);
 const measured=calculateTraining({sequence:32768,microbatch:2,rentPeak:70});assert.equal(measured.rent.ready,true);assert.equal(measured.rent.requiredGB,70);
});
test('zero and inverted speed ranges remain unavailable instead of free',()=>{
 for(const overrides of [{rentLow:0},{rentHigh:0},{rentLow:2000,rentHigh:1000}]){const r=calculateTraining(overrides);assert.equal(r.rent.ready,false);assert.equal(r.rent.campaign,undefined);assert.equal(r.payback,null);}
});
test('cost allocation includes support, energy, cooling and full instance billing',()=>{
 const r=calculateTraining({examples:3600,tokens:1000,epochs:1,rentLow:1000,rentHigh:1000,buyLow:1000,buyHigh:1000,overhead:0,setupHours:0,watts:1000,electricity:.2,cooling:25,support:20,runsPerMonth:2,quote:12000,setup:0,allocationMonths:12,rentRate:4,rentExtras:3});
 assert.equal(r.buy.operating[0],10.25);assert.equal(r.buy.perRun[0],510.25);assert.equal(r.rent.operating[0],7);assert.equal(r.payback,null);
});
test('payback uses adverse purchase vs favorable rental operating costs',()=>{
 const r=calculateTraining({quote:100,setup:0,support:0,watts:0,rentRate:10,rentExtras:0});assert.equal(r.payback,Math.ceil(100/r.rent.operating[0]));assert.equal(r.paybackWithinWindow,true);
});
test('training share round trip preserves separate inputs; inference URLs are ignored',()=>{
 const s=normalizeTraining({...trainingDefaults,model:'oss20',buyEvidence:'pilot & notes <test>',rentPeak:30});assert.deepEqual(decodeTraining(encodeTraining(s)),s);assert.equal(decodeTraining('?scenario=2'),null);assert.equal(decodeTraining('?mode=training&training=999'),null);
});
test('normalization contains malformed shared inputs',()=>{
 const s=normalizeTraining({model:'bad',buy:'bad',examples:-1,sequence:Infinity,runs:0,quote:NaN,rentLow:'invalid',allocationMonths:99999});assert.equal(s.model,'oss120');assert.equal(s.examples,1);assert.equal(s.runs,1);assert.equal(s.sequence,4096);assert.equal(s.quote,trainingDefaults.quote);assert.equal(s.allocationMonths,120);
});

import {models} from '../src/catalog.js';
import {trainingModels} from '../src/training.js';
test('every inference picker model is covered by sourced training metadata for both methods',()=>{
 for(const model of models){
  const profile=trainingModels.find(m=>m.id===model.id);assert.ok(profile,model.id);assert.equal(profile.source,model.source);assert.ok(profile.parameters>0);
  for(const method of ['lora','qlora']){const r=calculateTraining({model:model.id,method});assert.equal(r.s.model,model.id);assert.ok(Number.isFinite(r.estimatedGB));assert.ok(r.estimatedGB>0);assert.ok(r.rent.minimumGPUs>=1);}
 }
});
test('generic estimates use total parameters and require recipe confirmation',()=>{
 const q=calculateTraining({model:'qwen30'});assert.equal(q.baseGB,31*.625);assert.equal(q.adapterGB,31*.001*16);assert.equal(q.buy.ready,false);
 assert.equal(calculateTraining({model:'qwen30',recipeConfirmed:1}).buy.ready,true);
 const l=calculateTraining({model:'qwen30',method:'lora',recipeConfirmed:1});assert.equal(l.baseGB,62);assert.ok(l.estimatedGB>q.estimatedGB);
});
test('large model is not hidden when catalog hardware is too small; custom clusters can be sized',()=>{
 const small=calculateTraining({model:'qwen38large',method:'lora',recipeConfirmed:1});assert.equal(small.buy.ready,false);assert.ok(small.buy.minimumGPUs>8);
 const r=calculateTraining({model:'qwen38large',method:'lora',recipeConfirmed:1,buy:'customBuy',customBuyGPUs:64,customBuyVRAM:180,buySharding:1,quote:2000000,quoteEvidence:'System quote',rent:'customRent',customRentGPUs:64,customRentVRAM:180,rentSharding:1,rentRate:500,rentQuoteEvidence:'Cluster quote'});
 assert.equal(r.buy.ready,true);assert.equal(r.rent.ready,true);assert.equal(r.buy.h.gpus,64);assert.equal(r.rent.gpuHours[0],r.rent.hours[0]*64);
});
test('custom clusters without cost evidence never produce free estimates',()=>{
 const r=calculateTraining({buy:'customBuy',rent:'customRent',buySharding:1,rentSharding:1,quote:0,rentRate:0});assert.equal(r.buy.ready,false);assert.equal(r.rent.ready,false);
});
test('each model has a distinct round-trippable training configuration',()=>{
 for(const model of trainingModels)for(const method of ['lora','qlora']){const s=normalizeTraining({model:model.id,method,recipeConfirmed:1});assert.deepEqual(decodeTraining(encodeTraining(s)),s);}
});
test('impossible monthly cadence cannot qualify purchase payback within the allocation window',()=>{
 const r=calculateTraining({runsPerMonth:10000,quote:1,setup:0,support:0,watts:0});assert.equal(r.buy.cadenceFits,false);assert.equal(r.paybackWithinWindow,false);
});
