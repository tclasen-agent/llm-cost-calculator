import {planning} from './planning.js?v=30';
import {calculate,normalize} from './engine.js?v=30';
import {defaults,models,hardware,rentals,workloads} from './catalog.js?v=30';
import {taskModels} from './task-models.js?v=30';

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
function persistedIssues(raw){
 if(raw===null||typeof raw!=='object'||Array.isArray(raw))return ['Saved inputs must be a scenario object.'];
 const issues=[];
 for(const [key,defaultValue] of Object.entries(defaults)){
  const value=raw[key];
  if(value===undefined)continue; // Older partial scenarios inherit missing fields.
  if(defaultValue===null||typeof defaultValue==='number'){
   if(value===null||value==='')continue;
   if(!['number','string'].includes(typeof value)||(typeof value==='string'&&!value.trim())||!Number.isFinite(Number(value))||Number(value)<0)issues.push(`Saved ${key} must be a finite, nonnegative number.`);
  }else if(typeof value!=='string')issues.push(`Saved ${key} must be text.`);
 }
 for(const [key,ids] of [['model',models.map(x=>x.id)],['hardware',hardware.map(x=>x.id)],['rental',rentals.map(x=>x.id)],['workload',workloads.map(x=>x[0])]]){
  if(raw[key]!==undefined&&!ids.includes(raw[key]))issues.push(`Saved ${key} is no longer available.`);
 }
 if(raw.start!==undefined&&!/^20\d\d-(0[1-9]|1[0-2])$/.test(raw.start))issues.push('Saved starting month is invalid.');
 for(const [key,options] of [['tariff',['gs1','bill']],['frontierBasis',['benchmark','call']]])if(raw[key]!==undefined&&!options.includes(raw[key]))issues.push(`Saved ${key} is invalid.`);
 if(!issues.length){
  // Reuse the normalizer's domains, including integer/flag constraints, without
  // copying its bounds. Recovery must see values that normalization would clamp.
  const normalized=normalize(raw);
  for(const [key,defaultValue] of Object.entries(defaults)){
   const value=raw[key];
   if((defaultValue===null||typeof defaultValue==='number')&&value!==undefined&&value!==null&&value!==''&&Number(value)!==normalized[key])issues.push(`Saved ${key} is outside its supported numeric domain.`);
  }
 }
 return issues;
}
export function initialScenario(raw=defaults){
 const issues=persistedIssues(raw);
 const candidate=issues.length?{valid:false,issues}:scenarioStatus(raw);
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
