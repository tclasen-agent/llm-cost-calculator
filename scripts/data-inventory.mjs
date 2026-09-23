import fs from 'node:fs/promises';
import {inventory,validate,root} from './data-tools.mjs';
const counts=await validate();
const file=root+'/src/data/INVENTORY.md',expected=inventory();
if(process.argv.includes('--check')){if(await fs.readFile(file,'utf8')!==expected)throw new Error('Data inventory is stale. Run npm run data:inventory.');}
else await fs.writeFile(file,expected);
console.log(`Data validated: ${counts.datasets} datasets, ${counts.fields} distinct field paths; inventory ${process.argv.includes('--check')?'current':'written'}.`);
