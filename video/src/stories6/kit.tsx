import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {PAL, villager, raster} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {leader} from '../abasa/Abasa';
import {sujood} from '../musa/Musa';
import {Kaaba} from '../alfil/scenery';
import {Stage, Rf, cam, ez, useT, Light, Flames} from '../fx/fx';
import {Bands, Stars, Mushaf, NIGHT_SKY, DUSK_SKY, DAWN_SKY} from '../fx/scenes';

// Shared scenes for the "old hook" batch. The Prophet ﷺ only ever appears as a soft light.
const Moon: React.FC<{x: number; y: number}> = ({x, y}) => <><Rf x={x} y={y} w={22} h={22} c="#f6efdc" /><Rf x={x + 7} y={y - 3} w={20} h={20} c="#121a33" /></>;
const Sparks: React.FC<{t: number; x: number; y: number; r?: number; n?: number}> = ({t, x, y, r = 60, n = 18}) => <>{Array.from({length: n}, (_, i) => { const life = (t * 0.7 + random('pk' + i)) % 1; const a = random('pa' + i) * Math.PI * 2; return <Rf key={i} x={x + Math.cos(a) * r * life} y={y + Math.sin(a) * r * life - life * 30} w={3} h={3} c="#fff6d0" o={1 - life} />; })}</>;

// A quiet room at night. glow: the Prophet ﷺ as light; dim lowers it (illness); companion: a second warm glow beside it.
export const NightRoom: React.FC<{glow?: number; dim?: number; sparks?: boolean; companion?: boolean; shield?: number; z?: [number, number]}> = ({glow = 1, dim = 0, sparks, companion, shield = 0, z = [1.05, 1.2]}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, z[0], z[1]), 180, 430)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a2038" />
      {Array.from({length: 12}, (_, i) => <Rf key={i} x={0} y={i * 44} w={360} h={2} c="#20284a" />)}
      <Rf x={210} y={130} w={110} h={120} c="#0d1226" /><Stars t={t} n={10} h={110} /><Moon x={260} y={150} />
      <Rf x={206} y={126} w={118} h={6} c="#5a3a22" /><Rf x={206} y={246} w={118} h={6} c="#5a3a22" /><Rf x={262} y={126} w={6} h={126} c="#5a3a22" />
      <Rf x={0} y={500} w={360} h={140} c="#2a2236" />
      <Rf x={70} y={488} w={200} h={14} c="#2f6b4a" /><Rf x={70} y={488} w={200} h={3} c="#d4a73a" />
      <g opacity={glow * (1 - dim * 0.6)}><Light x={150} y={440} r={14 - dim * 5} t={t} /></g>
      {companion && <g opacity={0.8}><g shapeRendering="auto"><circle cx={220} cy={450} r={30} fill="#ffd9a0" opacity={0.18} /></g><Light x={220} y={452} r={7} t={t + 2} /></g>}
      {sparks && <Sparks t={t} x={150} y={440} />}
      {shield > 0 && <g shapeRendering="auto"><ellipse cx={150} cy={440} rx={110 * shield} ry={90 * shield} fill="#fff6d0" opacity={0.08} /><ellipse cx={150} cy={440} rx={110 * shield} ry={90 * shield} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.6} /></g>}
    </Stage>
  );
};
// Amir asleep under a protective glow (the viewer doing it tonight).
export const AmirBed: React.FC = () => {
  const t = useT();
  const sh = ez(t, 0.3, 1.5, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.1, 1.25), 160, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a2038" />
      <Rf x={210} y={130} w={110} h={120} c="#0d1226" /><Stars t={t} n={10} h={110} /><Moon x={260} y={150} />
      <Rf x={40} y={430} w={240} h={70} c="#6e4a2a" /><Rf x={40} y={420} w={240} h={20} c="#e9dfc8" />
      <g transform="translate(60 452) rotate(-90)"><PixG rows={AMIR.poses.idle} palette={PAL} s={3.2} smooth /></g>
      <Rf x={100} y={402} w={170} h={30} c="#2f6b4a" /><Rf x={100} y={402} w={170} h={4} c="#d4a73a" />
      <g shapeRendering="auto"><ellipse cx={160} cy={430} rx={150 * sh} ry={120 * sh} fill="#fff6d0" opacity={0.1} /><ellipse cx={160} cy={430} rx={150 * sh} ry={120 * sh} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.7} /></g>
      <Rf x={0} y={540} w={360} h={100} c="#2a2236" />
    </Stage>
  );
};
export const MushafShot: React.FC<{lit?: number}> = ({lit = 6}) => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 4, 1, 1.15), 180, 400)}><Mushaf t={t} lit={Math.min(lit, t * 4)} /></Stage>;
};
// Masjid interior. pose: Amir standing (idle), in dua, or in sujood; rays: light from above.
const Arches: React.FC = () => <>{[0, 120, 240].map((x, i) => <g key={i}><Rf x={x + 10} y={120} w={100} h={380} c="#1f3a34" /><g shapeRendering="auto"><path d={`M${x + 20} 500 L${x + 20} 220 Q${x + 60} 150 ${x + 100} 220 L${x + 100} 500 Z`} fill="#0f2420" /></g></g>)}</>;
export const Masjid: React.FC<{pose?: 'idle' | 'dua' | 'sujood'; rays?: number; rows?: boolean; z?: [number, number]}> = ({pose = 'idle', rays = 0, rows, z = [1.05, 1.2]}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, z[0], z[1]), 180, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#16302a" /><Arches />
      <Rf x={0} y={500} w={360} h={140} c="#7a2a2a" />{Array.from({length: 6}, (_, i) => <Rf key={i} x={0} y={510 + i * 22} w={360} h={2} c="#5a1e1e" />)}
      {rays > 0 && <g shapeRendering="auto" opacity={rays * (0.7 + 0.3 * Math.sin(t * 3))}><polygon points="150,0 210,0 250,520 110,520" fill="#fff6d0" opacity={0.18} /></g>}
      {rows && Array.from({length: 7}, (_, i) => <PixG key={i} rows={AMIR.poses.idle} palette={PAL} x={20 + i * 48} y={430} s={2.2} smooth />)}
      {!rows && (pose === 'sujood' ? <PixG rows={sujood} palette={{...PAL, P: '#2f6b4a'}} x={130} y={474} s={4} smooth /> : <PixG rows={AMIR.poses[pose]} palette={PAL} x={150} y={400} s={3} smooth />)}
      {rays > 0 && <Sparks t={t} x={180} y={300} r={90} n={14} />}
    </Stage>
  );
};
// Makkah: Mount Safa with the Prophet ﷺ as light on top and Quraysh gathered below.
export const Safa: React.FC<{angry?: boolean}> = ({angry}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, angry ? 1.4 : 1.05, angry ? 1.6 : 1.2), angry ? 250 : 180, angry ? 520 : 420, angry ? Math.sin(t * 40) * 2 : 0)}>
      <Bands c={DAWN_SKY} />
      <g shapeRendering="auto"><path d="M40 520 L150 300 Q180 280 210 300 L320 520 Z" fill="#8a6a4a" /><path d="M150 300 Q180 280 210 300 L230 340 L130 340 Z" fill="#a4825a" /></g>
      <Light x={180} y={275} r={10} t={t} />
      <Rf x={0} y={520} w={360} h={120} c="#c9a466" />
      {Array.from({length: 9}, (_, i) => <PixG key={i} rows={villager(['g', 'b', 'c', 'n', 'M', 'r', 'P', 'e', 'o'][i], 0)} palette={PAL} x={10 + i * 38} y={540 + (i % 2) * 10} s={5} smooth />)}
      <PixG rows={leader('R')} palette={PAL} x={250} y={470 - (angry ? Math.abs(Math.sin(t * 14)) * 5 : 0)} s={3.4} smooth />
    </Stage>
  );
};
export const Fire: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.2, 1.05), 180, 440, t < 0.2 ? 4 : 0)}>
      <Rf x={0} y={0} w={360} h={640} c="#140806" />
      <Flames x={0} y={640} w={360} h={360} t={t} n={140} />
      <PixG rows={leader('R')} palette={{...PAL, ...Object.fromEntries(Object.keys(PAL).map((k) => [k, '#0a0404']))}} x={160} y={340} s={3.4} smooth />
    </Stage>
  );
};
// Abu Lahab alone as the years pass (sun and moon cycling).
export const Years: React.FC = () => {
  const t = useT();
  const ph = (t * 1.5) % 1;
  const day = Math.sin(ph * Math.PI);
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.1, 1.25), 180, 450)}>
      <Bands c={day > 0.4 ? DAWN_SKY : NIGHT_SKY} />
      {day <= 0.4 && <Stars t={t * 3} n={40} h={300} />}
      <g shapeRendering="auto"><circle cx={-20 + ph * 400} cy={320 - day * 200} r={16} fill={day > 0.4 ? '#fff1a0' : '#e8ecf6'} /></g>
      <Rf x={0} y={520} w={360} h={120} c="#8a6a42" />
      <PixG rows={leader('R')} palette={PAL} x={160} y={445} s={3.4} smooth />
    </Stage>
  );
};
export const Dark: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(1.1, 180, 450)}><Rf x={0} y={0} w={360} h={640} c="#07060a" /><g opacity={ez(t, 0, 1, 0.8, 0.2)}><PixG rows={leader('R')} palette={PAL} x={160} y={445} s={3.4} smooth /></g></Stage>;
};
// Madinah at night.
export const Madinah: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.05, 1.2), 180, 430, ez(t, 0, 3, 15, -15))}>
      <Bands c={NIGHT_SKY} /><Stars t={t} n={60} h={320} /><Moon x={260} y={120} />
      {[10, 70, 130, 190, 250, 300].map((x, i) => <g key={i}><Rf x={x} y={360 + (i % 3) * 20} w={56} h={200} c={['#3a3248', '#443a52', '#4e4458'][i % 3]} /><Rf x={x + 20} y={400 + (i % 3) * 20} w={10} h={14} c="#f9d77a" o={0.8} /></g>)}
      <Rf x={0} y={540} w={360} h={100} c="#2a2228" />
    </Stage>
  );
};
// Companions on their knees around the Prophet ﷺ (light).
export const Kneel: React.FC<{calm?: boolean}> = ({calm}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.15, 1.3), 180, 470, calm ? 0 : Math.sin(t * 20))}>
      <Bands c={calm ? DAWN_SKY : DUSK_SKY} />
      <Rf x={0} y={500} w={360} h={140} c={calm ? '#c9a466' : '#5a4636'} />
      <Light x={180} y={440} r={calm ? 13 : 10} t={t} />
      {[40, 90, 270, 320].map((x, i) => <g key={i} transform={`translate(0 ${calm ? 0 : 14})`}><PixG rows={villager(['g', 'b', 'c', 'n'][i], 0)} palette={PAL} x={x - 12} y={calm ? 456 : 448} s={6} smooth /></g>)}
      {calm && <Sparks t={t} x={180} y={430} r={120} n={22} />}
    </Stage>
  );
};
// The Kaaba surrounded by idols; Quraysh leaders. offer: they step toward the light; leave: they walk off.
const idol = raster(8, 16, (set, H) => { H.rect(2, 0, 4, 4, 'e'); H.rect(1, 4, 6, 9, 'e'); H.rect(0, 13, 8, 3, 'E'); });
export const KaabaIdols: React.FC<{offer?: boolean; leave?: boolean; light?: boolean}> = ({offer, leave, light}) => {
  const t = useT();
  const dx = offer ? ez(t, 0, 2, 0, 40) : leave ? ez(t, 0.3, 2.5, 0, -160) : 0;
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.05, 1.2), 180, 430)}>
      <Bands c={DUSK_SKY} />
      <Rf x={0} y={500} w={360} h={140} c="#b89a70" />
      <Kaaba x={124} y={404} s={4} />
      {[20, 60, 290, 330].map((x, i) => <PixG key={i} rows={idol} palette={PAL} x={x - 10} y={440} s={3.5} smooth />)}
      {[0, 1, 2].map((i) => <PixG key={i} rows={leader(['R', 'P', 'n'][i])} palette={PAL} x={30 + i * 50 + dx} y={500} s={3} smooth />)}
      {light && <Light x={290} y={540} r={12} t={t} />}
    </Stage>
  );
};
