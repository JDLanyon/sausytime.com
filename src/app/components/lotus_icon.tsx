
// LotusIcon.tsx
export const LotusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <filter id="glitch-scanlines">
        <feTurbulence baseFrequency="0.05 0.1" numOctaves="2" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" result="bw-noise" />
        <feComponentTransfer in="bw-noise">
          <feFuncA type="linear" slope="0.3" intercept="0" />
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceGraphic" result="scanlines" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="scanlines" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#glitch-scanlines)">
      {/* your lotus paths here */}
    </g>
  </svg>
);