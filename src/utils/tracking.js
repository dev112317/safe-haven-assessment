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
  
  console.log('🔍 captureUTM called');
  console.log('🔍 Current URL:', window.location.href);
  console.log('🔍 URL search params:', window.location.search);
  console.log('🔍 Full URL object:', window.location);
  
  const params = new URLSearchParams(window.location.search);
  console.log('🔍 URLSearchParams object:', params);
  console.log('🔍 All params:', Array.from(params.entries()));
  
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
  };
  
  console.log('🔍 Parsed UTM data:', utm);
  sessionStorage.setItem('attribution', JSON.stringify(utm));
  
  // Log UTM data for debugging
  console.log('🔍 UTM Tracking Captured:', utm);
  console.log('🔍 SessionStorage set:', sessionStorage.getItem('attribution'));
}

/**
 * Pushes an event to the global dataLayer for analytics (GA4/GTM).
 * @param {object} eventObj - Event data to push
 */
export function pushDataLayer(eventObj) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventObj);
  
  // Log tracking events for debugging
  console.log('📊 Tracking Event:', eventObj);
} 