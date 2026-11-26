import React from 'react';
import {Caption} from '../components/Caption';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {QadrNight} from '../stories6/kit2';
import {WordReveal} from './formats';

// FORMAT: aesthetic ayah #2, word by word (no narration).
export const RM_DURATION = 22;
const Dim: React.FC = () => <><QadrNight amir /><div style={{position: 'absolute', inset: 0, background: 'rgba(5,8,20,.35)'}} /></>;
const SHOTS: Shot[] = [[0, 18, <Dim />]];
const OVERLAYS: Overlay[] = [
  [0, 3, <NativeText text="Allah is talking to you in this ayah" top={300} size={84} />],
  [3, 14.5, <WordReveal refKey="2:152" start={0.3} per={1.0} trAt={6.6} label="SURAH AL-BAQARAH · 2:152" tr="*So remember Me; I will remember you.* And be grateful to Me and do not deny Me" />],
  [14.5, 18, <Caption text="When you remember Him, *He remembers you*." />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [3, 'whoosh', 0.3, 1.5], [9.6, 'shimmer', 0.45, 3], [14.5, 'whoosh', 0.3, 1.5]];
export const RememberMe: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={18} duration={RM_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" bedVolume={0.3} />;
