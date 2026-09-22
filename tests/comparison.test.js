import test from 'node:test';
import assert from 'node:assert/strict';
import {comparisonData,renderComparison} from '../src/comparison.js';
import {calculate} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {defaults} from '../src/catalog.js';
test('visible cost breakdown reconciles to engine totals for all viable dedicated paths',()=>{
 for(const raw of [defaults,{...defaults,workload:'swe-factory',users:20,apiExtras:40,overrides:'apiExtras'},{...defaults,model:'kimi3',hardware:'hp-2000',autoHardware:0}]){
 const r=calculate(planning(raw)),cards=comparisonData(r);
 for(const c of cards){if(c.monthly===null){assert.equal(c.total,null);continue;}assert.ok(Math.abs(c.costs.reduce((n,[,v])=>n+v,0)-c.monthly)<1e-7);assert.equal(c.total,r.last[c.key]);assert.equal(c.upfront,r.rows[0][c.key]);}
 }
});
test('coverage follows actual served demand and flags incompatible hardware without fallback',()=>{
 const r=calculate(planning({...defaults,model:'kimi3',hardware:'hp-2000',autoHardware:0}));const [buy]=comparisonData(r);assert.equal(buy.coverage,null);assert.equal(buy.capacity,null);assert.equal(buy.monthly,null);assert.equal(r.first.localOverflow,0);
});
test('decision details remain visible without expanding technical breakdown',()=>{
 const html=renderComparison(calculate(planning(defaults)));
 for(const label of ['Upfront cost','month total','IT electricity','Cooling electricity','Reserved cloud compute','Input tokens','Output tokens','Systems / instances needed','Versus API','Versus renting','Rental price source','API price source'])assert.ok(html.includes(label));
 assert.equal((html.match(/aria-label=/g)||[]).length,3);
});
