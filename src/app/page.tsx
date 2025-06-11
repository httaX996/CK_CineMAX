import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="w-full flex justify-between items-center py-4 fixed top-0 left-0 px-8 bg-gray-900 bg-opacity-50 backdrop-blur-md z-10">
        <div className="text-2xl font-bold">Flixora</div> {/* Placeholder for logo */}
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-400">Movies</a></li>
            <li><a href="#" className="hover:text-gray-400">Series</a></li>
            <li><a href="#" className="hover:text-gray-400">Search</a></li>
          </ul>
        </nav>
      </header>

      <section className="pt-20 w-full">
        {/* Hero Section */}
        <div className="relative h-[60vh] rounded-lg overflow-hidden mb-12">
          <img src="https://via.placeholder.com/1200x600?text=Hero+Banner" alt="Hero Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold mb-2">Movie Title</h1>
            <p className="text-lg mb-4">Short movie description goes here. Catchy and enticing.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-fit">
              Watch Now
            </button>
          </div>
        </div>

        {/* Movie/Series Carousels */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={`https://via.placeholder.com/300x450?text=Movie+${i + 1}`} alt={`Movie ${i + 1}`} className="w-full h-auto object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">Movie Title {i + 1}</h3>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Popular Series</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={`https://via.placeholder.com/300x450?text=Series+${i + 1}`} alt={`Series ${i + 1}`} className="w-full h-auto object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">Series Title {i + 1}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full text-center py-8 mt-12 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Flixora. All rights reserved.</p>
        <p className="text-sm text-gray-500">Powered by TMDB</p>
      </footer>
    </main>
  );
}
