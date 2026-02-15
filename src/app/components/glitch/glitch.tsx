'use client';

import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useGlitchState } from './glitch_state';
import { useNameCycler } from './name_state';
import { ShakeEffect } from './effects/shake';
import { ChromaticAberrationEffect } from './effects/chromatic_aberration';
import { MotionBlurEffect } from './effects/motion_blur';
import { NoiseEffect } from './effects/noise';
import { ScanlineEffect } from './effects/scanline';
import { FlickerEffect } from './effects/flicker';
import { PositionDisplacementEffect } from './effects/position_displacement'; // new import

import './glitch.css';

export interface GlitchHandle {
  glitch: () => void;
}

interface GlitchProps {
  names?: string[];
  duration?: number;
  delay?: number;
  variance?: number;
  glitchCountForFlash?: number;
  glitchIntensity?: number;
  className?: string;
  children?: ReactNode;
  nameSwitchProbability?: number;
  preserveSpace?: boolean;
  onGlitchComplete?: () => void;
}

export const Glitch = forwardRef<GlitchHandle, GlitchProps>(({
  names,
  duration = 200,
  delay = 8000,
  variance = 500,
  glitchCountForFlash = 5,
  glitchIntensity = 1,
  className = '',
  children,
  nameSwitchProbability = 0.1,
  preserveSpace = true,
  onGlitchComplete,
}, ref) => {
  const isNameMode = !!names && names.length > 0;
  const nameCycler = isNameMode ? useNameCycler(names!, nameSwitchProbability) : null;

  // Measure widest name
  const measureRef = useRef<HTMLSpanElement>(null);
  const [maxNameWidth, setMaxNameWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!preserveSpace || !names || names.length === 0) return;
    if (!measureRef.current) return;

    const measure = document.createElement('span');
    measure.style.position = 'absolute';
    measure.style.visibility = 'hidden';
    measure.style.whiteSpace = 'nowrap';
    measure.style.font = window.getComputedStyle(measureRef.current).font;
    measure.style.fontSize = window.getComputedStyle(measureRef.current).fontSize;
    measure.style.fontFamily = window.getComputedStyle(measureRef.current).fontFamily;
    measure.style.fontWeight = window.getComputedStyle(measureRef.current).fontWeight;
    measure.style.letterSpacing = window.getComputedStyle(measureRef.current).letterSpacing;
    document.body.appendChild(measure);

    let max = 0;
    names.forEach((name) => {
      measure.textContent = name;
      const width = measure.getBoundingClientRect().width;
      max = Math.max(max, width);
    });

    document.body.removeChild(measure);
    setMaxNameWidth(max);
  }, [preserveSpace, names]);

  const { phase, intensity, isInverted, displacement, glitchDuration, triggerGlitch } = useGlitchState({
    duration,
    delay,
    variance,
    glitchCountForFlash,
    glitchIntensity,
  });

  useImperativeHandle(ref, () => ({
    glitch: triggerGlitch,
  }));

  useEffect(() => {
    if (phase === 'idle') {
      onGlitchComplete?.();
    }
  }, [phase, onGlitchComplete]);

  // 🎲 Decide once per glitch whether to flicker (30% chance)
  const flickerRef = useRef(false);
  useEffect(() => {
    if (phase === 'active') {
      flickerRef.current = Math.random() <= 0.3;
    }
  }, [phase]);

  useEffect(() => {
    if (!nameCycler) return;
    if (phase !== 'idle') nameCycler.startGlitch();
    else nameCycler.endGlitch();
  }, [phase, nameCycler]);

  const mainContent = (() => {
    if (nameCycler) {
      return nameCycler.showAlt ? nameCycler.altName : nameCycler.currentName;
    }
    return children;
  })();

  const chromaContent = (() => {
    if (nameCycler && names) {
      const idx = nameCycler.showAlt
        ? (names.indexOf(nameCycler.altName) + 1) % names.length
        : names.indexOf(nameCycler.currentName);
      return names[idx] ?? mainContent;
    }
    return mainContent;
  })();

  const widthStyle: React.CSSProperties = {
    display: 'inline-block',
  };
  if (preserveSpace && maxNameWidth !== null) {
    widthStyle.minWidth = maxNameWidth;
  }

  return (
    <span>
      {/* Hidden measuring element */}
      <span ref={measureRef} aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        {names?.[0]}
      </span>

      {/* Position displacement – makes the whole block jump */}
      <PositionDisplacementEffect
        intensity={intensity}
        duration={glitchDuration}
        phase={phase}
      >
        <span
          className={`relative ${className}`}
          style={{
            ...widthStyle,
            filter: isInverted ? 'invert(1)' : 'none',
            transition: isInverted ? 'filter 0.02s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            willChange: 'transform, filter, opacity',
          }}
        >
          {/* Shake effect – micro‑movements inside */}
          <ShakeEffect intensity={intensity} duration={glitchDuration} phase={phase}>
            <span className="relative z-10">{mainContent}</span>
          </ShakeEffect>

          {/* Chromatic aberration – boosted for max glitchiness */}
          <ChromaticAberrationEffect
            intensity={intensity}
            displacement={displacement}
            duration={glitchDuration}
          >
            {chromaContent}
          </ChromaticAberrationEffect>

          {/* Additional texture effects */}
          <MotionBlurEffect intensity={intensity * 2} />
          <NoiseEffect intensity={intensity} duration={glitchDuration} />
          <ScanlineEffect intensity={intensity} duration={glitchDuration} />
          <FlickerEffect phase={phase} shouldFlicker={flickerRef.current} />
        </span>
      </PositionDisplacementEffect>
    </span>
  );
});

Glitch.displayName = 'Glitch';