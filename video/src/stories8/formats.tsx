import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import ayat from '../data/ayat.json';
import {QURAN_FONT} from '../components/AyahCard';
import {nunito} from '../fx/scenes';
import {ez} from '../fx/fx';

// New video FORMATS (Nov 25): quiz, text-message story, word-by-word ayah. All text readable on frame 1.
const useSec = () => useCurrentFrame() / useVideoConfig().fps;
const gold = (text: string) => text.split('*').map((p, i) => (i % 2 ? <span key={i} style={{color: '#b8862a'}}>{p}</span> : <span key={i}>{p}</span>));

// ---------- QUIZ ----------
export type Q = {q: string; options: string[]; answer: number};
// One question: options shown at once, a 3 s timer bar, then the right answer turns green.
export const QuizCard: React.FC<{n: number; total: number; item: Q; reveal: number}> = ({n, total, item, reveal}) => {
  const t = useSec();
  const {fps} = useVideoConfig();
  const f = useCurrentFrame();
  const s = spring({frame: f, fps, config: {damping: 14, mass: 0.6}});
  const shown = t >= reveal;
  const timer = 1 - ez(t, 0.6, reveal, 0, 1);
  return (
    <AbsoluteFill style={{fontFamily: nunito, fontWeight: 900, alignItems: 'center'}}>
      <div style={{marginTop: 180, color: '#f9d77a', fontSize: 54, letterSpacing: 4, textShadow: '0 5px 0 rgba(0,0,0,.5)'}}>QUESTION {n}/{total}</div>
      <div style={{marginTop: 30, width: 900, background: '#f6efdc', border: '10px double #24503a', padding: '34px 36px', fontSize: 68, lineHeight: 1.12, color: '#1d2b24', textAlign: 'center', boxShadow: '0 10px 0 rgba(0,0,0,.25)', transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`}}>{item.q}</div>
      <div style={{marginTop: 40, width: 860, height: 22, background: 'rgba(255,255,255,.2)', borderRadius: 11, overflow: 'hidden'}}><div style={{width: `${timer * 100}%`, height: '100%', background: timer < 0.35 ? '#e0552a' : '#f9d77a'}} /></div>
      {item.options.map((o, i) => {
        const right = shown && i === item.answer;
        const wrong = shown && i !== item.answer;
        return (
          <div key={i} style={{marginTop: 34, width: 860, padding: '26px 34px', borderRadius: 24, fontSize: 60, textAlign: 'left', background: right ? '#2f8a4a' : '#ffffff', color: right ? '#fff' : '#1d2b24', opacity: wrong ? 0.45 : 1, boxShadow: '0 8px 0 rgba(0,0,0,.3)', transform: right ? `scale(${1 + 0.04 * Math.sin(Math.min(1, (t - reveal) * 4) * Math.PI)})` : undefined}}>
            {['A', 'B', 'C'][i]}. {o} {right ? '✓' : ''}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- TEXT-MESSAGE STORY ----------
export type Msg = {t: number; from: 'them' | 'me'; text?: string; ayah?: {key: keyof typeof ayat; range: [number, number]; tr: string}};
const Bubble: React.FC<{m: Msg; age: number}> = ({m, age}) => {
  const {fps} = useVideoConfig();
  const s = m.t === 0 ? 1 : spring({frame: Math.round(age * fps), fps, config: {damping: 14, mass: 0.5}});
  const me = m.from === 'me';
  return (
    <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', marginTop: 22, transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, transformOrigin: me ? 'right bottom' : 'left bottom', opacity: s}}>
      <div style={{maxWidth: 680, padding: m.ayah ? '22px 26px' : '22px 30px', borderRadius: 34, background: me ? '#2f8a4a' : '#e9e9ee', color: me ? '#fff' : '#111', fontFamily: nunito, fontWeight: 800, fontSize: 46, lineHeight: 1.2}}>
        {m.text}
        {m.ayah && (
          <div style={{background: '#f6efdc', borderRadius: 22, padding: '18px 22px', color: '#1d2b24', textAlign: 'center'}}>
            <div style={{fontSize: 26, color: '#5b6a60', letterSpacing: 2}}>SURAH AL-BAQARAH · {m.ayah.key}</div>
            <div style={{fontFamily: QURAN_FONT, fontSize: 52, lineHeight: 1.9, color: '#24503a', direction: 'rtl'}}>{ayat[m.ayah.key].words.slice(m.ayah.range[0], m.ayah.range[1] + 1).join(' ')}</div>
            <div style={{fontSize: 38, lineHeight: 1.2}}>“{gold(m.ayah.tr)}”</div>
          </div>
        )}
      </div>
    </div>
  );
};
export const Chat: React.FC<{name: string; msgs: Msg[]}> = ({name, msgs}) => {
  const t = useSec();
  const visible = msgs.filter((m) => t >= m.t);
  const typing = msgs.find((m) => m.t > t && m.t - t < 1.1 && m.from === 'them');
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#141a2e, #24304a)', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 900, height: 1640, background: '#ffffff', borderRadius: 70, border: '14px solid #0b0b10', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 60px rgba(0,0,0,.5)'}}>
        <div style={{height: 190, background: '#f4f4f7', borderBottom: '2px solid #ddd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 18, fontFamily: nunito}}>
          <div style={{width: 84, height: 84, borderRadius: 42, background: '#9aa0a6', color: '#fff', fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{name[0]}</div>
          <div style={{fontWeight: 800, fontSize: 34, color: '#111', marginTop: 6}}>{name}</div>
        </div>
        <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}><div style={{position: 'absolute', left: 34, right: 34, bottom: 40, display: 'flex', flexDirection: 'column'}}>
          {visible.map((m, i) => <Bubble key={i} m={m} age={t - m.t} />)}
          {typing && <div style={{marginTop: 22, alignSelf: 'flex-start', background: '#e9e9ee', borderRadius: 34, padding: '24px 30px', display: 'flex', gap: 12}}>{[0, 1, 2].map((d) => <div key={d} style={{width: 18, height: 18, borderRadius: 9, background: '#8a8a92', opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 6 + d))}} />)}</div>}
        </div></div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- WORD-BY-WORD AYAH ----------
// Arabic words (from the dataset) appear one at a time, then the exact translation.
export const WordReveal: React.FC<{refKey: keyof typeof ayat; start: number; per: number; trAt: number; tr: string; label: string}> = ({refKey, start, per, trAt, tr, label}) => {
  const t = useSec();
  const words = ayat[refKey].words;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 940, textAlign: 'center'}}>
        <div style={{fontFamily: nunito, fontWeight: 800, fontSize: 32, color: '#f6efdc', letterSpacing: 3, opacity: 0.8}}>{label}</div>
        <div style={{fontFamily: QURAN_FONT, fontSize: 112, lineHeight: 2, color: '#fff6d0', direction: 'rtl', textShadow: '0 0 30px rgba(255,230,160,.5)'}}>
          {words.map((w, i) => { const a = ez(t, start + i * per, start + i * per + 0.5, 0, 1); return <span key={i} style={{opacity: a, display: 'inline-block', transform: `translateY(${(1 - a) * 20}px)`, margin: '0 10px'}}>{w}</span>; })}
        </div>
        <div style={{fontFamily: nunito, fontWeight: 900, fontSize: 60, color: '#ffffff', lineHeight: 1.2, opacity: ez(t, trAt, trAt + 0.6, 0, 1), textShadow: '0 5px 0 rgba(0,0,0,.5)'}}>“{gold(tr).map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>)}”</div>
      </div>
    </AbsoluteFill>
  );
};
