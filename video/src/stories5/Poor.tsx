import React from 'react';
import {PixG} from '../components/Pix';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {PAL, villager} from '../alfil/sprites';
import {leader} from '../abasa/Abasa';
import {Stage, Rf, cam, ez, Light, useT} from '../fx/fx';
import {Bands, Stars, GlowTitle, Punch, NIGHT_SKY, DAWN_SKY, nunito} from '../fx/scenes';
import {Timeline, Shot, Overlay} from '../fx/Timeline';

export const PO_DURATION = 41.4;
const LEADERS = ['r', 'n', 'P'];
const POOR = ['C', 'b', 'M'];

// The Prophet ﷺ is only ever light; companions and Quraysh are faceless.
const Hall: React.FC = () => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#3a2a1e" />
    {Array.from({length: 8}, (_, i) => <Rf key={i} x={0} y={i * 70} w={360} h={2} c="#2e2118" />)}
    <Rf x={0} y={500} w={360} h={140} c="#8a6a42" />
  </>
);
const Split: React.FC<{lean?: number; laugh?: boolean; beam?: number}> = ({lean = 0, laugh, beam = 0}) => {
  const t = useT();
  return (
    <>
      <Hall />
      {beam > 0 && <g shapeRendering="auto" opacity={0.35 * beam}><polygon points="220,0 340,0 360,640 200,640" fill="#fff6d0" /></g>}
      {LEADERS.map((c, i) => <PixG key={i} rows={leader(c)} palette={PAL} x={8 + i * 46} y={410 - (laugh ? Math.abs(Math.sin(t * 12 + i)) * 10 : 0)} s={4.4} smooth />)}
      {POOR.map((c, i) => <PixG key={'p' + i} rows={villager(c, 0)} palette={PAL} x={226 + i * 44} y={410} s={8} smooth />)}
      <Light x={180 - lean * 40} y={340} r={13} t={t} />
    </>
  );
};

const Hook: React.FC = () => { const t = useT(); return <Stage cam={cam(ez(t, 0, 5.3, 1, 1.1), 180, 460)}><Split /></Stage>; };
const Names: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 2.9, 1.3, 1.45), 270, 450)}>
      <Split />
    </Stage>
  );
};
const SevenHeavens: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 4.1, 1.4, 1), 180, 200)}>
      <Bands c={NIGHT_SKY} />
      <Stars t={t} n={120} />
      <g shapeRendering="auto">{Array.from({length: 7}, (_, i) => <ellipse key={i} cx={180} cy={120 + i * 50} rx={60 + i * 30} ry={14 + i * 4} fill="none" stroke="#f9c440" strokeOpacity={0.35 + 0.1 * Math.sin(t * 3 - i)} strokeWidth={3} />)}</g>
      <g shapeRendering="auto" opacity={ez(t, 1, 3, 0, 0.5)}><polygon points="170,100 190,100 230,640 130,640" fill="#fff6d0" /></g>
    </Stage>
  );
};
const DriveAway: React.FC = () => { const t = useT(); return <Stage cam={cam(ez(t, 0, 4.1, 1.1, 1.25), 100, 450, Math.sin(t * 30) * 1.5)}><Split laugh /></Stage>; };
const Considered: React.FC = () => { const t = useT(); return <Stage cam={cam(1.15, 180, 420)}><Split lean={Math.sin(Math.min(t, 3) * 0.9)} /></Stage>; };
const Revealed: React.FC = () => { const t = useT(); return <Stage cam={cam(ez(t, 0, 6.6, 1.05, 1.2), 270, 440)}><Split beam={ez(t, 0, 1, 0, 1)} /></Stage>; };
const Scale: React.FC = () => {
  const t = useT();
  const tilt = 14 * Math.cos(t * 1.2) * Math.max(0, 1 - t / 4);
  return (
    <Stage cam={cam(ez(t, 0, 5.2, 1.1, 1), 180, 400)}>
      <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
      <Rf x={176} y={260} w={8} h={300} c="#d4a73a" /><Rf x={130} y={550} w={100} h={14} c="#d4a73a" />
      <g transform={`translate(180 270) rotate(${tilt})`}>
        <Rf x={-140} y={-4} w={280} h={8} c="#d4a73a" />
        <Rf x={-150} y={0} w={2} h={90} c="#d4a73a" /><Rf x={-130} y={0} w={2} h={90} c="#d4a73a" /><Rf x={-170} y={90} w={60} h={10} c="#d4a73a" />
        <Rf x={130} y={0} w={2} h={90} c="#d4a73a" /><Rf x={150} y={0} w={2} h={90} c="#d4a73a" /><Rf x={110} y={90} w={60} h={10} c="#d4a73a" />
      </g>
    </Stage>
  );
};
const Legacy: React.FC = () => {
  const t = useT();
  return (
    <Stage cam={cam(ez(t, 0, 3.6, 1.15, 1), 180, 420)}>
      <Bands c={DAWN_SKY} />
      <Rf x={160} y={200} w={40} h={360} c="#e9dfc8" /><Rf x={150} y={190} w={60} h={14} c="#d4a73a" /><Rf x={170} y={150} w={20} h={40} c="#2f6b4a" />
      <g shapeRendering="auto">{Array.from({length: 3}, (_, i) => { const r = (t * 60 + i * 40) % 140; return <circle key={i} cx={180} cy={190} r={r} fill="none" stroke="#fff6d0" strokeWidth={3} opacity={0.6 * (1 - r / 140)} />; })}</g>
      <Rf x={0} y={560} w={360} h={80} c="#a8885e" />
    </Stage>
  );
};
const Equal: React.FC = () => {
  const t = useT();
  const m = ez(t, 0.3, 1.8, 0, 1);
  return (
    <Stage cam={cam(1.05, 180, 420)}>
      <Rf x={0} y={0} w={360} h={640} c="#1a1830" />
      <Stars t={t} n={40} />
      {[...LEADERS, ...POOR].map((c, i) => (
        <g key={i}>
          <g opacity={1 - m}>{i < 3 ? <PixG rows={leader(c)} palette={PAL} x={14 + i * 58} y={420} s={4} smooth /> : <PixG rows={villager(c, 0)} palette={PAL} x={14 + i * 58} y={420} s={7} smooth />}</g>
          <g opacity={m}><Light x={36 + i * 58} y={460} r={10} t={t + i} /></g>
        </g>
      ))}
    </Stage>
  );
};

const NameTags: React.FC = () => (
  <div style={{position: 'absolute', top: 820, left: 520, right: 0, display: 'flex', flexDirection: 'column', gap: 18, fontFamily: nunito}}>
    {['BILAL', "IBN MAS'UD", "SA'D"].map((n, i) => <div key={i} style={{background: '#f6efdc', border: '6px solid #24503a', color: '#24503a', fontWeight: 900, fontSize: 48, padding: '8px 22px', width: 'fit-content'}}>{n}</div>)}
  </div>
);

const SHOTS: Shot[] = [
  [0, 5.3, <Hook />],
  [5.3, 8.2, <Names />, 'zoom'],
  [8.2, 12.3, <SevenHeavens />, 'whip'],
  [12.3, 16.4, <DriveAway />, 'whip'],
  [16.4, 20.7, <Considered />, 'zoom'],
  [20.7, 27.3, <Revealed />],
  [27.3, 32.5, <Scale />, 'whip'],
  [32.5, 36.1, <Legacy />, 'zoom'],
  [36.1, 38.5, <Equal />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 5.3, <GlowTitle lines={['"SEND AWAY', 'THE POOR"']} sub="Quraysh's one condition to sit with *the Prophet ﷺ*" size={96} top={150} />],
  [5.3, 8.2, <Caption text="Men with *no wealth* and *no status*." />],
  [5.3, 8.2, <NameTags />],
  [8.2, 12.3, <Caption text="And Allah answered *from above the seven heavens*." />],
  [12.3, 16.4, <Caption text="“*Drive these men away*, so they don't dare to sit with us.”" />],
  [16.4, 20.7, <Caption text="The Prophet ﷺ wanted the leaders to accept Islam. *He considered it.*" />],
  [20.7, 27.3, <AyahCard refKey="6:52" range={[0, 8]} gold={[0, 1]} partial trSize={42} tr="*And do not send away* those who call upon their Lord morning and afternoon, seeking His countenance" />],
  [27.3, 32.5, <AyahCard refKey="6:52" range={[9, 20]} gold={[10, 12, 17]} partial trSize={40} tr="Not upon you is anything of *their account*, and not upon them is anything of *your account*" />],
  [32.5, 36.1, <Caption text="The men Quraysh looked down on are names we *still say with love* today." />],
  [33.2, 36.1, <Punch text="BILAL" top={980} size={110} />],
  [36.1, 38.5, <Caption text="Allah doesn't measure people *the way the world does*." />],
];

export const Poor: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[8.2, 20.7]} endStart={38.5} duration={PO_DURATION} audio="audio/poor-narration.mp3" />;
