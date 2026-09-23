import {methodKeys} from './training-methods.js?v=25';
// Only repository-reviewed records belong here. Sources must demonstrate a
// successful run on the complete configuration, not merely document GPU specs.
// No current catalog entry meets this standard. Do not seed this with estimates.
import {data} from './data/index.js';
const reviewedConfigurations = data.reviewedConfigurations;
export const verificationMessage = 'No verified configuration available. Hardware specifications and estimated memory fit do not establish that this model and workload run successfully. A reviewed end-to-end validation record is required.';

// Exact matching is intentional: no extrapolation to other runtimes, contexts,
// batch sizes, quantizations, topologies or custom builds. Costs are not proof.
const scopeKeys = {
 inference: ['model','workload','users','calls','input','output','concurrency'],
 training: [...methodKeys,'model','method','task','examples','tokens','epochs','sequence','microbatch','adapterPercent','overhead','setupHours']
};
function keysFor(mode,kind){
 if(!scopeKeys[mode]||!['buy','rent'].includes(kind))return [];
 if(mode==='training')return [...scopeKeys[mode],...['Low','High','Peak','Sharding'].map(k=>kind+k),...(kind==='buy'?['customBuyGPUs','customBuyVRAM']:['customRentGPUs','customRentVRAM'])];
 const prefix=kind==='buy'?'local':'rental';
 return [...scopeKeys[mode],...['Runtime','Rph','Memory','Available','Prefill','Decode'].map(k=>prefix+k)];
}
// Pure matcher exported for contract tests; application callers can only access
// the private reviewed list via verifiedConfiguration, never submit records.
export function matchReviewedConfiguration(records,mode,state,kind,hardwareId,today=new Date().toISOString().slice(0,10)){
 const keys=keysFor(mode,kind);
 if(!keys.length)return null;
 return records.find(r=>r.mode===mode&&r.kind===kind&&r.hardwareId===hardwareId&&r.status==='reviewed'
  &&/^https:\/\//.test(r.evidenceURL??'')&&r.modelRevision&&r.runtimeVersions&&r.completeSystem&&r.reproduction&&r.result==='passed'
  &&/^\d{4}-\d{2}-\d{2}$/.test(r.reviewedOn??'')&&/^\d{4}-\d{2}-\d{2}$/.test(r.expiresOn??'')&&r.reviewedOn<=today&&r.expiresOn>=today
  &&keys.every(k=>Object.hasOwn(r.scope??{},k)&&state[k]!==null&&state[k]!==undefined&&r.scope[k]===state[k]))??null;
}
export function verifiedConfiguration(mode,state,kind,hardwareId){
 return matchReviewedConfiguration(reviewedConfigurations,mode,state,kind,hardwareId);
}
