import { Movie, Series, TMDBResponse } from './types';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getTrendingMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  const data = await res.json() as TMDBResponse<Movie>;
  return data.results;
}

export async function getPopularSeries(): Promise<Series[]> {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch popular series');
  }
  const data = await res.json() as TMDBResponse<Series>;
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch top rated movies');
  }
  const data = await res.json() as TMDBResponse<Movie>;
  return data.results;
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return res.json() as Promise<Movie>;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }
  const data = await res.json() as TMDBResponse<Movie>;
  return data.results;
}

export async function searchTvShows(query: string): Promise<Series[]> {
  const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch TV show search results');
  }
  const data = await res.json() as TMDBResponse<Series>;
  return data.results;
}

export async function searchMulti(query: string): Promise<(Movie | Series)[]> {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const errorBody = await res.text(); // Read the response body as text
    console.error('TMDB API Error Status:', res.status);
    console.error('TMDB API Error Body:', errorBody);
    throw new Error(`Failed to fetch multi-search results. Status: ${res.status}, Body: ${errorBody}`);
  }
  const data = await res.json() as TMDBResponse<Movie | Series>; // Adjust type based on actual TMDB multi-search response
  // Filter out results that are not movies or TV shows if necessary, TMDB multi can return people etc.
  return data.results.filter(item => {
    // Add a media_type check, as multi-search includes it
    if ((item as any).media_type === 'movie') return true;
    if ((item as any).media_type === 'tv') return true;
    return false;
  }).map(item => {
    // Ensure the returned items conform to Movie or Series interfaces
    if ((item as any).media_type === 'movie') {
      return item as Movie;
    }
    return item as Series;
  });
}
