const SectionCard = ({ children, className = '' }) => (
  <section className={`rounded-card-sm border border-sand-200/80 bg-white/95 p-5 shadow-card sm:p-6 ${className}`}>
    {children}
  </section>
)

export default SectionCard
