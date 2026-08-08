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

  if (loading) return <div className="news-article__loading">Loading...</div>;
  if (notFound || !article) return <div className="news-article__not-found">Article not found.</div>;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "News", url: "/news" },
    { name: article.title, url: `/news/${article.slug}` },
  ];

  return (
    <>
      <NewsSEO
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.summary}
        url={`/news/${article.slug}`}
        image={article.featuredImage}
        article={article}
        breadcrumbs={breadcrumbs}
      />

      <div className="news-article">
        <nav className="news-article__breadcrumb" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.url}>
              {idx > 0 && " / "}
              {idx === breadcrumbs.length - 1 ? (
                <span>{crumb.name}</span>
              ) : (
                <Link to={crumb.url}>{crumb.name}</Link>
              )}
            </span>
          ))}
        </nav>

        <header className="news-article__header">
          <span className="news-article__category">
            {CATEGORY_LABELS[article.category] || article.category}
            {article.country ? ` · ${article.country}` : ""}
          </span>
          <h1 className="news-article__title">{article.title}</h1>
          <div className="news-article__meta">
            <span>By {article.author}</span>
            {article.publishedAt && (
              <span>
                {" · "}
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            {article.sourceName && (
              <span>
                {" · Source: "}
                {article.sourceUrl ? (
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {article.sourceName}
                  </a>
                ) : (
                  article.sourceName
                )}
              </span>
            )}
          </div>
        </header>

        <img src={article.featuredImage} alt={article.title} className="news-article__image" />

        <div className="news-article__content" dangerouslySetInnerHTML={{ __html: article.content }} />

        {article.tags?.length > 0 && (
          <div className="news-article__tags">
            {article.tags.map((tag) => (
              <span key={tag} className="news-article__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <RelatedContent
          relatedDestinations={article.relatedDestinations}
          relatedPackages={article.relatedPackages}
          relatedBlogs={article.relatedBlogs}
        />

        <NewsSection title="Related News" items={relatedNews} />
      </div>
    </>
  );
};

export default SingleNewsPage;
