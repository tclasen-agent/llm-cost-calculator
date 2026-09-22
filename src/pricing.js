// Prices compound monthly from the entered month-one quote. Hardware and workload stay fixed.
export function priceFactor(annualDrop,month,floor=20){return Math.max(floor/100,Math.pow(1-annualDrop/100,Math.max(0,month-1)/12));}
export function projectCosts(r,months=120){
 const s=r.s,rows=[{month:0,buy:r.capital,rent:s.rentalSetup,api:0,buyMonthly:0,rentMonthly:0,apiMonthly:0}];
 for(let month=1;month<=months;month++){
  const apiFactor=priceFactor(s.apiDecline,month,s.priceFloor),rentFactor=priceFactor(s.rentalDecline,month,s.priceFloor);
  const buyMonthly=r.powerCost+s.maintenance+r.overflow*apiFactor;
  const rentMonthly=r.rentalCompute*rentFactor+s.rentalExtra+r.rentalOverflow*apiFactor;
  const apiMonthly=r.cloud*apiFactor,prev=rows.at(-1);
  rows.push({month,buy:prev.buy+buyMonthly,rent:prev.rent+rentMonthly,api:prev.api+apiMonthly,buyMonthly,rentMonthly,apiMonthly,apiFactor,rentFactor});
 }
 return rows;
}
export function projectedPayback(rows,alternative){
 const gaps=rows.map(row=>row.buy-row[alternative]);let first=null,lastPositive=-1,reversed=false;
 for(let i=0;i<gaps.length;i++){
  if(gaps[i]>1e-8){lastPositive=i;if(first!==null)reversed=true;}
  else if(first===null&&gaps[i]<-1e-8){first=i===0?0:(i-1)+Math.max(0,gaps[i-1])/(Math.max(0,gaps[i-1])-gaps[i]);}
 }
 if(first===null||gaps.at(-1)>1e-8)return {payback:null,first,reversed};
 const payback=lastPositive<0?0:lastPositive+gaps[lastPositive]/(gaps[lastPositive]-gaps[lastPositive+1]);
 return {payback,first,reversed};
}
export function applyPriceOutlook(r){
 const cashflows=projectCosts(r),end=cashflows[r.s.months];
 const changing=r.s.apiDecline>0||r.s.rentalDecline>0;
 const api=projectedPayback(cashflows,'api'),rent=projectedPayback(cashflows,'rent');
 return {...r,cashflows,changingPrices:changing,localTco:changing?end.buy-r.resaleValue:r.localTco,cloudTco:changing?end.api:r.cloudTco,rentalTco:changing?end.rent:r.rentalTco,payback:changing?api.payback:r.payback,paybackVsRental:changing?rent.payback:r.paybackVsRental,paybackReversal:changing&&(api.reversed||rent.reversed),firstPaybackApi:api.first,firstPaybackRent:rent.first,thresholdFeasible:changing?false:r.thresholdFeasible};
}
export function applyPricingPreset(state,id){
 const presets={0:{purchaseDiscount:0,rentalDecline:0,apiDecline:0},1:{purchaseDiscount:0,rentalDecline:15,apiDecline:30},2:{purchaseDiscount:30,rentalDecline:15,apiDecline:30}};
 return presets[id]?{...state,...presets[id],priceFloor:20,pricingOutlook:Number(id)}:{...state,pricingOutlook:3};
}
