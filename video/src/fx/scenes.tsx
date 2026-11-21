import React from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {QURAN_FONT} from '../components/AyahCard';
import {Rf} from './fx';
import ayat from '../data/ayat.json';

// Shared scenery + overlays for the 60fps story videos.
export const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

export const Bands: React.FC<{c: string[]}> = ({c}) => <>{c.map((col, i) => <Rf key={i} x={0} y={i * (640 / c.length)} w={360} h={i === c.length - 1 ? 640 : 640 / c.length + 1} c={col} />)}</>;
export const NIGHT_SKY = ['#0b1024', '#111833', '#18213f', '#1e2a4a', '#243256'];
export const DUSK_SKY = ['#2a1f3d', '#3a2a45', '#5a3448', '#7a4448', '#8a5448'];
export const DAWN_SKY = ['#7fb6e0', '#a9d2ea', '#f6d6a2', '#f6b77a', '#f39a5e'];
export const STORM_SKY = ['#0e1420', '#141c2c', '#1a2436', '#202c40', '#26344a'];

export const Stars: React.FC<{t: number; n?: number; h?: number}> = ({t, n = 60, h = 640}) => (
  <>{Array.from({length: n}, (_, i) => <Rf key={i} x={random('st' + i) * 356} y={random('sy' + i) * h} w={i % 9 === 0 ? 3 : 2} h={i % 9 === 0 ? 3 : 2} c="#f6efdc" o={0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + i))} />)}</>
);
export const Rain: React.FC<{t: number; n?: number; o?: number}> = ({t, n = 110, o = 0.5}) => (
  <>{Array.from({length: n}, (_, i) => { const y = (random('ry' + i) * 700 + t * 900) % 700 - 30; const x = ((random('rx' + i) * 380 - y * 0.25) % 380 + 380) % 380; return <Rf key={i} x={x} y={y} w={2} h={16} c="#9fb4cc" o={o} />; })}</>
);
export const Sea: React.FC<{t: number; level: number; amp?: number; c?: string; speed?: number}> = ({t, level, amp = 40, c = '#1f3a56', speed = 1}) => (
  <>{Array.from({length: 90}, (_, i) => { const x = i * 4; const y = level - amp * (0.6 * Math.sin(x / 40 + t * 2 * speed) + 0.4 * Math.sin(x / 17 - t * 3 * speed)); return <g key={i}><Rf x={x} y={y} w={4} h={700} c={c} /><Rf x={x} y={y} w={4} h={3} c="#8fb0cc" o={0.6} /></g>; })}</>
);
export const Ship: React.FC<{x: number; y: number; s?: number; tilt?: number}> = ({x, y, s = 1, tilt = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
    <Rf x={-80} y={-6} w={160} h={26} c="#6e4a2a" />
    <Rf x={-70} y={20} w={140} h={8} c="#5a3a22" />
    <Rf x={-3} y={-110} w={6} h={104} c="#4a3420" />
    <Rf x={-50} y={-100} w={46} h={70} c="#e8dcc0" />
    <Rf x={4} y={-100} w={42} h={60} c="#d8ccb0" />
    {[-60, -36, -12, 12, 36, 56].map((dx, i) => <Rf key={i} x={dx} y={-14} w={8} h={10} c="#2a2018" />)}
  </g>
);
// Side-view whale silhouette, facing left. glow: a light shining from inside.
export const Whale: React.FC<{x: number; y: number; s?: number; t: number; glow?: number; open?: number}> = ({x, y, s = 1, t, glow = 0, open = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} shapeRendering="auto">
    <path d={`M -120 0 Q -110 -50 -20 -55 Q 90 -55 140 -10 L 190 -45 L 180 0 L 190 45 L 140 10 Q 90 50 -20 50 Q -110 ${50 - open * 30} -120 ${8 + open * 20} Z`} fill="#16263a" />
    <path d="M -110 18 Q -20 40 120 14" stroke="#24384f" strokeWidth={6} fill="none" />
    {glow > 0 && <circle cx={10} cy={0} r={30 + 6 * Math.sin(t * 4)} fill="#fff6d0" opacity={0.25 * glow} />}
    {glow > 0 && <circle cx={10} cy={0} r={6} fill="#fffdf2" opacity={glow} />}
  </g>
);
export const Bubbles: React.FC<{t: number; n?: number}> = ({t, n = 30}) => (
  <g shapeRendering="auto">{Array.from({length: n}, (_, i) => { const life = (t * 0.4 + random('bb' + i)) % 1; return <circle key={i} cx={random('bx' + i) * 360 + Math.sin(t * 2 + i) * 6} cy={660 - life * 700} r={2 + random('br' + i) * 4} fill="none" stroke="#9fd0e8" strokeWidth={1.5} opacity={0.6 * (1 - life)} />; })}</g>
);
export const Mushaf: React.FC<{lines?: number; lit?: number; t: number}> = ({lines = 10, lit = 0, t}) => (
  <>
    <Rf x={0} y={0} w={360} h={640} c="#0f2a20" />
    <g shapeRendering="auto"><circle cx={180} cy={400} r={210} fill="#f9c440" opacity={0.1 + 0.15 * lit / lines + 0.03 * Math.sin(t * 4)} /></g>
    <Rf x={50} y={190} w={260} h={420} c="#f6efdc" />
    <Rf x={50} y={190} w={260} h={8} c="#24503a" /><Rf x={50} y={602} w={260} h={8} c="#24503a" />
    {Array.from({length: lines}, (_, i) => <Rf key={i} x={78} y={226 + i * (360 / lines)} w={204 - (i % 3) * 18} h={8} c={i < lit ? '#d4a73a' : '#d8ccb0'} />)}
  </>
);
export const Seal: React.FC<{t: number; label?: string}> = ({t, label = 'SAHIH'}) => {
  const drop = interpolate(t, [0.3, 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <>
      <Rf x={0} y={0} w={360} h={640} c="#1a1410" />
      <Rf x={50} y={170} w={260} h={380} c="#efe2c4" />
      {Array.from({length: 11}, (_, i) => <Rf key={i} x={80} y={220 + i * 26} w={200 - (i % 4) * 22} h={5} c="#a8956e" />)}
      <g transform={`translate(240 ${interpolate(drop, [0, 1], [250, 470])}) scale(${2 - drop})`} opacity={drop} shapeRendering="auto">
        <circle cx={0} cy={0} r={44} fill="#8a1f1f" />
        <circle cx={0} cy={0} r={34} fill="none" stroke="#e8c0a0" strokeWidth={3} />
        <text x={0} y={7} fontSize={16} fontFamily={nunito} fontWeight={900} textAnchor="middle" fill="#f6efdc">{label}</text>
      </g>
    </>
  );
};

// Big glowing title over the scene, visible from frame 1 (no card).
export const GlowTitle: React.FC<{lines: string[]; sub?: string; arabic?: {key: keyof typeof ayat; range: [number, number]}; top?: number; size?: number}> = ({lines, sub, arabic, top = 200, size = 108}) => {
  const f = useCurrentFrame();
  const glow = 16 + 8 * Math.sin(f / 10);
  return (
    <div style={{position: 'absolute', top, width: '100%', textAlign: 'center', padding: '0 40px', boxSizing: 'border-box'}}>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: size, color: '#f9d77a', letterSpacing: 3, lineHeight: 1.02, textShadow: `0 0 ${glow}px rgba(249,196,64,.85), 0 6px 0 rgba(0,0,0,.6)`}}>{lines.map((l, i) => <div key={i}>{l}</div>)}</div>
      {arabic && <div style={{fontFamily: QURAN_FONT, fontSize: 64, color: '#fff4c2', direction: 'rtl', marginTop: 18, textShadow: `0 0 ${glow}px rgba(249,196,64,.6)`}}>{ayat[arabic.key].words.slice(arabic.range[0], arabic.range[1] + 1).join(' ')}</div>}
      {sub && <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 50, color: '#ffffff', marginTop: 16, lineHeight: 1.15, textShadow: '0 4px 0 rgba(0,0,0,.65)'}} dangerouslySetInnerHTML={{__html: sub.replace(/\*(.+?)\*/g, '<span style="color:#f9c440">$1</span>')}} />}
    </div>
  );
};
export const HadithCard: React.FC<{source: string; text: string; gold?: string; size?: number}> = ({source, text, gold, size = 54}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const [a, b] = gold ? text.split(gold) : [text, ''];
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '22px 32px 28px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)', fontFamily: nunito}}>
      <div style={{fontWeight: 800, fontSize: 28, color: '#5b6a60', letterSpacing: 2}}>{source}</div>
      <div style={{fontWeight: 900, fontSize: size, color: '#1d2b24', lineHeight: 1.15, marginTop: 10}}>“{a}{gold && <span style={{color: '#b8862a'}}>{gold}</span>}{b}”</div>
    </div>
  );
};
// One big word/phrase that punches in (kinetic text).
export const Punch: React.FC<{text: string; top?: number; size?: number; color?: string}> = ({text, top = 760, size = 120, color = '#f9d77a'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 9, mass: 0.5}});
  return <div style={{position: 'absolute', top, width: '100%', textAlign: 'center', fontFamily: nunito, fontWeight: 900, fontSize: size, color, lineHeight: 1, transform: `scale(${interpolate(s, [0, 1], [1.8, 1])})`, opacity: Math.min(1, s * 1.5), textShadow: '0 0 20px rgba(0,0,0,.6), 0 8px 0 rgba(0,0,0,.55)'}}>{text}</div>;
};
