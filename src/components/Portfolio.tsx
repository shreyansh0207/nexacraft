import { useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { PROJECTS, PROJECT_CATEGORIES, type Project } from '../lib/constants'

function Thumb({ item }: { item: Project }) {
  const h = item.hue
  return (
    <div
      className="relative h-44 overflow-hidden"
      style={{
        background: `linear-gradient(140deg, hsl(${h} 60% 13%), hsl(${(h + 50) % 360} 65% 7%))`,
      }}
    >
      <div
        className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"
        style={{ background: `hsl(${h} 80% 50% / 0.22)` }}
      />
      <div
        className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full blur-3xl"
        style={{ background: `hsl(${(h + 120) % 360} 80% 55% / 0.16)` }}
      />
      <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full opacity-35" aria-hidden="true">
        <g fill="none" stroke={`hsl(${h} 80% 65%)`} strokeWidth="0.5">
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={40 + i * 22} cy={50 + Math.sin(i * 1.3) * 18} r={9 + i * 3.2} strokeOpacity={0.35} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.3em]"
          style={{ color: `hsl(${h} 80% 72%)` }}
        >
          {item.category}
        </span>
      </div>
      <span className="glass absolute right-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink/75">
        Demo concept
      </span>
    </div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>('All')
  const items = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="work" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring -left-32 top-32 h-96 w-96 bg-neon/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Concepts that show <span className="text-grad-coral">what we can build</span> for you.
            </>
          }
          desc="A snapshot of the kinds of systems we design and ship — from immersive 3D sites to AI agents and automated pipelines."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter projects">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'border-accent/60 bg-accent/12 text-ink shadow-[0_0_26px_-8px_rgba(255,106,61,0.6)]'
                    : 'border-white/10 bg-white/3 text-muted hover:border-white/25 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={`${filter}-${item.title}`} delay={(i % 3) * 90} dir="scale">
              <article className="glass card-hover group h-full overflow-hidden rounded-2xl">
                <Thumb item={item} />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted/70">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-10 text-center text-xs text-muted/60">
            These are in-house demo concepts created to demonstrate capability — not client work.
            Your project could be the first real one featured here.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
