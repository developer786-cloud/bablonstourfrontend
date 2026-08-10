import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewsSEO from "../../components/news/NewsSEO";
import NewsSection from "../../components/news/NewsSection";
import RelatedContent from "../../components/news/RelatedContent";
import { fetchNewsBySlug } from "../../services/newService";

const CATEGORY_LABELS = {
  "visa-update": "Visa Update",
  "airline-news": "Airline News",
  "country-news": "Country News",
  "travel-advisory": "Travel Advisory",
  general: "News",
};

const SingleNewsPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setNotFound(false);

    fetchNewsBySlug(slug)
      .then((res) => {
        if (!mounted) return;
        const articleData = res?.data || res;
        setArticle(articleData);
        setRelatedNews(res?.relatedNews || []);
      })
      .catch((err) => {
        if (err?.response?.status === 404) setNotFound(true);
        console.error("Failed to load article:", err);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading)
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-slate-600 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-8 py-6 text-lg font-semibold text-slate-700 shadow-sm">
          Loading news article...
        </div>
      </div>
    );

  if (notFound || !article)
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-slate-600 sm:px-6 lg:px-8">
        <div className="inline-flex flex-col items-center justify-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-8 py-10 text-left shadow-sm sm:text-center">
          <p className="text-xl font-semibold text-slate-950">Article not found</p>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            The story you are looking for may have been moved or removed. Please return to the news listing and try another update.
          </p>
          <Link
            to="/news"
            className="inline-flex rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Back to News
          </Link>
        </div>
      </div>
    );

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "News", url: "/news" },
    { name: article.title, url: `/news/${article.slug}` },
  ];

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const summary = article.seoDescription || article.summary || article.excerpt || "";
  const categoryLabel = CATEGORY_LABELS[article.category] || article.category || "News";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 rounded-full bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <li key={crumb.url} className="flex items-center gap-2">
              {idx > 0 && <span className="text-slate-400">/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-slate-900">{crumb.name}</span>
              ) : (
                <Link to={crumb.url} className="text-slate-600 transition hover:text-primary-700">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section className="space-y-8">
          <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-700">
                  {categoryLabel}
                </span>

                <div className="space-y-4">
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    {article.title}
                  </h1>
                  {summary && <p className="max-w-3xl text-base leading-7 text-slate-600">{summary}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                >
                  Back to News
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>By {article.author || "Editorial Team"}</span>
              {formattedDate && <span>• {formattedDate}</span>}
              {article.sourceName && (
                <span>
                  • Source: {article.sourceUrl ? (
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">
                      {article.sourceName}
                    </a>
                  ) : (
                    article.sourceName
                  )}
                </span>
              )}
            </div>
          </header>

          <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950/5 shadow-card">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-[420px] w-full object-cover object-center sm:h-[500px]"
            />
            {article.caption && (
              <figcaption className="bg-slate-950/90 px-5 py-4 text-sm text-slate-100">
                {article.caption}
              </figcaption>
            )}
          </figure>

          <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
            <div className="space-y-6 text-slate-700">
              <div className="space-y-6 text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {article.tags?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-slate-950">Related content</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Explore nearby packages, blog posts, and destinations connected to this article.
            </p>
          </div>

          <RelatedContent
            relatedDestinations={article.relatedDestinations}
            relatedPackages={article.relatedPackages}
            relatedBlogs={article.relatedBlogs}
          />

          <NewsSection title="Related News" items={relatedNews} viewAllUrl="/news" />
        </aside>
      </article>
    </main>
  );
};

export default SingleNewsPage;