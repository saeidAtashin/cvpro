"use client";

import Link from "next/link";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "#", label: "How it works?" },
    { href: "#", label: "FAQ" },
    { href: "#", label: "Articles" },
    { href: "#", label: "About me" },
    { href: "#", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        {/* Mobile Header */}
        <div className="flex items-center justify-center py-3 md:hidden relative">
          {/* Hamburger Menu Icon - Fixed Left */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute left-4 p-2 text-black"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo and Slogan - Centered */}
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-black">Logo</h1>
            <p className="text-xs text-gray-500">slogan</p>
          </div>

          {/* User Icon - Fixed Right */}
          <Link
            href="/login"
            className="absolute right-4 p-2 text-black"
            aria-label="Sign in"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 max-w-7xl mx-auto relative">
          {/* Logo and Slogan */}
          <Link href="/" className="flex flex-col">
            <h1 className="text-2xl font-bold text-black">Logo</h1>
            <p className="text-sm text-gray-500">slogan</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-black font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Fixed Right */}
          <div className="flex items-center gap-4 absolute right-6 lg:right-8">
            {/* Language Selector - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-black font-medium text-sm hover:bg-gray-200 transition-colors">
                <span className="text-base">🇺🇸</span>
                <span>EN</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-black font-medium text-sm hover:bg-gray-50 transition-colors">
                <span className="text-base">🇳🇱</span>
                <span>NL</span>
              </button>
            </div>

            {/* User Icon / Sign In Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-black hover:text-gray-800 transition-colors"
              aria-label="Sign in"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden sm:inline font-medium">Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hamburger Menu Drawer - Mobile Only */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
