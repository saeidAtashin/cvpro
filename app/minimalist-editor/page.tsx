import { Suspense } from "react";
import MinimalistEditorClient from "./MinimalistEditorClient";

export default function MinimalistEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading editor…
        </div>
      }
    >
      <MinimalistEditorClient />
    </Suspense>
  );
}
