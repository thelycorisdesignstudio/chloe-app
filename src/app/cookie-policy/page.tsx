import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Chloe",
  description:
    "What cookies and local storage Chloe uses (authentication, analytics), the categories of cookies we set, and how to manage or clear them in your browser.",
};

const LAST_UPDATED = "2026-01-15";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="How Chloe uses cookies and similar technologies."
      lastUpdated={LAST_UPDATED}
    >
      <section>
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files placed on your device when you visit
          a website. We also use similar browser storage technologies, such
          as <code>localStorage</code>, which work similarly but are stored
          only in your browser rather than sent with every request. This
          policy describes how Chloe uses both.
        </p>
      </section>

      <section>
        <h2>2. Chloe&apos;s Approach to Cookies</h2>
        <p>
          Chloe keeps its use of cookies deliberately simple. We do not run
          third-party advertising networks or heavy cross-site ad-tracking
          pixels. Our cookies and local storage fall into three categories:
        </p>
        <h3>2.1 Strictly Necessary (Session &amp; Authentication)</h3>
        <p>
          When you sign in, our authentication provider, <strong>better-auth
          </strong>, sets a secure, HTTP-only session cookie so you stay
          logged in as you browse Chloe. These cookies are essential for
          account features (like saving favorites) to work and cannot be
          disabled without signing out.
        </p>
        <h3>2.2 Functional (Local Preferences)</h3>
        <p>
          We may use <code>localStorage</code> to remember simple
          preferences on your device, such as whether you have already seen
          and dismissed our cookie/terms consent banner, or UI state like a
          selected filter. This data stays on your device and is not sent to
          our servers.
        </p>
        <h3>2.3 Analytics</h3>
        <p>
          Chloe records first-party analytics events (such as activity page
          views, shares, and favorites) to understand usage and improve the
          platform, stored in our own <code>AnalyticsEvent</code> database
          collection. This is a simple, first-party analytics setup &mdash;
          not third-party ad-network tracking &mdash; and is not used to
          build cross-site advertising profiles about you.
        </p>
      </section>

      <section>
        <h2>3. Cookies/Storage We Do Not Currently Use</h2>
        <p>
          As of the date above, Chloe does not use third-party advertising
          cookies, cross-site retargeting pixels, or social-media tracking
          cookies embedded by ad networks. If this changes in the future, we
          will update this Cookie Policy and, where required, request your
          consent before setting such cookies.
        </p>
      </section>

      <section>
        <h2>4. Our Consent Banner</h2>
        <p>
          On your first visit, Chloe shows a brief banner informing you that
          continued use of the site means you accept our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link> and{" "}
          <Link href="/terms-of-service">Terms of Service</Link>. This is an
          informational banner rather than a blocking consent wall &mdash;
          you can continue browsing Chloe whether or not you interact with
          it, and dismissing it (or clicking &ldquo;Accept&rdquo;) simply
          stops it from showing again on that device.
        </p>
      </section>

      <section>
        <h2>5. Managing or Clearing Cookies in Your Browser</h2>
        <p>
          You can control, block, or delete cookies through your browser
          settings at any time. Note that blocking strictly necessary
          cookies may prevent you from signing in or using features that
          require an account.
        </p>
        <ul>
          <li>
            <strong>Google Chrome:</strong> Settings &rarr; Privacy and
            security &rarr; Cookies and other site data.
          </li>
          <li>
            <strong>Safari (macOS/iOS):</strong> Settings/Preferences &rarr;
            Privacy &rarr; Manage Website Data.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp;
            Security &rarr; Cookies and Site Data.
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site
            permissions &rarr; Manage and delete cookies and site data.
          </li>
        </ul>
        <p>
          You can also clear <code>localStorage</code> for Chloe by clearing
          your browser&apos;s site data for our domain, which will also
          reset the consent banner above.
        </p>
      </section>

      <section>
        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy as our use of cookies and similar
          technologies evolves. Changes will be posted here with an updated
          &ldquo;Last updated&rdquo; date.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          Questions about our use of cookies can be sent to{" "}
          <a href="mailto:hello@chloe.com">hello@chloe.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
