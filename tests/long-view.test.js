import test from 'node:test';
import assert from 'node:assert/strict';
import {longViewHTML,longViewSVG,probeHTML,decision} from '../src/long-view.js';
import {calculate} from '../src/engine.js';
import {planning} from '../src/planning.js';
import {defaults} from '../src/catalog.js';
test('decision ranking and savings use exactly the displayed horizon totals',()=>{
 const r=calculate(planning(defaults)),d=decision(r);
 assert.equal(d.winner.key,'api');assert.equal(d.saving,Math.min(r.decisionCosts.buy,r.decisionCosts.rent)-r.decisionCosts.api);
 assert.ok(longViewHTML(r).includes('No payback against both'));
});
test('unavailable paths are excluded from cheapest ranking and flagged',()=>{
 const r=calculate(planning({...defaults,model:'kimi3',hardware:'hp-2000',autoHardware:0}));
 assert.equal(decision(r).complete,false);assert.notEqual(decision(r).winner.key,'buy');assert.ok(longViewHTML(r).includes('Buy configuration is unavailable'));
 assert.ok(!longViewSVG(r).includes('NaN'));
});
test('timeline inspector includes upfront cost at month zero',()=>{
 const r=calculate(planning(defaults));assert.ok(probeHTML(r,0).includes('$3,780.00'));assert.ok(probeHTML(r,0).includes('$0.00'));
 const svg=longViewSVG(r,350,0);assert.ok(svg.includes('Model refresh'));assert.ok(svg.includes('Cumulative cost of buying'));assert.ok(!svg.includes('NaN'));
});
test('overview exposes normalized costs and planning exclusions',()=>{
 const r=calculate(planning(defaults)),html=longViewHTML(r);
 for(const text of ['Upfront','Monthly operations','Amortized all-in','No API spillover','No replacement purchases','hardware competitiveness'])assert.ok(html.includes(text));
});
