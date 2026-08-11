interface BadgeProps {
  children: React.ReactNode;
  tone?: 'steel' | 'ghost';
}

export function Badge({ children, tone = 'steel' }: BadgeProps) {
  const tones = {
    steel: 'bg-steel-900/60 text-steel-300 border-steel-700/70',
    ghost: 'bg-white/5 text-mist-300 border-line',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-sm border font-mono text-[11px] tracking-wide uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
