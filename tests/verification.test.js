import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,suggestRental} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {models,hardware,rentals} from '../src/catalog.js';
import {calculateTraining,planTraining,updateTraining,trainingModels,trainingSystems,encodeTraining,decodeTraining} from '../src/training.js';
import {renderComparison} from '../src/comparison.js';
import {decision,longViewHTML,longViewSVG} from '../src/long-view.js';
import {encodeState,decodeState} from '../src/sharing.js';

test('inference estimates are usable without independently reviewed configurations',()=>{
 const r=calculate(planning());
 assert.equal(r.ready,true);assert.deepEqual(r.verification,{buy:false,rent:false});
 assert.ok(r.rows.every(row=>Number.isFinite(row.buy)&&Number.isFinite(row.rent)));
 assert.ok(renderComparison(r).includes('Planning estimate'));
 assert.ok(longViewHTML(r).includes('has the lowest'));assert.ok(!longViewSVG(r).includes('NaN'));
});
test('shared approximate inference measurements are allowed without certifying compatibility',()=>{
 const s=planning({model:'oss120',autoHardware:0,autoRental:0,localEvidence:'pilot estimate',rentalEvidence:'pilot estimate',localRph:100000,rentalRph:100000,localMemory:1,rentalMemory:1,overrides:'localEvidence,rentalEvidence,localRph,rentalRph,localMemory,rentalMemory'});
 const r=calculate(decodeState(encodeState(s)));
 assert.equal(r.ready,true);assert.deepEqual(r.verification,{buy:false,rent:false});
 assert.ok(suggestRental(s));
 assert.equal(calculate({...s,localMemory:s.localAvailable+1}).buyReady,false);
 assert.equal(calculate({...s,rentalRph:0}).rentReady,false);
});
test('training defaults prefer high-confidence estimates without claiming verification',()=>{
 const s=planTraining(),r=calculateTraining(s);
 for(const kind of ['buy','rent']){assert.equal(r[kind].ready,true);assert.equal(r[kind].confidence,'high');assert.equal(r[kind].verified,false);assert.ok(r[kind].perRun.every(Number.isFinite));}
 assert.deepEqual(planTraining(decodeTraining(encodeTraining(s))),s);
});
test('generic and sharded configurations show estimates but cannot self-certify',()=>{
 for(const raw of [{model:'qwen30'},{method:'lora'},{buyPeak:1,buyEvidence:'verified',recipeConfirmed:1}]){
  const r=calculateTraining(planTraining(raw));
  assert.equal(r.buy.ready,true);assert.equal(r.buy.confidence,'estimated');assert.equal(r.buy.verified,false);
 }
});
test('confidence respects headroom and recipe scope; invalid paths retain specific reasons',()=>{
 assert.equal(calculateTraining({rent:'h100'}).rent.confidence,'estimated');
 for(const raw of [{sequence:8192},{microbatch:2},{adapterPercent:1}])assert.notEqual(calculateTraining(raw).buy.confidence,'high');
 const r=calculateTraining({buyPeak:10000});assert.equal(r.buy.ready,false);assert.ok(r.buy.issues.some(i=>i.includes('memory')));assert.equal(r.payback,null);
});
test('training transitions reset scoped measurements and retain usable estimates when fitting',()=>{
 let s=planTraining();
 for(const [key,value] of [['model','oss20'],['method','qlora'],['sequence',2048],['microbatch',4],['buy','hgx640'],['autoBuy',1]]){
  s=updateTraining(s,key,value);const r=calculateTraining(s);assert.equal(r.buy.ready,true);assert.equal(r.rent.ready,true);assert.equal(r.buy.verified,false);
 }
 s=updateTraining(s,'buyEvidence','pilot');s=updateTraining(s,'model','oss120');assert.equal(s.buyEvidence,'');
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
