import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const place_id = searchParams.get('place_id');
  const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`;
  const res = await fetch(URL);
  const send = await res.json();
  return NextResponse.json(send);
}
