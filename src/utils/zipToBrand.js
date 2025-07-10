/**
 * zipToBrand.js
 * Utility for mapping ZIP codes to brand IDs for routing and brand selection.
 * @todo: Replace hardcoded mapping with API or DB lookup for scalability.
 */

/**
 * Maps ZIP code to brandId based on state.
 * @param {string} zip - 5-digit ZIP code
 * @returns {string|null} brandId or null if not found
 */
export function zipToBrand(zip) {
  // Simple ZIP prefix mapping for MVP
  const zipMap = {
    // North Carolina (SafeHaven)
    '28': 'safehaven',
    // South Carolina (SafeHaven)
    '29': 'safehaven',
    // Tennessee (SafeHaven)
    '37': 'safehaven', '38': 'safehaven', '39': 'safehaven',
    // Florida (BestSecurity)
    '32': 'bestsecurity', '33': 'bestsecurity', '34': 'bestsecurity',
    // Georgia (TopSecurity)
    '30': 'topsecurity', '31': 'topsecurity',
    // Alabama (RedHawk Alarms)
    '35': 'redhawk', '36': 'redhawk',
  };
  if (!/^[0-9]{5}$/.test(zip)) return null; // Invalid ZIP
  const prefix = zip.slice(0, 2);
  return zipMap[prefix] || null;
} 