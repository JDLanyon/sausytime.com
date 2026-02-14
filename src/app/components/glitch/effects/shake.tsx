'use client';

import { useEffect, useRef } from 'react';
import { GlitchPhase } from '../glitch_state';


const MAX_SHAKE_OFFSET = 6;
const SHAKE_STEPS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

interface ShakeEffectProps {
  intensity: number;
  duration: number;
  phase: GlitchPhase;
  children: React.ReactNode;
  className?: string;
}

export function ShakeEffect({ intensity, duration, phase, children, className = '' }: ShakeEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase === 'idle' || intensity === 0) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!ref.current) return;
      if (startTimeRef.current === null) startTimeRef.current = time;

      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Find which shake step we're at
      const stepIndex = Math.floor(progress * SHAKE_STEPS.length);
      const step = SHAKE_STEPS[Math.min(stepIndex, SHAKE_STEPS.length - 1)];

      // Random direction per step (same as original pseudo‑randomness)
      const x = (Math.random() > 0.5 ? -1 : 1) * MAX_SHAKE_OFFSET * intensity;
      const y = (Math.random() > 0.5 ? -1 : 1) * MAX_SHAKE_OFFSET * intensity;

      ref.current.style.transform = `translate(${x}px, ${y}px)`;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        ref.current.style.transform = 'translate(0, 0)';
        startTimeRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (ref.current) ref.current.style.transform = '';
    };
  }, [phase, intensity, duration]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}