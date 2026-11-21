import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {Stage, Rf, cam, ez, useT} from '../fx/fx';
import {Bands, Stars, Punch, DUSK_SKY, NIGHT_SKY} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {crow, Altar} from './props';

export const HB_DURATION = 31.58;
// Habil and Qabil are faceless figures. The killing is never shown: a flash and darkness.
const QABIL = 'R';
const HABIL = 'c';
const Hill: React.FC<{c?: string}> = ({c = '#6b5442'}) => <>{Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={470 + 20 * Math.sin(i / 9)} w={4} h={200} c={c} />)}</>;
const Dirt: React.FC<{t: number; x: number; y: number}> = ({t, x, y}) => <>{Array.from({length: 14}, (_, i) => { const life = (t * 2 + random('d' + i)) % 1; return <Rf key={i} x={x + (random('dx' + i) - 0.5) * 40 * life} y={y - Math.sin(life * Math.PI) * 30} w={4} h={4} c="#5a3a22" o={1 - life} />; })}</>;

const CrowHook: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1.35, 1.15), 180, 470, t < 0.2 ? 4 : 0)}>
      <Bands c={DUSK_SKY} />
      <Hill />
      <PixG rows={crow(Math.floor(t * 6) % 2)} palette={PAL} x={140} y={440 + Math.abs(Math.sin(t * 8)) * 4} s={5} smooth />
      <Dirt t={t} x={200} y={500} />
    </Stage>
  );
};
const Sacrifice: React.FC<{accepted?: boolean}> = ({accepted}) => {
  const t = useT();
  const fire = accepted ? ez(t, 0.2, 1, 0, 1) : 0;
  return (
    <Stage cam={cam(ez(t, 0, 2.5, 1.05, 1.15), 180, 450)}>
      <Bands c={DUSK_SKY} />
      <Hill />
      <Altar x={100} y={470} offering="sheep" />
      <Altar x={260} y={470} offering="grain" />
      <PixG rows={villager(HABIL, 0)} palette={PAL} x={60} y={430} s={6} smooth />
      <PixG rows={villager(QABIL, 0)} palette={PAL} x={290} y={430} s={6} smooth />
      {fire > 0 && <g shapeRendering="auto" opacity={fire}><polygon points="85,0 115,0 130,470 70,470" fill="#fff6d0" opacity={0.5} />{Array.from({length: 10}, (_, i) => <Rf key={i} x={84 + i * 3} y={440 - Math.abs(Math.sin(t * 10 + i)) * 30} w={4} h={14} c={i % 2 ? '#f9c440' : '#ef6a2a'} />)}</g>}
    </Stage>
  );
};
const Fury: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.3, 1.5), 260, 440, Math.sin(t * 40) * 2)}>
      <Bands c={['#3a0f12', '#5a1418', '#7a1f1a', '#8a2a1a', '#6e1a14']} />
      <Hill c="#3a2420" />
      <PixG rows={villager(QABIL, 0)} palette={PAL} x={240} y={400 - Math.abs(Math.sin(t * 12)) * 4} s={9} smooth />
    </Stage>
  );
};
const Gentle: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.7, 1.2, 1.35), 110, 440)}>
      <Bands c={DUSK_SKY} />
      <Hill />
      <g shapeRendering="auto" opacity={0.25}><polygon points="70,0 130,0 170,640 30,640" fill="#fff6d0" /></g>
      <PixG rows={villager(HABIL, 0)} palette={PAL} x={70} y={400} s={9} smooth />
    </Stage>
  );
};
const Darkness: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 400, t < 0.3 ? 5 : 0)}>
      <Bands c={NIGHT_SKY} />
      <Rf x={0} y={0} w={360} h={640} c="#000" o={ez(t, 0.4, 2, 0, 0.85)} />
      {Math.floor(t * 4) % 5 === 0 && t < 1.5 && <Rf x={0} y={0} w={360} h={640} c="#cfe0ff" o={0.2} />}
    </Stage>
  );
};
const Alone: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1.1, 1.25), 180, 470)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} n={40} h={300} />
      <Hill c="#2a2228" />
      <PixG rows={villager(QABIL, 0)} palette={PAL} x={110} y={440} s={6} smooth />
      <g shapeRendering="auto"><ellipse cx={240} cy={486} rx={46} ry={12} fill="#e9dfc8" opacity={0.85} /></g>
    </Stage>
  );
};
const CrowDigs: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.9, 1.2, 1.4), 180, 470)}>
      <Bands c={['#5a6a8a', '#7a7a96', '#9a8a96', '#b89a8a', '#c8a07a']} />
      <Hill />
      <PixG rows={crow(Math.floor(t * 5) % 2)} palette={PAL} x={130} y={440 + Math.abs(Math.sin(t * 8)) * 5} s={5} smooth />
      <Dirt t={t} x={200} y={500} />
      <PixG rows={villager(QABIL, 0)} palette={PAL} x={290} y={432} s={5} smooth />
    </Stage>
  );
};
const Regret: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1.15, 1.3), 180, 470)}>
      <Bands c={['#3a3a48', '#4a4a58', '#5a5a64', '#6a6a70', '#7a7a7a']} />
      <Hill c="#5a5048" />
      <g transform="translate(0 30)"><PixG rows={villager(QABIL, 0)} palette={PAL} x={150} y={430} s={8} smooth /></g>
      {Array.from({length: 4}, (_, i) => { const life = (t * 0.8 + i / 4) % 1; return <Rf key={i} x={176 + (i % 2) * 8} y={470 + life * 40} w={3} h={5} c="#a6e2f5" o={1 - life} />; })}
    </Stage>
  );
};

const SHOTS: Shot[] = [
  [0, 3.6, <CrowHook />],
  [3.6, 6.2, <Sacrifice />, 'whip'],
  [6.2, 8.2, <Sacrifice accepted />],
  [8.2, 11.3, <Fury />, 'zoom'],
  [11.3, 16.0, <Gentle />, 'whip'],
  [16.0, 19.1, <Darkness />],
  [19.1, 21.8, <Alone />, 'zoom'],
  [21.8, 24.7, <CrowDigs />, 'whip'],
  [24.7, 28.2, <Regret />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.6, <><Punch instant text="THE FIRST MURDERER" top={290} size={76} /><Punch instant text="COULDN'T BURY HIS BROTHER" top={400} size={52} color="#ffffff" /></>],
  [3.6, 6.2, <Caption text="Adam's two sons, *Habil and Qabil*, offered a sacrifice." />],
  [6.2, 8.2, <Caption text="Allah *accepted only one*." size={70} />],
  [8.2, 11.3, <AyahCard refKey="5:27" range={[16, 17]} gold={[17]} partial tr="*I will surely kill you*" />],
  [11.3, 16.0, <AyahCard refKey="5:27" range={[18, 23]} gold={[20, 21, 22, 23]} partial tr="Indeed, *Allah only accepts from the righteous*" />],
  [16.0, 19.1, <Caption text="But Qabil's soul permitted it. *And he killed him.*" />],
  [19.1, 21.8, <Caption text="Then he had *no idea what to do*." />],
  [21.8, 24.7, <Caption text="So Allah sent *a crow*, digging in the ground." />],
  [24.7, 28.2, <AyahCard refKey="5:31" range={[11, 18]} gold={[13, 14, 15, 16, 17, 18]} partial tr="O woe to me! *Have I failed to be like this crow?*" />],
];
const SFX: Cue[] = [
  [0, 'impact', 0.85, 2.5], [3.6, 'whoosh', 0.45, 1.5], [6.2, 'shimmer', 0.4, 2.5], [8.2, 'impact', 0.45, 2],
  [11.3, 'whoosh', 0.4, 1.5], [16.0, 'storm', 0.45, 3.1], [16.0, 'impact', 0.6, 2.5], [21.8, 'whoosh', 0.4, 1.5], [24.7, 'shimmer', 0.3, 3.5],
];

export const Habil: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[16.0]} endStart={28.2} duration={HB_DURATION} audio="audio/habil-narration.mp3" sfx={SFX} />;
