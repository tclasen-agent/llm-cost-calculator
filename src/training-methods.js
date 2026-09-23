import {data,methodDefaults,trainingMethods,methodSources} from './data/index.js';
export {methodDefaults,trainingMethods,methodSources} from './data/index.js';
export const methodKeys=Object.keys(methodDefaults);
const policy=data.trainingPolicy;
export function trainingWorkload(s,model){
 const rl=['ppo','grpo'].includes(s.method),dpo=s.method==='dpo',distill=s.method==='distill';
 const update=['qlora','lora','full','partial'].includes(s.method)?s.method:s.updateMethod;
 const fraction=update==='full'?1:update==='partial'?s.trainablePercent/100:0;
 const baseGB=model.parameters*(update==='qlora'?policy.quantizedBytes:policy.frozenBytes);
 const adapterGB=['lora','qlora'].includes(update)?model.parameters*s.adapterPercent/100*policy.trainableBytes:model.parameters*fraction*policy.trainableBytes;
 // Published SFT recipe figures must never be reused for different objectives.
 const recipeReference=Boolean(model.recipe&&['lora','qlora'].includes(s.method));
 const recipeGB=recipeReference?model[s.method]:baseGB+adapterGB;
 const samples=rl?s.examples*s.epochs*s.generations:0;
 const tokens=s.method==='cpt'?s.corpusTokens*s.epochs:rl?samples*(s.tokens+s.completionTokens)*s.policyUpdates:s.examples*s.tokens*s.epochs*(dpo?2:1);
 const activationGB=policy.activationGB*(s.sequence/policy.activationSequence)*s.microbatch*(dpo?2:1);
 const referenceGB=(dpo&&s.referenceMode==='resident'||rl&&s.referenceModel)?model.parameters*policy.frozenBytes:0;
 const criticGB=s.method==='ppo'?model.parameters*(policy.frozenBytes+policy.trainableBytes):0;
 const rewardGB=rl?s.rewardParameters*policy.frozenBytes:0;
 const rolloutGB=rl&&s.rolloutCopy?model.parameters*policy.frozenBytes:0;
 const teacherGB=distill&&s.teacherMode==='local'?s.teacherParameters*policy.frozenBytes+s.auxiliaryGB:0;
 const auxiliaryGB=(rl||dpo)?s.auxiliaryGB:0;
 const trainingGB=recipeGB+activationGB+referenceGB+criticGB+rewardGB+rolloutGB+auxiliaryGB;
 // Offline teacher and reference precomputation execute sequentially on the same system.
 const precomputeGB=dpo&&s.referenceMode==='precompute'?model.parameters*policy.frozenBytes+s.auxiliaryGB:0;
 const estimatedGB=Math.max(trainingGB,teacherGB,precomputeGB);
 const referenceTokens=dpo?s.examples*s.tokens*2*(s.referenceMode==='precompute'?1:s.epochs):rl&&s.referenceModel?samples*(s.tokens+s.completionTokens)*s.policyUpdates:0;
 const generationTokens=rl?samples*s.completionTokens:distill&&s.teacherMode==='local'?s.examples*s.completionTokens:0;
 const rewardTokens=rl&&s.rewardParameters>0?samples*(s.tokens+s.completionTokens):0;
 return {update,rl,dpo,distill,tokens,samples,baseGB,adapterGB,recipeReference,recipeGB,activationGB,referenceGB,criticGB,rewardGB,rolloutGB,teacherGB,auxiliaryGB,trainingGB,precomputeGB,estimatedGB,referenceTokens,generationTokens,rewardTokens,externalCost:rl?samples*s.rewardCost:distill&&s.teacherMode==='external'?s.teacherCost:0};
}
