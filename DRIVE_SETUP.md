# Connect Google Drive

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project and enable the **Google Drive API**.
2. Configure the OAuth consent screen, then create a **Web application** OAuth client.
3. Add this authorized redirect URI for local development:

   `http://localhost:3000/api/auth/google/callback`

4. Copy `.env.example` to `.env.local` and fill in the client ID and client secret.
5. Start the app with `npm run dev`, open `http://localhost:3000`, and use **Add account** for every Google account.

The app requests `drive.metadata.readonly`: it can read Drive names, folder structure, file metadata, and storage quota, but cannot open file contents or change Drive data.

## Deployment note

The current connection store is in process memory, appropriate for local development and a single running instance. For a deployed app, replace `lib/drive-session.ts` with a durable encrypted session/token store (for example Postgres plus KMS or a managed auth provider) before relying on persistent account connections.
