import {planning} from './planning.js?v=28';
import {calculate} from './engine.js?v=28';
import {defaults,models,hardware,rentals,workloads} from './catalog.js?v=28';
import {taskModels} from './task-models.js?v=28';

// Transactions keep the last usable calculation while the user edits its inputs.
export function scenarioStatus(raw){
 const state=planning(raw),result=calculate(state);
 const issues=[];
 if(state.calls<=0)issues.push('Enter a positive number of calls per operating day.');
 if(state.input+state.output<=0)issues.push('A request must include input or output tokens.');
 if(!result.context)issues.push(`This endpoint cannot accept the selected input/output token budget. Choose a shorter request or another model.`);
 else if(!result.apiReady)issues.push('The API estimate needs valid usage, prices and fee assumptions.');
 if(!result.buyReady)issues.push('No purchase configuration fits these inputs with usable cost and performance assumptions.');
 if(!result.rentReady)issues.push('No rental configuration fits these inputs with usable cost and performance assumptions.');
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

 if(key==='model')raw.autoModel=0;
 if(key==='hardware')raw.autoHardware=0;
 if(key==='rental')raw.autoRental=0;
 // Measurement overrides are scoped to the prior model/workload/system. Quotes
 // are scoped to hardware; unrelated fee and workload overrides remain intact.
 const workloadChange=['model','workload','users','input','output','concurrency','autoModel'].includes(key);
 for(const [side,selection] of [['local','hardware'],['rental','rental']]){
  if(workloadChange||key===selection)for(const suffix of ['Prefill','Decode','Rph','Available','Memory','Runtime','Evidence'])overrides.delete(side+suffix);
 }
 if(workloadChange||key==='hardware')for(const field of ['itKwh','coolingKwh','energySource'])overrides.delete(field);
 if(key==='hardware')for(const field of ['quote','quoteSource','buildDetails','localSetup'])overrides.delete(field);
 if(key==='rental')for(const field of ['rentalSetup','rentalExtras'])overrides.delete(field);
 if(['localPrefill','localDecode','localRph','localMemory','localAvailable','localRuntime','localEvidence','quote','quoteSource','buildDetails'].includes(key))raw.autoHardware=0;
 if(['rentalPrefill','rentalDecode','rentalRph','rentalMemory','rentalAvailable','rentalRuntime','rentalEvidence'].includes(key))raw.autoRental=0;
 raw.overrides=[...overrides].join(',');
 if((key==='workload'&&raw.autoModel)||(key==='autoModel'&&Number(value))){
  const suggested=taskModels[raw.workload].map(model=>({...raw,model})).find(candidate=>scenarioStatus(candidate).valid);
  if(suggested)raw.model=suggested.model;
  else return {accepted:false,state:previous,message:'No model in this task shortlist fits the current inputs. Reduce the request size or enable automatic hardware selection. The previous calculation is unchanged.'};
 }
 const next=scenarioStatus(raw),current=calculate(previous);
 for(const kind of ['buy','rent'])if(current[kind+'Ready']&&!next.result[kind+'Ready'])next.issues.push(`This change would invalidate the current ${kind} comparison. Choose inputs covered by an available configuration.`);
 next.valid=next.issues.length===0;
 return next.valid?{accepted:true,state:next.state,message:''}:{accepted:false,state:previous,message:next.issues.join(' ')+' The previous calculation is unchanged.'};
}
