import React from 'react';
import {Caption} from '../components/Caption';
import {AyahCard} from '../components/AyahCard';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {NativeText, AmirNightBack} from '../stories7/kit3';
import {AmirDua} from '../stories6/kit2';
import {Masjid} from '../stories6/kit';
import {Stage, Rf, Light, cam, ez, useT} from '../fx/fx';
import {Whale, Bubbles} from '../fx/scenes';

// FORMAT: "save this" list #2 (narrated). Prophets only as light.
const Deep: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 8, 1.05, 1.25), 180, 380)}><Rf x={0} y={0} w={360} h={640} c="#06121e" /><Bubbles t={t} /><Whale x={180} y={380} s={1.1} t={t} glow={1} /><Light x={190} y={380} r={7} t={t} /></Stage>;
};
const NilePath: React.FC = () => {
  const t = useT();
  return <Stage cam={cam(ez(t, 0, 7, 1.05, 1.2), 180, 430)}><Rf x={0} y={0} w={360} h={640} c="#1a2038" /><Rf x={220} y={280} w={130} h={220} c="#2a2440" /><Rf x={0} y={500} w={360} h={140} c="#8a7050" /><Light x={80 + t * 8} y={470} r={9} t={t} /></Stage>;
};
const Num: React.FC<{n: number}> = ({n}) => <NativeText text={`#${n}`} top={1280} size={220} color="#f9d77a" />;
export const DUA_DURATION = 30.5;
const SHOTS: Shot[] = [
  [0, 3.5, <AmirNightBack />],
  [3.5, 10.2, <NilePath />, 'whip'],
  [10.2, 18.1, <Deep />, 'whip'],
  [18.1, 21.7, <Masjid rays={1} />, 'whip'],
  [21.7, 27.2, <AmirDua />, 'zoom'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.5, <NativeText label="SAVE THIS:" text="3 duas from the Quran you should memorize" top={260} size={80} />],
  [3.5, 6.3, <><Caption text="The dua of *Musa* before he faced Pharaoh:" /><Num n={1} /></>],
  [6.3, 8.6, <><AyahCard refKey="20:25" range={[1, 4]} gold={[1, 2, 3, 4]} partial tr="*My Lord, expand for me my breast*" /><Num n={1} /></>],
  [8.6, 10.2, <><AyahCard refKey="20:26" gold={[0, 1, 2]} tr="*And ease for me my task*" /><Num n={1} /></>],
  [10.2, 12.8, <><Caption text="The dua of *Yunus* inside the whale:" /><Num n={2} /></>],
  [12.8, 18.1, <><AyahCard refKey="21:87" range={[14, 22]} gold={[14, 15, 16, 17, 18]} partial tr="*There is no deity except You; exalted are You.* Indeed, I have been of the wrongdoers" /><Num n={2} /></>],
  [18.1, 21.7, <><Caption text="The dua *the Prophet ﷺ* made most often (Bukhari):" /><Num n={3} /></>],
  [21.7, 27.2, <><AyahCard refKey="2:201" range={[3, 13]} gold={[3, 4, 5, 6, 7, 8, 9, 10]} partial trSize={40} tr="*Our Lord, give us in this world good and in the Hereafter good* and protect us from the punishment of the Fire" /><Num n={3} /></>],
];
const SFX: Cue[] = [[0, 'pop', 0.6, 0.5], [0, 'shimmer', 0.35, 3], [3.5, 'whoosh', 0.45, 1.5], [6.3, 'shimmer', 0.4, 2.3], [10.2, 'whoosh', 0.45, 1.5], [10.2, 'underwater', 0.3, 7.9], [12.8, 'shimmer', 0.4, 3], [18.1, 'whoosh', 0.45, 1.5], [21.7, 'shimmer', 0.45, 3.5]];
export const Duas: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={27.2} duration={DUA_DURATION} audio="audio/duas-narration.mp3" sfx={SFX} />;
