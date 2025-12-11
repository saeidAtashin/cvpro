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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh] overflow-auto transform transition-all duration-500 ${
          isAnimating
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          ×
        </button>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4 text-center">پیش‌نمایش رزومه</h3>
          <div className="flex justify-center">
            <div className="scale-[0.35] origin-top">
              <Template02 data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

