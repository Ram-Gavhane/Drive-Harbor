import { NextResponse } from "next/server";
import { createOAuthClient, hasGoogleConfig } from "@/lib/google-drive";
import { createState, newSessionId } from "@/lib/drive-session";

const cookieName = "drive_harbor_session";

export async function GET(request: Request) {
  if (!hasGoogleConfig()) return NextResponse.json({ error: "Google OAuth is not configured. Add the values in .env.example to .env.local." }, { status: 503 });
  const currentCookie = request.headers.get("cookie")?.match(new RegExp(`${cookieName}=([^;]+)`))?.[1];
  const sessionId = currentCookie ?? newSessionId();
  const state = createState(sessionId);
  const authUrl = createOAuthClient().generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    state,
    scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/drive.metadata.readonly"],
  });
  const response = NextResponse.redirect(authUrl);
  response.cookies.set(cookieName, sessionId, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return response;
}
