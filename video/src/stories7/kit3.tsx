import React from 'react';
import {random} from 'remotion';
import {PixG} from '../components/Pix';
import {PAL, villager, SHADOW} from '../alfil/sprites';
import {AMIR} from '../characters/amir';
import {Stage, Rf, cam, ez, useT, Light} from '../fx/fx';
import {Bands, Stars, nunito, NIGHT_SKY, DUSK_SKY, DAWN_SKY} from '../fx/scenes';

// Hook-test batch (Nov 24): five different hook STYLES on five different stories.
// All hook text is readable on frame 1.

// TikTok-native text: white text with black outline, no card. label: small tag above (e.g. "POV:").
export const NativeText: React.FC<{text: string; top?: number; size?: number; label?: string; color?: string}> = ({text, top = 300, size = 76, label, color = '#ffffff'}) => (
  <div style={{position: 'absolute', top, left: 60, right: 60, textAlign: 'center', fontFamily: nunito, fontWeight: 900, color, fontSize: size, lineHeight: 1.12, WebkitTextStroke: '3px #000', paintOrder: 'stroke fill', textShadow: '0 6px 0 rgba(0,0,0,.6)'}}>
    {label && <div style={{fontSize: size * 0.9, color: '#f9d77a'}}>{label}</div>}
    {text}
  </div>
);
// Banner + fact ("DID YOU KNOW?").
export const FactBanner: React.FC<{banner: string; text: string}> = ({banner, text}) => {
  const parts = text.split('*');
  return (
    <div style={{position: 'absolute', top: 260, left: 70, right: 70, textAlign: 'center', fontFamily: nunito, fontWeight: 900}}>
      <div style={{display: 'inline-block', background: '#b8862a', color: '#fff', fontSize: 56, padding: '10px 30px', transform: 'rotate(-3deg)', boxShadow: '0 8px 0 rgba(0,0,0,.3)'}}>{banner}</div>
      <div style={{marginTop: 30, background: '#f6efdc', border: '10px double #24503a', padding: '26px 30px', fontSize: 70, lineHeight: 1.1, color: '#1d2b24', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}</div>
    </div>
  );
};

const Tears: React.FC<{t: number; x: number; y: number}> = ({t, x, y}) => <>{Array.from({length: 5}, (_, i) => { const life = (t * 0.8 + i / 5) % 1; return <Rf key={i} x={x + (i % 2 ? 6 : -6)} y={y + life * 50} w={3} h={5} c="#a6e2f5" o={(1 - life) * 0.9} />; })}</>;
// A room in Madinah: the Prophet ﷺ as light, Ibn Mas'ud (faceless) reciting from a page. tears: light drops below the light.
export const Recital: React.FC<{tears?: boolean; z?: [number, number]}> = ({tears, z = [1.05, 1.2]}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, z[0], z[1]), 180, 460)}>
      <Rf x={0} y={0} w={360} h={640} c="#3a2e26" />
      {Array.from({length: 8}, (_, i) => <Rf key={i} x={i * 48} y={0} w={4} h={640} c="#32281f" />)}
      <Rf x={0} y={500} w={360} h={140} c="#6e4a2a" /><Rf x={30} y={494} w={300} h={12} c="#8a2a2a" />
      <Light x={110} y={440} r={13} t={t} />
      {tears && <Tears t={t} x={110} y={458} />}
      <PixG rows={villager('c', 0)} palette={PAL} x={230} y={448} s={6} smooth />
      <Rf x={222} y={466} w={18} h={12} c="#f6efdc" />
    </Stage>
  );
};
// Night: Amir alone, hands raised, seen from behind. (POV)
export const AmirNightBack: React.FC<{dawn?: boolean}> = ({dawn}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.25, 1.1), 180, 460)}>
      <Bands c={dawn ? DAWN_SKY : NIGHT_SKY} />
      {!dawn && <Stars t={t} n={80} h={420} />}
      <g shapeRendering="auto"><circle cx={260} cy={170} r={22} fill={dawn ? '#fff1a0' : '#f6efdc'} opacity={0.9} /></g>
      <Rf x={0} y={500} w={360} h={140} c={dawn ? '#c9a466' : '#221c2e'} />
      <PixG rows={AMIR.poses.back} palette={PAL} x={160} y={420} s={3} smooth />
    </Stage>
  );
};
// An old man's prayer: Zakariya as light (a prophet) in the prayer chamber, white glow rising.
export const Zakariya: React.FC<{answer?: boolean}> = ({answer}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.25), 180, 440)}>
      <Rf x={0} y={0} w={360} h={640} c={answer ? '#2a3a30' : '#1e1a26'} />
      <g shapeRendering="auto"><path d="M90 520 L90 260 Q180 150 270 260 L270 520 Z" fill={answer ? '#3a5040' : '#2a2434'} /></g>
      <Rf x={0} y={520} w={360} h={120} c="#3a2e2a" />
      <Light x={180} y={430} r={answer ? 15 : 11} t={t} />
      {Array.from({length: 12}, (_, i) => { const life = (t * 0.5 + i / 12) % 1; return <Rf key={i} x={160 + random('zk' + i) * 40} y={420 - life * 320} w={2} h={6} c="#fff6d0" o={(1 - life) * (answer ? 1 : 0.6)} />; })}
      {answer && <g shapeRendering="auto"><circle cx={180} cy={430} r={110 * ez(t, 0, 1.2, 0, 1)} fill="#fff6d0" opacity={0.15} /></g>}
    </Stage>
  );
};
// Makkah street at dusk: Umar (faceless, dark red) striding with a sword.
const umar = (step: number) => villager('R', step);
export const Stride: React.FC<{cold?: boolean}> = ({cold}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, cold ? 1.5 : 1.1, cold ? 1.3 : 1.2), 180, 470, cold ? Math.sin(t * 30) * 1.5 : 0)}>
      <Bands c={DUSK_SKY} />
      {[0, 80, 160, 240, 320].map((x, i) => <Rf key={i} x={x - (t * 30) % 80} y={340 + (i % 2) * 30} w={66} h={200} c={i % 2 ? '#4a3a44' : '#5a4650'} />)}
      <Rf x={0} y={520} w={360} h={120} c="#3a2e30" />
      <PixG rows={umar(Math.floor(t * 6) % 2)} palette={PAL} x={160} y={440} s={10} smooth />
      <g transform={`translate(200 ${470 + Math.sin(t * 12) * 2}) rotate(-20)`}><Rf x={0} y={-4} w={70} h={5} c="#c8ccd2" /><Rf x={-8} y={-8} w={8} h={13} c="#5a3a22" /></g>
    </Stage>
  );
};
// His sister's house: the page of Quran glowing on the floor.
export const SisterHouse: React.FC<{read?: boolean}> = ({read}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.5, read ? 1.3 : 1.05, read ? 1.6 : 1.2), read ? 180 : 180, 470)}>
      <Rf x={0} y={0} w={360} h={640} c="#2e2420" />
      <Rf x={0} y={500} w={360} h={140} c="#5a4232" />
      <g shapeRendering="auto"><circle cx={180} cy={480} r={80} fill="#fff6d0" opacity={0.15 + (read ? 0.15 : 0)} /></g>
      <Rf x={160} y={470} w={40} h={26} c="#f6efdc" />{Array.from({length: 4}, (_, i) => <Rf key={i} x={164} y={474 + i * 5} w={32} h={2} c="#b8862a" />)}
      <PixG rows={umar(0)} palette={PAL} x={70} y={420} s={8} smooth />
      {!read && <PixG rows={villager('P', 0)} palette={PAL} x={250} y={436} s={7} smooth />}
    </Stage>
  );
};
// Maryam: veiled figure seen from behind in the prayer chamber, with fruit glowing beside her.
const maryamBack = [
  '.nnnn.', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', 'nnnnnn', '.nnnn.',
];
export const Mihrab: React.FC<{fruit?: boolean; visitor?: boolean}> = ({fruit = true, visitor}) => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 450)}>
      <Rf x={0} y={0} w={360} h={640} c="#1f3a34" />
      <g shapeRendering="auto"><path d="M80 520 L80 250 Q180 130 280 250 L280 520 Z" fill="#163029" /><path d="M80 520 L80 250 Q180 130 280 250 L280 520" fill="none" stroke="#d4a73a" strokeWidth={4} /></g>
      <Rf x={0} y={520} w={360} h={120} c="#7a2a2a" />
      <PixG rows={maryamBack} palette={PAL} x={156} y={440} s={8} smooth />
      {fruit && <g shapeRendering="auto"><circle cx={240} cy={510} r={30} fill="#f9c440" opacity={0.18 + 0.05 * Math.sin(t * 3)} /><circle cx={232} cy={510} r={8} fill="#c8402a" /><circle cx={248} cy={508} r={8} fill="#e0a030" /><circle cx={240} cy={498} r={7} fill="#6a9a3a" /></g>}
      {visitor && <Light x={60} y={450} r={10} t={t} />}
    </Stage>
  );
};
// The sun rising in the west: horizon turned the wrong way, crowds frozen.
export const WestSun: React.FC<{crowd?: boolean; rise?: [number, number]}> = ({crowd, rise = [0, 1]}) => {
  const t = useT();
  const p = ez(t, 0, 4, rise[0], rise[1]);
  return (
    <Stage cam={cam(ez(t, 0, 4, 1.15, 1.05), 180, 440, Math.sin(t * 25) * (crowd ? 1 : 0))}>
      <Bands c={['#1a0f1e', '#3a1428', '#6a1e2a', '#a8342a', '#e06a2a']} />
      <g shapeRendering="auto"><circle cx={70} cy={520 - p * 230} r={60} fill="#ff9a4a" opacity={0.25} /><circle cx={70} cy={520 - p * 230} r={34} fill="#ffcc6a" /></g>
      <Rf x={0} y={500} w={360} h={140} c="#140a10" />
      <div />
      {crowd && Array.from({length: 10}, (_, i) => <PixG key={i} rows={villager('M', 0)} palette={SHADOW} x={20 + i * 34} y={470 + (i % 2) * 8} s={5} smooth />)}
    </Stage>
  );
};
export const DoorClosing: React.FC = () => {
  const t = useT();
  const c = ez(t, 0.3, 2.5, 0, 1);
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.05, 1.25), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0c0a10" />
      <Rf x={110} y={200} w={140} h={300} c="#fff6d0" o={0.9} />
      <g shapeRendering="auto"><circle cx={180} cy={350} r={160} fill="#fff6d0" opacity={0.12 * (1 - c)} /></g>
      <Rf x={110} y={200} w={70 * c} h={300} c="#3a2a22" /><Rf x={250 - 70 * c} y={200} w={70 * c} h={300} c="#3a2a22" />
      <Rf x={100} y={190} w={160} h={10} c="#5a3a22" /><Rf x={100} y={190} w={10} h={320} c="#5a3a22" /><Rf x={250} y={190} w={10} h={320} c="#5a3a22" />
    </Stage>
  );
};
export const OpenDoor: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3, 1.25, 1.05), 180, 400)}>
      <Bands c={DAWN_SKY} />
      <Rf x={110} y={200} w={140} h={300} c="#fff6d0" />
      <g shapeRendering="auto"><circle cx={180} cy={350} r={170} fill="#fff6d0" opacity={0.2 + 0.05 * Math.sin(t * 3)} /></g>
      <Rf x={100} y={190} w={160} h={10} c="#5a3a22" /><Rf x={100} y={190} w={10} h={320} c="#5a3a22" /><Rf x={250} y={190} w={10} h={320} c="#5a3a22" />
      <Rf x={0} y={500} w={360} h={140} c="#c9a466" />
      <PixG rows={AMIR.poses.back} palette={PAL} x={164} y={430} s={2.6} smooth />
    </Stage>
  );
};
