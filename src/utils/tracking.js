/**
 * tracking.js
 * Utility for UTM parameter capture and dataLayer event pushing for analytics.
 * @todo: Add more robust attribution and event types as needed.
 */

/**
 * Captures UTM parameters from the URL and stores them in sessionStorage.
 */
export function captureUTM() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
  };
  sessionStorage.setItem('attribution', JSON.stringify(utm));
}

/**
 * Pushes an event to the global dataLayer for analytics (GA4/GTM).
 * @param {object} eventObj - Event data to push
 */
export function pushDataLayer(eventObj) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventObj);
} 