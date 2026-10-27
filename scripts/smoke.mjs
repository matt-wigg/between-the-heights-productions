import assert from 'node:assert/strict';

// Invalid contact requests are intentional: this check never sends email.
const base = process.env.BASE_URL || 'http://localhost:3000';
const request = (path, options = {}) => fetch(new URL(path, base), {
  ...options,
  signal: AbortSignal.timeout(30_000),
});

for (const path of ['/', '/work', '/services', '/studio', '/contact',
  '/work/2024-demo-reel', '/work/the-david-project', '/work/uptown-party', '/work/friend-like-me']) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(await response.text(), /Between The Heights/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'SAMEORIGIN');
  console.log(`PASS ${path}`);
}
for (const path of ['/productions', '/work/torrey-pines']) {
  const response = await request(path, { redirect: 'manual' });
  assert.equal(response.status, 308, path);
  assert.equal(new URL(response.headers.get('location'), base).pathname, '/work');
  console.log(`PASS redirect ${path}`);
}
assert.equal((await request('/not-a-real-route')).status, 404);
assert.equal((await request('/api/sendEmail')).status, 405);
const image = await request('/_next/image?url=%2Fdan_photo.jpg&w=640&q=75');
assert.equal(image.status, 200, 'Image optimization');
assert.match(image.headers.get('content-type'), /^image\//);
for (const body of ['null', '[]', '"text"', '{', '{}', JSON.stringify({
  name: 'Validation check', email: 'invalid', message: 'Must not be delivered',
})]) {
  const response = await request('/api/sendEmail', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body,
  });
  assert.equal(response.status, 400, `Invalid body: ${body}`);
  assert.equal(typeof (await response.json()).error, 'string');
}
console.log('PASS 404, method guard, and six invalid contact requests (no email sent)');
