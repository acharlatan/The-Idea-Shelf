import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
globalThis.window={}; await import('../public/field-notes-data.js'); await import('../public/backup.js');
const data=window.SHELF_REPORTING;
assert.equal(data.length,12);assert.equal(data.filter(e=>e.deep).length,4);
assert.equal(new Set(data.map(e=>e.id)).size,12);
for(const e of data){
 for(const k of ['id','brand','title','year','objective','channel','budget','summary','fact','analysis','limit','trial','url','source','checked'])assert.ok(e[k],e.id+': '+k);
 assert.equal(new URL(e.url).protocol,'https:');assert.equal(e.checked,'2026-11-14');
 await access('public/assets/ideas/'+e.image+'.webp');
}
const base={kind:'the-idea-shelf-backup',version:1,saved:[],notes:{},publication:{saved:['spotify-wrapped'],notes:{'spotify-wrapped':'imported'},experiments:{'ikea-buyback':{question:'new'}}}};
const cur={saved:[],notes:{},publication:{saved:['ikea-buyback'],notes:{'spotify-wrapped':'existing'},experiments:{'ikea-buyback':{question:'existing'}}}};
const merged=globalThis.ShelfBackup.merge(base,cur,{ideas:[],guides:[]});
assert.deepEqual(merged.publication.saved,['ikea-buyback','spotify-wrapped']);
assert.equal(merged.publication.notes['spotify-wrapped'],'existing');
assert.equal(merged.publication.experiments['ikea-buyback'].question,'existing');
const legacy=globalThis.ShelfBackup.merge({...base,publication:undefined},cur,{ideas:[],guides:[]});
assert.equal(legacy.publication.notes['spotify-wrapped'],'existing');
const hostile=JSON.parse(JSON.stringify(base));hostile.publication.notes=JSON.parse('{"__proto__":"bad","spotify-wrapped":"ok"}');
assert.equal(Object.hasOwn(globalThis.ShelfBackup.merge(hostile,{}, {ideas:[],guides:[]}).publication.notes,'__proto__'),false);
for(const file of ['index','stories','references','story','briefing','experiments','about','shelf']){
 const html=await readFile('public/'+file+'.html','utf8');
 assert.ok(html.includes('id="main"'));assert.ok(html.includes('/publication.js'));
 for(const match of html.matchAll(/(?:href|src)="(\/[a-zA-Z0-9_./-]+\.(?:html|css|js|webp))/g))await access('public'+match[1]);
}
console.log('Validated 12 sourced references, 4 breakdowns, page links, publication backup round trips, legacy preservation and unsafe-key rejection.');
