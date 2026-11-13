import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Nunito';
import {AMIR} from './characters/amir';
import {PixelSprite} from './components/PixelSprite';
import {BRAND, SuralinkIcon} from './components/SuralinkLogo';

const {fontFamily} = loadFont('normal', {weights: ['600', '800', '900']});

export type EndCardProps = {
  headline: string; // short, 3–5 words
  cta: string; // button text
  sub: string; // tiny line under button
  screen: 'home' | 'surah' | 'library' | 'onboarding';
};

export const endCardDefaults: EndCardProps = {
  headline: 'Understand what you recite',
  cta: 'Download SuraLink',
  sub: 'Link in bio',
  screen: 'home',
};

// ~4s end card that goes on the end of every video.
export const EndCard: React.FC<EndCardProps> = ({headline, cta, sub, screen}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, mass: 0.7}});

  const bg = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  const phoneY = interpolate(pop(4), [0, 1], [900, 0]);
  const logoS = pop(12);
  const headO = interpolate(frame, [18, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const headY = interpolate(frame, [18, 28], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const btnS = pop(34);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, frame - 50) / 5);

  // Amir walks in from the left, then points at the phone.
  const walkEnd = 40;
  const amirX = interpolate(frame, [8, walkEnd], [-260, 70], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const amirRows = frame < walkEnd ? AMIR.walk[Math.floor(frame / 4) % 4] : AMIR.poses.point;

  return (
    <AbsoluteFill style={{fontFamily, opacity: bg, background: `radial-gradient(circle at 50% 38%, #f4f0fd 0%, ${BRAND.cream} 60%)`}}>
      {/* Brand row */}
      <div style={{position: 'absolute', top: 150, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, transform: `scale(${logoS})`}}>
        <div style={{filter: 'drop-shadow(0 12px 24px rgba(90,63,192,.25))'}}><SuralinkIcon size={150} /></div>
        <div style={{fontSize: 96, fontWeight: 900, color: BRAND.purple, letterSpacing: -2}}>SuraLink</div>
      </div>

      {/* Headline */}
      <div style={{position: 'absolute', top: 350, textAlign: 'center', opacity: headO, transform: `translateY(${headY}px)`, fontSize: 70, fontWeight: 900, color: BRAND.ink, lineHeight: 1.05, maxWidth: 640, margin: '0 auto', left: 0, right: 0, letterSpacing: -1}}>
        {headline}<span style={{color: BRAND.orange}}>.</span>
      </div>

      {/* Phone */}
      <div style={{position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `translateY(${phoneY}px)`}}>
        <Img src={staticFile(`app/${screen}.png`)} style={{width: 430, borderRadius: 40, boxShadow: '0 40px 80px rgba(40,25,100,.28)'}} />
      </div>

      {/* Amir */}
      <div style={{position: 'absolute', left: amirX, top: 1100}}>
        <PixelSprite rows={amirRows} palette={AMIR.palette} scale={13} />
      </div>

      {/* CTA button */}
      <div style={{position: 'absolute', bottom: 210, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        <div style={{transform: `scale(${btnS * pulse})`, background: BRAND.purple, color: 'white', fontSize: 54, fontWeight: 800, padding: '30px 70px', borderRadius: 999, boxShadow: '0 18px 40px rgba(90,63,192,.35)', display: 'flex', gap: 22, alignItems: 'center'}}>
          {cta} <span style={{fontSize: 56}}>→</span>
        </div>
        <div style={{opacity: btnS, fontSize: 36, fontWeight: 700, color: BRAND.muted}}>{sub}</div>
      </div>
    </AbsoluteFill>
  );
};
