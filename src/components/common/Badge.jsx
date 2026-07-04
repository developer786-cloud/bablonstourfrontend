const Badge = ({ children, tone = 'orange', className = '' }) => {
  const tones = {
    orange: 'bg-secondary-50 text-secondary-700',
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-primary-50 text-primary-700',
    slate: 'bg-sand-100 text-dark-700',
    dark: 'bg-dark-900 text-white',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] ${tones[tone] || tones.orange} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
