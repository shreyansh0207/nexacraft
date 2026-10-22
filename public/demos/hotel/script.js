const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Stagger delays from data-delay
document.querySelectorAll('.reveal').forEach((el) => {
  const d = el.getAttribute('data-delay')
  if (d) el.style.setProperty('--d', `${d}ms`)
})

// Scroll reveals
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
        entry.target.classList.add('in')
        io.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
)
document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

// Jump-scroll safety: anything already above the viewport reveals immediately
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
    if (el.getBoundingClientRect().bottom < 0) el.classList.add('in')
  })
})

// Header solid on scroll + hero parallax drift + reveal/counter sweep for instant jumps
const header = document.querySelector('.site-header')
const heroImg = document.querySelector('.hero-media img')
const sweepPast = () => {
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
    if (el.getBoundingClientRect().bottom < 0) el.classList.add('in')
  })
  counters.forEach((c) => {
    if (c.getBoundingClientRect().bottom < 0 && c.textContent !== c.getAttribute('data-count')) {
      c.textContent = c.getAttribute('data-count')
      counterIO.unobserve(c)
    }
  })
}
let ticking = false
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 40)
      if (!prefersReduced && heroImg && window.scrollY < window.innerHeight) {
        heroImg.style.translate = `0 ${window.scrollY * 0.18}px`
      }
      sweepPast()
      ticking = false
    })
  },
  { passive: true },
)

// Mobile menu
const toggle = document.querySelector('.nav-toggle')
const links = document.querySelector('.nav-links')
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open')
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  document.documentElement.style.overflow = open ? 'hidden' : ''
})
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    links.classList.remove('open')
    toggle.setAttribute('aria-expanded', 'false')
    document.documentElement.style.overflow = ''
  }
})

// Animated counters
const counters = document.querySelectorAll('[data-count]')
const counterIO = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const el = entry.target
      counterIO.unobserve(el)
      const target = Number(el.getAttribute('data-count'))
      if (prefersReduced || el.getBoundingClientRect().bottom < 0) {
        el.textContent = String(target)
        continue
      }
      const start = performance.now()
      const dur = 1400
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1)
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  },
  { threshold: 0.6 },
)
counters.forEach((c) => counterIO.observe(c))

window.addEventListener('load', () => {
  counters.forEach((c) => {
    if (c.getBoundingClientRect().bottom < 0) c.textContent = c.getAttribute('data-count')
  })
})

document.getElementById('year').textContent = String(new Date().getFullYear())
