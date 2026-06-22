interface Props {
  fromColor?: string
  toColor?: string
}

export default function WaveDivider({ fromColor = 'var(--color-bg)', toColor = 'var(--color-surface)' }: Props) {
  return (
    <div className="relative w-full overflow-hidden leading-none pointer-events-none" style={{ height: 56, background: fromColor }} aria-hidden>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
        <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56Z" fill={toColor}/>
      </svg>
    </div>
  )
}
