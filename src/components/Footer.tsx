import { FORM_URL, NAV_LINKS } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Nexa<span className="text-grad-coral">Craft</span>{' '}
              <span className="text-base font-semibold text-muted">Digital Studio</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              "We build digital experiences powered by AI."
            </p>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 !px-6 !py-3 text-sm"
            >
              Start a Project <span aria-hidden="true">→</span>
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted/70">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-ember"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted/70">
              Capabilities
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>Web & 3D Development</li>
              <li>Custom AI Agents</li>
              <li>n8n Automation</li>
              <li>AI Animation / Video</li>
              <li>AI Website Integration</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-7 md:flex-row">
          <p className="text-xs text-muted/60">
            © {new Date().getFullYear()} NexaCraft Digital Studio. All rights reserved.
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted/50">
            Built with React · Three.js · AI
          </p>
        </div>
      </div>
    </footer>
  )
}
