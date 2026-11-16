import "server-only";
import crypto from "crypto";
import zlib from "zlib";
import type { Credentials } from "google-auth-library";

export const COOKIE_NAME = "drive_harbor_session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export type StoredAccount = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  credentials: Credentials;
  color: string;
};

function getSecretKey(): Buffer {
  const secret =
    process.env.SESSION_SECRET ||
    process.env.GOOGLE_CLIENT_SECRET ||
    "drive-harbor-default-secret-key-change-me";
  return crypto.createHash("sha256").update(secret).digest();
}

function cleanCredentials(creds: Credentials): Credentials {
  return {
    access_token: creds.access_token,
    refresh_token: creds.refresh_token,
    scope: creds.scope,
    token_type: creds.token_type,
    expiry_date: creds.expiry_date,
  };
}

export function encryptSession(accounts: StoredAccount[]): string {
  try {
    const cleaned = accounts.map((account) => ({
      ...account,
      credentials: cleanCredentials(account.credentials),
    }));
    const json = JSON.stringify(cleaned);
    const compressed = zlib.deflateSync(json);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", getSecretKey(), iv);
    const ciphertext = Buffer.concat([cipher.update(compressed), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString("base64url")}.${tag.toString("base64url")}.${ciphertext.toString("base64url")}`;
  } catch (error) {
    console.error("Failed to encrypt session:", error);
    return "";
  }
}

export function decryptSession(cookieValue?: string | null): StoredAccount[] {
  if (!cookieValue) return [];
  try {
    const parts = cookieValue.split(".");
    if (parts.length !== 3) return [];
    const [ivB64, tagB64, dataB64] = parts;
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      getSecretKey(),
      Buffer.from(ivB64, "base64url")
    );
    decipher.setAuthTag(Buffer.from(tagB64, "base64url"));
    const decryptedCompressed = Buffer.concat([
      decipher.update(Buffer.from(dataB64, "base64url")),
      decipher.final(),
    ]);
    const decompressed = zlib.inflateSync(decryptedCompressed).toString("utf8");
    const data = JSON.parse(decompressed);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function newSessionId(): string {
  return crypto.randomUUID();
}

export function createState(_sessionId?: string): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${timestamp}:${nonce}`;
  const hmac = crypto.createHmac("sha256", getSecretKey()).update(payload).digest("base64url");
  return `${payload}.${hmac}`;
}

export function useState(_sessionId: string | undefined, state: string | null): boolean {
  if (!state) return false;
  try {
    const parts = state.split(".");
    if (parts.length !== 2) return false;
    const [payload, hmac] = parts;
    const expectedHmac = crypto.createHmac("sha256", getSecretKey()).update(payload).digest("base64url");
    if (hmac.length !== expectedHmac.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) return false;
    const [timestampStr] = payload.split(":");
    const timestamp = Number(timestampStr);
    if (isNaN(timestamp)) return false;
    // Expire state after 15 minutes
    if (Date.now() - timestamp > 15 * 60 * 1000 || timestamp > Date.now() + 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export function saveAccount(sessionCookie: string | undefined, account: StoredAccount): string {
  const accounts = decryptSession(sessionCookie).filter((existing) => existing.id !== account.id);
  accounts.push({
    ...account,
    credentials: cleanCredentials(account.credentials),
  });
  return encryptSession(accounts);
}

export function removeAccount(sessionCookie: string | undefined, accountId: string): string {
  const accounts = decryptSession(sessionCookie).filter((existing) => existing.id !== accountId);
  return encryptSession(accounts);
}

export function getAccounts(sessionCookie?: string | null): StoredAccount[] {
  return decryptSession(sessionCookie);
}

export function getAccount(
  sessionCookie: string | undefined | null,
  accountId?: string
): StoredAccount | undefined {
  const accounts = getAccounts(sessionCookie);
  return accountId ? accounts.find((account) => account.id === accountId) : accounts[0];
}
