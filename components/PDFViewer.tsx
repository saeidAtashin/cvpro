"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source - use CDN with version from installed package
if (typeof window !== "undefined") {
  // Use the version from the installed package to ensure version match
  const version = pdfjsLib.version;
  // Use unpkg CDN which has all versions available
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
  url: string;
  title?: string;
}

export default function PDFViewer({
  url,
  title = "PDF Preview",
}: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        // Configure loading options
        let loadingOptions: any;

        // For blob URLs, we need to handle them differently
        if (url.startsWith("blob:")) {
          const response = await fetch(url);
          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();
          loadingOptions = { data: arrayBuffer };
        } else {
          // For regular URLs, use the URL directly
          loadingOptions = { url: url };
        }

        const loadingTask = pdfjsLib.getDocument(loadingOptions);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        const errorMessage =
          err instanceof Error
            ? `${err.message}${err.stack ? `\n${err.stack}` : ""}`
            : "Failed to load PDF. Please try again.";
        console.error("Full error details:", errorMessage);
        setError(
          err instanceof Error
            ? `Failed to load PDF: ${err.message}`
            : "Failed to load PDF. Please check the console for details."
        );
        setLoading(false);
      }
    };

    if (url) {
      loadPDF();
    }
  }, [url, pageNum, scale]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500 p-4">
          <p className="mb-2">{error}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open PDF in new tab
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
          <div className="text-gray-500">Loading PDF...</div>
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <canvas ref={canvasRef} className="shadow-lg" />
      </div>
      {numPages > 1 && (
        <div className="border-t border-gray-200 p-2 flex items-center justify-between bg-gray-50">
          <button
            onClick={() => setPageNum((p) => Math.max(1, p - 1))}
            disabled={pageNum <= 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pageNum} of {numPages}
          </span>
          <button
            onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
            disabled={pageNum >= numPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
