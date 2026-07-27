export type RgbColor = { r: number; g: number; b: number };

export interface PdfTemplatePageSize {
  width: number;
  height: number;
}

export interface CoverRectElement {
  type: "cover";
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface TextFieldElement {
  type: "text";
  /** Dot path into CV data, or omit when using `valueTemplate` */
  path?: string;
  /** e.g. "{personalInfo.firstName} {personalInfo.lastName}" */
  valueTemplate?: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight?: "regular" | "bold";
  color?: string;
  maxWidth?: number;
  lineHeight?: number;
  align?: "left" | "center" | "right";
}

export interface ImageFieldElement {
  type: "image";
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RepeatFieldSlot {
  path: string;
  x: number;
  yOffset?: number;
  fontSize: number;
  fontWeight?: "regular" | "bold";
  color?: string;
  maxWidth?: number;
}

export interface RepeatGroupElement {
  type: "repeat";
  arrayPath: string;
  maxItems: number;
  startY: number;
  rowHeight: number;
  fields: RepeatFieldSlot[];
}

export interface RepeatStringsElement {
  type: "repeatStrings";
  arrayPath: string;
  maxItems: number;
  startY: number;
  rowHeight: number;
  x: number;
  fontSize: number;
  fontWeight?: "regular" | "bold";
  color?: string;
  maxWidth?: number;
  prefix?: string;
}

export type OverlayElement =
  | CoverRectElement
  | TextFieldElement
  | ImageFieldElement
  | RepeatGroupElement
  | RepeatStringsElement;

export interface PdfTemplateOverlay {
  pageIndex: number;
  pageWidth: number;
  pageHeight: number;
  elements: OverlayElement[];
}

export interface PdfTemplateRegistryEntry {
  id: string;
  name: string;
  schemaId: "minimalist";
  pdfRelativePath: string;
  overlayRelativePath: string;
  pageSize: PdfTemplatePageSize;
  fonts?: {
    regular?: string;
    bold?: string;
  };
}
