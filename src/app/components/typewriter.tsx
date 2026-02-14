'use client';

import { useEffect, useState } from 'react';


interface TypeWriterProps {
  headings: string[];
  /** Typing speed in Words Per Minute (WPM). Default: 240 */
  speed?: number;
  /** Pause after a heading is fully typed (ms). Default: 4000 */
  delayBetweenHeadings?: number;
  className?: string;
}

export default function TypeWriter({
  headings,
  speed = 240,
  delayBetweenHeadings = 4000,
  className = '',
}: TypeWriterProps) {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Delete the last word (including any preceding space)
  const deleteLastWord = (text: string): string => {
    return text.replace(/\s*\S+$/, '');
  };

  useEffect(() => {
    if (isPaused) return;

    const currentFullText = headings[currentHeadingIndex];
    let timer: NodeJS.Timeout;

    // Typing speed: milliseconds per character (1 word = 5 chars)
    const charDelayMs = speed > 0 ? 12000 / speed : 60;
    // Word deletion delay – fixed to simulate Ctrl+Backspace
    const wordDeleteDelayMs = 150;

    if (!isDeleting && currentText === currentFullText) {
      // Idle: pause then start word‑by‑word deletion
      timer = setTimeout(() => setIsDeleting(true), delayBetweenHeadings);
    } else if (isDeleting && currentText === '') {
      // Finished deleting – move to next heading
      setIsDeleting(false);
      setCurrentHeadingIndex((prev) => (prev + 1) % headings.length);
    } else {
      // Actively typing or deleting
      const delay = isDeleting ? wordDeleteDelayMs : charDelayMs;

      timer = setTimeout(() => {
        if (isDeleting) {
          // Delete one word at a time
          setCurrentText(deleteLastWord(currentText));
        } else {
          // Type one character at a time
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        }
      }, delay);
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
      {remainingText && (
        <span className="opacity-40">{remainingText}</span>
      )}
    </div>
  );
}