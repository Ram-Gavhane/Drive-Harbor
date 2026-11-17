# Connect Google Drive

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project and enable the **Google Drive API**.
2. Configure the OAuth consent screen, then create a **Web application** OAuth client.
3. Add this authorized redirect URI for local development:

   `http://localhost:3000/api/auth/google/callback`

4. Copy `.env.example` to `.env.local` and fill in the client ID and client secret.
5. Start the app with `npm run dev`, open `http://localhost:3000`, and use **Add account** for every Google account.

The app requests `drive.metadata.readonly`: it can read Drive names, folder structure, file metadata, and storage quota, but cannot open file contents or change Drive data.

## Deployment on Vercel

The session store uses authenticated AES-256-GCM encrypted, compressed, HTTP-only cookies (`lib/drive-session.ts`). This is completely stateless and serverless-ready, meaning no external database or Redis is required.

### 1. Configure Vercel Environment Variables
Add these in your Vercel project settings:
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `NEXT_PUBLIC_APP_URL`: Your Vercel domain (e.g., `https://your-app.vercel.app`)
- `SESSION_SECRET`: *(Optional)* A random 32+ character string. Defaults to `GOOGLE_CLIENT_SECRET` if not provided.

### 2. Update Google Cloud OAuth Credentials
In [Google Cloud Console](https://console.cloud.google.com/) under **APIs & Services > Credentials > OAuth 2.0 Client IDs**:
- Add **Authorized JavaScript origin**: `https://your-app.vercel.app`
- Add **Authorized redirect URI**: `https://your-app.vercel.app/api/auth/google/callback`

### 3. Configure OAuth Consent Screen Links (For Verification)
In Google Cloud Console under **APIs & Services > OAuth consent screen**:
- **Application home page**: `https://your-app.vercel.app`
- **Application privacy policy link**: `https://your-app.vercel.app/privacy` (or `/privacy-policy`)
- **Application terms of service link**: `https://your-app.vercel.app/terms` (or `/terms-and-conditions`)
