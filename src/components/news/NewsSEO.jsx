import React from "react";

const Helmet = ({ children }) => <>{children}</>;

const SITE_NAME = "Bablons Travel & Entertainment"; // TODO: pull from existing site config/env if available
const SITE_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) || "https://www.example.com";

/**
 * NewsSEO
 * Handles all SEO tags for both the /news listing page and single article pages.
 *
 * For listing pages, pass only title/description/url.
 * For single article pages, pass the full `article` object to emit Article + Breadcrumb schema.
 */
const NewsSEO = ({ title, description, url, image, article, breadcrumbs = [] }) => {
  const canonicalUrl = `${SITE_URL}${url}`;
  const ogImage = image || `${SITE_URL}/og-default.jpg`;

  const breadcrumbSchema = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.url}`,
        })),
      }
    : null;

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.seoTitle || article.title,
        description: article.seoDescription || article.summary,
        image: [article.featuredImage],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
          "@type": "Person",
          name: article.author || "Editorial Team",
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      }
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      {article?.publishedAt && (
        <meta property="article:published_time" content={article.publishedAt} />
      )}
      {article?.category && <meta property="article:section" content={article.category} />}
      {article?.tags?.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Keywords (legacy, still fine to include) */}
      {article?.keywords?.length > 0 && (
        <meta name="keywords" content={article.keywords.join(", ")} />
      )}

      {/* JSON-LD */}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
};

export default NewsSEO;
