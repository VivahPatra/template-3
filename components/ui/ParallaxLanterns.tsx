'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

const LANTERNS = [
  { x: '5%',  size: 50, opacity: 0.8, riseDur: 25, delay: 0 },
  { x: '15%', size: 40, opacity: 0.65, riseDur: 30, delay: -8 },
  { x: '28%', size: 55, opacity: 0.75, riseDur: 22, delay: -3 },
  { x: '42%', size: 35, opacity: 0.6, riseDur: 28, delay: -12 },
  { x: '58%', size: 48, opacity: 0.8, riseDur: 24, delay: -5 },
  { x: '72%', size: 42, opacity: 0.7, riseDur: 32, delay: -18 },
  { x: '85%', size: 38, opacity: 0.65, riseDur: 26, delay: -10 },
  { x: '92%', size: 52, opacity: 0.75, riseDur: 20, delay: -15 },
  { x: '10%', size: 44, opacity: 0.7, riseDur: 35, delay: -7 },
  { x: '50%', size: 36, opacity: 0.6, riseDur: 27, delay: -20 },
  { x: '35%', size: 50, opacity: 0.75, riseDur: 30, delay: -2 },
  { x: '78%', size: 40, opacity: 0.65, riseDur: 23, delay: -14 },
]

export default function ParallaxLanterns() {
  const { scrollY } = useScroll()
  const fadeOut = useTransform(scrollY, [0, 5000, 6500], [1, 1, 0])

  return (
    <motion.div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]" style={{ opacity: fadeOut }} aria-hidden>
      <style>{`
        @keyframes lanternRise {
          0%   { transform: translateY(0); opacity: 0; }
          3%   { opacity: 1; }
          85%  { opacity: 0.7; }
          100% { transform: translateY(calc(-100vh - 100px)); opacity: 0; }
        }
        @keyframes lanternSway {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(12px); }
          75%       { transform: translateX(-12px); }
        }
      `}</style>
      {LANTERNS.map((l, i) => (
        <div key={i} className="absolute" style={{ left: l.x, bottom: 0 }}>
          <div style={{ animation: `lanternRise ${l.riseDur}s linear ${l.delay}s infinite` }}>
            <div style={{ animation: `lanternSway ${l.riseDur * 0.3}s ease-in-out infinite` }}>
              <img
                src="/assets/lantern.png"
                alt=""
                style={{
                  width: `clamp(${l.size}px, ${Math.round(l.size * 0.15)}vw, ${l.size * 2}px)`,
                  height: 'auto',
                  opacity: l.opacity,
                  filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255,180,80,0.3))',
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
