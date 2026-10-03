import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { AI_VIDEO_ITEMS, FORM_URL } from '../lib/constants'

const HUES = [330, 265, 18, 190, 150, 45]

export default function AIVideo() {
  return (
    <section id="video" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring -right-32 top-24 h-96 w-96 bg-accent/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="AI Animation / Video"
          title={
            <>
              VIDEO THAT <span className="text-grad-neon">IMPOSSIBLE TEAMS</span> USED TO TAKE MONTHS
              TO MAKE.
            </>
          }
          desc="AI-crafted characters, avatars, product films and social content — produced in days, not months, at a fraction of traditional cost."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_VIDEO_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 100} dir="up">
              <TiltCard className="glass card-hover group h-full overflow-hidden rounded-2xl">
                <div
                  className="relative h-40 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, hsl(${HUES[i]} 65% 14%), hsl(${(HUES[i] + 40) % 360} 70% 8%))`,
                  }}
                >
                  <div
                    className="absolute -left-8 -top-8 h-32 w-32 rounded-full blur-2xl"
                    style={{ background: `hsl(${HUES[i]} 80% 45% / 0.25)` }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="relative grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/5 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <span
                        className="ml-1 h-0 w-0"
                        style={{
                          borderTop: '9px solid transparent',
                          borderBottom: '9px solid transparent',
                          borderLeft: `14px solid hsl(${HUES[i]} 85% 70%)`,
                        }}
                      />
                      <span
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ boxShadow: `0 0 34px hsl(${HUES[i]} 85% 60% / 0.5)` }}
                      />
                    </span>
                  </div>
                  <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ink/80">
                    AI Generated
                  </span>
                  <div className="absolute bottom-4 left-4 flex items-end gap-1">
                    {[0.5, 0.85, 0.4, 0.95, 0.55].map((h, j) => (
                      <span
                        key={j}
                        className="eq-bar w-1 rounded-sm"
                        style={{
                          height: `${h * 20}px`,
                          background: `hsl(${HUES[i]} 85% 62%)`,
                          animationDelay: `${j * 110}ms`,
                          opacity: 0.85,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Create My AI Video <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
