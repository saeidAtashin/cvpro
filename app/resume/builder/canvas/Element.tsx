"use client";

import React from 'react';
import { ResumeElement } from '@/lib/types/ResumeElement';

interface ElementProps {
  element: ResumeElement;
}

export const Element: React.FC<ElementProps> = ({ element }) => {
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
    fontFamily: element.fontFamily || 'Arial',
    color: element.color || '#000000',
    fontWeight: element.fontWeight || 'normal',
    fontStyle: element.fontStyle || 'normal',
    lineHeight: element.lineHeight || 1.5,
    opacity: element.opacity !== undefined ? element.opacity : 1,
    borderRadius: element.borderRadius ? `${element.borderRadius}px` : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  switch (element.type) {
    case 'heading':
      return (
        <h2 style={style}>
          {element.text || 'Heading'}
        </h2>
      );
    
    case 'text':
      return (
        <p style={style}>
          {element.text || 'Text'}
        </p>
      );
    
    case 'image':
      return element.src ? (
        <img
          src={element.src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: element.opacity !== undefined ? element.opacity : 1,
            borderRadius: element.borderRadius ? `${element.borderRadius}px` : undefined,
          }}
        />
      ) : (
        <div
          style={{
            ...style,
            border: '2px dashed #ccc',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#999',
          }}
        >
          No Image
        </div>
      );
    
    case 'divider':
      return (
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: element.color || '#000000',
            opacity: element.opacity !== undefined ? element.opacity : 1,
          }}
        />
      );
    
    default:
      return null;
  }
};

