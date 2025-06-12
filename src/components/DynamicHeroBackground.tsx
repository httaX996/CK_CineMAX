'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Movie } from '@/lib/types';

interface DynamicHeroBackgroundProps {
  movies: Pick<Movie, 'id' | 'title' | 'poster_path'>[];
}

const DynamicHeroBackground: React.FC<DynamicHeroBackgroundProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1); // Controls the image's visibility for transitions
  const [validMovies, setValidMovies] = useState<Pick<Movie, 'id' | 'title' | 'poster_path'>[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setValidMovies(movies.filter(movie => movie.poster_path));
  }, [movies]);

  useEffect(() => {
    // Clear previous timers if validMovies changes
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    setImageOpacity(1); // Reset opacity for the first image of the new set
    setCurrentIndex(0); // Reset index for the new set

    if (validMovies.length <= 1) return; // No need to cycle if 0 or 1 image

    const changeImage = () => {
      setImageOpacity(0); // Start fade out
      
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % validMovies.length);
        setImageOpacity(1); // Start fade in for the new image
      }, 1000); // Duration of fade-out (should match CSS transition duration)
    };

    intervalIdRef.current = setInterval(changeImage, 7000); // Total time: 6s visible + 1s fade transition period

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [validMovies]);

  if (validMovies.length === 0 || !validMovies[currentIndex]?.poster_path) {
    // Fallback if no valid movies with posters or current movie is somehow invalid
    return <div className="absolute inset-0 w-full h-full bg-gray-700 opacity-30 scale-105 blur-sm"></div>;
  }

  const currentMovie = validMovies[currentIndex];

  return (
    <Image
      key={currentMovie.id} // Key change helps Next.js manage the component lifecycle for transitions
      src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
      alt={`Background for ${currentMovie.title}`}
      fill
      priority={currentIndex === 0} // Prioritize loading for the very first image displayed
      className="object-cover object-center scale-105 blur-sm transition-opacity duration-1000 ease-in-out"
      style={{ opacity: imageOpacity * 0.3 }} // Base opacity is 0.3, imageOpacity handles the fade (0 to 1)
    />
  );
};

export default DynamicHeroBackground;
