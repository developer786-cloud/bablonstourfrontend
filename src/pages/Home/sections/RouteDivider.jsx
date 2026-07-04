/**
 * RouteDivider — the page's signature visual device.
 *
 * Bablons sells routes, not rooms: "Tashkent → Samarkand → Bukhara",
 * "Tbilisi → Kazbegi → Kakheti." Rather than another rounded-card-with-
 * shadow section break, this renders a thin dashed path with a pulsing
 * waypoint dot — visually tying back to every "→" already used in the
 * package copy. Used once between Destinations and Featured Packages,
 * where the page shifts from "where" to "what's included" — not
 * repeated elsewhere, so it stays a signature rather than wallpaper.
 *
 * Decorative only: aria-hidden, and respects prefers-reduced-motion via
 * the .route-dot animation rule in globals.css.
 */
const RouteDivider = () => {
  return (
    <div className="route-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 32 Q 300 4, 600 32 T 1200 32" />
      </svg>
      <span className="route-dot absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400 shadow-[0_0_0_4px_rgba(240,195,106,0.25)]" />
    </div>
  )
}

export default RouteDivider