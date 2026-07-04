import { Link } from 'react-router-dom'
import { FaArrowRight, FaSuitcaseRolling } from 'react-icons/fa'
import Button from '../../../components/common/Button/Button'
import { ROUTES } from '../../../constants/routes'

/**
 * Deliberately does not show fabricated package cards with invented
 * prices/itineraries — that data should come from wherever packages are
 * actually managed (a packages API/data source), not be hardcoded twice
 * in two different places that could drift out of sync. Instead this
 * drives straight to the real packages list, pre-filtered to this city,
 * which is the same `?destination=` pattern already used by
 * SearchPackagesSection's quick-pick buttons elsewhere in this codebase.
 *
 * If/when there's a real packages data source to query by destination,
 * this is the section to wire it into — swap the CTA card below for an
 * actual filtered package grid.
 */
const RelatedPackages = ({ cityName }) => {
  return (
    <section className="section-shell bg-white">
      <div className="section-container">
        <p className="section-eyebrow">Plan your trip</p>
        <h2 className="mt-3 section-heading">Packages featuring {cityName}</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-dark-500">
          See current itineraries that include {cityName}, or tell us your dates and we'll build one around it.
        </p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link to={`${ROUTES.PACKAGES}?destination=${encodeURIComponent(cityName)}`}>
            <Button size="lg" className="rounded-full bg-dark-800 px-7 text-white hover:bg-dark-900">
              <FaSuitcaseRolling />
              View packages with {cityName}
            </Button>
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800"
          >
            Ask us to build a custom itinerary
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RelatedPackages