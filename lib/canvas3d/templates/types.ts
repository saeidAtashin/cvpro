import type { Canvas3DElement } from "../types";

export interface Canvas3DTemplateDefinition {
  id: string;
  name: string;
  thumbnail: string;
  elements: Canvas3DElement[];
}
