import { SignJWT, jwtVerify } from "jose";

export const DOWNLOAD_UNLOCK_COOKIE = "cv_download_unlock";

export interface DownloadUnlockPayload {
  templateId: string;
  authority: string;
  exp: number;
}

function getSecret(): Uint8Array {
  const secret = process.env.DOWNLOAD_UNLOCK_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("DOWNLOAD_UNLOCK_SECRET must be set (min 16 chars)");
  }
  return new TextEncoder().encode(secret);
}

export async function signDownloadUnlock(
  templateId: string,
  authority: string,
  ttlSeconds = 60 * 60 * 24 * 7
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  return new SignJWT({ templateId, authority })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .sign(getSecret());
}

export async function verifyDownloadUnlock(
  token: string
): Promise<DownloadUnlockPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const templateId = payload.templateId;
    const authority = payload.authority;
    if (typeof templateId !== "string" || typeof authority !== "string") {
      return null;
    }
    const exp =
      typeof payload.exp === "number" ? payload.exp : Math.floor(Date.now() / 1000);
    return { templateId, authority, exp };
  } catch {
    return null;
  }
}

export async function isTemplateUnlocked(
  cookieValue: string | undefined,
  templateId: string
): Promise<boolean> {
  if (!cookieValue) return false;
  const payload = await verifyDownloadUnlock(cookieValue);
  return payload?.templateId === templateId;
}
