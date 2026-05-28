import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useSectionStore, { SECTIONS } from '../store/useSectionStore'

export default function HeroOverlay() {
  const { activeSection, setSection } = useSectionStore()
  const ref = useRef()
  const isHome = activeSection === SECTIONS.HOME

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (isHome) {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      )
    } else {
      gsap.to(el, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
    }
  }, [isHome])

  return (
    <div ref={ref} className="fixed inset-0 z-40 pointer-events-none flex items-center justify-start pl-16">
      <div className={`transition-all duration-500 ${isHome ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <p className="text-xs font-mono tracking-[0.4em] text-[#4fc3f7]/60 uppercase mb-4">
          Orbital Archive / v1.0
        </p>

        <h1 className="text-6xl font-light tracking-tight text-white leading-none mb-2">
          Niek
        </h1>
        <h1 className="text-6xl font-light tracking-tight leading-none mb-8" style={{ color: '#4fc3f7' }}>
          Goedemans
        </h1>

        <p className="text-slate-400 font-light text-lg mb-10 max-w-sm leading-relaxed">
          Software engineer & HBO-ICT student.<br />
          Building digital experiences.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setSection(SECTIONS.ABOUT)}
            className="px-6 py-3 rounded-lg text-sm font-mono tracking-wide transition-all duration-300 border border-[#4fc3f7]/30 text-[#4fc3f7] hover:bg-[#4fc3f7]/10 hover:border-[#4fc3f7]/60"
            style={{ boxShadow: '0 0 20px rgba(79,195,247,0.1)' }}
          >
            Enter Archive
          </button>
          <a
            href="https://github.com/N-Goedemans"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg text-sm font-mono tracking-wide text-slate-400 hover:text-slate-200 transition-colors border border-slate-700 hover:border-slate-500"
          >
            GitHub ↗
          </a>
        </div>

        <p className="text-slate-700 text-xs font-mono mt-10 tracking-widest animate-pulse">
          SELECT A NODE TO EXPLORE →
        </p>
      </div>
    </div>
  )
}
