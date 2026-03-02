"use client";

import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Clock,
  BookOpen,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { isPremiumActive } from "@/types";

const benefits = [
  "Acceso completo a todos los módulos premium",
  "Ejercicios tipo examen real con soluciones paso a paso",
  "Simulacros estratégicos de Preunal y Preicfes",
  "Material PDF descargable",
  "Videos explicativos por módulo",
  "Acceso durante 90 días",
];

export default function PremiumPage() {
  const { user } = useAuth();
  const alreadyPremium = user ? isPremiumActive(user) : false;

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 py-16"
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #1e293b 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Back */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al dashboard
        </Link>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-premium/15 px-4 py-1.5 text-sm font-semibold text-premium">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Acceso Premium
          </div>

          <h1 className="mb-2 text-3xl font-extrabold text-text-inverse">
            Desbloquea todo el contenido
          </h1>

          <p className="mb-8 text-sm leading-relaxed text-slate-400">
            Un solo pago, sin suscripción. Practica con ejercicios reales y
            mejora tu puntaje en el Preunal y Preicfes.
          </p>

          {/* Price */}
          <div className="mb-8 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-text-inverse">
              $XX.000
            </span>
            <span className="text-sm text-slate-400">COP · pago único</span>
          </div>

          {/* Benefits */}
          <ul className="mb-8 flex flex-col gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Trust */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-success" /> Pago seguro con
              Wompi
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-accent" /> 90 días de acceso
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-brand-light" /> Sin
              suscripción
            </span>
          </div>

          {/* CTA */}
          {alreadyPremium ? (
            <div className="rounded-xl bg-success/15 px-6 py-4 text-center text-sm font-semibold text-success">
              ✓ Ya tienes acceso Premium activo
            </div>
          ) : (
            <button
              className="w-full rounded-xl bg-brand px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-light hover:shadow-xl hover:shadow-brand/30"
              onClick={() => {
                // TODO: Integrate Wompi checkout
                alert("Integración Wompi pendiente");
              }}
            >
              Pagar y desbloquear
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
