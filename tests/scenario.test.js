import test from 'node:test';
import assert from 'node:assert/strict';
import {initialScenario,scenarioStatus,changeScenario} from '../src/scenario.js';
import {defaults,models,workloads,hardware,rentals} from '../src/catalog.js';
import {calculate} from '../src/engine.js';
import {longViewHTML} from '../src/long-view.js';

test('initial and reset scenario lead with an available estimate',()=>{
 const initial=initialScenario();assert.equal(initial.valid,true);assert.equal(initial.result.ready,true);
 const html=longViewHTML(initial.result);
 assert.match(html,/<h1>API has the lowest/);
 assert.ok(!html.includes('<h1>No verified hardware'));
});
test('every enabled task and model transition leaves a usable calculation',()=>{
 for(const [workload] of workloads){
  const task=changeScenario(initialScenario().state,'workload',workload);assert.equal(task.accepted,true);
  for(const model of models){const selected=changeScenario(task.state,'model',model.id);if(selected.accepted)assert.equal(scenarioStatus(selected.state).valid,true);}
 }
});
test('incompatible token edits are rejected without altering the last good state',()=>{
 const state=initialScenario().state;
 for(const [key,value] of [['input',1e9],['output',1e9],['calls',0],['input',-1],['input',Infinity]]){
  const changed=changeScenario(state,key,value);assert.equal(changed.accepted,false);assert.equal(changed.state,state);assert.ok(changed.message);
 }
});
test('model choice cannot invalidate an existing token budget',()=>{
 const wide=changeScenario(initialScenario().state,'model','ds41').state;
 const state=changeScenario(wide,'input',500000).state;
 assert.equal(calculate(state).apiReady,true);
 assert.equal(changeScenario(state,'model','oss120').accepted,false);
});
test('invalid saved input is recovered without mutating the rejected scenario',()=>{
 const raw={...defaults,input:1e9,overrides:'input',usageSource:'saved pilot'};
 const before=JSON.stringify(raw),loaded=initialScenario(raw);
 assert.equal(loaded.recovered,true);assert.equal(loaded.result.apiReady,true);
 assert.equal(loaded.rejected,raw);assert.equal(JSON.stringify(raw),before);
});
test('valid saved overrides persist and empty edits restore automatic values',()=>{
 const saved=initialScenario({...defaults,calls:123,overrides:'calls'});
 assert.equal(saved.recovered,false);assert.equal(saved.state.calls,123);
 const cleared=changeScenario(saved.state,'calls',null);
 assert.equal(cleared.accepted,true);assert.equal(cleared.state.calls,initialScenario().state.calls);
});

test('every enabled system selection maintains all three estimates',()=>{
 for(const model of models){
  const selected=changeScenario(initialScenario().state,'model',model.id);
  if(!selected.accepted)continue;
  for(const [key,options] of [['hardware',hardware],['rental',rentals]])for(const option of options){
   const next=changeScenario(selected.state,key,option.id);
   if(next.accepted)assert.equal(calculate(next.state).ready,true);
   else assert.equal(next.state,selected.state);
  }
 }
 assert.equal(changeScenario(initialScenario().state,'model','qwen38large').accepted,false);
 assert.equal(changeScenario(initialScenario().state,'localRph',0).accepted,false);
});
test('model changes reset scoped measurements while preserving unrelated overrides',()=>{
 let s=changeScenario(initialScenario().state,'localDecode',42).state;
 s=changeScenario(s,'apiExtras',123).state;
 assert.equal(s.localDecode,42);
 const next=changeScenario(s,'model','qwen30');assert.equal(next.accepted,true);
 assert.ok(!next.state.overrides.split(',').includes('localDecode'));
 assert.equal(next.state.apiExtras,123);assert.equal(calculate(next.state).ready,true);
});

test('small model additions support buy, rent and API and survive shared-input recovery',async()=>{
 const {encodeState,decodeState}=await import('../src/sharing.js');
 for(const model of ['oss20','granite42']){
  const selected=changeScenario(initialScenario().state,'model',model);
  assert.equal(selected.accepted,true);
  const restored=initialScenario(decodeState(encodeState(selected.state)));
  assert.equal(restored.recovered,false);assert.equal(restored.state.model,model);
  assert.equal(restored.result.ready,true);
 }
});
test('a saved Kimi scenario invalidated by the memory audit recovers without rewriting its input',()=>{
 const raw={...defaults,model:'kimi3',autoModel:0,usageSource:'saved workload',apiExtras:17,overrides:'apiExtras'};
 const before=JSON.stringify(raw),restored=initialScenario(raw);
 assert.equal(restored.recovered,true);assert.equal(restored.rejected,raw);
 assert.equal(JSON.stringify(raw),before);assert.equal(restored.result.ready,true);
 const state=initialScenario().state,next=changeScenario(state,'model','kimi3');
 assert.equal(next.accepted,false);assert.equal(next.state,state);assert.ok(next.message);
});
