import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ScaleIcon } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

interface LegalPageLayoutProps {
  /** Page heading, e.g. "Privacy Policy" */
  title: string;
  /** Short one-line summary shown under the heading */
  description: string;
  /** ISO date string (YYYY-MM-DD) this document was last updated */
  lastUpdated: string;
  children: ReactNode;
}

/**
 * Shared wrapper for all legal/policy pages (Privacy Policy, Terms of
 * Service, Cookie Policy, Data Collection Policy, Data Residency Policy).
 *
 * Uses the design system's semantic tokens (bg-background, text-foreground,
 * bg-card, border-border, etc.) rather than hardcoded hex values so these
 * pages automatically track the brand's current color palette.
 */
export default function LegalPageLayout({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground font-bold uppercase tracking-wide text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-foreground font-black text-4xl md:text-6xl uppercase tracking-tighter mb-6">
              {title}
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-4">
              {description}
            </p>
            <p className="text-foreground/60 text-sm font-medium">
              Last updated: {formattedDate}
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-card border-2 border-border rounded-[30px] p-6 md:p-8 mb-12 shadow-[6px_6px_0px_var(--color-border)]">
            <div className="flex items-start gap-4">
              <ScaleIcon
                className="w-7 h-7 text-card-foreground shrink-0 mt-1"
                aria-hidden="true"
              />
              <p className="text-card-foreground/90 text-sm md:text-base leading-relaxed">
                <strong className="font-black uppercase">
                  Template notice:
                </strong>{" "}
                This document is a general-purpose template intended to help
                Chloe communicate its data and service practices clearly. It
                is provided for informational purposes and has not been
                reviewed by a lawyer. Before relying on it as a final,
                binding legal document, have it reviewed by qualified legal
                counsel familiar with UAE law and your specific business
                operations.
              </p>
            </div>
          </div>

          <article
            className="max-w-3xl mx-auto space-y-8 text-foreground/90 text-base md:text-lg leading-relaxed
              [&_h2]:text-foreground [&_h2]:font-black [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-display
              [&_h3]:text-foreground [&_h3]:font-bold [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-display
              [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
              [&_strong]:text-foreground [&_strong]:font-bold
              [&_a]:text-foreground [&_a]:underline [&_a]:font-semibold [&_a]:underline-offset-2 hover:[&_a]:opacity-70
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6
              [&_th]:text-left [&_th]:font-black [&_th]:uppercase [&_th]:text-sm [&_th]:border-b-2 [&_th]:border-border [&_th]:py-2 [&_th]:pr-4
              [&_td]:border-b [&_td]:border-border/30 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top"
          >
            {children}
          </article>

          <div className="max-w-3xl mx-auto mt-16 text-center">
            <p className="text-foreground/60 text-sm">
              Questions about this document? Contact us at{" "}
              <a
                href="mailto:hello@chloe.com"
                className="font-semibold underline underline-offset-2 hover:opacity-70"
              >
                hello@chloe.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
