import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('required API routes are wired',()=>{const r=fs.readFileSync(new URL('../src/routes/complaints.js',import.meta.url),'utf8');for(const route of ['/analyze','/','/my','/:id/history','/:id/assign','/:id/status','/:id/comments','/:id'])assert.ok(r.includes(route),`missing ${route}`);});
test('no AI provider keys are declared',()=>{const p=fs.readFileSync(new URL('../package.json',import.meta.url),'utf8');assert.ok(!/openai|gemini|huggingface|anthropic/i.test(p));});
