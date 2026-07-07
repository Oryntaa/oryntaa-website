interface VisuallyHiddenProps {
  children: React.ReactNode;
}

/** Renders content for assistive tech only (visually hidden, still in the accessibility tree). */
export function VisuallyHidden({ children }: VisuallyHiddenProps): React.JSX.Element {
  return <span className="sr-only">{children}</span>;
}
