import { FaStar } from 'react-icons/fa6'

const RatingStars = ({ rating = 5, count, label }) => {
  const value = Math.max(0, Math.min(Number(rating || 0), 5))

  return (
    <div className="flex items-center gap-2" aria-label={label || `${value} out of 5 stars`}>
      <div className="flex text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar key={index} className={index < Math.round(value) ? 'h-4 w-4' : 'h-4 w-4 text-slate-300'} aria-hidden="true" />
        ))}
      </div>
      {count !== undefined ? <span className="text-sm font-bold text-slate-600">{value.toFixed(1)} ({count})</span> : null}
    </div>
  )
}

export default RatingStars
