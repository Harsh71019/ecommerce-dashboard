import { NextResponse } from 'next/server';

// Constants for URLs
const HOME_URL = 'http://localhost:3000/';
const DASHBOARD_URL = 'http://localhost:3000/dashboard';

export default async function middleware(req) {
  try {
    const url = req.url;
    const authToken = req.cookies.has('authToken');

    if (!authToken && url.includes('/dashboard')) {
      return NextResponse.redirect(HOME_URL);
    }

    if (authToken && url === HOME_URL) {
      return NextResponse.redirect(DASHBOARD_URL);
    }

    // If no redirection needed, allow the request to continue
    return NextResponse.next();
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error('Middleware Error:', error);
    return NextResponse.error();
  }
}
