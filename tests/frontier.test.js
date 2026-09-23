// Arithmetic regression tests use unverified estimates; verification.test.js tests the public safety boundary.
import test from 'node:test';
import assert from 'node:assert/strict';
import {paretoFrontier,callCost,frontierData,frontierSVG,frontierHTML} from '../src/frontier.js';
import {referenceModels} from '../src/frontier-data.js';
import {estimateEconomics as calculate,normalize} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {defaults,models} from '../src/catalog.js';
import {encodeState,decodeState} from '../src/sharing.js';
test('Pareto dominance requires a strict improvement and preserves ties',()=>{
 const points=[{id:'a',cost:1,score:5},{id:'b',cost:1,score:6},{id:'c',cost:2,score:6},{id:'d',cost:2,score:7},{id:'tie',cost:1,score:6},{id:'missing',cost:0,score:null}];
 assert.deepEqual(paretoFrontier(points).map(p=>p.id),['b','tie','d']);
});
test('call costs respect token mix, long-context price boundary and endpoint limits',()=>{
 const m=referenceModels.find(m=>m.id==='gpt-6-sol');
 assert.equal(callCost(m,{input:1000,output:200}),.004);
 assert.equal(callCost(m,{input:272000,output:1000}),.554);
 assert.equal(callCost(m,{input:272001,output:1000}),1.103004);
 assert.equal(callCost(m,{input:1000000,output:128001}),null);
 assert.equal(callCost(m,{input:1049999,output:2}),null);
 assert.equal(callCost(m,{input:0,output:0}),null);
});
test('benchmark costs are invariant to workload; call estimates scale with its tokens',()=>{
 const a=calculate(planning({...defaults,model:'ds41'})),b={...a,s:{...a.s,input:a.s.input*2,output:a.s.output*2}};
 assert.deepEqual(frontierData(a,'benchmark').points,frontierData(b,'benchmark').points);
 assert.equal(frontierData(b,'call').current.cost,frontierData(a,'call').current.cost*2);
});
test('all selected models render; missing evidence is not placed on the frontier',()=>{
 for(const m of models){const r=calculate(planning({...defaults,model:m.id}));for(const basis of ['benchmark','call']){r.s.frontierBasis=basis;const d=frontierData(r);assert.ok(!frontierSVG(d,320).includes('NaN'));assert.ok(frontierHTML(r).includes(m.name.replace(/^.*?: /,'')));if(!Number.isFinite(d.current.score))assert.ok(!d.frontier.some(p=>p.selected));}}
});
test('cost basis round trips with configuration links and rejects unknown values',()=>{
 assert.equal(decodeState(encodeState({...defaults,frontierBasis:'call'})).frontierBasis,'call');
 assert.equal(normalize({frontierBasis:'bogus'}).frontierBasis,'benchmark');
});
