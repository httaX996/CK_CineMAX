// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import { searchMulti as tmdbSearchMulti } from '@/lib/tmdb'; // Renamed to avoid confusion

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const results = await tmdbSearchMulti(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error('[API_SEARCH_ERROR]', error);
    // Ensure the error object is serializable or extract message
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch search results from TMDB', details: errorMessage }, { status: 500 });
  }
}
