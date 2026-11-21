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
import {Abasa, AB_DURATION, AB_FPS} from './abasa/Abasa';
import {Duha, DU_DURATION, DU_FPS} from './duha/Duha';
import {Kahf, KF_DURATION, KF_FPS} from './kahf/Kahf';
import {Yusuf, YU_DURATION, YU_FPS} from './yusuf/Yusuf';
import {Nuh, NU_DURATION, NU_FPS} from './nuh/Nuh';
import {Maryam, MR_DURATION, MR_FPS} from './maryam/Maryam';
import {Kawthar, KW_DURATION, KW_FPS} from './kawthar/Kawthar';
import {Ikhlas, IK_DURATION, IK_FPS} from './ikhlas/Ikhlas';
import {Kursi2, K2_DURATION, K2_FPS} from './kursi2/Kursi2';
import {Dajjal, DJ_DURATION} from './stories5/Dajjal';
import {Pharaoh, PH_DURATION} from './stories5/Pharaoh';
import {Mulk, ML_DURATION} from './stories5/Mulk';
import {Poor, PO_DURATION} from './stories5/Poor';
import {Yunus, YN_DURATION} from './stories5/Yunus';
import {Habil, HB_DURATION} from './stories4/Habil';
import {Qarun, QR_DURATION} from './stories4/Qarun';
import {Khidr, KH_DURATION} from './stories4/Khidr';
import {Cave, CV_DURATION} from './stories4/Cave';
import {PoorA, PoorB, PoorC, YunusA, YunusB, YunusC, HOOK_DURATIONS} from './hooks/HookTests';

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
    <Composition id="Abasa" component={Abasa} durationInFrames={Math.round(AB_DURATION * AB_FPS)} fps={AB_FPS} width={1080} height={1920} />
    <Composition id="Duha" component={Duha} durationInFrames={Math.round(DU_DURATION * DU_FPS)} fps={DU_FPS} width={1080} height={1920} />
    <Composition id="Kahf" component={Kahf} durationInFrames={Math.round(KF_DURATION * KF_FPS)} fps={KF_FPS} width={1080} height={1920} />
    <Composition id="Yusuf" component={Yusuf} durationInFrames={Math.round(YU_DURATION * YU_FPS)} fps={YU_FPS} width={1080} height={1920} />
    <Composition id="Nuh" component={Nuh} durationInFrames={Math.round(NU_DURATION * NU_FPS)} fps={NU_FPS} width={1080} height={1920} />
    <Composition id="Maryam" component={Maryam} durationInFrames={Math.round(MR_DURATION * MR_FPS)} fps={MR_FPS} width={1080} height={1920} />
    <Composition id="Kawthar" component={Kawthar} durationInFrames={Math.round(KW_DURATION * KW_FPS)} fps={KW_FPS} width={1080} height={1920} />
    <Composition id="Ikhlas" component={Ikhlas} durationInFrames={Math.round(IK_DURATION * IK_FPS)} fps={IK_FPS} width={1080} height={1920} />
    <Composition id="Kursi2" component={Kursi2} durationInFrames={Math.round(K2_DURATION * K2_FPS)} fps={K2_FPS} width={1080} height={1920} />
    <Composition id="Dajjal" component={Dajjal} durationInFrames={Math.round(DJ_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Pharaoh" component={Pharaoh} durationInFrames={Math.round(PH_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Mulk" component={Mulk} durationInFrames={Math.round(ML_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Poor" component={Poor} durationInFrames={Math.round(PO_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Yunus" component={Yunus} durationInFrames={Math.round(YN_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="PoorA" component={PoorA} durationInFrames={Math.round(HOOK_DURATIONS.PoorA * 60)} fps={60} width={1080} height={1920} />
    <Composition id="PoorB" component={PoorB} durationInFrames={Math.round(HOOK_DURATIONS.PoorB * 60)} fps={60} width={1080} height={1920} />
    <Composition id="PoorC" component={PoorC} durationInFrames={Math.round(HOOK_DURATIONS.PoorC * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Habil" component={Habil} durationInFrames={Math.round(HB_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Qarun" component={Qarun} durationInFrames={Math.round(QR_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Khidr" component={Khidr} durationInFrames={Math.round(KH_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="Cave" component={Cave} durationInFrames={Math.round(CV_DURATION * 60)} fps={60} width={1080} height={1920} />
    <Composition id="YunusA" component={YunusA} durationInFrames={Math.round(HOOK_DURATIONS.YunusA * 60)} fps={60} width={1080} height={1920} />
    <Composition id="YunusB" component={YunusB} durationInFrames={Math.round(HOOK_DURATIONS.YunusB * 60)} fps={60} width={1080} height={1920} />
    <Composition id="YunusC" component={YunusC} durationInFrames={Math.round(HOOK_DURATIONS.YunusC * 60)} fps={60} width={1080} height={1920} />
  </>
);
