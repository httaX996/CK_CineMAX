'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Reduce motion for users who prefer it
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Optimize scroll performance
    let ticking = false;
    
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('scroll', optimizeScroll, { passive: true });

    // Clean up
    return () => {
      document.removeEventListener('scroll', optimizeScroll);
    };
  }, []);

  return null;
}
