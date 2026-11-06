import { access, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

// The browser data files intentionally expose their content on window.
globalThis.window = {};
await import('../public/ideas.js');
await import('../public/new-ideas.js');
const original = window.IDEAS;
const added = window.NEW_IDEAS;
const ideas = [...added, ...original];
assert.equal(added.length, 30, 'The illustrated collection must contain 30 ideas.');
assert.equal(new Set(ideas.map(idea => idea.id)).size, ideas.length, 'Idea IDs must be unique.');
const categories = new Set(['Community', 'Campaign', 'Content', 'Branding', 'Creative']);
for (const idea of ideas) {
  assert.match(idea.id, /^[a-z0-9-]+$/);
  for (const field of ['title', 'summary', 'why', 'example', 'time']) assert.ok(typeof idea[field] === 'string' && idea[field].trim(), `${idea.id}: missing ${field}`);
  assert.ok(categories.has(idea.category), `${idea.id}: unknown category`);
  assert.equal(idea.steps.length, 3, `${idea.id}: each idea needs three steps`);
  assert.ok(idea.steps.every(step => typeof step === 'string' && step.trim()), `${idea.id}: empty step`);
}
for (const idea of added) {
  assert.ok(idea.collection, `${idea.id}: missing collection`);
  assert.equal(idea.image, `/assets/ideas/${idea.id}.webp`);
  const imagePath = path.join('public', idea.image.slice(1));
  await access(imagePath);
  assert.ok((await stat(imagePath)).size > 1024, `${idea.id}: invalid image`);
}
console.log(`Validated ${ideas.length} ideas, including ${added.length} illustrated entries.`);
