// Workload conventions are planning assumptions, not measured performance.
export const trainingMethods = [
 {id:'qlora',name:'QLoRA · supervised adapters',use:'Best suited to supervised adaptation when GPU memory is limited. Choose over LoRA when a quantized frozen base is needed to fit.',constraint:'Requires compatible quantization and training kernels. Quantization can affect quality and speed; only adapter weights are learned.'},
 {id:'lora',name:'LoRA · supervised adapters',use:'A good starting point for task, style and tool-use demonstrations when BF16 base weights fit. Small adapters are easy to store and switch.',constraint:'Uses more base-weight memory than QLoRA. Adapter capacity and target layers can limit adaptation.'},
 {id:'full',name:'Full supervised fine-tuning',use:'Useful when broad changes across the model are needed and you have enough high-quality demonstrations and compute.',constraint:'Updates all weights. Much larger gradient and optimizer memory; greater risk of overfitting and forgetting. Not automatically better than adapters.'},
 {id:'partial',name:'Partial supervised fine-tuning',use:'Useful when selected layers need adaptation while the rest of the model remains frozen. A compromise between full tuning and adapters.',constraint:'Choosing the right layers requires experiments. A smaller trainable fraction reduces optimizer memory, but does not imply proportional speedup.'},
 {id:'cpt',name:'Continued pretraining',use:'Useful for adapting to domain language, code or a new text distribution using an unlabeled corpus, often before supervised tuning.',constraint:'Can require substantial corpus data and compute. Does not directly teach instruction-following; monitor forgetting and downstream task quality.'},
 {id:'dpo',name:'DPO · preference optimization',use:'Useful when you have preferred/rejected answer pairs and want to improve behavior or style without online RL rollouts.',constraint:'Requires reliable preference pairs and a reference policy. Both answers are processed; reference work and memory depend on the recipe.'},
 {id:'distill',name:'Knowledge distillation',use:'Useful for transferring a teacher’s behavior to a smaller or specialized student. This estimate covers offline teacher-generated text followed by student training.',constraint:'Teacher generation adds cost. Student capacity limits transfer. Online or logits-based distillation needs a different measured pipeline.'},
 {id:'ppo',name:'PPO · reinforcement learning',use:'Useful when task quality can be scored and online exploration is valuable, including learned human/AI preference rewards.',constraint:'Requires rollouts, reward evaluation and a trained value/critic model. Expensive and sensitive to reward design; guard against reward exploitation.'},
 {id:'grpo',name:'GRPO · reinforcement learning',use:'Useful for reasoning, coding and other tasks with verifiable rewards, comparing multiple sampled responses per prompt.',constraint:'Avoids PPO’s critic, but multiple rollouts can dominate cost. Rewards must distinguish responses; reward quality remains critical.'}
];
export const methodDefaults={updateMethod:'lora',trainablePercent:10,corpusTokens:100000000,referenceModel:1,referenceMode:'resident',teacherMode:'local',teacherParameters:70,teacherCost:0,completionTokens:1000,generations:4,policyUpdates:1,rewardParameters:0,rolloutCopy:1,auxiliaryGB:16,buyForward:2000,rentForward:4000,buyGeneration:50,rentGeneration:100,rewardSeconds:0,rewardCost:0};
export const methodKeys=Object.keys(methodDefaults);
export const methodSources=[
 ['https://huggingface.co/docs/transformers/model_memory_anatomy','Training memory'],
 ['https://huggingface.co/docs/trl/dpo_trainer','DPO reference policies'],
 ['https://huggingface.co/docs/trl/main/ppo_trainer','PPO'],
 ['https://huggingface.co/docs/trl/grpo_trainer','GRPO'],
 ['https://arxiv.org/abs/1606.07947','Sequence-level distillation']
];
export function trainingWorkload(s,model){
 const rl=['ppo','grpo'].includes(s.method),dpo=s.method==='dpo',distill=s.method==='distill';
 const update=['qlora','lora','full','partial'].includes(s.method)?s.method:s.updateMethod;
 const fraction=update==='full'?1:update==='partial'?s.trainablePercent/100:0;
 const baseGB=model.parameters*(update==='qlora'?.625:2);
 const adapterGB=['lora','qlora'].includes(update)?model.parameters*s.adapterPercent/100*16:model.parameters*fraction*16;
 // Published SFT recipe figures must never be reused for different objectives.
 const recipeReference=Boolean(model.recipe&&['lora','qlora'].includes(s.method));
 const recipeGB=recipeReference?model[s.method]:baseGB+adapterGB;
 const samples=rl?s.examples*s.epochs*s.generations:0;
 const tokens=s.method==='cpt'?s.corpusTokens*s.epochs:rl?samples*(s.tokens+s.completionTokens)*s.policyUpdates:s.examples*s.tokens*s.epochs*(dpo?2:1);
 const activationGB=8*(s.sequence/4096)*s.microbatch*(dpo?2:1);
 const referenceGB=(dpo&&s.referenceMode==='resident'||rl&&s.referenceModel)?model.parameters*2:0;
 const criticGB=s.method==='ppo'?model.parameters*18:0;
 const rewardGB=rl?s.rewardParameters*2:0;
 const rolloutGB=rl&&s.rolloutCopy?model.parameters*2:0;
 const teacherGB=distill&&s.teacherMode==='local'?s.teacherParameters*2+s.auxiliaryGB:0;
 const auxiliaryGB=(rl||dpo)?s.auxiliaryGB:0;
 const trainingGB=recipeGB+activationGB+referenceGB+criticGB+rewardGB+rolloutGB+auxiliaryGB;
 // Offline teacher and reference precomputation execute sequentially on the same system.
 const precomputeGB=dpo&&s.referenceMode==='precompute'?model.parameters*2+s.auxiliaryGB:0;
 const estimatedGB=Math.max(trainingGB,teacherGB,precomputeGB);
 const referenceTokens=dpo?s.examples*s.tokens*2*(s.referenceMode==='precompute'?1:s.epochs):rl&&s.referenceModel?samples*(s.tokens+s.completionTokens)*s.policyUpdates:0;
 const generationTokens=rl?samples*s.completionTokens:distill&&s.teacherMode==='local'?s.examples*s.completionTokens:0;
 const rewardTokens=rl&&s.rewardParameters>0?samples*(s.tokens+s.completionTokens):0;
 return {update,rl,dpo,distill,tokens,samples,baseGB,adapterGB,recipeReference,recipeGB,activationGB,referenceGB,criticGB,rewardGB,rolloutGB,teacherGB,auxiliaryGB,trainingGB,precomputeGB,estimatedGB,referenceTokens,generationTokens,rewardTokens,externalCost:rl?samples*s.rewardCost:distill&&s.teacherMode==='external'?s.teacherCost:0};
}
