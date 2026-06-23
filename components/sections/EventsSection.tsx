'use client'
import { motion } from 'framer-motion'
import FlowerOverlay from '@/components/ui/FlowerOverlay'
import InkDivider from '@/components/ui/InkDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { WeddingEvent } from '@/types/wedding.types'

function EventNode({
  event,
  isHero = false,
  delay = 0,
}: {
  event: WeddingEvent
  isHero?: boolean
  delay?: number
}) {
  const color = event.color || 'var(--color-accent)'
  const circleSize = isHero ? 130 : 100
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(event.venue + ', ' + event.venueAddress)}`

  return (
    <motion.article
      data-cursor-glow
      className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative" style={{ width: circleSize, height: circleSize }}>
        {/* Base glow halo */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{ boxShadow: `0 0 16px 4px ${color}2e` }}
        />
        {/* Hover glow intensifier */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ boxShadow: `0 0 48px 16px ${color}50` }}
        />

        {/* Dashed ring — spins on hover */}
        <div
          className="absolute rounded-full group-hover:[animation:spin_6s_linear_infinite]"
          style={{ inset: -3, border: `1.5px dashed ${color}`, opacity: 0.45 }}
        />

        {/* Solid border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${color}`, opacity: 0.5 }}
        />

        {/* Image or emoji */}
        {event.image ? (
          <img
            src={event.image}
            alt={event.name}
            className="absolute inset-0 rounded-full object-cover"
            style={{ width: '100%', height: '100%', filter: 'brightness(0.85) saturate(1.1)' }}
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${color}22 0%, ${color}08 100%)`,
              fontSize: isHero ? 44 : 34,
            }}
          >
            {event.emoji}
          </div>
        )}

        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, transparent 50%, ${color}15 100%)` }}
        />
      </div>

      {/* Name + date */}
      <div className="text-center mt-3">
        <p
          className="font-display tracking-wide glow-text"
          style={{ color: 'var(--color-text)', fontSize: isHero ? '1.25rem' : '1rem' }}
        >
          {event.name}
        </p>
        <p
          className="font-sans text-xs tracking-widest mt-0.5"
          style={{ color, opacity: 0.7 }}
        >
          {event.date.split(',')[0]} · {event.time}
        </p>
      </div>

      {/* Detail panel — always visible */}
      <div
        className="text-center mt-3 rounded-xl px-3 py-3 ink-shadow"
        style={{
          maxWidth: 160,
          background: 'var(--color-bg)',
          border: `1px solid ${color}33`,
          boxShadow: `0 0 10px ${color}15`,
        }}
      >
        <p className="font-serif text-sm" style={{ color: 'var(--color-text)', opacity: 0.85 }}>
          {event.venue}
        </p>
        <p className="font-sans text-xs mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
          {event.venueAddress.split(',')[0]}
        </p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 font-sans text-xs tracking-wider underline underline-offset-2 hover:opacity-100 transition-opacity duration-200"
          style={{ color, opacity: 0.85 }}
        >
          📍 View on Maps
        </a>
      </div>
    </motion.article>
  )
}

export default function EventsSection() {
  const weddingData = useWeddingData()
  const events = weddingData.events
  const half = Math.ceil(events.length / 2)
  const row1 = events.slice(0, half)
  const row2 = events.slice(half)

  return (
    <section id="events" style={{ background: 'var(--color-surface2)' }} className="py-28 px-6 relative">
      <FlowerOverlay />
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            ✦ &nbsp; The Celebrations &nbsp; ✦
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display shimmer-text"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Our <em>Events</em>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex justify-center mt-6">
            <svg viewBox="0 0 320 14" width="320" height="14" aria-hidden>
              <line x1="10" y1="7" x2="310" y2="7" stroke="var(--color-accent3)" strokeWidth="1.5" opacity="0.4"/>
              <line x1="10" y1="11" x2="310" y2="11" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.2"/>
              <rect x="75"  y="4" width="6" height="6" fill="var(--color-accent2)" opacity="0.5" transform="rotate(45 78 7)"/>
              <rect x="155" y="3" width="8" height="8" fill="var(--color-accent3)" opacity="0.65" transform="rotate(45 159 7)"/>
              <rect x="235" y="4" width="6" height="6" fill="var(--color-accent2)" opacity="0.5" transform="rotate(45 238 7)"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Event grid */}
        <div className="relative">
          {/* Decorative connecting path */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 900 200">
              <path
                d="M 150 60 Q 450 140 750 60"
                fill="none"
                stroke="var(--color-accent3)"
                strokeWidth="0.8"
                opacity="0.2"
                strokeDasharray="4 6"
              />
            </svg>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 md:relative md:z-10">
            {row1.map((ev, i) => (
              <EventNode key={ev.id} event={ev} delay={i * 0.1} />
            ))}
          </div>

          {/* Row 2 — centered on desktop, stacked on mobile */}
          <div className="flex flex-col md:flex-row md:justify-center items-center gap-10 md:gap-20 mt-8 md:mt-10 md:relative md:z-10">
            {row2.map((ev, i) => (
              <EventNode
                key={ev.id}
                event={ev}
                isHero={ev.id === 'wedding'}
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-14">
          <InkDivider className="max-w-xs mx-auto opacity-40" />
        </div>
      </div>
    </section>
  )
}
