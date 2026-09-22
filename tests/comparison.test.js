import test from 'node:test';
import assert from 'node:assert/strict';
import {comparisonData,renderComparison} from '../src/comparison.js';
import {calculate} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {defaults} from '../src/catalog.js';
test('visible cost breakdown reconciles to engine totals for all paths and overflow',()=>{
 for(const raw of [defaults,{...defaults,workload:'swe-factory',users:20,apiExtras:40,overrides:'apiExtras'},{...defaults,model:'kimi3',hardware:'hp-2000',autoHardware:0}]){
 const r=calculate(planning(raw)),cards=comparisonData(r);
 for(const c of cards){assert.ok(Math.abs(c.costs.reduce((n,[,v])=>n+v,0)-c.monthly)<1e-7);assert.equal(c.total,r.last[c.key]);assert.equal(c.upfront,r.rows[0][c.key]);}
 }
});
test('coverage follows actual served demand and preserves non-fitting overflow',()=>{
 const r=calculate(planning({...defaults,model:'kimi3',hardware:'hp-2000',autoHardware:0}));const [buy]=comparisonData(r);assert.equal(buy.coverage,0);assert.equal(buy.capacity,0);assert.equal(r.first.localOverflow,r.first.apiUsage);
});
test('decision details remain visible without expanding technical breakdown',()=>{
 const html=renderComparison(calculate(planning(defaults)));
 for(const label of ['Upfront payment','month total','IT electricity','Cooling electricity','Reserved cloud compute','Input tokens','Output tokens','Work sent to API','Versus API','Versus renting','Rental price source','API price source'])assert.ok(html.includes(label));
 assert.equal((html.match(/aria-label=/g)||[]).length,3);
});
