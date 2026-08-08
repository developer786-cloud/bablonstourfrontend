const TwoColumnLayout = ({ mainContent, sidebarContent, className = '' }) => {
  return (
    <div className={`section-container mx-auto grid grid-cols-1 gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10 lg:py-16 ${className}`}>
      <main className="min-w-0">{mainContent}</main>
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-height-desktop)+1.25rem)] space-y-5">
          {sidebarContent}
        </div>
      </aside>
    </div>
  )
}

export default TwoColumnLayout
