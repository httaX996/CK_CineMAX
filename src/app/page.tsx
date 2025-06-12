import { getPopularSeries, getTopRatedMovies, getTrendingMovies } from "@/lib/tmdb";
import ContentCard from "@/components/ContentCard";
import Section from "@/components/Section";
import Image from "next/image";
import Link from "next/link";
import DynamicHeroBackground from "@/components/DynamicHeroBackground";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();
  const popularSeries = await getPopularSeries();
  const topRatedMovies = await getTopRatedMovies();

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center rounded-b-[3rem] overflow-hidden mb-16 md:mb-20 shadow-2xl">
        <div className="absolute inset-0 w-full h-full">
          <DynamicHeroBackground movies={trendingMovies.slice(0, 5).map(m => ({id: m.id, title: m.title, poster_path: m.poster_path}))} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50"></div>
        </div>
        <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-[0_6px_20px_rgba(245,158,11,0.6)] [filter:_drop-shadow(0_0_30px_rgba(245,158,11,0.4))] animate-fade-in-up">
            Discover Your Next Obsession
          </h1>
          <p className="text-xl sm:text-2xl text-gray-100/95 mb-12 max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Explore millions of movies and TV shows. Find what captivates you next.
          </p>
          
          {/* Featured action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link href="/movies" className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 text-lg shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105 flex items-center space-x-2">
              <span>Browse Movies</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/tv" className="group px-8 py-4 glass border-2 border-amber-500/30 text-white font-bold rounded-xl hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 text-lg shadow-xl transform hover:scale-105 flex items-center space-x-2">
              <span>Watch TV Shows</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Section title="🔥 Trending This Week">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
            {trendingMovies.slice(0,14).map((movie) => (
              <ContentCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        </Section>

        <Section title="📺 Popular TV Shows">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
            {popularSeries.slice(0,14).map((series) => (
              <ContentCard key={series.id} item={series} type="tv" />
            ))}
          </div>
        </Section>
        
        <Section title="⭐ Top Rated Movies">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
            {topRatedMovies.slice(0,14).map((movie) => (
              <ContentCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
