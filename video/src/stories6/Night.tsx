import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {NightRoom, MushafShot, AmirBed} from './kit';

export const NT_DURATION = 23;
const SHOTS: Shot[] = [
  [0, 3.9, <NightRoom z={[1.2, 1.05]} />],
  [3.9, 8.3, <MushafShot lit={10} />, 'zoom'],
  [8.3, 12.0, <NightRoom sparks shield={1} />, 'whip'],
  [12.0, 14.4, <NightRoom dim={1} z={[1.15, 1.3]} />],
  [14.4, 17.8, <NightRoom dim={1} companion />, 'zoom'],
  [17.8, 19.2, <AmirBed />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.9, <TitleCard title="HIS NIGHT ROUTINE" refKey="113:1" line="What the Prophet ﷺ did *every single night*" />],
  [3.9, 8.3, <AyahCard refKey="113:1" tr="Say, *I seek refuge in the Lord of daybreak*" />],
  [8.3, 12.0, <Caption text="He blew into his palms and wiped *his whole body*. Three times." />],
  [12.0, 14.4, <Caption text="In his final illness, he was *too weak*." />],
  [14.4, 17.8, <Caption text="So *Aisha* recited them for him, and wiped his own hands over him." size={56} />],
  [17.8, 19.2, <Caption text="Tonight, *do what he did*." size={70} />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [3.9, 'whoosh', 0.4, 1.5], [3.9, 'shimmer', 0.3, 3], [8.3, 'whoosh', 0.4, 1.5], [12.0, 'storm', 0.12, 2.4], [14.4, 'shimmer', 0.3, 3], [17.8, 'whoosh', 0.4, 1.4]];
export const Night: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={19.2} duration={NT_DURATION} audio="audio/night-narration.mp3" sfx={SFX} />;
