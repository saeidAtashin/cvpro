"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import PDFViewer from "@/components/PDFViewer";
import SchemaDrivenForm from "@/components/templates/SchemaDrivenForm";
import { defaultMinimalistCVData } from "@/lib/default-minimalist-cv-data";
import { getPdfTemplateEntry } from "@/lib/pdf-templates/catalog";
import { MINIMALIST_SCHEMA } from "@/lib/templates/schemas/minimalist.schema";
import { MinimalistCVData } from "@/lib/types/minimalist-cv";

const DEBOUNCE_MS = 500;

export default function PdfGeneratorPage() {
  const params = useParams();
  const templateId = String(params.templateId ?? "");
  const entry = getPdfTemplateEntry(templateId);
  const storageKey = `pdfGenerator:${templateId}`;

  const [cvData, setCvData] = useState<MinimalistCVData>(() => ({
    ...defaultMinimalistCVData,
  }));
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCvData(JSON.parse(saved) as MinimalistCVData);
      } catch {
        /* ignore */
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cvData));
  }, [cvData, storageKey]);

  const revokePreview = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  const generatePdf = useCallback(async () => {
    if (!entry) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/pdf-template/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, data: cvData }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(
          (errBody as { details?: string; error?: string }).details ||
            (errBody as { error?: string }).error ||
            res.statusText
        );
      }
      const blob = await res.blob();
      revokePreview();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      setPreviewUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate PDF");
    } finally {
      setGenerating(false);
    }
  }, [cvData, entry, revokePreview, templateId]);

  useEffect(() => {
    if (!entry) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void generatePdf();
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [cvData, entry, generatePdf]);

  useEffect(() => () => revokePreview(), [revokePreview]);

  const handleDownload = async () => {
    if (!entry) return;
    try {
      const res = await fetch("/api/pdf-template/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, data: cvData }),
      });
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const first = cvData.personalInfo.firstName || "resume";
      const last = cvData.personalInfo.lastName || "cv";
      const link = document.createElement("a");
      link.href = url;
      link.download = `${first}_${last}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download PDF.");
    }
  };

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Unknown PDF template: {templateId}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="border-b bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{entry.name}</h1>
          <p className="text-sm text-gray-500">
            PDF template preview updates as you edit (standalone generator).
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleDownload()}
          disabled={generating}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          Download PDF
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <aside className="w-full lg:w-[420px] shrink-0 border-r bg-white overflow-y-auto max-h-[50vh] lg:max-h-none">
          <div className="p-4">
            <SchemaDrivenForm
              schema={MINIMALIST_SCHEMA}
              data={cvData}
              onChange={(d) => setCvData(d as MinimalistCVData)}
              dir="ltr"
            />
          </div>
        </aside>
        <main className="flex-1 flex flex-col min-h-[50vh] relative">
          {generating && (
            <div className="absolute top-2 right-2 z-20 text-xs bg-white/90 px-2 py-1 rounded shadow text-gray-600">
              Updating preview…
            </div>
          )}
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 border-b border-red-100">
              {error}
            </div>
          )}
          {previewUrl ? (
            <PDFViewer url={previewUrl} title={entry.name} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Generating preview…
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
