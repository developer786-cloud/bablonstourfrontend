import { useState } from 'react'
import { toast } from 'react-toastify'
import { uploadService } from '../../services/uploadService'

const ImageUploader = ({ onUploaded, buttonLabel = 'Upload' }) => {
  const [file, setFile] = useState(null)
  const [folder, setFolder] = useState('packages')
  const [alt, setAlt] = useState('')
  const [progress, setProgress] = useState(0)
  const [uploaded, setUploaded] = useState(null)

  const upload = async () => {
    try {
      if (!file) return toast.error('Please select an image')
      const formData = new FormData()
      formData.append('image', file)
      formData.append('folder', folder)
      formData.append('alt', alt)
      const image = await uploadService.image(formData, (event) => setProgress(Math.round((event.loaded * 100) / event.total)))
      setUploaded(image)
      onUploaded?.(image)
      toast.success('Image uploaded')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image upload failed')
    }
  }

  const remove = async () => {
    if (!uploaded?.publicId) return
    try {
      await uploadService.remove(uploaded.publicId)
      setUploaded(null)
      setProgress(0)
      toast.success('Image deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image delete failed')
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-4">
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setFile(event.target.files?.[0])} className="rounded-lg border border-slate-200 p-2 text-sm md:col-span-2" />
        <select value={folder} onChange={(event) => setFolder(event.target.value)} className="rounded-lg border border-slate-200 p-2 text-sm">
          <option value="packages">Packages</option>
          <option value="destinations">Destinations</option>
          <option value="testimonials">Testimonials</option>
          <option value="blogs">Blogs</option>
        </select>
        <button type="button" onClick={upload} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">{buttonLabel}</button>
      </div>
      <input value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Alt text" className="mt-3 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm" />
      {progress ? <div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-orange-500" style={{ width: `${progress}%` }} /></div> : null}
      {uploaded ? (
        <div className="mt-4 flex items-center gap-4">
          <img src={uploaded.url} alt={uploaded.alt} className="h-20 w-28 rounded-lg object-cover" />
          <button type="button" onClick={() => navigator.clipboard.writeText(uploaded.url)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">Copy URL</button>
          <button type="button" onClick={remove} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-600">Delete</button>
        </div>
      ) : null}
    </div>
  )
}

export default ImageUploader
