import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, staticFile} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard, QURAN_FONT} from '../components/AyahCard';
import {PAL, SHADOW, shadowMan} from '../alfil/sprites';
import {leader} from '../abasa/Abasa';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const KW_FPS = 60;
export const KW_DURATION = 43.83;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const LEADER_COLORS = ['r', 'n', 'P', 'R', 'g'];

// ---------- pieces (the Prophet ﷺ is only ever light) ----------
const DUSK = ['#2a1f3d', '#3a2a45', '#5a3448', '#7a4448', '#8a5448'];
const Sky: React.FC<{c: string[]}> = ({c}) => <>{c.map((col, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === c.length - 1 ? 640 : 80} c={col} />)}</>;
const Stars: React.FC<{t: number; n?: number}> = ({t, n = 40}) => <>{Array.from({length: n}, (_, i) => <Rf key={i} x={random('s' + i) * 356} y={random('sy' + i) * 320} w={2} h={2} c="#f6efdc" o={0.35 + 0.6 * Math.abs(Math.sin(t * 2 + i))} />)}</>;
const Makkah: React.FC<{gray?: number}> = ({gray = 0}) => (
  <>
    {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={400 + 40 * Math.sin(i / 7) + 12 * Math.sin(i / 2.6)} w={4} h={300} c="#3a2e2a" />)}
    {[20, 80, 250, 310].map((x, i) => <g key={i}><Rf x={x} y={470 - (i % 2) * 14} w={40} h={90} c="#5a4a3e" /><Rf x={x + 14} y={490} w={10} h={12} c="#e9c36a" o={0.6} /></g>)}
    <Rf x={150} y={470} w={56} h={60} c="#121212" /><Rf x={150} y={482} w={56} h={5} c="#d4a73a" />
    <Rf x={0} y={530} w={360} h={110} c="#2a221e" />
    <Rf x={0} y={0} w={360} h={640} c="#6a6a72" o={gray * 0.45} />
  </>
);
const Leaders: React.FC<{t: number; laugh?: boolean; y?: number; fade?: number}> = ({t, laugh, y = 440, fade = 1}) => (
  <g opacity={fade}>{LEADER_COLORS.map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={14 + i * 68} y={y - (laugh ? Math.abs(Math.sin(t * 12 + i)) * 10 : 0)} s={4.6} smooth />)}</g>
);
const Minaret: React.FC<{x: number; s: number; t: number; c?: string}> = ({x, s, t, c = '#e9dfc8'}) => (
  <g transform={`translate(${x} 560) scale(${s})`}>
    <Rf x={-12} y={-260} w={24} h={260} c={c} />
    <Rf x={-18} y={-268} w={36} h={10} c="#d4a73a" />
    <Rf x={-9} y={-296} w={18} h={28} c={c} />
    <Rf x={-5} y={-318} w={10} h={22} c="#2f6b4a" />
    <g shapeRendering="auto">{Array.from({length: 3}, (_, i) => { const r = (t * 60 + i * 40) % 120; return <circle key={i} cx={0} cy={-282} r={r} fill="none" stroke="#fff6d0" strokeWidth={2.5 / s} opacity={0.6 * (1 - r / 120)} />; })}</g>
  </g>
);

// ---------- shots ----------
const Mushaf: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.2, 1.2, 1.05), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <g shapeRendering="auto"><circle cx={180} cy={400} r={200} fill="#f9c440" opacity={0.15 + 0.04 * Math.sin(t * 4)} /></g>
      <Rf x={60} y={260} w={240} h={280} c="#f6efdc" />
      <Rf x={60} y={260} w={240} h={8} c="#24503a" /><Rf x={60} y={532} w={240} h={8} c="#24503a" />
      {[0, 1, 2].map((i) => <Rf key={i} x={90} y={330 + i * 60} w={180 * ez(t, 0.3 + i * 0.4, 0.9 + i * 0.4, 0, 1)} h={10} c="#b8862a" />)}
    </Stage>
  );
};

const LoneLight: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1, 1.15), 180, 450)}>
      <Sky c={DUSK} />
      <Stars t={t} n={20} />
      <Makkah gray={0.6} />
      <g opacity={0.7}><Light x={180} y={420} r={11} t={t} /></g>
    </Stage>
  );
};

const ThreeAyat: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1.1, 1), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <text x={180} y={420} fontSize={260} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#d4a73a" opacity={ez(t, 0, 0.4, 0, 1)}>3</text>
      <text x={180} y={480} fontSize={30} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f6efdc" letterSpacing={4}>AYAT</text>
    </Stage>
  );
};

const LostSons: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.2, 1, 1.12), 180, 380)}>
      <Sky c={['#0b1024', '#111833', '#18213f', '#1e2a4a', '#243256']} />
      <Stars t={t} n={50} />
      <g opacity={ez(t, 0.5, 2.5, 1, 0)}><Light x={140} y={200} r={6} t={t} /><Light x={220} y={230} r={6} t={t + 1} /></g>
      <Makkah gray={0.7} />
      <g opacity={0.7}><Light x={180} y={420} r={10} t={t} /></g>
    </Stage>
  );
};

const Abtar: React.FC = () => {
  const t = useT();
  const split = ez(t, 1.6, 2.6, 0, 1);
  return (
    <Stage cam={cam(1.05, 180, 420, Math.sin(t * 30) * 1.5)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1418" />
      <Rf x={0} y={520} w={360} h={120} c="#3b2420" />
      <Leaders t={t} y={440} laugh />
      <g transform={`translate(${-split * 20} ${split * 10})`}><text x={180} y={300} fontSize={78} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#c4303a">ABTAR</text></g>
      <Rf x={60} y={262} w={240 * split} h={4} c="#f6efdc" />
    </Stage>
  );
};

const NameInSand: React.FC = () => {
  const t = useT();
  const blow = ez(t, 0.4, 2.2, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 2.4, 1.2, 1.35), 180, 440)}>
      <Sky c={DUSK} />
      <Rf x={0} y={380} w={360} h={260} c="#c9a466" />
      {Array.from({length: 120}, (_, i) => {
        const x0 = 90 + (i % 30) * 6;
        const y0 = 440 + Math.floor(i / 30) * 8;
        const d = Math.max(0, blow - random('b' + i) * 0.5) * 2;
        return <Rf key={i} x={x0 + d * 160} y={y0 - d * 40 + Math.sin(i) * d * 10} w={5} h={5} c="#8a6a42" o={Math.max(0, 1 - d)} />;
      })}
    </Stage>
  );
};

const Revelation: React.FC<{prayer?: boolean}> = ({prayer}) => {
  const t = useT();
  const b = ez(t, 0, 0.8, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3.8, 1.15, 1), 180, 440)}>
      <Sky c={['#0b1024', '#111833', '#18213f', '#1e2a4a', '#243256']} />
      <Stars t={t} n={60} />
      <g shapeRendering="auto" opacity={0.4 * b}><polygon points="150,0 210,0 260,640 100,640" fill="#fff6d0" /></g>
      <Makkah />
      <Light x={180} y={prayer ? 500 : 420} r={10 + b * 8} t={t} />
    </Stage>
  );
};

const Reversal: React.FC = () => {
  const t = useT();
  const fade = ez(t, 0.6, 2.6, 1, 0.25);
  return (
    <Stage cam={cam(ez(t, 0, 3, 1, 1.12), 180, 440)}>
      <Rf x={0} y={0} w={360} h={640} c="#1e1a22" />
      <Rf x={0} y={520} w={360} h={120} c="#2a2228" />
      <Leaders t={t} y={440} fade={fade} />
      <Rf x={0} y={0} w={360} h={640} c="#6a6a72" o={(1 - fade) * 0.5} />
    </Stage>
  );
};

const River: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.3, 1.15, 1), 180, 420)}>
      <Sky c={['#7fb6e0', '#a9d2ea', '#cfe7d8', '#b7dcb0', '#9fcf98']} />
      <Rf x={0} y={360} w={360} h={280} c="#5f9f54" />
      {Array.from({length: 28}, (_, i) => { const y = 360 + i * 10; const w = 40 + i * 9; const cx = 180 + Math.sin(i / 4) * 30; return <g key={i}><Rf x={cx - w / 2 - 6} y={y} w={w + 12} h={10} c="#d4a73a" /><Rf x={cx - w / 2} y={y} w={w} h={10} c={i % 2 ? '#bfe8f7' : '#d8f3fb'} /></g>; })}
      {Array.from({length: 30}, (_, i) => { const life = (t * 0.6 + random('rv' + i)) % 1; const y = 360 + life * 280; return <Rf key={i} x={180 + Math.sin(life * 7 + i) * (20 + life * 120)} y={y} w={4} h={4} c="#ffffff" o={0.8 * (1 - life)} />; })}
      {[40, 300].map((x, i) => <g key={i}><Rf x={x} y={260} w={10} h={110} c="#6e4a2a" /><Rf x={x - 30} y={230} w={70} h={40} c="#3f8a3a" /></g>)}
    </Stage>
  );
};

const Forgotten: React.FC = () => {
  const t = useT();
  const f = ez(t, 0.3, 2.6, 1, 0);
  return (
    <Stage cam={cam(ez(t, 0, 2.9, 1.1, 1.25), 180, 460)}>
      <Sky c={DUSK} />
      <Rf x={0} y={500} w={360} h={140} c="#8a7458" />
      <g opacity={f}><PixG rows={leader('r')} palette={PAL} x={150} y={400} s={6} smooth /></g>
      {Array.from({length: 60}, (_, i) => { const d = Math.max(0, (1 - f) - random('d' + i) * 0.4) * 1.6; return <Rf key={i} x={160 + random('dx' + i) * 60 + d * 140} y={410 + random('dy' + i) * 120 - d * 60} w={5} h={5} c="#8a2a2a" o={Math.max(0, f > 0.98 ? 0 : 1 - d)} />; })}
    </Stage>
  );
};

const Minarets: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1.15, 1), 180, 420)}>
      <Sky c={['#f3b88a', '#f6c89a', '#f6d6a2', '#cfe3ea', '#9fcbe0'].reverse()} />
      {[{x: 50, s: 0.7}, {x: 130, s: 1}, {x: 230, s: 0.85}, {x: 310, s: 0.6}].map((m, i) => <Minaret key={i} x={m.x} s={m.s} t={t + i * 0.3} />)}
      <Rf x={0} y={560} w={360} h={80} c="#a8885e" />
      <PixG rows={shadowMan(0)} palette={{...SHADOW, k: '#3a3020'}} x={124} y={244} s={2} smooth />
    </Stage>
  );
};

// ---------- overlays ----------
const SurahTitle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '20px 26px 24px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 70, color: '#24503a', lineHeight: 1}}>SURAH AL-KAWTHAR</div>
    <div style={{fontFamily: QURAN_FONT, fontSize: 64, lineHeight: 1.8, color: '#b8862a', direction: 'rtl', marginTop: 6}}>{ayat['108:1'].words.join(' ')}</div>
    <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 40, color: '#1d2b24'}}>The story behind the <span style={{color: '#b8862a'}}>shortest surah</span> in the Quran</div>
  </div>
);

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Seg = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Seg[] = [
  [0, 4.2, <Mushaf />],
  [4.2, 8.3, <LoneLight />, 'whip'],
  [8.3, 11.0, <ThreeAyat />, 'zoom'],
  [11.0, 15.2, <LostSons />, 'whip'],
  [15.2, 19.6, <Abtar />, 'zoom'],
  [19.6, 22.0, <NameInSand />, 'whip'],
  [22.0, 25.8, <Revelation />],
  [25.8, 28.4, <Revelation prayer />],
  [28.4, 31.4, <Reversal />, 'zoom'],
  [31.4, 34.7, <River />, 'whip'],
  [34.7, 37.6, <Forgotten />, 'zoom'],
  [37.6, 41.2, <Minarets />, 'whip'],
];
const OVERLAYS: Seg[] = [
  [0, 4.2, <SurahTitle />],
  [4.2, 8.3, <Caption text="It came on one of the *hardest days* of the Prophet's ﷺ life." />],
  [8.3, 11.0, <Caption text="And it answered his enemies in *just three ayat*." />],
  [11.0, 15.2, <Caption text="The Prophet's sons *died as babies*, and his enemies mocked him." />],
  [15.2, 19.6, <Caption text="They called him *“abtar”*: cut off. No sons. No legacy." />],
  [19.6, 22.0, <Caption text="His name, they said, would *die with him*." />],
  [22.0, 25.8, <AyahCard refKey="108:1" gold={[2]} tr="Indeed, We have granted you *al-Kawthar*" />],
  [25.8, 28.4, <AyahCard refKey="108:2" gold={[0, 1]} tr="So *pray to your Lord* and sacrifice to Him alone" />],
  [28.4, 31.4, <AyahCard refKey="108:3" gold={[3]} tr="Indeed, your enemy is *the one cut off*" />],
  [31.4, 34.7, <Caption text="Al-Kawthar is *a river in Paradise*, promised to the Prophet ﷺ." />],
  [34.7, 37.6, <Caption text="The man who mocked him? *Almost no one remembers his name.*" />],
  [37.6, 41.2, <Caption text="But the Prophet's ﷺ name is called from *every minaret, five times a day*." size={54} />],
];
const FLASHES = [15.2, 22.0, 37.6];
const END_START = 41.2;

export const Kawthar: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {OVERLAYS.map(([a, b, el], i) => <Sequence key={'o' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(KW_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/kawthar-narration.mp3')} />
  </AbsoluteFill>
);
