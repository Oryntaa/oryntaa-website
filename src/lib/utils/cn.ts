import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge that our custom `text-*` scale tokens are font-sizes, so it stops
// confusing them with color tokens (e.g. `text-body` vs `text-canvas`) and dropping the color.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-xl',
            'display-lg',
            'display-md',
            'display-sm',
            'body-lg',
            'body',
            'body-sm',
            'eyebrow',
          ],
        },
      ],
    },
  },
});

/** The single class-composition helper: clsx for conditionals, tailwind-merge to resolve conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
