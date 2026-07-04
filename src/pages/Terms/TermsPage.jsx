const sections = [
  {
    title: 'Trip proposals',
    text: 'Package information, pricing, and availability may change until a booking is confirmed. We will always clarify inclusions, exclusions, and payment steps before confirmation.',
  },
  {
    title: 'Traveler responsibilities',
    text: 'Travelers are responsible for valid passports, visa requirements, accurate passenger details, and following destination rules or supplier policies.',
  },
  {
    title: 'Changes and cancellations',
    text: 'Change and cancellation terms depend on hotels, transport providers, tours, and destination rules. We will share applicable terms during booking.',
  },
]

const TermsPage = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-600">Terms</p>
          <h1 className="text-4xl font-bold leading-tight text-gray-950 md:text-5xl">Terms and Conditions</h1>
          <p className="mt-4 text-gray-600">
            These terms outline the basic expectations when using Bablons Travel services and planning a trip with us.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-2 text-xl font-bold text-gray-950">{section.title}</h2>
                <p className="leading-7 text-gray-600">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsPage
