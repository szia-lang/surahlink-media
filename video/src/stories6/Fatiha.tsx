import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {Masjid, MushafShot} from './kit';

export const FT_DURATION = 28.5;
const SHOTS: Shot[] = [
  [0, 3.5, <Masjid rows z={[1.2, 1.05]} />],
  [3.5, 6.6, <Masjid pose="sujood" rays={1} />, 'zoom'],
  [6.6, 8.7, <MushafShot />, 'whip'],
  [8.7, 12.7, <Masjid pose="idle" />, 'zoom'],
  [12.7, 14.9, <Masjid pose="idle" rays={1} z={[1.2, 1.35]} />],
  [14.9, 17.2, <Masjid pose="dua" />, 'whip'],
  [17.2, 21.3, <Masjid pose="dua" rays={1} z={[1.15, 1.35]} />],
  [21.3, 24.8, <Masjid pose="sujood" rays={0.6} />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.5, <TitleCard title="SURAH AL-FATIHA" refKey="1:2" line="You recite it *17 times a day*" />],
  [3.5, 6.6, <Caption text="But Allah is *answering you*, line by line." />],
  [6.6, 8.7, <HadithCard source="HADITH QUDSI · SAHIH MUSLIM" text="I have divided the prayer between Myself and My servant" gold="Myself and My servant" size={50} />],
  [8.7, 12.7, <AyahCard refKey="1:2" tr="*All praise is due to Allah*, Lord of the worlds" />],
  [12.7, 14.9, <Caption text="Allah: “My servant *has praised Me*.”" size={66} />],
  [14.9, 17.2, <AyahCard refKey="1:6" tr="*Guide us* to the straight path" />],
  [17.2, 21.3, <Caption text="Allah: “This is for My servant, and My servant *will have what he asked for*.”" size={56} />],
  [21.3, 24.8, <Caption text="So slow down in your next prayer. *Someone is answering.*" />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [3.5, 'whoosh', 0.4, 1.5], [6.6, 'whoosh', 0.4, 1.5], [8.7, 'shimmer', 0.35, 3], [12.7, 'shimmer', 0.3, 2], [14.9, 'shimmer', 0.35, 2.3], [17.2, 'shimmer', 0.3, 3], [21.3, 'whoosh', 0.35, 1.5]];
export const Fatiha: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={24.8} duration={FT_DURATION} audio="audio/fatiha-narration.mp3" sfx={SFX} />;
