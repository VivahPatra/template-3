'use client'
import { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type State = 'idle' | 'processing' | 'done'

const MAX_DIM = 700

function resizeAndDraw(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  let w = img.naturalWidth, h = img.naturalHeight
  if (w > MAX_DIM || h > MAX_DIM) {
    const r = Math.min(MAX_DIM / w, MAX_DIM / h)
    w = Math.round(w * r)
    h = Math.round(h * r)
  }
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.filter = 'saturate(1.35) contrast(1.15) brightness(1.12)'
  ctx.drawImage(img, 0, 0, w, h)
  ctx.filter = 'none'
}

function posterize(data: Uint8ClampedArray, levels = 10) {
  const step = 255 / levels
  for (let i = 0; i < data.length; i += 4) {
    data[i]   = Math.round(Math.round(data[i]   / step) * step)
    data[i+1] = Math.round(Math.round(data[i+1] / step) * step)
    data[i+2] = Math.round(Math.round(data[i+2] / step) * step)
  }
}

function buildGraymap(data: Uint8ClampedArray, w: number, h: number): Uint8Array {
  const gray = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) {
    gray[i] = Math.round(0.299 * data[i*4] + 0.587 * data[i*4+1] + 0.114 * data[i*4+2])
  }
  return gray
}

function applyEdges(ctx: CanvasRenderingContext2D, gray: Uint8Array, w: number, h: number) {
  const edgeData = new ImageData(w, h)
  // Higher threshold — only catch strong structural edges (face outline, hair boundary)
  // not skin texture which caused zombie look
  const threshold = 70

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const gx = (
        -gray[(y-1)*w+(x-1)] - 2*gray[y*w+(x-1)] - gray[(y+1)*w+(x-1)] +
         gray[(y-1)*w+(x+1)] + 2*gray[y*w+(x+1)] + gray[(y+1)*w+(x+1)]
      )
      const gy = (
        -gray[(y-1)*w+(x-1)] - 2*gray[(y-1)*w+x] - gray[(y-1)*w+(x+1)] +
         gray[(y+1)*w+(x-1)] + 2*gray[(y+1)*w+x] + gray[(y+1)*w+(x+1)]
      )
      const mag = Math.sqrt(gx*gx + gy*gy)
      if (mag > threshold) {
        const i4 = (y*w+x)*4
        // Warm dark brown lines (not black) so face stays natural
        edgeData.data[i4]   = 60
        edgeData.data[i4+1] = 28
        edgeData.data[i4+2] = 10
        // Cap alpha at 120 — subtle outline, not heavy black
        edgeData.data[i4+3] = Math.min(120, (mag - threshold) * 0.55)
      }
    }
  }

  const edgeCanvas = document.createElement('canvas')
  edgeCanvas.width = w
  edgeCanvas.height = h
  const ectx = edgeCanvas.getContext('2d')!
  ectx.putImageData(edgeData, 0, 0)

  // source-over (NOT multiply) — multiply was darkening the whole image
  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(edgeCanvas, 0, 0)
  ctx.globalCompositeOperation = 'source-over'
}

function cartoonify(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const { width, height } = canvas

  const raw = ctx.getImageData(0, 0, width, height)
  const gray = buildGraymap(raw.data, width, height)

  posterize(raw.data)
  ctx.putImageData(raw, 0, 0)
  applyEdges(ctx, gray, width, height)
}

interface Props {
  className?: string
}

export default function CaricatureCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<State>('idle')
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  const process = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setState('processing')

    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current!
        resizeAndDraw(img, canvas)
        cartoonify(canvas)
        setDataUrl(canvas.toDataURL('image/png'))
        setState('done')
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) process(file)
  }, [process])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) process(file)
  }, [process])

  const reset = () => {
    setState('idle')
    setDataUrl(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={className}>
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              border: '2px dashed var(--color-border)',
              minHeight: 360,
            }}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            whileHover={{ borderColor: 'var(--color-accent)' }}
          >
            {/* Corner botanical ornaments */}
            <svg className="absolute top-0 left-0 w-20 h-20 opacity-20" viewBox="0 0 80 80" aria-hidden>
              <path d="M5,75 Q5,5 75,5" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"/>
              <path d="M5,60 Q20,20 60,5" fill="none" stroke="var(--color-accent3)" strokeWidth="0.8"/>
              <circle cx="5" cy="75" r="3" fill="var(--color-accent)" opacity="0.6"/>
            </svg>
            <svg className="absolute top-0 right-0 w-20 h-20 opacity-20" viewBox="0 0 80 80" style={{ transform: 'scaleX(-1)' }} aria-hidden>
              <path d="M5,75 Q5,5 75,5" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"/>
              <path d="M5,60 Q20,20 60,5" fill="none" stroke="var(--color-accent3)" strokeWidth="0.8"/>
              <circle cx="5" cy="75" r="3" fill="var(--color-accent)" opacity="0.6"/>
            </svg>
            <svg className="absolute bottom-0 left-0 w-20 h-20 opacity-20" viewBox="0 0 80 80" style={{ transform: 'scaleY(-1)' }} aria-hidden>
              <path d="M5,75 Q5,5 75,5" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"/>
              <path d="M5,60 Q20,20 60,5" fill="none" stroke="var(--color-accent3)" strokeWidth="0.8"/>
              <circle cx="5" cy="75" r="3" fill="var(--color-accent)" opacity="0.6"/>
            </svg>
            <svg className="absolute bottom-0 right-0 w-20 h-20 opacity-20" viewBox="0 0 80 80" style={{ transform: 'scale(-1,-1)' }} aria-hidden>
              <path d="M5,75 Q5,5 75,5" fill="none" stroke="var(--color-accent)" strokeWidth="1.5"/>
              <circle cx="5" cy="75" r="3" fill="var(--color-accent)" opacity="0.6"/>
            </svg>

            {/* Upload prompt */}
            <motion.div
              className="text-5xl mb-5 float-slow"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              📸
            </motion.div>
            <p className="font-display text-xl mb-1" style={{ color: 'var(--color-text)' }}>
              Upload Your Couple Photo
            </p>
            <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
              We&apos;ll turn it into a beautiful illustration
            </p>
            <div className="mt-5 px-6 py-2.5 rounded-full font-sans text-sm font-semibold" style={{ background: 'var(--color-accent)', color: '#fff' }}>
              Choose Photo
            </div>
            <p className="mt-3 font-sans text-xs" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
              or drag &amp; drop here
            </p>

            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </motion.div>
        )}

        {state === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center rounded-2xl"
            style={{ minHeight: 360, background: 'var(--color-surface)' }}
          >
            {/* Spinning mandala */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="mb-5"
            >
              <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden>
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" strokeDasharray="6 4"/>
                {[0,45,90,135,180,225,270,315].map((deg, i) => (
                  <ellipse key={i} cx="40" cy="10" rx="3" ry="7" fill={i%2===0 ? 'var(--color-accent)' : 'var(--color-accent3)'} opacity="0.5" transform={`rotate(${deg} 40 40)`}/>
                ))}
                <circle cx="40" cy="40" r="4" fill="var(--color-accent)" opacity="0.6"/>
              </svg>
            </motion.div>
            <p className="font-display text-lg" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
              Creating your illustration…
            </p>
            <p className="font-sans text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
              Applying artistic magic ✨
            </p>
          </motion.div>
        )}

        {state === 'done' && dataUrl && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
          >
            {/* Botanical frame */}
            <div
              className="relative rounded-2xl overflow-hidden ink-shadow-lg"
              style={{ border: '3px solid var(--color-border)' }}
            >
              {/* Corner accents */}
              {[
                'top-0 left-0',
                'top-0 right-0 scale-x-[-1]',
                'bottom-0 left-0 scale-y-[-1]',
                'bottom-0 right-0 scale-[-1]',
              ].map((pos, i) => (
                <svg key={i} className={`absolute ${pos} w-14 h-14 z-10`} viewBox="0 0 56 56" aria-hidden>
                  <path d="M4,52 Q4,4 52,4" fill="none" stroke="var(--color-accent3)" strokeWidth="1.5" opacity="0.55"/>
                  <path d="M4,38 Q16,16 38,4" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.35"/>
                  <circle cx="4" cy="52" r="3.5" fill="var(--color-accent3)" opacity="0.5"/>
                </svg>
              ))}

              {/* Caricature image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl}
                alt="Your couple caricature"
                className="w-full h-auto block"
                style={{ filter: 'sepia(0.08) saturate(1.1)' }}
              />

              {/* Subtle watercolor wash overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 60%, rgba(250,246,239,0.25) 100%)',
                  mixBlendMode: 'overlay',
                }}
              />
            </div>

            {/* Re-upload */}
            <button
              onClick={reset}
              className="mt-3 w-full py-2 rounded-lg font-sans text-xs tracking-widest uppercase"
              style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
            >
              ↺ Change Photo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
