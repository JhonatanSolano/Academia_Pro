"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Award } from "lucide-react";

const signals = [
  {
    icon: UserCheck,
    title: "Profesor experto",
    description:
      "Años de experiencia en preparación Preunal y Preicfes. Método probado con estudiantes reales.",
  },
  {
    icon: Award,
    title: "Resultados reales",
    description:
      "Estudiantes que han ingresado a la Universidad Nacional usando esta metodología de estudio.",
  },
  {
    icon: ShieldCheck,
    title: "Plataforma segura",
    description:
      "Autenticación con Google, datos protegidos en Firebase y pago seguro con Wompi.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TrustSection() {
  return (
    <section
      id="confianza"
      aria-labelledby="trust-heading"
      className="bg-bg py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-wide text-brand uppercase"
          >
            Confianza
          </motion.span>
          <motion.h2
            id="trust-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            ¿Por qué confiar en Pódium Académico?
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {signals.map((signal) => {
            const Icon = signal.icon;
            return (
              <motion.article
                key={signal.title}
                variants={item}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
                  <Icon
                    className="h-7 w-7 text-brand"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text">
                  {signal.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {signal.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
