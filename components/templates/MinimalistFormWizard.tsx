"use client";

import { MinimalistCVData } from "@/lib/types/minimalist-cv";
import { MINIMALIST_SCHEMA } from "@/lib/templates/schemas/minimalist.schema";
import SchemaWizard from "./SchemaWizard";
import MinimalistTemplate from "./MinimalistTemplate";

interface MinimalistFormWizardProps {
  data: MinimalistCVData;
  onChange: (data: MinimalistCVData) => void;
  onShowPreview: () => void;
}

export default function MinimalistFormWizard(props: MinimalistFormWizardProps) {
  return (
    <SchemaWizard
      schema={MINIMALIST_SCHEMA}
      data={props.data}
      onChange={(d) => props.onChange(d as MinimalistCVData)}
      onShowPreview={props.onShowPreview}
      renderPreview={() => <MinimalistTemplate data={props.data} />}
    />
  );
}
