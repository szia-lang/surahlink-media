import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

export const TestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#0b1f1a'}}>
      <ThreeCanvas width={width} height={height} camera={{position: [0, 0, 5]}}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} />
        <mesh rotation={[frame * 0.02, frame * 0.03, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
