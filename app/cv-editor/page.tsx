"use client";

import React, { useState, useEffect } from "react";
import { CVData } from "@/lib/types";
import CVEditorForm from "@/components/cv_editor/CVEditorForm";
import { downloadPDF, getPDFBlob } from "@/lib/pdf-generator";
import Header from "../components/Header";

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
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
  };

  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    try {
      const blob = await getPDFBlob(cvData);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error("Error generating preview:", error);
      alert("Error generating preview. Please check the console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const filename =
        `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.pdf` ||
        "CV.pdf";
      await downloadPDF(cvData, filename);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error downloading PDF. Please check the console for details.");
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
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleGeneratePreview}
              disabled={isGenerating}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Preview PDF"}
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Download PDF"}
            </button>
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
              <h2 className="text-xl font-bold mb-4">PDF Preview</h2>
              {previewUrl ? (
                <div className="h-[calc(100%-3rem)] border border-gray-300 rounded-md overflow-hidden">
                  <iframe
                    src={previewUrl}
                    className="w-full h-full"
                    title="CV Preview"
                  />
                </div>
              ) : (
                <div className="h-[calc(100%-3rem)] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium mb-2">
                      No Preview Available
                    </p>
                    <p className="text-sm">
                      Click &quot;Preview PDF&quot; to generate a preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
