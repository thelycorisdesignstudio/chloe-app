"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const CONSENT_STORAGE_KEY = "chloe-consent-accepted";

// No external events change the stored flag except our own button handlers
// (which trigger a React re-render directly), so the store never needs to
// notify subscribers on its own.
function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "true";
  } catch {
    // localStorage can throw (e.g. private browsing / blocked storage).
    // Fail open: treat as not-yet-accepted so the banner can still show.
    return false;
  }
}

// During SSR / before hydration there is no localStorage to read, and the
// banner depends on client JS anyway — so render as "already accepted"
// (hidden) on the server to avoid a flash of the banner before hydration.
function getServerSnapshot(): boolean {
  return true;
}

/**
 * Soft, non-blocking cookie/terms consent banner.
 *
 * Shows once for new visitors. Accepting (or dismissing) it just stores a
 * flag in localStorage so it doesn't show again on that device/browser —
 * it never gates access to the site. If strict EU/GDPR-style blocking
 * consent is required later, this component would need to be upgraded to a
 * full consent-management flow (e.g. blocking non-essential analytics
 * until explicit opt-in).
 *
 * Styling uses only the project's existing semantic design tokens
 * (bg-card, text-card-foreground, border-border, .pill-button,
 * shadow-brutalist, radius tokens) so it automatically follows whatever
 * the current brand palette is.
 */
export default function ConsentBanner() {
  const acceptedInStorage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const visible = !acceptedInStorage && !dismissed;

  const handleAccept = () => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "true");
    } catch {
      // Ignore storage failures; still dismiss for this session.
    }
    setDismissed(true);
  };

  const handleDismiss = () => {
    // "Decline" is informational only — it does not block site usage,
    // and we don't persist a "declined" flag so the banner can reappear
    // (e.g. on a future visit) and the user can learn more or accept later.
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie and terms consent notice"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-x-auto sm:left-4 sm:bottom-4 sm:max-w-md sm:px-0 sm:pb-0"
        >
          <div className="relative bg-card text-card-foreground border-2 border-border rounded-[30px] shadow-[6px_6px_0px_var(--color-border)] p-5 sm:p-6">
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="absolute top-3 right-3 text-card-foreground/60 hover:text-card-foreground transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <p className="pr-6 text-sm sm:text-base leading-relaxed mb-4">
              Chloe uses cookies for sign-in and basic analytics. By
              continuing to use Chloe, you accept our{" "}
              <Link
                href="/cookie-policy"
                className="font-bold underline underline-offset-2 hover:opacity-70"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-of-service"
                className="font-bold underline underline-offset-2 hover:opacity-70"
              >
                Terms of Service
              </Link>
              .
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAccept}
                className="pill-button bg-primary text-primary-foreground text-sm px-6 py-2.5"
              >
                Accept
              </button>
              <Link
                href="/cookie-policy"
                className="text-sm font-bold uppercase tracking-wide underline underline-offset-2 hover:opacity-70"
              >
                Learn more
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
