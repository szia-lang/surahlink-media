import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, staticFile} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, raster, goldChest} from '../alfil/sprites';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Sky, Flash, Enter, clamp, F, useT} from '../fx/fx';

export const MU_FPS = 60;
export const MU_DURATION = 42.08;

// ---------- sprites (all faceless; Musa is only ever light) ----------
const magician = raster(12, 24, (set, H) => {
  for (let y = 0; y < 6; y++) H.rect(6 - y * 0.6, y, y * 1.2 + 1, 1, 'P');
  H.rect(4, 6, 5, 4, 's');
  H.rect(2, 10, 9, 12, 'P');
  H.rect(6, 10, 1, 12, 'y');
  H.rect(1, 12, 1, 6, 'P'); H.rect(11, 12, 1, 6, 'P');
  set(1, 18, 's'); set(11, 18, 's');
  H.rect(3, 22, 3, 1, 'b'); H.rect(7, 22, 3, 1, 'b');
});
// magician in sujood: forehead to the ground, side view facing right
const sujood = raster(24, 14, (set, H) => {
  H.ellipse(9, 7, 7, 6, 'P');
  H.rect(2, 9, 8, 4, 'P');
  H.rect(10, 4, 1, 9, 'y');
  H.rect(15, 8, 4, 5, 'P');
  H.rect(18, 9, 4, 4, 's');
  H.rect(19, 12, 4, 1, 's');
  for (let y = 0; y < 3; y++) H.rect(4 + y, 2 + y, 3, 1, 'P');
});
const pharaoh = raster(20, 34, (set, H) => {
  H.rect(4, 3, 12, 10, 'y');
  for (let y = 3; y < 13; y += 2) H.rect(4, y, 12, 1, 'n');
  H.rect(4, 13, 3, 6, 'y'); H.rect(13, 13, 3, 6, 'y');
  H.rect(7, 6, 6, 8, 's');
  H.rect(6, 2, 8, 1, 'y'); set(10, 1, 'y');
  H.rect(4, 13, 12, 5, 'y');
  H.rect(4, 14, 12, 1, 'n'); H.rect(4, 16, 12, 1, 'n');
  H.rect(4, 18, 12, 13, 'w');
  H.rect(9, 18, 2, 13, 'y');
  set(3, 24, 's'); set(16, 24, 's');
  H.rect(5, 31, 4, 1, 'b'); H.rect(11, 31, 4, 1, 'b');
});

// ---------- scene pieces ----------
const ARENA_SKY = ['#f6d08e', '#f3c07a', '#efae6a', '#e89a5e', '#dd8a56'];
const Arena: React.FC<{t: number; dim?: number; recoil?: number}> = ({t, dim = 0, recoil = 0}) => (
  <>
    <Sky c={ARENA_SKY} />
    {/* stands packed with people */}
    {Array.from({length: 6}, (_, r) => (
      <g key={r}>
        <Rf x={0} y={250 + r * 34} w={360} h={34} c={r % 2 ? '#c9a46c' : '#bf9a62'} />
        {Array.from({length: 30}, (_, k) => {
          const jump = Math.abs(Math.sin(t * 6 + k * 1.7 + r)) * 3 + recoil * 6 * random('rc' + r + k);
          return <Rf key={k} x={4 + k * 12 + (r % 2) * 6} y={256 + r * 34 - jump} w={8} h={10} c={['#2f6b4a', '#a8432f', '#5a3a22', '#eadfc6', '#1f5f5c', '#6b3fa0'][(k + r) % 6]} />;
        })}
      </g>
    ))}
    <Rf x={0} y={454} w={360} h={186} c="#e2c88e" />
    {Array.from({length: 30}, (_, i) => <Rf key={i} x={random('sx' + i) * 350} y={460 + random('sy' + i) * 170} w={6} h={2} c="#cdb27a" />)}
    <Rf x={0} y={0} w={360} h={640} c="#140c18" o={dim} />
  </>
);

// A snake: a chain of segments following a travelling sine wave.
const Snake: React.FC<{x: number; y: number; t: number; len?: number; dir?: number; seg?: number; amp?: number; c?: string; phase?: number}> = ({x, y, t, len = 14, dir = 1, seg = 8, amp = 8, c = '#4a5a24', phase = 0}) => (
  <>
    {Array.from({length: len}, (_, i) => {
      const px = x + dir * i * seg * 0.9;
      const py = y + Math.sin(t * 9 + i * 0.6 + phase) * amp;
      const sz = i === 0 ? seg * 1.5 : seg * (1 - (i / len) * 0.5);
      return <g key={i}><Rf x={px - sz / 2 - 1} y={py - sz / 2 - 1} w={sz + 2} h={sz + 2} c="#1c2620" /><Rf x={px - sz / 2} y={py - sz / 2} w={sz} h={sz} c={i === 0 ? '#2e3a14' : i % 3 === 0 ? '#8a9a3a' : c} />{i === 0 && <Rf x={px + dir * 1} y={py - 2} w={2} h={2} c="#f9c440" />}</g>;
    })}
  </>
);
const SnakeSwarm: React.FC<{t: number; n?: number; eaten?: number}> = ({t, n = 16, eaten = 0}) => (
  <>
    {Array.from({length: n}, (_, i) => {
      if (random('e' + i) < eaten) return null;
      const dir = random('d' + i) > 0.5 ? 1 : -1;
      const x = 20 + random('x' + i) * 320 + dir * t * 22;
      return <Snake key={i} x={x} y={480 + random('y' + i) * 140} t={t} dir={-dir} phase={i} len={12 + Math.floor(random('l' + i) * 8)} />;
    })}
  </>
);
const MagicianRow: React.FC<{t: number; y?: number; n?: number; s?: number; bow?: number}> = ({t, y = 470, n = 7, s = 3.5, bow = -1}) => (
  <>
    {Array.from({length: n}, (_, i) => {
      const x = 10 + i * (340 / n);
      const down = bow >= 0 && t > bow + i * 0.08;
      return down
        ? <PixG key={i} rows={sujood} palette={PAL} x={x - 8} y={y + 46} s={s * 0.9} smooth />
        : <PixG key={i} rows={magician} palette={PAL} x={x} y={y} s={s} smooth />;
    })}
  </>
);

// ---------- shots ----------
const HookSujood: React.FC<{close?: boolean}> = ({close}) => {
  const t = useT();
  if (close) {
    const down = t > 0.5;
    const y = down ? 0 : ez(t, 0, 0.5, 0, 20);
    return (
      <Stage cam={cam(ez(t, 0, 1.5, 1.3, 1.45), 180, 460)}>
        <Arena t={t} dim={0.35} />
        {down ? <PixG rows={sujood} palette={PAL} x={110} y={470} s={7} smooth /> : <PixG rows={magician} palette={PAL} x={130} y={330 + y} s={7} smooth />}
        <Light x={300} y={200} r={10} t={t} />
      </Stage>
    );
  }
  return (
    <Stage cam={cam(ez(t, 0, 1.4, 1, 1.12), 180, 460)}>
      <Arena t={t} dim={0.3} />
      <MagicianRow t={t} y={400} n={6} s={3} bow={0.1} />
      <MagicianRow t={t} y={480} n={6} s={3.6} bow={0.3} />
    </Stage>
  );
};

const PharaohThrone: React.FC<{rise?: boolean}> = ({rise}) => {
  const t = useT();
  const shake = rise ? Math.sin(t * 50) * 3 * Math.max(0, 1 - t) : 0;
  return (
    <Stage cam={cam(rise ? ez(t, 0, 2.4, 1.1, 1.3) : ez(t, 0, 1.4, 1.25, 1.05), 180, 330, shake)}>
      <Rf x={0} y={0} w={360} h={640} c={rise ? '#3a1218' : '#3a2a1a'} />
      {[30, 110, 230, 310].map((x, i) => <g key={i}><Rf x={x} y={0} w={22} h={640} c="#c9a46c" /><Rf x={x + 16} y={0} w={6} h={640} c="#9a7a4a" /></g>)}
      <Rf x={100} y={200} w={160} h={300} c="#d4a73a" />
      <Rf x={112} y={214} w={136} h={286} c="#1f5f5c" />
      <PixG rows={pharaoh} palette={PAL} x={110} y={rise ? ez(t, 0, 0.6, 250, 200) : 250} s={7} smooth />
      <Rf x={0} y={500} w={360} h={140} c="#6e5a3a" />
      {rise && <Rf x={0} y={0} w={360} h={640} c="#a8241a" o={0.18 + 0.08 * Math.sin(t * 8)} />}
    </Stage>
  );
};

const MagiciansMarch: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 420, ez(t, 0, 1.6, -30, 20))}>
      <Arena t={t} />
      {Array.from({length: 8}, (_, i) => <PixG key={i} rows={magician} palette={PAL} x={-60 + i * 50 + t * 70} y={460 + (i % 2) * 20 - Math.abs(Math.sin(t * 8 + i)) * 4} s={3.5} smooth />)}
    </Stage>
  );
};

const ArenaWide: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.7, 1.25, 1), 180, ez(t, 0, 1.7, 300, 420))}>
      <Arena t={t} />
      <MagicianRow t={t} y={500} n={7} s={2.6} />
    </Stage>
  );
};

const FaceOff: React.FC<{close?: boolean}> = ({close}) => {
  const t = useT();
  if (close) {
    return (
      <Stage cam={cam(ez(t, 0, 2.1, 1.35, 1.5), 140, 470)}>
        <Arena t={t} dim={0.2} />
        {Array.from({length: 4}, (_, i) => <g key={i}><PixG rows={magician} palette={PAL} x={20 + i * 50} y={420} s={4} smooth /><Rf x={30 + i * 50} y={480} w={4} h={40} c="#5a4a2a" /></g>)}
      </Stage>
    );
  }
  return (
    <Stage cam={cam(ez(t, 0, 1.9, 1, 1.1), 180, 470)}>
      <Arena t={t} />
      {Array.from({length: 5}, (_, i) => <PixG key={i} rows={magician} palette={PAL} x={10 + i * 34} y={470 + (i % 2) * 14} s={3.2} smooth />)}
      <Light x={300} y={500} r={13} t={t} />
    </Stage>
  );
};

const RatherYouThrow: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.8, 1.2, 1.5), 290, 480)}>
      <Arena t={t} />
      <Light x={290} y={480} r={15} t={t} />
    </Stage>
  );
};

const RopesThrown: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 450)}>
      <Arena t={t} />
      <MagicianRow t={t} y={380} n={7} s={2.8} />
      {Array.from({length: 14}, (_, i) => {
        const p = Math.min(1, Math.max(0, (t - i * 0.06) / 0.7));
        const x0 = 20 + (i % 7) * 48;
        const x = x0 + p * (random('rx' + i) - 0.5) * 120;
        const y = 440 - Math.sin(p * Math.PI) * 90 + p * (100 + random('ry' + i) * 80);
        const ang = p * 360 * (random('ra' + i) > 0.5 ? 1 : -1);
        return <g key={i} transform={`translate(${x} ${y}) rotate(${ang})`}><Rf x={-14} y={-2} w={28} h={4} c="#7a6a3a" /></g>;
      })}
    </Stage>
  );
};

const Snakes: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.8, 1, 1.15), 180, 520, Math.sin(t * 30) * 1.5)}>
      <Arena t={t} recoil={1} />
      <SnakeSwarm t={t} />
    </Stage>
  );
};

const LightFlicker: React.FC = () => {
  const t = useT();
  const r = 10 + 3 * Math.sin(t * 20) * Math.sin(t * 7);
  return (
    <Stage cam={cam(1.3, 250, 500)}>
      <Arena t={t} dim={0.35} />
      <SnakeSwarm t={t} n={18} />
      <g opacity={0.6 + 0.3 * Math.sin(t * 17)}><Light x={250} y={500} r={r} t={t} /></g>
    </Stage>
  );
};

const FearNot: React.FC = () => {
  const t = useT();
  const glow = ez(t, 0.3, 2, 12, 26);
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.15, 1.3), 180, 470)}>
      <Arena t={t} dim={ez(t, 0, 2, 0.35, 0.1)} />
      <g shapeRendering="auto" opacity={ez(t, 0.3, 2, 0, 0.35)}>{Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2 + t * 0.4; return <polygon key={i} points={`180,470 ${180 + Math.cos(a) * 400},${470 + Math.sin(a) * 400} ${180 + Math.cos(a + 0.12) * 400},${470 + Math.sin(a + 0.12) * 400}`} fill="#fff6d0" />; })}</g>
      <SnakeSwarm t={t} n={12} />
      <Light x={180} y={470} r={glow} t={t} />
    </Stage>
  );
};

// The staff becomes a giant serpent that sweeps the arena.
const Serpent: React.FC<{sweep?: boolean}> = ({sweep}) => {
  const t = useT();
  const rise = sweep ? 1 : ez(t, 0.3, 1.2, 0, 1);
  const headX = sweep ? ez(t, 0, 1.6, 320, 20) : 300;
  return (
    <Stage cam={cam(sweep ? 1.0 : ez(t, 0, 1.3, 1.2, 1), 180, 460, sweep ? Math.sin(t * 40) * 3 : 0)}>
      <Arena t={t} recoil={1} />
      <SnakeSwarm t={t + 3} eaten={sweep ? ez(t, 0, 1.6, 0, 1) : 0} />
      {!sweep && t < 0.3 && <g transform={`translate(${240 + t * 200} ${380 + t * 300}) rotate(${t * 600})`}><Rf x={-24} y={-3} w={48} h={6} c="#5a3a22" /></g>}
      {rise > 0 && Array.from({length: 34}, (_, i) => {
        const u = i / 33;
        const x = headX + (sweep ? u * 260 : -u * 120) + Math.sin(t * 6 + i * 0.4) * 10 * u;
        const y = 560 - (1 - u) * 260 * rise + Math.sin(t * 5 + i * 0.5) * 8;
        const sz = 30 * (1 - u * 0.5);
        return <Rf key={i} x={x - sz / 2} y={y - sz / 2} w={sz} h={sz} c={i === 0 ? '#2e3a1a' : i % 3 ? '#4f6a2a' : '#6a8a3a'} />;
      })}
      {rise > 0 && <Rf x={headX - 6} y={560 - 260 * rise - 4} w={6} h={6} c="#f9c440" />}
    </Stage>
  );
};

const MagiciansFreeze: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.15, 1.3), 180, 460)}>
      <Arena t={t} dim={0.2} />
      {Array.from({length: 5}, (_, i) => {
        const drop = Math.max(0, t - 0.6 - i * 0.12);
        return <g key={i}><PixG rows={magician} palette={PAL} x={20 + i * 66} y={420} s={4} smooth /><g transform={`translate(${34 + i * 66} ${470 + Math.min(70, drop * drop * 400)}) rotate(${Math.min(90, drop * 300)})`}><Rf x={-2} y={0} w={4} h={40} c="#5a4a2a" /></g></g>;
      })}
    </Stage>
  );
};

const SujoodWave: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.1, 1), 180, 470)}>
      <Arena t={t} dim={0.15} />
      <MagicianRow t={t} y={410} n={6} s={3} bow={0} />
      <MagicianRow t={t} y={490} n={6} s={3.6} bow={0.25} />
    </Stage>
  );
};

const CalmMagicians: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1, 1.12), 180, 470)}>
      <Arena t={t} dim={0.3} />
      <g shapeRendering="auto" opacity={0.25}><polygon points="140,0 220,0 300,640 60,640" fill="#fff6d0" /></g>
      <MagicianRow t={10} y={470} n={6} s={3.6} bow={0} />
    </Stage>
  );
};

const Reward: React.FC<{iman?: boolean}> = ({iman}) => {
  const t = useT();
  const fade = iman ? ez(t, 0, 0.6, 1, 0) : 1;
  return (
    <Stage cam={cam(ez(t, 0, 1.6, 1.15, 1.25), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c={iman ? '#1a2238' : '#2a1a24'} />
      <Rf x={0} y={480} w={360} h={160} c={iman ? '#2a3448' : '#5a3a22'} />
      <g opacity={fade}>
        <PixG rows={goldChest(true)} palette={PAL} x={110} y={330} s={7} smooth />
        {Array.from({length: 20}, (_, i) => <Rf key={i} x={120 + random('gx' + i) * 120} y={280 + random('gy' + i) * 80} w={4} h={4} c="#fbe7a1" o={(Math.sin(t * 10 + i) + 1) / 2} />)}
      </g>
      {iman && (
        <>
          <g shapeRendering="auto" opacity={ez(t, 0.2, 1, 0, 0.35)}><polygon points="150,0 210,0 320,640 40,640" fill="#fff6d0" /></g>
          <MagicianRow t={10} y={420} n={5} s={4} bow={0} />
        </>
      )}
    </Stage>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 1.4, <HookSujood />],
  [1.4, 2.9, <HookSujood close />, 'zoom'],
  [2.9, 4.3, <PharaohThrone />, 'whip'],
  [4.3, 5.9, <MagiciansMarch />, 'whip'],
  [5.9, 7.6, <ArenaWide />, 'zoom'],
  [7.6, 9.5, <FaceOff />, 'whip'],
  [9.5, 11.6, <FaceOff close />, 'zoom'],
  [11.6, 13.4, <RatherYouThrow />, 'whip'],
  [13.4, 15.4, <RopesThrown />, 'zoom'],
  [15.4, 18.2, <Snakes />],
  [18.2, 19.6, <LightFlicker />, 'whip'],
  [19.6, 23.7, <FearNot />, 'zoom'],
  [23.7, 25.0, <Serpent />, 'whip'],
  [25.0, 26.8, <Serpent sweep />],
  [26.8, 28.8, <MagiciansFreeze />, 'zoom'],
  [28.8, 30.9, <SujoodWave />],
  [30.9, 33.3, <PharaohThrone rise />, 'whip'],
  [33.3, 36.0, <CalmMagicians />, 'zoom'],
  [36.0, 37.6, <Reward />, 'whip'],
  [37.6, 39.2, <Reward iman />],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 2.9, <Caption instant text="What made Pharaoh's best magicians fall into *sujood*?" />],
  [2.9, 5.9, <Caption text="Pharaoh gathered his most *skilled magicians* for one showdown," />],
  [5.9, 7.6, <Caption text="in front of *all the people*." />],
  [7.6, 11.6, <Caption text="“O Moses, either *you throw*, or we will be the first to throw.”" />],
  [11.6, 13.4, <Caption text="“Rather, *you throw*.”" />],
  [13.4, 18.2, <Caption text="Their ropes and staffs seemed to be *moving like snakes*." />],
  [18.2, 19.6, <Caption text="Even Musa felt *fear*." />],
  [19.6, 23.7, <AyahCard refKey="20:68" gold={[1, 2]} tr="*Fear not.* Indeed, it is you who are superior" />],
  [23.7, 26.8, <Caption text="He threw his staff, and it *swallowed up* everything they had crafted." />],
  [26.8, 28.8, <Caption text="The magicians knew this was *no magic*." />],
  [28.8, 30.9, <AyahCard refKey="20:70" range={[0, 2]} gold={[2]} partial tr="So the magicians *fell down in prostration*" />],
  [30.9, 33.3, <Caption text="Pharaoh threatened to *cut off their hands and feet*." />],
  [33.3, 36.0, <Caption text="“So *decree whatever* you are to decree.”" />],
  [36.0, 37.6, <Caption text="They came for Pharaoh's *reward*." />],
  [37.6, 39.2, <Caption text="They left with *iman*." size={96} />],
];
const FLASHES = [15.4, 23.7, 28.8, 37.6];
const END_START = 39.2;

export const Musa: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(MU_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/musa-narration.mp3')} />
  </AbsoluteFill>
);
