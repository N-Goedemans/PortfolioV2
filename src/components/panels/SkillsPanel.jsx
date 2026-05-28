const skills = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Vue.js', color: '#41b883' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Java', color: '#f89820' },
  { name: 'Figma', color: '#a259ff' },
  { name: 'PHP', color: '#8892bf' },
]

export default function SkillsPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-mono tracking-[0.3em] text-[#b39ddb] uppercase mb-1">Core Systems</p>
        <h2 className="text-2xl font-light tracking-wide">Skills</h2>
      </div>

      <div className="h-px bg-gradient-to-r from-[#b39ddb]/40 to-transparent" />

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1.5 rounded-md text-sm font-mono border"
            style={{
              color: skill.color,
              borderColor: `${skill.color}40`,
              background: `${skill.color}10`,
              boxShadow: `0 0 10px ${skill.color}15`,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
