import { Movie, Series, TMDBResponse, MovieDetails, TVShowDetails, SeasonDetails } from './types';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is not set in environment variables');
}

// Helper function for API calls with error handling
async function apiCall<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`TMDB API Error: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('TMDB API call failed:', error);
    throw error;
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await apiCall<TMDBResponse<Movie>>('/trending/movie/week');
  return data.results;
}

export async function getPopularSeries(): Promise<Series[]> {
  const data = await apiCall<TMDBResponse<Series>>('/tv/popular');
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await apiCall<TMDBResponse<Movie>>('/movie/top_rated');
  return data.results;
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const data = await apiCall<MovieDetails>(`/movie/${id}?append_to_response=credits,videos`);
  return data;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await apiCall<TMDBResponse<Movie>>(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results;
}

export async function searchTvShows(query: string): Promise<Series[]> {
  const data = await apiCall<TMDBResponse<Series>>(`/search/tv?query=${encodeURIComponent(query)}`);
  return data.results;
}

export async function searchMulti(query: string): Promise<(Movie | Series)[]> {
  const data = await apiCall<TMDBResponse<Movie | Series>>(`/search/multi?query=${encodeURIComponent(query)}`);
  // Filter out results that are not movies or TV shows
  return data.results.filter(item => {
    // Add a media_type check, as multi-search includes it
    if ((item as Movie & {media_type: string}).media_type === 'movie') return true;
    if ((item as Series & {media_type: string}).media_type === 'tv') return true;
    return false;
  }).map(item => {
    // Ensure the returned items conform to Movie or Series interfaces
    if ((item as Movie & {media_type: string}).media_type === 'movie') {
      return item as Movie;
    }
    return item as Series;
  });
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  const data = await apiCall<TMDBResponse<Movie>>(`/movie/popular?page=${page}`);
  return data.results;
}

export async function getPopularTvShows(page: number = 1): Promise<Series[]> {
  const data = await apiCall<TMDBResponse<Series>>(`/tv/popular?page=${page}`);
  return data.results;
}

export async function getTopRatedTvShows(page: number = 1): Promise<Series[]> {
  const data = await apiCall<TMDBResponse<Series>>(`/tv/top_rated?page=${page}`);
  return data.results;
}

export async function getUpcomingMovies(page: number = 1): Promise<Movie[]> {
  const data = await apiCall<TMDBResponse<Movie>>(`/movie/upcoming?page=${page}`);
  return data.results;
}

export async function getAiringTodayTvShows(page: number = 1): Promise<Series[]> {
  const data = await apiCall<TMDBResponse<Series>>(`/tv/airing_today?page=${page}`);
  return data.results;
}

export async function getTVShowDetails(id: number): Promise<TVShowDetails> {
  const data = await apiCall<TVShowDetails>(`/tv/${id}?append_to_response=credits,videos,seasons`);
  return data;
}

export async function getSeasonDetails(tvId: number, seasonNumber: number): Promise<SeasonDetails> {
  const data = await apiCall<SeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`);
  return data;
}
