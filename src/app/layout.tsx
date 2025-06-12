import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flixora - Stream Movies & Series",
  description:
    "Your ultimate destination for streaming movies and TV series. Discover trending content, top-rated films, and popular shows.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 antialiased min-h-screen`}>
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
              &copy; {new Date().getFullYear()} Flixora. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Powered by{" "}
              <span className="text-amber-400 font-semibold">TMDB</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
