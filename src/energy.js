import {data} from './data/index.js';
const tariff=data.tariff;
export const tariffSource=data.sources.tariff,countySource=data.sources.county;
export const ridersCents=tariff.ridersCents;
export const ridersRate=Object.values(ridersCents).reduce((a,b)=>a+b,0)/100;
export function countyTax(kwh){return Math.min(tariff.countyCap,tariff.countyFixed+tariff.countyPerKwh*kwh);}
export function consumptionTax(kwh){return Math.min(kwh,tariff.consumptionFirstKwh)*tariff.consumptionFirst+Math.min(Math.max(0,kwh-tariff.consumptionFirstKwh),tariff.consumptionSecondKwh-tariff.consumptionFirstKwh)*tariff.consumptionSecond+Math.max(0,kwh-tariff.consumptionSecondKwh)*tariff.consumptionRest;}
// Existing meter fixed charges cancel in incremental cost.
export function gs1Variable(kwh,month,county=true){
 const first=Math.min(kwh,tariff.blockKwh),rest=Math.max(0,kwh-tariff.blockKwh),summer=month>=tariff.summerStart&&month<=tariff.summerEnd;
 const distribution=first*tariff.distributionFirst+rest*tariff.distributionRest;
 const generation=first*tariff.generationFirst+rest*(summer?tariff.generationSummer:tariff.generationWinter);
 return distribution+generation+kwh*(tariff.transmission+ridersRate+tariff.surcharge)+consumptionTax(kwh)+(county?countyTax(kwh):0);
}
export function energyCost(s,month){
 if(s.itKwh===null||s.coolingKwh===null||!s.energySource)return null;
 const kwh=s.itKwh+s.coolingKwh;
 if(s.tariff==='bill'){
  if(s.billRate===null||!s.billSource)return null;
  return {it:s.itKwh*s.billRate,cooling:s.coolingKwh*s.billRate,total:kwh*s.billRate,kwh};
 }
 if(!s.tariffConfirmed||s.baselineKwh===null||s.peakKw===null||s.peakKw>=tariff.peakLimitKw||!s.localTax)return null;
 const base=gs1Variable(s.baselineKwh,month,true);
 const it=gs1Variable(s.baselineKwh+s.itKwh,month,true)-base;
 const total=gs1Variable(s.baselineKwh+kwh,month,true)-base;
 return {it,cooling:total-it,total,kwh};
}
