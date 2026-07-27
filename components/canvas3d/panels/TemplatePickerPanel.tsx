"use client";

import React from "react";
import Image from "next/image";
import { listCanvas3DTemplates } from "@/lib/canvas3d/templates/registry";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";

export function TemplatePickerPanel() {
  const activeTemplateId = useCanvas3DStore((s) => s.activeTemplateId);
  const applyTemplate = useCanvas3DStore((s) => s.applyTemplate);
  const templates = listCanvas3DTemplates();

  const handleSelect = (id: string) => {
    if (
      !window.confirm(
        "Replace current layout with this template? Unsaved block positions will be lost."
      )
    ) {
      return;
    }
    applyTemplate(id);
  };

  return (
    <div className="pb-4 mb-4 border-b border-gray-200">
      <h2 className="text-sm font-semibold text-gray-900 mb-2">Templates</h2>
      <div className="flex flex-col gap-2">
        {templates.map((tpl) => {
          const active = activeTemplateId === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleSelect(tpl.id)}
              className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-colors ${
                active
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="relative w-12 h-14 shrink-0 rounded overflow-hidden bg-gray-100">
                <Image
                  src={tpl.thumbnail}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              </div>
              <span className="text-xs font-medium text-gray-900">
                {tpl.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
