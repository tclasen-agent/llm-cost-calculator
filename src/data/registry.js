import sources from './sources.js';
import models from './models.js';
import hardware from './hardware.js';
import rentals from './rentals.js';
import rentalTerms from './rental-terms.js';
import purchaseAllowances from './purchase-allowances.js';
import inferenceMemory from './inference-memory.js';
import workloads from './workloads.js';
import inferenceDefaults from './inference-defaults.js';
import inferencePolicy from './inference-policy.js';
import tariff from './tariff.js';
import frontier from './frontier.js';
import trainingModels from './training-models.js';
import trainingEligibility from './training-eligibility.js';
import trainingSystems from './training-systems.js';
import trainingDefaults from './training-defaults.js';
import methodDefaults from './method-defaults.js';
import trainingPolicy from './training-policy.js';
import trainingMethods from './training-methods.js';
import methodSources from './method-sources.js';
import reviewedConfigurations from './reviewed-configurations.js';

// Only this module assembles and freezes the maintained datasets.
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
export const datasets=freeze({sources,models,hardware,rentals,rentalTerms,purchaseAllowances,inferenceMemory,workloads,inferenceDefaults,inferencePolicy,tariff,frontier,trainingModels,trainingEligibility,trainingSystems,trainingDefaults,methodDefaults,trainingPolicy,trainingMethods,methodSources,reviewedConfigurations});
export const data=Object.freeze(Object.fromEntries(Object.entries(datasets).map(([key,dataset])=>[key,dataset.values])));
