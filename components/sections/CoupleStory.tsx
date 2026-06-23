'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/animations'
import type { StoryMilestone } from '@/types/wedding.types'

function StoryCard({ m }: { m: StoryMilestone }) {
  return (
    <motion.div
      data-cursor-glow
      className="px-6 py-5 rounded-xl ink-shadow"
      style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
      whileHover={{ boxShadow: '0 0 40px rgba(196,104,58,0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {m.image && (
        <div className="relative h-36 rounded-lg overflow-hidden mb-4">
          <img src={m.image} alt={m.title} className="w-full h-full object-cover" style={{ filter: 'saturate(0.9)' }}/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, var(--color-bg) 100%)' }}/>
        </div>
      )}
      <h3 className="font-display text-xl mb-1.5 glow-text" style={{ color: 'var(--color-accent)' }}>{m.title}</h3>
      <p className="font-serif text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{m.description}</p>
    </motion.div>
  )
}

export default function CoupleStory() {
  const weddingData = useWeddingData()
  return (
    <section id="story" style={{ background: 'var(--color-surface)' }} className="py-28 px-6 relative">
      <FlowerOverlay />
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-14" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>✦ &nbsp; Our Journey &nbsp; ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Our Story</motion.h2>
          <InkDivider className="mt-4 max-w-xs mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent3), transparent)', opacity: 0.35 }}/>

          <div className="space-y-14">
            {weddingData.coupleStory.map((m, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div key={i}
                  variants={isLeft ? slideLeft : slideRight}
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
                >
                  {/* Desktop: alternating */}
                  <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-4">
                    {isLeft ? <StoryCard m={m} /> : <div/>}
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 ink-shadow"
                        style={{ background: 'var(--color-surface2)', border: '1.5px solid var(--color-accent3)' }}
                        whileInView={{ scale: [0, 1.2, 1] }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                      >{m.icon}</motion.div>
                      <span className="font-sans text-xs tracking-widest uppercase text-center" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>{m.date}</span>
                    </div>
                    {!isLeft ? <StoryCard m={m} /> : <div/>}
                  </div>

                  {/* Mobile: stacked */}
                  <div className="md:hidden flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg ink-shadow"
                        style={{ background: 'var(--color-surface2)', border: '1.5px solid var(--color-accent3)' }}>{m.icon}</div>
                      <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>{m.date}</span>
                    </div>
                    <div className="w-full"><StoryCard m={m}/></div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
