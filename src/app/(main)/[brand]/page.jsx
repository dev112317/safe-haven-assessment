/**
 * /app/(main)/[brand]/page.jsx
 * Brand-specific landing page. Loads brand config and displays brand-specific UI.
 * Handles dynamic imports and phone number override via URL param.
 * @todo: Add analytics and tracking hooks.
 */
'use client';
import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useBrand } from '../../../context/BrandContext';
import { pushDataLayer } from '../../../utils/tracking';

// Dynamic import for WeatherWidget (performance)
const WeatherWidget = dynamic(() => import('../../../components/weather-widget'), { ssr: false, loading: () => <div>Loading weather...</div> });

/**
 * Brand Page Component
 */
export default function BrandPage({ params }) {
  const { brand, switchBrand } = useBrand();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState(brand.phone);

  // Handle brand switching on route param
  useEffect(() => {
    if (params.brand && params.brand !== brand.id) {
      switchBrand(params.brand);
    }
    // eslint-disable-next-line
  }, [params.brand]);

  // Track page view with UTM data
  useEffect(() => {
    const utmData = sessionStorage.getItem('attribution');
    const utm = utmData ? JSON.parse(utmData) : {};
    
    pushDataLayer({
      event: 'page_view',
      brand: brand.id,
      zip: searchParams.get('zip'),
      utm_source: utm.source,
      utm_campaign: utm.campaign,
      utm_medium: utm.medium
    });
  }, [brand, searchParams]);

  // Dynamic phone number override via ?source= param
  useEffect(() => {
    const source = searchParams.get('source');
    // Map sources to phone numbers
    const phoneMap = {
      google: '1-800-GOOGLE-AD',
      valpak: '1-800-333-4444',
      facebook: '1-800-FB-LEADS',
    };
    if (source && phoneMap[source]) {
      setPhone(phoneMap[source]);
    } else {
      setPhone(brand.phone);
    }
  }, [searchParams, brand]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{ background: brand.primaryColor + '10' }}>
      <section className="bg-white rounded shadow p-8 max-w-lg w-full mt-8" role="main" aria-labelledby="brand-heading">
        <header className="text-center mb-6">
          <h1 id="brand-heading" className="text-3xl font-bold mb-2" style={{ color: brand.primaryColor }}>{brand.name}</h1>
          <p className="mb-4 text-lg">{brand.ctaText}</p>
          <a href={`tel:${phone}`} className="block text-xl font-semibold text-blue-700 mb-4" aria-label={`Call ${brand.name} at ${phone}`}>{phone}</a>
        </header>
        
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Get a Quote</h2>
          <Suspense fallback={<div>Loading form...</div>}>
            {/* Progressive lead form (dynamic import for performance) */}
            {React.createElement(dynamic(() => import('../../../components/lead-form'), { ssr: false }))}
          </Suspense>
        </section>
        
        <aside className="mt-6" aria-label="Local weather information">
          <WeatherWidget zip={searchParams.get('zip') || ''} />
        </aside>
      </section>
    </main>
  );
} 