const formatPrice = (amount = 0, currency = 'INR') => {
  const code = String(currency || 'INR').toUpperCase()
  const locale = code === 'USD' ? 'en-US' : 'en-IN'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0))
}

export { formatPrice }
