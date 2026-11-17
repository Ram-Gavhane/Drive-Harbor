import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Drive Harbor",
  description:
    "Privacy Policy for Drive Harbor. Learn how we access, use, and protect your Google Drive metadata and account information.",
};

function Mark() {
  return (
    <span className="mark mark-small" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <header className="legal-topbar">
        <Link className="wordmark" href="/">
          <Mark /> archive
        </Link>
        <nav className="legal-nav-links">
          <Link className="legal-nav-link active" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="legal-nav-link" href="/terms">
            Terms of Service
          </Link>
          <Link className="legal-nav-btn" href="/">
            ← Back to App
          </Link>
        </nav>
      </header>

      <main className="legal-main">
        <header className="legal-header">
          <div className="legal-badge">
            <span className="legal-badge-dot" />
            Google API User Data Policy Compliant
          </div>
          <p className="eyebrow">TRANSPARENCY & DATA PROTECTION</p>
          <h1>Privacy Policy</h1>
          <p className="legal-subtitle">
            Drive Harbor (&ldquo;Archive&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is built with a
            strict commitment to user privacy. We provide a calm, unified overview of your cloud storage quotas and
            file metadata without ever inspecting or storing your file contents.
          </p>
          <div className="legal-meta">
            <span>Effective Date: November 17, 2026</span>
            <span>·</span>
            <span>Version: 1.0</span>
          </div>
        </header>

        <section className="legal-card-grid">
          <div className="legal-mini-card">
            <strong>Read-Only Metadata Scope</strong>
            <p>
              We only request read access to file names, sizes, and drive quotas. We cannot open, read, edit, or delete
              your file contents.
            </p>
          </div>
          <div className="legal-mini-card">
            <strong>Stateless &amp; Zero Database</strong>
            <p>
              Your credentials are encrypted using AES-256-GCM directly inside your secure HTTP-only browser cookie. No
              server database stores your files.
            </p>
          </div>
          <div className="legal-mini-card">
            <strong>No Selling &amp; No AI Training</strong>
            <p>
              We never sell your data, use it for advertising, share it with third parties, or use your data to train AI
              or machine learning models.
            </p>
          </div>
          <div className="legal-mini-card">
            <strong>Complete Control &amp; Revocation</strong>
            <p>
              Remove any connected drive instantly with one click, or revoke authorization anytime via your Google
              Account security page.
            </p>
          </div>
        </section>

        <div className="legal-callout">
          <h3>Google API Services User Data Policy Compliance</h3>
          <p>
            Drive Harbor&apos;s use and transfer of information received from Google APIs to any other app will adhere to
            the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </div>

        <article className="legal-body">
          <h2>1. Introduction</h2>
          <p>
            Drive Harbor is a personal cloud management tool designed to give you a single, peaceful overview of your
            storage capacity and usage across multiple Google Drive accounts. This Privacy Policy details the types of
            information we access, how we use it, how it is secured, and the choices you have regarding your data.
          </p>
          <p>
            By connecting a Google account to Drive Harbor, you consent to the data practices described in this policy.
          </p>

          <h2>2. Google User Data We Access and Scopes Requested</h2>
          <p>
            To provide storage metrics and folder navigation, Drive Harbor connects to Google APIs using OAuth 2.0. We
            strictly adhere to the principle of least privilege, requesting only the minimum permissions necessary:
          </p>

          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>OAuth Scope</th>
                  <th>Permission Level</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>openid</code>, <code>email</code>, <code>profile</code>
                  </td>
                  <td>Basic Identity</td>
                  <td>
                    Retrieves your email address, display name, and avatar picture to identify and label each connected
                    Drive account in your dashboard.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>https://www.googleapis.com/auth/drive.metadata.readonly</code>
                  </td>
                  <td>Read-Only Metadata</td>
                  <td>
                    Fetches storage quota (used bytes and total allocation), folder structure, file names, file sizes,
                    MIME types, and modification timestamps.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>What We Do NOT Access or Collect</h3>
          <ul>
            <li>
              <strong>No File Contents:</strong> We cannot view, open, read, parse, or download the contents of your
              documents, sheets, photos, videos, or archives.
            </li>
            <li>
              <strong>No Write or Delete Permissions:</strong> We cannot create, alter, rename, share, or delete any of
              your files or folders on Google Drive.
            </li>
            <li>
              <strong>No Other Google Services:</strong> We have no access to your Gmail messages, Google Photos
              library, Google Contacts, Google Calendar, or other personal data.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>The information accessed from Google APIs is used exclusively for:</p>
          <ul>
            <li>
              <strong>Quota Aggregation:</strong> Calculating total used and available storage across all your connected
              accounts.
            </li>
            <li>
              <strong>Metadata Navigation:</strong> Rendering folder trees and file item lists so you can see where your
              space is consumed.
            </li>
            <li>
              <strong>Authentication &amp; Session Management:</strong> Refreshing temporary OAuth access tokens to
              display live storage metrics when you open the application.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> use your data for advertising, behavioural targeting, monetization, or marketing
            analytics.
          </p>

          <h2>4. Google API Limited Use Requirements</h2>
          <p>
            In accordance with the Google API Services User Data Policy, Drive Harbor strictly upholds the following
            commitments:
          </p>
          <ul>
            <li>
              <strong>No Human Review:</strong> No human will ever read or inspect your Google user data unless you have
              granted explicit affirmative agreement for troubleshooting, when required by applicable law, or when
              aggregated and anonymized for security defense.
            </li>
            <li>
              <strong>No Transfer to Third Parties:</strong> We do not sell, license, or transfer your Google user data
              to third parties, advertisers, or data brokers.
            </li>
            <li>
              <strong>No Advertising:</strong> We never use or transfer Google user data for serving personalized,
              re-targeted, or interest-based advertising.
            </li>
            <li>
              <strong>No AI / ML Model Training:</strong> Google user data is never used to train, develop, fine-tune, or
              improve generalized artificial intelligence or machine learning models.
            </li>
          </ul>

          <h2>5. Data Storage, Security, and Stateless Architecture</h2>
          <p>
            Drive Harbor employs a modern, security-first stateless architecture designed to minimize risk:
          </p>
          <ul>
            <li>
              <strong>Client-Side Encrypted Cookies:</strong> Your OAuth tokens and account metadata are compressed and
              encrypted using <code>AES-256-GCM</code> with a cryptographically random initialization vector (IV) and
              authentication tag. They are saved solely in an encrypted, <code>HttpOnly</code>, <code>SameSite=Lax</code>,
              and <code>Secure</code> cookie on your browser.
            </li>
            <li>
              <strong>No Central User Database:</strong> Drive Harbor does not operate an external database that stores
              your Google account tokens, files, or personal information. When your browser session ends or the cookie is
              cleared, the data is completely gone.
            </li>
            <li>
              <strong>Encryption in Transit:</strong> All communications between your browser, our servers, and Google
              API servers are encrypted using Transport Layer Security (TLS 1.2+ / HTTPS).
            </li>
          </ul>

          <h2>6. Data Retention, Disconnection, and Revocation</h2>
          <p>
            You retain absolute control over your connected Google Drive accounts and data at all times:
          </p>
          <ul>
            <li>
              <strong>Disconnect from Dashboard:</strong> You can click &ldquo;Remove from tracking&rdquo; on any
              connected Drive card. This immediately purges the account and its credentials from your encrypted session
              cookie.
            </li>
            <li>
              <strong>Revoke via Google Account Settings:</strong> You can permanently revoke Drive Harbor&apos;s
              access to your Google account at any time by visiting your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Account Permissions Page
              </a>
              . Once revoked, Drive Harbor can never access your account again unless you re-authorize.
            </li>
          </ul>

          <h2>7. Third-Party Service Providers</h2>
          <p>
            We do not share your personal information with external parties except for essential infrastructure
            providers needed to run the website:
          </p>
          <ul>
            <li>
              <strong>Google LLC:</strong> Provider of Google OAuth 2.0 authentication and the Google Drive API.
            </li>
            <li>
              <strong>Hosting &amp; Compute:</strong> Our application runs on modern cloud hosting (such as Vercel) to
              deliver web pages and process API requests securely.
            </li>
          </ul>

          <h2>8. International Privacy Rights (GDPR &amp; CCPA/CPRA)</h2>
          <p>
            Depending on your location, you have statutory rights concerning your personal information, including:
          </p>
          <ul>
            <li>The right to know what personal data is accessed or collected.</li>
            <li>The right to request deletion of personal information.</li>
            <li>The right to withdraw consent and revoke OAuth access at any time.</li>
            <li>The right to non-discrimination for exercising your privacy rights.</li>
          </ul>
          <p>
            Because we do not maintain a permanent database of user accounts, disconnecting your Drive or clearing your
            browser cookies immediately removes all associated data from our systems.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Drive Harbor is not directed to individuals under the age of 13 (or under 16 in certain jurisdictions), and
            we do not knowingly collect personal data from children.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. Any
            updates will be posted on this page with a revised &ldquo;Effective Date&rdquo;.
          </p>

          <div className="legal-contact-box">
            <h3>Contact &amp; Data Protection</h3>
            <p>
              If you have any questions, feedback, or data privacy requests regarding this Privacy Policy or our
              compliance with Google API policies, please reach out:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@driveharbor.app">privacy@driveharbor.app</a>
            </p>
            <p>
              <strong>Project:</strong> Drive Harbor (&ldquo;Archive&rdquo;) · Open &amp; Private Cloud Dashboard
            </p>
          </div>
        </article>
      </main>

      <footer className="legal-footer-bar">
        <div>&copy; {new Date().getFullYear()} Drive Harbor. All rights reserved.</div>
        <div className="landing-footer-links">
          <Link href="/">Overview</Link>
          <span>·</span>
          <Link href="/privacy">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div>PRIVATE BY DESIGN</div>
      </footer>
    </div>
  );
}
