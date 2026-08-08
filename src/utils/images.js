export const buildSrcSet = (url) => {
  if (!url) return ''
  const widths = [400, 800, 1200, 1600]
  return widths.map((w) => `${url}?w=${w} ${w}w`).join(', ')
}

export const buildSizesForGallery = () => '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

export const buildSizesForHero = () => '100vw'

export const buildPlaceholder = (url, opts = {}) => {
  if (!url) return ''
  // create a tiny blurred placeholder via query params; cloud provider should honor these
  const q = opts.q || 20
  const w = opts.w || 20
  const blur = opts.blur || 200
  return `${url}?w=${w}&q=${q}&blur=${blur}&fm=jpg`
}
