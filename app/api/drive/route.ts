import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  encryptSession,
  getAccount,
  getAccounts,
  removeAccount,
} from "@/lib/drive-session";
import { getDriveSnapshot } from "@/lib/google-drive";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;
  const accounts = getAccounts(sessionCookie);

  if (!accounts.length) return NextResponse.json({ accounts: [], items: [] });

  const params = new URL(request.url).searchParams;
  const active = getAccount(sessionCookie, params.get("account") ?? undefined);
  if (!active) return NextResponse.json({ error: "Drive account not found." }, { status: 404 });

  try {
    const parentId = params.get("parent") ?? undefined;
    const current = await getDriveSnapshot(active, parentId);
    const summaries = await Promise.all(
      accounts.map(async (account) => {
        if (account.id === active.id) {
          return {
            id: account.id,
            email: account.email,
            name: account.name,
            picture: account.picture,
            color: account.color,
            used: current.used,
            limit: current.limit,
            files: current.files,
          };
        }
        const snapshot = await getDriveSnapshot(account);
        return {
          id: account.id,
          email: account.email,
          name: account.name,
          picture: account.picture,
          color: account.color,
          used: snapshot.used,
          limit: snapshot.limit,
          files: snapshot.files,
        };
      })
    );

    const response = NextResponse.json({
      accounts: summaries,
      items: current.items,
      currentAccountId: active.id,
      parentId,
    });

    // If Google refreshed credentials during Drive API calls, persist updated tokens
    const updatedCookie = encryptSession(accounts);
    if (updatedCookie && updatedCookie !== sessionCookie) {
      response.cookies.set(COOKIE_NAME, updatedCookie, SESSION_COOKIE_OPTIONS);
    }

    return response;
  } catch (error) {
    console.error("Google Drive request failed", error);
    return NextResponse.json(
      { error: "Unable to read this Drive. Reconnect the account and try again." },
      { status: 502 }
    );
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;
  const accountId = new URL(request.url).searchParams.get("account");

  if (!sessionCookie || !accountId || !getAccount(sessionCookie, accountId)) {
    return NextResponse.json({ error: "Drive account not found." }, { status: 404 });
  }

  const updatedCookie = removeAccount(sessionCookie, accountId);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, updatedCookie, SESSION_COOKIE_OPTIONS);
  return response;
}
