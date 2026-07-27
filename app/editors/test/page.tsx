import { Suspense } from "react";
import CvTemplateEditorClient from "@/app/minimalist-editor/CvTemplateEditorClient";

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading editor…
        </div>
      }
    >
      <CvTemplateEditorClient templateId="test" />
    </Suspense>
  );
}
