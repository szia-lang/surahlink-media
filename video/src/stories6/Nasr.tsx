import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {Multitudes, Council, Sunset} from './kit2';

export const NS_DURATION = 25;
const SHOTS: Shot[] = [
  [0, 3.9, <Multitudes />],
  [3.9, 9.1, <Council />, 'whip'],
  [9.1, 12.4, <Multitudes />, 'zoom'],
  [12.4, 14.2, <Council young />, 'whip'],
  [14.2, 20.6, <Sunset />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.9, <TitleCard title="SURAH AN-NASR" refKey="110:1" line="It sounds like *good news*" />],
  [3.9, 6.9, <Caption text="But one companion understood *something no one else did*." />],
  [6.9, 9.1, <Caption text="Umar asked *the elders of Badr* what it meant." />],
  [9.1, 12.4, <AyahCard refKey="110:3" range={[0, 3]} gold={[0, 1, 2]} partial tr="*Then exalt with praise of your Lord* and ask forgiveness of Him" />],
  [12.4, 14.2, <Caption text="Then he asked young *Ibn Abbas*." size={68} />],
  [14.2, 17.9, <Caption text="“It is the sign of *the Prophet's ﷺ death*. His mission was complete.”" />],
  [17.9, 20.6, <HadithCard source="UMAR · SAHIH AL-BUKHARI" text="I know nothing of it except what you know" gold="except what you know" size={52} />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.45, 3], [0, 'crowd', 0.3, 3.9], [3.9, 'whoosh', 0.4, 1.5], [9.1, 'shimmer', 0.35, 3], [9.1, 'crowd', 0.25, 3.3], [12.4, 'whoosh', 0.4, 1.5], [14.2, 'impact', 0.4, 2], [17.9, 'shimmer', 0.3, 2.7]];
export const Nasr: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[14.2]} endStart={20.6} duration={NS_DURATION} audio="audio/nasr-narration.mp3" sfx={SFX} />;
