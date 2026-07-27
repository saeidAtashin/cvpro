"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CANVAS3D_TEMPLATE_ID } from "@/lib/canvas3d/constants";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";
import {
  downloadElementAsPdf,
  downloadElementAsPng,
} from "@/lib/export-cv-image";
import { AddBlockPanel } from "./panels/AddBlockPanel";
import { ElementInspector } from "./panels/ElementInspector";
import { PaperSurface } from "./paper/PaperSurface";

const SceneRoot = dynamic(
  () =>
    import("./scene/SceneRoot").then((mod) => ({ default: mod.SceneRoot })),
  { ssr: false, loading: () => <div className="flex-1 bg-gray-200 animate-pulse" /> }
);

export default function Canvas3DEditorClient() {
  const viewMode = useCanvas3DStore((s) => s.viewMode);
  const setViewMode = useCanvas3DStore((s) => s.setViewMode);
  const hydrateFromStorage = useCanvas3DStore((s) => s.hydrateFromStorage);
  const persistToStorage = useCanvas3DStore((s) => s.persistToStorage);
  const elements = useCanvas3DStore((s) => s.elements);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  useEffect(() => {
    persistToStorage();
  }, [elements, viewMode, persistToStorage]);

  const handleExportPng = async () => {
    const root = exportRef.current;
    if (!root) return;
    try {
      await downloadElementAsPng(root, `${CANVAS3D_TEMPLATE_ID}.png`);
    } catch (err) {
      console.error(err);
      alert("Export failed. See console for details.");
    }
  };

  const handleExportPdf = async () => {
    const root = exportRef.current;
    if (!root) return;
    try {
      await downloadElementAsPdf(root, `${CANVAS3D_TEMPLATE_ID}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Export failed. See console for details.");
    }
  };

  const isEdit = viewMode === "edit";

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Home
          </Link>
          <h1 className="text-lg font-bold text-gray-900">3D Canvas CV</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isEdit ? (
            <Button
              variant="secondary"
              onClick={() => setViewMode("preview")}
            >
              Preview / Fit
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setViewMode("edit")}>
              Back to edit
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={handleExportPng}>
            Export PNG
          </Button>
          <Button variant="primary" size="sm" onClick={handleExportPdf}>
            Export PDF
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {isEdit ? <AddBlockPanel /> : null}
        <main className="flex-1 relative min-w-0">
          <SceneRoot />
          {!isEdit && (
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white/80 px-3 py-1 rounded-full pointer-events-none">
              Scroll or pinch to zoom · drag to orbit
            </p>
          )}
        </main>
        {isEdit ? <ElementInspector /> : null}
      </div>

      <div aria-hidden className="fixed left-[-9999px] top-0 pointer-events-none">
        <PaperSurface exportMode exportRef={exportRef} />
      </div>
    </div>
  );
}
