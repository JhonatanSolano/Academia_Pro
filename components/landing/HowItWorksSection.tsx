"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Accede gratis",
    description:
      "Regístrate con tu cuenta de Google y accede a un módulo completo, sin costo.",
  },
  {
    number: "02",
    title: "Practica con preguntas reales",
    description:
      "Resuelve ejercicios tipo examen con soluciones detalladas paso a paso.",
  },
  {
    number: "03",
    title: "Desbloquea premium",
    description:
      "Si quieres más contenido, desbloquea todos los módulos con un pago único.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-heading"
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
            Simple y directo
          </motion.span>
          <motion.h2
            id="how-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            ¿Cómo funciona?
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-8 sm:grid-cols-3"
          aria-label="Pasos para usar la plataforma"
        >
          {steps.map((step) => (
            <motion.li key={step.number} variants={item} className="relative">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="text-5xl font-extrabold text-brand/15">
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl font-bold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
