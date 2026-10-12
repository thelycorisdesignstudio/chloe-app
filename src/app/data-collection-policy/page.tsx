import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Data Collection Policy | Chloe",
  description:
    "A technical companion to our Privacy Policy: the exact data fields Chloe collects, how they are collected, our data-minimization practices, and the security measures that protect them.",
};

const LAST_UPDATED = "2026-01-15";

export default function DataCollectionPolicyPage() {
  return (
    <LegalPageLayout
      title="Data Collection Policy"
      description="A granular, technical look at exactly what data Chloe collects and how."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2>1. Purpose of This Policy</h2>
        <p>
          This Data Collection Policy is a technical companion to our{" "}
          <a href="/privacy-policy">Privacy Policy</a>. It describes, at the
          level of individual data fields, what we collect, through which
          collection method, and the practices and safeguards we apply.
        </p>
      </section>

      <section>
        <h2>2. Data We Collect, By Category</h2>

        <h3>2.1 Account / Authentication Data (via better-auth)</h3>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Securely hashed password (if using email/password sign-in)</li>
          <li>Session tokens / authentication identifiers</li>
          <li>Account creation and last-updated timestamps</li>
        </ul>

        <h3>2.2 Favorites</h3>
        <p>Stored in our <code>Favorite</code> collection:</p>
        <ul>
          <li><code>userId</code> &mdash; the account that saved the activity</li>
          <li><code>activityId</code> &mdash; reference to the saved activity</li>
          <li><code>createdAt</code> / <code>updatedAt</code> timestamps</li>
        </ul>

        <h3>2.3 Analytics Events</h3>
        <p>Stored in our <code>AnalyticsEvent</code> collection:</p>
        <ul>
          <li>
            <code>eventType</code> &mdash; e.g. a view, share, or favorite
            action
          </li>
          <li>
            <code>activityId</code> &mdash; the activity the event relates
            to, where applicable
          </li>
          <li>
            <code>metadata</code> &mdash; flexible contextual details about
            the event (e.g. source page, device type, share channel)
          </li>
          <li><code>createdAt</code> timestamp</li>
        </ul>
        <p>
          Analytics events are tied to interactions, not to a persistent
          cross-site advertising identifier.
        </p>

        <h3>2.4 Business Inquiries</h3>
        <p>Stored in our <code>BusinessInquiry</code> collection:</p>
        <ul>
          <li><code>businessName</code></li>
          <li><code>contactPerson</code></li>
          <li><code>email</code></li>
          <li><code>phone</code> (optional)</li>
          <li><code>businessType</code></li>
          <li><code>emirate</code> (location)</li>
          <li><code>message</code> (optional, free text)</li>
          <li>
            <code>photos</code> &mdash; URLs of files uploaded to Vercel
            Blob
          </li>
          <li>
            <code>status</code> &mdash; internal processing status (e.g.
            pending, contacted, approved)
          </li>
          <li><code>createdAt</code> / <code>updatedAt</code> timestamps</li>
        </ul>

        <h3>2.5 Payment / Billing Data (Business Subscriptions)</h3>
        <p>
          Processed and stored primarily by Stripe. Chloe retains only
          references necessary to manage the relationship, such as the
          Stripe customer ID, subscription ID, plan tier, and subscription
          status. Chloe does not store full card numbers, CVV codes, or
          other raw payment card data.
        </p>

        <h3>2.6 Technical / Infrastructure Logs</h3>
        <p>
          Our hosting provider, Vercel, generates standard request logs
          (such as IP address, timestamp, requested path, and response
          status) as part of operating the Service. These are used for
          security, debugging, and performance purposes and are governed by
          Vercel&apos;s own infrastructure practices.
        </p>
      </section>

      <section>
        <h2>3. Collection Methods</h2>
        <ul>
          <li>
            <strong>Direct form submission:</strong> account sign-up/sign-in
            forms, business inquiry forms, and any in-app forms you
            voluntarily complete.
          </li>
          <li>
            <strong>Automatic event tracking:</strong> analytics events
            generated as you interact with activity listings (e.g. viewing,
            sharing, or favoriting an activity).
          </li>
          <li>
            <strong>API calls:</strong> data exchanged between your browser
            or app and our backend API routes, including authenticated
            requests that read or write your account data.
          </li>
          <li>
            <strong>Third-party processors:</strong> payment and billing
            data captured directly by Stripe&apos;s hosted checkout/billing
            flows, not by Chloe&apos;s own servers.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Data Minimization</h2>
        <p>
          We follow a data-minimization practice: we aim to collect only the
          fields reasonably necessary to provide a given feature. For
          example, we do not require a physical address to create an
          account, we do not collect government ID numbers, and we rely on
          Stripe rather than our own systems to handle sensitive payment
          card data. Optional fields (such as phone number on a business
          inquiry) are clearly optional and not required to use the core
          Service.
        </p>
      </section>

      <section>
        <h2>5. Security Measures</h2>
        <ul>
          <li>
            <strong>Encryption in transit:</strong> All traffic to and from
            Chloe is served over HTTPS/TLS.
          </li>
          <li>
            <strong>Encryption at rest:</strong> Data stored in MongoDB
            Atlas benefits from Atlas&apos;s encryption-at-rest
            capabilities.
          </li>
          <li>
            <strong>Access controls:</strong> Access to production data is
            limited to personnel who need it to operate and support the
            Service, using credentialed, role-based access to our database
            and hosting provider.
          </li>
          <li>
            <strong>Secure authentication:</strong> Passwords are hashed by
            better-auth; we do not store plaintext credentials.
          </li>
          <li>
            <strong>Payment isolation:</strong> Card data is handled
            directly by Stripe&apos;s PCI-DSS-compliant systems rather than
            passing through or being stored on Chloe&apos;s own servers.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Related Policies</h2>
        <p>
          For a plain-language overview of our data practices and your
          rights, see our <a href="/privacy-policy">Privacy Policy</a>. For
          where your data is physically hosted and processed, see our{" "}
          <a href="/data-residency-policy">Data Residency Policy</a>. For
          details on cookies and browser storage specifically, see our{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
