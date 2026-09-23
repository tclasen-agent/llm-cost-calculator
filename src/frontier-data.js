// Snapshot, not a live feed. Only independently measured, comparable AA v4.3.2 results are plotted.
export const frontierReviewed='2026-09-23';
export const benchmarkVersion='Artificial Analysis Intelligence Index v4.3.2';
export const benchmarkSource='https://artificialanalysis.ai/leaderboards/models';
export const methodologySource='https://artificialanalysis.ai/methodology/intelligence-benchmarking';
const aa=slug=>'https://artificialanalysis.ai/models/'+slug;
export const referenceModels=[
 ['gpt-5.6-sol','GPT-5.6 Sol',47,1.99,4,20,'gpt-5-6-sol'],
 ['gpt-5.6-terra','GPT-5.6 Terra',42,1.40,2,12,'gpt-5-6-terra'],
 ['gpt-5.6-luna','GPT-5.6 Luna',37,.18,.2,1.2,'gpt-5-6-luna'],
 ['gpt-6-astra','GPT-6 Astra',53,3.26,10,50,'gpt-6-astra'],
 ['gpt-6-sol','GPT-6 Sol',48,1.06,2,10,'gpt-6-sol'],
 ['gpt-6-luna','GPT-6 Luna',37,.07,.1,.5,'gpt-6-luna']
].map(([id,name,score,taskCost,input,output,slug])=>({id,name,score,taskCost,input,output,variant:'max reasoning',source:aa(slug),priceSource:'https://developers.openai.com/api/docs/models/'+id,context:1050000,maxOutput:128000,longThreshold:272000}));
// Model IDs match the purchase/rental catalog; scores describe the evaluated model, not a local quantization.
export const selectedBenchmarks=Object.fromEntries([
 ['ds41',39,.27,'max reasoning'],['glm53',45,2.01,'max reasoning'],
 ['glm53flash',42,.25,'AA evaluated configuration'],['qwen38large',40,2.16,'AA evaluated configuration'],
 ['qwen38small',34,1.01,'xhigh reasoning'],['kimi3',44,2,'max reasoning'],
 ['nemotron-ultra',23,.55,'reasoning'],['nemotron-super',13,1.64,'reasoning'],
 ['nemotron-nano',9,.02,'reasoning'],['oss120',12,.11,'high reasoning'],
 ['nemotron-lightning',13,.10,'AA evaluated configuration'],
 ['minimax27',23,.10,'reasoning',aa('minimax-m2-7')],
 ['qwen80',9,.55,'non-reasoning',aa('qwen3-coder-next/')]
].map(([id,score,taskCost,variant,source])=>[id,{score,taskCost,variant,source:source||benchmarkSource}]));
export const missingBenchmarks={
 kimi25:'The available score is an estimate, not an independently measured result in this snapshot.',
 minimax:'The available score is an estimate, not an independently measured result in this snapshot.',
 deepseek:'A comparable measured score and task cost have not been verified in this snapshot.',
 qwen30:'A comparable measured score and task cost have not been verified in this snapshot.'
};
