import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { ADMIN_PASSWORD } from '../../config/site';
import { ChevronMark } from '../ui/ChevronMark';

const SESSION_KEY = 'topkapi_vba_admin_session';

export function isAdminAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function AdminGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-5">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-md border border-line bg-panel/60"
      >
        <div className="flex items-center gap-2 mb-6">
          <ChevronMark className="w-4 h-4 text-steel-400" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-steel-400">
            Yönetim Paneli
          </span>
        </div>
        <h1 className="font-display text-xl font-semibold text-paper mb-1">Giriş yap</h1>
        <p className="text-sm text-mist-500 mb-6">
          İçerikleri düzenlemek için panel şifresini gir.
        </p>

        <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-2">
          Şifre
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-500" />
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className="input-field pl-9"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">Şifre yanlış, tekrar dene.</p>}

        <button
          type="submit"
          className="focus-ring mt-6 w-full px-4 py-3 rounded-sm bg-steel-500 text-void font-semibold hover:bg-steel-400 transition-colors"
        >
          Giriş yap
        </button>

        <a
          href="#top"
          className="focus-ring mt-4 block text-center text-sm text-mist-500 hover:text-paper transition-colors"
        >
          ← Siteye dön
        </a>
      </motion.form>
    </div>
  );
}
