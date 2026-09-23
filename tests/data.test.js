import test from 'node:test';
import assert from 'node:assert/strict';
import {data,datasets,models,rentals,hardware,purchaseAllowances,trainingSystems,trainingDefaults,referenceModels} from '../src/data/index.js';
import {inventory,leaves,validate} from '../scripts/data-tools.mjs';

test('maintained datasets satisfy the schema, source boundary and inventory contract',async()=>{
 const result=await validate();assert.ok(result.datasets>0);
 const text=inventory();
 for(const [id,d] of Object.entries(datasets)){
  assert.ok(Object.isFrozen(d.values)||typeof d.values!=='object');
  for(const [field] of leaves(d.values))assert.ok(text.includes('`'+(field||'(collection)')+'`'),`${id}.${field} missing`);
 }
});
test('selected endpoint prices and limits derive from the same raw provider record',()=>{
 for(const m of models){const e=data.models[m.id].endpoint;
  assert.equal(m.input,Number(e.pricing.prompt)*1e6);
  assert.equal(m.output,Number(e.pricing.completion)*1e6);
  assert.equal(m.providerTag,e.tag);assert.equal(m.context,e.context_length);
  assert.equal(m.maxOutput,e.max_completion_tokens);assert.equal(m.planningMemoryGB,data.inferenceMemory[m.id]);
 }
});
test('training instances share canonical rental prices and resources',()=>{
 for(const [id,t] of Object.entries(data.trainingSystems))if(t.rentalId){
  const rental=rentals.find(r=>r.id===t.rentalId),training=trainingSystems.find(h=>h.id===id);
  assert.equal(training.hourly,rental.hourly);assert.equal(training.gpus,rental.gpus);assert.equal(training.vram,rental.vram);
  assert.equal(training.source,rental.source);
 }
 const buy=trainingSystems.find(h=>h.id===trainingDefaults.buy),rent=trainingSystems.find(h=>h.id===trainingDefaults.rent);
 assert.equal(trainingDefaults.quote,buy.price);assert.equal(trainingDefaults.rentRate,rent.hourly);
 assert.equal(trainingDefaults.setup,buy.price*data.inferencePolicy.setupFraction);
});
test('cluster memory and purchase allowances derive from base systems',()=>{
 for(const h of hardware)if(h.baseHardwareId){
  const base=hardware.find(b=>b.id===h.baseHardwareId),allowance=data.purchaseAllowances[h.id];
  assert.equal(h.memory,base.memory*h.nodes);
  assert.equal(purchaseAllowances[h.id],(base.price??purchaseAllowances[base.id])*h.nodes+allowance.extras);
 }
});
test('reference limits use the shared pricing policy and evidence stays immutable',()=>{
 for(const m of referenceModels)for(const [key,value] of Object.entries(data.frontier.referencePolicy))assert.equal(m[key],value);
 assert.throws(()=>{data.rentals.h100.perGpu=0;},TypeError);
 assert.throws(()=>{data.reviewedConfigurations.push({status:'reviewed'});},TypeError);
});

import {boundaryViolations} from '../scripts/data-tools.mjs';
test('boundary checker rejects new prices, source URLs and review dates outside data',()=>{
 const allowed={reason:'Stable unit conversions and identities',values:[0,1,100,1000000]};
 assert.deepEqual(boundaryViolations('export const perMillion = x => x * 1e6;','fixture.js',allowed),[]);
 for(const source of ['export const price = 4.29;','export const source = "https://vendor.example/prices";','export const reviewed = "2026-09-23";','export const label = `Checked 2026-09`;'])assert.ok(boundaryViolations(source,'fixture.js',allowed).length);
 assert.ok(boundaryViolations('export const value = 1;','new-module.js',undefined).length);
});

test('the full audit accounts for every maintained dataset and candidate source',()=>{
 assert.deepEqual(Object.keys(data.audit.coverage).sort(),Object.keys(datasets).filter(id=>id!=='audit').sort());
 for(const c of data.audit.candidates)for(const ref of c.sourceRefs??[c.sourceRef])assert.ok(data.sources[ref],`${c.id}: unknown source`);
});
test('4-bit inference budgets cannot be smaller than the raw checkpoint weights',()=>{
 for(const m of models)assert.ok(m.planningMemoryGB>=data.trainingModels[m.id].parameters/2,`${m.id}: budget below raw 4-bit weights`);
});
test('new multi-GPU rentals convert per-GPU charges and memory to whole-instance units',()=>{
 for(const [id,hourly,memory] of [['b200-x2',13.78,360],['b200-x4',27.16,720],['a100-80-x8',22.32,640],['v100-x8',6.32,128]]){
  const r=rentals.find(r=>r.id===id);assert.equal(r.hourly,hourly);assert.equal(r.memory,memory);
 }
});
