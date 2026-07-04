import { FaArrowRight, FaClock, FaEnvelope, FaGlobeAsia, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

const OfficeInfo = ({ contactDetails }) => {
  const contactCards = [
    {
      icon: FaMapMarkerAlt,
      title: 'Our Office',
      lines: [contactDetails.company, contactDetails.address],
      href: '#contact-map',
    },
    {
      icon: FaPhoneAlt,
      title: 'Call Us',
      lines: [contactDetails.phone],
      href: contactDetails.phoneHref,
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      lines: [contactDetails.email],
      href: contactDetails.emailHref,
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      lines: [contactDetails.hours, 'Sunday : By Appointment'],
      href: '#contact-form',
    },
  ]

  return (
    <div>
      <p className="section-eyebrow text-secondary-600">
        <FaGlobeAsia className="h-4 w-4" />
        Contact information
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-dark-900 md:text-5xl">Get In Touch</h2>
      <span className="mt-4 block h-0.5 w-14 rounded-full bg-accent-400" />

      <div className="mt-7 grid gap-4">
        {contactCards.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.title}
              href={item.href}
              className="group flex items-center gap-5 rounded-2xl border border-sand-200 bg-white p-5 shadow-[0_14px_40px_rgba(16,39,36,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(16,39,36,0.14)]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dark-900 text-accent-400 shadow-[0_10px_25px_rgba(16,39,36,0.22)]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-extrabold leading-tight text-dark-900">{item.title}</span>
                {item.lines.map((line) => (
                  <span key={line} className="block text-sm font-medium leading-6 text-dark-600">
                    {line}
                  </span>
                ))}
              </span>
              <FaArrowRight className="h-4 w-4 text-dark-900 transition group-hover:translate-x-1 group-hover:text-secondary-600" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default OfficeInfo
