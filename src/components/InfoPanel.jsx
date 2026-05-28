import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useSectionStore, { SECTIONS, SECTION_CONFIG } from '../store/useSectionStore'
import AboutPanel from './panels/AboutPanel'
import ExperiencePanel from './panels/ExperiencePanel'
import SkillsPanel from './panels/SkillsPanel'
import ProjectsPanel from './panels/ProjectsPanel'
import SemesterPanel from './panels/SemesterPanel'
import ContactPanel from './panels/ContactPanel'

const PANEL_COMPONENTS = {
  [SECTIONS.ABOUT]: AboutPanel,
  [SECTIONS.EXPERIENCE]: ExperiencePanel,
  [SECTIONS.SKILLS]: SkillsPanel,
  [SECTIONS.PROJECTS]: ProjectsPanel,
  [SECTIONS.SEMESTER]: SemesterPanel,
  [SECTIONS.CONTACT]: ContactPanel,
}

export default function InfoPanel() {
  const panelRef = useRef()
  const { activeSection, panelVisible, setSection } = useSectionStore()
  const isSemester = activeSection === SECTIONS.SEMESTER

  const accentColor = SECTION_CONFIG[activeSection]?.hotspot?.color ?? '#4fc3f7'
  const PanelContent = PANEL_COMPONENTS[activeSection]

  useEffect(() => {
    const el = panelRef.current
    if (!el) return

    if (panelVisible) {
      gsap.fromTo(el,
        { opacity: 0, x: 40, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.4 }
      )
    } else {
      gsap.to(el, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' })
    }
  }, [panelVisible, activeSection])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && panelVisible) setSection(SECTIONS.HOME)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [panelVisible, setSection])

  if (!panelVisible || !PanelContent) return null

  return (
    <div
      ref={panelRef}
      className="fixed left-10 bottom-10 z-50 w-[360px] max-h-[70vh] overflow-y-auto rounded-xl p-6 opacity-0"
      style={{
        background: isSemester
          ? 'rgba(20, 4, 4, 0.75)'
          : 'rgba(4, 12, 36, 0.75)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${accentColor}25`,
        boxShadow: `0 0 40px ${accentColor}15, inset 0 0 40px ${accentColor}05`,
      }}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l rounded-tl-xl" style={{ borderColor: `${accentColor}60` }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r rounded-br-xl" style={{ borderColor: `${accentColor}60` }} />

      <PanelContent />

      {/* Close */}
      <button
        onClick={() => setSection(SECTIONS.HOME)}
        className="absolute top-4 right-4 text-slate-600 hover:text-slate-300 transition-colors text-xs font-mono"
      >
        [ESC]
      </button>
    </div>
  )
}
