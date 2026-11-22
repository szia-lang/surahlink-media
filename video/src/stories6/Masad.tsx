import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Punch} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {Fire, Safa, Years, Dark} from './kit';

export const MS_DURATION = 26.5;
const SHOTS: Shot[] = [
  [0, 3.2, <Fire />],
  [3.2, 9.0, <Safa />, 'whip'],
  [9.0, 12.3, <Safa angry />, 'zoom'],
  [12.3, 15.6, <Fire />, 'whip'],
  [15.6, 21.4, <Years />, 'zoom'],
  [21.4, 22.4, <Dark />],
];
const OVERLAYS: Overlay[] = [
  [0, 3.2, <TitleCard title="SURAH AL-MASAD" refKey="111:1" line="One man named in the Quran, *told he would burn*" />],
  [3.2, 6.0, <Caption text="The Prophet ﷺ called Quraysh to *Mount Safa*" />],
  [6.0, 9.0, <Caption text="and warned them about *the Day of Judgment*." />],
  [9.0, 12.3, <Caption text="His own uncle, *Abu Lahab*, shouted: “May you perish!”" />],
  [12.3, 15.6, <AyahCard refKey="111:1" gold={[0, 1, 2, 3]} tr="*May the hands of Abu Lahab be ruined*, and ruined is he" />],
  [15.6, 16.6, <Punch instant text="THE TWIST" top={300} size={110} />],
  [16.6, 18.2, <Caption text="He lived *for years* after that." />],
  [18.2, 21.4, <Caption text="All he had to do was pretend to believe, and *prove the Quran wrong*." size={56} />],
  [21.4, 22.4, <Punch instant text="HE NEVER DID." top={560} size={100} color="#ffffff" />],
];
const SFX: Cue[] = [[0, 'impact', 0.8, 2.5], [0, 'storm', 0.2, 3.2], [3.2, 'whoosh', 0.4, 1.5], [3.2, 'crowd', 0.25, 5.8], [9.0, 'crowd', 0.4, 3.3], [12.3, 'impact', 0.6, 2], [12.3, 'storm', 0.25, 3.3], [15.6, 'whoosh', 0.45, 1.5], [21.4, 'impact', 0.7, 2]];
export const Masad: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[12.3, 21.4]} endStart={22.4} duration={MS_DURATION} audio="audio/masad-narration.mp3" sfx={SFX} />;
