const timeline = [
  {
    company: 'Stachanov',
    role: 'Intern → Employee',
    color: '#4fc3f7',
    items: [
      'Assisted rewrite of project into React',
      'Cyber Security & Pen-testing',
      'WCAG Accessibility Testing'
    ],
  },
  {
    company: 'Qore Digital',
    role: 'Intern → Employee',
    color: '#b39ddb',
    items: [
      'Vue.js development',
      'Tailwind CSS',
      'WordPress integrations',
    ],
  },
  {
    company: 'Bit Academy',
    role: 'MBO Full Stack Development',
    color: '#81c784',
    items: [
      'Full stack web development curriculum',
      'Strong focus on front-end',
      'HTML, CSS, Tailwind, JavaScript, TypeScript, Next.js, Vue.js, PHP',
    ],
  },
]

export default function ExperiencePanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-mono tracking-[0.3em] text-[#4fc3f7] uppercase mb-1">Career Log</p>
        <h2 className="text-2xl font-light tracking-wide">Experience</h2>
      </div>

      <div className="h-px bg-gradient-to-r from-[#4fc3f7]/40 to-transparent" />

      <div className="space-y-6 relative">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-[#4fc3f7]/40 via-[#b39ddb]/40 to-transparent" />

        {timeline.map((entry) => (
          <div key={entry.company} className="pl-7 relative">
            <span
              className="absolute left-0 top-1.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: entry.color }} />
            </span>

            <p className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color: entry.color }}>
              {entry.company}
            </p>
            <p className="text-slate-200 font-medium mb-2">{entry.role}</p>

            <ul className="space-y-1">
              {entry.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-400">
                  <span style={{ color: entry.color }}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
