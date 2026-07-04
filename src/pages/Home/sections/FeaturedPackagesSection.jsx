import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import {
  FaArrowRight,
  FaBuilding,
  FaCalendarCheck,
  FaCar,
  FaFire,
  FaHeart,
  FaHotel,
  FaMapMarkedAlt,
  FaMountain,
  FaPlane,
  FaSearch,
  FaShip,
  FaStar,
  FaSuitcaseRolling,
  FaUserTie,
  FaUtensils,
} from 'react-icons/fa'

const tabs = [
  { label: 'All', icon: FaMapMarkedAlt, active: true },
  { label: 'Dubai', icon: FaBuilding },
  { label: 'Thailand', icon: FaShip },
  { label: 'Georgia', icon: FaMountain },
  { label: 'Uzbekistan', icon: FaBuilding },
]

const inclusions = [
  { label: 'Flights*', icon: FaPlane },
  { label: 'Hotels', icon: FaHotel },
  { label: 'Transfers', icon: FaCar },
  { label: 'Breakfast', icon: FaUtensils },
  { label: 'Tour Manager', icon: FaUserTie },
]

const featuredPackage = {
  title: 'Thailand Premium Tour',
  route: 'Bangkok - Pattaya - Phuket',
  duration: '6N / 7D',
  badge: 'Bestseller',
  description:
    'Experience crystal beaches, island hopping, premium stays, and vibrant city moments in one seamless Bablons itinerary.',
  image:
    'https://res.cloudinary.com/docgnkjn9/image/upload/v1782808011/bablons-travel/destinations/epbjumeut9qapj3pxkos.jpg',
}

const packages = [
  {
    title: 'Dubai Premium Tour',
    route: 'Dubai - Abu Dhabi',
    duration: '5N / 6D',
    tag: 'Trending',
    icon: FaFire,
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782717769/bablons-travel/destinations/uzgbgcqcs2jgjg73sg8i.jpg',
    tone: 'bg-secondary-500',
  },
  {
    title: 'Thailand Premium Tour',
    route: 'Bangkok - Pattaya - Phuket',
    duration: '6N / 7D',
    tag: 'Most Popular',
    icon: FaHeart,
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782807660/bablons-travel/destinations/siglcnydp1mfc0cvcyvc.jpg',
    tone: 'bg-rose-500',
  },
  {
    title: 'Georgia Explorer Tour',
    route: 'Tbilisi - Gudauri - Batumi',
    duration: '6N / 7D',
    tag: 'Top Rated',
    icon: FaStar,
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782803773/bablons-travel/destinations/cm8jrm1zri3p8syytt3f.jpg',
    tone: 'bg-primary-700',
  },
  {
    title: 'Uzbekistan Silk Road Tour',
    route: 'Tashkent - Samarkand - Bukhara',
    duration: '6N / 7D',
    tag: 'New Arrival',
    icon: FaStar,
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782799415/bablons-travel/destinations/fsfxf9eqxkvbhkjzdxlf.jpg',
    tone: 'bg-violet-600',
  },
]

const steps = [
  { title: 'Choose Your Tour', text: 'Select from our handpicked international tours', icon: FaSearch },
  { title: 'Book With Ease', text: 'Secure your spot with a simple booking process', icon: FaCalendarCheck },
  { title: 'Pack Your Bags', text: 'Get set for an unforgettable journey', icon: FaSuitcaseRolling },
  { title: 'Enjoy Your Trip', text: 'Relax and create memories for a lifetime', icon: FaHeart },
]

const FeaturedPackagesSection = () => {
  return (
    <section className="section-shell relative overflow-hidden bg-[#FFFCF7]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(115deg,rgba(237,245,242,0.86),rgba(255,241,234,0.62),rgba(255,252,247,0))]" />
      <div className="pointer-events-none absolute -right-28 top-8 hidden h-80 w-80 rounded-full bg-secondary-100/55 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-28 bottom-20 hidden h-80 w-80 rounded-full bg-primary-100/70 blur-3xl lg:block" />

      <div className="section-container relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display-label text-xl font-semibold text-dark-500 md:text-2xl">
            Curated Experiences, Unforgettable Journeys <FaPlane className="ml-2 inline text-accent-500" />
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-dark-900 md:text-6xl lg:text-7xl">
            Handpicked International Tours
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-dark-500 md:text-xl">
            Premium destinations, carefully curated for you.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.label}
                type="button"
                className={`inline-flex h-12 min-w-[8.5rem] items-center justify-center gap-3 rounded-full border px-5 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 ${
                  tab.active
                    ? 'border-primary-900 bg-primary-900 text-white shadow-[0_18px_36px_rgba(16,39,36,0.2)]'
                    : 'border-sand-200 bg-white/90 text-dark-800 hover:border-primary-200 hover:bg-primary-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <article className="mt-6 grid overflow-hidden rounded-card border border-white bg-white shadow-[0_24px_70px_rgba(16,39,36,0.12)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative min-h-[19rem] overflow-hidden lg:min-h-[23rem]">
            <img
              src={featuredPackage.image}
              alt={featuredPackage.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/34 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2 text-sm font-extrabold text-white shadow-lg">
              <FaStar className="text-accent-300" />
              {featuredPackage.badge}
            </span>
          </div>

          <div className="relative flex min-h-[19rem] flex-col justify-center overflow-hidden bg-[linear-gradient(135deg,#fffaf5_0%,#ffffff_56%,#fff2e5_100%)] p-6 md:p-8 lg:p-10">
            <div className="pointer-events-none absolute bottom-0 right-0 hidden h-32 w-80 opacity-20 lg:block">
              <div className="h-full w-full bg-[linear-gradient(135deg,transparent_20%,rgba(217,111,58,0.22)_20%,transparent_21%),linear-gradient(90deg,transparent_0%,rgba(16,39,36,0.18)_100%)]" />
            </div>
            <span className="w-fit rounded-full bg-sand-100 px-4 py-1.5 text-sm font-black text-dark-900">
              {featuredPackage.duration}
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-dark-900 md:text-5xl">
              {featuredPackage.title}
            </h3>
            <p className="mt-2 text-xl font-extrabold text-secondary-500">{featuredPackage.route}</p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {inclusions.map((item) => {
                const Icon = item.icon

                return (
                  <span key={item.label} className="inline-flex items-center gap-2 text-sm font-semibold text-dark-700">
                    <Icon className="h-4 w-4 text-dark-800" />
                    {item.label}
                  </span>
                )
              })}
            </div>

            <div className="relative z-10 mt-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-sm leading-7 text-dark-600 md:text-base">{featuredPackage.description}</p>
              <Link
                to={ROUTES.PACKAGES}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-primary-900 px-7 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(16,39,36,0.22)] transition hover:-translate-y-0.5 hover:bg-primary-800"
              >
                Explore Package
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-bold text-dark-900 md:text-3xl">
            <span className="mr-3 text-accent-600">-</span>
            Popular International Packages
          </h3>
          <Link to={ROUTES.PACKAGES} className="inline-flex items-center gap-2 text-sm font-extrabold text-primary-900 transition hover:text-secondary-600">
            View All Packages
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => {
            const TagIcon = pkg.icon

            return (
              <article
                key={pkg.title}
                className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-[0_18px_46px_rgba(16,39,36,0.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(16,39,36,0.16)]"
              >
                <Link to={ROUTES.PACKAGES} className="relative block h-44 overflow-hidden bg-dark-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/18 to-transparent" />
                  <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold text-white ${pkg.tone}`}>
                    <TagIcon className="h-3 w-3" />
                    {pkg.tag}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-black text-dark-900 backdrop-blur">
                    {pkg.duration}
                  </span>
                </Link>

                <div className="p-5">
                  <h4 className="font-display text-xl font-bold leading-tight text-dark-900">
                    <Link to={ROUTES.PACKAGES} className="transition hover:text-secondary-600">
                      {pkg.title}
                    </Link>
                  </h4>
                  <p className="mt-1 text-sm font-medium text-dark-500">{pkg.route}</p>

                  <div className="mt-5 grid grid-cols-4 gap-2 border-b border-sand-200 pb-4">
                    {inclusions.slice(0, 4).map((item) => {
                      const Icon = item.icon

                      return (
                        <span key={item.label} className="flex min-w-0 flex-col items-center gap-1 text-center text-[0.68rem] font-semibold text-dark-700">
                          <Icon className="h-4 w-4 text-dark-800" />
                          <span className="w-full truncate">{item.label}</span>
                        </span>
                      )
                    })}
                  </div>

                  <Link
                    to={ROUTES.PACKAGES}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary-900 transition group-hover:text-secondary-600"
                  >
                    View Tour
                    <FaArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-6 rounded-card border border-sand-100 bg-white/72 px-5 py-7 shadow-[0_18px_48px_rgba(16,39,36,0.08)] backdrop-blur">
          <div className="mb-6 flex items-center justify-center gap-5">
            <span className="h-px w-12 bg-accent-400" />
            <h3 className="font-display text-3xl font-bold text-dark-900">How it works</h3>
            <span className="h-px w-12 bg-accent-400" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div key={step.title} className="relative flex items-center gap-4 lg:px-4">
                  {index > 0 ? (
                    <FaArrowRight className="absolute -left-5 top-8 hidden h-5 w-5 text-dark-300 lg:block" />
                  ) : null}
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold text-dark-900">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-dark-600">{step.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPackagesSection
