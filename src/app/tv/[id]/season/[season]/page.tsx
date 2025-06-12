import { getTVShowDetails, getSeasonDetails } from '@/lib/tmdb';
import { Episode } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface SeasonPageProps {
    params: Promise<{ id: string; season: string }>;
}

export default async function SeasonPage({ params }: SeasonPageProps) {
    const { id, season } = await params;
    const tvId = parseInt(id);
    const seasonNumber = parseInt(season);

    try {
        const [show, seasonDetails] = await Promise.all([
            getTVShowDetails(tvId),
            getSeasonDetails(tvId, seasonNumber)
        ]);

        if (!show || !seasonDetails) {
            notFound();
        }

        return (
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Header Section */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700/50">
                    <div className="container mx-auto px-4 md:px-8 py-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center space-x-2 text-sm mb-6">
                            <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors">
                                Home
                            </Link>
                            <span className="text-gray-500">/</span>
                            <Link href="/tv" className="text-gray-400 hover:text-amber-400 transition-colors">
                                TV Shows
                            </Link>
                            <span className="text-gray-500">/</span>
                            <Link href={`/tv/${id}`} className="text-gray-400 hover:text-amber-400 transition-colors">
                                {show.name}
                            </Link>
                            <span className="text-gray-500">/</span>
                            <span className="text-amber-400 font-medium">{seasonDetails.name}</span>
                        </nav>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Season Poster */}
                            <div className="flex-shrink-0">
                                <div className="w-48 md:w-56 lg:w-64 mx-auto md:mx-0">
                                    {seasonDetails.poster_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`}
                                            alt={seasonDetails.name}
                                            width={500}
                                            height={750}
                                            className="rounded-xl shadow-2xl w-full h-auto"
                                        />
                                    ) : (
                                        <div className="aspect-[2/3] bg-gray-700 rounded-xl flex items-center justify-center">
                                            <span className="text-gray-400">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Season Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                                    {seasonDetails.name}
                                </h1>
                                <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
                                    {show.name}
                                </h2>
                                
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    {seasonDetails.air_date && (
                                        <span className="text-lg text-gray-300">
                                            {new Date(seasonDetails.air_date).getFullYear()}
                                        </span>
                                    )}
                                    <span className="text-lg text-gray-300">
                                        {seasonDetails.episode_count} Episode{seasonDetails.episode_count !== 1 ? 's' : ''}
                                    </span>
                                    {seasonDetails.vote_average > 0 && (
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-lg">{seasonDetails.vote_average.toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>

                                {seasonDetails.overview && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Overview</h3>
                                        <p className="text-gray-300 leading-relaxed">{seasonDetails.overview}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Episodes Section */}
                <div className="container mx-auto px-4 md:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold">Episodes</h2>
                        <Link 
                            href={`/tv/${id}`}
                            className="text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-2 transition-colors"
                        >
                            <span>Back to Show</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {seasonDetails.episodes.map((episode: Episode) => (
                            <Link key={episode.id} href={`/watch/tv/${tvId}/${seasonNumber}/${episode.episode_number}`}>
                                <div className="glass rounded-xl p-4 md:p-6 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        {/* Episode Still */}
                                        <div className="flex-shrink-0">
                                            <div className="w-full lg:w-80 aspect-video relative rounded-lg overflow-hidden bg-gray-800">
                                                {episode.still_path ? (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                                        alt={episode.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9a2.25 2.25 0 0 0-2.25 2.25v9A2.25 2.25 0 0 0 4.5 18.75Z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                
                                                {/* Play overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="bg-amber-500/90 backdrop-blur-sm rounded-full p-3 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-900">
                                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Episode number badge */}
                                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                                    <span className="text-sm font-bold text-white">
                                                        EP {episode.episode_number}
                                                    </span>
                                                </div>

                                                {/* Runtime badge */}
                                                {episode.runtime && (
                                                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                                        <span className="text-xs font-medium text-white">
                                                            {episode.runtime}m
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Episode Details */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                                                    {episode.name}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                    {episode.air_date && (
                                                        <span>{new Date(episode.air_date).toLocaleDateString()}</span>
                                                    )}
                                                    {episode.vote_average > 0 && (
                                                        <div className="flex items-center space-x-1">
                                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <span>{episode.vote_average.toFixed(1)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {episode.overview && (
                                                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                                    {episode.overview}
                                                </p>
                                            )}

                                            {/* Guest Stars */}
                                            {episode.guest_stars && episode.guest_stars.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Guest Stars</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {episode.guest_stars.slice(0, 5).map((guest) => (
                                                            <span key={guest.credit_id} className="text-xs px-2 py-1 bg-gray-700 rounded-md text-gray-300">
                                                                {guest.name}
                                                            </span>
                                                        ))}
                                                        {episode.guest_stars.length > 5 && (
                                                            <span className="text-xs px-2 py-1 bg-gray-700 rounded-md text-gray-400">
                                                                +{episode.guest_stars.length - 5} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading season details:', error);
        notFound();
    }
}
