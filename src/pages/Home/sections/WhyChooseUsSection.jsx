import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaGlobeAsia,
  FaHeadset,
  FaHotel,
  FaPassport,
  FaRoute,
  FaShieldAlt,
  FaTags,
} from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import whyChooseBg from '../../../assets/images/Image.jpg'

const stats = [
  { value: '120+', label: 'International Journeys Crafted' },
  { value: '4.9/5', label: 'Traveler Satisfaction Rating' },
  { value: '15+', label: 'Countries Covered' },
  { value: '24/7', label: 'Travel Assistance & Support' },
]

const features = [
  {
    icon: FaRoute,
    title: 'Tailor-Made Travel Plans',
    description: 'Trips designed around your preferences, budget, pace, and travel style.',
  },
  {
    icon: FaGlobeAsia,
    title: 'International Travel Expertise',
    description: 'Confident planning for Dubai, Turkey, Thailand, Georgia, Azerbaijan, Bali, and beyond.',
  },
  {
    icon: FaHotel,
    title: 'Trusted Hotels & Partners',
    description: 'Carefully selected hotels, transport teams, guides, and local experience partners.',
  },
  {
    icon: FaPassport,
    title: 'Visa & Travel Assistance',
    description: 'Clear support for visa guidance, documents, travel requirements, and preparation.',
  },
  {
    icon: FaTags,
    title: 'Transparent Pricing',
    description: 'Honest inclusions, practical recommendations, and no hidden surprises.',
  },
  {
    icon: FaHeadset,
    title: 'Dedicated Trip Support',
    description: 'Helpful assistance from your first inquiry until you return home.',
  },
]

const WhyChooseUsSection = () => {
  return (
    <section className="section-shell relative overflow-hidden bg-[#FFFCF7]">
      <img
        src={whyChooseBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFCF7]/96 via-[#FFFCF7]/88 to-[#FFFCF7]/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(217,111,58,0.16),transparent_30%),radial-gradient(circle_at_18%_88%,rgba(20,53,47,0.10),transparent_34%)]" />

      <div className="section-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-eyebrow text-secondary-600">Why choose Bablons</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.08] text-dark-900 md:text-5xl lg:text-6xl">
              Travel Beyond Borders,
              <span className="block text-secondary-600">Planned to Perfection</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-dark-600">
              International travel should feel exciting, not overwhelming. We handle destination planning, visa guidance, hotels, transfers, and local experiences so you can simply enjoy the journey.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-sand-200 bg-white/82 p-5 shadow-[0_18px_45px_rgba(16,39,36,0.08)] backdrop-blur">
                  <div className="font-display text-4xl font-bold leading-none text-primary-900">{item.value}</div>
                  <p className="mt-2 text-sm font-semibold leading-5 text-dark-600">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={ROUTES.PACKAGES}
                className="inline-flex h-13 items-center justify-center gap-3 rounded-full bg-primary-900 px-7 py-4 text-sm font-extrabold text-white shadow-[0_16px_36px_rgba(16,39,36,0.2)] transition hover:-translate-y-0.5 hover:bg-primary-800"
              >
                Explore Journeys
                <FaArrowRight />
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="inline-flex h-13 items-center justify-center gap-3 rounded-full border border-primary-900 bg-white/70 px-7 py-4 text-sm font-extrabold text-primary-900 transition hover:-translate-y-0.5 hover:bg-primary-50"
              >
                Get Travel Plan
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article key={feature.title} className="group rounded-2xl border border-sand-200 bg-white/86 p-6 shadow-[0_18px_45px_rgba(16,39,36,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-secondary-200 hover:shadow-[0_26px_60px_rgba(16,39,36,0.12)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-900 text-accent-300 transition group-hover:bg-secondary-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold leading-tight text-dark-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-dark-600">{feature.description}</p>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-sand-200 bg-white/82 p-5 shadow-[0_18px_45px_rgba(16,39,36,0.08)] backdrop-blur">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <FaShieldAlt className="h-8 w-8 text-secondary-600" />
              <div>
                <h3 className="font-bold text-dark-900">Safe & Secure Travel</h3>
                <p className="text-sm text-dark-500">Reliable planning and support at every step.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaHotel className="h-8 w-8 text-secondary-600" />
              <div>
                <h3 className="font-bold text-dark-900">Comfort-First Stays</h3>
                <p className="text-sm text-dark-500">Hotels chosen for location, service, and ease.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaHeadset className="h-8 w-8 text-secondary-600" />
              <div>
                <h3 className="font-bold text-dark-900">Always-On Assistance</h3>
                <p className="text-sm text-dark-500">Our team stays available before and during travel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
