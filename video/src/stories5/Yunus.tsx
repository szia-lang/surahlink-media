import React from 'react';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {Stage, Rf, cam, ez, Light, useT} from '../fx/fx';
import {Bands, Rain, Sea, Ship, Whale, Bubbles, GlowTitle, HadithCard, Punch, STORM_SKY, DUSK_SKY, DAWN_SKY} from '../fx/scenes';
import {Timeline, Shot, Overlay} from '../fx/Timeline';

export const YN_DURATION = 44.17;
const DEEP = ['#0c2a44', '#0a2238', '#081a2c', '#061220', '#030a14'];

// Yunus is only ever light.
const Hook: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5, 1, 1.1), 180, 440)}>
      <Bands c={DEEP} />
      <g shapeRendering="auto" opacity={0.18}>{Array.from({length: 5}, (_, i) => <polygon key={i} points={`${50 + i * 70},0 ${70 + i * 70},0 ${40 + i * 75},640 ${20 + i * 75},640`} fill="#8fc4e6" />)}</g>
      <Bubbles t={t} />
      <Whale x={ez(t, 0, 5, 300, 140)} y={470} s={1.1} t={t} glow={1} />
    </Stage>
  );
};
const LeavesTown: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.4, 1, 1.1), 180, 450)}>
      <Bands c={DUSK_SKY} />
      {[10, 70, 130].map((x, i) => <g key={i}><Rf x={x} y={420 - (i % 2) * 20} w={52} h={200} c="#4a3a34" /><Rf x={x + 18} y={460} w={12} h={14} c="#e9c36a" o={0.6} /></g>)}
      <Rf x={0} y={520} w={360} h={120} c="#3a2e28" />
      <Light x={ez(t, 0, 3.4, 170, 320)} y={500} r={10} t={t} />
    </Stage>
  );
};
const Storm: React.FC<{lots?: boolean}> = ({lots}) => {
  const t = useT();
  const fall = lots ? ez(t, 2.4, 3.4, 0, 1) : 0;
  return (
    <Stage cam={cam(lots ? ez(t, 0, 3.6, 1.15, 1.3) : 1.05, 180, 420, Math.sin(t * 20) * 2)}>
      <Bands c={STORM_SKY} />
      {Math.floor(t * 3) % 6 === 0 && <Rf x={0} y={0} w={360} h={640} c="#cfe0ff" o={0.15} />}
      <Sea t={t} level={470} amp={70} c="#1a3050" />
      <Ship x={180} y={440 + Math.sin(t * 1.8) * 14} tilt={Math.sin(t * 1.4) * 10} />
      {lots && Array.from({length: 5}, (_, i) => <PixG key={i} rows={villager(['b', 'R', 'M', 'n', 'c'][i], 0)} palette={PAL} x={120 + i * 22} y={410 + Math.sin(t * 1.8) * 14} s={2.4} smooth />)}
      <g opacity={1}><Light x={lots ? 250 + fall * 40 : 240} y={(lots ? 420 : 420) + Math.sin(t * 1.8) * 14 + fall * 120} r={8} t={t} /></g>
      <Sea t={t + 1.3} level={540} amp={40} c="#14263e" />
      <Rain t={t} />
    </Stage>
  );
};
const Swallowed: React.FC = () => {
  const t = useT();
  const open = ez(t, 0, 0.6, 0, 1) * (1 - ez(t, 0.7, 1.0, 0, 1));
  return (
    <Stage cam={cam(ez(t, 0, 1.6, 1.2, 1.4), 180, 400, t > 0.7 && t < 0.9 ? 5 : 0)}>
      <Bands c={DEEP} />
      <Bubbles t={t} n={50} />
      <Whale x={ez(t, 0, 1.6, 260, 200)} y={400} s={1.4} t={t} open={open} glow={t > 0.8 ? 0.6 : 0} />
      {t < 0.8 && <Light x={ez(t, 0, 0.8, 120, 70)} y={ez(t, 0, 0.8, 380, 400)} r={8} t={t} />}
    </Stage>
  );
};
const Darkness: React.FC<{level: number}> = ({level}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.5, 1, 1.15), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c={['#0a1020', '#05080f', '#000000'][level - 1]} />
      {level === 1 && <Bubbles t={t} n={10} />}
      <g opacity={0.4 + level * 0.2}><Light x={180} y={420} r={6 + level * 2} t={t} /></g>
    </Stage>
  );
};
const DuaGlow: React.FC = () => {
  const t = useT();
  const g = ez(t, 0.4, 5, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 6.9, 1.1, 1.3), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#000000" />
      <g shapeRendering="auto">{Array.from({length: 4}, (_, i) => { const r = (t * 50 + i * 40) % 160; return <circle key={i} cx={180} cy={420} r={r} fill="none" stroke="#fff6d0" strokeWidth={2} opacity={0.5 * g * (1 - r / 160)} />; })}<circle cx={180} cy={420} r={60 + g * 140} fill="#fff6d0" opacity={0.08 * g} /></g>
      <Light x={180} y={420} r={8 + g * 12} t={t} />
    </Stage>
  );
};
const InsideWhale: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 6.7, 1, 1.12), 180, 420)}>
      <Bands c={DEEP} />
      <Bubbles t={t} />
      <Whale x={ez(t, 0, 6.7, 250, 110)} y={440} s={1.15} t={t} glow={1} />
    </Stage>
  );
};
const Shore: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1.15, 1), 180, 460)}>
      <Bands c={DAWN_SKY} />
      <Sea t={t} level={420} amp={10} c="#4a8ab0" speed={0.4} />
      <Rf x={0} y={470} w={360} h={170} c="#e2cfa0" />
      <Whale x={ez(t, 0, 2.6, 160, 90)} y={430} s={0.6} t={t} />
      <Light x={220} y={500} r={12} t={t} />
      {Array.from({length: 8}, (_, i) => <Rf key={i} x={240 + i * 10} y={496 - Math.abs(Math.sin(i)) * 20 * ez(t, 0.5, 2.5, 0, 1)} w={12} h={10} c="#4f9f44" />)}
    </Stage>
  );
};
const AmirDua: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5.3, 1.05, 1.18), 180, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a2038" />
      <Rf x={0} y={520} w={360} h={120} c="#2a2236" />
      <g shapeRendering="auto" opacity={ez(t, 0.5, 2, 0, 0.3)}><polygon points="150,0 210,0 250,640 110,640" fill="#fff6d0" /></g>
      <PixG rows={AMIR.poses.dua} palette={PAL} x={142} y={420} s={4.2} smooth />
      {Array.from({length: 8}, (_, i) => { const p = (t * 0.5 + i / 8) % 1; return <Rf key={i} x={168 + (i % 4) * 8} y={420 - p * 300} w={4} h={4} c="#fff6d0" o={1 - p} />; })}
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 5.0, <Hook />],
  [5.0, 8.4, <LeavesTown />, 'whip'],
  [8.4, 10.8, <Storm />, 'zoom'],
  [10.8, 14.4, <Storm lots />],
  [14.4, 16.0, <Swallowed />, 'zoom'],
  [16.0, 17.06, <Darkness level={1} />],
  [17.06, 18.38, <Darkness level={2} />],
  [18.38, 20.1, <Darkness level={3} />],
  [20.1, 27.0, <DuaGlow />],
  [27.0, 33.7, <InsideWhale />, 'zoom'],
  [33.7, 36.3, <Shore />, 'whip'],
  [36.3, 41.6, <AmirDua />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 5.0, <GlowTitle lines={['YUNUS', 'IN THE WHALE']} sub="*3 layers of darkness*, and 1 sentence got him out" top={150} />],
  [5.0, 8.4, <Caption text="He left his people *in anger*, before Allah gave him permission." />],
  [8.4, 10.8, <Caption text="He boarded a crowded ship. *A storm hit.*" />],
  [10.8, 14.4, <Caption text="They drew lots to throw someone overboard. *It fell on Yunus.*" />],
  [14.4, 16.0, <Caption text="Then the fish *swallowed him*." size={70} />],
  [16.0, 17.06, <Punch text="1. THE NIGHT" top={760} size={90} />],
  [17.06, 18.38, <Punch text="2. THE SEA" top={760} size={90} />],
  [18.38, 20.1, <Punch text="3. THE WHALE" top={760} size={90} />],
  [20.1, 27.0, <AyahCard refKey="21:87" range={[13, 22]} gold={[14, 15, 16, 17]} partial trSize={44} tr="*There is no deity except You*; exalted are You. Indeed, I have been of the wrongdoers" />],
  [27.0, 33.7, <AyahCard refKey="37:144" gold={[0, 1]} tr="He would have *remained inside its belly* until the Day they are resurrected" />],
  [33.7, 36.3, <Caption text="Instead, the whale *threw him onto the shore*." />],
  [36.3, 41.6, <HadithCard source="FROM TIRMIDHI" text="No Muslim makes this du'a for anything, except that Allah answers him." gold="Allah answers him" />],
];

export const Yunus: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[14.9, 20.1, 33.7]} endStart={41.6} duration={YN_DURATION} audio="audio/yunus-narration.mp3" />;
