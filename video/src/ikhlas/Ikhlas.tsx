import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {QURAN_FONT} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {leader} from '../abasa/Abasa';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const IK_FPS = 60;
export const IK_DURATION = 40.12;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const COLORS = ['g', 'r', 'b', 'c', 'n', 'M'];

// ---------- pieces (the Prophet ﷺ is only ever light; companions are faceless) ----------
const Stars: React.FC<{t: number; n?: number}> = ({t, n = 60}) => <>{Array.from({length: n}, (_, i) => <Rf key={i} x={random('s' + i) * 356} y={random('sy' + i) * 640} w={2} h={2} c="#f6efdc" o={0.35 + 0.6 * Math.abs(Math.sin(t * 2 + i))} />)}</>;
const Mosque: React.FC<{dim?: number}> = ({dim = 0}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#e8dcc0" />
    {[0, 120, 240].map((x, i) => <g key={i}><Rf x={x + 20} y={60} w={80} h={300} c="#cdb88e" /><Rf x={x + 36} y={90} w={48} h={220} c="#9fcbe0" /></g>)}
    <g shapeRendering="auto"><path d="M140 500 L140 300 Q180 240 220 300 L220 500 Z" fill="#24503a" /></g>
    <Rf x={0} y={500} w={360} h={140} c="#2f6b4a" />
    {Array.from({length: 9}, (_, i) => <Rf key={i} x={i * 40} y={500} w={4} h={140} c="#24503a" />)}
    <Rf x={0} y={0} w={360} h={640} c="#0e0a12" o={dim} />
  </>
);
const Rows: React.FC<{t: number; bow?: boolean}> = ({t, bow}) => (
  <>{Array.from({length: 12}, (_, i) => {
    const r = Math.floor(i / 6);
    const b = bow ? Math.max(0, Math.sin(t * 1.4)) * 6 : 0;
    return <PixG key={i} rows={villager(COLORS[i % 6], 0)} palette={PAL} x={20 + (i % 6) * 56} y={520 + r * 44 + b} s={5} smooth />;
  })}</>
);

// ---------- shots ----------
const Mushaf: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1.2, 1.05), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <g shapeRendering="auto"><circle cx={180} cy={400} r={200} fill="#f9c440" opacity={0.15 + 0.04 * Math.sin(t * 4)} /></g>
      <Rf x={60} y={260} w={240} h={280} c="#f6efdc" />
      <Rf x={60} y={260} w={240} h={8} c="#24503a" /><Rf x={60} y={532} w={240} h={8} c="#24503a" />
      {[0, 1, 2, 3].map((i) => <Rf key={i} x={90} y={320 + i * 50} w={180 * ez(t, 0.2 + i * 0.3, 0.6 + i * 0.3, 0, 1)} h={10} c="#b8862a" />)}
    </Stage>
  );
};

const AmirRecites: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.4, 1.1, 1.25), 180, 470)}>
      <Mosque />
      <PixG rows={AMIR.poses.dua} palette={PAL} x={142} y={400} s={4.4} smooth />
      {[0, 1, 2, 3].map((i) => <Rf key={i} x={110 + i * 40} y={330 - Math.max(0, (t - i * 0.3)) * 40} w={26} h={6} c="#d4a73a" o={Math.max(0, 1 - Math.max(0, t - i * 0.3) * 0.6)} />)}
    </Stage>
  );
};

const OneThird: React.FC = () => {
  const t = useT();
  const fill = ez(t, 0.3, 1.8, 0, 1 / 3);
  return (
    <Stage cam={cam(ez(t, 0, 2.8, 1.1, 1), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <Rf x={70} y={180} w={220} h={380} c="#f6efdc" />
      <Rf x={70} y={180 + 380 * (1 - fill)} w={220} h={380 * fill} c="#d4a73a" />
      <Rf x={70} y={180} w={220} h={6} c="#24503a" /><Rf x={70} y={554} w={220} h={6} c="#24503a" />
      <text x={180} y={400} fontSize={110} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#24503a">⅓</text>
    </Stage>
  );
};

const Whispers: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1, 1.12), 180, 470)}>
      <Mosque dim={0.15} />
      <Rows t={t} />
      {Array.from({length: 5}, (_, i) => { const p = (t * 1.2 + i * 0.2) % 1; return <text key={i} x={40 + i * 66} y={490 - p * 40} fontSize={34} fontFamily={nunito} fontWeight={900} fill="#c4303a" opacity={1 - p}>{i % 2 ? '?' : '!'}</text>; })}
    </Stage>
  );
};

const Asking: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.18), 180, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1f1a" />
      <Rf x={0} y={520} w={360} h={120} c="#5a3a22" />
      {['r', 'n', 'P', 'R', 'g'].map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={14 + i * 68} y={440} s={4.6} smooth />)}
      {[60, 180, 300].map((x, i) => <text key={i} x={x} y={400 - Math.sin(t * 3 + i) * 8} fontSize={60} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f6efdc" opacity={0.85}>?</text>)}
      <Light x={180} y={300} r={13} t={t} />
    </Stage>
  );
};

const OneLight: React.FC<{vast?: boolean}> = ({vast}) => {
  const t = useT();
  return (
    <Stage cam={cam(vast ? ez(t, 0, 3.9, 1.3, 1) : ez(t, 0, 4.8, 1, 1.15), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c={vast ? '#05081a' : '#0d1226'} />
      <Stars t={t} n={vast ? 120 : 60} />
      <g shapeRendering="auto">
        <circle cx={180} cy={420} r={160} fill="#fff6d0" opacity={0.08} />
        {Array.from({length: 16}, (_, i) => { const a = (i / 16) * Math.PI * 2 + t * 0.15; return <polygon key={i} points={`180,420 ${180 + Math.cos(a) * 600},${420 + Math.sin(a) * 600} ${180 + Math.cos(a + 0.06) * 600},${420 + Math.sin(a + 0.06) * 600}`} fill="#fff6d0" opacity={0.1} />; })}
        <circle cx={180} cy={420} r={18} fill="#fffdf2" />
      </g>
    </Stage>
  );
};

const Imam: React.FC = () => {
  const t = useT();
  const rakah = Math.min(3, 1 + Math.floor(t / 1.6));
  return (
    <Stage cam={cam(ez(t, 0, 5.1, 1.05, 1.15), 180, 470)}>
      <Mosque />
      <PixG rows={villager('c', 0)} palette={PAL} x={150} y={400} s={9} smooth />
      <Rows t={t} bow />
      <text x={180} y={230} fontSize={44} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#24503a">RAK'AH {rakah}</text>
      <text x={180} y={268} fontSize={28} fontFamily={nunito} fontWeight={800} textAnchor="middle" fill="#b8862a">AL-IKHLAS</text>
    </Stage>
  );
};

const Complain: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#3a2a1e" />
      <Rf x={0} y={500} w={360} h={140} c="#8a6a42" />
      {Array.from({length: 4}, (_, i) => <PixG key={i} rows={villager(COLORS[i], Math.floor(t * 6 + i) % 2)} palette={PAL} x={ez(t, 0, 2.7, -80, 30) + i * 52} y={430} s={8} smooth />)}
      <Light x={300} y={420} r={13} t={t} />
    </Stage>
  );
};

const Loved: React.FC<{glow?: boolean}> = ({glow}) => {
  const t = useT();
  const g = glow ? ez(t, 0.3, 1.8, 0, 1) : 0;
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.1, 1.25), 180, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a2a38" />
      <Rf x={0} y={520} w={360} h={120} c="#3a3a48" />
      {g > 0 && <g shapeRendering="auto" opacity={0.35 * g}><polygon points="110,0 170,0 230,640 50,640" fill="#fff6d0" /></g>}
      <PixG rows={villager('c', 0)} palette={PAL} x={100} y={410} s={10} smooth />
      <Light x={260} y={420} r={13} t={t} />
      {g > 0 && Array.from({length: 8}, (_, i) => { const p = (t * 0.6 + i / 8) % 1; return <text key={i} x={104 + (i % 4) * 10} y={400 - p * 140} fontSize={24} fill="#f2a3c0" opacity={(1 - p) * g}>♥</text>; })}
    </Stage>
  );
};

// ---------- overlays ----------
const SurahTitle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '20px 26px 24px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 76, color: '#24503a', lineHeight: 1}}>SURAH AL-IKHLAS</div>
    <div style={{fontFamily: QURAN_FONT, fontSize: 64, lineHeight: 1.8, color: '#b8862a', direction: 'rtl', marginTop: 6}}>{ayat['112:1'].words.join(' ')}</div>
    <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 40, color: '#1d2b24'}}>The story behind it</div>
  </div>
);
const IkhlasCard: React.FC<{keys: (keyof typeof ayat)[]; label: string; tr: string; gold: string}> = ({keys, label, tr, gold}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const [a, b] = tr.split(gold);
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>{label}</div>
      <div style={{fontFamily: QURAN_FONT, fontSize: 70, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>{keys.map((k) => <span key={k}>{ayat[k].words.join(' ')}{'  '}</span>)}</div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 46, color: '#1d2b24', lineHeight: 1.15}}>“{a}<span style={{color: '#b8862a'}}>{gold}</span>{b}”</div>
    </div>
  );
};
const HadithCard: React.FC<{text: string; gold: string}> = ({text, gold}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const [a, b] = text.split(gold);
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '22px 32px 28px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)', fontFamily: nunito}}>
      <div style={{fontWeight: 800, fontSize: 28, color: '#5b6a60', letterSpacing: 2}}>FROM SAHIH AL-BUKHARI</div>
      <div style={{fontWeight: 900, fontSize: 56, color: '#1d2b24', lineHeight: 1.15, marginTop: 10}}>“{a}<span style={{color: '#b8862a'}}>{gold}</span>{b}”</div>
    </div>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Seg = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Seg[] = [
  [0, 2.6, <Mushaf />],
  [2.6, 5.0, <AmirRecites />, 'zoom'],
  [5.0, 7.6, <OneThird />, 'whip'],
  [7.6, 10.5, <Whispers />, 'zoom'],
  [10.5, 14.8, <Asking />, 'whip'],
  [14.8, 19.3, <OneLight />, 'zoom'],
  [19.3, 23.2, <OneLight vast />],
  [23.2, 28.3, <Imam />, 'whip'],
  [28.3, 31.0, <Complain />, 'zoom'],
  [31.0, 34.8, <Loved />, 'whip'],
  [34.8, 37.5, <Loved glow />],
];
const OVERLAYS: Seg[] = [
  [0, 2.6, <SurahTitle />],
  [2.6, 5.0, <Caption text="Four short ayat you've recited *your whole life*." />],
  [5.0, 7.6, <HadithCard text="It equals a third of the Quran." gold="a third of the Quran" />],
  [7.6, 10.5, <Caption text="And one man got in trouble for reciting it *too much*." />],
  [10.5, 14.8, <Caption text="When people asked the Prophet ﷺ to *describe his Lord*, Allah answered:" size={56} />],
  [14.8, 19.3, <IkhlasCard keys={['112:1', '112:2']} label="SURAH AL-IKHLAS · 112:1–2" tr="Say, He is Allah, who is One. Allah, the Eternal Refuge" gold="who is One" />],
  [19.3, 23.2, <IkhlasCard keys={['112:3', '112:4']} label="SURAH AL-IKHLAS · 112:3–4" tr="He neither begets nor is born. Nor is there to Him any equivalent" gold="any equivalent" />],
  [23.2, 28.3, <Caption text="Years later, a companion led the prayer, and in *every single rak'ah*, he recited Al-Ikhlas." size={52} />],
  [28.3, 31.0, <Caption text="People *complained* to the Prophet ﷺ. So he asked the man why." />],
  [31.0, 34.8, <HadithCard text="Because it describes the Most Merciful, and I love to recite it." gold="I love to recite it" />],
  [34.8, 37.5, <HadithCard text="Tell him that Allah loves him." gold="Allah loves him" />],
];
const FLASHES = [14.8, 34.8];
const END_START = 37.5;

export const Ikhlas: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {OVERLAYS.map(([a, b, el], i) => <Sequence key={'o' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(IK_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/ikhlas-narration.mp3')} />
  </AbsoluteFill>
);
