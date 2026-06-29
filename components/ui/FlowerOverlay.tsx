export default function FlowerOverlay() {
  return (
    <img src="/assets/flower.webp" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ opacity: 0.5, mixBlendMode: 'overlay', zIndex: 0 }} />
  )
}
