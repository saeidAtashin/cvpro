"use client";

import React from 'react';
import { useResumeStore } from '@/lib/state/useResumeStore';
import { ElementWrapper } from './ElementWrapper';

const A4_WIDTH = 210; // mm
const A4_HEIGHT = 297; // mm
const MM_TO_PX = 3.779527559; // 1mm = 3.779527559px at 96 DPI

const CANVAS_WIDTH = A4_WIDTH * MM_TO_PX;
const CANVAS_HEIGHT = A4_HEIGHT * MM_TO_PX;

export const Canvas: React.FC = () => {
  const elements = useResumeStore((state) => state.elements);
  const selectedId = useResumeStore((state) => state.selectedId);
  const setSelectedId = useResumeStore((state) => state.setSelectedId);
  const clearSelection = useResumeStore((state) => state.clearSelection);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-8 overflow-auto">
      <div
        className="bg-white shadow-lg relative"
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
        }}
        onClick={handleCanvasClick}
      >
        {elements.map((element) => (
          <ElementWrapper
            key={element.id}
            element={element}
            isSelected={element.id === selectedId}
            onSelect={() => setSelectedId(element.id)}
          />
        ))}
      </div>
    </div>
  );
};

