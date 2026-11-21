import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {Stage, Rf, cam, ez, Light, useT} from '../fx/fx';
import {Bands, Stars, Mushaf, GlowTitle, HadithCard, Punch, NIGHT_SKY, nunito} from '../fx/scenes';
import {Timeline, Shot, Overlay} from '../fx/Timeline';

export const ML_DURATION = 41.2;

const Counting: React.FC = () => {
  const t = useT();
  const n = Math.min(30, Math.floor(t * 7));
  return (
    <Stage cam={cam(ez(t, 0, 5.6, 1, 1.1), 180, 420)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} n={80} />
      {Array.from({length: 30}, (_, i) => { const a = (i / 30) * Math.PI * 2 - Math.PI / 2; return <g key={i} shapeRendering="auto"><circle cx={180 + Math.cos(a) * 120} cy={470 + Math.sin(a) * 120} r={i < n ? 7 : 4} fill={i < n ? '#f9c440' : '#3a4664'} /></g>; })}
      <text x={180} y={500} fontSize={90} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f9d77a">{n}</text>
    </Stage>
  );
};
const NightWindow: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1, 1.15), 180, 420)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} />
      {[20, 90, 250, 310].map((x, i) => <g key={i}><Rf x={x} y={440 - (i % 2) * 20} w={50} h={200} c="#1a2236" /><Rf x={x + 18} y={480} w={12} h={14} c="#3a4664" /></g>)}
      <Rf x={140} y={400} w={90} h={240} c="#2a3448" />
      <Rf x={170} y={450} w={30} h={34} c="#f9c440" />
      <g shapeRendering="auto"><circle cx={185} cy={467} r={46} fill="#f9c440" opacity={0.22} /></g>
      <Light x={185} y={467} r={8} t={t} />
    </Stage>
  );
};
const Question: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.1, 1), 180, 420)}>
      <Mushaf t={t} lines={8} />
      {[0, 1, 2].map((i) => <text key={i} x={100 + i * 80} y={170 - Math.sin(t * 3 + i) * 8} fontSize={60} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f6efdc">?</text>)}
    </Stage>
  );
};
const Dominion: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5.4, 1.3, 1), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#02040c" />
      <Stars t={t} n={160} />
      <g shapeRendering="auto" transform={`translate(180 380) rotate(${t * 8})`}>
        {Array.from({length: 4}, (_, r) => <circle key={r} cx={0} cy={0} r={50 + r * 50} fill="none" stroke="#f9c440" strokeOpacity={0.25} strokeWidth={2} />)}
        {Array.from({length: 4}, (_, r) => { const a = t * (0.6 - r * 0.1) + r; return <circle key={'p' + r} cx={Math.cos(a) * (50 + r * 50)} cy={Math.sin(a) * (50 + r * 50)} r={6 + r * 2} fill={['#c9a466', '#4aa3e0', '#c4603f', '#e8c890'][r]} />; })}
        <circle cx={0} cy={0} r={22} fill="#fff4c2" />
      </g>
    </Stage>
  );
};
const LifeDeath: React.FC = () => {
  const t = useT();
  const g = (t * 0.6) % 1;
  const h = Math.sin(g * Math.PI) * 160;
  return (
    <Stage cam={cam(ez(t, 0, 4.4, 1, 1.1), 180, 460)}>
      <Bands c={g < 0.5 ? ['#7fb6e0', '#a9d2ea', '#cfe7d8', '#b7dcb0', '#9fcf98'] : ['#3a3a48', '#4a4a58', '#5a5a64', '#6a6a70', '#7a7a7a']} />
      <Rf x={0} y={520} w={360} h={120} c={g < 0.5 ? '#5f8f44' : '#6a5a48'} />
      <Rf x={176} y={520 - h} w={8} h={h} c="#6e4a2a" />
      {h > 30 && Array.from({length: 10}, (_, i) => <Rf key={i} x={150 + random('lf' + i) * 60} y={520 - h + random('lg' + i) * 40 - 20 + (g > 0.6 ? (g - 0.6) * 400 * random('lv' + i) : 0)} w={12} h={10} c={g < 0.55 ? '#4f9f44' : '#c4903a'} o={g > 0.9 ? 0.4 : 1} />)}
    </Stage>
  );
};
const ReadingInBed: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.7, 1.05, 1.2), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a2038" />
      <Rf x={220} y={150} w={90} h={110} c="#0b1024" /><Stars t={t} n={8} h={100} />
      <Rf x={30} y={470} w={300} h={70} c="#6e4a2a" /><Rf x={30} y={460} w={300} h={20} c="#e9dfc8" />
      <PixG rows={AMIR.poses.read} palette={PAL} x={140} y={360} s={4} smooth />
      <g shapeRendering="auto"><circle cx={180} cy={440} r={60} fill="#f9c440" opacity={0.15 + 0.05 * Math.sin(t * 4)} /></g>
      <Rf x={0} y={540} w={360} h={100} c="#2a2236" />
    </Stage>
  );
};
const Advocate: React.FC = () => {
  const t = useT();
  const s = ez(t, 0.5, 2, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 6.2, 1.15, 1), 180, 460)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} />
      <g shapeRendering="auto"><circle cx={260} cy={150} r={26} fill="#f6efdc" /><circle cx={272} cy={142} r={24} fill="#111833" /></g>
      <Rf x={0} y={520} w={360} h={120} c="#1e2a30" />
      <g shapeRendering="auto"><ellipse cx={180} cy={530} rx={110} ry={26} fill="#2e3a2a" /></g>
      {Array.from({length: 16}, (_, i) => <Rf key={i} x={80 + i * 13} y={508 - (i % 3) * 3} w={3} h={10} c="#4f7a3a" />)}
      <g transform={`translate(180 ${400 - s * 40})`}><Rf x={-36} y={-46} w={72} h={92} c="#24503a" /><Rf x={-30} y={-40} w={60} h={80} c="#f6efdc" /><Rf x={-2} y={-40} w={4} h={80} c="#24503a" /></g>
      <g shapeRendering="auto" opacity={s}><path d={`M ${180 - 130} 530 A 130 150 0 0 1 ${180 + 130} 530`} fill="#fff6d0" fillOpacity={0.08} stroke="#fff6d0" strokeWidth={3} strokeOpacity={0.6} /></g>
    </Stage>
  );
};
const NightStars: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 3.8, 1, 1.1), 180, 380)}><Bands c={NIGHT_SKY} /><Stars t={t} n={140} /></Stage>;
};

const SHOTS: Shot[] = [
  [0, 5.6, <Counting />],
  [5.6, 9.2, <NightWindow />, 'whip'],
  [9.2, 12.2, <Question />, 'zoom'],
  [12.2, 17.6, <Dominion />, 'whip'],
  [17.6, 22.0, <LifeDeath />, 'zoom'],
  [22.0, 26.7, <ReadingInBed />, 'whip'],
  [26.7, 35.0, <Advocate />, 'zoom'],
  [35.0, 38.8, <NightStars />],
];
const OVERLAYS: Overlay[] = [
  [0, 5.6, <GlowTitle lines={['SURAH', 'AL-MULK']} arabic={{key: '67:1', range: [0, 3]}} sub="30 ayat that *argue for you* until you're forgiven" top={150} />],
  [5.6, 9.2, <Caption text="The Prophet ﷺ *would not sleep* until he recited it." />],
  [9.2, 12.2, <Caption text="But most people who read it every night *don't know what it says*." size={56} />],
  [12.2, 17.6, <AyahCard refKey="67:1" gold={[2, 3]} tr="Blessed is He *in whose hand is dominion*, and He is over all things competent" />],
  [17.6, 22.0, <AyahCard refKey="67:2" range={[0, 7]} gold={[2, 3]} partial tr="He who created *death and life* to test you, as to which of you is best in deed" />],
  [22.0, 26.7, <Caption text="Every night, you read about the One who holds *your life and your death*." />],
  [26.7, 35.0, <HadithCard source="TIRMIDHI & ABU DAWUD" text="A surah from the Quran of thirty ayat will intercede for its companion until he is forgiven." gold="intercede for its companion" size={48} />],
  [35.0, 36.2, <Punch text="30 AYAT" top={700} />],
  [36.2, 37.3, <Punch text="EVERY NIGHT" top={700} size={100} />],
  [37.3, 38.8, <Punch text="AN ADVOCATE" top={700} size={100} />],
];

export const Mulk: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[12.2, 26.7]} endStart={38.8} duration={ML_DURATION} audio="audio/mulk-narration.mp3" />;
