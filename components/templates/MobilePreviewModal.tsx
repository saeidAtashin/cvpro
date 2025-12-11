"use client";

import React, { useEffect, useState } from "react";
import Template02 from "./Template02";
import { CVData } from "@/lib/types";

interface MobilePreviewModalProps {
  data: CVData;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobilePreviewModal({
  data,
  isOpen,
  onClose,
}: MobilePreviewModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before unmounting
      setTimeout(() => setIsMounted(false), 300);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ease-out ${
        isVisible ? "bg-opacity-80 opacity-100" : "bg-opacity-0 opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white w-full h-full overflow-auto transform transition-all duration-500 ease-out ${
          isVisible
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">پیش‌نمایش رزومه</h3>
          <button
            onClick={onClose}
            className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 active:scale-95 transition-all duration-200 text-xl font-bold"
            aria-label="بستن"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 pb-8">
          <div className="flex justify-center items-start min-h-[calc(100vh-80px)]">
            <div className="scale-[0.5] origin-top">
              <Template02 data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

