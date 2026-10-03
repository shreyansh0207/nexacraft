import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { TECH_GROUPS } from '../lib/constants'

const GROUP_GLYPHS = ['</>', '{ }', 'AI', '⚙︎', 'DB', '☁︎']

export default function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring right-1/4 top-1/4 h-96 w-96 bg-haze/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Technologies"
          title={
            <>
              The stack behind <span className="text-grad-neon">intelligent products.</span>
            </>
          }
          desc="Modern, proven tools across the entire pipeline — chosen for speed, reliability and how well they play with AI."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={(i % 3) * 100} dir="up">
              <div className="glass card-hover h-full rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-bg/60 font-mono text-[0.62rem] font-bold text-frost">
                    {GROUP_GLYPHS[i]}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase tracking-[0.14em] text-ink">
                    {group.label}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-[0.8rem] font-medium text-ink/85 transition-colors duration-300 hover:border-neon/40 hover:text-neon"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
