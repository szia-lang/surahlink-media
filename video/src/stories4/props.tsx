import React from 'react';
import {random} from 'remotion';
import {raster} from '../alfil/sprites';
import {Rf} from '../fx/fx';

// Small shared pixel props for the second story batch.
export const crow = (step = 0) => raster(16, 12, (set, H) => {
  H.ellipse(7, 6, 5, 3, 'x');
  H.ellipse(12, 4, 2.5, 2.5, 'x');
  H.rect(14, 4, 2, 1, 'y');
  H.rect(2, step ? 3 : 6, 6, 2, 'x');
  H.rect(5, 9, 1, 2, 'y'); H.rect(8, 9, 1, 2, 'y');
});
export const dog = raster(18, 10, (set, H) => {
  H.rect(3, 3, 11, 4, 'b');
  H.rect(13, 1, 4, 4, 'b');
  H.rect(16, 3, 2, 2, 'b');
  H.rect(4, 7, 2, 3, 'b'); H.rect(11, 7, 2, 3, 'b');
  H.rect(0, 3, 3, 1, 'b');
});
export const Altar: React.FC<{x: number; y: number; offering: 'sheep' | 'grain'}> = ({x, y, offering}) => (
  <g transform={`translate(${x} ${y})`}>
    <Rf x={-30} y={0} w={60} h={30} c="#8a7a68" /><Rf x={-34} y={-4} w={68} h={6} c="#a8968a" />
    {offering === 'sheep' ? <><Rf x={-14} y={-18} w={26} h={14} c="#f1ece0" /><Rf x={10} y={-22} w={8} h={8} c="#f1ece0" /><Rf x={-10} y={-4} w={3} h={4} c="#2a2018" /><Rf x={6} y={-4} w={3} h={4} c="#2a2018" /></>
      : Array.from({length: 7}, (_, i) => <Rf key={i} x={-18 + i * 6} y={-24 + (i % 2) * 4} w={3} h={20} c="#d4a73a" />)}
  </g>
);
export const GoldPile: React.FC<{x: number; y: number; s?: number; t: number}> = ({x, y, s = 1, t}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({length: 9}, (_, r) => <Rf key={r} x={-r * 10} y={-90 + r * 10} w={r * 20} h={10} c={r % 2 ? '#d4a73a' : '#c4952a'} />)}
    {Array.from({length: 10}, (_, i) => <Rf key={'s' + i} x={-60 + random('gs' + i) * 120} y={-80 + random('gy' + i) * 80} w={3} h={3} c="#fff4c2" o={(Math.sin(t * 8 + i) + 1) / 2} />)}
  </g>
);
export const Key: React.FC<{x: number; y: number; s?: number; rot?: number}> = ({x, y, s = 1, rot = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Rf x={-30} y={-3} w={50} h={6} c="#d4a73a" />
    <Rf x={20} y={-10} w={16} h={20} c="#d4a73a" /><Rf x={24} y={-5} w={8} h={10} c="#5a3a22" />
    <Rf x={-30} y={3} w={4} h={8} c="#d4a73a" /><Rf x={-22} y={3} w={4} h={6} c="#d4a73a" />
  </g>
);
export const CaveMouth: React.FC<{glow?: number}> = ({glow = 0}) => (
  <g shapeRendering="auto">
    <path d="M0 640 L0 300 Q60 170 180 160 Q300 170 360 300 L360 640 Z" fill="#4a3a33" />
    <path d="M90 640 L90 420 Q110 310 180 300 Q250 310 270 420 L270 640 Z" fill="#0c0a10" />
    {glow > 0 && <ellipse cx={180} cy={480} rx={90} ry={110} fill="#fff6d0" opacity={0.1 * glow} />}
  </g>
);
