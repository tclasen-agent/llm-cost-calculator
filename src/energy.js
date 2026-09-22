// Dominion Virginia filed tariff, downloaded 2026-09-22. Rates are USD unless noted.
export const tariffSource='https://cdn-dominionenergy-prd-001.azureedge.net/-/media/content/rates-and-tariffs/pdfs/virginia/shared/entire-filed-tariff.pdf';
export const countySource='https://www.loudoun.gov/1570/Business-Tax-Rates';
export const ridersCents={A:3.7648,C1A:.0384,C4A:.1116,CCR:.1765,CE:.4673,CERC:.0541,DIST:.5780,E:.0456,GEN:.4100,OSW:.9229,PIPP:0,RGGI:0,RPS:.5520,SMR:.0124,SNA:.3429,T1:1.1929,'Deferred fuel':.2901};
export const ridersRate=Object.values(ridersCents).reduce((a,b)=>a+b,0)/100;
export function countyTax(kwh){return Math.min(72,.92+.005393*kwh);}
export function consumptionTax(kwh){return Math.min(kwh,2500)*.001565+Math.min(Math.max(0,kwh-2500),47500)*.001055+Math.max(0,kwh-50000)*.000845;}
// Variable charge only: an existing meter's customer charge cancels in incremental cost.
export function gs1Variable(kwh,month,county=true){
 const first=Math.min(kwh,1400),rest=Math.max(0,kwh-1400),summer=month>=6&&month<=9;
 const distribution=first*.025525+rest*.018928;
 const generation=first*.030788+rest*(summer?.041350:.019886);
 return distribution+generation+kwh*(.00582+ridersRate+.000847)+consumptionTax(kwh)+(county?countyTax(kwh):0);
}
export function energyCost(s,month){
 if(s.itKwh===null||s.coolingKwh===null||!s.energySource)return null;
 const kwh=s.itKwh+s.coolingKwh;
 if(s.tariff==='bill'){
  if(s.billRate===null||!s.billSource)return null;
  return {it:s.itKwh*s.billRate,cooling:s.coolingKwh*s.billRate,total:kwh*s.billRate,kwh};
 }
 if(!s.tariffConfirmed||s.baselineKwh===null||s.peakKw===null||s.peakKw>=30||!s.localTax)return null;
 const base=gs1Variable(s.baselineKwh,month,true);
 const it=gs1Variable(s.baselineKwh+s.itKwh,month,true)-base;
 const total=gs1Variable(s.baselineKwh+kwh,month,true)-base;
 return {it,cooling:total-it,total,kwh};
}
