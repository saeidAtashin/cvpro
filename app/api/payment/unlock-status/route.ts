import { NextRequest, NextResponse } from "next/server";
import {
  DOWNLOAD_UNLOCK_COOKIE,
  isTemplateUnlocked,
} from "@/lib/payment/download-cookie";

export async function GET(req: NextRequest) {
  const templateId = req.nextUrl.searchParams.get("templateId");
  if (!templateId) {
    return NextResponse.json(
      { error: "templateId is required" },
      { status: 400 }
    );
  }

  const cookie = req.cookies.get(DOWNLOAD_UNLOCK_COOKIE)?.value;
  const unlocked = await isTemplateUnlocked(cookie, templateId);

  return NextResponse.json({ unlocked });
}
