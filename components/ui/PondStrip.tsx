'use client'

const SWANS = [
  { top: '10%', size: 55, dur: 16, delay: 0, dir: 'ltr' },
  { top: '40%', size: 40, dur: 22, delay: 6, dir: 'rtl' },
  { top: '25%', size: 48, dur: 20, delay: 12, dir: 'ltr' },
  { top: '55%', size: 35, dur: 26, delay: 3, dir: 'rtl' },
]

export default function PondStrip() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 100, background: 'var(--color-surface)' }}>
      <style>{`
        @keyframes swanLTR {
          0%   { transform: translateX(-120px) scaleX(1); }
          100% { transform: translateX(calc(100vw + 120px)) scaleX(1); }
        }
        @keyframes swanRTL {
          0%   { transform: translateX(calc(100vw + 120px)) scaleX(-1); }
          100% { transform: translateX(-120px) scaleX(-1); }
        }
        @keyframes waterLine {
          0%, 100% { opacity: 0.15; transform: scaleX(0.8); }
          50%      { opacity: 0.4; transform: scaleX(1.05); }
        }
      `}</style>

      {/* Water gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(26,138,154,0.08) 30%, rgba(26,138,154,0.15) 60%, rgba(26,138,154,0.2) 100%)',
      }} />

      {/* Shimmer lines */}
      {[30, 50, 70, 85].map((top, i) => (
        <div key={i} className="absolute left-0 right-0" style={{
          top: `${top}%`, height: 1,
          background: 'linear-gradient(90deg, transparent 5%, rgba(26,138,154,0.2) 30%, rgba(26,138,154,0.3) 50%, rgba(26,138,154,0.2) 70%, transparent 95%)',
          animation: `waterLine ${3.5 + i * 0.8}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }} />
      ))}

      {/* Swans — randomized left/right */}
      {SWANS.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: s.top,
          left: 0,
          animation: `${s.dir === 'ltr' ? 'swanLTR' : 'swanRTL'} ${s.dur}s linear infinite`,
          animationDelay: `${s.delay}s`,
        }}>
          <img src="/assets/swan.webp" alt="" style={{
            width: s.size,
            height: 'auto',
            filter: 'brightness(1.1)',
            opacity: s.size > 45 ? 0.8 : 0.55,
          }} />
        </div>
      ))}
    </div>
  )
}
