/**
 * Analytics & Metrics — Pódium Académico
 *
 * Two complementary systems:
 *
 * 1. **Firebase Analytics (GA4)** — automatic session/page-view tracking
 *    plus standard `logEvent` for funnel events. Free, real-time dashboard.
 *
 * 2. **Firestore `events` collection** — raw business events stored for the
 *    admin dashboard (total registros, conversión, retención, etc.).
 *    Queryable directly from the app without BigQuery.
 */

import {
  logEvent as fbLogEvent,
  setUserId,
  setUserProperties,
} from "firebase/analytics";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseDb, getFirebaseAnalytics } from "./config";

/* ═══════════════════════════════════════════
   EVENT TYPE DEFINITIONS
   ═══════════════════════════════════════════ */

export type MetricEventType =
  | "user_registered"
  | "session_start"
  | "module_viewed"
  | "content_viewed"
  | "content_completed"
  | "premium_page_viewed"
  | "premium_clicked"
  | "payment_initiated"
  | "payment_confirmed";

export interface MetricEvent {
  type: MetricEventType;
  userId?: string;
  /** e.g. programId, contentId */
  resourceId?: string;
  /** Additional key-value metadata */
  meta?: Record<string, string | number | boolean>;
}

/* ═══════════════════════════════════════════
   FIREBASE ANALYTICS (GA4) — logEvent wrapper
   ═══════════════════════════════════════════ */

/**
 * Log an event to Firebase Analytics (GA4).
 * Safe to call during SSR — silently skipped if analytics is not supported.
 */
async function logGA4Event(
  eventName: string,
  params?: Record<string, string | number | boolean>
): Promise<void> {
  try {
    const analytics = await getFirebaseAnalytics();
    if (!analytics) return;
    fbLogEvent(analytics, eventName, params);
  } catch {
    // Analytics not supported (SSR, ad-blockers, etc.)
  }
}

/** Identify the user in GA4 for cross-device attribution */
export async function identifyUser(
  uid: string,
  role: "free" | "premium" | "admin"
): Promise<void> {
  try {
    const analytics = await getFirebaseAnalytics();
    if (!analytics) return;
    setUserId(analytics, uid);
    setUserProperties(analytics, { user_role: role });
  } catch {
    // Silently ignore
  }
}

/* ═══════════════════════════════════════════
   FIRESTORE — Raw Business Events
   ═══════════════════════════════════════════ */

/**
 * Persist a business event to the `events` Firestore collection.
 * Each document contains:
 *   - type, userId, resourceId, meta, createdAt (serverTimestamp)
 *
 * This makes it straightforward to query from the admin dashboard
 * (e.g. count user_registered last 7 days, compute conversion rate, etc.)
 */
async function logFirestoreEvent(event: MetricEvent): Promise<void> {
  try {
    await addDoc(collection(getFirebaseDb(), "events"), {
      type: event.type,
      userId: event.userId ?? null,
      resourceId: event.resourceId ?? null,
      meta: event.meta ?? {},
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("[analytics] Failed to write Firestore event:", err);
  }
}

/* ═══════════════════════════════════════════
   PUBLIC API — Dual logging
   ═══════════════════════════════════════════ */

/**
 * Track a business event. Logs to BOTH Firebase Analytics (GA4)
 * and Firestore for the admin dashboard.
 */
export async function trackEvent(event: MetricEvent): Promise<void> {
  // Fire both in parallel — neither blocks the UI
  await Promise.allSettled([
    logGA4Event(event.type, {
      user_id: event.userId ?? "",
      resource_id: event.resourceId ?? "",
      ...(event.meta ?? {}),
    }),
    logFirestoreEvent(event),
  ]);
}

/* ═══════════════════════════════════════════
   CONVENIENCE FUNCTIONS
   ═══════════════════════════════════════════ */

/** Track: nuevo usuario registrado */
export function trackUserRegistered(userId: string): Promise<void> {
  return trackEvent({ type: "user_registered", userId });
}

/** Track: usuario inicia sesión */
export function trackSessionStart(userId: string): Promise<void> {
  return trackEvent({ type: "session_start", userId });
}

/** Track: usuario abre un programa/módulo */
export function trackModuleViewed(
  userId: string,
  programId: string,
  programTitle?: string
): Promise<void> {
  return trackEvent({
    type: "module_viewed",
    userId,
    resourceId: programId,
    meta: programTitle ? { program_title: programTitle } : undefined,
  });
}

/** Track: usuario visualiza un contenido */
export function trackContentViewed(
  userId: string,
  contentId: string,
  programId: string
): Promise<void> {
  return trackEvent({
    type: "content_viewed",
    userId,
    resourceId: contentId,
    meta: { program_id: programId },
  });
}

/** Track: usuario completa un contenido */
export function trackContentCompleted(
  userId: string,
  contentId: string,
  programId: string
): Promise<void> {
  return trackEvent({
    type: "content_completed",
    userId,
    resourceId: contentId,
    meta: { program_id: programId },
  });
}

/** Track: usuario visita la página premium */
export function trackPremiumPageViewed(userId?: string): Promise<void> {
  return trackEvent({ type: "premium_page_viewed", userId });
}

/** Track: clic en "Desbloquear" / "Ver Premium" */
export function trackPremiumClicked(
  userId?: string,
  source?: string
): Promise<void> {
  return trackEvent({
    type: "premium_clicked",
    userId,
    meta: source ? { source } : undefined,
  });
}

/** Track: usuario inicia proceso de pago (Wompi) */
export function trackPaymentInitiated(
  userId: string,
  amountCOP: number
): Promise<void> {
  return trackEvent({
    type: "payment_initiated",
    userId,
    meta: { amount_cop: amountCOP },
  });
}

/** Track: pago confirmado exitosamente */
export function trackPaymentConfirmed(
  userId: string,
  amountCOP: number,
  transactionId?: string
): Promise<void> {
  return trackEvent({
    type: "payment_confirmed",
    userId,
    meta: {
      amount_cop: amountCOP,
      ...(transactionId ? { transaction_id: transactionId } : {}),
    },
  });
}
