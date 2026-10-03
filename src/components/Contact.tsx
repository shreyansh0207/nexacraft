import Reveal from './Reveal'
import { FORM_URL } from '../lib/constants'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-44">
      <div className="section-ring left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 bg-accent/12" />
      <div className="section-ring left-1/4 top-1/3 h-72 w-72 bg-neon/12" />
      <div className="section-ring right-1/4 bottom-1/4 h-72 w-72 bg-haze/12" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <span className="eyebrow justify-center">Your move</span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            LET'S BUILD SOMETHING <span className="text-grad-coral">INTELLIGENT.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Have a website idea, automation problem or AI workflow in mind? Tell us what you need
            and we'll help turn your requirement into a working digital solution.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-11 flex flex-col items-center gap-5">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-9 !py-4 text-base md:text-lg"
            >
              Tell Us What You Want To Build <span aria-hidden="true">→</span>
            </a>
            <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted/70">
              <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              Opens our project brief in a new tab
            </p>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { k: '01', t: 'Share your idea', d: 'Two minutes in the brief form' },
              { k: '02', t: 'Get a plan', d: 'Scope, timeline and approach' },
              { k: '03', t: 'Watch it ship', d: 'Built, integrated and launched' },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-5 text-left">
                <p className="font-mono text-[0.62rem] font-bold tracking-[0.2em] text-accent">{s.k}</p>
                <p className="font-display mt-2 text-sm font-bold text-ink">{s.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
