import React from 'react';
import {AbsoluteFill, Sequence, interpolate, random, useCurrentFrame, spring, useVideoConfig} from 'remotion';
import {loadFont as loadAmiri} from '@remotion/google-fonts/AmiriQuran';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {PixG, PixStage, R} from '../components/Pix';
import {DuskSky, Dunes, Mountains, Ground, Dust, Kaaba, MakkahValley} from './scenery';
import {Caption} from '../components/Caption';
import {PAL, elephant, soldier, bird} from './sprites';
import {AMIR} from '../characters/amir';
import ayat from '../data/ayat.json';

const amiri = loadAmiri().fontFamily;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- shots ----------
const S1_Army: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 66], [1, 1.1]);
  const march = f * 0.7;
  return (
    <AbsoluteFill>
      <PixStage cam={`translate(90 200) scale(${z}) translate(-90 -200)`}>
        <DuskSky />
        <R x={120} y={88} w={22} h={22} c="#fbe0a6" /><R x={117} y={92} w={28} h={14} c="#fbe0a6" />
        <Dunes y={175} c="#e6c88c" amp={6} freq={14} shift={f * 0.2} />
        <Dunes y={200} c="#d9b77a" amp={5} freq={10} shift={f * 0.5} />
        <Ground y={215} c="#c9a466" d="#b58f55" scroll={f * 0.8} />
        {[0, 1, 2].map((i) => <PixG key={i} rows={elephant(Math.floor((f + i * 5) / 8) % 2)} palette={PAL} x={-30 + march + i * 44} y={176 + (i % 2) * 6} s={1} />)}
        {Array.from({length: 14}, (_, i) => <PixG key={'s' + i} rows={soldier(Math.floor((f + i * 3) / 6) % 2)} palette={PAL} x={-70 + march + i * 12} y={210 + (i % 3) * 5} s={1} />)}
        <Dust x={30 + march} y={214} t={f} seed="d1" n={24} />
      </PixStage>
      <Caption text={'An army of *elephants* marches on Makkah.'} />
    </AbsoluteFill>
  );
};

const S2_Lead: React.FC = () => {
  const f = useCurrentFrame();
  const step = Math.floor(f / 9) % 2;
  const sinceStep = f % 9;
  const shake = sinceStep < 3 ? (sinceStep % 2 ? 2 : -2) : 0;
  return (
    <AbsoluteFill>
      <PixStage cam={`translate(0 ${shake})`}>
        <DuskSky />
        <Dunes y={190} c="#e6c88c" amp={8} freq={16} shift={f * 1.5} />
        <Ground y={232} c="#c9a466" d="#b58f55" scroll={f * 4} />
        {Array.from({length: 8}, (_, i) => <PixG key={i} rows={soldier(Math.floor((f + i * 2) / 5) % 2)} palette={PAL} x={((i * 26 - f * 2) % 200 + 200) % 200 - 10} y={222} s={1} />)}
        <PixG rows={elephant(step)} palette={PAL} x={18 + f * 0.25} y={150} s={3} />
        <Dust x={60 + f * 0.25} y={232} t={f * 2} seed="d2" n={30} />
      </PixStage>
      <Caption text={'Their goal: destroy the *Kaaba*.'} />
    </AbsoluteFill>
  );
};

const S3_Makkah: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 60], [1.15, 1]);
  return (
    <AbsoluteFill>
      <PixStage cam={`translate(90 200) scale(${z}) translate(-90 -200)`}>
        <MakkahValley f={f} />
        <PixG rows={AMIR.poses.back} palette={PAL} x={20} y={246} s={2} />
      </PixStage>
      <Caption text={'Makkah had *no army* to stop them.'} />
    </AbsoluteFill>
  );
};

const S4_Kneel: React.FC = () => {
  const f = useCurrentFrame();
  const kneelAt = 18;
  const knelt = f >= kneelAt;
  const x = interpolate(f, [0, kneelAt], [-10, 22], clamp);
  const shake = f >= kneelAt && f < kneelAt + 6 ? (f % 2 ? 3 : -3) : 0;
  return (
    <AbsoluteFill>
      <PixStage cam={`translate(${shake} 0)`}>
        <DuskSky />
        <Mountains y={215} c="#6b5442" seed="m3" h={60} />
        <Ground y={240} c="#d8c08a" d="#c4a96f" />
        <Kaaba x={118} y={190} s={2} />
        <PixG rows={elephant(Math.floor(f / 8) % 2, knelt)} palette={PAL} x={x} y={164} s={2.4} />
        {knelt && <Dust x={x + 50} y={240} t={(f - kneelAt) * 3} seed="d4" n={30} />}
      </PixStage>
      <Caption text={knelt ? 'But the elephant *knelt*… and would not move.' : 'But the elephant…'} />
    </AbsoluteFill>
  );
};

const S5_Birds: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dark = interpolate(f, [0, 20], [0, 0.55], clamp);
  const flash = interpolate(f, [52, 58, 69], [0, 1, 0], clamp);
  const ay = ayat['105:3'];
  const card = spring({frame: f - 8, fps, config: {damping: 13}});
  return (
    <AbsoluteFill>
      <PixStage>
        <MakkahValley f={f} dark={dark} />
        {[0, 1, 2].map((i) => <PixG key={i} rows={elephant(0)} palette={PAL} x={8 + i * 50} y={238 + (i % 2) * 8} s={1} />)}
        {Array.from({length: 46}, (_, i) => {
          const sp = 2.2 + random('bs' + i) * 2;
          const bx = 190 + random('bx' + i) * 140 - f * sp;
          const by = 70 + random('by' + i) * 110 + Math.sin((f + i * 7) / 5) * 3;
          return <PixG key={i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={PAL} x={bx} y={by} s={1} />;
        })}
        {Array.from({length: 6}, (_, i) => <PixG key={'n' + i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={PAL} x={200 + i * 40 - f * 5} y={110 + random('nb' + i) * 120} s={3} />)}
        {Array.from({length: 30}, (_, i) => {
          const t0 = random('st' + i) * 50;
          const t = f - t0;
          if (t < 0) return null;
          return <R key={i} x={20 + random('sx' + i) * 140} y={130 + t * 5} w={2} h={2} c="#9b5a35" />;
        })}
      </PixStage>
      <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${card})`, opacity: card, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center'}}>
        <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>SURAH AL-FIL · 105:3</div>
        <div style={{fontFamily: amiri, fontSize: 76, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>
          {ay.words.map((w, i) => <span key={i} style={{color: i >= 2 ? '#b8862a' : undefined}}>{w}{' '}</span>)}
        </div>
        <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 46, color: '#1d2b24'}}>“And He sent against them <span style={{color: '#b8862a'}}>birds in flocks</span>”</div>
      </div>
      <AbsoluteFill style={{background: 'white', opacity: flash}} />
    </AbsoluteFill>
  );
};

const S6_Tag: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: '#1b1530', justifyContent: 'center', alignItems: 'center'}}>
      <PixStage>
        {Array.from({length: 20}, (_, i) => <PixG key={i} rows={bird(Math.floor((f + i) / 3) % 2 === 0)} palette={{...PAL, B: '#3a3350'}} x={(random('tx' + i) * 220 - f * 2.5)} y={40 + random('ty' + i) * 240} />)}
      </PixStage>
      <div style={{transform: `scale(${s})`, textAlign: 'center', fontFamily: nunito, color: '#f6efdc'}}>
        <div style={{fontSize: 44, fontWeight: 800, color: '#d4a73a', letterSpacing: 3}}>THE STORY OF</div>
        <div style={{fontSize: 120, fontWeight: 900, lineHeight: 1}}>Surah Al-Fil</div>
      </div>
    </AbsoluteFill>
  );
};

// 10s preview: 6 shots, a cut every ~1.5–2.2s.
export const AlFilPreview: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Sequence durationInFrames={66}><S1_Army /></Sequence>
    <Sequence from={66} durationInFrames={54}><S2_Lead /></Sequence>
    <Sequence from={120} durationInFrames={54}><S3_Makkah /></Sequence>
    <Sequence from={174} durationInFrames={57}><S4_Kneel /></Sequence>
    <Sequence from={231} durationInFrames={69}><S5_Birds /></Sequence>
    <Sequence from={288} durationInFrames={12}><S6_Tag /></Sequence>
  </AbsoluteFill>
);
