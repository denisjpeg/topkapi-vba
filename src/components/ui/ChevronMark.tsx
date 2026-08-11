interface ChevronMarkProps {
  className?: string;
}

/**
 * The recurring signature shape of the site — a simplified rendering of the
 * chevron peaks from the club's "V3A" mark. Used sparingly as a structural
 * device: section dividers, list markers, the scroll cue.
 */
export function ChevronMark({ className = 'w-6 h-6' }: ChevronMarkProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 30 L15 4 L24 22 L33 4 L46 30"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
