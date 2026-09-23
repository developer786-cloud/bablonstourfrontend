import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaGlobeAsia, FaHeart, FaMapMarkerAlt, FaPlane, FaSuitcaseRolling, FaUsers } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import dubaiImage from '../../../assets/images/Dubai For Country.webp'
import georgiaImage from '../../../assets/images/Georgia For Country.webp'
import thailandImage from '../../../assets/images/Thailand For Country.webp'
import uzbekistanImage from '../../../assets/images/UzbekIstan For Country.webp'

const travelCollections = [
  {
    label: 'All Tour Packages',
    eyebrow: 'Every journey starts here',
    icon: FaGlobeAsia,
    title: 'Explore all our handpicked holidays.',
    description: 'Browse international packages across our most popular countries, travel styles, and city experiences.',
    image: dubaiImage,
    imageAlt: 'Dubai international travel package',
    links: [
      { label: 'All international packages', to: ROUTES.PACKAGES },
      { label: 'Dubai tour packages', to: `${ROUTES.PACKAGES}?country=Dubai` },
      { label: 'Thailand tour packages', to: `${ROUTES.PACKAGES}?country=Thailand` },
      { label: 'Georgia tour packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Uzbekistan tour packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Kazakhstan tour packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Honeymoon packages', to: `${ROUTES.PACKAGES}?travelStyle=Honeymoon` },
      { label: 'Group tour packages', to: `${ROUTES.PACKAGES}?travelStyle=Group` },
      { label: 'Family holiday packages', to: `${ROUTES.PACKAGES}?travelStyle=Family` },
      { label: 'City-wise packages', to: `${ROUTES.PACKAGES}?destination=` },
      { label: 'Custom holiday packages', to: ROUTES.CONTACT },
      { label: 'Adventure holiday packages', to: ROUTES.PACKAGES },
      { label: 'Luxury holiday packages', to: ROUTES.PACKAGES },
      { label: 'Culture holiday packages', to: ROUTES.PACKAGES },
      { label: 'Relaxation holiday packages', to: ROUTES.PACKAGES },
      { label: 'Nature holiday packages', to: ROUTES.PACKAGES },
      { label: 'Wildlife holiday packages', to: ROUTES.PACKAGES },
      { label: 'Beach holiday packages', to: ROUTES.PACKAGES },
      { label: 'Mountain holiday packages', to: ROUTES.PACKAGES },
      { label: 'City holiday packages', to: ROUTES.PACKAGES },
      { label: 'Cruise holiday packages', to: ROUTES.PACKAGES },
    ],
  },
  {
    label: 'Honeymoon Escapes',
    eyebrow: 'Made for two',
    icon: FaHeart,
    title: 'Romantic journeys, beautifully planned.',
    description: 'Celebrate your story with thoughtful stays, private moments, and unforgettable views.',
    image: thailandImage,
    imageAlt: 'Thailand beach honeymoon escape',
    links: [
      { label: 'Dubai honeymoon packages', to: `${ROUTES.PACKAGES}?country=Dubai` },
      { label: 'Thailand honeymoon packages', to: `${ROUTES.PACKAGES}?country=Thailand` },
      { label: 'Georgia honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Uzbekistan honeymoon packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Almaty honeymoon packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Kazakhstan honeymoon packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Astana honeymoon packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Shymkent honeymoon packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Tashkent honeymoon packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Samarkand honeymoon packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Bukhara honeymoon packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Khiva honeymoon packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Tbilisi honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Batumi honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Kutaisi honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Gudauri honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Mestia honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Bakuriani honeymoon packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
    ],
  },
  {
    label: 'Group Holidays',
    eyebrow: 'Together, better',
    icon: FaUsers,
    title: 'More memories when everyone comes along.',
    description: 'Expertly managed departures for friends, families, students, and larger groups.',
    image: dubaiImage,
    imageAlt: 'Dubai group holiday',
    links: [
      { label: 'Dubai group packages', to: `${ROUTES.PACKAGES}?country=Dubai` },
      { label: 'Thailand group packages', to: `${ROUTES.PACKAGES}?country=Thailand` },
      { label: 'Georgia group packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Uzbekistan group packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Kazakhstan group packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Almaty group packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Astana group packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Shymkent group packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
      { label: 'Tashkent group packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Samarkand group packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Bukhara group packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Khiva group packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Tbilisi group packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Batumi group packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Kutaisi group packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Gudauri group packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
    ],
  },
  {
    label: 'Holiday Themes',
    eyebrow: 'Travel your way',
    icon: FaSuitcaseRolling,
    title: 'Choose a trip that feels like you.',
    description: 'From relaxed family escapes to ambitious adventure-led itineraries.',
    image: georgiaImage,
    imageAlt: 'Georgia mountain holiday',
    links: [
      { label: 'Dubai luxury holidays', to: `${ROUTES.PACKAGES}?country=Dubai` },
      { label: 'Thailand family holidays', to: `${ROUTES.PACKAGES}?country=Thailand` },
      { label: 'Georgia adventure holidays', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Uzbekistan culture holidays', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Custom holiday packages', to: ROUTES.CONTACT },
      { label: 'Kazakhstan adventure holidays', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
    ],
  },
  {
    label: 'Top Destinations',
    eyebrow: 'Start exploring',
    icon: FaPlane,
    title: 'The world’s most-loved escapes.',
    description: 'Explore Bablons’ handpicked destinations and find your next favourite place.',
    image: uzbekistanImage,
    imageAlt: 'Uzbekistan heritage destination',
    links: [
      { label: 'Dubai tour packages', to: `${ROUTES.PACKAGES}?country=Dubai` },
      { label: 'Thailand tour packages', to: `${ROUTES.PACKAGES}?country=Thailand` },
      { label: 'Georgia tour packages', to: `${ROUTES.PACKAGES}?country=Georgia` },
      { label: 'Uzbekistan tour packages', to: `${ROUTES.PACKAGES}?country=Uzbekistan` },
      { label: 'Kazakhstan tour packages', to: `${ROUTES.PACKAGES}?country=Kazakhstan` },
    ],
  },
  {
    label: 'City Packages',
    eyebrow: 'Explore city by city',
    icon: FaMapMarkerAlt,
    title: 'Choose a city. Discover its best packages.',
    description: 'From city skylines to mountain escapes, find packages built around the places you want to experience.',
    image: uzbekistanImage,
    imageAlt: 'Central Asia travel destination',
    cityGroups: [
      { country: 'Kazakhstan', cities: ['Aktau', 'Turkistan', 'Shymkent', 'Astana', 'Almaty'] },
      { country: 'Thailand', cities: ['Hua Hin', 'Ayutthaya', 'Chiang Mai', 'Krabi', 'Phuket', 'Pattaya', 'Bangkok'] },
      { country: 'Georgia', cities: ['Mestia', 'Bakuriani', 'Sighnaghi', 'Kutaisi', 'Gudauri', 'Kazbegi', 'Batumi', 'Tbilisi'] },
      { country: 'Uzbekistan', cities: ['Termez', 'Nukus', 'Andijan', 'Margilan', 'Shahrisabz', 'Khiva', 'Bukhara', 'Samarkand', 'Tashkent'] },
      { country: 'Dubai', cities: ['Global Village', 'Deira Dubai', 'Dubai Desert', 'Jumeirah Beach', 'Jumeirah Beach Residence', 'Dubai Marina', 'Palm Jumeirah', 'Dubai Mall', 'Burj Khalifa', 'Dubai City'] },
    ],
  },
]

const TravelLinkHubSection = () => {
  const [activeCollection, setActiveCollection] = useState(0)
  const [activeCityCountry, setActiveCityCountry] = useState(0)
  const [showAllMobileLinks, setShowAllMobileLinks] = useState(false)
  const collection = travelCollections[activeCollection]
  const Icon = collection.icon

  return (
    <section className="relative overflow-hidden bg-[#f4f8f7] py-10 sm:py-14">
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-secondary-100/60 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8 2xl:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.2em] text-secondary-600">
            <span className="h-px w-8 bg-secondary-400" />
            Explore Bablons Travel
            <span className="h-px w-8 bg-secondary-400" />
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-dark-900 sm:text-4xl md:text-5xl">Find the journey made for you</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-dark-600 sm:mt-4 sm:text-base sm:leading-7">Browse our most requested holiday styles and destinations, then discover the package that fits your plans.</p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-primary-100 bg-white/85 shadow-[0_24px_70px_rgba(16,39,36,0.12)] backdrop-blur sm:mt-9 sm:rounded-[1.75rem]">
          <div className="grid lg:grid-cols-[17rem_1fr]">
            <nav aria-label="Travel collections" className="border-b border-primary-100 bg-[#f5f6f3] p-2 sm:bg-primary-900 lg:border-b-0 lg:border-r lg:border-primary-800 lg:p-5">
              <div className="grid grid-cols-3 gap-1.5 sm:flex sm:snap-x sm:snap-mandatory sm:gap-2 sm:overflow-x-auto sm:pb-1 sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:pb-0">
                {travelCollections.map((item, index) => {
                  const TabIcon = item.icon
                  const isActive = index === activeCollection

                  return (
                    <button
                      key={item.label}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveCollection(index)
                        setActiveCityCountry(0)
                        setShowAllMobileLinks(false)
                      }}
                      className={`flex min-h-10 min-w-0 items-center gap-1.5 rounded-[0.7rem] px-1.5 py-1.5 text-left text-[9px] font-extrabold leading-tight transition sm:min-h-11 sm:shrink-0 sm:snap-start sm:gap-2 sm:rounded-[0.9rem] sm:px-4 sm:py-3 sm:text-sm lg:min-w-0 ${
                        isActive
                          ? 'bg-primary-900 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:bg-white sm:text-primary-900'
                          : 'bg-[#edf1ee] text-dark-700 hover:bg-[#e6ece9] sm:bg-transparent sm:text-white/75 sm:hover:bg-white/10 sm:hover:text-white'
                      }`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${isActive ? 'bg-secondary-50 text-secondary-600 sm:bg-secondary-50 sm:text-secondary-600' : 'bg-white text-dark-700 sm:bg-white/10 sm:text-accent-300'}`}>
                        <TabIcon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
                      </span>
                      <span className="line-clamp-2">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>

            <div className="p-4 sm:p-8 lg:p-10">
              <div className="grid gap-4 border-b border-sand-200 pb-5 sm:gap-5 sm:pb-6 sm:grid-cols-[1fr_11rem] sm:items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary-600 sm:text-xs">{collection.eyebrow}</p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-dark-900 sm:text-3xl">{collection.title}</h3>
                  <p className="mt-2 max-w-2xl text-xs leading-5 text-dark-600 sm:mt-3 sm:text-sm sm:leading-7">{collection.description}</p>
                </div>
                <div className="group/image relative hidden h-32 overflow-hidden rounded-xl bg-primary-900 shadow-[0_12px_28px_rgba(16,39,36,0.2)] sm:block sm:h-full sm:min-h-36 sm:rounded-2xl">
                  <img src={collection.image} alt={collection.imageAlt} className="h-full w-full object-cover transition duration-700 group-hover/image:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary-900 backdrop-blur">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {collection.cityGroups ? (
                <div className="mt-5 sm:mt-6">
                  <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {collection.cityGroups.map((group, index) => (
                      <button
                        key={group.country}
                        type="button"
                        onClick={() => setActiveCityCountry(index)}
                        className={`min-h-10 shrink-0 rounded-full border px-2.5 py-1.5 text-[11px] font-extrabold transition sm:px-4 sm:text-xs ${
                          activeCityCountry === index ? 'border-primary-900 bg-primary-900 text-white shadow-sm' : 'border-sand-200 bg-white text-dark-700 hover:border-secondary-300 hover:text-secondary-600'
                        }`}
                      >
                        {group.country}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                    {collection.cityGroups[activeCityCountry].cities.map((city) => (
                      <Link key={`${city}-${collection.label}`} to={`${ROUTES.PACKAGES}?destination=${encodeURIComponent(city)}`} className="group inline-flex min-h-11 max-w-full items-center justify-between gap-2 rounded-full border border-primary-100 bg-[#fbfdfc] px-3 py-2 text-left text-xs font-bold text-primary-900 transition hover:-translate-y-0.5 hover:border-secondary-400 hover:bg-secondary-50 hover:text-secondary-700 hover:shadow-sm sm:text-sm sm:px-4">
                        <span className="break-words leading-tight">{city} travel packages</span>
                        <FaArrowRight className="h-3 w-3 shrink-0 text-secondary-600 transition group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                    {collection.links.map((link, index) => (
                      <Link key={`${link.label}-${link.to}`} to={link.to} className={`group min-h-11 max-w-full items-center justify-between gap-2 rounded-full border border-primary-100 bg-[#fbfdfc] px-3 py-2 text-left text-xs font-bold text-primary-900 transition hover:-translate-y-0.5 hover:border-secondary-400 hover:bg-secondary-50 hover:text-secondary-700 hover:shadow-sm sm:inline-flex sm:text-sm sm:px-4 ${index > 5 && !showAllMobileLinks ? 'hidden' : 'inline-flex'}`}>
                        <span className="break-words leading-tight">{link.label}</span>
                        <FaArrowRight className="h-3 w-3 shrink-0 text-secondary-600 transition group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                  {collection.links.length > 6 && (
                    <button
                      type="button"
                      aria-expanded={showAllMobileLinks}
                      onClick={() => setShowAllMobileLinks((isExpanded) => !isExpanded)}
                      className="mt-3 min-h-11 w-full rounded-full border border-primary-200 bg-white px-4 text-xs font-extrabold text-primary-900 transition hover:border-secondary-400 hover:text-secondary-700 sm:hidden"
                    >
                      {showAllMobileLinks ? 'Show fewer packages' : `Show ${collection.links.length - 6} more packages`}
                    </button>
                  )}
                </>
              )}

              <Link to={ROUTES.PACKAGES} className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#f6efe9] px-3 py-2 text-sm font-extrabold text-secondary-700 transition hover:bg-[#f0e3d8] hover:text-secondary-800 sm:mt-8 sm:px-4">
                View all tour packages
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-600 text-white shadow-sm"><FaArrowRight className="h-3 w-3" /></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelLinkHubSection
