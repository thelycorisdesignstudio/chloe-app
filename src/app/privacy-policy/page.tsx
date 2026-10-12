import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Chloe",
  description:
    "Learn what personal information Chloe collects from parents and business partners, why we collect it, who we share it with (MongoDB Atlas, Vercel, Stripe, better-auth), and the rights you have over your data.",
};

const LAST_UPDATED = "2026-01-15";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="How Chloe collects, uses, and protects your personal information."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2>1. Introduction</h2>
        <p>
          Chloe (&ldquo;Chloe,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) is a free-to-use website and app that helps
          families discover kid-friendly activities and venues across the
          United Arab Emirates and other Gulf countries. This Privacy Policy
          explains what information we collect from visitors, registered
          users (&ldquo;parents&rdquo; or &ldquo;account holders&rdquo;), and
          venue/business partners, how we use it, who we share it with, and
          the choices and rights you have.
        </p>
        <p>
          By using Chloe, you agree to the collection and use of information
          in accordance with this policy. If you do not agree, please do not
          use the platform.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>2.1 Account Information</h3>
        <p>
          When you create an account, we use{" "}
          <strong>better-auth</strong>, our authentication provider, to
          collect and store basic account details such as your name, email
          address, and a securely hashed representation of your password (or
          your identifier from a third-party sign-in method, if offered).
          We do not store plaintext passwords.
        </p>
        <h3>2.2 Favorites and Saved Activities</h3>
        <p>
          If you save or &ldquo;favorite&rdquo; an activity, we store a
          record linking your account to that activity so we can show you
          your saved list across sessions and devices.
        </p>
        <h3>2.3 Usage and Analytics Data</h3>
        <p>
          Chloe automatically records certain interactions to understand how
          the platform is used and to improve it, including events such as
          activity page views, shares, and favorites. These analytics
          events typically include the type of event, the related activity,
          an approximate timestamp, and limited contextual metadata (such as
          referring page or device type). We use this information in
          aggregate; it is not used to build an advertising profile of you.
        </p>
        <h3>2.4 Business Inquiry Submissions</h3>
        <p>
          If you are a venue or business and submit an inquiry to list your
          venue or become a partner, we collect the information you provide,
          such as business name, contact person, email, phone number,
          business type, emirate/location, your message, and any photos you
          choose to upload.
        </p>
        <h3>2.5 Payment Information (Business Subscriptions)</h3>
        <p>
          For business partners who subscribe to a paid listing plan,
          payments are processed by <strong>Stripe</strong>, a third-party
          payment processor. Chloe does not collect or store your full card
          number, CVV, or other raw card data on our own servers &mdash;
          that information is sent directly to Stripe and handled under
          Stripe&apos;s own security standards (including PCI-DSS
          compliance). We retain only limited billing metadata necessary to
          manage your subscription, such as subscription status, plan,
          billing history references, and the Stripe customer/subscription
          identifiers.
        </p>
        <h3>2.6 Technical and Device Information</h3>
        <p>
          Like most websites, our servers and hosting provider automatically
          log technical information such as IP address, browser type,
          device type, and general access timestamps, primarily for
          security, performance monitoring, and abuse prevention.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To create and maintain your account and your saved favorites.</li>
          <li>
            To operate, maintain, and improve Chloe&apos;s search, discovery,
            and recommendation features.
          </li>
          <li>
            To understand aggregate usage patterns (e.g. which categories or
            emirates are most popular) so we can improve the product.
          </li>
          <li>
            To respond to business inquiries and manage venue partnership and
            subscription relationships, including billing via Stripe.
          </li>
          <li>
            To communicate with you about your account, support requests, or
            material changes to our services or policies.
          </li>
          <li>
            To detect, prevent, and address fraud, abuse, security issues,
            and technical problems.
          </li>
          <li>To comply with applicable legal obligations.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </section>

      <section>
        <h2>4. Third Parties We Work With</h2>
        <p>
          We rely on a small number of trusted service providers to operate
          Chloe. These providers process data on our behalf and are bound by
          their own privacy and security commitments:
        </p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MongoDB Atlas</td>
              <td>
                Hosts our primary database (accounts, favorites, analytics
                events, business inquiries).
              </td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>
                Hosts and serves the Chloe website/app and its backend
                functions.
              </td>
            </tr>
            <tr>
              <td>Vercel Blob</td>
              <td>
                Stores uploaded files such as business inquiry photos.
              </td>
            </tr>
            <tr>
              <td>Stripe</td>
              <td>
                Processes payments and manages billing for business
                subscriptions. Stripe receives and stores your payment card
                data directly &mdash; Chloe never sees or stores your raw
                card number.
              </td>
            </tr>
            <tr>
              <td>better-auth</td>
              <td>
                Powers account authentication (sign-up, sign-in, session
                management).
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          We may also disclose information where required by law, to protect
          the rights, safety, or property of Chloe, our users, or the
          public, or in connection with a merger, acquisition, or sale of
          assets (in which case we will notify affected users where
          required).
        </p>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>
          We retain account information for as long as your account remains
          active, and for a reasonable period afterward in case you wish to
          reactivate it or as required for legal, accounting, or security
          purposes. Analytics events are generally retained in a form useful
          for aggregate reporting and may be periodically aggregated or
          pruned. Business inquiry records are retained for as long as
          reasonably necessary to manage the partnership relationship and
          for our business records.
        </p>
      </section>

      <section>
        <h2>6. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have rights to access,
          correct, export, or delete the personal information we hold about
          you. We honor these rights for all Chloe users regardless of
          location, consistent with the principles of the UAE&apos;s
          Personal Data Protection Law. To exercise any of these rights,
          contact us using the details below. Specifically, you can request
          to:
        </p>
        <ul>
          <li>
            <strong>Access:</strong> Receive a copy of the personal data we
            hold about you.
          </li>
          <li>
            <strong>Correct:</strong> Update inaccurate or incomplete
            information.
          </li>
          <li>
            <strong>Delete:</strong> Request deletion of your account and
            associated personal data, subject to certain legal or
            operational exceptions (e.g. records we must retain for
            accounting purposes).
          </li>
          <li>
            <strong>Portability:</strong> Receive your data in a
            structured, commonly used format where feasible.
          </li>
          <li>
            <strong>Object/Restrict:</strong> Ask us to stop or limit
            certain processing, such as non-essential analytics.
          </li>
        </ul>
        <p>
          We will respond to verified requests within a reasonable time
          frame, consistent with applicable law.
        </p>
      </section>

      <section>
        <h2>7. Children&apos;s Privacy</h2>
        <p>
          Chloe is a platform <strong>about</strong> kid-friendly activities,
          but it is designed to be used <strong>by parents and guardians</strong>
          , not directly by children. Chloe is not intended for direct use
          by children under the age of 13 (or under 16, where applicable
          local law sets a higher threshold), and we do not knowingly
          collect personal information directly from children through
          account registration or any other feature. If we become aware
          that a child has created an account or provided personal
          information directly to us without appropriate parental consent,
          we will take reasonable steps to delete that information. Parents
          who believe their child has provided us personal information
          should contact us using the details below.
        </p>
      </section>

      <section>
        <h2>8. Security</h2>
        <p>
          We use industry-standard safeguards to protect your information,
          including encryption of data in transit via HTTPS, encryption at
          rest provided by MongoDB Atlas, and access controls limiting who
          within our organization can access personal data. No method of
          transmission or storage is 100% secure, and we cannot guarantee
          absolute security, but we work to continuously improve our
          safeguards.
        </p>
      </section>

      <section>
        <h2>9. International Data Transfers</h2>
        <p>
          Our service providers (MongoDB Atlas, Vercel, Stripe) operate
          global infrastructure, which may mean your data is processed in
          countries other than your own. See our{" "}
          <a href="/data-residency-policy">Data Residency Policy</a> for more
          detail on where data is hosted and processed.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post
          the updated version on this page with a new &ldquo;Last
          updated&rdquo; date. Material changes may also be communicated via
          email or an in-app notice.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to
          exercise any of the rights described above, contact us at{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
