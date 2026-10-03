import { useEffect, useState } from 'react'
import { DOCS_PDF, FORM_URL, NAV_LINKS } from '../lib/constants'

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="NexaCraft Digital Studio — home">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-surface">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ff6a3d" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path
            d="M18 46V18l28 28V18"
            fill="none"
            stroke="url(#logo-g)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="46" cy="18" r="4" fill="#22d3ee" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-xl bg-accent/25 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[1.05rem] font-bold tracking-tight text-ink">
          Nexa<span className="text-grad-coral">Craft</span>
        </span>
        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted">
          Digital Studio
        </span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <div
          className={`pointer-events-none absolute inset-x-3 top-0 bottom-0 -z-10 rounded-2xl border transition-all duration-500 md:inset-x-6 ${
            scrolled
              ? 'glass-strong border-white/10 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]'
              : 'border-transparent'
          }`}
        />
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                active === link.href.slice(1) ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {link.label}
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-accent to-neon transition-opacity duration-300 ${
                  active === link.href.slice(1) ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={DOCS_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hidden !px-4 !py-2.5 text-sm xl:inline-flex"
          >
            Docs
            <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.14em] text-muted">
              PDF
            </span>
          </a>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex"
          >
            Start a Project
            <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="glass grid h-11 w-11 place-items-center rounded-xl lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                  open ? 'top-1/2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-ink transition-all duration-300 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                  open ? 'bottom-1/2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[85] flex flex-col bg-bg/90 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="section-ring -left-24 top-24 h-72 w-72 bg-accent/15" />
        <div className="section-ring -right-24 bottom-24 h-72 w-72 bg-neon/10" />
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`group flex items-baseline gap-4 border-b border-white/5 py-4 transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
            >
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-display text-3xl font-bold text-ink transition-colors group-hover:text-ember">
                {link.label}
              </span>
            </a>
          ))}
          <div
            className={`mt-8 flex flex-col gap-3 transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: open ? '560ms' : '0ms' }}
          >
            <a
              href={DOCS_PDF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-ghost justify-center !py-3 text-sm"
            >
              Docs — Everything We Offer
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.14em] text-muted">
                PDF
              </span>
            </a>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center !py-3 text-sm"
            >
              Start a Project <span aria-hidden="true">→</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
