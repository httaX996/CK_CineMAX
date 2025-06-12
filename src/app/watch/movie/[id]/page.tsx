import { getMovieDetails } from '@/lib/tmdb';
import { MovieDetails } from '@/lib/types';
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface WatchMoviePageProps {
    params: Promise<{ id: string }>;
}

export default async function WatchMoviePage({ params }: WatchMoviePageProps) {
    const { id } = await params;
    const movieId = parseInt(id);
    
    try {
        const movie: MovieDetails = await getMovieDetails(movieId);

        if (!movie) {
            notFound();
        }

        return (
            <div className="relative h-screen w-screen bg-black">
                {/* Floating Navigation Bar */}
                <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center justify-between p-4">
                        <Link 
                            href={`/movies/${id}`}
                            className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-medium">Back to Details</span>
                        </Link>
                        
                        <div className="text-white text-center">
                            <h1 className="text-lg md:text-xl font-bold">{movie.title}</h1>
                            <p className="text-sm text-gray-300">
                                {movie.release_date?.substring(0, 4)}{movie.runtime && ` • ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                            </p>
                        </div>
                        
                        <div className="w-24"></div> {/* Spacer for centering */}
                    </div>
                </div>

                {/* Video Player - Full Screen */}
                <VideoPlayer
                    type="movie"
                    tmdbId={movieId}
                    className="h-screen w-screen"
                    color="F59E0B"
                    backdropPath={movie.backdrop_path}
                    title={movie.title}
                    autoStart={true}
                />
            </div>
        );
    } catch (error) {
        console.error('Error loading movie details:', error);
        notFound();
    }
}
