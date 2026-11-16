import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard, QURAN_FONT} from '../components/AyahCard';
import {PAL, SHADOW, raster, shadowMan} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Sky, Flash, Enter, clamp, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const AK_FPS = 60;
export const AK_DURATION = 40.39;
const amiri = QURAN_FONT;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

// ---------- sprites ----------
// Abu Hurayrah, faceless: white turban, cream robe, brown belt.
const guard = raster(12, 24, (set, H) => {
  H.rect(3, 1, 6, 3, 'w');
  H.rect(4, 4, 4, 4, 's');
  H.rect(2, 8, 8, 14, 'c');
  H.rect(2, 13, 8, 1, 'b');
  H.rect(1, 9, 1, 7, 'c'); H.rect(10, 9, 1, 7, 'c');
  set(1, 16, 's'); set(10, 16, 's');
  H.rect(3, 22, 2, 1, 'b'); H.rect(7, 22, 2, 1, 'b');
});
const NIGHT_IN = ['#0d1226', '#121a33', '#18223d', '#1d2a47', '#223050'];

// ---------- pieces ----------
const Moon: React.FC<{x: number; y: number}> = ({x, y}) => <><Rf x={x} y={y} w={22} h={22} c="#f6efdc" /><Rf x={x + 7} y={y - 3} w={20} h={20} c="#121a33" /></>;
const Stars: React.FC<{t: number; n?: number; h?: number}> = ({t, n = 40, h = 260}) => <>{Array.from({length: n}, (_, i) => <Rf key={i} x={random('sx' + i) * 356} y={random('sy' + i) * h} w={2} h={2} c="#f6efdc" o={0.35 + 0.6 * Math.abs(Math.sin(t * 2 + i))} />)}</>;

const Bedroom: React.FC<{t: number; shield?: number}> = ({t, shield = 0}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#1a2038" />
    {Array.from({length: 12}, (_, i) => <Rf key={i} x={0} y={i * 44} w={360} h={2} c="#20284a" />)}
    <Rf x={210} y={130} w={110} h={120} c="#0d1226" />
    <Stars t={t} n={10} h={110} />
    <Moon x={260} y={150} />
    <Rf x={206} y={126} w={118} h={6} c="#5a3a22" /><Rf x={206} y={246} w={118} h={6} c="#5a3a22" /><Rf x={262} y={126} w={6} h={126} c="#5a3a22" />
    <g shapeRendering="auto" opacity={0.12}><polygon points="210,250 320,250 250,520 90,520" fill="#f6efdc" /></g>
    <Rf x={40} y={430} w={240} h={70} c="#6e4a2a" />
    <Rf x={40} y={420} w={240} h={20} c="#e9dfc8" />
    <Rf x={40} y={500} w={14} h={40} c="#5a3a22" /><Rf x={266} y={500} w={14} h={40} c="#5a3a22" />
    <g transform="translate(60 452) rotate(-90)"><PixG rows={AMIR.poses.idle} palette={PAL} s={3.2} smooth /></g>
    <Rf x={100} y={402} w={170} h={30} c="#2f6b4a" />
    <Rf x={100} y={402} w={170} h={4} c="#d4a73a" />
    {shield > 0 && (
      <g shapeRendering="auto">
        <ellipse cx={160} cy={430} rx={150 * shield} ry={120 * shield} fill="#fff6d0" opacity={0.1} />
        <ellipse cx={160} cy={430} rx={150 * shield} ry={120 * shield} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.7} />
        {Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2 + t; return <rect key={i} x={160 + Math.cos(a) * 150 * shield - 3} y={430 + Math.sin(a) * 120 * shield - 3} width={6} height={6} fill="#fff6d0" opacity={0.8} />; })}
      </g>
    )}
    <Rf x={0} y={540} w={360} h={100} c="#2a2236" />
  </>
);

const Storehouse: React.FC<{t: number; light?: number}> = ({t, light = 1}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#2a1f1a" />
    {Array.from({length: 9}, (_, i) => <Rf key={i} x={i * 42} y={0} w={4} h={520} c="#21180f" />)}
    <Rf x={140} y={60} w={80} h={70} c="#0d1226" /><Moon x={170} y={78} />
    <g shapeRendering="auto" opacity={0.14 * light}><polygon points="140,130 220,130 300,560 40,560" fill="#cfe0ff" /></g>
    <Rf x={0} y={520} w={360} h={120} c="#3b2a20" />
    {Array.from({length: 7}, (_, i) => {
      const x = 8 + i * 50;
      const y = 470 + (i % 2) * 14;
      return <g key={i}><Rf x={x} y={y} w={44} h={52} c="#8a6a42" /><Rf x={x + 4} y={y - 6} w={36} h={10} c="#9a7a4a" /><Rf x={x + 18} y={y - 10} w={8} h={6} c="#5a3a22" />{Array.from({length: 4}, (_, k) => <Rf key={k} x={x + 6 + k * 9} y={y - 4} w={6} h={5} c="#5a1f1a" />)}</g>;
    })}
  </>
);

const Lamp: React.FC<{x: number; y: number; t: number}> = ({x, y, t}) => (
  <g shapeRendering="auto">
    <circle cx={x} cy={y} r={46 + 3 * Math.sin(t * 9)} fill="#f9c440" opacity={0.12} />
    <rect x={x - 5} y={y - 3} width={10} height={8} fill="#d4a73a" />
    <rect x={x - 2} y={y - 9 - Math.abs(Math.sin(t * 12)) * 2} width={4} height={6} fill="#fff1b0" />
  </g>
);

const Madinah: React.FC<{t: number}> = ({t}) => (
  <>
    <Sky c={['#f3c58d', '#f6d6a2', '#cfe3ea', '#a9d2e6', '#9fcbe0'].reverse()} />
    <Rf x={150} y={ez(t, 0, 3, 330, 290)} w={60} h={60} c="#fbe0a6" />
    {[10, 70, 230, 300].map((x, i) => <g key={i}><Rf x={x} y={330 - (i % 2) * 14} w={50} h={110 + (i % 2) * 14} c="#d9c09a" /><Rf x={x + 18} y={380} w={12} h={18} c="#5a4636" /></g>)}
    <Rf x={120} y={360} w={120} h={80} c="#cdb08a" />
    <Rf x={116} y={352} w={128} h={10} c="#7a9a4a" />
    {[30, 200, 330].map((x, i) => <g key={i}><Rf x={x} y={240} w={6} h={200} c="#6e4a2a" />{[-1, 1].map((d) => <Rf key={d} x={x + (d > 0 ? 6 : -30)} y={236 + Math.sin(t * 2 + i) * 2} w={30} h={8} c="#4f7a3a" />)}</g>)}
    <Rf x={0} y={440} w={360} h={200} c="#d8c08a" />
  </>
);

// Three nights of the thief sneaking in. n: which night (1..3) for the label.
const ThiefNight: React.FC<{n: number}> = ({n}) => {
  const t = useT();
  const x = ez(t, 0, 0.9, -40, 160);
  return (
    <Stage cam={cam(ez(t, 0, 1.4, 1.05, 1.15), 180, 470)}>
      <Storehouse t={t} />
      <PixG rows={shadowMan(Math.floor(t * 8) % 2)} palette={SHADOW} x={x} y={430} s={6} smooth />
    </Stage>
  );
};

// ---------- shots ----------
const BedWide: React.FC<{shield?: boolean}> = ({shield}) => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 3, 1, 1.12), 160, 420)}><Bedroom t={t} shield={shield ? ez(t, 0.3, 1.5, 0, 1) : 0} /></Stage>;
};

const MushafPage: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.5, 1.1, 1.25), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#151a30" />
      <g shapeRendering="auto"><ellipse cx={180} cy={380} rx={190} ry={230} fill="#f9c440" opacity={0.14 + 0.04 * Math.sin(t * 5)} /></g>
      <Rf x={50} y={200} w={260} h={360} c="#f6efdc" />
      <Rf x={58} y={208} w={244} h={344} c="none" />
      <Rf x={50} y={200} w={260} h={8} c="#24503a" /><Rf x={50} y={552} w={260} h={8} c="#24503a" />
      <Rf x={50} y={200} w={8} h={360} c="#24503a" /><Rf x={302} y={200} w={8} h={360} c="#24503a" />
      {Array.from({length: 10}, (_, i) => <Rf key={i} x={80} y={300 + i * 22} w={200 - (i % 3) * 18} h={4} c="#c9b994" />)}
    </Stage>
  );
};

const PushDark: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.3, 1, 2.2), 180, 380)}>
      <Rf x={0} y={0} w={360} h={640} c="#0a0a12" />
      <Rf x={130} y={250} w={100} h={220} c="#151a30" />
      <Rf x={130} y={250} w={100 * ez(t, 0, 2, 0.1, 0.9)} h={220} c="#05050a" />
      <PixG rows={shadowMan(0)} palette={SHADOW} x={160} y={340} s={4} smooth opacity={ez(t, 1, 2.2, 0, 1)} />
    </Stage>
  );
};

const ShaytanReveal: React.FC = () => {
  const t = useT();
  const shake = Math.sin(t * 60) * 4 * Math.max(0, 1 - t * 1.5);
  return (
    <Stage cam={cam(ez(t, 0, 1.4, 1.2, 1), 180, 380, shake)}>
      <Rf x={0} y={0} w={360} h={640} c="#14060a" />
      <g shapeRendering="auto"><ellipse cx={180} cy={420} rx={170} ry={260} fill="#7a1418" opacity={0.35} /></g>
      {Array.from({length: 40}, (_, i) => { const life = (t * 0.8 + random('sm' + i)) % 1; return <Rf key={i} x={140 + random('smx' + i) * 80 + Math.sin(t * 3 + i) * 20 * life} y={520 - life * 380} w={14 - life * 8} h={14 - life * 8} c="#1a0c10" o={0.8 * (1 - life)} />; })}
      <PixG rows={shadowMan(0, true)} palette={{...SHADOW, k: '#050205'}} x={108} y={250} s={24} smooth />
    </Stage>
  );
};

const GuardWatch: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.1, 180, 450, ez(t, 0, 1.6, 20, -20))}>
      <Storehouse t={t} />
      <PixG rows={guard} palette={PAL} x={250} y={420} s={5} smooth />
      <Lamp x={248} y={498} t={t} />
    </Stage>
  );
};

const Creep: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.5, 1.1, 1.3), 120, 470)}>
      <Storehouse t={t} />
      <PixG rows={shadowMan(Math.floor(t * 6) % 2)} palette={SHADOW} x={ez(t, 0, 1.5, -40, 110)} y={430 + Math.abs(Math.sin(t * 6)) * 3} s={6} smooth />
    </Stage>
  );
};

const Caught: React.FC = () => {
  const t = useT();
  const shake = t > 0.25 && t < 0.4 ? 5 : 0;
  return (
    <Stage cam={cam(1.35, 180, 470, shake)}>
      <Storehouse t={t} />
      <PixG rows={shadowMan(0, t > 0.25)} palette={SHADOW} x={150} y={430} s={6} smooth />
      <PixG rows={guard} palette={PAL} x={ez(t, 0, 0.3, 280, 190)} y={420} s={5} smooth flip />
      <Lamp x={ez(t, 0, 0.3, 278, 188)} y={498} t={t} />
    </Stage>
  );
};

const Begging: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.8, 1.25, 1.4), 170, 470)}>
      <Storehouse t={t} light={0.7} />
      <g transform={`translate(0 ${30 + Math.sin(t * 6) * 2})`}><PixG rows={shadowMan(0, true)} palette={SHADOW} x={110} y={440} s={5} smooth /></g>
      <PixG rows={guard} palette={PAL} x={200} y={420} s={5} smooth flip />
      <Lamp x={198} y={498} t={t} />
    </Stage>
  );
};

const LetGo: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.1, 180, 470)}>
      <Storehouse t={t} />
      <PixG rows={shadowMan(Math.floor(t * 10) % 2)} palette={SHADOW} x={ez(t, 0, 1.3, 120, -80)} y={430} s={6} smooth flip />
      <PixG rows={guard} palette={PAL} x={210} y={420} s={5} smooth flip />
      <Lamp x={208} y={498} t={t} />
    </Stage>
  );
};

const Dawn: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1, 1.12), 180, 400)}>
      <Madinah t={t} />
      <PixG rows={guard} palette={PAL} x={ez(t, 0, 4, 40, 120)} y={480} s={4} smooth />
    </Stage>
  );
};

const Whisper: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.3, 1.4, 1.6), 170, 430)}>
      <Storehouse t={t} light={0.5} />
      <PixG rows={shadowMan(0)} palette={SHADOW} x={120} y={430} s={6} smooth />
      {Array.from({length: 18}, (_, i) => { const life = (t * 0.7 + random('w' + i)) % 1; return <Rf key={i} x={160 + life * 60 + Math.sin(t * 4 + i) * 8} y={450 - life * 40} w={4} h={4} c="#3a2a3a" o={1 - life} />; })}
      <PixG rows={guard} palette={PAL} x={200} y={420} s={5} smooth flip />
      <Lamp x={198} y={498} t={t} />
    </Stage>
  );
};

const Dissolve: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.3, 170, 450, t < 0.15 ? 4 : 0)}>
      <Storehouse t={t} light={0.6} />
      <PixG rows={shadowMan(0)} palette={SHADOW} x={120} y={430} s={6} smooth opacity={ez(t, 0, 0.6, 1, 0)} />
      {Array.from({length: 60}, (_, i) => {
        const dt = Math.max(0, t - random('dt' + i) * 0.3);
        return <Rf key={i} x={124 + random('dx' + i) * 36 + (random('dv' + i) - 0.5) * dt * 120} y={436 + random('dy' + i) * 60 - dt * (80 + random('du' + i) * 100)} w={6} h={6} c="#1a0c10" o={Math.max(0, 1 - dt * 1.2)} />;
      })}
    </Stage>
  );
};

// ---------- overlays ----------
// Opening: context said, shown and written at once (hook framework step 1).
const KursiTitle: React.FC = () => {
  const ay = ayat['2:255'];
  return (
    <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '20px 26px 24px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 78, color: '#24503a', letterSpacing: 2, lineHeight: 1}}>AYAT AL-KURSI</div>
      <div style={{fontFamily: amiri, fontSize: 62, lineHeight: 1.8, color: '#b8862a', direction: 'rtl', marginTop: 6}}>{ay.words.slice(0, 7).join(' ')}</div>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 40, color: '#1d2b24'}}>The ayah you read before you sleep</div>
    </div>
  );
};

const HadithCard: React.FC<{text: string}> = ({text}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const parts = text.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '22px 32px 28px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)', fontFamily: nunito}}>
      <div style={{fontWeight: 800, fontSize: 28, color: '#5b6a60', letterSpacing: 2}}>FROM SAHIH AL-BUKHARI</div>
      <div style={{fontWeight: 900, fontSize: 54, color: '#1d2b24', lineHeight: 1.15, marginTop: 10}}>“{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}”</div>
    </div>
  );
};

const NightLabel: React.FC<{n: number}> = ({n}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 10}});
  return <div style={{position: 'absolute', bottom: 260, width: '100%', textAlign: 'center', fontFamily: nunito, fontWeight: 900, fontSize: 90, color: '#f6efdc', transform: `scale(${s})`, textShadow: '0 6px 0 rgba(0,0,0,.5)'}}>NIGHT {n}</div>;
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 1.6, <BedWide />],
  [1.6, 3.1, <MushafPage />, 'zoom'],
  [3.1, 5.4, <PushDark />, 'whip'],
  [5.4, 6.8, <ShaytanReveal />],
  [6.8, 8.4, <GuardWatch />, 'whip'],
  [8.4, 9.9, <Creep />, 'zoom'],
  [9.9, 10.9, <Caught />],
  [10.9, 13.7, <Begging />, 'zoom'],
  [13.7, 15.0, <LetGo />],
  [15.0, 18.9, <Dawn />, 'whip'],
  [18.9, 19.9, <ThiefNight n={2} />, 'whip'],
  [19.9, 21.3, <ThiefNight n={3} />, 'whip'],
  [21.3, 24.6, <Whisper />, 'zoom'],
  [24.6, 29.0, <BedWide shield />, 'zoom'],
  [29.0, 33.3, <Dawn />, 'whip'],
  [33.3, 34.6, <Dissolve />],
  [34.6, 37.6, <BedWide shield />, 'zoom'],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 3.1, <KursiTitle />],
  [3.1, 5.4, <Caption text="But do you know who first taught it as *protection*?" />],
  [5.4, 6.8, <Caption text="*Shaytan himself.*" size={96} />],
  [6.8, 9.9, <Caption text="Abu Hurayrah was guarding the *charity food* when a thief crept in." />],
  [9.9, 10.9, <Caption text="He *caught* him." />],
  [10.9, 13.7, <Caption text="“I'm poor, I have a *family*.”" />],
  [13.7, 15.0, <Caption text="So he *let him go*." />],
  [15.0, 18.9, <HadithCard text="He *lied to you*, and he will come back." />],
  [18.9, 21.3, <Caption text="He came back. *Again, and again.*" />],
  [21.3, 24.6, <Caption text="On the *third night*, the thief said: “Let me go, and I'll teach you something.”" size={54} />],
  [24.6, 29.0, <AyahCard refKey="2:255" range={[0, 11]} gold={[9, 10, 11]} partial trSize={38} tr="Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. *Neither drowsiness overtakes Him nor sleep*" />],
  [29.0, 33.3, <HadithCard text="He told you *the truth*, though he is a liar." />],
  [33.3, 34.6, <Caption text="“That was *Shaytan*.”" size={90} />],
  [34.6, 37.6, <Caption text="So tonight, before you sleep, you know *what to read*." />],
];
const LABELS: Cap[] = [[18.9, 19.9, <NightLabel n={2} />], [19.9, 21.3, <NightLabel n={3} />]];
const FLASHES = [5.4, 9.9, 24.6, 33.3];
const END_START = 37.6;

export const Kursi: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {LABELS.map(([a, b, el], i) => <Sequence key={'l' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(AK_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/kursi-narration.mp3')} />
  </AbsoluteFill>
);
