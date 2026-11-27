import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {PAL, SHADOW, villager, soldier, bird, raster, rider} from '../alfil/sprites';
import {pharaoh, sujood} from '../musa/Musa';
import {Stage, Rf, cam, ez, useT, Light} from '../fx/fx';
import {Bands, Stars, Sea, NIGHT_SKY, DUSK_SKY, DAWN_SKY, STORM_SKY} from '../fx/scenes';

// Richer scenes for the Nov 27 curiosity batch: crowds, parallax, particles, camera punches.
// Prophets are only ever a soft light. People are faceless. The Queen of Sheba and Hajar: veiled, seen from behind.
const DAY = ['#6fa8dc', '#8fbfe6', '#b3d4ee', '#d8e8f0', '#f0e6d0'];
const punch = (t: number, at: number) => (t > at && t < at + 0.25 ? 1 + 0.06 * Math.sin(((t - at) / 0.25) * Math.PI) : 1);
const shake = (t: number, a: number, b: number, amp: number) => (t > a && t < b ? Math.sin(t * 70) * amp * (1 - (t - a) / (b - a)) : 0);
const Dust: React.FC<{t: number; y: number; n?: number; c?: string; speed?: number}> = ({t, y, n = 30, c = '#c9a466', speed = 60}) => <>{Array.from({length: n}, (_, i) => { const x = ((random('du' + i) * 400 - t * speed) % 400 + 400) % 400 - 20; const yy = y - random('dy' + i) * 40 - Math.abs(Math.sin(t * 3 + i)) * 6; return <Rf key={i} x={x} y={yy} w={3} h={3} c={c} o={0.5} />; })}</>;
const Hills: React.FC<{t: number; y: number; c: string; amp: number; speed: number; seed: number}> = ({t, y, c, amp, speed, seed}) => <>{Array.from({length: 92}, (_, i) => { const x = i * 4; const h = amp * (0.6 + 0.4 * Math.sin((x + t * speed) / 37 + seed)) + amp * 0.3 * Math.sin((x + t * speed) / 13 + seed * 2); return <Rf key={i} x={x} y={y - h} w={4} h={300} c={c} />; })}</>;

// ---------- Sulayman and the ant ----------
const ant = raster(14, 8, (set, H) => { H.ellipse(2.5, 4, 2, 2, 'B'); H.ellipse(6.5, 4, 2, 1.6, 'B'); H.ellipse(11, 4, 2.6, 2.2, 'B'); for (const x of [5, 7, 9]) { H.rect(x - 1, 6, 1, 2, 'B'); H.rect(x + 1, 6, 1, 2, 'B'); } H.rect(1, 0, 1, 2, 'B'); H.rect(0, 1, 1, 1, 'B'); });
export const ArmyMarch: React.FC<{hook?: boolean}> = ({hook}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, hook ? 1.35 : 1.05, hook ? 1.15 : 1.2), 180, 440, shake(t, 0, 0.5, 3))}>
      <Bands c={DAY} />
      <Hills t={t} y={420} c="#b8a68a" amp={50} speed={8} seed={1} />
      <Hills t={t} y={470} c="#a08a6a" amp={30} speed={18} seed={3} />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      {Array.from({length: 9}, (_, i) => { const x = ((i * 46 - t * 25) % 414 + 414) % 414 - 30; return <PixG key={i} rows={bird(Math.floor(t * 6 + i) % 2 === 0)} palette={PAL} x={x} y={150 + (i % 3) * 30 + Math.sin(t * 2 + i) * 6} s={3} />; })}
      {Array.from({length: 12}, (_, i) => { const x = 20 + (i % 6) * 55 + Math.sin(t * 3 + i) * 2; const row = Math.floor(i / 6); return <PixG key={i} rows={soldier(Math.floor(t * 5 + i) % 2)} palette={PAL} x={x - row * 25} y={480 + row * 40} s={4} smooth />; })}
      {[0, 1].map((i) => <PixG key={'r' + i} rows={rider(Math.floor(t * 6 + i) % 2)} palette={PAL} x={60 + i * 180} y={420 - i * 4} s={2.6} smooth />)}
      {Array.from({length: 4}, (_, i) => <g key={'j' + i} opacity={0.35 + 0.15 * Math.sin(t * 2 + i)}><Rf x={30 + i * 90} y={330 + Math.sin(t * 1.5 + i) * 8} w={22} h={50} c="#5a6a9a" /></g>)}
      <Light x={300} y={450} r={11} t={t} />
      <Dust t={t} y={520} speed={40} />
    </Stage>
  );
};
// Ground level in the valley of the ants: giant grass, ants running into their holes, the army's tremor.
export const AntValley: React.FC<{panic?: boolean; close?: boolean}> = ({panic, close}) => {
  const t = useT();
  return (
    <Stage cam={cam(close ? ez(t, 0, 3, 1.8, 2.2) : ez(t, 0, 4, 1.05, 1.25), close ? 170 : 180, close ? 500 : 470, panic ? Math.sin(t * 40) * 2 : 0)}>
      <Bands c={DAWN_SKY} />
      {panic && Array.from({length: 4}, (_, i) => <g key={i} opacity={0.35}><Rf x={i * 100 - (t * 30) % 100} y={180} w={50} h={300} c="#3a3020" /></g>)}
      <Rf x={0} y={500} w={360} h={140} c="#8a6a42" />
      {Array.from({length: 22}, (_, i) => <Rf key={'g' + i} x={i * 17 + 4} y={420 + (i % 3) * 20 + Math.sin(t * 2 + i) * 2} w={4} h={90} c={i % 2 ? '#6a9a3a' : '#5a8a32'} />)}
      {[90, 250].map((x, i) => <g key={'h' + i} shapeRendering="auto"><ellipse cx={x} cy={512} rx={18} ry={7} fill="#2a1a0e" /></g>)}
      {Array.from({length: 10}, (_, i) => { const target = i % 2 ? 250 : 90; const start = 20 + random('ax' + i) * 320; const p = panic ? ez(t, random('ap' + i) * 1.5, 2.5 + random('aq' + i), 0, 1) : 0; return <g key={i} opacity={1 - p * 0.9}><PixG rows={ant} palette={PAL} x={start + (target - start) * p} y={522 + (i % 3) * 6} s={1.6} flip={target < start} /></g>; })}
      <PixG rows={ant} palette={PAL} x={160} y={470} s={close ? 3 : 2.2} />
      {close && Array.from({length: 3}, (_, i) => { const r = ((t * 30 + i * 12) % 36); return <g key={i} shapeRendering="auto"><circle cx={168} cy={476} r={r + 6} fill="none" stroke="#fff6d0" strokeWidth={1} opacity={1 - r / 36} /></g>; })}
    </Stage>
  );
};
export const KingSmiles: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.2, 1.45), 180, 420)}>
      <Bands c={['#3a5a8a', '#5a7aa0', '#8aa0b8', '#c8b8a0', '#e8c890']} />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      <g shapeRendering="auto"><circle cx={180} cy={420} r={90 + 10 * Math.sin(t * 2)} fill="#fff6d0" opacity={0.15} /></g>
      <Light x={180} y={420} r={15} t={t} />
      {Array.from({length: 20}, (_, i) => { const life = (t * 0.6 + random('ks' + i)) % 1; const a = random('ka' + i) * Math.PI * 2; return <Rf key={i} x={180 + Math.cos(a) * 120 * life} y={420 + Math.sin(a) * 120 * life} w={3} h={3} c="#fff6d0" o={1 - life} />; })}
    </Stage>
  );
};

// ---------- The hoopoe and Sheba ----------
const hoopoe = (up: boolean) => raster(16, 12, (set, H) => {
  H.ellipse(7, 7, 4, 2.6, 'o'); H.ellipse(12, 5, 2, 2, 'o'); H.rect(14, 5, 2, 1, 'B');
  H.rect(10, 1, 1, 3, 'B'); H.rect(11, 0, 1, 3, 'o'); H.rect(12, 1, 1, 3, 'B');
  if (up) { H.rect(3, 1, 7, 2, 'B'); H.rect(4, 3, 5, 1, 'c'); } else { H.rect(3, 8, 7, 2, 'B'); H.rect(4, 7, 5, 1, 'c'); }
  H.rect(0, 6, 3, 2, 'B');
});
export const HoopoeFlight: React.FC<{dir?: 1 | -1; storm?: boolean}> = ({dir = 1, storm}) => {
  const t = useT();
  const x = dir > 0 ? 40 + t * 90 : 300 - t * 90;
  return (
    <Stage cam={cam(1.15, 180, 330 + Math.sin(t * 2) * 10)}>
      <Bands c={storm ? STORM_SKY : DAY} />
      {Array.from({length: 7}, (_, i) => { const cx = ((random('cl' + i) * 500 - t * (20 + i * 8) * dir) % 500 + 500) % 500 - 70; return <g key={i} shapeRendering="auto" opacity={0.8}><ellipse cx={cx} cy={120 + i * 55} rx={50 + i * 4} ry={14} fill="#f6f6f6" /></g>; })}
      <Hills t={t * dir} y={600} c="#a08a6a" amp={40} speed={60} seed={2} />
      <PixG rows={hoopoe(Math.floor(t * 8) % 2 === 0)} palette={PAL} x={x} y={300 + Math.sin(t * 6) * 10} s={5} flip={dir < 0} />
    </Stage>
  );
};
export const Attendance: React.FC<{landed?: boolean}> = ({landed}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.05, 1.2), 180, 420)}>
      <Bands c={DAY} />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      <Light x={180} y={440} r={12} t={t} />
      {Array.from({length: 10}, (_, i) => <PixG key={i} rows={bird(Math.floor(t * 4 + i) % 2 === 0)} palette={PAL} x={20 + (i % 5) * 70} y={200 + Math.floor(i / 5) * 60 + Math.sin(t * 3 + i) * 4} s={3} />)}
      {landed ? <PixG rows={hoopoe(false)} palette={PAL} x={220} y={ez(t, 0, 0.8, 300, 450)} s={4} /> : <g shapeRendering="auto"><circle cx={250} cy={300} r={18} fill="none" stroke="#e0552a" strokeWidth={3} strokeDasharray="6 4" /></g>}
    </Stage>
  );
};
const queenBack = ['.PPPP.', 'PPPPPP', 'PPPPPP', 'PyPPyP', 'PPPPPP', 'PPPPPP', 'PPPPPP', 'PPPPPP', 'PPPPPP', 'PPPPPP', '.PPPP.'];
export const Sheba: React.FC<{worship?: boolean; glass?: boolean}> = ({worship, glass}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 420)}>
      <Bands c={glass ? DAY : ['#4a2a1a', '#7a3a1e', '#b0502a', '#e07a3a', '#f0a050']} />
      <g shapeRendering="auto"><circle cx={180} cy={glass ? 120 : 170} r={46} fill="#ffd36a" opacity={0.9} />{Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2 + t * 0.4; return <rect key={i} x={180 + Math.cos(a) * 70 - 3} y={(glass ? 120 : 170) + Math.sin(a) * 70 - 3} width={6} height={6} fill="#ffd36a" opacity={0.6} />; })}</g>
      <Rf x={60} y={300} w={240} h={200} c={glass ? '#d8e6ee' : '#c8a060'} /><Rf x={50} y={290} w={260} h={14} c="#d4a73a" />
      {[80, 130, 210, 260].map((x, i) => <Rf key={i} x={x} y={304} w={14} h={196} c={glass ? '#b8d0dc' : '#a88040'} />)}
      <Rf x={150} y={380} w={60} h={70} c="#d4a73a" /><Rf x={160} y={360} w={40} h={30} c="#d4a73a" />
      <PixG rows={queenBack} palette={PAL} x={162} y={390} s={6} smooth />
      <Rf x={0} y={500} w={360} h={140} c={glass ? '#9ccbe0' : '#8a6a42'} />
      {glass && Array.from({length: 14}, (_, i) => <Rf key={i} x={((i * 30 + t * 40) % 380) - 20} y={510 + (i % 4) * 30} w={30} h={2} c="#ffffff" o={0.6} />)}
      {worship && Array.from({length: 6}, (_, i) => <PixG key={i} rows={sujood} palette={{...PAL, P: ['#7e2f22', '#1f5f5c', '#6b3fa0'][i % 3]}} x={10 + i * 58} y={540 + (i % 2) * 12} s={2.2} smooth />)}
    </Stage>
  );
};

// ---------- Musa and the sea ----------
export const Trapped: React.FC<{army?: boolean; panic?: boolean}> = ({army = true, panic}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.3, 1.1), 180, 450, panic ? Math.sin(t * 30) * 2 : 0)}>
      <Bands c={STORM_SKY} />
      <Sea t={t} level={360} amp={18} c="#1a3a5a" speed={1.5} />
      <Rf x={0} y={460} w={360} h={180} c="#8a7050" />
      {Array.from({length: 12}, (_, i) => <PixG key={i} rows={villager(['g', 'b', 'c', 'n', 'M', 'r'][i % 6], panic ? Math.floor(t * 8 + i) % 2 : 0)} palette={PAL} x={20 + (i % 6) * 56 + (panic ? Math.sin(t * 9 + i) * 3 : 0)} y={470 + Math.floor(i / 6) * 34} s={5} smooth />)}
      <Light x={180} y={455} r={10} t={t} />
      {army && <g>{Array.from({length: 8}, (_, i) => <PixG key={i} rows={rider(Math.floor(t * 7 + i) % 2)} palette={SHADOW} x={-20 + i * 48 + t * 6} y={590 + (i % 2) * 10} s={2.2} smooth />)}<Dust t={t} y={620} n={40} c="#5a4a3a" speed={-80} /></g>}
    </Stage>
  );
};
export const ArmyCharge: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.1, 1.35), 180, 470, Math.sin(t * 25) * 2)}>
      <Bands c={['#2a1418', '#4a1e1e', '#7a2e22', '#a8442a', '#c8642e']} />
      <Rf x={0} y={480} w={360} h={160} c="#5a4232" />
      {Array.from({length: 10}, (_, i) => <PixG key={i} rows={rider(Math.floor(t * 8 + i) % 2)} palette={SHADOW} x={-60 + (i % 5) * 80 + t * 40} y={410 + Math.floor(i / 5) * 50} s={3} smooth />)}
      <PixG rows={pharaoh} palette={PAL} x={20 + t * 30} y={360} s={3} smooth />
      <Dust t={t} y={500} n={50} c="#3a2a22" speed={-120} />
    </Stage>
  );
};
// The sea splits: two walls of water rise apart, a dry path opens; flash at the strike.
export const Split: React.FC<{walk?: boolean}> = ({walk}) => {
  const t = useT();
  const p = walk ? 1 : ez(t, 0.3, 2.2, 0, 1);
  const gap = 20 + p * 110;
  return (
    <Stage cam={cam(walk ? ez(t, 0, 4, 1.1, 1.3) : ez(t, 0, 3, 1.4, 1.05), 180, 420, walk ? 0 : shake(t, 0.3, 1.5, 5))}>
      <Bands c={walk ? DAWN_SKY : STORM_SKY} />
      <Rf x={0} y={330} w={360} h={310} c="#c9a466" />
      {[-1, 1].map((side) => <g key={side}>{Array.from({length: 46}, (_, i) => { const x = side < 0 ? 180 - gap - i * 4 : 180 + gap + i * 4; const h = 60 + p * 260 + Math.sin(i * 0.6 + t * 4) * 8 + (i < 3 ? -20 : 0); return <g key={i}><Rf x={x - 2} y={640 - h} w={4} h={h} c={i < 4 ? '#3a7aa8' : '#1f4f78'} /><Rf x={x - 2} y={640 - h} w={4} h={4} c="#cfeaff" o={0.8} /></g>; })}</g>)}
      {!walk && t > 0.25 && t < 0.6 && <Rf x={0} y={0} w={360} h={640} c="#ffffff" o={0.5} />}
      {Array.from({length: 24}, (_, i) => { const life = (t * 1.2 + random('sp' + i)) % 1; const side = i % 2 ? 1 : -1; return <Rf key={i} x={180 + side * (gap + 10) + side * life * 30} y={640 - (60 + p * 260) - life * 40 + life * life * 80} w={3} h={3} c="#cfeaff" o={1 - life} />; })}
      {walk ? <>{Array.from({length: 8}, (_, i) => <PixG key={i} rows={villager(['g', 'b', 'c', 'n'][i % 4], Math.floor(t * 5 + i) % 2)} palette={PAL} x={165 + (i % 2) * 14} y={600 - ((t * 30 + i * 30) % 260)} s={3.5} smooth />)}<Light x={180} y={360} r={9} t={t} /></> : <Light x={180} y={560} r={11} t={t} />}
    </Stage>
  );
};

// ---------- Ibrahim and the idols ----------
const idol = (big: boolean) => raster(big ? 14 : 8, big ? 30 : 16, (set, H) => { const w = big ? 14 : 8; const h = big ? 30 : 16; H.rect(w * 0.25, 0, w * 0.5, h * 0.25, 'e'); H.rect(w * 0.1, h * 0.25, w * 0.8, h * 0.6, 'e'); H.rect(0, h * 0.85, w, h * 0.15, 'E'); if (big) H.rect(w * 0.25, 2, w * 0.5, 2, 'y'); });
export const Temple: React.FC<{smashed?: number; axe?: boolean; crowd?: boolean; light?: boolean; hook?: boolean}> = ({smashed = 0, axe, crowd, light, hook}) => {
  const t = useT();
  const small = [30, 80, 250, 300, 55, 280];
  return (
    <Stage cam={cam(hook ? ez(t, 0, 3, 1.4, 1.15) : ez(t, 0, 4, 1.05, 1.2), 180, 450, shake(t, 0.1, 0.6, smashed > 0 && smashed < 1 ? 5 : 0) + (crowd ? Math.sin(t * 20) : 0))}>
      <Rf x={0} y={0} w={360} h={640} c="#2a2228" />
      {Array.from({length: 6}, (_, i) => <Rf key={i} x={i * 70 + 10} y={120} w={20} h={380} c="#3a3038" />)}
      {[60, 300].map((x, i) => <g key={'tc' + i} shapeRendering="auto"><circle cx={x} cy={260} r={30} fill="#f9a23a" opacity={0.15 + 0.05 * Math.sin(t * 8 + i)} /><rect x={x - 3} y={250 + Math.sin(t * 10 + i) * 2} width={6} height={12} fill="#f9c440" /></g>)}
      <Rf x={0} y={500} w={360} h={140} c="#4a3e3a" />
      <PixG rows={idol(true)} palette={PAL} x={152} y={320} s={4} smooth />
      {axe && <g transform={`translate(196 ${400 + Math.sin(t * 2)}) rotate(30)`}><Rf x={0} y={0} w={5} h={50} c="#6e4a2a" /><Rf x={-12} y={-4} w={18} h={14} c="#c8ccd2" /></g>}
      {small.map((x, i) => { const broken = smashed >= 1 || (smashed > 0 && t > 0.2 + i * 0.15); return broken ? <g key={i}>{Array.from({length: 5}, (_, k) => <Rf key={k} x={x + (k - 2) * 7 + (smashed < 1 ? Math.min(1, (t - 0.2 - i * 0.15) * 3) * (k - 2) * 6 : (k - 2) * 6)} y={490 + (k % 2) * 6} w={11} h={8} c={k % 2 ? '#8b9096' : '#686d74'} />)}</g> : <PixG key={i} rows={idol(false)} palette={PAL} x={x - 12} y={436 - (i > 3 ? 10 : 0)} s={3} smooth />; })}
      {light && <Light x={330} y={460} r={10} t={t} />}
      {crowd && Array.from({length: 8}, (_, i) => <PixG key={'c' + i} rows={villager(['R', 'P', 'n', 'M', 'o', 'b', 'e', 'r'][i], Math.floor(t * 8 + i) % 2)} palette={PAL} x={10 + i * 44} y={540 + (i % 2) * 14 - Math.abs(Math.sin(t * 10 + i)) * 4} s={5} smooth />)}
    </Stage>
  );
};

// ---------- Hajar and Zamzam ----------
const hajarBack = ['.nnnn.', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'n.nn.n'];
const baby = ['.cc.', 'cccc', 'cccc', '.cc.'];
const TwoHills: React.FC = () => <g shapeRendering="auto"><path d="M-40 520 Q40 330 140 520 Z" fill="#8a6a4a" /><path d="M220 520 Q320 330 400 520 Z" fill="#7a5c40" /></g>;
export const Valley: React.FC<{run?: boolean; thirst?: boolean; water?: number; night?: boolean}> = ({run, thirst, water = 0, night}) => {
  const t = useT();
  const hx = run ? 50 + (Math.sin(t * 2.2 - Math.PI / 2) + 1) / 2 * 260 : 140;
  const hy = run ? 440 - Math.abs(Math.cos(t * 2.2)) * 50 : 470;
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 450, thirst ? Math.sin(t * 2) * 2 : 0)}>
      <Bands c={night ? NIGHT_SKY : ['#e8b070', '#f0c080', '#f6d098', '#f6dcb0', '#f6e6c8']} />
      {night && <Stars t={t} n={60} h={300} />}
      <g shapeRendering="auto"><circle cx={290} cy={130} r={40} fill={night ? '#f6efdc' : '#fff1a0'} opacity={0.9} /></g>
      {thirst && Array.from({length: 8}, (_, i) => <Rf key={i} x={0} y={380 + i * 14} w={360} h={2} c="#fff6d0" o={0.15 + 0.1 * Math.sin(t * 6 + i)} />)}
      <TwoHills />
      <Rf x={0} y={500} w={360} h={140} c="#d8b47a" />
      <PixG rows={baby} palette={PAL} x={172} y={506} s={4} />
      <PixG rows={hajarBack} palette={PAL} x={hx - 18} y={hy} s={6} smooth />
      {water > 0 && <g>{Array.from({length: 40}, (_, i) => { const life = (t * 1.4 + random('wz' + i)) % 1; const a = -Math.PI / 2 + (random('wa' + i) - 0.5) * 1.2; return <Rf key={i} x={196 + Math.cos(a) * 80 * life * water} y={520 + Math.sin(a) * 120 * life * water + life * life * 90} w={3} h={4} c="#8fd3f0" o={1 - life} />; })}<g shapeRendering="auto"><ellipse cx={196} cy={526} rx={34 * water} ry={8 * water} fill="#3f86c4" opacity={0.8} /></g></g>}
    </Stage>
  );
};
export const Pilgrims: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 450)}>
      <Bands c={DUSK_SKY} />
      <TwoHills />
      <Rf x={0} y={500} w={360} h={140} c="#9a8a72" />
      {Array.from({length: 40}, (_, i) => { const lane = i % 4; const dir = lane % 2 ? -1 : 1; const x = ((random('pg' + i) * 400 + t * 30 * dir) % 400 + 400) % 400 - 20; return <PixG key={i} rows={villager(['c', 'c', 'e', 'M'][i % 4], Math.floor(t * 5 + i) % 2)} palette={PAL} x={x} y={510 + lane * 28} s={3.4} smooth />; })}
    </Stage>
  );
};
