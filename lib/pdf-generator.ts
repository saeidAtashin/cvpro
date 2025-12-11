"use client";

import { CVData } from "./types";

export async function generatePDF(cvData: CVData): Promise<Blob> {
  try {
    console.log("Calling PDF generation API with data:", cvData);
    // Call API route to generate PDF on the server
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cvData),
    });

    console.log("API response status:", response.status, response.statusText);

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `Failed to generate PDF: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.details || errorMessage;
      } catch {
        // If response is not JSON, use status text
        const text = await response.text();
        if (text) {
          errorMessage += ` - ${text}`;
        }
      }
      throw new Error(errorMessage);
    }

    const blob = await response.blob();
    console.log("PDF blob received, size:", blob.size, "type:", blob.type);
    if (blob.size === 0) {
      throw new Error("Received empty PDF blob from server");
    }
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
