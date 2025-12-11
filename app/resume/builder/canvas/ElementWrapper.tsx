"use client";

import React from 'react';
import { Rnd } from 'react-rnd';
import { ResumeElement } from '@/lib/types/ResumeElement';
import { useResumeStore } from '@/lib/state/useResumeStore';
import { Element } from './Element';

interface ElementWrapperProps {
  element: ResumeElement;
  isSelected: boolean;
  onSelect: () => void;
}

export const ElementWrapper: React.FC<ElementWrapperProps> = ({
  element,
  isSelected,
  onSelect,
}) => {
  const updateElement = useResumeStore((state) => state.updateElement);

  const handleDragStop = (_e: unknown, d: { x: number; y: number }) => {
    updateElement(element.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    _e: unknown,
    _direction: unknown,
    ref: HTMLElement,
    _delta: unknown,
    position: { x: number; y: number }
  ) => {
    updateElement(element.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: position.x,
      y: position.y,
    });
  };

  return (
    <Rnd
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={onSelect}
      style={{
        border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
        cursor: 'move',
      }}
      bounds="parent"
      resizeHandleStyles={{
        right: { right: '-5px', width: '10px', height: '10px' },
        bottom: { bottom: '-5px', width: '10px', height: '10px' },
        bottomRight: { right: '-5px', bottom: '-5px', width: '10px', height: '10px' },
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
        }}
      >
        <Element element={element} />
      </div>
    </Rnd>
  );
};

