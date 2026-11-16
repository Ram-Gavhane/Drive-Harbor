import { NextResponse } from "next/server";
import { createOAuthClient, hasGoogleConfig } from "@/lib/google-drive";
import { COOKIE_NAME, SESSION_COOKIE_OPTIONS, saveAccount, useState } from "@/lib/drive-session";

const colors = ["violet", "orange", "blue"];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieHeader = request.headers.get("cookie") ?? "";
  const sessionCookie = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))?.[1];

  if (!hasGoogleConfig() || !code || !state || !useState(sessionCookie, state)) {
    return NextResponse.redirect(new URL("/?connection=failed", url));
  }

  try {
    const auth = createOAuthClient();
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    const profileResponse = await auth.request<{ email?: string; name?: string; picture?: string; sub?: string }>({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });
    const profile = profileResponse.data;
    if (!profile.email || !profile.sub) {
      throw new Error("Google did not return an account identity.");
    }

    const updatedCookie = saveAccount(sessionCookie, {
      id: profile.sub,
      email: profile.email,
      name: profile.name ?? profile.email.split("@")[0],
      picture: profile.picture,
      credentials: tokens,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const response = NextResponse.redirect(new URL("/?connection=success", url));
    response.cookies.set(COOKIE_NAME, updatedCookie, SESSION_COOKIE_OPTIONS);
    return response;
  } catch (error) {
    console.error("OAuth callback failed", error);
    return NextResponse.redirect(new URL("/?connection=failed", url));
  }
}
