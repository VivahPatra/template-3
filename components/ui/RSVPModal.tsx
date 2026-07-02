'use client'
import { useState } from 'react'
import { X, MessageCircle } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onSend: (guestCount: number, message: string) => void
  defaultMessage: string
  brideName: string
  groomName: string
}

export default function RSVPModal({ open, onClose, onSend, defaultMessage, brideName, groomName }: Props) {
  const [guestName, setGuestName] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState(defaultMessage)

  if (!open) return null

  const handleSend = () => {
    const namePrefix = guestName.trim() ? `Name: ${guestName.trim()}\n` : ''
    const fullMessage = `${namePrefix}${message}\n\nNumber of guests attending: ${guestCount}`
    window.parent.postMessage({ type: 'VIVAHPATRA_RSVP', guestName: guestName.trim(), guestCount }, '*')
    onSend(guestCount, fullMessage)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(42,24,16,0.6)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-2xl p-6 ink-shadow-lg"
        style={{ background: 'var(--color-bg)', border: '1.5px solid var(--color-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
          <X size={16} />
        </button>

        <h3 className="font-display shimmer-text text-center mb-1" style={{ fontSize: '1.6rem', lineHeight: 1.4, padding: '0.1em 0' }}>
          RSVP for {groomName} &amp; {brideName}
        </h3>
        <p className="font-sans text-xs text-center mb-6" style={{ color: 'var(--color-muted)' }}>
          Let us know how many will be joining
        </p>

        <label className="block font-sans text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>
          Your Name
        </label>
        <input
          type="text"
          value={guestName}
          onChange={e => setGuestName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-lg p-3 font-sans text-sm mb-6 outline-none"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
        />
        <label className="block font-sans text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>
          Number of Guests
        </label>
        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={() => setGuestCount(c => Math.max(1, c - 1))}
            className="w-10 h-10 rounded-full font-sans text-lg" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>−</button>
          <span className="font-display text-2xl w-12 text-center" style={{ color: 'var(--color-text)' }}>{guestCount}</span>
          <button onClick={() => setGuestCount(c => Math.min(20, c + 1))}
            className="w-10 h-10 rounded-full font-sans text-lg" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>+</button>
        </div>

        <label className="block font-sans text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>
          Message
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          className="w-full rounded-lg p-3 font-sans text-sm mb-6 outline-none resize-none"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
        />

        <button
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-sans text-sm font-semibold tracking-wider"
          style={{ background: 'var(--color-accent)', color: '#fff', boxShadow: '0 4px 24px rgba(196,104,58,0.4)' }}
        >
          <MessageCircle size={16} /> Send via WhatsApp
        </button>
      </div>
    </div>
  )
}
