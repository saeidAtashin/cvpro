import { NextRequest, NextResponse } from "next/server";
import { getTemplateById } from "@/lib/templates/catalog";
import {
  consumePendingPayment,
  peekPendingPayment,
} from "@/lib/payment/pending-payment";
import { zarinpalPaymentVerify } from "@/lib/payment/zarinpal";
import {
  DOWNLOAD_UNLOCK_COOKIE,
  signDownloadUnlock,
} from "@/lib/payment/download-cookie";

export async function GET(req: NextRequest) {
  const authority = req.nextUrl.searchParams.get("Authority");
  const status = req.nextUrl.searchParams.get("Status");

  const fallbackEditor = "/minimalist-editor";

  if (!authority || status !== "OK") {
    return NextResponse.redirect(
      new URL(`${fallbackEditor}?payment=failed`, req.url)
    );
  }

  const pending = peekPendingPayment(authority);
  if (!pending) {
    return NextResponse.redirect(
      new URL(`${fallbackEditor}?payment=expired`, req.url)
    );
  }

  const verify = await zarinpalPaymentVerify(authority, pending.amountRial);
  if (!verify.ok) {
    consumePendingPayment(authority);
    return NextResponse.redirect(
      new URL(`${fallbackEditor}?payment=verify_failed`, req.url)
    );
  }

  consumePendingPayment(authority);

  const template = getTemplateById(pending.templateId);
  const editorPath = template?.editorPath ?? fallbackEditor;

  const token = await signDownloadUnlock(pending.templateId, authority);
  const redirectUrl = new URL(editorPath, req.url);
  redirectUrl.searchParams.set("paid", "1");

  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set(DOWNLOAD_UNLOCK_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
