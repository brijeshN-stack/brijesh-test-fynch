import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const URL = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`;
  const res = await fetch(URL);
  const send = await res.json();
  return NextResponse.json(send);
}
