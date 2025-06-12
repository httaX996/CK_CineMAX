import Image from 'next/image';
import Link from 'next/link';
import { Movie, Series } from '@/lib/types';

interface ContentCardProps {
  item: Movie | Series;
  type: 'movie' | 'tv';
}

export default function ContentCard({ item, type }: ContentCardProps) {
  const title = type === 'movie' ? (item as Movie).title : (item as Series).name;
  const releaseDate = type === 'movie' ? (item as Movie).release_date : (item as Series).first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';

  // Ensure URL uses correct plural form for movies
  const baseUrl = type === 'movie' ? '/movies' : '/tv';

  return (
    <Link href={`${baseUrl}/${item.id}`} className="block group">
      <div className="glass rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-105 border border-gray-700/50 hover:border-amber-500/30 animate-fade-in-up">
        <div className="relative aspect-[2/3] overflow-hidden">
          {item.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 15vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
            <div className="bg-amber-500/90 backdrop-blur-sm rounded-full p-3 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-900">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Rating badge */}
          {item.vote_average > 0 && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.116 3.588 1.219 5.271c.276 1.184-.976 2.133-2.063 1.539l-4.816-2.848L6.98 21.352c-1.087.594-2.34-.355-2.063-1.539l1.219-5.271-4.116-3.588c-.887-.76-.415-2.212.749-2.305l5.404-.434L10.788 3.21Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-white">{item.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-amber-400 transition-colors duration-300 leading-tight" title={title}>
            {title}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400 font-medium">{year}</p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">{type}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
