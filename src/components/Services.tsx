import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import ServiceIcon from './ServiceIcon'
import { SERVICES, FORM_URL } from '../lib/constants'

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring -left-40 top-24 h-96 w-96 bg-accent/10" />
      <div className="section-ring -right-40 bottom-24 h-96 w-96 bg-neon/10" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              One studio for the <span className="text-grad-coral">full journey</span> — from website
              to <span className="text-grad-neon">intelligent system</span>.
            </>
          }
          desc="Web development, 3D experiences, AI agents, automation and AI video — plus ongoing website maintenance and improvements for everything we build."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.num} delay={(i % 4) * 90} dir="up">
              <TiltCard className="glass card-hover group h-full rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-xl border border-white/10 bg-bg/60 p-2.5 transition-colors duration-500 group-hover:border-accent/40">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <span className="font-mono text-sm font-bold text-white/15 transition-colors duration-500 group-hover:text-accent/70">
                    {service.num}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-bold text-ink">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.desc}</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-accent/50 via-neon/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start a Project <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
