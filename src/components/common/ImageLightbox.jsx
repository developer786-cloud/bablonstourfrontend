const ImageLightbox = ({ images = [], index = 0, onClose }) => {
  const image = images[index]
  if (!image) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-4" role="dialog" aria-modal="true">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg bg-white px-4 py-2 text-sm font-black text-slate-950">
        Close
      </button>
      <img src={image.url || image} alt={image.alt || image.caption || ''} className="max-h-[84vh] max-w-full rounded-xl object-contain" />
      {image.caption ? <p className="mt-3 text-center text-sm text-white/75">{image.caption}</p> : null}
    </div>
  )
}

export default ImageLightbox
