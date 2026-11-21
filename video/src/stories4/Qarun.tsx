import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {leader} from '../abasa/Abasa';
import {Stage, Rf, cam, ez, useT} from '../fx/fx';
import {Bands, Punch, DAWN_SKY} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {GoldPile, Key} from './props';

export const QR_DURATION = 30.77;
const DESERT = ['#f3c58d', '#efb07c', '#e89a6a', '#de8a5e', '#c97a56'];
const CROWD = ['g', 'b', 'c', 'n', 'M', 'r'];

// Qarun is a faceless rich figure (gold-trimmed robe).
const Crack: React.FC<{w: number; t: number}> = ({w, t}) => (
  <g>{Array.from({length: 18}, (_, i) => { const x = 180 + (i - 9) * 10; const d = Math.max(0, w - Math.abs(i - 9) * 0.06) * 140; return <Rf key={i} x={x} y={520} w={10} h={d} c="#0a0604" />; })}{w > 0 && Array.from({length: 20}, (_, i) => { const life = (t * 1.5 + random('rk' + i)) % 1; return <Rf key={'r' + i} x={100 + random('rx' + i) * 160} y={520 - life * 80 + life * life * 200} w={6} h={6} c="#8a6a42" o={1 - life} />; })}</g>
);
const Hook: React.FC = () => {
  const t = useT();
  const w = ez(t, 0.1, 1.2, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3.3, 1.1, 1.25), 180, 460, Math.sin(t * 50) * 4 * (1 - Math.min(1, t / 3)))}>
      <Bands c={['#2a1414', '#3e1c16', '#5a2a1a', '#7a3a1e', '#8a4a24']} />
      <Rf x={0} y={520} w={360} h={120} c="#8a6a42" />
      <GoldPile x={180} y={520 + w * 60} s={1.4} t={t} />
      <Crack w={w} t={t} />
    </Stage>
  );
};
const Keys: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 450, Math.sin(t * 6) * 2)}>
      <Bands c={DESERT} />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      {Array.from({length: 5}, (_, i) => { const x = -40 + i * 70 + t * 30; const strain = Math.abs(Math.sin(t * 5 + i)) * 4; return <g key={i}><PixG rows={villager(CROWD[i], Math.floor(t * 4 + i) % 2)} palette={PAL} x={x} y={450 + strain} s={6} smooth /><Key x={x + 12} y={440 + strain} s={1.3} rot={-8} /></g>; })}
    </Stage>
  );
};
const Warned: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 6, 1, 1.12), 180, 440)}>
      <Rf x={0} y={0} w={360} h={640} c="#3a2a1e" />
      <Rf x={0} y={500} w={360} h={140} c="#6e5232" />
      <Rf x={130} y={300} w={100} h={200} c="#d4a73a" /><Rf x={140} y={310} w={80} h={190} c="#7e2f22" />
      <PixG rows={leader('y')} palette={PAL} x={150} y={340} s={5} smooth />
      <GoldPile x={60} y={500} s={0.7} t={t} /><GoldPile x={300} y={500} s={0.7} t={t + 1} />
      {Array.from({length: 4}, (_, i) => <PixG key={i} rows={villager(CROWD[i], 0)} palette={PAL} x={20 + i * 90} y={540} s={5} smooth />)}
    </Stage>
  );
};
const Arrogant: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1.3, 1.5), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1a14" />
      <g shapeRendering="auto"><circle cx={180} cy={400} r={150} fill="#f9c440" opacity={0.18} /></g>
      <PixG rows={leader('y')} palette={PAL} x={150} y={340 - Math.sin(t * 2) * 3} s={5} smooth />
      {Array.from({length: 16}, (_, i) => <Rf key={i} x={100 + random('sp' + i) * 160} y={300 + random('sq' + i) * 160} w={3} h={3} c="#fff4c2" o={(Math.sin(t * 9 + i) + 1) / 2} />)}
    </Stage>
  );
};
const Parade: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 450, ez(t, 0, 4.3, 30, -30))}>
      <Bands c={DESERT} />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      <PixG rows={leader('y')} palette={PAL} x={-60 + t * 60} y={430} s={4.5} smooth />
      <GoldPile x={-100 + t * 60} y={500} s={0.5} t={t} />
      {Array.from({length: 7}, (_, i) => <PixG key={i} rows={villager(CROWD[i % 6], 0)} palette={PAL} x={10 + i * 50} y={560} s={4} smooth />)}
    </Stage>
  );
};
const Swallow: React.FC = () => {
  const t = useT();
  const w = ez(t, 0.2, 1.4, 0, 1);
  const sink = ez(t, 0.6, 3.5, 0, 1);
  return (
    <Stage cam={cam(1.05, 180, 450, Math.sin(t * 50) * 5 * (1 - Math.min(1, t / 3.5)))}>
      <Bands c={['#3a2a2a', '#5a3a2a', '#7a4a2a', '#8a5a3a', '#6e4a2a']} />
      <Rf x={0} y={520} w={360} h={120} c="#8a6a42" />
      <g opacity={1 - sink}>
        <Rf x={110} y={360 + sink * 200} w={140} h={160} c="#d9c09a" /><Rf x={100} y={350 + sink * 200} w={160} h={14} c="#d4a73a" />
        <PixG rows={leader('y')} palette={PAL} x={150} y={420 + sink * 220} s={4} smooth />
        <GoldPile x={290} y={520 + sink * 120} s={0.6} t={t} />
      </g>
      <Crack w={w} t={t} />
    </Stage>
  );
};
const Relief: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1.15, 1), 180, 470)}>
      <Bands c={DAWN_SKY} />
      <Rf x={0} y={520} w={360} h={120} c="#c9a466" />
      <Rf x={120} y={520} w={120} h={30} c="#3a2a1a" />
      {Array.from({length: 6}, (_, i) => <g key={i} transform="translate(0 18)"><PixG rows={villager(CROWD[i], 0)} palette={PAL} x={10 + i * 58} y={490} s={5} smooth /></g>)}
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 3.3, <Hook />],
  [3.3, 7.0, <Keys />, 'whip'],
  [7.0, 13.0, <Warned />, 'zoom'],
  [13.0, 15.6, <Arrogant />, 'whip'],
  [15.6, 19.9, <Parade />, 'whip'],
  [19.9, 23.9, <Swallow />],
  [23.9, 27.5, <Relief />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.3, <><Punch instant text="SWALLOWED BY THE EARTH" top={290} size={60} /><Punch instant text="THE RICHEST MAN ALIVE" top={390} size={56} color="#ffffff" /></>],
  [3.3, 7.0, <AyahCard refKey="28:76" range={[8, 17]} gold={[13, 14, 15, 16, 17]} partial trSize={40} tr="And We gave him of treasures whose *keys would burden a band of strong men*" />],
  [7.0, 13.0, <AyahCard refKey="28:76" range={[19, 28]} gold={[22, 23]} partial tr="*Do not exult.* Indeed, Allah does not like the exultant" />],
  [13.0, 15.6, <Caption text="But he said it was all from *his own knowledge*." />],
  [15.6, 19.9, <AyahCard refKey="28:79" range={[10, 15]} gold={[10, 11, 12]} partial tr="*Oh, would that we had* like what was given to Qarun" />],
  [19.9, 23.9, <AyahCard refKey="28:81" range={[0, 3]} gold={[0]} partial tr="And *We caused the earth to swallow him* and his home" />],
  [23.9, 27.5, <Caption text="And the ones who envied him? They *thanked Allah it wasn't them*." />],
];
const SFX: Cue[] = [
  [0, 'impact', 0.9, 2.5], [0, 'storm', 0.25, 3.3], [3.3, 'whoosh', 0.45, 1.5], [7.0, 'crowd', 0.25, 6], [13.0, 'whoosh', 0.4, 1.5],
  [15.6, 'crowd', 0.3, 4.3], [19.9, 'impact', 0.8, 2.5], [19.9, 'storm', 0.4, 4], [23.9, 'shimmer', 0.35, 3.6],
];

export const Qarun: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[19.9]} endStart={27.5} duration={QR_DURATION} audio="audio/qarun-narration.mp3" sfx={SFX} />;
