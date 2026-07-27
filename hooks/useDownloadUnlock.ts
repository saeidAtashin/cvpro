"use client";

import { useCallback, useEffect, useState } from "react";

export function useDownloadUnlock(templateId: string) {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/payment/unlock-status?templateId=${encodeURIComponent(templateId)}`
      );
      const json = (await res.json()) as { unlocked?: boolean };
      setUnlocked(Boolean(json.unlocked));
    } catch {
      setUnlocked(false);
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const startPayment = async () => {
    const res = await fetch("/api/payment/zarinpal/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    });
    const json = (await res.json()) as {
      paymentUrl?: string;
      error?: string;
    };
    if (!res.ok || !json.paymentUrl) {
      throw new Error(json.error || "Could not start payment");
    }
    window.location.href = json.paymentUrl;
  };

  return { unlocked, loading, refresh, startPayment };
}
