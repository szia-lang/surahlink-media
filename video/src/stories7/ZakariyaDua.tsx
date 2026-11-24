import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText, AmirNightBack, Zakariya} from './kit3';

// HOOK TEST: POV / relatable pain hook.
export const ZD_DURATION = 26.5;
const SHOTS: Shot[] = [
  [0, 3.6, <AmirNightBack />],
  [3.6, 9.5, <Zakariya />, 'whip'],
  [9.5, 16.6, <Zakariya />, 'zoom'],
  [16.6, 20.8, <Zakariya answer />],
  [20.8, 22.3, <AmirNightBack dawn />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.6, <NativeText label="POV:" text="you've made the same dua for years… and nothing" top={280} size={78} />],
  [3.6, 7.5, <Caption text="Prophet Zakariya was old. His wife *could not have children*." />],
  [7.5, 9.5, <Caption text="And still, *he raised his hands*:" />],
  [9.5, 16.6, <AyahCard refKey="19:4" gold={[9, 10, 11, 12, 13]} trSize={38} tr="My Lord, indeed my bones have weakened, and my head has filled with white, and *never have I been in my supplication to You, my Lord, unhappy*" />],
  [16.6, 20.8, <AyahCard refKey="19:7" range={[0, 5]} gold={[2, 3, 4, 5]} partial tr="O Zechariah, indeed *We give you good tidings of a boy* whose name will be John" />],
  [20.8, 22.3, <NativeText text="Keep asking." top={330} size={110} color="#f9d77a" />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.45, 3], [3.6, 'whoosh', 0.4, 1.5], [9.5, 'shimmer', 0.4, 3], [16.6, 'shimmer', 0.5, 3], [16.6, 'impact', 0.35, 2], [20.8, 'whoosh', 0.4, 1.5]];
export const ZakariyaDua: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[16.6]} endStart={22.3} duration={ZD_DURATION} audio="audio/zakariya-narration.mp3" sfx={SFX} />;
