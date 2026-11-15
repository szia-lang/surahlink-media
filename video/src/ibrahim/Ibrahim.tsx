import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, interpolateColors, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, raster, villager} from '../alfil/sprites';
import {EndCard, endCardDefaults} from '../EndCard';

// 60fps, 360x640 stage, sub-pixel motion. Time inside shots is in seconds (t).
export const IB_FPS = 60;
export const IB_DURATION = 43.47;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
import {Stage, Rf, cam, ez, Flames, Light, Sky, NIGHT, Ground, Flash, Enter, clamp, F, useT} from '../fx/fx';
const COLORS = ['g', 'r', 'b', 'c', 'n', 'M'];
const CHAR: Record<string, string> = Object.fromEntries(Object.keys(PAL).map((k) => [k, k === 'k' ? '#0a0605' : '#1a0f0c']));

// ---------- sprites ----------
const idol = (big = false) => raster(14, 28, (set, H) => {
  H.rect(1, 23, 12, 4, 'E');
  H.rect(4, 10, 6, 13, 'e');
  H.rect(2, 12, 2, 7, 'e'); H.rect(10, 12, 2, 7, 'e');
  H.rect(4, 3, 6, 6, 'e');
  H.rect(4, 8, 6, 2, 'E');
  if (big) { H.rect(3, 1, 8, 2, 'y'); set(4, 0, 'y'); set(7, 0, 'y'); set(9, 0, 'y'); }
  else H.rect(4, 2, 6, 1, 'M');
});
const tree = raster(26, 36, (set, H) => {
  H.rect(11, 19, 4, 15, 'b');
  H.ellipse(13, 11, 11, 10, 'g');
  H.ellipse(13, 11, 11, 10, 'G', (_, y) => y > 14);
});
const tent = raster(34, 26, (set, H) => {
  for (let y = 0; y < 22; y++) H.rect(17 - y * 0.75, y + 2, y * 1.5 + 1, 1, y % 6 < 3 ? 'c' : 'r');
  H.rect(14, 16, 6, 8, 'b');
});

// ---------- shared scenes ----------
const Temple: React.FC<{t: number; dark?: number}> = ({t, dark = 0}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#b9a27a" />
    {Array.from({length: 16}, (_, r) => <Rf key={r} x={0} y={r * 30} w={360} h={2} c="#a08a64" />)}
    {[20, 120, 220, 320].map((x, i) => <g key={i}><Rf x={x} y={0} w={22} h={520} c="#cdb88e" /><Rf x={x + 16} y={0} w={6} h={520} c="#a08a64" /></g>)}
    {[70, 270].map((x, i) => <g key={i}><Rf x={x} y={300} w={6} h={60} c="#4a3420" /><Flames x={x - 6} y={300} w={18} h={34} n={18} t={t} seed={'tor' + i} /></g>)}
    <Rf x={0} y={520} w={360} h={120} c="#8a7458" />
    <Rf x={0} y={520} w={360} h={4} c="#6e5a42" />
    <Rf x={0} y={0} w={360} h={640} c="#120c18" o={dark} />
  </>
);
const IdolRow: React.FC<{broken?: (i: number) => number; t?: number}> = ({broken, t = 0}) => (
  <>
    {Array.from({length: 6}, (_, i) => {
      const x = 14 + i * 58 + (i >= 3 ? 26 : 0);
      const tb = broken ? broken(i) : Infinity;
      if (t < tb) return <PixG key={i} rows={idol()} palette={PAL} x={x} y={436} s={3} smooth />;
      const dt = t - tb;
      return (
        <g key={i}>
          <Rf x={x + 3} y={505} w={36} h={12} c="#686d74" />
          {Array.from({length: 10}, (_, k) => {
            const vx = (random('fx' + i + k) - 0.5) * 220;
            const vy = -60 - random('fy' + i + k) * 160;
            const px = x + 20 + vx * dt;
            const py = Math.min(516, 470 + vy * dt + 0.5 * 600 * dt * dt);
            return <Rf key={k} x={px} y={py} w={6 + (k % 3) * 2} h={6} c={k % 2 ? '#8b9096' : '#686d74'} />;
          })}
          {Array.from({length: 12}, (_, k) => <Rf key={'d' + k} x={x + 20 + (random('dx' + i + k) - 0.5) * 80 * Math.min(1, dt * 3)} y={500 - random('dy' + i + k) * 50 * Math.min(1, dt * 2)} w={5} h={5} c="#d8c8a8" o={Math.max(0, 0.8 - dt * 1.2)} />)}
        </g>
      );
    })}
  </>
);
const BigIdol: React.FC<{x?: number; y?: number; s?: number; hammer?: boolean}> = ({x = 138, y = 292, s = 8, hammer}) => (
  <>
    <PixG rows={idol(true)} palette={PAL} x={x} y={y} s={s} smooth />
    {hammer && <g transform={`translate(${x + 11 * s} ${y + 11 * s}) rotate(25)`}><Rf x={0} y={0} w={6} h={70} c="#5a3a22" /><Rf x={-12} y={-6} w={30} h={16} c="#4a4f57" /></g>}
  </>
);
const Crowd: React.FC<{t: number; n?: number; y: number; rush?: number; still?: boolean; s?: number}> = ({t, n = 12, y, rush = 0, still, s = 5}) => (
  <>
    {Array.from({length: n}, (_, i) => {
      const bx = 6 + (i % 6) * 60 + (i >= 6 ? 28 : 0);
      const x = bx - rush * (1 - Math.min(1, t * 2.2)) * (200 + i * 10);
      const bob = still ? 0 : Math.abs(Math.sin(t * 8 + i)) * 4;
      return <PixG key={i} rows={villager(COLORS[i % 6], still ? 0 : Math.floor(t * 8 + i) % 2)} palette={PAL} x={x} y={y + (i >= 6 ? 34 : 0) - bob} s={s} smooth />;
    })}
  </>
);

// ---------- shots ----------
const BurnObject: React.FC<{kind: 'tree' | 'tent' | 'logs'}> = ({kind}) => {
  const t = useT();
  const char = ez(t, 0, 0.7, 0, 0.75);
  const z = ez(t, 0, 0.8, 1.15, 1.3);
  return (
    <Stage cam={cam(z, 180, 400)}>
      <Sky c={NIGHT} />
      <Ground y={500} c="#3b2a20" d="#2b1e16" />
      {kind === 'tree' && <PixG rows={tree} palette={PAL} x={102} y={180} s={6} smooth />}
      {kind === 'tent' && <PixG rows={tent} palette={PAL} x={78} y={320} s={6} smooth />}
      {kind === 'logs' && Array.from({length: 5}, (_, r) => Array.from({length: 5 - r}, (_, k) => <g key={`${r}-${k}`}><Rf x={80 + r * 20 + k * 40} y={470 - r * 28} w={38} h={26} c="#7a5232" /><Rf x={80 + r * 20 + k * 40} y={470 - r * 28} w={38} h={4} c="#9a6a40" /></g>))}
      {kind === 'tree' && <PixG rows={tree} palette={CHAR} x={102} y={180} s={6} smooth opacity={char} />}
      {kind === 'tent' && <PixG rows={tent} palette={CHAR} x={78} y={320} s={6} smooth opacity={char} />}
      <Flames x={70} y={500} w={220} h={330} n={150} t={t + 3} seed={kind} />
    </Stage>
  );
};

const LightInFire: React.FC = () => {
  const t = useT();
  const frozen = t > 0.6;
  const speed = frozen ? interpolate(t, [0.6, 0.9], [1, 0.08], clamp) : 1;
  const tt = frozen ? 0.6 + (t - 0.6) * speed : t;
  return (
    <Stage cam={cam(ez(t, 0, 1.6, 1, 1.12), 180, 380)}>
      <Sky c={NIGHT} />
      <Ground y={520} c="#2b1e16" d="#1e140e" />
      <Flames x={10} y={560} w={340} h={460} n={220} t={tt + 5} seed="big" />
      <Light x={180} y={360} r={18} t={t} />
    </Stage>
  );
};

const IdolsPan: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.15, 180, 400, ez(t, 0, 1.4, 40, -40))}>
      <Temple t={t} />
      <IdolRow />
      <BigIdol x={150} y={300} s={6} />
    </Stage>
  );
};

const Carving: React.FC = () => {
  const t = useT();
  const hit = (t * 4) % 1;
  return (
    <Stage cam={cam(ez(t, 0, 1.6, 1.3, 1.45), 180, 420)}>
      <Temple t={t} />
      <PixG rows={idol()} palette={PAL} x={120} y={330} s={7} smooth />
      <g transform={`translate(${250 - hit * 20} ${380 + hit * 10}) rotate(${-30 + hit * 25})`}><Rf x={0} y={0} w={8} h={60} c="#5a3a22" /><Rf x={-10} y={-10} w={28} h={14} c="#4a4f57" /></g>
      {Array.from({length: 14}, (_, i) => { const life = (t * 3 + random('ch' + i)) % 1; return <Rf key={i} x={230 - life * (40 + random('cv' + i) * 80)} y={400 - life * 60 + life * life * 120} w={5} h={5} c="#d8c8a8" o={1 - life} />; })}
      <PixG rows={villager('b', 0)} palette={PAL} x={262} y={430} s={4} smooth />
    </Stage>
  );
};

const LeaveTemple: React.FC = () => {
  const t = useT();
  const door = ez(t, 0.8, 1.5, 0, 1);
  return (
    <Stage>
      <Sky c={['#f3c58d', '#efb07c', '#e89a6a', '#de8a5e', '#d27a56']} />
      <Ground y={520} c="#c9a466" d="#b58f55" />
      <Rf x={70} y={180} w={220} h={340} c="#cdb88e" />
      <Rf x={60} y={170} w={240} h={14} c="#a08a64" />
      <Rf x={140} y={360} w={80} h={160} c="#2b2018" />
      <Rf x={140} y={360} w={40 * door} h={160} c="#6e4a2a" />
      <Rf x={220 - 40 * door} y={360} w={40 * door} h={160} c="#6e4a2a" />
      {Array.from({length: 8}, (_, i) => { const x = 170 + (i - 4) * 14 + t * (i % 2 ? 110 : -110) * (0.6 + (i % 3) * 0.2); return <PixG key={i} rows={villager(COLORS[i % 6], Math.floor(t * 8 + i) % 2)} palette={PAL} x={x} y={530 + (i % 3) * 10} s={4.5} smooth flip={i % 2 === 0} />; })}
    </Stage>
  );
};

const Shatter: React.FC = () => {
  const t = useT();
  const breakAt = (i: number) => 0.1 + i * 0.2;
  const target = Math.min(5, Math.floor((t - 0.1) / 0.2));
  const lx = 14 + Math.max(0, target) * 58 + (target >= 3 ? 26 : 0) + 20;
  const shake = [0, 1, 2, 3, 4, 5].some((i) => t > breakAt(i) && t < breakAt(i) + 0.06) ? 4 : 0;
  return (
    <Stage cam={cam(1.1, 180, 420, shake)}>
      <Temple t={t} dark={0.15} />
      <BigIdol x={150} y={300} s={6} />
      <IdolRow broken={breakAt} t={t} />
      <Light x={lx} y={420} r={12} t={t} />
    </Stage>
  );
};

const BigIdolTilt: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.3, 1.0, 1.25), 180, ez(t, 0, 1.3, 520, 360))}>
      <Temple t={t} dark={0.25} />
      <IdolRow broken={() => -5} t={10} />
      <BigIdol hammer />
    </Stage>
  );
};

const CrowdBursts: React.FC = () => {
  const t = useT();
  const shake = Math.sin(t * 60) * 3 * Math.max(0, 1 - t * 2);
  return (
    <Stage cam={cam(1.05, 180, 420, shake)}>
      <Temple t={t} dark={0.2} />
      <IdolRow broken={() => -5} t={10} />
      <BigIdol x={150} y={300} s={6} hammer />
      <Crowd t={t} y={450} rush={1} />
    </Stage>
  );
};

const CrowdSurround: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1, 1.15), 180, 430)}>
      <Temple t={t} dark={0.3} />
      {Array.from({length: 12}, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = ez(t, 0, 1, 170, 105);
        return <PixG key={i} rows={villager(COLORS[i % 6], 0)} palette={PAL} x={170 + Math.cos(a) * r - 10} y={430 + Math.sin(a) * r * 0.35} s={5} smooth />;
      })}
      <Light x={180} y={432} r={14} t={t} />
    </Stage>
  );
};

const HammerZoom: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1.1, 1.6), 230, 400)}>
      <Temple t={t} dark={0.25} />
      <BigIdol hammer />
      <Light x={60} y={470} r={12} t={t} />
      <g shapeRendering="auto" opacity={0.25 + 0.15 * Math.sin(t * 5)}><polygon points={`60,470 ${230},380 ${230},440`} fill="#fff6d0" /></g>
    </Stage>
  );
};

const CrowdStare: React.FC<{silent?: boolean}> = ({silent}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1, silent ? 1.06 : 1.12), 180, 300)}>
      <Temple t={t} dark={silent ? 0.45 : 0.3} />
      <BigIdol x={138} y={200} s={8} />
      {!silent && Array.from({length: 3}, (_, i) => <circle key={i} cx={194} cy={260} r={(t * 70 + i * 40) % 120} fill="none" stroke="#fff6d0" strokeWidth={2} opacity={0.5 * (1 - ((t * 70 + i * 40) % 120) / 120)} shapeRendering="auto" />)}
      <Crowd t={t} y={470} still />
    </Stage>
  );
};

const Torches: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.08, 180, 420, Math.sin(t * 40) * 2)}>
      <Sky c={['#2a0f1a', '#4a1420', '#7a1f22', '#a8342a', '#c4502a']} />
      <Ground y={520} c="#2b1e16" d="#1e140e" />
      {Array.from({length: 10}, (_, i) => {
        const x = 12 + i * 34;
        const up = Math.abs(Math.sin(t * 6 + i)) * 14;
        return (
          <g key={i}>
            <PixG rows={villager(COLORS[i % 6], 0)} palette={PAL} x={x} y={500 - up * 0.3} s={3} smooth />
            <Rf x={x + 18} y={440 - up} w={4} h={60} c="#4a3420" />
            <Flames x={x + 10} y={444 - up} w={20} h={40} n={14} t={t} seed={'tc' + i} />
          </g>
        );
      })}
    </Stage>
  );
};

const WoodPile: React.FC = () => {
  const t = useT();
  const rows = Math.ceil(ez(t, 0, 1.7, 1, 12));
  return (
    <Stage cam={cam(ez(t, 0, 1.9, 1.2, 0.95), 180, 400)}>
      <Sky c={NIGHT} />
      <Ground y={540} c="#3b2a20" d="#2b1e16" />
      {Array.from({length: rows}, (_, r) => Array.from({length: Math.max(1, 12 - r)}, (_, k) => {
        const w = 26;
        const x = 180 - ((12 - r) * w) / 2 + k * w + r * 0;
        return <g key={`${r}-${k}`}><Rf x={x} y={520 - r * 22} w={w - 2} h={20} c={(r + k) % 2 ? '#7a5232' : '#6a4628'} /><Rf x={x + 2} y={522 - r * 22} w={6} h={6} c="#9a6a40" /></g>;
      }))}
      <Crowd t={t} n={6} y={545} s={3.5} />
    </Stage>
  );
};

const Ignite: React.FC = () => {
  const t = useT();
  const grow = ez(t, 0.1, 0.9, 0.1, 1);
  return (
    <Stage cam={cam(ez(t, 0, 1, 1.25, 1), 180, 420, Math.sin(t * 50) * 3 * grow)}>
      <Sky c={NIGHT} />
      <Ground y={540} c="#3b2a20" d="#2b1e16" />
      {Array.from({length: 12}, (_, r) => <Rf key={r} x={180 - (12 - r) * 13} y={520 - r * 22} w={(12 - r) * 26} h={20} c={r % 2 ? '#7a5232' : '#6a4628'} />)}
      <Flames x={180 - 170 * grow} y={545} w={340 * grow} h={480 * grow} n={200} t={t + 2} seed="ign" />
    </Stage>
  );
};

const Thrown: React.FC = () => {
  const t = useT();
  const p = ez(t, 0, 1, 0, 1);
  const x = 30 + p * 160;
  const y = 260 - Math.sin(p * Math.PI) * 120 + p * 110;
  return (
    <Stage cam={cam(1, 180, 400)}>
      <Sky c={NIGHT} />
      <Ground y={540} c="#3b2a20" d="#2b1e16" />
      <Flames x={20} y={560} w={320} h={420} n={200} t={t + 4} seed="thr" />
      <Light x={x} y={y} r={12} t={t} />
    </Stage>
  );
};

const InFire: React.FC<{wide?: boolean}> = ({wide}) => {
  const t = useT();
  return (
    <Stage cam={cam(wide ? ez(t, 0, 2.6, 0.95, 1.05) : ez(t, 0, 2.5, 1.35, 1.2), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a0e0a" />
      <Flames x={-20} y={660} w={400} h={720} n={260} t={t + 6} seed={wide ? 'w' : 'c'} />
      <Light x={180} y={380} r={wide ? 14 : 22} t={t} />
    </Stage>
  );
};

const Freeze: React.FC = () => {
  const t = useT();
  const speed = interpolate(t, [0, 0.8], [1, 0.04], clamp);
  const tt = 7 + Math.min(t, 0.8) * 0.5 + Math.max(0, t - 0.8) * 0.04;
  return (
    <Stage cam={cam(ez(t, 0, 1.9, 1.05, 1.15), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a0e0a" />
      <Flames x={-20} y={660} w={400} h={720} n={260} t={tt} seed="fz" speed={speed} />
      <Light x={180} y={380} r={18} t={t} />
    </Stage>
  );
};

const CoolShift: React.FC = () => {
  const t = useT();
  const cool = ez(t, 0, 1.4, 0, 1);
  const bg = interpolateColors(cool, [0, 1], ['#2a0e0a', '#0f2a3a']);
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.15, 1.0), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c={bg} />
      <Flames x={-20} y={660} w={400} h={720} n={260} t={7.4 + t * 0.35} seed="fz" cool={cool} />
      <Light x={180} y={380} r={18} t={t} />
    </Stage>
  );
};

const Flower: React.FC<{x: number; y: number; g: number; c: string}> = ({x, y, g, c}) => g <= 0 ? null : (
  <>
    <Rf x={x} y={y - 22 * g} w={3} h={22 * g} c="#4f8a3a" />
    <Rf x={x + 3} y={y - 12 * g} w={6 * g} h={3} c="#6aa84a" />
    {g > 0.6 && <><Rf x={x - 4} y={y - 26 * g} w={11} h={4} c={c} /><Rf x={x - 1} y={y - 30 * g} w={5} h={11} c={c} /><Rf x={x} y={y - 26 * g} w={3} h={3} c="#f9c440" /></>}
  </>
);

const Garden: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.1, 1), 180, 420)}>
      <Sky c={['#0f2a3a', '#16384a', '#1f4a5a', '#2c5e66', '#3a7068']} />
      <Rf x={0} y={500} w={360} h={140} c="#3f6e3a" />
      {Array.from({length: 40}, (_, i) => <Rf key={i} x={random('gr' + i) * 356} y={504 + random('gq' + i) * 130} w={3} h={6} c="#5a8f44" />)}
      <Flames x={30} y={540} w={300} h={260} n={90} t={7.6 + t * 0.35} seed="gd" cool={1} />
      {Array.from({length: 26}, (_, i) => <Flower key={i} x={10 + random('fl' + i) * 340} y={520 + random('fq' + i) * 110} g={interpolate(t, [random('ft' + i) * 1.4, random('ft' + i) * 1.4 + 0.6], [0, 1], clamp)} c={['#f2a3c0', '#fff6d0', '#c9a3f2', '#f9c440'][i % 4]} />)}
      <Light x={ez(t, 0.4, 2.6, 180, 250)} y={ez(t, 0.4, 2.6, 380, 470)} r={16} t={t} />
    </Stage>
  );
};

// ---------- overlays ----------
const DuaCard: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '24px 34px 30px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)', fontFamily: nunito}}>
      <div style={{fontWeight: 800, fontSize: 28, color: '#5b6a60', letterSpacing: 2}}>IBRAHIM'S DU'A IN THE FIRE · SAHIH AL-BUKHARI</div>
      <div style={{fontWeight: 900, fontSize: 56, color: '#1d2b24', lineHeight: 1.15, marginTop: 12}}>“Allah is <span style={{color: '#b8862a'}}>enough for me</span>, and He is the best disposer of affairs.”</div>
    </div>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 0.8, <BurnObject kind="tree" />],
  [0.8, 1.5, <BurnObject kind="tent" />, 'whip'],
  [1.5, 2.3, <BurnObject kind="logs" />, 'whip'],
  [2.3, 3.9, <LightInFire />, 'zoom'],
  [3.9, 5.3, <IdolsPan />, 'whip'],
  [5.3, 6.9, <Carving />, 'zoom'],
  [6.9, 8.5, <LeaveTemple />, 'whip'],
  [8.5, 10.0, <Shatter />, 'zoom'],
  [10.0, 11.3, <BigIdolTilt />],
  [11.3, 12.9, <CrowdBursts />, 'whip'],
  [12.9, 14.9, <CrowdSurround />, 'zoom'],
  [14.9, 17.6, <HammerZoom />, 'whip'],
  [17.6, 20.3, <CrowdStare />, 'zoom'],
  [20.3, 21.7, <CrowdStare silent />],
  [21.7, 24.4, <Torches />, 'whip'],
  [24.4, 26.3, <WoodPile />, 'zoom'],
  [26.3, 27.3, <Ignite />],
  [27.3, 28.4, <Thrown />, 'whip'],
  [28.4, 30.9, <InFire />, 'zoom'],
  [30.9, 33.5, <InFire wide />],
  [33.5, 35.4, <Freeze />],
  [35.4, 37.4, <CoolShift />],
  [37.4, 40.4, <Garden />, 'zoom'],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 2.9, <Caption instant text="Fire has burned *everything* it ever touched." />],
  [2.9, 3.9, <Caption text="*Except once.*" size={96} />],
  [3.9, 6.9, <Caption text="Ibrahim's people worshipped *idols* they carved with their own hands." />],
  [6.9, 8.5, <Caption text="So while they were *away*," />],
  [8.5, 10.0, <Caption text="he *smashed* them all," />],
  [10.0, 11.3, <Caption text="except the *biggest one*." />],
  [11.3, 12.9, <Caption text="They came back *furious*." />],
  [12.9, 14.9, <Caption text="“Have you done this to *our gods*?”" />],
  [14.9, 17.6, <Caption text="“Rather, this, *the largest of them*, did it.”" />],
  [17.6, 20.3, <Caption text="“So ask them, if they should be able to *speak*.”" />],
  [20.3, 21.7, <Caption text="They had *no answer*." />],
  [21.7, 24.4, <Caption text="“*Burn him*, and support your gods.”" />],
  [24.4, 26.3, <Caption text="They piled up a *mountain of wood*," />],
  [26.3, 28.4, <Caption text="set it *ablaze*, and threw him in." />],
  [28.4, 33.5, <DuaCard />],
  [33.5, 37.4, <AyahCard refKey="21:69" gold={[3, 4]} tr="O fire, be *coolness and safety* upon Abraham" />],
  [37.4, 40.4, <Caption text="And the fire that burned everything, *didn't touch him*." />],
];
const FLASHES = [2.9, 27.3, 33.5, 37.4];
const END_START = 40.4;

export const Ibrahim: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(IB_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/ibrahim-narration.mp3')} />
  </AbsoluteFill>
);
