import test from 'node:test';
import assert from 'node:assert/strict';
import {estimateTraining,calculateTraining,normalizeTraining,encodeTraining,decodeTraining,updateTraining} from '../src/training.js';
import {trainingMethods,methodKeys} from '../src/training-methods.js';
import {matchReviewedConfiguration} from '../src/verification.js';
const large={model:'oss20',recipeConfirmed:1,buy:'customBuy',customBuyGPUs:8,customBuyVRAM:180,quote:100000,quoteEvidence:'fixture',buySharding:1,rent:'customRent',customRentGPUs:8,customRentVRAM:180,rentRate:20,rentQuoteEvidence:'fixture',rentSharding:1,overhead:0,setupHours:0};
test('all nine methods preserve shared settings and keep unverified costs unavailable',()=>{
 assert.equal(trainingMethods.length,9);
 for(const {id:method} of trainingMethods)for(const updateMethod of ['full','partial','lora','qlora']){
  const s=normalizeTraining({...large,method,updateMethod});
  assert.deepEqual(decodeTraining(encodeTraining(s)),s);
  const estimate=estimateTraining(s);assert.ok(Number.isFinite(estimate.estimatedGB));assert.ok(estimate.estimatedGB>0);
  assert.equal(estimate.rent.ready,true,method);assert.ok(estimate.rent.hours[0]>0);
  const publicResult=calculateTraining(s);assert.equal(publicResult.rent.ready,false);assert.equal(publicResult.rent.hours,undefined);assert.equal(publicResult.buy.perRun,undefined);
 }
});
test('full and partial tuning account for frozen weights and trainable optimizer state separately',()=>{
 const full=estimateTraining({...large,method:'full'}),partial=estimateTraining({...large,method:'partial',trainablePercent:25});
 assert.equal(full.recipeGB,21*18);assert.equal(partial.recipeGB,21*2+21*.25*16);
 assert.equal(full.workload.recipeReference,false);assert.equal(full.tokens,partial.tokens);
 assert.equal(full.rent.hours[0],partial.rent.hours[0]);
});
test('continued pretraining counts corpus tokens without using example counts',()=>{
 const r=estimateTraining({...large,method:'cpt',corpusTokens:123456,epochs:3,examples:999,tokens:4});
 assert.equal(r.tokens,370368);assert.equal(estimateTraining({...large,method:'cpt',corpusTokens:2e12,epochs:1}).tokens,2e12);assert.equal(r.workload.recipeReference,false);
});
test('DPO includes both answers and precomputes the reference only once per run',()=>{
 const s={...large,method:'dpo',examples:100,tokens:200,epochs:3};
 const resident=estimateTraining(s),cached=estimateTraining({...s,referenceMode:'precompute'});
 assert.equal(resident.tokens,120000);assert.equal(cached.tokens,120000);
 assert.equal(resident.workload.referenceTokens,120000);assert.equal(cached.workload.referenceTokens,40000);
 assert.equal(resident.workload.referenceGB,42);assert.equal(cached.workload.referenceGB,0);
 assert.ok(cached.estimatedGB<resident.estimatedGB);assert.ok(cached.rent.hours[0]<resident.rent.hours[0]);
});
test('offline teacher generation is sequential and not repeated for each student epoch',()=>{
 const s={...large,method:'distill',examples:10,completionTokens:100,teacherParameters:100};
 const r=estimateTraining(s),more=estimateTraining({...s,epochs:10});
 assert.equal(r.workload.generationTokens,1000);assert.equal(more.workload.generationTokens,1000);
 assert.equal(r.estimatedGB,216);assert.equal(r.rent.generationHours,1000/100/3600);
 assert.equal(r.estimatedGB,Math.max(r.workload.trainingGB,r.workload.teacherGB));
});
test('external distillation charges both hardware paths per run without local teacher memory or time',()=>{
 const base=estimateTraining({...large,method:'distill',teacherMode:'precomputed'});
 const paid=estimateTraining({...large,method:'distill',teacherMode:'external',teacherCost:123});
 assert.equal(paid.workload.teacherGB,0);assert.equal(paid.workload.generationTokens,0);
 for(const kind of ['buy','rent']){
  assert.equal(paid[kind].hours[0],base[kind].hours[0]);
  assert.ok(Math.abs(paid[kind].operating[0]-base[kind].operating[0]-123)<1e-9);
  assert.ok(Math.abs(paid[kind].campaign[0]-base[kind].campaign[0]-369)<1e-8);
 }
 assert.equal(estimateTraining({...large,method:'distill',teacherMode:'external',teacherCost:0}).rent.ready,false);
});
test('RL counts sampled responses, repeated policy updates, scoring and distinct critic memory',()=>{
 const s={...large,method:'grpo',examples:10,tokens:200,completionTokens:100,epochs:2,generations:4,policyUpdates:3,rewardParameters:7,rewardSeconds:2};
 const grpo=estimateTraining(s),ppo=estimateTraining({...s,method:'ppo'});
 assert.equal(grpo.workload.samples,80);assert.equal(grpo.tokens,72000);assert.equal(grpo.workload.generationTokens,8000);
 assert.equal(grpo.workload.rewardTokens,24000);assert.equal(grpo.rent.rewardHours,160/3600);
 assert.equal(ppo.estimatedGB-grpo.estimatedGB,21*18);
 const reduced=estimateTraining({...s,referenceModel:0,rolloutCopy:0});
 assert.equal(reduced.workload.referenceTokens,0);assert.ok(Math.abs(grpo.estimatedGB-reduced.estimatedGB-84)<1e-9);
 const expected=(72000/1000+8000/100+(72000+24000)/4000+160)/3600;
 assert.ok(Math.abs(grpo.rent.hours[0]-expected)<1e-10);
});
test('zero auxiliary throughput blocks only methods that need that stage',()=>{
 assert.equal(estimateTraining({...large,method:'full',rentGeneration:0,rentForward:0}).rent.ready,true);
 assert.equal(estimateTraining({...large,method:'grpo',rentGeneration:0}).rent.ready,false);
 assert.equal(estimateTraining({...large,method:'dpo',rentForward:0}).rent.ready,false);
});
test('changing the recipe clears measurements and invalidates exact reviewed scope',()=>{
 const s=normalizeTraining({...large,method:'grpo',buyEvidence:'pilot',buyPeak:20,buyGeneration:123});
 const changed=updateTraining(s,'generations',8);
 assert.equal(changed.buyEvidence,'');assert.equal(changed.buyPeak,0);assert.equal(changed.buyGeneration,50);
 const record={mode:'training',kind:'buy',hardwareId:s.buy,status:'reviewed',evidenceURL:'https://example.org/fixture',modelRevision:'fixture',runtimeVersions:'fixture',completeSystem:'fixture',reproduction:'fixture',result:'passed',reviewedOn:'2026-09-01',expiresOn:'2026-10-01',scope:{...s}};
 const match=state=>matchReviewedConfiguration([record],'training',state,'buy',s.buy,'2026-09-23');
 assert.equal(match(s),record);
 for(const key of methodKeys)assert.equal(match({...s,[key]:'changed'}),null,key);
});
test('method input normalization contains invalid links and bounded percentages',()=>{
 const s=normalizeTraining({method:'missing',updateMethod:'missing',referenceMode:'missing',teacherMode:'missing',trainablePercent:200,generations:0,corpusTokens:0,completionTokens:-1,teacherParameters:0});
 assert.equal(s.method,'qlora');assert.equal(s.updateMethod,'lora');assert.equal(s.referenceMode,'resident');assert.equal(s.teacherMode,'local');assert.equal(s.trainablePercent,100);assert.equal(s.corpusTokens,1);assert.ok(s.completionTokens>0);assert.ok(s.teacherParameters>0);
});

test('RL external scoring fees are charged per sample, while PPO can use one response',()=>{
 const s={...large,method:'ppo',examples:10,epochs:2,generations:1};
 const base=estimateTraining(s),paid=estimateTraining({...s,rewardCost:.5});
 assert.equal(base.workload.samples,20);assert.equal(paid.workload.externalCost,10);
 assert.ok(Math.abs(paid.rent.operating[0]-base.rent.operating[0]-10)<1e-9);
 assert.equal(normalizeTraining({...s,method:'grpo'}).generations,2);
});
test('distillation cannot train on fewer total tokens than its generated answers',()=>{
 const r=estimateTraining({...large,method:'distill',tokens:10,completionTokens:100});
 assert.equal(r.rent.ready,false);assert.ok(r.rent.issues.some(i=>i.includes('teacher response')));
});
