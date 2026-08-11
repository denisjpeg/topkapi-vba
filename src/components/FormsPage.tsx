import { Mail, ExternalLink, ClipboardList, BarChart3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionHeading } from './ui/SectionHeading';
import { ChevronMark } from './ui/ChevronMark';
import { PollCard } from './PollCard';

export function FormsPage() {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 focus-ring">
            <ChevronMark className="w-4 h-4 text-steel-400" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-steel-400">
              Topkapı VBA — Formlar
            </span>
          </a>
          <a
            href="#top"
            className="focus-ring inline-flex items-center gap-1.5 text-sm text-mist-300 hover:text-paper transition-colors"
          >
            Siteye dön <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 space-y-20">
        <SectionHeading
          eyebrow="Formlar"
          title="Formlar ve anketler."
          description="Kulüp üyeliğinden bağımsız; katılım gerektiren formlar ve güncel anketler burada."
        />

        <section>
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList size={18} className="text-steel-400" />
            <h2 className="font-display text-xl font-semibold text-paper">Formlar</h2>
          </div>

          {content.forms.length === 0 ? (
            <p className="text-sm text-mist-500">Şu an açık bir form bulunmuyor. Yeni formlar burada listelenecek.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {content.forms.map((f) => (
                <div key={f.id} className="p-6 rounded-md border border-line bg-panel/60 flex flex-col">
                  <h3 className="font-display font-semibold text-lg text-paper leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm text-mist-500 leading-relaxed flex-1">{f.description}</p>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-steel-500 text-void text-sm font-semibold hover:bg-steel-400 transition-colors"
                  >
                    Formu Doldur <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={18} className="text-steel-400" />
            <h2 className="font-display text-xl font-semibold text-paper">Anketler</h2>
          </div>

          {content.polls.length === 0 ? (
            <p className="text-sm text-mist-500">Şu an açık bir anket bulunmuyor. Yeni anketler burada listelenecek.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {content.polls.map((p) => (
                <PollCard key={p.id} poll={p} />
              ))}
            </div>
          )}
        </section>

        <section className="pt-8 border-t border-line">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={18} className="text-steel-400" />
            <h2 className="font-display text-xl font-semibold text-paper">İletişim</h2>
          </div>
          <p className="text-sm text-mist-500 leading-relaxed max-w-md">
            Form veya anketlerle ilgili bir sorun varsa doğrudan bize yazabilirsin.
          </p>
          <a
            href={`mailto:${content.contact.email}`}
            className="focus-ring mt-3 inline-flex items-center gap-2 text-steel-400 hover:text-steel-300 transition-colors font-mono text-sm"
          >
            {content.contact.email}
          </a>
        </section>
      </main>
    </div>
  );
}
