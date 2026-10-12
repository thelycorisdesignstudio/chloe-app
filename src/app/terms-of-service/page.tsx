import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Chloe",
  description:
    "The terms governing your use of Chloe, including account responsibilities, business partner subscription terms, content accuracy, intellectual property, liability, and governing law.",
};

const LAST_UPDATED = "2026-01-15";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="The rules and responsibilities that apply when you use Chloe."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
          and use of Chloe, including our website, app, and related
          services (collectively, the &ldquo;Service&rdquo;). By accessing
          or using the Service, you agree to be bound by these Terms. If you
          do not agree, please do not use the Service.
        </p>
      </section>

      <section>
        <h2>2. Acceptable Use</h2>
        <p>You agree to use Chloe only for lawful purposes. You will not:</p>
        <ul>
          <li>
            Submit false, misleading, defamatory, or fraudulent content,
            including reviews or ratings.
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Service,
            other accounts, or our systems.
          </li>
          <li>
            Scrape, data-mine, or use automated means to extract content
            from the Service without our prior written consent.
          </li>
          <li>
            Use the Service in any way that could disable, overburden, or
            impair it, or interfere with any other party&apos;s use.
          </li>
          <li>
            Upload content that infringes the intellectual property or
            privacy rights of others, or that is unlawful under UAE law.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Accounts</h2>
        <p>
          Some features of Chloe require creating an account via our
          authentication provider, better-auth. You must provide accurate
          information and are responsible for maintaining the
          confidentiality of your login credentials and for all activity
          that occurs under your account. Notify us immediately at{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a> if you suspect
          unauthorized use of your account. We reserve the right to suspend
          or terminate accounts that violate these Terms.
        </p>
      </section>

      <section>
        <h2>4. Business Partner &amp; Subscription Terms</h2>
        <p>
          Venues and businesses may list themselves on Chloe through our
          business inquiry process and, where applicable, subscribe to a
          paid partnership or promotional plan. For paid plans:
        </p>
        <ul>
          <li>
            Billing is processed securely by Stripe. By subscribing, you
            authorize Chloe (via Stripe) to charge your chosen payment
            method on a recurring basis according to the plan you select.
          </li>
          <li>
            Subscription fees are generally non-refundable except where
            required by law or expressly stated at the time of purchase.
          </li>
          <li>
            You are responsible for keeping your billing information
            current. Failure to pay may result in suspension or downgrade
            of your listing.
          </li>
          <li>
            You may cancel a subscription at any time; cancellation will
            take effect at the end of the then-current billing period
            unless otherwise stated.
          </li>
          <li>
            We reserve the right to change subscription pricing or plan
            features with reasonable advance notice.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Content Accuracy Disclaimer</h2>
        <p>
          Chloe aggregates and curates information about activities and
          venues, which may be submitted by business partners or compiled
          from publicly available sources. Prices, opening hours, age
          suitability, availability, and other details can change without
          notice and may not always be fully up to date on our platform.{" "}
          <strong>
            We strongly recommend verifying all details directly with the
            venue before visiting or booking
          </strong>
          , particularly for paid activities or time-sensitive plans. Chloe
          is not responsible for losses or inconvenience resulting from
          outdated or inaccurate third-party information.
        </p>
      </section>

      <section>
        <h2>6. User-Submitted Content</h2>
        <p>
          If Chloe allows you to submit reviews, ratings, or other content,
          you retain ownership of that content but grant Chloe a worldwide,
          royalty-free license to use, display, and distribute it in
          connection with operating and promoting the Service. You represent
          that your content is accurate, not defamatory, and does not
          infringe any third party&apos;s rights. We may remove content that
          violates these Terms or applicable law at our discretion.
        </p>
      </section>

      <section>
        <h2>7. Intellectual Property</h2>
        <p>
          The Chloe name, logo, website design, and all associated text,
          graphics, and software (excluding user-submitted content and
          third-party venue content) are owned by or licensed to Chloe and
          are protected by applicable intellectual property laws. You may
          not copy, modify, distribute, sell, or create derivative works
          based on the Service without our prior written permission.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers</h2>
        <p>
          The Service and all content are provided &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; without warranties of any kind, express
          or implied, including warranties of accuracy, merchantability,
          fitness for a particular purpose, or non-infringement. Visiting
          any venue or activity listed on Chloe is entirely at your own
          risk, and parents and guardians are solely responsible for the
          safety and supervision of their children at all times.
        </p>
      </section>

      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Chloe and its affiliates,
          officers, employees, and partners will not be liable for any
          indirect, incidental, special, consequential, or punitive
          damages, or any loss of data, revenue, or goodwill, arising out of
          or related to your use of the Service, including your reliance on
          venue or activity information. Our total aggregate liability for
          any claim arising from these Terms or the Service will not exceed
          the greater of (a) the amount you paid us, if any, in the twelve
          months preceding the claim, or (b) one hundred AED.
        </p>
      </section>

      <section>
        <h2>10. Termination</h2>
        <p>
          You may stop using Chloe and request deletion of your account at
          any time. We may suspend or terminate your access to the Service,
          with or without notice, if we reasonably believe you have violated
          these Terms, created risk or legal exposure for us, or for any
          other reason, including discontinuation of the Service. Provisions
          that by their nature should survive termination (including
          Sections 7, 8, 9, and 11) will survive.
        </p>
      </section>

      <section>
        <h2>11. Governing Law</h2>
        <p>
          These Terms are governed by, and construed in accordance with, the
          laws of the United Arab Emirates, without regard to conflict-of-law
          principles. Any disputes arising from these Terms or your use of
          the Service will be subject to the exclusive jurisdiction of the
          competent courts of the United Arab Emirates.
        </p>
        <p>
          <em>
            Note: this governing-law clause is standard boilerplate and
            should be reviewed and tailored by UAE-qualified legal counsel
            before being relied upon as a final, binding legal term.
          </em>
        </p>
      </section>

      <section>
        <h2>12. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the
          Service after changes take effect constitutes acceptance of the
          revised Terms. We will update the &ldquo;Last updated&rdquo; date
          above when changes are made.
        </p>
      </section>

      <section>
        <h2>13. Contact Us</h2>
        <p>
          Questions about these Terms can be sent to{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
