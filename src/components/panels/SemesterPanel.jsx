import { useEffect, useRef } from 'react'

export default function SemesterPanel() {
  const glitchRef = useRef()

  useEffect(() => {
    const el = glitchRef.current
    if (!el) return

    const glitch = () => {
      el.style.textShadow = `${(Math.random() - 0.5) * 8}px 0 #ef5350, ${(Math.random() - 0.5) * 8}px 0 #4fc3f7`
      setTimeout(() => {
        el.style.textShadow = '0 0 20px #ef535060'
      }, 80)
    }

    const id = setInterval(glitch, 2500 + Math.random() * 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-mono tracking-[0.3em] text-[#ef5350] uppercase mb-1 animate-pulse">
          ⚠ Classified Archive
        </p>
        <h2
          ref={glitchRef}
          className="text-2xl font-light tracking-wide"
          style={{ color: '#ef9a9a', textShadow: '0 0 20px #ef535060' }}
        >
          The Punishing Home
        </h2>
      </div>

      <div className="h-px bg-gradient-to-r from-[#ef5350]/40 to-transparent" />

      <p className="text-slate-400 text-sm leading-relaxed font-light">
        An experimental, psychologically unsettling interactive experience.
        A project that pushes the limits of dark design, immersive atmosphere,
        and unconventional narrative.
      </p>

      <div className="p-3 rounded border border-[#ef5350]/25 bg-[#ef5350]/5 space-y-1.5">
        {[
          'Dark tech aesthetic',
          'Experimental narrative design',
          'Psychological tension mechanics',
          'Immersive atmosphere engineering',
        ].map((item) => (
          <div key={item} className="flex gap-2 text-xs text-slate-400 font-mono">
            <span className="text-[#ef5350]">█</span>
            {item}
          </div>
        ))}
      </div>

      <div className="text-[10px] font-mono text-[#ef5350]/40 animate-pulse">
        STATUS: IN DEVELOPMENT ■■■□□□□□□□ 30%
      </div>
    </div>
  )
}
