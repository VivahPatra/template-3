'use client'
import { useRef, useEffect, useState } from 'react'

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
        edgeData.data[i4]   = 60
        edgeData.data[i4+1] = 28
        edgeData.data[i4+2] = 10
        edgeData.data[i4+3] = Math.min(120, (mag - threshold) * 0.55)
      }
    }
  }
  const edgeCanvas = document.createElement('canvas')
  edgeCanvas.width = w
  edgeCanvas.height = h
  const ectx = edgeCanvas.getContext('2d')!
  ectx.putImageData(edgeData, 0, 0)
  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(edgeCanvas, 0, 0)
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
  src: string
  alt?: string
  className?: string
}

export default function AutoCaricature({ src, alt = '', className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [result, setResult] = useState<'loading' | 'caricature' | 'fallback'>('loading')
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    setResult('loading')
    setDataUrl(null)

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const canvas = canvasRef.current!
        resizeAndDraw(img, canvas)
        cartoonify(canvas)
        setDataUrl(canvas.toDataURL('image/png'))
        setResult('caricature')
      } catch {
        setResult('fallback')
      }
    }

    img.onerror = () => {
      const retry = new Image()
      retry.onload = () => setResult('fallback')
      retry.onerror = () => setResult('fallback')
      retry.src = src
    }

    img.src = src
  }, [src])

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="hidden" />
      {result === 'caricature' && dataUrl ? (
        <img src={dataUrl} alt={alt} className="w-full h-auto block" style={{ filter: 'sepia(0.08) saturate(1.1)' }} />
      ) : (
        <img src={src} alt={alt} className="w-full h-auto block" style={{ filter: result === 'loading' ? 'opacity(0.3)' : 'sepia(0.08) saturate(1.1)' }} />
      )}
    </div>
  )
}
