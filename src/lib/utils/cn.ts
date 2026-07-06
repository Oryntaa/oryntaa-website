import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** The single class-composition helper: clsx for conditionals, tailwind-merge to resolve conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
