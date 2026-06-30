'use client'
import { motion } from 'framer-motion'
import { formatShortDate } from '@/lib/utils'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function FooterSection() {
  const weddingData = useWeddingData()
  return (
    <footer className="relative py-24 text-center overflow-hidden" style={{ background: 'var(--color-surface2)' }}>
      {/* Warm wash */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,104,58,0.08) 0%, transparent 70%)' }}/>

      {/* Bottom botanical ink lines */}
      <svg className="absolute bottom-0 left-0 w-full opacity-[0.06] pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
        <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1400,35 1440,30 L1440,60 L0,60Z" fill="var(--color-accent3)"/>
      </svg>

      <div className="relative z-10 max-w-xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={fadeUp} className="text-4xl mb-6 float-slow">💍</motion.div>

          <motion.h2 variants={fadeUp} className="font-display shimmer-text mb-4"
            style={{ fontSize: 'clamp(2.1rem, 6.5vw, 4rem)', lineHeight: 1.3, padding: '0.1em 0' }}>
            {weddingData.brideName}
            <span className="mx-3 glow-text float-slow" style={{ color: 'var(--color-accent2)', fontSize: '0.6em' }}>&amp;</span>
            {weddingData.groomName}
          </motion.h2>

          <motion.p variants={fadeUp} className="font-sans text-sm tracking-[0.3em] uppercase mb-2 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            {weddingData.tagline}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-xs mb-8" style={{ color: 'var(--color-muted)' }}>
            {formatShortDate(weddingData.weddingDate)}
          </motion.p>

          <motion.div variants={fadeUp} className="h-px w-28 mx-auto mb-7"
            style={{ background: 'linear-gradient(to right, transparent, var(--color-accent3), transparent)', opacity: 0.5 }}/>

          <motion.p variants={fadeUp} className="font-display text-xl glow-text mb-6" style={{ color: 'var(--color-accent)' }}>
            {weddingData.hashtag}
          </motion.p>

          {weddingData.socialLinks?.instagram && (
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <motion.a href={weddingData.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 rounded-full font-sans text-sm ink-shadow"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-accent)', background: 'var(--color-surface)' }}
                whileHover={{ scale: 1.05 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Follow our journey
              </motion.a>
            </motion.div>
          )}

          <motion.p variants={fadeUp} className="font-sans text-xs" style={{ color: 'var(--color-muted)', opacity: 0.4 }}>
            Made with 💍 for our special day
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
