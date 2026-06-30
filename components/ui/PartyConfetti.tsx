'use client'

const COLORS = ['#c4683a', '#8b2635', '#c8922a', '#f2e8d8', '#d0b898']
const PIECES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 0.4,
  duration: 1.6 + Math.random() * 1.2,
  size: 6 + Math.random() * 8,
  color: COLORS[i % COLORS.length],
  rotate: Math.random() * 360,
  isSquare: Math.random() > 0.5,
  xDrift: (Math.random() - 0.5) * 200,
}))

export default function PartyConfetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50" aria-hidden>
      <style>{`
        @keyframes confettiBurst {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--x-drift), 220px) rotate(540deg); opacity: 0; }
        }
      `}</style>
      {PIECES.map(p => (
        <span key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: '20%',
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: p.isSquare ? 2 : '50%',
          // @ts-ignore
          '--x-drift': `${p.xDrift}px`,
          animation: `confettiBurst ${p.duration}s ${p.delay}s ease-out forwards`,
        } as React.CSSProperties} />
      ))}
    </div>
  )
}
