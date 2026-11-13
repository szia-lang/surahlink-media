import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, interpolateColors, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG, PixStage, R} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {SuralinkIcon, BRAND} from '../components/SuralinkLogo';
import {PAL, SHADOW, rider, villager, goldChest, shadowMan} from '../alfil/sprites';
import {Ground} from '../alfil/scenery';
import {AMIR} from '../characters/amir';

const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const T = (s: number) => Math.round(s * 30);
const zoom = (z: number, cx = 90, cy = 200) => `translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`;
const COLORS = ['g', 'r', 'b', 'c', 'n', 'M'];

// ================= scenery =================
const Sky: React.FC<{bands: string[]}> = ({bands}) => (
  <>{bands.map((c, i) => <R key={i} x={0} y={i * 36} w={180} h={i === bands.length - 1 ? 320 : 36} c={c} />)}</>
);
const DUSK = ['#3a1f3d', '#5a2a45', '#87374a', '#b5503f', '#d4703f'];

// Two cliff faces with a gap between them. gapL/gapR are the inner cliff edges.
const TwinMountains: React.FC<{gapL?: number; gapR?: number; c?: string; d?: string}> = ({gapL = 52, gapR = 128, c = '#6b5442', d = '#4b3a33'}) => (
  <>
    {Array.from({length: 90}, (_, i) => {
      const x = i * 2;
      if (x >= gapL && x < gapR) return null;
      const edge = x < gapL ? gapL - x : x - gapR;
      const y = Math.round(70 + 18 * Math.sin(i / 4.2) + 8 * Math.sin(i / 1.7) - Math.min(edge, 30) * 0.3 + Math.max(0, 10 - edge) * 1.5);
      return (
        <g key={i}>
          <R x={x} y={y} w={2} h={320} c={edge < 8 ? d : c} />
          <R x={x} y={y} w={2} h={2} c="#8a7058" />
          {i % 5 === 0 && <R x={x} y={y + 30 + (i % 3) * 20} w={2} h={14} c={d} />}
        </g>
      );
    })}
  </>
);

// The wall: rows of iron blocks between the cliffs. built 0..1, heat 0..1, copper 0..1, cracks 0..1.
const WALL = {x: 52, w: 76, top: 120, bottom: 262};
const crackPts = [[4, 30], [16, 46], [10, 62], [26, 78], [40, 70], [52, 90], [46, 108], [64, 122], [72, 136]];
const Wall: React.FC<{built?: number; heat?: number; copper?: number; cracks?: number; t?: number}> = ({built = 1, heat = 0, copper = 1, cracks = 0, t = 0}) => {
  const rows = Math.floor((WALL.bottom - WALL.top) / 8);
  const shown = Math.ceil(rows * built);
  const iron = interpolateColors(heat, [0, 0.5, 1], ['#4a4f57', '#c2412a', '#f6b13d']);
  const seam = interpolateColors(heat, [0, 0.5, 1], ['#2e3238', '#7e2418', '#e07a2a']);
  const copperH = copper * (WALL.bottom - WALL.top);
  return (
    <>
      {Array.from({length: shown}, (_, r) => {
        const y = WALL.bottom - (r + 1) * 8;
        const off = r % 2 ? 6 : 0;
        return (
          <g key={r}>
            <R x={WALL.x} y={y} w={WALL.w} h={8} c={iron} />
            <R x={WALL.x} y={y} w={WALL.w} h={1} c={seam} />
            {Array.from({length: 7}, (_, k) => <R key={k} x={WALL.x + off + k * 12} y={y} w={1} h={8} c={seam} />)}
          </g>
        );
      })}
      {copper > 0 && (
        <>
          <R x={WALL.x} y={WALL.top} w={WALL.w} h={copperH} c="#b06a34" o={0.72} />
          <R x={WALL.x} y={WALL.top} w={WALL.w} h={3} c="#e09a5a" />
          {Array.from({length: 19}, (_, i) => <R key={i} x={WALL.x + i * 4} y={WALL.top + copperH - 1} w={3} h={2 + Math.round(random('drip' + i) * 6 * copper)} c="#a8642f" />)}
          {Array.from({length: 4}, (_, i) => <R key={'sh' + i} x={WALL.x + 8 + i * 20} y={WALL.top + 10 + i * 9} w={10} h={2} c="#f0b878" o={0.55 * copper} />)}
        </>
      )}
      {cracks > 0 && crackPts.slice(0, Math.max(2, Math.ceil(crackPts.length * cracks))).map(([x, y], i, arr) => {
        if (i === 0) return null;
        const [px, py] = arr[i - 1];
        const steps = 8;
        return Array.from({length: steps}, (_, s) => <R key={`${i}-${s}`} x={WALL.x + px + ((x - px) * s) / steps} y={WALL.top + py + ((y - py) * s) / steps} w={2} h={2} c="#fbe7a1" o={0.7 + 0.3 * Math.sin(t / 3)} />);
      })}
    </>
  );
};

// Shadows of Gog and Magog: only ever dark silhouettes, never faces.
const ShadowCrowd: React.FC<{f: number; n?: number; y: number; spread?: number; climb?: boolean}> = ({f, n = 30, y, spread = 180, climb}) => (
  <>
    {Array.from({length: n}, (_, i) => {
      const x = random('cx' + i) * spread;
      const bob = Math.abs(Math.sin((f + i * 5) / 4)) * 3;
      const cy = climb ? y - ((f * (0.6 + random('cs' + i)) + random('co' + i) * 30) % 26) : y + random('cy' + i) * 14 - bob;
      return <PixG key={i} rows={shadowMan(Math.floor((f + i) / 4) % 2, climb)} palette={SHADOW} x={x} y={cy} s={2} />;
    })}
  </>
);

const WallScene: React.FC<{f: number; dark?: number; cracks?: number; shadows?: boolean}> = ({f, dark = 0, cracks = 0, shadows = true}) => (
  <>
    <Sky bands={DUSK} />
    {shadows && Array.from({length: 14}, (_, i) => <R key={i} x={60 + random('sm' + i) * 60} y={100 - ((f * 0.5 + random('st' + i) * 60) % 60)} w={4} h={4} c="#2a1a24" o={0.5} />)}
    <TwinMountains />
    <Wall cracks={cracks} t={f} />
    <Ground y={262} c="#6b5442" d="#54412f" />
    <R x={0} y={0} w={180} h={320} c="#0d0a14" o={dark} />
  </>
);

// ================= shots =================
const WallHero: React.FC<{z0: number; z1: number; len: number}> = ({z0, z1, len}) => {
  const f = useCurrentFrame();
  const thump = f % 40 < 3 ? (f % 2 ? 1 : -1) : 0;
  return (
    <PixStage cam={`${zoom(interpolate(f, [0, len], [z0, z1], clamp), 90, 190)} translate(${thump} 0)`}>
      <WallScene f={f} />
      {Array.from({length: 6}, (_, i) => <PixG key={i} rows={shadowMan(0, true)} palette={SHADOW} x={WALL.x + 6 + i * 12} y={WALL.top - 12 + Math.abs(Math.sin((f + i * 9) / 6)) * 4} s={1.5} />)}
    </PixStage>
  );
};

const CrowdBehind: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 48], [1.1, 1.25]), 90, 200)}>
      <R x={0} y={0} w={180} h={320} c="#1c1022" />
      <R x={0} y={0} w={180} h={120} c="#3a1f3d" />
      <R x={0} y={70} w={180} h={150} c="#4a4f57" />
      <R x={0} y={70} w={180} h={4} c="#e09a5a" />
      {Array.from({length: 22}, (_, i) => <R key={i} x={i * 9} y={74} w={1} h={146} c="#2e3238" />)}
      <ShadowCrowd f={f} n={46} y={214} />
      <ShadowCrowd f={f} n={12} y={190} climb />
    </PixStage>
  );
};

const Timelapse: React.FC = () => {
  const f = useCurrentFrame();
  const p = f / 57;
  const sky = interpolateColors(p, [0, 0.25, 0.5, 0.75, 1], ['#d4703f', '#1b1530', '#8fc7e0', '#d4703f', '#1b1530']);
  const a = p * Math.PI * 2;
  return (
    <PixStage>
      <R x={0} y={0} w={180} h={320} c={sky} />
      <R x={86 + Math.cos(a) * 70} y={140 - Math.sin(a) * 90} w={12} h={12} c="#fbe0a6" />
      <TwinMountains />
      <Wall />
      <Ground y={262} c="#6b5442" d="#54412f" />
    </PixStage>
  );
};

const RiderShot: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={`translate(0 ${f % 8 < 2 ? 1 : 0})`}>
      <Sky bands={['#f3c58d', '#efb07c', '#e89a6a', '#de8a5e', '#d27a56']} />
      {Array.from({length: 90}, (_, i) => <R key={i} x={i * 2} y={196 - 8 - 8 * Math.sin((i + f * 0.6) / 8)} w={2} h={320} c="#e6c88c" />)}
      <Ground y={220} c="#c9a466" d="#b58f55" scroll={f * 4} />
      {Array.from({length: 6}, (_, i) => { const x = ((i * 36 - f * 2.5) % 220 + 220) % 220 - 20; return <g key={i}><R x={x} y={176} w={2} h={44} c="#3b2a20" /><R x={x + 2} y={176 + (Math.floor((f + i) / 5) % 2)} w={12} h={7} c="#1f5f5c" /><R x={x + 2} y={181} w={12} h={2} c="#d4a73a" /></g>; })}
      <PixG rows={rider(Math.floor(f / 5) % 2)} palette={PAL} x={44} y={136} s={3} />
    </PixStage>
  );
};

const Sunset: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 60], [1, 1.1]), 90, 200)}>
      <Sky bands={['#3a1f3d', '#6e2a3e', '#a8382f', '#d4562f', '#e8793a']} />
      <R x={60} y={170 + f * 0.25} w={60} h={34} c="#f6b13d" /><R x={68} y={162 + f * 0.25} w={44} h={8} c="#f6b13d" />
      <R x={0} y={205} w={180} h={115} c="#2b2620" />
      {Array.from({length: 30}, (_, i) => <R key={i} x={random('wx' + i) * 170} y={210 + random('wy' + i) * 30 + Math.sin((f + i * 4) / 6)} w={6} h={1} c="#5a3a22" />)}
      <R x={0} y={250} w={180} h={70} c="#3b3026" />
      <PixG rows={rider(0)} palette={SHADOW} x={120} y={218} s={1.5} flip />
    </PixStage>
  );
};

const Sunrise: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage>
      <Sky bands={['#8fc7e0', '#b6dcea', '#f3d9a0', '#f3c58d', '#efb07c']} />
      <R x={70} y={196 - f * 0.8} w={40} h={40} c="#fbe0a6" />
      <R x={0} y={212} w={180} h={108} c="#7a9a4a" />
      {Array.from({length: 40}, (_, i) => <R key={i} x={random('gx' + i) * 178} y={216 + random('gy' + i) * 100} w={2} h={2} c="#5f7f38" />)}
      <PixG rows={rider(Math.floor(f / 5) % 2)} palette={PAL} x={-30 + f * 2.4} y={190} s={2} />
    </PixStage>
  );
};

const Pass: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 84], [1, 1.25]), 90, 230)}>
      <Sky bands={DUSK} />
      <TwinMountains />
      <Ground y={262} c="#6b5442" d="#54412f" />
      <PixG rows={rider(Math.floor(f / 6) % 2)} palette={PAL} x={20 + f * 0.6} y={240} s={0.75} />
    </PixStage>
  );
};

const Village: React.FC<{amir?: boolean}> = ({amir = true}) => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 51], [1.15, 1]), 90, 230)}>
      <Sky bands={DUSK} />
      <TwinMountains c="#5a463c" d="#443432" />
      <R x={0} y={250} w={180} h={70} c="#8a6e52" />
      {[6, 30, 140, 160].map((x, i) => <g key={i}><R x={x} y={226} w={18} h={24} c="#b89a74" /><R x={x + 6} y={236} w={5} h={8} c="#3b3026" /></g>)}
      {Array.from({length: 9}, (_, i) => <PixG key={i} rows={villager(COLORS[i % 6], 0)} palette={PAL} x={40 + i * 8} y={262 + (i % 2) * 6 - Math.abs(Math.sin((f + i * 4) / 5)) * 2} s={2} />)}
      {amir && <PixG rows={AMIR.poses.idle} palette={PAL} x={22} y={258} s={1.6} />}
      <PixG rows={rider(0)} palette={PAL} x={118} y={246} s={1.5} flip />
    </PixStage>
  );
};

const Corrupters: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={`translate(${f % 6 < 2 ? 1 : 0} 0)`}>
      <Sky bands={['#1c1022', '#3a1428', '#6e1f2a', '#a8382f', '#c4512f']} />
      <TwinMountains c="#2a1c22" d="#1c1218" />
      <R x={0} y={262} w={180} h={58} c="#2b1e1c" />
      {Array.from({length: 50}, (_, i) => {
        const t = (f * 1.4 + random('fl' + i) * 80) % 80;
        const x = 70 + (random('fx' + i) - 0.5) * 30 + (random('fd' + i) - 0.5) * t * 2.2;
        return <PixG key={i} rows={shadowMan(Math.floor((f + i) / 3) % 2)} palette={SHADOW} x={x} y={200 + t * 0.9} s={2} />;
      })}
      {[10, 150].map((x, i) => <g key={i}><R x={x} y={276} w={20} h={20} c="#1a1012" />{Array.from({length: 4}, (_, k) => <R key={k} x={x + 2 + k * 5} y={268 - (Math.floor((f + k * 3) / 3) % 3) * 2} w={3} h={6} c="#f6b13d" />)}</g>)}
    </PixStage>
  );
};

const Chest: React.FC<{refuse?: boolean}> = ({refuse}) => {
  const f = useCurrentFrame();
  const open = !refuse || f < 6;
  const slide = refuse ? interpolate(f, [6, 20], [0, -30], clamp) : 0;
  const shake = refuse && f >= 6 && f < 12 ? (f % 2 ? 3 : -3) : 0;
  return (
    <PixStage cam={`translate(${shake} 0) ${zoom(refuse ? 1.1 : interpolate(f, [0, 60], [1, 1.12]), 90, 220)}`}>
      <R x={0} y={0} w={180} h={320} c="#2a1a24" />
      <R x={0} y={240} w={180} h={80} c="#5a3a22" />
      <R x={0} y={240} w={180} h={2} c="#7a5232" />
      <PixG rows={goldChest(open)} palette={PAL} x={40 + slide} y={176} s={5} />
      {open && Array.from({length: 14}, (_, i) => <R key={i} x={60 + slide + random('cx' + i) * 60} y={150 + random('cy' + i) * 40} w={2} h={2} c="#fbe7a1" o={Math.floor((f + i * 3) / 4) % 2} />)}
    </PixStage>
  );
};

const Ruler: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 81], [1, 1.12]), 90, 220)}>
      <Sky bands={DUSK} />
      <g opacity={0.25}>{Array.from({length: 10}, (_, i) => { const a = (i / 10) * Math.PI * 2 + f / 60; return <R key={i} x={92 + Math.cos(a) * 60} y={180 + Math.sin(a) * 60} w={8} h={8} c="#fbe7a1" />; })}</g>
      <R x={0} y={252} w={180} h={68} c="#8a6e52" />
      <PixG rows={rider(0)} palette={PAL} x={42} y={158} s={3} />
      {Array.from({length: 5}, (_, i) => <PixG key={i} rows={villager(COLORS[i], 0)} palette={PAL} x={8 + i * 34} y={262} s={2} />)}
    </PixStage>
  );
};

const Cheer: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(1.1, 90, 240)}>
      <Sky bands={DUSK} />
      <R x={0} y={250} w={180} h={70} c="#8a6e52" />
      {Array.from({length: 12}, (_, i) => {
        const jump = Math.abs(Math.sin((f + i * 3) / 4)) * 8;
        const x = 6 + (i % 6) * 29;
        const y = 236 + Math.floor(i / 6) * 22 - jump;
        return <g key={i}><PixG rows={villager(COLORS[i % 6], 0)} palette={PAL} x={x} y={y} s={2} /><R x={x + 7} y={y - 8} w={2} h={8} c="#5a3a22" /><R x={x + 4} y={y - 10} w={8} h={4} c="#686d74" /></g>;
      })}
    </PixStage>
  );
};

const CarryIron: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage>
      <Sky bands={DUSK} />
      <TwinMountains />
      <Ground y={262} c="#6b5442" d="#54412f" />
      {Array.from({length: 8}, (_, i) => {
        const x = ((i * 26 + f * 1.6) % 210) - 20;
        return <g key={i}><PixG rows={villager(COLORS[i % 6], Math.floor((f + i) / 4) % 2)} palette={PAL} x={x} y={268} s={2} /><R x={x - 4} y={262} w={16} h={5} c="#4a4f57" /><R x={x - 4} y={262} w={16} h={1} c="#8b9096" /></g>;
      })}
    </PixStage>
  );
};

const Stack: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 60], [1.1, 1]), 90, 200)}>
      <Sky bands={DUSK} />
      <TwinMountains />
      <Wall built={interpolate(f, [0, 55], [0.08, 1], clamp)} copper={0} />
      <Ground y={262} c="#6b5442" d="#54412f" />
      <Dust f={f} />
    </PixStage>
  );
};
const Dust: React.FC<{f: number}> = ({f}) => <>{Array.from({length: 16}, (_, i) => <R key={i} x={WALL.x + random('dx' + i) * WALL.w} y={262 - ((f * 0.8 + random('dy' + i) * 30) % 30)} w={2} h={2} c="#c4a96f" o={0.6} />)}</>;

const Bellows: React.FC = () => {
  const f = useCurrentFrame();
  const heat = interpolate(f, [0, 80], [0, 1], clamp);
  const pump = Math.abs(Math.sin(f / 4));
  return (
    <PixStage cam={`translate(${f % 10 < 2 ? 1 : 0} 0)`}>
      <Sky bands={DUSK} />
      <TwinMountains />
      <Wall copper={0} heat={heat} />
      <R x={WALL.x - 10} y={WALL.top - 20} w={WALL.w + 20} h={WALL.bottom - WALL.top + 20} c="#f6b13d" o={heat * 0.18} />
      <Ground y={262} c="#6b5442" d="#54412f" />
      {[20, 132].map((x, i) => <g key={i}><R x={x} y={266 + pump * 6} w={28} h={14 - pump * 6} c="#5a3a22" /><R x={x} y={264 + pump * 6} w={28} h={2} c="#3b2a18" /><R x={i ? x - 6 : x + 28} y={272} w={6} h={3} c="#3b2a18" /></g>)}
      {Array.from({length: 26}, (_, i) => { const t = (f * 2 + random('sp' + i) * 40) % 40; return <R key={i} x={WALL.x + random('spx' + i) * WALL.w + (random('spd' + i) - 0.5) * t * 2} y={WALL.top + random('spy' + i) * 120 - t * 1.5} w={1} h={1} c="#fbe7a1" o={heat * (1 - t / 40)} />; })}
    </PixStage>
  );
};

const CopperPour: React.FC = () => {
  const f = useCurrentFrame();
  const copper = interpolate(f, [8, 100], [0, 1], clamp);
  return (
    <PixStage cam={zoom(interpolate(f, [0, 114], [1.05, 1.15]), 90, 190)}>
      <Sky bands={DUSK} />
      <TwinMountains />
      <Wall heat={interpolate(f, [0, 100], [1, 0.3], clamp)} copper={copper} />
      {Array.from({length: 4}, (_, i) => <R key={i} x={WALL.x + 10 + i * 18} y={60} w={4} h={WALL.top - 60 + copper * 120} c="#d98a3c" o={copper < 1 ? 0.95 : 0} />)}
      <R x={WALL.x} y={52} w={WALL.w} h={8} c="#5a3a22" />
      <Ground y={262} c="#6b5442" d="#54412f" />
    </PixStage>
  );
};

const ShadowsFail: React.FC<{close?: boolean}> = ({close}) => {
  const f = useCurrentFrame();
  if (close) {
    return (
      <PixStage cam={`translate(${f % 12 < 2 ? 2 : 0} 0)`}>
        <R x={0} y={0} w={180} h={320} c="#9a5a2c" />
        {Array.from({length: 14}, (_, r) => <g key={r}><R x={0} y={r * 24} w={180} h={2} c="#6e3e1e" />{Array.from({length: 5}, (_, k) => <R key={k} x={(r % 2 ? 18 : 0) + k * 36} y={r * 24} w={2} h={24} c="#6e3e1e" />)}</g>)}
        {Array.from({length: 6}, (_, i) => <R key={'g' + i} x={10 + i * 28} y={20 + i * 46} w={22} h={3} c="#f0b878" o={0.5} />)}
        {Array.from({length: 7}, (_, i) => {
          const t = (f + i * 11) % 30;
          const x = 10 + i * 24;
          return <g key={i}><PixG rows={shadowMan(0, true)} palette={SHADOW} x={x} y={150 + t * 3} s={4} />{t < 4 && <R x={x + 4} y={150 + t * 3} w={8} h={2} c="#fbe7a1" />}</g>;
        })}
      </PixStage>
    );
  }
  return (
    <PixStage cam={zoom(interpolate(f, [0, 81], [1, 1.08]), 90, 190)}>
      <WallScene f={f} />
      {Array.from({length: 10}, (_, i) => {
        const t = (f * 1.2 + i * 9) % 50;
        const up = t < 30 ? t : 30 - (t - 30) * 3;
        return <PixG key={i} rows={shadowMan(0, true)} palette={SHADOW} x={WALL.x + 2 + i * 7} y={WALL.top + 30 - up} s={1.5} />;
      })}
    </PixStage>
  );
};

const WallNight: React.FC<{cracks?: number}> = ({cracks = 0}) => {
  const f = useCurrentFrame();
  const shake = cracks > 0 && f % 20 < 2 ? 1 : 0;
  return (
    <PixStage cam={`translate(${shake} 0) ${zoom(interpolate(f, [0, 96], [1, 1.1]), 90, 190)}`}>
      <WallScene f={f} dark={0.45} cracks={cracks} />
      {Array.from({length: 30}, (_, i) => <R key={i} x={random('ns' + i) * 180} y={random('nt' + i) * 100} w={1} h={1} c="#f6efdc" o={0.5} />)}
    </PixStage>
  );
};

const CrackShot: React.FC = () => {
  const f = useCurrentFrame();
  const c = interpolate(f, [10, 70], [0, 1], clamp);
  return (
    <PixStage cam={`translate(${f % 14 < 2 ? 2 : 0} 0) ${zoom(1.15, 90, 190)}`}>
      <WallScene f={f} dark={0.4} cracks={c} />
      <R x={WALL.x} y={WALL.top} w={WALL.w} h={WALL.bottom - WALL.top} c="#fbe7a1" o={c * 0.1} />
    </PixStage>
  );
};

const CtaShot: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 96], [1, 1.06]), 90, 220)}>
      <WallScene f={f} dark={0.2} />
      <PixG rows={AMIR.poses.point} palette={PAL} x={20} y={226} s={2} />
    </PixStage>
  );
};

const CtaBanner: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13}});
  const btn = spring({frame: f - 12, fps, config: {damping: 11}});
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 150, transform: `translateY(${interpolate(s, [0, 1], [-700, 0])}px)`, background: BRAND.cream, borderRadius: 48, padding: '36px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, boxShadow: '0 30px 60px rgba(0,0,0,.4)', fontFamily: nunito}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <SuralinkIcon size={110} />
        <div style={{fontSize: 80, fontWeight: 900, color: BRAND.purple, letterSpacing: -2}}>SuraLink</div>
      </div>
      <div style={{fontSize: 44, fontWeight: 900, color: BRAND.ink}}>Understand the stories you recite<span style={{color: BRAND.orange}}>.</span></div>
      <div style={{transform: `scale(${btn})`, background: BRAND.purple, color: 'white', fontSize: 50, fontWeight: 800, padding: '24px 60px', borderRadius: 999}}>Download SuraLink →</div>
      <div style={{fontSize: 32, fontWeight: 700, color: BRAND.muted}}>Link in bio</div>
    </div>
  );
};

const Flash: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: 'white', opacity: interpolate(f, [0, 2, 8], [0, 0.85, 0], clamp)}} />;
};

// ================= timeline (from the narration's word timestamps) =================
export const GM_DURATION = 55.64;
type Seg = [number, number, React.ReactNode];
const SHOTS: Seg[] = [
  [0, 2.6, <WallHero z0={1} z1={1.08} len={T(2.6)} />],
  [2.6, 4.2, <CrowdBehind />],
  [4.2, 6.1, <Timelapse />],
  [6.1, 8.9, <RiderShot />],
  [8.9, 10.9, <Sunset />],
  [10.9, 12.5, <Sunrise />],
  [12.5, 15.3, <Pass />],
  [15.3, 17.0, <Village />],
  [17.0, 19.9, <Corrupters />],
  [19.9, 21.9, <Chest />],
  [21.9, 22.8, <Chest refuse />],
  [22.8, 25.5, <Ruler />],
  [25.5, 27.0, <Cheer />],
  [27.0, 28.5, <CarryIron />],
  [28.5, 30.5, <Stack />],
  [30.5, 33.3, <Bellows />],
  [33.3, 37.1, <CopperPour />],
  [37.1, 39.8, <ShadowsFail />],
  [39.8, 42.5, <ShadowsFail close />],
  [42.5, 44.6, <WallNight />],
  [44.6, 47.8, <CrackShot />],
  [47.8, 51.0, <CtaShot />],
  [51.0, 53.6, <WallNight cracks={0.5} />],
  // ends on the exact framing the video opens with, so the loop is seamless
  [53.6, GM_DURATION, <WallHero z0={0.94} z1={1} len={T(GM_DURATION) - T(53.6)} />],
];

const CAPTIONS: Seg[] = [
  [0, 2.6, <Caption text="A wall of *iron and molten copper*," />],
  [2.6, 4.2, <Caption text="holding back *Gog and Magog*" />],
  [4.2, 6.1, <Caption text="until the *end of days*." />],
  [6.1, 8.9, <Caption text="The Quran tells of a ruler named *Dhul-Qarnayn*," />],
  [8.9, 10.9, <Caption text="who traveled to where the *sun sets*," />],
  [10.9, 12.5, <Caption text="then to where it *rises*," />],
  [12.5, 15.3, <Caption text="then to a pass *between two mountains*." />],
  [15.3, 17.0, <Caption text="There, a people *begged him*:" />],
  [17.0, 19.9, <Caption text="“Gog and Magog are *great corrupters* in the land.”" />],
  [19.9, 21.9, <Caption text="They offered him *money* to build a barrier." />],
  [21.9, 22.8, <Caption text="He *refused*." />],
  [22.8, 25.5, <Caption text="“That in which my Lord has established me is *better*.”" />],
  [25.5, 27.0, <Caption text="“But assist me with *strength*.”" />],
  [27.0, 28.5, <Caption text="“Bring me *sheets of iron*.”" />],
  [28.5, 30.5, <Caption text="He stacked them between the *mountain walls*." />],
  [30.5, 33.3, <Caption text="“Blow,” until the iron *glowed like fire*." />],
  [33.3, 37.1, <AyahCard refKey="18:96" range={[14, 18]} gold={[18]} partial tr="Bring me, that I may pour over it *molten copper*" />],
  [37.1, 42.5, <AyahCard refKey="18:97" gold={[3, 7]} trSize={40} tr="So Gog and Magog were *unable to pass over it*, nor were they able to effect in it any *penetration*" />],
  [42.5, 44.6, <Caption text="But he knew it would *not last forever*." />],
  [44.6, 47.8, <AyahCard refKey="18:98" range={[5, 10]} gold={[10]} partial tr="When the promise of my Lord comes, He will make it *level*" />],
  [47.8, 51.0, <CtaBanner />],
  [51.0, 53.6, <Caption text="Because one day, that wall will *fall*." />],
  [53.6, GM_DURATION, <Caption text="But until then, they're *trapped behind*…" />],
];

const FLASHES = [2.6, 17.0, 21.9, 33.3, 44.6];

export const GogMagog: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el], i) => <Sequence key={'s' + i} from={T(a)} durationInFrames={T(b) - T(a)}><AbsoluteFill>{el}</AbsoluteFill></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={T(a)} durationInFrames={T(b) - T(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={T(t)} durationInFrames={10}><Flash /></Sequence>)}
    <Audio src={staticFile('audio/gogmagog-narration.mp3')} />
  </AbsoluteFill>
);
