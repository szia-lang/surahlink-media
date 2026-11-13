// Procedural pixel sprites for the Al-Fil story. Shapes are rasterized to a char grid,
// then outlined automatically, so every sprite gets the same hard dark outline as Amir.
import {AMIR_PALETTE} from '../characters/amir';

export const PAL: Record<string, string> = {
  ...AMIR_PALETTE,
  e: '#8b9096', E: '#686d74', r: '#a8432f', R: '#7e2f22', M: '#9aa0a6',
  B: '#25222b', o: '#9b5a35', x: '#1c2620',
};

type Set = (x: number, y: number, ch: string) => void;

export function raster(w: number, h: number, paint: (set: Set, H: Helpers) => void, outline = true): string[] {
  const g = Array.from({length: h}, () => Array(w).fill('.'));
  const set: Set = (x, y, ch) => {
    x = Math.round(x); y = Math.round(y);
    if (x >= 0 && y >= 0 && x < w && y < h) g[y][x] = ch;
  };
  const H = helpers(set);
  paint(set, H);
  if (outline) {
    const c = g.map((r) => [...r]);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (c[y][x] !== '.') continue;
      const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
        const v = c[y + dy]?.[x + dx];
        return v && v !== '.' && v !== 'k';
      });
      if (n) g[y][x] = 'k';
    }
  }
  return g.map((r) => r.join(''));
}

type Helpers = ReturnType<typeof helpers>;
function helpers(set: Set) {
  return {
    rect(x: number, y: number, w: number, h: number, ch: string) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) set(x + i, y + j, ch);
    },
    ellipse(cx: number, cy: number, rx: number, ry: number, ch: string, filter?: (x: number, y: number) => boolean) {
      for (let y = Math.floor(cy - ry); y <= cy + ry; y++)
        for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
          const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
          if (d <= 1 && (!filter || filter(x, y))) set(x, y, ch);
        }
    },
  };
}

// Elephant facing right. step: 0/1 walk frame. kneel: front legs folded, head down.
export function elephant(step = 0, kneel = false, howdah = true): string[] {
  return raster(38, 28, (set, H) => {
    const dy = kneel ? 4 : 0;
    // legs (far side darker)
    if (!kneel) {
      const xs = [6, 11, 19, 24];
      xs.forEach((x, i) => {
        const off = step ? (i % 2 ? -1 : 1) : 0;
        H.rect(x + off, 17, 3, 8, i % 2 ? 'E' : 'e');
      });
    } else {
      H.rect(5, 22, 9, 3, 'E');
      H.rect(18, 23, 10, 2, 'e');
    }
    H.ellipse(15, 12 + dy, 11, 7, 'e');
    H.ellipse(15, 12 + dy, 11, 7, 'E', (_, y) => y >= 16 + dy);
    // tail
    set(4, 10 + dy, 'E'); set(3, 11 + dy, 'E'); set(3, 12 + dy, 'E'); set(3, 13 + dy, 'x');
    // head, ear, trunk, tusk
    const hy = kneel ? 16 : 9;
    H.ellipse(26, hy, 5, 5, 'e');
    H.ellipse(23, hy + 1, 3, 4, 'E');
    if (!kneel) {
      H.rect(29, hy + 2, 2, 10, 'e');
      H.rect(30, hy + 11, 3, 2, 'e');
    } else {
      H.rect(29, hy + 2, 2, 7, 'e');
      H.rect(30, hy + 8, 4, 2, 'e');
    }
    set(28, hy + 5, 'w'); set(29, hy + 6, 'w'); set(30, hy + 6, 'w');
    // howdah / blanket
    if (howdah) {
      H.rect(9, 2 + dy, 12, 4, 'r');
      H.rect(9, 6 + dy, 12, 1, 'y');
      for (let x = 9; x < 21; x += 2) set(x, 7 + dy, 'y');
      H.rect(10, 1 + dy, 10, 1, 'R');
    }
  });
}

export const soldier = (step = 0) => [
  '..kk.y',
  '.kMMkb',
  '.kssk b'.replace(' ', ''),
  '..kk.b',
  '.krrkb',
  '.krrsb',
  '.krrkb',
  '.kRRk.',
  step ? '..kk..' : '.k..k.',
  step ? '..kk..' : '.k..k.',
];

export const bird = (up: boolean) =>
  up
    ? ['B.......B', 'BB.....BB', '.BBBBBBB.', '...BBB...', '....o....']
    : ['.........', '...BBB...', '.BBBBBBB.', 'BB..o..BB', 'B.......B'];
