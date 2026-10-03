import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  max?: number
}

export default function TiltCard({ children, className = '', max = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setFine(mq.matches)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`
    const glare = el.querySelector<HTMLElement>('.tilt-glare')
    if (glare) {
      glare.style.opacity = '1'
      glare.style.background = `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(1)}% ${((py + 0.5) * 100).toFixed(1)}%, rgba(255,255,255,0.14), transparent 55%)`
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
    const glare = el?.querySelector<HTMLElement>('.tilt-glare')
    if (glare) glare.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card relative ${className}`}
    >
      <div className="tilt-glare pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500" />
      {children}
    </div>
  )
}
