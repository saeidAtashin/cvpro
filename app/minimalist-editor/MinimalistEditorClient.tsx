"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import MinimalistEditorForm from "@/components/templates/MinimalistEditorForm";
import MinimalistFormWizard from "@/components/templates/MinimalistFormWizard";
import MobilePreviewModal from "@/components/templates/MobilePreviewModal";
import { defaultMinimalistCVData } from "@/lib/default-minimalist-cv-data";
import { MinimalistCVData } from "@/lib/types/minimalist-cv";
import { getTemplateById } from "@/lib/templates/catalog";
import {
  buildCvFilename,
  downloadElementAsPdf,
  downloadElementAsPng,
} from "@/lib/export-cv-image";
import { useDownloadUnlock } from "@/hooks/useDownloadUnlock";
import { useSearchParams } from "next/navigation";

const TEMPLATE_ID = "minimalist";
const STORAGE_KEY = "minimalistCvData";

export default function MinimalistEditorClient() {
  const [cvData, setCvData] = useState<MinimalistCVData>(defaultMinimalistCVData);
  const exportRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showInitialPreview, setShowInitialPreview] = useState(false);
  const [hasShownInitialPreview, setHasShownInitialPreview] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [paying, setPaying] = useState(false);

  const searchParams = useSearchParams();
  const { unlocked, loading: unlockLoading, refresh, startPayment } =
    useDownloadUnlock(TEMPLATE_ID);
  const catalogEntry = getTemplateById(TEMPLATE_ID);

  useEffect(() => {
    if (searchParams.get("paid") === "1") {
      refresh();
    }
  }, [searchParams, refresh]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !hasShownInitialPreview) {
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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCvData(JSON.parse(saved) as MinimalistCVData);
      } catch (error) {
        console.error("Error loading minimalist CV data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const getExportNode = () => {
    if (!exportRef.current) return null;
    const inner = exportRef.current.querySelector("[data-export-root]");
    return (inner as HTMLElement) || exportRef.current;
  };

  const handleDownloadPng = async () => {
    const node = getExportNode();
    if (!node) {
      alert("Please wait for the preview to load.");
      return;
    }
    setExporting(true);
    try {
      const name = buildCvFilename(
        cvData.personalInfo.firstName,
        cvData.personalInfo.lastName,
        "png"
      );
      await downloadElementAsPng(node, name, "#ffffff");
    } catch (error) {
      console.error(error);
      alert("Failed to export PNG.");
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    const node = getExportNode();
    if (!node) {
      alert("Please wait for the preview to load.");
      return;
    }
    setExporting(true);
    try {
      const name = buildCvFilename(
        cvData.personalInfo.firstName,
        cvData.personalInfo.lastName,
        "pdf"
      );
      await downloadElementAsPdf(node, name, "#ffffff");
    } catch (error) {
      console.error(error);
      alert("Failed to export PDF.");
    } finally {
      setExporting(false);
    }
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      await startPayment();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Payment could not be started. Check server env vars."
      );
      setPaying(false);
    }
  };

  const priceLabel = catalogEntry
    ? `${catalogEntry.priceToman.toLocaleString("fa-IR")} تومان`
    : "";

  const renderDownloadActions = () => {
    if (unlockLoading) {
      return (
        <span className="text-sm text-gray-500 px-2">Checking payment…</span>
      );
    }
    if (!unlocked) {
      return (
        <button
          type="button"
          onClick={handlePay}
          disabled={paying}
          className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-600 disabled:opacity-60"
        >
          {paying ? "Redirecting…" : `Pay & download (${priceLabel})`}
        </button>
      );
    }
    return (
      <>
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={exporting}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-60"
        >
          Download PNG
        </button>
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={exporting}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-60"
        >
          Download PDF
        </button>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Minimalist CV Editor
            </h1>
            <p className="text-gray-600">
              Fill your resume, preview live, pay once to download PNG or PDF.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            {isMobile && (
              <button
                type="button"
                onClick={() => setShowInitialPreview(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Preview
              </button>
            )}
            {renderDownloadActions()}
          </div>
        </div>

        {isMobile ? (
          <MinimalistFormWizard
            data={cvData}
            onChange={setCvData}
            onShowPreview={() => setShowInitialPreview(true)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <MinimalistEditorForm data={cvData} onChange={setCvData} />
            </div>
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)]">
              <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
                <h2 className="text-xl text-black font-bold mb-4">Preview</h2>
                <div className="h-[calc(100%-3rem)] border border-gray-300 rounded-md overflow-auto bg-gray-100 flex items-start justify-center p-4">
                  <div className="scale-[0.6] origin-top">
                    <MinimalistTemplate data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="fixed -left-[9999px] top-0 pointer-events-none"
          aria-hidden
        >
          <div ref={exportRef}>
            <MinimalistTemplate data={cvData} />
          </div>
        </div>

        {isMobile && (
          <MobilePreviewModal
            isOpen={showInitialPreview}
            onClose={() => setShowInitialPreview(false)}
            renderPreview={() => <MinimalistTemplate data={cvData} />}
          />
        )}
      </main>
    </div>
  );
}
