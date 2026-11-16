import { NextResponse } from "next/server";
import { createOAuthClient, hasGoogleConfig } from "@/lib/google-drive";
import { createState } from "@/lib/drive-session";

export async function GET() {
  if (!hasGoogleConfig()) {
    return NextResponse.json(
      { error: "Google OAuth is not configured. Add the values in .env.example to .env.local." },
      { status: 503 }
    );
  }

  const state = createState();
  const authUrl = createOAuthClient().generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    state,
    scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/drive.metadata.readonly"],
  });

  return NextResponse.redirect(authUrl);
}
