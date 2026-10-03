import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let gx = x
    let gy = y
    let raf = 0

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
    }
    const loop = () => {
      gx += (x - gx) * 0.11
      gy += (y - gy) * 0.11
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx - 190}px, ${gy - 190}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[380px] w-[380px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,106,61,0.10), rgba(34,211,238,0.05) 45%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[55] h-2 w-2 rounded-full bg-neon/80"
        style={{ boxShadow: '0 0 14px rgba(34,211,238,0.9)' }}
      />
    </>
  )
}
