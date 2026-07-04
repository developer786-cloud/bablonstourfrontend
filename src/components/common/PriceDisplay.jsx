import { formatPrice } from '../../utils/formatPrice'

const PriceDisplay = ({ amount, originalAmount, currency = 'INR', note = 'per person' }) => (
  <div>
    <div className="flex flex-wrap items-end gap-2">
      <span className="text-3xl font-black text-dark-900">{formatPrice(amount, currency)}</span>
      {originalAmount && Number(originalAmount) > Number(amount) ? (
        <span className="pb-1 text-sm font-bold text-sand-500 line-through">{formatPrice(originalAmount, currency)}</span>
      ) : null}
    </div>
    {note ? <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-dark-400">{note}</p> : null}
  </div>
)

export default PriceDisplay
