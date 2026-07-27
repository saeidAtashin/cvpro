"use client";

import React from "react";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import CenteredRtlTemplate from "@/components/templates/CenteredRtlTemplate";
import { MinimalistCVData } from "@/lib/types/minimalist-cv";
import { CenteredRtlCVData } from "@/lib/types/centered-rtl-cv";
import { TemplateLocale } from "@/lib/templates/i18n/section-labels";
import { TemplateLayoutId } from "@/lib/templates/schemas/registry";

interface RenderTemplatePreviewProps {
  layout: TemplateLayoutId;
  data: unknown;
  locale: TemplateLocale;
}

export function renderTemplatePreview({
  layout,
  data,
  locale,
}: RenderTemplatePreviewProps): React.ReactNode {
  switch (layout) {
    case "centeredRtl":
      return (
        <CenteredRtlTemplate
          data={data as CenteredRtlCVData}
          locale={locale}
        />
      );
    case "minimalist":
    default:
      return <MinimalistTemplate data={data as MinimalistCVData} />;
  }
}
