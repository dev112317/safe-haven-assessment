/**
 * /api/zip-router/route.js
 * API route to return brand config based on ZIP code.
 * Used for ZIP-based routing and brand switching.
 * @todo: Integrate with real geolocation API for production.
 */
import { NextResponse } from 'next/server';
import brands from '../../../config/brands.json';
import { zipToBrand } from '../../../utils/zipToBrand';

/**
 * GET /api/zip-router?zip=XXXXX
 * @param {Request} req
 * @returns {Response}
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const zip = searchParams.get('zip');
  if (!zip) {
    return NextResponse.json({ error: 'ZIP code required' }, { status: 400 });
  }
  const brandId = zipToBrand(zip);
  if (!brandId) {
    return NextResponse.json({ error: 'Invalid or unsupported ZIP' }, { status: 404 });
  }
  const brand = Object.values(brands).find(b => b.id === brandId);
  if (!brand) {
    return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
  }
  // Return only public config fields
  return NextResponse.json({ brand });
} 