export const getHotelPrice = (hotel, currency = 'INR') => {
  const code = String(currency || 'INR').toUpperCase()
  if (code === 'USD') return Number(hotel?.priceUsd ?? hotel?.price ?? 0)
  return Number(hotel?.priceInr ?? hotel?.price ?? 0)
}
