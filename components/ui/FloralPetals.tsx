'use client'
import { useEffect, useState } from 'react'

type Petal = { id: number; left: number; delay: number; duration: number; size: number; rotation: number; type: number }

// Warmer autumn/terracotta confetti shapes
const SHAPES = [
  <svg key="leaf" viewBox="0 0 20 26" fill="currentColor"><path d="M10 0C6 0 2 4 2 9c0 5 3 10 8 13 5-3 8-8 8-13C18 4 14 0 10 0z"/></svg>,
  <svg key="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  <svg key="heart" viewBox="0 0 24 22" fill="currentColor"><path d="M12 21.5C12 21.5 1 13.5 1 6.5 1 3.4 3.5 1 6.5 1 8.4 1 10.1 2 12 4c1.9-2 3.6-3 5.5-3C20.5 1 23 3.4 23 6.5c0 7-11 15-11 15z"/></svg>,
  <svg key="diamond" viewBox="0 0 18 24" fill="currentColor"><path d="M9 0L18 12 9 24 0 12z"/></svg>,
]

const COLORS = ['var(--color-accent)', 'var(--color-accent2)', 'var(--color-accent3)', 'rgba(196,104,58,0.7)', 'rgba(200,146,42,0.8)']

function makePetals(n: number): Petal[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 18,
    duration: 10 + Math.random() * 10,
    size: 8 + Math.random() * 12,
    rotation: Math.random() * 360,
    type: Math.floor(Math.random() * SHAPES.length),
  }))
}

export default function FloralPetals({ count = 20 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([])
  useEffect(() => setPetals(makePetals(count)), [count])
  if (!petals.length) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: -60,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            color: COLORS[p.type % COLORS.length],
            opacity: 0.55,
            animationName: 'petalFall, petalSway',
            animationDuration: `${p.duration}s, ${p.duration * 0.6}s`,
            animationDelay: `${p.delay}s, ${p.delay * 0.4}s`,
            animationTimingFunction: 'linear, ease-in-out',
            animationIterationCount: 'infinite',
            transform: `rotate(${p.rotation}deg)`,
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))',
          }}
        >
          {SHAPES[p.type]}
        </div>
      ))}
    </div>
  )
}
