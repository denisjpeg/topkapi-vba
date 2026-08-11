import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export function Toast({ show, message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className="fixed bottom-6 inset-x-5 sm:inset-x-auto sm:right-6 sm:left-auto z-[100] sm:max-w-sm"
        >
          <div className="flex items-start gap-3 p-4 rounded-md border border-steel-700/70 bg-panel-2 shadow-2xl shadow-black/40">
            <CheckCircle2 size={20} className="text-steel-400 shrink-0 mt-0.5" />
            <p className="text-sm text-paper leading-relaxed flex-1">{message}</p>
            <button onClick={onClose} className="focus-ring text-mist-500 hover:text-paper shrink-0" aria-label="Bildirimi kapat">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
