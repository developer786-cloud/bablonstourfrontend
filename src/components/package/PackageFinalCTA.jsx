import WhatsAppButton from '../common/WhatsAppButton'

const PackageFinalCTA = ({ package: travelPackage }) => (
  <section className="relative isolate overflow-hidden rounded-card bg-dark-900 p-6 text-white shadow-elevated sm:p-8">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(217,111,58,0.22),transparent_30%),linear-gradient(135deg,rgba(20,53,47,1),rgba(16,39,36,1))]" />
    <div className="relative">
    <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-300">Ready to book your trip?</p>
    <h2 className="mt-2 font-display text-3xl font-bold">Let Bablons plan this journey end to end.</h2>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
      Choose an available departure or request a custom quote. Our travel team will confirm seats, hotels, inclusions, and next steps.
    </p>
    <div className="mt-5 flex flex-wrap gap-3">
      <a href="#booking" className="rounded-full bg-secondary-500 px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white">Book now</a>
      <a href="#booking" className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-dark-900">Get custom quote</a>
      <WhatsAppButton message={`Hi Bablons Travel, I want to book ${travelPackage.title}.`} />
    </div>
    </div>
  </section>
)

export default PackageFinalCTA
