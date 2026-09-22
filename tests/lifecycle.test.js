import test from 'node:test';
import assert from 'node:assert/strict';
import {planning} from '../src/planning.js';
import {calculate} from '../src/engine.js';
import {defaults} from '../src/catalog.js';
import {decision,longViewHTML} from '../src/long-view.js';
test('aggressive defaults give a short investment deadline and declining cloud prices',()=>{
 const s=planning(defaults),r=calculate(s);
 assert.equal(s.modelRefresh,3);assert.equal(s.hardwareRefresh,6);assert.equal(s.rentalDecline,50);assert.equal(s.apiDecline,80);assert.equal(s.purchaseDiscount,0);
 assert.equal(r.usefulMonths,3);assert.equal(r.months,12);assert.equal(r.amortizationMonths,3);
 assert.ok(Math.abs(r.rows[13].compute/r.rows[13].hours/(r.rows[1].compute/r.rows[1].hours)-.5)<1e-9);
 assert.ok(Math.abs(r.rows[13].apiUsage/r.rows[13].requests/(r.rows[1].apiUsage/r.rows[1].requests)-.2)<1e-9);
 assert.equal(r.rows[0].buy,r.capital);
});
test('buy recommendation requires payback strictly before both refresh dates',()=>{
 for(const model of ['qwen80','kimi3','minimax27'])for(const users of [1,10,100]){
 const r=calculate(planning({...defaults,model,users}));
 if(decision(r).winner?.key==='buy'){assert.ok(r.buyEligible);assert.ok(r.payback<r.usefulMonths);}
 if(!r.buyEligible)assert.notEqual(decision(r).winner?.key,'buy');
 assert.ok(!longViewHTML(r).includes('120 months'));
 }
});
test('refresh overrides bound the window and amortization, not a distant crossing',()=>{
 const r=calculate(planning({...defaults,modelRefresh:2,hardwareRefresh:9,overrides:'modelRefresh,hardwareRefresh'}));
 assert.equal(r.usefulMonths,2);assert.equal(r.amortizationMonths,2);assert.equal(r.decisionCosts.buy,r.rows[2].buy);
});
