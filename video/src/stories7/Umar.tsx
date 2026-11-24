import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText, Stride, SisterHouse} from './kit3';

// HOOK TEST: transformation / contrast hook.
export const UM_DURATION = 24.5;
const SHOTS: Shot[] = [
  [0, 3.9, <Stride cold />],
  [3.9, 7.9, <Stride />, 'whip'],
  [7.9, 10.5, <SisterHouse />, 'zoom'],
  [10.5, 17.2, <SisterHouse read />, 'zoom'],
  [17.2, 19.9, <Stride />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.9, <><NativeText text="He walked out to kill the Prophet ﷺ" top={240} size={78} /><NativeText text="He came back a Muslim." top={480} size={78} color="#f9d77a" /></>],
  [3.9, 7.9, <Caption text="On the way, Umar was told: “*Your own sister* has accepted Islam.”" />],
  [7.9, 10.5, <Caption text="He stormed into her house. *He struck her.*" />],
  [10.5, 13.2, <Caption text="Then he saw the page she was reading: *Surah Ta-Ha*." />],
  [13.2, 17.2, <AyahCard refKey="20:14" range={[0, 6]} gold={[0, 1, 2, 3, 4, 5, 6]} partial tr="*Indeed, I am Allah. There is no deity except Me*" />],
  [17.2, 19.9, <NativeText text="“Take me to Muhammad ﷺ.”" top={300} size={90} color="#f9d77a" />],
];
const SFX: Cue[] = [[0, 'impact', 0.8, 2.5], [3.9, 'whoosh', 0.45, 1.5], [7.9, 'door', 0.6, 2], [9.7, 'impact', 0.4, 1.5], [10.5, 'shimmer', 0.35, 2.7], [13.2, 'shimmer', 0.5, 4], [17.2, 'whoosh', 0.4, 1.5]];
export const Umar: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[13.2]} endStart={19.9} duration={UM_DURATION} audio="audio/umar-narration.mp3" sfx={SFX} />;
