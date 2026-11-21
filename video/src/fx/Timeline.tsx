import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {EndCard, endCardDefaults} from '../EndCard';
import {Enter, Flash, F} from './fx';

// Assembles a 60fps story video: shots + overlays timed in seconds, flashes, end card, narration, sound effects,
// and an optional vocal-only nasheed bed (default 25% volume, fades out over the last second).
export type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
export type Overlay = [number, number, React.ReactNode];
// [time in seconds, file in public/sfx (no extension), volume, length in seconds]
export type Cue = [number, string, number, number];

export const SfxTrack: React.FC<{cues: Cue[]}> = ({cues}) => (
  <>{cues.map(([t, f, v, len], i) => <Sequence key={i} from={F(t)} durationInFrames={F(len)}><Audio src={staticFile(`sfx/${f}.mp3`)} volume={v} /></Sequence>)}</>
);

export const Timeline: React.FC<{shots: Shot[]; overlays: Overlay[]; flashes?: number[]; endStart: number; duration: number; audio?: string; sfx?: Cue[]; bed?: string; bedVolume?: number}> = ({shots, overlays, flashes = [], endStart, duration, audio, sfx = [], bed, bedVolume = 0.25}) => (
  <AbsoluteFill style={{background: '#000'}}>
    {shots.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {overlays.map(([a, b, el], i) => <Sequence key={'o' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {flashes.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(endStart)} durationInFrames={F(duration) - F(endStart)}><EndCard {...endCardDefaults} /></Sequence>
    {audio && <Audio src={staticFile(audio)} />}
    {bed && <Audio src={staticFile(bed)} volume={(f) => bedVolume * Math.min(1, (F(duration) - f) / 60)} />}
    <SfxTrack cues={sfx} />
  </AbsoluteFill>
);
