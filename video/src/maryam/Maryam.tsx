import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {loadFont as loadGaramond} from '@remotion/google-fonts/EBGaramond';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard, QURAN_FONT} from '../components/AyahCard';
import {PAL, raster, villager} from '../alfil/sprites';
import {EndCard, endCardDefaults} from '../EndCard';
import {Stage, Rf, cam, ez, Light, Flash, Enter, F, useT} from '../fx/fx';
import ayat from '../data/ayat.json';

export const MR_FPS = 60;
export const MR_DURATION = 83.25;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;
const garamond = loadGaramond('italic', {weights: ['500', '600']}).fontFamily;

// ---------- sprites ----------
// Maryam: a veiled figure seen from behind. No face, ever. Angels and prophets (Gabriel, Zakariya, Isa) are only light.
const veiled = (robe: string, kneel = false, point = false) => raster(18, kneel ? 22 : 30, (set, H) => {
  const h = kneel ? 22 : 30;
  const shade = robe === 'n' ? 'N' : robe === 'G' ? 'g' : 'R';
  H.ellipse(9, 4, 3.5, 3.5, robe);
  H.rect(5, 6, 8, 4, robe);
  for (let y = 10; y < h - 1; y++) { const w = 9 + Math.round(((y - 10) / (h - 11)) * 6); H.rect(9 - w / 2, y, w, 1, robe); }
  H.rect(8, 2, 2, Math.min(14, h - 6), shade);
  H.rect(9 - 7.5, h - 3, 15, 1, 'y');
  if (point) { H.rect(14, 12, 3, 2, robe); set(17, 11, 's'); }
});
const ROBE_BIBLE = 'n';
const ROBE_QURAN = 'G';

// ---------- scene pieces ----------
const GLASS = ['#1b2a5a', '#2a3f86', '#4a2a6a', '#8a2a3a', '#2a5a7a'];
const StainedGlass: React.FC<{t: number; dim?: number}> = ({t, dim = 0}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#10162e" />
    {Array.from({length: 8}, (_, r) => Array.from({length: 6}, (_, c) => <Rf key={`${r}-${c}`} x={c * 60 + 2} y={r * 80 + 2} w={56} h={76} c={GLASS[(r * 3 + c) % 5]} o={0.55 + 0.25 * Math.sin(t * 1.5 + r + c)} />))}
    <Rf x={0} y={0} w={360} h={640} c="#05070f" o={dim} />
  </>
);
const GreenGold: React.FC<{t: number}> = ({t}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
    {Array.from({length: 7}, (_, r) => Array.from({length: 5}, (_, c) => { const cx = c * 80 + (r % 2) * 40; const cy = r * 100; return <g key={`${r}-${c}`} transform={`translate(${cx} ${cy}) rotate(45)`}><Rf x={-22} y={-22} w={44} h={44} c="#1f4a36" o={0.6 + 0.2 * Math.sin(t * 1.2 + r + c)} /><Rf x={-14} y={-14} w={28} h={28} c="#d4a73a" o={0.18} /></g>; }))}
  </>
);
const Village: React.FC<{night?: boolean}> = ({night}) => (
  <>
    {(night ? ['#0b1024', '#111833', '#18213f', '#1e2a4a', '#243256'] : ['#9fcbe0', '#b6dcea', '#e8dcc0', '#e2cfa8', '#d8c08a']).map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
    {[0, 60, 130, 220, 290].map((x, i) => <g key={i}><Rf x={x} y={380 - (i % 2) * 24} w={62} h={260} c={night ? '#2a3044' : '#cdb08a'} /><Rf x={x + 22} y={420} w={14} h={18} c={night ? '#e9c36a' : '#5a4636'} /></g>)}
    <Rf x={0} y={520} w={360} h={120} c={night ? '#1e2230' : '#b89a6e'} />
  </>
);
const Desert: React.FC<{t: number}> = ({t}) => (
  <>
    {['#3a1f3d', '#5a2a45', '#87374a', '#c4603f', '#e08a4a'].map((c, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === 4 ? 640 : 80} c={c} />)}
    {Array.from({length: 90}, (_, i) => <Rf key={i} x={i * 4} y={470 + 14 * Math.sin(i / 8)} w={4} h={300} c="#c9a466" />)}
  </>
);
const Palm: React.FC<{x: number; y: number; t: number}> = ({x, y, t}) => (
  <>
    {Array.from({length: 22}, (_, i) => <Rf key={i} x={x + Math.sin(i / 6) * 6} y={y - i * 10} w={14} h={11} c={i % 2 ? '#6e4a2a' : '#5a3a22'} />)}
    {Array.from({length: 7}, (_, i) => { const a = -Math.PI / 2 + (i - 3) * 0.45 + Math.sin(t * 1.5 + i) * 0.04; return Array.from({length: 10}, (_, k) => <Rf key={`${i}-${k}`} x={x + 7 + Math.cos(a) * k * 9} y={y - 220 + Math.sin(a) * k * 9 + k * k * 0.6} w={8} h={8} c="#3f7a3a" />); })}
  </>
);

// ---------- shots ----------
const HookSplit: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 6.9, 1, 1.08), 180, 360)}>
      <g><clipPath id="L"><rect x={0} y={0} width={180} height={640} /></clipPath><g clipPath="url(#L)"><StainedGlass t={t} /></g></g>
      <g><clipPath id="R"><rect x={180} y={0} width={180} height={640} /></clipPath><g clipPath="url(#R)"><GreenGold t={t} /></g></g>
      <Rf x={178} y={0} w={4} h={640} c="#f6efdc" />
      <PixG rows={veiled(ROBE_BIBLE)} palette={PAL} x={58} y={380} s={4} smooth />
      <PixG rows={veiled(ROBE_QURAN)} palette={PAL} x={238} y={380} s={4} smooth />
      <Light x={90} y={330} r={9} t={t} />
      <Light x={270} y={330} r={9} t={t + 1} />
    </Stage>
  );
};

const MushafTitle: React.FC<{open?: boolean}> = ({open = true}) => {
  const t = useT();
  const o = open ? ez(t, 0, 0.8, 0.1, 1) : 1;
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1.2, 1.05), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <g shapeRendering="auto"><circle cx={180} cy={400} r={200} fill="#f9c440" opacity={0.15} /></g>
      <Rf x={180 - 140 * o} y={250} w={140 * o} h={300} c="#f6efdc" />
      <Rf x={180} y={250} w={140 * o} h={300} c="#efe5cc" />
      <Rf x={176} y={250} w={8} h={300} c="#24503a" />
    </Stage>
  );
};

const BookOpen: React.FC<{quran?: boolean}> = ({quran}) => {
  const t = useT();
  const o = ez(t, 0, 0.9, 0.05, 1);
  return (
    <Stage cam={cam(ez(t, 0, 1.2, 1.25, 1.1), 180, 400)}>
      {quran ? <GreenGold t={t} /> : <StainedGlass t={t} dim={0.3} />}
      <Rf x={180 - 130 * o} y={260} w={130 * o} h={280} c={quran ? '#f6efdc' : '#efe6d4'} />
      <Rf x={180} y={260} w={130 * o} h={280} c={quran ? '#efe5cc' : '#e6dcc6'} />
      <Rf x={176} y={260} w={8} h={280} c={quran ? '#24503a' : '#5a1f1a'} />
    </Stage>
  );
};

const Nazareth: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.3, 1, 1.12), 180, 470)}>
      <Village />
      <PixG rows={veiled(ROBE_BIBLE)} palette={PAL} x={ez(t, 0, 3.3, 60, 130)} y={420} s={3.6} smooth />
      <PixG rows={villager('b', Math.floor(t * 5) % 2)} palette={PAL} x={250} y={470} s={6} smooth />
    </Stage>
  );
};

const Annunciation: React.FC<{quran?: boolean; many?: boolean}> = ({quran, many}) => {
  const t = useT();
  const burst = ez(t, 0, 1, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 5, 1.05, 1.2), 180, 420)}>
      {quran ? <GreenGold t={t} /> : <StainedGlass t={t} dim={0.35} />}
      <g shapeRendering="auto" opacity={0.3 * burst}>{Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2 + t * 0.3; return <polygon key={i} points={`180,250 ${180 + Math.cos(a) * 500},${250 + Math.sin(a) * 500} ${180 + Math.cos(a + 0.1) * 500},${250 + Math.sin(a + 0.1) * 500}`} fill="#fff6d0" />; })}</g>
      {many
        ? [0, 1, 2].map((i) => <Light key={i} x={100 + i * 80} y={240 + (i % 2) * 30} r={14 * burst} t={t + i} />)
        : <Light x={180} y={250} r={20 * burst} t={t} />}
      <PixG rows={veiled(quran ? ROBE_QURAN : ROBE_BIBLE, true)} palette={PAL} x={148} y={440} s={4} smooth />
    </Stage>
  );
};

const JosephNight: React.FC<{dream?: boolean}> = ({dream}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.6, 1, 1.15), 180, 460)}>
      <Village night />
      {Array.from({length: 30}, (_, i) => <Rf key={i} x={random('s' + i) * 356} y={random('sy' + i) * 300} w={2} h={2} c="#f6efdc" o={0.5 + 0.5 * Math.sin(t * 2 + i)} />)}
      {dream
        ? <><g transform="translate(120 520) rotate(-90)"><PixG rows={villager('b', 0)} palette={PAL} s={6} smooth /></g><Light x={180} y={360} r={ez(t, 0, 1, 4, 16)} t={t} /></>
        : <PixG rows={villager('b', Math.floor(t * 4) % 2)} palette={PAL} x={ez(t, 0, 2.6, 160, 300)} y={470} s={6} smooth />}
    </Stage>
  );
};

const Bethlehem: React.FC = () => {
  const t = useT();
  const door = ez(t, 0.3, 1.4, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 5, 1.15, 1), 180, 460)}>
      <Village night />
      <g shapeRendering="auto"><circle cx={260} cy={110} r={14} fill="#fff4c2" /><circle cx={260} cy={110} r={46} fill="#fff4c2" opacity={0.2} /></g>
      <Rf x={40} y={360} w={120} h={160} c="#4a3a2a" />
      <Rf x={80} y={430} w={40} h={90} c="#f9c440" />
      <Rf x={80} y={430} w={40 * door} h={90} c="#3a2a1e" />
      <Rf x={210} y={470} w={110} h={50} c="#6e4a2a" />
      <Rf x={214} y={460} w={102} h={12} c="#c9a466" />
      <Light x={265} y={455} r={10} t={t} />
      <PixG rows={veiled(ROBE_BIBLE, true)} palette={PAL} x={190} y={450} s={3} smooth />
    </Stage>
  );
};

const MotherDua: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 5, 1.05, 1.2), 180, 450)}>
      <GreenGold t={t} />
      <PixG rows={veiled('P', true)} palette={PAL} x={120} y={440} s={4.5} smooth />
      <Light x={240} y={ez(t, 0, 2, 480, 380)} r={ez(t, 0, 2, 4, 12)} t={t} />
    </Stage>
  );
};

const PrayerChamber: React.FC = () => {
  const t = useT();
  const fruit = ez(t, 1.4, 2.4, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 5.8, 1, 1.15), 180, 430)}>
      <Rf x={0} y={0} w={360} h={640} c="#2a3a2e" />
      <g shapeRendering="auto"><path d="M90 560 L90 300 Q180 180 270 300 L270 560 Z" fill="#e8dcc0" /><path d="M110 560 L110 310 Q180 210 250 310 L250 560 Z" fill="#cdb88e" /></g>
      <Rf x={0} y={540} w={360} h={100} c="#24503a" />
      <PixG rows={veiled(ROBE_QURAN, true)} palette={PAL} x={150} y={460} s={3.6} smooth />
      {[0, 1, 2, 3, 4].map((i) => <g key={i} opacity={fruit}><Rf x={130 + i * 22} y={520} w={14} h={12} c={['#c4303a', '#f9a23a', '#7a2a5a', '#d4a73a', '#c4303a'][i]} /><Rf x={135 + i * 22} y={516} w={4} h={4} c="#3f7a3a" /></g>)}
      <Light x={ez(t, 0, 1.4, 380, 300)} y={440} r={11} t={t} />
    </Stage>
  );
};

const ParallelShot: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(1, 180, 400)}>
      <g><clipPath id="L2"><rect x={0} y={0} width={180} height={640} /></clipPath><g clipPath="url(#L2)"><StainedGlass t={t} dim={0.4} /></g></g>
      <g><clipPath id="R2"><rect x={180} y={0} width={180} height={640} /></clipPath><g clipPath="url(#R2)"><GreenGold t={t} /></g></g>
      <Rf x={178} y={0} w={4} h={640} c="#f6efdc" />
      <PixG rows={veiled(ROBE_BIBLE, true)} palette={PAL} x={60} y={500} s={3.4} smooth />
      <PixG rows={veiled(ROBE_QURAN, true)} palette={PAL} x={240} y={500} s={3.4} smooth />
    </Stage>
  );
};

const PalmAlone: React.FC<{stream?: boolean}> = ({stream}) => {
  const t = useT();
  const s = stream ? ez(t, 0.3, 1.6, 0, 1) : 0;
  return (
    <Stage cam={cam(ez(t, 0, 4.4, 1, 1.15), 180, 450)}>
      <Desert t={t} />
      <Palm x={200} y={500} t={t} />
      {s > 0 && <><Rf x={0} y={540} w={360 * s} h={12} c="#7ac4e6" /><Rf x={0} y={544} w={360 * s} h={3} c="#cfefff" /></>}
      {stream && Array.from({length: 8}, (_, i) => { const tt = t - 0.8 - i * 0.2; if (tt < 0) return null; return <Rf key={i} x={196 + (i % 4) * 10} y={Math.min(520, 290 + tt * tt * 500)} w={7} h={9} c="#6a2a1a" />; })}
      <PixG rows={veiled(ROBE_QURAN, true)} palette={PAL} x={150} y={460} s={3.6} smooth />
    </Stage>
  );
};

const Accused: React.FC<{point?: boolean}> = ({point}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.5, 1.05, 1.2), 180, 470, point ? 0 : Math.sin(t * 30) * 1.5)}>
      <Village />
      {Array.from({length: 5}, (_, i) => <PixG key={i} rows={villager(['b', 'r', 'M', 'n', 'c'][i], 0)} palette={PAL} x={200 + (i % 3) * 50} y={460 + Math.floor(i / 3) * 40 - Math.abs(Math.sin(t * 8 + i)) * 4} s={5} smooth />)}
      <PixG rows={veiled(ROBE_QURAN, false, point)} palette={PAL} x={60} y={410} s={3.8} smooth />
      {point && <Light x={70} y={470} r={8} t={t} />}
    </Stage>
  );
};

const CradleSpeaks: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.8, 1.15, 1.35), 180, 450)}>
      <Village />
      <Rf x={140} y={480} w={80} h={30} c="#6e4a2a" />
      <Light x={180} y={470} r={13} t={t} />
      <g shapeRendering="auto">{Array.from({length: 3}, (_, i) => { const r = (t * 70 + i * 50) % 150; return <circle key={i} cx={180} cy={470} r={r} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.6 * (1 - r / 150)} />; })}</g>
      {Array.from({length: 4}, (_, i) => <PixG key={i} rows={villager(['b', 'r', 'M', 'n'][i], 0)} palette={PAL} x={i < 2 ? 20 + i * 40 : 260 + (i - 2) * 40} y={470} s={4.5} smooth />)}
    </Stage>
  );
};

const Honor: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.1, 1), 180, 400)}>
      <g><clipPath id="L3"><rect x={0} y={0} width={180} height={640} /></clipPath><g clipPath="url(#L3)"><StainedGlass t={t} /></g></g>
      <g><clipPath id="R3"><rect x={180} y={0} width={180} height={640} /></clipPath><g clipPath="url(#R3)"><GreenGold t={t} /></g></g>
      <Rf x={178} y={0} w={4} h={640} c="#f6efdc" />
      <g shapeRendering="auto"><circle cx={180} cy={420} r={150} fill="#fff6d0" opacity={0.15 + 0.05 * Math.sin(t * 3)} /></g>
      <PixG rows={veiled(ROBE_BIBLE)} palette={PAL} x={70} y={380} s={4} smooth />
      <PixG rows={veiled(ROBE_QURAN)} palette={PAL} x={226} y={380} s={4} smooth />
    </Stage>
  );
};

// ---------- overlays ----------
const SplitLabels: React.FC = () => (
  <div style={{position: 'absolute', top: 1560, left: 0, right: 0, display: 'flex', fontFamily: nunito}}>
    <div style={{flex: 1, textAlign: 'center'}}><div style={{display: 'inline-block', background: '#1b2a5a', color: '#f6efdc', fontWeight: 900, fontSize: 62, padding: '14px 30px', border: '6px solid #f6efdc'}}>MARY<div style={{fontSize: 34, letterSpacing: 4}}>BIBLE</div></div></div>
    <div style={{flex: 1, textAlign: 'center'}}><div style={{display: 'inline-block', background: '#24503a', color: '#f6efdc', fontWeight: 900, fontSize: 62, padding: '14px 30px', border: '6px solid #d4a73a'}}>MARYAM<div style={{fontSize: 34, letterSpacing: 4, color: '#d4a73a'}}>QURAN</div></div></div>
  </div>
);
const SectionChip: React.FC<{quran?: boolean}> = ({quran}) => (
  <div style={{position: 'absolute', top: 50, width: '100%', textAlign: 'center', fontFamily: nunito}}>
    <span style={{background: quran ? '#24503a' : '#1b2a5a', color: '#f6efdc', fontWeight: 900, fontSize: 40, letterSpacing: 4, padding: '12px 30px', border: `5px solid ${quran ? '#d4a73a' : '#f6efdc'}`}}>{quran ? 'IN THE QURAN' : 'IN THE BIBLE'}</span>
  </div>
);
// Bible verse card: navy, serif italic, KJV label. Visually distinct from the Quran's ayah card.
const VerseCard: React.FC<{ref_: string; text: string; gold?: string}> = ({ref_, text, gold}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const parts = gold ? text.split(gold) : [text];
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f3ecdf', border: '10px double #1b2a5a', padding: '22px 34px 28px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#4a5a7a', letterSpacing: 2}}>{ref_} · KJV</div>
      <div style={{fontFamily: garamond, fontWeight: 600, fontSize: 60, color: '#1b2a5a', lineHeight: 1.15, marginTop: 8}}>“{parts[0]}{gold && <span style={{color: '#8a2a3a'}}>{gold}</span>}{parts[1] ?? ''}”</div>
    </div>
  );
};
const ParallelCard: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13}});
  return (
    <div style={{position: 'absolute', top: 140, left: 40, right: 40, opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`, display: 'flex', flexDirection: 'column', gap: 24}}>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 52, color: '#f6efdc', textAlign: 'center', textShadow: '0 4px 0 rgba(0,0,0,.5)'}}>THE SAME QUESTION</div>
      <div style={{background: '#f3ecdf', border: '8px double #1b2a5a', padding: '16px 24px', textAlign: 'center'}}>
        <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 26, color: '#4a5a7a', letterSpacing: 2}}>LUKE 1:34 · KJV</div>
        <div style={{fontFamily: garamond, fontWeight: 600, fontSize: 48, color: '#1b2a5a'}}>“How shall this be, seeing I know not a man?”</div>
      </div>
      <div style={{background: '#f6efdc', border: '8px double #24503a', padding: '16px 24px', textAlign: 'center'}}>
        <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 26, color: '#5b6a60', letterSpacing: 2}}>SURAH MARYAM · 19:20</div>
        <div style={{fontFamily: QURAN_FONT, fontSize: 52, lineHeight: 1.8, color: '#24503a', direction: 'rtl'}}>{ayat['19:20'].words.slice(0, 8).join(' ')} …</div>
        <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 40, color: '#1d2b24'}}>“How can I have a boy while no man has touched me?”</div>
      </div>
    </div>
  );
};
const SurahMaryamTitle: React.FC = () => (
  <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '22px 26px 26px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
    <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 84, color: '#24503a', lineHeight: 1}}>SURAH MARYAM</div>
    <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 40, color: '#b8862a', marginTop: 10}}>Chapter 19 · named after her</div>
  </div>
);

// ---------- timeline (seconds from the narration's word timestamps) ----------
type Seg = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
const SHOTS: Seg[] = [
  [0, 6.9, <HookSplit />],
  [6.9, 9.5, <MushafTitle />, 'zoom'],
  [9.5, 10.7, <BookOpen />, 'whip'],
  [10.7, 14.0, <Nazareth />, 'zoom'],
  [14.0, 19.3, <Annunciation />, 'whip'],
  [19.3, 22.5, <Annunciation />],
  [22.5, 25.4, <Annunciation />],
  [25.4, 28.2, <JosephNight />, 'whip'],
  [28.2, 30.6, <JosephNight dream />, 'zoom'],
  [30.6, 35.6, <Bethlehem />, 'whip'],
  [35.6, 36.7, <BookOpen quran />, 'zoom'],
  [36.7, 41.8, <MotherDua />, 'whip'],
  [41.8, 47.6, <PrayerChamber />, 'zoom'],
  [47.6, 54.5, <Annunciation quran many />, 'whip'],
  [54.5, 58.4, <ParallelShot />, 'zoom'],
  [58.4, 62.3, <PalmAlone />, 'whip'],
  [62.3, 66.7, <PalmAlone stream />],
  [66.7, 69.1, <Accused />, 'whip'],
  [69.1, 70.4, <Accused point />],
  [70.4, 74.2, <CradleSpeaks />, 'zoom'],
  [74.2, 78.2, <Honor />, 'whip'],
  [78.2, 80.6, <MushafTitle open={false} />, 'zoom'],
];
const OVERLAYS: Seg[] = [
  [0, 2.6, <Caption instant text="*Mary* in the Bible. *Maryam* in the Quran." size={66} />],
  [2.6, 6.9, <Caption text="Same woman. Same miracle. But the two books tell her story *very differently*." size={56} />],
  [0, 6.9, <SplitLabels />],
  [6.9, 9.5, <Caption text="And only one has a *whole chapter* named after her." />],
  [9.5, 35.6, <SectionChip />],
  [10.7, 14.0, <Caption text="A young woman in *Nazareth*, engaged to a man named *Joseph*." />],
  [14.0, 19.3, <VerseCard ref_="LUKE 1:28" text="Hail, thou that art highly favoured… blessed art thou among women." gold="highly favoured" />],
  [19.3, 22.5, <VerseCard ref_="LUKE 1:34" text="How shall this be, seeing I know not a man?" />],
  [22.5, 25.4, <VerseCard ref_="LUKE 1:38" text="Behold the handmaid of the Lord." gold="handmaid of the Lord" />],
  [25.4, 30.6, <Caption text="Joseph plans to quietly end the engagement, until an angel tells him *in a dream* to take Mary as his wife." size={50} />],
  [30.6, 35.6, <VerseCard ref_="LUKE 2:7" text="…and laid him in a manger; because there was no room for them in the inn." gold="no room for them in the inn" />],
  [35.6, 74.2, <SectionChip quran />],
  [35.6, 36.7, <Caption text="Now, *the Quran*." size={80} />],
  [36.7, 41.8, <Caption text="Her story begins *before she was born*. Her mother dedicated her to Allah, and named her Mary." size={52} />],
  [41.8, 46.0, <Caption text="Every time *Zakariya* came into her prayer chamber, he found provision with her." size={54} />],
  [46.0, 47.6, <AyahCard refKey="3:37" range={[22, 26]} gold={[23, 24, 25, 26]} partial tr="*It is from Allah*" />],
  [47.6, 54.5, <AyahCard refKey="3:42" range={[3, 11]} gold={[6, 7]} partial trSize={40} tr="O Mary, indeed Allah *has chosen you and purified you*, and chosen you above the women of the worlds" />],
  [54.5, 58.4, <ParallelCard />],
  [58.4, 62.3, <Caption text="There is *no Joseph*. She is alone, in pain, under a palm tree." />],
  [62.3, 66.7, <AyahCard refKey="19:24" range={[3, 9]} gold={[3, 4]} partial tr="*Do not grieve*; your Lord has provided beneath you a stream" />],
  [66.7, 69.1, <Caption text="When her people accuse her, she doesn't say *a word*." />],
  [69.1, 70.4, <Caption text="She *points to the baby*." />],
  [70.4, 74.2, <AyahCard refKey="19:30" range={[0, 3]} gold={[2, 3]} partial tr="Indeed, I am *the servant of Allah*" />],
  [74.2, 78.2, <Caption text="Both books honor her. But in the Quran, she is the *only woman mentioned by name*." size={54} />],
  [78.2, 80.6, <SurahMaryamTitle />],
];
const FLASHES = [6.9, 14.0, 35.6, 54.5, 70.4];
const END_START = 80.6;

export const Maryam: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SHOTS.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {OVERLAYS.map(([a, b, el], i) => <Sequence key={'o' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {FLASHES.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(END_START)} durationInFrames={F(MR_DURATION) - F(END_START)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile('audio/maryam-narration.mp3')} />
  </AbsoluteFill>
);
