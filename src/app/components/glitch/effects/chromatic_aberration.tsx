'use client';

import { ReactNode, useMemo, useEffect } from 'react';

// Old: larger offsets for stronger effect
const CHROMA_COLORS = [
  { name: 'red', value: '#ff0000', x: 2, y: 0, blend: 'screen' },
  { name: 'green', value: '#00ff00', x: -2, y: 2, blend: 'screen' },
  { name: 'blue', value: '#0000ff', x: 0, y: -2, blend: 'screen' },
  { name: 'cyan', value: '#00ffff', x: 2, y: -2, blend: 'difference' },
  { name: 'magenta', value: '#ff00ff', x: -2, y: 0, blend: 'difference' },
  { name: 'yellow', value: '#ffff00', x: 0, y: 2, blend: 'difference' },
];

interface ChromaticAberrationEffectProps {
  intensity: number;
  displacement: number;
  duration: number;
  children: ReactNode;
  disableDisplacement?: boolean;
}

export function ChromaticAberrationEffect({
  intensity,
  displacement,
  duration,
  children,
  disableDisplacement = false,
}: ChromaticAberrationEffectProps) {
  // hooks
  useEffect(() => {
    if (intensity > 0) {
      console.log('ChromaticAberrationEffect rendering with intensity:', intensity);
    }
  }, [intensity]);

  // randomness recreates when intensity changes (new glitch)
  const layerRandomness = useMemo(
    () =>
      CHROMA_COLORS.map(() => ({
        xJitter: (Math.random() - 0.5) * 4,   // -2..2 px
        yJitter: (Math.random() - 0.5) * 4,
        glowJitter: Math.random() * 3,         // 0..3 px extra glow
      })),
    [intensity]
  );

  if (intensity === 0) return null;

  return (
    <span>
      {CHROMA_COLORS.map((color, i) => {
        const rand = layerRandomness[i];

        // displacement offsets
        const displaceX =
          !disableDisplacement && displacement > 0
            ? (Math.random() * displacement * 0.8) * (i % 2 ? 1 : -1)
            : 0;
        const displaceY =
          !disableDisplacement && displacement > 0
            ? (Math.random() * displacement * 0.5) * (i % 3 ? 1 : -1)
            : 0;

        // clip path tearing
        const clipX = !disableDisplacement
          ? (displacement * (i % 2) + rand.xJitter * 5) % 30
          : 0;
        const clipY = !disableDisplacement
          ? (displacement * (i % 3) + rand.yJitter * 5) % 30
          : 0;

        // glow size
        const glowSize = 6 * intensity + rand.glowJitter;

        // final translation (base color offset + jitter + displacement)
        const translateX =
          (color.x * intensity + rand.xJitter + displaceX) * (i % 2 ? -1 : 1);
        const translateY =
          (color.y * intensity + rand.yJitter + displaceY) * (i % 3 ? -1 : 1);

        return (
          <span
            key={color.name}
            className={`absolute inset-0 z-2 ${
              i >= 3 ? 'mix-blend-difference' : 'mix-blend-screen'
            }`}
            style={{
              color: color.value,
              opacity: intensity,
              transform: `translate(${translateX}px, ${translateY}px)`,
              filter: `
                blur(0.5px)
                drop-shadow(0 0 ${glowSize}px ${color.value})
              `,
              clipPath:
                !disableDisplacement && displacement > 0
                  ? `inset(${clipX}% ${clipY}% 0 0)`
                  : undefined,
              transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: 'transform',
            }}
          >
            {children}
          </span>
        );
      })}
    </span>
  );
}