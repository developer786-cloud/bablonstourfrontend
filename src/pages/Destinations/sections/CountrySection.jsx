import { FaArrowRight, FaGlobeAsia } from 'react-icons/fa'
import CityCard from './CityCard'

const CountrySection = ({ name, tagline, heroImage, cities, countrySlug }) => {
  const hasCities = cities.length > 0

  return (
    <section id={countrySlug} className="scroll-mt-[calc(var(--header-height-mobile)+2rem)] lg:scroll-mt-[calc(var(--header-height-desktop)+2rem)]">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_44px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
              <img src={heroImage.src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold leading-tight text-dark-900">{name}</h2>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-dark-500">{tagline}</p>
            </div>
          </div>

          <a
            href={`#${countrySlug}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-3 text-xs font-extrabold text-accent-600 transition hover:bg-accent-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            View all cities in {name}
            <FaArrowRight className="h-3 w-3" />
          </a>
        </div>

        {hasCities ? (
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {cities.map((city) => (
              <CityCard
                key={city.slug}
                citySlug={city.slug}
                countrySlug={countrySlug}
                name={city.name}
                image={city.image}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center p-6 text-center">
            <div className="mx-auto max-w-md">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary-700">
                <FaGlobeAsia className="h-4 w-4" />
              </span>
              <p className="mt-4 font-display text-2xl font-bold text-dark-900">{name}</p>
              <p className="mt-3 text-sm leading-7 text-dark-500">
                City cards for this country will appear here after you add city or region destinations in the backend.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CountrySection
