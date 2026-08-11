import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, X } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { useContent } from '../context/ContentContext';
import type { PostItem } from '../data/defaultContent';

export function Posts() {
  const { content } = useContent();
  const [openPost, setOpenPost] = useState<PostItem | null>(null);

  if (content.posts.length === 0) return null;

  return (
    <section id="yazilar" className="relative py-24 sm:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Yazılar"
          title="Kulüpten duyurular, notlar ve yazılar."
          description="Etkinlik ardılları, kaynak önerileri ve kulüple ilgili güncel duyurular burada."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col rounded-md border border-line bg-panel/60 hover:border-steel-700/70 hover:bg-panel-2 transition-colors overflow-hidden"
            >
              <div className={`aspect-[16/9] ${post.image ? '' : 'ridge-texture'} relative overflow-hidden`}>
                {post.image && (
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <h3 className="font-display font-semibold text-lg text-paper leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-mist-500 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-mist-500">
                    <CalendarDays size={14} className="text-steel-400 shrink-0" />
                    {post.date}
                  </div>
                  <button
                    onClick={() => setOpenPost(post)}
                    className="focus-ring text-sm text-steel-400 hover:text-steel-300 font-medium transition-colors"
                  >
                    Devamını oku →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-void/90 backdrop-blur-sm"
            onClick={() => setOpenPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-md border border-line bg-panel-2 p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {openPost.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <button
                  onClick={() => setOpenPost(null)}
                  className="focus-ring p-1.5 -mt-1 -mr-1 text-mist-500 hover:text-paper shrink-0"
                  aria-label="Kapat"
                >
                  <X size={20} />
                </button>
              </div>
              {openPost.image && (
                <div className="mt-5 rounded-md overflow-hidden border border-line">
                  <img src={openPost.image} alt={openPost.title} className="w-full h-auto object-cover" />
                </div>
              )}
              <h2 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-paper tracking-tight text-balance">
                {openPost.title}
              </h2>
              <div className="mt-3 flex items-center gap-4 font-mono text-xs text-mist-500">
                <span className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-steel-400" />
                  {openPost.date}
                </span>
                {openPost.author && <span>{openPost.author}</span>}
              </div>
              <p className="mt-6 text-sm sm:text-base text-mist-300 leading-relaxed whitespace-pre-line">
                {openPost.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
