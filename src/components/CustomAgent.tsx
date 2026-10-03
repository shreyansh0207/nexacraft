import { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { FORM_URL } from '../lib/constants'
import { useReducedMotion } from '../lib/hooks'

const BASE_LINES = [
  '$ nexacraft create-agent',
  '> parsing your requirement ......... ok',
  '> building knowledge (RAG) ......... ok',
  '> wiring tools & APIs .............. ok',
  '> attaching n8n workflow ........... ok',
  '> deploying ........................ live ✓',
  'agent "YourBusiness" is ready to work',
]

const CAPABILITIES = [
  'Answer support questions',
  'Qualify leads',
  'Book appointments',
  'Extract data',
  'Update CRM',
  'Send email digests',
]

function Terminal() {
  const reduced = useReducedMotion()
  const [lines, setLines] = useState<string[]>(reduced ? BASE_LINES : [])
  const [cursorIdx, setCursorIdx] = useState(BASE_LINES.length - 1)

  useEffect(() => {
    if (reduced) {
      setLines(BASE_LINES)
      return
    }
    let line = 0
    let char = 0
    let cancelled = false
    let timeout = 0
    const tick = () => {
      if (cancelled) return
      if (line >= BASE_LINES.length) {
        timeout = window.setTimeout(() => {
          if (cancelled) return
          setLines([])
          line = 0
          char = 0
          tick()
        }, 5200)
        return
      }
      const text = BASE_LINES[line]
      char++
      const slice = text.slice(0, char)
      setLines((prev) => {
        const next = [...prev]
        next[line] = slice
        return next
      })
      setCursorIdx(line)
      if (char >= text.length) {
        line++
        char = 0
        timeout = window.setTimeout(tick, 240)
      } else {
        timeout = window.setTimeout(tick, 16 + Math.random() * 24)
      }
    }
    tick()
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [reduced])

  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-5 font-mono text-[0.78rem] leading-relaxed md:p-6 md:text-[0.82rem]">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-ember/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon/80" />
        <span className="ml-3 text-[0.62rem] uppercase tracking-[0.24em] text-muted">
          agent-builder — zsh
        </span>
      </div>
      <div className="min-h-[11.5rem] space-y-1.5">
        {lines.map((text, i) => (
          <p
            key={i}
            className={
              i === cursorIdx && text.length < BASE_LINES[i]?.length
                ? 'terminal-caret text-frost'
                : text.startsWith('$')
                  ? 'text-ember'
                  : text.includes('✓') || text.includes('ready')
                    ? 'text-neon'
                    : 'text-muted'
            }
          >
            {text}
          </p>
        ))}
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon/10 blur-3xl" />
    </div>
  )
}

export default function CustomAgent() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(['Answer support questions']))

  const toggle = (cap: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(cap)) next.delete(cap)
      else next.add(cap)
      return next
    })
  }

  return (
    <section id="build" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring -left-32 bottom-0 h-96 w-96 bg-neon/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Custom AI Agents"
          title={
            <>
              YOU DESCRIBE IT. <span className="text-grad-coral">WE BUILD IT.</span>
            </>
          }
          desc="You tell us what you want the agent to do. We design, build, integrate and deploy it — shaped entirely around your business, your tools and your rules."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Pick what your agent should do
              </p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((cap, i) => {
                const on = selected.has(cap)
                return (
                  <Reveal key={cap} delay={i * 60}>
                    <button
                      type="button"
                      onClick={() => toggle(cap)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        on
                          ? 'border-neon/60 bg-neon/10 text-ink shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]'
                          : 'border-white/10 bg-white/3 text-muted hover:border-white/25 hover:text-ink'
                      }`}
                    >
                      <span className={`mr-2 font-mono text-xs ${on ? 'text-neon' : 'text-muted/50'}`}>
                        {on ? '✓' : '+'}
                      </span>
                      {cap}
                    </button>
                  </Reveal>
                )
              })}
            </div>
            <Reveal delay={200}>
              <div className="glass mt-8 rounded-2xl px-5 py-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Your blueprint so far
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.size === 0 ? (
                    <span className="text-sm text-muted/60">Select capabilities above…</span>
                  ) : (
                    [...selected].map((cap) => (
                      <span key={cap} className="chip !text-frost">
                        {cap}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                This is a preview — the real agent is designed around your exact workflow in a free
                discovery call.
              </p>
            </Reveal>
          </div>

          <Reveal dir="scale">
            <Terminal />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Tell Us What You Want To Build <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
