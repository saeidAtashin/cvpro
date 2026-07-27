import { redirect } from "next/navigation";
import { PRIMARY_MINIMALIST_SLUG } from "@/lib/templates/catalog";

export default function MinimalistEditorAliasPage() {
  redirect(`/editors/${PRIMARY_MINIMALIST_SLUG}`);
}
