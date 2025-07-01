/**
 * weather-widget.jsx
 * Weather widget that fetches and displays current weather using OpenWeather API based on ZIP code.
 * Handles loading and error states gracefully.
 * @todo: Add more detailed weather info and icons.
 */
'use client';
import React, { useEffect, useState } from 'react';

// @todo: Replace with env var in production
const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';

/**
 * WeatherWidget component
 * @param {object} props
 * @param {string} props.zip - ZIP code for weather lookup
 */
export default function WeatherWidget({ zip }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!zip || zip.length !== 5) return;
    setLoading(true);
    setError('');
    setWeather(null);
    // Fetch weather from OpenWeather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${OPENWEATHER_API_KEY}&units=imperial`)
      .then(res => {
        if (!res.ok) throw new Error('Weather not found');
        return res.json();
      })
      .then(data => {
        setWeather({
          temp: data.main.temp,
          desc: data.weather[0].description,
          city: data.name
        });
      })
      .catch(err => {
        setError('Unable to fetch weather.');
      })
      .finally(() => setLoading(false));
  }, [zip]);

  if (!zip || zip.length !== 5) return null;
  if (loading) return <div>Loading weather...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!weather) return null;

  return (
    <div className="bg-blue-50 rounded p-3 text-sm text-blue-900">
      <div className="font-semibold">Weather for {weather.city}:</div>
      <div>{weather.temp}&deg;F, {weather.desc}</div>
    </div>
  );
} 