'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Movie, Series } from '@/lib/types';
import ContentCard from '@/components/ContentCard';
import Section from '@/components/Section';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<(Movie | Series)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => {
          if (!res.ok) {
            return res.json().then(errData => {
              throw new Error(errData.details || errData.error || `Request failed with status ${res.status}`);
            }).catch(() => {
              throw new Error(`Request failed with status ${res.status}`);
            });
          }
          return res.json();
        })
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err.message || 'Failed to fetch search results. Please try again.');
          setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="glass rounded-3xl p-12 max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-gray-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">Search Flixora</h1>
          <p className="text-gray-400 leading-relaxed">Enter a movie or TV show title in the search bar above to discover amazing content.</p>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Section title={`🔍 Searching for "${query}"...`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
            {Array.from({ length: 14 }).map((_, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden">
                <div className="aspect-[2/3] shimmer"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 shimmer rounded w-3/4"></div>
                  <div className="h-3 shimmer rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="glass rounded-3xl p-12 max-w-md mx-auto border border-red-500/30">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-400 mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Section title={results.length > 0 ? `Results for "${query}"` : `No Results for "${query}"`}>
        {results.length > 0 ? (
          <>
            {results.map(item => {
              const type = (item as Movie).title ? 'movie' : 'tv';
              return <ContentCard key={`${type}-${item.id}`} item={item} type={type} />;
            })}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="glass rounded-3xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <p className="text-xl font-semibold text-gray-300 mb-3">No matches found</p>
              <p className="text-gray-400 leading-relaxed">We couldn&apos;t find any movies or TV shows matching &quot;{query}&quot;. Try checking your spelling or searching for something else.</p>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

function SearchPageLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="glass rounded-3xl p-12 max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-gray-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">Loading Search...</h1>
        <p className="text-gray-400 leading-relaxed">Preparing your search experience.</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchContent />
    </Suspense>
  );
}
