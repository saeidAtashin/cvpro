const SANDBOX_API = "https://sandbox.zarinpal.com/pg/v4/payment";
const PRODUCTION_API = "https://api.zarinpal.com/pg/v4/payment";

function apiBase(): string {
  return process.env.ZARINPAL_SANDBOX === "false"
    ? PRODUCTION_API
    : SANDBOX_API;
}

function startPayBase(): string {
  return process.env.ZARINPAL_SANDBOX === "false"
    ? "https://www.zarinpal.com/pg/StartPay"
    : "https://sandbox.zarinpal.com/pg/StartPay";
}

export function getMerchantId(): string {
  const id = process.env.ZARINPAL_MERCHANT_ID;
  if (!id) {
    throw new Error("ZARINPAL_MERCHANT_ID is not configured");
  }
  return id;
}

export function getCallbackUrl(): string {
  const url = process.env.PAYMENT_CALLBACK_URL;
  if (!url) {
    throw new Error("PAYMENT_CALLBACK_URL is not configured");
  }
  return url;
}

export interface PaymentRequestResult {
  authority: string;
  paymentUrl: string;
}

export async function zarinpalPaymentRequest(
  amountRial: number,
  description: string,
  callbackUrl: string
): Promise<PaymentRequestResult> {
  const res = await fetch(`${apiBase()}/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: getMerchantId(),
      amount: amountRial,
      callback_url: callbackUrl,
      description,
    }),
  });

  const json = (await res.json()) as {
    data?: { authority?: string; code?: number; message?: string };
    errors?: unknown;
  };

  const code = json.data?.code;
  const authority = json.data?.authority;
  if (code !== 100 || !authority) {
    const msg =
      json.data?.message ||
      JSON.stringify(json.errors ?? json) ||
      "Zarinpal request failed";
    throw new Error(msg);
  }

  return {
    authority,
    paymentUrl: `${startPayBase()}/${authority}`,
  };
}

export async function zarinpalPaymentVerify(
  authority: string,
  amountRial: number
): Promise<{ ok: boolean; refId?: number; code?: number }> {
  const res = await fetch(`${apiBase()}/verify.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: getMerchantId(),
      amount: amountRial,
      authority,
    }),
  });

  const json = (await res.json()) as {
    data?: { code?: number; ref_id?: number; message?: string };
  };

  const code = json.data?.code;
  if (code === 100 || code === 101) {
    return { ok: true, refId: json.data?.ref_id, code };
  }
  return { ok: false, code };
}
