import React from 'react';
import {AbsoluteFill, Easing, interpolate, interpolateColors, random, useCurrentFrame, useVideoConfig} from 'remotion';

// Shared building blocks for 60fps videos: 360x640 stage, sub-pixel motion, flames, light, transitions.
export const FPS60 = 60;
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.inOut(Easing.quad);
export const F = (s: number) => Math.round(s * FPS60);
export const useT = () => useCurrentFrame() / useVideoConfig().fps;

// ---------- primitives ----------
export const Stage: React.FC<{children: React.ReactNode; cam?: string}> = ({children, cam}) => (
  <svg viewBox="0 0 360 640" width="100%" height="100%" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
    <g transform={cam}>{children}</g>
  </svg>
);
export const Rf: React.FC<{x: number; y: number; w: number; h: number; c: string; o?: number}> = ({x, y, w, h, c, o}) => <rect x={x} y={y} width={Math.max(0, w)} height={Math.max(0, h)} fill={c} opacity={o} />;
export const cam = (z: number, cx = 180, cy = 360, dx = 0, dy = 0) => `translate(${cx + dx} ${cy + dy}) scale(${z}) translate(${-cx} ${-cy})`;
export const ez = (t: number, a: number, b: number, from: number, to: number) => interpolate(t, [a, b], [from, to], {...clamp, easing: ease});

const HOT = ['#fff4c2', '#f9c440', '#ef6a2a', '#7a2418'];
const COOL = ['#f2fdff', '#a6e2f5', '#4a9fd4', '#1d3d63'];
// Flames: solid flickering tongues (3 colour layers, pixel columns) + embers rising off the top.
// cool: 0 = fire, 1 = calm blue light. speed slows / freezes the motion.
export const LAYERS_HOT = ['#8a2418', '#e0552a', '#f9a23a', '#fff1b0'];
export const LAYERS_COOL = ['#1d3d63', '#3f86c4', '#8fd3f0', '#f2fdff'];
export const Flames: React.FC<{x: number; y: number; w: number; h: number; n?: number; t: number; cool?: number; seed?: string; speed?: number}> = ({x, y, w, h, n = 120, t, cool = 0, seed = 'f', speed = 1}) => {
  const col = 6;
  const cols = Math.max(1, Math.floor(w / col));
  const tt = t * speed;
  const layer = (k: number) => interpolateColors(cool, [0, 1], [LAYERS_HOT[k], LAYERS_COOL[k]]);
  const scales = [1, 0.78, 0.55, 0.3];
  return (
    <>
      <defs>
        <radialGradient id={'glow' + seed}><stop offset="0" stopColor={layer(2)} stopOpacity={0.45} /><stop offset="1" stopColor={layer(2)} stopOpacity={0} /></radialGradient>
      </defs>
      <ellipse cx={x + w / 2} cy={y - h * 0.3} rx={w * 0.85} ry={h * 0.7} fill={`url(#glow${seed})`} shapeRendering="auto" />
      {scales.map((sc, k) => (
        <g key={k}>
          {Array.from({length: cols}, (_, i) => {
            const u = (i + 0.5) / cols;
            const env = Math.pow(Math.sin(u * Math.PI), 0.8);
            const flick = 0.72 + 0.18 * Math.sin(tt * 7 + i * 0.9 + k) + 0.1 * Math.sin(tt * 13 + i * 2.3 + random(seed + i) * 6);
            const hh = h * env * flick * sc;
            const inset = (1 - sc) * 0.5 * w;
            const cx = x + inset + u * (w - inset * 2);
            return <Rf key={i} x={cx - col / 2} y={y - hh} w={col + 0.5} h={hh} c={layer(k)} />;
          })}
        </g>
      ))}
      {Array.from({length: Math.round(n / 3)}, (_, i) => {
        const life = (tt * (0.5 + random(seed + 'e' + i) * 0.8) + random(seed + 'o' + i)) % 1;
        const px = x + w * (0.2 + random(seed + 'x' + i) * 0.6) + Math.sin(tt * 3 + i) * 10 * life;
        const py = y - h * (0.55 + life * 0.7);
        return <Rf key={'e' + i} x={px} y={py} w={4} h={4} c={layer(3 - Math.min(2, Math.floor(life * 3)))} o={1 - life} />;
      })}
    </>
  );
};

// Ibrahim is never drawn: only light.
export const Light: React.FC<{x: number; y: number; r?: number; t: number}> = ({x, y, r = 14, t}) => (
  <g shapeRendering="auto">
    <circle cx={x} cy={y} r={r * 2.6} fill="#fff6d0" opacity={0.12 + 0.04 * Math.sin(t * 4)} />
    <circle cx={x} cy={y} r={r * 1.6} fill="#fff6d0" opacity={0.3} />
    <circle cx={x} cy={y} r={r} fill="#fffdf2" opacity={0.95} />
    {Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2 + t * 0.8; return <rect key={i} x={x + Math.cos(a) * r * 2 - 2} y={y + Math.sin(a) * r * 2 - 2} width={4} height={4} fill="#fff6d0" opacity={0.7} />; })}
  </g>
);

export const Sky: React.FC<{c: string[]}> = ({c}) => <>{c.map((col, i) => <Rf key={i} x={0} y={i * 80} w={360} h={i === c.length - 1 ? 640 : 80} c={col} />)}</>;
export const NIGHT = ['#1a1230', '#2a1838', '#3e1f3a', '#5a2a3a', '#6e3438'];
export const Ground: React.FC<{y: number; c: string; d: string}> = ({y, c, d}) => (
  <>
    <Rf x={0} y={y} w={360} h={640 - y} c={c} />
    {Array.from({length: 40}, (_, i) => <Rf key={i} x={random('gx' + i) * 350} y={y + 4 + random('gy' + i) * (630 - y)} w={4 + random('gw' + i) * 8} h={2} c={d} />)}
  </>
);

export const Flash: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'white', opacity: interpolate(t, [0, 0.03, 0.15], [0, 0.85, 0], clamp)}} />;
};

// Transitions into a shot: whip pan or zoom-through.
export const Enter: React.FC<{type?: 'whip' | 'zoom' | 'cut'; children: React.ReactNode}> = ({type = 'cut', children}) => {
  const t = useT();
  if (type === 'whip') {
    const p = interpolate(t, [0, 0.16], [1, 0], {...clamp, easing: Easing.out(Easing.cubic)});
    return <AbsoluteFill style={{transform: `translateX(${p * 60}%)`, filter: p > 0.02 ? `blur(${p * 14}px)` : undefined}}>{children}</AbsoluteFill>;
  }
  if (type === 'zoom') {
    const p = interpolate(t, [0, 0.2], [1, 0], {...clamp, easing: Easing.out(Easing.cubic)});
    return <AbsoluteFill style={{transform: `scale(${1 + p * 0.35})`, filter: p > 0.02 ? `blur(${p * 10}px)` : undefined}}>{children}</AbsoluteFill>;
  }
  return <AbsoluteFill>{children}</AbsoluteFill>;
};

