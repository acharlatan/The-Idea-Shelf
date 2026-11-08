import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
globalThis.window={};
await import('../public/ideas.js'); await import('../public/new-ideas.js'); await import('../public/guides.js');
const ideas=[...window.IDEAS,...window.NEW_IDEAS], guides=window.SHELF_GUIDES;
assert.ok(guides.length>=8,'Expected a substantial guide library');
assert.equal(new Set(guides.map(g=>g.id)).size,guides.length,'Guide IDs must be unique');
for(const g of guides){assert.match(g.id,/^[a-z0-9-]+$/);for(const field of ['title','category','time','image','summary','lede','intro','example'])assert.ok(typeof g[field]==='string'&&g[field].trim(),`${g.id} is missing ${field}`);assert.ok(g.sections.length>=3,`${g.id} needs three sections`);assert.ok(g.sections.every(s=>s.heading&&Array.isArray(s.paragraphs)&&s.paragraphs.length),`${g.id} has an empty section`);assert.equal(g.prompts.length,3);assert.ok(ideas.some(i=>i.id===g.related),`${g.id}: related idea is missing`);await access(`public/assets/ideas/${g.image}.webp`);}
const pages=['index','explore','idea','shelf','projects','studio','guides','guide','club','playbooks','playbook'];
for(const page of pages){const html=await readFile(`public/${page}.html`,'utf8');assert.ok(html.includes('id="main"'),`${page}: missing main`);assert.ok(html.includes('/v2.css')&&html.includes('/v2.js'),`${page}: missing shared assets`);for(const match of html.matchAll(/(?:href|src)="(\/[a-zA-Z0-9_./-]+\.html)/g)){await access(`public${match[1]}`);}}
console.log(`Validated ${guides.length} guides and ${pages.length} page entry points.`);
