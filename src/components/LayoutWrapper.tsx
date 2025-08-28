'use client';

import { useIsWatchPage } from '@/lib/hooks';
import Navbar from '@/components/Navbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const isWatchPage = useIsWatchPage();

  if (isWatchPage) {
    // Full-screen layout for watch pages
    return (
      <div className="h-screen w-screen bg-black overflow-hidden">
        {children}
      </div>
    );
  }

  // Normal layout for other pages
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="relative z-10">{children}</div>
      </main>
      <footer className="relative z-10 text-center py-12 border-t border-gray-700/30 glass">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} CK CineMAX. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made By{" "}
            <span className="text-amber-400 font-semibold">CHETHMINA</span>
          </p>
        </div>
      </footer>
    </>
  );
}
