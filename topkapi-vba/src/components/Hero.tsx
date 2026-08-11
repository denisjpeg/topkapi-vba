import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { ChevronMark } from './ui/ChevronMark';
import { useContent } from '../context/ContentContext';

export function Hero() {
  const { content } = useContent();
  const { hero } = content;
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Ridge-texture backdrop, echoing the logo's pleated background */}
      <div className="absolute inset-0 ridge-texture opacity-40" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(7,8,13,0.15) 0%, rgba(7,8,13,0.75) 55%, rgba(7,8,13,1) 100%)' }}
      />
      <div className="absolute inset-0 grid-fade" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <ChevronMark className="w-4 h-4 text-steel-400" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-steel-400">
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-semibold text-4xl sm:text-6xl leading-[1.05] tracking-tight text-paper text-glow"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-mist-300 leading-relaxed max-w-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => scrollTo('#katil')}
              className="focus-ring group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-steel-500 text-void font-semibold hover:bg-steel-400 transition-colors"
            >
              Aramıza Katıl
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo('#etkinlikler')}
              className="focus-ring inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border border-line text-paper hover:border-steel-500/70 hover:bg-white/[0.03] transition-colors"
            >
              <CalendarDays size={17} />
              Etkinlikleri İncele
            </button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 grid grid-cols-3 max-w-md border-t border-line pt-6 gap-4"
          >
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-mist-500">{s.label}</dt>
                <dd className="font-display text-2xl sm:text-3xl font-semibold text-paper mt-1">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
