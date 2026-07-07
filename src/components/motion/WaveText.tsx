'use client';

import { motion } from 'motion/react';
import { Fragment, useState } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

interface WaveTextProps {
  text: string;
  className?: string;
}

const STAGGER = 0.035;

/**
 * Per-letter wave — each character lifts and settles in sequence to form a travelling wave on mount,
 * replayed on hover. Words stay unbroken (only whole words wrap). Transform-only; renders as plain,
 * immediately-visible text under reduced-motion, so it never blocks LCP.
 */
export function WaveText({ text, className }: WaveTextProps): React.JSX.Element {
  const prefersReduced = usePrefersReducedMotion();
  const [waveKey, setWaveKey] = useState(0);

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');
  let charCount = 0;
  const wordChars = words.map((word) => {
    const chars = Array.from(word, (char) => ({ char, index: charCount++ }));
    charCount += 1; // account for the space between words
    return chars;
  });

  return (
    <motion.span
      className={className}
      onHoverStart={() => {
        setWaveKey((key) => key + 1);
      }}
    >
      {wordChars.map((chars, wordIndex) => (
        <Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {chars.map(({ char, index }) => (
              <motion.span
                key={`${String(waveKey)}-${String(index)}`}
                className="inline-block"
                initial={{ y: 0 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 0.5, delay: index * STAGGER, ease: [0.25, 1, 0.5, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < wordChars.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
