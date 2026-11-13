import React from 'react';
import {random} from 'remotion';
import {R} from '../components/Pix';

// ---------- backgrounds ----------
export const DuskSky: React.FC<{dark?: number}> = ({dark = 0}) => (
  <>
    {['#f3c58d', '#efb07c', '#e89a6a', '#de8a5e', '#d27a56'].map((c, i) => <R key={i} x={0} y={i * 36} w={180} h={i === 4 ? 320 : 36} c={c} />)}
    <R x={0} y={0} w={180} h={320} c="#1b1530" o={dark} />
  </>
);
export const Dunes: React.FC<{y: number; c: string; amp: number; freq: number; shift?: number}> = ({y, c, amp, freq, shift = 0}) => (
  <>{Array.from({length: 180}, (_, x) => { const h = Math.round(amp + amp * Math.sin((x + shift) / freq)); return <R key={x} x={x} y={y - h} w={1} h={320} c={c} />; })}</>
);
export const Mountains: React.FC<{y: number; c: string; seed: string; h: number}> = ({y, c, seed, h}) => (
  <>{Array.from({length: 90}, (_, i) => { const p = random(seed) * 10; const hh = Math.round(h * (0.55 + 0.3 * Math.sin(i / 9 + p) + 0.12 * Math.sin(i / 3.1 + p * 2) + 0.03 * random(seed + i))); return <R key={i} x={i * 2} y={y - hh} w={2} h={320} c={c} />; })}</>
);
export const Ground: React.FC<{y: number; c: string; d: string; scroll?: number}> = ({y, c, d, scroll = 0}) => (
  <>
    <R x={0} y={y} w={180} h={320 - y} c={c} />
    {Array.from({length: 60}, (_, i) => <R key={i} x={((random('g' + i) * 200 - scroll) % 190 + 190) % 190 - 5} y={y + 2 + random('h' + i) * (318 - y)} w={2 + Math.round(random('w' + i) * 3)} h={1} c={d} />)}
  </>
);
export const Dust: React.FC<{x: number; y: number; t: number; seed: string; n?: number}> = ({x, y, t, seed, n = 14}) => (
  <>{Array.from({length: n}, (_, i) => { const a = random(seed + i) * Math.PI; const r = (t * 0.6 + random(seed + 'r' + i) * 6) % 12; return <R key={i} x={x + Math.cos(a) * r * 1.6 - 1} y={y - Math.sin(a) * r * 0.7} w={2} h={2} c="#e9d3a3" o={Math.max(0, 1 - r / 12)} />; })}</>
);
export const Kaaba: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <R x={0} y={0} w={22} h={24} c="#121212" />
    <R x={22} y={2} w={6} h={22} c="#050505" />
    <R x={22} y={0} w={6} h={2} c="#0b0b0b" />
    <R x={0} y={5} w={22} h={2} c="#d4a73a" />
    <R x={22} y={6} w={6} h={2} c="#a8822c" />
    <R x={14} y={12} w={4} h={8} c="#d4a73a" />
    <R x={-4} y={24} w={36} h={3} c="#e8dcc0" />
  </g>
);

export const MakkahValley: React.FC<{f: number; dark?: number}> = ({f, dark = 0}) => (
  <>
    <DuskSky dark={dark} />
    <Mountains y={205} c="#6b5442" seed="m1" h={70} />
    <Mountains y={215} c="#54412f" seed="m2" h={45} />
    <Ground y={212} c="#d8c08a" d="#c4a96f" />
    {[18, 40, 128, 150].map((x, i) => <g key={i}><R x={x} y={198 - (i % 2) * 3} w={14} h={14 + (i % 2) * 3} c="#efe3c4" /><R x={x + 4} y={204} w={3} h={4} c="#3b3026" /></g>)}
    <Kaaba x={76} y={176} s={1.3} />
    <R x={0} y={0} w={180} h={320} c="#1b1530" o={dark * 0.4} />
  </>
);

