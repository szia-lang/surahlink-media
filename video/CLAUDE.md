# SuraLink video studio (faceless Reels / TikTok / Shorts)

Remotion + React pixel-art story videos for the SuraLink app's faceless Instagram, Facebook and TikTok.
SuraLink helps people understand the meaning of the Quran (surah lessons, word meanings, Quran reader, prayer times, Qibla, trivia).
Owner reviews scripts before any narration is generated. Ask before spending ElevenLabs credits.

## Commands
- `npm install` then `npm run studio` (live editor) or `npx remotion render src/index.ts <CompositionId> out/<name>.mp4`
- `remotion.config.ts` uses software GL + `/opt/pw-browsers/chromium` (cloud container). On a Mac/PC, delete `setBrowserExecutable` if rendering fails.
- `node scripts/ayat.js $(cat scripts/ayat-keys.txt) > src/data/ayat.json` rebuilds the Arabic/translation data. Add new ayah keys to `scripts/ayat-keys.txt` first.
- Rendered videos go to `out/` (gitignored). They are NOT in git: re-render from the composition id when needed.

## Content rules (Quran content: accuracy first)
- NEVER type Arabic by hand. Arabic comes only from `src/data/ayat.json` (quran-json dataset) via word ranges.
- English ayah quotes are exact Sahih International text (bracketed words may be dropped). Bible quotes (rare) use KJV.
- Only mainstream, well-known claims: classical tafsir (e.g. Ibn Kathir), Bukhari, Muslim, Tirmidhi, Abu Dawud, an-Nasa'i. Hadith cards name the source.
- Prophets and angels are NEVER drawn: only as a soft light (`Light` in `src/fx/fx.tsx`). Write "the Prophet ﷺ" on screen; narration says "peace be upon him".
- No facial features on anyone, ever. Companions/people are faceless pixel figures. Maryam: veiled figure seen from behind. Gog & Magog / Dajjal: dark silhouettes only.
- Never mention price or the free trial (the app is paid after a 7-day trial). CTA is only "Download SuraLink" / "Link in bio".

## Narration (ElevenLabs, connected as an MCP connector)
- Voice: **Christopher - optimistic storyteller**, voice_id `RolvCZ4e0AkAR2dzyTx0`, model `eleven_v4`.
- ALWAYS `generations_count: 1` (owner wants one take only, to save credits).
- Delivery tags work: `[sad]`, `[softly]`, `[urgent]` (not spoken).
- Processing: `ffmpeg -af "silenceremove=stop_periods=-1:stop_duration=0.15:stop_threshold=-32dB:stop_silence=0.12,atempo=1.1"`. Target 40-45 s max (use atempo up to 1.15 if needed).
- Get word timings with faster-whisper (`base.en`, `word_timestamps=True`) on the processed file and time every cut/caption to them. Check the CTA line: the small model sometimes mishears "SuraLink"; "Quraysh" can sound like "Christ" in fast reads (fix by saying "the leaders of Quraysh").

## Format & building blocks
- 1080x1920, 60 fps, 360x640 pixel stage (`Stage` in `src/fx/fx.tsx`), sub-pixel motion, eased camera, whip/zoom transitions.
- `src/fx/scenes.tsx`: skies, seas, ships, whale, bubbles, mushaf, seal, `GlowTitle`, `HadithCard`, `Punch` (kinetic text; use `instant` in hooks).
- `src/fx/Timeline.tsx`: assembles shots + overlays + flashes + end card + narration from second-based arrays.
- `src/components/AyahCard.tsx` (Quran card, `QURAN_FONT` with fallbacks for all Quranic marks), `Caption.tsx`, `src/EndCard.tsx` (SuraLink CTA).
- Host character **Amir** (`src/characters/amir.ts`): faceless, green thobe, white kufi. Poses: idle, point, read, phone, dua, react, back + walk cycle.
- Sound effects in `public/sfx/` (impact, whoosh, underwater, storm, whale, shimmer, crowd, door). Use them: impact on frame 1, whoosh on cuts, ambience under scenes, shimmer on ayah cards. No music (many viewers avoid it).

## What works (performance notes)
- Best so far: Gog & Magog (loop), Ayat al-Kursi + Shaytan story, Surah Ad-Duha, Surah Abasa, Pharaoh's magicians.
- Winners = one clear story + a twist + something viewers already recite or an end-times mystery.
- Weak: comparison videos (Mary in Bible vs Quran). Don't repeat that format.
- Retention problem: >60% leave in the first 2-3 s. Rules for every new video:
  1. Open on the most dramatic moment, never a static title card.
  2. First line <= 8 words, under 2 s, tension inside it.
  3. Hook text readable on frame 1 (no fade-in), 3-6 words, centred.
  4. Impact sound on frame 1; a new image every 0.6-1 s for the first 3 s.
- Hook framework (owner's): Context (what it is, said + shown + written in second 1) -> Lean (shock / pain point / proof) -> Contrarian snapback.
- Hook A/B/C tests running: `PoorA/B/C`, `YunusA/B/C` in `src/hooks/HookTests.tsx` (A = demand/climax, B = question, C = shocking claim). Use the winning style going forward once results are in.

## Captions (every post)
```
<one short hook line> <emoji>

Understand what you recite with SuraLink, link in bio.

#islam #muslim #muslimamerican #americanmuslim
```

## Workflow the owner expects
1. Pitch 5 ideas (story + hook) -> owner picks.
2. Write scripts and show them FIRST -> owner approves.
3. Generate narration (1 take), process, transcribe, build, render a few still frames to check, then render the full video.
4. Send the video, then a short caption in the format above.
5. Commit and push to the `video-studio` branch.

## Compositions (ids for `remotion render`)
AlFil, GogMagog, Ibrahim, Musa, Kursi, Abasa, Duha, Kahf, Yusuf, Nuh, Maryam, Kawthar, Ikhlas, Kursi2,
Dajjal, Pharaoh, Mulk, Poor, Yunus, PoorA, PoorB, PoorC, YunusA, YunusB, YunusC, EndCard, AmirSheet.

## Scheduling in Meta Business Suite
Needs a session running on the owner's computer with the Claude in Chrome extension (logged into business.facebook.com).
Upload the MP4 from `out/` (or the owner's Downloads), paste the caption, schedule for Facebook + Instagram.
Always stop before the final Schedule/Publish click and let the owner confirm.
