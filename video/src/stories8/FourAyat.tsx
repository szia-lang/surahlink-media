import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText, AmirNightBack} from '../stories7/kit3';
import {AmirDua, TwoEases} from '../stories6/kit2';
import {Masjid} from '../stories6/kit';
import {Stage, Rf, Flames, Light, cam, ez, useT} from '../fx/fx';

// FORMAT: numbered "save this" list.
const FireLight: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 4, 1.05, 1.2), 180, 440)}><Rf x={0} y={0} w={360} h={640} c="#140806" /><Flames x={0} y={640} w={360} h={330} t={t} n={140} cool={ez(t, 1, 3.5, 0, 0.8)} /><Light x={180} y={430} r={13} t={t} /></Stage>;
};
const Num: React.FC<{n: number}> = ({n}) => <NativeText text={`#${n}`} top={1280} size={220} color="#f9d77a" />;
export const FA_DURATION = 27;
const SHOTS: Shot[] = [
  [0, 3.4, <AmirNightBack />],
  [3.4, 7.8, <Masjid rays={1} />, 'whip'],
  [7.8, 11.8, <AmirDua />, 'whip'],
  [11.8, 14.8, <TwoEases suns={2} />, 'whip'],
  [14.8, 22.4, <FireLight />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.4, <NativeText label="SAVE THIS:" text="4 ayat for when your heart won't calm down" top={260} size={80} />],
  [3.4, 7.8, <><AyahCard refKey="13:28" range={[6, 10]} gold={[6, 7, 8, 9, 10]} partial tr="*Unquestionably, by the remembrance of Allah hearts are assured*" /><Num n={1} /></>],
  [7.8, 11.8, <><AyahCard refKey="65:3" range={[5, 10]} gold={[5, 6, 7, 8, 9, 10]} partial tr="And *whoever relies upon Allah - then He is sufficient for him*" /><Num n={2} /></>],
  [11.8, 14.8, <><AyahCard refKey="2:153" range={[6, 9]} gold={[6, 7, 8, 9]} partial tr="*Indeed, Allah is with the patient*" /><Num n={3} /></>],
  [14.8, 18.5, <><Caption text="The words *Ibrahim* said when he was thrown into the fire:" /><Num n={4} /></>],
  [18.5, 22.4, <><AyahCard refKey="3:173" range={[13, 16]} gold={[13, 14, 15, 16]} partial tr="*Sufficient for us is Allah, and He is the best Disposer of affairs*" /><Num n={4} /></>],
];
const SFX: Cue[] = [[0, 'pop', 0.6, 0.5], [0, 'shimmer', 0.35, 3], [3.4, 'whoosh', 0.45, 1.5], [7.8, 'whoosh', 0.45, 1.5], [11.8, 'whoosh', 0.45, 1.5], [14.8, 'whoosh', 0.45, 1.5], [18.5, 'shimmer', 0.45, 3.5]];
export const FourAyat: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={22.4} duration={FA_DURATION} audio="audio/fourayat-narration.mp3" sfx={SFX} />;
