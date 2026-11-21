import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {PAL, SHADOW, shadowMan} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {Stage, Rf, cam, ez, Light, useT} from '../fx/fx';
import {Bands, Stars, Mushaf, Seal, GlowTitle, HadithCard, Punch, NIGHT_SKY, nunito} from '../fx/scenes';
import {Timeline, Shot, Overlay} from '../fx/Timeline';

export const DJ_DURATION = 40.02;
const RED = ['#14060a', '#2a0a10', '#4a1018', '#6e1a1a', '#8a2a1a'];

// The Dajjal is only ever a dark, faceless silhouette. Prophets are light.
const Giant: React.FC<{t: number; s?: number; y?: number; o?: number}> = ({t, s = 22, y = 210, o = 1}) => (
  <g opacity={o}>
    {Array.from({length: 30}, (_, i) => { const life = (t * 0.5 + random('fg' + i)) % 1; return <Rf key={i} x={60 + random('fx' + i) * 240 + Math.sin(t + i) * 10} y={560 - life * 300} w={30 - life * 14} h={30 - life * 14} c="#0a0408" o={0.6 * (1 - life)} />; })}
    <PixG rows={shadowMan(0)} palette={{...SHADOW, k: '#050205'}} x={180 - 3 * s} y={y} s={s} smooth />
  </g>
);

const HookShot: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.9, 1, 1.12), 180, 420)}>
      <Bands c={RED} />
      {Math.floor(t * 3) % 5 === 0 && <Rf x={0} y={0} w={360} h={640} c="#ffd0d0" o={0.08} />}
      <Giant t={t} y={ez(t, 0, 4.9, 330, 250)} o={ez(t, 0, 1.5, 0.4, 1)} />
      {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={560 + 14 * Math.sin(i / 6)} w={4} h={100} c="#0a0406" />)}
    </Stage>
  );
};
const SealShot: React.FC = () => { const t = useT(); return <Stage cam={cam(1.1, 180, 380, t > 0.6 && t < 0.75 ? 4 : 0)}><Seal t={t} /></Stage>; };
const Unlit: React.FC<{lit?: boolean}> = ({lit}) => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 5, 1.05, 1.15), 180, 400)}><Mushaf t={t} lines={10} lit={lit ? Math.min(10, Math.floor(t * 2.2)) : 0} /></Stage>;
};
const TheTrial: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 1.7, 1.3, 1.1), 180, 380, Math.sin(t * 50) * 3 * Math.max(0, 1 - t))}><Bands c={RED} /><Giant t={t} s={26} y={170} /></Stage>;
};
const Warned: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1, 180, 400, ez(t, 0, 2.1, 30, -30))}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} />
      {Array.from({length: 6}, (_, i) => <g key={i} opacity={0.5 + 0.5 * Math.max(0, Math.sin(t * 4 - i))}><Light x={30 + i * 60} y={360 + (i % 2) * 40} r={10} t={t + i} /></g>)}
      <Rf x={0} y={520} w={360} h={120} c="#151c30" />
    </Stage>
  );
};
const Silhouette: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 4.5, 1.1, 1.3), 180, 300)}><Bands c={['#0a0a12', '#121220', '#1a1a2a', '#222234', '#2a2a3e']} /><Giant t={t} s={20} y={200} /></Stage>;
};
const FortyDays: React.FC = () => {
  const t = useT();
  const phase = t < 1.6 ? 0 : t < 3.2 ? 1 : t < 4.5 ? 2 : t < 5.8 ? 3 : 4;
  const speed = [0.6, 0.04, 0.25, 0.8, 2.2][phase];
  const base = [0, 0.96, 1.0, 1.3, 2.3][phase];
  const cycle = (base + (t - [0, 1.6, 3.2, 4.5, 5.8][phase]) * speed) % 1;
  const day = Math.sin(cycle * Math.PI);
  return (
    <Stage>
      <Bands c={day > 0.15 ? ['#7fb6e0', '#a9d2ea', '#f6d6a2', '#f6b77a', '#f39a5e'] : NIGHT_SKY} />
      {day <= 0.15 && <Stars t={t} />}
      <g shapeRendering="auto"><circle cx={30 + cycle * 300} cy={430 - Math.sin(cycle * Math.PI) * 280} r={24} fill="#fff4c2" opacity={day > 0.15 ? 1 : 0.2} /></g>
      {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={470 + 24 * Math.sin(i / 7)} w={4} h={200} c={day > 0.15 ? '#8a6a42' : '#1a1a2a'} />)}
    </Stage>
  );
};
const Followers: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.5, 1, 1.12), 180, 420)}>
      <Bands c={RED} />
      <Giant t={t} s={14} y={200} />
      {Array.from({length: 16}, (_, i) => <PixG key={i} rows={shadowMan(Math.floor(t * 6 + i) % 2)} palette={SHADOW} x={((i * 23 + t * 30) % 380) - 20} y={520 + (i % 3) * 22} s={3.4} smooth />)}
    </Stage>
  );
};
const Shield: React.FC = () => {
  const t = useT();
  const s = ez(t, 0.2, 1.4, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 1.9, 1.2, 1), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <g shapeRendering="auto" transform={`translate(180 380) scale(${s})`}>
        <path d="M0 -150 L120 -100 L110 40 Q90 130 0 170 Q-90 130 -110 40 L-120 -100 Z" fill="#d4a73a" opacity={0.9} />
        <path d="M0 -120 L95 -82 L86 34 Q70 106 0 138 Q-70 106 -86 34 L-95 -82 Z" fill="#24503a" />
        <text x={0} y={30} fontSize={90} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f9d77a">10</text>
      </g>
    </Stage>
  );
};
const Friday: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.4, 1.1, 1.25), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#e8dcc0" />
      {[0, 120, 240].map((x, i) => <g key={i}><Rf x={x + 20} y={80} w={80} h={260} c="#cdb88e" /><Rf x={x + 36} y={110} w={48} h={200} c="#9fcbe0" /></g>)}
      <Rf x={0} y={500} w={360} h={140} c="#2f6b4a" />
      <g shapeRendering="auto"><ellipse cx={180} cy={460} rx={110} ry={130} fill="#f9c440" opacity={0.18 + 0.06 * Math.sin(t * 4)} /></g>
      <PixG rows={AMIR.poses.read} palette={PAL} x={142} y={410} s={4} smooth />
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 4.9, <HookShot />],
  [4.9, 6.9, <SealShot />, 'zoom'],
  [6.9, 8.9, <Unlit />, 'whip'],
  [8.9, 10.6, <TheTrial />],
  [10.6, 12.7, <Warned />, 'whip'],
  [12.7, 17.2, <Silhouette />, 'zoom'],
  [17.2, 24.5, <FortyDays />, 'whip'],
  [24.5, 27.0, <Followers />, 'zoom'],
  [27.0, 28.9, <Shield />, 'whip'],
  [28.9, 33.9, <Unlit lit />, 'zoom'],
  [33.9, 37.3, <Friday />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 4.9, <GlowTitle lines={['10 AYAT', 'OF AL-KAHF']} sub="will protect you from *the greatest trial* in human history" />],
  [4.9, 6.9, <Caption text="The Prophet ﷺ *said it*." size={70} />],
  [6.9, 8.9, <Caption text="And most people have *never memorized them*." />],
  [8.9, 10.6, <Punch text="THE DAJJAL" top={180} size={130} color="#ff5a4a" />],
  [10.6, 12.7, <Caption text="*Every prophet* warned his people about him." />],
  [12.7, 17.2, <HadithCard source="FROM BUKHARI & MUSLIM" text="He is blind in one eye, and between his eyes is written: kafir." gold="kafir" />],
  [17.2, 18.8, <Punch text="40 DAYS" top={170} />],
  [18.8, 20.4, <Punch text="1 DAY = 1 YEAR" top={170} size={96} />],
  [20.4, 21.7, <Punch text="1 DAY = 1 MONTH" top={170} size={92} />],
  [21.7, 23.0, <Punch text="1 DAY = 1 WEEK" top={170} size={96} />],
  [23.0, 24.5, <Punch text="THE REST: LIKE YOUR DAYS" top={170} size={70} />],
  [24.5, 27.0, <Caption text="He will claim to be god, and *many will follow him*." />],
  [27.0, 28.9, <Caption text="But the Prophet ﷺ gave us *a shield*." />],
  [28.9, 33.9, <HadithCard source="FROM SAHIH MUSLIM" text="Whoever memorizes ten ayat from the beginning of Surah Al-Kahf will be protected from the Dajjal." gold="protected from the Dajjal" size={48} />],
  [33.9, 37.3, <Caption text="The surah you read every Friday has *your protection inside it*." />],
];

export const Dajjal: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[8.9, 27.0]} endStart={37.3} duration={DJ_DURATION} audio="audio/dajjal-narration.mp3" />;
