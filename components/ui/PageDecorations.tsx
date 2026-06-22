'use client'

interface Props {
  images: string[]
  count?: number
}

// Deterministic pseudo-random — no Math.random() to avoid hydration mismatch
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export default function PageDecorations({ images, count = 10 }: Props) {
  if (!images.length) return null

  const items = Array.from({ length: count }, (_, i) => {
    const r1 = seededRand(i * 3)
    const r2 = seededRand(i * 3 + 1)
    const r3 = seededRand(i * 3 + 2)

    // Evenly distribute vertically (8%–92%) with small jitter, min 6% gap
    const top = 8 + i * ((84) / count) + (r1 * 4 - 2)
    const side = i % 2 === 0 ? 'left' : 'right'
    const size = Math.round(60 + r2 * 28)   // 60–88px
    const opacity = +(0.45 + r3 * 0.3).toFixed(2) // 0.45–0.75
    const src = images[i % images.length]
    const flip = side === 'right'

    return { top, side, size, opacity, src, flip }
  })

  return (
    <>
      {items.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={d.src}
          alt=""
          aria-hidden
          width={d.size}
          className="block pointer-events-none select-none absolute z-[50]"
          style={{
            [d.side]: 0,
            top: `${d.top}%`,
            height: 'auto',
            opacity: d.opacity,
            transform: d.flip ? 'scaleX(-1)' : undefined,
          }}
        />
      ))}
    </>
  )
}
