import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useIsMobile, useReducedMotion, hasWebGL } from '../lib/hooks'
import { FORM_URL } from '../lib/constants'

const Scene = lazy(() => import('./HeroScene'))

function StaticFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="section-ring left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 bg-accent/15" />
      <div className="section-ring left-1/3 top-2/3 h-[420px] w-[420px] bg-neon/10" />
      <div className="section-ring right-1/4 top-1/4 h-[380px] w-[380px] bg-haze/10" />
      <svg viewBox="0 0 400 400" className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-30">
        <g fill="none" stroke="#22d3ee" strokeWidth="0.5">
          <circle cx="200" cy="200" r="120" strokeOpacity="0.5" />
          <circle cx="200" cy="200" r="160" strokeOpacity="0.3" />
          <polygon points="200,110 281,250 119,250" strokeOpacity="0.6" />
          <polygon points="200,290 119,150 281,150" strokeOpacity="0.6" />
        </g>
        {[
          [200, 80],
          [320, 200],
          [200, 320],
          [80, 200],
          [271, 129],
          [271, 271],
          [129, 271],
          [129, 129],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#ff6a3d" />
        ))}
      </svg>
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [show3D, setShow3D] = useState(false)
  const [inView, setInView] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShow3D(!reduced && hasWebGL())
  }, [reduced])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const headline = [
    { text: 'WE', grad: false },
    { text: 'BUILD', grad: false },
    { text: 'DIGITAL', grad: true },
    { text: 'EXPERIENCES', grad: true },
    { text: 'POWERED', grad: false },
    { text: 'BY', grad: false },
    { text: 'AI.', grad: 'neon' },
  ] as const

  return (
    <section id="home" ref={wrapRef} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {show3D ? (
        <Suspense fallback={<StaticFallback />}>
          <Scene active={inView} mobile={mobile} />
        </Suspense>
      ) : (
        <StaticFallback />
      )}

      {/* Cinematic vignettes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,transparent_30%,rgba(5,5,8,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pt-40">
        <div className="max-w-3xl">
          <div className="word-rise" style={{ animationDelay: '80ms' }}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-frost">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              AI-Native Digital Studio
            </span>
          </div>

          <h1
            className="font-display mt-7 text-[2.55rem] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.35rem]"
            aria-label="We build digital experiences powered by AI."
          >
            {headline.map((w, i) => (
              <span key={i}>
                <span className="word-rise" style={{ animationDelay: `${200 + i * 90}ms` }}>
                  {w.grad === 'neon' ? (
                    <span className="text-grad-neon">{w.text}</span>
                  ) : w.grad ? (
                    <span className="text-grad-coral">{w.text}</span>
                  ) : (
                    w.text
                  )}
                </span>
                {i < headline.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>

          <p
            className="word-rise mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            style={{ animationDelay: '950ms' }}
          >
            Websites, 3D experiences, AI agents, automation and intelligent digital systems —
            built around your business.
          </p>

          <div className="word-rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: '1100ms' }}>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start a Project <span aria-hidden="true">→</span>
            </a>
            <a href="#work" className="btn-ghost">
              Explore Our Work <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div
            className="word-rise mt-10 flex flex-wrap gap-2.5"
            style={{ animationDelay: '1250ms' }}
            aria-label="Core capabilities"
          >
            {['Web Development', '3D Web', 'AI Agents', 'n8n Automation', 'AI Video'].map((c) => (
              <span key={c} className="chip">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating holographic panels (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
        <div className="glass-strong animate-float absolute right-[7%] top-[26%] rounded-2xl px-5 py-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon/10 font-mono text-neon">AI</span>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-frost">Agent</p>
              <p className="text-sm font-semibold text-ink">
                Status <span className="text-neon">● Online</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className="glass-strong animate-float-slow absolute bottom-[24%] right-[16%] rounded-2xl px-5 py-4 shadow-2xl"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ember">n8n · Workflow</p>
          <div className="mt-2 flex items-end gap-1" aria-hidden="true">
            {[0.5, 0.9, 0.35, 0.75, 1, 0.45, 0.8].map((h, i) => (
              <span
                key={i}
                className="eq-bar w-1.5 rounded-sm bg-gradient-to-t from-accent to-ember"
                style={{ height: `${h * 22}px`, animationDelay: `${i * 120}ms` }}
              />
            ))}
            <span className="ml-2 text-xs font-semibold text-ink">Running</span>
          </div>
        </div>
        <div className="glass-strong animate-float absolute bottom-[38%] left-[4%] rounded-2xl px-5 py-4 shadow-2xl" style={{ animationDelay: '1.4s' }}>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-haze">WebGL · Scene</p>
          <p className="mt-1 text-sm font-semibold text-ink">
            Render <span className="text-haze">60 fps</span>
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-ink"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="animate-bounce text-lg">↓</span>
        </span>
      </a>
    </section>
  )
}
