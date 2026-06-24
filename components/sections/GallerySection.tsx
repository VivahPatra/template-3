'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function GallerySection() {
  const weddingData = useWeddingData()
  const { isEditing, data } = useEditMode()
  const d = isEditing ? data : weddingData
  return (
    <section id="gallery" style={{ background: 'var(--color-surface2)' }} className="py-28 px-6 relative">
      <FlowerOverlay />
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}>✦ &nbsp; Memories &nbsp; ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Our Gallery
          </motion.h2>
          <InkDivider className="mt-4 max-w-xs mx-auto" />
        </motion.div>

        {/* Bento box grid: varied col/row spans create a magazine-style layout */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          style={{ gridAutoRows: '200px', gridAutoFlow: 'dense' }}
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        >
          {d.galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              data-cursor-glow
              className={[
                'relative rounded-2xl group cursor-pointer gallery-glow-card',
                img.span === 'wide' ? 'col-span-2' : '',
                img.span === 'tall' ? 'row-span-2' : '',
              ].filter(Boolean).join(' ')}
              style={{ border: '1px solid var(--color-border)' }}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:saturate-150"
                  style={{ filter: 'saturate(0.95)' }}
                />
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(196,104,58,0.15)' }}
              >
                <span className="text-xl" style={{ color: 'var(--color-accent3)' }}>❦</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-10 font-sans text-sm tracking-widest glow-text"
          style={{ color: 'var(--color-accent)', opacity: 0.6 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          <EditableText field="hashtag">{d.hashtag}</EditableText>
        </motion.p>
      </div>
    </section>
  )
}
