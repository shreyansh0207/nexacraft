import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import AIAgents from './components/AIAgents'
import Automation from './components/Automation'
import ExistingWebsite from './components/ExistingWebsite'
import CustomAgent from './components/CustomAgent'
import AIVideo from './components/AIVideo'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import { useReducedMotion } from './lib/hooks'

export default function App() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      document.documentElement.style.overflow = ''
      lenis.scrollTo(el, { offset: -70 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      document.removeEventListener('click', onClick)
    }
  }, [reduced])

  return (
    <div className="grain relative min-h-screen bg-bg text-ink">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <AIAgents />
        <Automation />
        <ExistingWebsite />
        <CustomAgent />
        <AIVideo />
        <Process />
        <Portfolio />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
