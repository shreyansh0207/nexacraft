import { Suspense, lazy } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { AGENT_EXAMPLES, AGENT_PIPELINE, FORM_URL } from '../lib/constants'

const AgentCore = lazy(() => import('./AgentCore'))

function Pipeline() {
  return (
    <div className="relative pl-2">
      <div className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-accent/60 via-neon/40 to-ember/60" />
      <div
        aria-hidden="true"
        className="absolute left-[1.35rem] top-6 h-3 w-3 -translate-x-[5.5px] animate-flow-down rounded-full bg-neon"
        style={{ boxShadow: '0 0 14px rgba(34,211,238,0.9)' }}
      />
      <ol className="space-y-5">
        {AGENT_PIPELINE.map((item, i) => (
          <Reveal key={item.step} delay={i * 80} dir="left">
            <li className="relative flex items-start gap-4 py-1">
              <span className="relative z-10 mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neon/30 bg-surface font-mono text-[0.65rem] font-bold text-frost">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="glass flex-1 rounded-xl px-4 py-3">
                <p className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-ink">
                  {item.step}
                </p>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export default function AIAgents() {
  return (
    <section id="agents" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 bg-neon/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="AI Agents"
          title={
            <>
              YOUR WORKFLOW. <span className="text-grad-neon">YOUR AI AGENT.</span>
            </>
          }
          desc="We build custom AI agents around your actual business workflow — not just generic chatbots. Your agent understands your business, connects to your tools and takes real action."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal dir="scale">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-3">
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.26em] text-frost">
                  agent.core
                </span>
                <span className="flex items-center gap-2 font-mono text-[0.65rem] text-neon">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-neon" />
                  reasoning
                </span>
              </div>
              <div className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-neon/15 blur-3xl" />
              <div className="aspect-[4/3] pt-8">
                <Suspense
                  fallback={
                    <div className="grid h-full place-items-center">
                      <span className="font-mono text-xs text-muted">initializing agent…</span>
                    </div>
                  }
                >
                  <AgentCore />
                </Suspense>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                How an agent flows
              </p>
            </Reveal>
            <Pipeline />
          </div>
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Agents we build
            </p>
          </Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {AGENT_EXAMPLES.map((agent, i) => (
              <Reveal key={agent} delay={(i % 5) * 70}>
                <div className="glass card-hover group flex h-full items-center gap-2.5 rounded-xl px-4 py-3.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-neon transition-transform duration-500 group-hover:scale-150" />
                  <span className="text-[0.82rem] font-medium leading-tight text-ink/90">{agent}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Build My AI Agent <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
