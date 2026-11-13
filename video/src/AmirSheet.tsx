import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AMIR, AmirPose} from './characters/amir';
import {PixelSprite} from './components/PixelSprite';

const ink = '#1d2b24', cream = '#f6efdc', green = '#24503a', gold = '#b8862a';
const font = '"Courier New", monospace';

const POSES: {pose: AmirPose; label: string; use: string}[] = [
  {pose: 'idle', label: 'Idle', use: 'Default / listening'},
  {pose: 'point', label: 'Point', use: 'Points up at ayah card'},
  {pose: 'read', label: 'Read', use: 'Holds the Quran'},
  {pose: 'phone', label: 'Phone', use: 'App demos'},
  {pose: 'dua', label: "Du'a", use: 'Hands raised'},
  {pose: 'react', label: 'React', use: 'Surprise / "wait..."'},
  {pose: 'back', label: 'Back', use: 'Looks up at the scene'},
];

export const AmirSheet: React.FC = () => {
  const frame = useCurrentFrame();
  const walkFrame = AMIR.walk[Math.floor(frame / 6) % 4];
  return (
    <AbsoluteFill style={{background: '#efe6d2', fontFamily: font, color: ink, padding: 60}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 24}}>
        <div style={{fontSize: 64, fontWeight: 700}}>AMIR</div>
        <div style={{fontSize: 30, color: green}}>The Seeker · Suralink host</div>
      </div>
      <div style={{fontSize: 22, color: '#5b6a60', marginTop: 6}}>16×26 px sprite · no facial features · prophets are never drawn (shown as light)</div>

      <div style={{display: 'flex', gap: 28, marginTop: 50, alignItems: 'flex-start'}}>
        {POSES.map(({pose, label, use}) => (
          <div key={pose} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
            <div style={{background: cream, border: `3px solid ${green}`, padding: '18px 22px', display: 'flex', alignItems: 'flex-end', height: 330}}>
              <PixelSprite rows={AMIR.poses[pose]} palette={AMIR.palette} scale={11} />
            </div>
            <div style={{fontSize: 28, fontWeight: 700}}>{label}</div>
            <div style={{fontSize: 18, color: '#5b6a60', width: 200, textAlign: 'center'}}>{use}</div>
          </div>
        ))}
      </div>

      <div style={{display: 'flex', gap: 60, marginTop: 50, alignItems: 'flex-end'}}>
        <div>
          <div style={{fontSize: 26, fontWeight: 700, marginBottom: 12}}>Walk cycle (4 frames, flip to walk left)</div>
          <div style={{display: 'flex', gap: 18}}>
            {AMIR.walk.map((rows, i) => (
              <div key={i} style={{background: cream, border: `3px solid ${green}`, padding: 12}}>
                <PixelSprite rows={rows} palette={AMIR.palette} scale={8} />
              </div>
            ))}
            <div style={{background: green, border: `3px solid ${gold}`, padding: 12}}>
              <PixelSprite rows={walkFrame} palette={AMIR.palette} scale={8} />
            </div>
          </div>
        </div>
        <div>
          <div style={{fontSize: 26, fontWeight: 700, marginBottom: 12}}>Palette</div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 54px)', gap: 10}}>
            {Object.entries(AMIR.palette).map(([k, c]) => (
              <div key={k} style={{width: 54, height: 54, background: c, border: `3px solid ${ink}`}} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Small looping preview: Amir walks across a desert strip.
export const AmirWalkTest: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = AMIR.walk[Math.floor(frame / 5) % 4];
  const x = -140 + frame * 6;
  return (
    <AbsoluteFill style={{background: '#efb07c'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 140, background: '#d9b77a'}} />
      <div style={{position: 'absolute', left: x, bottom: 110}}>
        <PixelSprite rows={rows} palette={AMIR.palette} scale={7} />
      </div>
    </AbsoluteFill>
  );
};
