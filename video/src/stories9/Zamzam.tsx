import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {Valley, Pilgrims} from './kit4';
import {BigNumber} from '../stories6/kit2';

// CURIOSITY HOOK: everyday-mystery question ("do you know why?").
export const ZZ_DURATION = 25.5;
const SHOTS: Shot[] = [
  [0, 4.3, <Pilgrims />],
  [4.3, 10.0, <Valley />, 'whip'],
  [10.0, 12.2, <Valley thirst />, 'zoom'],
  [12.2, 16.4, <Valley run />, 'whip'],
  [16.4, 19.7, <Valley water={1} />],
  [19.7, 22.4, <Pilgrims />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 4.3, <NativeText text="Millions walk between these 2 hills every year. 7 times." top={220} size={76} />],
  [3.2, 4.3, <NativeText text="Do you know why?" top={540} size={96} color="#f9d77a" />],
  [4.3, 10.0, <AyahCard refKey="14:37" range={[0, 11]} gold={[5, 6, 7, 8]} partial trSize={40} tr="Our Lord, I have settled some of my descendants *in an uncultivated valley* near Your sacred House" />],
  [10.0, 12.2, <Caption text="The water ran out. *The baby was crying.*" />],
  [12.2, 16.4, <><Caption text="Hajar ran between *Safa and Marwa*, searching for help." /><BigNumber from={1} to={7} dur={3.8} label="TIMES" top={1100} /></>],
  [16.4, 19.0, <Caption text="Then *water burst from the ground*." />],
  [19.0, 19.7, <NativeText text="ZAMZAM" top={360} size={150} color="#8fd3f0" />],
  [19.7, 22.4, <AyahCard refKey="2:158" range={[0, 5]} gold={[1, 2, 3, 4, 5]} partial tr="*Indeed, as-Safa and al-Marwah are among the symbols of Allah*" />],
];
const SFX: Cue[] = [[0, 'crowd', 0.35, 4.3], [0, 'shimmer', 0.4, 3], [4.3, 'whoosh', 0.4, 1.5], [10.0, 'storm', 0.15, 2.2], [12.2, 'tick', 0.4, 3], [15.2, 'tick', 0.4, 1.2], [16.4, 'impact', 0.6, 2], [16.4, 'underwater', 0.45, 3.3], [19.0, 'shimmer', 0.5, 3], [19.7, 'crowd', 0.3, 2.7]];
export const Zamzam: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[16.4]} endStart={22.4} duration={ZZ_DURATION} audio="audio/zamzam-narration.mp3" sfx={SFX} />;
