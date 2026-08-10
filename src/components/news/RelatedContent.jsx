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
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <Link
            key={item._id || item.slug}
            to={`${basePath}/${item.slug}`}
            className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-primary-300 hover:bg-primary-50/70"
          >
            {item[imageKey] && (
              <img
                src={item[imageKey]}
                alt={item[labelKey] || item.name}
                className="h-16 w-16 rounded-3xl object-cover"
              />
            )}
            <span className="text-sm font-semibold text-slate-900 transition group-hover:text-primary-700">
              {item[labelKey] || item.name}
            </span>
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
    <aside className="space-y-6">
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
