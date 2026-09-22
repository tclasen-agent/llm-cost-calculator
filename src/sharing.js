import {defaults} from './catalog.js?v=6';
import {normalize} from './engine.js?v=6';
export function encodeState(state){const q=new URLSearchParams({scenario:'1'});for(const key of Object.keys(defaults))if(key!=='months')q.set(key,String(state[key]));return q.toString();}
export function decodeState(search){const q=new URLSearchParams(search);if(q.get('scenario')!=='1')return null;const raw={};for(const key of Object.keys(defaults))if(q.has(key))raw[key]=q.get(key);return normalize(raw);}
