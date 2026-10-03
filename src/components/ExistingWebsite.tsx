import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { UPGRADE_EXAMPLES, UPGRADE_STAGES, FORM_URL } from '../lib/constants'

const STAGE_COLORS = ['#7dd3fc', '#22d3ee', '#ff6a3d', '#a78bfa']

export default function ExistingWebsite() {
  return (
    <section id="upgrade" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring right-0 top-16 h-[420px] w-[420px] bg-neon/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="AI Website Integration"
          title={
            <>
              ALREADY HAVE A WEBSITE?{' '}
              <span className="block text-grad-neon">YOU DON'T NEED TO REBUILD IT.</span>
            </>
          }
          desc="We integrate AI directly into the website you already own — a custom agent, connected to your APIs, database and automations — without touching what already works."
        />

        <div className="grid gap-3 md:grid-cols-4">
          {UPGRADE_STAGES.map((stage, i) => (
            <Reveal key={stage.stage} delay={i * 130} dir="up">
              <div className="glass card-hover group relative h-full overflow-hidden rounded-2xl p-6">
                <span
                  className="absolute inset-x-0 top-0 h-[2.5px] opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${STAGE_COLORS[i]}, transparent)` }}
                />
                <p className="font-mono text-[0.65rem] tracking-[0.26em]" style={{ color: STAGE_COLORS[i] }}>
                  STEP {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mt-3 text-[1.02rem] font-bold leading-snug text-ink">
                  {stage.stage}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stage.desc}</p>
                {i < UPGRADE_STAGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-lg text-neon/70 md:block"
                  >
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal dir="left">
            <div className="relative">
              <div className="glass-strong glow-neon relative overflow-hidden rounded-3xl p-8">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
                  <span className="ml-3 font-mono text-[0.62rem] text-muted">yourwebsite.com</span>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-3 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/8" />
                  <div className="h-3 w-2/3 rounded bg-white/6" />
                </div>
                <div className="glass absolute -bottom-5 -right-4 flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-xl md:-right-8">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-neon/15 font-mono text-[0.62rem] font-bold text-neon">
                    AI
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-ink">AI Assistant</p>
                    <p className="font-mono text-[0.6rem] text-neon">● plugged in</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                What we can plug into your existing site
              </h3>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {UPGRADE_EXAMPLES.map((item, i) => (
                <Reveal key={item} delay={i * 70} dir="right">
                  <div className="glass card-hover flex items-center gap-3 rounded-xl px-4 py-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-neon/10 font-mono text-[0.6rem] font-bold text-neon">
                      AI
                    </span>
                    <span className="text-sm font-medium text-ink/90">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Add AI To My Website <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
