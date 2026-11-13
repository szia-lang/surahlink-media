import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadAmiri} from '@remotion/google-fonts/AmiriQuran';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import ayat from '../data/ayat.json';

const amiri = loadAmiri().fontFamily;
const nunito = loadNunito('normal', {weights: ['800', '900']}).fontFamily;

// Ayah card. Arabic always comes from the dataset by word range; never typed by hand.
// tr: the Sahih International quote, with *stars* around the gold phrase.
export const AyahCard: React.FC<{refKey: keyof typeof ayat; range?: [number, number]; gold?: number[]; tr: string; partial?: boolean; trSize?: number}> = ({refKey, range, gold = [], tr, partial, trSize = 46}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, mass: 0.6}});
  const ay = ayat[refKey];
  const [a, b] = range ?? [0, ay.words.length - 1];
  const parts = tr.split('*');
  return (
    <div style={{position: 'absolute', top: 150, left: 70, right: 70, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: s, background: '#f6efdc', border: '10px double #24503a', padding: '20px 30px 26px', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>
      <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 30, color: '#5b6a60', letterSpacing: 2}}>SURAH {ay.surah.toUpperCase()} · {refKey}</div>
      <div style={{fontFamily: amiri, fontSize: 72, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>
        {partial && a > 0 ? '… ' : ''}
        {ay.words.slice(a, b + 1).map((w, i) => <span key={i} style={{color: gold.includes(a + i) ? '#b8862a' : undefined}}>{w}{' '}</span>)}
      </div>
      <div style={{fontFamily: nunito, fontWeight: 900, fontSize: trSize, color: '#1d2b24', lineHeight: 1.15}}>
        “{parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>))}”
      </div>
    </div>
  );
};
