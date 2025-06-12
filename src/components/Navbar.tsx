'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-700/50 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group" title="Go to Homepage">
              <div className="relative">
                <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:via-orange-300 group-hover:to-red-400 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] group-hover:scale-105 transform inline-block font-mono">
                  FLIX
                </span>
                <span className="text-3xl font-black tracking-tight text-white group-hover:text-gray-200 transition-all duration-300 font-mono">
                  ORA
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </Link>
          </div>

          {/* Centered Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-4 lg:px-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows..."
                className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all duration-300 text-sm shadow-lg focus:shadow-amber-500/25 pl-12 backdrop-blur-sm"
              />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-amber-400 transition-all duration-300 hover:scale-110" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation Links (Right side) */}
          <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
            <Link href="/movies" className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm">
              Movies
            </Link>
            <Link href="/tv" className="text-gray-300 hover:text-amber-400 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm">
              TV Shows
            </Link>
          </div>
        </div>

        {/* Mobile Search Form */}
        <form onSubmit={handleSearchSubmit} className="md:hidden pt-3 pb-4 border-t border-gray-700/30">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies or TV shows..."
              className="w-full p-4 pl-12 rounded-xl glass text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all duration-300 text-sm shadow-lg"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
}
