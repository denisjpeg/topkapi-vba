import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { useContent } from '../context/ContentContext';

/**
 * Reads gallery tiles from the shared content context. Tiles without an
 * uploaded image (content.gallery[i].image === '') fall back to a lightweight
 * ridge-texture placeholder. Upload real photos via the /#admin panel, or
 * drop files into `public/gallery/` and set `image` to that path in code.
 */
export function Gallery() {
  const { content } = useContent();
  return (
    <section id="galeri" className="relative py-24 sm:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Galeri"
          title="Kulüp etkinliklerinden kareler."
          description="Atölyelerden hackathon gecelerine, ekibimizin bir araya geldiği anlardan seçmeler."
        />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.gallery.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group relative aspect-[4/3] rounded-md overflow-hidden border border-line ${item.image ? '' : 'ridge-texture'}`}
            >
              {item.image ? (
                <img src={item.image} alt={item.caption} className="absolute inset-0 w-full h-full object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
              {!item.image && (
                <div className="absolute inset-0 flex items-center justify-center text-steel-500/40 group-hover:text-steel-400/50 transition-colors">
                  <ImagePlus size={28} strokeWidth={1.5} />
                </div>
              )}
              <figcaption className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-xs sm:text-sm text-mist-300 font-medium">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
