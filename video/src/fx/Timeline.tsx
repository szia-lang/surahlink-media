import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {EndCard, endCardDefaults} from '../EndCard';
import {Enter, Flash, F} from './fx';

// Assembles a 60fps story video: shots + overlays timed in seconds, flashes, end card, narration.
export type Shot = [number, number, React.ReactNode, ('whip' | 'zoom' | 'cut')?];
export type Overlay = [number, number, React.ReactNode];

export const Timeline: React.FC<{shots: Shot[]; overlays: Overlay[]; flashes?: number[]; endStart: number; duration: number; audio: string}> = ({shots, overlays, flashes = [], endStart, duration, audio}) => (
  <AbsoluteFill style={{background: '#000'}}>
    {shots.map(([a, b, el, enter], i) => <Sequence key={'s' + i} from={F(a)} durationInFrames={F(b) - F(a)}><Enter type={enter}>{el}</Enter></Sequence>)}
    {overlays.map(([a, b, el], i) => <Sequence key={'o' + i} from={F(a)} durationInFrames={F(b) - F(a)}>{el}</Sequence>)}
    {flashes.map((t, i) => <Sequence key={'f' + i} from={F(t)} durationInFrames={12}><Flash /></Sequence>)}
    <Sequence from={F(endStart)} durationInFrames={F(duration) - F(endStart)}><EndCard {...endCardDefaults} /></Sequence>
    <Audio src={staticFile(audio)} />
  </AbsoluteFill>
);
