'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import RSVPModal from '@/components/ui/RSVPModal'
import PartyConfetti from '@/components/ui/PartyConfetti'
import { useWeddingData, useIsPreview } from '@/context/WeddingDataContext'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function RSVPSection() {
  const weddingData = useWeddingData()
  const isPreview = useIsPreview()
  const [modalOpen, setModalOpen] = useState(false)
  const [responded, setResponded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('rsvp-responded') === 'true') setResponded(true)
  }, [])

  const handleSend = (guestCount: number, fullMessage: string) => {
    const whatsapp = `https://wa.me/${weddingData.rsvp.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`
    window.open(whatsapp, '_blank')
    setModalOpen(false)
    setResponded(true)
    setShowConfetti(true)
    localStorage.setItem('rsvp-responded', 'true')
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <section id="rsvp" style={{ background: 'var(--color-surface2)' }} className="py-28 px-6 relative">
      <FlowerOverlay />
      <div className="max-w-2xl mx-auto text-center">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>✦ &nbsp; Kindly Reply &nbsp; ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>{weddingData.rsvpHeading || 'RSVP'}</motion.h2>

          <motion.div variants={scaleIn}
            className="px-8 py-10 rounded-2xl ink-shadow-lg mb-8 relative overflow-hidden" style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}>
            {showConfetti && <PartyConfetti />}
            {responded ? (
              <>
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display shimmer-text mb-3" style={{ fontSize: '2rem', lineHeight: 1.4, padding: '0.1em 0' }}>
                  Thank You!
                </h3>
                <p className="font-serif text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Your RSVP has been sent. We can&apos;t wait to celebrate with you!
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-5 float-slow">💌</div>
                <p className="font-display text-xl md:text-2xl mb-4" style={{ color: 'var(--color-text)', opacity: 0.88 }}>
                  {weddingData.rsvpText || 'We joyfully await your presence.'}
                </p>
                <p className="font-serif text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                  Please let us know by <span style={{ color: 'var(--color-accent)' }}>{weddingData.rsvpDeadline || weddingData.rsvp.deadline}</span>. Your confirmation helps us ensure celebrations are as beautiful as the occasion.
                </p>
                <InkDivider className="mb-8" />
                <motion.button onClick={() => isPreview ? setShowPurchaseAlert(true) : setModalOpen(true)}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans text-base font-semibold tracking-wider"
                  style={{ background: 'var(--color-accent)', color: '#fff', boxShadow: '0 4px 24px rgba(196,104,58,0.4)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 6px 32px rgba(196,104,58,0.55)' }}
                  whileTap={{ scale: 0.97 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  RSVP on WhatsApp
                </motion.button>
              </>
            )}
          </motion.div>

          <motion.p variants={fadeUp} className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
            Or call us at{' '}
            <a href={`tel:+${weddingData.rsvp.whatsappNumber}`} className="glow-text font-semibold" style={{ color: 'var(--color-accent)' }}>
              {weddingData.rsvp.whatsappNumber}
            </a>
          </motion.p>
        </motion.div>
      </div>

      <RSVPModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleSend}
        defaultMessage={weddingData.rsvp.message}
        brideName={weddingData.brideName}
        groomName={weddingData.groomName}
      />

      {showPurchaseAlert && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPurchaseAlert(false)}>
          <div className="rounded-2xl p-8 max-w-sm w-full text-center" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }} onClick={e => e.stopPropagation()}>
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-text)' }}>Purchase Required</h3>
            <p className="font-sans text-sm mb-6" style={{ color: 'var(--color-muted)' }}>You need to purchase this card to send RSVPs.</p>
            <button onClick={() => setShowPurchaseAlert(false)} className="px-6 py-2.5 rounded-full font-sans text-sm font-semibold" style={{ background: 'var(--color-accent)', color: '#080f1a' }}>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}
