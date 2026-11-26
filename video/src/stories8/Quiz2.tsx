import React from 'react';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {MushafShot} from '../stories6/kit';
import {QuizCard, Q} from './formats';

// FORMAT: Quran quiz #2 (no narration). Basic, well-known facts.
const QS: Q[] = [
  {q: 'What is the longest surah in the Quran?', options: ['Al-Imran', 'Al-Baqarah', 'An-Nisa'], answer: 1},
  {q: 'What is the shortest surah in the Quran?', options: ['Al-Kawthar', 'Al-Ikhlas', 'Al-Asr'], answer: 0},
  {q: 'What was the first word revealed to the Prophet ﷺ?', options: ['Qul (Say)', 'Bismillah', 'Iqra (Read)'], answer: 2},
];
export const QZ2_DURATION = 28;
const Dim: React.FC = () => <><MushafShot lit={10} /><div style={{position: 'absolute', inset: 0, background: 'rgba(8,20,16,.72)'}} /></>;
const SHOTS: Shot[] = [[0, 24, <Dim />]];
const OVERLAYS: Overlay[] = [
  [0, 3, <><NativeText text="QURAN QUIZ #2" top={560} size={100} color="#f9d77a" /><NativeText text="Most people miss #3" top={760} size={90} /></>],
  ...QS.map((item, i): Overlay => [3 + i * 6, 9 + i * 6, <QuizCard n={i + 1} total={3} item={item} reveal={4} />]),
  [21, 24, <><NativeText text="How many did you get?" top={560} size={100} /><NativeText text="Comment your score" top={820} size={90} color="#f9d77a" /></>],
];
const SFX: Cue[] = [[0, 'impact', 0.5, 2], ...[0, 1, 2].flatMap((i): Cue[] => [[3 + i * 6, 'pop', 0.6, 0.5], [3.6 + i * 6, 'tick', 0.5, 3], [7 + i * 6, 'ding', 0.6, 2]]), [21, 'pop', 0.6, 0.5]];
export const Quiz2: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={24} duration={QZ2_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" bedVolume={0.18} />;
