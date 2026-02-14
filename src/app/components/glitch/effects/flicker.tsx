'use client';

import { GlitchPhase } from '../glitch_state';

interface FlickerEffectProps {
  phase: GlitchPhase;
  shouldFlicker: boolean;
}

export function FlickerEffect({ phase, shouldFlicker }: FlickerEffectProps) {
  if (phase !== 'active' || !shouldFlicker) return null;
  return (
    <span
      className="absolute inset-0 z-30 pointer-events-none bg-white"
      style={{
        opacity: 0.1,
        animation: 'glitch-noise 0.05s linear',
        mixBlendMode: 'overlay',
      }}
    />
  );
}