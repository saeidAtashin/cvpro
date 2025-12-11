"use client";

import React, { useState, useEffect, useRef } from "react";
import { CVData } from "@/lib/types";
import CVEditorForm from "@/components/cv_editor/CVEditorForm";
import { downloadPDF, getPDFBlob } from "@/lib/pdf-generator";
import Header from "../components/Header";
import PDFViewer from "@/components/PDFViewer";

export default function CVEditorPage() {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    languages: [],
    summary: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoPreviewEnabled, setAutoPreviewEnabled] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cvData");
    if (saved) {
      try {
        setCvData(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved CV data:", error);
      }
    }
    // Load auto-preview preference
    const autoPreview = localStorage.getItem("autoPreview");
    if (autoPreview === "true") {
      setAutoPreviewEnabled(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  // Auto-preview: Update PDF preview when data changes (with debouncing)
  useEffect(() => {
    if (!autoPreviewEnabled) return;
    // Skip if no preview has been generated yet
    if (!previewUrlRef.current) return;

    const timeoutId = setTimeout(async () => {
      setIsGenerating(true);
      try {
        // Revoke old URL to free memory
        const oldUrl = previewUrlRef.current;
        if (oldUrl && oldUrl.startsWith("blob:")) {
          URL.revokeObjectURL(oldUrl);
        }
        const blob = await getPDFBlob(cvData);
        const url = URL.createObjectURL(blob);
        previewUrlRef.current = url;
        setPreviewUrl(url);
      } catch (error) {
        console.error("Error auto-updating preview:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 1500); // Wait 1.5 seconds after user stops typing

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cvData, autoPreviewEnabled]); // Only trigger when cvData or autoPreviewEnabled changes

  // Update ref when previewUrl changes
  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
  };

  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    try {
      console.log("Generating preview with data:", cvData);
      // Revoke old URL if exists
      const oldUrl = previewUrlRef.current;
      if (oldUrl && oldUrl.startsWith("blob:")) {
        URL.revokeObjectURL(oldUrl);
      }
      const blob = await getPDFBlob(cvData);
      console.log("PDF blob generated, size:", blob.size);
      const url = URL.createObjectURL(blob);
      previewUrlRef.current = url;
      setPreviewUrl(url);
      console.log("Preview URL created:", url);
      // Enable auto-preview after first manual preview
      if (!autoPreviewEnabled) {
        setAutoPreviewEnabled(true);
        localStorage.setItem("autoPreview", "true");
      }
    } catch (error) {
      console.error("Error generating preview:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(
        `Error generating preview: ${errorMessage}\n\nPlease check the console for more details.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleAutoPreview = () => {
    const newValue = !autoPreviewEnabled;
    setAutoPreviewEnabled(newValue);
    localStorage.setItem("autoPreview", String(newValue));
    // If enabling auto-preview and preview doesn't exist, generate it
    if (newValue && !previewUrl) {
      handleGeneratePreview();
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Generate proper filename
      const firstName = cvData.personalInfo.firstName.trim();
      const lastName = cvData.personalInfo.lastName.trim();
      const filename =
        firstName || lastName
          ? `${firstName}${firstName && lastName ? "_" : ""}${lastName}_CV.pdf`
          : "CV.pdf";

      console.log("Downloading PDF with filename:", filename);
      await downloadPDF(cvData, filename);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(
        `Error downloading PDF: ${errorMessage}\n\nPlease check the console for more details.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    if (
      confirm("Are you sure you want to clear all data? This cannot be undone.")
    ) {
      setCvData({
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          country: "",
        },
        education: [],
        experience: [],
        skills: [],
        certifications: [],
        languages: [],
        summary: "",
      });
      localStorage.removeItem("cvData");
      setPreviewUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">CV Editor</h1>
            <p className="text-gray-600">
              Edit your CV template and generate a PDF
            </p>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log("Preview button clicked");
                handleGeneratePreview();
              }}
              disabled={isGenerating}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? "Generating..." : "Preview PDF"}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log("Download button clicked");
                handleDownload();
              }}
              disabled={isGenerating}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? "Generating..." : "Download PDF"}
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={autoPreviewEnabled}
                onChange={toggleAutoPreview}
                className="w-4 h-4 text-gray-800 rounded focus:ring-2 focus:ring-gray-800"
              />
              <span className="text-sm text-gray-700">Auto Preview</span>
            </label>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Form */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <CVEditorForm data={cvData} onChange={handleDataChange} />
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)]">
            <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-black font-bold">
                  {previewUrl ? "Generated PDF Preview" : "CV Template Preview"}
                </h2>
                {autoPreviewEnabled && previewUrl && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    Auto-updating...
                  </span>
                )}
              </div>
              <div className="h-[calc(100%-3rem)] border border-gray-300 rounded-md overflow-hidden bg-gray-100">
                <PDFViewer
                  url={previewUrl || "/CV_template01.pdf"}
                  title={
                    previewUrl ? "Generated CV Preview" : "CV Template Preview"
                  }
                />
              </div>
              {!previewUrl && (
                <div className="text-xs text-gray-500 mt-2 text-center space-y-1">
                  <p>
                    This is the template. Click &quot;Preview PDF&quot; to see
                    your customized CV
                  </p>
                  <p className="text-gray-400">
                    💡 Tip: Enable &quot;Auto Preview&quot; to see changes
                    automatically as you edit
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
