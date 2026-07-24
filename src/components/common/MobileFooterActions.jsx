import { NavLink, useLocation } from 'react-router-dom'
import { FaBriefcase, FaCompass, FaHome, FaSuitcaseRolling } from 'react-icons/fa'
import { ROUTES } from '../../constants/routes'
import { getWhatsAppUrl } from './WhatsAppButton'

const mobileFooterActions = [
  { label: 'Home', icon: FaHome, path: ROUTES.HOME, type: 'route' },
  { label: 'Packages', icon: FaBriefcase, path: ROUTES.PACKAGES, type: 'route' },
  { label: 'Destination', icon: FaCompass, path: ROUTES.DESTINATIONS, type: 'route' },
  {
    label: 'Book a Tour',
    icon: FaSuitcaseRolling,
    path: getWhatsAppUrl({ message: 'Hi Bablons Travel, I need help planning my trip.' }),
    type: 'external',
  },
]

const actionClass =
  'group flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[1.05rem] px-1 py-2.5 text-[0.67rem] font-black leading-none transition duration-200'

const MobileFooterActions = () => {
  const { pathname } = useLocation()
  const isPackageDetails = pathname.startsWith(`${ROUTES.PACKAGES}/`)

  if (isPackageDetails) return null

  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-white/70 bg-white/92 px-2 pb-[calc(0.55rem+env(safe-area-inset-bottom,0px))] pt-2 shadow-[0_-18px_42px_rgba(16,39,36,0.16)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-1.5 rounded-[1.35rem] border border-sand-200/80 bg-gradient-to-b from-white to-[#fff8ef] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        {mobileFooterActions.map((item) => {
          const Icon = item.icon
          const isPrimaryAction = item.label === 'Book a Tour'

          if (item.type === 'external') {
            return (
              <a
                key={item.label}
                href={item.path}
                target={isPrimaryAction ? '_blank' : undefined}
                rel={isPrimaryAction ? 'noreferrer' : undefined}
                className={`${actionClass} ${
                  isPrimaryAction
                    ? 'bg-gradient-to-br from-accent-400 to-secondary-600 text-white shadow-[0_10px_24px_rgba(217,111,58,0.26)] hover:-translate-y-0.5'
                    : 'text-primary-900 hover:bg-white hover:text-secondary-600'
                }`}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-full ${isPrimaryAction ? 'bg-white/18' : 'bg-primary-900/6 text-primary-900 group-hover:bg-secondary-50 group-hover:text-secondary-600'}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="max-w-full truncate">{item.label}</span>
              </a>
            )
          }

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === ROUTES.HOME}
              className={({ isActive }) =>
                `${actionClass} ${
                  isActive
                    ? 'bg-primary-900 text-white shadow-[0_10px_22px_rgba(9,50,79,0.2)]'
                    : 'text-primary-900 hover:bg-white hover:text-secondary-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${isActive ? 'bg-white/14 text-white' : 'bg-primary-900/6 text-primary-900 group-hover:bg-secondary-50 group-hover:text-secondary-600'}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="max-w-full truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileFooterActions
