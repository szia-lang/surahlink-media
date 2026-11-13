// Pulls ayat from the quran-json dataset so Arabic is never typed by hand.
// Usage: node scripts/ayat.js 105:1 105:3 ... > src/data/ayat.json
const q = require('quran-json/dist/quran_en.json');
const out = {};
for (const ref of process.argv.slice(2)) {
  const [s, a] = ref.split(':').map(Number);
  const v = q[s - 1].verses[a - 1];
  out[ref] = {surah: q[s - 1].transliteration, words: v.text.split(' '), translation: v.translation};
}
console.log(JSON.stringify(out, null, 1));
