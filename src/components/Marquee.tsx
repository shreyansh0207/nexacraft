import { MARQUEE_ITEMS } from '../lib/constants'

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="relative border-y border-white/5 bg-surface/60 py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track items-center gap-10 pr-10">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-muted/80">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-accent to-neon" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
