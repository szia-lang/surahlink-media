import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {Temple} from './kit4';

// CURIOSITY HOOK: riddle + "pause and guess".
export const ID_DURATION = 25.5;
const SHOTS: Shot[] = [
  [0, 3.6, <Temple smashed={1} axe hook />],
  [3.6, 4.7, <Temple smashed={1} axe />, 'zoom'],
  [4.7, 7.9, <Temple light />, 'whip'],
  [7.9, 11.5, <Temple smashed={0.5} light />],
  [11.5, 14.2, <Temple smashed={1} axe crowd />, 'whip'],
  [14.2, 18.2, <Temple smashed={1} axe crowd light />, 'zoom'],
  [18.2, 21.0, <Temple smashed={1} axe light />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.6, <NativeText text="He smashed every idol… except the biggest one. WHY?" top={230} size={80} />],
  [3.6, 4.7, <NativeText text="Pause and guess" top={300} size={110} color="#f9d77a" />],
  [4.7, 7.9, <Caption text="Ibrahim waited until his people *left the temple*." />],
  [7.9, 11.5, <AyahCard refKey="21:58" range={[0, 4]} gold={[2, 3, 4]} partial tr="So he made them into fragments, *except a large one among them*" />],
  [11.5, 14.2, <AyahCard refKey="21:62" gold={[1, 2, 3, 4]} tr="*Have you done this to our gods, O Abraham?*" />],
  [14.2, 18.2, <AyahCard refKey="21:63" gold={[2, 3, 4, 5, 6, 7, 8]} trSize={40} tr="Rather, *this - the largest of them - did it, so ask them, if they should be able to speak*" />],
  [18.2, 21.0, <NativeText text="Their gods couldn't even speak." top={280} size={92} color="#f9d77a" />],
];
const SFX: Cue[] = [[0, 'impact', 0.8, 2.5], [3.6, 'tick', 0.5, 1.1], [4.7, 'whoosh', 0.4, 1.5], [8.1, 'impact', 0.6, 1.5], [8.5, 'impact', 0.5, 1.5], [9.0, 'impact', 0.5, 1.5], [11.5, 'crowd', 0.5, 6.7], [14.2, 'shimmer', 0.4, 3], [18.2, 'whoosh', 0.4, 1.5]];
export const Idols: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[0, 8.1]} endStart={21.0} duration={ID_DURATION} audio="audio/idols-narration.mp3" sfx={SFX} />;
