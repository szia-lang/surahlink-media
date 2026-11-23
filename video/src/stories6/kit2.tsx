import React from 'react';
import {random, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import ayat from '../data/ayat.json';
import {PixG} from '../components/Pix';
import {QURAN_FONT} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {Kaaba} from '../alfil/scenery';
import {GoldPile} from '../stories4/props';
import {Stage, Rf, cam, ez, useT, Light} from '../fx/fx';
import {Bands, Stars, Rain, nunito, NIGHT_SKY, DUSK_SKY, DAWN_SKY, STORM_SKY} from '../fx/scenes';

// Second set of shared scenes for the old-hook batch. Prophets only as light; people are faceless.
const C = ['g', 'b', 'c', 'n', 'M', 'r', 'P', 'e', 'o'];

// Umar's gathering: elders seated in a row; young: the small figure (Ibn Abbas) is lit.
export const Council: React.FC<{young?: boolean}> = ({young}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, young ? 1.3 : 1.05, young ? 1.55 : 1.2), young ? 290 : 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#3a2a22" />
      {Array.from({length: 8}, (_, i) => <Rf key={i} x={i * 48} y={0} w={4} h={640} c="#32241e" />)}
      <Rf x={0} y={500} w={360} h={140} c="#6e4a2a" /><Rf x={20} y={492} w={320} h={14} c="#8a2a2a" />
      {[40, 90, 140, 190, 240].map((x, i) => <PixG key={i} rows={villager(['c', 'e', 'M', 'n', 'b'][i], 0)} palette={PAL} x={x - 12} y={448} s={6} smooth />)}
      <g shapeRendering="auto" opacity={young ? 0.5 : 0}><circle cx={300} cy={470} r={34} fill="#fff6d0" opacity={0.35} /></g>
      <PixG rows={villager('g', 0)} palette={PAL} x={290} y={462} s={4.4} smooth />
    </Stage>
  );
};
// Victory: people streaming toward the Kaaba.
export const Multitudes: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.05, 1.2), 180, 450)}>
      <Bands c={DAWN_SKY} />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      <Kaaba x={124} y={404} s={4} />
      {Array.from({length: 22}, (_, i) => { const lane = i % 3; const x = ((random('m' + i) * 420 + t * 40) % 420) - 30; return <PixG key={i} rows={villager(C[i % 9], Math.floor(t * 5 + i) % 2)} palette={PAL} x={x} y={520 + lane * 30} s={4} smooth />; })}
    </Stage>
  );
};
// The light of the Prophet ﷺ fading into a sunset: his mission complete.
export const Sunset: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5, 1.05, 1.15), 180, 420)}>
      <Bands c={ez(t, 0, 3, 0, 1) > 0.5 ? DUSK_SKY : DAWN_SKY} />
      <g shapeRendering="auto"><circle cx={180} cy={360 + ez(t, 0, 5, 0, 120)} r={40} fill="#f9b06a" opacity={0.85} /></g>
      <Rf x={0} y={470} w={360} h={170} c="#4a3a40" />
      <g opacity={ez(t, 0.5, 4.5, 1, 0.35)}><Light x={180} y={420} r={12} t={t} /></g>
    </Stage>
  );
};
// A lone faceless figure in the rain at night (someone who has sinned).
export const Lost: React.FC<{light?: number}> = ({light = 0}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.2, 1.35), 180, 470)}>
      <Bands c={light > 0 ? DAWN_SKY : STORM_SKY} />
      {light === 0 && <Rain t={t} o={0.45} />}
      <Rf x={0} y={500} w={360} h={140} c={light > 0 ? '#c9a466' : '#1a1e28'} />
      {light > 0 && <><g shapeRendering="auto"><circle cx={180} cy={300} r={140 * light} fill="#fff6d0" opacity={0.25} /></g>{Array.from({length: 16}, (_, i) => <Rf key={i} x={60 + random('lx' + i) * 240} y={200 + ((random('ly' + i) * 300 + t * 30) % 300)} w={3} h={3} c="#fff6d0" o={0.7} />)}</>}
      <g transform={light > 0 ? '' : 'translate(0 8)'}><PixG rows={villager('e', 0)} palette={PAL} x={168} y={450} s={6} smooth /></g>
    </Stage>
  );
};
export const AmirDua: React.FC<{night?: boolean}> = ({night}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.1, 1.3), 180, 450)}>
      <Bands c={night ? NIGHT_SKY : DAWN_SKY} />
      {night && <Stars t={t} n={70} h={420} />}
      <Rf x={0} y={500} w={360} h={140} c={night ? '#2a2236' : '#c9a466'} />
      <Rf x={120} y={498} w={120} h={10} c="#2f6b4a" />
      <PixG rows={AMIR.poses.dua} palette={PAL} x={162} y={420} s={3} smooth />
      {Array.from({length: 10}, (_, i) => { const life = (t * 0.5 + i / 10) % 1; return <Rf key={i} x={150 + random('du' + i) * 60} y={420 - life * 300} w={2} h={6} c="#fff6d0" o={(1 - life) * 0.8} />; })}
    </Stage>
  );
};
// One storm cloud (the hardship) with a sun on each side (the two eases).
export const TwoEases: React.FC<{suns?: 0 | 1 | 2}> = ({suns = 2}) => {
  const t = useT();
  const cloud = (x: number, y: number) => <g shapeRendering="auto"><ellipse cx={x} cy={y} rx={70} ry={34} fill="#3a4050" /><ellipse cx={x - 40} cy={y + 10} rx={44} ry={26} fill="#343a48" /><ellipse cx={x + 44} cy={y + 12} rx={40} ry={24} fill="#30364a" /></g>;
  const sun = (x: number, on: number) => <g shapeRendering="auto" opacity={on}><circle cx={x} cy={330} r={46} fill="#fff1a0" opacity={0.3} /><circle cx={x} cy={330} r={28} fill="#ffe27a" /></g>;
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.15, 1.05), 180, 360)}>
      <Bands c={suns ? DAWN_SKY : STORM_SKY} />
      {sun(60, suns >= 1 ? ez(t, 0.2, 1, 0, 1) : 0)}
      {sun(300, suns >= 2 ? ez(t, 0.8, 1.6, 0, 1) : 0)}
      {cloud(180, 330)}
      {Array.from({length: 18}, (_, i) => <Rf key={i} x={130 + (i % 6) * 18} y={370 + ((t * 300 + i * 37) % 180)} w={2} h={12} c="#9fb4cc" o={0.6} />)}
      <Rf x={0} y={540} w={360} h={100} c={suns ? '#c9a466' : '#2a2e38'} />
    </Stage>
  );
};
// Big Arabic word card from the dataset: shows one word with its meaning (for the "the" vs no "the" note).
export const WordCard: React.FC<{refKey: keyof typeof ayat; idx: number; meaning: string; note: string}> = ({refKey, idx, meaning, note}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const parts = meaning.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 90, right: 90, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '16px 24px 22px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: QURAN_FONT, fontSize: 120, lineHeight: 1.7, color: '#b8862a', direction: 'rtl'}}>{ayat[refKey].words[idx]}</div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 62, color: '#1d2b24', lineHeight: 1.1}}>{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}</div>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 34, color: '#5b6a60', marginTop: 8}}>{note}</div>
    </div>
  );
};
// A man clutching his gold, then the graveyard.
export const Hoard: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.1, 1.35), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1a14" />
      <g shapeRendering="auto"><circle cx={180} cy={460} r={170} fill="#f9c440" opacity={0.12} /></g>
      <Rf x={0} y={520} w={360} h={120} c="#4a3226" />
      <GoldPile x={230} y={520} s={0.9} t={t} />
      <PixG rows={villager('P', 0)} palette={PAL} x={110} y={468 - Math.abs(Math.sin(t * 6)) * 2} s={7} smooth />
    </Stage>
  );
};
export const Graves: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 470, ez(t, 0, 4, 15, -15))}>
      <Bands c={DUSK_SKY} />
      <Rf x={0} y={500} w={360} h={140} c="#4a3e36" />
      {Array.from({length: 9}, (_, i) => <g key={i}><Rf x={10 + i * 40} y={470 + (i % 2) * 30} w={10} h={30} c="#8a8478" /><Rf x={0 + i * 40} y={498 + (i % 2) * 30} w={30} h={8} c="#5a4e44" /></g>)}
      <g opacity={0.7}><PixG rows={villager('P', 0)} palette={PAL} x={170} y={560} s={4} smooth /></g>
    </Stage>
  );
};
// What you truly keep: a plate (ate), a worn robe (wore), a coin given away (sent ahead).
export const Keep: React.FC<{n: 1 | 2 | 3}> = ({n}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.25, 1.1), 180, 430)}>
      <Rf x={0} y={0} w={360} h={640} c={n === 3 ? '#16302a' : '#2a2030'} />
      <g shapeRendering="auto">
        {n === 1 && <><ellipse cx={180} cy={430} rx={90} ry={30} fill="#e9dfc8" /><ellipse cx={180} cy={425} rx={60} ry={18} fill="#c9b994" opacity={ez(t, 0, 1.5, 1, 0.2)} /></>}
        {n === 2 && <><path d="M120 330 L240 330 L270 520 L90 520 Z" fill="#7e6a52" /><Rf x={150} y={400} w={20} h={14} c="#2a2030" /><Rf x={200} y={460} w={16} h={12} c="#2a2030" /></>}
      </g>
      {n === 3 && <><PixG rows={villager('g', 0)} palette={PAL} x={80} y={420} s={8} smooth /><PixG rows={villager('e', 0)} palette={PAL} x={240} y={430} s={8} smooth /><g shapeRendering="auto"><circle cx={120 + ez(t, 0.2, 1.2, 0, 120)} cy={460 - Math.sin(ez(t, 0.2, 1.2, 0, Math.PI)) * 40} r={7} fill="#f9c440" /></g>{t > 1.2 && Array.from({length: 12}, (_, i) => <Rf key={i} x={240 + random('ch' + i) * 30} y={440 - ((t - 1.2) * 60 + i * 30) % 400} w={3} h={3} c="#fff6d0" o={0.8} />)}</>}
    </Stage>
  );
};
// Laylat al-Qadr: a still night with streams of light descending (angels are never drawn).
export const QadrNight: React.FC<{amir?: boolean}> = ({amir}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 400)}>
      <Bands c={NIGHT_SKY} /><Stars t={t} n={90} h={480} />
      {Array.from({length: 7}, (_, i) => { const x = 30 + i * 50; const y = ((t * 160 + i * 90) % 700) - 100; return <g key={i} shapeRendering="auto"><rect x={x} y={y} width={3} height={60} fill="#fff6d0" opacity={0.6} /><circle cx={x + 1.5} cy={y + 60} r={4} fill="#fffdf2" /></g>; })}
      {[20, 80, 280].map((x, i) => <Rf key={i} x={x} y={430 + i * 10} w={60} h={120} c="#1e1a2a" />)}
      <Rf x={0} y={520} w={360} h={120} c="#1a1626" />
      {amir && <PixG rows={AMIR.poses.dua} palette={PAL} x={162} y={442} s={3} smooth />}
    </Stage>
  );
};
export const BigNumber: React.FC<{from: number; to: number; dur: number; label: string; top?: number}> = ({from, to, dur, label, top = 640}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = Math.round(ez(f / fps, 0.1, dur, from, to));
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontFamily: nunito, fontWeight: 900, color: '#f9d77a', textShadow: '0 8px 0 rgba(0,0,0,.45)'}}>
      <div style={{fontSize: 200, lineHeight: 1}}>{n}</div>
      <div style={{fontSize: 60, color: '#ffffff'}}>{label}</div>
    </div>
  );
};
