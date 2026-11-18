import React from 'react';
import {AbsoluteFill, Audio, Sequence, random, staticFile} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';

export const NU_FPS = 60;
export const NU_DURATION = 39.6;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

// ---------- pieces (Nuh is only ever light; his son is a faceless figure) ----------
const STORM = ['#0e1420', '#141c2c', '#1a2436', '#202c40', '#26344a'];
const StormSky: React.FC<{t: number; calm?: number}> = ({t, calm = 0}) => (
  <>
    {STORM.map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
    {calm < 1 && Math.floor(t * 3) % 7 === 0 && <Rf x={0} y={0} w={360} h={640} c="#cfe0ff" o={0.12 * (1 - calm)} />}
    <Rf x={0} y={0} w={360} h={640} c="#6a7a8a" o={calm * 0.4} />
  </>
);
const Rain: React.FC<{t: number; n?: number; o?: number}> = ({t, n = 110, o = 0.55}) => (
  <>{Array.from({length: n}, (_, i) => { const y = (random('ry' + i) * 700 + t * 900) % 700 - 30; const x = (random('rx' + i) * 380 - (y * 0.25)) % 380; return <Rf key={i} x={x} y={y} w={2} h={16} c="#9fb4cc" o={o} />; })}</>
);
// Big rolling waves. level: base water height (y), amp: wave height.
const Sea: React.FC<{t: number; level: number; amp?: number; c?: string; speed?: number}> = ({t, level, amp = 40, c = '#1f3a56', speed = 1}) => (
  <>
    {Array.from({length: 90}, (_, i) => { const x = i * 4; const y = level - amp * (0.6 * Math.sin(x / 40 + t * 2 * speed) + 0.4 * Math.sin(x / 17 - t * 3 * speed)); return <g key={i}><Rf x={x} y={y} w={4} h={700} c={c} /><Rf x={x} y={y} w={4} h={3} c="#8fb0cc" o={0.6} /></g>; })}
  </>
);
const Ark: React.FC<{x: number; y: number; s?: number; tilt?: number}> = ({x, y, s = 1, tilt = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
    <Rf x={-90} y={-10} w={180} h={34} c="#6e4a2a" />
    <Rf x={-80} y={24} w={160} h={10} c="#5a3a22" />
    <Rf x={-60} y={-46} w={120} h={36} c="#8a6a42" />
    <Rf x={-66} y={-52} w={132} h={8} c="#5a3a22" />
    {[-40, -10, 20].map((dx, i) => <Rf key={i} x={dx} y={-36} w={14} h={12} c="#f9c440" o={0.7} />)}
  </g>
);
const Mountain: React.FC<{x?: number}> = ({x = 230}) => (
  <g>{Array.from({length: 40}, (_, i) => { const xx = x + i * 4 - 80; const h = 260 - Math.abs(i - 20) * 11 + (i % 3) * 4; return <Rf key={i} x={xx} y={640 - h - 60} w={4} h={h + 100} c="#3a3430" />; })}</g>
);
const Son: React.FC<{x: number; y: number; s?: number; t: number; climb?: boolean}> = ({x, y, s = 3, t, climb}) => <PixG rows={villager('b', climb ? Math.floor(t * 5) % 2 : 0)} palette={PAL} x={x} y={y} s={s} smooth />;

// ---------- shots ----------
const HookStorm: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.2, 1, 1.12), 180, 420)}>
      <StormSky t={t} />
      <Mountain x={280} />
      <Son x={258} y={ez(t, 0, 3.2, 316, 306)} s={3.6} t={t} />
      <Sea t={t} level={ez(t, 0, 3.2, 470, 440)} amp={50} />
      <Ark x={110} y={430 + Math.sin(t * 2) * 10} s={0.8} tilt={Math.sin(t * 1.6) * 6} />
      <Light x={110} y={378 + Math.sin(t * 2) * 10} r={8} t={t} />
      <Rain t={t} />
    </Stage>
  );
};

const TitleShot: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 400)}>
      <StormSky t={t} />
      <Sea t={t} level={520} amp={30} />
      <Rain t={t} o={0.35} />
    </Stage>
  );
};

const Flooding: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.2, 1.1, 1.2), 180, 460)}>
      <StormSky t={t} />
      {[20, 80, 150, 230, 300].map((x, i) => <g key={i}><Rf x={x} y={430 - (i % 2) * 20} w={40} h={200} c="#5a4a3a" /><Rf x={x + 14} y={460} w={10} h={14} c="#2a2018" /></g>)}
      <Sea t={t} level={ez(t, 0, 1.2, 600, 440)} amp={16} />
      <Rain t={t} n={140} />
    </Stage>
  );
};

const ArkWaves: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.4, 1.15, 1), 180, 420)}>
      <StormSky t={t} />
      <Sea t={t} level={470} amp={110} c="#1a3050" speed={0.8} />
      <Ark x={180} y={410 + Math.sin(t * 1.6) * 40} tilt={Math.sin(t * 1.3) * 12} />
      <Light x={180} y={360 + Math.sin(t * 1.6) * 40} r={9} t={t} />
      <Sea t={t + 1.3} level={560} amp={60} c="#14263e" />
      <Rain t={t} />
    </Stage>
  );
};

const SeesSon: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.4, 1, 1.35), 270, 340)}>
      <StormSky t={t} />
      <Mountain x={280} />
      <Son x={258} y={308} s={3.6} t={t} />
      <Sea t={t} level={470} amp={40} />
      <Ark x={80} y={440 + Math.sin(t * 2) * 8} s={0.7} tilt={Math.sin(t * 1.6) * 5} />
      <Light x={80} y={394 + Math.sin(t * 2) * 8} r={8} t={t} />
      <Rain t={t} />
    </Stage>
  );
};

const Calling: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.7, 1.25, 1.4), 120, 400)}>
      <StormSky t={t} />
      <Sea t={t} level={480} amp={50} />
      <Ark x={120} y={450 + Math.sin(t * 2) * 10} tilt={Math.sin(t * 1.6) * 5} />
      <Light x={150} y={390 + Math.sin(t * 2) * 10} r={13} t={t} />
      <g shapeRendering="auto">{Array.from({length: 3}, (_, i) => { const r = (t * 60 + i * 40) % 120; return <circle key={i} cx={150} cy={390} r={r} fill="none" stroke="#fff6d0" strokeWidth={2} opacity={0.5 * (1 - r / 120)} />; })}</g>
      <Rain t={t} />
    </Stage>
  );
};

const Climbing: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.4, 1.6), 250, 360)}>
      <StormSky t={t} />
      <Mountain x={250} />
      <Son x={ez(t, 0, 4, 196, 232)} y={ez(t, 0, 4, 386, 286)} s={3.8} t={t} climb />
      <Sea t={t} level={ez(t, 0, 4, 520, 470)} amp={34} />
      <Rain t={t} />
    </Stage>
  );
};

const Rising: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5.3, 1.5, 1.7), 245, 300, Math.sin(t * 30) * 1.5)}>
      <StormSky t={t} />
      <Mountain x={250} />
      <Son x={232} y={274} s={3.8} t={t} />
      <Sea t={t} level={ez(t, 0, 5.3, 460, 360)} amp={40} />
      <Rain t={t} n={150} />
    </Stage>
  );
};

const WaveBetween: React.FC = () => {
  const t = useT();
  const crash = ez(t, 0.2, 1.4, 0, 1);
  return (
    <Stage cam={cam(1.05, 180, 380, t < 1.4 ? Math.sin(t * 40) * 4 * crash : 0)}>
      <StormSky t={t} />
      <Mountain x={280} />
      <g opacity={1 - crash}><Son x={258} y={308} s={3.6} t={t} /></g>
      <Sea t={t} level={ez(t, 0, 2.9, 470, 380)} amp={50} />
      <Sea t={t + 2} level={640 - crash * 520} amp={90} c="#14263e" />
      <Ark x={70} y={440 + Math.sin(t * 2) * 10} s={0.6} />
      <Rain t={t} />
    </Stage>
  );
};

const After: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.8, 1, 1.15), 180, 420)}>
      <StormSky t={t} calm={ez(t, 0, 3, 0.4, 1)} />
      <Sea t={t} level={470} amp={10} speed={0.3} c="#2a4058" />
      <Ark x={180} y={440 + Math.sin(t) * 3} />
      <Light x={180} y={ez(t, 0, 1.5, 390, 380)} r={14} t={t} />
      <Rain t={t} n={40} o={ez(t, 0, 3, 0.4, 0)} />
    </Stage>
  );
};

const Doorway: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.9, 1, 1.15), 180, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#3a4658" />
      <Rain t={t} n={50} o={0.3} />
      <Rf x={0} y={500} w={360} h={140} c="#2a3038" />
      <Rf x={180} y={330} w={150} h={170} c="#8a7a68" />
      <Rf x={172} y={320} w={166} h={14} c="#5a4636" />
      <Rf x={232} y={400} w={44} h={100} c="#f9c440" />
      <g shapeRendering="auto"><ellipse cx={254} cy={460} rx={70} ry={60} fill="#f9c440" opacity={0.25} /></g>
      <PixG rows={AMIR.walk[Math.floor(t * 6) % 4]} palette={PAL} x={ez(t, 0, 3.6, 10, 180)} y={450} s={3} smooth />
    </Stage>
  );
};

// ---------- overlays ----------
const StoryTag: React.FC = () => (
  <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: nunito}}>
    <div style={{display: 'inline-block', background: '#f6efdc', border: '10px double #24503a', padding: '20px 44px'}}>
      <div style={{fontWeight: 900, fontSize: 86, color: '#24503a', lineHeight: 1}}>NUH & HIS SON</div>
      <div style={{fontWeight: 800, fontSize: 40, color: '#5b6a60', marginTop: 8}}>Surah Hud · 11:42–45</div>
    </div>
  </div>
);

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 3.2, <HookStorm />],
  [3.2, 5.0, <TitleShot />],
  [5.0, 6.2, <Flooding />, 'whip'],
  [6.2, 8.7, <ArkWaves />, 'zoom'],
  [8.7, 11.0, <SeesSon />, 'whip'],
  [11.0, 15.7, <Calling />, 'zoom'],
  [15.7, 19.7, <Climbing />, 'whip'],
  [19.7, 25.0, <Rising />],
  [25.0, 27.8, <WaveBetween />],
  [27.8, 32.9, <After />, 'zoom'],
  [32.9, 36.9, <Doorway />, 'whip'],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 3.2, <Caption instant text="This is the moment a prophet watched his own son *drown*." />],
  [3.2, 5.0, <StoryTag />],
  [5.0, 6.2, <Caption text="The *flood* had come." />],
  [6.2, 8.7, <Caption text="The ark was sailing through *waves like mountains*." />],
  [8.7, 11.0, <Caption text="And Nuh saw his son, *standing apart*." />],
  [11.0, 15.7, <AyahCard refKey="11:42" range={[12, 18]} gold={[12, 13, 14]} partial tr="*O my son, come aboard with us*, and be not with the disbelievers" />],
  [15.7, 19.7, <AyahCard refKey="11:43" range={[0, 6]} gold={[3]} partial tr="I will take refuge *on a mountain* to protect me from the water" />],
  [19.7, 25.0, <AyahCard refKey="11:43" range={[7, 16]} gold={[8, 9, 10]} partial tr="*There is no protector today* from the decree of Allah, except for whom He gives mercy" />],
  [25.0, 27.8, <AyahCard refKey="11:43" range={[17, 22]} gold={[17, 18, 19]} partial tr="*And the waves came between them*, and he was among the drowned" />],
  [27.8, 32.9, <AyahCard refKey="11:45" range={[4, 8]} gold={[6, 7, 8]} partial tr="My Lord, *indeed my son is of my family*" />],
  [32.9, 36.9, <Caption text="Your parents won't always be there to call you back. *Answer them while you still can.*" size={54} />],
];
const FLASHES = [25.0];
const END_START = 36.9;

export const Nuh: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(NU_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/nuh-narration.mp3')} />
  </AbsoluteFill>
);
