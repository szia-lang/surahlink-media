import React from 'react';
import {Timeline, Shot, Cue} from '../fx/Timeline';
import {Chat, Msg} from './formats';
import {NativeText} from '../stories7/kit3';

// FORMAT: text-message story (no narration).
const MSGS: Msg[] = [
  {t: 0, from: 'them', text: 'do you think Allah even hears me anymore'},
  {t: 0, from: 'them', text: "i've been making the same dua for months"},
  {t: 0, from: 'them', text: 'nothing changes'},
  {t: 5.4, from: 'me', text: 'can i send you something?'},
  {t: 7.0, from: 'them', text: 'ok'},
  {t: 8.2, from: 'me', ayah: {key: '2:186', range: [0, 10], tr: 'And when My servants ask you concerning Me - *indeed I am near. I respond to the invocation of the supplicant when he calls upon Me*'}},
  {t: 15.0, from: 'them', text: 'wait'},
  {t: 16.4, from: 'them', text: 'i really needed this'},
  {t: 18.0, from: 'me', text: "He's closer than you think"},
];
export const TX_DURATION = 24.5;
const SHOTS: Shot[] = [[0, 20.5, <Chat name="Friend" msgs={MSGS} />]];
const HOOK = <NativeText text="my friend texted me this at 2am…" top={40} size={58} />;
const SFX: Cue[] = MSGS.filter((m, i) => m.t > 0 || i === 0).map((m): Cue => [m.t, 'pop', m.t === 0 ? 0.7 : 0.55, 0.5]);
export const Texts: React.FC = () => <Timeline shots={SHOTS} overlays={[[0, 3.5, HOOK]]} flashes={[]} endStart={20.5} duration={TX_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" bedVolume={0.22} />;
