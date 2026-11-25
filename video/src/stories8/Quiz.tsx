import React from 'react';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {MushafShot} from '../stories6/kit';
import {QuizCard, Q} from './formats';

// FORMAT: Quran quiz (no narration). Answers are basic, well-known facts.
const QS: Q[] = [
  {q: 'Which surah does NOT start with Bismillah?', options: ['Al-Fatiha', 'At-Tawbah', 'Ya-Sin'], answer: 1},
  {q: 'How many surahs are in the Quran?', options: ['114', '99', '120'], answer: 0},
  {q: 'Which prophet is named most often in the Quran?', options: ['Ibrahim', 'Isa', 'Musa'], answer: 2},
];
export const QZ_DURATION = 28;
const Dim: React.FC = () => <><MushafShot lit={10} /><div style={{position: 'absolute', inset: 0, background: 'rgba(8,20,16,.72)'}} /></>;
const SHOTS: Shot[] = [[0, 24, <Dim />]];
const OVERLAYS: Overlay[] = [
  [0, 3, <><NativeText text="QURAN QUIZ" top={540} size={120} color="#f9d77a" /><NativeText text="Can you get 3/3?" top={760} size={90} /></>],
  ...QS.map((item, i): Overlay => [3 + i * 6, 9 + i * 6, <QuizCard n={i + 1} total={3} item={item} reveal={4} />]),
  [21, 24, <><NativeText text="How many did you get?" top={560} size={100} /><NativeText text="Comment your score" top={820} size={90} color="#f9d77a" /></>],
];
const SFX: Cue[] = [[0, 'impact', 0.5, 2], ...[0, 1, 2].flatMap((i): Cue[] => [[3 + i * 6, 'pop', 0.6, 0.5], [3.6 + i * 6, 'tick', 0.5, 3], [7 + i * 6, 'ding', 0.6, 2]]), [21, 'pop', 0.6, 0.5]];
export const Quiz: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={24} duration={QZ_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" bedVolume={0.18} />;
