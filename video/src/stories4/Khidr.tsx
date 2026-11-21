import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {Stage, Rf, cam, ez, useT, Light} from '../fx/fx';
import {Bands, Sea, Ship, Stars, Punch, DAWN_SKY, NIGHT_SKY, STORM_SKY} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';

// Silent (text-only) story. Musa and al-Khidr appear only as two soft lights.
export const KH_DURATION = 47;
const DAY = ['#5a8ec0', '#7fb0d8', '#a9cfe6', '#d6e6ee', '#e9eef0'];

const Spray: React.FC<{t: number; x: number; y: number}> = ({t, x, y}) => <>{Array.from({length: 16}, (_, i) => { const life = (t * 2.2 + random('sp' + i)) % 1; return <Rf key={i} x={x + (random('sx' + i) - 0.5) * 50 * life} y={y - Math.sin(life * Math.PI) * 40} w={3} h={3} c="#cfeaff" o={1 - life} />; })}</>;
const Boat: React.FC<{t: number; x?: number; y?: number; s?: number; hole?: number; lights?: boolean; sailors?: boolean}> = ({t, x = 180, y = 430, s = 1.1, hole = 0, lights, sailors}) => (
  <g>
    <Ship x={x} y={y + Math.sin(t * 2) * 3} s={s} tilt={Math.sin(t * 1.6) * 2 + hole * 4} />
    {hole > 0 && <><Rf x={x + 20 * s} y={y + 2 + Math.sin(t * 2) * 3} w={18 * s * hole} h={14 * s} c="#0a0a10" /><Spray t={t} x={x + 28 * s} y={y + 4} /></>}
    {sailors && [-50, -20].map((dx, i) => <PixG key={i} rows={villager(i ? 'n' : 'r', 0)} palette={PAL} x={x + dx * s} y={y - 40 + Math.sin(t * 2) * 3} s={5} smooth />)}
    {lights && <><Light x={x + 30 * s} y={y - 30 + Math.sin(t * 2) * 3} r={7} t={t} /><Light x={x + 60 * s} y={y - 32 + Math.sin(t * 2) * 3} r={9} t={t + 1} /></>}
  </g>
);

const Hook: React.FC = () => {
  const t = useT();
  const hole = ez(t, 0.15, 0.6, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.5, 1.25), 200, 440, t > 0.15 && t < 0.45 ? Math.sin(t * 80) * 5 : 0)}>
      <Bands c={STORM_SKY} />
      <Boat t={t} hole={hole} lights />
      <Sea t={t} level={470} amp={10} c="#1f3a56" />
    </Stage>
  );
};
const Shore: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.5, 1.05, 1.2), 180, 450, ez(t, 0, 4.5, -20, 20))}>
      <Bands c={DAWN_SKY} />
      <Sea t={t} level={420} amp={6} c="#2a5a7a" speed={0.5} />
      <Rf x={0} y={480} w={360} h={160} c="#e2c48e" />
      <Light x={130 + t * 12} y={450} r={8} t={t} />
      <Light x={190 + t * 12} y={446} r={10} t={t + 1} />
    </Stage>
  );
};
const Board: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.1, 1.25), 180, 420)}>
      <Bands c={DAY} />
      <Boat t={t} sailors lights x={180 - t * 6} />
      <Sea t={t} level={470} amp={8} c="#2a5a7a" />
    </Stage>
  );
};
const Tear: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.25, 1.6), 220, 440, t < 0.4 ? Math.sin(t * 80) * 4 : 0)}>
      <Bands c={DAY} />
      <Boat t={t} hole={ez(t, 0.2, 0.8, 0, 1)} lights sailors />
      <Sea t={t} level={470} amp={8} c="#2a5a7a" />
    </Stage>
  );
};
const Upset: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.3, 1.45), 240, 400)}>
      <Bands c={['#3a4a6a', '#4a5a7a', '#5a6a86', '#6a7a90', '#7a8a9a']} />
      <Boat t={t} hole={1} lights />
      <Sea t={t} level={470} amp={12} c="#1f3a56" />
    </Stage>
  );
};
const Fleet: React.FC<{passing?: boolean}> = ({passing}) => {
  const t = useT();
  const fx = passing ? 420 - t * 70 : 360 - t * 8;
  return (
    <Stage cam={cam(passing ? 1.05 : ez(t, 0, 4, 1.4, 1.2), passing ? 180 : 300, 420)}>
      <Bands c={passing ? DAY : NIGHT_SKY} />
      {!passing && <Stars t={t} n={30} h={300} />}
      {[0, 1, 2].map((i) => <g key={i} opacity={0.9}><Ship x={fx + i * 80} y={400 + i * 6} s={0.55} tilt={Math.sin(t + i) * 1.5} /><Rf x={fx + i * 80 - 6} y={340 + i * 6} w={12} h={10} c="#7e2f22" /></g>)}
      {passing && <Boat t={t} x={90} y={460} s={0.9} hole={1} sailors />}
      <Sea t={t} level={460} amp={8} c={passing ? '#2a5a7a' : '#1a2a44'} />
    </Stage>
  );
};
const Calm: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.1, 1.3), 180, 420)}>
      <Bands c={DAWN_SKY} />
      <g shapeRendering="auto"><circle cx={180} cy={300} r={60} fill="#fff1c0" opacity={0.8} /></g>
      <Boat t={t * 0.5} hole={1} sailors />
      <Sea t={t} level={470} amp={5} c="#2a5a7a" speed={0.4} />
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 3, <Hook />],
  [3, 7.5, <Shore />, 'whip'],
  [7.5, 11, <Board />, 'zoom'],
  [11, 15, <Tear />, 'whip'],
  [15, 21, <Upset />],
  [21, 25, <Upset />, 'zoom'],
  [25, 29, <Fleet />, 'whip'],
  [29, 36, <Fleet />],
  [36, 39.5, <Fleet passing />, 'whip'],
  [39.5, 43, <Calm />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3, <><Punch instant text="HE BROKE A POOR MAN'S BOAT" top={290} size={56} /><Punch instant text="ON PURPOSE" top={390} size={80} color="#ffffff" /></>],
  [3, 7.5, <Caption text="Prophet Musa traveled with a servant Allah gave *special knowledge*: al-Khidr." size={56} />],
  [7.5, 11, <Caption text="Poor sailors let them *ride for free*." />],
  [11, 15, <Caption text="Then al-Khidr *tore a hole* in their boat." />],
  [15, 21, <AyahCard refKey="18:71" range={[7, 14]} gold={[8, 9, 10]} partial tr="*Have you torn it open to drown its people?* You have certainly done a grave thing" />],
  [21, 25, <Caption text="It made *no sense*. Why hurt the people who helped you?" />],
  [25, 29, <Caption text="Then al-Khidr *explained*." size={70} />],
  [29, 36, <AyahCard refKey="18:79" range={[0, 16]} gold={[11, 12, 13, 14, 15, 16]} trSize={34} tr="As for the ship, it belonged to poor people working at sea. So I intended to cause defect in it as there was after them *a king who seized every ship by force*" />],
  [36, 39.5, <Caption text="The king's men *passed it by*. A broken boat. *A saved boat.*" />],
  [39.5, 43, <><Punch text="WHAT BREAKS YOU" top={360} size={84} /><Punch text="MAY BE WHAT SAVES YOU" top={470} size={70} color="#ffffff" /></>],
];
const SFX: Cue[] = [
  [0, 'impact', 0.9, 2.5], [0, 'storm', 0.35, 3], [3, 'whoosh', 0.45, 1.5], [3, 'underwater', 0.15, 8], [11, 'impact', 0.6, 2], [11, 'whoosh', 0.4, 1.5],
  [15, 'shimmer', 0.35, 3], [15, 'storm', 0.25, 10], [25, 'whoosh', 0.4, 1.5], [29, 'shimmer', 0.35, 3], [36, 'crowd', 0.2, 3.5], [36, 'whoosh', 0.4, 1.5], [39.5, 'impact', 0.6, 2.5],
];

export const Khidr: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[0.2, 11.3]} endStart={43} duration={KH_DURATION} sfx={SFX} />;
