import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccount, getAccounts, removeAccount } from "@/lib/drive-session";
import { getDriveSnapshot } from "@/lib/google-drive";

const cookieName = "drive_harbor_session";
export async function GET(request: Request) {
  const sessionId = (await cookies()).get(cookieName)?.value;
  const accounts = getAccounts(sessionId);
  if (!accounts.length) return NextResponse.json({ accounts: [], items: [] });
  const params = new URL(request.url).searchParams;
  const active = getAccount(sessionId, params.get("account") ?? undefined);
  if (!active) return NextResponse.json({ error: "Drive account not found." }, { status: 404 });
  try {
    const parentId = params.get("parent") ?? undefined;
    const current = await getDriveSnapshot(active, parentId);
    const summaries = await Promise.all(accounts.map(async (account) => {
      if (account.id === active.id) return { id: account.id, email: account.email, name: account.name, picture: account.picture, color: account.color, used: current.used, limit: current.limit, files: current.files };
      const snapshot = await getDriveSnapshot(account);
      return { id: account.id, email: account.email, name: account.name, picture: account.picture, color: account.color, used: snapshot.used, limit: snapshot.limit, files: snapshot.files };
    }));
    return NextResponse.json({ accounts: summaries, items: current.items, currentAccountId: active.id, parentId });
  } catch (error) {
    console.error("Google Drive request failed", error);
    return NextResponse.json({ error: "Unable to read this Drive. Reconnect the account and try again." }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  const sessionId = (await cookies()).get(cookieName)?.value;
  const accountId = new URL(request.url).searchParams.get("account");
  if (!sessionId || !accountId || !getAccount(sessionId, accountId)) return NextResponse.json({ error: "Drive account not found." }, { status: 404 });
  removeAccount(sessionId, accountId);
  return NextResponse.json({ ok: true });
}
