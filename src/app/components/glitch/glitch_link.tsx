'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Glitch, GlitchHandle } from './glitch';

interface GlitchLinkProps {
  href: string;
  children: string;        // the text to glitch
  className?: string;
  underlineDuration?: number; // default 600ms
}

export function GlitchLink({
  href,
  children,
  className = '',
  underlineDuration = 600,
}: GlitchLinkProps) {
  const glitchRef = useRef<GlitchHandle>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    glitchRef.current?.glitch(); // 🚀 trigger glitch once
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
      {/* Glitch instance – no auto loop, only manual trigger */}
      <Glitch
        ref={glitchRef}
        autoGlitch={false}
        names={[children]}    // single name – no cycling
        className="relative inline-block"
        glitchIntensity={0.9}
      />

      {/* Underline – slides from left to right on hover */}
      <span
        className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all"
        style={{
          background: 'linear-gradient(to right, var(--secondary), var(--primary))',
          transitionDuration: `${underlineDuration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
          transitionProperty: 'width',
        }}
        aria-hidden="true"
      />
    </Link>
  );
}