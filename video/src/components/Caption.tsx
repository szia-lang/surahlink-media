import React from 'react';
import {spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Nunito';

const {fontFamily} = loadFont('normal', {weights: ['800', '900']});

// Cream story card with a double green border (inspo style). Wrap words in *stars* for gold.
export const Caption: React.FC<{text: string; top?: number; size?: number}> = ({text, top = 170, size = 62}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 12, mass: 0.6}});
  const parts = text.split('*');
  return (
    <div style={{position: 'absolute', top, left: 70, right: 70, display: 'flex', justifyContent: 'center', transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, opacity: s}}>
      <div style={{background: '#f6efdc', border: '10px double #24503a', padding: '26px 40px', fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1.12, color: '#1d2b24', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
        {parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}
      </div>
    </div>
  );
};
