export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "file"
  | "stringList"
  | "experienceList"
  | "educationList"
  | "jobExperienceList"
  | "skillCategoryList"
  | "projectList";

export type TemplateLocale = "ar" | "fa" | "en";

export interface SchemaField {
  id: string;
  label: string;
  type: FieldType;
  path: string;
  placeholder?: string;
  labelsByLocale?: Partial<Record<TemplateLocale, string>>;
}

export interface SchemaSection {
  id: string;
  title: string;
  fields: SchemaField[];
  titlesByLocale?: Partial<Record<TemplateLocale, string>>;
}

export interface TemplateSchema {
  id: string;
  sections: SchemaSection[];
}
