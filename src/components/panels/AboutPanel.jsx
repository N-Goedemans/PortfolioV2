export default function AboutPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-mono tracking-[0.3em] text-[#4fc3f7] uppercase mb-1">Identity Node</p>
        <h2 className="text-3xl font-light tracking-wide">Niek Goedemans</h2>
      </div>

      <div className="h-px bg-gradient-to-r from-[#4fc3f7]/40 to-transparent" />

      <p className="text-slate-300 text-sm leading-relaxed font-light">
        HBO-ICT student at the Amsterdam University of Applied Sciences,
        focused on frontend development and creative technology.
      </p>

      <div className="space-y-2">
        {[
          { label: 'Focus', value: 'Frontend Development' },
          { label: 'Education', value: 'HvA HBO-ICT' },
          { label: 'Interests', value: 'Creative Tech · Gaming · Fitness · Guitar' },
          { label: 'Location', value: 'Middenbeemster, NL' },
        ].map(({ label, value }) => (
          <div key={label} className="flex gap-3 text-sm">
            <span className="text-[#4fc3f7]/60 font-mono w-20 shrink-0">{label}</span>
            <span className="text-slate-200">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
