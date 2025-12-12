"use client";

import React, { useEffect, useState } from "react";
import Template02 from "./Template02";
import { CVData } from "@/lib/types";

interface MobilePreviewModalProps {
  data: CVData;
  isOpen: boolean;
  onClose: () => void;
  completedField?: string;
  nextFieldToEdit?: string;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  onSectionClick?: (fieldId: string) => void;
  isZooming?: boolean;
  zoomTarget?: string;
  completionPercentage?: number;
}

export default function MobilePreviewModal({
  data,
  isOpen,
  onClose,
  completedField,
  nextFieldToEdit,
  previewRef,
  onSectionClick,
  isZooming,
  zoomTarget,
  completionPercentage,
}: MobilePreviewModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsMounted(true), 100);
      // Small delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setTimeout(() => setIsVisible(false), 100);
      // Wait for animation to complete before unmounting
      setTimeout(() => setIsMounted(false), 300);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
        isZooming
          ? "bg-white bg-opacity-100 opacity-100"
          : isVisible
          ? "bg-black bg-opacity-80 opacity-100"
          : "bg-black bg-opacity-0 opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white w-full h-full overflow-auto transform transition-all duration-900 ease-out ${
          isVisible && !isZooming
            ? "scale-100 translate-y-0 opacity-100"
            : isZooming
            ? "opacity-0"
            : "scale-95 translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">پیش‌نمایش رزومه</h3>
            <button
              onClick={onClose}
              className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 active:scale-95 transition-all duration-200 text-xl font-bold"
              aria-label="بستن"
            >
              ×
            </button>
          </div>
          {completionPercentage !== undefined && (
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 min-w-[3rem] text-left">
                {completionPercentage}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 pb-8">
          <div
            ref={previewRef}
            data-preview-container
            className={`flex justify-center items-start min-h-[calc(100vh-80px)] overflow-auto transition-opacity duration-900 ease-in-out ${
              isZooming && zoomTarget ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              className={`origin-center transition-all duration-800 ease-in-out ${
                isZooming && zoomTarget
                  ? "scale-[1.2] opacity-100"
                  : "scale-[0.5] origin-top opacity-100"
              }`}
            >
              <Template02
                data={data}
                completedField={completedField}
                nextFieldToEdit={nextFieldToEdit}
                onSectionClick={onSectionClick}
                isZooming={isZooming}
                zoomTarget={zoomTarget}
                completionPercentage={completionPercentage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
