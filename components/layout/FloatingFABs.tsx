'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Volume2 } from 'lucide-react'
import { useWeddingData, useIsPreview } from '@/context/WeddingDataContext'

export default function FloatingFABs() {
  const { backgroundMusic } = useWeddingData()
  const isPreview = useIsPreview()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const src = backgroundMusic || ''
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [backgroundMusic])

  useEffect(() => {
    if (!isPreview || !audioRef.current) return
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 4000)
    })
  }, [isPreview])

  const toggleAudio = () => {
    if (!audioRef.current) return
    setShowHint(false)
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false) }
    else audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  const btnStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-accent)',
    boxShadow: '0 4px 16px rgba(42,24,16,0.12)',
  }

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-[9990] flex flex-col items-end gap-2">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-accent)' }}
          >
            ♪ Tap to play music
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleAudio}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={isPlaying ? { ...btnStyle, boxShadow: '0 4px 24px rgba(196,104,58,0.45)', borderColor: 'var(--color-accent)' } : btnStyle}
        initial={{ opacity: 0, scale: 0 }}
        animate={showHint ? { scale: [1, 1.15, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={showHint ? { repeat: Infinity, duration: 1 } : { delay: 2.5 }}
        whileHover={{ scale: 1.1, boxShadow: '0 4px 24px rgba(196,104,58,0.3)' }}
        aria-label="Toggle music"
      >
        {isPlaying
          ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}><Volume2 size={18} /></motion.div>
          : <Music size={18} />
        }
      </motion.button>
    </div>
  )
}
