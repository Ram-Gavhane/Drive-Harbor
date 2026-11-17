import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions — Drive Harbor",
  description:
    "Terms of Service and Conditions of Use for Drive Harbor. Read-only Google Drive storage overview and file metadata browser.",
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

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <header className="legal-topbar">
        <Link className="wordmark" href="/">
          <Mark /> archive
        </Link>
        <nav className="legal-nav-links">
          <Link className="legal-nav-link" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="legal-nav-link active" href="/terms">
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
            Terms of Service &amp; Conditions
          </div>
          <p className="eyebrow">USER AGREEMENT</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="legal-subtitle">
            Please read these Terms and Conditions (&ldquo;Terms&rdquo;) carefully before using Drive Harbor
            (&ldquo;Archive&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). These Terms govern your
            access to and use of our multi-account Google Drive storage visualization service.
          </p>
          <div className="legal-meta">
            <span>Effective Date: November 17, 2026</span>
            <span>·</span>
            <span>Version: 1.0</span>
          </div>
        </header>

        <section className="legal-card-grid">
          <div className="legal-mini-card">
            <strong>Read-Only Utility</strong>
            <p>
              Drive Harbor provides visual insight into your Google Drive quotas and file hierarchies. We do not modify,
              delete, or sync your files.
            </p>
          </div>
          <div className="legal-mini-card">
            <strong>Your Content Stays Yours</strong>
            <p>
              You retain full ownership, title, and intellectual property rights in all files and content stored in your
              Google Drive accounts.
            </p>
          </div>
          <div className="legal-mini-card">
            <strong>Google API Compliance</strong>
            <p>
              Drive Harbor strictly abides by Google&apos;s API Services User Data Policy and uses authenticated OAuth 2.0
              tokens.
            </p>
          </div>
          <div className="legal-mini-card">
            <strong>Disconnect Anytime</strong>
            <p>
              You may stop using the service or disconnect any Google Drive account whenever you wish with zero lock-in.
            </p>
          </div>
        </section>

        <article className="legal-body">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing Drive Harbor, linking a Google account, or using any associated features, you agree to be bound
            by these Terms and Conditions and our{" "}
            <Link href="/privacy">Privacy Policy</Link>. If you do not agree to these Terms, please do not use the
            service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Drive Harbor is a personal cloud utility that aggregates and displays storage quota utilization and file
            metadata across multiple Google Drive accounts in a single, streamlined interface.
          </p>
          <p>
            The service functions in a strictly read-only capacity using the Google Drive metadata API scope (
            <code>https://www.googleapis.com/auth/drive.metadata.readonly</code>). The service cannot read file
            contents, edit documents, download proprietary assets, or delete user files.
          </p>

          <h2>3. User Eligibility and Account Authorization</h2>
          <p>
            To use Drive Harbor, you represent and warrant that:
          </p>
          <ul>
            <li>You are at least 13 years of age (or the minimum legal age in your jurisdiction).</li>
            <li>
              You have the legal right and necessary authority to connect each Google account you link to Drive Harbor.
            </li>
            <li>
              You will not use the service for any unauthorized, fraudulent, or malicious activities.
            </li>
          </ul>

          <h2>4. Google API Integration &amp; Disclaimer</h2>
          <p>
            Drive Harbor interfaces with Google Drive through Google&apos;s official APIs. By connecting your account, you
            also acknowledge that your use of Google Drive is governed by{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
              Google&apos;s Terms of Service
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
          <p>
            <em>
              Disclaimer: Drive Harbor is an independent productivity application. It is not affiliated with, sponsored
              by, or endorsed by Google LLC or Alphabet Inc. &ldquo;Google&rdquo;, &ldquo;Google Drive&rdquo;, and the Google logo
              are trademarks of Google LLC.
            </em>
          </p>

          <h2>5. User Content and Intellectual Property</h2>
          <ul>
            <li>
              <strong>Your Files &amp; Content:</strong> Drive Harbor does not claim any intellectual property rights or
              ownership over any files, folders, data, or materials stored in your Google Drive. You retain 100%
              ownership and copyright of your content.
            </li>
            <li>
              <strong>Drive Harbor Intellectual Property:</strong> The design, typography, software code, logos, visual
              interfaces, and branding of Drive Harbor are the exclusive property of Drive Harbor and are protected by
              copyright and intellectual property laws.
            </li>
          </ul>

          <h2>6. Acceptable Use and Prohibited Conduct</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul>
            <li>Attempting to bypass, reverse engineer, decompile, or tamper with the application or session encryption.</li>
            <li>Using automated bots, scrapers, or excessive requests designed to disrupt the service or exhaust API limits.</li>
            <li>Connecting Google accounts that you do not own or do not have explicit authorization to monitor.</li>
            <li>Using the service in violation of any applicable local, national, or international laws or regulations.</li>
          </ul>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            Drive Harbor is provided on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis,
            without warranties of any kind, either express or implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, uptime, accuracy of storage calculations, or
            non-infringement.
          </p>
          <p>
            We do not warrant that the service will be uninterrupted, bug-free, or compatible with future modifications
            to third-party APIs.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall Drive Harbor, its developers, or its
            contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including
            loss of profits, data loss, business interruption, or system failure arising out of or in connection with
            your use of or inability to use the service.
          </p>

          <h2>9. Termination and Revocation of Access</h2>
          <p>
            You may discontinue using Drive Harbor at any time:
          </p>
          <ul>
            <li>
              <strong>Remove Drive:</strong> You can remove any connected Drive from tracking directly within the
              dashboard, which wipes the encrypted session credentials on your browser.
            </li>
            <li>
              <strong>Revoke via Google:</strong> You can permanently revoke access at any time through your{" "}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                Google Account Permissions
              </a>
              .
            </li>
          </ul>
          <p>
            We reserve the right to suspend or discontinue access to the service for any user who violates these Terms or
            abuses the application.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at our discretion. Any changes will become effective
            immediately upon being posted to this page with an updated &ldquo;Effective Date&rdquo;. Your continued use
            of Drive Harbor following the posting of any revisions constitutes acceptance of those changes.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict
            of law provisions. If any provision of these Terms is found to be unenforceable, the remaining provisions
            will remain in full force and effect.
          </p>

          <div className="legal-contact-box">
            <h3>Questions or Legal Inquiries</h3>
            <p>
              If you have any questions or concerns regarding these Terms and Conditions, please contact us:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@driveharbor.app">legal@driveharbor.app</a>
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
