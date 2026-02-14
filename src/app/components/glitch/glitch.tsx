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

import './glitch.css';

// 🆕 Handle type
export interface GlitchHandle {
  glitch: () => void;
}

interface GlitchProps {
  duration?: number;
  delay?: number;
  variance?: number;
  className?: string;
  children?: ReactNode;
  names?: string[];
  glitchCountForFlash?: number;
  glitchIntensity?: number;

  // Layout stabilisation
  preserveSpace?: boolean;
  minWidth?: string | number;
  inline?: boolean;

  // 🆕 Manual trigger & loop control
  autoGlitch?: boolean;
  onGlitchComplete?: () => void;
}

export const Glitch = forwardRef<GlitchHandle, GlitchProps>(({
  duration: _unused,
  delay = 6000,
  variance = 500,
  className = '',
  children,
  names,
  glitchCountForFlash = 3,
  glitchIntensity = 1,
  preserveSpace = false,
  minWidth,
  inline = false,
  autoGlitch = true,
  onGlitchComplete,
}, ref) => {
  const isNameMode = !!names && names.length > 0;
  const nameCycler = isNameMode ? useNameCycler(names!) : null;

  const isFirstName = nameCycler?.currentIdx === 0;
  const effectiveDelay = isFirstName ? delay * 2 : delay;

  // 🆕 Force reschedule when effectiveDelay changes
  const delayKey = `${effectiveDelay}-${nameCycler?.currentIdx}`;
  
  // Measurement (unchanged)
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

  // 🆕 Pass autoGlitch to useGlitchState
  const { phase, intensity, isInverted, displacement, glitchDuration, triggerGlitch } = useGlitchState({
    delay: effectiveDelay,
    variance,
    glitchCountForFlash,
    glitchIntensity,
    enabled: autoGlitch,
    delayKey,
  });

  // 🆕 Expose triggerGlitch via ref
  useImperativeHandle(ref, () => ({
    glitch: triggerGlitch,
  }));

  // 🆕 Fire callback when glitch finishes
  useEffect(() => {
    if (phase === 'idle') {
      onGlitchComplete?.();
    }
  }, [phase, onGlitchComplete]);

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

  const widthStyle: React.CSSProperties = {};
  if (preserveSpace && maxNameWidth !== null) {
    widthStyle.minWidth = maxNameWidth;
  }
  if (minWidth !== undefined) {
    widthStyle.minWidth = minWidth;
  }
  if (inline) {
    widthStyle.display = 'inline';
  } else {
    widthStyle.display = 'inline-block';
  }

  return (
    <span>
      <span ref={measureRef} aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        {names?.[0]}
      </span>

      <span
        className={`relative ${className}`}
        style={{
          ...widthStyle,
          filter: isInverted ? 'invert(1)' : 'none',
          transition: isInverted ? 'filter 0.02s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          willChange: 'transform, filter, opacity',
        }}
      >
        <ShakeEffect intensity={intensity} duration={glitchDuration} phase={phase}>
          <div className="relative z-10">{mainContent}</div>
        </ShakeEffect>

        {phase !== 'idle' && (
          <ChromaticAberrationEffect
            intensity={intensity}
            displacement={displacement}
            duration={glitchDuration}
          >
            {chromaContent}
          </ChromaticAberrationEffect>
        )}

        <MotionBlurEffect intensity={intensity} />
        <NoiseEffect intensity={intensity} duration={glitchDuration} />
        <ScanlineEffect intensity={intensity} duration={glitchDuration} />
        <FlickerEffect phase={phase} />
      </span>
    </span>
  );
});

Glitch.displayName = 'Glitch'; // helpful for debugging