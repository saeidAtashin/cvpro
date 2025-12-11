"use client";

import React from 'react';
import { useResumeStore } from '@/lib/state/useResumeStore';

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: '100%',
    border: '1px solid #ccc',
  },
});

export const PdfPreview: React.FC = () => {
  const elements = useResumeStore((state) => state.elements);

  // This will be implemented to show a live preview
  // For now, it's a placeholder
  return (
    <div className="w-full h-full bg-gray-50 border border-gray-300 rounded p-4">
      <p className="text-sm text-gray-500">PDF Preview will be rendered here</p>
      <p className="text-xs text-gray-400 mt-2">
        Elements: {elements.length}
      </p>
    </div>
  );
};

