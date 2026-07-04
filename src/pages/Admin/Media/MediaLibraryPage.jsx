import ImageUploader from '../../../components/admin/ImageUploader'

const MediaLibraryPage = () => (
  <div className="space-y-4">
    <div><h1 className="text-2xl font-black">Media Library</h1><p className="text-sm text-slate-500">Upload Cloudinary images and copy their URLs.</p></div>
    <ImageUploader />
  </div>
)

export default MediaLibraryPage
