interface Props {
  flip?: boolean
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function PeacockDecor({ flip = false, size = 72, className = '', style }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/peacock.gif"
      alt=""
      aria-hidden
      width={size}
      className={`pointer-events-none select-none ${className}`}
      style={{
        height: 'auto',
        opacity: 0.65,
        transform: flip ? 'scaleX(-1)' : undefined,
        ...style,
      }}
    />
  )
}
