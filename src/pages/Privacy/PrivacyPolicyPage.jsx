const sections = [
  {
    title: 'Information we collect',
    text: 'We collect details you share through forms, inquiries, newsletter signups, and booking conversations, such as name, contact details, travel preferences, and trip dates.',
  },
  {
    title: 'How we use it',
    text: 'We use this information to respond to inquiries, prepare travel suggestions, coordinate bookings, improve our services, and send relevant updates when you opt in.',
  },
  {
    title: 'Your choices',
    text: 'You can ask us to update, correct, or remove your personal information, and you can unsubscribe from marketing messages at any time.',
  },
]

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-600">Privacy</p>
          <h1 className="text-4xl font-bold leading-tight text-gray-950 md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">
            This page explains how Bablons Travel handles information shared while planning or discussing a trip.
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

export default PrivacyPolicyPage
