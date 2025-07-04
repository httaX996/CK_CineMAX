'use client';

import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  type: 'movie' | 'tv';
  tmdbId: number;
  season?: number;
  episode?: number;
  className?: string;
  color?: string;
  autoplayNextEpisode?: boolean;
  episodeSelector?: boolean;
  nextEpisode?: boolean;
  startTime?: number;
  backdropPath?: string | null; // Optional backdrop image
  title?: string; // Optional title for the content
  autoStart?: boolean; // Auto-start the player when component loads
}

interface ProgressData {
  id: number;
  type: string;
  progress: number;
  timestamp: number;
  duration: number;
  season?: number;
  episode?: number;
}

export default function VideoPlayer({
  type,
  tmdbId,
  season,
  episode,
  className = '',
  color = '8B5CF6', // Default purple color
  autoplayNextEpisode = false,
  episodeSelector = false,
  nextEpisode = false,
  startTime,
  backdropPath,
  title,
  autoStart = false
}: VideoPlayerProps) {
  const [isVisible, setIsVisible] = useState(autoStart);

  // Construct the VIDEASY URL
  const getPlayerUrl = () => {
    let baseUrl = `https://player.videasy.net/${type}/${tmdbId}`;
    
    if (type === 'tv' && season && episode) {
      baseUrl += `/${season}/${episode}`;
    }

    const params = new URLSearchParams();
    params.set('color', color);
    
    if (startTime) {
      params.set('progress', startTime.toString());
    }
    
    if (type === 'tv') {
      if (nextEpisode) {
        params.set('nextEpisode', 'true');
      }
      if (episodeSelector) {
        params.set('episodeSelector', 'true');
      }
      if (autoplayNextEpisode) {
        params.set('autoplayNextEpisode', 'true');
      }
    }

    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    // Listen for progress messages from the player
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://player.videasy.net') {
        return;
      }

      try {
        if (typeof event.data === 'string') {
          const data: ProgressData = JSON.parse(event.data);
          console.log('Progress received from VIDEASY player:', data);
          // Save progress directly here to avoid dependency issues
          const key = type === 'movie' ? `movie_${tmdbId}` : `tv_${tmdbId}_${data.season}_${data.episode}`;
          localStorage.setItem(`videasy_progress_${key}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error parsing message from player:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [tmdbId, type]);

  if (!isVisible) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          {/* Backdrop image if provided */}
          {backdropPath && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w780${backdropPath})`,
              }}
            />
          )}
          
          {/* Fallback gradient background */}
          {!backdropPath && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
          )}
          
          {/* Play button and title overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {title && (
              <h3 className="text-white text-lg md:text-xl font-bold mb-4 text-center">
                {title}
              </h3>
            )}
            <button
              onClick={() => setIsVisible(true)}
              className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-900 font-bold py-4 px-8 rounded-full flex items-center space-x-3 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-amber-500/50"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-8 h-8 group-hover:scale-110 transition-transform"
              >
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
              <span className="text-xl">Watch Now</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Dynamic container based on context */}
      <div className={`relative bg-black overflow-hidden ${
        className.includes('h-screen') 
          ? 'h-screen w-screen' 
          : className.includes('h-full')
            ? 'h-full w-full'
            : 'aspect-video rounded-lg'
      }`}>
        <iframe
          src={getPlayerUrl()}
          className={`absolute border-0 ${
            className.includes('h-screen')
              ? 'top-0 left-0 w-full h-full' // Full screen mode
              : 'top-0 left-0 w-full h-full' // Regular mode
          }`}
          frameBorder="0"
          allowFullScreen
          allow="encrypted-media; autoplay; fullscreen"
          title={`${type === 'movie' ? 'Movie' : 'TV Show'} Player`}
          style={{
            // Ensure the iframe takes the full available space
            minHeight: className.includes('h-screen') ? '100vh' : 'auto'
          }}
        />
      </div>
      
      {/* Close button - only show when not in autoStart mode */}
      {!autoStart && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
          title="Close Player"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}