/**
 * /app/(router)/zip-router/page.jsx
 * Page for ZIP code input and routing to brand-specific page.
 * Handles ZIP validation, error states, and redirects.
 * @todo: Add geolocation fallback for user convenience.
 */
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zipToBrand } from '../../../utils/zipToBrand';

/**
 * ZIP Router Page Component
 */
export default function ZipRouterPage() {
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  /**
   * Handles ZIP form submission and redirects to brand page.
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Validate ZIP (5 digits)
    if (!/^[0-9]{5}$/.test(zip)) {
      setError('Please enter a valid 5-digit ZIP code.');
      return;
    }
    const brandId = zipToBrand(zip);
    if (!brandId) {
      setError('Sorry, we do not serve your area yet.');
      return;
    }
    // Redirect to brand page
    router.push(`/brand/${brandId}?zip=${zip}`);
  };

  // @todo: Add geolocation fallback for user convenience

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <label htmlFor="zip" className="block text-lg font-semibold mb-2">Enter your ZIP code</label>
        <input
          id="zip"
          name="zip"
          type="text"
          value={zip}
          onChange={e => setZip(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={5}
          inputMode="numeric"
          autoComplete="postal-code"
        />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Continue</button>
      </form>
    </main>
  );
} 