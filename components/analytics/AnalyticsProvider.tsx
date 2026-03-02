"use client";

import { useAnalytics } from "@/lib/hooks/useAnalytics";

/**
 * Client component that initialises analytics tracking.
 * Renders nothing — just activates the useAnalytics hook.
 * Place inside a layout wrapped with <AuthProvider>.
 */
export default function AnalyticsProvider() {
  useAnalytics();
  return null;
}
