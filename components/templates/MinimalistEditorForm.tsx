"use client";

import { MinimalistCVData } from "@/lib/types/minimalist-cv";
import { MINIMALIST_SCHEMA } from "@/lib/templates/schemas/minimalist.schema";
import SchemaDrivenForm from "./SchemaDrivenForm";

interface MinimalistEditorFormProps {
  data: MinimalistCVData;
  onChange: (data: MinimalistCVData) => void;
}

/** @deprecated Prefer SchemaDrivenForm with schema from catalog */
export default function MinimalistEditorForm(props: MinimalistEditorFormProps) {
  return (
    <SchemaDrivenForm
      schema={MINIMALIST_SCHEMA}
      data={props.data}
      onChange={(d) => props.onChange(d as MinimalistCVData)}
    />
  );
}
