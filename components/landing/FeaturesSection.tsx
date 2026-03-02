"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileCheck,
  ListChecks,
  Target,
  Wifi,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Módulos por tema",
    description:
      "Contenido organizado por unidades y temas alineados al examen real.",
  },
  {
    icon: FileCheck,
    title: "Ejercicios tipo examen",
    description:
      "Preguntas con el mismo formato que encontrarás en Preunal y Preicfes.",
  },
  {
    icon: ListChecks,
    title: "Soluciones paso a paso",
    description:
      "Cada ejercicio incluye solución detallada para que aprendas del error.",
  },
  {
    icon: Target,
    title: "Simulacros estratégicos",
    description:
      "Practica bajo condiciones reales de tiempo y dificultad.",
  },
  {
    icon: Wifi,
    title: "Acceso online 24/7",
    description:
      "Estudia desde cualquier lugar, cuando quieras. Solo necesitas internet.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function FeaturesSection() {
  return (
    <section
      id="incluye"
      aria-labelledby="features-heading"
      className="bg-bg-alt py-20 sm:py-28"
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
            Todo incluido
          </motion.span>
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            ¿Qué incluye la plataforma?
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            /* Make first two cards span wider on lg */
            const span =
              idx < 2 ? "lg:col-span-1" : idx === 4 ? "sm:col-span-2 lg:col-span-1" : "";
            return (
              <motion.article
                key={feat.title}
                variants={item}
                className={`rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md ${span}`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10">
                  <Icon
                    className="h-5 w-5 text-brand"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-semibold text-text">
                  {feat.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {feat.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
