import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {Trapped, ArmyCharge, Split} from './kit4';

// CURIOSITY HOOK: "what would YOU do?" (viewer in the story).
export const SS_DURATION = 26.5;
const SHOTS: Shot[] = [
  [0, 1.3, <Trapped army={false} />],
  [1.3, 2.7, <ArmyCharge />, 'cut'],
  [2.7, 4.4, <Trapped panic />, 'cut'],
  [4.4, 7.6, <Trapped panic />, 'zoom'],
  [7.6, 13.2, <Trapped />, 'whip'],
  [13.2, 16.3, <Split />],
  [16.3, 21.8, <Split walk />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 4.4, <NativeText text="The sea in front. Pharaoh's army behind." top={230} size={78} />],
  [2.7, 4.4, <NativeText text="What would YOU do?" top={520} size={96} color="#f9d77a" />],
  [4.4, 7.6, <AyahCard refKey="26:61" range={[3, 7]} gold={[6, 7]} partial tr="the companions of Moses said, *Indeed, we are to be overtaken*" />],
  [7.6, 13.2, <AyahCard refKey="26:62" gold={[1, 2, 3, 4, 5]} tr="*No! Indeed, with me is my Lord; He will guide me*" />],
  [13.2, 16.3, <Caption text="Then Allah told him: *strike the sea with your staff*." />],
  [16.3, 19.5, <AyahCard refKey="26:63" range={[7, 12]} gold={[9, 10, 11, 12]} partial tr="and it parted, and *each portion was like a great towering mountain*" />],
  [19.5, 21.8, <NativeText text="When there's no way out, Allah makes one." top={260} size={84} color="#f9d77a" />],
];
const SFX: Cue[] = [[0, 'impact', 0.8, 2], [0, 'storm', 0.4, 13.2], [1.3, 'crowd', 0.4, 3], [2.7, 'impact', 0.5, 1.5], [7.6, 'shimmer', 0.4, 3], [13.2, 'impact', 0.9, 2.5], [13.2, 'underwater', 0.5, 3.1], [16.3, 'shimmer', 0.45, 3], [19.5, 'whoosh', 0.4, 1.5]];
export const SeaSplit: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[0, 13.45]} endStart={21.8} duration={SS_DURATION} audio="audio/sea-narration.mp3" sfx={SFX} />;
