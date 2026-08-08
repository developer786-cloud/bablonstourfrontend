import { FaArrowRight, FaGlobeAsia } from 'react-icons/fa'
import CityCard from './CityCard'

const CountrySection = ({ name, tagline, heroImage, cities, countrySlug }) => {
  const hasCities = cities.length > 0

  return (
    <section id={countrySlug} className="scroll-mt-[calc(var(--header-height-mobile)+2rem)] lg:scroll-mt-[calc(var(--header-height-desktop)+2rem)]">
      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
          <div className="flex items-start gap-3">
            <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
              <img src={heroImage.src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-accent-700">
                <FaGlobeAsia className="h-3 w-3" />
                {cities.length} cities ready
              </div>
              <h2 className="mt-2 font-display text-xl font-bold leading-tight text-dark-900">{name}</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-dark-500">{tagline}</p>
            </div>
          </div>

          <a
            href={`#${countrySlug}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-extrabold text-accent-600 transition hover:bg-accent-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
          >
            Explore all cities
            <FaArrowRight className="h-3 w-3" />
          </a>
        </div>

        {hasCities ? (
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:p-6">
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
