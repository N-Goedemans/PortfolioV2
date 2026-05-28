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

      <div className="space-y-3">
        <div>
          <p className="text-xs font-mono tracking-[0.3em] text-[#ef5350]/70 uppercase mb-1">My Role</p>
          <p className="text-slate-300 text-sm font-light">AI Engineer</p>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed font-light">
          Built a faze-detection system using <span className="text-[#ef9a9a] font-mono">MediaPipe Face Landmarker</span> to
          detect when the user looks away from the screen — triggering in-game consequences. My first time writing Python,
          and it came together well.
        </p>
        <div>
          <p className="text-xs font-mono tracking-[0.3em] text-[#ef5350]/70 uppercase mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {['Python', 'MediaPipe', 'Computer Vision', 'Real-time processing'].map((skill) => (
              <span key={skill} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ef5350]/10 text-[#ef9a9a]/80 border border-[#ef5350]/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
