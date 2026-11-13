import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadAmiri} from '@remotion/google-fonts/AmiriQuran';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG, PixStage, R} from '../components/Pix';
import {Caption} from '../components/Caption';
import {PAL, elephant, soldier, bird, abraha, elder, villager} from './sprites';
import {DuskSky, Dunes, Mountains, Ground, Dust, Kaaba, MakkahValley} from './scenery';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import ayat from '../data/ayat.json';

const amiri = loadAmiri().fontFamily;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const T = (s: number) => Math.round(s * 30);
const zoom = (z: number, cx = 90, cy = 200) => `translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`;

// ================= shots =================
const ArmyWide: React.FC = () => {
  const f = useCurrentFrame();
  const march = f * 0.7;
  return (
    <PixStage cam={zoom(interpolate(f, [0, 60], [1, 1.12]))}>
      <DuskSky />
      <R x={120} y={88} w={22} h={22} c="#fbe0a6" /><R x={117} y={92} w={28} h={14} c="#fbe0a6" />
      <Dunes y={175} c="#e6c88c" amp={6} freq={14} shift={f * 0.2} />
      <Dunes y={200} c="#d9b77a" amp={5} freq={10} shift={f * 0.5} />
      <Ground y={215} c="#c9a466" d="#b58f55" scroll={f * 0.8} />
      {[0, 1, 2].map((i) => <PixG key={i} rows={elephant(Math.floor((f + i * 5) / 8) % 2)} palette={PAL} x={-30 + march + i * 44} y={176 + (i % 2) * 6} />)}
      {Array.from({length: 14}, (_, i) => <PixG key={'s' + i} rows={soldier(Math.floor((f + i * 3) / 6) % 2)} palette={PAL} x={-70 + march + i * 12} y={210 + (i % 3) * 5} />)}
      <Dust x={30 + march} y={214} t={f} seed="d1" n={24} />
    </PixStage>
  );
};

const LeadElephant: React.FC = () => {
  const f = useCurrentFrame();
  const step = Math.floor(f / 9) % 2;
  const sinceStep = f % 9;
  const shake = sinceStep < 3 ? (sinceStep % 2 ? 2 : -2) : 0;
  return (
    <PixStage cam={`translate(0 ${shake})`}>
      <DuskSky />
      <Dunes y={190} c="#e6c88c" amp={8} freq={16} shift={f * 1.5} />
      <Ground y={232} c="#c9a466" d="#b58f55" scroll={f * 4} />
      {Array.from({length: 8}, (_, i) => <PixG key={i} rows={soldier(Math.floor((f + i * 2) / 5) % 2)} palette={PAL} x={((i * 26 - f * 2) % 200 + 200) % 200 - 10} y={222} />)}
      <PixG rows={elephant(step)} palette={PAL} x={18 + f * 0.25} y={150} s={3} />
      <Dust x={60 + f * 0.25} y={232} t={f * 2} seed="d2" n={30} />
    </PixStage>
  );
};

const AbrahaShot: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 57], [1, 1.18]);
  return (
    <PixStage cam={zoom(z, 90, 230)}>
      <R x={0} y={0} w={180} h={320} c="#5a2a24" />
      {Array.from({length: 9}, (_, i) => <R key={i} x={i * 22 - 4} y={0} w={8} h={320} c="#6e3329" />)}
      <R x={0} y={250} w={180} h={70} c="#3d1d19" />
      {/* throne */}
      <R x={62} y={170} w={56} h={84} c="#d4a73a" /><R x={68} y={176} w={44} h={78} c="#a8432f" />
      <PixG rows={abraha()} palette={PAL} x={63} y={168} s={3} />
      {/* torches */}
      {[22, 148].map((x, i) => <g key={i}><R x={x} y={150} w={4} h={40} c="#3b2a20" /><R x={x - 2 + (Math.floor(f / 4 + i) % 2)} y={140} w={8} h={10} c="#f6b13d" /><R x={x} y={137 - (Math.floor(f / 3) % 2)} w={4} h={6} c="#fbe7a1" /></g>)}
    </PixStage>
  );
};

const Church: React.FC<{empty?: boolean}> = ({empty}) => {
  const f = useCurrentFrame();
  const z = empty ? 1.05 : interpolate(f, [0, 60], [1.2, 1]);
  return (
    <PixStage cam={zoom(z, 90, 220)}>
      <R x={0} y={0} w={180} h={320} c="#9fcbe0" />
      <Mountains y={190} c="#8a7a68" seed="yemen" h={50} />
      <R x={0} y={238} w={180} h={82} c="#d8c08a" />
      {/* grand church facade */}
      <R x={22} y={110} w={136} h={130} c="#e8d8b8" />
      {Array.from({length: 9}, (_, i) => <R key={i} x={22} y={116 + i * 14} w={136} h={2} c="#b0573a" />)}
      <R x={18} y={104} w={144} h={6} c="#d4a73a" />
      <R x={70} y={74} w={40} h={36} c="#e8d8b8" /><R x={66} y={70} w={48} h={5} c="#d4a73a" />
      <R x={82} y={56} w={16} h={14} c="#d4a73a" /><R x={86} y={50} w={8} h={6} c="#d4a73a" />
      {Array.from({length: 4}, (_, c) => Array.from({length: 3}, (_, r) => (
        <g key={`${c}-${r}`}><R x={32 + c * 32} y={126 + r * 34} w={10} h={20} c="#2b2320" /><R x={34 + c * 32} y={123 + r * 34} w={6} h={3} c="#2b2320" /></g>
      )))}
      <R x={78} y={196} w={24} h={44} c="#5a3a22" /><R x={76} y={192} w={28} h={4} c="#d4a73a" /><R x={89} y={198} w={2} h={42} c="#3b2a18" />
      {/* travellers walking past toward the right (to Makkah) */}
      {!empty && Array.from({length: 8}, (_, i) => <PixG key={i} rows={villager(['g', 'r', 'b', 'c', 'n'][i % 5], Math.floor((f + i) / 5) % 2)} palette={PAL} x={((i * 24 + f * 1.2) % 200) - 10} y={256 + (i % 2) * 6} s={2} />)}
      {empty && (
        <g>
          {/* tumbleweed */}
          <g transform={`translate(${-20 + f * 4} ${262 - Math.abs(Math.sin(f / 4)) * 10})`}><R x={0} y={2} w={10} h={6} c="#8a6a3a" /><R x={2} y={0} w={6} h={10} c="#8a6a3a" /><R x={3} y={3} w={4} h={4} c="#b08a52" /></g>
          <PixG rows={abraha()} palette={PAL} x={130} y={226} s={1} />
        </g>
      )}
    </PixStage>
  );
};

const ArmySetsOut: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 78], [1.15, 1]))}>
      <R x={0} y={0} w={180} h={320} c="#f1c48e" />
      <R x={0} y={110} w={180} h={210} c="#e9a876" />
      <Dunes y={190} c="#e6c88c" amp={7} freq={12} shift={f} />
      <Ground y={210} c="#c9a466" d="#b58f55" scroll={f * 2} />
      {/* banners */}
      {Array.from({length: 5}, (_, i) => { const x = 10 + i * 34 + f * 0.8; return <g key={i}><R x={x} y={150} w={2} h={60} c="#3b2a20" /><R x={x + 2} y={150 + (Math.floor((f + i * 3) / 5) % 2)} w={14} h={8} c="#a8432f" /><R x={x + 2} y={156} w={14} h={2} c="#d4a73a" /></g>; })}
      {[0, 1, 2, 3].map((i) => <PixG key={i} rows={elephant(Math.floor((f + i * 4) / 8) % 2)} palette={PAL} x={-40 + f * 0.8 + i * 46} y={180 + (i % 2) * 8} />)}
      {Array.from({length: 18}, (_, i) => <PixG key={'s' + i} rows={soldier(Math.floor((f + i * 2) / 6) % 2)} palette={PAL} x={-80 + f * 0.8 + i * 11} y={216 + (i % 3) * 6} />)}
      <Dust x={40 + f * 0.8} y={222} t={f} seed="d5" n={28} />
    </PixStage>
  );
};

const MakkahWide: React.FC<{amir?: boolean}> = ({amir}) => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 60], [1.2, 1]))}>
      <MakkahValley f={f} />
      {amir && <PixG rows={AMIR.poses.back} palette={PAL} x={20} y={246} s={2} />}
    </PixStage>
  );
};

const ElderShot: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <PixStage cam={zoom(interpolate(f, [0, 72], [1, 1.12]), 90, 240)}>
      <DuskSky />
      <Mountains y={230} c="#6b5442" seed="m7" h={80} />
      <Ground y={250} c="#d8c08a" d="#c4a96f" />
      <Kaaba x={124} y={214} s={1.2} />
      <PixG rows={elder()} palette={PAL} x={30} y={160} s={3} />
    </PixStage>
  );
};

const KaabaHero: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.18 + 0.08 * Math.sin(f / 6);
  return (
    <PixStage cam={zoom(interpolate(f, [0, 72], [1, 1.1]), 90, 230)}>
      <DuskSky />
      <Mountains y={215} c="#6b5442" seed="m8" h={70} />
      <Ground y={245} c="#d8c08a" d="#c4a96f" />
      <R x={40} y={150} w={100} h={100} c="#fbe7a1" o={glow} />
      <R x={54} y={164} w={72} h={86} c="#fbe7a1" o={glow} />
      <Kaaba x={62} y={182} s={2.3} />
      <PixG rows={AMIR.poses.back} palette={PAL} x={12} y={262} s={2} />
    </PixStage>
  );
};

const Mountain: React.FC = () => {
  const f = useCurrentFrame();
  const slope = (x: number) => 280 - x * 1.0;
  return (
    <PixStage cam={zoom(interpolate(f, [0, 100], [1, 1.1]), 120, 160)}>
      <DuskSky />
      {Array.from({length: 90}, (_, i) => { const x = i * 2; const y = Math.max(120 + 20 * Math.sin(i / 7), slope(x)); return <R key={i} x={x} y={y} w={2} h={320} c="#6b5442" />; })}
      {Array.from({length: 90}, (_, i) => { const x = i * 2; return <R key={'b' + i} x={x} y={Math.max(150, slope(x) + 14)} w={2} h={320} c="#54412f" />; })}
      {Array.from({length: 12}, (_, i) => {
        const x = Math.min(150, 4 + i * 9 + f * 0.6);
        const done = x >= 150;
        return <PixG key={i} rows={villager(['g', 'r', 'b', 'c', 'n', 'M'][i % 6], done ? 0 : Math.floor((f + i) / 5) % 2)} palette={PAL} x={done ? 140 + (i % 4) * 8 : x} y={(done ? slope(140 + (i % 4) * 8) : slope(x)) - 14} s={2} />;
      })}
      <Kaaba x={8} y={288} s={0.8} />
    </PixStage>
  );
};

const Kneel: React.FC<{kneelAt: number; pushers?: boolean}> = ({kneelAt, pushers}) => {
  const f = useCurrentFrame();
  const knelt = f >= kneelAt;
  const x = kneelAt > 0 ? interpolate(f, [0, kneelAt], [-10, 22], clamp) : 22;
  const shake = kneelAt > 0 && f >= kneelAt && f < kneelAt + 6 ? (f % 2 ? 3 : -3) : 0;
  return (
    <PixStage cam={`translate(${shake} 0)`}>
      <DuskSky />
      <Mountains y={215} c="#6b5442" seed="m3" h={60} />
      <Ground y={240} c="#d8c08a" d="#c4a96f" />
      <Kaaba x={118} y={190} s={2} />
      <PixG rows={elephant(Math.floor(f / 8) % 2, knelt)} palette={PAL} x={x} y={164} s={2.4} />
      {knelt && kneelAt > 0 && <Dust x={x + 50} y={240} t={(f - kneelAt) * 3} seed="d4" n={30} />}
      {pushers && [0, 1, 2].map((i) => <PixG key={i} rows={soldier(Math.floor((f + i * 2) / 3) % 2)} palette={PAL} x={-4 + i * 13 + (Math.floor(f / 2 + i) % 2)} y={220 + (i % 2) * 4} s={2} />)}
    </PixStage>
  );
};

const SkyDark: React.FC = () => {
  const f = useCurrentFrame();
  const dark = interpolate(f, [0, 50], [0, 0.6], clamp);
  return (
    <PixStage cam={zoom(interpolate(f, [0, 60], [1, 1.08]))}>
      <MakkahValley f={f} dark={dark} />
      {[0, 1, 2].map((i) => <PixG key={i} rows={elephant(0)} palette={PAL} x={8 + i * 50} y={238 + (i % 2) * 8} />)}
      {Array.from({length: 10}, (_, i) => <PixG key={i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={PAL} x={186 + i * 9 - Math.max(0, f - 30) * 2.5} y={60 + random('sd' + i) * 50} opacity={interpolate(f, [30, 45], [0, 1], clamp)} />)}
    </PixStage>
  );
};

const Birds: React.FC<{stones: number; seed: string}> = ({stones, seed}) => {
  const f = useCurrentFrame();
  return (
    <PixStage>
      <MakkahValley f={f} dark={0.6} />
      {[0, 1, 2].map((i) => <PixG key={i} rows={elephant(0)} palette={PAL} x={8 + i * 50} y={238 + (i % 2) * 8} />)}
      {Array.from({length: 50}, (_, i) => {
        const sp = 2.2 + random(seed + 'bs' + i) * 2;
        const bx = 190 + random(seed + 'bx' + i) * 140 - f * sp;
        const by = 70 + random(seed + 'by' + i) * 110 + Math.sin((f + i * 7) / 5) * 3;
        return <PixG key={i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={PAL} x={bx} y={by} />;
      })}
      {Array.from({length: 6}, (_, i) => <PixG key={'n' + i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={PAL} x={200 + i * 40 - f * 5} y={110 + random(seed + 'nb' + i) * 120} s={3} />)}
      {Array.from({length: stones}, (_, i) => {
        const t = f - random(seed + 'st' + i) * 70;
        if (t < 0) return null;
        const y = 130 + t * 5;
        const sx = 10 + random(seed + 'sx' + i) * 160;
        if (y > 250) return t < 30 ? <R key={i} x={sx - 2} y={248} w={6} h={2} c="#fbe7a1" o={Math.max(0, 1 - (y - 250) / 30)} /> : null;
        return <R key={i} x={sx} y={y} w={2} h={2} c="#9b5a35" />;
      })}
    </PixStage>
  );
};

const Straw: React.FC = () => {
  const f = useCurrentFrame();
  const fade = interpolate(f, [5, 40], [1, 0], clamp);
  return (
    <PixStage>
      <MakkahValley f={f} dark={interpolate(f, [0, 75], [0.6, 0.2], clamp)} />
      {[0, 1, 2].map((i) => <PixG key={i} rows={elephant(0)} palette={PAL} x={8 + i * 50} y={238 + (i % 2) * 8} opacity={fade} />)}
      {Array.from({length: 120}, (_, i) => {
        const ox = 12 + random('px' + i) * 150;
        const oy = 238 + random('py' + i) * 26;
        const t = Math.max(0, f - random('pt' + i) * 25);
        return <R key={i} x={ox + t * (1.2 + random('pv' + i) * 2)} y={oy - t * 0.6 + Math.sin(t / 3 + i) * 2} w={3} h={1} c={i % 3 ? '#d4a73a' : '#b58f55'} o={Math.max(0, 1 - t / 60)} />;
      })}
    </PixStage>
  );
};

const NightBirth: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 0.25 + 0.1 * Math.sin(f / 7);
  return (
    <PixStage cam={zoom(interpolate(f, [0, 135], [1, 1.15]), 140, 200)}>
      <R x={0} y={0} w={180} h={320} c="#13213a" />
      <R x={0} y={150} w={180} h={170} c="#1a2c4a" />
      {Array.from({length: 40}, (_, i) => <R key={i} x={random('nx' + i) * 180} y={random('ny' + i) * 170} w={1} h={1} c="#f6efdc" o={0.4 + 0.6 * (Math.floor(f / 6 + i) % 3 === 0 ? 1 : 0.4)} />)}
      <Mountains y={225} c="#0f1a2c" seed="n1" h={60} />
      <R x={0} y={222} w={180} h={98} c="#1f2c3a" />
      {[6, 28, 50, 112].map((x, i) => <g key={i}><R x={x} y={204 - (i % 2) * 4} w={16} h={18 + (i % 2) * 4} c="#3a4658" /><R x={x + 5} y={210} w={4} h={5} c="#e9c36a" o={0.7} /></g>)}
      <Kaaba x={74} y={196} s={1} />
      {/* soft light over one house, no figure shown */}
      <R x={138} y={150} w={26} h={60} c="#fbe7a1" o={pulse * 0.5} />
      <R x={130} y={170} w={42} h={40} c="#fbe7a1" o={pulse * 0.5} />
      <R x={142} y={190} w={18} h={22} c="#efe3c4" />
      <R x={148} y={198} w={6} h={7} c="#fbe7a1" />
      {Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2 + f / 40; return <R key={i} x={151 + Math.cos(a) * 22} y={185 + Math.sin(a) * 22} w={2} h={2} c="#fbe7a1" o={0.7} />; })}
    </PixStage>
  );
};

const TitleCard: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: '#1b1530', justifyContent: 'center', alignItems: 'center'}}>
      <PixStage>
        {Array.from({length: 20}, (_, i) => <PixG key={i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={{...PAL, B: '#3a3350'}} x={random('tx' + i) * 220 - f * 2.5} y={40 + random('ty' + i) * 240} />)}
      </PixStage>
      <div style={{transform: `scale(${s})`, textAlign: 'center', fontFamily: nunito, color: '#f6efdc'}}>
        <div style={{fontSize: 44, fontWeight: 800, color: '#d4a73a', letterSpacing: 3}}>SURAH 105</div>
        <div style={{fontSize: 130, fontWeight: 900, lineHeight: 1}}>Al-Fil</div>
        <div style={{fontSize: 44, fontWeight: 800, color: '#c9b994', marginTop: 10}}>The Elephant</div>
      </div>
    </AbsoluteFill>
  );
};

// ================= overlays =================
const AyahCard: React.FC<{refKey: keyof typeof ayat; gold: number[]; tr: string}> = ({refKey, gold, tr}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const ay = ayat[refKey];
  const parts = tr.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>SURAH AL-FIL · {refKey}</div>
      <div style={{fontFamily: amiri, fontSize: 76, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>
        {ay.words.map((w, i) => <span key={i} style={{color: gold.includes(i) ? '#b8862a' : undefined}}>{w}{' '}</span>)}
      </div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 46, color: '#1d2b24', lineHeight: 1.15}}>
        “{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}”
      </div>
    </div>
  );
};

const Flash: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: 'white', opacity: interpolate(f, [0, 2, 8], [0, 0.9, 0], clamp)}} />;
};

// ================= timeline (seconds come from the narration's word timestamps) =================
type Seg = [number, number, React.ReactNode];
const SHOTS: Seg[] = [
  [0, 2.0, <ArmyWide />],
  [2.0, 4.1, <LeadElephant />],
  [4.1, 6.0, <AbrahaShot />],
  [6.0, 9.8, <Church />],
  [9.8, 11.3, <Church empty />],
  [11.3, 14.0, <ArmySetsOut />],
  [14.0, 15.8, <MakkahWide />],
  [15.8, 18.2, <ElderShot />],
  [18.2, 20.7, <KaabaHero />],
  [20.7, 24.0, <Mountain />],
  [24.0, 27.5, <Kneel kneelAt={T(26.4 - 24.0)} />],
  [27.5, 31.0, <Kneel kneelAt={0} pushers />],
  [31.0, 33.0, <SkyDark />],
  [33.0, 35.7, <Birds stones={30} seed="a" />],
  [35.7, 38.5, <Birds stones={70} seed="b" />],
  [38.5, 41.1, <Straw />],
  [41.1, 45.7, <NightBirth />],
  [45.7, 47.4, <TitleCard />],
];

const CAPTIONS: Seg[] = [
  [0, 2.0, <Caption text="An army of *elephants*" />],
  [2.0, 4.1, <Caption text="marching to destroy the *Kaaba*." />],
  [4.1, 6.0, <Caption text="*Abraha*, the ruler of Yemen," />],
  [6.0, 8.0, <Caption text="built a *grand church*" />],
  [8.0, 9.8, <Caption text="to pull the Arabs *away from Makkah*." />],
  [9.8, 11.3, <Caption text="When they *wouldn't come*," />],
  [11.3, 14.0, <Caption text="he set out to *tear the Kaaba down*." />],
  [14.0, 15.8, <Caption text="Makkah had *no army*." />],
  [15.8, 18.2, <Caption text="Its leader, *Abdul-Muttalib*, said:" />],
  [18.2, 20.7, <Caption text="“The House has a *Lord* who will protect it.”" />],
  [20.7, 24.0, <Caption text="So the people climbed into the *mountains*, and waited." />],
  [24.0, 26.4, <Caption text="But at the edge of Makkah," />],
  [26.4, 27.5, <Caption text="the lead elephant *knelt*." />],
  [27.5, 31.0, <Caption text="It would not take *a single step* toward the Kaaba." />],
  [31.0, 33.0, <Caption text="Then the sky went *dark*." />],
  [33.0, 35.7, <AyahCard refKey="105:3" gold={[2, 3]} tr="And He sent against them *birds in flocks*" />],
  [35.7, 38.5, <AyahCard refKey="105:4" gold={[1, 2, 3]} tr="Striking them with *stones of hard clay*" />],
  [38.5, 41.1, <AyahCard refKey="105:5" gold={[1, 2]} tr="And He made them like *eaten straw*" />],
  [41.1, 43.4, <Caption text="That same year," />],
  [43.4, 45.7, <Caption text="the Prophet *Muhammad* ﷺ was born." />],
];

const FLASHES = [2.0, 26.4, 33.0, 38.5, 45.7];
export const END_CARD_START = 47.4;
export const ALFIL_FRAMES = T(END_CARD_START) + 120;

export const AlFil: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el], i) => <Sequence key={'s' + i} from={T(a)} durationInFrames={T(b) - T(a)}><AbsoluteFill>{el}</AbsoluteFill></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={T(a)} durationInFrames={T(b) - T(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={T(t)} durationInFrames={10}><Flash /></Sequence>)}
    <Sequence from={T(END_CARD_START)} durationInFrames={120}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/alfil-narration.mp3')} />
  </AbsoluteFill>
);
