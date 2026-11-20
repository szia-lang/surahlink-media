import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard, QURAN_FONT} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const K2_FPS = 60;
export const K2_DURATION = 53.68;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

// ---------- cosmic pieces ----------
// Warp starfield: stars rush outward from the centre; speed controls streak length.
const Warp: React.FC<{t: number; speed?: number; n?: number}> = ({t, speed = 1, n = 160}) => (
  <g shapeRendering="auto">
    {Array.from({length: n}, (_, i) => {
      const a = random('wa' + i) * Math.PI * 2;
      const z = ((random('wz' + i) + t * 0.35 * speed) % 1);
      const r1 = 8 + z * z * 420;
      const r0 = 8 + Math.max(0, z - 0.05 * speed) ** 2 * 420;
      return <line key={i} x1={180 + Math.cos(a) * r0} y1={330 + Math.sin(a) * r0} x2={180 + Math.cos(a) * r1} y2={330 + Math.sin(a) * r1} stroke="#e8f0ff" strokeWidth={1 + z * 2.5} opacity={0.3 + z * 0.7} />;
    })}
  </g>
);
const StarDust: React.FC<{t: number; n?: number}> = ({t, n = 140}) => <>{Array.from({length: n}, (_, i) => <Rf key={i} x={random('sx' + i) * 360} y={random('sy' + i) * 640} w={i % 9 === 0 ? 3 : 2} h={i % 9 === 0 ? 3 : 2} c="#f6efdc" o={0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + i))} />)}</>;
const Earth: React.FC<{x: number; y: number; r: number; t: number; dawn?: number}> = ({x, y, r, t, dawn = 0.6}) => (
  <g shapeRendering="auto">
    <defs>
      <radialGradient id="ocean" cx="0.35" cy="0.35" r="0.75"><stop offset="0" stopColor="#4aa3e0" /><stop offset="1" stopColor="#0b2a5a" /></radialGradient>
      <radialGradient id="atmo" cx="0.5" cy="0.5" r="0.5"><stop offset="0.85" stopColor="#7fc4ff" stopOpacity={0} /><stop offset="0.93" stopColor="#7fc4ff" stopOpacity={0.55} /><stop offset="1" stopColor="#7fc4ff" stopOpacity={0} /></radialGradient>
      <clipPath id="earthClip"><circle cx={x} cy={y} r={r} /></clipPath>
      <linearGradient id="term" x1="0" y1="0" x2="1" y2="0.25">
        <stop offset={Math.max(0, dawn - 0.22)} stopColor="#020614" stopOpacity={0} />
        <stop offset={Math.max(0, dawn - 0.08)} stopColor="#f9c440" stopOpacity={0.18} />
        <stop offset={Math.min(1, dawn + 0.08)} stopColor="#020614" stopOpacity={0.55} />
        <stop offset={Math.min(1, dawn + 0.25)} stopColor="#020614" stopOpacity={0.85} />
      </linearGradient>
    </defs>
    <circle cx={x} cy={y} r={r * 1.12} fill="url(#atmo)" />
    <circle cx={x} cy={y} r={r} fill="url(#ocean)" />
    <g clipPath="url(#earthClip)">
      {Array.from({length: 26}, (_, i) => { const px = x - r + ((random('lx' + i) * 2 * r + t * r * 0.05) % (2 * r)); const py = y - r + random('ly' + i) * 2 * r; return <ellipse key={i} cx={px} cy={py} rx={r * (0.08 + random('lr' + i) * 0.16)} ry={r * (0.05 + random('lq' + i) * 0.1)} fill={i % 3 ? '#4f8f44' : '#c9b06a'} opacity={0.9} />; })}
      {Array.from({length: 14}, (_, i) => <ellipse key={'c' + i} cx={x - r + ((random('cx' + i) * 2 * r + t * r * 0.09) % (2 * r))} cy={y - r + random('cy' + i) * 2 * r} rx={r * 0.18} ry={r * 0.04} fill="#ffffff" opacity={0.5} />)}
      <rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill="url(#term)" />
    </g>
  </g>
);
const Galaxy: React.FC<{t: number; s: number}> = ({t, s}) => (
  <g shapeRendering="auto" transform={`translate(180 330) scale(${s}) rotate(${t * 6})`}>
    <circle cx={0} cy={0} r={40} fill="#fff1c8" opacity={0.35} />
    <circle cx={0} cy={0} r={14} fill="#fffaf0" />
    {Array.from({length: 520}, (_, i) => { const arm = i % 3; const d = random('gd' + i) * 260; const a = arm * (Math.PI * 2 / 3) + d / 55 + (random('ga' + i) - 0.5) * 0.6; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.55} r={0.7 + random('gr' + i) * 1.6} fill={i % 7 === 0 ? '#f9c4a0' : '#dfe8ff'} opacity={0.9 - d / 320} />; })}
  </g>
);
const CityWindows: React.FC<{t: number; answered?: boolean}> = ({t, answered}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#0b1024" />
    <StarDust t={t} n={50} />
    {[0, 70, 130, 200, 260, 310].map((x, b) => (
      <g key={b}>
        <Rf x={x} y={250 + (b % 3) * 40} w={58} h={420} c="#151c34" />
        {Array.from({length: 12}, (_, k) => { const wx = x + 8 + (k % 3) * 16; const wy = 270 + (b % 3) * 40 + Math.floor(k / 3) * 46; const on = random('wn' + b + k) > 0.35; return <g key={k}><Rf x={wx} y={wy} w={10} h={14} c={on ? '#f9c440' : '#0e1428'} o={on ? 0.85 : 1} />{on && !answered && random('q' + b + k) > 0.6 && <text x={wx + 5} y={wy - 6 - Math.sin(t * 3 + k) * 3} fontSize={14} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f6efdc" opacity={0.85}>?</text>}{on && answered && <circle cx={wx + 5} cy={wy + 7} r={12} fill="#f9c440" opacity={0.18 + 0.1 * Math.sin(t * 3 + k)} />}</g>; })}
      </g>
    ))}
  </>
);

// ---------- shots ----------
const HookSpace: React.FC = () => {
  const t = useT();
  const r = ez(t, 0, 3.4, 170, 60);
  return (
    <Stage>
      <Rf x={0} y={0} w={360} h={640} c="#02040c" />
      <Warp t={t} speed={ez(t, 0, 3.4, 2.2, 1)} />
      <Earth x={180} y={ez(t, 0, 3.4, 560, 470)} r={r} t={t} dawn={ez(t, 0, 3.4, 0.35, 0.8)} />
    </Stage>
  );
};

const Seal: React.FC = () => {
  const t = useT();
  const drop = ez(t, 0.4, 0.75, 0, 1);
  return (
    <Stage cam={cam(1.1, 180, 380, t > 0.75 && t < 0.9 ? 4 : 0)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a1410" />
      <Rf x={50} y={170} w={260} h={380} c="#efe2c4" />
      {Array.from({length: 11}, (_, i) => <Rf key={i} x={80} y={220 + i * 26} w={200 - (i % 4) * 22} h={5} c="#a8956e" />)}
      <g transform={`translate(240 ${ez(t, 0.4, 0.75, 250, 470)}) scale(${2 - drop})`} opacity={drop}>
        <circle cx={0} cy={0} r={44} fill="#8a1f1f" shapeRendering="auto" />
        <circle cx={0} cy={0} r={34} fill="none" stroke="#e8c0a0" strokeWidth={3} shapeRendering="auto" />
        <text x={0} y={7} fontSize={16} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f6efdc">SAHIH</text>
      </g>
    </Stage>
  );
};

const Windows: React.FC<{answered?: boolean}> = ({answered}) => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 3.9, answered ? 1.2 : 1, answered ? 1 : 1.2), 180, 420)}><CityWindows t={t} answered={answered} /></Stage>;
};

const Courtyard: React.FC<{pulse?: boolean; answer?: boolean}> = ({pulse, answer}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.18), 180, 450)}>
      {['#2a3a6a', '#4a4a7a', '#8a6a7a', '#c98a6a', '#e0a070'].map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
      {[30, 300].map((x, i) => <g key={i}><Rf x={x} y={260} w={10} h={260} c="#6e4a2a" /><Rf x={x - 34} y={240} w={78} h={30} c="#3f7a3a" /></g>)}
      <Rf x={0} y={520} w={360} h={120} c="#c9a466" />
      <PixG rows={villager('w', 0)} palette={PAL} x={196} y={420} s={11} smooth />
      <Light x={120} y={440} r={14} t={t} />
      {pulse && <g shapeRendering="auto">{Array.from({length: 3}, (_, i) => { const r = Math.max(0, (t - 0.3 - i * 0.15)) * 200; return r > 0 && r < 160 ? <circle key={i} cx={120} cy={440} r={r} fill="none" stroke="#fff6d0" strokeWidth={4} opacity={1 - r / 160} /> : null; })}</g>}
      {answer && <text x={218} y={ez(t, 0, 0.8, 420, 390)} fontSize={22} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f9c440" opacity={ez(t, 0, 0.5, 0, 1)}>AYAT AL-KURSI</text>}
    </Stage>
  );
};

const MushafZoom: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1, 1, 3.5), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <Rf x={60} y={260} w={240} h={280} c="#f6efdc" />
      {Array.from({length: 8}, (_, i) => <Rf key={i} x={90} y={300 + i * 28} w={180 - (i % 3) * 20} h={6} c={i === 3 ? '#d4a73a' : '#c9b994'} />)}
    </Stage>
  );
};

const LightSpreads: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5.2, 1, 1.08), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#02040c" />
      <StarDust t={t} />
      <Earth x={180} y={440} r={150} t={t} dawn={ez(t, 0, 4.5, 0.1, 1.05)} />
      <g shapeRendering="auto"><circle cx={ez(t, 0, 4.5, 20, 340)} cy={290} r={30} fill="#fff4c2" opacity={0.9} /><circle cx={ez(t, 0, 4.5, 20, 340)} cy={290} r={90} fill="#fff4c2" opacity={0.15} /></g>
    </Stage>
  );
};

const WorldAsleep: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.1, 1), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#060a1a" />
      <StarDust t={t} n={80} />
      {[0, 70, 130, 200, 260, 310].map((x, b) => (
        <g key={b}>
          <Rf x={x} y={360 + (b % 3) * 30} w={58} h={300} c="#121a30" />
          {Array.from({length: 9}, (_, k) => { const off = t > random('off' + b + k) * 1.8; return <Rf key={k} x={x + 8 + (k % 3) * 16} y={380 + (b % 3) * 30 + Math.floor(k / 3) * 46} w={10} h={14} c={off ? '#0e1428' : '#f9c440'} o={off ? 1 : 0.85} />; })}
        </g>
      ))}
      <g shapeRendering="auto"><circle cx={180} cy={300} r={70} fill="#fff6d0" opacity={0.12} /></g>
      <Light x={180} y={300} r={18} t={t} />
    </Stage>
  );
};

const PullBack: React.FC = () => {
  const t = useT();
  const p = ez(t, 0, 3.8, 0, 1);
  return (
    <Stage>
      <Rf x={0} y={0} w={360} h={640} c="#02040c" />
      <StarDust t={t} n={Math.round(40 + p * 120)} />
      <g opacity={1 - ez(t, 0.2, 1.4, 0, 1)}>
        <Rf x={0} y={360} w={360} h={280} c="#151c34" />
        {Array.from({length: 30}, (_, i) => <Rf key={i} x={random('px' + i) * 350} y={380 + random('py' + i) * 240} w={6} h={8} c="#f9c440" o={0.8} />)}
      </g>
      <Earth x={180} y={interpolate(p, [0, 1], [900, 340])} r={interpolate(p, [0, 1], [600, 70])} t={t} dawn={0.7} />
    </Stage>
  );
};

const GalaxyShot: React.FC = () => {
  const t = useT();
  return (
    <Stage>
      <Rf x={0} y={0} w={360} h={640} c="#01020a" />
      <StarDust t={t} n={200} />
      <Galaxy t={t} s={ez(t, 0, 7, 2.6, 0.5)} />
      <g shapeRendering="auto" opacity={ez(t, 4.5, 7, 0, 0.5)}><circle cx={180} cy={330} r={ez(t, 4.5, 7, 0, 320)} fill="none" stroke="#f9c440" strokeWidth={3} /></g>
    </Stage>
  );
};

const ShieldHouse: React.FC = () => {
  const t = useT();
  const s = ez(t, 0.3, 1.6, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 2.9, 1.1, 1), 180, 440)}>
      <Rf x={0} y={0} w={360} h={640} c="#0b1024" />
      <StarDust t={t} n={70} />
      <Rf x={0} y={520} w={360} h={120} c="#1a2236" />
      <Rf x={110} y={380} w={140} h={140} c="#3a4658" /><Rf x={100} y={370} w={160} h={14} c="#5a4636" />
      <Rf x={160} y={420} w={40} h={30} c="#f9c440" />
      <g shapeRendering="auto">
        <path d={`M ${180 - 150 * s} 520 A ${150 * s} ${170 * s} 0 0 1 ${180 + 150 * s} 520`} fill="#fff6d0" opacity={0.1} stroke="#fff6d0" strokeWidth={3} strokeOpacity={0.7} />
        {Array.from({length: 12}, (_, i) => { const a = Math.PI + (i / 11) * Math.PI; return <rect key={i} x={180 + Math.cos(a) * 150 * s - 3} y={520 + Math.sin(a) * 170 * s - 3} width={6} height={6} fill="#fff6d0" opacity={0.8 * s} />; })}
      </g>
    </Stage>
  );
};

const PathToJannah: React.FC = () => {
  const t = useT();
  const path = ez(t, 1, 4.5, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 5.5, 1.15, 1), 180, 440)}>
      {['#7fb6e0', '#a9d2ea', '#e8dcc0', '#cfe7d8', '#9fcf98'].map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
      <Rf x={0} y={480} w={360} h={160} c="#5f9f54" />
      {Array.from({length: Math.ceil(path * 18)}, (_, i) => { const w = 90 - i * 4; return <Rf key={i} x={180 - w / 2} y={600 - i * 10} w={w} h={10} c="#f9e6a8" o={0.9} />; })}
      <g shapeRendering="auto" opacity={path}><path d="M140 420 L140 340 Q180 290 220 340 L220 420 Z" fill="#f6efdc" stroke="#d4a73a" strokeWidth={6} /><circle cx={180} cy={350} r={60} fill="#fff6d0" opacity={0.3} /></g>
      <PixG rows={AMIR.poses.dua} palette={PAL} x={156} y={520} s={2.8} smooth />
    </Stage>
  );
};

// ---------- overlays ----------
// Glowing gold title floating in space (no card), visible from frame 1.
const SpaceTitle: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 18 + 8 * Math.sin(f / 10);
  return (
    <div style={{position: 'absolute', top: 210, width: '100%', textAlign: 'center'}}>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 118, color: '#f9d77a', letterSpacing: 4, lineHeight: 1, textShadow: `0 0 ${glow}px rgba(249,196,64,.9), 0 6px 0 rgba(0,0,0,.6)`}}>AYAT<br />AL-KURSI</div>
      <div style={{fontFamily: QURAN_FONT, fontSize: 70, color: '#fff4c2', direction: 'rtl', marginTop: 24, textShadow: `0 0 ${glow}px rgba(249,196,64,.7)`}}>{ayat['2:255'].words.slice(0, 7).join(' ')}</div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 52, color: '#ffffff', marginTop: 18, textShadow: '0 4px 0 rgba(0,0,0,.6)'}}>The <span style={{color: '#f9c440'}}>greatest ayah</span> in the Quran</div>
    </div>
  );
};
const HadithCard: React.FC<{text: string; gold: string; source: string}> = ({text, gold, source}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const [a, b] = text.split(gold);
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '22px 32px 28px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)', fontFamily: nunito}}>
      <div style={{fontWeight: 800, fontSize: 28, color: '#5b6a60', letterSpacing: 2}}>{source}</div>
      <div style={{fontWeight: 900, fontSize: 54, color: '#1d2b24', lineHeight: 1.15, marginTop: 10}}>“{a}<span style={{color: '#b8862a'}}>{gold}</span>{b}”</div>
    </div>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Seg = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Seg[] = [
  [0, 3.4, <HookSpace />],
  [3.4, 6.8, <Seal />, 'zoom'],
  [6.8, 10.7, <Windows />, 'whip'],
  [10.7, 15.6, <Courtyard />, 'whip'],
  [15.6, 17.6, <Courtyard answer />],
  [17.6, 21.0, <Courtyard pulse />],
  [21.0, 22.0, <MushafZoom />, 'zoom'],
  [22.0, 27.2, <LightSpreads />],
  [27.2, 29.2, <WorldAsleep />, 'whip'],
  [29.2, 33.0, <PullBack />, 'zoom'],
  [33.0, 40.0, <GalaxyShot />],
  [40.0, 42.9, <ShieldHouse />, 'whip'],
  [42.9, 48.4, <PathToJannah />, 'zoom'],
  [48.4, 51.3, <Windows answered />, 'whip'],
];
const OVERLAYS: Seg[] = [
  [0, 3.4, <SpaceTitle />],
  [3.4, 6.8, <Caption text="That's not an opinion. *The Prophet ﷺ said it himself.*" />],
  [6.8, 10.7, <Caption text="And most people who recite it every night have *no idea what it says*." size={56} />],
  [10.7, 15.6, <Caption text="The Prophet ﷺ asked Ubayy ibn Ka'b: “Which ayah in the Book of Allah is *the greatest*?”" size={52} />],
  [15.6, 17.6, <Caption text="Ubayy answered: *Ayat al-Kursi.*" />],
  [17.6, 21.0, <HadithCard source="FROM SAHIH MUSLIM" text="May knowledge delight you." gold="knowledge delight you" />],
  [21.0, 22.0, <Caption text="So what does it *say*?" size={76} />],
  [22.0, 27.2, <AyahCard refKey="2:255" range={[0, 6]} gold={[5, 6]} partial trSize={42} tr="Allah: there is no deity except Him, *the Ever-Living, the Sustainer* of all existence" />],
  [27.2, 29.2, <AyahCard refKey="2:255" range={[7, 11]} gold={[9, 10, 11]} partial tr="*Neither drowsiness overtakes Him nor sleep*" />],
  [29.2, 33.0, <AyahCard refKey="2:255" range={[12, 18]} gold={[13, 14, 15]} partial trSize={42} tr="To Him belongs *whatever is in the heavens* and whatever is on the earth" />],
  [33.0, 40.0, <AyahCard refKey="2:255" range={[40, 49]} gold={[40, 41]} partial trSize={38} tr="*His Kursi extends over the heavens and the earth*, and their preservation tires Him not. And He is the Most High, the Most Great" />],
  [40.0, 42.9, <HadithCard source="FROM SAHIH AL-BUKHARI" text="Recite it before you sleep: protected until morning." gold="protected until morning" />],
  [42.9, 48.4, <HadithCard source="SUNAN AN-NASA'I" text="After every prayer: nothing stands between you and Paradise except death." gold="nothing stands between you and Paradise" />],
  [48.4, 51.3, <Caption text="Tonight, when you recite it, you'll know *exactly what you're saying*." />],
];
const FLASHES = [3.4, 21.0, 33.0, 48.4];
const END_START = 51.3;

export const Kursi2: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {OVERLAYS.map(([a, b, el], i) => <Sequence key={'o' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(K2_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/kursi2-narration.mp3')} />
  </AbsoluteFill>
);
