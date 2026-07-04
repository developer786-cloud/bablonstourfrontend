import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const {
    title = 'Untitled article',
    excerpt = 'Travel insight from Bablons Travel.',
    slug = '',
    image,
    category = 'Travel',
    publishedAt,
    readTime,
  } = blog || {}

  const href = slug ? `/blogs/${slug}` : '/blogs'
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(publishedAt))
    : null

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {image ? (
        <Link to={href} className="block aspect-[16/10] overflow-hidden bg-gray-100">
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
        </Link>
      ) : null}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-primary-700">{category}</span>
          {formattedDate ? <span>{formattedDate}</span> : null}
          {readTime ? <span>{readTime}</span> : null}
        </div>
        <h2 className="mt-3 text-xl font-bold text-gray-900">
          <Link to={href} className="hover:text-primary-700">
            {title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-gray-600">{excerpt}</p>
      </div>
    </article>
  )
}

export default BlogCard
