const projects = [
  {
    title: 'Orbital Archive',
    desc: 'Interactive 3D portfolio built with React Three Fiber and GSAP.',
    tech: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    github: 'https://github.com/N-Goedemans',
    live: null,
  },
  {
    title: 'Weather web app',
    desc: 'A Next.js built weather app, with Tailwind CSS',
    tech: ['Next.js', 'Tailwind CSS', 'Typescript'],
    github: 'https://github.com/N-Goedemans/weather-app',
    live: 'https://weather-app-n-goedemans.vercel.app/',
  },
]

export default function ProjectsPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-mono tracking-[0.3em] text-[#4dd0e1] uppercase mb-1">Project Nodes</p>
        <h2 className="text-2xl font-light tracking-wide">Projects</h2>
      </div>

      <div className="h-px bg-gradient-to-r from-[#4dd0e1]/40 to-transparent" />

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="p-4 rounded-lg border border-[#4dd0e1]/15 bg-[#4dd0e1]/5 hover:border-[#4dd0e1]/30 transition-colors duration-300"
          >
            <h3 className="text-slate-100 font-medium mb-1">{project.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">{project.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4dd0e1]/10 text-[#4dd0e1]/80 border border-[#4dd0e1]/20">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-slate-400 hover:text-[#4dd0e1] transition-colors"
              >
                GitHub ↗
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-[#4dd0e1] transition-colors"
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
