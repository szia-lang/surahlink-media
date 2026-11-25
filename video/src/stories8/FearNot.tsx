import React from 'react';
import {Caption} from '../components/Caption';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {Stage, Rf, Light, cam, ez, useT} from '../fx/fx';
import {Bands, Stars, Sea, NIGHT_SKY} from '../fx/scenes';
import {WordReveal} from './formats';

// FORMAT: aesthetic ayah, revealed word by word (no narration).
// Musa and Harun (prophets) appear only as two lights walking toward Pharaoh's palace.
const Nile: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 20, 1.05, 1.3), 180, 430)}>
      <Bands c={NIGHT_SKY} /><Stars t={t} n={90} h={380} />
      <g shapeRendering="auto"><circle cx={280} cy={120} r={20} fill="#f6efdc" opacity={0.85} /></g>
      <Rf x={210} y={300} w={140} h={150} c="#141a2e" /><Rf x={230} y={260} w={30} h={190} c="#141a2e" /><Rf x={300} y={250} w={30} h={200} c="#141a2e" />
      <Rf x={0} y={450} w={360} h={60} c="#c9a466" o={0.35} />
      <Sea t={t} level={520} amp={4} c="#16233c" speed={0.3} />
      <Light x={60 + t * 4} y={440} r={8} t={t} /><Light x={95 + t * 4} y={442} r={8} t={t + 1} />
    </Stage>
  );
};
export const FN_DURATION = 24;
const SHOTS: Shot[] = [[0, 20, <Nile />]];
const OVERLAYS: Overlay[] = [
  [0, 3, <NativeText text="Read this if you're scared right now" top={300} size={84} />],
  [3, 16.5, <WordReveal refKey="20:46" start={0.3} per={1.1} trAt={8.3} label="SURAH TA-HA · 20:46" tr="Fear not. Indeed, I am with you both; *I hear and I see*" />],
  [16.5, 20, <Caption text="Allah said this to *Musa and Harun*, before they faced Pharaoh." />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [3, 'whoosh', 0.3, 1.5], [11.3, 'shimmer', 0.45, 3], [16.5, 'whoosh', 0.3, 1.5]];
export const FearNot: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={20} duration={FN_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" bedVolume={0.3} />;
