import React from 'react';

// Vector redraw of the Suralink app icon (lavender tile, purple open book).
export const BRAND = {
  purple: '#5a3fc0',
  purpleDark: '#4a2fae',
  lavender: '#ece6fb',
  lavender2: '#ddd3f7',
  cream: '#fbf8f3',
  ink: '#1c1830',
  muted: '#6c6880',
  orange: '#f08a3c',
};

export const SuralinkIcon: React.FC<{size?: number}> = ({size = 160}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="sl-tile" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f3effd" />
        <stop offset="1" stopColor={BRAND.lavender2} />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="24" fill="url(#sl-tile)" />
    <g fill="none" stroke={BRAND.purple} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 34 C42 28 32 27 22 28 V70 C32 69 42 70 50 76 C58 70 68 69 78 70 V28 C68 27 58 28 50 34 Z" />
      <path d="M50 34 V76" />
      <path d="M30 43 C34 40 38 40 42 43" />
      <path d="M58 43 C62 40 66 40 70 43" />
    </g>
  </svg>
);
