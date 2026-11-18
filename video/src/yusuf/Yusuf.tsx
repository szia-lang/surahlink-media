import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolateColors, random, staticFile} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, raster, villager} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';

export const YU_FPS = 60;
export const YU_DURATION = 43.42;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const BRO = ['b', 'C', 'M', 'n', 'R', 'G'];

// ---------- pieces (prophets are only ever light; the brothers are faceless) ----------
const shirt = raster(18, 18, (set, H) => {
  H.rect(4, 2, 10, 14, 'c');
  H.rect(1, 3, 4, 6, 'c'); H.rect(13, 3, 4, 6, 'c');
  H.rect(7, 2, 4, 2, 'C');
  H.rect(6, 7, 4, 3, 'r'); H.rect(9, 9, 3, 4, 'r'); set(5, 11, 'r'); set(12, 6, 'r');
});
// Grey wash: 0 = colour, 1 = the world drained of colour (Yaqub's grief).
const Grief: React.FC<{g: number}> = ({g}) => <Rf x={0} y={0} w={360} h={640} c="#5a5a62" o={g * 0.55} />;
const Tears: React.FC<{t: number; x: number; y: number}> = ({t, x, y}) => (
  <>{Array.from({length: 6}, (_, i) => { const life = (t * 0.9 + i / 6) % 1; return <Rf key={i} x={x - 6 + (i % 2) * 12} y={y + life * 60} w={3} h={5} c="#a6e2f5" o={1 - life} />; })}</>
);
const Room: React.FC<{dim?: number}> = ({dim = 0}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#3a2e28" />
    {Array.from({length: 9}, (_, i) => <Rf key={i} x={0} y={i * 64} w={360} h={2} c="#30251f" />)}
    <Rf x={230} y={150} w={80} h={110} c="#141a30" />
    <Rf x={226} y={146} w={88} h={6} c="#5a3a22" />
    <Rf x={0} y={500} w={360} h={140} c="#4a3a2a" />
    <Rf x={0} y={0} w={360} h={640} c="#0a0810" o={dim} />
  </>
);
const Brothers: React.FC<{t: number; y?: number; kneel?: boolean; weep?: boolean; n?: number; x0?: number}> = ({t, y = 470, kneel, weep, n = 6, x0 = 10}) => (
  <>{Array.from({length: n}, (_, i) => {
    const bob = weep ? Math.abs(Math.sin(t * 6 + i)) * 4 : 0;
    return <g key={i} transform={kneel ? `translate(0 ${18})` : undefined}><PixG rows={villager(BRO[i % 6], 0)} palette={PAL} x={x0 + i * 56} y={y - 20 - bob} s={8} smooth /></g>;
  })}</>
);

// ---------- shots ----------
const LonelyFather: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.2, 1.15, 1.3), 180, 420)}>
      <Room dim={0.35} />
      <Grief g={0.8} />
      <Light x={180} y={420} r={ez(t, 0, 2.2, 15, 10)} t={t} />
      <Tears t={t} x={180} y={440} />
    </Stage>
  );
};

const SonsInShadow: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.2, 1.2, 1.05), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#14101a" />
      <g shapeRendering="auto" opacity={0.18}><polygon points="0,0 360,0 360,640 0,640" fill="#a8432f" /></g>
      <Brothers t={t} y={460} />
    </Stage>
  );
};

const Title: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.3, 1, 1.08), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a1620" />
      <g shapeRendering="auto"><circle cx={180} cy={420} r={160} fill="#f9c440" opacity={0.1} /></g>
    </Stage>
  );
};

const Return: React.FC<{forgive?: boolean}> = ({forgive}) => {
  const t = useT();
  const warm = forgive ? ez(t, 0, 2.2, 0, 1) : 0.35;
  return (
    <Stage cam={cam(ez(t, 0, 2.7, 1.05, 1.15), 180, 450)}>
      <Room dim={0.25} />
      <g shapeRendering="auto"><circle cx={180} cy={330} r={120 + 40 * warm} fill="#f9c440" opacity={0.1 + 0.15 * warm} /></g>
      <Light x={180} y={330} r={14 + 6 * warm} t={t} />
      <Brothers t={t} y={470} kneel />
    </Stage>
  );
};

const Together: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.2, 1, 1.1), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#e8c890" />
      <Rf x={0} y={480} w={360} h={160} c="#a8885e" />
      <g shapeRendering="auto"><circle cx={180} cy={400} r={140} fill="#fff4c2" opacity={0.25} /></g>
      <Light x={150} y={400} r={16} t={t} />
      <Light x={210 + Math.sin(t * 2) * 6} y={430} r={9} t={t + 1} />
    </Stage>
  );
};

const Jealous: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.2, 1.25, 1.1), 180, 470, ez(t, 0, 1.2, 20, -10))}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1418" />
      <Rf x={0} y={500} w={360} h={140} c="#3b2420" />
      <Brothers t={t} y={450} n={4} x0={20} />
      <g opacity={0.5}><Light x={320} y={300} r={9} t={t} /></g>
    </Stage>
  );
};

const Well: React.FC = () => {
  const t = useT();
  const fall = ez(t, 0.4, 1.7, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3.4, 1, 1.25), 180, 470)}>
      {['#3a1f3d', '#5a2a45', '#87374a', '#9a4a42', '#7a4a3a'].map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
      <Rf x={0} y={480} w={360} h={160} c="#6e5232" />
      <Rf x={120} y={420} w={120} h={70} c="#8a7a68" />
      {Array.from({length: 4}, (_, i) => <Rf key={i} x={120} y={420 + i * 18} w={120} h={2} c="#6a5a48" />)}
      <Rf x={130} y={410} w={100} h={14} c="#0a0808" />
      <g opacity={1 - fall}><Light x={180} y={360 + fall * 70} r={10 * (1 - fall * 0.6)} t={t} /></g>
      <Brothers t={t} y={ez(t, 0, 3.4, 450, 430)} n={3} x0={-150 + t * 30} />
    </Stage>
  );
};

const FalseBlood: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1.2, 1.35), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#140e10" />
      <g shapeRendering="auto"><circle cx={180} cy={360} r={150 + 4 * Math.sin(t * 9)} fill="#f9a23a" opacity={0.18} /></g>
      <PixG rows={shirt} palette={PAL} x={108} y={290} s={8} smooth />
      <Brothers t={t} y={500} weep n={4} x0={40} />
    </Stage>
  );
};

const Seasons: React.FC = () => {
  const t = useT();
  const c = interpolateColors((t * 0.9) % 1, [0, 0.33, 0.66, 1], ['#7a9a4a', '#c9a466', '#8a8a92', '#7a9a4a']);
  return (
    <Stage cam={cam(ez(t, 0, 1.7, 1, 1.08), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#6a7a8a" />
      <Rf x={0} y={460} w={360} h={180} c={c} />
      <Rf x={160} y={300} w={14} h={170} c="#4a3420" />
      {Array.from({length: 18}, (_, i) => <Rf key={i} x={120 + random('lf' + i) * 100} y={250 + random('lg' + i) * 80} w={10} h={10} c={c} o={1 - ((t * 0.9) % 1) * 0.6} />)}
      <Grief g={ez(t, 0, 1.7, 0.4, 0.8)} />
      <g opacity={0.6}><Light x={260} y={480} r={9} t={t} /></g>
    </Stage>
  );
};

const Blind: React.FC = () => {
  const t = useT();
  const g = ez(t, 0, 3.5, 0.3, 1);
  return (
    <Stage cam={cam(ez(t, 0, 4.2, 1.1, 1.45), 180, 420)}>
      <Room dim={0.3} />
      <Grief g={g} />
      <g opacity={1 - g * 0.6}><Light x={180} y={420} r={14} t={t} /></g>
      <Tears t={t} x={180} y={440} />
      <Rf x={0} y={0} w={360} h={640} c="#d8d8de" o={g * 0.25} />
    </Stage>
  );
};

const Ashamed: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.05, 180, 450)}>
      <Room dim={0.3} />
      <Grief g={0.6} />
      <g opacity={0.6}><Light x={180} y={330} r={12} t={t} /></g>
      {Array.from({length: 6}, (_, i) => <PixG key={i} rows={villager(BRO[i % 6], Math.floor(t * 4 + i) % 2)} palette={PAL} x={ez(t, 0, 3.4, -200, 10) + i * 56} y={462} s={8} smooth />)}
    </Stage>
  );
};

const GoHome: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.8, 1, 1.12), 180, 450)}>
      {['#f3c58d', '#efb07c', '#e89a6a', '#de8a5e', '#c97a56'].map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
      <Rf x={0} y={500} w={360} h={140} c="#8a6a42" />
      <Rf x={200} y={360} w={130} h={140} c="#cdb08a" />
      <Rf x={192} y={350} w={146} h={14} c="#8a6a42" />
      <Rf x={226} y={400} w={30} h={30} c="#f9c440" />
      <g shapeRendering="auto"><circle cx={241} cy={415} r={40} fill="#f9c440" opacity={0.25} /></g>
      <Rf x={280} y={430} w={30} h={70} c="#5a3a22" />
      <PixG rows={AMIR.walk[Math.floor(t * 6) % 4]} palette={PAL} x={ez(t, 0, 3.8, 20, 150)} y={450} s={3} smooth />
    </Stage>
  );
};

// ---------- overlays ----------
const SurahTag: React.FC = () => (
  <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: nunito}}>
    <div style={{display: 'inline-block', background: '#f6efdc', border: '10px double #24503a', padding: '20px 44px'}}>
      <div style={{fontWeight: 900, fontSize: 96, color: '#24503a', lineHeight: 1}}>SURAH YUSUF</div>
      <div style={{fontWeight: 800, fontSize: 40, color: '#5b6a60', marginTop: 8}}>Chapter 12 · the father and his sons</div>
    </div>
  </div>
);

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 2.2, <LonelyFather />],
  [2.2, 4.4, <SonsInShadow />, 'zoom'],
  [4.4, 5.7, <Title />],
  [5.7, 8.4, <Return />, 'zoom'],
  [8.4, 10.6, <Together />, 'whip'],
  [10.6, 12.2, <Jealous />, 'zoom'],
  [12.2, 14.3, <Well />, 'whip'],
  [14.3, 17.8, <FalseBlood />, 'zoom'],
  [17.8, 20.3, <LonelyFather />],
  [20.3, 22.0, <Seasons />, 'whip'],
  [22.0, 26.2, <Blind />],
  [26.2, 29.6, <Ashamed />, 'whip'],
  [29.6, 34.5, <Return />, 'zoom'],
  [34.5, 37.2, <Return forgive />],
  [37.2, 41.0, <GoHome />, 'zoom'],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 4.4, <Caption instant text="A father cried until he *went blind*, because of what his own sons did to him." size={58} />],
  [4.4, 5.7, <SurahTag />],
  [5.7, 8.4, <Caption text="And when they came back, he *didn't turn them away*." />],
  [8.4, 10.6, <Caption text="Yaqub loved his son *Yusuf* deeply." />],
  [10.6, 12.2, <Caption text="His brothers grew *jealous*." />],
  [12.2, 14.3, <Caption text="They threw Yusuf *into a well*," />],
  [14.3, 17.8, <Caption text="and came to their father at night, weeping, with his shirt stained in *false blood*." size={54} />],
  [17.8, 20.3, <AyahCard refKey="12:18" range={[11, 12]} gold={[11, 12]} partial tr="*Patience is most fitting*" />],
  [20.3, 22.0, <Caption text="But the grief *never left him*." />],
  [22.0, 26.2, <AyahCard refKey="12:84" range={[3, 9]} gold={[6, 7, 8, 9]} partial tr="Oh, my sorrow over Joseph… *and his eyes became white from grief*" />],
  [26.2, 29.6, <Caption text="Years later, the truth came out. His sons stood before him, *ashamed*." />],
  [29.6, 34.5, <AyahCard refKey="12:97" gold={[5, 6, 7]} tr="O our father, ask for us forgiveness of our sins; *indeed, we have been sinners*" />],
  [34.5, 37.2, <AyahCard refKey="12:98" range={[0, 4]} gold={[2, 3]} partial tr="*I will ask forgiveness for you* from my Lord" />],
  [37.2, 41.0, <Caption text="Your parents' hearts carry more than they show you. *Don't wait until it's too late.*" size={54} />],
];
const FLASHES = [5.7, 22.0];
const END_START = 41.0;

export const Yusuf: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(YU_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/yusuf-narration.mp3')} />
  </AbsoluteFill>
);
