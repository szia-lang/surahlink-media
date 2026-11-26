import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText} from '../stories7/kit3';
import {WordCard, TwoEases, AmirDua} from '../stories6/kit2';
import {Masjid, MushafShot} from '../stories6/kit';
import {WordReveal} from './formats';

// FORMAT: word breakdown #2 (narrated).
export const HM_DURATION = 26;
const SHOTS: Shot[] = [
  [0, 4.2, <Masjid rays={1} z={[1.25, 1.1]} />],
  [4.2, 9.0, <MushafShot lit={10} />, 'zoom'],
  [9.0, 12.8, <TwoEases suns={2} />, 'whip'],
  [12.8, 16.3, <TwoEases suns={0} />, 'whip'],
  [16.3, 21.5, <AmirDua />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 4.2, <><NativeText text="You say it 100 times a day. It means more than “thank you”" top={220} size={68} /><WordReveal refKey="1:2" start={-10} per={0} trAt={99} tr="" label="" /></>],
  [4.2, 5.6, <AyahCard refKey="1:2" tr="All praise is due to Allah, Lord of the worlds" />],
  [5.6, 9.0, <WordCard refKey="1:2" idx={0} meaning="*Al* + *hamd*" note="the (all of it) + praise" />],
  [9.0, 12.8, <Caption text="*Shukr* (thanks) is for what Allah *gives you*." />],
  [12.8, 16.3, <Caption text="*Hamd* (praise) is for *who He is*, even when you receive nothing." />],
  [16.3, 21.5, <WordCard refKey="1:2" idx={1} meaning="*to Allah*" note="all praise belongs to Him, in every situation" />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3], [4.2, 'whoosh', 0.4, 1.5], [5.6, 'pop', 0.5, 0.5], [9.0, 'whoosh', 0.35, 1.5], [12.8, 'whoosh', 0.35, 1.5], [16.3, 'shimmer', 0.45, 3]];
export const Hamd: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={21.5} duration={HM_DURATION} audio="audio/hamd-narration.mp3" sfx={SFX} />;
