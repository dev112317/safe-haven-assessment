/**
 * lead-form.jsx
 * Progressive lead form for capturing user info and service interest.
 * Integrates Google Maps Places Autocomplete for address field.
 * Uses React Hook Form for state management and localStorage for persistence.
 * @todo: Add step-by-step UX and validation improvements.
 */
'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { pushDataLayer } from '../utils/tracking';

// @todo: Replace with env var in production
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

/**
 * Loads Google Maps script dynamically if not already present.
 */
function loadGoogleMapsScript() {
  if (typeof window === 'undefined' || window.google) return;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * LeadForm component
 */
export default function LeadForm() {
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = loadFromStorage('leadForm');
    if (saved) reset(saved);
  }, [reset]);

  // Persist form data to localStorage on change
  useEffect(() => {
    const subscription = watch((value) => saveToStorage('leadForm', value));
    return () => subscription.unsubscribe();
  }, [watch]);

  // Google Maps Places Autocomplete for address
  useEffect(() => {
    loadGoogleMapsScript();
    let autocomplete;
    const timer = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(timer);
        const input = document.getElementById('address');
        if (input) {
          autocomplete = new window.google.maps.places.Autocomplete(input, { types: ['address'] });
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            setValue('address', place.formatted_address || input.value);
          });
        }
      }
    }, 500);
    return () => clearInterval(timer);
  }, [setValue]);

  /**
   * Handles form submission.
   * @param {object} data
   */
  const onSubmit = (data) => {
    // Get UTM data from session
    const utmData = sessionStorage.getItem('attribution');
    const utm = utmData ? JSON.parse(utmData) : {};
    
    // Track lead submission
    pushDataLayer({
      event: 'lead_submitted',
      brand: 'current_brand', // You can get this from context
      zip: data.zip,
      service_type: data.serviceType,
      utm_source: utm.source,
      utm_campaign: utm.campaign,
      utm_medium: utm.medium
    });
    
    // @todo: Send to CRM API
    alert('Lead submitted!');
    saveToStorage('leadForm', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input 
        {...register('name', { required: true })} 
        placeholder="Name" 
        className="w-full border rounded px-3 py-2" 
        aria-label="Full name"
        aria-required="true"
      />
      <input 
        {...register('email', { required: true })} 
        type="email" 
        placeholder="Email" 
        className="w-full border rounded px-3 py-2" 
        aria-label="Email address"
        aria-required="true"
      />
      <input 
        {...register('phone', { required: true })} 
        type="tel" 
        placeholder="Phone" 
        className="w-full border rounded px-3 py-2" 
        aria-label="Phone number"
        aria-required="true"
      />
      <input 
        {...register('zip', { required: true })} 
        placeholder="ZIP" 
        className="w-full border rounded px-3 py-2" 
        maxLength={5} 
        aria-label="ZIP code"
        aria-required="true"
      />
      <input 
        {...register('address', { required: true })} 
        id="address" 
        placeholder="Address" 
        className="w-full border rounded px-3 py-2" 
        autoComplete="off" 
        aria-label="Street address"
        aria-required="true"
      />
      <select 
        {...register('serviceType', { required: true })} 
        className="w-full border rounded px-3 py-2"
        aria-label="Service type selection"
        aria-required="true"
      >
        <option value="">Select Service Type</option>
        <option value="residential">Residential Security</option>
        <option value="commercial">Commercial Security</option>
        <option value="monitoring">24/7 Monitoring</option>
      </select>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        aria-label="Submit lead form"
      >
        Submit
      </button>
    </form>
  );
} 