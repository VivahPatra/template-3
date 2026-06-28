'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function VenueSection() {
  const weddingData = useWeddingData()
  return (
    <section id="venue" style={{ background: 'var(--color-surface)' }} className="py-28 px-6 relative">
      <FlowerOverlay />
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-14" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>✦ &nbsp; Find Us &nbsp; ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Venue</motion.h2>
          <InkDivider className="mt-4 max-w-xs mx-auto" />
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl overflow-hidden ink-shadow-lg" style={{ border: '1.5px solid var(--color-border)' }}>
          <div className="px-8 py-12 text-center" style={{ background: 'var(--color-surface2)' }}>
            <div className="text-5xl mb-4 float-slow">🏛️</div>
            <h3 className="font-display text-3xl glow-text mb-2" style={{ color: 'var(--color-accent)' }}>{weddingData.venue.name}</h3>
            <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>{weddingData.venue.address}</p>
          </div>

          <div className="px-8 py-8 text-center" style={{ background: 'var(--color-bg)' }}>
            <motion.a href={weddingData.venue.mapUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-sans text-sm font-semibold tracking-wider uppercase"
              style={{ background: 'var(--color-accent)', color: '#fff', boxShadow: '0 4px 20px rgba(196,104,58,0.35)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              📍 Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
