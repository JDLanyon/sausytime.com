'use client';

import { useEffect, useRef, useState } from 'react';

export type GlitchPhase = 'idle' | 'easeIn' | 'active' | 'easeOut';

interface UseGlitchStateProps {
  delay?: number;
  variance?: number;
  glitchCountForFlash?: number;
  glitchIntensity?: number;
  enabled?: boolean;
}

const GLITCH_DURATION = 80;
const FLASH_DURATION = 20;
const FLASH_GAP = 10;
const NOISE_FRAMES = 3;
const DISPLACEMENT_INTENSITY = 25;

export function useGlitchState({
  delay = 6000,
  variance = 500,
  glitchCountForFlash = 3,
  glitchIntensity = 1,
  enabled = true,
  delayKey = '',   // 🆕 any value – when changed, resets the schedule
}: UseGlitchStateProps & { enabled?: boolean; delayKey?: string }) {
  const [phase, setPhase] = useState<GlitchPhase>('idle');
  const [isInverted, setIsInverted] = useState(false);
  const [glitchCount, setGlitchCount] = useState(0);
  const [displacement, setDisplacement] = useState(0);

  // 💥 Capture intensity once per glitch, keep it constant
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
    setDisplacement(Math.floor(Math.random() * NOISE_FRAMES) * DISPLACEMENT_INTENSITY);
    setPhase('easeIn');
    setCurrentIntensity(glitchIntensity); // easeIn intensity

    timerRef.current = setTimeout(() => {
      setPhase('active');
      setCurrentIntensity(1 * glitchIntensity); // active intensity
      setGlitchCount((prev) => {
        const newCount = prev + 1;
        if (newCount % glitchCountForFlash === 0) triggerDoubleFlash();
        return newCount;
      });

      timerRef.current = setTimeout(() => {
        setPhase('easeOut');
        setCurrentIntensity(0.3 * glitchIntensity); // easeOut intensity

        timerRef.current = setTimeout(() => {
          setPhase('idle');
          setCurrentIntensity(0);
        }, GLITCH_DURATION * 0.2);
      }, GLITCH_DURATION * 0.6);
    }, GLITCH_DURATION * 0.2);
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
    glitchDuration: GLITCH_DURATION,
    triggerGlitch,
  };
}