import Header from "./components/Header";

export default function Home() {
  // Generate more items for desktop view
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    price: 15,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-md md:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12 relative">
        {/* Title - Fixed Left on Larger Mobile */}
        <h2 className="text-2xl sm:text-left sm:pl-0 md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8 text-center sm:text-left">
          Recent Drops
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col group cursor-pointer transition-transform hover:scale-105"
            >
              {/* Placeholder Image - Portrait Orientation (taller, narrower) */}
              <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden">
                <div className="w-full h-full bg-gray-200 group-hover:bg-gray-300 transition-colors"></div>
              </div>

              {/* Price */}
              <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
                Price: ${item.price}
              </p>

              {/* Create Button */}
              <button className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-700 active:bg-gray-900 transition-all text-sm md:text-base shadow-sm hover:shadow-md">
                Create
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
