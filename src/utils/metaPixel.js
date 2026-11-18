/**
 * Thin wrapper around the Meta Pixel loaded in index.html.
 *
 * The snippet in index.html fires the first PageView. Because this is a
 * single-page app, later page changes don't reload the document, so
 * RouteTracker calls trackPageView() on each new path. Every call is a
 * no-op if the Pixel is missing (blocked by an ad blocker, for example).
 */

// The path the index.html snippet already counted.
let lastTrackedPath = typeof window === 'undefined' ? null : window.location.pathname

function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

/** Sends PageView for a new path; repeated calls for the same path are ignored. */
export function trackPageView(pathname) {
  if (pathname === lastTrackedPath) return
  lastTrackedPath = pathname
  fbq('track', 'PageView')
}

/** Sends a standard Meta event, e.g. trackEvent('Lead', { content_name: 'Business website' }). */
export function trackEvent(name, params) {
  fbq('track', name, params)
}
