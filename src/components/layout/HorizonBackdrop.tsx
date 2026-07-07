/** The soft top-left Horizon glow behind page heroes (DESIGN_SYSTEM §2). Decorative; one definition
 *  so every hero glows identically. Place inside a `relative overflow-hidden` section. */
export function HorizonBackdrop(): React.JSX.Element {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(55% 55% at 20% 0%, color-mix(in oklab, var(--color-brand-200) 40%, transparent), transparent 60%)',
      }}
    />
  );
}
