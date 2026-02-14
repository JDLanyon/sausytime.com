'use client';

interface NoiseEffectProps {
  intensity: number;
  duration: number;
}

export function NoiseEffect({ intensity, duration }: NoiseEffectProps) {
  if (intensity === 0) return null;
  return (
    <div
      className="absolute inset-0 z-5 pointer-events-none animate-glitch-noise"
      style={{
        '--noise-intensity': intensity,
        '--glitch-duration': `${duration}ms`,
        backgroundImage: `
          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
          linear-gradient(-45deg, transparent 25%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.1) 75%)
        `,
        backgroundSize: '8px 8px',
        mixBlendMode: 'overlay',
      } as React.CSSProperties}
    />
  );
}