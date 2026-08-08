import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { ROUTES } from '../../constants/routes';

const Breadcrumb = ({ country, cityName }) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/60">
    <Link to={ROUTES.HOME} className="transition hover:text-white">Home</Link>
    <FaChevronRight className="h-2.5 w-2.5 shrink-0" />
    <Link to={ROUTES.DESTINATIONS} className="transition hover:text-white">Destinations</Link>
    {country?.name ? (
      <>
        <FaChevronRight className="h-2.5 w-2.5 shrink-0" />
        {country.slug ? (
          <Link to={`${ROUTES.DESTINATIONS}#${country.slug}`} className="transition hover:text-white">{country.name}</Link>
        ) : (
          <span>{country.name}</span>
        )}
      </>
    ) : null}
    <FaChevronRight className="h-2.5 w-2.5 shrink-0" />
    <span aria-current="page" className="text-white/85">{cityName}</span>
  </nav>
);

export default Breadcrumb;
