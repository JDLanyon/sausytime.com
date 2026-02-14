'use client';


interface ScanlineEffectProps {
  intensity: number;
  duration: number;
}

export function ScanlineEffect({ intensity, duration }: ScanlineEffectProps) {
  return (
    <span
      className="absolute inset-0 z-5 pointer-events-none animate-glitch-noise"
      style={{
        '--noise-intensity': intensity,
        '--glitch-duration': `${duration}ms`,
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.05) 50%)',
        backgroundSize: '100% 4px',
        mixBlendMode: 'difference',
      } as React.CSSProperties}
    />
  );
}