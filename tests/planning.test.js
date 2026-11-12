// Arithmetic regression tests use unverified estimates; verification.test.js tests the public safety boundary.
import test from 'node:test';
import assert from 'node:assert/strict';
import {planning} from '../src/planning.js';
import {estimateEconomics as calculate} from '../src/engine.js';
import {defaults,models,hardware,rentals,workloads} from '../src/catalog.js';
import {encodeState,decodeState} from '../src/sharing.js';
test('every task/model/purchase selection gives a complete planning comparison',()=>{
 for(const [workload] of workloads)for(const m of models)for(const h of hardware){
 const s=planning({...defaults,workload,model:m.id,hardware:h.id,autoHardware:0});
 assert.ok(Object.entries(s).every(([k,v])=>k==='overrides'||(v!==null&&v!=='')),`${workload}/${m.id}/${h.id}: empty field`);
 const r=calculate(s);assert.equal(r.buyReady,s.localRph>0);assert.equal(r.rentReady,s.rentalRph>0);assert.ok(r.apiReady);
 assert.equal(r.first.localOverflow,0);assert.equal(r.first.rentalOverflow,0);
 }
});
test('all actual rental choices produce a complete comparison, including non-fitting choices',()=>{
 for(const r of rentals){const s=planning({...defaults,model:'kimi3',rental:r.id,autoRental:0});assert.equal(calculate(s).rentReady,s.rentalRph>0);if(r.memory*.9<700)assert.equal(s.rentalRph,0);}
});
test('scale changes refresh generated usage, capacity and energy without leaving blanks',()=>{
 const a=planning(defaults),b=planning({...a,users:100,workload:'swe-factory'});
 assert.equal(b.calls,2880);assert.equal(b.concurrency,800);assert.notEqual(a.itKwh,b.itKwh);assert.equal(calculate(b).buyReady,b.localRph>0);assert.equal(calculate(b).rentReady,b.rentalRph>0);
});
test('advanced overrides persist and clearing restores defaults',()=>{
 const a=planning({...defaults,calls:123,overrides:'calls'});assert.equal(planning({...a,users:9}).calls,123);
 assert.equal(planning({...a,calls:null}).calls,75);assert.equal(planning({...a,overrides:''}).calls,75);
});
test('shared configurations preserve automatic settings and overrides',()=>{
 const a=planning({...defaults,users:15,localExtras:70,overrides:'localExtras'});assert.deepEqual(planning(decodeState(encodeState(a))),a);
});
test('empty and zero people input always restores a usable simple scale',()=>{
 for(const users of [null,'',0,-1,NaN]){const s=planning({...defaults,users});assert.ok(s.users>=1);assert.ok(calculate(s).ready);}
});

test('requested laptops and single servers use complete-system power and usable memory assumptions',()=>{
 for(const [id,memory,watts] of [['macbook-m5-pro-64',64,100],['macbook-m4-max-128',128,140],['rtx-pro-6000-server-x4',384,3500],['rtx-pro-6000-server-x8',768,6500]]){
  const s=planning({...defaults,hardware:id,model:'oss20',autoHardware:0,workload:'swe-factory',concurrency:1,overrides:'concurrency'}),r=calculate(s);
  assert.equal(s.localAvailable,memory*.85);assert.equal(s.itKwh,watts/1000*720);
  assert.match(s.energySource,new RegExp(`${watts} W for the selected complete system`));
  assert.ok(r.buyReady&&r.rentReady&&r.apiReady,id);
  assert.match(s.quoteSource,id==='macbook-m5-pro-64'?/Published catalog price/:/Planning allowance/);assert.ok(s.quote>0);
 }
 const a=planning({...defaults,hardware:'rtx-pro-6000-server-x4',model:'oss20',autoHardware:0});
 const b=planning({...defaults,hardware:'rtx-pro-6000-server-x8',model:'oss20',autoHardware:0});
 assert.equal(a.localDecode,b.localDecode,'extra GPUs do not fabricate benchmark scaling');
});
