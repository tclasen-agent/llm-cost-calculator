import {planning} from './planning.js?v=26';
import {calculate} from './engine.js?v=26';
import {defaults,models,hardware,rentals,workloads} from './catalog.js?v=26';
import {modelSuggestion} from './task-models.js?v=26';

// Transactions keep the last usable calculation while the user edits its inputs.
export function scenarioStatus(raw){
 const state=planning(raw),result=calculate(state);
 const issues=[];
 if(state.calls<=0)issues.push('Enter a positive number of calls per operating day.');
 if(state.input+state.output<=0)issues.push('A request must include input or output tokens.');
 if(!result.context)issues.push(`This endpoint cannot accept the selected input/output token budget. Choose a shorter request or another model.`);
 else if(!result.apiReady)issues.push('The API estimate needs valid usage, prices and fee assumptions.');
 return {state,result,valid:issues.length===0,issues};
}
export function initialScenario(raw=defaults){
 const candidate=scenarioStatus(raw);
 if(candidate.valid)return {...candidate,recovered:false};
 const fallback=scenarioStatus(defaults);
 if(!fallback.valid)throw new Error('The maintained default scenario is invalid: '+fallback.issues.join(' '));
 return {...fallback,recovered:true,rejected:raw,issues:candidate.issues};
}
export function changeScenario(previous,key,value){
 if(!(key in defaults))return {accepted:false,state:previous,message:'Unknown setting.'};
 if((defaults[key]===null||typeof defaults[key]==='number')&&value!==null&&value!==''&&(!Number.isFinite(Number(value))||Number(value)<0))return {accepted:false,state:previous,message:'Enter a finite, nonnegative number. The previous calculation is unchanged.'};
 for(const [field,ids] of [['model',models.map(x=>x.id)],['hardware',hardware.map(x=>x.id)],['rental',rentals.map(x=>x.id)],['workload',workloads.map(x=>x[0])]])if(key===field&&!ids.includes(value))return {accepted:false,state:previous,message:'Choose an available catalog option. The previous calculation is unchanged.'};
 const raw={...previous,[key]:value};
 const simple=['workload','users','model','hardware','rental','autoModel','autoHardware','autoRental'];
 const overrides=new Set(previous.overrides.split(',').filter(Boolean));
 if(!simple.includes(key)){if(value===null||value==='')overrides.delete(key);else overrides.add(key);}
 raw.overrides=[...overrides].join(',');
 if(key==='workload'&&raw.autoModel)raw.model=modelSuggestion(raw.workload);
 if(key==='model')raw.autoModel=0;
 if(key==='hardware')raw.autoHardware=0;
 if(key==='rental')raw.autoRental=0;
 if(key==='autoModel'&&Number(value))raw.model=modelSuggestion(raw.workload);
 const next=scenarioStatus(raw),current=calculate(previous);
 for(const kind of ['buy','rent'])if(current[kind+'Ready']&&!next.result[kind+'Ready'])next.issues.push(`This change would invalidate the current ${kind} comparison. Choose inputs covered by an available configuration.`);
 next.valid=next.issues.length===0;
 return next.valid?{accepted:true,state:next.state,message:''}:{accepted:false,state:previous,message:next.issues.join(' ')+' The previous calculation is unchanged.'};
}
