'use client';

import { useEffect, useRef, useState } from 'react';

export type GlitchPhase = 'idle' | 'easeIn' | 'active' | 'easeOut';

interface UseGlitchStateProps {
  duration?: number;            // total glitch duration (ms)
  delay?: number;
  variance?: number;
  glitchCountForFlash?: number;
  glitchIntensity?: number;
  enabled?: boolean;
  delayKey?: string;
}

const FLASH_DURATION = 20;
const FLASH_GAP = 10;
const NOISE_FRAMES = 3;
const DISPLACEMENT_INTENSITY = 60;

export function useGlitchState({
  duration = 80,                 // default 80ms if not provided
  delay = 6000,
  variance = 500,
  glitchCountForFlash = 3,
  glitchIntensity = 1,
  enabled = true,
  delayKey = '',
}: UseGlitchStateProps) {
  const [phase, setPhase] = useState<GlitchPhase>('idle');
  const [isInverted, setIsInverted] = useState(false);
  const [glitchCount, setGlitchCount] = useState(0);
  const [displacement, setDisplacement] = useState(0);

  const [currentIntensity, setCurrentIntensity] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const triggerDoubleFlash = () => {
    setIsInverted(true);
    timerRef.current = setTimeout(() => {
      setIsInverted(false);
      timerRef.current = setTimeout(() => {
        setIsInverted(true);
        timerRef.current = setTimeout(() => setIsInverted(false), FLASH_DURATION);
      }, FLASH_GAP);
    }, FLASH_DURATION);
  };

  const triggerGlitch = () => {
    clearTimers();
    const base = (Math.floor(Math.random() * NOISE_FRAMES) + 1) * DISPLACEMENT_INTENSITY;
    const jitter = Math.floor(Math.random() * 10);
    setDisplacement(base + jitter);
    setPhase('easeIn');
    setCurrentIntensity(glitchIntensity);

    // easeIn duration = 20% of total duration
    timerRef.current = setTimeout(() => {
      setPhase('active');
      setCurrentIntensity(1 * glitchIntensity);
      setGlitchCount((prev) => {
        const newCount = prev + 1;
        if (newCount % glitchCountForFlash === 0) triggerDoubleFlash();
        return newCount;
      });

      // active duration = 60% of total duration
      timerRef.current = setTimeout(() => {
        setPhase('easeOut');
        setCurrentIntensity(0.3 * glitchIntensity);

        // easeOut duration = 20% of total duration
        timerRef.current = setTimeout(() => {
          setPhase('idle');
          setCurrentIntensity(0);
        }, duration * 0.2);
      }, duration * 0.6);
    }, duration * 0.2);
  };

  const scheduleNext = () => {
    if (!enabled) return;
    const min = Math.max(100, delay - variance);
    const max = delay + variance;
    const nextDelay = Math.random() * (max - min) + min;
    timerRef.current = setTimeout(() => {
      triggerGlitch();
      scheduleNext();
    }, nextDelay);
  };

  useEffect(() => {
    if (enabled) {
      scheduleNext();
    }
    return clearTimers;
  }, [enabled, delay, variance, glitchCountForFlash, delayKey]);

  return {
    phase,
    intensity: currentIntensity,
    isInverted,
    displacement,
    glitchDuration: duration,
    triggerGlitch,
  };
}