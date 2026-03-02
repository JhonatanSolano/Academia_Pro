"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Entiendes el tema pero fallas en el examen",
    description:
      "La teoría no basta. Sin práctica con preguntas reales, los errores se repiten bajo presión.",
  },
  {
    icon: Clock,
    title: "Te quedas sin tiempo en los simulacros",
    description:
      "La velocidad importa. Sin estrategia para abordar cada tipo de pregunta, pierdes minutos clave.",
  },
  {
    icon: HelpCircle,
    title: "No sabes cómo abordar ciertos tipos de pregunta",
    description:
      "Hay formatos específicos en Preunal y Preicfes que requieren técnica, no solo conocimiento.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problem-heading"
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
            El problema
          </motion.span>
          <motion.h2
            id="problem-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            ¿Te pasa esto?
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.article
                key={point.title}
                variants={item}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-error/10">
                  <Icon
                    className="h-6 w-6 text-error"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {point.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
