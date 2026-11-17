import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {QURAN_FONT} from '../components/AyahCard';
import {PAL, SHADOW, shadowMan, rider} from '../alfil/sprites';
import {leader} from '../abasa/Abasa';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Sky, NIGHT, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const KF_FPS = 60;
export const KF_DURATION = 43.83;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const LEADER_COLORS = ['r', 'n', 'P', 'R', 'g'];

// ---------- pieces ----------
const Stars: React.FC<{t: number; n?: number}> = ({t, n = 40}) => <>{Array.from({length: n}, (_, i) => <Rf key={i} x={random('s' + i) * 356} y={random('sy' + i) * 300} w={2} h={2} c="#f6efdc" o={0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i))} />)}</>;
const Desert: React.FC<{day?: boolean}> = ({day = true}) => (
  <>
    <Sky c={day ? ['#9fcbe0', '#b6dcea', '#f3d9a0', '#f3c58d', '#efb07c'] : NIGHT} />
    {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={460 + 20 * Math.sin(i / 8)} w={4} h={300} c={day ? '#d9b77a' : '#2b2030'} />)}
  </>
);
const Leaders: React.FC<{t: number; laugh?: boolean; y?: number}> = ({t, laugh, y = 440}) => (
  <>{LEADER_COLORS.map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={14 + i * 68} y={y - (laugh ? Math.abs(Math.sin(t * 12 + i)) * 10 : Math.sin(t * 2 + i) * 1.5)} s={4.6} smooth />)}</>
);
const CaveMouth: React.FC<{t: number; glow?: number}> = ({t, glow = 0}) => (
  <>
    <Sky c={NIGHT} />
    <Stars t={t} />
    <g shapeRendering="auto">
      <path d="M0 640 L0 300 Q60 170 180 160 Q300 170 360 300 L360 640 Z" fill="#4a3a33" />
      <path d="M90 640 L90 420 Q110 310 180 300 Q250 310 270 420 L270 640 Z" fill="#0c0a10" />
      {glow > 0 && <ellipse cx={180} cy={480} rx={90} ry={110} fill="#fff6d0" opacity={0.25 * glow} />}
    </g>
    {[120, 160, 200].map((x, i) => <Rf key={i} x={x} y={560} w={34} h={10} c={glow > 0 ? '#c9b994' : '#1a1620'} />)}
    <g transform="translate(232 548)"><Rf x={0} y={6} w={22} h={10} c={glow > 0 ? '#8a6a42' : '#1a1620'} /><Rf x={18} y={0} w={8} h={8} c={glow > 0 ? '#8a6a42' : '#1a1620'} /><Rf x={2} y={16} w={3} h={5} c="#1a1620" /><Rf x={16} y={16} w={3} h={5} c="#1a1620" /></g>
  </>
);
// Two glowing slots that hold the missing words, filled at the end with "IN SHA ALLAH".
const TwoWords: React.FC<{filled?: number}> = ({filled = 0}) => (
  <div style={{position: 'absolute', top: 760, width: '100%', display: 'flex', justifyContent: 'center', gap: 30}}>
    {['IN SHA', 'ALLAH'].map((w, i) => (
      <div key={i} style={{width: 380, height: 150, borderRadius: 20, border: '8px solid #f9c440', background: filled ? '#f6efdc' : 'rgba(249,196,64,.12)', boxShadow: '0 0 60px rgba(249,196,64,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: nunito, fontWeight: 900, fontSize: filled ? 76 : 110, color: filled ? '#24503a' : '#f9c440'}}>{filled ? w : '?'}</div>
    ))}
  </div>
);

// ---------- shots ----------
const FridayMosque: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.3, 1.15, 1.3), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#e8dcc0" />
      {[0, 120, 240].map((x, i) => <g key={i}><Rf x={x + 20} y={80} w={80} h={260} c="#cdb88e" /><Rf x={x + 36} y={110} w={48} h={200} c="#9fcbe0" /><Rf x={x + 56} y={110} w={8} h={200} c="#cdb88e" /></g>)}
      <g shapeRendering="auto" opacity={0.25}><polygon points="40,110 160,110 300,640 0,640" fill="#fff4c2" /></g>
      <Rf x={0} y={500} w={360} h={140} c="#2f6b4a" />
      {Array.from({length: 9}, (_, i) => <Rf key={i} x={i * 40} y={500} w={4} h={140} c="#24503a" />)}
      <PixG rows={AMIR.poses.read} palette={PAL} x={142} y={410} s={4} smooth />
    </Stage>
  );
};

const Scheming: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.5, 1.05, 1.2), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#1e1620" />
      <g shapeRendering="auto"><circle cx={180} cy={520} r={130 + 6 * Math.sin(t * 9)} fill="#f9a23a" opacity={0.18} /></g>
      <Rf x={160} y={520} w={40} h={20} c="#5a3a22" />
      {Array.from({length: 6}, (_, i) => <Rf key={i} x={166 + i * 5} y={500 - Math.abs(Math.sin(t * 10 + i)) * 14} w={6} h={16} c={i % 2 ? '#f9c440' : '#ef6a2a'} />)}
      <Leaders t={t} y={430} />
    </Stage>
  );
};

const Scroll: React.FC = () => {
  const t = useT();
  const open = ez(t, 0, 0.8, 0.1, 1);
  return (
    <Stage cam={cam(ez(t, 0, 2.8, 1, 1.12), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1f1a" />
      <Rf x={70} y={400 - 200 * open} w={220} h={400 * open} c="#eadfc6" />
      <Rf x={60} y={392 - 200 * open} w={240} h={16} c="#8a6a42" /><Rf x={60} y={392 + 200 * open} w={240} h={16} c="#8a6a42" />
      {open > 0.7 && [0, 1, 2].map((i) => <text key={i} x={180} y={300 + i * 110} fontSize={90} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#a8432f" opacity={interpolate(t, [0.8 + i * 0.3, 1 + i * 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}>?</text>)}
    </Stage>
  );
};

const Delay: React.FC = () => {
  const t = useT();
  const cycle = (t * 1.4) % 1;
  return (
    <Stage>
      <Sky c={cycle < 0.5 ? ['#9fcbe0', '#b6dcea', '#f3d9a0', '#f3c58d', '#efb07c'] : NIGHT} />
      <Rf x={0} y={460} w={360} h={180} c="#3b2a20" />
      <g opacity={0.6}><Light x={180} y={420} r={10} t={t} /></g>
    </Stage>
  );
};

const RidersToMadinah: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1, 180, 420)}>
      <Desert />
      {[0, 1].map((i) => <PixG key={i} rows={rider(Math.floor(t * 6 + i) % 2)} palette={PAL} x={-80 + t * 110 + i * 46} y={410 + i * 10} s={2.4} smooth />)}
      <text x={300} y={560} fontSize={22} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#5a3a22">MADINAH →</text>
    </Stage>
  );
};

const Sleepers: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 2, 1, 1.15), 180, 480)}><CaveMouth t={t} /></Stage>;
};

const EastWest: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.05, 1), 180, 420)}>
      <Rf x={0} y={0} w={180} h={640} c="#d4562f" />
      <Rf x={180} y={0} w={180} h={640} c="#9fcbe0" />
      <g shapeRendering="auto"><circle cx={40} cy={380} r={40} fill="#f6b13d" /><circle cx={320} cy={300} r={36} fill="#fff4c2" /></g>
      <Rf x={0} y={440} w={360} h={200} c="#c9a466" />
      <PixG rows={rider(Math.floor(t * 6) % 2)} palette={PAL} x={ez(t, 0, 2, 60, 210)} y={370} s={2.6} smooth />
    </Stage>
  );
};

const Soul: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1, 1.2), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#0d1226" />
      <Stars t={t} n={60} />
      <g shapeRendering="auto">{Array.from({length: 24}, (_, i) => { const life = (t * 0.6 + i / 24) % 1; return <circle key={i} cx={180 + Math.sin(life * 12 + i) * 30 * life} cy={520 - life * 400} r={10 * (1 - life) + 2} fill="#cfe0ff" opacity={0.7 * (1 - life)} />; })}</g>
    </Stage>
  );
};

const Promise: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.05, 1.2), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1f1a" />
      <Rf x={0} y={500} w={360} h={140} c="#6e5232" />
      <Leaders t={t} y={430} />
      <Light x={180} y={300} r={13} t={t} />
    </Stage>
  );
};

const NoRevelation: React.FC<{counter?: boolean}> = ({counter}) => {
  const t = useT();
  const speed = counter ? 3.2 : 0.8;
  const cycle = (t * speed) % 1;
  const day = cycle < 0.55;
  return (
    <Stage cam={cam(ez(t, 0, 2.3, 1, 1.08), 180, 420)}>
      <Desert day={day} />
      {!day && <Stars t={t} />}
      <g shapeRendering="auto"><circle cx={30 + cycle * 300} cy={420 - Math.sin(cycle * Math.PI) * 260} r={20} fill={day ? '#fff4c2' : '#f6efdc'} /></g>
      <g opacity={0.6}><Light x={180} y={500} r={9} t={t} /></g>
    </Stage>
  );
};

const Laugh: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.15, 180, 470, Math.sin(t * 40) * 2)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a1a24" />
      <Rf x={0} y={500} w={360} h={140} c="#5a3a22" />
      <Leaders t={t} y={430} laugh />
    </Stage>
  );
};

const Revelation: React.FC = () => {
  const t = useT();
  const beam = ez(t, 0, 0.8, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 2.2, 1.15, 1), 180, 420)}>
      <Sky c={NIGHT} />
      <Stars t={t} n={60} />
      <g shapeRendering="auto" opacity={0.4 * beam}><polygon points="150,0 210,0 260,640 100,640" fill="#fff6d0" /></g>
      {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={470 + 16 * Math.sin(i / 7)} w={4} h={200} c="#2b2030" />)}
      <Light x={180} y={470} r={10 + beam * 10} t={t} />
    </Stage>
  );
};

const CaveGlow: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 1.4, 1.1, 1.25), 180, 480)}><CaveMouth t={t} glow={ez(t, 0, 0.6, 0, 1)} /></Stage>;
};

const Traveler: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1, 1.1), 180, 420)}>
      <Sky c={['#3a1f3d', '#5a2a45', '#87374a', '#b5503f', '#d4703f']} />
      {Array.from({length: 90}, (_, i) => { const x = i * 4; if (x > 110 && x < 250) return null; return <Rf key={i} x={x} y={120 + 30 * Math.sin(i / 5)} w={4} h={520} c="#4b3a33" />; })}
      {Array.from({length: 17}, (_, r) => <Rf key={r} x={110} y={520 - r * 22} w={140} h={20} c={r % 2 ? '#a8642f' : '#8a5428'} />)}
      <Rf x={0} y={520} w={360} h={120} c="#6b5442" />
      <PixG rows={rider(0)} palette={PAL} x={30} y={460} s={2.2} smooth />
    </Stage>
  );
};

const Tomorrow: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5, 1, 1.12), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a2038" />
      <Stars t={t} n={20} />
      <Rf x={0} y={520} w={360} h={120} c="#2a2236" />
      <PixG rows={AMIR.poses.dua} palette={PAL} x={142} y={420} s={4} smooth />
    </Stage>
  );
};

const InShaAllah: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.8, 1.1, 1), 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <g shapeRendering="auto"><circle cx={180} cy={380} r={200 + 10 * Math.sin(t * 4)} fill="#f9c440" opacity={0.12} /></g>
    </Stage>
  );
};

// ---------- overlays ----------
const DayCounter: React.FC = () => {
  const t = useT();
  const day = Math.min(15, 1 + Math.floor(t * 7));
  return <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: nunito, fontWeight: 900, color: '#f6efdc', textShadow: '0 8px 0 rgba(0,0,0,.45)'}}><div style={{fontSize: 60, letterSpacing: 4}}>DAY</div><div style={{fontSize: 260, lineHeight: 1}}>{day}</div></div>;
};
const SurahTitle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '24px 26px 28px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 84, color: '#24503a', letterSpacing: 2, lineHeight: 1}}>SURAH AL-KAHF</div>
    <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 44, color: '#1d2b24', marginTop: 12}}>The surah you read <span style={{color: '#b8862a'}}>every Friday</span></div>
  </div>
);
const KahfAyah: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>SURAH AL-KAHF · 18:23–24</div>
      <div style={{fontFamily: QURAN_FONT, fontSize: 66, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>
        {ayat['18:23'].words.join(' ')}{'  '}
        <span style={{color: '#b8862a'}}>{ayat['18:24'].words.slice(0, 4).join(' ')}</span> …
      </div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 44, color: '#1d2b24', lineHeight: 1.15}}>“Never say of anything, ‘Indeed, I will do that tomorrow,’ except when adding, <span style={{color: '#b8862a'}}>‘If Allah wills’</span>”</div>
    </div>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 2.2, <FridayMosque />],
  [2.2, 4.6, <Scheming />, 'whip'],
  [4.6, 7.5, <Scroll />, 'zoom'],
  [7.5, 11.4, <Delay />, 'whip'],
  [11.4, 15.5, <RidersToMadinah />, 'whip'],
  [15.5, 17.6, <Sleepers />, 'zoom'],
  [17.6, 20.1, <EastWest />, 'whip'],
  [20.1, 21.5, <Soul />, 'zoom'],
  [21.5, 23.5, <Promise />, 'whip'],
  [23.5, 25.5, <NoRevelation />],
  [25.5, 27.6, <NoRevelation counter />],
  [27.6, 28.3, <Laugh />, 'whip'],
  [28.3, 30.5, <Revelation />, 'zoom'],
  [30.5, 31.8, <CaveGlow />, 'whip'],
  [31.8, 34.8, <Traveler />, 'whip'],
  [34.8, 40.1, <Tomorrow />, 'zoom'],
  [40.1, 41.4, <InShaAllah />],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 2.2, <SurahTitle />],
  [2.2, 7.5, <Caption text="It was revealed to answer a test, designed to prove the Prophet ﷺ was *a fake*." />],
  [7.5, 11.4, <Caption text="The answer was delayed for days, because of *two words he didn't say*." size={56} />],
  [11.4, 15.5, <Caption text="Quraysh asked the rabbis of Madinah how to test him. They sent back *three questions*." size={54} />],
  [15.5, 17.6, <Caption text="Who were the *young men* who vanished long ago?" />],
  [17.6, 20.1, <Caption text="Who was the man who traveled *east and west*?" />],
  [20.1, 21.5, <Caption text="And what is *the soul*?" />],
  [21.5, 23.5, <Caption text="“I will tell you *tomorrow*.”" size={70} />],
  [23.5, 25.5, <Caption text="Tomorrow came. *No revelation.*" />],
  [25.5, 27.6, <Caption text="For *fifteen days*, nothing." size={70} />],
  [27.6, 28.3, <Caption text="And Quraysh *laughed*." />],
  [28.3, 30.5, <Caption text="Then *Al-Kahf* came down," />],
  [30.5, 31.8, <Caption text="with the *young men of the cave*," />],
  [31.8, 34.8, <Caption text="and the traveler, *Dhul-Qarnayn*. And with it, a lesson:" size={56} />],
  [34.8, 40.1, <KahfAyah />],
];
const SLOTS: Cap[] = [[7.5, 11.4, <TwoWords />], [40.1, 41.4, <TwoWords filled={1} />], [25.5, 27.6, <DayCounter />]];
const FLASHES = [7.5, 28.3, 40.1];
const END_START = 41.4;

export const Kahf: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {SLOTS.map(([a, b, el], i) => <Sequence key={'w' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(KF_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/kahf-narration.mp3')} />
  </AbsoluteFill>
);
