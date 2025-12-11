"use client";

import React from 'react';
import { useResumeStore } from '@/lib/state/useResumeStore';
import { ResumeElement } from '@/lib/types/ResumeElement';
import { Button } from '@/components/ui/Button';

const A4_WIDTH = 210;
const MM_TO_PX = 3.779527559;
const CANVAS_WIDTH = A4_WIDTH * MM_TO_PX;

export const BlocksPanel: React.FC = () => {
  const addElement = useResumeStore((state) => state.addElement);

  const generateId = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const createElement = (type: ResumeElement['type'], defaultProps: Partial<ResumeElement> = {}) => {
    const element: ResumeElement = {
      id: generateId(),
      type,
      x: (CANVAS_WIDTH / 2) - 100, // Center horizontally
      y: 50, // Top of canvas
      width: 200,
      height: 50,
      ...defaultProps,
    };
    addElement(element);
  };

  const handleAddHeading = () => {
    createElement('heading', {
      text: 'Heading',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
    });
  };

  const handleAddText = () => {
    createElement('text', {
      text: 'Text',
      fontSize: 14,
      color: '#000000',
    });
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const src = event.target?.result as string;
          createElement('image', {
            src,
            width: 200,
            height: 200,
            opacity: 1,
            borderRadius: 0,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddDivider = () => {
    createElement('divider', {
      width: 400,
      height: 2,
      color: '#000000',
      opacity: 1,
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Blocks</h2>
      <div className="space-y-2">
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={handleAddHeading}
        >
          + Heading
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={handleAddText}
        >
          + Text
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={handleAddImage}
        >
          + Image
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={handleAddDivider}
        >
          + Divider
        </Button>
      </div>
    </div>
  );
};

