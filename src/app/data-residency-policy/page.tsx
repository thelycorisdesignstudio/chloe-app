import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Data Residency Policy | Chloe",
  description:
    "Where Chloe's data is hosted and processed (MongoDB Atlas and Vercel's global infrastructure), and how the UAE Personal Data Protection Law (PDPL) applies to our service.",
};

const LAST_UPDATED = "2026-01-15";

export default function DataResidencyPolicyPage() {
  return (
    <LegalPageLayout
      title="Data Residency Policy"
      description="Where Chloe's data lives, and the legal framework that applies to it."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2>1. Overview</h2>
        <p>
          This Data Residency Policy explains, in plain and accurate terms,
          where Chloe&apos;s data is hosted and processed, and which legal
          framework we consider primarily applicable given our focus on the
          United Arab Emirates and the wider Gulf region.
        </p>
      </section>

      <section>
        <h2>2. Where Data Is Hosted</h2>
        <p>
          Chloe&apos;s application and database infrastructure run on
          third-party cloud platforms rather than on servers we own
          directly:
        </p>
        <ul>
          <li>
            <strong>MongoDB Atlas</strong> hosts our primary database
            (accounts, favorites, analytics events, business inquiries, and
            related records).
          </li>
          <li>
            <strong>Vercel</strong> hosts and serves our website, app, and
            backend API functions, and Vercel Blob stores uploaded files
            such as business inquiry photos.
          </li>
        </ul>
        <p>
          Both MongoDB Atlas and Vercel operate global networks of data
          centers across multiple regions. In good faith and for
          transparency: this policy does not claim a specific, currently
          configured Atlas region, because that is an infrastructure
          setting controlled through our cloud provider accounts rather than
          something expressed in application code. What we can state
          accurately is that our infrastructure providers support
          configuring a specific hosting region (for example, a Middle East
          or UAE-based region) for the underlying database and application
          deployment, and Chloe can elect to pin its production
          infrastructure to such a region where required for compliance or
          customer commitments. Businesses or partners with a specific data
          residency requirement should contact us at{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a> to discuss
          current configuration.
        </p>
      </section>

      <section>
        <h2>3. Processing by Service Providers</h2>
        <p>
          In addition to MongoDB Atlas and Vercel, payment and billing data
          for business subscriptions is processed by Stripe, which operates
          its own global infrastructure and compliance program (including
          PCI-DSS certification for payment processing) independent of where
          Chloe&apos;s own application data resides.
        </p>
      </section>

      <section>
        <h2>4. Applicable Legal Framework: UAE PDPL</h2>
        <p>
          Chloe is built primarily for users and businesses in the United
          Arab Emirates. The key data protection framework we consider most
          relevant to our operations is{" "}
          <strong>
            UAE Federal Decree-Law No. 45 of 2021 on the Protection of
            Personal Data
          </strong>{" "}
          (commonly referred to as the &ldquo;UAE PDPL&rdquo;). The UAE PDPL
          establishes principles for the lawful processing of personal data,
          including requirements around consent, data subject rights,
          security safeguards, and cross-border data transfers. We aim to
          align our data practices with these principles as part of
          operating responsibly in the UAE market.
        </p>
        <p>
          This policy is informational and does not constitute a
          certification of compliance with the UAE PDPL or any other
          specific regulatory framework. We have not obtained, and do not
          claim to hold, any particular third-party data-residency or
          compliance certification beyond what our infrastructure providers
          (MongoDB Atlas, Vercel, Stripe) publicly state about their own
          platforms. Businesses with specific regulatory obligations should
          seek independent legal and compliance advice regarding their use
          of Chloe.
        </p>
      </section>

      <section>
        <h2>5. Cross-Border Transfers</h2>
        <p>
          Because our infrastructure providers operate globally, personal
          data may be transferred to, stored in, or processed in countries
          outside the UAE as part of normal operation of our hosting,
          database, and payment providers. Where such transfers occur, our
          providers represent that they maintain appropriate technical and
          organizational security measures. If your organization requires
          data to remain exclusively within a specific jurisdiction, please
          contact us to discuss whether a region-pinned configuration can be
          arranged.
        </p>
      </section>

      <section>
        <h2>6. Changes to This Policy</h2>
        <p>
          We will update this Data Residency Policy if our hosting regions,
          providers, or the applicable legal framework materially change.
          Updates will be reflected by a new &ldquo;Last updated&rdquo; date
          above.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          Questions about data residency can be sent to{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
