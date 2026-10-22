import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { FORM_URL, PRICING_PLANS } from '../lib/constants'

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-neon">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring -right-32 top-24 h-96 w-96 bg-accent/10" />
      <div className="section-ring -left-24 bottom-16 h-80 w-80 bg-haze/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple plans. <span className="text-grad-coral">Honest pricing.</span>
            </>
          }
          desc="Pick a starting point — from a quick animated website at ₹999 to a fully customized build with its own domain. Every plan ships live and working."
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110} dir="scale" className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-3xl p-7 md:p-8 ${
                  plan.featured
                    ? 'border border-accent/50 bg-gradient-to-b from-accent/15 via-surface to-surface shadow-[0_0_70px_-18px_rgba(255,106,61,0.55)]'
                    : 'glass'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-ember px-4 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-black shadow-[0_10px_30px_-10px_rgba(255,106,61,0.8)]">
                    {plan.badge}
                  </span>
                )}

                <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted">{plan.name}</p>
                <p className="font-display mt-4 text-5xl font-extrabold tracking-tight text-ink">
                  {plan.price}
                  <span className="ml-1 align-middle font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted/70">INR</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{plan.tagline}</p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/8 pt-6 text-sm text-ink/85">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 justify-center ${plan.featured ? 'btn-primary' : 'btn-ghost'} w-full`}
                >
                  {plan.cta} <span aria-hidden="true">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mt-10 text-center text-xs leading-relaxed text-muted/60">
            Prices in INR · Final scope is confirmed in the project brief · Need something in between?
            Every plan can be tailored — just tell us what you need.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
