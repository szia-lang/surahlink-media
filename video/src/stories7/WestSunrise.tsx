import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText, WestSun, DoorClosing, OpenDoor} from './kit3';

// HOOK TEST: end-times fear hook.
export const WS_DURATION = 24.5;
const SHOTS: Shot[] = [
  [0, 2.5, <WestSun rise={[0.2, 0.7]} />],
  [2.5, 5.8, <WestSun crowd rise={[0.7, 1]} />, 'whip'],
  [5.8, 10.0, <WestSun crowd rise={[1, 1]} />, 'zoom'],
  [10.0, 16.2, <DoorClosing />, 'whip'],
  [16.2, 19.9, <OpenDoor />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 2.5, <NativeText text="One morning, the sun will rise from the WEST" top={260} size={84} />],
  [2.5, 5.8, <Caption text="Everyone on earth will believe. *But it will be too late.*" />],
  [5.8, 10.0, <HadithCard source="SAHIH AL-BUKHARI" text="When the people see it, they will all believe" gold="they will all believe" size={52} />],
  [10.0, 14.3, <AyahCard refKey="6:158" range={[14, 27]} gold={[19, 20, 21, 22]} partial trSize={38} tr="The Day that some of the signs of your Lord will come *no soul will benefit from its faith* as long as it had not believed before" />],
  [14.3, 16.2, <Caption text="*Surah Al-An'am* warned about this day." />],
  [16.2, 18.4, <Caption text="The door of repentance is *open today*." />],
  [18.4, 19.9, <NativeText text="Don't wait for the sun." top={300} size={96} color="#f9d77a" />],
];
const SFX: Cue[] = [[0, 'impact', 0.85, 2.5], [0, 'storm', 0.35, 5.8], [2.5, 'crowd', 0.35, 3.3], [5.8, 'whoosh', 0.4, 1.5], [10.0, 'shimmer', 0.4, 3], [11.5, 'door', 0.6, 2], [16.2, 'shimmer', 0.45, 3]];
export const WestSunrise: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[0.05]} endStart={19.9} duration={WS_DURATION} audio="audio/westsun-narration.mp3" sfx={SFX} />;
