import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {AmirBed, Madinah, Kneel, MushafShot} from './kit';

export const BQ_DURATION = 26;
const SHOTS: Shot[] = [
  [0, 5.6, <AmirBed />],
  [5.6, 7.8, <Madinah />, 'whip'],
  [7.8, 10.7, <MushafShot />, 'zoom'],
  [10.7, 14.2, <Kneel />, 'whip'],
  [14.2, 18.1, <Kneel calm={false} />],
  [18.1, 22.4, <Kneel calm />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 2.2, <TitleCard title="THE LAST 2 AYAT OF AL-BAQARAH" titleSize={52} refKey="2:286" range={[0, 5]} line="Recite them *tonight*" />],
  [2.2, 5.6, <HadithCard source="SAHIH AL-BUKHARI" text="Whoever recites them at night, they will be sufficient for him" gold="sufficient for him" size={50} />],
  [5.6, 7.8, <Caption text="But the story behind them is *beautiful*." />],
  [7.8, 10.7, <AyahCard refKey="2:284" range={[7, 16]} gold={[14, 15, 16]} partial tr="Whether you show what is within yourselves or conceal it, *Allah will bring you to account for it*" trSize={38} />],
  [10.7, 14.2, <Caption text="The companions fell to their knees: “*We cannot bear this.*”" />],
  [14.2, 18.1, <AyahCard refKey="2:285" range={[20, 22]} gold={[21, 22]} partial tr="And they say, *We hear and we obey*" />],
  [18.1, 22.4, <AyahCard refKey="2:286" range={[0, 5]} gold={[0, 1, 2, 3, 4, 5]} partial tr="*Allah does not charge a soul except with that within its capacity*" />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [5.6, 'whoosh', 0.4, 1.5], [7.8, 'shimmer', 0.3, 2.9], [10.7, 'crowd', 0.25, 3.5], [10.7, 'whoosh', 0.35, 1.5], [14.2, 'shimmer', 0.3, 3], [18.1, 'shimmer', 0.45, 4]];
export const Baqarah: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[18.1]} endStart={22.4} duration={BQ_DURATION} audio="audio/baqarah-narration.mp3" sfx={SFX} />;
