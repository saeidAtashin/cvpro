import { TemplateSchema, TemplateLocale, SchemaSection, SchemaField } from "./schemas/types";
import { SCHEMA_REGISTRY } from "./schemas/registry";
import { isGeneratedEntry, getTemplateById } from "./catalog";

function resolveField(field: SchemaField, locale: TemplateLocale): SchemaField {
  return {
    ...field,
    label: field.labelsByLocale?.[locale] ?? field.label,
  };
}

function resolveSection(
  section: SchemaSection,
  locale: TemplateLocale
): SchemaSection {
  return {
    ...section,
    title: section.titlesByLocale?.[locale] ?? section.title,
    fields: section.fields.map((f) => resolveField(f, locale)),
  };
}

export function resolveSchema(
  schema: TemplateSchema,
  locale: TemplateLocale
): TemplateSchema {
  return {
    ...schema,
    sections: schema.sections.map((s) => resolveSection(s, locale)),
  };
}

export function getSchemaForTemplate(
  templateId: string
): TemplateSchema | null {
  const entry = getTemplateById(templateId);
  if (!entry || !isGeneratedEntry(entry)) {
    return null;
  }
  const schema = SCHEMA_REGISTRY[entry.schemaId];
  if (!schema) return null;
  return resolveSchema(schema, entry.locale);
}
