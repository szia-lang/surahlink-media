import React from 'react';
import {Caption} from '../components/Caption';
import {HadithCard} from '../fx/scenes';
import {Timeline, Shot, Overlay, Cue} from '../fx/Timeline';
import {TitleCard} from './TitleCard';
import {QadrNight, BigNumber, AmirDua} from './kit2';
import {Madinah} from './kit';

export const QD_DURATION = 24.5;
const SHOTS: Shot[] = [
  [0, 3.3, <QadrNight />],
  [3.3, 7.3, <QadrNight />, 'zoom'],
  [7.3, 12.4, <Madinah />, 'whip'],
  [12.4, 17.6, <QadrNight amir />, 'zoom'],
  [17.6, 19.9, <AmirDua night />, 'whip'],
];
const OVERLAYS: Overlay[] = [
  [0, 3.3, <TitleCard title="SURAH AL-QADR" refKey="97:3" line="*One night* better than a thousand months" />],
  [3.3, 7.3, <BigNumber from={0} to={83} dur={2.5} label="YEARS OF WORSHIP" top={600} />],
  [7.3, 12.4, <Caption text="Aisha asked the Prophet ﷺ: “If I find that night, *what should I say*?”" />],
  [12.4, 17.6, <HadithCard source="AT-TIRMIDHI" text="O Allah, You are Pardoning, You love to pardon, so pardon me" gold="so pardon me" size={52} />],
  [17.6, 19.9, <Caption text="Memorize it now, *before the night comes*." />],
];
const SFX: Cue[] = [[0, 'shimmer', 0.5, 3.3], [3.3, 'whoosh', 0.45, 1.5], [7.3, 'whoosh', 0.35, 1.5], [12.4, 'shimmer', 0.45, 3.5], [17.6, 'whoosh', 0.35, 1.5]];
export const Qadr: React.FC = () => <Timeline shots={SHOTS} overlays={OVERLAYS} flashes={[]} endStart={19.9} duration={QD_DURATION} audio="audio/qadr-narration.mp3" sfx={SFX} />;
