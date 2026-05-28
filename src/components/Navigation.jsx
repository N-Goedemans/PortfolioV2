import { SECTIONS, SECTION_CONFIG } from '../store/useSectionStore'
import useSectionStore from '../store/useSectionStore'

const NAV_ITEMS = [
  SECTIONS.ABOUT,
  SECTIONS.EXPERIENCE,
  SECTIONS.SKILLS,
  SECTIONS.PROJECTS,
  SECTIONS.SEMESTER,
  SECTIONS.CONTACT,
]

export default function Navigation() {
  const { activeSection, hoveredSection, setSection, setHovered } = useSectionStore()

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
      {NAV_ITEMS.map((section) => {
        const config = SECTION_CONFIG[section]
        const isActive = activeSection === section
        const isHovered = hoveredSection === section

        return (
          <button
            key={section}
            onClick={() => setSection(section)}
            onMouseEnter={() => setHovered(section)}
            onMouseLeave={() => setHovered(null)}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={config.label}
          >
            {/* Label — appears on hover */}
            <span
              className={`
                text-xs font-mono tracking-widest uppercase transition-all duration-300
                ${isActive || isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
              `}
              style={{ color: config.hotspot?.color ?? '#4fc3f7' }}
            >
              {config.label}
            </span>

            {/* Dot */}
            <span
              className={`
                block rounded-full transition-all duration-300
                ${isActive ? 'w-3 h-3' : 'w-2 h-2'}
              `}
              style={{
                background: config.hotspot?.color ?? '#4fc3f7',
                boxShadow: isActive || isHovered
                  ? `0 0 12px ${config.hotspot?.color ?? '#4fc3f7'}`
                  : 'none',
              }}
            />
          </button>
        )
      })}

      {/* Home button */}
      <button
        onClick={() => setSection(SECTIONS.HOME)}
        className="flex items-center gap-3 mt-4 group"
        aria-label="Home"
      >
        <span className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 text-slate-500
          ${activeSection === SECTIONS.HOME ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          Home
        </span>
        <span
          className={`block rounded-full transition-all duration-300 ${activeSection === SECTIONS.HOME ? 'w-3 h-3 bg-slate-400' : 'w-2 h-2 bg-slate-600'}`}
        />
      </button>
    </nav>
  )
}
