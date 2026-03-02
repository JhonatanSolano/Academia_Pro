"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-bg py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #1e293b 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5"
            aria-hidden="true"
          />

          <h2
            id="cta-heading"
            className="relative text-3xl font-extrabold text-white sm:text-4xl"
          >
            Empieza a practicar hoy
          </h2>
          <p className="relative mt-4 mx-auto max-w-lg text-base text-slate-300">
            Accede al módulo gratuito, resuelve ejercicios tipo examen real y
            decides si quieres más.
          </p>
          <a
            href="/login"
            className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand shadow-lg transition-all hover:bg-slate-100"
            aria-label="Acceder al módulo gratuito ahora"
          >
            Acceder al módulo gratuito
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
