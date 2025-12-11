"use client";

import React, { useState, useEffect, useRef } from "react";
import { CVData } from "@/lib/types";
import CVEditorForm from "@/components/cv_editor/CVEditorForm";
import Header from "../components/Header";
import Template02 from "@/components/templates/Template02";

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
      // Try to load html2canvas dynamically
      let html2canvasFn: typeof import("html2canvas").default;
      try {
        const html2canvasModule = await import("html2canvas");
        html2canvasFn = html2canvasModule.default;
      } catch (importError) {
        alert(
          "برای دانلود PNG، لطفا پکیج html2canvas را نصب کنید:\nnpm install html2canvas"
        );
        return;
      }

      const canvas = await html2canvasFn(templateRef.current, {
        scale: 2,
        backgroundColor: "#d6d3d1", // stone-300
        useCORS: true,
        logging: false,
        width: 595,
        height: 842,
      });

      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${cvData.personalInfo.firstName || "resume"}_${
            cvData.personalInfo.lastName || "template"
          }.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error generating PNG:", error);
      alert("خطا در تولید PNG. لطفا html2canvas را نصب کنید: npm install html2canvas");
    }
  };

  const handleDownloadPDF = async () => {
    if (!templateRef.current) {
      alert("لطفا صبر کنید تا تمپلیت بارگذاری شود");
      return;
    }

    try {
      // Try to load html2canvas and jsPDF dynamically
      let html2canvasFn: typeof import("html2canvas").default;
      let jsPDF: typeof import("jspdf").jsPDF;

      try {
        const html2canvasModule = await import("html2canvas");
        html2canvasFn = html2canvasModule.default;
      } catch (importError) {
        alert(
          "برای دانلود PDF، لطفا پکیج html2canvas را نصب کنید:\nnpm install html2canvas"
        );
        return;
      }

      try {
        const jsPDFModule = await import("jspdf");
        jsPDF = jsPDFModule.jsPDF;
      } catch (importError) {
        alert(
          "برای دانلود PDF، لطفا پکیج jspdf را نصب کنید:\nnpm install jspdf"
        );
        return;
      }

      const canvas = await html2canvasFn(templateRef.current, {
        scale: 2,
        backgroundColor: "#d6d3d1",
        useCORS: true,
        logging: false,
        width: 595,
        height: 842,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [595, 842], // A4 size in pixels
      });

      pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
      pdf.save(
        `${cvData.personalInfo.firstName || "resume"}_${
          cvData.personalInfo.lastName || "template"
        }.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "خطا در تولید PDF. لطفا پکیج‌های لازم را نصب کنید:\nnpm install html2canvas jspdf"
      );
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
      </main>
    </div>
  );
}


