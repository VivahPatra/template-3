'use client'
import { useEffect, useState } from 'react'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import { motion } from 'framer-motion'
import InkDivider from '@/components/ui/InkDivider'
import { weddingData } from '@/data/wedding-data'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

function getTime(target: Date) {
  const d = Math.max(0, target.getTime() - Date.now())
  return { days: Math.floor(d/86400000), hours: Math.floor((d%86400000)/3600000), minutes: Math.floor((d%3600000)/60000), seconds: Math.floor((d%60000)/1000) }
}

export default function CountdownSection() {
  const [t, setT] = useState(getTime(weddingData.weddingDate))
  useEffect(() => { const id = setInterval(() => setT(getTime(weddingData.weddingDate)), 1000); return () => clearInterval(id) }, [])
  const units = [{ label: 'Days', value: t.days }, { label: 'Hours', value: t.hours }, { label: 'Minutes', value: t.minutes }, { label: 'Seconds', value: t.seconds }]

  return (
    <section style={{ background: 'var(--color-surface)' }} className="py-28 px-6 text-center">
      <FlowerOverlay />
      <div className="max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>✦ &nbsp; Counting Down &nbsp; ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>The Big Day</motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm tracking-widest mb-12" style={{ color: 'var(--color-muted)' }}>December 20, 2026 · New Delhi</motion.p>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12" variants={staggerContainer}>
            {units.map(({ label, value }) => (
              <motion.div key={label} variants={scaleIn}
                className="px-4 py-7 rounded-2xl ink-shadow" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <motion.p key={value} className="font-display glow-text"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: 'var(--color-accent)', lineHeight: 1 }}
                  initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  {String(value).padStart(2, '0')}
                </motion.p>
                <p className="font-sans text-xs tracking-[0.2em] uppercase mt-3" style={{ color: 'var(--color-muted)' }}>{label}</p>
              </motion.div>
            ))}
          </motion.div>

          <InkDivider className="max-w-xs mx-auto mb-8" />
          <motion.p variants={fadeUp} className="font-display text-xl md:text-2xl" style={{ color: 'var(--color-text)', opacity: 0.75 }}>
            Until we say <span className="shimmer-text">forever</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
