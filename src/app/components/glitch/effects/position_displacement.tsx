'use client';


import { ReactNode, useEffect, useRef } from 'react';


interface PositionDisplacementEffectProps {
  intensity: number;
  duration: number;
  phase: 'idle' | 'easeIn' | 'active' | 'easeOut';
  children: ReactNode;
}

export function PositionDisplacementEffect({
  intensity,
  duration,
  phase,
  children,
}: PositionDisplacementEffectProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase === 'idle' || intensity === 0) {
      if (containerRef.current) {
        containerRef.current.style.transform = '';
      }
      return;
    }

    const animate = (time: number) => {
      if (!containerRef.current) return;
      if (startTimeRef.current === null) startTimeRef.current = time;

      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // random position shifts that get more intense during active phase
      const phaseMultiplier = phase === 'active' ? 1 : 0.4;
      const maxShift = intensity * phaseMultiplier;
      
      const x = (Math.random() - 0.5) * maxShift * 2;
      const y = (Math.random() - 0.5) * maxShift;
      
      containerRef.current.style.transform = `translate(${x}px, ${y}px)`;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        containerRef.current.style.transform = '';
        startTimeRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (containerRef.current) containerRef.current.style.transform = '';
    };
  }, [phase, intensity, duration]);

  return (
    <span ref={containerRef} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </span>
  );
}