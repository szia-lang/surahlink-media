import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {ArmyMarch, AntValley, KingSmiles} from './kit4';

// CURIOSITY HOOK: "why" mystery.
export const AN_DURATION = 27;
const SHOTS: Shot[] = [
  [0, 3.4, <ArmyMarch hook />],
  [3.4, 6.9, <ArmyMarch />, 'whip'],
  [6.9, 9.0, <ArmyMarch />, 'zoom'],
  [9.0, 11.7, <AntValley />, 'whip'],
  [11.7, 14.0, <AntValley close />, 'zoom'],
  [14.0, 16.5, <AntValley panic />, 'whip'],
  [16.5, 22.4, <KingSmiles />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.4, <NativeText text="Why did a king with an army of jinn smile… because of an ANT?" top={230} size={76} />],
  [3.4, 6.9, <Caption text="Prophet *Sulayman* was marching with his army:" />],
  [6.9, 9.0, <Caption text="*men, jinn and birds*." size={70} />],
  [9.0, 11.7, <Caption text="They reached *the valley of the ants*…" />],
  [11.7, 16.5, <AyahCard refKey="27:18" range={[6, 18]} gold={[10, 11, 12, 13]} partial trSize={38} tr="an ant said, O ants, *enter your dwellings that you not be crushed* by Solomon and his soldiers while they perceive not" />],
  [16.5, 18.5, <AyahCard refKey="27:19" range={[0, 3]} gold={[0, 1]} partial tr="*So Solomon smiled*, amused at her speech" />],
  [18.5, 22.4, <AyahCard refKey="27:19" range={[5, 12]} gold={[5, 6, 7, 8, 9]} partial tr="*My Lord, enable me to be grateful for Your favor* which You have bestowed upon me" />],
];
const SFX: Cue[] = [[0, 'impact', 0.7, 2.5], [0, 'crowd', 0.35, 9], [3.4, 'whoosh', 0.4, 1.5], [6.9, 'whoosh', 0.35, 1.5], [9.0, 'whoosh', 0.45, 1.5], [11.7, 'pop', 0.5, 0.5], [14.0, 'impact', 0.35, 1.5], [16.5, 'shimmer', 0.5, 3], [18.5, 'shimmer', 0.35, 3]];
export const Ant: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={22.4} duration={AN_DURATION} audio="audio/ant-narration.mp3" sfx={SFX} />;
