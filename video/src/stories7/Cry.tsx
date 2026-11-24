import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText, Recital} from './kit3';
import {MushafShot} from '../stories6/kit';

// HOOK TEST: question hook.
export const CY_DURATION = 28;
const SHOTS: Shot[] = [
  [0, 3.7, <Recital tears z={[1.45, 1.2]} />],
  [3.7, 9.4, <Recital />, 'whip'],
  [9.4, 11.8, <Recital z={[1.25, 1.4]} />, 'zoom'],
  [11.8, 14.6, <MushafShot />, 'whip'],
  [14.6, 20.4, <Recital z={[1.1, 1.3]} />, 'zoom'],
  [20.4, 23.6, <Recital tears z={[1.35, 1.55]} />],
];
const OVERLAYS: Overlay[] = [
  [0, 3.7, <NativeText text="Why did the Prophet ﷺ cry listening to the Quran?" top={280} size={80} />],
  [3.7, 5.9, <Caption text="He asked *Ibn Mas'ud* to recite to him." />],
  [5.9, 9.4, <Caption text="“Recite to you, *when it was revealed to you*?”" />],
  [9.4, 11.8, <Caption text="“I love to hear it *from someone else*.”" />],
  [11.8, 14.6, <Caption text="So he recited *Surah An-Nisa*, until this ayah:" />],
  [14.6, 20.4, <AyahCard refKey="4:41" gold={[7, 8, 9, 10, 11]} trSize={40} tr="So how will it be when We bring from every nation a witness *and we bring you against these as a witness*" />],
  [20.4, 23.6, <Caption text="He said: “*Enough.*” And his eyes were *full of tears*." />],
];
const SFX: Cue[] = [[0, 'impact', 0.6, 2], [0, 'shimmer', 0.35, 3], [3.7, 'whoosh', 0.4, 1.5], [9.4, 'whoosh', 0.3, 1.5], [11.8, 'whoosh', 0.4, 1.5], [14.6, 'shimmer', 0.45, 3.5], [20.4, 'shimmer', 0.3, 3]];
export const Cry: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={23.6} duration={CY_DURATION} audio="audio/cry-narration.mp3" sfx={SFX} />;
