"use client";

import Header from "./components/Header";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_CATALOG } from "@/lib/templates/catalog";

export default function Home() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-md md:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12 relative">
        <Link
          href="/3d-canvas-editor"
          className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 md:px-6 md:py-5 hover:border-gray-300 hover:bg-gray-100/80 transition-colors group"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
              New
            </p>
            <h2 className="text-lg md:text-xl font-bold text-black">
              3D Canvas CV Studio
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              Edit your CV on a 3D paper canvas with templates, drag-and-drop
              blocks, and free export.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white px-5 py-2.5 text-sm font-medium group-hover:bg-gray-800 transition-colors">
            Open editor
          </span>
        </Link>

        <h2 className="text-2xl sm:text-left sm:pl-0 md:text-3xl lg:text-4xl font-bold text-black mb-6 md:mb-8 text-center sm:text-left">
          Recent Drops
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {TEMPLATE_CATALOG.map((template) => (
            <Link
              key={template.id}
              href={template.editorPath}
              className="flex flex-col group cursor-pointer transition-transform hover:scale-105"
            >
              <div className="w-full aspect-[2/3] bg-gray-100 rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden relative border border-gray-200">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
                {template.name}
              </p>
              <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
                Price: {template.priceToman.toLocaleString("fa-IR")} Toman
              </p>
              <div className="w-full bg-gray-800 text-white py-2 md:py-2.5 px-4 rounded-lg md:rounded-xl font-medium hover:bg-gray-700 active:bg-gray-900 transition-all text-sm md:text-base shadow-sm hover:shadow-md text-center">
                Edit Online
              </div>
            </Link>
          ))}

          {placeholders.map((i) => (
            <div
              key={i}
              className="flex flex-col group cursor-default opacity-60"
            >
              <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden" />
              <p className="text-black font-medium mb-2 md:mb-3 text-sm md:text-base">
                Coming soon
              </p>
              <button
                type="button"
                disabled
                className="w-full bg-gray-400 text-white py-2 md:py-2.5 px-4 rounded-lg md:rounded-xl text-sm md:text-base text-center cursor-not-allowed"
              >
                Create
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
