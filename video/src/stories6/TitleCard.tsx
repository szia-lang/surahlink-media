import React from 'react';
import ayat from '../data/ayat.json';
import {QURAN_FONT} from '../components/AyahCard';
import {nunito} from '../fx/scenes';

// The original hook style that performed best (Duha, Kursi, Abasa): a cream card on frame 1 with
// the surah name, its Arabic (from the dataset only) and one line of tension underneath.
export const TitleCard: React.FC<{title: string; refKey: keyof typeof ayat; range?: [number, number]; line: string; titleSize?: number}> = ({title, refKey, range, line, titleSize = 74}) => {
  const words = ayat[refKey].words;
  const [a, b] = range ?? [0, words.length - 1];
  const parts = line.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 60, right: 60, textAlign: 'center', background: '#f6efdc', border: '10px double #24503a', padding: '20px 26px 24px', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: titleSize, color: '#24503a', letterSpacing: 2, lineHeight: 1.05}}>{title}</div>
      <div style={{fontFamily: QURAN_FONT, fontSize: 64, lineHeight: 1.8, color: '#b8862a', direction: 'rtl', marginTop: 6}}>{words.slice(a, b + 1).join(' ')}</div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 44, color: '#1d2b24', lineHeight: 1.15}}>{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}</div>
    </div>
  );
};
