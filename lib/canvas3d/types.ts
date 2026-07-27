export type ImageShape = "rectangle" | "circle" | "rounded";

export type TextVariant =
  | "simple"
  | "header"
  | "withIcon"
  | "withImage"
  | "numbered"
  | "bulleted"
  | "sectionTitle"
  | "subtitle"
  | "labelValue"
  | "link";

export type TextAlign = "left" | "center" | "right";
export type FontWeight = "normal" | "bold";
export type ObjectFit = "cover" | "contain";

export interface Canvas3DElementBase {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex: number;
}

export interface Canvas3DShapeElement extends Canvas3DElementBase {
  type: "shape";
  fillColor: string;
  borderRadius?: number;
  opacity?: number;
}

export interface Canvas3DImageElement extends Canvas3DElementBase {
  type: "image";
  src: string;
  shape: ImageShape;
  borderRadius?: number;
  objectFit: ObjectFit;
  opacity?: number;
}

export interface Canvas3DTextElement extends Canvas3DElementBase {
  type: "text";
  variant: TextVariant;
  content: string;
  fontId: string;
  fontSize: number;
  color: string;
  fontWeight: FontWeight;
  align: TextAlign;
  lineHeight?: number;
  icon?: string;
  imageSrc?: string;
  listItems?: string[];
  label?: string;
  href?: string;
}

export type Canvas3DElement =
  | Canvas3DShapeElement
  | Canvas3DImageElement
  | Canvas3DTextElement;

export type ViewMode = "edit" | "preview";

export function isShapeElement(
  el: Canvas3DElement
): el is Canvas3DShapeElement {
  return el.type === "shape";
}

export function isImageElement(
  el: Canvas3DElement
): el is Canvas3DImageElement {
  return el.type === "image";
}

export function isTextElement(el: Canvas3DElement): el is Canvas3DTextElement {
  return el.type === "text";
}
