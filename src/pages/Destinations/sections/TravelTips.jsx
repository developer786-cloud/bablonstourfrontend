import { FaCalendarAlt, FaClock, FaCoins, FaLanguage } from 'react-icons/fa'

const tipItems = [
  { key: 'bestTime', icon: FaCalendarAlt, label: 'Best time to visit' },
  { key: 'currency', icon: FaCoins, label: 'Currency' },
  { key: 'language', icon: FaLanguage, label: 'Language' },
  { key: 'timezone', icon: FaClock, label: 'Timezone' },
]

const TravelTips = ({ travelTips, countryName }) => {
  const tips = travelTips || {}

  return (
    <section className="section-shell bg-ivory">
      <div className="section-container">
        <p className="section-eyebrow">Good to know</p>
        <h2 className="mt-3 section-heading">Travel tips for {countryName}</h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tipItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-card">
                <Icon className="h-5 w-5 text-primary-600" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-dark-400">{item.label}</p>
                <p className="mt-1.5 font-bold text-dark-900">{tips[item.key] || 'Confirmed during planning'}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TravelTips
