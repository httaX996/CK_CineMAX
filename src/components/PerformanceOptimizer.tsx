'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;
    
    // Reduce motion for users who prefer it
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Mobile-specific optimizations
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Disable smooth scrolling on mobile
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Add mobile-specific CSS variables
      document.documentElement.style.setProperty('--mobile-optimized', '1');
      
      // Optimize touch scrolling
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });
    }

    // Throttled scroll optimization
    let ticking = false;
    
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Force layout recalculation to prevent janky scrolling
          if (isMobile) {
            document.body.offsetHeight; // Force reflow
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (isMobile) {
      document.addEventListener('scroll', optimizeScroll, { passive: true });
      document.addEventListener('touchmove', optimizeScroll, { passive: true });
    }

    // Clean up
    return () => {
      document.removeEventListener('scroll', optimizeScroll);
      document.removeEventListener('touchmove', optimizeScroll);
    };
  }, []);

  return null;
}
