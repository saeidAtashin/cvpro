"use client";

import React, { useEffect } from 'react';
import { BlocksPanel } from './sidebar/BlocksPanel';
import { StylesPanel } from './sidebar/StylesPanel';
import { Canvas } from './canvas/Canvas';
import { PdfPreview } from './pdf/PdfPreview';
import { useResumeStore } from '@/lib/state/useResumeStore';
import { ResumeElement } from '@/lib/types/ResumeElement';
import { generatePdf } from './pdf/generatePdf';
import { Button } from '@/components/ui/Button';

export default function ResumeBuilderPage() {
  const elements = useResumeStore((state) => state.elements);
  const loadElements = useResumeStore((state) => state.loadElements);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resumeElements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ResumeElement[];
        loadElements(parsed);
      } catch (error) {
        console.error('Error loading saved resume:', error);
      }
    }
  }, [loadElements]);

  // Save to localStorage whenever elements change
  useEffect(() => {
    localStorage.setItem('resumeElements', JSON.stringify(elements));
  }, [elements]);

  const handleExportPdf = async () => {
    try {
      const blob = await generatePdf(elements);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check the console for details.');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleExportPdf}>
            Export to PDF
          </Button>
        </div>
      </header>

      {/* Main content area - 3 panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Blocks */}
        <BlocksPanel />

        {/* Center Panel - Canvas */}
        <Canvas />

        {/* Right Panel - Styles */}
        <StylesPanel />
      </div>
    </div>
  );
}

