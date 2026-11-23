import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {Lost, AmirDua} from './kit2';

export const ZM_DURATION = 27;
const SHOTS: Shot[] = [
  [0, 3.5, <Lost />],
  [3.5, 9.2, <Lost />, 'zoom'],
  [9.2, 11.0, <Lost light={0.5} />, 'whip'],
  [11.0, 19.6, <Lost light={1} />],
  [19.6, 22.6, <AmirDua />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.5, <TitleCard title="SURAH AZ-ZUMAR" refKey="39:53" range={[6, 10]} line="They had killed. *Is there a way back?*" />],
  [3.5, 6.7, <Caption text="They came to the Prophet ﷺ with *one question*:" />],
  [6.7, 9.2, <Caption text="“Is there *any way back* for people like us?”" />],
  [9.2, 11.0, <Caption text="Allah answered in *Surah Az-Zumar*:" />],
  [11.0, 16.4, <AyahCard refKey="39:53" range={[0, 10]} gold={[6, 7, 8, 9, 10]} partial trSize={40} tr="Say, O My servants who have transgressed against themselves, *do not despair of the mercy of Allah*" />],
  [16.4, 19.6, <AyahCard refKey="39:53" range={[11, 15]} gold={[13, 14, 15]} partial tr="Indeed, *Allah forgives all sins*" />],
  [19.6, 22.6, <Caption text="If you think you've gone too far, *this ayah is for you*." />],
];
const SFX: Cue[] = [[0, 'storm', 0.35, 9.2], [0, 'impact', 0.5, 2], [3.5, 'whoosh', 0.35, 1.5], [9.2, 'whoosh', 0.4, 1.5], [11.0, 'shimmer', 0.45, 3], [16.4, 'shimmer', 0.4, 3], [19.6, 'whoosh', 0.35, 1.5]];
export const Zumar: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[11.0]} endStart={22.6} duration={ZM_DURATION} audio="audio/zumar-narration.mp3" sfx={SFX} />;
