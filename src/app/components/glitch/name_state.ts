'use client';

import { useState } from 'react';

export function useNameCycler(names: string[]) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [showAlt, setShowAlt] = useState(false);

  const startGlitch = () => {
    if (names.length >= 2) {
      setNextIdx((currentIdx + 1) % names.length); // sequential
      setShowAlt(true);
    }
  };

  const endGlitch = () => {
    if (names.length >= 2 && showAlt) {
      setCurrentIdx(nextIdx); // always switch
      setShowAlt(false);
    }
  };

  return {
    currentName: names[currentIdx],
    altName: names[nextIdx],
    currentIdx,        // 🆕 expose index for delay calculation
    showAlt,
    startGlitch,
    endGlitch,
  };
}