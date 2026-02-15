'use client';


interface ScanlineEffectProps {
  intensity: number;
  duration: number;
}

export function ScanlineEffect({ intensity, duration }: ScanlineEffectProps) {
  if (intensity <= 0.7) return null;
  return (
    <span
      className="absolute inset-0 z-25 pointer-events-none"
      style={{
        animation: `glitch-noise ${duration}ms ease-in-out`,
        '--noise-intensity': intensity,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        mixBlendMode: 'overlay',
        opacity: intensity * 0.3,
        display: 'block',
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}