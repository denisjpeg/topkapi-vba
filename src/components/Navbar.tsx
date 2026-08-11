import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const scrollLinks = [
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'Etkinlikler', href: '#etkinlikler' },
  { label: 'Yazılar', href: '#yazilar' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Katıl', href: '#katil' },
];

// Ayrı bir sayfaya gider (anchor scroll değil) — bkz. App.tsx routing.
const pageLinks = [{ label: 'Formlar', href: '#formlar' }];

export function Navbar() {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 focus-ring"
        >
          <img
            src={content.logo}
            alt="Topkapı VBA logosu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-md object-cover ring-1 ring-steel-700/60"
          />
          <span className="font-display font-semibold text-sm sm:text-base text-paper tracking-tight leading-tight">
            Topkapı Veri Bilimi<br className="hidden sm:block" />
            <span className="text-mist-300 font-normal text-xs sm:text-sm"> ve Analitiği</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {scrollLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-sm text-mist-300 hover:text-paper transition-colors focus-ring"
            >
              {l.label}
            </button>
          ))}
          {pageLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-mist-300 hover:text-paper transition-colors focus-ring"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => handleNav('#katil')}
            className="focus-ring inline-flex items-center px-4 py-2 rounded-sm bg-steel-500 text-void text-sm font-semibold hover:bg-steel-400 transition-colors"
          >
            Kulübe Katıl
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden focus-ring text-paper p-2 -mr-2"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-void/95 backdrop-blur-md border-b border-line"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {scrollLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="text-left py-3 text-mist-300 hover:text-paper transition-colors border-b border-line/60 last:border-none focus-ring"
                >
                  {l.label}
                </button>
              ))}
              {pageLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-left py-3 text-mist-300 hover:text-paper transition-colors border-b border-line/60 last:border-none focus-ring"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => handleNav('#katil')}
                className="mt-3 focus-ring inline-flex items-center justify-center px-4 py-2.5 rounded-sm bg-steel-500 text-void text-sm font-semibold hover:bg-steel-400 transition-colors"
              >
                Kulübe Katıl
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
