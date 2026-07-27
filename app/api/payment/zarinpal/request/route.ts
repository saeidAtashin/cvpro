import { NextRequest, NextResponse } from "next/server";
import {
  getTemplateById,
  priceTomanToRial,
} from "@/lib/templates/catalog";
import {
  getCallbackUrl,
  zarinpalPaymentRequest,
} from "@/lib/payment/zarinpal";
import { storePendingPayment } from "@/lib/payment/pending-payment";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { templateId?: string };
    const templateId = body.templateId;
    if (!templateId) {
      return NextResponse.json(
        { error: "templateId is required" },
        { status: 400 }
      );
    }

    const template = getTemplateById(templateId);
    if (!template) {
      return NextResponse.json({ error: "Unknown template" }, { status: 404 });
    }

    const amountRial = priceTomanToRial(template.priceToman);
    const { authority, paymentUrl } = await zarinpalPaymentRequest(
      amountRial,
      `CV download: ${template.name}`,
      getCallbackUrl()
    );

    storePendingPayment(authority, templateId, amountRial);

    return NextResponse.json({ paymentUrl, authority });
  } catch (error) {
    console.error("Zarinpal request error:", error);
    const message =
      error instanceof Error ? error.message : "Payment request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
