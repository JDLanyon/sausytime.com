'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Glitch, GlitchHandle } from './glitch';

interface GlitchLinkProps {
  href: string;
  children: string;
  className?: string;
  underlineDuration?: number;
}

export function GlitchLink({
  href,
  children,
  className = '',
  underlineDuration = 200,
}: GlitchLinkProps) {
  const glitchRef = useRef<GlitchHandle>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    glitchRef.current?.glitch();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={href}
      className={`relative inline-block no-underline group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Glitch
        ref={glitchRef}
        autoGlitch={false}          // ← only on hover
        names={[children]}
        className="relative inline-block"
      />

      <span
        className="absolute bottom-0 left-0 h-0.5 w-full md:w-0 md:group-hover:w-full transition-all"
        style={{
          background: 'linear-gradient(to right, var(--secondary), var(--primary))',
          transitionDuration: `${underlineDuration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionProperty: 'width',
        }}
        aria-hidden="true"
      />
    </Link>
  );
}