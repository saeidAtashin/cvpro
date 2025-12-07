"use client";

import { useEffect } from "react";
import Link from "next/link";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { href: "#", label: "How it works?" },
    { href: "#", label: "FAQ" },
    { href: "#", label: "Articles" },
    { href: "#", label: "About me" },
    { href: "#", label: "Contact" },
  ];

  return (
    <>
      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      {/* Side Drawer - Mobile Only */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Logo</h2>
            <button
              onClick={onClose}
              className="p-2 text-black hover:bg-gray-100 rounded"
              aria-label="Close menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block text-black font-bold text-lg hover:text-gray-600 transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Selector */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-black font-bold mb-3">Language</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-black font-medium">
                <span className="text-lg">🇺🇸</span>
                <span>EN</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50">
                <span className="text-lg">🇳🇱</span>
                <span>NL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
