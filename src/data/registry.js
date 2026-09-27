import sources from './sources.js?v=30';
import audit from './audit.js?v=30';
import models from './models.js?v=30';
import hardware from './hardware.js?v=30';
import rentals from './rentals.js?v=30';
import rentalTerms from './rental-terms.js?v=30';
import purchaseAllowances from './purchase-allowances.js?v=30';
import inferenceMemory from './inference-memory.js?v=30';
import workloads from './workloads.js?v=30';
import inferenceDefaults from './inference-defaults.js?v=30';
import inferencePolicy from './inference-policy.js?v=30';
import tariff from './tariff.js?v=30';
import frontier from './frontier.js?v=30';
import trainingModels from './training-models.js?v=30';
import trainingEligibility from './training-eligibility.js?v=30';
import trainingSystems from './training-systems.js?v=30';
import trainingDefaults from './training-defaults.js?v=30';
import methodDefaults from './method-defaults.js?v=30';
import trainingPolicy from './training-policy.js?v=30';
import trainingMethods from './training-methods.js?v=30';
import methodSources from './method-sources.js?v=30';
import reviewedConfigurations from './reviewed-configurations.js?v=30';

// Only this module assembles and freezes the maintained datasets.
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
export const datasets=freeze({audit,sources,models,hardware,rentals,rentalTerms,purchaseAllowances,inferenceMemory,workloads,inferenceDefaults,inferencePolicy,tariff,frontier,trainingModels,trainingEligibility,trainingSystems,trainingDefaults,methodDefaults,trainingPolicy,trainingMethods,methodSources,reviewedConfigurations});
export const data=Object.freeze(Object.fromEntries(Object.entries(datasets).map(([key,dataset])=>[key,dataset.values])));
