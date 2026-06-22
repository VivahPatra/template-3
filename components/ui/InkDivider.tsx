import { cn } from '@/lib/utils'

export default function InkDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-1 my-8', className)}>
      <svg viewBox="0 0 320 14" width="100%" style={{ maxWidth: 300 }} aria-hidden>
        <line x1="0"   y1="5" x2="320" y2="5" stroke="var(--color-accent3)" strokeWidth="1.2" opacity="0.4"/>
        <line x1="0"   y1="9" x2="320" y2="9" stroke="var(--color-accent)"  strokeWidth="0.5" opacity="0.2"/>
        <rect x="74"  y="2" width="6" height="6" fill="var(--color-accent)"  opacity="0.5" transform="rotate(45 77 5)"/>
        <rect x="152" y="1" width="8" height="8" fill="var(--color-accent3)" opacity="0.65" transform="rotate(45 156 5)"/>
        <rect x="232" y="2" width="6" height="6" fill="var(--color-accent)"  opacity="0.5" transform="rotate(45 235 5)"/>
      </svg>
      <span className="text-sm glow-pulse float-slow" style={{ color: 'var(--color-accent)', opacity: 0.5 }}>❦</span>
      <svg viewBox="0 0 320 14" width="100%" style={{ maxWidth: 300 }} aria-hidden>
        <line x1="0" y1="5" x2="320" y2="5" stroke="var(--color-accent3)" strokeWidth="1.2" opacity="0.4"/>
        <line x1="0" y1="9" x2="320" y2="9" stroke="var(--color-accent)"  strokeWidth="0.5" opacity="0.2"/>
        <rect x="74"  y="2" width="6" height="6" fill="var(--color-accent)"  opacity="0.5" transform="rotate(45 77 5)"/>
        <rect x="152" y="1" width="8" height="8" fill="var(--color-accent3)" opacity="0.65" transform="rotate(45 156 5)"/>
        <rect x="232" y="2" width="6" height="6" fill="var(--color-accent)"  opacity="0.5" transform="rotate(45 235 5)"/>
      </svg>
    </div>
  )
}
