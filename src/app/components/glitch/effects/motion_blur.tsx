'use client';

export function MotionBlurEffect({ intensity }: { intensity: number }) {
  if (intensity === 0) return null;
  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none"
      style={{
        backdropFilter: `blur(${0.5 * intensity}px)`,
        opacity: 0.7 * intensity,
      }}
    />
  );
}