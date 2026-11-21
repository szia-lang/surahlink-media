import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, SHADOW, villager, shadowMan} from '../alfil/sprites';
import {sujood, pharaoh} from '../musa/Musa';
import {Stage, Rf, cam, ez, Light, useT} from '../fx/fx';
import {Bands, Rain, Sea, Bubbles, GlowTitle, STORM_SKY, DAWN_SKY} from '../fx/scenes';
import {Timeline, Shot, Overlay} from '../fx/Timeline';

export const PH_DURATION = 39.68;
const DESERT = ['#f3c58d', '#efb07c', '#e89a6a', '#de8a5e', '#c97a56'];

// Musa is only ever light. Pharaoh and soldiers are faceless.
const Wall: React.FC<{x: number; w: number; h: number; t: number}> = ({x, w, h, t}) => (
  <g>
    <Rf x={x} y={600 - h} w={w} h={h + 40} c="#1f4a76" />
    {Array.from({length: Math.floor(w / 6)}, (_, i) => <Rf key={i} x={x + i * 6} y={600 - h + Math.sin(t * 3 + i) * 4} w={6} h={6} c="#8fc4e6" o={0.8} />)}
    {Array.from({length: 6}, (_, i) => <Rf key={'f' + i} x={x + 10 + random('fx' + x + i) * (w - 30)} y={600 - h * (0.2 + random('fy' + x + i) * 0.7)} w={14} h={6} c="#e0a050" o={0.7} />)}
  </g>
);

const Hook: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.4, 1.15, 1.05), 180, 420, Math.sin(t * 30) * 2)}>
      <Bands c={STORM_SKY} />
      <Sea t={t} level={460} amp={120} c="#1a3050" speed={1.2} />
      <PixG rows={pharaoh} palette={PAL} x={130} y={ez(t, 0, 2.4, 420, 470)} s={5} smooth />
      <Sea t={t + 1.3} level={540} amp={60} c="#14263e" />
      <Rain t={t} />
    </Stage>
  );
};
const MagiciansBowed: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1, 1.1), 180, 470)}>
      <Bands c={DESERT} />
      <Rf x={0} y={470} w={360} h={170} c="#e2c88e" />
      {Array.from({length: 10}, (_, i) => <PixG key={i} rows={sujood} palette={PAL} x={10 + (i % 5) * 70} y={480 + Math.floor(i / 5) * 60} s={2.8} smooth />)}
    </Stage>
  );
};
const Chase: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1, 180, 420, Math.sin(t * 40) * 1.5)}>
      <Bands c={DESERT} />
      <Rf x={0} y={460} w={360} h={180} c="#d9b77a" />
      {Array.from({length: 22}, (_, i) => <PixG key={i} rows={villager('R', Math.floor(t * 8 + i) % 2)} palette={PAL} x={-140 + t * 70 + (i % 8) * 22} y={470 + Math.floor(i / 8) * 26} s={3} smooth />)}
      <PixG rows={pharaoh} palette={PAL} x={-40 + t * 70} y={420} s={2.4} smooth />
      {Array.from({length: 30}, (_, i) => <Rf key={'d' + i} x={-160 + t * 70 + random('dx' + i) * 200} y={540 + random('dy' + i) * 40 - (t * 20 + i) % 30} w={6} h={6} c="#e9d3a3" o={0.5} />)}
      <Light x={320} y={480} r={11} t={t} />
    </Stage>
  );
};
const NowhereToRun: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.4, 1.2, 1.35), 180, 420)}>
      <Bands c={DESERT} />
      <Sea t={t} level={360} amp={18} c="#2a5a86" />
      <Rf x={0} y={460} w={360} h={180} c="#d9b77a" />
      {Array.from({length: 10}, (_, i) => <PixG key={i} rows={villager(['g', 'b', 'c', 'n', 'M'][i % 5], 0)} palette={PAL} x={30 + i * 30} y={470} s={3} smooth />)}
      <Light x={180} y={440} r={12} t={t} />
      <Rf x={0} y={600} w={360} h={40} c="#e9d3a3" o={0.6} />
    </Stage>
  );
};
const Parting: React.FC = () => {
  const t = useT();
  const p = ez(t, 0.6, 3, 0, 1);
  const gap = 20 + p * 120;
  return (
    <Stage cam={cam(ez(t, 0, 6.7, 1.15, 1), 180, 420, t > 0.6 && t < 1 ? Math.sin(t * 60) * 4 : 0)}>
      <Bands c={STORM_SKY} />
      {p < 0.05 ? <Sea t={t} level={330} amp={20} c="#1f4a76" /> : <>
        <Wall x={0} w={180 - gap / 2} h={140 + p * 260} t={t} />
        <Wall x={180 + gap / 2} w={180 - gap / 2} h={140 + p * 260} t={t + 1} />
        <Rf x={180 - gap / 2} y={560} w={gap} h={80} c="#c9a466" />
      </>}
      <Light x={180} y={560} r={13} t={t} />
      <g shapeRendering="auto" opacity={ez(t, 0.4, 0.8, 0, 0.5) * (1 - ez(t, 1, 2, 0, 1))}><rect x={176} y={0} width={8} height={560} fill="#fff6d0" /></g>
    </Stage>
  );
};
const Crossing: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 420)}>
      <Bands c={STORM_SKY} />
      <Wall x={0} w={110} h={400} t={t} />
      <Wall x={250} w={110} h={400} t={t + 1} />
      <Rf x={110} y={200} w={140} h={440} c="#c9a466" />
      {Array.from({length: 10}, (_, i) => <PixG key={i} rows={villager(['g', 'b', 'c', 'n', 'M'][i % 5], Math.floor(t * 6 + i) % 2)} palette={PAL} x={130 + (i % 3) * 32} y={620 - ((t * 60 + i * 30) % 420)} s={2.6} smooth />)}
    </Stage>
  );
};
const SeaCloses: React.FC = () => {
  const t = useT();
  const c = ez(t, 1.4, 2.4, 0, 1);
  return (
    <Stage cam={cam(1.05, 180, 420, c > 0 && c < 1 ? Math.sin(t * 60) * 5 : 0)}>
      <Bands c={STORM_SKY} />
      <Wall x={0} w={110 + c * 70} h={400} t={t} />
      <Wall x={250 - c * 70} w={110 + c * 70} h={400} t={t + 1} />
      {c < 1 && <Rf x={110 + c * 70} y={200} w={140 - c * 140} h={440} c="#c9a466" />}
      {c < 0.8 && Array.from({length: 12}, (_, i) => <PixG key={i} rows={villager('R', Math.floor(t * 8 + i) % 2)} palette={PAL} x={130 + (i % 3) * 32} y={200 + ((t * 70 + i * 34) % 400)} s={2.6} smooth />)}
      {c < 0.8 && <PixG rows={pharaoh} palette={PAL} x={150} y={250 + t * 40} s={2} smooth />}
    </Stage>
  );
};
const Sinking: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 7.4, 1, 1.15), 180, 380)}>
      <Bands c={['#1f4a76', '#183c62', '#12304e', '#0c243c', '#06182a']} />
      <Bubbles t={t} n={40} />
      <g shapeRendering="auto" opacity={0.25}>{Array.from({length: 5}, (_, i) => <polygon key={i} points={`${60 + i * 60},0 ${80 + i * 60},0 ${40 + i * 70},640 ${20 + i * 70},640`} fill="#8fc4e6" />)}</g>
      <PixG rows={pharaoh} palette={{...PAL, w: '#9fb8c8', y: '#a88a3a'}} x={130} y={ez(t, 0, 7.4, 200, 380)} s={5} smooth />
    </Stage>
  );
};
const Now: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.8, 1.2, 1.35), 180, 420)}>
      <Bands c={['#0c243c', '#08182a', '#06121e', '#040c16', '#02060c']} />
      <Bubbles t={t * 0.4} n={14} />
      <g transform={`translate(180 ${ez(t, 0, 3.8, 380, 470)}) rotate(${t * 8})`}><Rf x={-24} y={-10} w={48} h={16} c="#a88a3a" /><Rf x={-18} y={-20} w={8} h={10} c="#a88a3a" /><Rf x={-4} y={-24} w={8} h={14} c="#a88a3a" /><Rf x={10} y={-20} w={8} h={10} c="#a88a3a" /></g>
    </Stage>
  );
};
const Shore: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.9, 1.1, 1), 180, 460)}>
      <Bands c={DAWN_SKY} />
      <Sea t={t} level={430} amp={8} c="#4a8ab0" speed={0.3} />
      <Rf x={0} y={480} w={360} h={160} c="#e2cfa0" />
      <g transform="translate(110 520)"><Rf x={0} y={0} w={140} h={22} c="#e9dfc8" /><Rf x={0} y={0} w={140} h={4} c="#c9b994" /><Rf x={120} y={-6} w={26} h={20} c="#d4a73a" /></g>
      {Array.from({length: 6}, (_, i) => <Rf key={i} x={30 + i * 55} y={600} w={8} h={3} c="#c9b994" />)}
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 2.4, <Hook />],
  [2.4, 5.0, <MagiciansBowed />, 'whip'],
  [5.0, 8.0, <Chase />, 'whip'],
  [8.0, 9.4, <NowhereToRun />, 'zoom'],
  [9.4, 16.1, <Parting />],
  [16.1, 17.9, <Crossing />, 'zoom'],
  [17.9, 20.9, <SeaCloses />],
  [20.9, 28.3, <Sinking />, 'zoom'],
  [28.3, 32.1, <Now />],
  [32.1, 37.0, <Shore />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 2.4, <GlowTitle lines={["PHARAOH'S", 'LAST WORDS']} sub="shocked *everyone*" />],
  [2.4, 5.0, <Caption text="His own magicians had already *bowed to Allah*." />],
  [5.0, 8.0, <Caption text="But Pharaoh still *chased Musa* and his people to the sea." />],
  [8.0, 9.4, <Caption text="There was *nowhere to run*." size={70} />],
  [9.4, 16.1, <AyahCard refKey="26:63" range={[3, 12]} gold={[10, 11, 12]} partial trSize={42} tr="Strike with your staff the sea… and it parted, and each portion was *like a great towering mountain*" />],
  [16.1, 17.9, <Caption text="Musa and his people *crossed*." size={70} />],
  [17.9, 20.9, <Caption text="Pharaoh and his army followed them in. *And the sea closed.*" />],
  [20.9, 28.3, <AyahCard refKey="10:90" range={[13, 26]} gold={[14]} partial trSize={40} tr="*I believe* that there is no deity except that in whom the Children of Israel believe, and I am of the Muslims" />],
  [28.3, 32.1, <AyahCard refKey="10:91" gold={[0]} tr="*Now?* And you had disobeyed before, and were of the corrupters" />],
  [32.1, 37.0, <AyahCard refKey="10:92" range={[0, 6]} gold={[1, 2]} partial tr="So today *We will save you in body*, that you may be to those who succeed you a sign" />],
];

export const Pharaoh: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[9.4, 19.8, 28.3]} endStart={37.0} duration={PH_DURATION} audio="audio/pharaoh-narration.mp3" />;
