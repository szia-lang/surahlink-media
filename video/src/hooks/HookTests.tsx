import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {PixG} from '../components/Pix';
import {PAL, villager} from '../alfil/sprites';
import {leader} from '../abasa/Abasa';
import {Stage, Rf, cam, ez, Light, Flash, F, useT} from '../fx/fx';
import {Bands, Bubbles, Whale, Punch} from '../fx/scenes';
import {Poor, PO_DURATION} from '../stories5/Poor';
import {Yunus, YN_DURATION} from '../stories5/Yunus';

// ---------- sound design ----------
// [time in seconds, file in public/sfx, volume, length in seconds]
type Cue = [number, string, number, number];
const SfxTrack: React.FC<{cues: Cue[]}> = ({cues}) => (
  <>{cues.map(([t, f, v, len], i) => <Sequence key={i} from={F(t)} durationInFrames={F(len)}><Audio src={staticFile(`sfx/${f}.mp3`)} volume={v} /></Sequence>)}</>
);

// A test video = new hook (visual + line + sfx) + the original video from `cutAt`, with sound design throughout.
const HookVariant: React.FC<{hookAudio: string; hookLen: number; hook: React.ReactNode; hookSfx: Cue[]; Original: React.FC; cutAt: number; storySfx: Cue[]}> = ({hookAudio, hookLen, hook, hookSfx, Original, cutAt, storySfx}) => {
  const shift = hookLen - cutAt;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Sequence durationInFrames={F(hookLen)}>
        <AbsoluteFill>{hook}</AbsoluteFill>
        <Audio src={staticFile(`audio/hooks/${hookAudio}.mp3`)} />
      </Sequence>
      <Sequence from={F(hookLen)}>
        <Sequence from={-F(cutAt)}><Original /></Sequence>
      </Sequence>
      <Sequence from={F(hookLen)} durationInFrames={12}><Flash /></Sequence>
      <SfxTrack cues={hookSfx} />
      <SfxTrack cues={storySfx.filter(([t]) => t >= cutAt).map(([t, f, v, l]) => [t + shift, f, v, l] as Cue)} />
    </AbsoluteFill>
  );
};
export const variantDuration = (hookLen: number, cutAt: number, total: number) => hookLen + (total - cutAt);

// ---------- hook visuals: Send away the poor ----------
const Hall: React.FC = () => <><Rf x={0} y={0} w={360} h={640} c="#2a1f18" />{Array.from({length: 8}, (_, i) => <Rf key={i} x={0} y={i * 70} w={360} h={2} c="#211810" />)}<Rf x={0} y={500} w={360} h={140} c="#6e5232" /></>;
const LeadersClose: React.FC<{point?: boolean}> = ({point}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 0.8, 1.6, 1.4), 120, 420, Math.sin(t * 50) * 4)}>
      <Hall />
      {['r', 'n', 'P'].map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={20 + i * 70} y={390 - Math.abs(Math.sin(t * 14 + i)) * 12} s={6} smooth />)}
      {point && <Rf x={230} y={450} w={80 * ez(t, 0, 0.3, 0, 1)} h={8} c="#c68b5c" />}
    </Stage>
  );
};
const PoorClose: React.FC<{spot?: boolean}> = ({spot}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 0.8, 1.5, 1.7), 180, 440)}>
      <Rf x={0} y={0} w={360} h={640} c="#120c0a" />
      {spot && <g shapeRendering="auto" opacity={0.4}><polygon points="150,0 210,0 250,640 110,640" fill="#fff6d0" /></g>}
      {(spot ? ['C'] : ['C', 'b', 'M']).map((c, i, a) => <PixG key={i} rows={villager(c, 0)} palette={PAL} x={a.length === 1 ? 152 : 70 + i * 80} y={400} s={spot ? 14 : 11} smooth />)}
    </Stage>
  );
};
const DoorSlam: React.FC = () => {
  const t = useT();
  const d = ez(t, 0, 0.25, 0, 1);
  return (
    <Stage cam={cam(1.05, 180, 400, t > 0.25 && t < 0.45 ? 6 : 0)}>
      <Rf x={0} y={0} w={360} h={640} c="#f3d9a0" />
      <Rf x={0} y={0} w={180 * d} h={640} c="#5a3a22" /><Rf x={360 - 180 * d} y={0} w={180 * d} h={640} c="#5a3a22" />
      <Rf x={176} y={0} w={8} h={640 * d} c="#2a1a10" />
    </Stage>
  );
};
const LightTorn: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1, 1.2, 1.35), 180, 400)}>
      <Hall />
      {['r', 'n'].map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={10 + i * 56} y={400} s={5} smooth />)}
      {['C', 'b'].map((c, i) => <PixG key={'p' + i} rows={villager(c, 0)} palette={PAL} x={240 + i * 56} y={400} s={9} smooth />)}
      <g opacity={0.6 + 0.4 * Math.sin(t * 18)}><Light x={180 + Math.sin(t * 6) * 30} y={330} r={16} t={t} /></g>
    </Stage>
  );
};
const cut = (parts: [number, React.ReactNode][]) => {
  let acc = 0;
  return <>{parts.map(([len, el], i) => { const from = acc; acc += len; return <Sequence key={i} from={F(from)} durationInFrames={F(len)}><AbsoluteFill>{el}</AbsoluteFill></Sequence>; })}</>;
};

// ---------- hook visuals: Yunus ----------
const DEEP = ['#0c2a44', '#0a2238', '#081a2c', '#061220', '#030a14'];
const MouthCloses: React.FC = () => {
  const t = useT();
  const open = ez(t, 0, 0.35, 0.3, 1) * (1 - ez(t, 0.55, 0.8, 0, 1));
  const gulped = t > 0.62;
  return (
    <Stage cam={cam(ez(t, 0, 1, 1.05, 1.35), 150, 360, t > 0.6 && t < 0.8 ? 5 : 0)}>
      <Bands c={['#3a7ea8', '#2e6a92', '#24587c', '#1a4666', '#123450']} />
      <g shapeRendering="auto" opacity={0.25}>{Array.from({length: 5}, (_, i) => <polygon key={i} points={`${50 + i * 70},0 ${70 + i * 70},0 ${40 + i * 75},640 ${20 + i * 75},640`} fill="#cfefff" />)}</g>
      <Bubbles t={t} n={50} />
      <Whale x={ez(t, 0, 1, 280, 230)} y={380} s={1.5} t={t} open={open} />
      {!gulped && <Light x={ez(t, 0, 0.62, 60, 70)} y={392} r={9} t={t} />}
      {t > 0.85 && <Rf x={0} y={0} w={360} h={640} c="#000" o={ez(t, 0.85, 1, 0, 1)} />}
    </Stage>
  );
};
const TinyLight: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 2.5, 1, 1.2), 180, 400)}><Rf x={0} y={0} w={360} h={640} c="#000" /><Light x={180} y={400} r={8 + t * 3} t={t} /></Stage>;
};
const Dive: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.3, 1.1, 1.3), 180, 400, Math.sin(t * 30) * 2)}>
      <Bands c={DEEP} />
      <Bubbles t={t * 2} n={60} />
      <g transform={`rotate(${ez(t, 0, 2.3, 10, 35)} 180 320)`}><Whale x={ez(t, 0, 2.3, 260, 140)} y={ez(t, 0, 2.3, 260, 520)} s={1.6} t={t} glow={1} /></g>
      <Rf x={0} y={0} w={360} h={640} c="#000" o={ez(t, 1.2, 2.3, 0, 0.6)} />
    </Stage>
  );
};

// ---------- sound design for the original stories (original timeline seconds) ----------
const POOR_SFX: Cue[] = [
  [5.3, 'whoosh', 0.5, 1.5], [8.2, 'shimmer', 0.35, 4], [12.3, 'whoosh', 0.45, 1.5], [12.3, 'crowd', 0.3, 4.1],
  [16.4, 'whoosh', 0.4, 1.5], [20.7, 'impact', 0.45, 2.5], [20.7, 'shimmer', 0.4, 5], [27.3, 'whoosh', 0.45, 1.5],
  [32.5, 'whoosh', 0.45, 1.5], [32.5, 'shimmer', 0.3, 3.6], [36.1, 'whoosh', 0.4, 1.5],
];
const YUNUS_SFX: Cue[] = [
  [5.0, 'whoosh', 0.45, 1.5], [8.4, 'storm', 0.5, 6], [14.4, 'whale', 0.55, 3.5], [14.9, 'impact', 0.5, 2.5],
  [16.0, 'underwater', 0.5, 4.1], [20.1, 'shimmer', 0.35, 5], [20.1, 'underwater', 0.3, 7], [27.0, 'whoosh', 0.4, 1.5],
  [27.0, 'underwater', 0.35, 6.7], [27.5, 'whale', 0.3, 4], [33.7, 'whoosh', 0.45, 1.5], [36.3, 'shimmer', 0.35, 4],
];
const HIT: Cue[] = [[0, 'impact', 0.9, 2.5]];

// ---------- the six test videos ----------
export const POOR_CUT = 5.3;
export const YUNUS_CUT = 5.0;
export const HOOK_LEN = {poorA: 3.25, poorB: 1.95, poorC: 2.2, yunusA: 3.25, yunusB: 2.1, yunusC: 2.3};

export const PoorA: React.FC = () => <HookVariant hookAudio="poorA" hookLen={HOOK_LEN.poorA} Original={Poor} cutAt={POOR_CUT} storySfx={POOR_SFX}
  hookSfx={[...HIT, [0, 'crowd', 0.35, 2], [HOOK_LEN.poorA - 0.9, 'door', 0.8, 2]]}
  hook={<>{cut([[0.9, <LeadersClose point />], [0.8, <PoorClose />], [1.55, <DoorSlam />]])}<Punch instant text="QURAYSH:" top={300} size={100} /><Sequence from={F(0.8)}><Punch instant text="GET RID OF THE POOR" top={420} size={88} /></Sequence></>} />;
export const PoorB: React.FC = () => <HookVariant hookAudio="poorB" hookLen={HOOK_LEN.poorB} Original={Poor} cutAt={POOR_CUT} storySfx={POOR_SFX}
  hookSfx={[...HIT, [0.6, 'whoosh', 0.5, 1.4]]}
  hook={<>{cut([[0.6, <LeadersClose />], [0.6, <PoorClose />], [0.75, <LightTorn />]])}<Punch instant text="WOULD HE SEND" top={330} size={96} /><Punch instant text="THE POOR AWAY?" top={450} size={96} /></>} />;
export const PoorC: React.FC = () => <HookVariant hookAudio="poorC" hookLen={HOOK_LEN.poorC} Original={Poor} cutAt={POOR_CUT} storySfx={POOR_SFX}
  hookSfx={[...HIT, [1.3, 'door', 0.8, 2]]}
  hook={<>{cut([[1.3, <PoorClose spot />], [0.9, <DoorSlam />]])}<Punch instant text="KICK OUT" top={330} size={110} /><Punch instant text="BILAL?" top={460} size={140} color="#ff6a4a" /></>} />;

export const YunusA: React.FC = () => <HookVariant hookAudio="yunusA" hookLen={HOOK_LEN.yunusA} Original={Yunus} cutAt={YUNUS_CUT} storySfx={YUNUS_SFX}
  hookSfx={[[0, 'whale', 0.6, 3], [0.8, 'impact', 0.9, 2.5], [0, 'underwater', 0.4, 3.2]]}
  hook={<>{cut([[1.0, <MouthCloses />], [2.25, <TinyLight />]])}<Punch instant text="SWALLOWED ALIVE" top={330} size={96} /><Sequence from={F(1.4)}><Punch instant text="1 SENTENCE SAVED HIM" top={560} size={74} /></Sequence></>} />;
export const YunusB: React.FC = () => <HookVariant hookAudio="yunusB" hookLen={HOOK_LEN.yunusB} Original={Yunus} cutAt={YUNUS_CUT} storySfx={YUNUS_SFX}
  hookSfx={[...HIT, [0, 'underwater', 0.45, 2.1], [0.3, 'whale', 0.4, 1.8]]}
  hook={<>{cut([[0.7, <MouthCloses />], [1.4, <TinyLight />]])}<Punch instant text="WHAT DID HE SAY" top={330} size={92} /><Punch instant text="INSIDE THE WHALE?" top={450} size={86} /></>} />;
export const YunusC: React.FC = () => <HookVariant hookAudio="yunusC" hookLen={HOOK_LEN.yunusC} Original={Yunus} cutAt={YUNUS_CUT} storySfx={YUNUS_SFX}
  hookSfx={[...HIT, [0, 'whale', 0.55, 2.3], [0, 'underwater', 0.45, 2.3]]}
  hook={<>{cut([[2.3, <Dive />]])}<Punch instant text="A PROPHET" top={330} size={110} /><Punch instant text="TRAPPED IN A WHALE" top={460} size={80} /></>} />;

export const HOOK_DURATIONS = {
  PoorA: variantDuration(HOOK_LEN.poorA, POOR_CUT, PO_DURATION), PoorB: variantDuration(HOOK_LEN.poorB, POOR_CUT, PO_DURATION), PoorC: variantDuration(HOOK_LEN.poorC, POOR_CUT, PO_DURATION),
  YunusA: variantDuration(HOOK_LEN.yunusA, YUNUS_CUT, YN_DURATION), YunusB: variantDuration(HOOK_LEN.yunusB, YUNUS_CUT, YN_DURATION), YunusC: variantDuration(HOOK_LEN.yunusC, YUNUS_CUT, YN_DURATION),
};
