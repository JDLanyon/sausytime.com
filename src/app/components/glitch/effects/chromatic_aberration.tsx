'use client';

import { ReactNode } from 'react';

const CHROMA_COLORS = [
  { name: 'red', value: '#FF0000', x: 4, y: 0, blend: 'screen' },
  { name: 'green', value: '#00FF00', x: -4, y: 4, blend: 'screen' },
  { name: 'blue', value: '#0000FF', x: 0, y: -4, blend: 'screen' },
  { name: 'cyan', value: '#00FFFF', x: 4, y: -4, blend: 'difference' },
  { name: 'magenta', value: '#FF00FF', x: -4, y: 0, blend: 'difference' },
  { name: 'yellow', value: '#FFFF00', x: 0, y: 4, blend: 'difference' },
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

  return (
    <>
      {CHROMA_COLORS.map((color, i) => (
        <div
          key={color.name}
          className={`absolute inset-0 z-0 ${
            i >= 3 ? 'mix-blend-difference' : 'mix-blend-screen'
          } animate-glitch-chroma`}
          style={{
            color: color.value,
            '--chroma-intensity': intensity,
            '--glitch-duration': `${duration}ms`,
            transform: `translate(${color.x * intensity * (i % 2 ? -1 : 1)}px, ${
              color.y * intensity * (i % 3 ? -1 : 1)
            }px)`,
            filter: 'blur(0.3px)',
            clipPath: `inset(${(displacement * (i % 2)) % 30}% ${
              (displacement * (i % 3)) % 30
            }% 0 0)`,
          } as React.CSSProperties}
        >
          {children}
        </div>
      ))}
    </>
  );
}