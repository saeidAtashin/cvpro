import { defaultMinimalistCVData } from "@/lib/default-minimalist-cv-data";
import { defaultCenteredRtlCVData } from "@/lib/default-centered-rtl-cv-data";
import { MINIMALIST_SCHEMA } from "./minimalist.schema";
import { CENTERED_RTL_SCHEMA } from "./centered-rtl.schema";
import { TemplateSchema } from "./types";
import { validateDataPathsAgainstSchema } from "../schema-utils";

export const SCHEMA_REGISTRY: Record<string, TemplateSchema> = {
  minimalist: MINIMALIST_SCHEMA,
  centeredRtl: CENTERED_RTL_SCHEMA,
};

export const DEFAULT_DATA_BY_SCHEMA_ID: Record<string, unknown> = {
  minimalist: defaultMinimalistCVData,
  centeredRtl: defaultCenteredRtlCVData,
};

export const LAYOUT_REGISTRY = {
  minimalist: "minimalist",
  centeredRtl: "centeredRtl",
} as const;

export type TemplateLayoutId = keyof typeof LAYOUT_REGISTRY;

function leafPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }
  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).flatMap(([key, value]) =>
      leafPaths(value, prefix ? `${prefix}.${key}` : key)
    );
  }
  return prefix ? [prefix] : [];
}

export function validateSchemaCoverage(
  schema: TemplateSchema,
  defaultData: unknown
): void {
  const schemaPaths = new Set(
    schema.sections.flatMap((s) => s.fields.map((f) => f.path))
  );
  const missingInSchema = validateDataPathsAgainstSchema(
    defaultData as Record<string, unknown>,
    schemaPaths
  );
  if (missingInSchema.length > 0) {
    throw new Error(
      `[${schema.id}] Schema missing paths: ${missingInSchema.join(", ")}`
    );
  }
  for (const p of leafPaths(defaultData)) {
    if (!schemaPaths.has(p)) {
      throw new Error(`[${schema.id}] Schema does not cover path: ${p}`);
    }
  }
}

export function validateAllSchemas(): void {
  for (const [schemaId, schema] of Object.entries(SCHEMA_REGISTRY)) {
    const data = DEFAULT_DATA_BY_SCHEMA_ID[schemaId];
    if (!data) {
      throw new Error(`No default data for schema: ${schemaId}`);
    }
    validateSchemaCoverage(schema, data);
  }
}
