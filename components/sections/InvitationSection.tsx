'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

function CornerSvg({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) {
  return (
    <svg viewBox="0 0 60 60" width="52" aria-hidden
      style={{ transform: `scale(${flip ? -1 : 1},${flipY ? -1 : 1})` }}>
      <path d="M4,56 Q4,4 56,4" fill="none" stroke="var(--color-accent3)" strokeWidth="1" opacity="0.5"/>
      <path d="M4,42 Q16,16 42,4" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" opacity="0.3"/>
      <circle cx="4" cy="56" r="3" fill="var(--color-accent3)" opacity="0.45"/>
      <circle cx="20" cy="10" r="1.5" fill="var(--color-accent)" opacity="0.3"/>
      <circle cx="10" cy="22" r="1.5" fill="var(--color-accent3)" opacity="0.3"/>
    </svg>
  )
}

export default function InvitationSection() {
  const weddingData = useWeddingData()
  const { isEditing, data } = useEditMode()
  const d = isEditing ? data : weddingData
  return (
    <section style={{ background: 'var(--color-surface)' }} className="py-28 px-6 relative">
      <FlowerOverlay />
      <div className="max-w-2xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>

          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
              ✦ &nbsp; With Joy &nbsp; ✦
            </p>
            <h2 className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              You Are Invited
            </h2>
          </motion.div>

          {/* Ornate card */}
          <motion.div variants={scaleIn}
            data-cursor-glow
            className="relative px-8 py-10 rounded-2xl ink-shadow"
            style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}
            whileHover={{ boxShadow: '0 0 50px rgba(196,104,58,0.2), 0 0 100px rgba(196,104,58,0.1)' }}
            transition={{ duration: 0.4 }}
          >
            {/* Corners */}
            <div className="absolute top-3 left-3"><CornerSvg /></div>
            <div className="absolute top-3 right-3"><CornerSvg flip /></div>
            <div className="absolute bottom-3 left-3"><CornerSvg flipY /></div>
            <div className="absolute bottom-3 right-3"><CornerSvg flip flipY /></div>

            {/* Top rule */}
            <svg viewBox="0 0 300 10" width="100%" style={{ maxWidth: 280 }} className="mx-auto mb-6" aria-hidden>
              <line x1="0" y1="5" x2="110" y2="5" stroke="var(--color-accent3)" strokeWidth="0.7" opacity="0.4"/>
              <rect x="128" y="2" width="6" height="6" fill="var(--color-accent3)" opacity="0.55" transform="rotate(45 131 5)"/>
              <line x1="152" y1="5" x2="300" y2="5" stroke="var(--color-accent3)" strokeWidth="0.7" opacity="0.4"/>
            </svg>

            <div className="flex flex-col items-center mb-3">
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="ganesha-backdrop" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,80,0.75) 0%, rgba(201,168,76,0.35) 55%, transparent 75%)', filter: 'blur(10px)' }} />
                <img src="/assets/ganesha.gif" alt="Ganesha" className="ganesha-glow" style={{ width: 58, height: 'auto', position: 'relative', zIndex: 1 }} />
              </div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-center mt-2 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
                ॥ Shree Ganeshaya Namah ॥
              </p>
            </div>

            {/* Names */}
            <div className="flex items-center justify-center gap-3 my-5">
              <div className="text-center">
                <EditableText field="brideName" className="font-display shimmer-text block" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{d.brideName}</EditableText>
                {d.brideParents && (
                  <p className="font-sans text-xs tracking-wide mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                    Daughter of <EditableText field="brideParents">{d.brideParents}</EditableText>
                  </p>
                )}
              </div>
              <span className="font-display glow-text float-slow" style={{ color: 'var(--color-accent2)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>&amp;</span>
              <div className="text-center">
                <EditableText field="groomName" className="font-display shimmer-text block" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{d.groomName}</EditableText>
                {d.groomParents && (
                  <p className="font-sans text-xs tracking-wide mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                    Son of <EditableText field="groomParents">{d.groomParents}</EditableText>
                  </p>
                )}
              </div>
            </div>

            {/* Bottom rule */}
            <svg viewBox="0 0 300 10" width="100%" style={{ maxWidth: 280 }} className="mx-auto mb-6" aria-hidden>
              <line x1="0" y1="5" x2="110" y2="5" stroke="var(--color-accent3)" strokeWidth="0.7" opacity="0.4"/>
              <rect x="128" y="2" width="6" height="6" fill="var(--color-accent3)" opacity="0.55" transform="rotate(45 131 5)"/>
              <line x1="152" y1="5" x2="300" y2="5" stroke="var(--color-accent3)" strokeWidth="0.7" opacity="0.4"/>
            </svg>

            <EditableText field="invitationText" tag="p" multiline className="font-serif text-base md:text-lg leading-relaxed text-center mb-6" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
              {d.invitationText}
            </EditableText>

            <InkDivider className="my-6" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 font-sans text-sm tracking-wide" style={{ color: 'var(--color-accent)', opacity: 0.8 }}>
              <span>📅 &nbsp; December 20, 2026</span>
              <span className="hidden sm:block opacity-30" style={{ color: 'var(--color-border)' }}>◆</span>
              <EditableText field="hashtag">{d.hashtag}</EditableText>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
