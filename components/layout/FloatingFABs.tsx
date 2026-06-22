'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Volume2 } from 'lucide-react'

export default function FloatingFABs() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/music.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.35
    }
    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play().catch(() => {})
    setIsPlaying(!isPlaying)
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
