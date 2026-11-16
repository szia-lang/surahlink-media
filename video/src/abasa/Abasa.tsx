import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard, QURAN_FONT} from '../components/AyahCard';
import {PAL, SHADOW, raster, villager, shadowMan} from '../alfil/sprites';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Sky, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const AB_FPS = 60;
export const AB_DURATION = 43.78;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

// ---------- sprites (faceless; the Prophet ﷺ is only ever a soft light) ----------
const leader = (c: string) => raster(12, 22, (set, H) => {
  H.rect(3, 0, 6, 3, 'y');
  H.rect(4, 3, 4, 4, 's');
  H.rect(1, 7, 10, 13, c);
  H.rect(1, 7, 10, 2, 'y');
  H.rect(5, 9, 2, 11, 'y');
  H.rect(2, 20, 3, 1, 'b'); H.rect(7, 20, 3, 1, 'b');
});
const blindMan = (step = 0) => raster(14, 24, (set, H) => {
  H.rect(3, 1, 6, 3, 'w');
  H.rect(4, 4, 4, 4, 's');
  H.rect(2, 8, 8, 13, 'C');
  H.rect(9, 10, 2, 5, 'C');
  set(11, 14, 's');
  H.rect(12, 14, 1, 9, 'b');
  H.rect(3, 21, 2, 2, 'b'); H.rect(7, 21, 2, step ? 1 : 2, 'b');
});
const heart = raster(9, 8, (set, H) => {
  H.rect(1, 0, 3, 2, 'r'); H.rect(5, 0, 3, 2, 'r');
  H.rect(0, 1, 9, 3, 'r');
  H.rect(1, 4, 7, 1, 'r'); H.rect(2, 5, 5, 1, 'r'); H.rect(3, 6, 3, 1, 'r');
  set(2, 1, 'w');
});
const LEADER_COLORS = ['r', 'n', 'P', 'R', 'g'];

// ---------- pieces ----------
const Hall: React.FC<{dim?: number}> = ({dim = 0}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#3a2a1e" />
    {Array.from({length: 8}, (_, i) => <Rf key={i} x={0} y={i * 70} w={360} h={2} c="#2e2118" />)}
    <Rf x={0} y={470} w={360} h={170} c="#8a6a42" />
    <Rf x={0} y={470} w={360} h={4} c="#6e5232" />
    {Array.from({length: 6}, (_, i) => <Rf key={i} x={20 + i * 58} y={500 + (i % 2) * 30} w={40} h={10} c="#a8432f" o={0.5} />)}
    <Rf x={0} y={0} w={360} h={640} c="#0e0a12" o={dim} />
  </>
);
const LeaderCircle: React.FC<{t: number; y?: number; s?: number}> = ({t, y = 420, s = 4.5}) => (
  <>{LEADER_COLORS.map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={20 + i * 52 + (i > 2 ? 60 : 0)} y={y + Math.sin(t * 2 + i) * 1.5} s={s} smooth />)}</>
);
const Minaret: React.FC<{t: number; s?: number}> = ({t, s = 1}) => (
  <g transform={`translate(180 0) scale(${s}) translate(-180 0)`}>
    <Rf x={160} y={200} w={40} h={360} c="#e9dfc8" />
    <Rf x={150} y={190} w={60} h={14} c="#d4a73a" />
    <Rf x={164} y={150} w={32} h={40} c="#e9dfc8" />
    <Rf x={170} y={120} w={20} h={30} c="#2f6b4a" />
    <Rf x={178} y={104} w={4} h={16} c="#d4a73a" />
    <Rf x={173} y={300} w={14} h={22} c="#5a4636" />
    <PixG rows={shadowMan(0)} palette={SHADOW} x={171} y={162} s={3} smooth />
    <g shapeRendering="auto">{Array.from({length: 4}, (_, i) => { const r = ((t * 80 + i * 60) % 240); return <circle key={i} cx={180} cy={175} r={r} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.6 * (1 - r / 240)} />; })}</g>
  </g>
);
const DawnCity: React.FC<{t: number}> = ({t}) => (
  <>
    <Sky c={['#2a3a6a', '#4a5a8a', '#c98a7a', '#f3b88a', '#f6d6a2']} />
    <Rf x={240} y={ez(t, 0, 3, 470, 430)} w={44} h={44} c="#fbe0a6" />
    {[0, 50, 250, 300].map((x, i) => <g key={i}><Rf x={x} y={470 - (i % 2) * 20} w={56} h={200} c="#b89a74" /><Rf x={x + 20} y={500} w={12} h={18} c="#3b3026" /></g>)}
    <Rf x={0} y={560} w={360} h={80} c="#a8885e" />
  </>
);

// ---------- shots ----------
const MushafOpen: React.FC<{close?: boolean}> = ({close}) => {
  const t = useT();
  const open = close ? 1 : ez(t, 0, 1.2, 0.05, 1);
  return (
    <Stage cam={cam(close ? ez(t, 0, 1.7, 1.25, 1.4) : 1.1, 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#151a30" />
      <g shapeRendering="auto"><ellipse cx={180} cy={400} rx={200} ry={240} fill="#f9c440" opacity={0.15} /></g>
      <Rf x={180 - 140 * open} y={250} w={140 * open} h={300} c="#f6efdc" />
      <Rf x={180} y={250} w={140 * open} h={300} c="#efe5cc" />
      <Rf x={176} y={250} w={8} h={300} c="#24503a" />
      {open > 0.6 && Array.from({length: 9}, (_, i) => <g key={i}><Rf x={60} y={320 + i * 22} w={100} h={4} c="#c9b994" /><Rf x={200} y={320 + i * 22} w={100 - (i % 3) * 14} h={4} c="#c9b994" /></g>)}
    </Stage>
  );
};

const Gathering: React.FC<{lightX?: [number, number]; blind?: boolean; welcome?: boolean}> = ({lightX = [180, 180], blind, welcome}) => {
  const t = useT();
  const lx = ez(t, 0, 1.2, lightX[0], lightX[1]);
  return (
    <Stage cam={cam(ez(t, 0, 3, 1, 1.1), 180, 460)}>
      <Hall dim={blind ? 0.25 : 0} />
      <LeaderCircle t={t} />
      {blind && <PixG rows={blindMan(0)} palette={PAL} x={welcome ? ez(t, 0, 1.6, 296, 200) : 296} y={404} s={3.6} smooth />}
      <Light x={lx} y={450} r={14} t={t} />
    </Stage>
  );
};

const LightPush: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2, 1.1, 1.6), 180, 450)}>
      <Hall />
      <LeaderCircle t={t} />
      <Light x={180} y={450} r={16} t={t} />
    </Stage>
  );
};

const LoneBlind: React.FC<{close?: boolean}> = ({close}) => {
  const t = useT();
  return (
    <Stage cam={cam(close ? ez(t, 0, 4, 1.4, 1.6) : ez(t, 0, 1.9, 1.15, 1.3), 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#1c1622" />
      <g shapeRendering="auto" opacity={0.18}><polygon points="150,0 210,0 280,640 80,640" fill="#f6efdc" /></g>
      <Rf x={0} y={540} w={360} h={100} c="#2e2430" />
      <PixG rows={blindMan(Math.floor(t * 3) % 2)} palette={PAL} x={140} y={430} s={5} smooth />
      {!close && Array.from({length: 3}, (_, i) => { const r = ((t * 40 + i * 20) % 60); return <circle key={i} cx={207} cy={548} r={r} fill="none" stroke="#c9b994" strokeWidth={2} opacity={0.6 * (1 - r / 60)} shapeRendering="auto" />; })}
    </Stage>
  );
};

const MinaretShot: React.FC<{big?: boolean}> = ({big}) => {
  const t = useT();
  return (
    <Stage cam={cam(big ? ez(t, 0, 2.5, 1, 1.1) : ez(t, 0, 2.2, 1.3, 1.05), 180, 330)}>
      <DawnCity t={t} />
      <Minaret t={t} s={big ? 1.1 : 1} />
      {big && Array.from({length: 8}, (_, i) => <PixG key={i} rows={villager(['g', 'r', 'b', 'c', 'n', 'M'][i % 6], Math.floor(t * 6 + i) % 2)} palette={PAL} x={((i * 46 + t * 30) % 380) - 20} y={570} s={3} smooth />)}
    </Stage>
  );
};

const Doorway: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 1.7, 1, 1.2), 180, 420)}>
      <Hall />
      <Rf x={130} y={250} w={100} h={220} c="#f3d9a0" />
      <Rf x={124} y={244} w={112} h={8} c="#5a3a22" />
      <PixG rows={blindMan(Math.floor(t * 3) % 2)} palette={PAL} x={150} y={ez(t, 0, 1.7, 330, 380)} s={ez(t, 0, 1.7, 3, 4)} smooth />
    </Stage>
  );
};

const Approach: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1.1, 180, 450)}>
      <Hall />
      <LeaderCircle t={t} />
      <PixG rows={blindMan(Math.floor(t * 3) % 2)} palette={PAL} x={ez(t, 0, 2.5, 340, 290)} y={440} s={4.2} smooth />
      <Light x={180} y={450} r={14} t={t} />
    </Stage>
  );
};

const Hearts: React.FC = () => {
  const t = useT();
  const fade = ez(t, 0.3, 1.6, 1, 0);
  return (
    <Stage cam={cam(ez(t, 0, 3, 1, 1.08), 180, 460)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a1830" />
      {Array.from({length: 10}, (_, i) => {
        const x = 14 + (i % 5) * 70;
        const y = 360 + Math.floor(i / 5) * 120;
        const rich = i % 3 === 0;
        return (
          <g key={i}>
            <g opacity={fade}>{rich ? <PixG rows={leader(LEADER_COLORS[i % 5])} palette={PAL} x={x} y={y} s={3.5} smooth /> : <PixG rows={blindMan(0)} palette={PAL} x={x} y={y} s={3.2} smooth />}</g>
            <g opacity={1 - fade} transform={`translate(${x + 6} ${y + 20 - (1 - fade) * 10 + Math.sin(t * 3 + i) * 3})`}><PixG rows={heart} palette={PAL} s={3.5} smooth /></g>
          </g>
        );
      })}
    </Stage>
  );
};

// ---------- overlays ----------
const SurahTitle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '20px 26px 24px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 80, color: '#24503a', letterSpacing: 2, lineHeight: 1}}>SURAH ABASA</div>
    <div style={{fontFamily: QURAN_FONT, fontSize: 70, lineHeight: 1.8, color: '#b8862a', direction: 'rtl', marginTop: 6}}>{ayat['80:1'].words.join(' ')}</div>
    <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 40, color: '#1d2b24'}}>Its first words surprise everyone</div>
  </div>
);

// One card for several consecutive ayat (80:8–10). Arabic comes from the dataset.
const MultiAyahCard: React.FC<{keys: (keyof typeof ayat)[]; label: string; tr: string}> = ({keys, label, tr}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const parts = tr.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>{label}</div>
      <div style={{fontFamily: QURAN_FONT, fontSize: 70, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>
        {keys.map((k, j) => <span key={k} style={{color: j === keys.length - 1 ? '#b8862a' : undefined}}>{ayat[k].words.join(' ')}{'  '}</span>)}
      </div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 44, color: '#1d2b24', lineHeight: 1.15}}>“{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}”</div>
    </div>
  );
};

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Shot[] = [
  [0, 1.6, <MushafOpen />],
  [1.6, 3.3, <MushafOpen close />, 'zoom'],
  [3.3, 5.4, <Gathering />, 'whip'],
  [5.4, 7.4, <LightPush />, 'zoom'],
  [7.4, 9.3, <LoneBlind />, 'whip'],
  [9.3, 11.5, <MinaretShot />, 'zoom'],
  [11.5, 14.2, <Gathering />, 'whip'],
  [14.2, 16.7, <LightPush />],
  [16.7, 18.4, <Doorway />, 'whip'],
  [18.4, 20.9, <Approach />, 'zoom'],
  [20.9, 23.6, <Gathering blind lightX={[230, 150]} />, 'whip'],
  [23.6, 27.7, <LoneBlind close />, 'zoom'],
  [27.7, 32.9, <LoneBlind close />],
  [32.9, 35.4, <Gathering blind welcome lightX={[150, 240]} />, 'whip'],
  [35.4, 37.9, <MinaretShot big />, 'zoom'],
  [37.9, 40.9, <Hearts />, 'whip'],
];
type Cap = [number, number, React.ReactNode];
const CAPTIONS: Cap[] = [
  [0, 3.3, <SurahTitle />],
  [3.3, 5.4, <AyahCard refKey="80:1" tr="*The Prophet frowned* and turned away" />],
  [5.4, 7.4, <Caption text="Allah is speaking about *His own Messenger*." />],
  [7.4, 9.3, <Caption text="And the man he *turned away* from?" />],
  [9.3, 11.5, <Caption text="He became the *voice of the adhan* in Madinah." />],
  [11.5, 16.7, <Caption text="The Prophet ﷺ was inviting the *leaders of Quraysh* to Islam, hoping they would believe." size={54} />],
  [16.7, 20.9, <Caption text="Then a blind man came, *Abdullah ibn Umm Maktum*, asking to be taught." size={54} />],
  [20.9, 23.6, <Caption text="The Prophet frowned, and *turned back* to the leaders." />],
  [23.6, 27.7, <AyahCard refKey="80:3" gold={[3]} tr="But what would make you perceive that perhaps *he might be purified*" />],
  [27.7, 32.9, <MultiAyahCard keys={['80:8', '80:9', '80:10']} label="SURAH ABASA · 80:8–10" tr="But as for he who came to you striving, while he fears Allah, *from him you are distracted*" />],
  [32.9, 35.4, <Caption text="After that, the Prophet *always honored him*." />],
  [35.4, 37.9, <Caption text="And in Madinah, that blind man *called the adhan*." />],
  [37.9, 40.9, <Caption text="Allah doesn't look at status. He looks at *hearts*." />],
];
const FLASHES = [9.3, 23.6, 35.4];
const END_START = 40.9;

export const Abasa: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {CAPTIONS.map(([a, b, el], i) => <Sequence key={'c' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(AB_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/abasa-narration.mp3')} />
  </AbsoluteFill>
);
