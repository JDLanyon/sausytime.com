'use client';

import { ReactNode, useMemo } from 'react';


const CHROMA_COLORS = [
  { name: 'red', value: '#ff0000', x: 8, y: 0, blend: 'screen' },
  { name: 'green', value: '#00ff00', x: -8, y: 8, blend: 'screen' },
  { name: 'blue', value: '#0000ff', x: 0, y: -8, blend: 'screen' },
  { name: 'cyan', value: '#00ffff', x: 8, y: -8, blend: 'difference' },
  { name: 'magenta', value: '#ff00ff', x: -8, y: 0, blend: 'difference' },
  { name: 'yellow', value: '#ffff00', x: 0, y: 8, blend: 'difference' },
] as const;

interface ChromaticAberrationEffectProps {
  intensity: number;
  displacement: number;
  duration: number;
  children: ReactNode;
}

export function ChromaticAberrationEffect({
  intensity,
  displacement,
  duration,
  children,
}: ChromaticAberrationEffectProps) {
  if (intensity === 0) return null;

  // Generate per‑layer random offsets so each color jitters independently
  const layerRandomness = useMemo(() => 
    CHROMA_COLORS.map(() => ({
      xJitter: (Math.random() - 0.5) * 4,   // -2..2 px
      yJitter: (Math.random() - 0.5) * 4,
      glowJitter: Math.random() * 3,         // 0..3 extra px for glow
    })), []
  );

  return (
    <span>
      {CHROMA_COLORS.map((color, i) => {
        const rand = layerRandomness[i];
        // Combine base displacement with per‑layer randomness
        const clipX = (displacement * (i % 2) + rand.xJitter * 5) % 30;
        const clipY = (displacement * (i % 3) + rand.yJitter * 5) % 30;

        // Glow size: base 6px * intensity + random flicker
        const glowSize = 6 * intensity + rand.glowJitter;

        return (
          <span
            key={color.name}
            className={`absolute inset-0 z-2 ${
              i >= 3 ? 'mix-blend-difference' : 'mix-blend-screen'
            } animate-glitch-chroma`}
            style={{
              color: color.value,
              '--chroma-intensity': Math.min(1, intensity * 1.5), // force visibility
              '--glitch-duration': `${duration}ms`,
              transform: `translate(${
                (color.x * intensity + rand.xJitter) * (i % 2 ? -1 : 1)
              }px, ${
                (color.y * intensity + rand.yJitter) * (i % 3 ? -1 : 1)
              }px)`,
              filter: `
                blur(0.5px)
                drop-shadow(0 0 ${glowSize}px ${color.value})
              `,
              clipPath: `inset(${clipX}% ${clipY}% 0 0)`,
            } as React.CSSProperties}
          >
            {children}
          </span>
        );
      })}
    </span>
  );
}