import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, interpolateColors, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard, QURAN_FONT} from '../components/AyahCard';
import {PAL, SHADOW, shadowMan} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const DU_FPS = 60;
export const DU_DURATION = 41.98;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

// ---------- pieces ----------
// Sky that blends from night (0) to full morning brightness (1).
const NIGHT_C = ['#0b1024', '#111833', '#18213f', '#1e2a4a', '#243256'];
const DAWN_C = ['#7fb6e0', '#a9d2ea', '#f6d6a2', '#f6b77a', '#f39a5e'];
const MorningSky: React.FC<{p: number}> = ({p}) => (
  <>{NIGHT_C.map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={interpolateColors(p, [0, 1], [c, DAWN_C[i]])} />)}</>
);
const Stars: React.FC<{t: number; o: number}> = ({t, o}) => <>{Array.from({length: 45}, (_, i) => <Rf key={i} x={random('s' + i) * 356} y={random('sy' + i) * 300} w={2} h={2} c="#f6efdc" o={o * (0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i)))} />)}</>;
const Sun: React.FC<{p: number; t: number}> = ({p, t}) => {
  const y = 470 - p * 200;
  return (
    <g shapeRendering="auto">
      <circle cx={180} cy={y} r={150} fill="#fbe0a6" opacity={0.18 * p} />
      <circle cx={180} cy={y} r={80} fill="#fbe0a6" opacity={0.3 * p} />
      <circle cx={180} cy={y} r={40} fill="#fff4c2" opacity={p} />
      {Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2 + t * 0.2; return <polygon key={i} points={`180,${y} ${180 + Math.cos(a) * 500},${y + Math.sin(a) * 500} ${180 + Math.cos(a + 0.08) * 500},${y + Math.sin(a + 0.08) * 500}`} fill="#fff4c2" opacity={0.12 * p} />; })}
    </g>
  );
};
const Hills: React.FC<{p: number}> = ({p}) => (
  <>
    {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={430 + 30 * Math.sin(i / 9) + 14 * Math.sin(i / 3.3)} w={4} h={300} c={interpolateColors(p, [0, 1], ['#0e1426', '#7a5a42'])} />)}
    {Array.from({length: 90}, (_, i) => <Rf key={'b' + i} x={i * 4} y={500 + 16 * Math.sin(i / 6 + 2)} w={4} h={300} c={interpolateColors(p, [0, 1], ['#0a0f1c', '#5a4232'])} />)}
    {[30, 90, 250, 300].map((x, i) => <g key={i}><Rf x={x} y={520 - (i % 2) * 10} w={34} h={60} c={interpolateColors(p, [0, 1], ['#141a2c', '#c9ab84'])} /><Rf x={x + 12} y={540} w={8} h={10} c={interpolateColors(p, [0, 1], ['#e9c36a', '#3b3026'])} /></g>)}
  </>
);
const Mockers: React.FC<{t: number; n?: number; dark?: boolean}> = ({t, n = 8, dark}) => (
  <>{Array.from({length: n}, (_, i) => {
    const laugh = Math.abs(Math.sin(t * 10 + i * 1.3)) * 6;
    return <PixG key={i} rows={shadowMan(0, i % 2 === 0)} palette={dark ? {...SHADOW, k: '#05030a'} : SHADOW} x={8 + (i % 6) * 60 + (i >= 6 ? 30 : 0)} y={460 + (i >= 6 ? 50 : 0) - laugh} s={5} smooth />;
  })}</>
);

// ---------- shots ----------
const Sunrise: React.FC<{from?: number; to?: number; len?: number; light?: boolean}> = ({from = 0.2, to = 1, len = 1.6, light}) => {
  const t = useT();
  const p = ez(t, 0, len, from, to);
  return (
    <Stage cam={cam(ez(t, 0, len + 1, 1.1, 1), 180, 420)}>
      <MorningSky p={p} />
      <Stars t={t} o={1 - p} />
      <Sun p={p} t={t} />
      <Hills p={p} />
      {light && <Light x={180} y={500} r={12 + p * 6} t={t} />}
    </Stage>
  );
};

const LoneNight: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.1, 1, 1.2), 180, 480)}>
      <MorningSky p={0} />
      <Stars t={t} o={1} />
      <Hills p={0} />
      <Light x={180} y={480} r={11} t={t} />
    </Stage>
  );
};

const Mocking: React.FC<{louder?: boolean}> = ({louder}) => {
  const t = useT();
  const shake = louder ? Math.sin(t * 50) * 2 : 0;
  return (
    <Stage cam={cam(ez(t, 0, 2.3, 1.05, louder ? 1.25 : 1.12), 180, 470, shake)}>
      <MorningSky p={0} />
      <Hills p={0} />
      <Mockers t={t} n={louder ? 11 : 7} />
      <g opacity={0.55}><Light x={180} y={300} r={9} t={t} /></g>
    </Stage>
  );
};

const Abandoned: React.FC = () => {
  const t = useT();
  const dim = ez(t, 0, 1.4, 1, 0.35);
  return (
    <Stage cam={cam(ez(t, 0, 1.6, 1.3, 1.5), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#0a0c16" />
      <Stars t={t} o={0.4} />
      <g opacity={dim}><Light x={180} y={420} r={14} t={t} /></g>
    </Stage>
  );
};

const DayNight: React.FC = () => {
  const t = useT();
  const cycle = (t * 1.6) % 1;
  const p = Math.sin(cycle * Math.PI);
  return (
    <Stage>
      <MorningSky p={p * 0.85} />
      <Stars t={t} o={1 - p} />
      <g shapeRendering="auto"><circle cx={30 + cycle * 300} cy={420 - Math.sin(cycle * Math.PI) * 280} r={22} fill="#fff4c2" opacity={p} /></g>
      <Hills p={p * 0.85} />
      <Light x={180} y={540} r={8} t={t} />
    </Stage>
  );
};

const MorningToNight: React.FC = () => {
  const t = useT();
  const p = t < 2.4 ? ez(t, 0, 1.6, 0.3, 1) : ez(t, 2.4, 4.4, 1, 0);
  return (
    <Stage cam={cam(ez(t, 0, 5, 1, 1.1), 180, 420)}>
      <MorningSky p={p} />
      <Stars t={t} o={1 - p} />
      <Sun p={p} t={t} />
      <Hills p={p} />
    </Stage>
  );
};

const Horizon: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.4, 1, 1.15), 180, 470)}>
      <MorningSky p={1} />
      <Sun p={1} t={t} />
      <Rf x={0} y={470} w={360} h={170} c="#c9a466" />
      {Array.from({length: 18}, (_, i) => { const y = 470 + i * 10; const w = 6 + i * 9; return <Rf key={i} x={180 - w / 2} y={y} w={w} h={10} c="#e8d6a8" />; })}
      <Light x={180} y={ez(t, 0, 2.4, 610, 520)} r={10} t={t} />
    </Stage>
  );
};

const Bloom: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, 1.1, 1), 180, 480)}>
      <MorningSky p={1} />
      <Sun p={1} t={t} />
      <Rf x={0} y={500} w={360} h={140} c="#5f8f44" />
      {Array.from({length: 34}, (_, i) => {
        const g = interpolate(t, [random('ft' + i) * 2, random('ft' + i) * 2 + 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const x = 8 + random('fx' + i) * 344;
        const y = 520 + random('fy' + i) * 110;
        return g <= 0 ? null : <g key={i}><Rf x={x} y={y - 20 * g} w={3} h={20 * g} c="#3f6e2a" />{g > 0.6 && <><Rf x={x - 4} y={y - 24 * g} w={11} h={4} c={['#f2a3c0', '#fff6d0', '#f9c440'][i % 3]} /><Rf x={x - 1} y={y - 28 * g} w={5} h={11} c={['#f2a3c0', '#fff6d0', '#f9c440'][i % 3]} /></>}</g>;
      })}
      <Light x={180} y={440} r={16} t={t} />
    </Stage>
  );
};

const Refuge: React.FC = () => {
  const t = useT();
  const tent = ez(t, 0.6, 2, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1.2, 1.05), 180, 470)}>
      <MorningSky p={ez(t, 0, 3, 0.15, 0.7)} />
      <Stars t={t} o={ez(t, 0, 3, 0.8, 0.1)} />
      <Rf x={0} y={500} w={360} h={140} c="#b08e62" />
      {tent > 0 && Array.from({length: 22}, (_, i) => <Rf key={i} x={180 - (i * 4.5) * tent} y={380 + i * 6} w={i * 9 * tent} h={6} c={i % 4 < 2 ? '#eadfc6' : '#a8432f'} />)}
      <Light x={180} y={490} r={7} t={t} />
    </Stage>
  );
};

const AmirAlone: React.FC = () => {
  const t = useT();
  const p = ez(t, 0.8, 3.2, 0, 0.9);
  return (
    <Stage cam={cam(ez(t, 0, 3.2, 1, 1.1), 180, 480)}>
      <MorningSky p={p} />
      <Stars t={t} o={1 - p} />
      <Sun p={p} t={t} />
      <Hills p={p} />
      <PixG rows={AMIR.poses.back} palette={PAL} x={156} y={500} s={2.6} smooth />
    </Stage>
  );
};

// ---------- overlays ----------
const SurahTitle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '20px 26px 24px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 78, color: '#24503a', letterSpacing: 2, lineHeight: 1}}>SURAH AD-DUHA</div>
    <div style={{fontFamily: QURAN_FONT, fontSize: 64, lineHeight: 1.8, color: '#b8862a', direction: 'rtl', marginTop: 6}}>{ayat['93:3'].words.slice(0, 3).join(' ')}</div>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 44, color: '#1d2b24'}}>“Your Lord has not taken leave of you”</div>
  </div>
);
const MultiAyah: React.FC<{keys: (keyof typeof ayat)[]; label: string; tr: string}> = ({keys, label, tr}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const parts = tr.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>{label}</div>
      <div style={{fontFamily: QURAN_FONT, fontSize: 70, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>{keys.map((k) => <span key={k}>{ayat[k].words.join(' ')}{'  '}</span>)}</div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 44, color: '#1d2b24', lineHeight: 1.15}}>“{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}”</div>
    </div>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 1.6, <Sunrise from={0.25} to={0.9} len={1.6} />],
  [1.6, 3.2, <Sunrise from={0.9} to={1} len={1.6} light />, 'zoom'],
  [3.2, 5.3, <LoneNight />, 'whip'],
  [5.3, 7.6, <Mocking />, 'zoom'],
  [7.6, 9.2, <Abandoned />],
  [9.2, 13.4, <Sunrise from={0} to={1} len={2.2} light />],
  [13.4, 15.4, <DayNight />, 'whip'],
  [15.4, 17.9, <Mocking louder />, 'zoom'],
  [17.9, 22.9, <MorningToNight />, 'whip'],
  [22.9, 26.6, <Sunrise from={0.1} to={1} len={2.6} light />],
  [26.6, 29.0, <Horizon />, 'zoom'],
  [29.0, 32.5, <Bloom />, 'whip'],
  [32.5, 36.1, <Refuge />, 'zoom'],
  [36.1, 39.3, <AmirAlone />, 'whip'],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 3.2, <SurahTitle />],
  [3.2, 5.3, <Caption text="It came after the revelation *suddenly stopped*," />],
  [5.3, 7.6, <Caption text="and people *mocked* the Prophet ﷺ:" />],
  [7.6, 9.2, <Caption text="“Your Lord has *abandoned you*.”" size={70} />],
  [9.2, 13.4, <Caption text="Allah answered: what's coming is *better than what's gone*." />],
  [13.4, 15.4, <Caption text="Days passed. *No ayah came.*" />],
  [15.4, 17.9, <Caption text="The Prophet waited, and the mocking got *louder*." />],
  [17.9, 22.9, <MultiAyah keys={['93:1', '93:2']} label="SURAH AD-DUHA · 93:1–2" tr="By the *morning brightness*, and by the night when it covers with darkness" />],
  [22.9, 26.6, <AyahCard refKey="93:3" gold={[1, 2]} tr="Your Lord *has not taken leave of you*, nor has He detested you" />],
  [26.6, 29.0, <AyahCard refKey="93:4" gold={[1]} tr="And the Hereafter is *better for you* than the first life" />],
  [29.0, 32.5, <AyahCard refKey="93:5" gold={[3]} tr="And your Lord is going to give you, and *you will be satisfied*" />],
  [32.5, 36.1, <AyahCard refKey="93:6" gold={[2, 3]} tr="Did He not find you *an orphan and give you refuge*?" />],
  [36.1, 39.3, <Caption text="If you feel *forgotten* right now, this surah is for you too." />],
];
const FLASHES = [9.2, 22.9];
const END_START = 39.3;

export const Duha: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(DU_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/duha-narration.mp3')} />
  </AbsoluteFill>
);
