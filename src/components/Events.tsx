import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Mic2 } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { useContent } from '../context/ContentContext';

type Filter = 'upcoming' | 'past';

export function Events() {
  const { content } = useContent();
  const [filter, setFilter] = useState<Filter>('upcoming');
  const filtered = content.events.filter((e) => e.status === filter);

  return (
    <section id="etkinlikler" className="relative py-24 sm:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <SectionHeading
            eyebrow="Etkinlikler"
            title="Atölyeler, hackathonlar ve konuk konuşmacılar."
            description="Her hafta pratik yapılan, konuk uzmanların katıldığı ve fikirlerin projeye dönüştüğü etkinlikler düzenliyoruz."
          />

          <div className="flex gap-1 p-1 rounded-sm border border-line bg-panel/60 self-start sm:self-auto">
            {(['upcoming', 'past'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`focus-ring px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                  filter === f ? 'bg-steel-500 text-void' : 'text-mist-300 hover:text-paper'
                }`}
              >
                {f === 'upcoming' ? 'Yaklaşan' : 'Geçmiş'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <motion.article
                key={event.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-6 rounded-md border border-line bg-panel/60 hover:border-steel-700/70 hover:bg-panel-2 transition-colors flex flex-col"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <h3 className="font-display font-semibold text-lg text-paper leading-snug">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-mist-500 leading-relaxed flex-1">{event.description}</p>

                <div className="mt-5 pt-5 border-t border-line space-y-2 font-mono text-xs text-mist-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-steel-400 shrink-0" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-steel-400 shrink-0" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-steel-400 shrink-0" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic2 size={14} className="text-steel-400 shrink-0" />
                    {event.speaker}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
