"use client";

import React, { useState, useEffect, useRef } from "react";
import { CVData } from "@/lib/types";
import CVEditorForm from "@/components/cv_editor/CVEditorForm";
import FormWizard from "@/components/templates/FormWizard";
import Header from "../components/Header";
import Template02 from "@/components/templates/Template02";
import MobilePreviewModal from "@/components/templates/MobilePreviewModal";

export default function Template02EditorPage() {
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
  const templateRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showInitialPreview, setShowInitialPreview] = useState(false);
  const [hasShownInitialPreview, setHasShownInitialPreview] = useState(false);

  // Check if mobile and show initial preview
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !hasShownInitialPreview) {
        // Show initial preview modal after a short delay (only once)
        setTimeout(() => {
          setShowInitialPreview(true);
          setHasShownInitialPreview(true);
        }, 500);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [hasShownInitialPreview]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("template02CvData");
    if (saved) {
      try {
        setCvData(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved template data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("template02CvData", JSON.stringify(cvData));
  }, [cvData]);

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
  };

  const handleDownloadPNG = async () => {
    if (!templateRef.current) {
      alert("لطفا صبر کنید تا تمپلیت بارگذاری شود");
      return;
    }

    try {
      const {
        buildCvFilename,
        downloadElementAsPng,
      } = await import("@/lib/export-cv-image");
      const name = buildCvFilename(
        cvData.personalInfo.firstName,
        cvData.personalInfo.lastName,
        "png"
      );
      await downloadElementAsPng(templateRef.current, name, "#d6d3d1");
    } catch (error) {
      console.error("Error generating PNG:", error);
      alert("خطا در تولید PNG.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!templateRef.current) {
      alert("لطفا صبر کنید تا تمپلیت بارگذاری شود");
      return;
    }

    try {
      const {
        buildCvFilename,
        downloadElementAsPdf,
      } = await import("@/lib/export-cv-image");
      const name = buildCvFilename(
        cvData.personalInfo.firstName,
        cvData.personalInfo.lastName,
        "pdf"
      );
      await downloadElementAsPdf(templateRef.current, name, "#d6d3d1");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("خطا در تولید PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Template 02 Editor
            </h1>
            <p className="text-gray-600">
              ویرایش و دانلود رزومه با استفاده از Template 02
            </p>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            {isMobile && (
              <button
                type="button"
                onClick={() => setShowInitialPreview(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                مشاهده پیش‌نمایش
              </button>
            )}
            <button
              type="button"
              onClick={handleDownloadPNG}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              دانلود PNG
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              دانلود PDF
            </button>
          </div>
        </div>

        {isMobile ? (
          /* Mobile: Wizard Form */
          <div>
            <FormWizard
              data={cvData}
              onChange={handleDataChange}
              onShowPreview={() => setShowInitialPreview(true)}
            />
          </div>
        ) : (
          /* Desktop: Side by Side */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Form */}
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <CVEditorForm data={cvData} onChange={handleDataChange} />
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)]">
              <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
                <h2 className="text-xl text-black font-bold mb-4">Preview</h2>
                <div className="h-[calc(100%-3rem)] border border-gray-300 rounded-md overflow-auto bg-gray-100 flex items-start justify-center p-4">
                  <div ref={templateRef} className="scale-[0.6] origin-top">
                    <Template02 data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial Preview Modal (Mobile only) */}
        {isMobile && (
          <MobilePreviewModal
            data={cvData}
            isOpen={showInitialPreview}
            onClose={() => setShowInitialPreview(false)}
          />
        )}
      </main>
    </div>
  );
}
