import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { CVTemplate } from "@/components/cv_structure";
import { CVData } from "@/lib/types";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const cvData: CVData = await request.json();

    // Generate PDF using React PDF on the server
    // Create the component element - Type assertion needed for React PDF v4 compatibility
    const pdfElement = React.createElement(CVTemplate, { data: cvData });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = await renderToStream(pdfElement as any);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      // Handle both Buffer and string chunks
      if (Buffer.isBuffer(chunk)) {
        chunks.push(chunk);
      } else if (typeof chunk === "string") {
        chunks.push(Buffer.from(chunk, "utf-8"));
      } else {
        // Handle Uint8Array or other buffer-like objects
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bufferChunk = chunk as any;
        if (bufferChunk instanceof ArrayBuffer) {
          chunks.push(Buffer.from(new Uint8Array(bufferChunk)));
        } else {
          chunks.push(Buffer.from(bufferChunk));
        }
      }
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
