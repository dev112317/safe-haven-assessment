/**
 * /api/lead/route.js
 * Mock API endpoint for lead form submissions to CRM.
 * Returns success or error for MVP testing.
 * @todo: Integrate with real CRM or email service.
 */
import { NextResponse } from 'next/server';

/**
 * POST /api/lead
 * @param {Request} req
 * @returns {Response}
 */
export async function POST(req) {
  try {
    const data = await req.json();
    // @todo: Validate data and save to DB/CRM
    return NextResponse.json({ success: true, message: 'Lead received', data });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
} 