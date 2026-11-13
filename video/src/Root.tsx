import React from 'react';
import {Composition} from 'remotion';
import {TestScene} from './TestScene';
import {AmirSheet, AmirWalkTest} from './AmirSheet';
import {EndCard, endCardDefaults} from './EndCard';
import {AlFilPreview} from './alfil/AlFilPreview';

// 1080x1920 = vertical format for Reels / TikTok / Shorts
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TestScene" component={TestScene} durationInFrames={150} fps={30} width={1080} height={1920} />
    <Composition id="AmirSheet" component={AmirSheet} durationInFrames={24} fps={30} width={1920} height={1080} />
    <Composition id="AmirWalkTest" component={AmirWalkTest} durationInFrames={110} fps={30} width={540} height={360} />
    <Composition id="EndCard" component={EndCard} defaultProps={endCardDefaults} durationInFrames={120} fps={30} width={1080} height={1920} />
    <Composition id="AlFilPreview" component={AlFilPreview} durationInFrames={300} fps={30} width={1080} height={1920} />
  </>
);
