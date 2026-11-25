import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {WordCard} from '../stories6/kit2';
import {MushafShot, Masjid, NightRoom} from '../stories6/kit';
import {WordReveal} from './formats';

// FORMAT: word-by-word breakdown of something viewers say every day.
export const BS_DURATION = 28.5;
const SHOTS: Shot[] = [
  [0, 3.7, <Masjid rays={1} z={[1.25, 1.1]} />],
  [3.7, 8.0, <MushafShot lit={10} />, 'zoom'],
  [8.0, 11.2, <Masjid rays={0.6} />, 'whip'],
  [11.2, 16.1, <NightRoom shield={1} sparks />, 'zoom'],
  [16.1, 20.5, <Masjid pose="dua" rays={1} />, 'whip'],
  [20.5, 24.1, <Masjid pose="sujood" rays={0.8} />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.7, <><NativeText text="You say it before everything. Do you know what it means?" top={220} size={70} /><WordReveal refKey="1:1" start={-10} per={0} trAt={99} tr="" label="" /></>],
  [3.7, 5.8, <AyahCard refKey="1:1" tr="In the name of Allah, the Entirely Merciful, the Especially Merciful" />],
  [5.8, 7.0, <WordCard refKey="1:1" idx={0} meaning="*Bismi*: in the name of" note="" />],
  [7.0, 8.0, <WordCard refKey="1:1" idx={1} meaning="*Allah*" note="" />],
  [8.0, 11.2, <Caption text="Then two names from the same root: *rahma*, mercy." />],
  [11.2, 16.1, <WordCard refKey="1:1" idx={2} meaning="*Ar-Rahman*: the Entirely Merciful" note="His mercy covers everything and everyone" />],
  [16.1, 20.5, <WordCard refKey="1:1" idx={3} meaning="*Ar-Rahim*: the Especially Merciful" note="A mercy He saves for the believers" />],
  [20.5, 24.1, <Caption text="Every time you say Bismillah, you call on His mercy *twice*." />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [3.7, 'whoosh', 0.4, 1.5], [5.8, 'pop', 0.5, 0.5], [7.0, 'pop', 0.5, 0.5], [8.0, 'whoosh', 0.35, 1.5], [11.2, 'shimmer', 0.4, 3], [16.1, 'shimmer', 0.4, 3], [20.5, 'whoosh', 0.35, 1.5]];
export const Bismillah: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={24.1} duration={BS_DURATION} audio="audio/bismillah-narration.mp3" sfx={SFX} />;
