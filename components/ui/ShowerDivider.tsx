'use client'
import { useRef, useEffect, useState } from 'react'

const CSS = `
@keyframes showerFall {
  0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.9; }
  60%  { opacity: 0.5; }
  100% { transform: translateY(140px) rotate(330deg) scale(0.4); opacity: 0; }
}
`

export default function ShowerDivider({ count = 24 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * (100 / count)) + (Math.random() * 3 - 1.5),
      delay: Math.random() * 1.4,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 1.2 + 1.4,
      isSquare: Math.random() > 0.6,
    }))
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden style={{ position: 'relative', height: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 20 }}>
      <style>{CSS}</style>
      {active && particles.map(p => (
        <span key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: 0,
          width: p.size,
          height: p.size,
          borderRadius: p.isSquare ? '1px' : '50%',
          background: 'var(--color-accent)',
          opacity: 0,
          animation: `showerFall ${p.duration}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  )
}
