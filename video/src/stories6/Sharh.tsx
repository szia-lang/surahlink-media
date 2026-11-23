import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {TwoEases, WordCard, AmirDua} from './kit2';

export const SH_DURATION = 28;
const SHOTS: Shot[] = [
  [0, 4.3, <TwoEases suns={0} />],
  [4.3, 7.8, <TwoEases suns={1} />, 'zoom'],
  [7.8, 14.9, <TwoEases suns={0} />, 'whip'],
  [14.9, 18.3, <TwoEases suns={1} />, 'zoom'],
  [18.3, 20.9, <TwoEases suns={2} />],
  [20.9, 24.3, <AmirDua />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 4.3, <TitleCard title="SURAH ASH-SHARH" refKey="94:5" line="Why does Allah say it *twice*?" />],
  [4.3, 7.8, <AyahCard refKey="94:6" gold={[2, 3]} tr="*Indeed, with hardship* will be ease" />],
  [7.8, 10.7, <Caption text="*Why twice?* The scholars noticed something in the Arabic." />],
  [10.7, 14.9, <WordCard refKey="94:5" idx={2} meaning="*THE* hardship" note="has “al” (the): the same one both times" />],
  [14.9, 18.3, <WordCard refKey="94:5" idx={3} meaning="*AN* ease" note="no “al”: a new ease each time" />],
  [18.3, 20.9, <Caption text="*One hardship*, surrounded by *two eases*." size={68} />],
  [20.9, 24.3, <Caption text="Whatever you're going through, it *cannot outnumber* what is coming." />],
];
const SFX: Cue[] = [[0, 'storm', 0.3, 4.3], [0, 'shimmer', 0.4, 3], [4.3, 'shimmer', 0.35, 3], [7.8, 'whoosh', 0.4, 1.5], [7.8, 'storm', 0.2, 7], [10.7, 'impact', 0.35, 2], [14.9, 'shimmer', 0.4, 3], [18.3, 'shimmer', 0.4, 2.6], [20.9, 'whoosh', 0.35, 1.5]];
export const Sharh: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[18.3]} endStart={24.3} duration={SH_DURATION} audio="audio/sharh-narration.mp3" sfx={SFX} />;
