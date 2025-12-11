"use client";

import React from 'react';
import { useResumeStore } from '@/lib/state/useResumeStore';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Button } from '@/components/ui/Button';

export const StylesPanel: React.FC = () => {
  const elements = useResumeStore((state) => state.elements);
  const selectedId = useResumeStore((state) => state.selectedId);
  const updateElement = useResumeStore((state) => state.updateElement);
  const deleteElement = useResumeStore((state) => state.deleteElement);

  const selectedElement = elements.find((el) => el.id === selectedId);

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Styles</h2>
        <p className="text-sm text-gray-500">Select an element to edit its styles</p>
      </div>
    );
  }

  const fontFamilyOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Inter', label: 'Inter' },
  ];

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Styles</h2>
      
      <div className="space-y-4">
        {/* Text content for text/heading */}
        {(selectedElement.type === 'text' || selectedElement.type === 'heading') && (
          <>
            <Input
              label="Text"
              value={selectedElement.text || ''}
              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
            />
            
            <Input
              label="Font Size"
              type="number"
              value={selectedElement.fontSize || 14}
              onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) || 14 })}
            />
            
            <Select
              label="Font Family"
              value={selectedElement.fontFamily || 'Arial'}
              onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
              options={fontFamilyOptions}
            />
            
            <ColorPicker
              label="Color"
              value={selectedElement.color || '#000000'}
              onChange={(color) => updateElement(selectedElement.id, { color })}
            />
            
            <div className="flex gap-2">
              <Button
                variant={selectedElement.fontWeight === 'bold' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() =>
                  updateElement(selectedElement.id, {
                    fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold',
                  })
                }
              >
                Bold
              </Button>
              <Button
                variant={selectedElement.fontStyle === 'italic' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() =>
                  updateElement(selectedElement.id, {
                    fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic',
                  })
                }
              >
                Italic
              </Button>
            </div>
            
            <Input
              label="Line Height"
              type="number"
              step="0.1"
              value={selectedElement.lineHeight || 1.5}
              onChange={(e) => updateElement(selectedElement.id, { lineHeight: parseFloat(e.target.value) || 1.5 })}
            />
          </>
        )}

        {/* Image controls */}
        {selectedElement.type === 'image' && (
          <>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const src = event.target?.result as string;
                      updateElement(selectedElement.id, { src });
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            >
              Replace Image
            </Button>
            
            <Input
              label="Opacity"
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={selectedElement.opacity !== undefined ? selectedElement.opacity : 1}
              onChange={(e) => updateElement(selectedElement.id, { opacity: parseFloat(e.target.value) || 1 })}
            />
            
            <Input
              label="Border Radius"
              type="number"
              min="0"
              value={selectedElement.borderRadius || 0}
              onChange={(e) => updateElement(selectedElement.id, { borderRadius: parseInt(e.target.value) || 0 })}
            />
          </>
        )}

        {/* Divider controls */}
        {selectedElement.type === 'divider' && (
          <>
            <ColorPicker
              label="Color"
              value={selectedElement.color || '#000000'}
              onChange={(color) => updateElement(selectedElement.id, { color })}
            />
            
            <Input
              label="Opacity"
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={selectedElement.opacity !== undefined ? selectedElement.opacity : 1}
              onChange={(e) => updateElement(selectedElement.id, { opacity: parseFloat(e.target.value) || 1 })}
            />
          </>
        )}

        {/* General controls */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="danger"
            className="w-full"
            onClick={() => {
              if (confirm('Are you sure you want to delete this element?')) {
                deleteElement(selectedElement.id);
              }
            }}
          >
            Delete Element
          </Button>
        </div>
      </div>
    </div>
  );
};

