import React, {useMemo} from 'react';

// Draws a pixel grid inside a parent <svg>, merging same-color runs into single rects.
// smooth: keep sub-pixel positions so movement glides instead of snapping (used by 60fps videos).
export const PixG: React.FC<{rows: string[]; palette: Record<string, string>; x?: number; y?: number; s?: number; flip?: boolean; opacity?: number; smooth?: boolean}> = ({rows, palette, x = 0, y = 0, s = 1, flip = false, opacity, smooth = false}) => {
  const w = Math.max(...rows.map((r) => r.length));
  const rects = useMemo(() => {
    const out: React.ReactNode[] = [];
    rows.forEach((row, yy) => {
      let i = 0;
      while (i < row.length) {
        const ch = row[i];
        let j = i + 1;
        while (j < row.length && row[j] === ch) j++;
        if (ch !== '.' && palette[ch]) out.push(<rect key={`${yy}-${i}`} x={i} y={yy} width={j - i + 0.02} height={1.02} fill={palette[ch]} />);
        i = j;
      }
    });
    return out;
  }, [rows, palette]);
  const rx = smooth ? x : Math.round(x);
  const ry = smooth ? y : Math.round(y);
  const t = flip ? `translate(${rx + w * s} ${ry}) scale(${-s} ${s})` : `translate(${rx} ${ry}) scale(${s})`;
  return <g transform={t} opacity={opacity}>{rects}</g>;
};

// The whole scene is a 180x320 pixel canvas scaled up to 1080x1920.
export const PixStage: React.FC<{children: React.ReactNode; cam?: string}> = ({children, cam}) => (
  <svg viewBox="0 0 180 320" width="100%" height="100%" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
    <g transform={cam}>{children}</g>
  </svg>
);

export const R: React.FC<{x: number; y: number; w: number; h: number; c: string; o?: number}> = ({x, y, w, h, c, o}) => (
  <rect x={Math.round(x)} y={Math.round(y)} width={Math.round(w)} height={Math.round(h)} fill={c} opacity={o} />
);
