import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { CVTemplate } from "@/components/cv_structure";
import { CVData } from "@/lib/types";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const cvData: CVData = await request.json();

    // Generate PDF using React PDF on the server
    // Using React.createElement to avoid JSX issues in API routes
    const stream = await renderToStream(
      React.createElement(CVTemplate, { data: cvData })
    );

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return PDF buffer
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="CV.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
