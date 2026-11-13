# SuraLink video studio (Remotion + Three.js)

Faceless pixel-art reels for Instagram, Facebook and TikTok, hosted by **Amir** (the recurring character).

- `npm install`, then `npm run studio` for the live editor, or `npx remotion render src/index.ts <Composition> out/file.mp4`
- `src/characters/amir.ts` — Amir's sprite poses + walk cycle (no facial features, ever)
- `src/components/PixelSprite.tsx` — draws any pixel grid crisply at any size
- `src/EndCard.tsx` — 4s CTA that ends every video ("Download SuraLink", "Link in bio"; never mention price or trial)
- `public/app/` — app screenshots for the end card
- Compositions: `AmirSheet`, `AmirWalkTest`, `EndCard`, `TestScene`

Style rules: 9:16, pixel art in green/cream/gold, cream text cards with a double green border,
the Arabic ayah with the key word in gold, prophets never drawn (shown as light with "عليه السلام").
Quran text follows the repo-wide rule: never type Arabic by hand; pull it from the `quran-json` dataset.
