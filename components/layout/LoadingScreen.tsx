'use client'
import { motion } from 'framer-motion'
import { weddingData } from '@/data/wedding-data'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,104,58,0.12) 0%, transparent 70%)' }} />

      {/* Botanical mandala */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer ring — slow CW */}
        <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden>
            <circle cx="70" cy="70" r="64" fill="none" stroke="var(--color-accent3)" strokeWidth="0.8" opacity="0.3"/>
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <rect key={i} x="67" y="4" width="6" height="6"
                fill={i%2===0 ? 'var(--color-accent)' : 'var(--color-accent3)'} opacity="0.5"
                transform={`rotate(${deg} 70 70) rotate(45 70 7)`}/>
            ))}
          </svg>
        </motion.div>

        {/* Inner ring — CCW with leaf petals */}
        <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden>
            <circle cx="70" cy="70" r="46" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.2" strokeDasharray="5 5"/>
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <ellipse key={i} cx="70" cy="26" rx="4" ry="10"
                fill={i%2===0 ? 'var(--color-accent)' : 'var(--color-accent2)'} opacity="0.3"
                transform={`rotate(${deg} 70 70)`}/>
            ))}
          </svg>
        </motion.div>

        {/* Static inner */}
        <svg viewBox="0 0 140 140" width="140" height="140" className="relative z-10" aria-hidden>
          <circle cx="70" cy="70" r="26" fill="none" stroke="var(--color-accent3)" strokeWidth="0.6" opacity="0.2"/>
          <rect x="66" y="66" width="8" height="8" fill="var(--color-accent3)" opacity="0.35" transform="rotate(45 70 70)"/>
        </svg>

        {/* Centre icon */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl z-20 glow-pulse">
          💍
        </div>
      </motion.div>

      {/* Names */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p className="font-display shimmer-text tracking-widest" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: '0.05em' }}>
          {weddingData.brideName}
          <span style={{ color: 'var(--color-accent)' }} className="mx-3 glow-text"> &amp; </span>
          {weddingData.groomName}
        </p>
        <p className="font-sans text-xs tracking-[0.35em] uppercase mt-2 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
          {weddingData.tagline}
        </p>
      </motion.div>

      {/* Line draw → triggers onComplete */}
      <motion.div className="mt-10 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--color-accent3), transparent)' }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 180, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: 'easeInOut' }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  )
}
