'use client';

import { useEffect, useState } from 'react';

interface TypeWriterProps {
  headings: string[];
  /** Typing/deleting speed in Words Per Minute (WPM). Default: 200 */
  speed?: number;
  /** Pause duration after a heading is fully typed (ms). Default: 4000 */
  delayBetweenHeadings?: number;
  className?: string;
}

export default function TypeWriter({
  headings,
  speed = 200,
  delayBetweenHeadings = 4000,
  className = '',
}: TypeWriterProps) {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentFullText = headings[currentHeadingIndex];
    let timer: NodeJS.Timeout;

    // Convert WPM to milliseconds per character (1 word = 5 chars)
    const charDelayMs = speed > 0 ? 12000 / speed : 60;

    if (!isDeleting && currentText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenHeadings);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentHeadingIndex((prev) => (prev + 1) % headings.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? currentFullText.substring(0, currentText.length - 1)
            : currentFullText.substring(0, currentText.length + 1)
        );
      }, charDelayMs);
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentHeadingIndex,
    headings,
    speed,
    delayBetweenHeadings,
    isPaused,
  ]);

  const currentFullText = headings[currentHeadingIndex];
  const remainingText = !isDeleting
    ? currentFullText.substring(currentText.length)
    : '';

  // True when we're waiting before deletion (full text typed, not deleting)
  const isIdle = !isDeleting && currentText === currentFullText;

  return (
    <div className={`inline-flex items-center whitespace-nowrap ${className}`}>
      <span>{currentText}</span>
      <span
        className={`
          inline-block h-[1.2em] w-[2px] bg-(--secondary) transition-opacity duration-300
          ${isPaused ? 'opacity-0' : 'opacity-100'}
          ${isIdle ? 'animate-[blink_1s_step-end_infinite]' : ''}
        `}
      />
      {/* Completion suggestion always shown while typing forward */}
      {remainingText && (
        <span className="opacity-40">{remainingText}</span>
      )}
    </div>
  );
}