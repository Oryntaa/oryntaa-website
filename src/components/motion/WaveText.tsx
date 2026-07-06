'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

interface WaveTextProps {
  text: string;
  className?: string;
}

/**
 * Per-word wave — each word rises and settles in sequence on mount, and replays when the phrase is
 * hovered. Transform + opacity only; renders as plain, immediately-visible text under reduced-motion
 * (and stays LCP-safe: the words are always in the DOM at full opacity).
 */
export function WaveText({ text, className }: WaveTextProps): React.JSX.Element {
  const prefersReduced = usePrefersReducedMotion();
  const [waveKey, setWaveKey] = useState(0);

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      onHoverStart={() => {
        setWaveKey((key) => key + 1);
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${String(waveKey)}-${String(index)}-${word}`}
          className="inline-block"
          initial={{ y: 0 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
        >
          {word}
          {index < words.length - 1 ? ' ' : null}
        </motion.span>
      ))}
    </motion.span>
  );
}
