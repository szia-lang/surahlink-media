import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {FactBanner, Mihrab} from './kit3';

// HOOK TEST: "did you know" fact hook.
export const MF_DURATION = 24.5;
const SHOTS: Shot[] = [
  [0, 4.6, <Mihrab fruit={false} />],
  [4.6, 7.8, <Mihrab fruit={false} />, 'zoom'],
  [7.8, 10.6, <Mihrab visitor />, 'whip'],
  [10.6, 12.3, <Mihrab visitor />, 'zoom'],
  [12.3, 20.0, <Mihrab visitor />],
];
const OVERLAYS: Overlay[] = [
  [0, 4.6, <FactBanner banner="DID YOU KNOW?" text="Only *one woman* is named in the entire Quran" />],
  [4.6, 7.8, <Caption text="*Maryam.* A whole surah carries her name." />],
  [7.8, 10.6, <Caption text="Every time Zakariya came in, *he found food with her*." />],
  [10.6, 12.3, <Caption text="Fruit that *wasn't even in season*." />],
  [12.3, 20.0, <AyahCard refKey="3:37" range={[17, 33]} gold={[27, 28, 29, 30, 31, 32, 33]} partial trSize={38} tr="He said, O Mary, from where is this to you? She said, It is from Allah. *Indeed, Allah provides for whom He wills without account*" />],
];
const SFX: Cue[] = [[0, 'impact', 0.45, 2], [0, 'shimmer', 0.4, 3], [4.6, 'whoosh', 0.35, 1.5], [7.8, 'door', 0.4, 2], [10.6, 'shimmer', 0.35, 1.7], [12.3, 'shimmer', 0.45, 3.5]];
export const MaryamFact: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={20.0} duration={MF_DURATION} audio="audio/maryam2-narration.mp3" sfx={SFX} />;
