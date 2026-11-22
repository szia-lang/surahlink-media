import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Punch} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {KaabaIdols, MushafShot} from './kit';

export const KFR_DURATION = 25.5;
const SHOTS: Shot[] = [
  [0, 3.1, <KaabaIdols light />],
  [3.1, 5.7, <KaabaIdols light />, 'whip'],
  [5.7, 10.9, <KaabaIdols offer light />, 'zoom'],
  [10.9, 12.9, <MushafShot />, 'whip'],
  [12.9, 19.4, <MushafShot lit={10} />],
  [19.4, 21.6, <KaabaIdols leave light />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.1, <TitleCard title="SURAH AL-KAFIRUN" refKey="109:1" line="They offered the Prophet ﷺ *a deal*" />],
  [3.1, 5.7, <Caption text="The leaders of Quraysh came with *a compromise*:" />],
  [5.7, 9.4, <Caption text="“Worship our gods for a year, *and we'll worship your God for a year*.”" size={56} />],
  [9.4, 10.9, <Caption text="No more conflict." size={70} />],
  [10.9, 12.9, <Caption text="Allah answered with *a whole surah*." />],
  [12.9, 16.4, <AyahCard refKey="109:2" gold={[0, 1]} tr="*I do not worship* what you worship" />],
  [16.4, 19.4, <AyahCard refKey="109:6" tr="*For you is your religion, and for me is my religion*" />],
  [19.4, 20.3, <Punch instant text="NO DEAL." top={300} size={120} />],
  [20.3, 21.6, <Caption text="Faith is *not traded*." size={70} />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.45, 3], [3.1, 'whoosh', 0.4, 1.5], [3.1, 'crowd', 0.25, 7.8], [10.9, 'whoosh', 0.4, 1.5], [12.9, 'shimmer', 0.35, 3], [16.4, 'shimmer', 0.35, 3], [19.4, 'impact', 0.7, 2]];
export const Kafirun: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[19.4]} endStart={21.6} duration={KFR_DURATION} audio="audio/kafirun-narration.mp3" sfx={SFX} />;
