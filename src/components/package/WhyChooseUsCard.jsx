import { FaHeadset, FaShieldHeart, FaUserCheck } from 'react-icons/fa6'

const benefits = [
  [FaUserCheck, 'Verified travel planning'],
  [FaShieldHeart, 'Transparent pricing'],
  [FaHeadset, 'Support before and during travel'],
]

const WhyChooseUsCard = () => (
  <aside className="rounded-card-sm border border-sand-200 bg-white p-5 shadow-card">
    <h3 className="font-display text-2xl font-bold text-dark-900">Why Choose Bablons</h3>
    <div className="mt-4 space-y-3">
      {benefits.map(([Icon, label]) => (
        <div key={label} className="flex items-center gap-3 rounded-xl bg-sand-50 p-3">
          <Icon className="text-secondary-500" />
          <p className="text-sm font-bold text-dark-700">{label}</p>
        </div>
      ))}
    </div>
  </aside>
)

export default WhyChooseUsCard
