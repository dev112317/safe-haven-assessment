/**
 * storage.js
 * Utility helpers for localStorage/sessionStorage for persisting form data and user preferences.
 * @todo: Add expiration and error handling for storage operations.
 */

/**
 * Save data to localStorage.
 * @param {string} key
 * @param {any} value
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // @todo: Add error reporting
  }
}

/**
 * Load data from localStorage.
 * @param {string} key
 * @returns {any|null}
 */
export function loadFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
} 