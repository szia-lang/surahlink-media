import React from 'react';
import {Composition} from 'remotion';
import {TestScene} from './TestScene';
import {AmirSheet, AmirWalkTest} from './AmirSheet';
import {EndCard, endCardDefaults} from './EndCard';
import {AlFilPreview} from './alfil/AlFilPreview';
import {AlFil, ALFIL_FRAMES} from './alfil/AlFil';
import {GogMagog, GM_DURATION} from './gogmagog/GogMagog';
import {Ibrahim, IB_DURATION, IB_FPS} from './ibrahim/Ibrahim';
import {Musa, MU_DURATION, MU_FPS} from './musa/Musa';
import {Kursi, AK_DURATION, AK_FPS} from './kursi/Kursi';

// 1080x1920 = vertical format for Reels / TikTok / Shorts
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TestScene" component={TestScene} durationInFrames={150} fps={30} width={1080} height={1920} />
    <Composition id="AmirSheet" component={AmirSheet} durationInFrames={24} fps={30} width={1920} height={1080} />
    <Composition id="AmirWalkTest" component={AmirWalkTest} durationInFrames={110} fps={30} width={540} height={360} />
    <Composition id="EndCard" component={EndCard} defaultProps={endCardDefaults} durationInFrames={120} fps={30} width={1080} height={1920} />
    <Composition id="AlFilPreview" component={AlFilPreview} durationInFrames={300} fps={30} width={1080} height={1920} />
    <Composition id="AlFil" component={AlFil} durationInFrames={ALFIL_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="GogMagog" component={GogMagog} durationInFrames={Math.round(GM_DURATION * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Ibrahim" component={Ibrahim} durationInFrames={Math.round(IB_DURATION * IB_FPS)} fps={IB_FPS} width={1080} height={1920} />
    <Composition id="Musa" component={Musa} durationInFrames={Math.round(MU_DURATION * MU_FPS)} fps={MU_FPS} width={1080} height={1920} />
    <Composition id="Kursi" component={Kursi} durationInFrames={Math.round(AK_DURATION * AK_FPS)} fps={AK_FPS} width={1080} height={1920} />
  </>
);
