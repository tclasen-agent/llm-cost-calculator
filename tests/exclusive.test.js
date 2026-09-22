import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {defaults,models,workloads} from '../src/catalog.js';
import {taskModels} from '../src/task-models.js';
test('hardware fleets cover all demand each month with no API costs',()=>{
 const s=planning({...defaults,workload:'swe-factory',users:20});const r=calculate(s);
 assert.ok(r.localUnits>1&&r.rentalUnits>1);
 for(const row of r.rows.slice(1)){assert.ok(row.localCapacity>=row.requests);assert.ok(row.rentalCapacity>=row.requests);assert.equal(row.localOverflow,0);assert.equal(row.rentalOverflow,0);}
 const changed=calculate({...s,apiExtras:100000,input:s.input*2});
 assert.equal(changed.first.buyMonthly,r.first.buyMonthly);assert.equal(changed.first.rentMonthly,r.first.rentMonthly);
 assert.equal(r.capital,(s.quote+s.localSetup)*r.localUnits);
});
test('amortized values share one period and reconcile to cumulative cash flows',()=>{
 for(const workload of ['swe','swe-factory']){
 const r=calculate(planning({...defaults,workload,users:10})),t=r.amortizationMonths,lo=Math.floor(t),hi=Math.ceil(t);
 for(const k of ['buy','rent','api'])assert.ok(Math.abs(r.amortized[k]*t-(r.rows[lo][k]+(r.rows[hi][k]-r.rows[lo][k])*(t-lo)))<1e-6);
 assert.equal(t,r.usefulMonths);assert.equal(t,3);
 }
});
test('new frontier models have sourced endpoints, memory assumptions and task coverage',()=>{
 for(const [task] of workloads){assert.ok(taskModels[task].length>=3);for(const id of taskModels[task])assert.ok(models.some(m=>m.id===id));}
 for(const m of models.filter(m=>m.evidence)){assert.ok(m.apiSource&&m.source&&m.providerTag&&m.planningMemoryGB>0);const r=calculate(planning({...defaults,model:m.id}));assert.ok(r.apiReady&&r.buyReady);assert.ok(Number.isFinite(r.amortized.buy));}
});
test('phase speeds size capacity from both input and output work',()=>{
 const s=planning({...defaults,input:12000,output:2000,localPrefill:600,localDecode:100,overrides:'input,output,localPrefill,localDecode'}),r=calculate(s);
 assert.equal(s.localRph,90);assert.equal(r.phases.buy.prefillShare,.5);assert.equal(r.phases.buy.ratio,6);
 const slower=planning({...s,localPrefill:300});assert.equal(slower.localRph,60);
 const noDecode=calculate(planning({...s,localDecode:0}));assert.equal(noDecode.buyReady,false);assert.equal(noDecode.first.localOverflow,0);
});
test('phase targets follow calendar operating schedule and scale',()=>{
 const r=calculate(planning({...defaults,workload:'swe-factory',users:10}));
 assert.equal(r.phases.buy.requiredPrefill,r.s.users*r.s.calls*r.s.input/86400);
 assert.equal(r.phases.buy.requiredDecode,r.s.users*r.s.calls*r.s.output/86400);
 assert.ok(Math.abs(r.phases.buy.prefillShare+r.phases.buy.decodeShare-1)<1e-10);
});
