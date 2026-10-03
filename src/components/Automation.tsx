import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { AUTOMATION_FLOW, FORM_URL } from '../lib/constants'

const NODE_COLORS = ['#ff6a3d', '#a78bfa', '#22d3ee', '#7dd3fc', '#ffa06a', '#ff4d8f']
const NODE_TAGS = ['WEB', 'N8N', 'AGT', 'CRM', 'MAIL', 'SLS']

function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 12"
      aria-hidden="true"
      className={`h-3 w-10 shrink-0 ${vertical ? 'rotate-90 self-center' : 'self-center'} max-lg:hidden`}
    >
      <path d="M0 6h32" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.6" className="flow" />
      <path d="M30 2.5 36 6l-6 3.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.8" />
    </svg>
  )
}

function VerticalConnector() {
  return (
    <svg viewBox="0 0 12 40" aria-hidden="true" className="mx-auto h-9 w-3 lg:hidden">
      <path d="M6 0v30" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.6" className="flow" />
      <path d="M2.5 28 6 34l3.5-6" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.8" />
    </svg>
  )
}

export default function Automation() {
  const [step, setStep] = useState(-1)
  const timer = useRef<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const autoRan = useRef(false)

  const clear = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }

  const run = () => {
    clear()
    setStep(0)
    timer.current = window.setInterval(() => {
      setStep((s) => {
        if (s >= AUTOMATION_FLOW.length - 1) {
          clear()
          return s
        }
        return s + 1
      })
    }, 700)
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoRan.current) {
          autoRan.current = true
          window.setTimeout(run, 500)
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const replay = () => {
    setStep(-1)
    window.setTimeout(run, 60)
  }

  const running = step >= 0 && step < AUTOMATION_FLOW.length - 1

  return (
    <section id="automation" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring -left-32 top-1/3 h-96 w-96 bg-haze/10" />
      <div className="section-ring -right-32 bottom-10 h-96 w-96 bg-accent/10" />

      <div ref={sectionRef} className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="n8n Automation"
          title={
            <>
              WORKFLOWS THAT <span className="text-grad-coral">RUN THEMSELVES.</span>
            </>
          }
          desc="We connect your applications, APIs, databases and AI agents into automated workflows using n8n — so leads, bookings and data move on their own while your team focuses on real work."
        />

        <Reveal dir="scale">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon/10 blur-3xl" />
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-muted">
                workflow.lead_to_sales — live demo
              </p>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    running ? 'text-neon' : 'text-muted'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      running ? 'animate-pulse-dot bg-neon' : step < 0 ? 'bg-muted/50' : 'bg-accent'
                    }`}
                  />
                  {step < 0 ? 'idle' : running ? 'executing…' : 'completed ✓'}
                </span>
                <button
                  type="button"
                  onClick={replay}
                  className="glass rounded-full px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-neon/50 hover:text-neon"
                >
                  ↻ Replay
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 lg:flex-row lg:items-stretch lg:gap-0">
              {AUTOMATION_FLOW.map((item, i) => (
                <div key={item.node} className="flex flex-col lg:flex-1 lg:flex-row lg:items-center">
                  <div
                    className={`wf-node glass rounded-2xl px-4 py-4 text-center lg:flex-1 ${
                      i === step ? 'is-active' : i < step ? 'is-done' : ''
                    }`}
                  >
                    <span
                      className="mx-auto grid h-10 w-10 place-items-center rounded-xl font-mono text-[0.6rem] font-bold tracking-wider"
                      style={{
                        color: NODE_COLORS[i],
                        background: `${NODE_COLORS[i]}14`,
                        border: `1px solid ${NODE_COLORS[i]}45`,
                      }}
                    >
                      {NODE_TAGS[i]}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{item.node}</p>
                  </div>
                  {i < AUTOMATION_FLOW.length - 1 && (
                    <>
                      <Connector />
                      <VerticalConnector />
                    </>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-muted/70">
              n8n is a third-party workflow tool we build on — NexaCraft is an independent studio and
              not affiliated with n8n.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Automate My Workflow <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
