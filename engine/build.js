// Usage: node build.js <weekLabel>   e.g. node build.js 2026-W46
// Picks the next unused 21 growth / 7 edu / 7 cta posts, verifies all Quran text against the dataset,
// renders 1080x1920 JPEG slideshows (TikTok photo mode) into ../docs/media/<week>/ and writes manifest.json there.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const Q = require('quran-json/dist/quran_en.json');

const ROOT = path.resolve(__dirname, '..');
const week = process.argv[2]; if (!week) { console.error('usage: node build.js <week>'); process.exit(1); }
const OUT = path.join(ROOT, 'docs/media', week); fs.mkdirSync(OUT, { recursive: true });
const STATE = path.join(__dirname, 'state/used.json');
const used = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE)) : { growth: [], edu: [], cta: [] };

// ---------- Quran helpers ----------
const verse = ref => { const [s, a] = ref.split(':').map(Number); const v = Q[s - 1] && Q[s - 1].verses[a - 1]; if (!v) throw new Error('bad ref ' + ref); return { ...v, surah: Q[s - 1].transliteration, s, a }; };
const clean = t => t.replace(/[\u06D6-\u06DC\u06DE\u06E9]/g, '').trim();
const arWords = (ref, a, b) => { const w = verse(ref).text.split(' '); if (b >= w.length) throw new Error(`word range ${a}-${b} out of bounds for ${ref}`); return clean(w.slice(a, b + 1).join(' ')); };
const norm = t => t.toLowerCase().replace(/[^a-z0-9\[\]]+/g, ' ').replace(/\s+/g, ' ').trim();
function verifyTr(ref, quote) {
  // brackets in Sahih International are optional words: build regex where each [..] segment may be present or absent
  const segs = norm(verse(ref).translation).split(/(\[[^\]]*\])/);
  const nb = segs.filter(s => s.startsWith('[')).length;
  const sq = (' ' + norm(quote).replace(/[\[\]]/g, '') + ' ').replace(/\s+/g, ' ');
  let ok = false;
  for (let m = 0; m < (1 << Math.min(nb, 12)) && !ok; m++) { // every combination of optional [bracketed] words
    let bi = 0; const v = segs.map(s => s.startsWith('[') ? ((m >> bi++) & 1 ? s.slice(1, -1) : ' ') : s).join(' ');
    ok = (' ' + v + ' ').replace(/\s+/g, ' ').includes(sq);
  }
  if (!ok) throw new Error(`translation mismatch for ${ref}:\n  quote:   ${quote}\n  dataset: ${verse(ref).translation}`);
  return quote;
}
const refName = ref => { const v = verse(ref); return `${v.surah} ${v.s}:${v.a}`; };

// ---------- post builders ----------
const A = t => `<span class="ar">${t}</span>`;
function buildGrowth(p) {
  const ar = {}, tr = {}, refs = {};
  for (const [k, [ref, a, b]] of Object.entries(p.ar || {})) { ar[k] = arWords(ref, a, b); refs[k] = refName(ref); }
  for (const [k, [ref, q]] of Object.entries(p.tr || {})) { tr[k] = verifyTr(ref, q); refs[k] = refName(ref); }
  const slides = p.slides.map(s => s.replace(/\[\[(ar|tr|ref):(\w+)\]\]/g, (_, t, k) => {
    const v = t === 'ar' ? (ar[k] && A(ar[k])) : t === 'tr' ? tr[k] : refs[k]; if (!v) throw new Error(`${p.id}: missing ${t}:${k}`); return v; }));
  const mainRef = refs.main || Object.values(refs)[0];
  return { id: p.id, type: 'growth', template: 'growth', post: { bg: p.bg, slides, seed: hash(p.id) },
    durations: slides.map(s => s.includes('class="ar"') || s.length > 160 ? 4.5 : 3),
    caption: `${p.caption}\n\n${mainRef}\n\n#quran #islam #muslimtiktok #islamicreminder #quranverses #deen #muslim #fyp`, sound: p.sound };
}
const CTA_BTN = `<div class="cta"><div><small>DOWNLOAD ON THE</small>App Store</div><span>→</span></div>`;
function buildEdu(p) {
  const v0 = verse(p.verses[0]);
  const arabic = p.verses.map(r => clean(verse(r).text)).join(' ۝ ');
  const trs = p.tr.map(([r, q]) => verifyTr(r, q));
  const refLabel = p.verses.length > 1 ? `${v0.surah} ${v0.s}:${v0.a}-${verse(p.verses.at(-1)).a}` : refName(p.verses[0]);
  const arSize = arabic.length > 120 ? 60 : arabic.length > 60 ? 72 : 92;
  const slides = [
    { c: `<div class="kicker">Ayah of the day</div><h1 class="xl">${p.hook}</h1><p class="body">Here's what it means.</p>` },
    { c: `<div class="kicker">${refLabel}</div><div class="verse"><div class="ar" style="font-size:${arSize}px">${arabic}</div></div>` },
    { c: `<div class="kicker">The meaning</div>${trs.map(t => `<h2>"${t}."</h2>`).join('')}<p class="body">${refLabel}</p>` },
    { c: `<div class="kicker">Did you know?</div><h2 style="font-size:64px">${p.insight}</h2>` },
    { dark: 1, c: `<div class="kicker">Learn one surah at a time</div><h1>Understand <em>every surah</em> you recite.</h1>${CTA_BTN}<div class="actions"><span class="chip">Save</span><span class="chip">Share</span><span class="chip">Follow for more</span></div>` },
  ];
  return { id: p.id, type: 'edu', template: 'pro', post: { slides }, durations: [3.5, 4, 5, 5, 3.5],
    caption: `${p.caption}\n\nLearn the meaning of every surah you recite with SurahLink. Link in bio.\n\n#quran #learnquran #quranmeaning #islam #muslimtiktok #tafsir #fyp`, sound: 'calm vocal-only nasheed (keep it low)' };
}
function buildCta(p) {
  const slides = [
    { c: `<h1 class="xl">${p.hook}</h1><p class="body">${p.sub}</p>` },
    { c: `<div class="kicker">Meet SurahLink</div><div class="phone"><div class="screen"><div class="sm">${refName('94:5')}</div><div class="card"><div class="a">${arWords('94:5', 3, 3)}</div><div class="e">ease</div></div><div class="bar"><i></i></div><div class="btn">Got it →</div></div></div><p class="body" style="text-align:center;align-self:center">The app that helps you memorize the translation of the Quran.</p>` },
    { c: `<div class="kicker">How it works</div><h2>Three steps. <em>A few minutes a day.</em></h2><div class="steps"><div class="step"><div class="badge">1</div><div><h3>Choose a surah</h3><p>Start with the ones you already recite in prayer.</p></div></div><div class="step"><div class="badge">2</div><div><h3>Learn the meaning</h3><p>Each ayah broken into small, easy pieces.</p></div></div><div class="step"><div class="badge">3</div><div><h3>Make it stick</h3><p>Review until the translation stays with you.</p></div></div></div>` },
    { dark: 1, c: `<h1>${p.dream}</h1>` },
    { dark: 1, c: `<div class="kicker">Your first surah is waiting</div><h1>Download SurahLink <em>today.</em></h1>${CTA_BTN}<p class="body">Search "SurahLink" on the App Store, or tap the link in our bio.</p>` },
  ];
  const plain = p.hook.replace(/<[^>]+>/g, '');
  return { id: p.id, type: 'cta', template: 'pro', post: { slides }, durations: [3.5, 4, 5, 3.5, 4],
    caption: `${plain}\n\nSurahLink helps you memorize the translation of the Quran, surah by surah. Download it on the App Store, link in bio 📲\n\n#quran #learnquran #muslimapp #islam #muslimtiktok #ramadanprep #fyp`, sound: 'trending calm voiceover-friendly audio' };
}
function hash(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100000; return h + 1; }

// ---------- pick posts ----------
function pick(bank, kind, n) {
  const fresh = bank.filter(p => !used[kind].includes(p.id));
  let chosen = fresh.slice(0, n);
  if (chosen.length < n) { // bank exhausted: recycle the least recently used
    console.warn(`WARNING: only ${fresh.length} unused ${kind} posts; recycling oldest. Add more to content/${kind}.js`);
    const recycled = used[kind].filter(id => !chosen.find(c => c.id === id)).slice(0, n - chosen.length).map(id => bank.find(p => p.id === id)).filter(Boolean);
    chosen = chosen.concat(recycled);
  }
  return chosen;
}
const G = pick(require('./content/growth'), 'growth', 21).map(buildGrowth);
const E = pick(require('./content/edu'), 'edu', 7).map(buildEdu);
const C = pick(require('./content/cta'), 'cta', 7).map(buildCta);
console.log(`verified ${G.length} growth, ${E.length} edu, ${C.length} cta posts`);
if (process.argv.includes('--verify-only')) process.exit(0);

// daily order: growth, edu, growth, cta, growth
const order = [];
for (let d = 0; d < 7; d++) order.push(G[d * 3], E[d], G[d * 3 + 1], C[d], G[d * 3 + 2]);
const plan = order.filter(Boolean);

// ---------- render ----------
(async () => {
  const browser = await chromium.launch();
  const manifest = [];
  for (let i = 0; i < plan.length; i++) {
    const p = plan[i], name = `${String(i + 1).padStart(2, '0')}-${p.id}`;
    const page = await browser.newPage({ viewport: { width: 1080, height: 2000 } });
    page.setDefaultTimeout(180000);
    await page.addInitScript(post => { window.POST = post; }, p.post);
    await page.goto('file://' + path.join(__dirname, 'templates', p.template + '.html'));
    await page.waitForFunction(() => window.READY); await page.waitForLoadState('networkidle'); await page.evaluate(() => document.fonts.ready);
    const els = await page.$$(p.template === 'growth' ? '.s' : '.slide');
    const sdir = path.join(OUT, name); fs.mkdirSync(sdir, { recursive: true });
    const images = [];
    for (let j = 0; j < els.length; j++) { const f = `slide-${String(j + 1).padStart(2, '0')}.jpg`; await els[j].screenshot({ path: path.join(sdir, f), type: 'jpeg', quality: 90 }); images.push(`${name}/${f}`); }
    await page.close();
    manifest.push({ order: i + 1, day: Math.floor(i / 5) + 1, folder: name, images, id: p.id, type: p.type, caption: p.caption, sound: p.sound });
    console.log('rendered', name);
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({ week, posts: manifest }, null, 2));
  // mark used
  for (const p of plan) { const k = p.type; used[k] = used[k].filter(x => x !== p.id).concat(p.id); }
  fs.mkdirSync(path.dirname(STATE), { recursive: true }); fs.writeFileSync(STATE, JSON.stringify(used, null, 2));
  console.log('done:', OUT);
})();
