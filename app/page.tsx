"use client";

import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  // Generate more items for desktop view (starting from 2 since first is the CV template)
  const items = Array.from({ length: 7 }, (_, i) => ({
    id: i + 2,
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
          {/* First Item - CV Template Preview */}
          <Link
            href="/cv-editor"
            className="flex flex-col group cursor-pointer transition-transform hover:scale-105"
          >
            {/* PDF Preview - Portrait Orientation */}
            <div className="w-full aspect-[2/3] bg-white rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden relative border-2 border-gray-300 shadow-sm group-hover:shadow-md transition-shadow">
              {/* CV Template Preview - Styled to look like a document */}
              <div className="w-full h-full p-4 flex flex-col bg-white">
                {/* Header section */}
                <div className="border-b-2 border-gray-800 pb-2 mb-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                </div>
                {/* Content lines */}
                <div className="space-y-2 flex-1">
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                  <div className="h-6"></div>
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-6"></div>
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                </div>
                {/* Footer */}
                <div className="mt-auto pt-2 border-t border-gray-200">
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              {/* Overlay to indicate clickable */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-95 px-4 py-2 rounded-md text-xs font-medium text-gray-800 shadow-lg border border-gray-200">
                  Click to Edit CV
                </div>
              </div>
              {/* PDF icon indicator */}
              <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium opacity-75">
                PDF
              </div>
            </div>

            {/* Label */}
            <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
              CV Template
            </p>

            {/* Edit Button */}
            <div className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-700 active:bg-gray-900 transition-all text-sm md:text-base shadow-sm hover:shadow-md text-center">
              Edit Online
            </div>
          </Link>

          {/* Other Items */}
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
