import type { ReactNode } from 'react'
import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  desc?: ReactNode
  align?: 'center' | 'left'
}

export default function SectionHeading({ eyebrow, title, desc, align = 'center' }: Props) {
  const centered = align === 'center'
  return (
    <div className={`mb-14 md:mb-20 ${centered ? 'text-center' : 'text-left'}`}>
      <Reveal>
        <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="font-display mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-[2.9rem]">
          {title}
        </h2>
      </Reveal>
      {desc ? (
        <Reveal delay={200}>
          <p className={`mt-5 text-base leading-relaxed text-muted md:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
            {desc}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
