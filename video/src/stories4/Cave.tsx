import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager, shadowMan, SHADOW} from '../alfil/sprites';
import {Stage, Rf, cam, ez, useT} from '../fx/fx';
import {Bands, Stars, Punch, nunito, DAWN_SKY, NIGHT_SKY, DUSK_SKY} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {CaveMouth, dog} from './props';

// Silent (text-only) story. The sleepers are faceless figures.
export const CV_DURATION = 45;
const YOUTHS = ['g', 'b', 'c', 'n'];

const Sleepers: React.FC<{t: number}> = ({t}) => <>{YOUTHS.map((c, i) => <g key={i} transform={`translate(${120 + i * 34} ${470 + (i % 2) * 6}) rotate(90)`}><PixG rows={villager(c, 0)} palette={PAL} x={0} y={-4 + Math.sin(t * 1.2 + i) * 0.6} s={5} smooth /></g>)}</>;
const DogAt: React.FC<{x: number; y: number}> = ({x, y}) => <PixG rows={dog} palette={PAL} x={x} y={y} s={3} smooth />;

const TimeLapse: React.FC<{speed?: number}> = ({speed = 3}) => {
  const t = useT();
  const ph = (t * speed) % 1;
  const day = Math.sin(ph * Math.PI);
  return (
    <Stage cam={cam(ez(t, 0, 6, 1.05, 1.25), 180, 420)}>
      <Bands c={day > 0.4 ? DAWN_SKY : NIGHT_SKY} />
      {day <= 0.4 && <Stars t={t * 4} n={50} h={320} />}
      <g shapeRendering="auto"><circle cx={-20 + ph * 400} cy={300 - day * 200} r={18} fill={day > 0.4 ? '#fff1a0' : '#e8ecf6'} /></g>
      <CaveMouth glow={0.6} />
      <Sleepers t={t} />
      <DogAt x={236} y={548} />
    </Stage>
  );
};
const City: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.15, 1.3), 180, 440, ez(t, 0, 4, 20, -20))}>
      <Bands c={DUSK_SKY} />
      {[20, 90, 160, 230, 300].map((x, i) => <Rf key={i} x={x} y={330 + (i % 2) * 30} w={56} h={200} c={i % 2 ? '#4a3a44' : '#5a4650'} />)}
      <Rf x={0} y={520} w={360} h={120} c="#3a2e30" />
      <PixG rows={shadowMan(0, true)} palette={SHADOW} x={40} y={430} s={9} smooth />
      {YOUTHS.map((c, i) => <PixG key={i} rows={villager(c, Math.floor(t * 6 + i) % 2)} palette={PAL} x={170 + i * 30 + t * 30} y={480} s={5} smooth />)}
    </Stage>
  );
};
const Hide: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1, 1.15), 180, 470)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} n={50} h={260} />
      <CaveMouth />
      {YOUTHS.map((c, i) => <PixG key={i} rows={villager(c, Math.floor(t * 4 + i) % 2)} palette={PAL} x={130 + i * 24} y={ez(t, 0, 3, 560, 470)} s={5} smooth opacity={ez(t, 1.8, 3, 1, 0.3)} />)}
      <DogAt x={226} y={548} />
    </Stage>
  );
};
const Sleep: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.2, 1.4), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#0c0a10" />
      <g shapeRendering="auto"><ellipse cx={180} cy={480} rx={140} ry={80} fill="#fff6d0" opacity={0.08 + 0.04 * Math.sin(t * 2)} /></g>
      <Rf x={0} y={500} w={360} h={140} c="#2a2228" />
      <Sleepers t={t} />
      {Array.from({length: 3}, (_, i) => { const life = (t * 0.6 + i / 3) % 1; return <text key={i} x={200 + life * 30} y={440 - life * 60} fontSize={14} fill="#f6efdc" opacity={1 - life} fontFamily={nunito}>z</text>; })}
    </Stage>
  );
};
const Counter: React.FC<{from: number; to: number; dur: number}> = ({from, to, dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = Math.round(ez(f / fps, 0.2, dur, from, to));
  return (
    <div style={{position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center', fontFamily: nunito, fontWeight: 900, color: '#f9d77a', textShadow: '0 8px 0 rgba(0,0,0,.45)'}}>
      <div style={{fontSize: 220, lineHeight: 1}}>{n}</div>
      <div style={{fontSize: 64, color: '#ffffff'}}>YEARS ASLEEP</div>
    </div>
  );
};
const Wake: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 6, 1.3, 1.15), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#3a2e2a" />
      <g shapeRendering="auto"><ellipse cx={180} cy={300} rx={160} ry={200} fill="#fff1c0" opacity={0.25} /></g>
      <Rf x={0} y={500} w={360} h={140} c="#5a4a40" />
      {YOUTHS.map((c, i) => <PixG key={i} rows={villager(c, 0)} palette={PAL} x={110 + i * 40} y={460 - Math.abs(Math.sin(t * 3 + i)) * 2} s={6} smooth />)}
    </Stage>
  );
};
const Market: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5, 1.1, 1.35), 180, 470)}>
      <Bands c={DAWN_SKY} />
      {[10, 80, 150, 220, 290].map((x, i) => <Rf key={i} x={x} y={300 + (i % 3) * 20} w={60} h={220} c={['#e0c8a0', '#d4b890', '#c8a880'][i % 3]} />)}
      <Rf x={0} y={520} w={360} h={120} c="#b89a70" />
      {['r', 'M', 'P'].map((c, i) => <PixG key={i} rows={villager(c, 0)} palette={PAL} x={210 + i * 36} y={474} s={6} smooth />)}
      <PixG rows={villager('g', Math.floor(t * 4) % 2)} palette={PAL} x={60 + ez(t, 0, 2, 0, 60)} y={474} s={6} smooth />
      <g shapeRendering="auto"><circle cx={150 + ez(t, 0, 2, 0, 60)} cy={480 - ez(t, 2, 3, 0, 20)} r={5} fill="#d9dde3" stroke="#8a8f96" /></g>
    </Stage>
  );
};
const Friday: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1, 1.2), 180, 470)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} n={70} h={400} />
      <CaveMouth glow={ez(t, 0, 2, 0, 1)} />
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 3, <TimeLapse speed={4} />],
  [3, 7, <City />, 'whip'],
  [7, 11, <Hide />, 'zoom'],
  [11, 14.5, <Sleep />],
  [14.5, 20, <TimeLapse speed={2.5} />, 'zoom'],
  [20, 26, <Wake />, 'whip'],
  [26, 31, <Market />, 'whip'],
  [31, 37, <TimeLapse speed={0.4} />, 'zoom'],
  [37, 41, <Friday />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3, <><Punch instant text="THEY SLEPT 309 YEARS" top={290} size={70} /><Punch instant text="AND THOUGHT IT WAS ONE DAY" top={390} size={50} color="#ffffff" /></>],
  [3, 7, <Caption text="A few young believers fled a king who *forced idol worship*." />],
  [7, 11, <Caption text="They hid in a cave. Their *dog* lay at the entrance." />],
  [11, 14.5, <Caption text="And Allah *made them sleep*." size={70} />],
  [14.5, 20, <Counter from={0} to={309} dur={5.2} />],
  [20, 26, <AyahCard refKey="18:19" range={[9, 14]} gold={[11, 12, 13, 14]} partial tr="They said, *We have remained a day or part of a day*" />],
  [26, 31, <Caption text="One went to buy food, paying with *300-year-old coins*." />],
  [31, 37, <AyahCard refKey="18:25" range={[0, 7]} gold={[3, 4, 5, 6, 7]} tr="And they remained in their cave for *three hundred years and exceeded by nine*" />],
  [37, 41, <><Punch text="READ SURAH AL-KAHF" top={360} size={80} /><Punch text="THIS FRIDAY" top={460} size={90} color="#ffffff" /></>],
];
const SFX: Cue[] = [
  [0, 'impact', 0.9, 2.5], [0, 'whoosh', 0.5, 1.5], [3, 'crowd', 0.3, 4], [7, 'whoosh', 0.4, 1.5], [7, 'storm', 0.15, 4], [11, 'shimmer', 0.35, 3.5],
  [14.5, 'whoosh', 0.5, 1.5], [14.5, 'storm', 0.2, 5.5], [20, 'shimmer', 0.35, 3], [26, 'crowd', 0.3, 5], [31, 'shimmer', 0.35, 3], [37, 'impact', 0.55, 2.5],
];

export const Cave: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[14.5]} endStart={41} duration={CV_DURATION} sfx={SFX} bed="audio/nasheed-fiya-hubbun.mp3" />;
