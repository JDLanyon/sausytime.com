"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface GlitchTextProps {
  duration: number;
  delay?: number;
  variance?: number;
  className?: string;
  children?: ReactNode; // Regular content
  names?: string[]; // Optional: array of names to cycle through
  glitchCountForFlash?: number;
  glitchIntensity?: number; // 0-1 scale for overall intensity
}

const GLITCH_DURATION = 80;
const DEFAULT_DELAY = 6000;
const DEFAULT_VARIANCE = 500;
const MAX_SHAKE_OFFSET = 3;
const MAX_CHROMA_OFFSET = 4;
const DISPLACEMENT_INTENSITY = 25;
const NOISE_FRAMES = 3;
const FLASH_DURATION = 20;
const FLASH_GAP = 10;

// 6 Chroma colors: RGB + CYM
const CHROMA_COLORS = [
  { name: 'red', value: '#FF0000', x: MAX_CHROMA_OFFSET, y: 0, blend: 'screen' },
  { name: 'green', value: '#00FF00', x: -MAX_CHROMA_OFFSET, y: MAX_CHROMA_OFFSET, blend: 'screen' },
  { name: 'blue', value: '#0000FF', x: 0, y: -MAX_CHROMA_OFFSET, blend: 'screen' },
  { name: 'cyan', value: '#00FFFF', x: MAX_CHROMA_OFFSET, y: -MAX_CHROMA_OFFSET, blend: 'difference' },
  { name: 'magenta', value: '#FF00FF', x: -MAX_CHROMA_OFFSET, y: 0, blend: 'difference' },
  { name: 'yellow', value: '#FFFF00', x: 0, y: MAX_CHROMA_OFFSET, blend: 'difference' },
];

const GlitchText: React.FC<GlitchTextProps> = ({
  duration,
  delay = DEFAULT_DELAY,
  variance = DEFAULT_VARIANCE,
  className = '',
  children,
  names,
  glitchCountForFlash = 3,
  glitchIntensity = 1,
}) => {
  // Validate names array if provided
  if (names && names.length < 2) {
    console.warn('GlitchText: names array should have at least 2 items for glitching effect');
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchPhase, setGlitchPhase] = useState<'idle' | 'easeIn' | 'active' | 'easeOut' | 'flash'>('idle');
  const [displacement, setDisplacement] = useState(0);
  const [glitchCount, setGlitchCount] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  
  // State for name glitching
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [nextNameIndex, setNextNameIndex] = useState(1);
  const [isShowingAltName, setIsShowingAltName] = useState(false);
  
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const getRandomDelay = () => {
    const min = Math.max(100, delay - variance); // Minimum 100ms delay
    const max = delay + variance;
    return Math.random() * (max - min) + min;
  };

  const triggerGlitch = () => {
    // Ease in
    setGlitchPhase('easeIn');
    
    // Set random displacement for noise effect
    setDisplacement(Math.floor(Math.random() * NOISE_FRAMES) * DISPLACEMENT_INTENSITY);
    
    // If names are provided, set up the next name index
    if (names && names.length >= 2) {
      // Calculate next name index (different from current)
      let newNextIndex;
      do {
        newNextIndex = Math.floor(Math.random() * names.length);
      } while (newNextIndex === currentNameIndex && names.length > 1);
      
      setNextNameIndex(newNextIndex);
      setIsShowingAltName(true);
    }
    
    // Clear any existing cleanup timeout
    if (cleanupRef.current) {
      clearTimeout(cleanupRef.current);
    }
    
    // After ease-in, go to active phase
    setTimeout(() => {
      setGlitchPhase('active');
      
      // Check if we should trigger a double flash
      setGlitchCount(prev => {
        const newCount = prev + 1;
        if (newCount % glitchCountForFlash === 0) {
          triggerDoubleFlash();
        }
        return newCount;
      });
      
      // Ease out after active phase
      setTimeout(() => {
        setGlitchPhase('easeOut');
        
        // Return to idle after ease out
        setTimeout(() => {
          setGlitchPhase('idle');
          
          // If names were provided, update the current name after glitch completes
          if (names && names.length >= 2 && isShowingAltName) {
            // Random chance to change name (60% chance to actually change)
            if (Math.random() > 0.4) {
              setCurrentNameIndex(nextNameIndex);
            }
            setIsShowingAltName(false);
          }
        }, GLITCH_DURATION * 0.2); // 20% of duration for ease out
      }, GLITCH_DURATION * 0.6); // Active phase is 60% of duration
    }, GLITCH_DURATION * 0.2); // Ease in is 20% of duration
  };

  const triggerDoubleFlash = () => {
    // First flash
    setIsInverted(true);
    
    setTimeout(() => {
      setIsInverted(false);
      
      // Gap between flashes
      setTimeout(() => {
        // Second flash
        setIsInverted(true);
        
        setTimeout(() => {
          setIsInverted(false);
        }, FLASH_DURATION);
      }, FLASH_GAP);
    }, FLASH_DURATION);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    const startGlitchCycle = () => {
      // Clear any existing animation
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      
      const scheduleNextGlitch = () => {
        const nextDelay = getRandomDelay();
        animationRef.current = setTimeout(() => {
          triggerGlitch();
          scheduleNextGlitch();
        }, nextDelay);
      };
      
      scheduleNextGlitch();
    };
    
    startGlitchCycle();
    
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (cleanupRef.current) {
        clearTimeout(cleanupRef.current);
      }
    };
  }, [duration, delay, variance, glitchCountForFlash, names?.length]);

  // Calculate intensity based on phase and user intensity setting
  const getPhaseIntensity = () => {
    let phaseIntensity = 0;
    switch (glitchPhase) {
      case 'easeIn': phaseIntensity = 0.3; break;
      case 'active': phaseIntensity = 1.0; break;
      case 'easeOut': phaseIntensity = 0.3; break;
      case 'flash': phaseIntensity = 0.8; break;
      default: phaseIntensity = 0;
    }
    return phaseIntensity * glitchIntensity;
  };

  const intensity = getPhaseIntensity();

  // Determine what content to show
  const getMainContent = () => {
    if (names && names.length > 0) {
      // Show alternate name during glitch, otherwise current name
      return isShowingAltName ? names[nextNameIndex] : names[currentNameIndex];
    }
    return children;
  };

  const getChromaContent = () => {
    if (names && names.length > 0) {
      // For chroma layers during glitch, show different names
      if (isShowingAltName) {
        // Cycle through different names for each chroma layer
        return names[(nextNameIndex + 1) % names.length];
      }
      return names[currentNameIndex];
    }
    return children;
  };

  return (
    <>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { 
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          10% { transform: translate(-${MAX_SHAKE_OFFSET * intensity}px, ${MAX_SHAKE_OFFSET * intensity}px); }
          20% { transform: translate(-${MAX_SHAKE_OFFSET * intensity}px, -${MAX_SHAKE_OFFSET * intensity}px); }
          30% { transform: translate(${MAX_SHAKE_OFFSET * intensity}px, ${MAX_SHAKE_OFFSET * intensity}px); }
          40% { transform: translate(${MAX_SHAKE_OFFSET * intensity}px, -${MAX_SHAKE_OFFSET * intensity}px); }
          50% { transform: translate(-${MAX_SHAKE_OFFSET * intensity}px, ${MAX_SHAKE_OFFSET * intensity}px); }
          60% { transform: translate(-${MAX_SHAKE_OFFSET * intensity}px, -${MAX_SHAKE_OFFSET * intensity}px); }
          70% { transform: translate(${MAX_SHAKE_OFFSET * intensity}px, ${MAX_SHAKE_OFFSET * intensity}px); }
          80% { transform: translate(${MAX_SHAKE_OFFSET * intensity}px, -${MAX_SHAKE_OFFSET * intensity}px); }
          90% { transform: translate(-${MAX_SHAKE_OFFSET * intensity}px, ${MAX_SHAKE_OFFSET * intensity}px); }
        }
        
        @keyframes chromaShift {
          0%, 100% { 
            transform: translate(0, 0);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          50% { 
            opacity: ${0.6 * intensity};
          }
        }
        
        @keyframes noiseFade {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: ${0.2 * intensity}; }
        }
        
        @keyframes quickInvert {
          0%, 100% { filter: invert(0); }
          50% { filter: invert(1); }
        }
      `}</style>
      
      <div
        ref={containerRef}
        className={`relative inline-block ${className}`}
        style={{
          animation: glitchPhase !== 'idle' 
            ? `shake ${GLITCH_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` 
            : 'none',
          filter: isInverted ? 'invert(1)' : 'none',
          transition: isInverted 
            ? 'filter 0.02s cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'none',
          willChange: 'transform, filter, opacity',
        }}
      >
        {/* Main content - shows either children or current/alternate name */}
        <div className="relative z-10">
          {getMainContent()}
        </div>
        
        {/* Chromatic aberration layers - 6 colors */}
        {glitchPhase !== 'idle' && CHROMA_COLORS.map((color, index) => (
          <div
            key={color.name}
            className={`absolute inset-0 z-0 ${index >= 3 ? 'mix-blend-difference' : 'mix-blend-screen'}`}
            style={{
              color: color.value,
              animation: `chromaShift ${GLITCH_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              transform: `translate(${color.x * intensity * (index % 2 ? -1 : 1)}px, ${color.y * intensity * (index % 3 ? -1 : 1)}px)`,
              filter: 'blur(0.3px)',
              opacity: 0,
              clipPath: `inset(${(displacement * (index % 2)) % 30}% ${(displacement * (index % 3)) % 30}% 0 0)`,
            }}
          >
            {getChromaContent()}
          </div>
        ))}
        
        {/* Motion blur overlay with phase intensity */}
        {glitchPhase !== 'idle' && (
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              backdropFilter: `blur(${0.5 * intensity}px)`,
              opacity: 0.7 * intensity,
            }}
          />
        )}
        
        {/* Noise effect overlay */}
        {glitchPhase !== 'idle' && (
          <div
            className="absolute inset-0 z-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                linear-gradient(-45deg, transparent 25%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.1) 75%)
              `,
              backgroundSize: '8px 8px',
              animation: `noiseFade ${GLITCH_DURATION}ms ease-in-out`,
              opacity: 0,
              mixBlendMode: 'overlay',
            }}
          />
        )}
        
        {/* Scanline effect during intense glitches */}
        {intensity > 0.7 && (
          <div
            className="absolute inset-0 z-25 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.05) 50%)',
              backgroundSize: '100% 4px',
              animation: `noiseFade ${GLITCH_DURATION}ms ease-in-out`,
              opacity: 0,
              mixBlendMode: 'screen',
            }}
          />
        )}
        
        {/* Quick flicker overlay for extra glitch effect */}
        {glitchPhase === 'active' && Math.random() > 0.7 && (
          <div
            className="absolute inset-0 z-30 pointer-events-none bg-white"
            style={{
              opacity: 0.1,
              animation: 'noiseFade 0.05s linear',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </>
  );
};

export default GlitchText;