# SurahLink TikTok engine

This repo builds and queues 35 TikTok photo slideshows per week for @softdeendaily (5/day: growth, edu, growth, cta, growth).
Slides are served by GitHub Pages from `docs/` (https://szia-lang.github.io/surahlink-media/) and queued in Buffer
(api.buffer.com, key is injected by the environment proxy) using **notification** publishing: the owner adds a trending sound in TikTok and posts.

## Weekly run (what the scheduled task does)
1. `cd engine && npm install --silent` (needs `quran-json`; Playwright + Chromium are preinstalled).
2. Check how many unused posts remain: `node build.js check --verify-only` prints a WARNING per bank that is short.
3. If short, ADD new posts to `engine/content/growth.js` (need 21 unused), `edu.js` (7), `cta.js` (7). Rules below.
4. Run `engine/weekly.sh week-YYYY-MM-DD` (date = the coming Monday). It verifies, renders, pushes, waits for Pages, queues in Buffer.
5. Report: how many posts were queued, any failures, and the list of new posts written (titles + ayah refs) so the owner can review.

## Content rules (IMPORTANT: this is Quran content)
- Never type Arabic. Arabic is pulled from the dataset by word range: `ar: { key: ['S:A', firstWord, lastWord] }` (0-based, inclusive).
  Print a verse with indices: `node -e "const q=require('quran-json/dist/quran_en.json');const v=q[S-1].verses[A-1];console.log(v.translation);console.log(v.text.split(' ').map((w,i)=>i+':'+w).join('  '))"`
- Translation quotes (`tr`) must be taken from the dataset's Sahih International text; `build.js` rejects anything else (bracketed words may be dropped).
- Only make claims about an ayah that are mainstream and well known (context of revelation, a famous linguistic note, a well-known hadith). If unsure, don't claim it; keep it to the ayah and a short heartfelt line.
- No new ids that duplicate existing ones; keep ids prefixed `g-`, `e-`, `c-`.
- Growth posts: NO SurahLink branding. 3-4 slides, short TikTok-style lines, hook first. Caption: short lowercase line + 🤍.
- Edu posts: one short ayah people recite often + one safe insight. CTA posts: vary the hook/sub/dream lines only.
- Don't promise app features beyond: learn/memorize the translation of the Quran, surah by surah.
- Sound suggestions: vocal-only nasheeds, recitation, rain/ambient (many viewers avoid music).

## Files
- `engine/content/*.js` content banks · `engine/templates/` slide designs (growth = scenes, pro = branded)
- `engine/build.js` verify + render to `docs/media/<week>/<nn-id>/slide-XX.jpg` + manifest.json
- `engine/queue.js` adds a week to Buffer (`--test <n>` sends one post now) · `engine/state/used.json` tracks used posts + rotation
