"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import SchemaDrivenForm from "@/components/templates/SchemaDrivenForm";
import SchemaWizard from "@/components/templates/SchemaWizard";
import MobilePreviewModal from "@/components/templates/MobilePreviewModal";
import { getTemplateById, isGeneratedEntry } from "@/lib/templates/catalog";
import { getSchemaForTemplate } from "@/lib/templates/get-schema";
import { DEFAULT_DATA_BY_SCHEMA_ID } from "@/lib/templates/schemas/registry";
import { renderTemplatePreview } from "@/lib/templates/layout-registry";
import {
  buildCvFilename,
  downloadElementAsPdf,
  downloadElementAsPng,
} from "@/lib/export-cv-image";
import { useDownloadUnlock } from "@/hooks/useDownloadUnlock";
import { useSearchParams } from "next/navigation";
import { TemplateLocale } from "@/lib/templates/i18n/section-labels";
import { TemplateLayoutId } from "@/lib/templates/schemas/registry";

interface CvTemplateEditorClientProps {
  templateId: string;
}

function storageKey(templateId: string) {
  return `cvData:${templateId}`;
}

function getDefaultData(schemaId: string): unknown {
  const data = DEFAULT_DATA_BY_SCHEMA_ID[schemaId];
  if (!data) {
    throw new Error(`Unknown schema: ${schemaId}`);
  }
  return structuredClone(data);
}

function filenameFromData(data: unknown): { first: string; last: string } {
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (typeof d.fullName === "string" && d.fullName) {
      const parts = d.fullName.trim().split(/\s+/);
      return {
        first: parts[0] ?? "resume",
        last: parts.slice(1).join("_") || "cv",
      };
    }
    const personal = d.personalInfo as Record<string, string> | undefined;
    if (personal) {
      return {
        first: personal.firstName || "resume",
        last: personal.lastName || "cv",
      };
    }
  }
  return { first: "resume", last: "cv" };
}

export default function CvTemplateEditorClient({
  templateId,
}: CvTemplateEditorClientProps) {
  const catalogEntry = getTemplateById(templateId);
  const schemaId =
    catalogEntry && isGeneratedEntry(catalogEntry)
      ? catalogEntry.schemaId
      : "minimalist";

  const [cvData, setCvData] = useState<unknown>(() =>
    getDefaultData(schemaId)
  );
  const exportRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showInitialPreview, setShowInitialPreview] = useState(false);
  const [hasShownInitialPreview, setHasShownInitialPreview] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [paying, setPaying] = useState(false);

  const searchParams = useSearchParams();
  const { unlocked, loading: unlockLoading, refresh, startPayment } =
    useDownloadUnlock(templateId);
  const schema = getSchemaForTemplate(templateId);
  const key = storageKey(templateId);

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
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setCvData(JSON.parse(saved));
        return;
      } catch (error) {
        console.error("Error loading CV data:", error);
      }
    }
    const legacy = localStorage.getItem("minimalistCvData");
    if (legacy && templateId === "minimalist-cv-resume") {
      try {
        setCvData(JSON.parse(legacy));
        localStorage.setItem(key, legacy);
      } catch {
        /* ignore */
      }
    }
  }, [key, templateId]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cvData));
  }, [cvData, key]);

  if (!catalogEntry || !isGeneratedEntry(catalogEntry) || !schema) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Template not found.
      </div>
    );
  }

  const layout = catalogEntry.layout as TemplateLayoutId;
  const locale = catalogEntry.locale as TemplateLocale;
  const dir = catalogEntry.dir;

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
      const { first, last } = filenameFromData(cvData);
      const name = buildCvFilename(first, last, "png");
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
      const { first, last } = filenameFromData(cvData);
      const name = buildCvFilename(first, last, "pdf");
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

  const priceLabel = `${catalogEntry.priceToman.toLocaleString("fa-IR")} تومان`;

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

  const preview = () =>
    renderTemplatePreview({ layout, data: cvData, locale });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              {catalogEntry.name}
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
          <SchemaWizard
            schema={schema}
            data={cvData}
            onChange={setCvData}
            onShowPreview={() => setShowInitialPreview(true)}
            renderPreview={preview}
            dir={dir}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto"
              dir={dir}
            >
              <SchemaDrivenForm
                schema={schema}
                data={cvData}
                onChange={setCvData}
                dir={dir}
              />
            </div>
            <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)]">
              <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
                <h2 className="text-xl text-black font-bold mb-4">Preview</h2>
                <div
                  className="h-[calc(100%-3rem)] border border-gray-300 rounded-md overflow-auto bg-gray-100 flex items-start justify-center p-4"
                  dir={dir}
                >
                  <div className="scale-[0.6] origin-top">{preview()}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="fixed -left-[9999px] top-0 pointer-events-none"
          aria-hidden
        >
          <div ref={exportRef}>{preview()}</div>
        </div>

        {isMobile && (
          <MobilePreviewModal
            isOpen={showInitialPreview}
            onClose={() => setShowInitialPreview(false)}
            renderPreview={preview}
          />
        )}
      </main>
    </div>
  );
}
