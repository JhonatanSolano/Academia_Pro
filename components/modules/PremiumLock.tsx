"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

/**
 * PremiumLock — glassmorphism overlay shown when a non-premium user
 * tries to access locked content.
 */
export default function PremiumLock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl sm:p-14"
    >
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-premium/15">
        <Lock className="h-8 w-8 text-premium" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-bold text-text-inverse">
        Contenido Premium
      </h2>

      <p className="max-w-md text-sm leading-relaxed text-slate-400">
        Este módulo incluye ejercicios tipo examen, soluciones paso a paso y
        simulacros estratégicos. Desbloquea todo el contenido con un pago único.
      </p>

      {/* Trust row */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
        <span>Pago seguro · Sin suscripción · 90 días de acceso</span>
      </div>

      {/* CTA */}
      <Link
        href="/premium"
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-light hover:shadow-xl hover:shadow-brand/30"
      >
        Desbloquear ahora
      </Link>
    </motion.div>
  );
}
