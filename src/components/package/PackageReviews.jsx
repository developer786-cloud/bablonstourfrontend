import RatingStars from '../common/RatingStars'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const PackageReviews = ({ reviews = [], averageRating = 0, reviewCount = 0 }) => (
  <SectionCard>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <SectionHeading title="Traveler Reviews" description={reviewCount ? `${reviewCount} reviews from Bablons travelers.` : 'Reviews will appear here after verified travelers share feedback.'} />
      <button type="button" disabled className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-black text-slate-400">Write a review</button>
    </div>
    {reviewCount ? (
      <div className="mb-5"><RatingStars rating={averageRating} count={reviewCount} /></div>
    ) : null}
    {reviews.length ? (
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review, index) => (
          <article key={`${review.name}-${index}`} className="rounded-xl bg-slate-50 p-4">
            <RatingStars rating={review.rating} />
            <p className="mt-3 leading-7 text-slate-600">{review.review}</p>
            <p className="mt-4 font-black text-slate-950">{review.name}</p>
            <p className="text-sm text-slate-500">{review.city} {review.date ? `- ${new Date(review.date).toLocaleDateString()}` : ''}</p>
          </article>
        ))}
      </div>
    ) : (
      <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">No reviews yet.</div>
    )}
  </SectionCard>
)

export default PackageReviews
