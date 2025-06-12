import { NextResponse } from 'next/server';
import { searchMulti } from '@/lib/tmdb';
import { Movie, Series } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await searchMulti(query);
    // Return only the first 5 results for suggestions with essential info
    const suggestions = results.slice(0, 5).map((item: Movie | Series) => {
      const type = 'title' in item ? 'movie' : 'tv';
      const title = type === 'movie' ? (item as Movie).title : (item as Series).name;
      const releaseDate = type === 'movie' ? (item as Movie).release_date : (item as Series).first_air_date;
      const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
      
      return {
        id: item.id,
        title,
        type,
        year,
        poster_path: item.poster_path,
        vote_average: item.vote_average
      };
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('[API_SUGGESTIONS_ERROR]', error);
    return NextResponse.json([]);
  }
}
