import React from 'react';
import {Timeline, Shot, Cue} from '../fx/Timeline';
import {Chat, Msg} from './formats';
import {NativeText} from '../stories7/kit3';

// FORMAT: text-message story #2 (no narration).
const MSGS: Msg[] = [
  {t: 0, from: 'them', text: 'i did it again'},
  {t: 0, from: 'them', text: 'the same sin. i promised myself i would stop'},
  {t: 0, from: 'them', text: "i think Allah is done with me"},
  {t: 2.6, from: 'me', text: 'no. read this'},
  {t: 4.2, from: 'me', ayah: {key: '4:110', range: [0, 12], tr: 'And whoever does a wrong or wrongs himself but then seeks forgiveness of Allah *will find Allah Forgiving and Merciful*'}},
  {t: 11.0, from: 'them', text: 'even if it keeps happening?'},
  {t: 12.8, from: 'me', text: "it says whoever. that includes you"},
  {t: 14.8, from: 'them', text: 'astaghfirullah'},
  {t: 16.2, from: 'them', text: 'thank you'},
];
export const TX2_DURATION = 22;
const SHOTS: Shot[] = [[0, 18, <Chat name="Friend" msgs={MSGS} />]];
const HOOK = <NativeText text="when they think it's too late…" top={40} size={56} />;
const SFX: Cue[] = MSGS.filter((m, i) => m.t > 0 || i === 0).map((m): Cue => [m.t, 'pop', m.t === 0 ? 0.7 : 0.55, 0.5]);
export const Texts2: React.FC = () => <Timeline shots={SHOTS} overlays={[[0, 3.5, HOOK]]} flashes={[]} endStart={18} duration={TX2_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" bedVolume={0.22} />;
