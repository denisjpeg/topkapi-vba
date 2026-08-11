import { motion } from 'framer-motion';
import { Code2, BrainCircuit, LineChart, Trophy } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { useContent } from '../context/ContentContext';

const icons = [Code2, BrainCircuit, LineChart, Trophy];

export function About() {
  const { content } = useContent();
  const { about } = content;
  return (
    <section id="hakkimizda" className="relative py-24 sm:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          <SectionHeading
            eyebrow="Hakkımızda"
            title={about.title}
            description={about.description}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            {about.tracks.map((track, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 rounded-md border border-line bg-panel/60 hover:border-steel-700/70 transition-colors"
                >
                  <Icon size={20} className="text-steel-400" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display font-semibold text-paper text-base">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm text-mist-500 leading-relaxed">{track.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-10 border-t border-line grid sm:grid-cols-2 gap-10"
        >
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-steel-400 mb-3">Misyon</h4>
            <p className="text-mist-300 leading-relaxed">{about.mission}</p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-steel-400 mb-3">Vizyon</h4>
            <p className="text-mist-300 leading-relaxed">{about.vision}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
