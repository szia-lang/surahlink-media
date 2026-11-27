import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {HoopoeFlight, Attendance, Sheba} from './kit4';

// CURIOSITY HOOK: cliffhanger + "what happened next?"
export const HP_DURATION = 25.5;
const SHOTS: Shot[] = [
  [0, 4.1, <HoopoeFlight />],
  [4.1, 7.0, <Attendance />, 'whip'],
  [7.0, 10.5, <Attendance landed />, 'zoom'],
  [10.5, 13.3, <Sheba />, 'whip'],
  [13.3, 17.2, <Sheba worship />, 'zoom'],
  [17.2, 21.4, <Sheba glass />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 4.1, <NativeText text="This bird vanished… and came back with news that changed a KINGDOM" top={180} size={72} />],
  [4.1, 7.0, <AyahCard refKey="27:20" range={[3, 10]} gold={[3, 4, 5, 6]} partial tr="*Why do I not see the hoopoe* - or is he among the absent" />],
  [7.0, 10.5, <AyahCard refKey="27:22" range={[9, 13]} gold={[10, 11, 12, 13]} partial tr="and I have come to you *from Sheba with certain news*" />],
  [10.5, 13.3, <AyahCard refKey="27:23" range={[0, 3]} gold={[2, 3]} partial tr="Indeed, I found *a woman ruling them*" />],
  [13.3, 15.9, <AyahCard refKey="27:24" range={[0, 6]} gold={[2, 3, 4, 5, 6]} partial tr="I found her and her people *prostrating to the sun instead of Allah*" />],
  [15.9, 17.2, <NativeText text="So what happened next?" top={300} size={100} color="#f9d77a" />],
  [17.2, 21.4, <AyahCard refKey="27:44" range={[17, 27]} gold={[22, 23, 24, 25, 26, 27]} partial trSize={38} tr="She said, My Lord, indeed I have wronged myself, and *I submit with Solomon to Allah, Lord of the worlds*" />],
];
const SFX: Cue[] = [[0, 'whoosh', 0.6, 1.5], [0, 'impact', 0.5, 2], [4.1, 'whoosh', 0.4, 1.5], [7.0, 'pop', 0.5, 0.5], [10.5, 'whoosh', 0.4, 1.5], [13.3, 'crowd', 0.25, 3.9], [15.9, 'impact', 0.45, 1.5], [17.2, 'shimmer', 0.5, 4]];
export const Hoopoe: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={21.4} duration={HP_DURATION} audio="audio/hoopoe-narration.mp3" sfx={SFX} />;
