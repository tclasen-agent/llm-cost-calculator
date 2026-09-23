import {defaults} from './catalog.js?v=24';
import {normalize} from './engine.js?v=24';
export function encodeState(s){const p=new URLSearchParams({scenario:'2'});for(const k of Object.keys(defaults))p.set(k,s[k]===null?'':String(s[k]));return p.toString();}
export function decodeState(query){const p=new URLSearchParams(query);if(p.get('scenario')!=='2')return null;const raw={};for(const k of Object.keys(defaults))if(p.has(k))raw[k]=p.get(k);return normalize(raw);}
