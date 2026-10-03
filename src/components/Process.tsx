import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { PROCESS_STEPS } from '../lib/constants'
import { useReducedMotion } from '../lib/hooks'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proc-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 72%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="process" className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ring left-1/4 top-1/4 h-96 w-96 bg-accent/8" />

      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Five steps. <span className="text-grad-coral">Zero chaos.</span>
            </>
          }
          desc="A cinematic, transparent process from first call to launch day — you always know what's happening and what's next."
        />

        <div ref={ref} className="relative">
          <div className="absolute bottom-10 left-[1.42rem] top-10 w-px bg-white/8 md:left-1/2" />
          <div
            className={`proc-fill absolute bottom-10 left-[1.42rem] top-10 w-px origin-top bg-gradient-to-b from-accent via-neon to-ember md:left-1/2 ${
              reduced ? '!scale-y-100' : ''
            }`}
          />

          <ol className="space-y-14 md:space-y-20">
            {PROCESS_STEPS.map((step, i) => {
              const leftSide = i % 2 === 0
              return (
                <li key={step.num} className="relative">
                  <Reveal dir={leftSide ? 'left' : 'right'} delay={80}>
                    <div
                      className={`flex items-start gap-6 md:items-center ${
                        leftSide ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <span
                        className="relative z-10 grid h-[2.9rem] w-[2.9rem] shrink-0 place-items-center rounded-full border border-white/15 bg-surface font-mono text-sm font-bold text-frost md:absolute md:left-1/2 md:-translate-x-1/2"
                        style={{ boxShadow: '0 0 24px -6px rgba(34,211,238,0.35)' }}
                      >
                        {step.num}
                      </span>
                      <div
                        className={`glass-strong card-hover flex-1 rounded-2xl p-6 md:max-w-[calc(50%-3.5rem)] ${
                          leftSide ? 'md:mr-auto md:text-right' : 'md:ml-auto'
                        }`}
                      >
                        <h3 className="font-display text-xl font-extrabold tracking-[0.12em] text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                      </div>
                      <span className="hidden w-[2.9rem] shrink-0 md:block" />
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
