'use client';


export function MotionBlurEffect({ intensity }: { intensity: number }) {
  if (intensity === 0) return null;
  return (
    <span
      className="absolute inset-0 z-4 pointer-events-none"
      style={{
        backdropFilter: `blur(${1.5 * intensity}px)`,
        opacity: intensity,
      }}
    />
  );
}