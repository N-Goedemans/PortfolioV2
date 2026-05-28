const contacts = [
  { label: 'Email', value: 'chatgptniekbrent@gmail.com', href: 'mailto:niekgoedemans93@gmail.com', icon: '✉' },
  { label: 'GitHub', value: 'N-Goedemans', href: 'https://github.com/N-Goedemans', icon: '⌥' },
  { label: 'LinkedIn', value: 'Niek Goedemans', href: 'https://linkedin.com/in/niek-goedemans', icon: '◈' },
]

export default function ContactPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-mono tracking-[0.3em] text-[#4fc3f7] uppercase mb-1">Transmission Open</p>
        <h2 className="text-2xl font-light tracking-wide">Contact</h2>
      </div>

      <div className="h-px bg-gradient-to-r from-[#4fc3f7]/40 to-transparent" />

      <p className="text-slate-400 text-sm leading-relaxed">
        Open to collaborations, internship opportunities, and creative projects.
      </p>

      <div className="space-y-3">
        {contacts.map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-lg border border-[#4fc3f7]/10 bg-[#4fc3f7]/5 hover:border-[#4fc3f7]/30 hover:bg-[#4fc3f7]/10 transition-all duration-300 group"
          >
            <span className="text-[#4fc3f7] text-lg w-6 text-center">{icon}</span>
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{label}</p>
              <p className="text-slate-200 text-sm group-hover:text-[#4fc3f7] transition-colors">{value}</p>
            </div>
            <span className="ml-auto text-slate-600 group-hover:text-[#4fc3f7] transition-colors text-xs">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
