import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {Hoard, Graves, Keep} from './kit2';

export const TK_DURATION = 25.5;
const SHOTS: Shot[] = [
  [0, 5.3, <Hoard />],
  [5.3, 8.3, <Hoard />, 'zoom'],
  [8.3, 10.3, <Graves />, 'whip'],
  [10.3, 14.0, <Hoard />, 'zoom'],
  [14.0, 17.3, <Keep n={1} />, 'whip'],
  [17.3, 18.8, <Keep n={2} />, 'whip'],
  [18.8, 21.2, <Keep n={3} />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 5.3, <TitleCard title="SURAH AT-TAKATHUR" refKey="102:1" line="What the Prophet ﷺ said *after reciting it*" />],
  [5.3, 8.3, <AyahCard refKey="102:1" gold={[1]} tr="*Competition in increase* diverts you" />],
  [8.3, 10.3, <AyahCard refKey="102:2" gold={[1, 2]} tr="Until you *visit the graveyards*" />],
  [10.3, 14.0, <HadithCard source="SAHIH MUSLIM" text="The son of Adam says: My wealth, my wealth" gold="My wealth, my wealth" size={54} />],
  [14.0, 17.3, <Caption text="But what do you own, except what you *ate and used up*," />],
  [17.3, 18.8, <Caption text="what you *wore and wore out*," />],
  [18.8, 21.2, <Caption text="or what you *gave in charity* and sent ahead?" />],
];
const SFX: Cue[] = [[0, 'impact', 0.5, 2], [0, 'shimmer', 0.35, 3], [5.3, 'shimmer', 0.35, 3], [8.3, 'whoosh', 0.4, 1.5], [10.3, 'whoosh', 0.35, 1.5], [14.0, 'whoosh', 0.35, 1.5], [17.3, 'whoosh', 0.35, 1.5], [18.8, 'shimmer', 0.4, 2.4]];
export const Takathur: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[8.3]} endStart={21.2} duration={TK_DURATION} audio="audio/takathur-narration.mp3" sfx={SFX} />;
