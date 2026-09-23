import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,suggestRental} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {models,hardware,rentals} from '../src/catalog.js';
import {calculateTraining,planTraining,updateTraining,trainingModels,trainingSystems,encodeTraining,decodeTraining} from '../src/training.js';
import {renderComparison} from '../src/comparison.js';
import {decision,longViewHTML,longViewSVG} from '../src/long-view.js';
import {encodeState,decodeState} from '../src/sharing.js';

test('all inference catalog systems are blocked without reviewed configuration evidence',()=>{
 for(const m of models)for(const h of hardware){
  const s=planning({model:m.id,hardware:h.id,localEvidence:'Verified',localRuntime:'Tested',overrides:'localEvidence,localRuntime'});
  const r=calculate(s);
  assert.equal(r.buyReady,false);assert.equal(r.buyEligible,false);assert.equal(r.capital,null);assert.equal(r.payback,null);
  assert.ok(r.rows.every(row=>row.buy===null));assert.notEqual(decision(r).winner?.key,'buy');
 }
 for(const m of models)for(const h of rentals){const r=calculate(planning({model:m.id,rental:h.id}));assert.equal(r.rentReady,false);assert.ok(r.rows.every(row=>row.rent===null));}
});
test('legacy shared inference evidence cannot bypass verification and API pricing remains available',()=>{
 const s=planning({model:'oss120',localEvidence:'verified successful pilot',rentalEvidence:'verified successful pilot',localRph:100000,rentalRph:100000,localMemory:1,rentalMemory:1,overrides:'localEvidence,rentalEvidence,localRph,rentalRph,localMemory,rentalMemory'});
 const r=calculate(decodeState(encodeState(s)));
 assert.equal(r.buyReady,false);assert.equal(r.rentReady,false);assert.equal(r.apiReady,true);
 assert.equal(suggestRental(s),null);assert.ok(renderComparison(r).includes('Available cost estimate'));
 assert.ok(longViewHTML(r).includes('API estimate:'));assert.ok(!longViewSVG(r).includes('NaN'));
});
test('every training model and method rejects memory fit and self-certification as verification',()=>{
 for(const m of trainingModels)for(const method of ['lora','qlora'])for(const h of trainingSystems){
  const s={model:m.id,method,[h.kind]:h.id,recipeConfirmed:1,buySharding:1,rentSharding:1,buyPeak:1,rentPeak:1,buyEvidence:'verified',rentEvidence:'verified',quoteEvidence:'quote',rentQuoteEvidence:'quote',quote:100,rentRate:1};
  const r=calculateTraining(decodeTraining(encodeTraining(s)));
  for(const kind of ['buy','rent']){assert.equal(r[kind].ready,false);assert.equal(r[kind].hours,undefined);assert.equal(r[kind].perRun,undefined);assert.equal(r[kind].campaign,undefined);}
  assert.equal(r.payback,null);assert.equal(r.paybackWithinWindow,false);
 }
});
test('automatic and manual changes never fall back to unverified hardware',()=>{
 let s=planTraining({model:'oss120',method:'lora'});
 assert.equal(calculateTraining(s).buy.ready,false);assert.equal(calculateTraining(s).rent.ready,false);
 for(const [key,value] of [['model','oss20'],['method','qlora'],['sequence',2048],['microbatch',4],['buy','hgx640'],['autoBuy',1]]){
  s=updateTraining(s,key,value);assert.equal(calculateTraining(s).buy.ready,false);
 }
 const p=planning({hardware:'m5-256',rental:'a6000',autoHardware:1,autoRental:1});
 assert.equal(p.hardware,'m5-256');assert.equal(p.rental,'a6000');
});
test('memory estimate never clamps a non-fitting model to available memory',()=>{
 const s=planning({model:'kimi3',hardware:'hp-2000',autoHardware:0});assert.ok(s.localMemory>s.localAvailable);
});

import {matchReviewedConfiguration} from '../src/verification.js';
test('review contract requires exact recipe, complete provenance and current evidence',()=>{
 const s=planTraining({model:'oss120',method:'lora'});
 const record={mode:'training',kind:'buy',hardwareId:s.buy,status:'reviewed',evidenceURL:'https://example.org/test-record',modelRevision:'fixture-sha',runtimeVersions:'fixture versions',completeSystem:'fixture full build',reproduction:'fixture command and logs',result:'passed',reviewedOn:'2026-09-01',expiresOn:'2026-10-01',scope:{...s}};
 const match=(r=record,state=s)=>matchReviewedConfiguration([r],'training',state,'buy',s.buy,'2026-09-23');
 assert.equal(match(),record);
 for(const key of ['method','model','sequence','microbatch','buyPeak','buyLow','tokens'])assert.equal(match(record,{...s,[key]:'changed'}),null);
 for(const key of ['evidenceURL','modelRevision','runtimeVersions','completeSystem','reproduction'])assert.equal(match({...record,[key]:''}),null);
 assert.equal(match({...record,expiresOn:'2026-09-22'}),null);assert.equal(match({...record,result:'failed'}),null);assert.equal(match({...record,scope:{}}),null);
});
