'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Volume2 } from 'lucide-react'
import { useWeddingData, useIsPreview } from '@/context/WeddingDataContext'

export default function FloatingFABs() {
  const { backgroundMusic } = useWeddingData()
  const isPreview = useIsPreview()
  const [isPlaying, setIsPlaying] = useState(false)
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
    if (isPreview && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPreview])

  const toggleAudio = () => {
    if (!audioRef.current) return
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
    <div className="fixed bottom-8 right-6 z-40">
      <motion.button
        onClick={toggleAudio}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={isPlaying ? { ...btnStyle, boxShadow: '0 4px 24px rgba(196,104,58,0.45)', borderColor: 'var(--color-accent)' } : btnStyle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
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
