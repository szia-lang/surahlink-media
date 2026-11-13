import React from 'react';

type Props = {
  rows: string[];
  palette: Record<string, string>;
  scale?: number;
  flip?: boolean;
  style?: React.CSSProperties;
};

// Renders a pixel grid as crisp SVG rects. Scales cleanly to any size.
export const PixelSprite: React.FC<Props> = ({rows, palette, scale = 10, flip = false, style}) => {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = palette[ch];
      if (ch !== '.' && fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
    });
  });
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{transform: flip ? 'scaleX(-1)' : undefined, ...style}}
    >
      {rects}
    </svg>
  );
};
