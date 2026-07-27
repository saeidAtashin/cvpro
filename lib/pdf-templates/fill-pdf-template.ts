import fs from "fs/promises";
import {
  PDFDocument,
  PDFFont,
  PDFPage,
  RGB,
  StandardFonts,
  rgb,
} from "pdf-lib";
import {
  getPdfTemplateEntry,
  resolveTemplatePath,
} from "./registry";
import {
  getValueByPath,
  resolveValueTemplate,
} from "./get-value-by-path";
import type {
  CoverRectElement,
  ImageFieldElement,
  OverlayElement,
  PdfTemplateOverlay,
  RepeatGroupElement,
  RepeatStringsElement,
  TextFieldElement,
} from "./types";

function parseHexColor(hex: string): RGB {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

function topLeftToPdfY(pageHeight: number, yTop: number, lineHeight: number) {
  return pageHeight - yTop - lineHeight;
}

async function loadOverlay(templateId: string): Promise<PdfTemplateOverlay> {
  const entry = getPdfTemplateEntry(templateId);
  if (!entry) throw new Error(`Unknown template: ${templateId}`);
  const overlayPath = resolveTemplatePath(entry.overlayRelativePath);
  const raw = await fs.readFile(overlayPath, "utf8");
  return JSON.parse(raw) as PdfTemplateOverlay;
}

async function embedFonts(
  pdfDoc: PDFDocument,
  templateId: string
): Promise<{ regular: PDFFont; bold: PDFFont }> {
  const entry = getPdfTemplateEntry(templateId);
  const regularPath = entry?.fonts?.regular
    ? resolveTemplatePath(entry.fonts.regular)
    : null;
  const boldPath = entry?.fonts?.bold
    ? resolveTemplatePath(entry.fonts.bold)
    : null;

  try {
    if (regularPath && boldPath) {
      const [regularBytes, boldBytes] = await Promise.all([
        fs.readFile(regularPath),
        fs.readFile(boldPath),
      ]);
      const regular = await pdfDoc.embedFont(regularBytes);
      const bold = await pdfDoc.embedFont(boldBytes);
      return { regular, bold };
    }
  } catch {
    // fall through to standard fonts
  }

  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  return { regular, bold };
}

function drawCover(page: PDFPage, el: CoverRectElement, pageHeight: number) {
  const color = el.color ? parseHexColor(el.color) : rgb(1, 1, 1);
  const pdfY = topLeftToPdfY(pageHeight, el.y, el.height);
  page.drawRectangle({
    x: el.x,
    y: pdfY,
    width: el.width,
    height: el.height,
    color,
    borderWidth: 0,
  });
}

function wrapTextToWidth(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  if (!text || maxWidth <= 0) return text ? [text] : [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, fontSize) <= maxWidth) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawTextField(
  page: PDFPage,
  el: TextFieldElement,
  pageHeight: number,
  fonts: { regular: PDFFont; bold: PDFFont },
  text: string
) {
  if (!text) return;
  const font = el.fontWeight === "bold" ? fonts.bold : fonts.regular;
  const fontSize = el.fontSize;
  const lineHeight = el.lineHeight ?? fontSize * 1.2;
  const color = el.color ? parseHexColor(el.color) : rgb(0.12, 0.16, 0.22);
  const maxWidth = el.maxWidth ?? 2000;

  const lines = wrapTextToWidth(text, font, fontSize, maxWidth);
  lines.forEach((line, i) => {
    const yTop = el.y + i * lineHeight;
    let x = el.x;
    if (el.align === "center" || el.align === "right") {
      const w = font.widthOfTextAtSize(line, fontSize);
      if (el.align === "center") x = el.x + (maxWidth - w) / 2;
      if (el.align === "right") x = el.x + maxWidth - w;
    }
    page.drawText(line, {
      x,
      y: topLeftToPdfY(pageHeight, yTop, fontSize),
      size: fontSize,
      font,
      color,
    });
  });
}

async function drawImageFieldNode(
  page: PDFPage,
  pdfDoc: PDFDocument,
  el: ImageFieldElement,
  pageHeight: number,
  src: string
) {
  if (!src || !src.startsWith("data:")) return;
  const match = src.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/i);
  if (!match) return;
  const format = match[1].toLowerCase();
  const bytes = Buffer.from(match[2], "base64");
  const image =
    format === "png"
      ? await pdfDoc.embedPng(bytes)
      : await pdfDoc.embedJpg(bytes);
  const pdfY = topLeftToPdfY(pageHeight, el.y, el.height);
  page.drawImage(image, {
    x: el.x,
    y: pdfY,
    width: el.width,
    height: el.height,
  });
}

function drawRepeatStrings(
  page: PDFPage,
  el: RepeatStringsElement,
  pageHeight: number,
  fonts: { regular: PDFFont; bold: PDFFont },
  data: unknown
) {
  const arr = getValueByPath(data, el.arrayPath);
  if (!Array.isArray(arr)) return;
  const items = arr.slice(0, el.maxItems);
  items.forEach((item, index) => {
    if (typeof item !== "string" || !item.trim()) return;
    const text = `${el.prefix ?? ""}${item}`;
    drawTextField(
      page,
      {
        type: "text",
        x: el.x,
        y: el.startY + index * el.rowHeight,
        fontSize: el.fontSize,
        fontWeight: el.fontWeight,
        color: el.color,
        maxWidth: el.maxWidth,
      },
      pageHeight,
      fonts,
      text
    );
  });
}

function drawRepeatGroup(
  page: PDFPage,
  el: RepeatGroupElement,
  pageHeight: number,
  fonts: { regular: PDFFont; bold: PDFFont },
  data: unknown
) {
  const arr = getValueByPath(data, el.arrayPath);
  if (!Array.isArray(arr)) return;
  const items = arr.slice(0, el.maxItems);
  items.forEach((item, index) => {
    const rowY = el.startY + index * el.rowHeight;
    for (const field of el.fields) {
      const raw = getValueByPath(item, field.path);
      const text = raw === null || raw === undefined ? "" : String(raw);
      if (!text) continue;
      drawTextField(
        page,
        {
          type: "text",
          x: field.x,
          y: rowY + (field.yOffset ?? 0),
          fontSize: field.fontSize,
          fontWeight: field.fontWeight,
          color: field.color,
          maxWidth: field.maxWidth,
        },
        pageHeight,
        fonts,
        text
      );
    }
  });
}

async function applyElement(
  page: PDFPage,
  pdfDoc: PDFDocument,
  el: OverlayElement,
  pageHeight: number,
  fonts: { regular: PDFFont; bold: PDFFont },
  data: unknown
) {
  switch (el.type) {
    case "cover":
      drawCover(page, el, pageHeight);
      break;
    case "text": {
      let text = "";
      if (el.valueTemplate) {
        text = resolveValueTemplate(data, el.valueTemplate);
      } else if (el.path) {
        const raw = getValueByPath(data, el.path);
        text = raw === null || raw === undefined ? "" : String(raw);
      }
      drawTextField(page, el, pageHeight, fonts, text);
      break;
    }
    case "image": {
      const src = getValueByPath(data, el.path);
      if (typeof src === "string") {
        await drawImageFieldNode(page, pdfDoc, el, pageHeight, src);
      }
      break;
    }
    case "repeat":
      drawRepeatGroup(page, el, pageHeight, fonts, data);
      break;
    case "repeatStrings":
      drawRepeatStrings(page, el, pageHeight, fonts, data);
      break;
    default:
      break;
  }
}

export async function fillPdfTemplate(
  templateId: string,
  data: unknown
): Promise<Uint8Array> {
  const entry = getPdfTemplateEntry(templateId);
  if (!entry) {
    throw new Error(`Unknown PDF template: ${templateId}`);
  }

  const [pdfBytes, overlay] = await Promise.all([
    fs.readFile(resolveTemplatePath(entry.pdfRelativePath)),
    loadOverlay(templateId),
  ]);

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const fonts = await embedFonts(pdfDoc, templateId);
  const pages = pdfDoc.getPages();
  const pageIndex = overlay.pageIndex ?? 0;
  const page = pages[pageIndex];
  if (!page) {
    throw new Error(`Page ${pageIndex} not found in template PDF`);
  }

  const { height: pageHeight } = page.getSize();

  for (const el of overlay.elements) {
    await applyElement(page, pdfDoc, el, pageHeight, fonts, data);
  }

  return pdfDoc.save();
}
