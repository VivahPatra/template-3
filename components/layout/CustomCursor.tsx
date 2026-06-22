'use client'
import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

type CursorType = 'default' | 'link' | 'card'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [lotusAngle, setLotusAngle] = useState(0)

  const mouseX = useSpring(0, { stiffness: 450, damping: 28 })
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 })
  const trailX = useSpring(0, { stiffness: 110, damping: 20 })
  const trailY = useSpring(0, { stiffness: 110, damping: 20 })

  useEffect(() => {
    setMounted(true)
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor-glow]')) setCursorType('card')
      else if (el.closest('a, button, [role="button"]')) setCursorType('link')
      else setCursorType('default')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [mouseX, mouseY, trailX, trailY])

  useEffect(() => {
    if (cursorType !== 'card') return
    let raf: number
    const tick = () => {
      setLotusAngle(a => (a + 0.6) % 360)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cursorType])

  if (!mounted) return null

  const isCard = cursorType === 'card'
  const isLink = cursorType === 'link'
  const ringW = isCard ? 60 : isLink ? 40 : 28
  const dotW = isCard ? 10 : isLink ? 7 : 5

  return (
    <>
      {/* Trailing ring — terracotta outline */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          width: ringW,
          height: ringW,
          translateX: -(ringW / 2),
          translateY: -(ringW / 2),
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        {isCard ? (
          <svg
            viewBox="0 0 60 60"
            width="100%"
            height="100%"
            style={{
              transform: `rotate(${lotusAngle}deg)`,
              filter: 'drop-shadow(0 0 5px var(--color-accent))',
              display: 'block',
            }}
            aria-hidden
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse
                key={i}
                cx="30" cy="13"
                rx="4" ry="10"
                fill="var(--color-accent)"
                fillOpacity="0.72"
                transform={`rotate(${i * 45} 30 30)`}
              />
            ))}
            <circle cx="30" cy="30" r="5" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.9" />
          </svg>
        ) : (
          <div
            className="rounded-full"
            style={{
              width: '100%',
              height: '100%',
              border: '1.5px solid var(--color-accent)',
              opacity: isLink ? 0.7 : 0.45,
              boxShadow: '0 0 8px var(--color-glow)',
              background: isLink ? 'rgba(196,104,58,0.08)' : 'transparent',
              transition: 'opacity 0.2s',
            }}
          />
        )}
      </motion.div>

      {/* Dot — warm accent */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          width: dotW,
          height: dotW,
          x: mouseX,
          y: mouseY,
          translateX: -(dotW / 2),
          translateY: -(dotW / 2),
          background: 'var(--color-accent)',
          boxShadow: isCard
            ? '0 0 14px var(--color-accent), 0 0 28px var(--color-glow-strong, rgba(196,104,58,0.4))'
            : '0 0 6px var(--color-glow-strong)',
          transition: 'width 0.15s, height 0.15s, box-shadow 0.2s',
        }}
      />
    </>
  )
}
