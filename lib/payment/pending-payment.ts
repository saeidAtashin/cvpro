interface PendingPayment {
  templateId: string;
  amountRial: number;
  createdAt: number;
}

const pending = new Map<string, PendingPayment>();

const MAX_AGE_MS = 30 * 60 * 1000;

export function storePendingPayment(
  authority: string,
  templateId: string,
  amountRial: number
) {
  pending.set(authority, {
    templateId,
    amountRial,
    createdAt: Date.now(),
  });
}

export function consumePendingPayment(
  authority: string
): PendingPayment | null {
  const entry = pending.get(authority);
  pending.delete(authority);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > MAX_AGE_MS) return null;
  return entry;
}

export function peekPendingPayment(
  authority: string
): PendingPayment | null {
  const entry = pending.get(authority);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > MAX_AGE_MS) {
    pending.delete(authority);
    return null;
  }
  return entry;
}
