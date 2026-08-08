import React from "react";
import { Link } from "react-router-dom";

/**
 * Renders "Related Destinations", "Related Packages", "Related Blogs" blocks.
 * Data comes populated from the News API response (relatedDestinations / relatedPackages / relatedBlogs),
 * which are configured per-article from the Admin News form.
 *
 * Adjust the route prefixes below (/destinations, /packages, /blog) to match your existing routes.
 */
const RelatedBlock = ({ title, items, basePath, imageKey = "thumbnail", labelKey = "title" }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="related-block">
      <h3 className="related-block__title">{title}</h3>
      <div className="related-block__list">
        {items.map((item) => (
          <Link key={item._id} to={`${basePath}/${item.slug}`} className="related-block__item">
            {item[imageKey] && (
              <img src={item[imageKey]} alt={item[labelKey] || item.name} className="related-block__image" />
            )}
            <span>{item[labelKey] || item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const RelatedContent = ({ relatedDestinations, relatedPackages, relatedBlogs }) => {
  const hasAny =
    (relatedDestinations && relatedDestinations.length) ||
    (relatedPackages && relatedPackages.length) ||
    (relatedBlogs && relatedBlogs.length);

  if (!hasAny) return null;

  return (
    <aside className="related-content">
      <RelatedBlock
        title="Related Destinations"
        items={relatedDestinations}
        basePath="/destinations"
        labelKey="name"
      />
      <RelatedBlock title="Related Packages" items={relatedPackages} basePath="/packages" labelKey="title" />
      <RelatedBlock title="Related Blogs" items={relatedBlogs} basePath="/blog" labelKey="title" />
    </aside>
  );
};

export default RelatedContent;
