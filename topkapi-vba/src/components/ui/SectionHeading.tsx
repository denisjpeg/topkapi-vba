import { motion } from 'framer-motion';
import { ChevronMark } from './ChevronMark';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <div className={`flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <ChevronMark className="w-4 h-4 text-steel-400" />
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-steel-400">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-mist-300 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
