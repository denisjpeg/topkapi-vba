import { ChevronMark } from './ui/ChevronMark';
import { useContent } from '../context/ContentContext';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82c-.9-.68-1.44-1.72-1.5-2.82h-3.02v13.65a2.72 2.72 0 1 1-2.14-2.66V10.9a5.77 5.77 0 0 0-1.03-.09A5.87 5.87 0 1 0 14.8 16.6V9.4a8.6 8.6 0 0 0 4.79 1.46V7.83a5.8 5.8 0 0 1-2.99-2.01z" />
  </svg>
);

export function Footer() {
  const { content } = useContent();
  return (
    <footer className="relative border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid sm:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="flex items-start gap-3">
            <img
              src={content.logo}
              alt="Topkapı VBA logosu"
              className="w-11 h-11 rounded-md object-cover ring-1 ring-steel-700/60 shrink-0"
            />
            <div>
              <p className="font-display font-semibold text-paper">Topkapı Veri Bilimi ve Analitiği Kulübü</p>
              <p className="mt-1.5 text-sm text-mist-500 max-w-md leading-relaxed">
                {content.footer.tagline}
              </p>
              <a
                href={`mailto:${content.contact.email}`}
                className="focus-ring mt-2 inline-block text-sm text-steel-400 hover:text-steel-300 transition-colors font-mono"
              >
                {content.contact.email}
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={content.footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="focus-ring w-10 h-10 flex items-center justify-center rounded-sm border border-line text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={content.footer.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="focus-ring w-10 h-10 flex items-center justify-center rounded-sm border border-line text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
            >
              <TikTokIcon size={17} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-mist-500 text-xs">
            <ChevronMark className="w-3.5 h-3.5 text-steel-700" />
            <span>© {new Date().getFullYear()} Topkapı VBA. Tüm hakları saklıdır.</span>
          </div>
          <p className="text-xs text-mist-500">
            <a href="#formlar" className="hover:text-mist-300 transition-colors">
              Formlar
            </a>
            <span className="mx-2 text-line">·</span>
            <a href="#admin" className="hover:text-mist-300 transition-colors">
              Yönetim paneli
            </a>
            <span className="mx-2 text-line">·</span>
            Powered by{' '}
            <a
              href="https://denizaltny.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-steel-400 hover:text-steel-300 underline underline-offset-2 focus-ring"
            >
              Deniz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
