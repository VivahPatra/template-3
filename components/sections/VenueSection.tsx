'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function VenueSection() {
  const weddingData = useWeddingData()
  const { isEditing, data } = useEditMode()
  const d = isEditing ? data : weddingData
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
            <EditableText field="venue.name" tag="h3" className="font-display text-3xl glow-text mb-2" style={{ color: 'var(--color-accent)' }}>{d.venue.name}</EditableText>
            <EditableText field="venue.address" tag="p" className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>{d.venue.address}</EditableText>
          </div>

          <div className="px-8 py-8" style={{ background: 'var(--color-bg)' }}>
            <p className="font-sans text-xs tracking-widest uppercase mb-5 text-center" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>Events at this venue</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {d.events.filter(e => e.venue === d.venue.name).map(e => (
                <a
                  key={e.id}
                  href={`https://maps.google.com/?q=${encodeURIComponent(e.venue + ', ' + e.venueAddress)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:opacity-80 transition-opacity"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', minWidth: 220 }}
                >
                  <span className="text-xl float-emoji">{e.emoji}</span>
                  <div>
                    <p className="font-display text-base" style={{ color: 'var(--color-text)' }}>{e.name}</p>
                    <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>{e.date} · {e.time}</p>
                    <p className="font-sans text-xs mt-0.5" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>📍 {e.venueAddress}</p>
                  </div>
                </a>
              ))}
            </div>
            <InkDivider className="my-6" />
            <div className="text-center">
              <motion.a href={d.venue.mapUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-sans text-sm font-semibold tracking-wider uppercase"
                style={{ background: 'var(--color-accent)', color: '#fff', boxShadow: '0 4px 20px rgba(196,104,58,0.35)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                📍 Get Directions
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Other venues */}
        <motion.div className="mt-8 flex flex-wrap justify-center gap-5"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {d.events.filter(e => e.venue !== d.venue.name).map(e => (
            <motion.a
              key={e.id} variants={fadeUp}
              href={`https://maps.google.com/?q=${encodeURIComponent(e.venue + ', ' + e.venueAddress)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-4 rounded-xl ink-shadow hover:opacity-80 transition-opacity"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', minWidth: 260, flex: '1 1 260px', maxWidth: 340 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl float-emoji">{e.emoji}</span>
                <h4 className="font-display text-lg" style={{ color: e.color || 'var(--color-accent)' }}>{e.name}</h4>
              </div>
              <p className="font-sans text-sm font-medium mb-0.5" style={{ color: 'var(--color-text)', opacity: 0.85 }}>{e.venue}</p>
              <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>{e.venueAddress}</p>
              <p className="font-sans text-xs mt-1" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>📍 {e.date} · {e.time}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
