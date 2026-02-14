'use client';

import { GlitchPhase } from '../glitch_state';

interface FlickerEffectProps {
  phase: GlitchPhase;
}

export function FlickerEffect({ phase }: FlickerEffectProps) {
  if (phase !== 'active' || Math.random() > 0.7) return null;
  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none bg-white"
      style={{
        opacity: 0.1,
        animation: 'flicker 0.05s linear', // simple custom, no CSS needed for such a short effect
        mixBlendMode: 'overlay',
      }}
    />
  );
}