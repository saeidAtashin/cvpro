"use client";

import { renderToBlob } from "@react-pdf/renderer";
import { CVTemplate } from "@/components/cv_structure";
import { CVData } from "./types";

export async function generatePDF(cvData: CVData): Promise<Blob> {
  try {
    // Generate PDF using React PDF
    const blob = await renderToBlob(<CVTemplate data={cvData} />);
    return blob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

export async function downloadPDF(
  cvData: CVData,
  filename: string = "CV.pdf"
): Promise<void> {
  try {
    const blob = await generatePDF(cvData);

    // Create URL and download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
}

export async function getPDFBlob(cvData: CVData): Promise<Blob> {
  try {
    return await generatePDF(cvData);
  } catch (error) {
    console.error("Error creating PDF blob:", error);
    throw error;
  }
}
