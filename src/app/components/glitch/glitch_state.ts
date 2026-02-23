'use client';


import { useEffect, useRef, useState } from 'react';


export type GlitchPhase = 'idle' | 'easeIn' | 'active' | 'easeOut';

interface UseGlitchStateProps {
  duration?: number;
  delay?: number;
  variance?: number;
  glitchCountForFlash?: number;
  glitchIntensity?: number;
  enabled?: boolean;
  delayKey?: string;
}

const FLASH_DURATION = 24;
const FLASH_GAP = 12;
const NOISE_FRAMES = 4;
const DISPLACEMENT_INTENSITY = 8;

export function useGlitchState({
  duration = 200,
  delay = 8000,
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
    // don't start a new glitch if one is already running
    if (phase !== 'idle') return;

    clearTimers();
    const base = (Math.floor(Math.random() * NOISE_FRAMES) + 1) * DISPLACEMENT_INTENSITY;
    const jitter = Math.floor(Math.random() * 10);
    setDisplacement(base + jitter);
    setPhase('easeIn');
    setCurrentIntensity(glitchIntensity);

    timerRef.current = setTimeout(() => {
      setPhase('active');
      setCurrentIntensity(1 * glitchIntensity);
      setGlitchCount((prev) => {
        const newCount = prev + 1;
        if (newCount % glitchCountForFlash === 0) triggerDoubleFlash();
        return newCount;
      });

      timerRef.current = setTimeout(() => {
        setPhase('easeOut');
        setCurrentIntensity(0.3 * glitchIntensity);

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