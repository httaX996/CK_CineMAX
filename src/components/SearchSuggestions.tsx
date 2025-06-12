'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Suggestion {
  id: number;
  title: string;
  type: 'movie' | 'tv';
  year: number | null;
  poster_path: string | null;
  vote_average: number;
}

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: Suggestion) => void;
  onClose: () => void;
  isVisible: boolean;
}

export default function SearchSuggestions({ query, onSelect, onClose, isVisible }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!isVisible || (!loading && suggestions.length === 0 && query.trim().length >= 2)) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-lg z-50 max-h-96 overflow-y-auto">
      {loading ? (
        <div className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Searching...</span>
          </div>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="py-2">
          {suggestions.map((suggestion) => {
            const href = suggestion.type === 'movie' ? `/movies/${suggestion.id}` : `/tv/${suggestion.id}`;
            return (
              <Link
                key={`${suggestion.type}-${suggestion.id}`}
                href={href}
                onClick={() => {
                  onSelect(suggestion);
                  onClose();
                }}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-all duration-200 border-b border-gray-700/30 last:border-b-0 group"
              >
                <div className="relative w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                  {suggestion.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                      alt={suggestion.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white group-hover:text-amber-400 transition-colors duration-200 truncate text-sm">
                    {suggestion.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {suggestion.year || 'N/A'}
                    </span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-400 uppercase">
                      {suggestion.type}
                    </span>
                    {suggestion.vote_average > 0 && (
                      <>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.116 3.588 1.219 5.271c.276 1.184-.976 2.133-2.063 1.539l-4.816-2.848L6.98 21.352c-1.087.594-2.34-.355-2.063-1.539l1.219-5.271-4.116-3.588c-.887-.76-.415-2.212.749-2.305l5.404-.434L10.788 3.21Z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-yellow-400">
                            {suggestion.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
          
          {query.trim().length >= 2 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="flex items-center justify-center space-x-2 px-4 py-3 hover:bg-white/5 transition-all duration-200 border-t border-gray-700/30 text-amber-400 hover:text-amber-300 group"
            >
              <span className="text-sm font-medium">See all results for &quot;{query}&quot;</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          )}
        </div>
      ) : query.trim().length >= 2 ? (
        <div className="p-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-gray-400 text-sm">No suggestions found</span>
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-amber-400 hover:text-amber-300 text-sm font-medium hover:underline transition-colors duration-200"
            >
              Search anyway
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
