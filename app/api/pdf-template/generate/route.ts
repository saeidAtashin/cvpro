import { NextRequest, NextResponse } from "next/server";
import { fillPdfTemplate } from "@/lib/pdf-templates/fill-pdf-template";
import { getPdfTemplateEntry } from "@/lib/pdf-templates/catalog";
import type { MinimalistCVData } from "@/lib/types/minimalist-cv";

function isMinimalistCVData(data: unknown): data is MinimalistCVData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return typeof d.personalInfo === "object" && d.personalInfo !== null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const templateId =
      typeof body.templateId === "string" ? body.templateId : "";
    const data = body.data;

    if (!templateId || !getPdfTemplateEntry(templateId)) {
      return NextResponse.json(
        { error: "Unknown or missing templateId" },
        { status: 400 }
      );
    }

    if (!isMinimalistCVData(data)) {
      return NextResponse.json(
        { error: "Invalid CV data for template" },
        { status: 400 }
      );
    }

    const pdfBytes = await fillPdfTemplate(templateId, data);
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="cv.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF template generate error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
