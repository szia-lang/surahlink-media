// Usage:
//   node queue.js <week>              add every post in docs/media/<week>/manifest.json to the Buffer queue (fills your posting slots in order)
//   node queue.js <week> --test <n>   send post #n right now as a test (notification)
// Posts use Buffer "notification" publishing: at each slot you get a phone notification, add a trending sound in TikTok, and post.
const fs = require('fs'), path = require('path');
const ORG = '6aef9057b8f3b935b783e66d', CHANNEL = '6aef9076e29c69a1719974d9'; // Buffer org + TikTok channel (@softdeendaily)
const BASE = 'https://szia-lang.github.io/surahlink-media/media';
const week = process.argv[2]; const ti = process.argv.indexOf('--test'); const testN = ti > 0 ? Number(process.argv[ti + 1]) : null;
const dir = path.resolve(__dirname, '../docs/media', week);
const { posts } = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json')));
const LOG = path.join(dir, 'queued.json');
const done = fs.existsSync(LOG) ? JSON.parse(fs.readFileSync(LOG)) : {};

async function gql(query, variables) {
  const r = await fetch('https://api.buffer.com', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables }) });
  const j = await r.json(); if (j.errors) throw new Error(JSON.stringify(j.errors)); return j.data;
}
const M = `mutation($input: CreatePostInput!) { createPost(input: $input) { __typename
  ... on PostActionSuccess { post { id } } ... on NotFoundError { message } ... on UnauthorizedError { message }
  ... on UnexpectedError { message } ... on RestProxyError { message } ... on LimitReachedError { message } ... on InvalidInputError { message } } }`;

(async () => {
  const list = testN ? posts.filter(p => p.order === testN) : posts;
  for (const p of list) {
    if (!testN && done[p.folder]) { console.log('skip (already queued)', p.folder); continue; }
    const input = { channelId: CHANNEL, mode: testN ? 'shareNow' : 'addToQueue', schedulingType: 'notification', needsApproval: false,
      text: p.caption, assets: p.images.map((im, k) => ({ image: { url: `${BASE}/${week}/${im}`, metadata: { altText: `${p.id} slide ${k + 1}` } } })), source: 'surahlink-engine' };
    const res = (await gql(M, { input })).createPost;
    if (res.__typename !== 'PostActionSuccess') { console.error('FAILED', p.folder, res.__typename, res.message); process.exitCode = 1; if (!testN) break; continue; }
    console.log('queued', p.folder, '->', res.post.id, `| sound idea: ${p.sound}`);
    if (!testN) { done[p.folder] = res.post.id; fs.writeFileSync(LOG, JSON.stringify(done, null, 2)); }
  }
})();
