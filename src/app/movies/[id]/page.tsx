import { getMovieDetails } from '@/lib/tmdb';
import { MovieDetails, CastMember, CrewMember, Video, Genre, ProductionCompany } from '@/lib/types';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';

interface MovieDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
    const { id } = await params;
    const movie: MovieDetails = await getMovieDetails(parseInt(id));

    if (!movie) {
        return <div className="container mx-auto px-4 py-8 text-white">Movie not found</div>;
    }

    const director = movie.credits.crew.find((person: CrewMember) => person.job === 'Director');
    const trailer = movie.videos.results.find((video: Video) => video.type === 'Trailer' && video.site === 'YouTube');
    const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
    const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section with Background Image */}
            <div
                className="relative h-[50vh] md:h-[70vh] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 1)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-lg">{movie.release_date?.substring(0, 4)}</span>
                        {movie.runtime && (
                             <span className="text-lg">
                                {runtimeHours > 0 && `${runtimeHours}h `}
                                {runtimeMinutes > 0 && `${runtimeMinutes}m`}
                            </span>
                        )}
                        <span className="border border-white px-2 py-0.5 rounded text-sm">
                            {movie.adult ? '18+' : 'PG-13'}
                        </span>
                        <div className="flex items-center space-x-1">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-lg">{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                    <p className="text-lg md:w-2/3 lg:w-1/2 mb-6 hidden md:block">{movie.overview}</p>
                    <div className="flex space-x-4">
                        <Link href={`/watch/movie/${movie.id}`}>
                            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                </svg>
                                <span>Play</span>
                            </button>
                        </Link>
                        {trailer && (
                            <Link href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank">
                                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9a2.25 2.25 0 0 0-2.25 2.25v9A2.25 2.25 0 0 0 4.5 18.75Z" />
                                    </svg>
                                    <span>Trailer</span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 md:px-8 py-8">
                {/* Overview for mobile */}
                <div className="md:hidden mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                    <p className="text-base">{movie.overview}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column / Main Info */}
                    <div className="md:col-span-2">
                        {/* Genres */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre: Genre) => (
                                    <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Director */}
                        {director && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Director</h3>
                                <p>{director.name}</p>
                            </div>
                        )}

                        {/* Cast */}
                        {movie.credits.cast && movie.credits.cast.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3">Top Cast</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {movie.credits.cast.slice(0, 10).map((actor: CastMember) => (
                                        <div key={actor.credit_id} className="text-center">
                                            {actor.profile_path ? (
                                                <div className="w-[100px] h-[150px] mx-auto mb-1">
                                                    <OptimizedImage
                                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                                        alt={actor.name}
                                                        width={185}
                                                        height={278}
                                                        className="rounded-lg"
                                                        aspectRatio="2/3"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-[100px] h-[150px] bg-gray-700 rounded-lg mx-auto flex items-center justify-center mb-1">
                                                    <span className="text-xs text-gray-400">No Image</span>
                                                </div>
                                            )}
                                            <p className="text-sm font-medium">{actor.name}</p>
                                            <p className="text-xs text-gray-400">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column / Additional Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Details</h3>
                        <div className="space-y-2 text-sm">
                            <p><strong>Status:</strong> {movie.status}</p>
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                            {movie.budget > 0 && <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>}
                            {movie.revenue > 0 && <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>}
                            <p><strong>Original Language:</strong> {movie.original_language?.toUpperCase()}</p>
                            {movie.imdb_id && <p><strong>IMDB:</strong> <Link href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" className="text-red-400 hover:underline">View on IMDB</Link></p>}
                        </div>

                        {/* Production Companies */}
                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-3">Production</h3>
                                <div className="flex flex-wrap gap-2">                                        {movie.production_companies.map((company: ProductionCompany) => (
                                            company.logo_path ? (
                                                <div key={company.id} className="flex items-center gap-1.5 px-2 py-1 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors" title={company.name}>
                                                    <OptimizedImage
                                                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                                        alt={company.name}
                                                        width={20}
                                                        height={20}
                                                        className="object-contain h-4 w-auto max-w-6"
                                                    />
                                                    <span className="text-xs font-medium text-gray-200">{company.name}</span>
                                                </div>
                                            ) : (
                                                <span key={company.id} className="text-xs px-2 py-1 bg-gray-800 rounded-md font-medium text-gray-200 hover:bg-gray-700 transition-colors">
                                                    {company.name}
                                                </span>
                                            )
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Collection */}
                        {movie.belongs_to_collection && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-3">Part of Collection</h3>
                                <div className="bg-gray-800 rounded-lg p-3">
                                    <p className="text-sm">{movie.belongs_to_collection.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
