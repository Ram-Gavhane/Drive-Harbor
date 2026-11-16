import "server-only";
import { google } from "googleapis";
import type { StoredAccount } from "./drive-session";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const redirectUri = `${appUrl}/api/auth/google/callback`;

export function hasGoogleConfig() { return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET); }
export function createOAuthClient() {
  return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUri);
}

export async function getDriveSnapshot(account: StoredAccount, parentId?: string) {
  const auth = createOAuthClient();
  auth.setCredentials(account.credentials);
  const drive = google.drive({ version: "v3", auth });
  const [aboutResult, filesResult] = await Promise.all([
    drive.about.get({ fields: "user,storageQuota" }),
    drive.files.list({
      q: `'${parentId ?? "root"}' in parents and trashed = false`,
      orderBy: "folder,name",
      pageSize: 100,
      fields: "files(id,name,mimeType,size,modifiedTime,owners(displayName))",
    }),
  ]);
  account.credentials = auth.credentials;
  const quota = aboutResult.data.storageQuota;
  return {
    used: Number(quota?.usage ?? 0),
    limit: Number(quota?.limit ?? 0),
    files: filesResult.data.files?.length ?? 0,
    items: (filesResult.data.files ?? []).map((file) => ({
      id: file.id ?? "",
      name: file.name ?? "Untitled",
      mimeType: file.mimeType ?? "application/octet-stream",
      size: Number(file.size ?? 0),
      modifiedTime: file.modifiedTime ?? undefined,
      owners: file.owners?.map((owner) => owner.displayName ?? "") .filter(Boolean),
    })),
  };
}
