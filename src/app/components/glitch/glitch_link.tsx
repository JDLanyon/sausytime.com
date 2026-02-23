'use client';


import Link from 'next/link';
import React, { useRef } from 'react';
import { Glitch, GlitchHandle } from './glitch';


interface GlitchLinkProps {
  href: string;
  children: string;
  className?: string;
  underlineDuration?: number;
  glitchIntensity?: number;
  cooldown?: number;
}

export function GlitchLink({
  href,
  children,
  className = '',
  underlineDuration = 200,
  glitchIntensity = 1.5,
  cooldown = 500,
}: GlitchLinkProps) {
  const glitchRef = useRef<GlitchHandle>(null);
  const lastGlitchTime = useRef(0);

  const handleMouseEnter = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= cooldown) {
      lastGlitchTime.current = now;
      glitchRef.current?.glitch();
    }
  };

  return (
    <Link
      href={href}
      className={`relative inline-block no-underline group ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      <Glitch
        ref={glitchRef}
        names={[children]}
        duration={300}
        glitchIntensity={glitchIntensity}
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