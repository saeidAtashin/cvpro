import path from "path";

const ROOT = path.join(process.cwd());

export function resolveTemplatePath(relativePath: string): string {
  return path.join(ROOT, relativePath);
}

export { getPdfTemplateEntry, listPdfTemplateIds } from "./catalog";
