const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="mb-5">
    {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary-500">{eyebrow}</p> : null}
    <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-dark-900">{title}</h2>
    {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-dark-500">{description}</p> : null}
  </div>
)

export default SectionHeading
