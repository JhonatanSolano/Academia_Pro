"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import {
  identifyUser,
  trackSessionStart,
} from "@/lib/firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase/config";

/**
 * useAnalytics — initialises Firebase Analytics (GA4), identifies the
 * user, and emits `session_start` once per mount.
 *
 * GA4 handles page_view tracking automatically when the SDK is loaded.
 * Specific business events (module_viewed, premium_clicked, etc.) are
 * fired from their respective components — NOT here.
 *
 * Place <AnalyticsProvider /> at the top of the student layout
 * so it covers all student pages.
 */
export function useAnalytics() {
  const { user } = useAuth();
  const identifiedRef = useRef(false);
  const sessionLoggedRef = useRef(false);

  /* ── Init GA4 SDK (triggers auto page_view) ── */
  useEffect(() => {
    getFirebaseAnalytics().catch(() => {});
  }, []);

  /* ── Identify user + session_start ── */
  useEffect(() => {
    if (!user?.uid) return;

    if (!identifiedRef.current) {
      identifyUser(user.uid, user.role);
      identifiedRef.current = true;
    }

    if (!sessionLoggedRef.current) {
      trackSessionStart(user.uid);
      sessionLoggedRef.current = true;
    }
  }, [user]);
}
