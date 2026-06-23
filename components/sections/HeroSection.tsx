'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import { useWeddingData } from '@/context/WeddingDataContext'
import AutoCaricature from '@/components/ui/AutoCaricature'
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/animations'

export default function HeroSection() {
  const weddingData = useWeddingData()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <FlowerOverlay />
      {/* Watercolor wash blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] float-slow opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(196,104,58,0.18) 0%, transparent 70%)', top: '-10%', right: '-5%' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] float-med opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(200,146,42,0.15) 0%, transparent 70%)', bottom: '0%', left: '-8%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(139,38,53,0.1) 0%, transparent 70%)', top: '30%', left: '20%' }} />
      </div>

      {/* Botanical ink vines (top) */}
      <svg className="absolute top-0 left-0 w-full opacity-[0.07] pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1300,40 1380,50 1440,60" fill="none" stroke="var(--color-accent)" strokeWidth="2"/>
        <path d="M0,80 C300,40 600,90 900,70 C1100,55 1300,75 1440,80" fill="none" stroke="var(--color-accent3)" strokeWidth="1" opacity="0.7"/>
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT: Caricature */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ border: 'none' }}>
            <AutoCaricature src="/assets/2.jpg" alt="Couple" className="w-full" />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `
                radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, var(--color-bg) 100%),
                linear-gradient(to bottom, transparent 60%, var(--color-bg) 100%),
                linear-gradient(to top, transparent 85%, var(--color-bg) 100%)
              `,
            }} />
          </div>
        </motion.div>

        {/* RIGHT: Couple names + details */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs tracking-[0.4em] uppercase mb-6 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.75 }}
          >
            ✦ &nbsp; A Wedding Invitation &nbsp; ✦
          </motion.p>

          {/* Names */}
          <motion.h1
            variants={fadeUp}
            className="font-display leading-none mb-3"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'var(--color-text)' }}
          >
            <span className="shimmer-text">{weddingData.brideName}</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mb-3 justify-center lg:justify-start"
          >
            {/* Ink rule */}
            <svg viewBox="0 0 80 12" width="80" aria-hidden>
              <line x1="0" y1="6" x2="68" y2="6" stroke="var(--color-accent3)" strokeWidth="1" opacity="0.5"/>
              <rect x="70" y="3" width="6" height="6" fill="var(--color-accent3)" opacity="0.5" transform="rotate(45 73 6)"/>
            </svg>
            <span className="font-display italic" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--color-muted)' }}>weds</span>
            <svg viewBox="0 0 80 12" width="80" style={{ transform: 'scaleX(-1)' }} aria-hidden>
              <line x1="0" y1="6" x2="68" y2="6" stroke="var(--color-accent3)" strokeWidth="1" opacity="0.5"/>
              <rect x="70" y="3" width="6" height="6" fill="var(--color-accent3)" opacity="0.5" transform="rotate(45 73 6)"/>
            </svg>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display leading-none mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'var(--color-text)' }}
          >
            <span className="shimmer-text">{weddingData.groomName}</span>
          </motion.h1>

          {/* Date + venue pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl ink-shadow mb-8"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <span className="font-sans text-sm font-semibold tracking-wider" style={{ color: 'var(--color-accent)' }}>
              📅 20 December 2026
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="font-serif text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            style={{ color: 'var(--color-muted)' }}
          >
            {weddingData.tagline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-sans text-sm tracking-widest glow-text mb-16"
            style={{ color: 'var(--color-accent3)' }}
          >
            {weddingData.hashtag}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent)' }}>Scroll</span>
        <motion.div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 0.1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Bottom botanical ink vines */}
      <svg className="absolute bottom-0 left-0 w-full opacity-[0.06] pointer-events-none" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0,40 C360,10 720,70 1080,40 C1260,25 1400,45 1440,40 L1440,80 L0,80Z" fill="var(--color-accent3)"/>
      </svg>
    </section>
  )
}
