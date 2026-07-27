export { getValueByPath } from "@/lib/templates/schema-utils";

export function resolveValueTemplate(
  data: unknown,
  template: string
): string {
  return template.replace(/\{([^}]+)\}/g, (_, path: string) => {
    const parts = path.trim().split(".");
    let current: unknown = data;
    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== "object") {
        return "";
      }
      current = (current as Record<string, unknown>)[part];
    }
    if (current === null || current === undefined) return "";
    return String(current);
  }).replace(/\s+/g, " ").trim();
}
